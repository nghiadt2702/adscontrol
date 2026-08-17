# David Growth OS — Admin Ads UI/UX Optimization Brief

## 0. Mục đích

Tài liệu handoff để gửi cho Claude khi tối ưu tiếp giao diện trang quản trị quảng cáo David Growth OS.

Mục tiêu:

- Hiểu đúng cấu trúc UI hiện tại trước khi sửa.
- Giúp người vận hành overview trong vài giây nhưng vẫn drill-down được.
- Giữ đúng source, định nghĩa và trạng thái của mọi metric.
- Đề xuất biểu đồ có ích, đặc biệt cho Command Center.
- Không dùng dữ liệu giả và không biến dữ liệu thiếu thành số 0.

Đây là product/UI brief. Không tự động commit, push, deploy hay thay đổi production nếu chưa có yêu cầu riêng.

---

## 1. Bối cảnh sản phẩm

David Growth OS là trang quản trị paid acquisition cho Meta, Google và TikTok, kết hợp AppsFlyer để theo dõi acquisition, post-install, retention và cohort.

Người dùng cần:

1. Theo dõi delivery và hiệu quả campaign.
2. So sánh nhiều nền tảng, tài khoản và khoảng thời gian.
3. Nhìn thấy campaign active, campaign bị limited và vấn đề về data freshness.
4. Gom creative theo mã chuẩn hóa xuyên nhiều tài khoản.
5. Drill-down từ platform → account → campaign → ad set/ad group → ad → asset.
6. Xem đúng quyền: Owner có integration access; user khác chỉ thấy scope được cấp.

Nguyên tắc:

- Overview trước, chi tiết sau.
- Số liệu thật trước, giải thích nguồn ngay cạnh số liệu.
- Tối giản card và biểu đồ nhưng vẫn truy nguyên được.
- Creative không tự động chấm điểm chủ quan.
- Write operation phải đi qua approval guardrail.

---

## 2. Bản đồ giao diện hiện tại

| Khu vực | Hash/route | Vai trò | Ưu tiên |
|---|---|---|---|
| Command center | #overview | Điều hành tổng quan, rủi ro, action trong ngày | P0 |
| Meta workspace | #campaign-meta | Meta Insights ở campaign/ad set/ad/asset | P0 |
| Google workspace | #campaign-google | Google Ads API/GAQL ở campaign/ad group/ad/asset | P0 |
| TikTok workspace | #campaign-tiktok | TikTok data sau khi connector hoạt động | P1 |
| Creatives | #creatives | Creative code, thumbnail, placement và hiệu quả | P0 |
| Growth analytics | #growth-analytics hoặc #analytics | Delivery + acquisition/product quality | P0 |
| AppsFlyer analytics | #appsflyer | Acquisition, retention, cohort, data pull | P0 |
| Audience segments | #segments | Audience intelligence và activation readiness | P1 |
| Accounts | #accounts | Account registry và data pull | P1 |
| Team & access | #team | User, role, scope | P1 |
| Integrations | #integrations | Meta, Google, TikTok, AppsFlyer connectors | P0 |
| System health | #account-audit / #tracking-health | Account health, tracking và data trust | P1 |
| Approvals & audit | #audit | Approval guardrail và change log | P1 |

Optimization center và Reporting center đã được loại khỏi navigation. Platform measurement đang ẩn khi chưa có use case rõ ràng.

### Shell chung

- Sidebar tối màu, nhóm navigation theo chức năng.
- Topbar sticky.
- Filter bar dùng chung và có thể pin khi scroll.
- Card bo góc, nền sáng, bảng có horizontal scroll.
- Desktop là viewport chính; phải kiểm tra 1440, 1280, 1024 và mobile.

---

## 3. Design system hiện tại

### Typography

- Font chính: Be Vietnam Pro.
- Heading đậm, label dùng chữ hoa và tracking rộng.
- Nội dung tiếng Việt/Anh đang dùng song song; terminology cần thống nhất theo workspace.
- Không tạo quá nhiều cấp heading trong một card.

### Visual tokens

| Vai trò | Màu/đặc tính |
|---|---|
| Canvas | Warm cream |
| Panel | Gần trắng |
| Ink | Tím đậm |
| Muted | Xám tím |
| Accent | Hồng/violet |
| Positive/live | Xanh ngọc |
| Warning/pending | Vàng |
| Error/high risk | Đỏ |
| Secondary series | Lilac |

Giữ layout gần hiện tại: sidebar khoảng 244px, topbar khoảng 64px, main max-width khoảng 1440px, card radius khoảng 16px.

Thứ tự hierarchy:

1. Page title.
2. Scope/date filter.
3. KPI.
4. Decision charts.
5. Table/drill-down.
6. Source, freshness và data quality.

---

## 4. Hợp đồng dữ liệu bắt buộc

### 4.1 Trạng thái metric

UI phải phân biệt:

- 0: API trả về số 0 có ý nghĩa.
- —: metric không áp dụng, không có mẫu số hoặc source không trả metric.
- Unavailable: connector/quyền không cho đọc.
- Partial: chỉ một phần account/campaign trả về.
- Estimated: ước tính, phải có nhãn.
- Invalid/conflicted: nguồn hoặc định nghĩa xung đột.
- Loading, stale, error: trạng thái request/data.

Không được dùng 0 để thay cho missing, unavailable hoặc permission denied.

### 4.2 Source of truth

| Nhóm dữ liệu | Nguồn chính |
|---|---|
| Spend, impressions, clicks, CTR, CPC, CPM | Ads API tương ứng |
| Campaign/ad group/ad status | Ads API tương ứng |
| Installs, registrations, post-install events | AppsFlyer hoặc conversion metric đã map |
| Retention/cohort, revenue/LTV | AppsFlyer khi API/package cho phép |
| Google network/channel/asset | Google Ads API/GAQL |
| Meta Age/Gender | Meta Insights breakdown |
| Google Age/Gender | AppsFlyer mapping khi mapping đủ điều kiện |
| Device/GEO | Ads API tương ứng hoặc AppsFlyer theo mapping đã xác định |
| Creative usage | ID/code map từ platform placement |

### 4.3 Google và AppsFlyer

Các metric khác của Google vẫn phải lấy trực tiếp từ Google Ads API/GAQL.

Chỉ Age/Gender của Google mới được map từ AppsFlyer khi:

- Có product/app mapping đúng.
- Có campaign/account mapping đáng tin cậy.
- Cùng khoảng thời gian, timezone và định nghĩa dimension.
- Badge hiển thị rõ “AppsFlyer mapping”.
- Nếu mapping thiếu: hiển thị unavailable/partial, không dùng 0.

Không cộng trực tiếp Age/Gender của AppsFlyer với Google nếu chưa có reconciliation rule. Tốt nhất dùng source tab hoặc source badge.

### 4.4 Currency, timezone và attribution

- Mỗi metric tiền phải có currency.
- Nếu scope có nhiều currency, không cộng một tổng tiền duy nhất nếu chưa có FX policy.
- Mixed currency phải hiển thị “MIXED” hoặc tách subtotal.
- Date range phải ghi timezone của account hoặc timezone được chọn.
- AppsFlyer attribution và Ads API conversion phải tách lớp; không cộng thẳng nếu chưa reconciliation.

### 4.5 Campaign status

Status phải lấy từ source và hiển thị đúng:

- Active
- Paused/Off
- Learning
- Limited
- Removed
- Unknown

Không tắt toàn bộ campaign vì một connector trả status thiếu. Campaign active phải hiện đang chạy; campaign đã tắt phải hiện tắt.

---

## 5. Command Center — thiết kế đề xuất

Command Center phải trả lời trong vài giây:

1. Đang chi bao nhiêu?
2. Kênh nào đang tạo kết quả?
3. Campaign active nào cần chú ý?
4. Dữ liệu có mới và đầy đủ không?
5. Hôm nay cần hành động gì?

### 5.1 Row 1 — Sticky global filter

Filter bar pin khi scroll, gồm:

- Khoảng thời gian: Hôm nay, Hôm qua, 7 ngày, 14 ngày, 30 ngày, 90 ngày, Tùy chỉnh.
- Platform: All, Meta, Google, TikTok.
- Product/app.
- Market/GEO.
- Business Manager/MCC.
- Ad account.
- Campaign.
- Data status: Live, Partial, Stale, Error.

Summary sau khi chọn nên có dạng:

“30 ngày gần nhất · Google · 4 accounts · Live”

### 5.2 Row 2 — Executive KPI

Ưu tiên:

- Spend.
- Revenue, chỉ khi có nguồn thật.
- ROAS, chỉ khi revenue thật.
- Installs.
- Registrations.
- CPI.
- CPR/Register.
- Data freshness/số source live.

Mỗi KPI cần giá trị, unit/currency, delta cùng định nghĩa, scope, source và tooltip định nghĩa.

Nếu revenue chưa kết nối, dùng “—” và “Chưa có nguồn revenue”; không hiển thị revenue = 0.

### 5.3 Row 3 — Trend chart

Tên đề xuất: “Spend, installs & registrations theo ngày”.

Series bật/tắt:

- Spend.
- Installs.
- Registrations.
- Revenue nếu có.

Không đặt metric khác đơn vị lên một trục gây hiểu nhầm. Tooltip phải có ngày/timezone, từng metric, unit/currency, platform/source, freshness và partial state. Click điểm có thể filter bảng bên dưới theo ngày.

### 5.4 Row 4 — Platform performance

Nên dùng bảng hoặc horizontal bar có sort:

Platform, Spend, Impressions, Clicks, CTR, Installs, Registrations, CPI, CPR, ROAS nếu có, freshness.

Grouped bar phù hợp hơn pie chart khi cần so sánh nhiều nền tảng.

### 5.5 Row 5 — Acquisition funnel

Spend → Impressions → Clicks → Installs → Registrations → Purchases/Revenue.

Quy tắc:

- Chỉ đưa stage có dữ liệu thật.
- Missing stage dùng “—” hoặc bỏ khỏi funnel kèm chú thích.
- Không cho CVR vượt 100% do khác denominator/attribution window.
- Tooltip ghi source, field và attribution window.
- Tách Ads delivery với MMP outcome khi hai hệ thống khác nhau.

### 5.6 Row 6 — Budget pacing và risk

Budget pacing:

- Budget đã đặt.
- Spend hiện tại.
- Pacing theo thời gian.
- Forecast chỉ khi có công thức và nhãn estimated.

Risk/data signals:

- Campaign active nhưng không spend.
- Spend tăng nhưng không có outcome.
- CPI/CPR vượt ngưỡng đã cấu hình.
- Connector stale/error.
- Campaign limited hoặc mất delivery.

Rule phải có evidence. Không gọi là AI recommendation nếu chỉ là rule-based signal.

### 5.7 Row 7 — Executive watchlist

Ưu tiên campaign active có rủi ro, spend lớn, CPI/CPR xấu, tăng trưởng tốt hoặc stale/limited.

Cột:

Campaign, platform, account, status, spend, installs, registrations, CPI, CPR, delta, freshness, action.

Click dòng mở detail drawer và giữ nguyên filter context.

### 5.8 Những thứ nên gộp

- Strategy Status Overview và Strategy Status Drilldown có thể thành một section có tabs Acquisition/Retargeting/Retention.
- Không lặp Spend/Revenue/ROAS ở quá nhiều card.
- Action queue chỉ hiển thị tín hiệu có evidence.
- Bảng chi tiết dài không chiếm first fold.

---

## 6. Biểu đồ theo từng workspace

### Meta workspace

Nên có:

- Spend/outcome theo ngày.
- Delivery status distribution.
- Scatter Spend vs CPI/CPR, size theo installs/registrations.
- Placement, device, age, gender, geography khi API trả breakdown.
- Ad set/ad drill-down.

Không vẽ chart nếu breakdown không có dữ liệu; dùng empty state đúng lý do.

### Google workspace

Nên có:

- Spend, impressions, clicks, installs, registrations theo ngày.
- Network/channel mix: YouTube, Display, Search, Search Partners nếu field có thật.
- Campaign status và budget pacing.
- Asset performance nếu Google trả asset-level data.
- Conversion actions và bidding chỉ trong deep dive/detail hoặc ẩn nếu không phục vụ quyết định hàng ngày.

Google Ads API và AppsFlyer attribution phải tách badge/section; không cộng conversion từ hai nguồn.

### TikTok workspace

Sau khi App ID/connector hoạt động:

- Dùng cùng shell/filter như Meta và Google.
- Giữ đúng campaign/ad group/ad/asset hierarchy của TikTok.
- Hiển thị Pending, Live, Limited, Error.
- Chỉ bật chart sau khi field mapping được kiểm tra từ response thật.

Khi chưa khả dụng, dùng empty state “TikTok API chưa khả dụng”, không dùng mock data.

### Growth Analytics

Đây là lớp business/product, không phải bản sao Campaign Center.

Thứ tự:

1. Sticky filter.
2. Spend, revenue, ROAS và product outcome.
3. Spend/revenue/ROAS trend.
4. Media mix.
5. Acquisition funnel.
6. Demographic và geography.
7. CPI/CPR theo platform.
8. Retention/cohort khi AppsFlyer có quyền.
9. Google deep dive compact ở cuối.

Mỗi card/chart cần badge Meta Ads API, Google Ads API, TikTok Ads API, AppsFlyer hoặc AppsFlyer mapping.

### Creatives

Phải trả lời:

- Creative code dùng bao nhiêu lần?
- Dùng ở account/campaign/ad set/ad group nào?
- Spend, impressions, clicks, installs, registrations trong period?
- Có thumbnail không?
- Hook Rate/Hold Rate có field nguồn thật không?

Layout:

1. Filter.
2. KPI usage/accounts/placements/spend.
3. Top used codes.
4. Platform coverage.
5. Bảng có thumbnail.
6. Detail drawer lịch sử placement.

Không thêm AI score hoặc recommendation chủ quan. Có thể có human rating/note do người chạy ads nhập.

Thumbnail ưu tiên asset API; nếu thiếu dùng placeholder “Chưa có thumbnail”, không dùng ảnh giả. Phân biệt lỗi tải ảnh và source không có asset.

Hook Rate/Hold Rate chỉ hiển thị khi denominator đúng theo platform:

- Hook Rate = 3-second views / video plays hoặc định nghĩa chính thức tương ứng.
- Hold Rate = 50% video views / video plays hoặc định nghĩa chính thức tương ứng.

Tooltip phải ghi công thức, field nguồn và platform; không tự đổi denominator giữa Meta, TikTok và Google.

### AppsFlyer analytics

Nên tập trung vào installs/cost, registrations/post-install events, D1/D7/D30 retention, LTV/revenue nếu có, source x OS x UA quality và data pull status.

Nếu chưa có Cohort/Master API, empty state phải nêu đúng quyền/package còn thiếu.

### Accounts, Integrations và Health

Tập trung vào connector, last sync, account scope, permission, mapping, data incident và audit log.

Integration access phải Owner-only. Secret chỉ server-side environment, không có trong frontend.

---

## 7. Interaction và trạng thái UI

Mỗi workspace/chart phải có:

1. Loading skeleton.
2. Empty state.
3. Unavailable state.
4. Partial state.
5. Stale state.
6. Error + retry.
7. Mixed currency.
8. No mapping.
9. No permission.
10. Success + last sync + source.

### Hover/tap tooltip

Line, bar, area và data point phải hiển thị:

- Label ngày/dimension.
- Giá trị từng series.
- Unit/currency.
- Source.
- Attribution window.
- Last sync.
- Partial/stale nếu có.

Tooltip không được bị cắt bởi card/viewport; mobile dùng tap.

### Bảng

- Sticky header trong vùng scroll.
- Giữ cột đầu khi bảng rộng.
- Chọn cột hiển thị.
- Sort/filter có state.
- Missing không đổi thành 0.
- Tổng dòng chỉ xuất hiện khi phép cộng hợp lệ.
- Nhiều currency thì tách subtotal.

### Accessibility

- Keyboard focus rõ.
- Dropdown/tab có active/expanded state.
- Contrast đủ.
- Không dùng màu là tín hiệu duy nhất.
- Metric quan trọng không chỉ nằm trong tooltip.

---

## 8. Architecture/component đề xuất

Chuẩn hóa:

- AppShell
- SidebarNav
- Topbar
- StickyScopeFilter
- DateRangeSelect
- PlatformTabs
- SourceBadge
- SyncStatus
- DataQualityBadge
- MetricCard
- TrendChart
- ComparisonBar
- FunnelChart
- RiskQueue
- CampaignWatchlist
- DataTable
- DetailDrawer
- EmptyState
- PartialDataBanner
- PermissionState

Component nhận data contract rõ ràng, không tự tạo mock value trong render.

### URL state

Các filter chính nên phản ánh vào URL:

period/from/to, platform, account, BM/MCC, product, market, campaign, metric.

Refresh không được làm mất filter nếu không có lý do bảo mật.

### API/frontend

- Credential gọi từ server-side route.
- Frontend chỉ nhận normalized response cần cho UI.
- Response nên có source, lastSync, timezone, currency, partial, errors và coverage.
- UI không đoán field dựa trên tên campaign.
- Fallback demo phải có nhãn demo; production không giả lập số liệu.

Audit app.js để tìm mọi fallback/derived metric. Nếu impressions, clicks, purchases hoặc revenue được suy ra từ installs/registrations thay vì API response thì phải loại khỏi production chart hoặc gắn nhãn derived/estimated rõ ràng; không dùng để kết luận hiệu quả khi chưa được Owner phê duyệt.

---

## 9. Information architecture đề xuất

### Vận hành hàng ngày

- Command center
- Campaign center: Meta, Google, TikTok
- Creatives

### Phân tích và đo lường

- Growth analytics
- AppsFlyer analytics
- Audience segments nếu còn use case rõ

### Accounts và system health

- Accounts
- Integrations
- Team & access
- System health
- Approvals & audit

Không thêm navigation mới chỉ để chứa một chart. Chart thuộc platform nào nên nằm trong workspace hoặc deep dive của platform đó.

---

## 10. Acceptance criteria

### Data

- Không thay missing bằng 0.
- Metric tiền có currency.
- Chart có source badge và last sync.
- Google Age/Gender dùng AppsFlyer phải ghi AppsFlyer mapping.
- Metric Google khác lấy trực tiếp Google Ads API.
- Status phản ánh đúng source.
- Không cộng AppsFlyer attribution với Ads API conversion nếu chưa reconciliation.
- CVR/CTR/CPR không vượt 100% do sai denominator; nếu khác định nghĩa phải đổi label hoặc unavailable.

### Command Center

- First fold có filter, KPI và trend chính.
- Filter bar pin khi scroll.
- Có watchlist active/risk.
- Có freshness và partial/error banner.
- Drill-down giữ filter context.
- Không lặp card cùng metric.

### Chart/UX

- Hover/tap xem được điểm.
- Tooltip không bị cắt.
- Loading/empty/error/partial đầy đủ.
- Không dùng pie để so sánh nhiều nhóm.
- Không dùng cùng trục cho metric khác đơn vị khi gây hiểu nhầm.
- Test 1440, 1280, 1024 và mobile.
- Bảng rộng scroll tốt, typography vẫn đọc được.

### Security/access

- Integration chỉ Owner hoặc role được phê duyệt.
- Không có credential trong client bundle, URL, log, screenshot hay markdown.
- User chỉ thấy scope được cấp.
- Write operation không bỏ qua approval.

---

## 11. Checklist audit trước khi sửa

1. Đọc app.html, app.js, styles.css và API route liên quan.
2. Kiểm tra working tree.
3. Liệt kê source metric từng chart.
4. Tìm demo/fallback/derived value.
5. Kiểm tra null/zero/partial/stale.
6. Kiểm tra date range, timezone và currency.
7. Kiểm tra campaign status với response thật.
8. Kiểm tra Google demographic mapping.
9. Kiểm tra hover/tap chart.
10. Kiểm tra sticky filter và responsive.
11. Chạy build/test hiện có.
12. Kiểm tra không có secret trong diff.
13. Ghi lại evidence trước/sau.

---

## 12. Claude cần trả về

### Trước khi sửa

1. Hiện trạng và lỗi data/UX đã xác nhận.
2. Layout Command Center trước/sau.
3. Chart đề xuất kèm mục đích, metric, source và missing state.
4. File/component sẽ thay đổi.
5. Giả định và phần cần Owner xác nhận.
6. Kế hoạch test desktop/mobile.

### Sau khi sửa

1. File/component đã thay đổi.
2. Source và công thức của từng metric mới.
3. Chart đã thêm/gộp/ẩn.
4. Evidence build/test/runtime.
5. Metric vẫn unavailable và lý do.
6. Phần chưa làm vì cần approval.

---

## 13. Ranh giới không được tự ý vượt qua

Không tự ý:

- Đổi source of truth.
- Tạo số liệu giả để lấp chart.
- Đổi công thức CPI, CPR, CTR, CVR, ROAS, Hook Rate hoặc Hold Rate mà không ghi rõ.
- Gộp Ads API và AppsFlyer thành một attribution number.
- Hiển thị credential/secret.
- Mở rộng quyền user hoặc integration.
- Xóa workspace/route lớn khi chưa được yêu cầu.
- Commit, push, deploy production hoặc sửa production configuration khi chưa có approval.

### Tóm tắt

Command Center trả lời “cần chú ý gì ngay bây giờ”.

Campaign workspaces trả lời “nền tảng đang delivery ra sao”.

Growth Analytics trả lời “business/product tăng trưởng như thế nào”.

Creatives trả lời “creative nào được dùng ở đâu và hiệu quả thực tế thế nào”.

AppsFlyer trả lời “user quality, retention và post-install outcome ra sao”.

Integrations/Health trả lời “dữ liệu có đủ quyền, mới và đáng tin không”.

Luồng sử dụng mục tiêu:

Tổng quan → phát hiện tín hiệu → kiểm tra nguồn → drill-down → quyết định → approval nếu có write operation.
