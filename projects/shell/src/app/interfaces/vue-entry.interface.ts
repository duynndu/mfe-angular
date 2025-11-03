
export interface VueEntry {
  mountVue: (selector: string) => void;
  unmountVue?: () => void;
  [key: string]: any;
}
