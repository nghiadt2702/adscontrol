# UA Control Room

MVP trung tâm vận hành paid acquisition đa nền tảng dành cho mobile app và game. Giao diện lấy cảm hứng từ mô hình “exception-first command center”, nhưng có nhận diện, nội dung và kiến trúc riêng cho Meta Ads, Google Ads và TikTok Ads.

## Chạy local

Ứng dụng hiện tại không cần build step:

```bash
npx serve . -l 3000
```

Mở `http://localhost:3000`.

## Kiểm tra

```bash
npm run check
```

Các API serverless:

- `GET /api/health`
- `GET /api/connectors`

## Deploy lên GitHub + Vercel

1. Tạo repository GitHub và push thư mục này.
2. Trong Vercel, chọn **Add New → Project → Import Git Repository**.
3. Framework Preset chọn **Other**, không cần build command, Output Directory để trống.
4. Thêm biến môi trường từ `.env.example`.
5. Deploy và kiểm tra `/api/health`.

## Mốc production tiếp theo

MVP hiện dùng dữ liệu demo và chỉ kiểm tra độ đầy đủ của cấu hình connector. Trước khi đọc/ghi dữ liệu quảng cáo thật cần:

1. Supabase Auth + PostgreSQL với Row Level Security theo workspace.
2. OAuth callback server-side riêng cho Meta, Google và TikTok.
3. Mã hóa token khi lưu; không trả refresh/access token về browser.
4. Job đồng bộ incremental, rate-limit handling và retry queue.
5. Bảng dữ liệu chuẩn hóa `platform_accounts`, `campaigns`, `daily_insights`, `creatives`, `alerts`, `approval_requests`, `audit_logs`.
6. Mọi write action (budget/status) đi qua approval; mặc định campaign draft là paused.

Không commit `.env` hay token vào GitHub.
