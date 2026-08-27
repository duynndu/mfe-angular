<template>
  <DatePickerPortal />
  <Preview
    v-model:template="template"
    v-model:script="script"
    v-model:editMode="editMode"
  />
</template>

<script lang="ts">
import Preview from './Preview.vue';
import "codemirror/mode/htmlmixed/htmlmixed.js"
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import DatePickerPortal from '../forms/DatePickerPortal.vue';
// @ts-ignore - import raw HTML template
import defaultTemplate from './default-template.html?raw';

export default {
  name: 'PreviewWrapper',
  components: { Preview, DatePickerPortal },
  data() {
    return {
      editMode: true,
      template: defaultTemplate,
      script: `// Khởi tạo state phản ứng cho Template biểu mẫu
const data = reactive({
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
  treatment: "Aspirin 81mg x 1 viên/ngày (uống sau ăn sáng)\\nBisoprolol 2.5mg x 1 viên/ngày (uống sáng)\\nAtorvastatin 20mg x 1 viên/ngày (uống tối)",
  doctorAdvice: "Nghỉ ngơi hợp lý, tránh lao động nặng và căng thẳng. Ăn giảm muối, hạn chế dầu mỡ. Tái khám sau 2 tuần hoặc ngay khi cơn đau ngực tăng nặng.",
  tags: ['vue', 'typescript'],
  category: 'tech',
  gender: 'male',
  sizeTest: 'large',
  birthdayText: '',
  appointment: '',
  signature: '',
  doctorSignature: ''
});

const categoryList = [
  { id: 'tech', name: 'Công Nghệ' },
  { id: 'business', name: 'Kinh Doanh' },
  { id: 'other', name: 'Khác' }
];

const tagList = [
  { value: 'vue', label: 'Vue' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'react', label: 'React' }
];

const contextItems = [
  { id: 1, label: 'Hàng số 1' },
  { id: 2, label: 'Hàng số 2' },
  { id: 3, label: 'Hàng số 3' }
];

// Computed: Tự động viết hoa tên bệnh nhân
const upperName = computed(() => (data.name || '').toUpperCase());

// Computed: Tự động trích xuất năm sinh từ ngày sinh
const birthYear = computed(() => {
  if (!data.birthday) return '';
  const parts = data.birthday.split('/');
  return parts.length === 3 ? parts[2] : '';
});

// Phương thức thao tác dữ liệu
function makeUppercase() {
  data.name = (data.name || '').toUpperCase();
}

return {
  data,
  categoryList,
  tagList,
  contextItems,
  upperName,
  birthYear,
  makeUppercase
};`
    };
  }
};
</script>
