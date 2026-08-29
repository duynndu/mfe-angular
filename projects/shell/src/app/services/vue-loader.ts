import { Injectable } from '@angular/core';
import { loadRemoteModule } from 'shared/helpers/load-remote-module';
import { VueModule, PreviewMountOptions, PreviewMountInstance } from 'shared/types';
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

  async mountPreview(
    container: HTMLElement | string,
    options: PreviewMountOptions
  ): Promise<PreviewMountInstance | null> {
    await this._initVueModule();
    try {
      if (!this.module?.mountPreview) {
        throw new Error('Vue module does not export mountPreview.');
      }
      return this.module.mountPreview(container, options);
    } catch (error) {
      console.error('[VueLoader] Failed to mount preview:', error);
      return null;
    }
  }
}
