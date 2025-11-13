import { createApp } from "vue";
import App from "./App.vue";
import { InstallCodeMirror } from "codemirror-editor-vue3";
import ContextMenu from "@imengyu/vue3-context-menu";
import "./assets/main.css";
import PreviewWrapper from "./components/preview/PreviewWrapper.vue";

export function createPreview() {
  return createApp(PreviewWrapper)
  .use(InstallCodeMirror)
  .use(ContextMenu);
}

export function createVueApp() {
  return createApp(App)
}
