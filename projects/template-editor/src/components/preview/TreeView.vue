<template>
  <ul class="tree-view">
    <template v-if="Array.isArray(data)">
      <TreeView v-for="(item, idx) in data" :key="idx" :data="item" />
    </template>

    <template v-else>
      <template v-for="(value, key) in filteredEntries(data)" :key="key">
        
        <!-- COMMENT -->
        <li v-if="key === '#comment'">
          <span class="tree-comment">&lt;!-- {{ value }} --&gt;</span>
        </li>

        <!-- TEXT -->
        <li v-else-if="key === '#text'">
          <span class="tree-value">{{ value }}</span>
        </li>

        <!-- ARRAY -->
        <li v-else-if="Array.isArray(value)">
          <div v-for="(item, idx) in value" :key="idx">
            <span class="tree-key">
              <span @click="toggle(String(key) + idx)" class="arrow" :class="{ open: isOpen(String(key) + idx) }">▶</span>
              &lt;{{ key }}{{ formatAttrs(item) }}&gt;
            </span>

            <template v-if="isOpen(String(key) + idx)">
              <TreeView :data="item" />
              <span class="tree-key">&lt;/{{ key }}&gt;</span>
            </template>

            <template v-else>
              <div class="tree-key">&lt;/{{ key }}&gt;</div>
            </template>
          </div>
        </li>

        <!-- OBJECT -->
        <li v-else-if="isObject(value)">
          <template v-if="Object.keys(value).length === 0">
            <span class="tree-key">
              &lt;{{ key }}{{ formatAttrs(value) }}/&gt;
            </span>
          </template>

          <template v-else-if="value['#text'] && Object.keys(value).length === 1">
            <span class="tree-key">
              &lt;{{ key }}{{ formatAttrs(value) }}&gt;
            </span>
            <span class="tree-value">{{ value['#text'] }}</span>
            <span class="tree-key">&lt;/{{ key }}&gt;</span>
          </template>

          <template v-else>
            <span class="tree-key">
              <span @click="toggle(key)" class="arrow" :class="{ open: isOpen(key) }">▶</span>
              &lt;{{ key }}{{ formatAttrs(value) }}&gt;
            </span>

            <template v-if="isOpen(key)">
              <TreeView :data="value" />
              <span class="tree-key">&lt;/{{ key }}&gt;</span>
            </template>

            <template v-else>
              <div class="tree-key">&lt;/{{ key }}&gt;</div>
            </template>
          </template>
        </li>

        <!-- VALUE -->
        <li v-else>
          <span class="tree-key">&lt;{{ key }}&gt;</span>
          <span class="tree-value">{{ value }}</span>
          <span class="tree-key">&lt;/{{ key }}&gt;</span>
        </li>

      </template>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  name: "TreeView",
  props: {
    data: { type: [Object, Array], required: true },
  },
  setup(props) {
    const openKeys = ref<Record<string, boolean>>({});

    const isObject = (val: any) =>
      val && typeof val === "object" && !Array.isArray(val);

    // Recursively collect all keys for open state
    function collectKeys(obj: any, prefix = ""): string[] {
      if (!obj || typeof obj !== "object") return [];
      let keys: string[] = [];
      for (const [key, value] of Object.entries(obj)) {
        if (key === "@attributes") continue;
        if (Array.isArray(value)) {
          value.forEach((item, idx) => {
            keys.push(prefix + key + idx);
            keys = keys.concat(collectKeys(item, prefix + key + idx));
          });
        } else if (isObject(value)) {
          keys.push(prefix + key);
          keys = keys.concat(collectKeys(value, prefix + key));
        }
      }
      return keys;
    }

    // Set all keys to open
    function openAllKeys(data: any) {
      const allKeys = collectKeys(data);
      const openObj: Record<string, boolean> = {};
      allKeys.forEach(k => { openObj[k] = true; });
      openKeys.value = openObj;
    }

    // Watch for data changes to open all
    watch(() => props.data, (val) => {
      openAllKeys(val);
    }, { immediate: true, deep: true });

    const isOpen = (key: string | number) => openKeys.value[String(key)];

    const toggle = (key: string | number) => {
      const k = String(key);
      openKeys.value[k] = !openKeys.value[k];
    };

    const formatAttrs = (obj: any) => {
      if (!obj || !obj['@attributes']) return '';
      return ' ' + Object.entries(obj['@attributes'])
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
    };


    const filteredEntries = (obj: any): Record<string, any> | any[] => {
      if (!obj || typeof obj !== 'object') return {};
      return Object.fromEntries(
        Object.entries(obj).filter(([key]) => key !== '@attributes')
      );
    };

    return { isObject, isOpen, toggle, formatAttrs, filteredEntries };
  },
});
</script>

<style scoped>
.tree-view {
  list-style: none;
  padding-left: 18px;
  font-family: monospace;
}

.tree-key {
  color: #8e24aa;
}

.tree-value {
  color: #333;
}

.arrow {
  cursor: pointer;
  user-select: none;
  display: inline-block;
  width: 1em;
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(90deg);
}

.tree-comment {
  color: green;
}
</style>