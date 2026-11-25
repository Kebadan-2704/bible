# 10 — Technical SEO & Structured Data Audit

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Live Endpoints Inspected:** All 22 HTML routes, `/robots.txt`, `/sitemap.xml`, `layout.tsx` metadata & JSON-LD  

---

## 1. Crawlability, Indexation & Sitemap Telemetry

| Check | Result | File / Live Proof | Assessment |
|---|---|---|---|
| **HTTP Response Codes** | All 22 production routes return `200 OK`; unknown URLs & invalid `/academics/[slug]` cleanly return HTTP **`404`** with custom UI. | Playwright live audit | Pass |
| **`/robots.txt`** | Returns `200 OK`: `Allow: /`, `Disallow: /api/`, `Sitemap: https://trinityinternationaluniversity.edu.in/sitemap.xml` | [`src/app/robots.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/robots.ts) | Pass |
| **`/sitemap.xml`** | Returns `200 OK` with **22 URLs** (16 static + 6 `/academics/[slug]` routes). **Issue:** `lastModified: new Date()` ([`sitemap.ts:26,33`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/sitemap.ts#L26-L33)) stamps the current request timestamp dynamically on every crawl, causing search engines to ignore `<lastmod>` freshness signals. | [`src/app/sitemap.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/sitemap.ts) | Needs Fix |
| **Canonical Tags** | No explicit `alternates: { canonical: ... }` defined per page (relies only on `metadataBase`, emitting no `<link rel="canonical">` tag by default in App Router unless configured per route). Query variants like `/contact?centre=chennai` risk duplicate-URL indexing without canonicals. | [`layout.tsx:28`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/layout.tsx#L28) | Needs Fix |

---

## 2. On-Page Metadata, Titles & Headings Analysis

### Verified Defects
1. **`/curriculum` Missing Unique Metadata (Client Component Limitation):** Because [`src/app/curriculum/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/curriculum/page.tsx#L1) starts with `"use client"`, Next.js cannot export `metadata`. As a result, `/curriculum` inherits the root default title (`Trinity International University | A Global University for Faith, Knowledge & Service`, **85 chars**) and homepage meta description (**212 chars**, heavily truncated in SERPs!) instead of a dedicated curriculum title/description!
2. **Oversized Page `<title>` Lengths (20–50+ chars over SERP `60 ch` Limit):**
   Root `template: "%s | Trinity International University"` (`+32 chars` suffix) paired with long page titles pushes rendered `<title>` length to **75–111 characters** across every subpage:
   - `/`: **85 chars** (`Trinity International University | A Global University for Faith, Knowledge & Service`)
   - `/about`: **75 chars**
   - `/doctoral`: **97 chars** (`Doctoral Programmes & Honorary Degrees | Ph.D. & Honoris Causa | Trinity International University`)
   - `/academics/theological-institutes` & `/academics/ancient-languages`: **111 chars** (SERPs truncate the institution name or core topic past ~60 chars).
3. **Homepage Meta Description Truncation Risk:** [`layout.tsx:14-15`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/layout.tsx#L14-L15) is **212 characters** (exceeding Google's ~155–160 char snippet cutoff).
4. **Placeholder & Internal Draft Strings Exposed to Search Crawlers:**
   - Crawlers indexing `/about` and `/vision-and-mission` index `"Draft copy — pending client confirmation"`.
   - Crawlers indexing `/centres`, `/contact`, and `/academics` index `"Daddy Guppy Bangalore INDIA"`, `"Pending Confirmation"`, `"+91 (0) 80-XXXXXXXX"`, `"Brochure 2 Variant"`, and `"Buddhism (BUTCBA / Buddha)"` (`/curriculum`). This harms E-E-A-T trust signals dramatically.

### Positive Structural Foundations
- Every single one of the 22 HTML pages contains **exactly one semantic `<h1>`** (`h1Count: 1` verified live) matching page intent.

---

## 3. Open Graph, Social Sharing, Favicons & Structured Data

| Item | Status | Forensic Evidence & Issue |
|---|---|---|
| **Favicon & App Icons** | **MISSING (`0` files)** | `public/` only holds `logo.svg`. Zero `favicon.ico`, `icon.svg`, or `apple-icon.png` in `src/app/` or `public/`. Tabs and bookmarks display default blank browser globe icon. |
| **Open Graph & Twitter Cards Images** | **MISSING** | [`layout.tsx:29-42`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/layout.tsx#L29-L42) declares `twitter: { card: "summary_large_image" }` and `openGraph`, **but supplies no `images` array (`og:image` / `twitter:image`)** and no `src/app/opengraph-image.tsx`. Links shared on WhatsApp, X, or Facebook render text-only cards without an image preview. |
| **JSON-LD Schema (`EducationalOrganization`)** | **Partial / Unclean** | [`layout.tsx:50-67`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/layout.tsx#L50-L67) includes `EducationalOrganization`, `addressLocality`, `parentOrganization`, and `logo`. **Missing:** `email`, `telephone`, `foundingDate`, `sameAs`, and **`@type: FAQPage` / `Course` / `BreadcrumbList`** schemas on `/admissions`, `/academics/[slug]`, and `/curriculum`. Additionally, `logo` points to `/logo.svg` (`"TRINITY INTERNATIONAL"`) which visually mismatches `<Crest />` in the UI and isn't an `ImageObject` with dimensions. |
| **Non-Standard / Vendor Meta Leaks** | **Informational** | [`layout.tsx:72-73`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/layout.tsx#L72-L73) ships internal tooling tags (`<meta name="layoza-motion" content="calm" />` and `<meta name="layoza-brand-allow" ... />`) in production `<head>`. |
| **Multilingual SEO (`hreflang`)** | **Missing** | Top nav offers `EN / தமிழ்`, yet no localized routes (`/ta/...`) or `<link rel="alternate" hreflang="ta" ...>` exist. |
