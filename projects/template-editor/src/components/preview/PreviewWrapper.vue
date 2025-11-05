<template>
  <Preview v-model:template="template" :data="data"/>
  <!-- <Codemirror v-model:value="template" :options="{ mode: 'text/html', theme: 'default', tabSize: 2 }" height="400px" :border="true" /> -->
</template>

<script lang="ts">
import Preview from './Preview.vue';
import "codemirror/mode/htmlmixed/htmlmixed.js"
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

export default {
  name: 'PreviewWrapper',
  components: { Preview },
  data() {
    return {
      data: { },
      template: ''
    }
  }
}
</script>
