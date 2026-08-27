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
          tags: ['vue', 'typescript' ],
          category: 'tech',
          gender: 'male',
          sizeTest: 'large',
          birthdayText: '',
          appointment: '',
          signature: '',
          doctorSignature: ''
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
