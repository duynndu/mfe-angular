import { NodeObject } from '../types/node-object.interface';
import { VirtualHTMLParser } from './virtual-html-parser';

export class VirtualNode {
  tagName: string;
  attributes: Record<string, any> = {};
  childNodes: VirtualNode[] = [];
  parentNode: null | VirtualNode = null;
  textContent: string = '';
  isClosingTag!: boolean;

  constructor(tagName = '', attributes: Record<string, any> = {}) {
    this.tagName = tagName;
    this.attributes = { ...attributes };
  }

  // --- Serialization ---
  private _serialize(isClean = false): string {
    if (this.tagName === '#text') {
      return this.textContent;
    }

    let attrs = '';
    for (const [key, value] of Object.entries(this.attributes)) {
      if (isClean && (key === 'c-id' || key === 'c-name' || (key === 'path' && this.hasAttribute('v-model')))) {
        continue;
      }
      if (isClean && key === 'class') {
        const cleanedClass = (String(value) || '')
          .split(/\s+/)
          .filter((c) => c && c !== 'element-highlight' && c !== 'empty-placeholder')
          .join(' ')
          .trim();
        if (cleanedClass) {
          attrs += ` class="${cleanedClass}"`;
        }
        continue;
      }

      if (value === true) {
        attrs += ` ${key}`;
      } else if (value === '' || value === undefined || value === null) {
        attrs += ` ${key}=""`;
      } else {
        attrs += ` ${key}="${value}"`;
      }
    }

    const isSelfClosing =
      this.isClosingTag &&
      this.childNodes.length === 0 &&
      !this.textContent;

    if (isSelfClosing) {
      return `<${this.tagName}${attrs} />`;
    }

    const inner = this.childNodes.map((child) => child._serialize(isClean)).join('');
    return `<${this.tagName}${attrs}>${inner}</${this.tagName}>`;
  }

  get innerHTML(): string {
    if (this.tagName === '#text') {
      return VirtualHTMLParser.vueBeautify(this.textContent);
    }
    const raw = this.childNodes.map((child) => child._serialize(false)).join('');
    return VirtualHTMLParser.vueBeautify(raw);
  }

  set innerHTML(htmlString: string) {
    this.childNodes.forEach((child) => {
      child.parentNode = null;
    });
    this.childNodes = [];

    if (htmlString && htmlString.trim()) {
      const fragment = VirtualHTMLParser.parseToTree(htmlString);
      fragment.childNodes.forEach((child) => {
        this.appendChild(child);
      });
    }
  }

  get outerHTML(): string {
    return VirtualHTMLParser.vueBeautify(this._serialize(false));
  }

  toCleanHTML(indent: number = 2): string {
    return VirtualHTMLParser.vueBeautify(this._serialize(true), indent);
  }

  // --- Selector & Query Engine ---
  matches(selector: string): boolean {
    if (!selector || this.tagName === '#text') return false;
    const s = selector.trim();

    // ID selector: #id
    if (s.startsWith('#')) {
      return this.attributes['id'] === s.slice(1);
    }

    // Class selector: .className or .class1.class2
    if (s.startsWith('.')) {
      const classes = (this.attributes['class'] || '').split(/\s+/);
      const targetClasses = s.slice(1).split('.').filter(Boolean);
      return targetClasses.every((c) => classes.includes(c));
    }

    // Attribute selector: [attr] or [attr=val]
    if (s.startsWith('[') && s.endsWith(']')) {
      const match = s.match(/^\[([^\s=~|^$*\]]+)(?:([~|^$*]?=)["']?(.*?)["']?)?\]$/);
      if (!match) return false;
      const [, key, op, val] = match;
      if (op === undefined) return key in this.attributes;
      const attrVal = String(this.attributes[key] ?? '');
      switch (op) {
        case '=': return attrVal === val;
        case '^=': return attrVal.startsWith(val);
        case '$=': return attrVal.endsWith(val);
        case '*=': return attrVal.includes(val);
        case '~=': return attrVal.split(/\s+/).includes(val);
        case '|=': return attrVal === val || attrVal.startsWith(`${val}-`);
        default: return false;
      }
    }

    // Compound selector: tag.class, tag#id, tag[attr=val]
    const compoundMatch = s.match(/^([a-zA-Z0-9_-]+)([\.#\[].+)$/);
    if (compoundMatch) {
      const [, tag, rest] = compoundMatch;
      return this.tagName.toLowerCase() === tag.toLowerCase() && this.matches(rest);
    }

    // Tag name selector
    return this.tagName.toLowerCase() === s.toLowerCase();
  }

  private _collect(predicate: (node: VirtualNode) => boolean, firstOnly = false): VirtualNode[] {
    const results: VirtualNode[] = [];
    const walk = (node: VirtualNode): boolean => {
      if (predicate(node)) {
        results.push(node);
        if (firstOnly) return true;
      }
      for (const child of node.childNodes) {
        if (walk(child) && firstOnly) return true;
      }
      return false;
    };
    walk(this);
    return results;
  }

  querySelector(selector: string): VirtualNode | null {
    const res = this._collect((node) => node.matches(selector), true);
    return res[0] || null;
  }

  querySelectorAll(selector: string): VirtualNode[] {
    return this._collect((node) => node.matches(selector), false);
  }

  getElementById(id: string): VirtualNode | null {
    return this.querySelector(`#${id}`);
  }

  getElementsByTagName(tagName: string): VirtualNode[] {
    return this.querySelectorAll(tagName);
  }

  getElementsByClassName(className: string): VirtualNode[] {
    return this.querySelectorAll(`.${className}`);
  }

  // --- Attribute Methods ---
  getAttribute(name: string) {
    return this.attributes[name];
  }

  setAttribute(name: string, value: any) {
    this.attributes[name] = value;
    return this;
  }

  removeAttribute(name: string) {
    delete this.attributes[name];
    return this;
  }

  hasAttribute(name: string) {
    return name in this.attributes;
  }

  // --- Tree Mutation Methods ---
  private _childIndex(node: VirtualNode): number {
    const idx = this.childNodes.indexOf(node);
    if (idx === -1) throw new Error('Reference node not found in parent');
    return idx;
  }

  appendChild(child: VirtualNode): VirtualNode {
    child.parentNode = this;
    this.childNodes.push(child);
    return child;
  }

  insertBefore(newNode: VirtualNode, referenceNode: VirtualNode): VirtualNode {
    const index = this._childIndex(referenceNode);
    newNode.parentNode = this;
    this.childNodes.splice(index, 0, newNode);
    return newNode;
  }

  insertAfter(newNode: VirtualNode, referenceNode: VirtualNode): VirtualNode {
    const index = this._childIndex(referenceNode);
    newNode.parentNode = this;
    this.childNodes.splice(index + 1, 0, newNode);
    return newNode;
  }

  remove(): VirtualNode | null {
    if (!this.parentNode) return null;
    return this.parentNode.removeChild(this);
  }

  removeChild(child: VirtualNode): VirtualNode | null {
    const index = this.childNodes.indexOf(child);
    if (index > -1) {
      child.parentNode = null;
      return this.childNodes.splice(index, 1)[0];
    }
    return null;
  }

  replaceChild(newChild: VirtualNode, oldChild: VirtualNode): VirtualNode | null {
    const index = this._childIndex(oldChild);
    oldChild.parentNode = null;
    newChild.parentNode = this;
    this.childNodes.splice(index, 1, newChild);
    return oldChild;
  }

  // --- Navigation & Utilities ---
  get firstChild(): VirtualNode | null {
    return this.childNodes[0] || null;
  }

  get lastChild(): VirtualNode | null {
    return this.childNodes[this.childNodes.length - 1] || null;
  }

  get nextSibling(): VirtualNode | null {
    if (!this.parentNode) return null;
    const index = this.parentNode.childNodes.indexOf(this);
    return this.parentNode.childNodes[index + 1] || null;
  }

  get previousSibling(): VirtualNode | null {
    if (!this.parentNode) return null;
    const index = this.parentNode.childNodes.indexOf(this);
    return this.parentNode.childNodes[index - 1] || null;
  }

  cloneNode(deep: boolean = false): VirtualNode {
    const clone = new VirtualNode(this.tagName, { ...this.attributes });
    clone.textContent = this.textContent;
    clone.isClosingTag = this.isClosingTag;
    if (deep) {
      for (const child of this.childNodes) {
        clone.appendChild(child.cloneNode(true));
      }
    }
    return clone;
  }

  toObject(): NodeObject {
    return {
      tagName: this.tagName,
      attributes: this.attributes,
      childNodes: this.childNodes.map((child) => child.toObject()),
      textContent: this.textContent
    };
  }

  genComponentId(force = false) {
    const genCID = (node: VirtualNode) => {
      if (force || !node.hasAttribute('c-id')) {
        node.setAttribute('c-id', Math.random().toString(36).substring(2, 9));
      }
      node.childNodes.forEach((child) => genCID(child));
    };
    genCID(this);
  }
}

