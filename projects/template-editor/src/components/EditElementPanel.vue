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
        <template v-for="(value, key) in currentAttributes" :key="key">
          <div class="attribute-row" v-if="String(key) != 'c-id' && String(key) != 'c-name'">
            <span class="attribute-key">{{ key }}</span>
            <input
              type="text"
              :value="value"
              @input="updateAttributeValue(String(key), ($event.target as HTMLInputElement).value)"
              placeholder="Attribute value"
            />
            <button @click="removeAttribute(String(key))" class="remove-btn">×</button>
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
    <div v-if="showAttributeModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Add New Attribute</h3>
          <button @click="showAttributeModal = false" class="close-btn">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Attribute Name</label>
            <input
              type="text"
              v-model="newAttribute.key"
              placeholder="Enter attribute name"
              ref="attributeNameInput"
            />
          </div>
          <div class="form-group">
            <label>Attribute Value</label>
            <input
              type="text"
              v-model="newAttribute.value"
              placeholder="Enter attribute value"
            />
          </div>
        </div>
        <div class="modal-footer">
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
      cmOptions: {
        mode: "text/html",
        theme: "default",
        tabSize: 2,
      },
      innerHTML: ""
    };
  },
  watch: {
    selectedNode: {
      handler(newNode) {
        this.innerHTML = newNode?.innerHTML ?? "";
        if (newNode) {
          this.loadNodeAttributes(newNode);
        }
      },
    },
  },
  methods: {
    loadNodeAttributes(fakeNode: VirtualNode) {
      this.currentAttributes = { ...fakeNode.attributes };
      this.originalAttributes = { ...fakeNode.attributes };
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
.modal-overlay {
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

.modal {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
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

.modal-body input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
