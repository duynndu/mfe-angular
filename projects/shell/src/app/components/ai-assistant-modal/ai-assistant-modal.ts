import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AITemplateService } from 'shared/services';
import { AI_PRESET_PROMPTS } from 'shared/constants';
import { AIGeneratorRequest, AIGeneratorResult, AIProviderConfig, AIPresetPrompt } from 'shared/types';
import { TemplateEditor } from '../template-editor/template-editor';

@Component({
  selector: 'app-ai-assistant-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TemplateEditor],
  templateUrl: './ai-assistant-modal.html',
  styleUrl: './ai-assistant-modal.scss'
})
export class AiAssistantModal implements OnInit {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() currentTemplate = '';
  @Input() currentScript = '';
  @Input() currentContext: any = {};

  @Output() applyTemplate = new EventEmitter<{ template: string; script: string; context: any }>();
  @Output() applyContext = new EventEmitter<any>();

  @ViewChild('streamConsoleBody') streamConsoleBodyRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  isFullScreen = true;
  currentTab: 'prompt' | 'image' | 'settings' = 'prompt';
  promptText = '';
  pageSize: 'A4' | 'A5' = 'A4';
  orientation: 'portrait' | 'landscape' = 'portrait';
  theme: 'medical' | 'corporate' | 'modern' | 'classic' = 'medical';
  imageData = '';
  imageNotePrompt = '';
  isGenerating = false;
  streamingText = '';
  streamingChars = 0;
  showApiKey = false;
  presets: AIPresetPrompt[] = AI_PRESET_PROMPTS;
  result: AIGeneratorResult | null = null;
  resultViewTab: 'preview' | 'template' | 'script' | 'context' = 'preview';
  aiPreviewEditMode = false;
  saveSuccessMsg = '';

  availableModels: { id: string; name: string; description?: string }[] = [];
  isLoadingModels = false;
  loadModelsError = '';

  customModelId = '';

  config: AIProviderConfig = {
    provider: 'omniroute',
    apiKey: '',
    model: 'auto',
    customEndpoint: 'https://n8nz.io.vn/v1'
  };

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

  onApiKeyOrEndpointChange() {
    this.loadModels();
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
      console.warn('Lỗi tải danh sách models:', e);
    } finally {
      this.isLoadingModels = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleGlobalKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      this.visible = !this.visible;
      this.visibleChange.emit(this.visible);
    }
    if (e.key === 'Escape' && this.visible) {
      this.close();
    }
  }


  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  applyPreset(preset: AIPresetPrompt) {
    this.promptText = preset.prompt;
    this.pageSize = preset.pageSize;
    this.orientation = preset.orientation;
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

  saveConfig() {
    if (this.config.model === 'custom' && this.customModelId.trim()) {
      this.config.model = this.customModelId.trim();
    }
    localStorage.setItem('ai_provider_config', JSON.stringify(this.config));
    this.saveSuccessMsg = 'Đã lưu cấu hình AI thành công!';
    this.loadModels();
    setTimeout(() => {
      this.saveSuccessMsg = '';
    }, 2500);
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

  async onGeneratePrompt() {
    if (!this.promptText.trim()) return;
    this.isGenerating = true;
    this.streamingText = '';
    this.streamingChars = 0;
    this.result = null;

    try {
      const req: AIGeneratorRequest = {
        prompt: this.promptText,
        mode: 'prompt',
        pageSize: this.pageSize,
        orientation: this.orientation,
        theme: this.theme
      };
      this.result = await AITemplateService.generate(req, this.config, (chunk, acc) => this.onChunkReceived(chunk, acc));
    } catch (err: any) {
      alert('Lỗi sinh biểu mẫu: ' + err.message);
    } finally {
      this.isGenerating = false;
    }
  }

  async onGenerateImage() {
    if (!this.imageData) return;
    this.isGenerating = true;
    this.streamingText = '';
    this.streamingChars = 0;
    this.result = null;

    try {
      const req: AIGeneratorRequest = {
        prompt: this.imageNotePrompt || 'Bóc tách cấu trúc biểu mẫu từ ảnh scan',
        mode: 'image',
        imageData: this.imageData,
        pageSize: this.pageSize,
        orientation: this.orientation
      };
      this.result = await AITemplateService.generate(req, this.config, (chunk, acc) => this.onChunkReceived(chunk, acc));
    } catch (err: any) {
      alert('Lỗi phân tích ảnh: ' + err.message);
    } finally {
      this.isGenerating = false;
    }
  }

  applyToEditor() {
    if (!this.result) return;
    this.applyTemplate.emit({
      template: this.result.template,
      script: this.result.script,
      context: this.result.context
    });
    this.close();
  }

  applyContextOnly() {
    if (!this.result?.context) return;
    this.applyContext.emit(this.result.context);
    this.close();
  }

  copyCode(code: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      alert('Đã sao chép mã vào bộ nhớ tạm!');
    }
  }

  stringifyContext(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}
