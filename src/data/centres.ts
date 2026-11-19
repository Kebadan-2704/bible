export interface AdministrativeCentre {
  id: string;
  name: string;
  country: string;
  region: "Southern India" | "Northern India" | "International";
  isHeadquarters?: boolean;
  isBrochure2Only?: boolean;
  altLocationNotice?: string;
  addressPlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}

export const administrativeCentres: AdministrativeCentre[] = [
  {
    id: "bangalore-hq",
    name: "Bangalore (Headquarters)",
    country: "India",
    region: "Southern India",
    isHeadquarters: true,
    // TODO: CONFIRM WITH CLIENT - Brochure 2 prints garbled text: "Daddy Guppy Bangalore INDIA."
    // Address left as clean placeholder until confirmed.
    addressPlaceholder: "Central Administrative Secretariat, Bangalore, Karnataka, India",
    phonePlaceholder: "+91 (0) 80-XXXXXXXX",
    emailPlaceholder: "hq@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    description: "Principal episcopal and administrative seat for diocesan academic affairs, admissions, and institutional registries.",
  },
  {
    id: "trinity",
    name: "Trinity Centre",
    country: "India",
    region: "Southern India",
    addressPlaceholder: "Trinity Diocesan Centre, India",
    phonePlaceholder: "+91-XXXXXXXXXX",
    emailPlaceholder: "trinity@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 11.0168, lng: 76.9558 },
    description: "Primary collegiate campus and seminary ministry coordination centre.",
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    country: "India",
    region: "Southern India",
    addressPlaceholder: "Coimbatore Regional Administrative Centre, Tamil Nadu, India",
    phonePlaceholder: "+91-XXXXXXXXXX",
    emailPlaceholder: "coimbatore@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 11.0168, lng: 76.9558 },
    description: "Regional hub serving pastors, catechists, and ministerial students in western Tamil Nadu.",
  },
  {
    id: "chennai",
    name: "Chennai",
    country: "India",
    region: "Southern India",
    addressPlaceholder: "Chennai Regional Administrative Office, Tamil Nadu, India",
    phonePlaceholder: "+91-XXXXXXXXXX",
    emailPlaceholder: "chennai@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    description: "Metropolitan centre facilitating theological seminars, modular courses, and diocesan convocations.",
  },
  {
    id: "dandeli",
    name: "Dandeli",
    country: "India",
    region: "Southern India",
    addressPlaceholder: "Dandeli Administrative Mission, Karnataka, India",
    phonePlaceholder: "+91-XXXXXXXXXX",
    emailPlaceholder: "dandeli@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 15.2449, lng: 74.6225 },
    description: "Regional ministry and pastoral retreat training hub in northern Karnataka.",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    country: "India",
    region: "Southern India",
    // TODO: CONFIRM WITH CLIENT - Appears in Brochure 2 only; absent in Brochure 1.
    isBrochure2Only: true,
    addressPlaceholder: "Hyderabad Centre (Pending Confirmation), Telangana, India",
    phonePlaceholder: "+91-XXXXXXXXXX",
    emailPlaceholder: "hyderabad@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 17.385, lng: 78.4867 },
    description: "Telugu-region study liaison centre for ecclesiastical programs (listed in Brochure 2).",
  },
  {
    id: "new-delhi",
    name: "New Delhi",
    country: "India",
    region: "Northern India",
    addressPlaceholder: "New Delhi North India Administrative Liaison, Delhi, India",
    phonePlaceholder: "+91-XXXXXXXXXX",
    emailPlaceholder: "delhi@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 28.6139, lng: 77.209 },
    description: "National capital liaison point for inter-church affairs and northern regional distance scholars.",
  },
  {
    id: "malaysia",
    name: "Malaysia",
    country: "Malaysia",
    region: "International",
    addressPlaceholder: "Southeast Asia Regional Centre, Malaysia",
    phonePlaceholder: "+60-XXXXXXXXX",
    emailPlaceholder: "malaysia@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 3.139, lng: 101.6869 },
    description: "Southeast Asian regional centre supporting international distance learners and missionary clergy.",
  },
  {
    id: "georgia-usa",
    name: "Georgia (USA)",
    country: "United States",
    region: "International",
    // TODO: CONFIRM WITH CLIENT - Brochure 1 lists Georgia (USA), whereas Brochure 2 lists Florida (US).
    altLocationNotice: "Brochure 2 lists Florida (US) instead of Georgia (USA). Defaulting to Brochure 1.",
    addressPlaceholder: "North America Liaison Office, Georgia, United States",
    phonePlaceholder: "+1-XXXXXXXXXX",
    emailPlaceholder: "usa@trinityinternationaluniversity.edu.in",
    coordinates: { lat: 32.1656, lng: -82.9001 },
    description: "North American coordinating liaison for overseas diaspora ministers and institutional dialogue.",
  },
];
