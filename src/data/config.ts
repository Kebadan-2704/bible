export interface RegistrationInfo {
  state: string;
  number: string;
  year: string;
}

export interface InstitutionConfig {
  institutionName: string;
  tagline: string;
  diocesanAffiliation: string;
  subheading: string;
  registeredUnder: string;
  registrations: {
    tamilNadu: RegistrationInfo;
    karnataka: RegistrationInfo;
  };
  headquarters: {
    city: string;
    state: string;
    country: string;
    address: string;
    mapsSearchUrl: string;
  };
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
    grievanceEmail: string;
    officeHours: string;
    phoneStatusNote: string;
  };
}

export const institutionConfig: InstitutionConfig = {
  institutionName: "University of Trinity International",
  tagline: "A Global University for Faith, Knowledge & Service",
  diocesanAffiliation: "Trinity Church of India Diocese",
  subheading: "Legally constituted under the Christian Legal Rites and Traditions",

  registeredUnder: "The Indian Trusts Act, 1882",

  registrations: {
    tamilNadu: {
      state: "Tamil Nadu",
      number: "539 / 2022",
      year: "2022",
    },
    karnataka: {
      state: "Karnataka",
      number: "24 / 2012",
      year: "2012",
    },
  },

  headquarters: {
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    address: "Head Quarters: YGM – Bangalore, Karnataka, India",
    mapsSearchUrl: "https://maps.google.com/?q=Bengaluru,Karnataka,India",
  },

  legalNote:
    "Legally constituted under the Christian Legal Rites and Traditions, Regd. Indian Trusts Act, 1882 (Regd. No. 539/2022 TN · Regd. No. 24/2012 KA). Degrees are ecclesiastical and theological qualifications conferred by this religious institution.",

  theologicalNotice:
    "University of Trinity International provides theological education, ministerial training, and ordination preparation. Programmes are religious awards designed for pastoral, ministerial, and scholarly service within the Church and Christian community, and are not secular statutory degrees.",

  // Kept empty unless formally verified scanned documentation is approved for public display
  accreditations: [],
  certificatesAndAwards: [],

  contact: {
    generalEmail: "info@trinityinternationaluniversity.edu.in",
    admissionsEmail: "admissions@trinityinternationaluniversity.edu.in",
    grievanceEmail: "info@trinityinternationaluniversity.edu.in",
    officeHours: "Monday to Friday, 9:00 AM – 5:00 PM IST",
    phoneStatusNote:
      "Secretariat direct correspondence is handled via email and our official online enquiry desk.",
  },
};
