# UA Control Room

SaaS nội bộ cho tối đa 10 thành viên UA Marketing vận hành paid acquisition đa nền tảng. Landing page công khai, dashboard invite-only, phân quyền theo vai trò và nền tảng sẵn sàng để kết nối Meta Ads, Google Ads, TikTok Ads cùng MMP.

## Những gì đã có

- Landing page responsive tại `/`.
- Đăng nhập bằng mật khẩu tại `/login.html`; người chưa có tài khoản có thể gửi yêu cầu truy cập.
- Luồng kích hoạt tài khoản từ email mời.
- Dashboard tại `/app.html`, tự chuyển về login khi Supabase đã được cấu hình.
- Owner/Admin mời thành viên; user mới gửi yêu cầu truy cập để Owner/Admin duyệt, chọn role và gửi email mời; API khóa cứng giới hạn 10 seat.
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
- Chỉ số funnel được map riêng cho từng nền tảng thay vì dùng một con số "conversion" chung: Google tách theo `segments.conversion_action_category` (DOWNLOAD → installs, SIGNUP/lead → registrations, PURCHASE/STORE_SALE/SUBSCRIBE_PAID → purchases), Meta chọn một action type duy nhất cho mỗi bước để tránh đếm trùng `omni_*`, TikTok dùng cột `app_install`/`registration`/`purchase` riêng. CTR và CPC của Meta tính trên link click chứ không tính like hay click vào profile.
- Dữ liệu chia 3 tầng: Tier 0 (Spend/ROAS/CPA) cho chủ doanh nghiệp đặt riêng đầu Command Center; Tier 1 là bộ chỉ số chung cả 3 nền tảng đều có gồm Impressions/Clicks/CTR/CPC/CPM và Installs/CPI, Registrations/CPR, Purchases/CPA; Tier 2 là chỉ số đặc thù từng nền tảng, mặc định ẩn và bật/tắt trong "Cột hiển thị" của từng workspace.
- Tier 2 Meta: Reach, Frequency, Cost/1k reached, Link clicks, CPC (link), Outbound clicks/CTR, ThruPlay, Cost/ThruPlay, Video 25/50/75/100%, Quality/Engagement/Conversion ranking. Tier 2 Google: Search IS, Lost IS (budget/rank), Avg. CPC/CPM/TrueView CPV, View-through conversions, Interaction rate, Conversion rate, Channel type, Campaign subtype, Bidding strategy.
- ROAS phân biệt "chưa có purchase event" với ROAS thật bằng 0, và ghi rõ là ROAS D0 tạm tính để không bị hiểu là ROAS theo LTV.
- Meta workspace chọn được attribution window (7-day click + 1-day view mặc định, tới 28-day click), window đang dùng hiện trong dòng trạng thái để đối soát với Ads Manager hoặc AppsFlyer.
- Query Google tách thành 2 tầng: bộ field lõi và bộ Tier 2 được thử trước rồi tự lùi về lõi nếu Google từ chối field hoặc tổ hợp field theo account/level. Khi Search Impression Share không có dữ liệu, cột đó để trống chứ không làm mất toàn bộ dữ liệu.
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

## Chạy bằng Docker local

Docker Desktop phải đang chạy. Bản local hiện dùng image `david-growth-os:local` và container `david-growth-os-local`:

```bash
docker build -t david-growth-os:local .
docker rm -f david-growth-os-local 2>/dev/null || true
docker run -d --name david-growth-os-local --restart unless-stopped -p 127.0.0.1:3000:3000 david-growth-os:local
curl http://127.0.0.1:3000/api/health
```

Nếu cần kiểm tra Compose trước khi lên VPS mà chưa có `.env` thật:

```bash
APP_DOMAIN=localhost ENV_FILE=.env.example docker compose config
```

Không dùng `.env.example` để chạy production; file đó chỉ là template không chứa secret.

## Kích hoạt Supabase Auth

1. Tạo một Supabase project.
2. Mở SQL Editor và chạy toàn bộ `supabase/schema.sql`. Với project đã chạy schema trước đó, chạy thêm `supabase/access_requests.sql` để tạo bảng yêu cầu truy cập và khóa self-sign-up chưa được duyệt.
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

### Luồng yêu cầu truy cập và email Owner

1. User mở `/login.html?mode=signup`, nhập tên, email công việc và lý do (không bắt buộc).
2. Server lưu yêu cầu ở `workspace_access_requests`; user chưa được tạo thành viên active và không thể tự đăng nhập để vượt qua duyệt.
3. Owner/Admin mở **Team & assignments → Access requests**, chọn `Workspace Editor`, `UA Buyer` hoặc `Admin`, sau đó bấm **Approve & invite**. User bị từ chối sẽ không được tạo lời mời.
4. Supabase gửi email invitation cho user đã được duyệt. User đặt mật khẩu từ link đó rồi đăng nhập.
5. Để Owner nhận email thông báo ngay khi có yêu cầu, cấu hình thêm các biến server-side sau; nếu chưa cấu hình, yêu cầu vẫn được lưu và hiện trong dashboard:

```dotenv
OWNER_NOTIFICATION_EMAIL=owner@yourcompany.com
RESEND_API_KEY=...
RESEND_FROM_EMAIL=notifications@your-verified-domain.com
```

`RESEND_API_KEY` chỉ lưu trong environment của VPS/Coolify, không đặt trong HTML, JavaScript trình duyệt, repository hoặc commit. `OWNER_NOTIFICATION_EMAIL` có thể bỏ qua nếu muốn dùng email đầu tiên trong `ADMIN_EMAILS`.

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

## Chạy bản Docker trên VPS

Bản Docker được tách tại repository clone riêng, nên không làm thay đổi phiên bản GitHub gốc. Ứng dụng chạy bằng Node 20 trong container; Caddy đứng phía trước để reverse proxy và cấp HTTPS tự động cho tên miền.

### Chuẩn bị

1. Chuẩn bị một VPS có Docker Engine và Docker Compose plugin.
2. Trỏ bản ghi DNS `A` của tên miền về IP VPS. Nếu có bản ghi `AAAA`, nó cũng phải trỏ đúng VPS hoặc được gỡ bỏ để tránh lỗi truy cập IPv6.
3. Mở inbound TCP `80` và `443` trên firewall/security group của VPS.
4. Chép source của repository clone này lên VPS, ví dụ vào `/opt/david-growth-os`.
5. Tạo file môi trường thật trên VPS:

```bash
cp .env.example .env
chmod 600 .env
```

Điền các biến Supabase, OAuth, AppsFlyer và:

```dotenv
APP_DOMAIN=ads.example.com
APP_URL=https://ads.example.com
NODE_ENV=production
```

Không commit hoặc gửi file `.env`. `SUPABASE_SERVICE_ROLE_KEY`, OAuth secret, token encryption key và AppsFlyer secret chỉ được lưu trong `.env` của VPS.

### Khởi chạy

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f --tail=100 app
```

Kiểm tra trực tiếp trên VPS:

```bash
curl -fsS https://ads.example.com/api/health
```

Kết quả hợp lệ phải có `ok: true`. Caddy sẽ tự xử lý chứng chỉ HTTPS khi DNS đã trỏ đúng và cổng 80/443 có thể truy cập từ Internet. Khi cập nhật source, chạy lại `docker compose up -d --build` để tạo image mới; dữ liệu chứng chỉ của Caddy được giữ trong volume Docker.

### Cập nhật callback OAuth sau khi đổi domain

Sau khi dùng domain VPS, cập nhật đồng thời các URL sau trong dashboard của từng nền tảng và trong `.env`:

- Meta: `https://ads.example.com/api/meta-oauth-callback`
- Google: `https://ads.example.com/api/google-oauth-callback`
- TikTok: `https://ads.example.com/api/tiktok-oauth-callback`
- AppsFlyer Push: `https://ads.example.com/api/appsflyer-push?key=...`

Các callback phải khớp tuyệt đối với URL đã đăng ký, bao gồm giao thức, hostname và path. Sau khi đổi biến môi trường, khởi động lại container:

```bash
docker compose up -d
```

### Vận hành tối thiểu

```bash
docker compose restart app
docker compose pull caddy
docker compose up -d
docker image ls
docker system df
```

Không dùng `docker system prune` trên VPS nếu chưa kiểm tra image/container đang được sử dụng.

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
