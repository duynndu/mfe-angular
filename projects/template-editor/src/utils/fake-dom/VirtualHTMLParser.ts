import { html_beautify } from 'js-beautify';
import { VirtualNode } from './VirtualNode';

export class VirtualHTMLParser {
  static closingTags = [
    'area', 'base', 'br', 'col',
    'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source',
    'track', 'wbr', 'Textarea', 'InputOTP'
  ];
  static parseToTree(htmlString) {
    const root = new VirtualNode('Root');
    let currentParent = root;
    const stack = [root];

    const normalizedHtml = htmlString
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();

    const tokenRegex = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)\/?>|([^<]+)/g;
    let match;

    while ((match = tokenRegex.exec(normalizedHtml)) !== null) {
      const [fullMatch, closingSlash, tagName, attributes, text] = match;

      if (text) {
        const trimmedText = text.trim();
        if (trimmedText) {
          const textNode = new VirtualNode('#text');
          textNode.textContent = trimmedText;
          currentParent.appendChild(textNode);
        }
      } else if (closingSlash) {
        if (stack.length > 1 && currentParent.tagName === tagName) {
          stack.pop();
          currentParent = stack[stack.length - 1];
        }
      } else {
        const node = new VirtualNode(tagName);
        node.isClosingTag = fullMatch.trim().endsWith('/>');
        const attrs = this._parseAttributes(attributes);

        Object.entries(attrs).forEach(([key, value]) => {
          node.setAttribute(key, value);
        });

        node.setAttribute('c-name', node.tagName);
        node.setAttribute('c-id', Math.random().toString(36).substring(2, 9));
        currentParent.appendChild(node);

        if (!node.isClosingTag) {
          stack.push(node);
          currentParent = node;
        }
      }
    }

    return root;
  }

  static parseToElement(htmlString) {
    const root = this.parseToTree(htmlString);
    return root.childNodes[0];
  }

  static _parseAttributes(attributeString) {
    const attrs = {};
    if (!attributeString.trim()) return attrs;

    const attrRegex = /([a-zA-Z-:@]+)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)')?/g;
    let match;
    let lastIndex = 0;

    while ((match = attrRegex.exec(attributeString)) !== null) {
      const [, key, doubleQuotedValue, singleQuotedValue] = match;

      if (key && key.trim()) {
        const cleanKey = key.trim();
        let value = true;

        if (doubleQuotedValue !== undefined) {
          value = doubleQuotedValue;
        } else if (singleQuotedValue !== undefined) {
          value = singleQuotedValue;
        }
        attrs[cleanKey] = value;
      }

      lastIndex = attrRegex.lastIndex;
    }

    return attrs;
  }

  static vueBeautify(htmlString, indent = 2) {
    let result = htmlString;
    result = html_beautify(result, {
      indent_size: indent,
      inline: VirtualHTMLParser.closingTags,
      wrap_line_length: 80,
    });
    return result;
  }
}