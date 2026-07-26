import { Injectable } from '@angular/core';
import { loadRemoteModule } from 'shared/helpers/load-remote-module';
import { VueModule } from 'shared/types';
import { VUE_REMOTE_ENTRY } from '../../constants/vue-remote-entry';

@Injectable({ providedIn: 'root' })
export class VueLoader {
  module: VueModule | null = null;
  private async _initVueModule() {
    if (this.module) return;
    try {
      this.module = await loadRemoteModule({
        remoteEntry: VUE_REMOTE_ENTRY,
        exposedModule: './component-factory',
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
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
