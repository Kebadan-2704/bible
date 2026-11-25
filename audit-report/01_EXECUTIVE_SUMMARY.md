# 01 — Executive Summary

**Client / Subject:** Trinity International University (Indian Trinity Church Diocese)  
**Framework:** Next.js 14.2.35 (App Router), TypeScript 5.6.3, Tailwind CSS 3.4.14  
**Overall Forensic Score:** **`46.0 / 100`**  
**Production Launch Verdict:** **DO NOT LAUNCH (Not Production Ready — 5 P0 Blockers & 10 P1 High-Priority Defects)**  

---

## 1. Honest Executive Assessment

The **Trinity International University** web portal is structurally clean under the hood (`tsc --noEmit` and `next lint` pass cleanly, Next App Router separates all 17 pages + 6 SSG dynamic specialisations + `/api/contact`, and all legal disclosures prudently avoid false statutory UGC/secular accreditation claims). However, **when tested pixel-by-pixel and interactively in live browsers across 21 viewport sizes**, the site is currently an unfinished staging prototype that fails critical usability, editorial, responsive, and reliability gates:

1. **Primary Navigation Fails on Both Laptop/Desktop (`1440px–1024px`) AND Smartphones (`390px–320px`):**
   Hidden behind `html, body { overflow-x: hidden }`, the sticky header overflows horizontally cleanly out of sight—slicing the gold **`APPLY NOW`** CTA button in half at **`1440×900`** (`55 px` clipped!), cutting off up to 4 desktop items (`Admissions`, `Contact`, `Search`, `APPLY NOW` = `290 px` clipped!) at **`1024×768`**, and pushing the **mobile hamburger menu button (`19–89 px`) partly or 100% offscreen** across iPhone (`390px`, `375px`) and Android (`360px`, `320px`) screens.
2. **Broken Promised Functionality:**
   - The top-bar **`EN / தமிழ்` language switcher** toggles its own button text while keeping the entire website and `<html lang="en">` untranslated (ignoring a complete `src/lib/i18n.ts` dictionary).
   - The **`Download Prospectus (PDF)`** CTA silently scrolls to `#apply` instead of downloading a PDF.
   - The **`/curriculum` topic filter (`Filter topics...`)** computes `filteredModules` and throws the result away—typing any term filters nothing in the UI.
   - **`Ctrl+K`** cannot open the search modal (`else onClose()` logic bug), clicking outside the modal backdrop fails to close it, and **`/centres -> "Contact This Centre"`** (`?centre=chennai`) fails to pre-select the chosen centre.
3. **Public Leakage of Internal Staging Notes, Garbled OCR & Placeholder Data:**
   Visitors on live public routes currently encounter `"Draft copy — pending client confirmation"` (`/about`, `/vision-and-mission`), `"Daddy Guppy Bangalore INDIA."` (`/centres`, `/contact`), `"+91 (0) 80-XXXXXXXX"`, `"Buddhism (BUTCBA / Buddha)"` (`/curriculum`), `"Distance Distance Learning"` (`/admissions`), `"Brochure 1 / Brochure 2"` discrepancy alerts, and contradictory degree counts on the homepage (`7` vs `10`).
4. **Zero Authentic Photography & Broken Styling Tokens:**
   There are zero `<img>` tags anywhere on the website (initial circles for bishops, dotted SVGs for headquarters map, and Windows browsers falling back to plain letters **`US`, `GB`, `FR`, `IE`, `CH`** for emoji flags). Worse, **`54` usages of `text-gold-700..950` are undefined in `tailwind.config.ts`**, causing "gold" badges and subtitles to fall back silently to dark navy/black, alongside **`25` invalid CSS utility tokens** (`animate-in`, `shadow-xs`, `border-l-3`, `no-scrollbar`, `bg-navy-950/98`).
5. **Measured Core Web Vitals, Accessibility, Security & Reliability Gaps:**
   - `optimizeFonts: false` + CSS `@import` Google Fonts causes a live **CLS of `0.2051` (FAIL)** at `768×1024` tablet and `ERR_NAME_NOT_RESOLVED` console errors offline.
   - `/contact` email text physically overflows its card into neighboring columns at `768×1024`.
   - Verified WCAG 2.2 AA contrast failures (`2.56:1` on `/research`, `/affiliations`, `/privacy`; `3.11:1` on `/doctoral`) and `<24px` target-size failures (`Switch Language`, `Prospectus`, 21 tiny links on `/academics`).
   - `/api/contact` has **zero rate limiting**, **no security headers**, exposes `X-Powered-By: Next.js`, logs raw candidate PII to stdout, and returns false **`200 OK` success** when email (`RESEND_API_KEY`) is unconfigured or fails!

---

## 2. Top 5 Fastest High-Leverage Fixes Before Launch
1. **Fix `Navbar.tsx` flex sizing & mobile `min-w-0 truncate`** to eliminate all header/CTA/hamburger clipping from `320px` through `1920px`.
2. **Resolve client TODO checklist & remove all internal copy leaks** (`Draft copy`, `Daddy Guppy`, `BUTCBA`, `+91 XXXXXXXX`, `Brochure 1/2` badges).
3. **Repair promised interactions** (`#curriculum-filter`, `Ctrl+K`/backdrop close, `?centre=` query prefill, real PDF prospectus, either wire `i18n.ts` or hide `EN / தமிழ்`).
4. **Fix `tailwind.config.ts` (`gold-700..950`) & migrate to `next/font/google`** (fixing `54` broken color classes and the `0.2051` tablet CLS simultaneously).
5. **Harden `/api/contact` & `next.config.mjs`** (security headers, rate limit/spam guard, honest delivery failure handling, `.max()` validation).
