<template>
  <div
    class="page-a5"
    :class="{ 'landscape': landscape }"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
  name: 'PageA5',
  props: {
    style: {
      type: [Object, String] as PropType<Record<string, string> | string>,
      default: () => ({}),
    },
    landscape: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.page-a5 {
  font-family: 'Times New Roman', Times, serif;
  width: 148mm;
  height: 210mm;
  background: white;
  box-sizing: border-box;
  margin: 10px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.page-a5.landscape {
  width: 210mm;
  height: 148mm;
}

@media print {
  .page-a5 {
    margin: 0;
    box-shadow: none;
  }
}
</style>
