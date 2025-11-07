import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { VueLoader } from '../../services/vue-loader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'template-editor',
  standalone: true,
  imports: [FormsModule],
  template: `<div id="template-editor"></div>`,
})
export class TemplateEditor implements OnInit, OnChanges, OnDestroy {
  app: any = null;
  vm: any = null;
  
  @Input('template') template = '';
  @Output() templateChange = new EventEmitter<string>();
  
  @Input('data') data = {};
  @Output() dataChange = new EventEmitter<any>();

  constructor(private vueLoader: VueLoader) {}

  ngOnInit(): void {
    this.app = this.vueLoader.createPreview();
    this.vm = this.app.mount('#template-editor');
    this.vm.data = this.data;
    this.vm.template = this.template;
    this.dataChange.emit(this.vm.data);
    this.vm.$watch('template', (newVal: any) => {
      this.templateChange.emit(newVal);
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.vm) return;
    if (changes['template']) {
      this.vm.template = this.template;
    }
  }

  ngOnDestroy(): void {
    this.app?.unmount();
  }
}