# 04 — Pixel-Level UI/UX & Brand Identity Forensic Audit

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Role Lens:** Creative Director, Senior UI/UX Designer & Conversion Specialist  

---

## 1. Visual Hierarchy & Immediate Visitor Clarity Test

Evaluating above-the-fold composition on desktop (`1920×1080`, `1440×900`) and mobile (`390×844`):
- **What the institution is:** Clear — `"Trinity International University"` + `"Indian Trinity Church Diocese"` + `"Christian Clerical Rites and Traditions"` appear within 1 second.
- **Who it serves & programmes:** Clear headline proposition, though cluttered by double legal headers (utility strip + crest + 5 lines before CTA).
- **Why trust this institution vs peers:** **Severe weakness.** Zero real campus photos, zero human faces, `"TODO"`/garbled brochure leakage, `"Draft copy"` tags, fake masked phone `+91 (0) 80-XXXXXXXX`, and missing prospectus PDF create the impression of an internal staging build rather than an established seminary.
- **What next action to take:** Intention is CTA-led (`Explore Programmes` / `Enquire Now` + top-right `Apply Now`), **but broken physically by UI defects**: top-right `Apply Now` is sliced in half at `1440px` (`55px` clipped) and invisible at `1280px` / `1024px`, while mobile hamburger disappears past `390px–320px`.

---

## 2. Typography & Broken Design Token Audit

### Font Pairing & Rendering Metrics
- **Fonts (`globals.css:1`, `tailwind.config.ts:46-49`):** `Cinzel` (`h1–h6`, nav links, buttons, small-caps UI) + `Inter` (`body`).
- **Critique:**
  1. `Cinzel` is an **all-caps engraved serif** meant primarily for ceremonial display titles (`H1`, `H2`), yet [`Navbar.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/Navbar.tsx), [`Button.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/Button.tsx), card eyebrows, tab buttons, and inline `"Explore Curricula"` links all apply `font-serif` (`Cinzel`), making small `12px` labels dense, visually heavy, and prone to line-wrapping (`Research & Ph.D.` wraps onto 2 lines in top navbar).
  2. **Type Size Ceiling (`CRAFT-DISPLAY-SCALE`):** Hero H1 is `60px` (`4.2vw` on 1440px desktop), yielding a modest `3.75×` ratio over `16px` body text—clean, though intermediate sizes (`text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`) blur hierarchy between major section breaks and card headings.
  3. **Excessive Micro-Text (`text-xs` = 12px):** Over 70% of card descriptions, legal notices, credentials, and centres metadata across `/academics`, `/centres`, `/governance`, and `/admissions` sit at `text-xs` (`12px`) rather than comfortable `14px–16px` prose, increasing reading strain for older church leaders and mobile visitors.
  4. **Line Lengths Exceed Comfort (`CRAFT-LINE-LENGTH`):** `max-w-prose` paragraph at tablet `768px` reaches **89–93 chars/line** (vs optimal `60–75ch`).

### Critical Defect: 54 Undefined `gold-700..950` Color Classes!
[`tailwind.config.ts:21-29`](file:///c:/Users/Keba/Desktop/bible%20college/tailwind.config.ts#L21-L29) only defines:
`gold: { 50, 100, 200, 300, 400, 500, 600 }`.
Across `src/`, developers wrote **`54` instances** of `text-gold-700`, `text-gold-800`, `text-gold-900`, and `text-gold-950` (including Badge `gold` variant [`Badge.tsx:16`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/Badge.tsx#L16), [`SectionHeader.tsx:39`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/SectionHeader.tsx#L39), Home degree titles/durations/CTAs [`page.tsx:106,150,192,197,214`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/page.tsx#L106-L214), and `EnquiryForm.tsx:72`). Because Tailwind omits undefined scale steps completely, those elements lose their dark metallic gold tint (`#856108` / `#6B4D05`) and fall back to `#061026` dark navy/black — noticeable across every screenshot where "gold" eyebrows and degree subtitles look dark slate/black instead of burnished gold!

---

## 3. Component Visual Craft, Repetitive Card Kit & Surface Polish

- **SaaS Card-Kit Monotony (`CRAFT-CARD-KIT`):** Live DOM analysis flagged **5 consecutive homepage sections** (and nearly every interior page) built out of identical white `rounded-2xl` / `rounded-xl` cards with subtle drop shadows (`Stats` -> `Divisions` -> `Degrees` -> `Modules` -> `Leaders` -> `Affiliations` -> `Centres`). Even `StatsStrip` cards, `AdmissionSteps`, `Eligibility`, `PhD`, and `Centres` repeat identical boxed grids instead of differentiating dense information using clean typographic lists, specification tables (`10 degrees` or `Core Subjects`), editorial split columns, or timelines.
- **Unnecessary Hero & CTA Button Wrappers:** Homepage lines `63` and `461` (`bg-navy-950/80 border border-navy-800 p-2 rounded-2xl`) and `/curriculum` line `317` wrap standalone buttons inside extra dark rounded borders, creating messy box-within-box visual noise.
- **Broken Decorator Classes:** Invalid Tailwind classes `shadow-xs` (×7), `drop-shadow-xs` (×1), and `border-l-3` (×2, on `curriculum/page.tsx:190` and `ProgrammeOverviewPrint.tsx:61`) produce zero visual borders/elevation.
- **Dual Crest Discrepancy:** Inline [`Crest.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/Crest.tsx) omits scroll banner text `"UNIVERSITY OF TRINITY INTERNATIONAL"`/`"TRINITY INTERNATIONAL"` which exists in [`public/logo.svg`](file:///c:/Users/Keba/Desktop/bible%20college/public/logo.svg), while Brochure 1/2 designs used full scroll lettering.

---

## 4. Photography, Iconography & Editorial Credibility Defects

1. **Zero Photography Anywhere:** Zero `<img>` tags on the entire 22-route website. Governing bishops/directors render as plain initial circles (`SB`, `EM`), HQ campus renders as empty blueprint SVG grids (`contact/page.tsx:114`), and global reach renders as dotted wireframe SVGs.
2. **Broken Cross-Platform Flag Emojis (`AffiliationsStrip.tsx:40`, `affiliations/page.tsx:44`):** Windows OS refuses to render Unicode regional-indicator flag glyphs (`🇺🇸🇬🇧🇫🇷🇮🇪🇨🇭`), showing bare uppercase ISO codes **`US`**, **`GB`**, **`FR`**, **`IE`**, **`CH`** (verified in [`issue_affiliations-windows-flag-fallback.png`](file:///c:/Users/Keba/Desktop/bible%20college/audit-report/screenshots/issues/issue_affiliations-windows-flag-fallback.png)). Vector SVG flags (`country-flag-icons` or clean inline SVGs) are mandatory for cross-OS consistency.
3. **Internal Staging Copy & Discrepancy Notes Exposed Publicly (`UX Credibility Killer`):**
   Visitors currently read raw engineering/client checklist artifacts on live pages:
   - `/about` & `/vision-and-mission`: `"Draft copy — pending client confirmation"` (×4)
   - `/contact` & `/centres`: `"+91 (0) 80-XXXXXXXX"`, `"+91-XXXXXXXXXX"`, `"Brochure 2 address text is garbled ('Daddy Guppy Bangalore INDIA.')"`, `"Pending Confirmation"`, `"Brochure 2 Variant"`
   - `/home`: `"Brochure 2 List"` badge on Hyderabad
   - `/governance`: `"Archival Source Discrepancy Notice"`, `"Alternative name spellings ('Rev. Dr. K. Bily Graham'...)"`, `"Brochure 2 omits M.Div."`
   - `/academics`: `"Source: Brochure 1/2"`, `"Brochure Note: Brochure 1 writes B.D..."`
   - `/curriculum`: `"Buddhism (BUTCBA / Buddha)"` (OCR artifact!)
   - `/admissions`: `"Distance Distance Learning"`, stubbed PDF `"Download Prospectus"` jumping back down the page
   This makes an actual prospective pastor/donor feel the site is unfinished internal QA rather than an authoritative university portal.
4. **Placeholder Map & Hero Visual Vacuum:** The `/contact` map box renders an empty grid with disclaimer copy (`"Live interactive Google Map embed placeholder..."`) — visually signaling `"Under Construction"`.

---

## 5. UX Friction & Conversion Rate Obstacles

- **High-Friction Duplicate Enquiry Flow:** `/admissions#apply` and `/contact` render the exact same 6-field `EnquiryForm` asking `"Ministry Background"` even when a user simply wants to request institutional accreditation certificates (`/accreditations`) or schedule a phone call, without offering a lightweight quick-callback option or Centre prefill (`?centre=chennai` ignored).
- **Broken Top-Bar Promises:** Clicking `EN / தமிழ்` toggles button label with **zero Tamil translation**; clicking `Download Prospectus (PDF)` jumps to the form instead of delivering a brochure PDF; clicking `"Switch Language"` on mobile sits right beside truncated `"INDIAN TRINITY CHURCH DIOC..."` and doesn't persist across routes or change anything.
- **Lost Discovery on `/academics` & `/curriculum`:** Homepage stats boast `7` degrees while CTA underneath says `10 Conferred Degrees`. Curriculum search/filter box accepts typing and does zero filtering, and links ending in `#module-5` fail to open Module 5.
