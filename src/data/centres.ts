export interface AdministrativeCentre {
  id: string;
  name: string;
  country: string;
  region: "Southern India" | "Northern India" | "International";
  isHeadquarters?: boolean;
  cityRegionLabel: string;
  contactOptionValue: string;
  description: string;
}

export const administrativeCentres: AdministrativeCentre[] = [
  {
    id: "bangalore-hq",
    name: "YGM – Bangalore (Headquarters)",
    country: "India",
    region: "Southern India",
    isHeadquarters: true,
    cityRegionLabel: "Head Quarters: YGM – Bangalore, Karnataka, India",
    contactOptionValue: "YGM – Bangalore HQ",
    description:
      "Principal headquarters (YGM – Bangalore) serving as the central administrative seat for academic affairs, admissions, and institutional registries.",
  },
  {
    id: "trinity",
    name: "Trinity Centre",
    country: "India",
    region: "Southern India",
    cityRegionLabel: "Trinity Diocesan Centre, South India",
    contactOptionValue: "Trinity Centre",
    description:
      "Primary collegiate diocesan centre supporting pastoral mentorship and ministry coordination.",
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    country: "India",
    region: "Southern India",
    cityRegionLabel: "Coimbatore Regional Office, Tamil Nadu, India",
    contactOptionValue: "Coimbatore Centre",
    description:
      "Regional hub serving pastors, catechists, and ministerial students across western Tamil Nadu.",
  },
  {
    id: "chennai",
    name: "Chennai",
    country: "India",
    region: "Southern India",
    cityRegionLabel: "Chennai Regional Office, Tamil Nadu, India",
    contactOptionValue: "Chennai Centre",
    description:
      "Metropolitan centre facilitating theological seminars, modular courses, and diocesan convocations.",
  },
  {
    id: "dandeli",
    name: "Dandeli",
    country: "India",
    region: "Southern India",
    cityRegionLabel: "Dandeli Mission Office, Karnataka, India",
    contactOptionValue: "Dandeli Centre",
    description:
      "Regional ministry and pastoral retreat training centre in northern Karnataka.",
  },
  {
    id: "new-delhi",
    name: "New Delhi",
    country: "India",
    region: "Northern India",
    cityRegionLabel: "New Delhi Regional Liaison, Delhi, India",
    contactOptionValue: "New Delhi Centre",
    description:
      "National capital liaison point for inter-church fellowship and northern regional distance scholars.",
  },
  {
    id: "malaysia",
    name: "Malaysia",
    country: "Malaysia",
    region: "International",
    cityRegionLabel: "Southeast Asia Liaison Centre, Malaysia",
    contactOptionValue: "Malaysia Centre (International)",
    description:
      "Southeast Asian liaison office supporting international distance learners and missionary clergy.",
  },
  {
    id: "georgia-usa",
    name: "Georgia (USA)",
    country: "United States",
    region: "International",
    cityRegionLabel: "North America Liaison Office, Georgia, United States",
    contactOptionValue: "Georgia (USA) Liaison",
    description:
      "North American coordinating liaison for overseas diaspora ministers and institutional dialogue.",
  },
];

export const centreSlugToFormOption: Record<string, string> = Object.fromEntries(
  administrativeCentres.map((c) => [c.id, c.contactOptionValue])
);
