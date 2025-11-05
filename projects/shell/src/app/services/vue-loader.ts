import { Injectable } from '@angular/core';
import { loadRemoteModule } from '../../helpers';
import { environment } from '../../environments/environment';
import { VueModule } from '../interfaces/vue-entry.interface';
@Injectable({ providedIn: 'root' })
export class VueLoader {
  static vueModule: VueModule | null = null;
  static async initVueModule() {
    if (this.vueModule) return;
    try {
      this.vueModule = await loadRemoteModule({
        remoteEntry: environment.vueRemoteEntry,
        exposedModule: './VueEntry',
      });
    } catch (error) {
      console.error('[VueLoader] Failed to load Vue remote module:', error);
      this.vueModule = null;
    }
  }
  get module() {
    return VueLoader.vueModule;
  }

  createPreview() {
    try {
      if (!this.module?.createPreview) {
        throw new Error('Vue module does not export createPreview.');
      }
      return this.module?.createPreview();
    } catch(error) {
      console.log(error);
      return null;
    }
  }
}
