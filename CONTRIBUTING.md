# 🛠️ Hướng dẫn Đóng góp Component

Quy trình chuẩn để tạo và đăng ký Vue Component mới vào hệ thống **Template Editor**.

---

## 1. Cấu trúc Thư mục

Tất cả component dùng trong template nằm tại `projects/template-editor/src/components/`:
- `forms/`: Component nhập liệu (`Textarea.vue`, `Checkbox.vue`, `DatePicker.vue`, `Select.vue`, `InputOTP.vue`, `Paint.vue`).
- `layouts/`: Component bố cục trang (`PageA4.vue`, `PageA5.vue`).
- `preview/`: Engine lõi (`Preview.vue`, `PreviewWrapper.vue` - *không chứa component template tại đây*).

---

## 2. Quy trình Thực hiện (5 bước)

### Bước 1: Tạo Component (`src/components/forms/MyComponent.vue`)
Khai báo prop `path` và inject `onFieldChange` để đồng bộ dữ liệu với Angular Shell:

```vue
<template>
  <div class="my-component">
    <input :value="modelValue" @input="onInput" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps<{ modelValue?: any; path?: string }>();
const emit = defineEmits(['update:modelValue']);
const onFieldChange = inject<((path: string, val: any) => void) | null>('onFieldChange', null);

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  emit('update:modelValue', val);
  if (props.path) onFieldChange?.(props.path, val);
}
</script>

<style scoped>
.my-component { display: inline-block; }
</style>
```

### Bước 2: Đăng ký trong `Preview.vue`
Mở `src/components/preview/Preview.vue`, import và đăng ký vào `renderPreview()`:
```typescript
import MyComponent from '../forms/MyComponent.vue';

// Trong phương thức renderPreview():
this.app.component('MyComponent', MyComponent);
```

### Bước 3: Thêm vào Context Menu Insert
Thêm mẫu preset vào `projects/shared/constants/template-categories.ts`:
```typescript
{
  label: 'Form',
  templates: [
    { label: 'My Component', icon: 'fa fa-cube', template: '<MyComponent v-model="data.myField" />' }
  ]
}
```

### Bước 4 (Tùy chọn): Khai báo thẻ tự đóng
Nếu component là thẻ self-closing (`<MyComponent />`), thêm tên tag vào `VirtualHTMLParser.closingTags` tại `projects/shared/utils/virtual-html-parser.ts`.

### Bước 5: Kiểm tra Biên dịch
```bash
npm run build:template-editor
```

---

## 3. Checklist Kiểm thử (PR Checklist)

- [ ] Luôn dùng Scoped CSS (`<style scoped>`) để tránh ghi đè trang in A4/A5.
- [ ] Hỗ trợ prop `path` và gọi `onFieldChange` khi dữ liệu thay đổi.
- [ ] Chạy `npm run build:template-editor` thành công không có lỗi TypeScript.
- [ ] Kiểm tra chèn component từ Menu chuột phải & sửa thuộc tính qua Edit Panel.
