import { Routes } from '@angular/router';
import { loadRemoteModule } from 'shared/helpers';
import { Home } from './pages/home/home';
import { createVueWrapperComponent } from '../helpers';
import { VueModule } from 'shared/types';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'vue-page',
    loadComponent: () =>
      // loadRemoteModule({
      //   // remoteEntry: 'http://localhost:4202/assets/remoteEntry.js',
      //   remoteName: 'templateEditor',
      //   exposedModule: './component-factory',
      // }).then((m: VueModule) =>
      //   createVueWrapperComponent(m.createApp)
      // ),
      loadRemoteModule('templateEditor', './component-factory').then((m: VueModule) =>
        createVueWrapperComponent(m.createApp)
      ),
  },
  {
    path: 'first',
    loadComponent: () =>
      loadRemoteModule('firstMf', './Component').then((m) => m.App),
  },
  { path: '**', component: Home },
];
