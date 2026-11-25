# 08 — Performance & Core Web Vitals Forensic Audit

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Methodology Disclosure:** Live measurements were taken against the Next.js `14.2.35` development server (`http://localhost:3001`) using: (1) online headless Chromium via `layoza` (`audit_performance`, `inspect_site`, `capture_screenshots` across `1440×900`, `768×1024`, `375×812`) with Google Fonts reachable, and (2) offline/sandboxed headless Chromium via Playwright (`1440×900`, `768×1024`, `390×844` across all 22 routes). Lab telemetry is diagnostic and not CrUX field telemetry; production `next build` output sizes were not generated during audit to avoid mutating `.next` while `next dev` runs.

---

## 1. Core Web Vitals & Timing Summary

| Viewport | Tool / Env | LCP (ms) | CLS | INP Proxy / TBT (ms) | Verdict |
|---|---|---:|---:|---:|---|
| Desktop `1440×900` | Layoza Chromium (warm, fonts loaded) | `680 ms` | `0.0000` | `24 ms` | Pass (CLS 0) |
| Desktop `1440×900` | Layoza `inspect_site` (cold route compile) | `5,624 ms` | `0.0000` | `24 ms` | Dev cold compile spike |
| Tablet `768×1024` | Layoza Chromium (fonts loaded) | `664 ms` | **`0.2051`** | `32 ms` | **FAIL (CLS > 0.10)** |
| Mobile `375×812` | Layoza Chromium (fonts loaded) | `364 ms` | `0.0661` | `24 ms` | Borderline CLS |
| Worst reported (`audit_performance`) | Layoza Chromium | `716 ms` | **`0.2051`** | `32 ms` | **FAIL (CLS)** |

### Development Route Response & Payload Telemetry (22 Routes, Sandboxed Playwright)
- **Dev TTFB / FCP:** Warm static-style routes ranged from `61 ms` (`236 ms` FCP on `/academics/new-testament`) to `1,066 ms` (`1,240 ms` FCP on first cold hit of `/academics/systematic-theology`).
- **Asset Payload:** `~7,680 KB` decoded resource weight per standard route (`8,241 KB` on `/`, `8,462 KB` on `/curriculum`, `8,992 KB` on `/admissions` due to dev-mode unminified webpack chunks, React Refresh, and dev sourcemaps). Zero raster image payloads (`0` `<img>` elements loaded on the entire website).

---

## 2. Critical Performance Bottlenecks Found

### PERF-01: Render-Blocking CSS `@import` Google Fonts + `optimizeFonts: false` + CLS `0.2051`
- **Where:** [`next.config.mjs:4`](file:///c:/Users/Keba/Desktop/bible%20college/next.config.mjs#L4) (`optimizeFonts: false`) and [`src/app/globals.css:1`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/globals.css#L1) (`@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap");`).
- **Root Cause & Impact:**
  1. CSS `@import` inside `globals.css` creates a chained critical path: browser must download and parse Next CSS before discovering `fonts.googleapis.com`, then open TLS + fetch the CSS descriptor, then download up to **10 font weight files** (5 weights of `Cinzel` + 5 weights of `Inter`).
  2. When Google Fonts resolves asynchronously over real networks, font swap from fallback `Georgia` (narrower) to `Cinzel` (wider all-caps/uppercase metrics) causes multi-line wrapping shifts—evidenced directly by Layoza's live **`CLS = 0.2051` on `768×1024` tablet** (over 2× the `0.10` Core Web Vitals threshold) and **`0.0661` on `375×812` mobile**.
  3. Notice contrast with offline Chromium (`CLS = 0` when `@import` fails with `ERR_NAME_NOT_RESOLVED`): zero swap occurred only because Google Fonts failed to load entirely!
  4. Furthermore, `font-weight: 300`, `800`, `900` on Cinzel/Inter bloat font payload beyond the weights actually needed.

### PERF-02: Oversized Global Client Bundle (`Navbar.tsx` + Data + Fuse.js)
- **Where:** [`Navbar.tsx:23-24`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/Navbar.tsx#L23-L24) imports [`GlobalSearchModal.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/search/GlobalSearchModal.tsx) (`fuse.js` + 9.1 KB [`searchIndex.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/searchIndex.ts)) AND [`specialisations.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/specialisations.ts) (**18.25 KB**, including every course abstract and Hebrew/Aramaic/Greek array!) solely to slice 4 labels (`spec.shortCode`, `spec.title`) in the desktop Academics mega-menu!
- **Impact:** Every single route — including lightweight pages like `/privacy`, `/disclaimer`, `/accreditations`, and `/404` — ships the full `specialisations.ts`, `searchIndex.ts`, `config.ts`, `zod`, and `fuse.js` runtime unconditionally on initial hydration instead of extracting tiny nav-menu metadata and `next/dynamic`-loading `GlobalSearchModal`.

### PERF-03: Unused 2.92 MB `framer-motion` Dependency & `curriculum/page.tsx` Client Conversion
- **Where:** [`package.json:14`](file:///c:/Users/Keba/Desktop/bible%20college/package.json#L14) (`framer-motion: ^11.11.11` = `2,920,364` bytes in `node_modules`) and [`src/app/curriculum/page.tsx:1`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/curriculum/page.tsx#L1).
- **Impact:** `framer-motion` inflates CI/install times with zero runtime benefit (0 imports). Making the entire `/curriculum` page `"use client"` forces all 7 module objects (`13.0 KB` `curriculum.ts`) + UI markup into client JS instead of keeping page shell SSR and hydrating only the interactive tab panel.

### PERF-04: Continuous Non-Gated SVG Ping/Pulse Animations & Layout-Triggering Scroll Bar
- **Where:** [`HeroGlobe.tsx:31`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/home/HeroGlobe.tsx#L31) (`animate-ping`), [`centres/page.tsx:73`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/centres/page.tsx#L73) (`animate-pulse`), and [`ScrollProgress.tsx:24`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/ScrollProgress.tsx#L24) (`width: ${progress}%`).
- **Impact:** Continuous animation loops run indefinitely on main/compositor layers even below-fold or hidden behind menus, and mutating `width` triggers style/paint work on every scroll event.

### PERF-05: Missing Raster Photography Masking Image Optimization Architecture
- While `0` images currently keeps byte weight low, the codebase has no `next/image` implementation, no `sizes` strategy, no `blurDataURL` placeholders, and leaves two unoptimized `~350 KB` WhatsApp JPEGs sitting in the project root.

---

## 3. Recommended Performance Optimization Roadmap
1. Remove `optimizeFonts: false` from `next.config.mjs` and delete `@import url(...)` from `globals.css`; migrate to `next/font/google` (`Cinzel` weights `600, 700, 800`, `Inter` weights `400, 500, 600, 700` with `display: "swap"` and built-in size-adjusted metric fallbacks) -> eliminates Google Fonts render-blocking waterfall and resolves the `0.2051` tablet CLS.
2. Lazy-load `GlobalSearchModal` via `next/dynamic(..., { ssr: false })` triggered only when Search is clicked or `Ctrl+K` fires; pass a compact 5-item nav DTO to `Navbar` rather than bundling all 18 KB of `specialisations.ts`.
3. Remove `framer-motion` from `package.json`, remove `"use client"` from `HeroGlobe.tsx` and `/curriculum` page shell, and switch `ScrollProgress.tsx` to `transform: scaleX(...)`.
