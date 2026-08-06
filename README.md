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
- Module Platform Analytics tổng hợp Meta, Google và TikTok với KPI chính/phụ, daily delivery, P so với P-1, Platform × OS và explorer từ account đến ad.
- Creative Intelligence gộp hiệu suất theo mã creative xuyên account/campaign, kiểm tra chuẩn đặt mã, chấm Reuse Score và tạo gợi ý brief từ winning signals.
- Growth Analytics Dashboard ghép chỉ số quảng cáo, revenue, product growth, funnel và demographics; Audience Segments nhóm user để activation/remarketing.
- Command Center giữ các chỉ số chung: đọc song song Meta, Google và TikTok rồi hợp nhất Spend, Revenue, ROAS, CPA (Purchase), Registrations, Installs và CPI; bộ lọc nền tảng/thời gian cập nhật toàn bộ dashboard.
- Campaign Center được tách thành ba workspace riêng — Meta, Google và TikTok — mỗi workspace có filter, level, selection và trạng thái đồng bộ độc lập, theo dõi từ Campaign → Ad set/Ad group → Ad → Asset.
- Mỗi workspace chỉ gọi connector của nền tảng đó, nên một nền tảng lỗi kết nối không làm hỏng hai nền tảng còn lại.
- Chỉ số chi phí đăng ký được chuẩn hóa thành CPR (Cost per Registration); Cost per Purchase được giữ riêng cho hành vi thanh toán.
- Ads Manager workspace vận hành theo 4 cấp Campaign → Ad set → Ad → Asset, có filter/preset cột, KPI acquisition và commerce (ROAS, Cost/ATC, Cost/Purchase, CPM, CTR, Outbound CTR, Purchases), AI bidding/optimization state và approval guardrail trước mọi write action.
- Optimization Center tổng hợp recommendation, automation coverage, action history và bộ tactic approval-first như SURF, STOP LOSS, SUNSETTING, REVIVE, SCALE, DOWNSCALE và FATIGUE.
- Audience Mixer cho phép ghép tệp hành vi theo giao điểm và ước tính potential reach trước khi lưu thành activation draft.
- Creative Intelligence bổ sung so sánh format, copy length, winning tags và copy signals để hỗ trợ quyết định tái sử dụng creative và viết brief mới.
- Budget Pacing & Forecast kiểm soát monthly plan, run-rate, end-of-month forecast, owner pacing và các đề xuất phân bổ lại qua approval.
- AI Daily Brief hợp nhất decision queue, executive summary, team focus, winners/risks và kế hoạch hành động mỗi ngày; truy cập nhanh từ Command Center.
- 360° Account Audit chấm điểm tracking, campaign structure, budget governance, creative hygiene và naming convention theo từng account.
- Tracking & Attribution Health giám sát freshness, completeness, revenue coverage và độ lệch install giữa platform với AppsFlyer.
- Reporting Center quản lý report template, lịch gửi và stakeholder; Creative Lifecycle Board theo dõi từ brief đến winner/fatigue.
- AppsFlyer Data Pull xuất hiện như một nguồn đo lường riêng trong Ad accounts và Integrations.
- AppsFlyer connector có Push endpoint cho event realtime, Pull sync cho installs/in-app events, lưu snapshot và loại bỏ device identifiers nhạy cảm trước khi ghi dữ liệu.
- Meta connector dùng Facebook OAuth server-side: xác thực profile, liệt kê ad account theo Business Portfolio, chọn phạm vi account, gán UA và mã hóa token AES-256-GCM ở backend.
- TikTok connector dùng TikTok Business API v1.3: authorization portal server-side, liệt kê advertiser theo Business Center, chọn phạm vi advertiser, gán UA, mã hóa access token AES-256-GCM và đọc integrated report ở cấp campaign/ad group/ad.
- Chỉ số funnel được map riêng cho từng nền tảng thay vì dùng một con số "conversion" chung: Google tách theo `segments.conversion_action_category` (DOWNLOAD → installs, SIGNUP/lead → registrations, PURCHASE → purchases), Meta chọn một action type duy nhất cho mỗi bước để tránh đếm trùng `omni_*`, TikTok dùng cột `app_install`/`registration`/`purchase` riêng. CTR và CPC của Meta tính trên link click chứ không tính like hay click vào profile.
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
   - Meta: `META_APP_ID`, `META_APP_SECRET`, `META_REDIRECT_URI`
   - `META_TOKEN_ENCRYPTION_KEY`: secret riêng tối thiểu 32 ký tự để mã hóa token
   - `META_GRAPH_VERSION`: mặc định `v24.0`
   - `META_SCOPES`: mặc định `public_profile,ads_read,business_management`
   - `UA_DEFAULT_NAMES`: mặc định `David,Tommy,Nelson`
   - Google: `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_REDIRECT_URI`, `GOOGLE_TOKEN_ENCRYPTION_KEY`
   - TikTok: `TIKTOK_APP_ID`, `TIKTOK_APP_SECRET`, `TIKTOK_REDIRECT_URI`, `TIKTOK_TOKEN_ENCRYPTION_KEY`
   - `APPSFLYER_API_TOKEN`
   - `APPSFLYER_APP_IDS`: danh sách App ID ngăn cách bằng dấu phẩy
   - `APPSFLYER_PUSH_SECRET`: secret dùng trong Push endpoint URL/Authorization
   - `APPSFLYER_INTEGRATION_KEY`: khóa tạm cho Owner chạy sync khi Supabase Auth chưa bật
4. Deploy lại và kiểm tra `/api/health`, `/api/config`, `/login.html`.

`SUPABASE_SERVICE_ROLE_KEY` chỉ được nhập trong Vercel Environment Variables. Không đặt key này trong HTML, JavaScript phía trình duyệt hoặc GitHub.

## Giai đoạn API dữ liệu thật

1. OAuth callback server-side riêng cho Meta, Google và TikTok.
2. Lưu refresh/access token trong Vault hoặc secret store.
3. Job đồng bộ incremental, rate-limit handling, retry queue và backfill.
4. Chuẩn hóa `ad_accounts`, `campaigns`, `ad_groups`, `ads`, `daily_insights`, `creatives`.
5. Kết nối AppsFlyer/Adjust/Firebase cho retention, LTV và cohort ROAS.
6. Mọi write action budget/status đi qua approval; campaign draft mặc định paused.

## Test AppsFlyer

1. Chạy `supabase/appsflyer.sql` trong Supabase SQL Editor.
2. Khai báo bốn biến `APPSFLYER_*` trong Vercel.
3. Cấu hình AppsFlyer Push API tới `/api/appsflyer-push?key=...`.
4. Chọn Install và Install in-app events rồi dùng Send test.
5. Trong AppsFlyer Analytics, chọn khoảng thời gian và bấm Đồng bộ ngay để chạy Pull API.

Không commit `.env`, API secret hoặc access token vào GitHub.

## Kích hoạt Meta OAuth

1. Trong Supabase SQL Editor, chạy `supabase/meta.sql` một lần.
2. Tạo Meta Business app trong Meta for Developers và thêm Marketing API cùng Facebook Login for Business.
3. Thêm callback chính xác: `https://your-domain.vercel.app/api/meta-oauth-callback`.
4. Điền callback đó vào `META_REDIRECT_URI` trên Vercel.
5. Tạo `META_TOKEN_ENCRYPTION_KEY` bằng một chuỗi bí mật ngẫu nhiên; không dùng lại App Secret.
6. Khi chỉ tracking, giữ `META_SCOPES=public_profile,ads_read,business_management`. Chỉ thêm `ads_management` khi đã xây và duyệt chức năng ghi thay đổi lên quảng cáo.
7. Deploy lại, đăng nhập bằng Owner/Admin, mở **Integrations → Meta Ads → Kết nối Facebook**.
8. Chọn những ad account cần đưa vào workspace, gán David/Tommy/Nelson rồi lưu.

Token Meta chỉ tồn tại ở bảng `meta_authorizations` dưới dạng mã hóa. Giao diện trình duyệt không nhận token. Nút **Ngắt kết nối** sẽ thu hồi Business Integration trên Meta và xóa token cùng phạm vi account trong Ads Control.

## Kích hoạt Google Ads OAuth

1. Trong Supabase SQL Editor, chạy `supabase/google.sql` một lần.
2. Trong Google Cloud Console, tạo OAuth Client loại **Web application**, bật Google Ads API và thêm Authorized redirect URI: `https://your-domain.vercel.app/api/google-oauth-callback`.
3. Trong Google Ads Manager, mở **Tools → API Center** để lấy Developer Token. Token cần được Google phê duyệt để đọc production accounts.
4. Trên Vercel, thêm `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_REDIRECT_URI` và `GOOGLE_TOKEN_ENCRYPTION_KEY`. Key mã hóa phải là một secret ngẫu nhiên riêng, tối thiểu 32 ký tự.
5. Deploy lại. Đăng nhập Owner/Admin → **Integrations → Google Ads → Kết nối OAuth** → đăng nhập Google → chọn các client account cần theo dõi.

Google refresh/access token chỉ được lưu mã hóa trong `google_authorizations`; browser không nhận token. Kết nối chỉ dùng scope Google Ads để đọc reporting. Nút **Ngắt kết nối** thu hồi OAuth grant và xóa các account đã chọn khỏi workspace.

## Kích hoạt TikTok Ads

1. Trong Supabase SQL Editor, chạy `supabase/tiktok.sql` một lần.
2. Trong TikTok for Business → **My Apps**, tạo một app Marketing API và lấy **App ID** cùng **App Secret** ở phần Basic Information.
3. Thêm Advertiser Redirect URL chính xác: `https://your-domain.vercel.app/api/tiktok-oauth-callback`.
4. Trên Vercel, thêm `TIKTOK_APP_ID`, `TIKTOK_APP_SECRET`, `TIKTOK_REDIRECT_URI` và `TIKTOK_TOKEN_ENCRYPTION_KEY`. Key mã hóa phải là secret ngẫu nhiên riêng, tối thiểu 32 ký tự; nếu bỏ trống, hệ thống dùng App Secret nhưng nên khai báo key riêng.
5. Deploy lại. Đăng nhập Owner/Admin → **Integrations → TikTok Ads → Kết nối OAuth** → cấp quyền trên TikTok → chọn advertiser cần theo dõi và gán UA.
6. Mở **Campaign center → TikTok workspace** để đọc campaign, ad group và ad.

TikTok không phát hành refresh token cho ads access token: token là long-lived và chỉ được lưu mã hóa trong `tiktok_authorizations`. Vì TikTok cũng không có endpoint thu hồi token, nút **Ngắt kết nối** sẽ xóa token cùng phạm vi advertiser trong Ads Control; nếu muốn thu hồi hoàn toàn, xóa app khỏi phần Authorized Apps trong TikTok Ads Manager.

Reporting dùng `report/integrated/get/` với `report_type=BASIC`, `service_type=AUCTION` và `data_level` tương ứng `AUCTION_CAMPAIGN` / `AUCTION_ADGROUP` / `AUCTION_AD`. Các cột app/commerce (`real_time_app_install`, `registration`, `purchase`, `total_purchase_value`) được yêu cầu trước; nếu advertiser không chạy app/purchase event và TikTok từ chối các cột đó, connector tự thử lại với bộ metric cơ bản.
