# UA Control Room

SaaS nội bộ cho tối đa 10 thành viên UA Marketing vận hành paid acquisition đa nền tảng. Landing page công khai, dashboard invite-only, phân quyền theo vai trò và nền tảng sẵn sàng để kết nối Meta Ads, Google Ads, TikTok Ads cùng MMP.

## Những gì đã có

- Landing page responsive tại `/`.
- Đăng nhập bằng mật khẩu hoặc magic link tại `/login.html`.
- Luồng kích hoạt tài khoản từ email mời.
- Dashboard tại `/app.html`, tự chuyển về login khi Supabase đã được cấu hình.
- Owner/Admin mời thành viên; API khóa cứng giới hạn 10 seat.
- Vai trò `owner`, `admin`, `ua_lead`, `ua_buyer`.
- Trang Team & assignments, trạng thái seat và session.
- Module AppsFlyer Analytics gồm paid/organic acquisition, retention D1/D3/D7/D30, P so với P-1 và Platform × OS.
- AppsFlyer Data Pull xuất hiện như một nguồn đo lường riêng trong Ad accounts và Integrations.
- API connector health, team, invite và sync status.
- Database schema, trigger giới hạn seat và Row Level Security.
- Demo mode tự động khi chưa có Supabase credentials.

## Chạy local

Ứng dụng không cần build step:

```bash
npx serve . -l 3000
```

Mở `http://localhost:3000`.

```bash
npm run check
```

## Kích hoạt Supabase Auth

1. Tạo một Supabase project.
2. Mở SQL Editor và chạy toàn bộ `supabase/schema.sql`.
3. Tạo user đầu tiên trong Supabase Authentication.
4. Chạy câu lệnh dưới đây trong SQL Editor, thay email bằng email Owner:

```sql
update public.profiles
set role = 'owner', status = 'active'
where email = 'owner@yourcompany.com';
```

5. Trong Supabase Authentication → URL Configuration:
   - Site URL: domain Vercel production.
   - Redirect URL: `https://your-domain.vercel.app/login.html`.

## Deploy lên GitHub + Vercel

1. Import repository GitHub vào Vercel.
2. Framework Preset chọn **Other**, không cần build command hoặc output directory.
3. Thêm các biến môi trường:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAILS`: email Owner/Admin, ngăn cách bằng dấu phẩy
   - `APP_URL`: domain production đầy đủ
   - `APPSFLYER_API_TOKEN`
   - `APPSFLYER_APP_IDS`: danh sách App ID ngăn cách bằng dấu phẩy
4. Deploy lại và kiểm tra `/api/health`, `/api/config`, `/login.html`.

`SUPABASE_SERVICE_ROLE_KEY` chỉ được nhập trong Vercel Environment Variables. Không đặt key này trong HTML, JavaScript phía trình duyệt hoặc GitHub.

## Giai đoạn API dữ liệu thật

1. OAuth callback server-side riêng cho Meta, Google và TikTok.
2. Lưu refresh/access token trong Vault hoặc secret store.
3. Job đồng bộ incremental, rate-limit handling, retry queue và backfill.
4. Chuẩn hóa `ad_accounts`, `campaigns`, `ad_groups`, `ads`, `daily_insights`, `creatives`.
5. Kết nối AppsFlyer/Adjust/Firebase cho retention, LTV và cohort ROAS.
6. Mọi write action budget/status đi qua approval; campaign draft mặc định paused.

Không commit `.env`, API secret hoặc access token vào GitHub.
