---
name: create-template-component
description: Quy trình chuẩn để tạo và đăng ký một Vue component mới vào Template Editor.
---

# Hướng dẫn Tạo & Đăng ký Component mới cho Template Editor

Dưới đây là các bước chuẩn để thêm một component mới (ví dụ: Rating, Signature, FileUpload...) vào hệ thống Template Editor:

## Các bước thực hiện

### Bước 1: Tạo Vue Component
Tạo file `.vue` mới tại thư mục thích hợp:
- Dạng form / nhập liệu: `projects/template-editor/src/components/forms/MyComponent.vue`
- Dạng layout / trang: `projects/template-editor/src/components/layouts/MyComponent.vue`

### Bước 2: Khai báo Component trong `Preview.vue`
Mở file `projects/template-editor/src/components/preview/Preview.vue`:
1. Import component ở đầu file:
   ```typescript
   import MyComponent from '../forms/MyComponent.vue';
   ```
2. Đăng ký component vào ứng dụng Vue động trong phương thức `renderPreview()`:
   ```typescript
   this.app
     .component('MyComponent', MyComponent);
   ```

### Bước 3: Thêm vào Context Menu Insert (Tùy chọn)
Nếu component cần xuất hiện trong menu chuột phải "Insert Component":
Mở `projects/shared/constants/template-categories.ts` và thêm mục tương ứng vào mảng `templateCategories`:
```typescript
{
  label: 'Form', // hoặc Layout/Basic
  templates: [
    {
      label: 'My Component Label',
      icon: 'fa fa-cube',
      template: '<MyComponent v-model="data.myField" />',
    }
  ]
}
```

### Bước 4: Kiểm tra Biên dịch
Chạy lệnh build để xác nhận không có lỗi TypeScript hoặc Vue compiler:
```bash
npm run build:template-editor
```
