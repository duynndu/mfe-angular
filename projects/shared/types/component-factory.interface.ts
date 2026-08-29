export interface PreviewMountOptions {
  template: string;
  script?: string;
  context?: any;
  editMode?: boolean;
  onTemplateChange?: (val: string) => void;
  onScriptChange?: (val: string) => void;
  onContextChange?: (val: any) => void;
  onEditModeChange?: (val: boolean) => void;
  onScriptError?: (err: string) => void;
}

export interface PreviewMountInstance {
  app: any;
  updateProps: (props: Partial<PreviewMountOptions>) => void;
  unmount: () => void;
}

export interface VueModule {
  mountPreview: (container: HTMLElement | string, initialProps: PreviewMountOptions) => PreviewMountInstance;
  createApp: () => any;
  [key: string]: any;
}
