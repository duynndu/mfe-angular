<template>
  <div v-if="loading">Đang tải...</div>
  <div v-else class="xml-viewer-container">
    <TreeView v-if="parsedObject" :data="parsedObject" />
  </div>
</template>

<style scoped>
.xml-viewer-container {
  overflow-y: auto;
  max-height: 100%;
  border-radius: 6px;
  font-size: 15px;
  height: 100%;
  box-sizing: border-box;
  scrollbar-width: thin;
  width: 100%;
  max-width: 100%;
}
</style>



<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TreeView from './TreeView.vue';

export default defineComponent({
  name: 'XmlViewer',
  components: { TreeView },
  props: {
    url: { type: String, required: true }
  },
  setup(props) {
    const xmlContent = ref('');
    const parsedObject = ref<any>(null);
    const loading = ref(true);
    const error = ref('');

    function domToObj(node: Node): any {
      // Nếu là text node
      if (node.nodeType === 3) {
        const text = node.nodeValue?.trim();
        return text ? text : undefined;
      }
      // Nếu là element node
      if (node.nodeType === 1) {
        const obj: any = {};
        const el = node as Element;
        // Thuộc tính
        if (el.attributes && el.attributes.length > 0) {
          obj['@attributes'] = {};
          for (let attr of Array.from(el.attributes)) {
            obj['@attributes'][attr.name] = attr.value;
          }
        }
        // Child nodes
        for (let child of Array.from(node.childNodes)) {
          const childObj = domToObj(child);
          if (childObj === undefined) continue;
          if (child.nodeType === 3) {
            // text node
            if (!obj['#text']) obj['#text'] = '';
            obj['#text'] += childObj;
          } else if (child.nodeType === 1) {
            // element node
            const childEl = child as Element;
            const tag = childEl.tagName;
            if (!obj[tag]) obj[tag] = [];
            obj[tag].push(childObj);
          }
        }
        // Nếu chỉ có 1 phần tử trong mảng thì trả về object thay vì array
        for (let key in obj) {
          if (Array.isArray(obj[key]) && obj[key].length === 1) {
            obj[key] = obj[key][0];
          }
        }
        return obj;
      }
      return undefined;
    }

    const fetchXml = async () => {
      loading.value = true;
      error.value = '';
      try {
        const res = await fetch(props.url);
        if (!res.ok) throw new Error('Không thể tải XML');
        xmlContent.value = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent.value, 'text/xml');
        // Lấy node gốc
        const root = xmlDoc.documentElement;
        parsedObject.value = { [root.tagName]: domToObj(root) };
      } catch (e: any) {
        error.value = e.message || 'Lỗi không xác định';
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchXml);


    return { xmlContent, parsedObject, loading, error };
  }
});
</script>