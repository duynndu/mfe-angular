import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { loadRemoteModule } from '../../../helpers';
import { VueLoader } from '../../services/vue-loader';

@Component({
  selector: 'app-shell-vue-wrapper',
  standalone: true,
  template: `<div id="vue-container"></div>`,
})
export class VueWrapper implements AfterViewInit {
  constructor(
    private vueLoader: VueLoader
  ) {}

  async ngAfterViewInit() {
    this.vueLoader.mountVue('#vue-container');
  }
}
