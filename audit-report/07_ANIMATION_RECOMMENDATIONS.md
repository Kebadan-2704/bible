# 07 — Animation, Micro-Interaction & Motion Design Audit

**Audit Target:** Trinity International University (`trinity-international-university`)  
**Motion Declaration (`layout.tsx:72`):** `<meta name="layoza-motion" content="calm" />`  
**Audit Date:** 2026-11-25  

---

## 1. Current State Forensic Evaluation

| Criterion | Finding | File & Line Evidence |
|---|---|---|
| **Installed Animation Library** | `framer-motion` `^11.11.11` (2.92 MB in `node_modules`) is **completely unused** (0 imports in `src/`). | [`package.json:14`](file:///c:/Users/Keba/Desktop/bible%20college/package.json#L14) |
| **Broken CSS Entrance Utilities** | `animate-in`, `fade-in`, `zoom-in` classes are applied across Hero crest (`page.tsx:40`), desktop dropdowns (`Navbar.tsx:163,225,330`), Search modal (`GlobalSearchModal.tsx:77`), and Enquiry success box (`EnquiryForm.tsx:84`), **none of which animate** because `tailwindcss-animate` is not installed or registered in `tailwind.config.ts`. | [`tailwind.config.ts:58`](file:///c:/Users/Keba/Desktop/bible%20college/tailwind.config.ts#L58), [`page.tsx:40`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/page.tsx#L40) |
| **Infinite Keyframes Ignoring Motion Preferences** | Two SVG nodes use Tailwind infinite keyframes (`animate-ping` in `HeroGlobe.tsx:31`, `animate-pulse` in `centres/page.tsx:73`) with **zero `@media (prefers-reduced-motion: reduce)` rule** anywhere in [`globals.css`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/globals.css). Live inspection confirms `reduced_motion_respected: false` (`endless_loops: 1` on every viewport). | [`HeroGlobe.tsx:31`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/home/HeroGlobe.tsx#L31), [`centres/page.tsx:73`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/centres/page.tsx#L73) |
| **Scroll Behaviour vs Accessibility** | `html { scroll-behavior: smooth; }` (`globals.css:14`) applies unconditionally even when users enable OS Reduced Motion. | [`globals.css:14`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/globals.css#L14) |
| **Transition Discipline** | Positively, cards (`Card.tsx:20`), buttons (`Button.tsx:25`), and accordion chevrons (`Accordion.tsx:66`) avoid `transition-all` and target explicit properties (`border-color`, `box-shadow`, `transform`). However, `Card.tsx:22` applies `hover:-translate-y-1` even on coarse touch devices (`(hover: hover)` missing), and mobile drawer / accordions snap instantaneously (`{isOpen && ...}` unmounted without height/opacity transition). | [`Card.tsx:20-22`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/Card.tsx#L20-L22), [`Accordion.tsx:71-75`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/Accordion.tsx#L71-L75) |
| **Layout Stability & Motion** | `ScrollProgress` transitions `width` (`ScrollProgress.tsx:24`) every scroll tick instead of compositor-only `transform: scaleX(...)` (`transform-origin: left`), causing layout/paint overhead while scrolling. | [`ScrollProgress.tsx:23-26`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/ScrollProgress.tsx#L23-L26) |

**Category Score Justification (1 / 5):** Intended calm academic choreography (`animate-in`, `framer-motion`) is functionally dead code, continuous `animate-ping`/`animate-pulse` pings violate `prefers-reduced-motion`, and `ScrollProgress` animates layout geometry (`width`).

---

## 2. Strategic Motion Direction for a Theological University

Because this is an ecclesiastical university ("calm" declared mood, serif academic dignity paired with Inter body copy), motion must feel **reverent, measured, and crisp** — never flashy, bouncy, or SaaS-gimmicky. Every motion pattern below obeys these non-negotiable engineering rules:
1. Content renders visible (`opacity: 1; transform: none`) without JS; animations enhance cleanly.
2. Strictly wrapped inside `@media (prefers-reduced-motion: no-preference)` or `matchMedia("(prefers-reduced-motion: reduce)")` guards.
3. GPU compositor properties only (`transform`, `opacity`, `clip-path`). Never `width`, `height`, `top`, `left`.

---

## 3. Section-by-Section & Component Animation Specifications

*(Saved companion technical specifications in `/audit-report/animation-specifications/motion-tokens.css`.)*

### Recommendation 1: Global Reduced-Motion Kill Switch + Baseline Academic Polish (`globals.css`)
- **Where:** Root [`src/app/globals.css`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/globals.css).
- **What to do:** Gate `scroll-behavior: smooth` inside `@media (prefers-reduced-motion: no-preference)` and add a global reduced-motion rule neutralizing all CSS animations/transitions (`animate-ping`, `animate-pulse`, hover lifts) when `prefers-reduced-motion: reduce` is enabled. Replace unused `animate-in fade-in` utilities with lightweight native `@keyframes panelFadeIn` (`opacity` + `translateY(-4px)` over `160ms`).

### Recommendation 2: Compositor-Only `ScrollProgress` Bar (`ScrollProgress.tsx`)
- **Where:** [`src/components/layout/ScrollProgress.tsx:23-25`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/ScrollProgress.tsx#L23-L25).
- **What to do:** Replace `style={{ width: `${progress}%` }}` with `style={{ transform: \`scaleX(${progress / 100})\` }}` + `origin-left will-change-transform` inside an `overflow-hidden` full-width wrapper, plus `requestAnimationFrame` throttling on scroll. Eliminates main-thread style recalculation / paint invalidation on every scroll frame.

### Recommendation 3: Reverent Staggered Hero Entrance (`page.tsx` + `HeroGlobe.tsx`)
- **Where:** Homepage hero (`Crest`, `h1`, affiliation eyebrow, tagline, CTAs) and [`HeroGlobe.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/home/HeroGlobe.tsx).
- **Recommended Recipe (`hero-gsap-masked-split` or CSS `@keyframes tiuRise`):**
  - Instead of importing heavy `framer-motion`, use pure CSS `@media (prefers-reduced-motion: no-preference)` entrance (`tiuRise`: `opacity: 0 -> 1`, `translateY(12px -> 0)`, `560ms cubic-bezier(0.22, 1, 0.36, 1)`) staggered by `70ms` across Crest -> H1 -> Subheading -> CTAs.
  - On `HeroGlobe.tsx`, add subtle slow dashed orbit drift (`stroke-dashoffset` or slow rotate <= `45s linear infinite` strictly under `no-preference`) OR keep static + gentle pulse on the 4 city beacons only for `no-preference`.

### Recommendation 4: Below-Fold Section & Metric Reveal (`StatsStrip`, Degree Grid, Centres)
- **Where:** [`StatsStrip.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/home/StatsStrip.tsx), [`academics/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/academics/page.tsx), [`doctoral/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/doctoral/page.tsx).
- **Recommended Recipe (Zero-Dependency `IntersectionObserver` + Native WAAPI or CSS `animation-timeline: view()`):**
  - Short `480ms` translateY (`16px -> 0`) fade-up on section entry with tight stagger (`45ms` per card, capped at `180ms` total so fast scrollers never wait on invisible cards).
  - *Crucial:* Do **not** hide elements with initial `opacity: 0` before hydration; drive entrance strictly when `no-preference` + observer triggers, or progressively via `@supports (animation-timeline: view())`.

### Recommendation 5: Interactive Controls — Mega-Menu, Mobile Drawer, Accordion & Curriculum Tabs
- **Where:** [`Navbar.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/layout/Navbar.tsx), [`Accordion.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/components/ui/Accordion.tsx), [`curriculum/page.tsx`](file:///c:/Users/Keba/Desktop/bible%20college/src/app/curriculum/page.tsx).
- **What to do:**
  - **Dropdowns & Modals (`GlobalSearchModal.tsx`):** Animate panel mount with `160ms` `cubic-bezier(0.22, 1, 0.36, 1)` scale (`0.98 -> 1`) + `opacity` using real keyframes (deleting dead `animate-in` classes).
  - **Accordion (`Accordion.tsx`):** Use CSS Grid `grid-template-rows: 0fr -> 1fr` transition (`220ms`) instead of conditional `{isOpen && ...}` unmounting so FAQs smoothly expand without jarring page jumps.
  - **Cards (`Card.tsx`):** Restrict `-translate-y-1` lift to `@media (hover: hover)` (`hover-hover:` utility) so mobile taps don't get stuck in a lifted hover state.
  - **Nav & Link Underline Draw (`micro-css-polish`):** Subtle left-to-right `1px` gold underline reveal on hover/focus-visible (`background-size: 0% 1px -> 100% 1px`, `220ms ease`) for scholarly polish.
  - **Cleanup Recommendation:** Uninstall `framer-motion` (saving 2.92 MB in `node_modules` and removing dead ecosystem weight) because every motion pattern above executes faster at **0 KB JS bundle cost** via CSS + native WAAPI.
