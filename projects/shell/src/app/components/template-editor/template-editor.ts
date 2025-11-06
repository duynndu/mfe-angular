import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { VueLoader } from '../../services/vue-loader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'template-editor',
  standalone: true,
  imports: [FormsModule],
  template: `<div id="template-editor"></div>`,
})
export class TemplateEditor implements OnInit, OnDestroy {
  app: any = null;
  vm: any = null;
  
  private _template = '';
  
  @Input('template')
  get template(): string {
    return this._template;
  }
  set template(value: string) {
    this._template = value;
    if (this.vm) {
      this.vm.template = value;
    }
  }
  
  private _data: any = {};
  
  @Input('data')
  get data(): any {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
    if (this.vm) {
      this.vm.data = value;
    }
  }

  constructor(private vueLoader: VueLoader) {}

  ngOnInit(): void {
    this.app = this.vueLoader.createPreview();
    this.vm = this.app.mount('#template-editor');
    this.vm.data = this._data;
    this.vm.template = this._template;
  }

  ngOnDestroy(): void {
    this.app?.unmount();
  }
}