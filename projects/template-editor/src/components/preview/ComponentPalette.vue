<template>
  <div class="tree-sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Header -->
    <div class="sidebar-header" :class="{ 'is-collapsed': isCollapsed }">
      <div class="header-title" v-if="!isCollapsed">
        <i class="fa fa-sitemap title-icon"></i>
        <span>Cây DOM</span>
        <span class="tree-badge" v-if="totalNodesCount > 0">{{ totalNodesCount }}</span>
      </div>

      <button
        class="toggle-btn"
        :title="isCollapsed ? 'Mở rộng Cây DOM' : 'Thu gọn Cây DOM'"
        @click="isCollapsed = !isCollapsed"
      >
        <i :class="isCollapsed ? 'fa fa-sitemap' : 'fa fa-chevron-left'"></i>
      </button>
    </div>

    <!-- DOM Tree View Content -->
    <div class="tree-content" v-if="!isCollapsed">
      <DomTreeView
        :root-node="rootNode"
        :selected-cid="selectedCid"
        @select="$emit('tree-select', $event)"
        @add-child="$emit('tree-add-child', $event)"
        @move-up="$emit('tree-move-up', $event)"
        @move-down="$emit('tree-move-down', $event)"
        @delete="$emit('tree-delete', $event)"
        @drop-reorder="$emit('tree-drop-reorder', $event)"
        @hover-enter="$emit('tree-hover-enter', $event)"
        @hover-leave="$emit('tree-hover-leave', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { VirtualNode } from 'shared/utils';
import DomTreeView from './DomTreeView.vue';

export default defineComponent({
  name: 'ComponentPalette',
  components: {
    DomTreeView,
  },
  props: {
    rootNode: {
      type: Object as PropType<VirtualNode>,
      default: null,
    },
    selectedCid: {
      type: String,
      default: '',
    },
  },
  emits: [
    'tree-select',
    'tree-add-child',
    'tree-move-up',
    'tree-move-down',
    'tree-delete',
    'tree-drop-reorder',
    'tree-hover-enter',
    'tree-hover-leave',
  ],
  data() {
    return {
      isCollapsed: false,
    };
  },
  computed: {
    totalNodesCount(): number {
      if (!this.rootNode) return 0;
      let count = 0;
      const walk = (node: VirtualNode) => {
        if (node.tagName !== '#text' && node.tagName !== 'Root') count++;
        node.childNodes.forEach(walk);
      };
      walk(this.rootNode);
      return count;
    },
  },
});
</script>

<style scoped>
.tree-sidebar {
  width: 250px;
  background: #0b1120;
  border-right: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  z-index: 20;
  color: #f8fafc;
}

.tree-sidebar.collapsed {
  width: 40px;
}

.sidebar-header {
  height: 38px;
  padding: 0 10px;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.sidebar-header.is-collapsed {
  justify-content: center;
  padding: 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  color: #38bdf8;
}

.title-icon {
  font-size: 13px;
  color: #38bdf8;
}

.tree-badge {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  font-size: 9.5px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.toggle-btn {
  background: transparent;
  border: 1px solid #334155;
  border-radius: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #94a3b8;
  font-size: 11px;
  transition: all 0.15s;
}

.toggle-btn:hover {
  background: #1e293b;
  color: #38bdf8;
  border-color: #38bdf8;
}

.tree-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  background: #0b1120;
}
</style>
