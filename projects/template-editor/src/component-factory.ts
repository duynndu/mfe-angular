import { createApp as createAppLib, reactive, h } from "vue";
import App from "./App.vue";
import Preview from "./components/preview/Preview.vue";
import { InstallCodeMirror } from "codemirror-editor-vue3";
import ContextMenu from "@imengyu/vue3-context-menu";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "./assets/main.css";
import type { PreviewMountOptions, PreviewMountInstance } from "shared/types";

export function mountPreview(
  container: HTMLElement | string,
  initialProps: PreviewMountOptions
): PreviewMountInstance {
  const state = reactive({
    template: initialProps.template || '',
    script: initialProps.script || '',
    context: initialProps.context || {},
    editMode: initialProps.editMode ?? true,
  });

  const app = createAppLib({
    render() {
      return h(Preview, {
        template: state.template,
        script: state.script,
        context: state.context,
        editMode: state.editMode,
        'onUpdate:template': (val: string) => {
          state.template = val;
          initialProps.onTemplateChange?.(val);
        },
        'onUpdate:script': (val: string) => {
          state.script = val;
          initialProps.onScriptChange?.(val);
        },
        'onUpdate:context': (val: any) => {
          state.context = val;
          initialProps.onContextChange?.(val);
        },
        'onUpdate:editMode': (val: boolean) => {
          state.editMode = val;
          initialProps.onEditModeChange?.(val);
        },
        'onScriptError': (err: string) => {
          initialProps.onScriptError?.(err);
        },
      });
    },
  });

  app.use(InstallCodeMirror).use(ContextMenu);
  app.mount(container);

  return {
    app,
    updateProps(newProps: Partial<PreviewMountOptions>) {
      if (newProps.template !== undefined && newProps.template !== state.template) {
        state.template = newProps.template;
      }
      if (newProps.script !== undefined && newProps.script !== state.script) {
        state.script = newProps.script;
      }
      if (newProps.context !== undefined && newProps.context !== state.context) {
        state.context = newProps.context;
      }
      if (newProps.editMode !== undefined && newProps.editMode !== state.editMode) {
        state.editMode = newProps.editMode;
      }
    },
    unmount() {
      app.unmount();
    },
  };
}

export function createApp() {
  return createAppLib(App);
}
