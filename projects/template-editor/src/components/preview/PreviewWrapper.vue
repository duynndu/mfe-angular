<template>
  <Preview
    v-model:template="template"
    v-model:script="script"
    :context="context"
    v-model:editMode="editMode"
  />
</template>

<script lang="ts">
import Preview from './Preview.vue';
import "codemirror/mode/htmlmixed/htmlmixed.js"
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
// @ts-ignore - import raw HTML template
import defaultTemplate from './default-template.html?raw';

export default {
  name: 'PreviewWrapper',
  components: { Preview },
  data() {
    return {
      editMode: true,
      template: defaultTemplate,
      script: `// 📜 Khởi tạo state từ $context.data truyền từ Angular
const data = reactive($context.data || {});

// 🌐 Top-Level Await: Lấy địa chỉ IP trực tiếp trong Script!
try {
  const res = await fetch('https://api.ipify.org');
  data.ip = await res.text();
} catch (e) {
  data.ip = 'Lỗi tải IP: ' + e.message;
}

// Computed: Tự động chuyển đổi họ tên sang chữ in hoa
const uppername = computed(() => {
  return (data.name || '').toUpperCase();
});

// Danh mục và Tags
const categoryList = [
  { id: 'tech', name: 'Công Nghệ (Tech)' },
  { id: 'business', name: 'Kinh Doanh (Business)' },
  { id: 'other', name: 'Khác (Other)' }
];

const tagList = [
  { value: 'vue', label: 'Vue 3' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'react', label: 'React' }
];

const contextItems = [
  { id: 1, label: 'Bệnh án Ngoại trú #1' },
  { id: 2, label: 'Bệnh án Nội trú #2' },
  { id: 3, label: 'Giấy ra viện #3' }
];

return {
  data,
  categoryList,
  tagList,
  contextItems,
  uppername
};`,
      context: {
        data: {
          name: "Nguyễn Văn An",
          age: "35",
          birthday: "15/08/1990",
          address: "Số 123 Đường Giải Phóng, Quận Đống Đa, TP. Hà Nội",
          workplace: "Kỹ sư phần mềm - Công ty Công nghệ FPT",
          reason: "Đau tức ngực trái âm ỉ kèm khó thở nhẹ khi gắng sức trong 3 ngày qua",
          history: "Tăng huyết áp nhẹ cách đây 2 năm, điều trị không liên tục. Không có tiền sử dị ứng thuốc.",
          familyHistory: "Bố có tiền sử bệnh lý tim mạch, mẹ khỏe mạnh.",
          clinicalProcess: "Bệnh khởi phát cách đây 3 ngày với cảm giác nặng ngực sau xương ức, lan nhẹ lên vai trái. Cơn đau kéo dài khoảng 10-15 phút, xuất hiện chủ yếu khi đi bộ nhanh hoặc leo cầu thang, giảm khi nghỉ ngơi.",
          generalExam: "Bệnh nhân tỉnh táo, tiếp xúc tốt. Da niêm mạc hồng, không phù, không xuất huyết dưới da. Tuyến giáp không to, hạch ngoại vi không sờ thấy. Huyết áp: 135/85 mmHg, Mạch: 78 lần/phút.",
          organExam: "Tim đều, T1 T2 rõ, không nghe tiếng thổi bệnh lý. Phổi thông khí đều 2 bên, không rale. Bụng mềm, gan lách không to. Các cơ quan khác chưa ghi nhận bất thường.",
          labSummary: "Điện tâm đồ (ECG): Nhịp xoang đều, ST chênh xuống nhẹ ở V5, V6. Siêu âm tim: Chức năng tâm thu thất trái bảo tồn (EF = 62%), không rối loạn vận động vùng.",
          diagnosis: "Cơn đau thắt ngực ổn định (CCS II) / Tăng huyết áp độ 1",
          treatment: "Aspirin 81mg x 1 viên/ngày (uống sau ăn sáng)\nBisoprolol 2.5mg x 1 viên/ngày (uống sáng)\nAtorvastatin 20mg x 1 viên/ngày (uống tối)",
          doctorAdvice: "Nghỉ ngơi hợp lý, tránh lao động nặng và căng thẳng. Ăn giảm muối, hạn chế dầu mỡ. Tái khám sau 2 tuần hoặc ngay khi cơn đau ngực tăng nặng.",
          tags: ['vue', 'typescript'],
          category: 'tech',
          gender: 'male',
          sizeTest: 'large',
          birthdayText: '',
          appointment: '',
          signature: '',
          doctorSignature: ''
        }
      }
    };
  }
};
</script>
