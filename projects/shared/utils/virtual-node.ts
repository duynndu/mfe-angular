import { NodeObject } from '../types/node-object';
import { VirtualHTMLParser } from './virtual-html-parser';

export class VirtualNode {
  tagName: string;
  attributes: any = {};
  childNodes: VirtualNode[];
  parentNode: null | VirtualNode;
  textContent: string;
  isClosingTag!: boolean
  constructor(tagName = '', attributes = {}) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.childNodes = [];
    this.parentNode = null;
    this.textContent = '';
  }

  get innerHTML(): string {
    if (this.tagName === '#text') {
      return VirtualHTMLParser.vueBeautify(this.textContent);
    }
    return VirtualHTMLParser.vueBeautify(
      this.childNodes.map((child) => child.outerHTML).join('')
    );
  }

  set innerHTML(htmlString) {
    // Remove all existing children
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

  get outerHTML() {
    if (this.tagName === '#text') {
      return VirtualHTMLParser.vueBeautify(this.textContent);
    }

    let attrs = '';
    for (const [key, value] of Object.entries(this.attributes)) {
      if (value === true) {
        attrs += ` ${key}`;
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

    return VirtualHTMLParser.vueBeautify(
      `<${this.tagName}${attrs}>${this.innerHTML}</${this.tagName}>`
    );
  }

  // DOM methods
  querySelector(selector: string) {
    const results = this._querySelectorAll(selector, true);
    return results.length > 0 ? results[0] : null;
  }

  querySelectorAll(selector: string) {
    return this._querySelectorAll(selector, false);
  }

  _querySelectorAll(selector: string, firstOnly = false) {
    const results: VirtualNode[] = [];

    if (selector.startsWith('.')) {
      // Class selector: .className
      const className = selector.slice(1);
      this._collectByClassName(className, results, firstOnly);
    } else if (selector.startsWith('#')) {
      // ID selector: #id
      const id = selector.slice(1);
      this._collectById(id, results, firstOnly);
    } else if (selector.startsWith('[') && selector.endsWith(']')) {
      // Attribute selector: [attr], [attr=value], [attr~=value], [attr|=value], [attr^=value], [attr$=value], [attr*=value]
      this._collectByAttribute(selector, results, firstOnly);
    } else if (selector.includes('.')) {
      // Tag with class selector: tag.className
      const parts = selector.split('.');
      const tagName = parts[0];
      const className = parts.slice(1).join(' ');
      this._collectByTagAndClass(tagName, className, results, firstOnly);
    } else if (selector.includes('#')) {
      // Tag with ID selector: tag#id
      const parts = selector.split('#');
      const tagName = parts[0];
      const id = parts[1];
      this._collectByTagAndId(tagName, id, results, firstOnly);
    } else if (selector.includes('[')) {
      // Tag with attribute selector: tag[attr=value]
      const bracketIndex = selector.indexOf('[');
      const tagName = selector.substring(0, bracketIndex);
      const attributeSelector = selector.substring(bracketIndex);
      this._collectByTagAndAttribute(
        tagName,
        attributeSelector,
        results,
        firstOnly
      );
    } else {
      // Simple tag name selector
      this._collectByTagName(selector, results, firstOnly);
    }

    return results;
  }

  _collectByTagName(tagName: string, results: VirtualNode[], firstOnly: boolean) {
    if (this.tagName === tagName) {
      results.push(this);
      if (firstOnly) return true;
    }

    for (const child of this.childNodes) {
      if (child.tagName && child._collectByTagName) {
        const found = child._collectByTagName(tagName, results, firstOnly);
        if (found && firstOnly) return true;
      }
    }
    return false;
  }

  _collectByClassName(className: string, results: VirtualNode[], firstOnly: boolean) {
    const classAttr = this.getAttribute('class') || '';
    const classes = classAttr.split(' ').filter((c: string) => c.trim());

    if (classes.includes(className)) {
      results.push(this);
      if (firstOnly) return true;
    }

    for (const child of this.childNodes) {
      if (child.tagName && child._collectByClassName) {
        const found = child._collectByClassName(className, results, firstOnly);
        if (found && firstOnly) return true;
      }
    }
    return false;
  }

  _collectById(id: string, results: VirtualNode[], firstOnly: boolean) {
    if (this.getAttribute('id') === id) {
      results.push(this);
      if (firstOnly) return true;
    }

    for (const child of this.childNodes) {
      if (child.tagName && child._collectById) {
        const found = child._collectById(id, results, firstOnly);
        if (found && firstOnly) return true;
      }
    }
    return false;
  }

  _collectByTagAndClass(tagName: string, className: string, results: VirtualNode[], firstOnly: boolean) {
    if (this.tagName === tagName) {
      const classAttr = this.getAttribute('class') || '';
      const classes = classAttr.split(' ').filter((c: string) => c.trim());

      if (classes.includes(className)) {
        results.push(this);
        if (firstOnly) return true;
      }
    }

    for (const child of this.childNodes) {
      if (child.tagName && child._collectByTagAndClass) {
        const found = child._collectByTagAndClass(
          tagName,
          className,
          results,
          firstOnly
        );
        if (found && firstOnly) return true;
      }
    }
    return false;
  }

  _collectByTagAndId(tagName: string, id: string, results: VirtualNode[], firstOnly: boolean) {
    if (this.tagName === tagName && this.getAttribute('id') === id) {
      results.push(this);
      if (firstOnly) return true;
    }

    for (const child of this.childNodes) {
      if (child.tagName && child._collectByTagAndId) {
        const found = child._collectByTagAndId(tagName, id, results, firstOnly);
        if (found && firstOnly) return true;
      }
    }
    return false;
  }

  _collectByAttribute(attributeSelector: string, results: VirtualNode[], firstOnly: boolean) {
    const attributeMatch = this._parseAttributeSelector(attributeSelector);
    if (attributeMatch && this._matchesAttribute(attributeMatch)) {
      results.push(this);
      if (firstOnly) return true;
    }

    for (const child of this.childNodes) {
      if (child.tagName && child._collectByAttribute) {
        const found = child._collectByAttribute(
          attributeSelector,
          results,
          firstOnly
        );
        if (found && firstOnly) return true;
      }
    }
    return false;
  }

  _collectByTagAndAttribute(tagName: string, attributeSelector: string, results: VirtualNode[], firstOnly: boolean) {
    if (this.tagName === tagName) {
      const attributeMatch = this._parseAttributeSelector(attributeSelector);
      if (attributeMatch && this._matchesAttribute(attributeMatch)) {
        results.push(this);
        if (firstOnly) return true;
      }
    }

    for (const child of this.childNodes) {
      if (child.tagName && child._collectByTagAndAttribute) {
        const found = child._collectByTagAndAttribute(
          tagName,
          attributeSelector,
          results,
          firstOnly
        );
        if (found && firstOnly) return true;
      }
    }
    return false;
  }

  _parseAttributeSelector(selector: string) {
    // Remove brackets: [attr=value] -> attr=value
    const content = selector.slice(1, -1).trim();

    // Support various attribute selector formats:
    // [attr], [attr=value], [attr~=value], [attr|=value], [attr^=value], [attr$=value], [attr*=value]
    const operators = ['~=', '|=', '^=', '$=', '*=', '='];
    let operator = '';
    let attributeName = '';
    let value = '';

    for (const op of operators) {
      const index = content.indexOf(op);
      if (index > -1) {
        operator = op;
        attributeName = content.substring(0, index).trim();
        value = content.substring(index + op.length).trim();

        // Remove quotes if present
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        break;
      }
    }

    // If no operator found, it's a simple [attr] selector
    if (!operator) {
      attributeName = content.trim();
    }

    return { attributeName, operator, value };
  }

  _matchesAttribute(attributeMatch: { attributeName: string; operator: string; value: string }) {
    const { attributeName, operator, value } = attributeMatch;
    const attrValue = this.getAttribute(attributeName);

    // Attribute exists selector: [attr]
    if (!operator) {
      return this.hasAttribute(attributeName);
    }

    // Exact match: [attr=value]
    if (operator === '=') {
      return attrValue === value;
    }

    // Contains word: [attr~=value]
    if (operator === '~=') {
      const words = (attrValue || '')
        .split(' ')
        .map((w: string) => w.trim())
        .filter((w: string) => w);
      return words.includes(value);
    }

    // Starts with prefix: [attr|=value]
    if (operator === '|=') {
      return (
        (attrValue || '').startsWith(value) &&
        (attrValue === value || attrValue.startsWith(value + '-'))
      );
    }

    // Starts with: [attr^=value]
    if (operator === '^=') {
      return (attrValue || '').startsWith(value);
    }

    // Ends with: [attr$=value]
    if (operator === '$=') {
      return (attrValue || '').endsWith(value);
    }

    // Contains substring: [attr*=value]
    if (operator === '*=') {
      return (attrValue || '').includes(value);
    }

    return false;
  }

  getElementById(id: string) {
    return this.querySelector(`#${id}`);
  }

  getElementsByTagName(tagName: string) {
    return this.querySelectorAll(tagName);
  }

  getElementsByClassName(className: string) {
    return this.querySelectorAll(`.${className}`);
  }

  // Collection methods
  _collectElementsByTagName(tagName: string, results: VirtualNode[]) {
    if (this.tagName === tagName) {
      results.push(this);
    }

    for (const child of this.childNodes) {
      if (child._collectElementsByTagName) {
        child._collectElementsByTagName(tagName, results);
      }
    }
  }

  _collectElementsById(id: string, results: VirtualNode[]) {
    if (this.attributes.id === id) {
      results.push(this);
    }

    for (const child of this.childNodes) {
      if (child._collectElementsById) {
        child._collectElementsById(id, results);
      }
    }
  }

  _collectElementsByClassName(className: string, results: VirtualNode[]) {
    const classAttr = this.attributes.class || '';
    if (classAttr.split(' ').includes(className)) {
      results.push(this);
    }

    for (const child of this.childNodes) {
      if (child._collectElementsByClassName) {
        child._collectElementsByClassName(className, results);
      }
    }
  }

  // Attribute methods
  getAttribute(name: string) {
    return this.attributes[name];
  }

  setAttribute(name: string, value: string) {
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

  // Node manipulation methods
  appendChild(child: VirtualNode) {
    child.parentNode = this;
    this.childNodes.push(child);
    return child;
  }

  insertBefore(newNode: VirtualNode, referenceNode: VirtualNode) {
    const index = this.childNodes.indexOf(referenceNode);
    if (index === -1) {
      throw new Error('Reference node not found');
    }

    newNode.parentNode = this;
    this.childNodes.splice(index, 0, newNode);
    return newNode;
  }

  insertAfter(newNode: VirtualNode, referenceNode: VirtualNode) {
    const index = this.childNodes.indexOf(referenceNode);
    if (index === -1) {
      throw new Error('Reference node not found');
    }

    newNode.parentNode = this;
    this.childNodes.splice(index + 1, 0, newNode);
    return newNode;
  }

  remove() {
    if (!this.parentNode) return null;
    const index = this.parentNode.childNodes.indexOf(this);
    if (index > -1) {
      return this.parentNode.childNodes.splice(index, 1)[0];
    }
    return null;
  }

  removeChild(child: VirtualNode) {
    const index = this.childNodes.indexOf(child);
    if (index > -1) {
      child.parentNode = null;
      return this.childNodes.splice(index, 1)[0];
    }
    return null;
  }

  replaceChild(newChild: VirtualNode, oldChild: VirtualNode) {
    const index = this.childNodes.indexOf(oldChild);
    if (index > -1) {
      oldChild.parentNode = null;
      newChild.parentNode = this;
      this.childNodes.splice(index, 1, newChild);
      return oldChild;
    }
    return null;
  }

  // Navigation properties
  get firstChild() {
    return this.childNodes[0] || null;
  }

  get lastChild() {
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
        const childClone = child.cloneNode(true);
        clone.appendChild(childClone);
      }
    }
    return clone;
  }

  toObject(): NodeObject {
    return {
      tagName: this.tagName,
      attributes: this.attributes,
      childNodes: this.childNodes.map(child => child.toObject()),
      textContent: this.textContent
    };
  }

  genComponentId() {
    const genCID = (node: VirtualNode) => {
      node.setAttribute('c-id', Math.random().toString(36).substring(2, 9));
      node.childNodes.forEach((node) => {
        genCID(node);
      });
    };
    genCID(this);
  }
}
