# Trinity International University — Complete Website Forensic Audit

**Audit Date:** 2026-11-25  
**Target Codebase:** [`c:\Users\Keba\Desktop\bible college`](file:///c:/Users/Keba/Desktop/bible%20college) (`trinity-international-university`, Next.js `14.2.35`)  
**Runtime Audited:** Live `http://localhost:3001` (`next dev`)  
**Overall Forensic Score:** **`46.0 / 100`** (**NOT READY FOR LAUNCH**)  

---

## 1. Score & Issue Breakdown Dashboard

| Severity | Count | Key Highlights |
|---|---:|---|
| **P0 — Critical Launch Blockers** | **5** | Clipped desktop `"Apply Now"` CTA (`1440px–1024px`); clipped/offscreen mobile hamburger (`390px–320px`); live draft/garbled/placeholder copy (`Draft copy`, `Daddy Guppy`, `BUTCBA`, `XXXXXXXX`); silent lead loss & unthrottled `/api/contact`; stubbed `Download Prospectus` link (`#apply`). |
| **P1 — High Priority** | **10** | Dead `EN / தமிழ்` switcher; broken `/curriculum` filter & `#module-N` hashes; broken Search `Ctrl+K`/backdrop & missing focus trap; Tablet CLS `0.2051` (`optimizeFonts: false` + `@import`); `54` undefined `gold-700..950` tokens; verified WCAG contrast & `<24px` target failures; `/contact` `768px` email spill; dropped `?centre=` param; missing security headers; missing favicon & `og:image`. |
| **P2 — Medium Priority** | **5** | Windows `US`/`GB`/`FR` flag fallbacks & zero campus/faculty photos; unused `2.92 MB` `framer-motion`; missing `prefers-reduced-motion` handling & layout-mutating `ScrollProgress`; card-kit monotony, dead `Tabs.tsx` & stray root JPEGs; DPDP privacy disclosures. |
| **P3 — Strategic** | **3** | E2E Playwright/unit test suite; intake calendar/credit/fee details vs competitors; separate credential verification form. |

---

## 2. Audit Report Deliverables Index

| # | Report | Core Contents |
|---|---|---|
| 01 | [`01_EXECUTIVE_SUMMARY.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/01_EXECUTIVE_SUMMARY.md) | Brutally honest launch verdict, top critical weaknesses, highest-leverage remediation roadmap. |
| 02 | [`02_PROJECT_ARCHITECTURE.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/02_PROJECT_ARCHITECTURE.md) | Full 53-file inventory, 23-route table, dead dependencies (`framer-motion`, `Tabs.tsx`, `i18n.ts`), `127` dead/broken Tailwind token instances. |
| 03 | [`03_PAGE_BY_PAGE_AUDIT.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/03_PAGE_BY_PAGE_AUDIT.md) | Component-by-component inspection across all 17 routes, 6 `[slug]` pages, 404, and `/api/contact`. |
| 04 | [`04_UI_UX_FORENSIC_AUDIT.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/04_UI_UX_FORENSIC_AUDIT.md) | Visual hierarchy, Cinzel/micro-text critique, undefined gold shades, imagery absence, public leakage of internal notes. |
| 05 | [`05_RESPONSIVE_AUDIT.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/05_RESPONSIVE_AUDIT.md) | Telemetry across all **21 viewports**, mobile landscape, and `125%/150%/200%` zoom; header clipping & tablet card overflow proof. |
| 06 | [`06_FUNCTIONALITY_AUDIT.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/06_FUNCTIONALITY_AUDIT.md) | Live pass/fail verification of Language toggle, Search `Ctrl+K`, Curriculum filter/tabs, EnquiryForm, Prospectus, Accordion, `?centre=`, Print, and 404s. |
| 07 | [`07_ANIMATION_RECOMMENDATIONS.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/07_ANIMATION_RECOMMENDATIONS.md) | Reduced-motion audit, `ScrollProgress` refactor, calm academic choreography + CSS/WAAPI recipes ([`motion-tokens.css`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/animation-specifications/motion-tokens.css)). |
| 08 | [`08_PERFORMANCE_AUDIT.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/08_PERFORMANCE_AUDIT.md) | Live CLS (`0.2051` tablet FAIL), LCP/FCP/TTFB, render-blocking `@import` fonts, bundle analysis (`Navbar`, `framer-motion`). |
| 09 | [`09_ACCESSIBILITY_AUDIT.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/09_ACCESSIBILITY_AUDIT.md) | WCAG 2.2 AA contrast failures (`2.56:1–4.45:1`), sub-`24px` target failures, keyboard focus traps, skip links, screen-reader gaps. |
| 10 | [`10_SEO_AUDIT.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/10_SEO_AUDIT.md) | `/robots.txt`, `/sitemap.xml` (`22` URLs), title truncation (`75–111ch`), missing favicon/`og:image`/canonical, `/curriculum` client metadata gap. |
| 11 | [`11_SECURITY_RELIABILITY_AUDIT.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/11_SECURITY_RELIABILITY_AUDIT.md) | Missing security headers, `X-Powered-By`, `/api/contact` unthrottled spam/silent drop/PII logging, DPDP Act gaps. |
| 12 | [`12_COMPETITIVE_ANALYSIS.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/12_COMPETITIVE_ANALYSIS.md) | Live comparison vs **SAIACS Bengaluru**, **UTC Bengaluru**, **Senate of Serampore**, and **Fuller Seminary**. |
| 13 | [`13_SCORECARD.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/13_SCORECARD.md) | Evidence-backed 10-category scorecard totaling **`46.0 / 100`**. |
| 14 | [`14_PRIORITIZED_ACTION_PLAN.md`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/14_PRIORITIZED_ACTION_PLAN.md) | `TIU-001` through `TIU-023` remediation backlog with exact file/line references and acceptance criteria. |

---

## 3. Evidence, Artifacts & Testing Scope Limitations

### Stored Audit Evidence Directories
- **Screenshots (`102` PNG captures):** [`screenshots/`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots) organized across `desktop/`, `tablet/`, `mobile/`, `full-page/`, `interaction-states/`, and `issues/` (including visual proof of clipped navbar at `1440px`, `375px`, `320px`; `/contact` tablet email overflow; Windows `US/GB/FR` flag fallback; `"Draft copy"` and `"Daddy Guppy"` leaks; Curriculum Module 2, Search `"Theology"`, Mega-Menu, Form Validation & Success).
- **Raw Automated Telemetry:** [`playwright-forensic-results.json`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/test-results/playwright-forensic-results.json), [`static-code-audit.json`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/evidence/static-code-audit.json), [`telemetry-summary.json`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/metrics/telemetry-summary.json).

### Testing Scope & Explicit Environment Limitations
- **Emulated vs Physical Devices:** Responsive tests ran on headless Chromium (`Playwright` + `layoza` Chromium); real Safari iOS / physical Android hardware was not tested directly.
- **Development Server Mode:** Live testing ran against `pnpm dev` (`next dev` on `localhost:3001`) without mutating `.next` via `next build` (consistent with the audit-only constraint of making **zero code or build changes** to the repository). Cold-route TTFB/bundle weights reflect Next dev mode rather than minified production SSR chunks.
- **Sandboxed Network Distinction:** Playwright's 22-route sweep ran offline in sandbox (`fonts.googleapis.com` blocked with `ERR_NAME_NOT_RESOLVED`, showing system fallback fonts), whereas `layoza` Chromium ran with live network access (`Cinzel` + `Inter` loaded cleanly, surfacing the real `0.2051` tablet CLS). Combined inspection captured both real-world font-loaded and network-degraded behavior.
- **Resend Email Dispatch:** `RESEND_API_KEY` is unconfigured in local env; `POST /api/contact` verification tested Zod rejection (`400`), malformed JSON (`500`), burst throttling (`5× 200 OK`), and fallback logging rather than live external SMTP/Resend inbox delivery.
