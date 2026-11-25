# 03 — Page-by-Page Forensic Audit

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Scope:** All 17 UI routes, all 6 dynamic `[slug]` routes, Custom 404, and `/api/contact`  

---

## 1. Homepage (`/`) — [`src/app/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/page.tsx)
**Screenshots:** [`home_desktop_1920x1080_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/desktop/home/home_desktop_1920x1080_initial.png), [`home_tablet_768x1024_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/tablet/home/home_tablet_768x1024_initial.png), [`home_mobile_390x844_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/mobile/home/home_mobile_390x844_initial.png), [`home_mobile_390x844_landscape_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/mobile/home/home_mobile_844x390_landscape_initial.png)

### Section-by-Section Findings
1. **Top Utility & Navigation Header (`Navbar.tsx`):**
   - Clips right edge `"APPLY NOW"` CTA by **`55 px` at `1440×900`**, **`92 px` at `1366×768`**, **`135 px` at `1280×800`**, and clips 4 items (`290 px`) at `1024×768`. Wraps `"Research & Ph.D."` onto 2 lines across desktop (`1920px–1024px`).
   - On mobile (`390px`, `375px`, `360px`, `320px`), `shrink-0` logo title pushes hamburger button **`19–89 px` past right viewport edge**, making mobile menu completely invisible/unusable at `360px` and `320px`.
2. **Hero Section (`page.tsx:35-96`):**
   - Zero real institutional photography; faint `opacity-20` SVG vector globe behind Crest + copy.
   - Mobile alignment bug (`L58`): `<p className="... text-left sm:text-center">` renders **left-aligned** paragraph directly beneath four centered elements (Crest, H1, Diocese, Tagline) on `<640 px` screens (see [`issue_hero-left-aligned-copy-mobile_390x844.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_hero-left-aligned-copy-mobile_390x844.png)).
   - Hero CTAs sit inside an unnecessary dark pill card (`p-2 rounded-2xl bg-navy-950/80 border-navy-800` at L63) creating redundant double-border clutter around buttons.
3. **Stats Strip (`StatsStrip.tsx:7-39`):**
   - **Data Contradiction:** Hardcodes `const degreeCount = 7` (`StatsStrip.tsx:9`), displaying `"7 Degree Levels Conferred"`, while Section 4 below links to **`"View All 10 Conferred Degrees & Ordinance Tracks"`** (`page.tsx:225`).
   - All 4 stat labels truncate (`truncate` CSS) risk cutting copy on narrow tablet cells (`sm:grid-cols-2`).
4. **Theological Foundation & Divisions (`page.tsx:102-175`):**
   - Solid readable prose, but paragraph width exceeds ideal line length on tablet (`max-w-prose` rendered ~89–93 chars). Both division cards (`School of Biblical Studies` & `School of Church Ministry Education`) link identically to `/academics`.
5. **Degrees & Ministerial Programmes (`page.tsx:178-229`):**
   - Shows 6 cards (`B.Th.`, `B.D./B.Div.`, `B.Min.`, `M.Th.`, `M.Div.`, `M.Min.`). Subtitle lines (`text-gold-800`) and `Enrol ->` (`text-gold-800 hover:text-gold-950`) fall back to `#061026` black/navy because `gold-700..950` are undefined in `tailwind.config.ts`.
6. **Curriculum Highlights (`page.tsx:232-298`):**
   - At `768px` tablet (`md:grid-cols-3`), card header badges (`Module 1`–`Module 3`) squeeze tight so `"MODULE\n1"` wraps onto 2 lines inside rounded pills, and included topic bullets truncate abruptly (`Definition of Christian Eth...`).
7. **Great Governing Council Leaders (`page.tsx:301-374`):**
   - Uses circular initial badges (`SB`, `EM`, `TV`) instead of leadership portraits. Contrast bug on Founder dark card: `text-gold-200` / `p` metadata works on gradient CSS, though dark card vs white sibling cards feels visually unbalanced (`3 cols`).
8. **Affiliated Institutions Strip (`AffiliationsStrip.tsx`):**
   - Windows browsers lack color country flag emoji rendering, rendering large plain text letters **`US`, `GB`, `FR`, `IE`, `CH`** instead of flags.
9. **Administrative & Collegiate Centres (`page.tsx:380-440`):**
   - Exposes internal reconciliation badge **`"Brochure 2 List"`** on Hyderabad card (`L408`) to prospective students.
10. **Printable Summary & Footer (`ProgrammeOverviewPrint.tsx`, `Footer.tsx`):**
    - Printable section (`~680px` tall) dumps raw dense grid copy onto homepage instead of cleanly gating behind print view or `/academics` download; `border-l-3` (`L61`) silently fails in Tailwind v3. Final CTA button text wraps onto 2 lines at `sm+`.

---

## 2. About Us (`/about`) & Vision & Mission (`/vision-and-mission`)
- **Files:** [`src/app/about/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/about/page.tsx), [`src/app/vision-and-mission/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/vision-and-mission/page.tsx)
- **Screenshot Proof:** [`issue_about-draft-copy-notice.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_about-draft-copy-notice.png)
- **Findings:**
  - Both pages render literal unedited developer/staging copy publicly: **`"Draft copy — pending client confirmation"`** (twice on `/about`, lines 102 & 130; twice on `/vision-and-mission`, lines 52 & 120).
  - `/vision-and-mission` has `4.45:1` WCAG contrast failure on that draft label (`text-slate-500` on ivory `#FAF7F0`).
  - Both pages duplicate the exact same Vision paragraph (`"To be an internationally recognized sanctuary..."`), diluting page distinctiveness, while claiming `"internationally recognized"` right inside body copy despite `config.ts:8` instructing not to claim unverified international recognition!
  - `/vision-and-mission` is **omitted completely** from the mobile hamburger menu.

---

## 3. Governance (`/governance`)
- **File:** [`src/app/governance/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/governance/page.tsx)
- **Screenshot:** [`issue_governance-initials-avatars-and-discrepancy.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_governance-initials-avatars-and-discrepancy.png)
- **Findings:**
  - All 11 leadership cards display initials circles (`SB`, `EM`, `TV`, `BG`, `IP`, `IS`, `KS`, `MJ`, `TR`, `CB`, `JI`) with zero portrait photos or verified biographical depth.
  - Exposes internal source disagreements to visitors: Executive Director cards display italicized notes like *"Brochure 2 notes Spain affiliation and spelling 'Bily'"*, *"Present in Brochure 1; Brochure 2 has Rev. Dr. S. John Isaiah instead"*, and bottom banner **`"Archival Source Discrepancy Notice"`** (`L175`). Card `#8` (`Rev. Dr. S. John Isaiah`) carries badge `EXECUTIVE DIRECTOR (BROCHURE 2)`, contradicting `I. Singam`'s note directly beside it.

---

## 4. Academics Hub (`/academics`) & Specialisation Tracks (`/academics/[slug]` ×6)
- **Files:** [`src/app/academics/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/academics/page.tsx), [`src/app/academics/[slug]/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/academics/[slug]/page.tsx)
- **Screenshots:** [`academics_desktop_1920x1080_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/desktop/academics/academics_desktop_1920x1080_initial.png), [`academics-ancient-languages_desktop_1920x1080_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/desktop/academics-ancient-languages/academics-ancient-languages_desktop_1920x1080_initial.png)
- **Findings:**
  - `/academics` cards display **`Source: Brochure 1/2`** and `Brochure Note: Brochure 1 writes B.D.; Brochure 2 writes B.Div.` verbatim in public degree UI (`L131-148`).
  - Core Subjects section (`L261`) uses undefined `text-gold-900` and invalid `shadow-xs` (`L259`). Inline links (`L139, L230`) trigger `21` WCAG 2.5.8 target-size warnings (`16 px` height).
  - Navbar Mega-Menu links (`School of Biblical Studies`, `School of Church Ministry`) navigate to `/academics` top instead of scrolling to `#schools`.
  - `/academics/[slug]` pages:
    - All 6 slugs (`systematic-theology`, `new-testament`, `christian-ethics`, `elective-courses`, `theological-institutes`, `ancient-languages`) render `200 OK` and invalid slugs (`e.g. /academics/research-methodologies`) render `404`.
    - `relatedSlugs` data (`specialisations.ts:128,189,255,307,339,400`) is never rendered on `[slug]/page.tsx`, and `"research-methodologies"` isn't a valid slug.
    - Page title lengths reach **111 characters** on `theological-institutes` and `ancient-languages`.
    - `ancient-languages` displays Syriac Aramaic codepoints (`ܐ/ܒ/ܫ`) with inconsistent Windows fallback glyphs inside Cinzel serif.

---

## 5. Biblical Ministry Curriculum (`/curriculum`)
- **File:** [`src/app/curriculum/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/curriculum/page.tsx)
- **Screenshots:** [`curriculum_desktop_1440x900_module2-selected.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/interaction-states/curriculum_desktop_1440x900_module2-selected.png), [`curriculum_tablet_768x1024_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/tablet/curriculum/curriculum_tablet_768x1024_initial.png), [`curriculum_mobile_390x844_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/mobile/curriculum/curriculum_mobile_390x844_initial.png)
- **Findings:**
  - **Broken Search/Filter Input:** `#curriculum-filter` updates `filterQuery` state, and `filteredModules` (`L43-51`) computes filtered modules, **but JSX never reads `filteredModules`**—so typing any keyword (`Theodicy`, `Trinity`, `xyz`) does zero filtering!
  - **Garbled OCR Relic Live (`curriculum.ts:89`):** Module 2 comparison renders `"Buddhism (BUTCBA / Buddha)"`, verbatim copying a scan typo from Brochure 2.
  - **ARIA & Keyboard Gaps:** Tab buttons lack `aria-controls`, `role="tabpanel"`, `ArrowLeft`/`ArrowRight` navigation; `border-l-3` (`L190`), `shadow-xs` (`L66,250,281,297`), and `no-scrollbar` (`L126`) emit zero CSS.
  - **URL Hash Ignored:** Links throughout site point to `/curriculum#module-5` or `/curriculum#module-2`, yet `useState(1)` never reads `window.location.hash` on mount—deep links always open Module 1!
  - **No Route `metadata`:** Entire page is `"use client"`, dropping unique SEO title/description.

---

## 6. Research (`/research`) & Doctoral Programmes (`/doctoral`)
- **Files:** [`src/app/research/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/research/page.tsx), [`src/app/doctoral/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/doctoral/page.tsx)
- **Findings:**
  - `/research`: `"Core Methodological Track"` (`L39`, ×4 cards) fails WCAG 2.2 AA contrast at **`2.56:1`** (`text-slate-400` on white). `"Submit Research Proposal"` links (`L69`) are `16px` tall (< 24px minimum target).
  - `/doctoral`: `"Stage 01–04"` (`L144`, ×4 stages) fails WCAG contrast at **`3.11:1`** (`text-gold-600` on `bg-slate-50`). Page `<title>` is **97 chars** (`37 chars` over ideal limit). Legal *Honoris Causa* disclaimer (`L108-116`) is clear and well-highlighted.

---

## 7. Affiliations (`/affiliations`) & Administrative Centres (`/centres`)
- **Files:** [`src/app/affiliations/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/affiliations/page.tsx), [`src/app/centres/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/centres/page.tsx)
- **Screenshots:** [`issue_affiliations-windows-flag-fallback.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_affiliations-windows-flag-fallback.png), [`issue_centres-daddy-guppy-garbled-text.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_centres-daddy-guppy-garbled-text.png)
- **Findings:**
  - `/affiliations`: Windows Chromium renders flag emojis as oversized text codes `US`, `GB`, `FR`, `IE`, `CH` without `aria-hidden="true"`. Footer line `"International Ecclesiastical Accord"` (`L61`, ×5 cards) fails contrast at **`2.56:1`**.
  - `/centres`: Network schematic SVG banner cites `"Across 8 Strategic Centres"` (`L35`) right above **9 rendered cards** (8 Brochure 1 + Hyderabad Brochure 2). Every card displays masked placeholder numbers (`+91-XXXXXXXXXX`, `+60-XXXXXXXXX`, `+1-XXXXXXXXXX`) and `"Pending Confirmation"` / `"Daddy Guppy Bangalore INDIA."` disclosure (`L172`). Note also in `centres.ts:42,53`, Trinity Centre and Coimbatore have identical coordinates (`11.0168, 76.9558`). `"Contact This Centre"` appends `?centre=chennai` which `/contact` drops.

---

## 8. Admissions (`/admissions`) & Contact (`/contact`)
- **Files:** [`src/app/admissions/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/admissions/page.tsx), [`src/app/contact/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/contact/page.tsx), [`src/components/forms/EnquiryForm.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/forms/EnquiryForm.tsx)
- **Screenshots:** [`admissions_desktop_1920x1080_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/desktop/admissions/admissions_desktop_1920x1080_initial.png), [`issue_contact-placeholder-map-and-prefill.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_contact-placeholder-map-and-prefill.png), [`contact_tablet_768x1024_initial.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/tablet/contact/contact_tablet_768x1024_initial.png)
- **Findings:**
  - **Broken Prospectus CTA (`/admissions:121-127`):** `"Download Prospectus (PDF)"` points to `href="#apply"` instead of an actual PDF.
  - **Copy Typo (`/src/data/admissions.ts:49`):** `"Regular Seminar / Modular / Distance Distance Learning"` (repeated word).
  - **Responsive Email Overflow (`/contact` at `768×1024`):** `admissions@trinityinternationaluniversity.edu.in` spills right out of the middle 3-column card into Card 3 and gets truncated visually (observed in `contact_tablet_768x1024_initial.png`).
  - **Placeholder Map & Garbled Text (`/contact:111-145`):** Map box literally states *"Live interactive Google Map embed placeholder..."* right above *"Brochure 2 address text is garbled ('Daddy Guppy Bangalore INDIA.')"* and `+91 (0) 80-XXXXXXXX`.
  - **Form Duplication & Dead Query Param:** Identical `EnquiryForm` reused verbatim on `/admissions` and `/contact`; ignores `?centre=` query string on `/contact`. Validation & `POST /api/contact` submission work live cleanly (`200 OK`), though inputs drop below `44px` height on mobile/desktop.

---

## 9. Accreditations (`/accreditations`), Certificates (`/certificates-and-awards`), Disclaimer (`/disclaimer`), Privacy (`/privacy`) & 404
- **Files:** `accreditations/page.tsx`, `certificates-and-awards/page.tsx`, `disclaimer/page.tsx`, `privacy/page.tsx`, `not-found.tsx`
- **Findings:**
  - **Empty Institutional Pages:** `/accreditations` & `/certificates-and-awards` both render virtually identical `"Documents Available on Request"` empty states (`accreditations: []`, `certificatesAndAwards: []`), and neither appears in the mobile drawer navigation.
  - **Inconsistent Historical Claim:** `certificates-and-awards/page.tsx:72` claims `"awarded since registration in 2002"`, conflicting with unsettled `539/2002` vs `593/2020` in `config.ts`.
  - **Privacy Contrast & Completeness:** `privacy/page.tsx:60` fails WCAG contrast (`2.56:1` `text-slate-400` on white) and omits retention/grievance rights under Indian DPDP Act, 2023.
  - **Not-Found Page (`not-found.tsx`):** Works for unknown URLs (`HTTP 404`) and unknown `/academics/[slug]` params; `"Error 404"` (`text-gold-600` `#B8860B` on `#FAF7F0` ivory) has low contrast (`~2.98:1`).
