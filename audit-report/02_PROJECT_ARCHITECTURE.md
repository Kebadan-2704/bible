# 02 — Project Architecture & Repository Forensic Discovery

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Workspace Root:** `c:\Users\Keba\Desktop\bible college`  
**Audit Date:** 2026-11-25  

---

## 1. Root Repository Inventory & Tooling Stack

The project is a TypeScript Next.js App Router web application managed with `pnpm`.

| Configuration / Root File | Role | Key Findings / Issues |
|---|---|---|
| [`package.json`](file:///c:/Users/Keba/Desktop/bible%20college/package.json) | Manifest & scripts | Next.js `^14.2.15` (installed `14.2.35`), React `18.3.1`, Tailwind `3.4.14`, TypeScript `5.6.3`. Scripts: `dev`, `build`, `start`, `lint`. **Zero test scripts or test frameworks** (`jest`, `vitest`, `@testing-library/*`, `playwright`, `cypress`). |
| [`next.config.mjs`](file:///c:/Users/Keba/Desktop/bible%20college/next.config.mjs) | Next.js config | Sets `reactStrictMode: true` and **`optimizeFonts: false`** (line 4), explicitly disabling Next.js built-in Google Font subsetting/inlining. No security headers (`headers()`), image optimization config, or redirects configured. |
| [`tailwind.config.ts`](file:///c:/Users/Keba/Desktop/bible%20college/tailwind.config.ts) | Design tokens | Custom `navy` (50, 100, 700–950), `gold` (50–600 only), `ivory` (50–300), `accent` colors. **Critical token gap:** `gold` stops at `600` (`#B8860B`), while source files reference undefined `gold-700/800/900/950` 54 times. `plugins: []` omits `tailwindcss-animate`, leaving `animate-in`/`fade-in`/`zoom-in` classes inactive. |
| [`tsconfig.json`](file:///c:/Users/Keba/Desktop/bible%20college/tsconfig.json) | TypeScript config | `strict: true`, path alias `@/*` -> `./src/*`, `noEmit: true`. `pnpm exec tsc --noEmit` should be added to CI; `.eslintrc.json` extends `next/core-web-vitals`. |
| [`postcss.config.js`](file:///c:/Users/Keba/Desktop/bible%20college/postcss.config.js) | CSS pipeline | Standard `tailwindcss` + `autoprefixer`. |
| [`pnpm-lock.yaml`](file:///c:/Users/Keba/Desktop/bible%20college/pnpm-lock.yaml) | Lockfile | `128,718` bytes locked dependency graph. |
| `public/` | Static assets | Contains **only 1 asset**: [`logo.svg`](file:///c:/Users/Keba/Desktop/bible%20college/public/logo.svg) (2,204 bytes). **No `favicon.ico`, no `apple-icon`, no `og-image`, and zero raster photography** (campus, leaders, classes). |
| Root loose JPEGs | Stray source artifacts | Two raw brochure WhatsApp scans (~716 KB total) sit unreferenced in the project root: [`WhatsApp Image 2026-11-14 at 14.35.47.jpeg`](file:///c:/Users/Keba/Desktop/bible%20college/WhatsApp%20Image%202026-11-14%20at%2014.35.47.jpeg) and [`WhatsApp Image 2026-11-14 at 14.35.47 (1).jpeg`](file:///c:/Users/Keba/Desktop/bible%20college/WhatsApp%20Image%202026-11-14%20at%2014.35.47%20(1).jpeg). |
| Environment files | Secrets / config | No `.env` or `.env.local` exists in repository root. [`route.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/api/contact/route.ts#L31-L41) reads `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`; [`README.md`](file:///c:/Users/Keba/Desktop/bible%20college/README.md#L136-L146) also mentions `NEXT_PUBLIC_SITE_URL`, though neither `layout.tsx` nor `sitemap.ts` nor `robots.ts` reads `NEXT_PUBLIC_SITE_URL` (all hardcode `https://trinityinternationaluniversity.edu.in`). |

---

## 2. Source Code Architecture (`src/` — 53 Files, 323,764 Bytes)

```
src/
├── app/                                # Next.js 14 App Router (21 routes/endpoints + globals/layout/404)
│   ├── globals.css                     # Render-blocking @import Google Fonts; smooth scroll; print CSS
│   ├── layout.tsx                      # Root HTML shell, JSON-LD schema, layoza meta tags, ScrollProgress/Navbar/Footer/BackToTop
│   ├── not-found.tsx                   # Custom 404 page
│   ├── robots.ts / sitemap.ts          # SEO crawler directives & dynamic sitemap
│   ├── api/contact/route.ts            # POST form validation + console PII logging + optional Resend dispatch
│   ├── page.tsx                        # Homepage (Server Component, 484 lines)
│   ├── about/page.tsx                  # Institutional heritage + TODO/draft copy visible to users
│   ├── academics/page.tsx & [slug]/    # Academic hub + 6 SSG specialisation sub-routes
│   ├── accreditations/page.tsx         # Empty-state "Available on Request"
│   ├── admissions/page.tsx             # 4-step process, eligibility, stubbed prospectus link, EnquiryForm, FAQ Accordion
│   ├── affiliations/page.tsx           # 5 partner bodies with Unicode emoji flags + disclaimer
│   ├── centres/page.tsx                # Schematic SVG network + 9 centre cards (brochure discrepancies shown)
│   ├── certificates-and-awards/page.tsx# Empty-state "Available on Request"
│   ├── contact/page.tsx                # 3 contact cards + EnquiryForm + SVG grid map placeholder
│   ├── curriculum/page.tsx             # Client component ("use client"): 7 modules tab switcher + broken filter
│   ├── disclaimer/page.tsx             # Legal ecclesiastical disclaimer
│   ├── doctoral/page.tsx               # 4 Ph.D. areas + Honoris Causa section
│   ├── governance/page.tsx             # Initials avatars for officers + 8 Executive Directors
│   ├── privacy/page.tsx                # Privacy policy (points to general admissions email)
│   ├── research/page.tsx               # 4 methodology areas + Dissertation Project steps
│   └── vision-and-mission/page.tsx     # Vision + 4 mission pillars + "Draft copy" markers
├── components/ (15 files)
│   ├── forms/EnquiryForm.tsx           # Client form (react-hook-form + zod)
│   ├── home/                           # HeroGlobe.tsx ("use client" unnecessarily), StatsStrip.tsx, AffiliationsStrip.tsx, ProgrammeOverviewPrint.tsx
│   ├── layout/                         # Navbar.tsx (552 lines!), Footer.tsx, ScrollProgress.tsx, BackToTop.tsx
│   ├── search/GlobalSearchModal.tsx    # Client Fuse.js search modal
│   └── ui/                             # Accordion.tsx, Badge.tsx, Button.tsx, Card.tsx, Crest.tsx, SectionHeader.tsx, Tabs.tsx (UNUSED)
├── data/ (11 TS files)                 # Static content modules ("single source of truth")
└── lib/                                # utils.ts (`cn`), i18n.ts (UNUSED Tamil/English dictionary)
```

---

## 3. Complete Route & Endpoint Inventory (23 Endpoints)

| Route / Endpoint | File | Render Mode | Layout & Major Components | Auth | Status & Defects |
|---|---|---|---|---|---|
| `/` | [`src/app/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/page.tsx) | Server | `HeroGlobe`, `Crest`, `StatsStrip`, `AffiliationsStrip`, `ProgrammeOverviewPrint` | Public | Live; contradicts itself (`7` vs `10` degrees); `StatsStrip` hardcodes `degreeCount = 7`; displays `"Brochure 2 List"` badge; no real photography. |
| `/about` | [`src/app/about/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/about/page.tsx) | Server | `Crest`, `Card`, `Button`, `SectionHeader` | Public | Live; exposes `"Draft copy — pending client confirmation"` twice (L102, L130); hidden in mobile menu secondary routes (reachable via mobile drawer `"About Us & Heritage"`). |
| `/vision-and-mission` | [`src/app/vision-and-mission/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/vision-and-mission/page.tsx) | Server | `SectionHeader`, `Card` | Public | Live; exposes `"Draft copy — pending client confirmation"` twice (L52, L120); omitted from mobile drawer. |
| `/governance` | [`src/app/governance/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/governance/page.tsx) | Server | `SectionHeader`, `Card` | Public | Live; initials circles instead of portraits; leaks brochure discrepancy notice to visitors; lists conflicting `Rt. Rev. Dr. I. Singam` AND `Rev. Dr. S. John Isaiah`. |
| `/academics` | [`src/app/academics/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/academics/page.tsx) | Server | `SectionHeader`, `Card`, `Badge`, `Button` | Public | Live; leaks `"Source: Brochure 1/2"` and `"Brochure Note:"` developer reconciliation strings into card UI; `"School of Biblical Studies"` / `"School of Church Ministry"` dropdown links both go to `/academics` top without anchors. |
| `/academics/[slug]` (×6) | [`src/app/academics/[slug]/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/academics/[slug]/page.tsx) | SSG (`generateStaticParams`) | `Button`, script glyph boxes (`ancient-languages`) | Public | 6 static slugs live (`systematic-theology`, `new-testament`, `christian-ethics`, `elective-courses`, `theological-institutes`, `ancient-languages`). `relatedSlugs` array unused & contains stale `"research-methodologies"`. |
| `/curriculum` | [`src/app/curriculum/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/curriculum/page.tsx) | **Client** (`"use client"`) | 7-tab selector, `#curriculum-filter` | Public | Live; **broken topic filter** (`filteredModules` computed L43–51 but never rendered); exports/displays OCR typo `"Buddhism (BUTCBA / Buddha)"`; lacks SEO `metadata` export because file is `"use client"`. |
| `/research` | [`src/app/research/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/research/page.tsx) | Server | `SectionHeader`, `Button`, Methodology cards | Public | Live; `text-slate-400` low-contrast badge label (`L39`). |
| `/doctoral` | [`src/app/doctoral/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/doctoral/page.tsx) | Server | `SectionHeader`, `Card`, `Button` | Public | Live; solid legal disclaimer for *Honoris Causa*. |
| `/affiliations` | [`src/app/affiliations/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/affiliations/page.tsx) | Server | `SectionHeader`, `Card`, `Button` | Public | Live; Windows renders regional indicator flag emojis (`🇺🇸🇬🇧🇫🇷🇮🇪🇨🇭`) as plain `US`, `GB`, `FR`, `IE`, `CH` letters. |
| `/centres` | [`src/app/centres/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/centres/page.tsx) | Server | SVG Network Schematic + 9 centre cards | Public | Live; exposes `"Brochure 2 Variant"`, `"Pending Confirmation"`, `"+91-XXXXXXXXXX"`, `"Daddy Guppy Bangalore INDIA."`; `"Contact This Centre"` links `?centre=...` which is ignored by `EnquiryForm`. |
| `/admissions` | [`src/app/admissions/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/admissions/page.tsx) | Server + Client | `EnquiryForm`, `Accordion`, Prospectus banner | Public | Live; **`Download Prospectus (PDF)` points to `href="#apply"`** instead of a PDF; eligibility data contains double-word typo `"Distance Distance Learning"` (`admissions.ts:49`). |
| `/accreditations` | [`src/app/accreditations/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/accreditations/page.tsx) | Server | `SectionHeader`, `Button` | Public | Live empty-state by design (`accreditations: []`); omitted from mobile drawer. |
| `/certificates-and-awards` | [`src/app/certificates-and-awards/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/certificates-and-awards/page.tsx) | Server | `SectionHeader`, `Button` | Public | Live empty-state by design (`certificatesAndAwards: []`); omitted from mobile drawer; states `"since registration in 2002"` hardcoded in JSX (ignores disputed `593 / 2020`). |
| `/contact` | [`src/app/contact/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/contact/page.tsx) | Server + Client | 3 info cards, `EnquiryForm`, static SVG grid map placeholder | Public | Live; duplicates identical `EnquiryForm` from `/admissions`; ignores `?centre=` query parameter; displays map placeholder + `"Daddy Guppy"` notice + `+91 (0) 80-XXXXXXXX`. |
| `/disclaimer` | [`src/app/disclaimer/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/disclaimer/page.tsx) | Server | `SectionHeader` | Public | Live; `"Last updated: November 2026"` hardcoded. |
| `/privacy` | [`src/app/privacy/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/privacy/page.tsx) | Server | `SectionHeader` | Public | Live; thin 4-section draft (no retention period, GDPR/DPDP rights, cookie/server log disclosure). |
| `/not-found` | [`src/app/not-found.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/not-found.tsx) | Server | `Crest`, `Button` | Public | Renders custom 404 UI for unknown routes and invalid `/academics/[slug]` params. |
| `/api/contact` | [`src/app/api/contact/route.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/api/contact/route.ts) | API Route Handler (`POST`) | Zod schema validation, optional Resend HTTP `fetch` | Public | Live (`200`/`400`/`500`); **no rate limiting, no spam/CSRF protection, no persistence (console.log only when `RESEND_API_KEY` unset)**; logs candidate PII (`fullName`, `email`, `phone`, `callingDescription`) directly to stdout. |
| `/robots.txt` & `/sitemap.xml` | `robots.ts` / `sitemap.ts` | Metadata Routes | Static directives + dynamic 22-URL XML map | Public | Live; sitemap `lastModified` regenerates `new Date()` dynamically on every request. |

---

## 4. Code-Level Forensic Audit Findings

### 4.1 Dead Dependencies, Dead Code & Unused Modules
1. **`framer-motion` (`^11.11.11`) is a complete ghost dependency**: Occupies **2,920,364 bytes (~2.92 MB)** on disk inside `node_modules` (9× larger than the entire `src/` folder at 323,764 bytes) and is touted in [`README.md`](file:///c:/Users/Keba/Desktop/bible%20college/README.md#L4), yet `static-code-audit.json` verifies **0 imports** across all 53 files in `src/`.
2. **Unused UI Component — [`Tabs.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/Tabs.tsx)**: Never imported anywhere; [`curriculum/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/curriculum/page.tsx) re-implemented its own bespoke tab buttons inline instead of reusing `Tabs.tsx`.
3. **Unused Internationalization Dictionary — [`i18n.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/lib/i18n.ts)**: Contains full English and Tamil translations (`translations.ta`, including institutional title and 13 nav keys), yet **zero components import it**. Meanwhile, [`Navbar.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/Navbar.tsx#L34) maintains local `locale` state that only flips its own button label (`EN / தமிழ்` ↔ `தமிழ் / EN`).
4. **Unused Computed Variable (`filteredModules`) — [`curriculum/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/curriculum/page.tsx#L43-L51)**: Computes filtered array from `filterQuery`, then never uses `filteredModules` anywhere in JSX (tabs render `biblicalMinistryModules`, detail pane renders `activeModule`).
5. **Unreferenced `relatedSlugs` & Dead Slug [`specialisations.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/specialisations.ts#L128)**: `academics/[slug]/page.tsx` line 201 has comment `{/* CTA and Related Specialisations */}`, never renders related cards, and `systematic-theology` lists `"research-methodologies"` which 404s under `/academics/research-methodologies`.
6. **Unused SVG Gradient ID — [`HeroGlobe.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/home/HeroGlobe.tsx#L15-L19)**: Defines `<radialGradient id="globeGrad">` inside `<defs>` but never applies `fill="url(#globeGrad)"` anywhere.
7. **Unused Asset — [`public/logo.svg`](file:///c:/Users/Keba/Desktop/bible%20college/public/logo.svg)**: Referenced only in `layout.tsx` JSON-LD `logo` URL; UI instead renders inline React `<Crest />` SVG (leading to 2 diverging crest versions: `logo.svg` carries text banner `"TRINITY INTERNATIONAL"`, whereas [`Crest.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/Crest.tsx#L118-L123) renders dots and dashes on the ribbon).

### 4.2 Broken / Invalid Tailwind CSS Utilities (127 Occurrences)
Verification against [`tailwind.config.ts`](file:///c:/Users/Keba/Desktop/bible%20college/tailwind.config.ts) (`3.4.14`, `plugins: []`) revealed **127 class occurrences** across `src/` that compile to **zero CSS rules**:
- **54 Undefined Gold Shade Classes (`text-gold-700`, `text-gold-800`, `text-gold-900`, `text-gold-950`)**: `tailwind.config.ts` defines `gold` only up to `600` (`#B8860B`). Because `700–950` are missing, Tailwind omits them from the stylesheet. Elements drop back to inherited `#061026` / `#0B1F4B` (making "gold" degree subtitles, module labels, durations, and `Enrol →` links appear dark navy/black rather than deep antique gold) or white on dark sections! *(Important exception: if a future dark block used `text-gold-900` inside a light pill on a dark card without explicit text override, inheritance would invert unexpectedly.)*
- **73 Other Non-Generating Utility Tokens**:
  - `animate-in`, `fade-in`, `zoom-in` (×13 across `page.tsx`, `Navbar.tsx`, `GlobalSearchModal.tsx`, `EnquiryForm.tsx`): Requires `tailwindcss-animate`, which is neither installed nor registered in `tailwind.config.ts`.
  - `shadow-xs` (×7) and `drop-shadow-xs` (×1): Tailwind v4 classes unavailable in v3.4.14.
  - `border-l-3` (`curriculum/page.tsx:190`, `ProgrammeOverviewPrint.tsx:61`): Invalid border width in default Tailwind (`1`, `2`, `4`, `8` only).
  - `no-scrollbar` (`curriculum/page.tsx:126`, `Tabs.tsx:38`): Custom helper never defined in [`globals.css`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/globals.css).
  - `bg-navy-950/98` (`Navbar.tsx:71`): Default Tailwind v3 opacity scale supports `/95` and `/100`, **not** `/98`, so scrolled navbar background opacity falls back to unset/transparent with `backdrop-blur-md`! *(Note: in our static audit JSON count, `text-gold-600` was also tracked alongside invalid classes; excluding valid `text-gold-600`, there are **25 non-generating animation/shadow/border/scrollbar/opacity utility tokens** plus **54 undefined `gold-700..950` tokens** = **79 broken class tokens**.)*

### 4.3 Component Complexity, Client/Server Boundaries & Error Handling
- **Monolithic [`Navbar.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/Navbar.tsx)** (552 lines, 24.77 KB): Combines top utility bar, logo, desktop links, 3 dropdown menus, inline `specialisationsList` data import (~18 KB), `GlobalSearchModal` + `fuse.js` + `searchIndex` (~9 KB), and duplicated mobile drawer links inside one `"use client"` bundle imported by `RootLayout`—forcing search and specialisation datasets into every route's client bundle even when unopened.
- **Unnecessary `"use client"` Directives**: [`HeroGlobe.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/home/HeroGlobe.tsx) renders static SVG with zero state/effects. Making [`curriculum/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/curriculum/page.tsx) a Client Component strips page-level Next.js `metadata` export (title & description fall back to root template `Trinity International University | ...` instead of page-specific SEO metadata!).
- **Missing Error/Loading Boundaries**: Zero `error.tsx`, `global-error.tsx`, or `loading.tsx` files anywhere under `src/app/`.
- **State & Hydration Robustness**: Global scroll listener in [`ScrollProgress.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/ScrollProgress.tsx) and [`BackToTop.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/BackToTop.tsx) are clean, but `Navbar.tsx` mutates 4 boolean states manually on `pathname` change rather than encapsulating dropdowns cleanly.
- **Conflicting In-Code Copy & Hardcoded Metadata**: `certificates-and-awards/page.tsx` line 72 hardcodes `"since registration in 2002"`, ignoring `config.ts`'s unsettled `539/2002` vs `593/2020` parameterization; `disclaimer/page.tsx` line 89 hardcodes `"Last updated: November 2026"`; `academics.ts` says `"Total 10 Program Levels"`, while `StatsStrip.tsx` line 9 hardcodes `const degreeCount = 7` on the homepage (`7 Degree Levels Conferred` directly above `View All 10 Conferred Degrees`).
