# Demo Docker Fullstack App

Dự án này là một ứng dụng Fullstack mẫu, được thiết lập sẵn môi trường Docker cho cả hai mục đích: **Phát triển (Development)** và **Triển khai (Production)**.

## 🚀 Cấu trúc dự án
- **Frontend**: Chạy React/Vite (Dev server ở môi trường Dev, Nginx ở môi trường Production).
- **Backend**: Chạy Node.js/Express (Có hỗ trợ hot-reload).
- **Database**: PostgreSQL 15.

---

## 🛠 1. Cài đặt ban đầu (Bắt buộc)

Trước khi chạy bất kỳ môi trường nào, bạn cần phải cấu hình file biến môi trường.

1. Clone dự án về máy.
2. Tại thư mục gốc của dự án, copy file `.env.example` và đổi tên bản copy thành `.env`.
   ```bash
   cp .env.example .env
   ```
3. Mở file `.env` lên và điền các thông tin bảo mật (như mật khẩu database, API URL) vào đó.

> **Lưu ý quan trọng**: Tuyệt đối không bao giờ được commit file `.env` lên Git. File này chứa các mật khẩu thực tế và đã được tự động loại bỏ thông qua `.gitignore`.

---

## 💻 2. Chạy môi trường Phát triển (Development)

Môi trường Dev được cấu hình để **hot-reload**. Tức là khi bạn sửa code ở máy, ứng dụng trong container sẽ tự động cập nhật ngay lập tức mà không cần phải build lại.

**Khởi động môi trường Dev:**
```bash
docker compose -f docker-compose.dev.yml up -d
```

**Các cổng (Ports) khả dụng ở local:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

**Xem Log (khi muốn debug lỗi backend/frontend):**
```bash
docker compose -f docker-compose.dev.yml logs -f
```

**Lưu ý:** Chỉ khi bạn cài thêm thư viện mới (ví dụ: `npm install lodash`), bạn mới cần build lại image:
```bash
docker compose -f docker-compose.dev.yml up -d --build
```

---

## 🌍 3. Chạy môi trường Triển khai (Production)

Môi trường Production sẽ đóng gói mã nguồn của bạn thành các Image tối ưu (Frontend được build ra file tĩnh HTML/CSS/JS và chạy bằng Nginx). Mã nguồn sẽ được gắn thẻ (tag) để đẩy lên DockerHub.

> **Tài khoản DockerHub hiện tại**: `anhth09`

### Dành cho người Viết Code (Build & Push lên DockerHub)

1. Đăng nhập Docker (Nếu chưa đăng nhập):
   ```bash
   docker login
   ```
2. Đóng gói (Build) mã nguồn thành Image:
   ```bash
   docker compose -f docker-compose.prod.yml build
   ```
3. Đẩy Image lên DockerHub:
   ```bash
   docker compose -f docker-compose.prod.yml push
   ```

*(Nếu bạn có sửa đổi code và muốn cập nhật bản mới, hãy đổi `v1.0.0` thành `v1.0.1` trong file `docker-compose.prod.yml` rồi lặp lại bước 2 và 3).*

### Dành cho người Chạy App (Khách hàng / Server thực tế)

Người khác hoặc trên Server thực tế không cần cài đặt Node.js hay tải toàn bộ Source code. Họ chỉ cần 2 file:
1. `docker-compose.prod.yml`
2. `.env` (Chứa cấu hình thật, được gửi nội bộ)

Sau đó khởi động hệ thống bằng lệnh:
```bash
docker compose -f docker-compose.prod.yml up -d
```
*(Docker sẽ tự động nhận diện và tải các image từ tài khoản `anhth09` trên mạng về và chạy).*