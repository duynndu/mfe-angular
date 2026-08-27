import { TemplateCategory } from '../types/template.interface';

export const templateCategories: TemplateCategory[] = [
  {
    label: 'Bố cục (Layout)',
    templates: [
      {
        label: 'A4 Page',
        icon: 'fa fa-file-text-o',
        template: '<PageA4 style="padding: 10mm 15mm;">\n  <div>Nội dung trang A4</div>\n</PageA4>',
      },
      {
        label: 'A5 Page',
        icon: 'fa fa-file-text-o',
        template: '<PageA5 style="padding: 8mm 12mm;">\n  <div>Nội dung trang A5</div>\n</PageA5>',
      },
      {
        label: 'Div Khung chứa',
        icon: 'fa fa-square-o',
        template: '<div style="padding: 10px; margin: 5px 0; border: 1px dashed #cbd5e1; border-radius: 4px;"></div>',
      },
      {
        label: 'Lưới 2 Cột (Grid 2)',
        icon: 'fa fa-th-large',
        template: '<div class="grid grid-cols-2 gap-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 6px 0;">\n  <div>Cột 1</div>\n  <div>Cột 2</div>\n</div>',
      },
      {
        label: 'Lưới 3 Cột (Grid 3)',
        icon: 'fa fa-th',
        template: '<div class="grid grid-cols-3 gap-2" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 6px 0;">\n  <div>Cột 1</div>\n  <div>Cột 2</div>\n  <div>Cột 3</div>\n</div>',
      },
      {
        label: 'Bảng Dữ liệu (Table)',
        icon: 'fa fa-table',
        template: '<table style="width: 100%; border-collapse: collapse; margin: 8px 0;" border="1">\n  <thead>\n    <tr style="background: #f1f5f9;">\n      <th style="padding: 6px 8px;">STT</th>\n      <th style="padding: 6px 8px;">Tiêu đề</th>\n      <th style="padding: 6px 8px;">Nội dung</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td style="padding: 6px 8px; text-align: center;">1</td>\n      <td style="padding: 6px 8px;">Mục 1</td>\n      <td style="padding: 6px 8px;">Mô tả...</td>\n    </tr>\n  </tbody>\n</table>',
      },
    ],
  },
  {
    label: 'Biểu mẫu (Form)',
    templates: [
      {
        label: 'Textarea (Ô nhập dòng)',
        icon: 'fa fa-align-left',
        template: '<Textarea v-model="data.fullName" label="Họ và tên:" :line="true" :suffix="{ length: 1, char: \'❤️\' }" />',
      },
      {
        label: 'Input OTP (Mã OTP/Số)',
        icon: 'fa fa-key',
        template: '<InputOTP v-model="data.age" :maskLength="[1,1,1]" pad-start="0" />',
      },
      {
        label: 'Select (Hộp chọn)',
        icon: 'fa fa-caret-square-o-down',
        template: '<Select v-model="data.category" label="Danh mục:" :options="categoryList" valueField="id" labelField="name" />',
      },
      {
        label: 'Checkbox (Hộp kiểm)',
        icon: 'fa fa-check-square-o',
        template: '<Checkbox v-model="data.tags" label="Chọn kỹ năng:" :options="tagList" />',
      },
      {
        label: 'DatePicker (Chọn ngày)',
        icon: 'fa fa-calendar',
        template: '<DatePicker v-model="data.birthday" label="Ngày sinh:" />',
      },
      {
        label: 'Chữ ký số / Vẽ (Paint)',
        icon: 'fa fa-pencil-square',
        template: '<Paint v-model="data.signature" label="Chữ ký người bệnh:" style="width: 250px; height: 120px;" />',
      },
      {
        label: 'Input Cơ bản (HTML)',
        icon: 'fa fa-font',
        template: '<input type="text" placeholder="Nhập văn bản..." style="padding: 6px 10px; margin: 4px 0; border: 1px solid #cbd5e1; border-radius: 4px;" />',
      },
    ],
  },
  {
    label: 'Văn bản & Tiêu đề (Typography)',
    templates: [
      {
        label: 'Tiêu đề 1 (H1)',
        icon: 'fa fa-header',
        template: '<h1 style="margin: 10px 0; font-size: 24px; font-weight: 700;">Tiêu đề chính</h1>',
      },
      {
        label: 'Tiêu đề 2 (H2)',
        icon: 'fa fa-header',
        template: '<h2 style="margin: 8px 0; font-size: 18px; font-weight: 600;">Tiêu đề mục</h2>',
      },
      {
        label: 'Đoạn văn (Paragraph)',
        icon: 'fa fa-paragraph',
        template: '<p style="margin: 4px 0; line-height: 1.5;">Nội dung văn bản mô tả chi tiết...</p>',
      },
      {
        label: 'Danh sách (Bullet List)',
        icon: 'fa fa-list-ul',
        template: '<ul style="margin: 4px 0; padding-left: 20px;">\n  <li>Mục danh sách 1</li>\n  <li>Mục danh sách 2</li>\n</ul>',
      },
    ],
  },
  {
    label: 'Tương tác & Media',
    templates: [
      {
        label: 'Nút bấm (Button)',
        icon: 'fa fa-hand-pointer-o',
        template: '<button style="padding: 6px 14px; margin: 4px 0; background: #0288d1; color: white; border: none; border-radius: 4px; cursor: pointer;">Nút bấm</button>',
      },
      {
        label: 'Hình ảnh (Image)',
        icon: 'fa fa-picture-o',
        template: '<img src="/src/assets/img/icon/image.png" alt="Ảnh minh họa" style="max-width: 100%; height: auto; margin: 5px 0;" />',
      },
    ],
  },
];

