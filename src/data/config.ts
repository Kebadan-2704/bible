/**
 * SINGLE SOURCE OF TRUTH CONFIGURATION
 * 
 * CRITICAL LEGAL & INSTITUTIONAL RULES:
 * 1. The two brochures contain multiple discrepancies. Every disputed value is parameterized
 *    below with an editable field and an explicit "// TODO: CONFIRM WITH CLIENT" comment.
 * 2. Default is set to Brochure 1 for all conflicts. Never silently merge conflicting values.
 * 3. Do NOT claim "UGC recognized", "government approved", "accredited by [anyone]", or
 *    "internationally recognized" anywhere unless verified.
 * 4. Degrees are strictly ecclesiastical and theological qualifications conferred under
 *    the institution's trust and clerical rites.
 */

export interface RegistrationInfo {
  state: string;
  number: string;
  year?: string;
  altNumber?: string;
  notes?: string;
}

export interface CentreLocation {
  id: string;
  name: string;
  region: "India" | "International";
  isHeadquarters?: boolean;
  isBrochure2Only?: boolean;
  address?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface InstitutionConfig {
  institutionName: string;
  institutionNameAlt: string;
  tagline: string;
  diocesanAffiliation: string;
  subheading: string;
  registeredUnder: string;
  registeredUnderAlt: string;
  registrations: {
    tamilNadu: RegistrationInfo;
    karnataka: RegistrationInfo;
  };
  headquarters: {
    city: string;
    country: string;
    address: string;
    garbledAddressFromBrochure2: string;
  };
  overseasCentres: Array<{
    name: string;
    country: string;
    altLocation?: string;
  }>;
  legalNote: string;
  theologicalNotice: string;
  accreditations: Array<{
    id: string;
    title: string;
    issuer: string;
    year: string;
    verified: boolean;
    documentUrl?: string;
  }>;
  certificatesAndAwards: Array<{
    id: string;
    title: string;
    issuer: string;
    year: string;
    verified: boolean;
    documentUrl?: string;
  }>;
  contact: {
    generalEmail: string;
    admissionsEmail: string;
    phone: string;
    officeHours: string;
  };
}

export const institutionConfig: InstitutionConfig = {
  // TODO: CONFIRM WITH CLIENT - Brochure 1 uses "Trinity International University".
  // Brochure 2 uses "University of Trinity International" (as in logo crest and headers).
  institutionName: "Trinity International University",
  institutionNameAlt: "University of Trinity International",

  tagline: "A Global University for Faith, Knowledge & Service",
  diocesanAffiliation: "Indian Trinity Church Diocese",
  subheading: "An Institution Legally Established under the Christian Clerical Rites and Traditions",

  // TODO: CONFIRM WITH CLIENT - Brochure 1 specifies "The Indian Trusts Act, 1882".
  // Brochure 2 states "Established under Global Trust Act, 1962" (likely a typo or legally inaccurate citation).
  registeredUnder: "The Indian Trusts Act, 1882",
  registeredUnderAlt: "Global Trust Act, 1962 (from Brochure 2 - unverified)",

  registrations: {
    // TODO: CONFIRM WITH CLIENT - Tamil Nadu registration number:
    // Brochure 1 lists "Reg. No.: 539 / 2002 (Tamil Nadu)".
    // Brochure 2 lists "Reg. No.: 593 / 2020 (Tamil Nadu)".
    tamilNadu: {
      state: "Tamil Nadu",
      number: "539 / 2002",
      altNumber: "593 / 2020",
      notes: "Brochure 1 default: 539/2002; Brochure 2 variant: 593/2020",
    },
    // TODO: CONFIRM WITH CLIENT - Karnataka registration number:
    // Brochure 1 lists "Reg. No.: 24 / 2012 (Karnataka)".
    // Brochure 2 lists "Reg. No.: 324 / 2012 (Karnataka)".
    karnataka: {
      state: "Karnataka",
      number: "24 / 2012",
      altNumber: "324 / 2012",
      notes: "Brochure 1 default: 24/2012; Brochure 2 variant: 324/2012",
    },
  },

  headquarters: {
    city: "Bangalore",
    country: "India",
    // TODO: CONFIRM WITH CLIENT - Brochure 2 prints garbled text: "Daddy Guppy Bangalore INDIA."
    // We maintain a placeholder address until officially confirmed by the Diocese.
    address: "Bangalore Central Administrative Office, Bangalore, Karnataka, India",
    garbledAddressFromBrochure2: "Daddy Guppy Bangalore INDIA.",
  },

  // TODO: CONFIRM WITH CLIENT - Brochure 1 lists "Georgia (USA)".
  // Brochure 2 lists "Florida (US)". Defaulting to Brochure 1.
  overseasCentres: [
    { name: "Malaysia", country: "Malaysia" },
    {
      name: "Georgia (USA)",
      country: "United States",
      altLocation: "Florida (US) (listed in Brochure 2)",
    },
  ],

  legalNote:
    "Registered under The Indian Trusts Act, 1882. Degrees are ecclesiastical and theological qualifications conferred by this religious institution under traditional Christian clerical rights.",
  
  theologicalNotice:
    "Trinity International University provides theological education, ministerial training, and ordination preparation. Programmes are religious awards designed for pastoral, ministerial, and scholarly service within the Church and Christian community, and are not secular statutory degrees.",

  // ACCREDITATIONS: Must be EMPTY array by default per legal credibility rules.
  // Documents available on request state rendered when empty.
  accreditations: [],

  // CERTIFICATES & AWARDS: Must be EMPTY array by default per legal credibility rules.
  certificatesAndAwards: [],

  contact: {
    generalEmail: "info@trinityinternationaluniversity.edu.in", // TODO: CONFIRM WITH CLIENT
    admissionsEmail: "admissions@trinityinternationaluniversity.edu.in", // TODO: CONFIRM WITH CLIENT
    phone: "+91 (0) 80-XXXXXXXX", // TODO: CONFIRM WITH CLIENT
    officeHours: "Monday to Friday, 9:00 AM – 5:00 PM IST",
  },
};
