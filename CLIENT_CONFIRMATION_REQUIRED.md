# Client Confirmation Required — Institutional Sign-Off Checklist

**Project:** University of Trinity International (`Trinity Church of India Diocese`)  
**Purpose:** Single authoritative sign-off register for remaining unresolved details, contact details, legal wording, and missing assets identified during the repository forensic audit. *(Items verified directly by client instructions on 2026-11-25 are marked `[x]` below and live in production build.)*
**Policy:** Per strict institutional accuracy standards, unverified details are never fabricated or guessed on the public website.

---

## 1. Core Institutional Identity & Statutory Trust Numbers *(Client Confirmed 2026-11-25)*

- [x] **1. Official Institution Name (`src/data/config.ts`) — CONFIRMED**
  - Confirmed live wording: **`University of Trinity International`** (user-provided official wording).

- [x] **2. Governing Diocese & Legal Constitution (`src/data/config.ts`) — CONFIRMED**
  - Confirmed live wording: **`Trinity Church of India Diocese`**, **Legally constituted under the Christian Legal Rites and Traditions**, **Regd. Indian Trusts Act, 1882**.

- [x] **3. Tamil Nadu Trust Registration Number & Year (`src/data/config.ts`) — CONFIRMED**
  - Confirmed live number: **`Regd. No. 539 / 2022 (Tamil Nadu)`**.

- [x] **4. Karnataka Trust Registration Number (`src/data/config.ts`) — CONFIRMED**
  - Confirmed live number: **`Regd. No. 24 / 2012 (Karnataka)`**.

---

## 2. Addresses, Telephone Directory & Emails

- [x] **5. Headquarters Designation (`src/data/config.ts`, `src/data/centres.ts`) — HQ DESIGNATION CONFIRMED / STREET ADDRESS PENDING**
  - Confirmed Headquarters designation: **`YGM – Bangalore`** (`Head Quarters: YGM – Bangalore`).
  - *Remaining Required:* Full street address, PIN code, and Google Maps coordinates for YGM – Bangalore and all 7 Admin Centres (`Trinity`, `Coimbatore`, `Chennai`, `Dandeli`, `New Delhi`, `Malaysia`, `Georgia (USA)`).

- [ ] **6. Official Telephone & Helpline Numbers**
  - *Previously in source (`config.ts` / `centres.ts`):* Placeholder strings `+91 (0) 80-XXXXXXXX`, `+91-XXXXXXXXXX`, `+60-XXXXXXXXX`, `+1-XXXXXXXXXX` *(removed from public pages so visitors do not see placeholder `XXXX` numbers)*.
  - *Required:* Confirm active landlines / official WhatsApp / secretariat numbers for YGM – Bangalore HQ and each regional centre.

- [ ] **7. Official Email Addresses**
  - *Currently configured in `config.ts` / `centres.ts`:* `info@trinityinternationaluniversity.edu.in`, `admissions@trinityinternationaluniversity.edu.in`.
  - *Required:* Confirm active domain/mailbox configuration (including whether domain should stay `trinityinternationaluniversity.edu.in` or migrate to match `University of Trinity International`).

- [x] **8. Regional & Overseas Administrative Centres (`8` Confirmed)**
  - Confirmed list: **`YGM – Bangalore (Head Quarters)`**, **`Trinity`**, **`Coimbatore`**, **`Chennai`**, **`Dandeli`** *(brochure spelling verified; confirm if regional office street address differs)*, **`New Delhi`**, **`Malaysia`**, **`Georgia (USA)`**.

---

## 3. Governing Council Leadership Roster & Portraits

- [x] **9. Leadership Titles & Founder Credentials (`src/data/governance.ts`) — UPDATED PER CLIENT SIGN-OFF**
  - *Founder & Chairman:* **`Dr. S. Sundarabharathi`** — **`M.A., M.A., M.A., M.I.C.A., M.Th., M.Div., M.Min., D.Th., D.D., D.Lit., Ph.D.`**
  - *Titles across Council:* Removed `Rt.` prefix across Founder, General Secretary (`Rev. Dr. Ebenezer T. Manoharan`), Vice Chairman (`Rev. Dr. Thomas M. Vinoth`), and all 7 Executive Directors (`Rev. Dr. ...`).
  - *Affiliated Institutions (`src/data/affiliations.ts`):* Updated to **`University of Christ` (USA)**, **`British University of Bible` (England)**, **`Holy God Ministries` (France)**, **`Revival University` (Ireland)**, and **`Christian Mission International` (Switzerland)**.
  - *Optional Remaining Review:* Confirm whether Executive Directors list should include or supersede Brochure 2 name variants (`Rev. Dr. S. John Isaiah`, `Rev. Dr. D. D. Raja`, etc.).

- [ ] **10. Official High-Resolution Leadership Portraits & Campus Photography**
  - *Current State:* Initials monogram seals (`SB`, `EM`, etc.) and clean typographic cards are displayed in place of photos (`0` unverified/stock people photos fabricated).
  - *Required:* Provide approved portraits of the Council Leaders/faculty + verified photos of campus/chapel/library/convocation events.

---

## 4. Academic Catalogue, Curriculum & Admissions Facts

- [ ] **11. Approved Degree Roster (`7` vs `10` Degrees)**
  - *Fact Check:* Brochure 1 footer badge strip showed 6–7 codes while body text across Brochure 1 & 2 documents **10 degrees**: `B.Th.`, `B.D. / B.Div.`, `B.Min.`, `M.Th.`, `M.Div.`, `M.Min.`, `D.Min.`, `Th.D.`, `D.D.`, `Ph.D. (4 Years)`, plus 5 Ordinance Tracks (`Evangelist`, `Pastor`, `Apostle`, `Reverend`, `Bishop`). Confirm the official currently offered list, exact durations, and credit/semester structures.

- [ ] **12. Curriculum Module Texts & Brochure 2 Clarifications (`src/data/curriculum.ts`)**
  - *Fixed obvious OCR errors:* Corrected `"Buddhism (BUTCBA / Buddha)"` -> `"Buddhism"` and `"Introduction to the Internet"` -> `"Introduction to New Testament"`.
  - *Confirm intended wording:* Brochure 2 included ambiguous phrases `"Study of Sevetein's Institutes Religions and Theological Discourses"` and `"Seminar on Cristology"`. Confirm current website wording in `specialisations.ts`.

- [ ] **13. Admissions Operational Specifics (`TIU-022`)**
  - *Required:* Confirm actual annual intake dates / application deadlines, credit hours per degree, fee/tuition structure, fee concession policy criteria for vernacular pastors, and required recommendation form PDF.

- [ ] **14. Official Printable Prospectus PDF (`TIU-005`)**
  - *Current State:* Site includes `/prospectus` digital programme summary and a clean downloadable overview PDF labeled as institutional programme overview *(pending finalized fees, intake dates, and street addresses)*.
  - *Required:* Upload/approve the final signed prospectus PDF once operational details (#5–#13) are confirmed.

---

## 5. Legal, Editorial, Accreditation & Localization Review

- [ ] **15. Vision, Mission & Institutional History Narrative (`src/app/about`, `src/app/vision-and-mission`)**
  - *Review:* Draft prose previously tagged internally as pending client confirmation; verify theological emphasis and history statement accuracy (e.g., whether Diocese history spans "decades" cleanly relative to `539/2022 TN` and `24/2012 KA` trust registrations). Note also removing unverified `"internationally recognized"` phrasing to preserve strict legal compliance (`config.ts` rule #3).

- [ ] **16. Accreditations, Certificates & Affiliated Partner Documentation**
  - *Current State:* Accreditations & Certificates arrays remain empty (`[]`) displaying `"Documents Available on Request"`. Affiliated institutions (`University of Christ` USA, `British University of Bible` England, `Holy God Ministries` France, `Revival University` Ireland, `Christian Mission International` Switzerland) retain neutral partner disclosure.
  - *Required:* Supply verified scanned charter/MOU documentation if public display is authorized.

- [ ] **17. Privacy Policy & Indian DPDP Act 2023 Legal Sign-Off (`src/app/privacy/page.tsx`)**
  - *Required:* Confirm named **Grievance Officer** email/contact details, exact candidate record retention duration (in years), and formal review by Diocese legal counsel.

- [ ] **18. Tamil Language Translations Review (`src/lib/i18n.ts`)**
  - *Current State:* Underlying `LocaleProvider` / `i18n.ts` Tamil strings are implemented in code, while the public `EN / தமிழ்` header toggle button was removed per explicit client request on 2026-11-25 (`Navbar.tsx`).
  - *Required:* Confirm if bilingual switcher stays hidden permanently or should return after Diocesan Tamil scholar review of formal ecclesiastical terminology (`இறையியல்`, `திருச்சபை ஒழுங்கு`, `திருநிலைப்படுத்தல்`).

---

## 6. Production Deployment & Secret Infrastructure Prerequisites

Before flipping live traffic in production, hosting ops must configure the following environment variables (never commit secrets to Git):

```env
# Required for reliable admissions/contact email delivery (TIU-004):
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxx"
EMAIL_FROM="Trinity Secretariat <admissions@trinityinternationaluniversity.edu.in>"
EMAIL_TO="admissions@trinityinternationaluniversity.edu.in"

# Optional durable backup webhook if email delivery experiences downtime:
ENQUIRY_BACKUP_WEBHOOK_URL="https://..."
ENQUIRY_BACKUP_WEBHOOK_TOKEN="..."

# Recommended for distributed serverless rate limiting (Upstash Redis REST):
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Recommended for Cloudflare Turnstile anti-spam verification:
NEXT_PUBLIC_TURNSTILE_SITE_KEY="..."
TURNSTILE_SECRET_KEY="..."

# Production canonical origin & HTTPS security flag:
NEXT_PUBLIC_SITE_URL="https://trinityinternationaluniversity.edu.in"
ENABLE_HSTS="true"
```
