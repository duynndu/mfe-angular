import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './pages/home/home';
import { VueWrapper } from './components/vue-wrapper/vue-wrapper';
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
      VueLoader.initVueModule().then((_) => VueWrapper),
  },
  { path: '**', component: Home },
];
