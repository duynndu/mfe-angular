import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
  @Input('template') _template = `<PageA4 style="padding: 3mm 15mm 3mm 15mm;">
  <div>{{ data.name }}</div>
  <p>Tuổi: {{ data.age }}</p>
  <Textarea
    v-model="data.name"
    label="Họ và tên:"
    :line="true"
    :suffix="{ length: 1, char: '❤️' }"
  />
  <Textarea
    v-model="data.age"
    label="Tuổi:"
    :line="true"
  />
  <InputOTP
    v-model="data.age"
    :maskLength="[1,1,1]"
    pad-start="0"
  />

</PageA4>`
  get template() {
    return this.vm?.template;
  }
  set template(value) {
    this.vm.template = value;
  }
  @Input('data') _data: any = { name: 'duynnz' }
  get data() {
    return this.vm?.data;
  }
  set data(value) {
    this.vm.data = value;
  }
  constructor(private vueLoader: VueLoader) {}

  ngOnInit(): void {
    this.initApp();
  }

  onChangeTemplate(value: string) {
    this.vm.$emit('update:template', value);
  }

  initApp() {
    this.app = this.vueLoader.module
      ?.createPreview();
    this.vm = this.app.mount('#template-editor');
    this.data = this._data;
    this.template = this._template;
  }

  ngOnDestroy(): void {
    this.app?.unmount();
  }
}
