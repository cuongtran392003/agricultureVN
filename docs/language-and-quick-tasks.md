# Ngôn ngữ và tạo công việc nhanh

## Sử dụng

- Vào **Cài đặt → Ngôn ngữ** để chọn Tiếng Việt hoặc English. Lựa chọn được lưu trên thiết bị và áp dụng cho giao diện cùng ngôn ngữ nhận dạng giọng nói.
- Vào **Tạo công việc → Nói để tạo việc**, cấp quyền micro, nói rồi dừng. Có thể sửa bản ghi và bấm **Dùng nội dung này** để điền form.
- Ví dụ: “Ngày mai tưới cà phê lúc 7 giờ sáng, ưu tiên cao”. Trình xử lý nhận ngày hôm nay/ngày mai, ngày dạng DD/MM/YYYY, giờ dạng số, mức ưu tiên và tên nông trại/lô đất đã có. Thông tin không nhận ra được giữ trong tên việc để người dùng sửa.
- **Việc gần đây** kết hợp những việc đã tạo trên thiết bị với các việc hoàn thành trong tối đa 100 bản ghi API tải về. Gợi ý trên thiết bị được phân theo tài khoản, lưu tối đa 8 mẫu mỗi tài khoản, hiển thị tối đa 6 mẫu không trùng tên và khu vực.
- Chọn việc gần đây để dùng lại nội dung và khu vực; ngày giờ đang chọn được giữ lại, trạng thái trở về chờ thực hiện. Nếu khu vực đã bị xóa, phải chọn lại trước khi lưu.
- Có thêm gợi ý tưới nước, bón phân, làm cỏ, kiểm tra sâu bệnh và thu hoạch. Form tự chọn nông trại hoặc lô đất nếu chỉ có một lựa chọn.
- Mọi cách nhập nhanh đều tạo bản nháp; người dùng kiểm tra rồi bấm **Lưu công việc**.

## Build giọng nói

Đã thêm `expo-speech-recognition` dành cho Expo SDK 54 và config plugin trong `app.json`. Phải tạo lại development/native build để đưa module vào ứng dụng; chỉ khởi động lại Metro không đủ. Expo Go hoặc bản build cũ vẫn cho phép nhập bằng bàn phím và dùng gợi ý, đồng thời báo khi giọng nói chưa khả dụng.

Với Android, cần máy có dịch vụ nhận dạng giọng nói và cho phép micro. Có thể cần kết nối mạng tùy dịch vụ. Sau khi cấu hình native/Firebase của dự án đầy đủ, build bằng `npx expo run:android` hoặc workflow EAS development build hiện có.

Cấu hình hiện tại trỏ `android.googleServicesFile` tới `./android/app/google-services.json`; cần cung cấp file Firebase hợp lệ trước khi build native nếu chưa có.

## Bổ sung bản dịch

- `src/i18n/catalog.ts`: cặp nội dung giao diện `Tiếng Việt|English`.
- `src/i18n/index.ts`: lưu ngôn ngữ và dịch các chuỗi động được hỗ trợ.
- `LocalizedText` dùng cho nhãn giao diện; đặt `localize={false}` cho dữ liệu do người dùng nhập. `useTranslation().t()` dùng cho placeholder, Picker, Alert và accessibility label.
- Tên, mô tả và nội dung API được giữ nguyên ngôn ngữ gốc; chức năng này không tự dịch nội dung người dùng hoặc bài viết.

Tài liệu module: https://github.com/jamsch/expo-speech-recognition
