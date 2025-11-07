<template>
  <div class="preview-editor">
    <!-- Context Menu Component -->
    <ContextMenu v-model:show="ContextMenuVisible" @update:show="unHighlightElement" :options="contextMenuOption">
      <context-menu-group label="Insert">
        <template #icon>
          <i class="fa-solid fa-plus"></i>
        </template>
        <context-menu-item v-if="!isClosingTag(selectedCid)" label="Insert inside" @click="openInsertMenu('inside')">
          <template #icon>
            <i class="fa-solid fa-arrow-turn-down"></i>
          </template>
        </context-menu-item>
        <context-menu-item v-if="selectedCid != rootId" label="Insert before" @click="openInsertMenu('before')">
          <template #icon>
            <i class="fa-solid fa-arrow-turn-up"></i>
          </template>
        </context-menu-item>
        <context-menu-item v-if="selectedCid != rootId" label="Insert after" @click="openInsertMenu('after')">
          <template #icon>
            <i class="fa-solid fa-arrow-turn-down"></i>
          </template>
        </context-menu-item>
      </context-menu-group>
      <context-menu-item label="Edit" @click="openEditPanel">
        <template #icon>
          <i class="fa-solid fa-pen-to-square"></i>
        </template>
      </context-menu-item>
      <context-menu-item v-if="selectedCid != rootId" label="Copy" @click="copyElement">
        <template #icon>
          <i class="fa-solid fa-copy"></i>
        </template>
      </context-menu-item>
      <context-menu-group v-if="elementCopied" label="Paste">
        <template #icon>
          <i class="fa-solid fa-paste"></i>
        </template>
        <context-menu-item v-if="!isClosingTag(selectedCid)" label="Paste inside" @click="pasteElement('inside')">
          <template #icon>
            <i class="fa-solid fa-arrow-turn-down"></i>
          </template>
        </context-menu-item>
        <context-menu-item v-if="selectedCid != rootId" label="Paste before" @click="pasteElement('before')">
          <template #icon>
            <i class="fa-solid fa-arrow-turn-up"></i>
          </template>
        </context-menu-item v-if="selectedCid != rootId">
        <context-menu-item label="Paste after" @click="pasteElement('after')">
          <template #icon>
            <i class="fa-solid fa-arrow-turn-down"></i>
          </template>
        </context-menu-item>
      </context-menu-group>

      <context-menu-item v-if="selectedCid != rootId" label="Delete" @click="removeElement">
        <template #icon>
          <i class="fa-solid fa-trash"></i>
        </template>
      </context-menu-item>
    </ContextMenu>

    <!-- Insert Template Menu -->
    <ContextMenu v-model:show="insertMenuVisible" :options="insertMenuOption">
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
    </ContextMenu>

    <!-- Overlay -->
    <div v-if="selectedNode" class="editor-overlay" @click="closeEditPanel"></div>

    <!-- Panel chỉnh sửa -->
    <EditElementPanel :selectedNode="selectedNode" @close="closeEditPanel" />

    <!-- Preview container -->
    <div class="preview-container" ref="container">
      <div class="preview-header">
        Preview
        <button @click="printPreview" class="print-btn">Print</button>
      </div>
      <div class="preview">
        <div c-name="root" :c-id="rootId" class="content-root" ref="content"></div>
      </div>
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
import { ContextMenu } from '@imengyu/vue3-context-menu';
import { ContextMenuItem } from '@imengyu/vue3-context-menu';
import { templateCategories } from 'shared/constants';

export default {
  name: 'Preview',
  components: {
    EditElementPanel
  },
  props: {
    template: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:template'],
  data() {
    const rootId = '123456'
    let rootNode = VirtualHTMLParser.parseToTree(this.template, 'Root', { 'c-id': rootId });
    rootNode.innerHTML = this.template;
    return {
      app: null,
      vm: null,
      rootId: '123456',
      rootNode,
      selectedNode: null,
      processedTemplate: '',
      selectedCid: null,
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
      elementCopied: null,
      templateCategories: templateCategories
    };
  },
  watch: {
    template: {
      handler() {
        this.processTemplate();
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
      this.processedTemplate = this.rootNode.innerHTML;
      this.renderPreview();
    },

    renderPreview() {
      const contentEl = this.$refs.content;
      if (!contentEl) return;

      if (this.app) this.app.unmount();

      try {
        const DynamicComponent = {
          template: this.processedTemplate,
          data: () => ({ data: this.data })
        };

        contentEl.innerHTML = '';
        this.app = createApp(DynamicComponent)
          .component('PageA4', PageA4)
          .component('PageA5', PageA5)
          .component('Textarea', Textarea)
          .component('InputOTP', InputOTP);

        this.vm = this.app.mount(contentEl);

        this.attachContextMenuListeners(contentEl);

      } catch (e) {
        console.error('Render error:', e);
      }
    },

    attachContextMenuListeners(rootEl) {
      const elements = rootEl.querySelectorAll('[c-id]');

      // Remove existing listeners
      rootEl.removeEventListener('contextmenu', this.contextMenuHandler);
      elements.forEach(el => {
        el.classList.remove('empty-placeholder');
        el.removeEventListener('contextmenu', this.contextMenuHandler);
      });

      // Add new listeners
      rootEl.addEventListener('contextmenu', this.contextMenuHandler);
      elements.forEach(el => {
        const cid = el.getAttribute('c-id');
        const fakeElement = this.rootNode.querySelector(`[c-id=${cid}]`);
        if (fakeElement.childNodes.length === 0 && !fakeElement.isClosingTag) {
          el.classList.add('empty-placeholder');
        }
        el.addEventListener('contextmenu', this.contextMenuHandler);
      });
    },

    contextMenuHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      const cid = e.currentTarget.getAttribute('c-id');
      if (cid) {
        this.onContextMenu(e, cid);
      }
    },

    onContextMenu(e, cid) {
      e.preventDefault();
      this.contextMenuOption.x = e.clientX;
      this.contextMenuOption.y = e.clientY;
      this.ContextMenuVisible = true;
      this.selectedCid = cid;
      this.highlightElement(e.currentTarget);
    },

    openInsertMenu(position) {
      this.insertPosition = position;
      this.ContextMenuVisible = false;
      
      // Position the insert menu near the context menu
      this.insertMenuOption.x = this.contextMenuOption.x + 100;
      this.insertMenuOption.y = this.contextMenuOption.y;
      this.insertMenuVisible = true;
    },

    insertElement(templateConfig) {
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

    openEditPanel(e) {
      if (this.selectedCid) {
        this.selectedNode = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`);
      }
    },

    copyElement(e) {
      if (!this.selectedCid) return;

      const selectedElement = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`) as VirtualNode;
      if (!selectedElement) return;
      this.elementCopied = selectedElement.cloneNode(true);
    },

    pasteElement(pastePosition) {
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

    removeElement(e) {
      if (this.selectedCid) {
        const el = this.rootNode.querySelector(`[c-id=${this.selectedCid}]`);
        el.remove();
        this.updateTemplate();
      }
    },

    highlightElement(el) {
      this.unHighlightElement(el);
      el.classList.add('element-highlight');
    },

    unHighlightElement() {
      document.querySelectorAll('.element-highlight').forEach(item => {
        item.classList.remove('element-highlight');
      });
    },

    updateTemplate() {
      const newHTML = this.rootNode.innerHTML;
      this.processedTemplate = newHTML;
      this.$emit('update:template', newHTML);
      this.renderPreview();
    },

    closeEditPanel() {
      this.selectedNode = null;
      this.updateTemplate();
      this.unHighlightElement()
    },

    isClosingTag(cid) {
      return this.rootNode.querySelector(`[c-id=${cid}]`)?.isClosingTag;
    },

    printPreview() {
      printElement('.content-root');
    }
  }
};
</script>

<style scoped>
.preview-container {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.preview-header {
  background-color: #2c3e50;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
}

.preview {
  height: 800px;
  overflow: auto;
  border: 1px solid;
  scrollbar-width: thin;
  scrollbar-color: #2c3e50 #f0f0f0;
}

.preview-editor {
  position: relative;
  height: 100%;
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
  background: #ecf0f1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 148mm;
  padding: 10px;
}

@media print {
  .content-root {
    padding: 0;
  }
}

.print-btn {
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.print-btn:hover {
  background: #2980b9;
}
</style>