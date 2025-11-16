import { createApp as createAppLib } from "vue";
import App from "./App.vue";
import { InstallCodeMirror } from "codemirror-editor-vue3";
import ContextMenu from "@imengyu/vue3-context-menu";
import "./assets/main.css";
import PreviewWrapper from "./components/preview/PreviewWrapper.vue";

export function createPreview() {
  return createAppLib(PreviewWrapper)
  .use(InstallCodeMirror)
  .use(ContextMenu);
}

export function createApp() {
  return createAppLib(App)
}
