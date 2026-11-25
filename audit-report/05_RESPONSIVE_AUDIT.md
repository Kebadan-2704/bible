# 05 — Complete Responsive Design Forensic Audit

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Methodology:** Tested live in headless Chromium across all **21 viewport dimensions**, landscape orientation, and **125% / 150% / 200% browser zoom levels** across `/`, `/curriculum`, `/admissions`, and `/contact` (`84` viewport-page measurements + full screenshot verification).

---

## 1. Systemic Responsive Root Causes Discovered

### BUG-RESP-01 (P0 Critical): Clipped Sticky Header Across Laptop, Desktop `1440px`, & Sub-`410px` Mobile
Even though `document.documentElement.scrollWidth === window.innerWidth` (`docOverflowPx: 0`) across test pages, that metric **only appears clean because [`globals.css:16,26`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/globals.css#L16-L26) sets `overflow-x: hidden` on both `html` and `body`**, masking real horizontal layout overflow of child controls! Measuring exact bounding rectangles (`getBoundingClientRect().right > window.innerWidth`) exposed **severe header clipping on 10 of 21 tested viewports**:
1. **Desktop & Laptop (`lg:` breakpoint `>= 1024px`, [`Navbar.tsx:115-411`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/Navbar.tsx#L115-L411)):**
   The horizontal flex container holds `shrink-0` Crest + full university title + 9 nav links + Search icon + `shrink-0` `APPLY NOW` button (`total rendered width ≈ 1,314 px` in fallback serif and wider in Cinzel!). Consequently:
   - At `1024×768` & `1024×1366`: **`290 px` overflow** — `Admissions`, `Contact`, `Search`, and `APPLY NOW` are **100% clipped offscreen** (`right: 1314px > 1024px`).
   - At `1200×800`: **`114 px` overflow** — `APPLY NOW` **100% offscreen**.
   - At `1280×800`: **`135 px` overflow** — `Search` clipped (`1284/1280`), `APPLY NOW` **100% offscreen**.
   - At `1366×768`: **`92 px` overflow** — `APPLY NOW` clipped mid-button.
   - At `1440×900` & **125% browser zoom (`1152px`)**: **`55 px` (`1440px`) / `162 px` (`125% zoom`) overflow** — look at [`issue_navbar-wrapped-research-link-1440x900.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_navbar-wrapped-research-link-1440x900.png): **`"APPLY NOW"` is visibly sliced in half right off the right edge of the browser window!**
   - Even at `1920×1080`, `"Research & Ph.D."` wraps awkwardly onto 2 lines because it lacks `whitespace-nowrap` and shares cramped horizontal space inside `max-w-7xl` (`1280px`).
2. **Mobile (`320px–390px`, [`Navbar.tsx:117-433`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/Navbar.tsx#L117-L433)):**
   Inside the mobile header row, the logo `<Link href="/">` has `shrink-0` (L117) paired with `text-base` `"Trinity International University"`, giving the left block a rigid minimum width of `~320 px` (`x=16..336`). Adding Search (`36 px`) + Hamburger (`44 px`) pushes the header row to **`409 px` minimum width**, clipping the mobile hamburger button on **every major iPhone/Android viewport**:
   - `390×844` (iPhone 14/15/16): Hamburger clipped **`19 px`** off right edge ([`academics_mobile_390x844_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/mobile/academics/academics_mobile_390x844_initial.png)).
   - `375×812` (iPhone mini/SE): Hamburger pushed to `x=364.9..409` (**`34 px` clipped** — hamburger bars completely invisible in [`mobile-hero.png`](file:///C:/Users/Keba/AppData/Local/Temp/layoza/captures/localhost-3001/mobile-hero.png) and [`issue_navbar-clipped-mobile_375x812.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_navbar-clipped-mobile_375x812.png)!).
   - `360×800` (Android baseline): Hamburger **`49 px` offscreen (`100%` invisible)**!
   - `320×720`: BOTH Search (`357/320`) and Hamburger (`409/320`) **`89 px` offscreen** ([`issue_navbar-clipped-mobile_320x812.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_navbar-clipped-mobile_320x812.png)).

### BUG-RESP-02 (P1 Major): Card Email Text Overflow on `/contact` at Tablet (`768×1024`)
- **Proof:** [`contact_tablet_768x1024_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/tablet/contact/contact_tablet_768x1024_initial.png).
- **Evidence:** [`contact/page.tsx:29`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/contact/page.tsx#L29) switches directly to `md:grid-cols-3` at `768 px`, leaving ~215 px per card column. `admissions@trinityinternationaluniversity.edu.in` (45 characters, zero hyphens/spaces, no `break-all`) **overflows horizontally outside Card 2 directly on top of Card 3's margin**, getting cut at `...university.e`.

### BUG-RESP-03 (P1/P2): `BackToTop` Invisible Below `1280 px` & Mobile Alignment / Cropped Strips
- [`BackToTop.tsx:29`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/BackToTop.tsx#L29) uses `hidden xl:flex`, removing scroll-to-top assistance on mobile (`320–480px`), tablets (`600–1024px`), and `1024–1200px` laptops — precisely where stacked mobile homepage scrolls `5,700+ px` tall!
- Homepage mobile hero subheading (`page.tsx:58`) uses `text-left sm:text-center`, appearing left-justified directly under centered H1/Crest/Tagline on `<640px` viewports ([`issue_hero-left-aligned-copy-mobile_390x844.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_hero-left-aligned-copy-mobile_390x844.png)).
- Mobile/Tablet `Curriculum` horizontal tab strip (`curriculum_mobile_390x844_initial.png`) abruptly chops `"Module 2: World Religio"` mid-word with zero scroll cue or visible scrollbar.
- `114px` sticky two-row navbar eats **29.2% vertical viewport height** on mobile landscape `844×390` ([`home_mobile_844x390_landscape_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/mobile/home/home_mobile_844x390_landscape_initial.png)) and `25.3%` at `200%` browser zoom (`450px` height).

---

## 2. Full 21-Viewport & Zoom Telemetry Matrix (`/`)

| Category | Viewport | Header Height | `html` Scroll Overflow | True Header Clip Right | Wrapped Nav Links | Responsive Verdict |
|---|---|---:|---:|---:|---:|---|
| Desktop | `1920 × 1080` | `114 px` | `0 px` | `0 px` | `1` (`Research & Ph.D.`) | Minor wrap |
| Desktop | `1680 × 1050` | `114 px` | `0 px` | `0 px` | `1` (`Research & Ph.D.`) | Minor wrap |
| Desktop | `1600 × 900` | `114 px` | `0 px` | `0 px` | `1` (`Research & Ph.D.`) | Minor wrap |
| Desktop | `1440 × 900` | `114 px` | `0 px` | **`55 px`** (`APPLY NOW`) | `1` | **FAIL (Clipped CTA)** |
| Desktop | `1366 × 768` | `114 px` | `0 px` | **`92 px`** (`APPLY NOW`) | `1` | **FAIL (Clipped CTA)** |
| Desktop | `1280 × 800` | `114 px` | `0 px` | **`135 px`** (`Search`, `APPLY NOW`) | `1` | **FAIL (Clipped Controls)** |
| Laptop | `1200 × 800` | `114 px` | `0 px` | **`114 px`** (`APPLY NOW`) | `1` | **FAIL (Clipped CTA)** |
| Laptop | `1024 × 768` | `114 px` | `0 px` | **`290 px`** (4 controls clipped!) | `1` | **CRITICAL FAIL** |
| Tablet | `1024 × 1366` | `114 px` | `0 px` | **`290 px`** (4 controls clipped!) | `1` | **CRITICAL FAIL** |
| Tablet | `834 × 1194` | `114 px` | `0 px` | `0 px` | `0` | Pass (header switches to mobile bar) |
| Tablet | `820 × 1180` | `114 px` | `0 px` | `0 px` | `0` | Pass |
| Tablet | `768 × 1024` | `114 px` | `0 px` | `0 px` | `0` | Fails on `/contact` email card + Layoza CLS `0.2051` |
| Tablet | `600 × 960` | `114 px` | `0 px` | `0 px` | `0` | Pass (hero text misaligned `<640px`) |
| Mobile | `480 × 1040` | `114 px` | `0 px` | `0 px` | `0` | Hero subheading `text-left` bug |
| Mobile | `430 × 932` | `114 px` | `0 px` | `0 px` | `0` | Hero subheading `text-left` bug |
| Mobile | `414 × 896` | `114 px` | `0 px` | `0 px` | `0` | Tight 5px margin by hamburger |
| Mobile | `390 × 844` | `114 px` | `0 px` | **`19 px`** (Hamburger cut) | `0` | **FAIL (Clipped Menu)** |
| Mobile | `375 × 812` | `114 px` | `0 px` | **`34 px`** (Hamburger invisible!) | `0` | **CRITICAL FAIL** |
| Mobile | `360 × 800` | `114 px` | `0 px` | **`49 px`** (Hamburger 100% offscreen) | `0` | **CRITICAL FAIL** |
| Mobile | `320 × 720` | `114 px` | `0 px` | **`89 px`** (Search + Hamburger offscreen!) | `0` | **CRITICAL FAIL** |
| Mobile Landscape | `844 × 390` | `114 px` | `0 px` | `0 px` | `0` | Sticky nav takes 29% height |
| Browser Zoom | `125%` (`1152×720`) | `114 px` | `0 px` | **`162 px`** (`Search`, `APPLY NOW` clipped) | `1` | **FAIL** |
| Browser Zoom | `150%` (`960×600`) | `114 px` | `0 px` | `0 px` | `0` | Pass (falls below `1024px`) |
| Browser Zoom | `200%` (`720×450`) | `114 px` | `0 px` | `0 px` | `0` | Sticky nav eats 25% vertical height |

---

## 3. Independent Mobile-First Product Evaluation

Does the mobile layout feel intentionally crafted? **No — it behaves as a collapsed desktop layout with significant regressions:**
1. Visitors on `320px–390px` smartphones **cannot reliably locate or open the hamburger drawer**, trapping them on a single landing page or forcing reliance on footer links.
2. Mobile scrolls vertically for roughly **11–13 screen heights** (`~8,500+ px` across all 10 homepage sections including full 10-degree-compatible `ProgrammeOverviewPrint` table) with **zero BackToTop button** (`hidden xl:flex`).
3. Mobile hamburger menu omits `/vision-and-mission`, `/accreditations`, `/certificates-and-awards`, and `/affiliations` completely.
4. Hero paragraph switches abruptly to left-aligned under centered elements (`L58`), making the top fold look unpolished on every mobile width `< 640px`.
5. Tablet (`768px`) suffers tight `3-col` squeezes on Curriculum cards (`MODULE\n1` wrap), Homepage hero/prose long line widths (`89–96 ch`), and overlapping email addresses on `/contact`.
