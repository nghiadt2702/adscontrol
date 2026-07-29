# UA Control Room

Landing page và dashboard demo cho một SaaS quản lý paid acquisition đa nền tảng dành cho mobile app và game.

## Cấu trúc hiện tại

- `/` — landing page giới thiệu sản phẩm.
- `/app.html` — dashboard demo.
- `/api/health` — health check khi chạy trên Vercel.
- `/api/connectors` — kiểm tra trạng thái cấu hình Meta, Google và TikTok.

Landing page hiện có hero, product preview, workflow, security, private beta 10 seats và form demo. Form chưa gửi dữ liệu ra ngoài.

## Chạy local

Ứng dụng không cần build step:

```bash
python3 -m http.server 4175
```

Mở:

- Landing page: `http://localhost:4175`
- Dashboard demo: `http://localhost:4175/app.html`

Kiểm tra JavaScript:

```bash
npm run check
node --check landing.js
```

## Deploy lên Vercel

1. Import repository GitHub vào Vercel.
2. Framework Preset chọn **Other**.
3. Không cần Build Command hoặc Output Directory.
4. Deploy và kiểm tra `/`, `/app.html` và `/api/health`.

## Giai đoạn SaaS tiếp theo

Để hỗ trợ khoảng 10 người dùng đăng ký và đăng nhập:

1. Supabase Auth và PostgreSQL.
2. Row Level Security theo workspace.
3. Vai trò Admin, Team leader và Media buyer.
4. OAuth callback server-side cho Meta, Google và TikTok.
5. Mã hóa token, đồng bộ incremental và retry queue.
6. Approval gate cho mọi write action liên quan budget hoặc trạng thái campaign.

Không commit `.env`, API secret hoặc access token vào GitHub.
