<template>
  <div class="dom-tree-view">
    <!-- Tree Header Toolbar -->
    <div class="tree-toolbar">
      <div class="tree-toolbar-title">
        <i class="fa fa-sitemap"></i>
        <span>Cây thành phần</span>
      </div>
      <div class="tree-toolbar-actions">
        <button
          class="tool-btn"
          :class="{ active: showSearch }"
          :title="showSearch ? 'Ẩn tìm kiếm' : 'Tìm thẻ trong cây'"
          @click="toggleSearch"
        >
          <i class="fa fa-search"></i>
        </button>
        <button
          class="tool-btn"
          title="Mở rộng tất cả"
          @click="expandAll"
        >
          <i class="fa fa-expand"></i>
        </button>
        <button
          class="tool-btn"
          title="Thu gọn tất cả"
          @click="collapseAll"
        >
          <i class="fa fa-compress"></i>
        </button>
      </div>
    </div>

    <!-- Tree Search Box (Collapsible) -->
    <div class="tree-search-bar" v-if="showSearch">
      <i class="fa fa-search search-icon"></i>
      <input
        ref="treeSearchInput"
        v-model="searchFilter"
        type="text"
        placeholder="Lọc thẻ, biến, class..."
        class="tree-search-input"
        @input="onSearchInput"
      />
      <button v-if="searchFilter" class="clear-btn" @click="searchFilter = ''">
        <i class="fa fa-times"></i>
      </button>
    </div>

    <!-- Tree Nodes Scroll Area -->
    <div
      class="tree-nodes-container"
      :class="{ 'canvas-drag-over': isDragOver }"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @drop="onCanvasDrop"
    >
      <div v-if="treeNodes.length === 0" class="empty-tree">
        <i class="fa fa-folder-open-o"></i>
        <span>Không có phần tử</span>
      </div>

      <DomTreeNode
        v-for="node in treeNodes"
        :key="node.getAttribute('c-id') || node.tagName"
        :node="node"
        :depth="0"
        :selected-cid="selectedCid"
        :expanded-map="expandedMap"
        :dragging-cid="draggingCid"
        :drop-target-cid="dropTargetCid"
        :search-query="searchFilter"
        @select="$emit('select', $event)"
        @toggle-expand="toggleExpand"
        @add-child="$emit('add-child', $event)"
        @move-up="$emit('move-up', $event)"
        @move-down="$emit('move-down', $event)"
        @delete="$emit('delete', $event)"
        @drag-start="draggingCid = $event"
        @drop-reorder="handleDropReorder"
        @hover-enter="$emit('hover-enter', $event)"
        @hover-leave="$emit('hover-leave', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { VirtualNode } from 'shared/utils';
import DomTreeNode from './DomTreeNode.vue';

export default defineComponent({
  name: 'DomTreeView',
  components: {
    DomTreeNode,
  },
  props: {
    rootNode: {
      type: Object as PropType<VirtualNode>,
      required: true,
    },
    selectedCid: {
      type: String,
      default: '',
    },
  },
  emits: [
    'select',
    'add-child',
    'move-up',
    'move-down',
    'delete',
    'drop-reorder',
    'hover-enter',
    'hover-leave',
  ],
  data() {
    return {
      expandedMap: {} as Record<string, boolean>,
      draggingCid: '',
      dropTargetCid: '',
      isDragOver: false,
      showSearch: false,
      searchFilter: '',
    };
  },
  computed: {
    treeNodes(): VirtualNode[] {
      if (!this.rootNode) return [];
      if (this.rootNode.tagName === 'Root') {
        return this.rootNode.childNodes.filter((c) => c.tagName !== '#text');
      }
      return [this.rootNode];
    },
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        this.$nextTick(() => {
          (this.$refs['treeSearchInput'] as HTMLInputElement)?.focus();
        });
      } else {
        this.searchFilter = '';
      }
    },
    onSearchInput() {
      if (!this.searchFilter.trim()) return;
      const q = this.searchFilter.toLowerCase();
      // Auto expand nodes containing matches
      const walk = (node: VirtualNode): boolean => {
        const tag = node.tagName.toLowerCase();
        const text = node.textContent?.toLowerCase() || '';
        const cid = node.getAttribute('c-id') || '';
        let hasMatch = tag.includes(q) || text.includes(q);
        for (const child of node.childNodes) {
          if (walk(child)) hasMatch = true;
        }
        if (hasMatch && cid) {
          this.expandedMap[cid] = true;
        }
        return hasMatch;
      };
      this.rootNode?.childNodes?.forEach(walk);
    },
    toggleExpand(cid: string) {
      this.expandedMap[cid] = !(this.expandedMap[cid] ?? true);
    },
    expandAll() {
      const walk = (node: VirtualNode) => {
        const cid = node.getAttribute('c-id');
        if (cid) this.expandedMap[cid] = true;
        node.childNodes.forEach(walk);
      };
      this.rootNode?.childNodes?.forEach(walk);
    },
    collapseAll() {
      const walk = (node: VirtualNode) => {
        const cid = node.getAttribute('c-id');
        if (cid) this.expandedMap[cid] = false;
        node.childNodes.forEach(walk);
      };
      this.rootNode?.childNodes?.forEach(walk);
    },
    handleDropReorder(payload: { targetCid?: string; targetParentCid?: string; hoverOnly?: boolean; rawData?: string }) {
      if (payload.hoverOnly) {
        this.dropTargetCid = payload.targetCid || '';
        return;
      }
      this.dropTargetCid = '';
      this.draggingCid = '';
      this.$emit('drop-reorder', payload);
    },
    onCanvasDrop(e: DragEvent) {
      e.preventDefault();
      this.isDragOver = false;
      this.dropTargetCid = '';
      this.draggingCid = '';
      const raw = e.dataTransfer?.getData('text/plain');
      if (raw) {
        this.$emit('drop-reorder', {
          targetParentCid: this.rootNode.getAttribute('c-id'),
          rawData: raw,
        });
      }
    },
  },
});
</script>

<style scoped>
.dom-tree-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  min-height: 0;
  background: #0b1120;
  color: #f8fafc;
  user-select: none;
  overflow: hidden;
}

.tree-toolbar {
  height: 38px;
  padding: 0 10px;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.tree-toolbar-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11.5px;
  font-weight: 600;
  color: #38bdf8;
}

.tree-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tool-btn {
  width: 24px;
  height: 24px;
  border: 1px solid transparent;
  background: transparent;
  color: #94a3b8;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  transition: all 0.12s;
}

.tool-btn:hover {
  background: #1e293b;
  color: #f8fafc;
  border-color: #334155;
}

.tool-btn.active {
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.4);
}

.tree-search-bar {
  padding: 6px 8px;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  position: relative;
  display: flex;
  align-items: center;
}

.tree-search-bar .search-icon {
  position: absolute;
  left: 17px;
  color: #64748b;
  font-size: 11px;
}

.tree-search-input {
  width: 100%;
  padding: 4px 24px 4px 26px;
  font-size: 11.5px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 5px;
  color: #f8fafc;
  outline: none;
  transition: all 0.12s;
}

.tree-search-input:focus {
  border-color: #38bdf8;
  background: #0b1120;
}

.tree-search-bar .clear-btn {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 10px;
}

.tree-search-bar .clear-btn:hover {
  color: #f8fafc;
}

.tree-nodes-container {
  flex: 1;
  overflow-y: auto;
  padding: 6px 0;
}

.tree-nodes-container.canvas-drag-over {
  background: rgba(56, 189, 248, 0.08);
}

.tree-nodes-container::-webkit-scrollbar {
  width: 4px;
}

.tree-nodes-container::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 2px;
}

.empty-tree {
  padding: 35px 10px;
  text-align: center;
  color: #64748b;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.empty-tree i {
  font-size: 24px;
  color: #334155;
}
</style>

