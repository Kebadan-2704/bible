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
    id: "university-of-christ-usa",
    name: "University of Christ",
    country: "USA",
    countryCode: "US",
    flagIcon: "🇺🇸",
    notes: "Partner and affiliated institution in the United States.",
  },
  {
    id: "british-university-of-bible-england",
    name: "British University of Bible",
    country: "England",
    countryCode: "GB",
    flagIcon: "🇬🇧",
    notes: "Partner and affiliated institution in England.",
  },
  {
    id: "holy-god-ministries-france",
    name: "Holy God Ministries",
    country: "France",
    countryCode: "FR",
    flagIcon: "🇫🇷",
    notes: "Partner and affiliated ministerial organization in France.",
  },
  {
    id: "revival-university-ireland",
    name: "Revival University",
    country: "Ireland",
    countryCode: "IE",
    flagIcon: "🇮🇪",
    notes: "Partner and affiliated institution in Ireland.",
  },
  {
    id: "christian-mission-intl-switzerland",
    name: "Christian Mission International",
    country: "Switzerland",
    countryCode: "CH",
    flagIcon: "🇨🇭",
    notes: "Partner and affiliated missionary organization in Switzerland.",
  },
];

export const affiliationDisclaimer =
  "Institutional Affiliations Note: The institutions listed above represent partner bodies and affiliated ministries documented by University of Trinity International (Trinity Church of India Diocese). We do not make secular governmental accreditation claims on behalf of partner bodies. Academic and ministerial credits are recognized mutually under religious trust charters.";
