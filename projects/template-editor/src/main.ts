import { createApp, getCurrentInstance } from "vue";
import App from "./App.vue";
import { InstallCodeMirror } from "codemirror-editor-vue3";
import ContextMenu from "@imengyu/vue3-context-menu";
import "./assets/main.css";

createApp(App)
  .use(InstallCodeMirror)
  .use(ContextMenu)
  .mount("#app");