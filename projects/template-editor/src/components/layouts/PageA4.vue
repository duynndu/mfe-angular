<template>
  <div class="page-a4" :style="style">
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
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.page-a4 {
  font-family: 'Times New Roman', Times, serif;
  width: 210mm;
  height: 297mm;
  padding: 3mm 15mm 3mm 15mm;
  background: white;
  box-sizing: border-box;
  margin: 10px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

@media print {
  .page-a4 {
    margin: 0;
    box-shadow: none;
  }
}
</style>
