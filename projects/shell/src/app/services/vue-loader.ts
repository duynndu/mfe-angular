import { Injectable } from '@angular/core';
import { loadRemoteModule } from 'shared/helpers';
import { environment } from '../../environments/environment';
import { VueModule } from 'shared/types';
@Injectable({ providedIn: 'root' })
export class VueLoader {
  module: VueModule | null = null;
  private async _initVueModule() {
    if (this.module) return;
    try {
      this.module = await loadRemoteModule({
        remoteEntry: environment.customRemotes.templateEditor,
        exposedModule: './VueEntry',
      });
    } catch (error) {
      console.error('[VueLoader] Failed to load Vue remote module:', error);
      this.module = null;
    }
  }

  async createPreview() {
    await this._initVueModule();
    try {
      if (!this.module?.createPreview) {
        throw new Error('Vue module does not export createPreview.');
      }
      return this.module.createPreview();
    } catch(error) {
      console.log(error);
      return null;
    }
  }
}
