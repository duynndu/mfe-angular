import { Injectable } from '@angular/core';
import { loadRemoteModule } from '../../helpers';
import { environment } from '../../environments/environment';
import { VueModule } from '../interfaces/vue-entry.interface';
@Injectable({ providedIn: 'root' })
export class VueLoader {
  static vueModule: VueModule | null = null;
  static async initVueModule() {
    if (this.vueModule) return;
    this.vueModule = await loadRemoteModule({
      remoteEntry: environment.vueRemoteEntry,
      exposedModule: './VueEntry',
    });
  }
  get module() {
    return VueLoader.vueModule;
  }
}
