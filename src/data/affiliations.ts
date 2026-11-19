export interface AffiliatedInstitution {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flagIcon: string;
  notes: string;
}

export const affiliatedInstitutionsList: AffiliatedInstitution[] = [
  {
    id: "christ-university-usa",
    name: "Christ University",
    country: "United States of America",
    countryCode: "US",
    flagIcon: "🇺🇸",
    notes: "Listed on institution brochure as partner / affiliated institution in the United States.",
  },
  {
    id: "british-bible-university-uk",
    name: "British Bible University",
    country: "United Kingdom",
    countryCode: "GB",
    flagIcon: "🇬🇧",
    notes: "Listed on institution brochure as partner / affiliated institution in the United Kingdom.",
  },
  {
    id: "holy-god-ministries-france",
    name: "Holy God Ministries",
    country: "France",
    countryCode: "FR",
    flagIcon: "🇫🇷",
    notes: "Listed on institution brochure as partner / affiliated ministerial organization in France.",
  },
  {
    id: "revival-university-ireland",
    name: "Revival University",
    country: "Ireland",
    countryCode: "IE",
    flagIcon: "🇮🇪",
    notes: "Listed on institution brochure as partner / affiliated institution in Ireland.",
  },
  {
    id: "christian-mission-intl-switzerland",
    name: "Christian Mission International",
    country: "Switzerland",
    countryCode: "CH",
    flagIcon: "🇨🇭",
    notes: "Listed on institution brochure as partner / affiliated missionary organization in Switzerland.",
  },
];

export const affiliationDisclaimer =
  "Institutional Affiliations Note: The institutions listed above represent partner bodies and affiliated ministries as documented in the institution's official records. Trinity International University does not make secular governmental accreditation claims on behalf of partner bodies. Academic and ministerial credits are recognized mutually under religious trust charters.";
