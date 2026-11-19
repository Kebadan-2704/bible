# Trinity International University (Indian Trinity Church Diocese)
## Official Production Web Portal

A production-quality, responsive, accessible, and SEO-optimized multi-page web application for **Trinity International University**, built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Fuse.js**, derived from official institutional documentation.

---

## 🌟 Architecture & Tech Stack

- **Framework**: Next.js 14+ (App Router, Server Components & Client Components where interactive)
- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Tailwind CSS with custom institutional design system:
  - Deep Navy: `#0B1F4B` (Primary brand color)
  - Royal Gold: `#D4A017` / `#F2C94C` (Accent highlights & insignia)
  - Ivory: `#FAF7F0` (Warm liturgical background)
  - Curricular Accents: Forest Green (`#1E6B3A`), Burnt Orange (`#C0561B`), Royal Purple (`#5B2C83`), Brown (`#7A4A1E`), Crimson (`#B3202A`), Teal (`#0D5C75`)
- **Typography**: Cinzel / Playfair Display (Headings), Inter / System (Body)
- **Insignia**: Custom vector SVG Crest component with Crown, Cross, Open Bible, Laurel Wreaths, and Banner
- **Search**: Client-side instant search powered by **Fuse.js** indexing pages, degrees, modules, specialisations, and centres
- **Forms & Validation**: `react-hook-form` + `zod` validation with API route handling and optional Resend/SMTP email delivery
- **Internationalization (i18n)**: English and Tamil (`/lib/i18n.ts`) scaffold ready for localization

---

## 📁 Project Structure

```
c:\Users\Keba\Desktop\bible college\
├── public/
│   └── logo.svg                            # Vector crest swappable asset
├── src/
│   ├── app/
│   │   ├── layout.tsx                      # Root layout, fonts, JSON-LD EducationalOrganization
│   │   ├── globals.css                     # Tailored design system, print stylesheets, scrollbars
│   │   ├── page.tsx                        # 1. Home (Hero, Stats, Degrees, Curriculum, Leadership, Centres, CTA)
│   │   ├── about/page.tsx                  # 2. About (Trust registration, Heritage, History)
│   │   ├── governance/page.tsx             # 3. Governance (Founder & Chairman, Officers, Executive Directors)
│   │   ├── centres/page.tsx                # 4. Centres (Bangalore HQ, India regional centres, Malaysia, Georgia USA)
│   │   ├── academics/
│   │   │   ├── page.tsx                    # 5. Academics Hub (Schools, 10 degrees, 13 core subjects, abbreviations)
│   │   │   └── [slug]/page.tsx             # 7. Dynamic Specialisations (S.T., N.T., Ethics, Languages, etc.)
│   │   ├── curriculum/page.tsx             # 6. Biblical Ministry Studies (Modules 1-7 interactive tabs)
│   │   ├── research/page.tsx               # 8. Research Methodologies & Dissertation Project (D.P.)
│   │   ├── doctoral/page.tsx               # 9. Ph.D. Specialisations (4 Yrs) & Honorary Doctorate (Honoris Causa)
│   │   ├── affiliations/page.tsx           # 10. Partner & Affiliated Institutions (USA, UK, France, Ireland, Switzerland)
│   │   ├── admissions/page.tsx             # 11. Admissions (4 Steps, Eligibility, FAQ accordion, Prospectus link)
│   │   ├── accreditations/page.tsx         # 12. Accreditations (Empty-by-default legal verification state)
│   │   ├── certificates-and-awards/page.tsx# 12. Certificates & Awards (Empty-by-default legal verification state)
│   │   ├── vision-and-mission/page.tsx     # 12. Vision & Mission (Four pillars of mission)
│   │   ├── contact/page.tsx                # 13. Contact (Enquiry form, secretariat contacts, map placeholder)
│   │   ├── disclaimer/page.tsx             # 14. Theological Qualifications Legal Disclaimer
│   │   ├── privacy/page.tsx                # 14. Privacy Policy & candidate data confidentiality
│   │   ├── not-found.tsx                   # 404 Custom Error Page
│   │   ├── robots.ts                       # SEO robots.txt configuration
│   │   ├── sitemap.ts                      # Dynamic sitemap.xml generator
│   │   └── api/
│   │       └── contact/route.ts            # POST API endpoint with zod validation & logging
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                  # Sticky navbar with mega-menu, search trigger, mobile drawer
│   │   │   ├── Footer.tsx                  # Rich footer with legal notices, quick links, trust registrations
│   │   │   ├── ScrollProgress.tsx          # Golden reading progress bar
│   │   │   └── BackToTop.tsx               # Smooth back-to-top floating button
│   │   ├── ui/
│   │   │   ├── Crest.tsx                   # Custom SVG Institutional Crest component
│   │   │   ├── SectionHeader.tsx           # Section headings with gold underline ornaments
│   │   │   ├── Card.tsx                    # Reusable card with subtle hover elevation
│   │   │   ├── Button.tsx                  # Button variants (gold, primary, secondary, outline)
│   │   │   ├── Accordion.tsx               # Accessible collapsible panels
│   │   │   ├── Tabs.tsx                    # Accessible animated tab panels
│   │   │   └── Badge.tsx                   # Category badges
│   │   ├── search/
│   │   │   └── GlobalSearchModal.tsx       # Instant Fuse.js modal search
│   │   ├── forms/
│   │   │   └── EnquiryForm.tsx             # Candidate admission enquiry form
│   │   └── home/
│   │       ├── HeroGlobe.tsx               # Animated vector network background
│   │       ├── StatsStrip.tsx              # Computed brochure facts strip
│   │       ├── AffiliationsStrip.tsx       # International flag cards
│   │       └── ProgrammeOverviewPrint.tsx  # Printable/PDF prospectus overview
│   ├── data/                               # SINGLE SOURCE OF TRUTH (All content editable by client)
│   │   ├── config.ts                       # Discrepancies, legal declarations, contact info, trust numbers
│   │   ├── governance.ts                   # Council leaders, credentials, roles, and brochure variants
│   │   ├── centres.ts                      # 8 administrative and overseas centres
│   │   ├── academics.ts                    # Schools, 10 degrees, 13 core subjects, ordinance courses
│   │   ├── curriculum.ts                   # 7 Modules with individual colors, icons, and topics
│   │   ├── specialisations.ts              # Data for all /academics/[slug] routes
│   │   ├── research.ts                     # Research methodologies and Dissertation Project stages
│   │   ├── doctoral.ts                     # Ph.D. specialisations and Honoris Causa rules
│   │   ├── affiliations.ts                 # International partner institutions
│   │   ├── admissions.ts                   # 4 steps, eligibility placeholders, FAQs
│   │   └── searchIndex.ts                  # Pre-compiled search index for Fuse.js
│   └── lib/
│       ├── utils.ts                        # Styling utilities (cn helper)
│       └── i18n.ts                         # English and Tamil language dictionaries
```

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js (v18.17.0+ or v20+)
- pnpm / npm / yarn

### Installation
```bash
# Clone or navigate to the repository folder:
cd "c:\Users\Keba\Desktop\bible college"

# Install packages:
pnpm install
```

### Running Locally (Development Mode)
```bash
pnpm dev
# Open http://localhost:3000 in your browser
```

### Production Build & Deployment
```bash
# Build the application:
pnpm build

# Start the production server:
pnpm start -p 3000
```

---

## ⚙️ Environment Variables (`.env.local`)

Create a `.env.local` file in the root directory to customize form submissions:

```env
# Optional: Resend API Key for automated admissions email notifications
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Optional: Email dispatch addresses
EMAIL_FROM="Trinity Admissions <admissions@trinityinternationaluniversity.edu.in>"
EMAIL_TO="admissions@trinityinternationaluniversity.edu.in"

# Base URL for metadata and OpenGraph
NEXT_PUBLIC_SITE_URL="https://trinityinternationaluniversity.edu.in"
```

*Note: In the absence of `RESEND_API_KEY`, the application safely logs all candidate submissions to the console and returns an immediate success response to the applicant.*

---

## 📝 How the Client Can Edit Content Easily

All textual, curricular, and institutional content is cleanly segregated inside the `/src/data/` directory. Non-technical staff can update information without modifying any React or styling code:

1. **Change Institution Details & Legal Texts**:
   - Edit [`src/data/config.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/config.ts).
   - Update trust registration numbers, headquarters addresses, contact emails, or telephone lines.
2. **Update Governing Leadership**:
   - Edit [`src/data/governance.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/governance.ts).
   - Add new Executive Directors, update pastoral initials, or modify credentials.
3. **Update Administrative Centres**:
   - Edit [`src/data/centres.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/centres.ts).
   - Add exact street addresses, local phone numbers, or new missionary liaison offices.
4. **Update Degrees, Ordinance Tracks & Subjects**:
   - Edit [`src/data/academics.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/academics.ts).
5. **Update Curriculum Topics**:
   - Edit [`src/data/curriculum.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/curriculum.ts).
6. **Update Specialisations**:
   - Edit [`src/data/specialisations.ts`](file:///c:/Users/Keba/Desktop/bible%20college/src/data/specialisations.ts).

---

## ⚖️ Legal & Credibility Architecture

In accordance with strict ethical and legal compliance standards:
- **No Unsubstantiated Claims**: Phrases such as "UGC recognized", "government approved", or "accredited by [anyone]" are strictly excluded from the codebase unless explicitly configured and verified.
- **Ecclesiastical Qualifications Notice**: Visible on every page and in the footer:
  > *"Registered under The Indian Trusts Act, 1882. Degrees are ecclesiastical and theological qualifications conferred by this religious institution under traditional Christian clerical rights."*
- **Accreditations & Certificates Pages**: Empty by default, displaying a dignified "Documents available on request" state.
- **Honorary Doctorate (Honoris Causa)**: Formally designated as an honour and pastoral recognition conferred by the Governing Council, rather than an academic degree.
- **Legal Disclaimer**: Comprehensive `/disclaimer` page detailing trust status, religious jurisdiction, and church accreditation advice.

---

## 📋 "THINGS TO CONFIRM WITH CLIENT" Checklist

The two source brochures contain multiple discrepancies. Every dispute has been parameterized in `src/data/config.ts` with Brochure 1 set as the default. Please confirm the following with the Diocese leadership:

- [ ] **1. Primary Institution Name**:
  - *Brochure 1 default*: `Trinity International University`
  - *Brochure 2 variant*: `University of Trinity International` (printed on crest and headings).
- [ ] **2. Statutory Governing Act**:
  - *Brochure 1 default*: `The Indian Trusts Act, 1882`
  - *Brochure 2 variant*: `Global Trust Act, 1962` (unverified statute; Brochure 1 is recommended).
- [ ] **3. Tamil Nadu Trust Registration Number**:
  - *Brochure 1 default*: `Reg. No.: 539 / 2002 (Tamil Nadu)`
  - *Brochure 2 variant*: `Reg. No.: 593 / 2020 (Tamil Nadu)` (Confirm which year/number is active).
- [ ] **4. Karnataka Trust Registration Number**:
  - *Brochure 1 default*: `Reg. No.: 24 / 2012 (Karnataka)`
  - *Brochure 2 variant*: `Reg. No.: 324 / 2012 (Karnataka)`.
- [ ] **5. Bangalore Headquarters Address**:
  - *Brochure 2* printed garbled text: `"Daddy Guppy Bangalore INDIA."`
  - *Current state*: Placeholder provided in `src/data/centres.ts` (`Central Administrative Secretariat, Bangalore, Karnataka, India`). Confirm exact postal address, pin code, and telephone.
- [ ] **6. Overseas Administrative Centre in North America**:
  - *Brochure 1 default*: `Georgia (USA)`
  - *Brochure 2 variant*: `Florida (US)`.
- [ ] **7. Hyderabad Centre**:
  - Listed exclusively in Brochure 2; absent in Brochure 1. Confirm whether Hyderabad is an active centre.
- [ ] **8. Leadership Names & Credentials**:
  - *General Secretary*: Confirm spelling `Rt. Rev. Dr. Ebenezer T. Manoharan` vs. Brochure 2 `Ebenezer. D. Manohar`.
  - *Executive Directors*: Confirm whether `Rev. Dr. S. John Isaiah` replaces or joins `Rt. Rev. Dr. I. Singam`. Confirm Spanish affiliations for Dr. Billy Graham and Dr. Prakash Rao.
- [ ] **9. Verified Accreditation & Award Documents**:
  - Upload digital scans of official trust deeds, diocesan charters, or bilateral seminary accords into `src/data/config.ts` (`accreditations` & `certificatesAndAwards` arrays) if public display is desired.
- [ ] **10. Official Leadership Photographs**:
  - Replace the current initials avatars (`SB`, `EM`, `TV`, etc.) in `src/app/governance/page.tsx` with high-resolution portraits of the council bishops.
