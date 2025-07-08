# JITS_INNOVATION_LABS #
### Buổi 10 ### 
# 🛠️ Dự án mini CMS Quản Lý Sản Phẩm

Dự án CMS đơn giản cho phép người dùng đăng ký, đăng nhập và quản lý danh sách sản phẩm (thêm, sửa, xoá, tìm kiếm, phân trang). Dữ liệu được lưu bằng **MySQL**, giao diện frontend viết bằng **React**, API xây dựng bằng **Sails.js**.

## 🚀 Tính năng

### 👤 Xác thực
- Đăng ký tài khoản với `username` + `password`
- Mã hoá mật khẩu bằng `bcrypt`
- Đăng nhập xác thực từ cơ sở dữ liệu
- Lưu phiên bằng `localStorage` (chưa dùng JWT)

### 📦 Quản lý sản phẩm
- Tạo, xem, sửa, xóa sản phẩm
- Tìm kiếm theo tên, mô tả
- Phân trang 5 sản phẩm / trang
- Giao diện bằng React-Bootstrap
- Modal hiển thị form thêm/sửa

## ⚙️ Cài đặt

### 🧩 1. Cài backend (Sails.js)

```bash
cd backend
npm install
sails lift
```

> ⚠️ Bạn cần cài đặt MySQL và tạo CSDL tên `cms` hoặc tên bạn chọn rồi cấu hình trong `config/datastores.js`.

### 🧩 2. Cài frontend (React)

```bash
cd frontend
npm install
npm start
```

> Frontend mặc định chạy ở `http://localhost:3000`, backend là `http://localhost:1337`

## 🔐 API chính

| Method | Endpoint        | Mô tả                  |
|--------|-----------------|------------------------|
| POST   | /register       | Đăng ký người dùng     |
| POST   | /login          | Đăng nhập người dùng   |
| GET    | /products       | Lấy danh sách sản phẩm |
| POST   | /products       | Tạo sản phẩm           |
| PUT    | /products/:id   | Cập nhật sản phẩm      |
| DELETE | /products/:id   | Xoá sản phẩm           |

## 💡 Gợi ý nâng cấp

- [ ] Dùng JWT để bảo vệ route `/products`
- [ ] Thêm `logout`, `quên mật khẩu`
- [ ] Tách vai trò admin/user
- [ ] Thêm upload ảnh sản phẩm
...

## 👨‍💻 Tác giả
- 👤 Ngụy Hữu Phúc
- Dự án học tập React + Node.js (Sails) + MySQL
