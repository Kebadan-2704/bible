# 11 — Security, Privacy & Reliability Forensic Audit

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Scope:** API Route Handler (`/api/contact`), HTTP Security Headers, Client/Server Trust Boundaries, Secrets, Error Resilience, Legal/Privacy Hygiene  

---

## 1. Live HTTP Security Header Inspection (`/`)

Captured directly from HTTP response headers on `GET http://localhost:3001/`:

| Security Header | Observed Value | Risk / Impact |
|---|---|---|
| `Content-Security-Policy` | `null` (**Missing**) | No script/style/frame restriction against XSS or rogue third-party injection. |
| `X-Frame-Options` | `null` (**Missing**) | Application can be framed arbitrarily (clickjacking risk on forms). |
| `X-Content-Type-Options` | `null` (**Missing**) | Browser MIME-type sniffing left unconstrained. |
| `Referrer-Policy` | `null` (**Missing**) | Referer URLs (e.g., `/contact?centre=chennai`) leak query params cross-origin. |
| `Strict-Transport-Security` | `null` (**Missing**) | Should be enforced via reverse proxy / `next.config.mjs` headers in HTTPS production. |
| `X-Powered-By` | **`Next.js`** (Exposed) | Unnecessarily advertises framework stack (`poweredByHeader: false` not set in `next.config.mjs`). |

*(Note: `next.config.mjs` defines zero `headers()` rules.)*

---

## 2. Backend & API Route Security (`/api/contact`)

Audited [`src/app/api/contact/route.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/api/contact/route.ts) statically and with live HTTP tests:

| Finding ID | Severity | Evidence & Observed Behavior | Remediation |
|---|---|---|---|
| **SEC-01** | **High** | **Zero Rate Limiting, CAPTCHA, or Anti-Automation:** Sending 5 consecutive automated `POST /api/contact` requests returned `[200, 200, 200, 200, 200]` instantaneously. If `RESEND_API_KEY` is configured in production, an attacker can exhaust Resend API email quota or mail-bomb `EMAIL_TO` in seconds. | Add IP/token-bucket rate limiting, honeypot field, and lightweight challenge (Turnstile/hCaptcha) before email dispatch. |
| **SEC-02** | **High** | **Silent Data Loss Risk When Email Unconfigured:** Lines 31–64 guard `fetch("https://api.resend.com/emails")` behind `if (process.env.RESEND_API_KEY)`, returning HTTP `200 { success: true }` even when **no email was sent and no database write exists**. Furthermore, if Resend returns HTTP 4xx/5xx (line 58 `if (!resendResponse.ok)`), the handler only calls `console.warn` and STILL tells the applicant `"Enquiry submitted successfully"`! | Never return false `200 OK` if email/storage delivery fails; persist enquiries to a database or require email dispatch success in production (`NODE_ENV === "production"`). |
| **SEC-03** | **Medium** | **Unbounded String Lengths & Email Header Injection Surface:** [`route.ts:4-11`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/api/contact/route.ts#L4-L11) validates `.min(...)` via Zod with **zero `.max()` upper bounds** and no CRLF stripping. An attacker can send a multi-megabyte `callingDescription` payload or embed newlines in `fullName`/`programmeLevel` (`subject: \`New Admissions Enquiry: ${validatedData.fullName}...\`` at line 42). | Enforce `.max(150)` on names/programmes, `.max(30)` on phone, `.max(2000)` on statement, strip `\r\n`, and check `Content-Length`. |
| **SEC-04** | **Medium** | **Plaintext PII Logged to Server Console:** Lines 19–28 log full candidate `fullName`, `email`, `phone`, and `callingDescription` to stdout unconditionally—risking sensitive pastoral/counselling/personal disclosures landing permanently in cloud log aggregators without retention controls. | Redact PII in production logs; log structured request ID + delivery status only. |
| **SEC-05** | **Low** | **Malformed JSON Causes Uncaught 500:** Sending `{bad json` causes `await request.json()` to throw `SyntaxError` into the generic `catch` block returning HTTP `500` instead of `400 Bad Request`. | Wrap `request.json()` separately and return `400 Invalid JSON`. |

---

## 3. Client-Side Security, Privacy & Reliability Findings

1. **JSON-LD Inline Script Injection Surface (`layout.tsx:76-79`):** Safe currently because `jsonLd` comes from static `config.ts`, though escaping `<` in `JSON.stringify(jsonLd).replace(/</g, '\\u003c')` is best practice if `config.ts` ever pulls CMS data.
2. **No `error.tsx` / `global-error.tsx` Boundaries:** Uncaught rendering errors in client subtrees (e.g., `EnquiryForm` or `GlobalSearchModal`) crash up to Next.js's default unstyled fallback instead of a branded recovery page.
3. **DPDP Act (India) / Privacy Policy Completeness ([`privacy/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/privacy/page.tsx)):** Under India's Digital Personal Data Protection Act, 2023 (applicable to Bangalore/Chennai institutional admissions), the privacy page omits: Data Fiduciary contact / Grievance Officer details, data retention period, right to withdrawal/erasure mechanism, and whether third parties (Resend, Vercel/hosting logs) process form submissions.
4. **No Exposed Secrets:** Checked all 53 `src/` files + config files — zero hardcoded API keys or credentials exist in client/server code (`.env*` absent from repo).
5. **Form Accessibility/UX Trust Issue:** Clicking `"Request Institutional Documentation Pack"` (`/accreditations`) or `"Contact Central Administrative Office"` leads to the same form collecting pastoral background without explaining file verification turnaround SLAs.
