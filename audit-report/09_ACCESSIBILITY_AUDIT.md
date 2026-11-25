# 09 — Accessibility (WCAG 2.2 AA) Forensic Audit

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Standards Evaluated:** WCAG 2.2 Level A & Level AA (Keyboard, Contrast, Semantics, Focus, Target Size, Motion)  
**Tools Combined:** Source code audit (all 53 files), `layoza:audit_accessibility`, and live Chromium DOM/luminance evaluation across all 22 routes (`1440×900`, `768×1024`, `390×844`).  

---

## 1. Automated Scan vs Live Forensic Reality

`layoza:audit_accessibility` reported `0` static automated rule violations while flagging manual keyboard/focus/live-region reviews. Live Chromium inspection across **all 22 routes and 21 viewports** uncovered real WCAG 2.2 AA failures across contrast, target sizing, keyboard navigation, and reduced motion.

---

## 2. Verified Accessibility Violations & Gaps

### A11Y-01: WCAG 2.4.1 Bypass Blocks — No Skip-to-Content Link
- **Where:** [`src/app/layout.tsx:81-86`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/layout.tsx#L81-L86).
- **Evidence:** No `<a href="#main-content" className="sr-only focus:not-sr-only...">Skip to main content</a>` exists, and `<main>` lacks an `id`. Keyboard-only users must Tab through the utility bar (`Switch Language`, `Prospectus`), logo link, and up to 11 desktop nav links/icons on **every page load** before reaching content.

### A11Y-02: WCAG 1.4.3 Contrast (Minimum) — Verified Text Contrast Failures Across Secondary Pages
Computed foreground luminance against resolved solid background luminance failed `4.5:1` (normal text AA) on multiple pages:
1. **`/research` (×4 cards) — `2.56:1` FAIL:** `"Core Methodological Track"` ([`research/page.tsx:39`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/research/page.tsx#L39)) renders `text-slate-400` (`rgb(148, 163, 184)`) on `#FFFFFF`.
2. **`/affiliations` (×5 cards) — `2.56:1` FAIL:** `"International Ecclesiastical Accord"` ([`affiliations/page.tsx:61`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/affiliations/page.tsx#L61)) renders `text-slate-400` (`rgb(148, 163, 184)`) on `#FFFFFF`.
3. **`/privacy` — `2.56:1` FAIL:** Bottom attribution footer ([`privacy/page.tsx:60`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/privacy/page.tsx#L60)) uses `text-slate-400` (`rgb(148, 163, 184)`) on `#FFFFFF`.
4. **`/doctoral` (×4 stages) — `3.11:1` FAIL:** `"Stage 01–04"` ([`doctoral/page.tsx:144`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/doctoral/page.tsx#L144)) uses `text-gold-600` (`rgb(184, 134, 11)`) on `bg-slate-50` (`#F8FAFC`). Same `#B8860B` (`text-gold-600`) fails `4.5:1` on `/not-found` line 13 (`"Error 404"`), `/about` line 64+, and link hover states.
5. **`/vision-and-mission` — `4.45:1` FAIL:** `"Draft copy — pending client confirmation"` ([`vision-and-mission/page.tsx:118`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/vision-and-mission/page.tsx#L118)) uses `text-slate-500` (`rgb(100, 116, 139)`) on ivory `#FAF7F0`.
6. **GlobalSearchModal:** `"Try searching for..."` ([`GlobalSearchModal.tsx:112`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/search/GlobalSearchModal.tsx#L112)) and `"centres/page.tsx"` icons/placeholders use `slate-400` (`2.56:1` on white).

*(Note: 54 occurrences of `text-gold-700/800/900/950` are undefined in `tailwind.config.ts` and accidentally fall back to `#061026`, masking intended gold styling with black/navy text.)*

### A11Y-03: WCAG 2.5.8 Target Size (Minimum `< 24×24 px`) & Touch Sizing (`< 44 px`)
Live bounding-box telemetry found failures on every route:
- **Sub-24px Violations (WCAG 2.5.8 AA FAIL):**
  - Top bar `Switch Language` button: **`101×20 px`** (height `< 24 px`).
  - Top bar `Prospectus` link: **`77×16 px`** (height `< 24 px`).
  - Inline links lacking min-height on `/academics` (`Admission Criteria`, `View Syllabus & Courses`, contributing to `21` undersized targets on `/academics`), `/research` (`16 px` height on `Submit Research Proposal`), `/academics/[slug]` (`Back to Academics Hub`).
- **Touch Target (`< 44×44 px`) & Clipped Hamburger (`< 410 px` viewports):**
  - Mobile search icon (`36×36 px`).
  - Worse, at `390×844`, `375×812`, `360×800`, and `320×720`, the `44×44 px` mobile hamburger button overflows `19–89 px` off the right edge of the header and is partially or completely invisible/unreachable!

### A11Y-04: WCAG 2.1.1 Keyboard / 4.1.2 Name, Role, Value — Dropdowns, Search Modal & Curriculum Tabs
1. **Desktop Dropdowns (`Navbar.tsx:143-357`):** Hover (`onMouseEnter`/`onMouseLeave`) + click only; lacks `onBlur`/focus-outside closing, lacks `aria-haspopup="true"` / `aria-controls`, and pressing `Escape` closes the menu without returning focus to the trigger button.
2. **GlobalSearchModal (`GlobalSearchModal.tsx:77-148`):** Missing `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap (Tab escapes behind the modal onto blurred background links!), focus restoration to Search button on close, and backdrop click dismissal (`ctrl+k` also broken from closed state: lines 49–53).
3. **Curriculum Tabs (`curriculum/page.tsx:89-151`):** Buttons use `role="tab"` and `aria-selected`, **but**:
   - Missing `aria-controls="module-X"` and panel lacks `role="tabpanel"` + `aria-labelledby`.
   - No `ArrowLeft` / `ArrowRight` / `Home` / `End` roving-tabindex keyboard pattern (tested live: `ArrowRight` failed to switch tabs).
   - Duplicate tablists rendered in DOM simultaneously (desktop grid hidden via `hidden lg:grid`, mobile row hidden via `lg:hidden` — assistive tech only sees active CSS media one, though clean ARIA panel IDs remain absent).
4. **Navbar Utility Status (`Navbar.tsx`):** Missing `aria-current="page"` on active links (indicated only via visual `text-gold-300 bg-white/10`).
5. **Accordion (`Accordion.tsx:51-75`):** Buttons have `aria-expanded={isOpen}`, but lack `aria-controls` pointing to panel `id` and `role="region"`.
6. **EnquiryForm (`EnquiryForm.tsx:101-125`):** Validation error `<p>` messages are not linked to inputs via `aria-describedby` or `aria-invalid`, and the submitting/error/success banner lacks `role="status"` / `role="alert"` / `aria-live="polite"`.

### A11Y-05: WCAG 2.3.3 Animation from Interactions & Reduced Motion
- [`HeroGlobe.tsx:31`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/home/HeroGlobe.tsx#L31) (`animate-ping`), [`centres/page.tsx:73`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/centres/page.tsx#L73) (`animate-pulse`), and [`globals.css:14`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/globals.css#L14) (`scroll-behavior: smooth`) ignore `@media (prefers-reduced-motion: reduce)`.

### A11Y-06: Language & Screen-Reader Semantic Gaps
- Switching `"EN / தமிழ்"` toggles internal React state only; `<html lang="en">` never updates (`htmlLangUpdatedToTa: false`) and no Tamil content switches.
- Windows regional-indicator emoji fallback (`US`, `GB`, `FR`, `IE`, `CH`) in `AffiliationsStrip` has `aria-hidden="true"` on home (`AffiliationsStrip.tsx:40`), **but is NOT `aria-hidden="true"` on `/affiliations` (`affiliations/page.tsx:44`)**, so screen readers announce `"Flag: United States"` redundantly above `"United States of America"`.
- Decorative SVGs in `Navbar`, `Footer`, `Centres` schematic SVG, and cards inconsistently apply `aria-hidden="true"`.

---

## 3. Positive Accessibility Observations
- Single crisp `<h1>` (`h1Count: 1`) verified across **all 22 routes**.
- Semantic `<header>`, `<nav aria-label=...>`, `<main>`, and `<footer>` landmarks present.
- Global `:focus-visible { outline: 2px solid #D4A017; outline-offset: 2px; }` (`globals.css:36`) provides a clear yellow focus indicator across dark and light backgrounds (though form controls specify `focus:ring-2` alongside `focus-visible` outline).
- Form inputs have explicit `<label htmlFor="...">` bindings and `autoComplete` attributes (`name`, `email`, `tel`).
