<template>
  <DatePickerPortal />
  <div class="preview-editor-layout">
    <!-- DOM Tree Sidebar -->
    <ComponentPalette
      v-if="editMode"
      :root-node="rootNode"
      :selected-cid="selectedCid"
      @tree-select="onTreeSelect"
      @tree-add-child="onTreeAddChild"
      @tree-move-up="onTreeMoveUp"
      @tree-move-down="onTreeMoveDown"
      @tree-delete="onTreeDelete"
      @tree-drop-reorder="onTreeDropReorder"
      @tree-hover-enter="onTreeHoverEnter"
      @tree-hover-leave="onTreeHoverLeave"
    />

    <div class="preview-editor-main">
      <!-- Top Action Bar (Script toggle & Tooling) -->
      <div class="preview-top-bar" v-if="editMode">
        <div class="top-bar-left">
          <span class="preview-title"><i class="fa fa-file-text-o"></i> Xem trước Bản in</span>
        </div>
        <div class="top-bar-right">
          <button
            class="script-toggle-btn"
            :class="{ active: showScriptEditor, 'has-error': !!scriptError }"
            @click="showScriptEditor = !showScriptEditor"
            title="Mở / Đóng trình soạn thảo JavaScript Logic"
          >
            <i class="fa fa-code"></i>
            <span>JS Script</span>
            <span class="err-badge" v-if="scriptError">!</span>
          </button>
        </div>
      </div>

      <!-- Script Error Banner (if any) -->
      <div class="script-error-banner" v-if="scriptError && editMode">
        <i class="fa fa-exclamation-triangle"></i>
        <span>{{ scriptError }}</span>
      </div>

      <!-- Script Editor Drawer (Collapsible) -->
      <div class="script-editor-drawer" v-if="showScriptEditor && editMode">
        <div class="script-drawer-header">
          <div class="drawer-title">
            <span class="js-badge">JS</span>
            <span class="drawer-heading">JavaScript Scope & Logic</span>
            <span class="status-pill" :class="scriptError ? 'status-error' : 'status-ready'">
              <i class="fa" :class="scriptError ? 'fa-times-circle' : 'fa-check-circle'"></i>
              {{ scriptError ? 'Có lỗi Script' : 'Scope Sẵn Sàng' }}
            </span>
          </div>

          <div class="drawer-tools">
            <button class="tool-btn format-btn" @click="formatScript" title="Định dạng mã JavaScript tự động">
              <i class="fa fa-magic"></i> Format Code
            </button>
            <button class="drawer-close-btn" @click="showScriptEditor = false" title="Đóng">✕</button>
          </div>
        </div>

        <div class="script-drawer-body">
          <Codemirror
            :value="localScript"
            :options="cmScriptOptions"
            height="100%"
            :border="false"
            @change="onScriptEditorChange"
          />
        </div>

        <div class="script-drawer-footer" :class="{ 'has-error': !!scriptError }">
          <template v-if="scriptError">
            <i class="fa fa-exclamation-triangle footer-err-icon"></i>
            <span class="footer-err-text">{{ scriptError }}</span>
          </template>
          <template v-else>
            <i class="fa fa-lightbulb-o footer-tip-icon"></i>
            <span class="footer-tip-text">
              Hỗ trợ: <code>reactive()</code>, <code>computed()</code>, <code>watch()</code>, <code>ref()</code>, <code>$context</code>, top-level <code>await fetch()</code>. Hãy <code>return</code> các biến cần dùng trong template.
            </span>
          </template>
        </div>
      </div>

      <!-- Context Menu Component -->
      <ImContextMenu v-model:show="ContextMenuVisible" @update:show="unHighlightElement" :options="contextMenuOption">
        <context-menu-group label="Insert">
          <template #icon>
            <i class="fa fa-plus"></i>
          </template>
          <context-menu-item v-if="!isClosingTag(selectedCid)" label="Insert inside" @click="openInsertMenu('inside')">
            <template #icon>
              <i class="fa fa-level-down"></i>
            </template>
          </context-menu-item>
          <context-menu-item v-if="selectedCid != rootId" label="Insert before" @click="openInsertMenu('before')">
            <template #icon>
              <i class="fa fa-level-up"></i>
            </template>
          </context-menu-item>
          <context-menu-item v-if="selectedCid != rootId" label="Insert after" @click="openInsertMenu('after')">
            <template #icon>
              <i class="fa fa-level-down"></i>
            </template>
          </context-menu-item>
        </context-menu-group>
        <context-menu-item label="Edit" @click="openEditPanel">
          <template #icon>
            <i class="fa fa-pencil-square-o"></i>
          </template>
        </context-menu-item>
        <context-menu-item v-if="selectedCid != rootId" label="Copy" @click="copyElement">
          <template #icon>
            <i class="fa fa-copy"></i>
          </template>
        </context-menu-item>
        <context-menu-group v-if="elementCopied" label="Paste">
          <template #icon>
            <i class="fa fa-paste"></i>
          </template>
          <context-menu-item v-if="!isClosingTag(selectedCid)" label="Paste inside" @click="pasteElement('inside')">
            <template #icon>
              <i class="fa fa-level-down"></i>
            </template>
          </context-menu-item>
          <context-menu-item v-if="selectedCid != rootId" label="Paste before" @click="pasteElement('before')">
            <template #icon>
              <i class="fa fa-level-up"></i>
            </template>
          </context-menu-item>
          <context-menu-item v-if="selectedCid != rootId" label="Paste after" @click="pasteElement('after')">
            <template #icon>
              <i class="fa fa-level-down"></i>
            </template>
          </context-menu-item>
        </context-menu-group>

        <context-menu-item v-if="selectedCid != rootId" label="Delete" @click="removeElement">
          <template #icon>
            <i class="fa fa-trash"></i>
          </template>
        </context-menu-item>
      </ImContextMenu>

      <!-- Insert Template Menu -->
      <ImContextMenu v-model:show="insertMenuVisible" :options="insertMenuOption">
        <context-menu-group 
          v-for="(category, categoryIndex) in templateCategories" 
          :key="categoryIndex"
          :label="category.label"
        >
          <context-menu-item 
            v-for="(component, componentIndex) in category.templates" 
            :key="componentIndex"
            :label="component.label"
            @click="insertElement(component)"
          >
            <template #icon>
              <i :class="component.icon"></i>
            </template>
          </context-menu-item>
        </context-menu-group>
      </ImContextMenu>

      <!-- Overlay -->
      <div v-if="selectedNode" class="editor-overlay" @click="selectedNode = null; unHighlightElement()"></div>

      <!-- Panel chỉnh sửa -->
      <EditElementPanel :selectedNode="selectedNode" @close="closeEditPanel" />

      <!-- Preview container with canvas drop & contextmenu support -->
      <div
        class="preview-container"
        ref="container"
        @contextmenu="onCanvasContextMenu"
        @dragover="onCanvasDragOver"
        @dragleave="onCanvasDragLeave"
        @drop="onCanvasDrop"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { createApp, type App, type ComponentPublicInstance, effectScope, type EffectScope, markRaw } from 'vue';
import Codemirror from 'codemirror-editor-vue3';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/comment/comment.js';
import jsBeautify from 'js-beautify';
import PageA4 from '../layouts/PageA4.vue';
import PageA5 from '../layouts/PageA5.vue';
import Textarea from '../forms/Textarea.vue';
import InputOTP from '../forms/InputOTP.vue';
import Select from '../forms/Select.vue';
import Checkbox from '../forms/Checkbox.vue';
import DatePicker from '../forms/DatePicker.vue';
import DatePickerPortal from '../forms/DatePickerPortal.vue';
import Paint from '../forms/Paint.vue';
import SimpleContextMenu from '../ContextMenu.vue';
import ComponentPalette from './ComponentPalette.vue';
import EditElementPanel from '../EditElementPanel.vue';
import { VirtualHTMLParser, VirtualNode } from 'shared/utils';
import { handlePrint, printElement } from 'shared/helpers';
import { ContextMenu as ImContextMenu, ContextMenuItem as ImContextMenuItem } from '@imengyu/vue3-context-menu';
import { templateCategories } from 'shared/constants';
import { TemplateItem } from 'shared/types';
import { installMaskDirective } from '../../directives/mask-datetime';
import { installContextMenuDirective } from '../../directives/context-menu';
import { evalScriptScope } from '../../utils/script-evaluator';

export default {
  name: 'Preview',
  components: {
    EditElementPanel,
    ComponentPalette,
    ImContextMenu,
    ImContextMenuItem,
    DatePickerPortal,
    Codemirror
  },
  props: {
    template: {
      type: String,
      required: true
    },
    script: {
      type: String,
      default: ''
    },
    context: {
      type: Object,
      default: () => ({})
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:template', 'update:context', 'update:editMode', 'update:script', 'script-error'],
  data() {
    const rootId = '123456';
    let rootNode = VirtualHTMLParser.parseToTree(this.template, 'Root', { 'c-id': rootId });
    rootNode.innerHTML = this.template;
    return {
      app: null as App<any> | null,
      vm: null as ComponentPublicInstance | null,
      rootId,
      rootNode,
      selectedNode: null as VirtualNode | null,
      processedTemplate: '',
      selectedCid: '',
      insertPosition: '',
      ContextMenuVisible: false,
      contextMenuOption: {
        x: 0,
        y: 0,
        minWidth: 100
      },
      insertMenuVisible: false,
      insertMenuOption: {
        x: 0,
        y: 0,
        minWidth: 180
      },
      elementCopied: null as VirtualNode | null,
      templateCategories: templateCategories,
      isDraggingComponent: false,
      currentDropTarget: null as { cid: string; position: string } | null,
      localScript: this.script || '',
      showScriptEditor: false,
      scriptError: null as string | null,
      evaluatedScope: {} as Record<string, any>,
      activeScriptScope: null as EffectScope | null,
      evalScriptId: 0,
      cmScriptOptions: {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2,
        indentUnit: 2,
        autoCloseBrackets: true,
        matchBrackets: true,
        styleActiveLine: true,
      },
      scriptDebounceTimer: null as ReturnType<typeof setTimeout> | null,
    };
  },
  watch: {
    template: {
      handler() {
        this.processTemplate();
      }
    },
    script: {
      async handler(newVal) {
        if (newVal !== this.localScript) {
          this.localScript = newVal || '';
          await this.evalScript();
        }
      }
    },
    context: {
      async handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          await this.evalScript();
        }
      }
    }
  },
  async mounted() {
    document.addEventListener('keydown', handlePrint);
    await this.evalScript();
    this.processTemplate();
  },
  beforeUnmount() {
    document.removeEventListener('keydown', handlePrint);
    if (this.activeScriptScope) {
      this.activeScriptScope.stop();
      this.activeScriptScope = null;
    }
  },
  methods: {
    async evalScript() {
      if (!this.localScript || !this.localScript.trim()) {
        this.evaluatedScope = {};
        this.scriptError = null;
        this.renderPreview();
        return;
      }

      if (this.activeScriptScope) {
        this.activeScriptScope.stop();
        this.activeScriptScope = null;
      }

      this.evalScriptId = (this.evalScriptId || 0) + 1;
      const currentId = this.evalScriptId;

      this.activeScriptScope = effectScope();
      const { scope, error } = await evalScriptScope(this.localScript, this.context);

      // Nếu đã có lần chạy mới hơn trong lúc đang await, bỏ qua kết quả cũ này
      if (this.evalScriptId !== currentId) return;

      this.scriptError = error;
      if (error) {
        this.$emit('script-error', error);
      } else {
        this.evaluatedScope = markRaw(scope);
        this.renderPreview();
      }
    },

    onScriptEditorChange(val: string) {
      if (this.localScript === val) return;
      this.localScript = val;
      this.$emit('update:script', val);
      if (this.scriptDebounceTimer) clearTimeout(this.scriptDebounceTimer);
      this.scriptDebounceTimer = setTimeout(() => {
        this.evalScript();
      }, 250);
    },

    formatScript() {
      if (!this.localScript) return;
      try {
        const beautifyFn = (jsBeautify as any).js || (jsBeautify as any).js_beautify || jsBeautify;
        const formatted = beautifyFn(this.localScript, {
          indent_size: 2,
          space_in_empty_paren: false,
          preserve_newlines: true,
          max_preserve_newlines: 2
        });
        if (formatted && formatted !== this.localScript) {
          this.localScript = formatted;
          this.$emit('update:script', formatted);
          this.evalScript();
        }
      } catch (err) {
        console.error('Format script error:', err);
      }
    },



    processTemplate() {
      this.rootNode.innerHTML = this.template;
      this.rootNode.genComponentId();
      this.rootNode.setAttribute('c-id', this.rootId);
      this.processedTemplate = this.rootNode.outerHTML;
      this.renderPreview();
    },

    renderPreview() {      
      const containerEl = this.$refs['container'] as HTMLElement;
      if (!containerEl) return;

      if (this.app) this.app.unmount();

      try {
        const self = this;
        const hasCustomScript = self.localScript && self.localScript.trim() && Object.keys(self.evaluatedScope).length > 0;

        const DynamicComponent = {
          template: this.processedTemplate,
          setup() {
            const scriptScope = hasCustomScript ? self.evaluatedScope : {};

            return {
              $context: self.context,
              data: self.context?.['data'] || {},
              ...scriptScope
            };
          }
        };

        containerEl.innerHTML = '';
        this.app = createApp(DynamicComponent);
        this.app.config.compilerOptions.isCustomElement = (tag) => tag === 'Root' || tag === 'root';
        
        const logFn = (key: string) => (...args: any[]) => console.warn(`[Preview] context.${key} chưa được cung cấp`, ...args);
        this.app.provide('onFieldChange', this.context?.['onFieldChange'] ?? logFn('onFieldChange'));

        installMaskDirective(this.app);
        installContextMenuDirective(this.app);

        this.app
          .component('PageA4', PageA4)
          .component('PageA5', PageA5)
          .component('Textarea', Textarea)
          .component('InputOTP', InputOTP)
          .component('Select', Select)
          .component('Checkbox', Checkbox)
          .component('DatePicker', DatePicker)
          .component('Paint', Paint)
          .component('ContextMenu', SimpleContextMenu)
          .component('ImContextMenu', ImContextMenu)
          .component('ImContextMenuItem', ImContextMenuItem);

        this.vm = this.app.mount(containerEl);

        this.attachEventListeners(containerEl);

      } catch (e) {
        console.error('Render error:', e);
      }
    },

    attachEventListeners(rootEl: HTMLElement) {
      const elements = rootEl.querySelectorAll('[c-id]');
      
      // Remove existing listeners
      rootEl.removeEventListener('contextmenu', this.contextMenuHandler);
      elements.forEach((el) => {
        el.classList.remove('empty-placeholder');
        el.removeEventListener('contextmenu', this.contextMenuHandler as EventListener);
        el.removeEventListener('dragover', this.elementDragOverHandler as EventListener);
        el.removeEventListener('dragleave', this.elementDragLeaveHandler as EventListener);
        el.removeEventListener('drop', this.elementDropHandler as EventListener);
      });

      // Add new contextmenu & drag listeners
      rootEl.addEventListener('contextmenu', this.contextMenuHandler);
      elements.forEach(el => {
        const cid = el.getAttribute('c-id');
        const fakeElement = this.rootNode.querySelector(`[c-id=${cid}]`);
        if (
          this.editMode &&
          fakeElement?.childNodes.length === 0 &&
          !fakeElement.isClosingTag &&
          (!el.getAttribute('style') || el.getAttribute('style')?.trim() === '') &&
          (!el.getAttribute('class') || el.getAttribute('class')?.trim() === '') &&
          fakeElement?.getAttribute('c-name') === 'div'
        ) {
          el.classList.add('empty-placeholder');
        }
        
        el.addEventListener('contextmenu', this.contextMenuHandler as EventListener);
        if (this.editMode) {
          el.addEventListener('dragover', this.elementDragOverHandler as EventListener);
          el.addEventListener('dragleave', this.elementDragLeaveHandler as EventListener);
          el.addEventListener('drop', this.elementDropHandler as EventListener);
        }
      });
    },

    onCanvasContextMenu(e: MouseEvent) {
      if (!this.editMode) return;
      e.preventDefault();
      e.stopPropagation();
      this.onContextMenu(e, this.rootId);
    },

    contextMenuHandler(e: MouseEvent) {
      if (!this.editMode) return;
      e.preventDefault();
      e.stopPropagation();

      const targetEl = e.currentTarget as HTMLElement;
      const cid = targetEl?.getAttribute('c-id') || this.rootId;
      this.onContextMenu(e, cid, targetEl);
    },

    onContextMenu(e: MouseEvent, cid: string, targetEl?: HTMLElement | null) {
      e.preventDefault();
      this.contextMenuOption.x = e.clientX;
      this.contextMenuOption.y = e.clientY;
      this.ContextMenuVisible = true;
      this.selectedCid = cid;
      if (cid !== this.rootId) {
        const el = targetEl || (document.querySelector(`[c-id="${cid}"]`) as HTMLElement);
        if (el) this.highlightElement(el);
      } else {
        this.unHighlightElement();
      }
    },

    // --- Drag & Drop Handlers ---
    elementDragOverHandler(e: DragEvent) {
      if (!this.editMode) return;
      e.preventDefault();
      e.stopPropagation();

      const targetEl = e.currentTarget as HTMLElement;
      const cid = targetEl.getAttribute('c-id');
      if (!cid) return;

      const rect = targetEl.getBoundingClientRect();
      const relY = (e.clientY - rect.top) / (rect.height || 1);

      let position = 'inside';
      if (cid !== this.rootId) {
        if (relY < 0.25) position = 'before';
        else if (relY > 0.75) position = 'after';
      }

      this.clearDropIndicators();
      targetEl.classList.add(`drop-target-${position}`);
      this.currentDropTarget = { cid, position };
    },

    elementDragLeaveHandler(e: DragEvent) {
      const targetEl = e.currentTarget as HTMLElement;
      targetEl.classList.remove('drop-target-before', 'drop-target-after', 'drop-target-inside');
    },

    elementDropHandler(e: DragEvent) {
      if (!this.editMode) return;
      e.preventDefault();
      e.stopPropagation();
      this.clearDropIndicators();

      const rawTemplate = e.dataTransfer?.getData('text/plain');
      if (!rawTemplate) return;

      const targetCid = (e.currentTarget as HTMLElement).getAttribute('c-id') || this.currentDropTarget?.cid;
      const position = this.currentDropTarget?.position || 'inside';

      this.insertTemplateAt(rawTemplate, targetCid, position);
    },

    onCanvasDragOver(e: DragEvent) {
      if (!this.editMode) return;
      e.preventDefault();
    },

    onCanvasDragLeave(e: DragEvent) {
      this.clearDropIndicators();
    },

    onCanvasDrop(e: DragEvent) {
      if (!this.editMode) return;
      e.preventDefault();
      this.clearDropIndicators();
      const rawTemplate = e.dataTransfer?.getData('text/plain');
      if (rawTemplate) {
        this.insertTemplateAt(rawTemplate, this.rootId, 'inside');
      }
    },

    clearDropIndicators() {
      document.querySelectorAll('.drop-target-before, .drop-target-after, .drop-target-inside').forEach((el) => {
        el.classList.remove('drop-target-before', 'drop-target-after', 'drop-target-inside');
      });
    },

    onPaletteDragEnd() {
      this.isDraggingComponent = false;
      this.clearDropIndicators();
    },

    onPaletteInsert(item: TemplateItem) {
      if (this.selectedCid && this.selectedCid !== this.rootId) {
        this.insertTemplateAt(item.template, this.selectedCid, 'after');
      } else {
        this.insertTemplateAt(item.template, this.rootId, 'inside');
      }
    },

    // --- DOM Tree View Handlers ---
    onTreeSelect(cid: string) {
      if (!cid) return;
      this.selectedCid = cid;
      this.selectedNode = this.rootNode.querySelector(`[c-id=${cid}]`);
      this.$nextTick(() => {
        const el = document.querySelector(`[c-id="${cid}"]`) as HTMLElement;
        if (el) {
          this.highlightElement(el);
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    },

    onTreeHoverEnter(cid: string) {
      if (cid && cid !== this.selectedCid) {
        const el = document.querySelector(`[c-id="${cid}"]`);
        el?.classList.add('element-hover-preview');
      }
    },

    onTreeHoverLeave() {
      document.querySelectorAll('.element-hover-preview').forEach((el) => {
        el.classList.remove('element-hover-preview');
      });
    },

    onTreeMoveUp(cid: string) {
      const node = this.rootNode.querySelector(`[c-id=${cid}]`);
      if (!node || !node.parentNode) return;
      const parent = node.parentNode;
      const idx = parent.childNodes.indexOf(node);
      if (idx > 0) {
        parent.childNodes.splice(idx, 1);
        parent.childNodes.splice(idx - 1, 0, node);
        this.updateTemplate();
      }
    },

    onTreeMoveDown(cid: string) {
      const node = this.rootNode.querySelector(`[c-id=${cid}]`);
      if (!node || !node.parentNode) return;
      const parent = node.parentNode;
      const idx = parent.childNodes.indexOf(node);
      if (idx < parent.childNodes.length - 1) {
        parent.childNodes.splice(idx, 1);
        parent.childNodes.splice(idx + 1, 0, node);
        this.updateTemplate();
      }
    },

    onTreeDelete(cid: string) {
      const node = this.rootNode.querySelector(`[c-id=${cid}]`);
      if (node) {
        node.remove();
        if (this.selectedCid === cid) {
          this.selectedCid = '';
          this.selectedNode = null;
          this.unHighlightElement();
        }
        this.updateTemplate();
      }
    },

    onTreeAddChild(cid: string) {
      this.selectedCid = cid;
      this.openInsertMenu('inside');
    },

    onTreeDropReorder(payload: { targetCid?: string; targetParentCid?: string; rawData?: string }) {
      if (!payload.rawData) return;
      const raw = payload.rawData;

      // Case 1: Dragging existing node within tree
      if (raw.startsWith('tree-node:')) {
        const srcCid = raw.slice(10);
        if (srcCid === payload.targetCid || srcCid === payload.targetParentCid) return;
        const srcNode = this.rootNode.querySelector(`[c-id=${srcCid}]`);
        if (!srcNode) return;

        if (payload.targetCid) {
          const targetNode = this.rootNode.querySelector(`[c-id=${payload.targetCid}]`);
          if (targetNode && targetNode.parentNode) {
            srcNode.remove();
            targetNode.parentNode.insertBefore(srcNode, targetNode);
            this.updateTemplate();
          }
        } else if (payload.targetParentCid) {
          const parentNode = this.rootNode.querySelector(`[c-id=${payload.targetParentCid}]`) || this.rootNode;
          if (parentNode) {
            srcNode.remove();
            parentNode.appendChild(srcNode);
            this.updateTemplate();
          }
        }
      }
      // Case 2: Dragging component template from palette
      else {
        this.insertTemplateAt(raw, payload.targetCid || payload.targetParentCid, payload.targetCid ? 'before' : 'inside');
      }
    },

    insertTemplateAt(templateStr: string, targetCid?: string, position: string = 'inside') {
      const newElement = VirtualHTMLParser.parseToElement(templateStr);
      if (!targetCid || targetCid === this.rootId) {
        this.rootNode.appendChild(newElement);
      } else {
        const target = this.rootNode.querySelector(`[c-id=${targetCid}]`);
        if (!target) {
          this.rootNode.appendChild(newElement);
        } else if (position === 'before' && target.parentNode) {
          target.parentNode.insertBefore(newElement, target);
        } else if (position === 'after' && target.parentNode) {
          target.parentNode.insertAfter(newElement, target);
        } else {
          target.appendChild(newElement);
        }
      }

      this.updateTemplate();

      const newCid = newElement.getAttribute('c-id');
      if (newCid) {
        this.selectedCid = newCid;
        this.$nextTick(() => {
          const el = document.querySelector(`[c-id="${newCid}"]`) as HTMLElement;
          if (el) this.highlightElement(el);
        });
      }
    },

    openInsertMenu(position: string) {
      this.insertPosition = position;
      this.ContextMenuVisible = false;
      this.insertMenuOption.x = this.contextMenuOption.x + 100;
      this.insertMenuOption.y = this.contextMenuOption.y;
      this.insertMenuVisible = true;
    },

    insertElement(templateConfig: TemplateItem) {
      if (!this.selectedCid) return;
      this.insertTemplateAt(templateConfig.template, this.selectedCid, this.insertPosition || 'inside');
      this.insertMenuVisible = false;
    },

    openEditPanel(e: Event) {
      if (this.selectedCid) {
        this.selectedNode = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`);
      }
    },

    copyElement(e: Event) {
      if (!this.selectedCid) return;
      const selectedElement = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`) as VirtualNode;
      if (!selectedElement) return;
      this.elementCopied = selectedElement.cloneNode(true);
    },

    pasteElement(pastePosition: string) {
      if (!this.selectedCid || !this.elementCopied) return;
      const selectedElement = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`);
      if (!selectedElement) return;
      const clone = this.elementCopied.cloneNode(true);
      clone.genComponentId(true);
      const parent = selectedElement.parentNode;
      if (pastePosition === 'before' && parent) {
        parent.insertBefore(clone, selectedElement);
      } else if (pastePosition === 'after' && parent) {
        parent.insertAfter(clone, selectedElement);
      } else if (pastePosition === 'inside') {
        selectedElement.appendChild(clone);
      }
      this.updateTemplate();
    },

    removeElement(e: Event) {
      if (this.selectedCid) {
        const el = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`) as VirtualNode;
        el?.remove();
        this.updateTemplate();
      }
    },

    highlightElement(el: HTMLElement) {
      this.unHighlightElement();
      el.classList.add('element-highlight');
    },

    unHighlightElement() {
      document.querySelectorAll('.element-highlight').forEach(item => {
        item.classList.remove('element-highlight');
      });
    },

    updateTemplate() {
      const newHTML = this.rootNode.innerHTML;
      this.processedTemplate = this.rootNode.outerHTML;
      this.$emit('update:template', newHTML);
      this.renderPreview();
    },

    closeEditPanel() {
      this.selectedNode = null;
      this.updateTemplate();
      this.unHighlightElement();
    },

    isClosingTag(cid: string) {
      return this.rootNode.querySelector(`[c-id=${cid}]`)?.isClosingTag;
    },

    printPreview() {
      printElement('[c-id="123456"]');
    }
  }
};
</script>

<style scoped>
.preview-editor-layout {
  display: flex;
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.preview-editor-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  position: relative;
  min-height: 0;
}

.preview-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  color: #f8fafc;
  z-index: 10;
}

.preview-title {
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 8px;
}

.script-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: #1e293b;
  color: #cbd5e1;
  border: 1px solid #334155;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.script-toggle-btn:hover {
  background: #334155;
  color: #ffffff;
}

.script-toggle-btn.active {
  background: #0284c7;
  color: #ffffff;
  border-color: #38bdf8;
  box-shadow: 0 0 12px rgba(2, 132, 199, 0.4);
}

.script-toggle-btn.has-error {
  border-color: #ef4444;
  color: #fca5a5;
}

.err-badge {
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  padding: 1px 5px;
  border-radius: 10px;
  line-height: 1;
}

/* Script Error Banner */
.script-error-banner {
  background: #fef2f2;
  border-bottom: 1px solid #fecaca;
  color: #991b1b;
  padding: 8px 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: monospace;
}

/* Script Editor Drawer */
.script-editor-drawer {
  background: #0f172a;
  border-bottom: 2px solid #1e293b;
  display: flex;
  flex-direction: column;
  height: 520px;
  min-height: 280px;
  max-height: 85vh;
  resize: vertical;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  animation: slideDown 0.18s ease-out;
  z-index: 15;
}

.script-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 14px;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  flex-wrap: wrap;
  gap: 8px;
}

.drawer-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.js-badge {
  background: #f59e0b;
  color: #0f172a;
  font-weight: 800;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.drawer-heading {
  font-size: 13px;
  font-weight: 600;
  color: #f1f5f9;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.status-ready {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-error {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.drawer-tools {
  display: flex;
  align-items: center;
  gap: 8px;
}



.tool-btn {
  background: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
  padding: 3px 9px;
  font-size: 11.5px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;
}

.tool-btn:hover {
  background: #334155;
  color: #38bdf8;
  border-color: #38bdf8;
}

.format-btn {
  background: rgba(14, 165, 233, 0.15);
  color: #38bdf8;
  border-color: rgba(14, 165, 233, 0.35);
}

.format-btn:hover {
  background: #0ea5e9;
  color: #ffffff;
  border-color: #0ea5e9;
}

.drawer-close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.drawer-close-btn:hover {
  background: #1e293b;
  color: #ffffff;
}

.script-drawer-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.script-drawer-body :deep(.vue-codemirror),
.script-drawer-body :deep(.CodeMirror) {
  height: 100% !important;
  font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.55;
}

.script-drawer-body :deep(.cm-s-dracula.CodeMirror) {
  background: #0b1120 !important;
}

.script-drawer-body :deep(.cm-s-dracula .CodeMirror-gutters) {
  background: #070a13 !important;
  border-right: 1px solid #1e293b !important;
}

/* CodeMirror Scrollbars */
.script-drawer-body :deep(.CodeMirror-vscrollbar),
.script-drawer-body :deep(.CodeMirror-hscrollbar),
.script-drawer-body :deep(.CodeMirror-scrollbar) {
  scrollbar-width: thin;
  scrollbar-color: #334155 #090d16;
}

.script-drawer-body :deep(.CodeMirror-vscrollbar)::-webkit-scrollbar,
.script-drawer-body :deep(.CodeMirror-hscrollbar)::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

.script-drawer-body :deep(.CodeMirror-vscrollbar)::-webkit-scrollbar-track,
.script-drawer-body :deep(.CodeMirror-hscrollbar)::-webkit-scrollbar-track {
  background: #090d16;
  border-radius: 4px;
}

.script-drawer-body :deep(.CodeMirror-vscrollbar)::-webkit-scrollbar-thumb,
.script-drawer-body :deep(.CodeMirror-hscrollbar)::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
  border: 1px solid #090d16;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.script-drawer-body :deep(.CodeMirror-vscrollbar)::-webkit-scrollbar-thumb:hover,
.script-drawer-body :deep(.CodeMirror-hscrollbar)::-webkit-scrollbar-thumb:hover {
  background: #38bdf8;
  border-color: #0284c7;
}

.script-drawer-body :deep(.CodeMirror-scrollbar-filler),
.script-drawer-body :deep(.CodeMirror-gutter-filler) {
  background: #090d16 !important;
}

.script-drawer-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: #090d16;
  border-top: 1px solid #1e293b;
  font-size: 11.5px;
}

.script-drawer-footer.has-error {
  background: #450a0a;
  border-top-color: #7f1d1d;
}

.footer-tip-icon {
  color: #f59e0b;
}

.footer-tip-text {
  color: #94a3b8;
}

.footer-tip-text code {
  background: #1e293b;
  color: #38bdf8;
  padding: 1px 4px;
  border-radius: 3px;
  font-family: monospace;
}

.footer-err-icon {
  color: #ef4444;
}

.footer-err-text {
  color: #fca5a5;
  font-family: monospace;
}

.preview-container {
  flex: 1;
  padding: 16px;
  overflow: auto;
  display: flex;
  justify-content: center;
  background: #f1f5f9;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.preview-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.preview-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.preview-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
  border: 2px solid #f1f5f9;
  transition: background 0.2s ease;
}

.preview-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.preview-container::-webkit-scrollbar-corner {
  background: #f1f5f9;
}

/* Drop targets visual feedback */
:deep(.drop-target-inside) {
  outline: 2px dashed #0288d1 !important;
  outline-offset: 2px !important;
  background-color: rgba(2, 136, 209, 0.08) !important;
}

:deep(.drop-target-before) {
  position: relative;
  box-shadow: 0 -4px 0 0 #0288d1 !important;
}

:deep(.drop-target-after) {
  position: relative;
  box-shadow: 0 4px 0 0 #0288d1 !important;
}

:deep(.element-highlight) {
  outline: 2px solid #0288d1 !important;
  outline-offset: 1px !important;
  box-shadow: 0 0 0 4px rgba(2, 136, 209, 0.15) !important;
}

:deep(.element-hover-preview) {
  outline: 1px dashed rgba(2, 136, 209, 0.7) !important;
  outline-offset: 2px !important;
}

/* Overlay */
.editor-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.2s ease-in-out;
}

:deep([c-id="123456"]) {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

@media print {
  .preview-editor-layout {
    display: block;
  }
  .preview-top-bar,
  .script-editor-drawer,
  .script-error-banner {
    display: none !important;
  }
  :deep([c-id="123456"]) {
    box-shadow: none;
    padding: 0;
  }
}
</style>