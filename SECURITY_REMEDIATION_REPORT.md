# Security & Reliability Remediation Report — University of Trinity International

**Scope:** Backend Enquiry API (`POST`/`GET /api/contact`), Input Validation, Anti-Abuse Controls, HTTP Security Headers, Privacy/DPDP Disclosures, Secret Hygiene  
**Verified Status:** **VERIFIED** via unit tests (`enquiry-api.test.mjs`) and live production `next start` HTTP attack probes (`verify-production.mjs`)

---

## 1. Security Controls Implemented & Verified

| Vulnerability / Audit Finding | Remediation Implemented | Verification Result |
|---|---|---|
| **Silent Lead Loss & Fake Success (`200 OK` without Resend)** | [enquiryDelivery.ts](file:///c:/Users/Keba/Desktop/bible%20college/src/lib/enquiryDelivery.ts) checks explicit delivery status: returns `503 EMAIL_SERVICE_UNCONFIGURED` when unconfigured, `502 EMAIL_DELIVERY_FAILED` on upstream Resend rejection without backup, `202 PERSISTED_BACKUP_ONLY` when durable webhook succeeds during email outage, and `200 DELIVERED_EMAIL` only upon Resend acceptance. | Verified via unit matrix & live HTTP `503` (unconfigured Server A) and `200` (Server B) + client alert banner. |
| **Unthrottled Flood / Abuse (`5/5` rapid bursts accepted)** | [rateLimit.ts](file:///c:/Users/Keba/Desktop/bible%20college/src/lib/rateLimit.ts) supports distributed **Upstash Redis REST** (`UPSTASH_REDIS_REST_URL`/`TOKEN`) with automatic fallback to sliding-window in-memory throttling (**5 requests / 60s / IP**). Returns `429` + `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Mode`. | Verified via unit burst isolation test & live Server B HTTP `429` trigger on rapid requests. |
| **Double Submit / Replay Spam** | SHA-256 `(email \| enquiryType \| trimmed message)` fingerprint check over 120s window (`checkDuplicateSubmission`) returning HTTP `409 DUPLICATE_SUBMISSION`. | Verified in unit tests & live HTTP `409` on identical consecutive submissions. |
| **Unbounded Payloads, Extra Keys, CRLF Header Injection & Invalid JSON `500`** | [route.ts](file:///c:/Users/Keba/Desktop/bible%20college/src/app/api/contact/route.ts) & [enquirySchema.ts](file:///c:/Users/Keba/Desktop/bible%20college/src/lib/enquirySchema.ts): enforces `application/json` (`415`), `16 KB` raw/declared byte cap (`413`), safe JSON parse (`400`), `.strict()` schema rejecting unknown properties (`400`), field bounds (`fullName` 2–150, `email` 5–254, `phone` 8–15 digits, `callingDescription` <=2,000), and `stripHeaderControlChars` scrubbing `\r\n\0` before outbound email headers. | Verified via live HTTP `415`, `413`, `400` (`{not-json`, extra key, bad phone/email) and Resend payload assertion confirming CR/LF removal. |
| **Automated Bot Submissions** | Added `sr-only` / `tabIndex={-1}` honeypot (`website` field returning `400 SPAM_DETECTED` cleanly without wasting email quota) + server-side **Cloudflare Turnstile** verification (`verifyTurnstileToken` w/ 5s timeout, returning `403 CAPTCHA_FAILED` when `TURNSTILE_SECRET_KEY` is configured). | Verified live HTTP `400` on populated honeypot and Server C HTTP `403` (missing/bad token) vs `200` (verified token). |
| **Candidate PII Exposure in Server Logs** | Replaced raw payload logging with sanitized JSON event telemetry (`requestId`, `enquiryType`, `code`, `emailSent`, `persisted`, `rateLimitMode`) containing **zero** candidate names, emails, phones, or message bodies. Client IPs are SHA-256 hashed in memory/Redis keys. | Observed directly in `next start` Server A/B/C stdout logs. |
| **Missing HTTP Security Headers & Fingerprinting** | [next.config.mjs](file:///c:/Users/Keba/Desktop/bible%20college/next.config.mjs) sets `poweredByHeader: false` and applies `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and conditional `Strict-Transport-Security` (`ENABLE_HSTS=true`). | Verified directly against running `next start` HTTP responses (`x-powered-by: null`, zero CSP browser console errors). |
| **Static Site Content Leakage & Legal Privacy Gaps** | Purged draft/OCR/internal notes (`Daddy Guppy`, `BUTCBA`, `Draft copy`, `layoza-*`), expanded [/privacy](file:///c:/Users/Keba/Desktop/bible%20college/src/app/privacy/page.tsx) with Indian DPDP Act 2023 disclosures, and added error boundaries ([error.tsx](file:///c:/Users/Keba/Desktop/bible%20college/src/app/error.tsx), [global-error.tsx](file:///c:/Users/Keba/Desktop/bible%20college/src/app/global-error.tsx)) preventing stack-trace exposure. | Audited across all 23 compiled pages & live HTML responses. |

---

## 2. Deployment Security Checklist (Environment Prerequisites)

To transition from standalone verification to live public production traffic:
1. Configure `RESEND_API_KEY`, verified sender domain (`EMAIL_FROM`), and official recipient inbox (`EMAIL_TO`).
2. Configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for multi-instance serverless rate-limit persistence.
3. Configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` (and optional `ENQUIRY_BACKUP_WEBHOOK_URL`/`TOKEN`).
4. Set `NEXT_PUBLIC_SITE_URL="https://trinityinternationaluniversity.edu.in"` and `ENABLE_HSTS="true"` behind HTTPS TLS termination.
5. Complete legal confirmation of Grievance Officer contact and retention schedule in [CLIENT_CONFIRMATION_REQUIRED.md](file:///c:/Users/Keba/Desktop/bible%20college/CLIENT_CONFIRMATION_REQUIRED.md).
