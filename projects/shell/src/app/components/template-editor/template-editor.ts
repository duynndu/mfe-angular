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

  @Input('editMode') editMode = true;
  @Output() editModeChange = new EventEmitter<boolean>();

  constructor(private vueLoader: VueLoader) {}

  async ngOnInit() {
    this.app = await this.vueLoader.createPreview();
    if (!this.app) return console.error('Failed to load Vue preview component.');
    this.vm = this.app.mount('#template-editor');
    const vmData = this.vm.$data as any;
    if (vmData) {
      vmData.data = this.data;
      vmData.template = this.template;
      vmData.editMode = this.editMode;
    }
    this.dataChange.emit(vmData?.data ?? this.data);
    this.vm.$watch('template', (newVal: any) => {
      this.templateChange.emit(newVal);
    });
    this.vm.$watch('editMode', (newVal: any) => {
      this.editModeChange.emit(newVal);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.vm) return;
    const vmData = this.vm.$data as any;
    if (!vmData) return;
    if (changes['template']) {
      vmData.template = this.template;
    }
    if (changes['editMode']) {
      vmData.editMode = this.editMode;
    }
  }

  ngOnDestroy(): void {
    this.app?.unmount();
  }
}