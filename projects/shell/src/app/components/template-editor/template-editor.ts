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

  @Input('script') script = '';
  @Output() scriptChange = new EventEmitter<string>();

  @Input('context') context: any = {};
  @Output() contextChange = new EventEmitter<any>();

  @Input('editMode') editMode = true;
  @Output() editModeChange = new EventEmitter<boolean>();

  constructor(private vueLoader: VueLoader) { }

  async ngOnInit() {
    this.app = await this.vueLoader.createPreview();
    if (!this.app) return console.error('Failed to load Vue preview component.');

    this.vm = this.app.mount('#template-editor');
    const vmData = this.vm.$data as any;
    if (vmData) {
      if (this.template) vmData.template = this.template;
      if (this.script) vmData.script = this.script;
      vmData.context = this.context;
      vmData.editMode = this.editMode;
    }
    this.contextChange.emit(vmData?.context ?? this.context);

    // Lắng nghe mọi thay đổi trên context từ Vue và bắn ngược về Angular
    this.vm.$watch('context', (newVal: any) => {
      this.contextChange.emit(newVal);
    }, { deep: true });

    this.vm.$watch('template', (newVal: any) => {
      this.templateChange.emit(newVal);
    });

    this.vm.$watch('script', (newVal: any) => {
      this.scriptChange.emit(newVal);
    });

    this.vm.$watch('editMode', (newVal: any) => {
      this.editModeChange.emit(newVal);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.vm) return;
    const vmData = this.vm.$data as any;
    if (!vmData) return;

    if (changes['context'] && this.context) {
      vmData.context = this.context;
    }
    if (changes['script']) {
      vmData.script = this.script;
    }
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