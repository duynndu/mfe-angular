import{P as s,_ as l,r as d,c as g,o as h,a as m,W as p,Q as u}from"./vue3-context-menu-Bp-KI9zR.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const v=`<PageA4 style="padding:3mm 15mm">
  <div
    style="margin-top: 15px; padding: 10px 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;">
    <b style="color: #1e40af;">🌐 Địa chỉ IP (Lấy
      từ API qua top-level await):</b>
    <span style="color: #2563eb; font-weight: bold; margin-left: 8px; font-size: 15px;">{{ data.ip || 'Đang tải IP...'
      }}</span>
  </div>
  <div>
    <b>Textarea</b>
  </div>
  <Textarea v-model="data.name" label="Họ và tên:" line :suffix="{ length:1, char:'❤️' }" />
  <div style="color: #0284c7; font-size: 13px; margin-top: 2px;"> Tên in hoa (Computed từ Script): <b>{{ uppername
      }}</b>
  </div>
  <div>
    <b>InputOTP</b>
  </div>
  <InputOTP v-model="data.age" :mask-length="[1,1,1]" pad-start="0" />
  <div>
    <b>Select one</b>
  </div>
  <Select v-model="data.category" label="Danh mục:" placeholder="Chọn danh mục" bind-label="name" bind-value="id"
    :items="categoryList" />
  <div>
    <b>Select multiple</b>
  </div>
  <Select v-model="data.tags" label="Tags:" placeholder="Chọn tags" bind-label="label" bind-value="value"
    :items="tagList" multiple />
  <div style="color:#0066cc">Tags đã chọn
    {{ data.tags }}</div>
  <div style="margin-top: 10px;">
    <b>
      <i class="fa fa-mouse-pointer" style="color: #0066cc; margin-right: 6px;"></i> Directive v-context-menu với
      contextItems
    </b>
  </div>
  <ContextMenu ref="itemMenu">
    <template #default="{ subject }">
      <li style="padding: 8px 14px; cursor: pointer; color: #333; display: flex; align-items: center;">
        <i class="fa fa-info-circle" style="color: #0066cc; margin-right: 8px;"></i> Menu cho: <b
          style="margin-left: 4px;">
          {{ subject?.label }}</b> (ID: {{ subject?.id }})
      </li>
    </template>
  </ContextMenu>
  <div v-for="item in contextItems" :key="item.id" v-context-menu:itemMenu="item"
    style="padding: 10px 14px; margin: 6px 0; background: #f8fafc; border: 1px dashed #0066cc; border-radius: 6px; cursor: context-menu; display: flex; align-items: center;">
    <i class="fa fa-hand-pointer-o" style="color: #0066cc; margin-right: 10px;"></i>
    <span>Click chuột phải vào đây: <b>{{ item.label }}</b>
    </span>
  </div>
  <div>
    <b>DatePicker - Chọn ngày sinh</b>
  </div>
  <DatePicker v-model="data.birthday" placeholder="Chọn ngày sinh" format="DD/MM/YYYY" />
  <div style="color:#0066cc">Ngày sinh đã chọn:<b>{{ data.birthday }}</b>
  </div>
  <div>
    <b>DatePicker - Định dạng chữ</b>
  </div>
  <DatePicker v-model="data.birthdayText" placeholder="DD tháng MM năm YYYY" format="DD [tháng] MM [năm] YYYY" />
  <div style="color:#0066cc">Giá trị:<b>{{ data.birthdayText }}</b>
  </div>
  <div>
    <b>DatePicker (datetime) - Giờ hẹn</b>
  </div>
  <DatePicker v-model="data.appointment" mode="datetime" placeholder="Chọn ngày giờ" format="HH:mm DD/MM/YYYY"
    :minute-step="15" />
  <div style="color:#0066cc">Ngày giờ đã chọn:<b>{{ data.appointment }}</b>
  </div>
  <div>
    <b>Checkbox - Size</b>
  </div>
  <Checkbox v-model="data.sizeTest" value="small" beforeText="[sm]" afterText="Small" size="sm" />
  <Checkbox v-model="data.sizeTest" value="medium" beforeText="[md]" afterText="Medium" size="md" />
  <Checkbox v-model="data.sizeTest" value="large" beforeText="[lg]" afterText="Large" size="lg" />
  <Checkbox v-model="data.sizeTest" value="xlarge" beforeText="[xl]" afterText="X-Large" size="xl" />
  <div style="color:#0066cc">Giá trị:<b>{{ data.sizeTest }}</b>
  </div>
  <div>
    <b>Paint - Chữ ký</b>
  </div>
  <Paint style="width:400px; height:150px;" v-model="data.signature"
    src="https://fastly.picsum.photos/id/237/250/250.jpg?hmac=tNmO3YWXALG9JM81cghI9nflo3dWc3e5vlNsf_jmKWw" />
  <div v-if="data.signature">
    <div>Ảnh đã lưu:</div><img :src="data.signature" alt="signature" style="max-width:200px;border:1px solid #ccc;" />
  </div>
</PageA4>`,b={name:"PreviewWrapper",components:{Preview:s},data(){return{editMode:!0,template:v,script:`// 📜 Khởi tạo state từ $context.data truyền từ Angular
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
};`,context:{data:{name:"Nguyễn Văn An",age:"35",birthday:"15/08/1990",address:"Số 123 Đường Giải Phóng, Quận Đống Đa, TP. Hà Nội",workplace:"Kỹ sư phần mềm - Công ty Công nghệ FPT",reason:"Đau tức ngực trái âm ỉ kèm khó thở nhẹ khi gắng sức trong 3 ngày qua",history:"Tăng huyết áp nhẹ cách đây 2 năm, điều trị không liên tục. Không có tiền sử dị ứng thuốc.",familyHistory:"Bố có tiền sử bệnh lý tim mạch, mẹ khỏe mạnh.",clinicalProcess:"Bệnh khởi phát cách đây 3 ngày với cảm giác nặng ngực sau xương ức, lan nhẹ lên vai trái. Cơn đau kéo dài khoảng 10-15 phút, xuất hiện chủ yếu khi đi bộ nhanh hoặc leo cầu thang, giảm khi nghỉ ngơi.",generalExam:"Bệnh nhân tỉnh táo, tiếp xúc tốt. Da niêm mạc hồng, không phù, không xuất huyết dưới da. Tuyến giáp không to, hạch ngoại vi không sờ thấy. Huyết áp: 135/85 mmHg, Mạch: 78 lần/phút.",organExam:"Tim đều, T1 T2 rõ, không nghe tiếng thổi bệnh lý. Phổi thông khí đều 2 bên, không rale. Bụng mềm, gan lách không to. Các cơ quan khác chưa ghi nhận bất thường.",labSummary:"Điện tâm đồ (ECG): Nhịp xoang đều, ST chênh xuống nhẹ ở V5, V6. Siêu âm tim: Chức năng tâm thu thất trái bảo tồn (EF = 62%), không rối loạn vận động vùng.",diagnosis:"Cơn đau thắt ngực ổn định (CCS II) / Tăng huyết áp độ 1",treatment:`Aspirin 81mg x 1 viên/ngày (uống sau ăn sáng)
Bisoprolol 2.5mg x 1 viên/ngày (uống sáng)
Atorvastatin 20mg x 1 viên/ngày (uống tối)`,doctorAdvice:"Nghỉ ngơi hợp lý, tránh lao động nặng và căng thẳng. Ăn giảm muối, hạn chế dầu mỡ. Tái khám sau 2 tuần hoặc ngay khi cơn đau ngực tăng nặng.",tags:["vue","typescript"],category:"tech",gender:"male",sizeTest:"large",birthdayText:"",appointment:"",signature:"",doctorSignature:""}}}}};function y(c,n,o,r,e,t){const i=d("Preview");return h(),g(i,{template:e.template,"onUpdate:template":n[0]||(n[0]=a=>e.template=a),script:e.script,"onUpdate:script":n[1]||(n[1]=a=>e.script=a),context:e.context,editMode:e.editMode,"onUpdate:editMode":n[2]||(n[2]=a=>e.editMode=a)},null,8,["template","script","context","editMode"])}const x=l(b,[["render",y]]);m(x).use(p).use(u).mount("#app");
