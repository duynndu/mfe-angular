import { AIPresetPrompt } from '../types/ai.interface';

export const AI_PRESET_PROMPTS: AIPresetPrompt[] = [
  {
    id: 'medical-prescription',
    title: 'Đơn Thuốc Ngoại Trú (A5 Dọc)',
    category: 'medical',
    badge: 'A5',
    icon: 'fa fa-medkit',
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
    pageSize: 'A4',
    orientation: 'landscape',
    prompt: 'Tạo mẫu Phiếu kết quả xét nghiệm huyết học & sinh hóa máu khổ A4 ngang gồm: Tiêu đề khoa xét nghiệm, thông tin bệnh nhân, bảng dữ liệu kết quả nhiều cột (STT, Tên xét nghiệm, Kết quả, Đơn vị, Trị số tham chiếu, Đánh giá bất thường) và chữ ký Kỹ thuật viên xét nghiệm.'
  },
  {
    id: 'corp-receipt-a5',
    title: 'Phiếu Thu Viện Phí / Dịch Vụ (A5 Ngang)',
    category: 'corporate',
    badge: 'A5 Ngang',
    icon: 'fa fa-money',
    pageSize: 'A5',
    orientation: 'landscape',
    prompt: 'Tạo mẫu Phiếu thu tiền viện phí / dịch vụ khổ A5 ngang gồm: Số phiếu OTP, Họ tên khách hàng, nội dung thu tiền, bảng kê chi tiết các dịch vụ (Khám bệnh, Xét nghiệm, Chẩn đoán hình ảnh, Thuốc), số tiền bằng số và bằng chữ (tính tự động), chữ ký Người nộp tiền và Thủ quỹ.'
  },
  {
    id: 'corp-handover',
    title: 'Biên Bản Bàn Giao Thiết Bị (A4 Dọc)',
    category: 'corporate',
    badge: 'A4',
    icon: 'fa fa-exchange',
    pageSize: 'A4',
    orientation: 'portrait',
    prompt: 'Tạo mẫu Biên bản bàn giao trang thiết bị / tài sản khổ A4 dọc gồm: Thời gian và địa điểm bàn giao, đại diện Bên Giao và Bên Nhận, bảng kê danh mục thiết bị (Mã tài sản, Tên máy, Serial number, Tình trạng hoạt động, Số lượng), điều khoản cam kết và chữ ký xác nhận 2 bên.'
  },
  {
    id: 'corp-survey',
    title: 'Phiếu Khảo Sát Ý Kiến Khách Hàng (A4 Dọc)',
    category: 'general',
    badge: 'A4',
    icon: 'fa fa-check-circle-o',
    pageSize: 'A4',
    orientation: 'portrait',
    prompt: 'Tạo mẫu Phiếu khảo sát mức độ hài lòng của người bệnh / khách hàng khổ A4 dọc gồm: Giới thiệu mục đích khảo sát, các câu hỏi đánh giá 5 mức độ (Rất hài lòng, Hài lòng, Bình thường, Không hài lòng) bằng Checkbox, ô Textarea góp ý cải tiến và chữ ký ẩn danh.'
  }
];
