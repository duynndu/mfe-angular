<template>
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
            <i class="fa fa-code"></i>
            <span>JavaScript Scope & Logic</span>
            <span class="drawer-hint">(reactive data, computed, watch, methods...)</span>
          </div>
          <div class="drawer-actions">
            <button class="drawer-close-btn" @click="showScriptEditor = false" title="Đóng">✕</button>
          </div>
        </div>
        <div class="script-drawer-body">
          <textarea
            class="script-code-area"
            :value="localScript"
            @input="onScriptInput"
            placeholder="// Viết mã JavaScript tại đây...&#10;const data = reactive({ name: 'Nguyễn Văn A' });&#10;const upperName = computed(() => (data.name || '').toUpperCase());&#10;return { data, upperName };"
            spellcheck="false"
          ></textarea>
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
import { createApp, type App, type ComponentPublicInstance, effectScope, type EffectScope } from 'vue';
import PageA4 from '../layouts/PageA4.vue';
import PageA5 from '../layouts/PageA5.vue';
import Textarea from '../forms/Textarea.vue';
import InputOTP from '../forms/InputOTP.vue';
import Select from '../forms/Select.vue';
import Checkbox from '../forms/Checkbox.vue';
import DatePicker from '../forms/DatePicker.vue';
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
    ImContextMenuItem
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
  emits: ['update:template', 'update:editMode', 'update:script', 'script-error'],
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
    };
  },
  watch: {
    template: {
      handler() {
        this.processTemplate();
      }
    },
    script: {
      handler(newVal) {
        if (newVal !== this.localScript) {
          this.localScript = newVal || '';
          this.evalScript();
          this.renderPreview();
        }
      }
    },
    context: {
      handler() {
        this.renderPreview();
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', handlePrint);
    this.evalScript();
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
    evalScript() {
      if (this.activeScriptScope) {
        this.activeScriptScope.stop();
        this.activeScriptScope = null;
      }

      this.activeScriptScope = effectScope();
      this.activeScriptScope.run(() => {
        const { scope, error } = evalScriptScope(this.localScript);
        this.scriptError = error;
        if (error) {
          this.$emit('script-error', error);
        } else {
          this.evaluatedScope = scope;
        }
      });
    },

    onScriptInput(e: Event) {
      const val = (e.target as HTMLTextAreaElement).value;
      this.localScript = val;
      this.$emit('update:script', val);
      this.evalScript();
      this.renderPreview();
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
        const DynamicComponent = {
          template: this.processedTemplate,
          setup() {
            return self.evaluatedScope;
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
  background: #090d16;
  border-bottom: 2px solid #1e293b;
  display: flex;
  flex-direction: column;
  height: 220px;
  max-height: 40vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  z-index: 15;
}

.script-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 14px;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
}

.drawer-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #38bdf8;
}

.drawer-hint {
  font-size: 11px;
  color: #64748b;
  font-weight: normal;
}

.drawer-close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 4px;
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
}

.script-code-area {
  flex: 1;
  width: 100%;
  padding: 10px 14px;
  background: #020617;
  color: #f1f5f9;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 12.5px;
  line-height: 1.5;
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
}

.preview-container {
  flex: 1;
  padding: 16px;
  overflow: auto;
  display: flex;
  justify-content: center;
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