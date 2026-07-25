<template>
  <DatePickerPortal />
  <Preview v-model:template="template" v-model:editMode="editMode" :context="context" />
  <!-- <Codemirror v-model:value="template" :options="{ mode: 'text/html', theme: 'default', tabSize: 2 }" height="400px" :border="true" /> -->
</template>

<script lang="ts">
import Preview from './Preview.vue';
import "codemirror/mode/htmlmixed/htmlmixed.js"
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import DatePickerPortal from '../forms/DatePickerPortal.vue';
import moment from 'moment';
// @ts-ignore - import raw HTML template
import defaultTemplate from './default-template.html?raw';

export default {
  name: 'PreviewWrapper',
  components: { Preview, DatePickerPortal },
  data() {
    return {
      editMode: true,
      template: defaultTemplate,
      context: {
        moment: moment,
        log: console.log,
        onFieldChange: (path: string, value: any) => {
          console.log('Field changed:', path, value);
        },
        data: {
          name: "duynnz",
          age: "18",
          tags: ['vue', 'typescript' ],
          category: 'tech',
          gender: 'male',
          sizeTest: 'large',
          birthday: '',
          birthdayText: '',
          appointment: '',
          signature: ''
        },
        categoryList: [
          { id: 'tech', name: 'Công Nghệ' },
          { id: 'business', name: 'Kinh Doanh' },
          { id: 'other', name: 'Khác' }
        ],
        tagList: [
          { value: 'vue', label: 'Vue' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'tailwind', label: 'Tailwind' },
          { value: 'react', label: 'React' }
        ],
        contextItems: [
          { id: 1, label: 'Hàng số 1' },
          { id: 2, label: 'Hàng số 2' },
          { id: 3, label: 'Hàng số 3' }
        ]
      }
    }
  }
}
</script>
