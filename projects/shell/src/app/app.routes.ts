import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { loadRemoteModule as loadRemoteModuleCustom } from 'shared/helpers';
import { Home } from './pages/home/home';
import { VueLoader } from './services/vue-loader';
import { createVueWrapperComponent } from '../helpers';
import { environment } from '../environments/environment';
import { VueModule } from 'shared/types';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'vue-page',
    loadComponent: () =>
      loadRemoteModuleCustom({
        remoteEntry: environment.customRemotes.templateEditor,
        exposedModule: './VueEntry',
      }).then((m: VueModule) =>
        createVueWrapperComponent(m.createVueApp)
      ),
  },
  {
    path: 'first',
    loadComponent: () =>
      loadRemoteModule('firstMf', './Component').then((m) => m.App),
  },
  { path: '**', component: Home },
];
