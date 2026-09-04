import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AITemplateService } from 'shared/services';
import { AIGeneratorRequest, AIGeneratorResult, AIProviderConfig } from 'shared/types';
import { TemplateEditor } from '../template-editor/template-editor';

@Component({
  selector: 'app-ai-assistant-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TemplateEditor],
  templateUrl: './ai-assistant-modal.html',
  styleUrl: './ai-assistant-modal.scss'
})
export class AiAssistantModal implements OnInit, OnChanges {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() currentTemplate = '';
  @Input() currentScript = '';
  @Input() currentContext: any = {};
  @Input() currentTemplateName = '';
  @Input() currentTemplateBadge = '';
  @Input() currentTemplateIcon = '';
  @Input() currentTemplateDescription = '';

  @Output() applyTemplate = new EventEmitter<{ template: string; script: string; context: any; isUpdateCurrent?: boolean }>();
  @Output() applyContext = new EventEmitter<any>();

  @ViewChild('streamConsoleBody') streamConsoleBodyRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  isFullScreen = true;
  showSettingsModal = false;

  // 2 loại thiết kế chính (tương ứng với 2 System Prompt)
  templateType: 'ui' | 'document' = 'ui';

  // Trạng thái làm việc
  isNewBlankMode = false;
  promptText = '';
  imageData = '';
  isGenerating = false;
  streamingText = '';
  streamingChars = 0;

  result: AIGeneratorResult | null = null;
  resultViewTab: 'preview' | 'template' | 'script' | 'context' = 'preview';
  aiPreviewEditMode = false;
  copyToastMessage = '';
  saveSuccessMsg = '';

  // Cấu hình AI Provider / OmniRoute
  config: AIProviderConfig = {
    provider: 'omniroute',
    apiKey: '',
    model: 'auto',
    customEndpoint: 'https://n8nz.io.vn/v1'
  };

  availableModels: { id: string; name: string; description?: string }[] = [];
  isLoadingModels = false;
  loadModelsError = '';
  customModelId = '';
  showApiKey = false;
  testConnectionStatus: 'idle' | 'testing' | 'success' | 'failed' = 'idle';
  testConnectionMessage = '';

  constructor() {
    const savedConfig = localStorage.getItem('ai_provider_config');
    if (savedConfig) {
      try {
        this.config = { ...this.config, ...JSON.parse(savedConfig) };
      } catch (e) {
        console.warn('Lỗi đọc cấu hình AI:', e);
      }
    }
  }

  ngOnInit() {
    this.loadModels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['visible'] && this.visible) || (changes['currentTemplate'] && this.visible)) {
      this.syncCurrentTemplateInfo();
    }
  }

  get hasOriginalTemplate(): boolean {
    return !!(this.currentTemplate && this.currentTemplate.trim().length > 15);
  }

  get isWorkingOnExisting(): boolean {
    return !this.isNewBlankMode && this.hasOriginalTemplate;
  }

  get displayTemplate(): string {
    return this.result?.template || (this.isNewBlankMode ? '' : this.currentTemplate) || '';
  }
  set displayTemplate(val: string) {
    if (this.result) {
      this.result.template = val;
    }
  }

  get displayScript(): string {
    return this.result?.script || (this.isNewBlankMode ? '' : this.currentScript) || '';
  }
  set displayScript(val: string) {
    if (this.result) {
      this.result.script = val;
    }
  }

  get displayContext(): any {
    return this.result?.context || (this.isNewBlankMode ? {} : this.currentContext) || {};
  }
  set displayContext(val: any) {
    if (this.result) {
      this.result.context = val;
    }
  }

  syncCurrentTemplateInfo() {
    this.result = null;
    this.promptText = '';
    this.imageData = '';
    this.isNewBlankMode = false;

    if (this.hasOriginalTemplate) {
      // Tự động nhận diện loại mẫu
      const isDoc = this.currentTemplate.includes('<PageA4') || this.currentTemplate.includes('<PageA5');
      this.templateType = isDoc ? 'document' : 'ui';
    }
  }

  startNewBlank() {
    this.isNewBlankMode = true;
    this.result = null;
    this.promptText = '';
    this.imageData = '';
    this.streamingText = '';
  }

  resetToOriginal() {
    this.isNewBlankMode = false;
    this.result = null;
    this.promptText = '';
    this.imageData = '';
    this.streamingText = '';
  }

  setTemplateType(type: 'ui' | 'document') {
    this.templateType = type;
  }

  @HostListener('document:keydown', ['$event'])
  handleGlobalKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      this.visible = !this.visible;
      this.visibleChange.emit(this.visible);
    }
    if (e.key === 'Escape' && this.visible) {
      if (this.showSettingsModal) {
        this.showSettingsModal = false;
      } else {
        this.close();
      }
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(e: ClipboardEvent) {
    if (!this.visible) return;
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          this.processFile(file);
          e.preventDefault();
          break;
        }
      }
    }
  }

  onPromptKeydown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      this.onSendPrompt();
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  triggerFileInput() {
    this.fileInputRef?.nativeElement?.click();
  }

  onFileSelected(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.processFile(target.files[0]);
    }
  }

  onDropImage(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      this.processFile(e.dataTransfer.files[0]);
    }
  }

  processFile(file: File) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      this.imageData = (evt.target?.result as string) || '';
    };
    reader.readAsDataURL(file);
  }

  removeAttachedImage() {
    this.imageData = '';
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  onChunkReceived(chunk: string, accumulated: string) {
    this.streamingText = accumulated;
    this.streamingChars = accumulated.length;
    setTimeout(() => {
      if (this.streamConsoleBodyRef?.nativeElement) {
        this.streamConsoleBodyRef.nativeElement.scrollTop = this.streamConsoleBodyRef.nativeElement.scrollHeight;
      }
    }, 10);
  }

  async onSendPrompt() {
    if (!this.promptText.trim() && !this.imageData) return;

    this.isGenerating = true;
    this.streamingText = '';
    this.streamingChars = 0;

    try {
      // Xác định template hiện tại đang có để AI sửa tiếp hay tạo mới
      const currentActiveTemplate = this.result?.template || (this.isWorkingOnExisting ? this.currentTemplate : undefined);
      const currentActiveScript = this.result?.script || (this.isWorkingOnExisting ? this.currentScript : undefined);
      const currentActiveContext = this.result?.context || (this.isWorkingOnExisting ? this.currentContext : undefined);

      const isRefining = !!(currentActiveTemplate && currentActiveTemplate.trim());

      const req: AIGeneratorRequest = {
        prompt: this.promptText.trim() || (this.imageData ? 'Bóc tách và dựng cấu trúc từ ảnh đính kèm' : ''),
        mode: isRefining ? 'tweak' : (this.imageData ? 'image' : 'prompt'),
        currentTemplate: isRefining ? currentActiveTemplate : undefined,
        currentScript: isRefining ? currentActiveScript : undefined,
        currentContext: isRefining ? currentActiveContext : undefined,
        templateType: this.templateType,
        imageData: this.imageData || undefined
      };

      const newResult = await AITemplateService.generate(
        req,
        this.config,
        (chunk, acc) => this.onChunkReceived(chunk, acc)
      );

      this.result = newResult;
      this.promptText = '';
      this.imageData = '';
    } catch (err: any) {
      alert('Lỗi xử lý AI: ' + (err?.message || err));
    } finally {
      this.isGenerating = false;
    }
  }

  applyToEditor(isUpdateCurrent = false) {
    if (!this.displayTemplate) return;

    this.applyTemplate.emit({
      template: this.displayTemplate,
      script: this.displayScript,
      context: this.displayContext,
      isUpdateCurrent: isUpdateCurrent
    });
    this.close();
  }

  copyCurrentViewCode() {
    let codeToCopy = '';
    let label = '';
    if (this.resultViewTab === 'template') {
      codeToCopy = this.displayTemplate;
      label = 'Template HTML';
    } else if (this.resultViewTab === 'script') {
      codeToCopy = this.displayScript;
      label = 'Script Vue 3';
    } else if (this.resultViewTab === 'context') {
      codeToCopy = JSON.stringify(this.displayContext, null, 2);
      label = 'Mock Context Data';
    } else {
      codeToCopy = this.displayTemplate;
      label = 'Template HTML';
    }
    this.copyCode(codeToCopy, label);
  }

  copyCode(code: string, label = 'mã') {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      this.copyToastMessage = `Đã sao chép ${label}!`;
      setTimeout(() => {
        this.copyToastMessage = '';
      }, 2500);
    }
  }

  async loadModels() {
    this.isLoadingModels = true;
    this.loadModelsError = '';
    try {
      this.availableModels = await AITemplateService.fetchModels(
        this.config.customEndpoint,
        this.config.apiKey
      );
      if (this.availableModels.length > 0 && !this.availableModels.some(m => m.id === this.config.model)) {
        if (!this.config.model || this.config.model === 'custom') {
          // giữ nguyên
        } else {
          this.config.model = this.availableModels[0].id;
        }
      }
    } catch (e: any) {
      this.loadModelsError = e?.message || 'Không thể xác thực API Key hoặc kết nối Gateway.';
    } finally {
      this.isLoadingModels = false;
    }
  }

  onApiKeyOrEndpointChange() {
    this.loadModels();
  }

  setQuickEndpoint(url: string) {
    this.config.customEndpoint = url;
    this.testConnectionStatus = 'idle';
    this.testConnectionMessage = '';
    this.onApiKeyOrEndpointChange();
  }

  async testConnection() {
    this.testConnectionStatus = 'testing';
    this.testConnectionMessage = 'Đang kiểm tra kết nối...';
    try {
      const models = await AITemplateService.fetchModels(
        this.config.customEndpoint,
        this.config.apiKey
      );
      this.testConnectionStatus = 'success';
      this.testConnectionMessage = `Kết nối thành công! Nhận diện ${models.length} mô hình.`;
      this.availableModels = models;
      this.loadModelsError = '';
    } catch (e: any) {
      this.testConnectionStatus = 'failed';
      this.testConnectionMessage = e?.message || 'Không thể kết nối đến Endpoint này.';
    }
  }

  saveConfig() {
    if (this.config.model === 'custom' && this.customModelId.trim()) {
      this.config.model = this.customModelId.trim();
    }
    localStorage.setItem('ai_provider_config', JSON.stringify(this.config));
    this.saveSuccessMsg = 'Đã lưu cấu hình!';
    this.loadModels();
    setTimeout(() => {
      this.saveSuccessMsg = '';
      this.showSettingsModal = false;
    }, 1200);
  }

  stringifyContext(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}
