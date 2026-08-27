import jsBeautify from 'js-beautify';
const html_beautify = jsBeautify.html_beautify || (jsBeautify as any);
import { parse } from '@vue/compiler-dom';
import {
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
  type ElementNode,
  type InterpolationNode,
  type TextNode,
  type AttributeNode,
  type DirectiveNode,
  type SimpleExpressionNode
} from '@vue/compiler-core';
import { VirtualNode } from './virtual-node';

export interface ExtractedField {
  raw: string;
  path: string;
}

export const VOID_HTML_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

export class VirtualHTMLParser {
  static closingTags = Array.from(VOID_HTML_TAGS);

  /**
   * Parses a Vue / HTML template string into a VirtualNode tree using @vue/compiler-dom AST.
   */
  static parseToTree(
    htmlString: string,
    rootTagName: string = 'Root',
    rootAttributes: Record<string, string> = { 'c-id': '123456' }
  ): VirtualNode {
    const root = new VirtualNode(rootTagName);
    root.attributes = { ...rootAttributes };

    if (!htmlString || !htmlString.trim()) {
      return root;
    }

    const normalizedHtml = htmlString
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();

    try {
      const ast: RootNode = parse(normalizedHtml, {
        comments: false
      });

      const transformAstNode = (
        astNode: TemplateChildNode
      ): VirtualNode | null => {
        if (!astNode) return null;

        // Element / Component node
        if (astNode.type === NodeTypes.ELEMENT) {
          const el = astNode as ElementNode;
          const virtualEl = new VirtualNode(el.tag);

          // Check if self closing or known void tag
          virtualEl.isClosingTag =
            el.isSelfClosing || VOID_HTML_TAGS.has(el.tag.toLowerCase());

          // Process attributes & directives
          for (const prop of el.props) {
            if (prop.type === NodeTypes.ATTRIBUTE) {
              const attr = prop as AttributeNode;
              const attrName = attr.name;
              const attrValue = attr.value ? attr.value.content : true;
              virtualEl.setAttribute(attrName, attrValue as any);
            } else if (prop.type === NodeTypes.DIRECTIVE) {
              const dir = prop as DirectiveNode;
              const dirName = dir.name;
              const arg =
                dir.arg && dir.arg.type === NodeTypes.SIMPLE_EXPRESSION
                  ? (dir.arg as SimpleExpressionNode).content
                  : '';
              const exp =
                dir.exp && dir.exp.type === NodeTypes.SIMPLE_EXPRESSION
                  ? (dir.exp as SimpleExpressionNode).content
                  : '';

              let key = '';
              if (dirName === 'bind') {
                key = arg ? `:${arg}` : 'v-bind';
              } else if (dirName === 'on') {
                key = arg ? `@${arg}` : 'v-on';
              } else if (dirName === 'model') {
                key = arg ? `v-model:${arg}` : 'v-model';
              } else if (dirName === 'slot') {
                key = arg ? `#${arg}` : 'v-slot';
              } else {
                key = `v-${dirName}${arg ? `:${arg}` : ''}`;
              }

              if (dir.modifiers && dir.modifiers.length > 0) {
                key += '.' + dir.modifiers.join('.');
              }

              virtualEl.setAttribute(key, exp);
            }
          }

          virtualEl.setAttribute('c-name', virtualEl.tagName);

          if (!virtualEl.hasAttribute('c-id')) {
            virtualEl.setAttribute(
              'c-id',
              Math.random().toString(36).substring(2, 9)
            );
          }

          const pathValue = virtualEl.getAttribute('v-model');
          if (pathValue && typeof pathValue === 'string') {
            virtualEl.setAttribute('path', pathValue);
          }

          if (el.children && el.children.length > 0) {
            for (const child of el.children) {
              const childVirtual = transformAstNode(child);
              if (childVirtual) {
                virtualEl.appendChild(childVirtual);
              }
            }
          }

          return virtualEl;
        }

        // Text node
        if (astNode.type === NodeTypes.TEXT) {
          const textNode = astNode as TextNode;
          const content = textNode.content;
          if (!content) return null;

          const vText = new VirtualNode('#text');
          vText.textContent = content;
          return vText;
        }

        // Interpolation node {{ expr }}
        if (astNode.type === NodeTypes.INTERPOLATION) {
          const interpNode = astNode as InterpolationNode;
          const expr =
            interpNode.content &&
            interpNode.content.type === NodeTypes.SIMPLE_EXPRESSION
              ? (interpNode.content as SimpleExpressionNode).content
              : '';

          const vText = new VirtualNode('#text');
          vText.textContent = `{{ ${expr} }}`;
          return vText;
        }

        return null;
      };

      if (ast.children && ast.children.length > 0) {
        for (const child of ast.children) {
          const transformed = transformAstNode(child);
          if (transformed) {
            root.appendChild(transformed);
          }
        }
      }
    } catch (error) {
      console.warn('[VirtualHTMLParser] AST Parse Error, fallback to basic text:', error);
    }

    return root;
  }

  static parseToElement(htmlString: string): VirtualNode {
    const root = this.parseToTree(htmlString);
    return root.childNodes[0] || new VirtualNode('div');
  }

  static parseFromObject(obj: any): VirtualNode {
    if (!obj || typeof obj !== 'object') {
      throw new Error('Input must be a valid object');
    }

    const node = new VirtualNode(obj.tagName || '#text', obj.attributes || {});
    node.textContent = obj.textContent || '';
    node.isClosingTag = !!obj.isClosingTag;

    if (Array.isArray(obj.childNodes)) {
      node.childNodes = obj.childNodes.map((child: any) => {
        const childNode = this.parseFromObject(child);
        childNode.parentNode = node;
        return childNode;
      });
    }

    return node;
  }

  static parseFromJSON(jsonString: string): VirtualNode {
    try {
      return this.parseFromObject(JSON.parse(jsonString));
    } catch (error: any) {
      throw new Error(`Invalid JSON: ${error.message}`);
    }
  }

  static _parseAttributes(attributeString: string): Record<string, any> {
    const attrs: Record<string, any> = {};
    if (!attributeString?.trim()) return attrs;

    const regex = /([#a-zA-Z-:@]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let m;
    while ((m = regex.exec(attributeString)) !== null) {
      if (m[1]) {
        attrs[m[1].trim()] = m[2] ?? m[3] ?? m[4] ?? true;
      }
    }
    return attrs;
  }

  static vueBeautify(htmlString: string, indent: number = 2): string {
    return html_beautify(htmlString, {
      indent_size: indent,
      inline: Array.from(VOID_HTML_TAGS),
      wrap_line_length: 80,
    });
  }

  /**
   * Scans a template string and extracts all field binding paths (e.g. data.username, data.user.address.city).
   */
  static extractTemplateFields(template: string): ExtractedField[] {
    const fieldsMap = new Map<string, ExtractedField>();
    if (!template?.trim()) return [];

    try {
      const ast: RootNode = parse(template);

      function extractFromExpression(exprStr: string) {
        if (!exprStr) return;
        const regex = /\bdata((?:\.[a-zA-Z0-9_$]+|\[['"][^'"]+['"]\])+)/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(exprStr)) !== null) {
          const raw = match[0];
          const path = match[1]
            .replace(/^\./, '')
            .replace(/\[['"]([^'"]+)['"]\]/g, '.$1')
            .replace(/^\./, '');
          if (path && !fieldsMap.has(path)) {
            fieldsMap.set(path, { raw, path });
          }
        }
      }

      function walk(node: TemplateChildNode | RootNode) {
        if (!node) return;

        if (node.type === NodeTypes.INTERPOLATION) {
          const interp = node as InterpolationNode;
          if (
            interp.content &&
            interp.content.type === NodeTypes.SIMPLE_EXPRESSION
          ) {
            extractFromExpression(
              (interp.content as SimpleExpressionNode).content
            );
          }
        }

        if (node.type === NodeTypes.ELEMENT) {
          const el = node as ElementNode;
          for (const prop of el.props) {
            if (prop.type === NodeTypes.DIRECTIVE && prop.exp) {
              if (prop.exp.type === NodeTypes.SIMPLE_EXPRESSION) {
                extractFromExpression(
                  (prop.exp as SimpleExpressionNode).content
                );
              }
            }
          }
          if (el.children) {
            el.children.forEach(walk);
          }
        }

        if (node.type === NodeTypes.ROOT) {
          const root = node as RootNode;
          if (root.children) {
            root.children.forEach(walk);
          }
        }
      }

      walk(ast);
    } catch {
      // Gracefully handle syntax errors during field extraction
    }

    return Array.from(fieldsMap.values());
  }

  /**
   * Converts a VirtualNode or HTML string into a clean Vue template without editor metadata (c-id, c-name, highlight classes).
   */
  static toCleanHTML(nodeOrHtml: VirtualNode | string, indent: number = 2): string {
    const rootNode = typeof nodeOrHtml === 'string' ? this.parseToTree(nodeOrHtml) : nodeOrHtml;
    if (rootNode.tagName === 'Root') {
      return rootNode.childNodes.map((c) => c.toCleanHTML(indent)).join('\n');
    }
    return rootNode.toCleanHTML(indent);
  }
}
