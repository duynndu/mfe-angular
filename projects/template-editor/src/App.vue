<template>
  <Preview v-model:template="template" :data="data"/>
  <!-- <Codemirror v-model:value="template" :options="{ mode: 'text/html', theme: 'default', tabSize: 2 }" height="400px" :border="true" /> -->
</template>

<script lang="ts">
import Preview from './components/Preview.vue';
import "codemirror/mode/htmlmixed/htmlmixed.js"
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

export default {
  name: 'App',
  components: { Preview },
  data() {
    return {
      data: { name: 'Nguyen Van A', age: "30" },
      template: `<PageA4 style="padding: 3mm 15mm 3mm 15mm;">
  <div>{{ data.name }}</div>
  <p>Tuổi: {{ data.age }}</p>
  <Textarea
    v-model="data.name"
    label="Họ và tên:"
    :line="true"
    :suffix="{ length: 1, char: '❤️' }"
  />
  <Textarea
    v-model="data.age"
    label="Tuổi:"
    :line="true"
  />
  <InputOTP
    v-model="data.age"
    :maskLength="[1,1,1]"
    pad-start="0"
  />

</PageA4>`
    }
  }
}
</script>
