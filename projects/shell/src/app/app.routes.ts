import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './pages/home/home';
import { TemplateEditor } from './components/template-editor/template-editor';
import { VueLoader } from './services/vue-loader';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'firstMf',
    loadComponent: () =>
      loadRemoteModule('firstMf', './Component').then((m) => m.App),
  },
  {
    path: 'template-editor',
    loadComponent: async () =>
      VueLoader.initVueModule().then((_) => TemplateEditor),
  },
  { path: '**', component: Home },
];
