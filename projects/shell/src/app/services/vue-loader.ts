import { Injectable } from '@angular/core';
import { loadRemoteModule } from '../../helpers';
import { environment } from '../../environments/environment';
import { VueEntry } from '../interfaces/vue-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class VueLoader {
  vueModule: VueEntry|null = null;
  
  async initVueModule() {
    if (this.vueModule) return;

    this.vueModule = await loadRemoteModule({
      remoteEntry: environment.vueRemoteEntry,
      exposedModule: './VueEntry',
    });
  }
  async mountVue(selector: string) {
    await this.initVueModule();
    if (!this.vueModule?.mountVue) {
      console.error('Vue module not loaded yet.');
      return;
    }
    this.vueModule.mountVue(selector);
  }
}
