import { AIPresetPrompt } from '../types/ai.interface';

export const AI_PRESET_PROMPTS: AIPresetPrompt[] = [
  // ==================== GIAO DIỆN WEB & APP UI (NATIVE HTML) ====================
  {
    id: 'ui-login',
    title: 'Giao diện Đăng nhập & Xác thực 2FA (Login UI)',
    category: 'ui',
    badge: 'Web UI',
    icon: 'fa fa-sign-in',
    templateType: 'ui',
    screenType: 'login',
    prompt: 'Thiết kế Giao diện Đăng nhập (Login Screen) phong cách hiện đại bằng THẺ HTML THUẦN (100% Native HTML, KHÔNG dùng component có sẵn). Gồm: Thẻ Card căn giữa (max-width: 440px, bo góc border-radius: 16px, box-shadow tinh tế, viền 1px solid #e2e8f0), Logo & tiêu đề Cổng thông tin y tế, ô input tài khoản/email, ô input mật khẩu có liên kết "Quên mật khẩu", ô nhập mã OTP xác thực 2FA gồm 6 ô input số nhỏ thuần CSS, ô input checkbox ghi nhớ đăng nhập, nút bấm Đăng nhập nổi bật với gradient xanh (#0284c7 đến #0369a1), các nút đăng nhập nhanh bằng SSO. Script Vue 3 quản lý reactive dữ liệu form và thông báo lỗi/thành công.'
  },
  {
    id: 'ui-dashboard',
    title: 'Dashboard Quản trị & Thống kê (Dashboard UI)',
    category: 'ui',
    badge: 'Web UI',
    icon: 'fa fa-dashboard',
    templateType: 'ui',
    screenType: 'dashboard',
    prompt: 'Thiết kế Bảng điều khiển Quản trị & Thống kê (Admin Dashboard) chuyên nghiệp bằng THẺ HTML THUẦN (100% Native HTML, KHÔNG dùng component có sẵn). Bố cục container rộng (max-width: 1200px, nền #f8fafc). Gồm: Thanh Header tổng quan có thanh tìm kiếm và thẻ người dùng; Hàng 4 thẻ KPI chỉ số quan trọng (Tổng bệnh nhân/khách hàng, Doanh thu trong ngày, Lịch hẹn chờ khám, Đánh giá hài lòng) có icon FontAwesome, số liệu lớn và badge % tăng trưởng; Thanh lọc nhanh ngày tháng (thẻ input type="date") và chọn phòng ban (thẻ select thuần); Bảng dữ liệu tiếp đón gần đây (table, thead, tbody, tr, td) có avatar, mã số, chuyên khoa, badge trạng thái màu sắc; Cột bên phải hiển thị danh sách bác sĩ đang trực và thanh tiến độ hoàn thành mục tiêu.'
  },
  {
    id: 'ui-clinic-queue',
    title: 'Màn hình Hàng đợi & Tiếp đón Khám (Queue Monitor)',
    category: 'ui',
    badge: 'Web UI',
    icon: 'fa fa-television',
    templateType: 'ui',
    screenType: 'dashboard',
    prompt: 'Thiết kế Màn hình Điều phối & Gọi số Hàng đợi Tiếp đón Khám bệnh bằng THẺ HTML THUẦN (100% Native HTML, KHÔNG dùng component có sẵn). Gồm: Thanh tiêu đề phòng khám, khối hiển thị Số thứ tự Đang khám nổi bật cực lớn (background gradient, font số to rõ ràng), khối hiển thị Số kế tiếp; Bảng danh sách bệnh nhân đang chờ theo từng phòng khám chuyên khoa; Thẻ thông báo thời gian chờ ước tính; Script Vue 3 reactive hỗ trợ đổi phòng khám và cập nhật số thứ tự.'
  },
  {
    id: 'ui-user-profile',
    title: 'Giao diện Hồ sơ & Thiết lập Tài khoản (Profile UI)',
    category: 'ui',
    badge: 'Web UI',
    icon: 'fa fa-user-circle',
    templateType: 'ui',
    screenType: 'form',
    prompt: 'Thiết kế Màn hình Hồ sơ Cá nhân & Cài đặt Tài khoản (User Profile & Settings) bằng THẺ HTML THUẦN (100% Native HTML, KHÔNG dùng component có sẵn). Bố cục 2 cột (Cột trái: Card thông tin tổng quan, Avatar tròn, Tên chức danh, Badge trạng thái hoạt động; Cột phải: Form cập nhật thông tin gồm các thẻ input họ tên, email, số điện thoại, ngày sinh, địa chỉ, select vai trò/khoa phòng, switch checkbox nhận thông báo, nút Lưu thay đổi và Hủy). Script Vue 3 reactive quản lý trạng thái form.'
  },

  // ==================== BẢN IN & BIỂU MẪU TÀI LIỆU (PAGE A4 / A5) ====================
  {
    id: 'medical-prescription',
    title: 'Đơn Thuốc Ngoại Trú (A5 Dọc)',
    category: 'medical',
    badge: 'A5',
    icon: 'fa fa-medkit',
    templateType: 'document',
    pageSize: 'A5',
    orientation: 'portrait',
    prompt: 'Tạo mẫu Đơn thuốc ngoại trú khổ A5 dọc chuẩn y tế gồm: Header bệnh viện, thông tin bệnh nhân (Họ tên, tuổi, giới tính, địa chỉ, chẩn đoán), bảng danh mục 4-5 loại thuốc (Tên thuốc, hàm lượng, số lượng, cách dùng sáng/trưa/chiều/tối), lời dặn bác sĩ, ngày tái khám và chữ ký bác sĩ điều trị.'
  },
  {
    id: 'medical-surgery-consent',
    title: 'Giấy Cam Đoan Phẫu Thuật (A4 Dọc)',
    category: 'medical',
    badge: 'A4',
    icon: 'fa fa-user-md',
    templateType: 'document',
    pageSize: 'A4',
    orientation: 'portrait',
    prompt: 'Tạo mẫu Giấy cam đoan phẫu thuật / thủ thuật khổ A4 dọc gồm: Thông tin bệnh nhân và người đại diện thân nhân (SĐT, CCCD), chẩn đoán bệnh, phương pháp phẫu thuật dự kiến, các ô Checkbox cam kết đồng ý và hiểu rõ nguy cơ gây mê hồi sức, vùng Paint chữ ký người bệnh và đại diện gia đình.'
  },
  {
    id: 'medical-discharge',
    title: 'Giấy Ra Viện (A4 Dọc)',
    category: 'medical',
    badge: 'A4',
    icon: 'fa fa-hospital-o',
    templateType: 'document',
    pageSize: 'A4',
    orientation: 'portrait',
    prompt: 'Tạo mẫu Giấy ra viện chuẩn khổ A4 dọc gồm: Thông tin hành chính, mã hồ sơ OTP, khoa điều trị, ngày vào viện / ngày ra viện DatePicker, phương pháp điều trị, tình trạng người bệnh khi ra viện, lời dặn của thầy thuốc và 2 ô chữ ký Trưởng khoa và Giám đốc chuyên môn.'
  },
  {
    id: 'medical-lab-results',
    title: 'Phiếu Kết Quả Xét Nghiệm (A4 Ngang)',
    category: 'medical',
    badge: 'A4 Ngang',
    icon: 'fa fa-flask',
    templateType: 'document',
    pageSize: 'A4',
    orientation: 'landscape',
    prompt: 'Tạo mẫu Phiếu kết quả xét nghiệm huyết học & sinh hóa máu khổ A4 ngang gồm: Tiêu đề khoa xét nghiệm, thông tin bệnh nhân, bảng dữ liệu kết quả nhiều cột (STT, Tên xét nghiệm, Kết quả, Đơn vị, Trị số tham chiếu, Đánh giá bất thường) và chữ ký Kỹ thuật viên xét nghiệm.'
  },
  {
    id: 'medical-receipt-a5',
    title: 'Phiếu Thu Viện Phí / Dịch Vụ (A5 Ngang)',
    category: 'medical',
    badge: 'A5 Ngang',
    icon: 'fa fa-money',
    templateType: 'document',
    pageSize: 'A5',
    orientation: 'landscape',
    prompt: 'Tạo mẫu Phiếu thu tiền viện phí / dịch vụ khám chữa bệnh khổ A5 ngang gồm: Số phiếu OTP, Họ tên người bệnh, nội dung thu tiền, bảng kê chi tiết các dịch vụ (Khám bệnh, Xét nghiệm, Chẩn đoán hình ảnh, Thuốc), số tiền bằng số và bằng chữ (tính tự động), chữ ký Người nộp tiền và Thủ quỹ.'
  },
  {
    id: 'medical-survey',
    title: 'Phiếu Khảo Sát Ý Kiến Người Bệnh (A4 Dọc)',
    category: 'medical',
    badge: 'A4',
    icon: 'fa fa-check-circle-o',
    templateType: 'document',
    pageSize: 'A4',
    orientation: 'portrait',
    prompt: 'Tạo mẫu Phiếu khảo sát mức độ hài lòng của người bệnh / thân nhân khổ A4 dọc gồm: Giới thiệu mục đích khảo sát, các câu hỏi đánh giá 5 mức độ (Rất hài lòng, Hài lòng, Bình thường, Không hài lòng) bằng Checkbox, ô Textarea góp ý cải tiến và chữ ký ẩn danh.'
  }
];
