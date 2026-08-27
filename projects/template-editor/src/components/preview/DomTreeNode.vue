<template>
  <div class="tree-node-wrapper" :class="{ 'search-matched': isSearchMatched }">
    <div
      class="tree-row"
      :class="{
        selected: selectedCid === cid,
        dragging: draggingCid === cid,
        'drop-target-row': dropTargetCid === cid,
        highlighted: isSearchMatched,
      }"
      :style="{ paddingLeft: (depth * 12 + 4) + 'px' }"
      draggable="true"
      @dragstart="onDragStart"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.stop="onDrop"
      @mouseenter="$emit('hover-enter', cid)"
      @mouseleave="$emit('hover-leave', cid)"
      @click.stop="$emit('select', cid)"
    >
      <!-- Expand / Collapse Arrow -->
      <div
        class="tree-toggle"
        v-if="hasElementChildren || isContainer"
        @click.stop="$emit('toggle-expand', cid)"
      >
        <i :class="isExpanded ? 'fa fa-caret-down' : 'fa fa-caret-right'"></i>
      </div>
      <div class="tree-toggle-spacer" v-else></div>

      <!-- Tag Badge -->
      <span class="node-tag" :class="tagTypeClass">
        &lt;{{ node.tagName }}&gt;
      </span>

      <!-- Child Count Badge -->
      <span class="node-count" v-if="elementChildren.length > 0">
        {{ elementChildren.length }}
      </span>

      <!-- Preview Text / Label / v-model -->
      <span class="node-preview" :title="nodePreview">
        {{ nodePreview }}
      </span>

      <!-- Row Action Buttons (hover with glassmorphism) -->
      <div class="row-actions" @click.stop>
        <button
          class="row-btn"
          title="Thêm phần tử con vào trong"
          v-if="isContainer"
          @click="$emit('add-child', cid)"
        >
          <i class="fa fa-plus"></i>
        </button>
        <button
          class="row-btn"
          title="Di chuyển lên trên"
          @click="$emit('move-up', cid)"
        >
          <i class="fa fa-arrow-up"></i>
        </button>
        <button
          class="row-btn"
          title="Di chuyển xuống dưới"
          @click="$emit('move-down', cid)"
        >
          <i class="fa fa-arrow-down"></i>
        </button>
        <button
          class="row-btn del"
          title="Xóa phần tử"
          @click="$emit('delete', cid)"
        >
          <i class="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

    <!-- Children Nodes -->
    <div class="tree-children" v-if="isExpanded && hasElementChildren">
      <DomTreeNode
        v-for="child in elementChildren"
        :key="child.getAttribute('c-id') || child.tagName"
        :node="child"
        :depth="depth + 1"
        :selected-cid="selectedCid"
        :expanded-map="expandedMap"
        :dragging-cid="draggingCid"
        :drop-target-cid="dropTargetCid"
        :search-query="searchQuery"
        @select="$emit('select', $event)"
        @toggle-expand="$emit('toggle-expand', $event)"
        @add-child="$emit('add-child', $event)"
        @move-up="$emit('move-up', $event)"
        @move-down="$emit('move-down', $event)"
        @delete="$emit('delete', $event)"
        @drag-start="$emit('drag-start', $event)"
        @drop-reorder="$emit('drop-reorder', $event)"
        @hover-enter="$emit('hover-enter', $event)"
        @hover-leave="$emit('hover-leave', $event)"
      />
    </div>

    <!-- Empty container drop hint -->
    <div
      class="nested-drop-hint"
      v-if="isContainer && isExpanded && !hasElementChildren"
      @click="$emit('add-child', cid)"
      @dragover.prevent
      @drop.stop="onDropInside"
    >
      <i class="fa fa-plus-circle"></i>
      <span>Thả hoặc bấm để thêm con</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { VirtualNode } from 'shared/utils';

export default defineComponent({
  name: 'DomTreeNode',
  props: {
    node: {
      type: Object as PropType<VirtualNode>,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
    selectedCid: {
      type: String,
      default: '',
    },
    expandedMap: {
      type: Object as PropType<Record<string, boolean>>,
      default: () => ({}),
    },
    draggingCid: {
      type: String,
      default: '',
    },
    dropTargetCid: {
      type: String,
      default: '',
    },
    searchQuery: {
      type: String,
      default: '',
    },
  },
  emits: [
    'select',
    'toggle-expand',
    'add-child',
    'move-up',
    'move-down',
    'delete',
    'drag-start',
    'drop-reorder',
    'hover-enter',
    'hover-leave',
  ],
  computed: {
    cid(): string {
      return this.node.getAttribute('c-id') || '';
    },
    isExpanded(): boolean {
      if (this.expandedMap[this.cid] !== undefined) {
        return this.expandedMap[this.cid];
      }
      return this.depth < 3;
    },
    elementChildren(): VirtualNode[] {
      return this.node.childNodes.filter((c) => c.tagName !== '#text');
    },
    hasElementChildren(): boolean {
      return this.elementChildren.length > 0;
    },
    isContainer(): boolean {
      const tag = this.node.tagName?.toLowerCase() || '';
      return (
        this.hasElementChildren ||
        ['div', 'section', 'pagea4', 'pagea5', 'form', 'table', 'tbody', 'thead', 'tr', 'ul', 'ol'].includes(tag)
      );
    },
    isSearchMatched(): boolean {
      if (!this.searchQuery || !this.searchQuery.trim()) return false;
      const q = this.searchQuery.toLowerCase();
      const tag = this.node.tagName?.toLowerCase() || '';
      const text = this.node.textContent?.toLowerCase() || '';
      const vModel = (this.node.getAttribute('v-model') || '').toLowerCase();
      return tag.includes(q) || text.includes(q) || vModel.includes(q);
    },
    tagTypeClass(): string {
      const tag = this.node.tagName;
      if (/^[A-Z]/.test(tag) || tag.includes('-')) {
        return 'comp';
      }
      const lower = tag.toLowerCase();
      if (['div', 'section', 'form', 'table', 'tr', 'td', 'ul', 'ol'].includes(lower)) {
        return 'con';
      }
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'strong', 'button', 'hr', 'br', 'input'].includes(lower)) {
        return 'elt';
      }
      return 'txt';
    },
    nodePreview(): string {
      const attrs = this.node.attributes || {};
      if (attrs.label) return attrs.label;
      if (attrs['v-model']) return `⇄ ${attrs['v-model']}`;
      if (this.node.textContent?.trim()) {
        const t = this.node.textContent.trim();
        return t.length > 25 ? t.slice(0, 25) + '...' : t;
      }
      const textChild = this.node.childNodes.find((c) => c.tagName === '#text');
      if (textChild?.textContent?.trim()) {
        const t = textChild.textContent.trim();
        return t.length > 25 ? t.slice(0, 25) + '...' : t;
      }
      return '';
    },
  },
  methods: {
    onDragStart(e: DragEvent) {
      e.stopPropagation();
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', `tree-node:${this.cid}`);
        e.dataTransfer.effectAllowed = 'move';
      }
      this.$emit('drag-start', this.cid);
    },
    onDragOver(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit('drop-reorder', {
        targetCid: this.cid,
        hoverOnly: true,
      });
    },
    onDragLeave() {
      this.$emit('drop-reorder', {
        targetCid: null,
        hoverOnly: true,
      });
    },
    onDrop(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      const raw = e.dataTransfer?.getData('text/plain');
      this.$emit('drop-reorder', {
        targetCid: this.cid,
        rawData: raw,
      });
    },
    onDropInside(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      const raw = e.dataTransfer?.getData('text/plain');
      this.$emit('drop-reorder', {
        targetParentCid: this.cid,
        rawData: raw,
      });
    },
  },
});
</script>

<style scoped>
.tree-node-wrapper {
  display: flex;
  flex-direction: column;
}

.tree-row {
  height: 28px;
  display: flex;
  align-items: center;
  padding-right: 6px;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  user-select: none;
  border-left: 2px solid transparent;
  gap: 3px;
}

.tree-row:hover {
  background: #1e293b;
}

.tree-row.selected {
  background: rgba(2, 136, 209, 0.25) !important;
  border-left-color: #0288d1;
}

.tree-row.highlighted {
  background: rgba(251, 191, 36, 0.12);
}

.tree-row.dragging {
  opacity: 0.35;
}

.tree-row.drop-target-row {
  position: relative;
  box-shadow: inset 0 2px 0 #38bdf8;
  background: rgba(56, 189, 248, 0.18);
}

.tree-row.drop-target-row::before {
  content: '';
  position: absolute;
  left: 2px;
  top: -3px;
  width: 6px;
  height: 6px;
  background: #38bdf8;
  border-radius: 50%;
  box-shadow: 0 0 6px #38bdf8;
}

.tree-toggle {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #64748b;
  font-size: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: color 0.1s;
}

.tree-toggle:hover {
  color: #f8fafc;
}

.tree-toggle-spacer {
  width: 16px;
  flex-shrink: 0;
}

.node-tag {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 10.5px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 4px;
  flex-shrink: 0;
  line-height: 1.3;
}

.node-tag.comp {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.15);
  border: 1px solid rgba(96, 165, 250, 0.25);
}

.node-tag.con {
  color: #fb923c;
  background: rgba(251, 146, 60, 0.15);
  border: 1px solid rgba(251, 146, 60, 0.25);
}

.node-tag.elt {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.15);
  border: 1px solid rgba(251, 191, 36, 0.25);
}

.node-tag.txt {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.15);
  border: 1px solid rgba(192, 132, 252, 0.25);
}

.node-count {
  font-size: 9.5px;
  color: #94a3b8;
  background: #1e293b;
  padding: 0 4px;
  border-radius: 10px;
  flex-shrink: 0;
  font-weight: 600;
  border: 1px solid #334155;
}

.node-preview {
  font-size: 11px;
  color: #cbd5e1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
  padding-left: 2px;
}

.row-actions {
  display: none;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(6px);
  padding: 1px 3px;
  border-radius: 4px;
  border: 1px solid #334155;
}

.tree-row:hover .row-actions {
  display: flex;
}

.row-btn {
  width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  border-radius: 3px;
  color: #94a3b8;
  font-size: 9.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
}

.row-btn:hover {
  background: #334155;
  color: #f8fafc;
}

.row-btn.del:hover {
  background: rgba(248, 113, 113, 0.25);
  color: #f87171;
}

.tree-children {
  margin-left: 0;
}

.nested-drop-hint {
  height: 20px;
  margin: 2px 6px 4px 14px;
  border: 1px dashed #334155;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 10px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.12s;
}

.nested-drop-hint:hover {
  border-color: #38bdf8;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.05);
}
</style>

