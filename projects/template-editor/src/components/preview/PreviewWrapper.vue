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
      template: `<PageA4 style="padding: 3mm 15mm 3mm 15mm;" c-name="PageA4" c-id="ngk54ac">
  <div c-name="div" c-id="d25qofp">{{ data.name }}</div>
  <p c-name="p" c-id="biv1e2e">Tuổi: {{ data.age }}</p>
  <Textarea v-model="data.name" label="Họ và tên:" :line="true"
    :suffix="{ length: 1, char: '❤️' }" c-name="Textarea" c-id="qcbffl6" />
  <Textarea v-model="data.age" label="Tuổi:" :line="true" c-name="Textarea"
    c-id="55w05t2" />
  <InputOTP v-model="data.age" :maskLength="[1,1,1]" pad-start="0"
    c-name="InputOTP" c-id="s0li5xj" />
</PageA4>`
    }
  }
}
</script>
