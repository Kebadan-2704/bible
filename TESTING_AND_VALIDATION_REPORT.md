# Testing & Validation Report — University of Trinity International

**Execution Environment:** Windows (Node `v24.14.0`, Next.js `14.2.35`, Headless Chromium via Playwright)  
**Target Under Test:** Production build (`pnpm build`) served via real `next start` across isolated production processes (`127.0.0.1:3011` unconfigured, `3012` mocked Resend delivery, `3013` mocked Turnstile CAPTCHA verification)

---

## 1. Automated Verification Summary

| Suite / Command | Command Run | Scope Covered | Latest Result |
|---|---|---|---|
| **TypeScript Strict Check** | `pnpm typecheck` | All `.ts`/`.tsx` application, library, data & config modules | **PASS (`0` errors)** |
| **ESLint Verification** | `pnpm lint` | `next/core-web-vitals` across entire codebase | **PASS (`0` warnings, `0` errors)** |
| **Unit & Data Invariant Suite** | `pnpm test:unit` | [tests/unit/enquiry-api.test.mjs](file:///c:/Users/Keba/Desktop/bible%20college/tests/unit/enquiry-api.test.mjs): **13 tests / 4 suites** | **PASS (`13/13` passed)** |
| **Production Build** | `pnpm build` | Full Next.js webpack optimization, `next/font/google` compilation, `33/33` static/SSG routes | **PASS (`0` build errors, `87.3 kB` shared JS)** |
| **Production E2E & A11y Audit** | `pnpm test:e2e` | [tests/e2e/verify-production.mjs](file:///c:/Users/Keba/Desktop/bible%20college/tests/e2e/verify-production.mjs): 23 routes, assets, API security probes, 16 viewports, interactions, contrast & CWV | **PASS (`exit code 0`)** |

---

## 2. Detailed Test Coverage Executed

### A. Unit & Delivery Module Tests (`13/13` Passing)
- **Schema Validation & Hardening:** Valid normalization (trimming/lowercasing email), purpose-conditional requirements (`admissions` enforces programme + centre + >=10-char statement; `general` permits optional programme/centre), `.strict()` unknown-key rejection, telephone digit count (`8–15`), max string bounds (`150`/`254`/`2000`), and `stripHeaderControlChars` CRLF neutralization.
- **Rate Limit & Fingerprinting:** `extractTrustedClientIp` proxy prioritization, `checkRateLimit` `5/min` per-IP enforcement (`allowed: false` + `Retry-After` on 6th request while distinct IPs stay isolated), `checkDuplicateSubmission` normalized payload match detection.
- **Honest Delivery Matrix:**
  - Unconfigured Resend/backup -> `503 EMAIL_SERVICE_UNCONFIGURED` (never false `200 OK`)
  - Mocked Resend `200 OK` -> `200 DELIVERED_EMAIL` (with verified CRLF-stripped email `subject` & `reply_to`)
  - Mocked Resend `500` without backup -> `502 EMAIL_DELIVERY_FAILED`
  - Mocked Resend `500` + backup `202` -> `202 PERSISTED_BACKUP_ONLY`
  - `verifyTurnstileToken` skipped cleanly when `TURNSTILE_SECRET_KEY` unset; enforces token & remote verification (`ok: true` / `ok: false`) when configured.
- **Canonical Data Invariants:** Verified `administrativeCentres.length === 8`, `allDegreesOffered.length === 10`, zero leaked draft/OCR strings across compiled exports, and full search index route coverage (`/centres`, `/prospectus`, `/academics/*`, `/privacy`).

### B. Live Production HTTP Route, Asset & Security Header Checks
- Verified **HTTP `200 OK`** across all **23 HTML pages** (17 static routes + 6 generated `/academics/[slug]` specialisation routes), `/robots.txt`, `/sitemap.xml` (containing `/centres`, `/prospectus`, `/privacy`), `/icon.svg`, `/opengraph-image.png`, `/twitter-image.png`, `/apple-icon.png`, and `/trinity-programme-overview.pdf` (verified `%PDF-` magic bytes).
- Verified **HTTP `404`** on `/non-existent-route-verification` and **HTTP `405`** on `GET /api/contact`.
- Verified HTTP response security headers on `/`: `content-security-policy`, `x-content-type-options: nosniff`, `x-frame-options: DENY`, `referrer-policy`, `permissions-policy`, and `x-powered-by: null`.
- Verified **0 HTML occurrences** of `BUTCBA`, `Daddy Guppy`, `Brochure 1`, `Brochure 2`, `XXXXXXXX`, `Draft copy`, or `layoza-` across all 23 routes.

### C. Responsive, Bilingual, Interactive, Contrast & Core Web Vitals E2E Results
Telemetry saved directly at [audit-report/post-remediation-metrics.json](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/post-remediation-metrics.json):
- **Viewports Verified:** All **16 widths** (`320, 360, 375, 390, 414, 430, 640, 768, 820, 1024, 1200, 1280, 1366, 1440, 1600, 1920`) across `/`, `/curriculum`, `/admissions`, `/contact`, mobile/tablet landscape (`844x390`, `1024x768`), zoom simulation widths (`1152px / 125%`, `960px / 150%`, `720px / 200%`), plus **`1366x768` laptop fold check** (`heroBox.height <= 680`): **`0` overflow violations**, **`0` clipped header controls**, **`0` desktop nav wraps or overlaps**.
- **Interactive & Chrome Cleanliness Workflows:**
  - Client-requested control removals verified: **`0` `header button[aria-pressed]` toggles** (no `EN / தமிழ்` button) and **`0` ticker `<button>` controls** (no `[||]` Pause button), while `"Beloved Servants of Jesus Christ"` running marquee renders cleanly.
  - Global Search (`Ctrl+K` open, `"Ethics"` filter, `Escape` dismiss, trigger reopen, `"Systematic Theology"` + `Enter` navigation to `/academics/systematic-theology`).
  - `/curriculum#module-5` direct activation -> `ArrowRight` -> `#module-6` -> browser Back -> `#module-5` -> live topic filter `"Theodicy"` + empty state `"Reset All Modules"`.
  - `/admissions` FAQ Accordion `aria-expanded` toggle.
  - `/contact?centre=chennai&type=credential_verification` prefill (`credential_verification`, `Chennai Centre`) + honest `503` UI alert banner when unconfigured + real `200 OK` form delivery confirmation (`Enquiry Delivered Successfully`) against mocked Resend production server.
- **Accessibility & Performance Metrics (Production):**
  - `contrastFailures`: **`[]` (`0` violations across `/`, `/about`, `/curriculum`, `/contact`)**
  - `smallTargets`: **Only unfocused `.sr-only` `"Skip to main content"` (`1x1`) links across `/`, `/about`, `/curriculum`, `/contact`** (`0` visible interactive controls `<24px` or `<40px`)
  - `reducedMotion: "reduce"` animation duration: **`<= 0.001s`**
  - Production Homepage **CLS**: **`0.005`** (down from `0.2051` tablet CLS in baseline)
  - Production Homepage **LCP**: **`188 ms`**
  - Editorial imagery (`theological-heritage.jpg`, `scriptural-languages.jpg`, `sanctuary-arch.svg`, `doctoral-library-compendium.svg`, `ministry-modules-emblem.svg`, `global-diocese-fellowship.svg`): **`0` broken images** across `/`, `/about`, `/vision-and-mission`, `/academics`, `/curriculum`, `/research`, `/doctoral`, `/centres`, `/affiliations`
  - Console errors / Uncaught page errors / Failed HTTP assets: **`0`**

---

## 3. Known Testing Boundaries (Honest Disclosure)
- Email dispatch was tested against an isolated local HTTP mock bound to `RESEND_API_URL` and `TURNSTILE_SITEVERIFY_URL`; real live internet inbox delivery and Cloudflare Turnstile widget interaction remain dependent on configuring live secrets at production deploy time.
- Browser verification ran in Headless Chromium on Windows; physical iOS Safari / Android mobile browsers were not physically attached during this test run.
