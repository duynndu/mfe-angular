<template>
  <div class="preview-editor">
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
        </context-menu-item v-if="selectedCid != rootId">
        <context-menu-item label="Paste after" @click="pasteElement('after')">
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
    <div v-if="selectedNode" class="editor-overlay" @click="selectedNode =null; unHighlightElement()"></div>

    <!-- Panel chỉnh sửa -->
    <EditElementPanel :selectedNode="selectedNode" @close="closeEditPanel" />

    <!-- Preview container -->
    <div class="preview-container" ref="container">
      <div class="content-root" ref="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import PageA4 from '../layouts/PageA4.vue';
import PageA5 from '../layouts/PageA5.vue';
import Textarea from '../forms/Textarea.vue';
import InputOTP from '../forms/InputOTP.vue';
import { VirtualHTMLParser, VirtualNode } from 'shared/utils';
import EditElementPanel from '../EditElementPanel.vue';
import { handlePrint, printElement } from 'shared/helpers';
import { ContextMenu as ImContextMenu } from '@imengyu/vue3-context-menu';
import { ContextMenuItem as ImContextMenuItem } from '@imengyu/vue3-context-menu';
import { templateCategories } from 'shared/constants';
import { App, ComponentPublicInstance } from 'vue';
import { TemplateItem } from 'shared/types';
import Select from '../forms/Select.vue';
import Checkbox from '../forms/Checkbox.vue';
import DatePicker from '../forms/DatePicker.vue';
import { installMaskDirective } from '../../directives/mask-datetime';
import Paint from '../forms/Paint.vue';
import SimpleContextMenu from '../ContextMenu.vue';
import { installContextMenuDirective } from '../../directives/context-menu';
import XmlViewer from './XmlViewer.vue';

export default {
  name: 'Preview',
  components: {
    EditElementPanel,
    ImContextMenu,
    ImContextMenuItem
  },
  props: {
    template: {
      type: String,
      required: true
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
  emits: ['update:template', 'update:editMode'],
  data() {
    const rootId = '123456'
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
      templateCategories: templateCategories
    };
  },
  watch: {
    template: {
      handler() {
        this.processTemplate();
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
    this.processTemplate();
  },
  beforeUnmount() {
    document.removeEventListener('keydown', handlePrint);
  },
  methods: {
    processTemplate() {
      this.rootNode.innerHTML = this.template;
      this.rootNode.genComponentId();
      this.rootNode.setAttribute('c-id', this.rootId);
      // Use outerHTML to keep the Root wrapper for single root element requirement
      this.processedTemplate = this.rootNode.outerHTML;
      this.renderPreview();
    },

    renderPreview() {      
      const contentEl = this.$refs['content'] as HTMLElement;
      if (!contentEl) return;

      if (this.app) this.app.unmount();

      try {
        const DynamicComponent = {
          template: this.processedTemplate,
          data: () => (this.context)
        };

        contentEl.innerHTML = '';
        this.app = createApp(DynamicComponent);
        this.app.config.compilerOptions.isCustomElement = (tag) => tag === 'Root';
        const logFn = (key: string) => (...args: any[]) => console.warn(`[Preview] context.${key} chưa được cung cấp`, ...args);
        this.app.provide('onFieldChange', this.context['onFieldChange'] ?? logFn('onFieldChange'));
        this.app.provide('onSelectSearch', this.context['onSelectSearch'] ?? logFn('onSelectSearch'));
        this.app.provide('signature', this.context['signature'] ?? null);
        this.app.provide('MauHoSo', this.context['MauHoSo'] ?? null);
        this.app.provide('openSignatureHistory', this.context['openSignatureHistory'] ?? logFn('openSignatureHistory'));
        this.app.provide('handleSign', this.context['handleSign'] ?? logFn('handleSign'));
        this.app.provide('insertICD', this.context['insertICD'] ?? logFn('insertICD'));
        this.app.provide('editICD', this.context['editICD'] ?? logFn('editICD'));
        this.app.provide('removeICD', this.context['removeICD'] ?? logFn('removeICD'));

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
          .component('XmlViewer', XmlViewer)
          .component('ContextMenu', SimpleContextMenu)
          .component('ImContextMenu', ImContextMenu)
          .component('ImContextMenuItem', ImContextMenuItem);

        this.vm = this.app.mount(contentEl);

        this.attachContextMenuListeners(contentEl);

      } catch (e) {
        console.error('Render error:', e);
      }
    },

    attachContextMenuListeners(rootEl: HTMLElement) {
      const elements = rootEl.querySelectorAll('[c-id]');
      
      // Remove existing listeners
      rootEl.removeEventListener('contextmenu', this.contextMenuHandler);
      elements.forEach((el) => {
        el.classList.remove('empty-placeholder');
        el.removeEventListener('contextmenu', this.contextMenuHandler as EventListener);
      });

      // Add new listeners
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
      });
    },

    contextMenuHandler(e: MouseEvent) {
      if (!this.editMode) return;
      e.preventDefault();
      e.stopPropagation();

      const cid = (e.currentTarget as HTMLElement).getAttribute('c-id');
      if (cid) {
        this.onContextMenu(e, cid);
      }
    },

    onContextMenu(e: MouseEvent, cid: string) {
      e.preventDefault();
      this.contextMenuOption.x = e.clientX;
      this.contextMenuOption.y = e.clientY;
      this.ContextMenuVisible = true;
      this.selectedCid = cid;
      this.highlightElement(e.currentTarget as HTMLElement);
    },

    openInsertMenu(position: string) {
      this.insertPosition = position;
      this.ContextMenuVisible = false;
      
      // Position the insert menu near the context menu
      this.insertMenuOption.x = this.contextMenuOption.x + 100;
      this.insertMenuOption.y = this.contextMenuOption.y;
      this.insertMenuVisible = true;
    },

    insertElement(templateConfig: TemplateItem) {
      if (!this.selectedCid) return;

      const selectedElement = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`);
      if (!selectedElement) return;

      const newElement = VirtualHTMLParser.parseToElement(templateConfig.template);

      const parent = selectedElement.parentNode;
      if (this.insertPosition === 'before' && parent) {
        parent.insertBefore(newElement, selectedElement);
      } else if (this.insertPosition === 'after' && parent) {
        parent.insertAfter(newElement, selectedElement);
      } else if (this.insertPosition === 'inside') {
        selectedElement.appendChild(newElement);
      }
      this.insertMenuVisible = false;
      this.updateTemplate();
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
      if (!this.selectedCid) return;

      const selectedElement = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`);
      if (!selectedElement) return;
      const parent = selectedElement.parentNode;
      if (!this.elementCopied) return;
      if (pastePosition === 'before' && parent) {
        parent.insertBefore(this.elementCopied, selectedElement);
      } else if (pastePosition === 'after' && parent) {
        parent.insertAfter(this.elementCopied, selectedElement);
      } else if (pastePosition === 'inside') {
        selectedElement.appendChild(this.elementCopied);
      }
      this.updateTemplate();
    },

    removeElement(e: Event) {
      if (this.selectedCid) {
        const el = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`) as VirtualNode;
        el.remove();
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
      this.unHighlightElement()
    },

    isClosingTag(cid: string) {
      return this.rootNode.querySelector(`[c-id=${cid}]`)?.isClosingTag;
    },

    printPreview() {
      printElement('.content-root');
    }
  }
};
</script>

<style scoped>
/* :deep([c-id="123456"]) {
  display: flex;
  justify-content: center;
} */
.preview-container {
  width: 100%;
  overflow: hidden;
}

.preview-editor {
  position: relative;
  height: 100%;
  width: 100%;
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

.content-root {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 148mm;
}

@media print {
  .content-root {
    padding: 0;
  }
}
</style>