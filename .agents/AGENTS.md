# Hướng Dẫn & Quy Chuẩn Agent Cho Dự Án `ngx-vue-template-editor`

## Kiến Trúc Dự Án
Repository này là một workspace Micro-Frontend kết hợp giữa Angular 20 và Vue 3 thông qua Module Federation / Native Federation:
- `projects/shell`: Ứng dụng Shell Angular 20 (chứa thanh điều khiển, chuyển đổi mẫu biểu và quản lý trạng thái cha).
- `projects/template-editor`: Ứng dụng Micro-Frontend Vue 3 + Vite phục vụ chỉnh sửa, cấu hình và xem trước mẫu biểu tương tác.
- `projects/shared`: Thư viện tiện ích dùng chung (`VirtualHTMLParser`), hằng số (`templateCategories`), hàm trợ giúp (helpers) và TypeScript interfaces.
- `projects/first-mf`: Sub-app / micro-frontend Angular phụ.

## Lệnh Chạy & Build
- **Chạy Dev Template Editor:** `npm run start:template-editor` (hoặc `npm run dev` trong thư mục `projects/template-editor`)
- **Build Template Editor:** `npm run build:template-editor` (hoặc `npm run build` trong thư mục `projects/template-editor`)
- **Build Shell:** `npm run build:shell`
- **Build Toàn Bộ:** `npm run build:all`

## Quy Chuẩn Viết Code & Nguyên Tắc

### Tổ Chức Thư Mục Component (`projects/template-editor/src/components`)
- **`forms/`**: Các component nhập liệu / form tương tác dùng trong template (ví dụ: `Textarea.vue`, `Select.vue`, `Checkbox.vue`, `DatePicker.vue`, `InputOTP.vue`, `Paint.vue`).
- **`layouts/`**: Các component bố cục trang dùng trong template (ví dụ: `PageA4.vue`, `PageA5.vue`).
- **`preview/`**: Component khung xem trước và trình soạn thảo template (`Preview.vue`, `PreviewWrapper.vue`).
- **Lưu ý:** Tuyệt đối KHÔNG đặt các component dùng trong template trực tiếp tại thư mục gốc `preview/`. Luôn phân loại đúng vào `forms/` hoặc `layouts/`.

### Quy Trình Đăng Ký Component Mới Vào Template Preview
Khi tạo một component mới dùng được trong template:
1. Đặt file `.vue` vào thư mục phù hợp (`projects/template-editor/src/components/forms/` hoặc `layouts/`).
2. Đăng ký component trong `Preview.vue` tại hàm `renderPreview()` bằng `this.app.component('TênComponent', TênComponent)`.
3. Thêm cấu hình mẫu component vào `projects/shared/constants/template-categories.ts` để hiển thị trong menu chuột phải "Chèn thành phần (Insert Component)".

### Quy Chuẩn Viết Style (CSS)
- Sử dụng Vanilla CSS / Scoped CSS (`<style scoped>`) bên trong Vue components.
- Không tự ý thêm các framework CSS tiện ích chưa được cấu hình trừ khi có yêu cầu rõ ràng.
- Đảm bảo hiển thị và in ấn chuẩn xác cho các khổ giấy (A4, A5, Dọc, Ngang).

### Độ Chính Xác Của Code & Các Anti-Pattern Cần Tránh
- **Tuyệt đối không đoán mò điều kiện (No Speculative/Guesswork Conditions):**
  - Không viết các chuỗi điều kiện phòng thủ giả định, phỏng đoán trường hợp có thể xảy ra (ví dụ: chuỗi `||` đoán mò tên tag, thuộc tính, hoặc kiểu dữ liệu không có trong thiết kế).
  - Luôn kiểm tra cấu trúc dữ liệu, kiểu dữ liệu và DOM thực tế để viết điều kiện chính xác, rõ ràng và tối giản nhất.
  - Logic phải tường minh, bám sát kiến trúc và contracts hiện có, không over-engineering.

### Chất Lượng Code & Kiểm Tra (Verification)
- Luôn kiểm tra build `npm run build:template-editor` sau khi thay đổi cấu trúc mã nguồn để đảm bảo không lỗi biên dịch.
- Đảm bảo tất cả các helpers và components xuất ra đều duy trì chặt chẽ tính an toàn kiểu dữ liệu trong TypeScript (Type Safety).
