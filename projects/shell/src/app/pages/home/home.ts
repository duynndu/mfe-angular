import { Component } from '@angular/core';
import { TemplateEditor } from '../../components/template-editor/template-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface TemplateItemConfig {
  id: string;
  name: string;
  badge: string;
  icon: string;
  description: string;
  template: string;
  script: string;
  context: any;
}

@Component({
  selector: 'app-shell-home',
  imports: [FormsModule, CommonModule, TemplateEditor],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  templates: TemplateItemConfig[] = [
    // =========================================================================
    // 📋 TEMPLATE 1: Demo Tổng Hợp Tất Cả Components (Page A4)
    // =========================================================================
    {
      id: 'demo-components',
      name: 'Demo Tổng hợp',
      badge: 'A4',
      icon: '📋',
      description: 'Trình diễn đầy đủ các component: PageA4, Textarea, OTP, Select, DatePicker, Checkbox, Paint, ContextMenu và Async Top-level Await',
      template: `<PageA4 style="padding:3mm 15mm" c-name="PageA4" c-id="u30lyv7">
  <div style="margin-top: 15px; padding: 10px 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;" c-name="div" c-id="ip_box_1">
    <b style="color: #1e40af;" c-name="b" c-id="ip_title_1">🌐 Địa chỉ IP (Lấy từ API qua top-level await):</b>
    <span style="color: #2563eb; font-weight: bold; margin-left: 8px; font-size: 15px;" c-name="span" c-id="ip_val_1">{{ data.ip || 'Đang tải IP...' }}</span>
  </div>
  <div c-name="div" c-id="5wz82b0">
    <b c-name="b" c-id="z7ton81">Textarea</b>
  </div>
  <Textarea v-model="data.name" label="Họ và tên:" line :suffix="{ length:1, char:'❤️' }" c-name="Textarea" c-id="oqtwc4d" />
  <div style="color: #0284c7; font-size: 13px; margin-top: 2px;" c-name="div" c-id="un_disp">
    Tên in hoa (Computed từ Script): <b c-name="b" c-id="un_val">{{ uppername }}</b>
  </div>
  <div c-name="div" c-id="gszdea8">
    <b c-name="b" c-id="yukgkqs">InputOTP</b>
  </div>
  <InputOTP v-model="data.age" :mask-length="[1,1,1]" pad-start="0" c-name="InputOTP" c-id="kdp07ck" />
  <div c-name="div" c-id="ri82mdl">
    <b c-name="b" c-id="86q3zv5">Select one</b>
  </div>
  <Select v-model="data.category" label="Danh mục:" placeholder="Chọn danh mục" bind-label="name" bind-value="id"
    :items="categoryList" c-name="Select" c-id="r33jcxf" />
  <div c-name="div" c-id="1aqqwln">
    <b c-name="b" c-id="bwz68li">Select multiple</b>
  </div>
  <Select v-model="data.tags" label="Tags:" placeholder="Chọn tags" bind-label="label" bind-value="value"
    :items="tagList" multiple c-name="Select" c-id="9d3o1sm" />
  <div style="color:#0066cc" c-name="div" c-id="047rhv3">Tags đã chọn: {{ data.tags }}</div>
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
  <DatePicker v-model="data.birthday" placeholder="Chọn ngày sinh" format="DD/MM/YYYY" c-name="DatePicker" c-id="y366dko" />
  <div style="color:#0066cc" c-name="div" c-id="8zkactw">Ngày sinh đã chọn: <b c-name="b" c-id="5joniyw">{{ data.birthday }}</b></div>
  <div c-name="div" c-id="aknsmdv">
    <b c-name="b" c-id="ognk3qp">DatePicker - Định dạng chữ</b>
  </div>
  <DatePicker v-model="data.birthdayText" placeholder="DD tháng MM năm YYYY" format="DD [tháng] MM [năm] YYYY"
    c-name="DatePicker" c-id="4cp28lw" />
  <div style="color:#0066cc" c-name="div" c-id="mgbravx">Giá trị: <b c-name="b" c-id="btvfoao">{{ data.birthdayText }}</b></div>
  <div c-name="div" c-id="sbxot28">
    <b c-name="b" c-id="ilxg1be">DatePicker (datetime) - Giờ hẹn</b>
  </div>
  <DatePicker v-model="data.appointment" mode="datetime" placeholder="Chọn ngày giờ" format="HH:mm DD/MM/YYYY"
    :minute-step="15" c-name="DatePicker" c-id="e6dqk7f" />
  <div style="color:#0066cc" c-name="div" c-id="q74v2xs">Ngày giờ đã chọn: <b c-name="b" c-id="55xc88a">{{ data.appointment }}</b></div>
  <div c-name="div" c-id="82rm20p">
    <b c-name="b" c-id="po0ikwz">Checkbox - Size</b>
  </div>
  <Checkbox v-model="data.sizeTest" value="small" beforeText="[sm]" afterText="Small" size="sm" c-name="Checkbox" c-id="u9uayx1" />
  <Checkbox v-model="data.sizeTest" value="medium" beforeText="[md]" afterText="Medium" size="md" c-name="Checkbox" c-id="e673tj4" />
  <Checkbox v-model="data.sizeTest" value="large" beforeText="[lg]" afterText="Large" size="lg" c-name="Checkbox" c-id="qdqk80l" />
  <Checkbox v-model="data.sizeTest" value="xlarge" beforeText="[xl]" afterText="X-Large" size="xl" c-name="Checkbox" c-id="9hd0m1l" />
  <div style="color:#0066cc" c-name="div" c-id="okpshd8">Giá trị: <b c-name="b" c-id="korldbv">{{ data.sizeTest }}</b></div>
  <div c-name="div" c-id="uxuwmt4">
    <b c-name="b" c-id="318h0k7">Paint - Chữ ký</b>
  </div>
  <Paint style="width:400px; height:150px;" v-model="data.signature"
    src="https://fastly.picsum.photos/id/237/250/250.jpg?hmac=tNmO3YWXALG9JM81cghI9nflo3dWc3e5vlNsf_jmKWw"
    c-name="Paint" c-id="hq1vub8" />
  <div v-if="data.signature" c-name="div" c-id="8gswa5w">
    <div c-name="div" c-id="ozfucom">Ảnh đã lưu:</div><img :src="data.signature" alt="signature"
      style="max-width:200px;border:1px solid #ccc;" c-name="img" c-id="x7lifom" />
  </div>
</PageA4>`,
      script: `// 📜 Khởi tạo state và logic tính toán truyền từ Angular
const data = reactive($context.data || {});

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

try {
  const res = await fetch('https://api.ipify.org');
  data.ip = await res.text();
} catch (e) {
  data.ip = 'Lỗi tải IP: ' + e.message;
}

return {
  data,
  categoryList,
  tagList,
  contextItems,
  uppername
};`,
      context: {
        data: {
          name: 'Nguyễn Văn An',
          age: '28',
          category: 'tech',
          tags: ['vue', 'typescript'],
          birthday: '15/08/1996',
          birthdayText: '15 tháng 08 năm 1996',
          appointment: '09:30 02/09/2026',
          sizeTest: 'large',
          signature: '',
          ip: ''
        }
      }
    },

    // =========================================================================
    // 🏥 TEMPLATE 2: Bệnh Án Ngoại Trú Chuyên Khoa (Dài 2 Trang A4)
    // =========================================================================
    {
      id: 'outpatient-record',
      name: 'Bệnh án Ngoại trú (2 trang)',
      badge: 'A4',
      icon: '🏥',
      description: 'Mẫu bệnh án khám chuyên khoa chuẩn y tế dài 2 trang A4: Thông tin hành chính, bệnh sử, tiền sử, khám lâm sàng toàn diện, tính BMI tự động, tóm tắt cận lâm sàng, chẩn đoán, phác đồ điều trị và chữ ký 2 bên',
      template: `<PageA4 style="padding: 10mm 15mm; font-family: 'Times New Roman', Times, serif; color: #111;">
  <!-- ==================== TRANG 1 ==================== -->
  
  <!-- 1. Header: Thông tin bệnh viện & Mã bệnh án -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 10px; margin-bottom: 14px;">
    <div style="text-align: left;">
      <div style="font-weight: bold; font-size: 13px; text-transform: uppercase; color: #0369a1;">SỞ Y TẾ TP. HÀ NỘI</div>
      <div style="font-weight: bold; font-size: 14px; text-transform: uppercase; color: #0c4a6e;">BỆNH VIỆN ĐA KHOA QUỐC TẾ MEDIC</div>
      <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Khoa Khám Bệnh Chuyên Khoa - Hotline: 1900 6868</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 12px; font-weight: bold; margin-bottom: 3px; color: #0369a1;">MÃ SỐ BỆNH ÁN:</div>
      <InputOTP v-model="data.recordNo" :mask-length="[1,1,1,1,1,1]" pad-start="0" />
    </div>
  </div>

  <!-- 2. Tiêu đề chính -->
  <div style="text-align: center; margin-bottom: 16px;">
    <h2 style="margin: 0; font-size: 20px; font-weight: bold; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px;">BỆNH ÁN NGOẠI TRÚ CHUYÊN KHOA</h2>
    <div style="font-style: italic; font-size: 12.5px; color: #475569; margin-top: 3px;">(Hồ sơ theo dõi sức khỏe & điều trị ngoại trú toàn diện)</div>
  </div>

  <!-- 3. Phần I: Thông tin hành chính bệnh nhân -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      I. THÔNG TIN HÀNH CHÍNH
    </div>
    <div style="display: grid; grid-template-columns: 2fr 1.2fr 0.8fr; gap: 14px;">
      <Textarea v-model="data.name" label="1. Họ và tên:" line />
      <DatePicker v-model="data.birthday" label="2. Ngày sinh:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
      <Textarea v-model="data.gender" label="3. Giới tính:" line />
    </div>
    <div style="display: grid; grid-template-columns: 0.7fr 1.3fr 1.3fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.age" label="4. Tuổi:" line />
      <Textarea v-model="data.identityCard" label="5. Số CCCD/CMND:" line />
      <Textarea v-model="data.phone" label="6. Điện thoại:" line />
    </div>
    <div style="display: grid; grid-template-columns: 1.2fr 1fr 1.4fr; gap: 14px; margin-top: 10px;">
      <DatePicker v-model="data.examDate" mode="datetime" label="7. Thời gian khám:" placeholder="HH:mm DD/MM/YYYY" format="HH:mm DD/MM/YYYY" :minute-step="15" />
      <Textarea v-model="data.job" label="8. Nghề nghiệp:" line />
      <Textarea v-model="data.workplace" label="9. Nơi làm việc:" line />
    </div>
    <div style="margin-top: 10px;">
      <Textarea v-model="data.address" label="10. Địa chỉ thường trú:" line />
    </div>
    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.emergencyContact" label="11. Người liên hệ khẩn cấp:" line />
      <Textarea v-model="data.emergencyPhone" label="12. SĐT người liên hệ:" line />
    </div>
  </div>

  <!-- 4. Phần II: Lý do khám & Quá trình bệnh lý -->
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      II. LÝ DO VÀO KHÁM & BỆNH SỬ
    </div>
    <Textarea v-model="data.reason" label="1. Lý do vào viện / triệu chứng chính:" line />
    <div style="margin-top: 10px;">
      <Textarea v-model="data.clinicalProcess" label="2. Quá trình bệnh lý (Khởi phát, diễn tiến, điều trị trước đó):" line :rows="3" />
    </div>
  </div>

  <!-- 5. Phần III: Tiền sử bệnh & Dị ứng -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      III. TIỀN SỬ BỆNH LÝ & YẾU TỐ NGUY CƠ
    </div>
    <div style="font-size: 13.5px; color: #334155; font-weight: bold;">1. Tiền sử bản thân:</div>
    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 6px; margin-bottom: 10px;">
      <Checkbox v-model="data.historyHypertension" :native="true" afterText="Tăng huyết áp" size="sm" />
      <Checkbox v-model="data.historyDiabetes" :native="true" afterText="Đái tháo đường" size="sm" />
      <Checkbox v-model="data.historyAsthma" :native="true" afterText="Hen phế quản / COPD" size="sm" />
      <Checkbox v-model="data.historyHeart" :native="true" afterText="Bệnh mạch vành" size="sm" />
      <Checkbox v-model="data.historyKidney" :native="true" afterText="Bệnh lý Gan / Thận" size="sm" />
    </div>
    <div style="margin-top: 10px;">
      <Textarea v-model="data.historyAllergyDetail" label="2. Tiền sử dị ứng (Thuốc, thực phẩm, thời tiết):" line />
    </div>
    <div style="margin-top: 10px;">
      <Textarea v-model="data.familyHistory" label="3. Tiền sử gia đình (Bệnh di truyền, tim mạch, ung thư):" line />
    </div>
  </div>

  <!-- ==================== TRANG 2 ==================== -->

  <!-- 6. Phần IV: Khám lâm sàng & Chỉ số sinh tồn -->
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      IV. KHÁM LÂM SÀNG TOÀN DIỆN
    </div>
    
    <!-- Vital signs box with spacious 3-column layout -->
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px;">
      <div style="font-weight: bold; font-size: 13px; color: #166534; margin-bottom: 8px;">
        🩺 1. Chỉ số sinh tồn & Thể trạng (Tự động tính BMI & phân loại qua Script):
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px 18px;">
        <Textarea v-model="data.height" label="Chiều cao (cm):" line />
        <Textarea v-model="data.weight" label="Cân nặng (kg):" line />
        <Textarea v-model="data.bloodPressure" label="Huyết áp (mmHg):" line />
        <Textarea v-model="data.pulse" label="Mạch (lần/phút):" line />
        <Textarea v-model="data.temperature" label="Thân nhiệt (°C):" line />
        <Textarea v-model="data.spo2" label="Nồng độ SpO2 (%):" line />
      </div>
      <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #86efac; font-size: 13px; color: #15803d; display: flex; align-items: center; gap: 20px;">
        <span>Chỉ số BMI: <b style="font-size: 15px; color: #047857;">{{ bmi || '--' }} kg/m²</b></span>
        <span>Đánh giá thể trạng: <b style="color: #b45309; font-weight: bold;">{{ bmiStatus || '--' }}</b></span>
      </div>
    </div>

    <div style="margin-top: 10px;">
      <Textarea v-model="data.generalExam" label="2. Khám toàn thân (Tri giác, niêm mạc, hạch, tuyến giáp, phù):" line :rows="2" />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.cardioExam" label="3. Khám Tim mạch:" line />
      <Textarea v-model="data.respiratoryExam" label="4. Khám Hô hấp (Phổi):" line />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.digestiveExam" label="5. Khám Tiêu hóa (Bụng):" line />
      <Textarea v-model="data.otherOrganExam" label="6. Thần kinh & Cơ quan khác:" line />
    </div>
  </div>

  <!-- 7. Phần V: Tóm tắt Cận lâm sàng -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      V. TÓM TẮT KẾT QUẢ CẬN LÂM SÀNG & XÉT NGHIỆM
    </div>
    <Textarea v-model="data.labSummary" label="1. Kết quả xét nghiệm, CĐHA đã có (ECG, Siêu âm, X-Quang, Máu):" line :rows="2" />
    <div style="margin-top: 10px;">
      <Textarea v-model="data.additionalTests" label="2. Chỉ định cận lâm sàng bổ sung cần làm:" line />
    </div>
  </div>

  <!-- 8. Phần VI: Chẩn đoán y khoa -->
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      VI. CHẨN ĐOÁN Y KHOA & PHÂN LOẠI
    </div>
    <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 14px;">
      <Textarea v-model="data.diagnosis" label="1. Chẩn đoán xác định (Kèm mã ICD-10):" line />
      <Select v-model="data.department" label="2. Chuyên khoa:" placeholder="Chọn chuyên khoa" bind-label="name" bind-value="id" :items="departmentList" />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.diffDiagnosis" label="3. Chẩn đoán phân biệt:" line />
      <Textarea v-model="data.comorbidity" label="4. Bệnh kèm theo / Biến chứng:" line />
    </div>
  </div>

  <!-- 9. Phần VII: Kế hoạch điều trị & Dặn dò -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      VII. HƯỚNG ĐIỀU TRỊ & CHẾ ĐỘ CHĂM SÓC
    </div>
    <Textarea v-model="data.treatmentPlan" label="1. Kế hoạch điều trị & Kê đơn thuốc:" line :rows="3" />
    <div style="margin-top: 10px;">
      <Textarea v-model="data.doctorAdvice" label="2. Chế độ dinh dưỡng, vận động & Dặn dò:" line />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 14px; margin-top: 10px;">
      <DatePicker v-model="data.revisitDate" label="3. Ngày hẹn tái khám:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
      <Textarea v-model="data.revisitNotes" label="4. Lưu ý khi tái khám:" line />
    </div>
  </div>

  <!-- 10. Phần VIII: Chữ ký 2 bên (Bác sĩ & Người bệnh) -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 18px; padding-top: 8px;">
    <div style="text-align: center; width: 250px;">
      <div style="font-style: italic; font-size: 12px; color: #475569;">Xác nhận của người bệnh / Đại diện gia đình</div>
      <div style="font-weight: bold; font-size: 12.5px; text-transform: uppercase; margin-top: 3px; color: #0f172a;">NGƯỜI BỆNH KÝ TÊN</div>
      <div style="margin-top: 6px;">
        <Paint style="width: 240px; height: 100px; border: 1px dashed #cbd5e1; border-radius: 4px; background: #fff;" v-model="data.patientSignature" />
      </div>
      <div style="font-weight: bold; margin-top: 5px; font-size: 12.5px; color: #0f172a;">{{ data.name || 'Người bệnh' }}</div>
    </div>
    <div style="text-align: center; width: 270px;">
      <div style="font-style: italic; font-size: 12px; color: #475569;">Hà Nội, ngày 28 tháng 08 năm 2026</div>
      <div style="font-weight: bold; font-size: 12.5px; text-transform: uppercase; margin-top: 3px; color: #0369a1;">BÁC SĨ KHÁM BỆNH</div>
      <div style="margin-top: 6px;">
        <Paint style="width: 260px; height: 100px; border: 1px dashed #93c5fd; border-radius: 4px; background: #fff;" v-model="data.doctorSignature" />
      </div>
      <div style="font-weight: bold; margin-top: 5px; font-size: 12.5px; color: #0369a1;">{{ data.doctorName || 'BS. CKI Trần Văn Hùng' }}</div>
    </div>
  </div>
</PageA4>`,
      script: `// 📜 Logic Bệnh Án Ngoại Trú Chuyên Khoa (2 Trang A4)
const data = reactive($context.data || {});

// Danh sách chuyên khoa khám
const departmentList = [
  { id: 'cardiology', name: 'Khoa Tim Mạch' },
  { id: 'internal', name: 'Khoa Nội Tổng Quát' },
  { id: 'ent', name: 'Khoa Tai Mũi Họng' },
  { id: 'dermatology', name: 'Khoa Da Liễu' },
  { id: 'neurology', name: 'Khoa Thần Kinh' }
];

// Computed: Tự động tính chỉ số BMI từ Chiều cao (cm) và Cân nặng (kg)
const bmi = computed(() => {
  const heightM = parseFloat(data.height || 0) / 100;
  const weightKg = parseFloat(data.weight || 0);
  if (!heightM || !weightKg || heightM <= 0) return null;
  return (weightKg / (heightM * heightM)).toFixed(1);
});

// Computed: Tự động phân loại thể trạng theo chuẩn WHO / Châu Á
const bmiStatus = computed(() => {
  const val = parseFloat(bmi.value || 0);
  if (!val) return 'Chưa đủ dữ liệu';
  if (val < 18.5) return 'Gầy (Thiếu cân)';
  if (val < 23) return 'Bình thường (Lý tưởng)';
  if (val < 25) return 'Tiền béo phì (Thừa cân)';
  if (val < 30) return 'Béo phì Độ I';
  return 'Béo phì Độ II (Cần can thiệp)';
});

return {
  data,
  departmentList,
  bmi,
  bmiStatus
};`,
      context: {
        data: {
          recordNo: '849201',
          name: 'Trần Thị Mai',
          birthday: '20/11/1992',
          gender: 'Nữ',
          age: '34',
          identityCard: '001192008492',
          phone: '0987 654 321',
          examDate: '08:15 28/08/2026',
          job: 'Kế toán trưởng',
          workplace: 'Công ty Cổ phần Công nghệ ABC',
          address: 'Số 45 Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
          emergencyContact: 'Nguyễn Văn Hùng (Chồng)',
          emergencyPhone: '0903 123 456',
          reason: 'Đau tức ngực trái từng cơn kèm cảm giác khó thở nhẹ khi gắng sức, hồi hộp trống ngực xuất hiện 1 tuần nay.',
          clinicalProcess: 'Bệnh nhân có triệu chứng nặng ngực sau xương ức xuất hiện cách đây 7 ngày, cơn kéo dài khoảng 10-15 phút, lan lên vai trái, tăng lên khi leo cầu thang hoặc căng thẳng, giảm bớt khi nghỉ ngơi. Chưa dùng thuốc đặc hiệu ở nhà.',
          historyHypertension: true,
          historyDiabetes: false,
          historyAsthma: false,
          historyHeart: true,
          historyKidney: false,
          historyAllergyDetail: 'Dị ứng với thuốc nhóm Sulfamide và Penicillin (nổi mề đay, ngứa).',
          familyHistory: 'Bố có tiền sử nhồi máu cơ tim ở tuổi 58, mẹ tăng huyết áp.',
          height: '162',
          weight: '54',
          bloodPressure: '130/85',
          pulse: '78',
          temperature: '36.8',
          spo2: '98',
          generalExam: 'Bệnh nhân tỉnh táo, tiếp xúc tốt. Da niêm mạc hồng hào, không phù, không xuất huyết dưới da. Tuyến giáp không to, hạch ngoại vi không sờ thấy.',
          cardioExam: 'Tim đều, nhịp xoang rõ, T1 T2 nghe rõ không có tiếng thổi bệnh lý. Mỏm tim đập ở khoang liên sườn V đường trung đòn trái.',
          respiratoryExam: 'Lồng ngực cân đối, di động đều theo nhịp thở. Rì rào phế nang êm dịu hai bên phế trường, không nghe thấy rale rít hay rale ẩm.',
          digestiveExam: 'Bụng mềm, không chướng, gan lách không to, ấn các điểm đau ngoại khoa không có phản ứng.',
          otherOrganExam: 'Thần kinh không có dấu hiệu khu trú. Vận động các khớp bình thường.',
          labSummary: 'Điện tâm đồ (ECG 12 CĐ): Nhịp xoang 78ck/p, sóng ST chênh xuống nhẹ 0.5mm ở V5-V6. Siêu âm tim: Chức năng tâm thu thất trái tốt (EF=64%), không thấy rối loạn vận động vùng.',
          additionalTests: '1. Định lượng men tim Troponin T siêu nhạy\\n2. Xét nghiệm bộ mỡ máu (Lipid panel: Cholesterol toàn phần, Triglyceride, HDL-C, LDL-C)\\n3. Siêu âm Doppler mạch vành',
          diagnosis: 'Cơn đau thắt ngực ổn định (CCS II) / Tăng huyết áp độ 1 - I20.9',
          department: 'cardiology',
          diffDiagnosis: 'Rối loạn thần kinh tim / Viêm cơ tim nhẹ',
          comorbidity: 'Rối loạn lipid máu nhẹ',
          treatmentPlan: '1. Aspirin 81mg: 1 viên/ngày uống sau ăn sáng\\n2. Bisoprolol 2.5mg: 1 viên/ngày uống buổi sáng\\n3. Atorvastatin 20mg: 1 viên/ngày uống trước khi đi ngủ',
          doctorAdvice: 'Nghỉ ngơi hợp lý, tránh thức khuya và lo âu. Chế độ ăn giảm muối, hạn chế mỡ động vật. Đến viện ngay nếu cơn đau ngực kéo dài trên 20 phút không giảm.',
          revisitDate: '11/09/2026',
          revisitNotes: 'Mang theo kết quả xét nghiệm máu và phiếu điện tim khi đi tái khám.',
          doctorName: 'BS. CKI Trần Văn Hùng',
          patientSignature: '',
          doctorSignature: ''
        }
      }
    },

    // =========================================================================
    // 💊 TEMPLATE 3: Đơn Thuốc Điện Tử & Hướng Dẫn Dùng Thuốc (Page A5)
    // =========================================================================
    {
      id: 'prescription-a5',
      name: 'Đơn thuốc',
      badge: 'A5',
      icon: '💊',
      description: 'Mẫu đơn thuốc điện tử khổ A5: Thông tin bệnh nhân, danh mục thuốc điều trị, tự động đếm tổng số loại thuốc, hướng dẫn sử dụng và chữ ký điện tử bác sĩ',
      template: `<PageA5 style="padding: 5mm 8mm; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b;" c-name="PageA5" c-id="rx_p01">
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #059669; padding-bottom: 4px; margin-bottom: 6px;" c-name="div" c-id="rx_h01">
    <div c-name="div" c-id="rx_h02">
      <div style="font-weight: 700; font-size: 11px; text-transform: uppercase; color: #047857;" c-name="div" c-id="rx_h03">PHÒNG KHÁM ĐA KHOA MEDIC</div>
      <div style="font-size: 9px; color: #64748b;" c-name="div" c-id="rx_h04">Đ/c: 108 Trần Hưng Đạo, Q. Hoàn Kiếm, HN - SĐT: 024.3984.6688</div>
    </div>
    <div style="text-align: right;" c-name="div" c-id="rx_h06">
      <div style="font-size: 9.5px; font-weight: 600; color: #047857;" c-name="div" c-id="rx_h07">MÃ ĐƠN:</div>
      <span style="font-family: monospace; font-size: 11.5px; font-weight: bold; background: #ecfdf5; padding: 1px 5px; border-radius: 3px; border: 1px solid #a7f3d0;" c-name="span" c-id="rx_code">{{ data.prescriptionCode || 'RX-2026-01' }}</span>
    </div>
  </div>

  <!-- Title -->
  <div style="text-align: center; margin-bottom: 6px;" c-name="div" c-id="rx_t01">
    <h3 style="margin: 0; font-size: 15px; font-weight: 800; text-transform: uppercase; color: #065f46; letter-spacing: 0.5px;" c-name="h3" c-id="rx_t02">ĐƠN THUỐC ĐIỆN TỬ</h3>
  </div>

  <!-- Patient Details -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px;" c-name="div" c-id="rx_pat_0">
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 6px;" c-name="div" c-id="rx_pat_1">
      <Textarea v-model="data.name" label="Họ tên:" line c-name="Textarea" c-id="rx_n" />
      <Textarea v-model="data.age" label="Tuổi:" line c-name="Textarea" c-id="rx_ag" />
      <Textarea v-model="data.gender" label="Giới tính:" line c-name="Textarea" c-id="rx_ge" />
    </div>
    <div style="margin-top: 3px;" c-name="div" c-id="rx_pat_2">
      <Textarea v-model="data.address" label="Địa chỉ:" line c-name="Textarea" c-id="rx_ad" />
    </div>
    <div style="margin-top: 3px;" c-name="div" c-id="rx_pat_3">
      <Textarea v-model="data.diagnosis" label="Chẩn đoán:" line c-name="Textarea" c-id="rx_dx" />
    </div>
  </div>

  <!-- Medicines Table -->
  <div style="margin-bottom: 6px;" c-name="div" c-id="rx_med_0">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;" c-name="div" c-id="rx_med_h">
      <b style="font-size: 11.5px; color: #047857;" c-name="b" c-id="rx_med_t">💊 THUỐC ĐIỀU TRỊ:</b>
      <span style="font-size: 10.5px; color: #64748b;" c-name="span" c-id="rx_med_c">Tổng số: <b style="color: #047857;" c-name="b" c-id="rx_t_c">{{ totalMedicines }} loại</b></span>
    </div>
    
    <div v-for="(med, idx) in (data.medicines || [])" :key="idx" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 6px; margin-bottom: 3px;" c-name="div" c-id="rx_item">
      <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: #0f172a;" c-name="div" c-id="rx_item_1">
        <span c-name="span" c-id="rx_med_name">{{ idx + 1 }}. {{ med.name }}</span>
        <span style="color: #047857;" c-name="span" c-id="rx_med_qty">SL: {{ med.quantity }} {{ med.unit }}</span>
      </div>
      <div style="font-size: 10px; color: #475569; font-style: italic; margin-top: 1px;" c-name="div" c-id="rx_item_2">
        👉 {{ med.usage }}
      </div>
    </div>
  </div>

  <!-- Advice & Followup -->
  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 8px; margin-bottom: 6px; font-size: 11px;" c-name="div" c-id="rx_adv_0">
    <Textarea v-model="data.doctorAdvice" label="Lời dặn:" line c-name="Textarea" c-id="rx_adv_txt" />
    <div style="margin-top: 3px;" c-name="div" c-id="rx_adv_1">
      <DatePicker v-model="data.revisitDate" label="Ngày tái khám:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" c-name="DatePicker" c-id="rx_rev_d" />
    </div>
  </div>

  <!-- Signatures -->
  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 6px;" c-name="div" c-id="rx_sig_0">
    <div style="font-size: 9.5px; color: #64748b; font-style: italic;" c-name="div" c-id="rx_sig_1">
      * Khám lại xin mang theo đơn thuốc này.<br/>
      * Đơn thuốc có giá trị mua trong vòng 05 ngày.
    </div>
    <div style="text-align: center; width: 170px;" c-name="div" c-id="rx_sig_2">
      <div style="font-size: 9.5px; font-style: italic; color: #475569;" c-name="div" c-id="rx_sig_3">Ngày 28 tháng 08 năm 2026</div>
      <div style="font-weight: bold; font-size: 10.5px; text-transform: uppercase; color: #047857; margin-top: 1px;" c-name="div" c-id="rx_sig_4">BÁC SĨ KÊ ĐƠN</div>
      <div style="margin-top: 3px;" c-name="div" c-id="rx_sig_5">
        <Paint style="width: 160px; height: 65px; border: 1px dashed #cbd5e1; border-radius: 4px; background: #fff;" v-model="data.signature" c-name="Paint" c-id="rx_pnt" />
      </div>
      <div style="font-weight: bold; font-size: 10.5px; color: #0f172a; margin-top: 1px;" c-name="div" c-id="rx_sig_6">{{ data.prescriber || 'BS. CKI Nguyễn Hải Đăng' }}</div>
    </div>
  </div>
</PageA5>`,
      script: `// 📜 Logic Đơn Thuốc Điện Tử (Page A5)
const data = reactive($context.data || {});

// Computed: Đếm tổng số lượng loại thuốc trong đơn
const totalMedicines = computed(() => {
  return Array.isArray(data.medicines) ? data.medicines.length : 0;
});

// Computed: Tóm tắt thông tin bệnh nhân
const patientSummary = computed(() => {
  return (data.name || '') + ' - ' + (data.age || '') + ' tuổi (' + (data.gender || '') + ')';
});

return {
  data,
  totalMedicines,
  patientSummary
};`,
      context: {
        data: {
          prescriptionCode: 'RX-2026-9812',
          name: 'Lê Hoàng Long',
          gender: 'Nam',
          age: '38',
          birthday: '10/05/1988',
          phone: '0912 345 678',
          address: 'Phòng 502, Tòa Golden Palm, 21 Lê Văn Lương, Hà Nội',
          diagnosis: 'Viêm họng cấp / Viêm mũi dị ứng thời tiết',
          medicines: [
            { name: 'Augmentin 1g (Amoxicillin/Clavulanate)', quantity: 14, unit: 'Viên', usage: 'Uống 1 viên/lần x 2 lần/ngày sau khi ăn sáng, tối' },
            { name: 'Paracetamol 500mg (Hạ sốt, giảm đau)', quantity: 10, unit: 'Viên', usage: 'Uống 1 viên khi sốt trên 38.5°C hoặc đau họng nhiều, cách 4-6h' },
            { name: 'Telfast 180mg (Fexofenadine)', quantity: 7, unit: 'Viên', usage: 'Uống 1 viên/ngày vào buổi sáng sau ăn' },
            { name: 'Nước muối sinh lý Natri Clorid 0.9%', quantity: 2, unit: 'Chai 500ml', usage: 'Súc họng miệng 3-4 lần/ngày sau bữa ăn' }
          ],
          doctorAdvice: 'Uống nhiều nước ấm, súc miệng nước muối thường xuyên, giữ ấm vùng cổ. Tái khám sau 5 ngày nếu không thuyên giảm.',
          revisitDate: '02/09/2026',
          prescriber: 'BS. CKI Nguyễn Hải Đăng',
          signature: ''
        }
      }
    },

    // =========================================================================
    // 📊 TEMPLATE 4: Bảng Kê Chi Phí Khám Chữa Bệnh (Page A4 Ngang - Landscape)
    // =========================================================================
    {
      id: 'billing-statement-a4-landscape',
      name: 'Bảng kê Viện phí (A4 Ngang)',
      badge: 'A4 Ngang',
      icon: '📊',
      description: 'Mẫu bảng kê chi phí khám chữa bệnh ngoại trú định dạng A4 Ngang (Landscape): Bảng chi tiết dịch vụ, tính tổng tiền tự động qua Script, phân loại BHYT và 3 chữ ký xác nhận',
      template: `<PageA4 :landscape="true" style="padding: 8mm 12mm; font-family: 'Times New Roman', Times, serif; color: #1e293b;" c-name="PageA4" c-id="bill_root">
  <!-- Header: Thông tin bệnh viện & Mã số hóa đơn -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 10px;" c-name="div" c-id="bill_hdr">
    <div style="text-align: left;" c-name="div" c-id="bill_hleft">
      <div style="font-weight: bold; font-size: 13px; text-transform: uppercase; color: #0369a1;" c-name="div" c-id="bill_h1">SỞ Y TẾ TP. HÀ NỘI - BỆNH VIỆN ĐA KHOA QUỐC TẾ MEDIC</div>
      <div style="font-size: 11.5px; color: #64748b;" c-name="div" c-id="bill_h2">Phòng Kế Hoạch Tài Chính & Viện Phí - Hotline Hỗ Trợ: 1900 6868</div>
    </div>
    <div style="text-align: right;" c-name="div" c-id="bill_hright">
      <div style="font-size: 11.5px; font-weight: bold; color: #0369a1;" c-name="div" c-id="bill_code_lbl">MÃ PHIẾU THU:</div>
      <span style="font-family: monospace; font-size: 13px; font-weight: bold; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 4px; border: 1px solid #7dd3fc;" c-name="span" c-id="bill_code_val">{{ data.billCode || 'VP-2026-8899' }}</span>
    </div>
  </div>

  <!-- Title -->
  <div style="text-align: center; margin-bottom: 12px;" c-name="div" c-id="bill_title_wrap">
    <h2 style="margin: 0; font-size: 19px; font-weight: bold; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px;" c-name="h2" c-id="bill_title">BẢNG KÊ CHI TIẾT CHI PHÍ KHÁM CHỮA BỆNH NGOẠI TRÚ</h2>
    <div style="font-style: italic; font-size: 12px; color: #475569; margin-top: 2px;" c-name="div" c-id="bill_sub">Khổ giấy A4 Ngang (Landscape) - Dữ liệu tự động tính toán tổng viện phí</div>
  </div>

  <!-- Thông tin hành chính bệnh nhân dạng ngang 4 cột -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; margin-bottom: 10px;" c-name="div" c-id="bill_pat_box">
    <div style="display: grid; grid-template-columns: 2fr 0.8fr 0.8fr 1.4fr; gap: 12px;" c-name="div" c-id="bill_pat_r1">
      <Textarea v-model="data.patientName" label="Họ và tên bệnh nhân:" line c-name="Textarea" c-id="bill_p_name" />
      <Textarea v-model="data.age" label="Tuổi:" line c-name="Textarea" c-id="bill_p_age" />
      <Textarea v-model="data.gender" label="Giới tính:" line c-name="Textarea" c-id="bill_p_gen" />
      <Textarea v-model="data.insuranceNo" label="Mã thẻ BHYT:" line c-name="Textarea" c-id="bill_p_ins" />
    </div>
    <div style="display: grid; grid-template-columns: 2fr 1.5fr 1.5fr; gap: 12px; margin-top: 6px;" c-name="div" c-id="bill_pat_r2">
      <Textarea v-model="data.address" label="Địa chỉ:" line c-name="Textarea" c-id="bill_p_addr" />
      <Textarea v-model="data.diagnosis" label="Chẩn đoán xác định:" line c-name="Textarea" c-id="bill_p_diag" />
      <DatePicker v-model="data.billDate" label="Ngày lập phiếu:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" c-name="DatePicker" c-id="bill_p_date" />
    </div>
  </div>

  <!-- Bảng kê danh mục chi tiết -->
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 12px;" border="1" bordercolor="#cbd5e1" c-name="table" c-id="bill_tbl">
    <thead>
      <tr style="background: #e0f2fe; color: #0369a1; font-weight: bold; text-align: center;" c-name="tr" c-id="bill_th_r">
        <th style="padding: 6px 4px; width: 40px;" c-name="th" c-id="th_stt">STT</th>
        <th style="padding: 6px 8px; text-align: left;" c-name="th" c-id="th_name">Tên dịch vụ / Thuốc / Vật tư kỹ thuật</th>
        <th style="padding: 6px 4px; width: 80px;" c-name="th" c-id="th_unit">Đơn vị</th>
        <th style="padding: 6px 4px; width: 60px;" c-name="th" c-id="th_qty">Số lượng</th>
        <th style="padding: 6px 8px; width: 120px; text-align: right;" c-name="th" c-id="th_price">Đơn giá (VNĐ)</th>
        <th style="padding: 6px 8px; width: 130px; text-align: right;" c-name="th" c-id="th_total">Thành tiền (VNĐ)</th>
        <th style="padding: 6px 8px; width: 110px; text-align: right;" c-name="th" c-id="th_ins">BHYT trả (80%)</th>
        <th style="padding: 6px 8px; width: 120px; text-align: right;" c-name="th" c-id="th_pay">Bệnh nhân trả</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in (data.services || [])" :key="idx" style="background: #ffffff;" c-name="tr" c-id="bill_tr_item">
        <td style="padding: 5px 4px; text-align: center;" c-name="td" c-id="td_idx">{{ idx + 1 }}</td>
        <td style="padding: 5px 8px; font-weight: 500;" c-name="td" c-id="td_name">{{ item.name }}</td>
        <td style="padding: 5px 4px; text-align: center; color: #64748b;" c-name="td" c-id="td_unit">{{ item.unit }}</td>
        <td style="padding: 5px 4px; text-align: center; font-weight: bold;" c-name="td" c-id="td_qty">{{ item.quantity }}</td>
        <td style="padding: 5px 8px; text-align: right; color: #334155;" c-name="td" c-id="td_price">{{ formatMoney(item.price) }}</td>
        <td style="padding: 5px 8px; text-align: right; font-weight: 600;" c-name="td" c-id="td_total">{{ formatMoney(item.quantity * item.price) }}</td>
        <td style="padding: 5px 8px; text-align: right; color: #0284c7;" c-name="td" c-id="td_ins">{{ formatMoney(item.insuranceCover) }}</td>
        <td style="padding: 5px 8px; text-align: right; font-weight: bold; color: #b45309;" c-name="td" c-id="td_pay">{{ formatMoney(item.patientPay) }}</td>
      </tr>
      <!-- Tổng cộng -->
      <tr style="background: #f1f5f9; font-weight: bold;" c-name="tr" c-id="bill_total_r">
        <td colspan="5" style="padding: 6px 10px; text-align: right; text-transform: uppercase; color: #0f172a;" c-name="td" c-id="td_tlabel">TỔNG CỘNG VIỆN PHÍ:</td>
        <td style="padding: 6px 8px; text-align: right; color: #0f172a; font-size: 13px;" c-name="td" c-id="td_grand">{{ formatMoney(totalAmount) }}</td>
        <td style="padding: 6px 8px; text-align: right; color: #0284c7; font-size: 13px;" c-name="td" c-id="td_t_ins">{{ formatMoney(totalInsurance) }}</td>
        <td style="padding: 6px 8px; text-align: right; color: #b45309; font-size: 14px;" c-name="td" c-id="td_t_pat">{{ formatMoney(totalPatient) }}</td>
      </tr>
    </tbody>
  </table>

  <!-- Tóm tắt số tiền bằng chữ -->
  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 12px; margin-bottom: 12px; font-size: 12.5px;" c-name="div" c-id="bill_words_box">
    <span>Số tiền người bệnh thanh toán (bằng chữ): <b style="color: #b45309;">{{ totalWords || 'Một triệu năm trăm hai mươi nghìn đồng chẵn.' }}</b></span>
  </div>

  <!-- 3 Chữ ký xác nhận ngang 3 cột -->
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center;" c-name="div" c-id="bill_sig_wrap">
    <div c-name="div" c-id="sig_col1">
      <div style="font-weight: bold; font-size: 12px; text-transform: uppercase; color: #0f172a;" c-name="div" c-id="s1_t">NGƯỜI BỆNH / THÂN NHÂN</div>
      <div style="font-style: italic; font-size: 11px; color: #64748b;" c-name="div" c-id="s1_sub">(Ký và ghi rõ họ tên)</div>
      <div style="margin-top: 6px;" c-name="div" c-id="s1_pbox">
        <Paint style="width: 220px; height: 80px; margin: 0 auto; border: 1px dashed #cbd5e1; border-radius: 4px; background: #fff;" v-model="data.patientSig" c-name="Paint" c-id="s1_p" />
      </div>
      <div style="font-weight: bold; margin-top: 4px; font-size: 12px; color: #0f172a;" c-name="div" c-id="s1_n">{{ data.patientName || 'Nguyễn Thị Hoa' }}</div>
    </div>

    <div c-name="div" c-id="sig_col2">
      <div style="font-weight: bold; font-size: 12px; text-transform: uppercase; color: #0369a1;" c-name="div" c-id="s2_t">NGƯỜI LẬP PHIẾU THU</div>
      <div style="font-style: italic; font-size: 11px; color: #64748b;" c-name="div" c-id="s2_sub">(Ký và ghi rõ họ tên)</div>
      <div style="margin-top: 6px;" c-name="div" c-id="s2_pbox">
        <Paint style="width: 220px; height: 80px; margin: 0 auto; border: 1px dashed #93c5fd; border-radius: 4px; background: #fff;" v-model="data.creatorSig" c-name="Paint" c-id="s2_p" />
      </div>
      <div style="font-weight: bold; margin-top: 4px; font-size: 12px; color: #0369a1;" c-name="div" c-id="s2_n">{{ data.creatorName || 'KTV. Đỗ Thu Trang' }}</div>
    </div>

    <div c-name="div" c-id="sig_col3">
      <div style="font-style: italic; font-size: 11px; color: #475569;" c-name="div" c-id="s3_date">Hà Nội, ngày 28 tháng 08 năm 2026</div>
      <div style="font-weight: bold; font-size: 12px; text-transform: uppercase; color: #0369a1; margin-top: 2px;" c-name="div" c-id="s3_t">TRƯỞNG PHÒNG TÀI CHÍNH</div>
      <div style="margin-top: 6px;" c-name="div" c-id="s3_pbox">
        <Paint style="width: 220px; height: 80px; margin: 0 auto; border: 1px dashed #93c5fd; border-radius: 4px; background: #fff;" v-model="data.leaderSig" c-name="Paint" c-id="s3_p" />
      </div>
      <div style="font-weight: bold; margin-top: 4px; font-size: 12px; color: #0369a1;" c-name="div" c-id="s3_n">{{ data.leaderName || 'ThS. Nguyễn Thành Nam' }}</div>
    </div>
  </div>
</PageA4>`,
      script: `// 📜 Logic Bảng Kê Chi Phí Viện Phí A4 Ngang
const data = reactive($context.data || {});

// Hàm format tiền tệ VNĐ
const formatMoney = (val) => {
  if (!val && val !== 0) return '0 đ';
  return Number(val).toLocaleString('vi-VN') + ' đ';
};

// Computed: Tính tổng thành tiền dịch vụ
const totalAmount = computed(() => {
  if (!Array.isArray(data.services)) return 0;
  return data.services.reduce((sum, item) => sum + (item.quantity * item.price), 0);
});

// Computed: Tính tổng tiền BHYT chi trả
const totalInsurance = computed(() => {
  if (!Array.isArray(data.services)) return 0;
  return data.services.reduce((sum, item) => sum + (item.insuranceCover || 0), 0);
});

// Computed: Tính tổng tiền bệnh nhân cùng chi trả
const totalPatient = computed(() => {
  if (!Array.isArray(data.services)) return 0;
  return data.services.reduce((sum, item) => sum + (item.patientPay || 0), 0);
});

return {
  data,
  formatMoney,
  totalAmount,
  totalInsurance,
  totalPatient,
  totalWords: 'Một triệu tám trăm bốn mươi nghìn đồng chẵn.'
};`,
      context: {
        data: {
          billCode: 'VP-2026-8899',
          patientName: 'Nguyễn Thị Hoa',
          age: '42',
          gender: 'Nữ',
          insuranceNo: 'DN 4 01 01 23456789',
          address: 'Tổ 12, Phường Khương Đình, Thanh Xuân, Hà Nội',
          diagnosis: 'Thoái hóa khớp gối hai bên (M17) / Tăng huyết áp (I10)',
          billDate: '28/08/2026',
          services: [
            { name: 'Khám chuyên khoa Cơ Xương Khớp', unit: 'Lần', quantity: 1, price: 200000, insuranceCover: 160000, patientPay: 40000 },
            { name: 'Chụp X-Quang khớp gối thẳng nghiêng 2 bên', unit: 'Lần', quantity: 2, price: 220000, insuranceCover: 352000, patientPay: 88000 },
            { name: 'Siêu âm khớp gối màu 2 bên', unit: 'Lần', quantity: 1, price: 250000, insuranceCover: 200000, patientPay: 50000 },
            { name: 'Xét nghiệm Acid Uric, Định lượng Calci', unit: 'Gói', quantity: 1, price: 180000, insuranceCover: 144000, patientPay: 36000 },
            { name: 'Thuốc Glucosamin sulfate 500mg (Hộp 60 viên)', unit: 'Hộp', quantity: 2, price: 450000, insuranceCover: 0, patientPay: 900000 },
            { name: 'Vật lý trị liệu - Siêu âm điều trị giảm đau khớp', unit: 'Lần', quantity: 5, price: 150000, insuranceCover: 600000, patientPay: 150000 }
          ],
          patientSig: '',
          creatorSig: '',
          leaderSig: '',
          creatorName: 'KTV. Đỗ Thu Trang',
          leaderName: 'ThS. Nguyễn Thành Nam'
        }
      }
    },

    // =========================================================================
    // 📑 TEMPLATE 5: Phiếu Chỉ Định Cận Lâm Sàng & Xét Nghiệm (Page A5 Ngang)
    // =========================================================================
    {
      id: 'lab-order-a5-landscape',
      name: 'Chỉ định CLS (A5 Ngang)',
      badge: 'A5 Ngang',
      icon: '📑',
      description: 'Mẫu phiếu chỉ định dịch vụ cận lâm sàng & xét nghiệm khổ A5 Ngang (Landscape): Danh mục nhóm xét nghiệm, CĐHA, tự động đếm số dịch vụ chỉ định và chữ ký bác sĩ',
      template: `<PageA5 :landscape="true" style="padding: 5mm 8mm; font-family: 'Times New Roman', Times, serif; color: #1e293b;" c-name="PageA5" c-id="cls_root">
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #0284c7; padding-bottom: 4px; margin-bottom: 6px;" c-name="div" c-id="cls_hdr">
    <div style="text-align: left;" c-name="div" c-id="cls_hleft">
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #0369a1;" c-name="div" c-id="cls_h1">SỞ Y TẾ TP. HÀ NỘI - BV ĐA KHOA QUỐC TẾ MEDIC</div>
      <div style="font-size: 9.5px; color: #64748b;" c-name="div" c-id="cls_h2">Khoa Khám Bệnh - Hotline: 1900 6868</div>
    </div>
    <div style="text-align: right;" c-name="div" c-id="cls_hright">
      <div style="font-size: 9.5px; font-weight: bold; color: #0369a1;" c-name="div" c-id="cls_code_lbl">MÃ PHIẾU:</div>
      <span style="font-family: monospace; font-size: 11px; font-weight: bold; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 3px; border: 1px solid #7dd3fc;" c-name="span" c-id="cls_code_val">{{ data.orderCode || 'CLS-2026-088' }}</span>
    </div>
  </div>

  <!-- Title -->
  <div style="text-align: center; margin-bottom: 6px;" c-name="div" c-id="cls_t_wrap">
    <h3 style="margin: 0; font-size: 15px; font-weight: bold; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px;" c-name="h3" c-id="cls_title">PHIẾU CHỈ ĐỊNH DỊCH VỤ CẬN LÂM SÀNG</h3>
    <div style="font-style: italic; font-size: 10px; color: #64748b;" c-name="div" c-id="cls_sub">(Định dạng khổ giấy A5 Ngang - Landscape)</div>
  </div>

  <!-- Thông tin hành chính 4 cột -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 6px;" c-name="div" c-id="cls_pat_box">
    <div style="display: grid; grid-template-columns: 2fr 0.8fr 0.8fr 1.4fr; gap: 8px;" c-name="div" c-id="cls_pat_r1">
      <Textarea v-model="data.patientName" label="1. Họ và tên:" line c-name="Textarea" c-id="cls_p_n" />
      <Textarea v-model="data.age" label="2. Tuổi:" line c-name="Textarea" c-id="cls_p_ag" />
      <Textarea v-model="data.gender" label="3. Giới tính:" line c-name="Textarea" c-id="cls_p_ge" />
      <Textarea v-model="data.room" label="4. Phòng khám:" line c-name="Textarea" c-id="cls_p_rm" />
    </div>
    <div style="display: grid; grid-template-columns: 2.2fr 1.8fr; gap: 8px; margin-top: 3px;" c-name="div" c-id="cls_pat_r2">
      <Textarea v-model="data.diagnosis" label="5. Chẩn đoán sơ bộ:" line c-name="Textarea" c-id="cls_p_dx" />
      <DatePicker v-model="data.orderDate" mode="datetime" label="6. Thời gian chỉ định:" placeholder="HH:mm DD/MM/YYYY" format="HH:mm DD/MM/YYYY" :minute-step="15" c-name="DatePicker" c-id="cls_p_dt" />
    </div>
  </div>

  <!-- Danh mục chỉ định 3 cột nhóm dịch vụ -->
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 6px;" c-name="div" c-id="cls_grid_services">
    <!-- Cột 1: Xét nghiệm Huyết học & Sinh hóa -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 6px;" c-name="div" c-id="cls_g1">
      <div style="font-weight: bold; font-size: 11px; color: #0284c7; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;" c-name="div" c-id="g1_t">
        🩸 I. XÉT NGHIỆM MÁU
      </div>
      <div style="display: flex; flex-direction: column; gap: 2px;" c-name="div" c-id="g1_items">
        <Checkbox v-model="data.testCBC" :native="true" afterText="Tổng phân tích tế bào máu" size="sm" c-name="Checkbox" c-id="chk_cbc" />
        <Checkbox v-model="data.testGlucose" :native="true" afterText="Định lượng Glucose máu" size="sm" c-name="Checkbox" c-id="chk_glu" />
        <Checkbox v-model="data.testUreCreatinin" :native="true" afterText="Ure, Creatinin (Thận)" size="sm" c-name="Checkbox" c-id="chk_ure" />
        <Checkbox v-model="data.testLiver" :native="true" afterText="Men gan AST / ALT (Gan)" size="sm" c-name="Checkbox" c-id="chk_liv" />
        <Checkbox v-model="data.testLipid" :native="true" afterText="Bộ mỡ máu (Lipid panel)" size="sm" c-name="Checkbox" c-id="chk_lip" />
      </div>
    </div>

    <!-- Cột 2: Chẩn đoán hình ảnh -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 6px;" c-name="div" c-id="cls_g2">
      <div style="font-weight: bold; font-size: 11px; color: #0284c7; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;" c-name="div" c-id="g2_t">
        📷 II. CHẨN ĐOÁN HÌNH ẢNH
      </div>
      <div style="display: flex; flex-direction: column; gap: 2px;" c-name="div" c-id="g2_items">
        <Checkbox v-model="data.testChestXRay" :native="true" afterText="X-Quang ngực thẳng" size="sm" c-name="Checkbox" c-id="chk_xray" />
        <Checkbox v-model="data.testAbdomenEcho" :native="true" afterText="Siêu âm ổ bụng tổng quát" size="sm" c-name="Checkbox" c-id="chk_echo" />
        <Checkbox v-model="data.testThyroidEcho" :native="true" afterText="Siêu âm Tuyến giáp" size="sm" c-name="Checkbox" c-id="chk_thy" />
        <Checkbox v-model="data.testHeartEcho" :native="true" afterText="Siêu âm Tim Doppler màu" size="sm" c-name="Checkbox" c-id="chk_hecho" />
        <Checkbox v-model="data.testECG" :native="true" afterText="Điện tâm đồ (ECG 12 CĐ)" size="sm" c-name="Checkbox" c-id="chk_ecg" />
      </div>
    </div>

    <!-- Cột 3: Nội soi & Thăm dò chức năng -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 6px;" c-name="div" c-id="cls_g3">
      <div style="font-weight: bold; font-size: 11px; color: #0284c7; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;" c-name="div" c-id="g3_t">
        🔬 III. THĂM DÒ & KHÁC
      </div>
      <div style="display: flex; flex-direction: column; gap: 2px;" c-name="div" c-id="g3_items">
        <Checkbox v-model="data.testUrine" :native="true" afterText="Tổng phân tích Nước tiểu" size="sm" c-name="Checkbox" c-id="chk_uri" />
        <Checkbox v-model="data.testENT" :native="true" afterText="Nội soi Tai Mũi Họng" size="sm" c-name="Checkbox" c-id="chk_ent" />
        <Checkbox v-model="data.testStomach" :native="true" afterText="Nội soi Thực quản - Dạ dày" size="sm" c-name="Checkbox" c-id="chk_sto" />
        <Checkbox v-model="data.testHba1c" :native="true" afterText="Định lượng HbA1c" size="sm" c-name="Checkbox" c-id="chk_hba" />
        <Checkbox v-model="data.testElectrolyte" :native="true" afterText="Điện giải đồ (Na, K, Cl)" size="sm" c-name="Checkbox" c-id="chk_ele" />
      </div>
    </div>
  </div>

  <!-- Footer: Tổng chỉ định & 2 Chữ ký -->
  <div style="display: flex; justify-content: space-between; align-items: flex-end; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 10px;" c-name="div" c-id="cls_foot">
    <div style="font-size: 10px; color: #166534;" c-name="div" c-id="cls_note">
      <div>👉 Tổng số chỉ định đã chọn: <b style="font-size: 12px; color: #047857;">{{ selectedTestsCount }} dịch vụ</b></div>
      <div style="margin-top: 2px; font-style: italic; color: #475569;">* Người bệnh nhịn ăn sáng đối với xét nghiệm đường máu và siêu âm bụng.</div>
    </div>
    <div style="text-align: center; width: 170px;" c-name="div" c-id="cls_sig">
      <div style="font-weight: bold; font-size: 10.5px; text-transform: uppercase; color: #0369a1;" c-name="div" c-id="cls_sig_t">BÁC SĨ CHỈ ĐỊNH</div>
      <div style="margin-top: 2px;" c-name="div" c-id="cls_pnt_box">
        <Paint style="width: 160px; height: 50px; border: 1px dashed #93c5fd; border-radius: 3px; background: #fff;" v-model="data.doctorSignature" c-name="Paint" c-id="cls_pnt" />
      </div>
      <div style="font-weight: bold; font-size: 10px; color: #0f172a; margin-top: 1px;" c-name="div" c-id="cls_doc_n">{{ data.doctorName || 'BS. CKI Hoàng Minh Tuấn' }}</div>
    </div>
  </div>
</PageA5>`,
      script: `// 📜 Logic Phiếu Chỉ Định Cận Lâm Sàng (A5 Ngang)
const data = reactive($context.data || {});

// Computed: Tự động đếm tổng số dịch vụ xét nghiệm/CLS đã được đánh dấu chọn
const selectedTestsCount = computed(() => {
  const keys = [
    'testCBC', 'testGlucose', 'testUreCreatinin', 'testLiver', 'testLipid',
    'testChestXRay', 'testAbdomenEcho', 'testThyroidEcho', 'testHeartEcho', 'testECG',
    'testUrine', 'testENT', 'testStomach', 'testHba1c', 'testElectrolyte'
  ];
  return keys.filter(k => !!data[k]).length;
});

return {
  data,
  selectedTestsCount
};`,
      context: {
        data: {
          orderCode: 'CLS-2026-088',
          patientName: 'Phạm Thanh Hương',
          age: '35',
          gender: 'Nữ',
          room: 'Phòng 204 - Khám Nội Tổng Quát',
          diagnosis: 'Theo dõi Hội chứng Rối loạn Tiêu hóa / Tăng men gan nhẹ',
          orderDate: '08:30 28/08/2026',
          testCBC: true,
          testGlucose: true,
          testUreCreatinin: false,
          testLiver: true,
          testLipid: true,
          testChestXRay: false,
          testAbdomenEcho: true,
          testThyroidEcho: false,
          testHeartEcho: false,
          testECG: true,
          testUrine: true,
          testENT: false,
          testStomach: false,
          testHba1c: false,
          testElectrolyte: false,
          doctorName: 'BS. CKI Hoàng Minh Tuấn',
          doctorSignature: ''
        }
      }
    }
  ];

  selectedTemplateIndex = 0;
  editMode = true;

  get currentTemplateConfig(): TemplateItemConfig {
    return this.templates[this.selectedTemplateIndex] || this.templates[0];
  }

  get template(): string {
    return this.currentTemplateConfig.template;
  }
  set template(val: string) {
    if (this.currentTemplateConfig) {
      this.currentTemplateConfig.template = val;
    }
  }

  get script(): string {
    return this.currentTemplateConfig.script;
  }
  set script(val: string) {
    if (this.currentTemplateConfig) {
      this.currentTemplateConfig.script = val;
    }
  }

  get context(): any {
    return this.currentTemplateConfig.context;
  }
  set context(val: any) {
    if (this.currentTemplateConfig) {
      this.currentTemplateConfig.context = val;
    }
  }

  selectTemplate(index: number) {
    if (index < 0 || index >= this.templates.length) return;
    this.selectedTemplateIndex = index;
  }
}
