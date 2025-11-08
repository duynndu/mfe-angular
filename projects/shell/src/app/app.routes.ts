import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './pages/home/home';
import { VueLoader } from './services/vue-loader';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => VueLoader.initVueModule().then((_) => Home),
  },
  {
    path: 'first',
    loadComponent: () =>
      loadRemoteModule('firstMf', './Component').then((m) => m.App),
  },
  { path: '**', component: Home },
];
