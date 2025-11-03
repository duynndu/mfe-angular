import { createApp } from 'vue';
import App from './App.vue';
import { InstallCodeMirror } from 'codemirror-editor-vue3';
import ContextMenu from '@imengyu/vue3-context-menu'

export function mountVue(containerId) {
  const app = createApp(App);
  app.use(InstallCodeMirror);
  app.use(ContextMenu);
  app.mount(containerId);
}
