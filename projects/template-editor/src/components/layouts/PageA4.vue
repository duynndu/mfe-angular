<template>
  <div
    class="page-a4"
    :class="{ 'landscape': landscape }"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
  name: 'PageA4',
  props: {
    style: {
      type: [Object, String] as PropType<Record<string, string> | string>,
      default: () => ({'padding': ''}),
    },
    landscape: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.page-a4 {
  font-family: 'Times New Roman', Times, serif;
  width: 210mm;
  height: 297mm;
  background: white;
  box-sizing: border-box;
  margin: 10px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.page-a4.landscape {
  width: 297mm;
  height: 210mm;
}

@media print {
  .page-a4 {
    margin: 0;
    box-shadow: none;
  }
}
</style>
