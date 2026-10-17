// Vietnamese source phrases are stable keys; user-entered content stays unchanged.
const entries = `
Trang chủ|Home
T2|Mon
T3|Tue
T4|Wed
T5|Thu
T6|Fri
T7|Sat
CN|Sun
Thêm công việc thất bại|Could not create the task
Cập nhật công việc thất bại|Could not update the task
Xóa công việc thất bại|Could not delete the task
công việc|tasks
công việc từ ngày trước vẫn đang chờ|tasks from earlier days are still pending
công việc đã tải.|loaded tasks.
công việc đã tải. Xem danh sách đầy đủ|loaded tasks. View the full list
Thống kê từ|Statistics from
Lịch đang hiển thị|Schedule currently shows
nông trại đang quản lý|farms managed
Nông trại:|Farm:
Danh mục cây trồng|Crop catalog
Lưu giống, ghi chú và vùng trồng|Save varieties, notes and growing regions
Cây trồng của bạn|Your crops
Mỗi giống và ghi chú có thể lưu thành một cây riêng, kể cả cùng tên.|Save different varieties and notes as separate entries, even with the same name.
Thêm cây trồng|Add crop
Sửa cây trồng|Edit crop
Lưu cây trồng|Save crop
Tên cây trồng|Crop name
Ví dụ: Cà chua|Example: Tomato
Giống cây|Variety
Giống do bạn lựa chọn|Your chosen variety
Giống đã lưu không thể để trống.|An existing variety cannot be empty.
Không bắt buộc, tối đa 100 ký tự.|Optional, up to 100 characters.
Không bắt buộc, tối đa 2000 ký tự.|Optional, up to 2,000 characters.
Thông tin và ghi chú về cây…|Information and notes about the crop…
Vùng trồng|Growing regions
Thêm vùng của bạn, tối đa 100 ký tự mỗi vùng.|Add your regions, up to 100 characters each.
Tên vùng|Region name
Ví dụ: Miền Nam|Example: Southern Vietnam
Thêm vùng|Add region
Xóa vùng|Remove region
Chưa chọn vùng. Có thể để trống.|No regions selected. This is optional.
Vui lòng nhập tên cây trồng.|Please enter a crop name.
Tên cây trồng tối đa 100 ký tự.|Crop names can have up to 100 characters.
Giống cây tối đa 100 ký tự.|Varieties can have up to 100 characters.
Mô tả tối đa 2000 ký tự.|Descriptions can have up to 2,000 characters.
Vui lòng nhập tên vùng.|Please enter a region name.
Tên vùng tối đa 100 ký tự.|Region names can have up to 100 characters.
Vùng này đã có trong danh sách.|This region is already listed.
Chỉ được chọn tối đa 20 vùng.|You can select up to 20 regions.
Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.|Your session has expired. Please sign in again.
Cây trồng không tồn tại hoặc không thuộc tài khoản của bạn.|This crop does not exist or does not belong to your account.
Không thể xử lý yêu cầu. Vui lòng thử lại.|Could not complete the request. Please try again.
Tìm cây trồng|Search crops
Nhập tên cây hoặc giống…|Enter a crop name or variety…
Kết quả:|Results:
Lọc theo vùng|Filter by region
Lọc vùng|Region filter
Tải lại danh mục|Refresh catalog
Vùng cần tìm|Region to find
Nhập chính xác tên vùng|Enter the exact region name
Miền Bắc|Northern Vietnam
Miền Trung|Central Vietnam
Miền Nam|Southern Vietnam
Áp dụng vùng|Apply region
Bỏ lọc vùng|Clear region filter
Không tìm thấy cây phù hợp|No matching crops
Danh mục chưa có cây trồng|Your catalog is empty
Thử tên hoặc vùng khác.|Try another name or region.
Thêm cây để lưu giống, ghi chú và vùng trồng.|Add crops to save varieties, notes and growing regions.
Chưa ghi giống cây|No variety specified
Trang|Page
Trước|Previous
Sau|Next
Chi tiết cây trồng|Crop details
Thông tin trong danh mục của bạn|Information in your catalog
Cập nhật:|Updated:
Chưa chọn vùng.|No regions selected.
Xóa cây trồng?|Delete crop?
Xóa cây trồng|Delete crop
Không thể xóa cây trồng|Could not delete crop
Đang xóa…|Deleting…
Chỉ xóa cây trong danh mục. Công việc và mẫu chăm sóc đã tạo vẫn giữ nguyên.|Only the catalog entry will be deleted. Existing tasks and care templates will be kept.
Danh mục này lưu cây và giống. Ngày gieo trồng và giai đoạn thuộc kế hoạch chăm sóc.|This catalog stores crops and varieties. Planting dates and growth stages belong to care plans.
Quản lý cây và giống của bạn|Manage your crops and varieties
Chọn từ danh mục cây trồng|Choose from crop catalog
Chọn cây trồng|Choose crop
Tên cây được điền vào công việc; bạn có thể sửa lại.|The crop name is filled into the task; you can edit it.
Điều kiện mật khẩu|Password requirements
Đúng 8 ký tự|Exactly 8 characters
Có chữ hoa (A–Z)|An uppercase letter (A–Z)
Có chữ thường (a–z)|A lowercase letter (a–z)
Có chữ số (0–9)|A number (0–9)
Có ký tự đặc biệt, ví dụ !@#$%|A special character, e.g. !@#$%
Không chỉ chứa khoảng trắng|Not just whitespace
Mật khẩu phải có đúng 8 ký tự|Password must have exactly 8 characters
Mật khẩu phải có ít nhất một chữ hoa (A-Z)|Password must contain an uppercase letter (A-Z)
Mật khẩu phải có ít nhất một chữ thường (a-z)|Password must contain a lowercase letter (a-z)
Mật khẩu phải có ít nhất một chữ số (0-9)|Password must contain a number (0-9)
Mật khẩu phải có ít nhất một ký tự đặc biệt, ví dụ !@#$%|Password must contain a special character, e.g. !@#$%
Mật khẩu không được chỉ chứa khoảng trắng|Password must not contain only whitespace
Email đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.|This email is registered. Please sign in or use another email.
Không thể đăng ký|Could not register
Không thể đăng ký. Vui lòng thử lại.|Could not register. Please try again.
Không thể kết nối máy chủ. Kiểm tra mạng và thử lại.|Cannot connect to the server. Check your connection and try again.
Thông báo|Notice
Đăng ký thành công|Registration successful
Bạn có chắc chắn muốn xóa nông trại|Are you sure you want to delete the farm
Dữ liệu này không thể khôi phục.|This data cannot be recovered.
Chưa thể xóa nông trại|Farm cannot be deleted yet
Server chưa cho phép xóa nông trại do xung đột dữ liệu.|The server cannot delete this farm because of conflicting data.
Không thể xóa nông trại. Vui lòng thử lại.|Could not delete the farm. Please try again.
Kiểm tra các lô đất và công việc liên quan đến nông trại rồi thử lại.|Check the plots and tasks associated with this farm, then try again.
Độ ẩm|Humidity
Trạm|Station
THỜI TIẾT HIỆN TẠI|CURRENT WEATHER
Lên kế hoạch theo diễn biến thời tiết|Plan around the weather
Theo dõi dự báo để chủ động tưới tiêu và bảo vệ cây trồng.|Follow the forecast to plan watering and protect crops.
Tạo nông trại và lô đất trước để dùng điền nhanh khu vực.|Create a farm and a plot to use quick location entry.
Lịch trình|Schedule
Chẩn đoán|Diagnosis
Thị trường|Market
Cài đặt|Settings
Tạo công việc|Create task
Tạo công việc mới|Create a new task
Tạo việc|New task
+ Tạo công việc|+ Create task
Lưu công việc|Save task
Công việc|Tasks
Công việc & khu vực|Task & location
Công việc chăm sóc|Farm task
Tên công việc|Task name
Tên nông trại|Farm name
Tên lô đất|Plot name
Nông trại|Farm
Nông trại *|Farm *
Lô đất|Plot
Lô đất *|Plot *
Lô canh tác|Farm plots
Cây trồng|Crop
Cây trồng:|Crop:
Chọn nông trại|Select a farm
Chọn lô đất|Select a plot
Chọn nông trại trước|Select a farm first
Chọn nơi thực hiện và nội dung cần làm.|Choose where and what needs to be done.
Lên kế hoạch chăm sóc cho vườn|Plan your farm care
Thời gian & mức ưu tiên|Time & priority
Chọn ngày, giờ và trạng thái ban đầu.|Choose the date, time and initial status.
Ngày thực hiện|Scheduled date
Giờ thực hiện|Scheduled time
Mức ưu tiên|Priority
Thấp|Low
Trung bình|Medium
Cao|High
Trạng thái|Status
Chờ thực hiện|Pending
Chờ làm|Pending
Đang chờ|Pending
Hoàn thành|Completed
Đã hoàn thành|Completed
Đã xong|Done
Đã hủy|Cancelled
Tất cả|All
Thông tin bổ sung|Additional details
Ghi lại hướng dẫn và vật tư cần chuẩn bị.|Add instructions and supplies to prepare.
Mô tả|Description
Ghi chú|Notes
Các bước thực hiện…|Steps to follow…
Vật tư hoặc lưu ý…|Supplies or reminders…
Ví dụ: Bón phân cho cà phê|Example: Fertilize the coffee plants
Ví dụ: Cà phê|Example: Coffee
Vui lòng nhập tên công việc.|Please enter a task name.
Vui lòng chọn nông trại.|Please select a farm.
Vui lòng chọn lô đất.|Please select a plot.
Vui lòng đăng nhập lại|Please sign in again
Đã tạo công việc|Task created
Kế hoạch mới đã được lưu.|Your new plan has been saved.
Xong|Done
Quay lại|Back
Hủy|Cancel
Đóng|Close
Xóa|Delete
Sửa|Edit
Thêm|Add
Lỗi|Error
Thất bại|Failed
Thành công|Success
Thử lại|Try again
Thử tải lại|Retry
Ngôn ngữ|Language
Tiếng Việt|Vietnamese
Tiếng Anh|English
CÀI ĐẶT CHUNG|GENERAL SETTINGS
Đổi mật khẩu|Change password
Điều khoản & Chính sách|Terms & Privacy
Hồ sơ và tùy chọn ứng dụng|Profile and app preferences
TRẠNG THÁI TÀI KHOẢN|ACCOUNT STATUS
Đang hoạt động|Active
Thông tin cá nhân|Personal information
Hồ sơ cá nhân|Profile
Hồ sơ của bạn|Your profile
Thông tin tài khoản|Account details
Thông tin liên hệ|Contact information
Thông tin tài khoản của bạn|Your account details
Xem và cập nhật thông tin|View and update your information
Chỉnh sửa hồ sơ|Edit profile
Chỉnh sửa thông tin|Edit information
Lưu thay đổi|Save changes
Tên của bạn|Your name
Họ và tên|Full name
Nhập họ và tên|Enter your full name
Vui lòng nhập tên.|Please enter your name.
Vui lòng nhập họ và tên.|Please enter your full name.
Đăng xuất|Sign out
Đăng nhập|Sign in
Tạo tài khoản|Create account
Mật khẩu|Password
Tạo mật khẩu|Create password
Nhập mật khẩu|Enter password
Email hoặc số điện thoại|Email or phone number
Nhập tài khoản của bạn|Enter your account
Hiện mật khẩu|Show password
Ẩn mật khẩu|Hide password
Chào mừng trở lại|Welcome back
Đăng nhập để tiếp tục chăm sóc vườn.|Sign in to continue caring for your farm.
Chưa có tài khoản? Đăng ký ngay|No account? Sign up
Đã có tài khoản? Đăng nhập|Already have an account? Sign in
Đồng hành cùng nhà nông|Growing with farmers
Bắt đầu hành trình chăm vườn|Start your farming journey
Khởi đầu mùa vụ mới|Start a new season
Tạo tài khoản để quản lý công việc và theo dõi vườn của bạn.|Create an account to manage tasks and follow your farm.
Thông tin được sử dụng cho tài khoản của bạn.|This information is used for your account.
Vui lòng nhập email.|Please enter your email.
Email chưa đúng định dạng.|Please enter a valid email address.
Vui lòng nhập mật khẩu.|Please enter your password.
Vui lòng nhập tài khoản.|Please enter your account.
Mật khẩu cần ít nhất 6 ký tự.|Password must have at least 6 characters.
Dùng ít nhất 6 ký tự.|Use at least 6 characters.
Không thể đăng nhập|Unable to sign in
Kiểm tra thông tin đăng nhập và kết nối mạng rồi thử lại.|Check your credentials and connection, then try again.
Đang xử lý…|Processing…
Điền thông tin và lưu thay đổi|Enter details and save changes
Chăm sóc mùa vụ mỗi ngày|Care for your crops every day
NHẬT KÝ NHÀ VƯỜN|FARM JOURNAL
Chăm chút hôm nay,|Care today,
bội thu ngày mai.|harvest tomorrow.
Sẵn sàng cho một ngày chăm vườn mới.|Ready for a new day on the farm.
Đang tải kế hoạch của bạn…|Loading your plan…
Chưa tải được kế hoạch hôm nay|Could not load today's plan
Lịch chăm sóc hôm nay|Today's care plan
Mở lịch để xem kế hoạch|Open your schedule to view tasks
Tiện ích nhà vườn|Farm tools
Lên lịch chăm vườn|Plan farm care
Chẩn đoán cây|Diagnose plants
Kiểm tra tình trạng|Check plant health
Trợ lý canh tác|Farming assistant
Hỏi đáp kỹ thuật|Ask about farming
Giá nông sản|Crop prices
Theo dõi thị trường|Follow the market
Nhịp chăm sóc|Care overview
Kế hoạch 7 ngày gần đây|Plans from the last 7 days
Trạng thái công việc theo ngày lên lịch|Task status by scheduled date
7 ngày|7 days
Việc cần ưu tiên|Priority tasks
Ưu tiên cao|High priority
Ưu tiên vừa|Medium priority
Ưu tiên thấp|Low priority
Hôm nay|Today
Hôm nay chưa có kế hoạch|No plans for today
Ngày này chưa có kế hoạch|No plans for this day
Đã xong các việc hôm nay!|Today's tasks are all done!
Thêm công việc để chủ động chăm sóc mùa vụ.|Add tasks to stay ahead of crop care.
Không thể tải công việc|Unable to load tasks
Chưa tải được dữ liệu biểu đồ. Kéo xuống để thử lại.|Could not load chart data. Pull down to retry.
Thời tiết quanh vườn|Weather near your farm
Chưa có dữ liệu thời tiết|No weather data yet
Kiểm tra quyền vị trí và kết nối mạng.|Check location permissions and your connection.
Dự báo|Forecast
Dự báo quanh bạn|Local forecast
Thời tiết|Weather
THỜI TIẾT HIỆN TẠI|CURRENT WEATHER
GỢI Ý CANH TÁC|FARMING TIPS
Dự báo 24 giờ tới|Next 24 hours
Dự báo 7 ngày tới|Next 7 days
Dự báo lượng mưa|Rainfall forecast
Độ ẩm đất theo khu vực|Soil moisture by area
Dữ liệu minh họa · Chưa kết nối cảm biến đất|Sample data · Soil sensors are not connected
Tổng lượng mưa trong các khoảng dự báo của từng ngày.|Rainfall totals for each day's forecast intervals.
Ngày đầu và cuối có thể chỉ có dữ liệu cho một phần ngày.|The first and last day may contain partial-day forecasts.
Chưa có dữ liệu dự báo lượng mưa.|No rainfall forecast data yet.
Gió|Wind
Độ ẩm|Humidity
Độ ẩm:|Humidity:
Độ ẩm không khí|Air humidity
Tầm nhìn|Visibility
Vườn A|Plot A
Vườn B|Plot B
Vườn C|Plot C
Nhịp thị trường|Market overview
Giá nông sản và tin tức mới|Crop prices and latest news
Theo dõi giá và tin tức nông nghiệp|Follow prices and farming news
Bảng giá|Prices
Tin tức|News
Tìm tên nông sản…|Search crops…
Tìm nông sản|Search crops
Xóa tìm kiếm|Clear search
Chưa có lịch sử giá|No price history yet
Chưa có dữ liệu bảng giá.|No price data yet.
Không tìm thấy nông sản phù hợp.|No matching crops found.
Không tải được giá mới. Chạm để thử lại.|Could not load prices. Tap to retry.
Chăm vườn theo kế hoạch|Plan your farm care
LỊCH HÔM NAY|TODAY'S PLAN
KẾ HOẠCH TRONG NGÀY|DAILY PLAN
Các công việc trong ngày của bạn|Your tasks for the day
Một ngày trống để lên kế hoạch mới|A free day to make new plans
Không thể tải lịch trình|Unable to load schedule
Đang tải lịch trình…|Loading schedule…
Kéo xuống hoặc nhấn bên dưới để tải lại.|Pull down or tap below to retry.
Chưa có kế hoạch cho ngày này|No plans for this day
Thêm một công việc để bắt đầu chăm sóc vườn.|Add a task to start caring for your farm.
Không có công việc ở trạng thái này|No tasks with this status
Chọn Tất cả để xem các công việc trong ngày.|Choose All to see the day's tasks.
Xem tất cả|View all
Xem lịch|View schedule
Xem chi tiết|View details
Xem thêm|Show more
CHUẨN BỊ TRƯỚC|PLAN AHEAD
Những ngày tiếp theo|Coming up
Chưa có thông tin khu vực|Location not specified
Thao tác với công việc|Task actions
Xóa công việc|Delete task
Xóa công việc?|Delete this task?
Thao tác này không thể hoàn tác.|This cannot be undone.
Tuần|Week
Tháng|Month
Tháng trước|Previous month
Tháng sau|Next month
Tuần trước|Previous week
Tuần sau|Next week
Có công việc|Has tasks
Chọn ngày hôm nay|Select today
Chủ nhật|Sunday
Thứ hai|Monday
Thứ ba|Tuesday
Thứ tư|Wednesday
Thứ năm|Thursday
Thứ sáu|Friday
Thứ bảy|Saturday
Mọi công việc|All tasks
Chi tiết công việc|Task details
NGÀY THỰC HIỆN|SCHEDULED DATE
GIỜ THỰC HIỆN|SCHEDULED TIME
Khu vực & cây trồng|Location & crop
Chưa có mô tả.|No description.
Không có ghi chú thêm.|No additional notes.
Đánh dấu hoàn thành|Mark as completed
Tìm trong công việc đã tải|Search loaded tasks
Nhập tên công việc…|Enter a task name…
Tìm và theo dõi kế hoạch chăm sóc|Find and follow your care plans
Không có công việc phù hợp.|No matching tasks.
Chưa tải được công việc.|Could not load tasks.
Tải thêm công việc|Load more tasks
Quản lý nông trại|Manage farms
Quản lý lô đất|Manage plots
Quản lý Lô đất|Manage plots
Khu vực canh tác|Growing areas
Lô đất của bạn|Your plots
Tìm nông trại|Search farms
Tìm lô đất|Search plots
Nhập tên nông trại…|Enter a farm name…
Nhập tên lô đất…|Enter a plot name…
Tạo nông trại|Create farm
Tạo lô đất|Create plot
Cập nhật nông trại|Update farm
Cập nhật lô đất|Update plot
Lưu nông trại|Save farm
Lưu lô đất|Save plot
Vị trí|Location
Địa chỉ hoặc khu vực canh tác|Address or growing area
Ghi chú về nông trại…|Farm notes…
Thuộc nông trại *|Farm *
Ví dụ: Nông trại Suối Ngàn|Example: Riverside Farm
Ví dụ: Lô cà phê số 1|Example: Coffee plot 1
Đặc điểm hoặc ghi chú về lô đất…|Plot characteristics or notes…
Chưa có lô đất nào|No plots yet
Chưa có nông trại nào. Hãy thêm mới nhé!|No farms yet. Add your first one!
Không tìm thấy lô đất phù hợp|No matching plots
Không tìm thấy nông trại phù hợp. Hãy thử tên khác.|No matching farms. Try another name.
Hãy thử tên khác hoặc chọn nông trại khác.|Try another name or farm.
Bấm nút Thêm ở góc trên để tạo lô đất mới.|Tap Add above to create a plot.
Xem lô đất của Nông trại:|Filter plots by farm:
Thiếu thông tin|Missing information
Vui lòng nhập tên nông trại.|Please enter a farm name.
Vui lòng nhập tên lô đất.|Please enter a plot name.
THÔNG BÁO & CẢNH BÁO|NOTIFICATIONS & ALERTS
Cảnh báo thời tiết|Weather alerts
Mưa bão, hạn hán bất thường|Storms and unusual drought
Bác sĩ cây trồng|Plant doctor
Kiểm tra và theo dõi cây của bạn|Check and monitor your plants
QUÉT CÂY TRỒNG|SCAN A PLANT
Phát hiện sớm để xử lý kịp thời|Detect problems early
Đặt lá hoặc bộ phận cây cần kiểm tra vào khung quét để nhận phân tích.|Place the leaf or plant part in the frame to analyse it.
THƯ VIỆN|LIBRARY
ĐÈN FLASH|FLASH
Lịch sử chẩn đoán|Diagnosis history
Hỏi chuyên gia|Ask an expert
Hỏi đáp về kỹ thuật và mùa vụ|Farming questions and advice
Câu hỏi cho trợ lý|Question for the assistant
Bạn muốn hỏi điều gì về mùa vụ?|What would you like to ask about your crops?
Gửi câu hỏi|Send question
Vừa xong|Just now
Tạo nhanh|Quick create
Nói để tạo việc|Speak to create a task
Nhấn và nói công việc cần làm|Tap and describe your task
Đang nghe…|Listening…
Dừng ghi giọng nói|Stop listening
Dùng nội dung này|Use this text
Nội dung nhận dạng|Recognized text
Kiểm tra và sửa thông tin trước khi lưu.|Review and edit the details before saving.
Việc gần đây|Recent tasks
Chọn một việc để dùng lại nội dung và khu vực.|Choose a task to reuse its details and location.
Chưa có việc gần đây. Bạn có thể chọn gợi ý bên dưới.|No recent tasks. Choose a suggestion below.
Gợi ý thường dùng|Common tasks
Tưới nước|Water plants
Bón phân|Fertilize
Làm cỏ|Weed the plot
Kiểm tra sâu bệnh|Check for pests
Thu hoạch|Harvest
Nói ví dụ: Ngày mai tưới cà phê lúc 7 giờ sáng.|Example: Tomorrow water the coffee plants at 7 am.
Thiết bị chưa hỗ trợ nhận dạng giọng nói. Bạn có thể nhập bằng bàn phím.|Speech recognition is unavailable. You can type instead.
Cho phép micro và nhận dạng giọng nói để nhập công việc.|Allow microphone and speech recognition to enter tasks.
Không nghe rõ. Vui lòng thử nói lại.|No speech detected. Please try again.
Không thể nhận dạng giọng nói. Kiểm tra kết nối và thử lại.|Speech recognition failed. Check your connection and retry.
Đã điền thông tin. Kiểm tra ngày giờ rồi lưu công việc.|Details filled in. Review the date and time, then save.
Khu vực cũ không còn khả dụng. Vui lòng chọn lại.|The previous location is no longer available. Please select another.
Đang xin quyền micro…|Requesting microphone permission…
Ngôn ngữ hiển thị và giọng nói|Display and speech language
Chọn ngôn ngữ|Choose language
Đang tải khu vực. Vui lòng thử lại sau.|Locations are loading. Please try again shortly.
Nông trại:|Farm:
`.trim().split("\n");
export const english: Record<string, string> = Object.fromEntries(entries.map(line => {
  const index = line.indexOf("|");
  return [line.slice(0, index), line.slice(index + 1)];
}));
