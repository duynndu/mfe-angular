export interface NodeObject {
  tagName: string;
  attributes: Record<string, string>;
  childNodes: NodeObject[];
  textContent?: string;
}
