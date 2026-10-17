# Danh mục cây trồng

## Sử dụng

- Mở **Danh mục cây trồng** từ Home hoặc Cài đặt.
- Bấm **Thêm cây trồng** để nhập tên, giống tùy chọn, mô tả và các vùng trồng. Vùng có thể thêm bằng nút cộng, xóa bằng dấu ×; vùng đang nhập cũng được thêm khi lưu.
- Tìm theo tên hoặc giống. Tìm kiếm gửi lên server, giữ nguyên dấu tiếng Việt. **Lọc vùng** cho phép nhập tên vùng chính xác hoặc chọn một trong các vùng gợi ý.
- Danh sách hiển thị 10 cây mỗi trang; bấm Trước/Sau để chuyển trang. Bấm một cây để xem chi tiết, sửa hoặc xóa.
- Trong **Tạo công việc**, bấm **Chọn từ danh mục cây trồng** để điền tên cây. Vẫn có thể nhập tên thủ công.

## API

Service dùng `axiosInstance` chung, với đường dẫn `/crops` trên base URL `/api/v1`. Bearer token được thêm bởi interceptor. POST/PATCH chỉ gửi tên, giống, mô tả và vùng; không gửi `userId`.

- GET `/crops`: `page`, `limit`, `search`, `region`, do Axios mã hóa tham số.
- GET `/crops/:id`: dữ liệu chi tiết.
- POST `/crops`: tạo danh mục; tên trùng được phép.
- PATCH `/crops/:id`: chỉ gửi các trường thay đổi. Xóa mô tả gửi `""`, bỏ hết vùng gửi `[]`. Giống đã lưu không thể xóa bằng chuỗi rỗng theo hợp đồng API.
- DELETE `/crops/:id`: chỉ xóa bản ghi danh mục. Công việc và mẫu chăm sóc vẫn giữ tên/bản sao riêng.

Tên/giống/vùng được trim. Tên bắt buộc, tối đa 100 ký tự; giống tùy chọn tối đa 100; mô tả tối đa 2000; tối đa 20 vùng không trùng/rỗng, mỗi vùng tối đa 100. Mảng lỗi 400 được hiển thị dưới trường tương ứng hoặc trong thông báo của form. Có trạng thái chờ, lỗi, thử lại và danh sách trống.

Query cache chứa ID tài khoản để tách dữ liệu giữa người dùng. Tạo/sửa/xóa làm mới danh sách; sửa cập nhật cache chi tiết. Danh mục này không quản lý ngày gieo trồng hoặc giai đoạn sinh trưởng; các thông tin đó thuộc API kế hoạch chăm sóc.

## Các file chính

- `src/types/crops.ts`: kiểu dữ liệu theo hợp đồng API.
- `src/services/crops/crops.service.ts`: HTTP requests.
- `src/hooks/api/crops/useCrops.ts`: queries/mutations.
- `src/utils/cropValidation.ts`: chuẩn hóa payload và xử lý lỗi.
- `src/components/crops/`: trình duyệt danh mục, form và chọn cây cho công việc.
- `src/app/crops/`: màn hình danh sách và chi tiết.
