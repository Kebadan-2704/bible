# 13 — Weighted Audit Scorecard (`/ 100`)

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Evaluation Basis:** Directly observed code (53 source files), 22-route HTTP & Chromium inspection, 21-viewport + 3-zoom matrix, live interactive testing, API security probes, and visual inspection of captured screenshots.

| # | Evaluation Category | Max Weight | Score Awarded | Percentage | Primary Deductions |
|---:|---|---:|---:|---:|---|
| 1 | **UI/UX & Visual Design** | 20 | **10.0** | 50.0% | `54` undefined `gold-700..950` CSS tokens defaulting to navy/black; `0` real photos/portraits (initials + SVG grid placeholders); Windows `US`/`GB`/`FR` flag text fallback; public leakage of `"Draft copy"`, `"Daddy Guppy"`, `"BUTCBA"`, `"Brochure 1/2"`; card-kit monotony across 5+ consecutive homepage sections. |
| 2 | **Responsive Design** | 15 | **6.5** | 43.3% | **Severe `Navbar` header clipping masked by `overflow-x: hidden`:** clips `APPLY NOW` (`55–290 px`) on `1440px`, `1366px`, `1280px`, `1200px`, `1024px`, & `125%` zoom; clips mobile hamburger (`19–89 px`) offscreen on `390px`, `375px`, `360px`, `320px`; `/contact` email overflows card at `768px`; hero paragraph left-aligned on mobile `<640px`; `BackToTop` invisible `<1280px`. |
| 3 | **Functionality & Interactions** | 15 | **7.5** | 50.0% | Dead `"EN / தமிழ்"` translation toggle (`lib/i18n.ts` unused); broken `#curriculum-filter` (`filteredModules` unrendered); `Download Prospectus` jumps to `#apply`; `Ctrl+K` doesn't open search; search backdrop click broken; `/contact?centre=` prefill ignored; `/curriculum#module-N` hash ignored; mobile drawer misses 4 sub-routes. |
| 4 | **Performance** | 10 | **5.0** | 50.0% | `optimizeFonts: false` + render-blocking CSS `@import` triggers **tablet CLS `0.2051` (FAIL)** across 10 font files; dead `2.92 MB` `framer-motion` dependency; `Navbar` eagerly ships `specialisations.ts` (18 KB) + `searchIndex.ts` + `fuse.js` on all routes; `/curriculum` full-page `"use client"`. |
| 5 | **Code Quality & Architecture** | 10 | **5.0** | 50.0% | Clean strict TS (`tsc` & `eslint` pass cleanly) & decoupled `src/data/`, **but** `79` dead/invalid Tailwind classes (`animate-in`, `shadow-xs`, `border-l-3`, `no-scrollbar`, `bg-navy-950/98`, undefined gold shades), `0` tests, `0` error/loading boundaries, unused `Tabs.tsx` / `relatedSlugs`, hardcoded `7 vs 10` degree contradiction, 552-line monolithic `Navbar`. |
| 6 | **Accessibility (WCAG 2.2 AA)** | 10 | **4.5** | 45.0% | Single `H1` & semantic landmarks present, **but** no skip-to-content link; verified contrast failures (`2.56:1` on `/research`, `/affiliations`, `/privacy`; `3.11:1` on `/doctoral`; `4.45:1` on `/vision-and-mission`); WCAG 2.5.8 target failures `<24px` (`Switch Language` 20px, `Prospectus` 16px, `/academics` 21 undersized links); missing Search modal focus trap/`role="dialog"`, missing tab Arrow-key handling, `reduced_motion_respected: false`. |
| 7 | **Animation & Motion Design** | 5 | **1.0** | 20.0% | `tailwindcss-animate` absent so `animate-in`/`fade-in`/`zoom-in` do nothing; `framer-motion` unused; continuous `animate-ping`/`animate-pulse` violate `prefers-reduced-motion`; `ScrollProgress` animates layout `width` instead of compositor `scaleX`. |
| 8 | **Technical & On-Page SEO** | 5 | **2.5** | 50.0% | Clean `200`/`404` status, `/robots.txt`, `/sitemap.xml`, JSON-LD `EducationalOrganization`, **but** missing favicon & `og:image`/`twitter:image`, `/curriculum` lacks metadata (`"use client"`), `75–111 char` bloated titles, sitemap `lastModified: new Date()`, missing canonicals, crawlers index `"Draft copy"`/`"Daddy Guppy"`/`"+91 XXXXXXXX"`. |
| 9 | **Security & Reliability** | 5 | **2.0** | 40.0% | Server-side Zod validation & no leaked API secrets, **but** missing CSP / X-Frame-Options / HSTS / X-Content-Type-Options (`X-Powered-By: Next.js` exposed), zero rate limiting (`5/5` burst `200 OK`), silent lead drop when Resend unconfigured/failing, unbounded field payloads, console PII logs, malformed JSON `500`, zero `error.tsx`. |
| 10 | **Brand Identity & Conversion** | 5 | **2.0** | 40.0% | Honest trust-act legal disclosures, **but** clipped `Apply Now` & invisible mobile menu destroy conversion funnels, broken prospectus PDF, fake Tamil switch, unverified `+91-XXXXXXXX` contacts, `"Draft copy"` badges, and zero institutional imagery or faculty portraits. |
| | **OVERALL SITE GRADE** | **100** | **46.0** | **46.0%** | **Verdict: NOT PRODUCTION READY — Pre-Launch Remediation Required** |

---

## Grading Band Key
- `90–100`: World-class production benchmark
- `75–89`: Strong launch candidate (minor polish needed)
- `60–74`: Acceptable beta / needs targeted fixes
- **`40–59`: Significant functional, responsive, editorial, and trust blockers — Do Not Launch (`46.0 / 100`)**
- `< 40`: Broken / non-viable
