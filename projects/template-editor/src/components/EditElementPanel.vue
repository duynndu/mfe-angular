<template>
  <div class="edit-panel" v-if="selectedNode">
    <div class="edit-header">
      <h3>Edit Element</h3>
      <button @click="closePanel" class="close-btn">×</button>
    </div>

    <div class="edit-content">
      <!-- Thông tin cơ bản -->
      <div class="form-group">
        <label>Tag Name</label>
        <input
          type="text"
          :value="selectedNode['tagName']"
          readonly
          class="readonly-input"
        />
      </div>

      <!-- Thuộc tính -->
      <div class="form-group" v-if="selectedNode.tagName != 'Root'">
        <label>Attributes</label>
        <template v-for="attr in orderedAttributes" :key="attr.key">
          <div class="attribute-row" v-if="!isInternalAttribute(String(attr.key))">
            <span class="attribute-key">{{ attr.key }}</span>
            <input
              type="text"
              :value="attr.value"
              @input="updateAttributeValue(String(attr.key), ($event.target as HTMLInputElement).value)"
              placeholder="Attribute value"
              :list="getValueSuggestions(String(attr.key)).length ? `attr-value-${String(attr.key)}` : undefined"
            />
            <datalist
              v-if="getValueSuggestions(String(attr.key)).length"
              :id="`attr-value-${String(attr.key)}`"
            >
              <option v-for="val in getValueSuggestions(String(attr.key))" :key="val" :value="val" />
            </datalist>
            <button @click="removeAttribute(String(attr.key))" class="remove-btn">×</button>
          </div>
        </template>

        <!-- Modal trigger cho attribute -->
        <button @click="showAttributeModal = true" class="add-btn">
          + Add Attribute
        </button>
      </div>

      <!-- Nội dung text (nếu có) -->
      <div v-if="!selectedNode['isClosingTag']" class="form-group">
        <label>Inner HTML</label>
        <Codemirror
          :value="innerHTML"
          @input="updateTextContent($event)"
          rows="3"
          :options="cmOptions"
          height="400px"
          :border="true"
        />
      </div>

      <!-- Actions -->
      <div class="action-buttons">
        <button @click="saveChanges" class="save-btn">Save Changes</button>
        <button @click="deleteElement" class="delete-btn">
          Delete Element
        </button>
      </div>
    </div>

    <!-- Modal thêm Attribute -->
    <div v-if="showAttributeModal" class="edit-element-modal-overlay">
      <div class="edit-element-modal">
        <div class="edit-element-modal-header">
          <h3>Add New Attribute</h3>
          <button @click="showAttributeModal = false" class="close-btn">
            ×
          </button>
        </div>
        <div class="edit-element-modal-body">
          <div class="form-group">
            <label>Attribute Name</label>
            <input
              type="text"
              v-model="newAttribute.key"
              placeholder="Enter attribute name"
              list="attribute-suggestions"
              ref="attributeNameInput"
            />
            <datalist id="attribute-suggestions">
              <option v-for="attr in availableAttributeSuggestions" :key="attr" :value="attr" />
            </datalist>
          </div>
          <div class="form-group">
            <label>Attribute Value</label>
            <input
              type="text"
              v-model="newAttribute.value"
              placeholder="Enter attribute value"
              :list="currentValueSuggestions.length ? 'attribute-value-suggestions' : undefined"
            />
            <datalist v-if="currentValueSuggestions.length" id="attribute-value-suggestions">
              <option v-for="val in currentValueSuggestions" :key="val" :value="val" />
            </datalist>
          </div>
          <div v-if="availableAttributeSuggestions.length" class="suggestion-row"></div>
        </div>
        <div class="edit-element-modal-footer">
          <button @click="showAttributeModal = false" class="cancel-btn">
            Cancel
          </button>
          <button @click="confirmAddAttribute" class="confirm-btn">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtualNode } from 'shared/utils';

const attributeSuggestionMap: Record<string, string[]> = {
  div: ['style', 'class', 'id'],
  p: ['style', 'class'],
  button: ['style', 'class', 'type', 'disabled'],
  input: ['style', 'class', 'type', 'name', 'placeholder', 'value', 'disabled', 'readonly', 'required', 'min', 'max', 'step', 'pattern'],
  textarea: ['style', 'class', 'v-model', 'name', 'placeholder', 'rows', 'cols', 'maxlength', 'disabled', 'readonly', 'required'],
  img: ['style', 'class', 'src', 'alt', 'width', 'height'],
  a: ['style', 'class', 'href', 'target', 'rel', 'title'],
  select: ['style', 'class', 'name', 'multiple', 'disabled', 'required'],
  option: ['style', 'class', 'value', 'selected', 'label'],
  PageA4: ['style', 'class', 'landscape'],
  PageA5: ['style', 'class', 'landscape'],
  Textarea: ['style', 'class', 'v-model', 'type', 'label', 'line', 'suffix', 'placeholder', 'rows', 'maxlength', 'disabled', 'readonly', 'textarea-style'],
  InputOTP: ['style', 'class', 'v-model', 'type', 'readonly', 'disabled', 'mask-length', 'pad-char', 'pad-start'],
  Select: ['style', 'class', 'v-model', 'items', 'bind-label', 'bind-value', 'placeholder', 'multiple', 'disabled', 'readonly', 'label', 'search-by-keys'],
  Checkbox: ['style', 'class', 'v-model', 'value', 'native', 'before-text', 'after-text', 'size', 'disabled', 'readonly'],
  DatePicker: ['style', 'class', 'v-model', 'placeholder', 'format', 'disabled', 'readonly', 'minute-step', 'label', 'input-style'],
  Paint: ['style', 'class', 'v-model', 'line-width', 'color', 'src'],
  Signature: ['style', 'class', 'code'],
  IcdGroupItem: ['style', 'class', 'v-model', 'type', 'index', 'label', 'v-model:ten', 'v-model:ma'],
  IcdList: ['style', 'class', 'items', 'type']
};

type AttributeValueSuggestion = string[] | Record<string, string[]>;

const attributeValueSuggestionMap: Record<string, Record<string, AttributeValueSuggestion>> = {
  DatePicker: {
    format: [
      'DD/MM/YYYY',
      'DD [tháng] MM [năm] YYYY',
      'HH [giờ] mm [phút,] [ngày] DD [tháng] MM [năm] YYYY',
      'HH[h]mm [ngày] DD [tháng] MM [năm] YYYY',
      'HH:mm DD/MM/YYYY'
    ]
  },
  Checkbox: {
    size: ['sm', 'md', 'lg', 'xl']
  },
  Textarea: {
    type: ['text', 'number']
  },
  InputOTP: {
    type: ['text', 'number']
  }
};

export default {
  name: "EditElementPanel",
  props: {
    selectedNode: {
      type: Object,
      default: null,
    } as unknown as () => VirtualNode | null,
  },
  emits: ["close"],
  data() {
    return {
      currentAttributes: {} as any,
      originalAttributes: {},
      showAttributeModal: false,
      newAttribute: {
        key: "",
        value: "",
      },
      attributeSuggestionMap,
      attributeValueSuggestionMap,
      cmOptions: {
        mode: "text/html",
        theme: "default",
        tabSize: 2,
      },
      innerHTML: ""
    };
  },
  computed: {
    orderedAttributes(): { key: string; value: any }[] {
      if (!this.currentAttributes) return [];
      const keys = Object.keys(this.currentAttributes);
      const firstKeys: string[] = [];
      const otherKeys: string[] = [];
      
      const hasStyle = keys.find(k => k.toLowerCase() === 'style');
      const hasClass = keys.find(k => k.toLowerCase() === 'class');
      
      if (hasStyle) firstKeys.push(hasStyle);
      if (hasClass) firstKeys.push(hasClass);
      
      for (const k of keys) {
        if (k.toLowerCase() !== 'style' && k.toLowerCase() !== 'class') {
          otherKeys.push(k);
        }
      }
      
      return [...firstKeys, ...otherKeys].map(key => ({
        key,
        value: this.currentAttributes[key]
      }));
    },
    availableAttributeSuggestions(): string[] {
      const tag = this.selectedNode?.tagName ?? '';
      const specific = this.attributeSuggestionMap[tag] || this.attributeSuggestionMap[tag.toLowerCase()] || [];
      const used = new Set(Object.keys(this.currentAttributes || {}));
      return Array.from(new Set(specific)).filter((k) => !this.isInternalAttribute(k) && !used.has(k));
    },
    currentValueSuggestions(): string[] {
      const tag = this.selectedNode?.tagName ?? '';
      const key = this.newAttribute.key;
      const perTag = this.attributeValueSuggestionMap[tag] || this.attributeValueSuggestionMap[tag.toLowerCase()] || {};
      const suggestions = perTag[key];

      if (Array.isArray(suggestions)) return suggestions;

      return [];
    }
  },
  watch: {
    selectedNode: {
      handler(newNode) {
        this.innerHTML = this.sanitizeInnerHTML(newNode?.innerHTML ?? "");
        if (newNode) {
          this.loadNodeAttributes(newNode);
        }
      },
    },
  },
  methods: {
    isInternalAttribute(key: string): boolean {
      const normalizedKey = key.toLowerCase();
      return normalizedKey === 'c-id' || normalizedKey === 'c-name' || normalizedKey.startsWith('path');
    },

    loadNodeAttributes(fakeNode: VirtualNode) {
      this.currentAttributes = { ...fakeNode.attributes };
      this.originalAttributes = { ...fakeNode.attributes };
    },
    
    sanitizeInnerHTML(html: string): string {
      if (!html) return "";
      return html.replace(/\s+(c-(id|name)|path[^\s=/>]*)(\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/gi, "");
    },

    updateAttributeValue(key: string, value: string) {
      this.currentAttributes = {
        ...this.currentAttributes,
        [key]: value,
      };
    },

    removeAttribute(key: string) {
      const newAttributes: any = { ...this.currentAttributes };
      delete newAttributes[key];
      this.currentAttributes = newAttributes;
    },

    getValueSuggestions(key: string): string[] {
      const tag = this.selectedNode?.tagName ?? '';
      const perTag = this.attributeValueSuggestionMap[tag] || this.attributeValueSuggestionMap[tag.toLowerCase()] || {};
      const suggestions = perTag[key];

      if (Array.isArray(suggestions)) return suggestions;

      return [];
    },

    confirmAddAttribute() {
      if (this.newAttribute.key.trim()) {
        this.currentAttributes = {
          ...this.currentAttributes,
          [this.newAttribute.key.trim()]: this.newAttribute.value.trim(),
        };
        this.showAttributeModal = false;
        this.newAttribute = { key: "", value: "" };
      }
    },

    applySuggestedAttribute(attr: string) {
      this.newAttribute = { ...this.newAttribute, key: attr };
      this.$nextTick(() => {
        const input = this.$refs['attributeNameInput'] as HTMLInputElement | undefined;
        input?.focus();
      });
    },

    updateTextContent(text: string) {
      this.innerHTML = text;
    },

    saveChanges() {
      if (!this.selectedNode) return;
      // Update attributes
      this.selectedNode.innerHTML = this.innerHTML;
      Object.keys(this.originalAttributes).forEach((key) => {
        if (!(key in this.currentAttributes)) {
          this.selectedNode?.removeAttribute(key);
        }
      });

      Object.keys(this.currentAttributes).forEach((key) => {
        this.selectedNode?.setAttribute(key, this.currentAttributes[key]);
      });
      this.closePanel();
    },

    deleteElement() {
      this.selectedNode?.remove();
      this.closePanel();
    },

    closePanel() {
      this.$emit("close");
    },

    resetPanel() {
      this.currentAttributes = {};
      this.originalAttributes = {};
      this.showAttributeModal = false;
      this.newAttribute = { key: "", value: "" };
    },
  },
};
</script>

<style scoped>
.edit-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 650px;
  height: 100vh;
  background: white;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.edit-header {
  padding: 15px;
  background: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-header h3 {
  margin: 0;
  font-size: 16px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
}

.edit-content {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.readonly-input {
  background: #f5f5f5;
  color: #666;
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.attribute-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

.attribute-key {
  flex: 0 0 100px;
  font-weight: bold;
  color: #2c3e50;
  font-size: 12px;
  word-break: break-all;
}

.attribute-row input {
  flex: 1;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 12px;
}

.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.save-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
}

/* Modal Styles */
.edit-element-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.edit-element-modal {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.edit-element-modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-element-modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.edit-element-modal-body {
  padding: 20px;
}

.edit-element-modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.cancel-btn {
  padding: 8px 16px;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn {
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-element-modal-body input {
  width: 95%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}
.suggestion-row {
  margin-top: 8px;
}
.suggestion-label {
  display: inline-block;
  margin-bottom: 6px;
  font-size: 12px;
  color: #555;
}
.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.suggestion-chip {
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid #d7e2f0;
  background: #f4f7fb;
  font-size: 12px;
  cursor: pointer;
  color: #2c3e50;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.suggestion-chip:hover {
  background: #e7eef9;
  border-color: #c3d4f0;
}
</style>
