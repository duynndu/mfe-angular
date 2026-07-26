import { Routes } from '@angular/router';
import { loadRemoteModule } from 'shared/helpers/load-remote-module';
import { Home } from './pages/home/home';
import { createVueWrapperComponent } from '../helpers';
import { VueModule } from 'shared/types';
import { VUE_REMOTE_ENTRY } from '../constants/vue-remote-entry';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'vue-page',
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: VUE_REMOTE_ENTRY,
        exposedModule: './component-factory',
      }).then((m: VueModule) =>
        createVueWrapperComponent(m.createApp)
      ),
  },
  {
    path: 'first',
    loadComponent: () =>
      loadRemoteModule('firstMf', './Component').then((m: any) => m.App),
  },
  { path: '**', component: Home },
];
