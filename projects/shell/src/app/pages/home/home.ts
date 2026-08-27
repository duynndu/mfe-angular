import { Component, ViewChild } from '@angular/core';
import { TemplateEditor } from '../../components/template-editor/template-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shell-home',
  imports: [FormsModule, TemplateEditor],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  template = `<PageA4 style="padding:3mm 15mm" c-name="PageA4" c-id="u30lyv7">
  <div style="margin-top: 15px; padding: 10px 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;" c-name="div" c-id="ip_box_1">
    <b style="color: #1e40af;" c-name="b" c-id="ip_title_1">🌐 Địa chỉ IP (Lấy từ API qua top-level await):</b>
    <span style="color: #2563eb; font-weight: bold; margin-left: 8px; font-size: 15px;" c-name="span" c-id="ip_val_1">{{ data.ip || 'Đang tải IP...' }}</span>
  </div>
  <div c-name="div" c-id="5wz82b0">
    <b c-name="b" c-id="z7ton81">Textarea</b>
  </div>
  <Textarea v-model="data.name" label="Họ và tên:" line :suffix="{ length:1, char:'❤️' }" c-name="Textarea"
    c-id="oqtwc4d" path="data.name" path-suffix="{ length:1, char:'❤️' }" />
  <div c-name="div" c-id="gszdea8">
    <b c-name="b" c-id="yukgkqs">InputOTP</b>
  </div>
  <InputOTP v-model="data.age" :mask-length="[1,1,1]" pad-start="0" c-name="InputOTP" c-id="kdp07ck" path="data.age"
    path-mask-length="[1,1,1]" />
  <div c-name="div" c-id="ri82mdl">
    <b c-name="b" c-id="86q3zv5">Select one</b>
  </div>
  <Select v-model="data.category" label="Danh mục:" placeholder="Chọn danh mục" bind-label="name" bind-value="id"
    :items="categoryList" c-name="Select" c-id="r33jcxf" path="data.category" path-items="categoryList" />
  <div c-name="div" c-id="1aqqwln">
    <b c-name="b" c-id="bwz68li">Select multiple</b>
  </div>
  <Select v-model="data.tags" label="Tags:" placeholder="Chọn tags" bind-label="label" bind-value="value"
    :items="tagList" multiple c-name="Select" c-id="9d3o1sm" path="data.tags" path-items="tagList" />
  <div style="color:#0066cc" c-name="div" c-id="047rhv3">Tags đã chọn
    {{ data.tags }}
  </div>
  <div c-name="div" c-id="ctxhdr01" style="margin-top: 10px;">
    <b c-name="b" c-id="ctxhdr02">
      <i class="fa fa-mouse-pointer" style="color: #0066cc; margin-right: 6px;" c-name="i" c-id="ctxhdricon"></i>
      Directive v-context-menu với contextItems
    </b>
  </div>
  <ContextMenu ref="itemMenu" c-name="ContextMenu" c-id="ctxm01">
    <template #default="{ subject }">
      <li style="padding: 8px 14px; cursor: pointer; color: #333; display: flex; align-items: center;" c-name="li"
        c-id="ctxli01">
        <i class="fa fa-info-circle" style="color: #0066cc; margin-right: 8px;" c-name="i" c-id="ctxliicon"></i>
        Menu cho: <b style="margin-left: 4px;" c-name="b" c-id="ctxb01">{{ subject?.label }}</b> (ID: {{ subject?.id }})
      </li>
    </template>
  </ContextMenu>
  <div v-for="item in contextItems" :key="item.id" v-context-menu:itemMenu="item"
    style="padding: 10px 14px; margin: 6px 0; background: #f8fafc; border: 1px dashed #0066cc; border-radius: 6px; cursor: context-menu; display: flex; align-items: center;"
    c-name="div" c-id="ctxitemdiv">
    <i class="fa fa-hand-pointer-o" style="color: #0066cc; margin-right: 10px;" c-name="i" c-id="itemicon"></i>
    <span>Click chuột phải vào đây: <b c-name="b" c-id="itemb">{{ item.label }}</b></span>
  </div>
  <div c-name="div" c-id="tjwsub8">
    <b c-name="b" c-id="o9mo28j">DatePicker - Chọn ngày sinh</b>
  </div>
  <DatePicker v-model="data.birthday" placeholder="Chọn ngày sinh" format="DD/MM/YYYY" c-name="DatePicker"
    c-id="y366dko" path="data.birthday" />
  <div style="color:#0066cc" c-name="div" c-id="8zkactw">Ngày sinh đã chọn:<b c-name="b" c-id="5joniyw">{{ data.birthday
      }}</b>
  </div>
  <div c-name="div" c-id="aknsmdv">
    <b c-name="b" c-id="ognk3qp">DatePicker - Định dạng chữ</b>
  </div>
  <DatePicker v-model="data.birthdayText" placeholder="DD tháng MM năm YYYY" format="DD [tháng] MM [năm] YYYY"
    c-name="DatePicker" c-id="4cp28lw" path="data.birthdayText" />
  <div style="color:#0066cc" c-name="div" c-id="mgbravx">Giá trị:<b c-name="b" c-id="btvfoao">{{ data.birthdayText
      }}</b>
  </div>
  <div c-name="div" c-id="sbxot28">
    <b c-name="b" c-id="ilxg1be">DatePicker (datetime) - Giờ hẹn</b>
  </div>
  <DatePicker v-model="data.appointment" mode="datetime" placeholder="Chọn ngày giờ" format="HH:mm DD/MM/YYYY"
    :minute-step="15" c-name="DatePicker" c-id="e6dqk7f" path="data.appointment" path-minute-step="15" />
  <div style="color:#0066cc" c-name="div" c-id="q74v2xs">Ngày giờ đã chọn:<b c-name="b" c-id="55xc88a">{{
      data.appointment }}</b>
  </div>
  <div c-name="div" c-id="82rm20p">
    <b c-name="b" c-id="po0ikwz">Checkbox - Size</b>
  </div>
  <Checkbox v-model="data.sizeTest" value="small" beforeText="[sm]" afterText="Small" size="sm" c-name="Checkbox"
    c-id="u9uayx1" path="data.sizeTest" />
  <Checkbox v-model="data.sizeTest" value="medium" beforeText="[md]" afterText="Medium" size="md" c-name="Checkbox"
    c-id="e673tj4" path="data.sizeTest" />
  <Checkbox v-model="data.sizeTest" value="large" beforeText="[lg]" afterText="Large" size="lg" c-name="Checkbox"
    c-id="qdqk80l" path="data.sizeTest" />
  <Checkbox v-model="data.sizeTest" value="xlarge" beforeText="[xl]" afterText="X-Large" size="xl" c-name="Checkbox"
    c-id="9hd0m1l" path="data.sizeTest" />
  <div style="color:#0066cc" c-name="div" c-id="okpshd8">Giá trị:<b c-name="b" c-id="korldbv">{{ data.sizeTest }}</b>
  </div>
  <div c-name="div" c-id="uxuwmt4">
    <b c-name="b" c-id="318h0k7">Paint - Chữ ký</b>
  </div>
  <Paint style="width:400px; height:150px;" v-model="data.signature"
    src="https://fastly.picsum.photos/id/237/250/250.jpg?hmac=tNmO3YWXALG9JM81cghI9nflo3dWc3e5vlNsf_jmKWw"
    c-name="Paint" c-id="hq1vub8" path="data.signature" />
  <div v-if="data.signature" c-name="div" c-id="8gswa5w">
    <div c-name="div" c-id="ozfucom">Ảnh đã lưu:</div><img :src="data.signature" alt="signature"
      style="max-width:200px;border:1px solid #ccc;" c-name="img" c-id="x7lifom" path-src="data.signature" />
  </div>
</PageA4>`;

  script = `// 📜 Khởi tạo state và logic tính toán truyền từ Angular
try {
  data.ip = await (await fetch('https://api.ipify.org')).text();
} catch (e) {
  data.ip = 'Lỗi tải IP: ' + e.message;
}

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
  categoryList,
  tagList,
  contextItems
};`;

  data: any = { name: 'duynnz1', ip: '' };
  editMode = true;
}
