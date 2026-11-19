export type Locale = "en" | "ta";

export interface I18nLabels {
  institutionName: string;
  tagline: string;
  nav: {
    home: string;
    about: string;
    governance: string;
    centres: string;
    academics: string;
    curriculum: string;
    research: string;
    doctoral: string;
    affiliations: string;
    admissions: string;
    contact: string;
    applyNow: string;
    search: string;
  };
  common: {
    exploreProgrammes: string;
    enquireNow: string;
    viewDetails: string;
    readMore: string;
    learnMore: string;
    allRightsReserved: string;
    legalNote: string;
  };
}

export const translations: Record<Locale, I18nLabels> = {
  en: {
    institutionName: "Trinity International University",
    tagline: "A Global University for Faith, Knowledge & Service",
    nav: {
      home: "Home",
      about: "About Us",
      governance: "Governance",
      centres: "Centres",
      academics: "Academics",
      curriculum: "Curriculum",
      research: "Research",
      doctoral: "Ph.D. & Honors",
      affiliations: "Affiliations",
      admissions: "Admissions",
      contact: "Contact",
      applyNow: "Apply / Enquire",
      search: "Search",
    },
    common: {
      exploreProgrammes: "Explore Programmes",
      enquireNow: "Enquire Now",
      viewDetails: "View Details",
      readMore: "Read More",
      learnMore: "Learn More",
      allRightsReserved: "All rights reserved.",
      legalNote: "Registered under The Indian Trusts Act, 1882. Degrees are religious/theological qualifications.",
    },
  },
  ta: {
    institutionName: "டிரினிட்டி சர்வதேச பல்கலைக்கழகம்",
    tagline: "விசுவாசம், அறிவு மற்றும் சேவைக்கான சர்வதேச பல்கலைக்கழகம்",
    nav: {
      home: "முகப்பு",
      about: "எங்களை பற்றி",
      governance: "நிர்வாக குழு",
      centres: "மையங்கள்",
      academics: "கல்வி திட்டங்கள்",
      curriculum: "பாடத்திட்டம்",
      research: "ஆராய்ச்சி",
      doctoral: "முனைவர் பட்டம்",
      affiliations: "இணைப்புகள்",
      admissions: "சேர்க்கை",
      contact: "தொடர்பு",
      applyNow: "விண்ணப்பிக்க",
      search: "தேடுக",
    },
    common: {
      exploreProgrammes: "திட்டங்களை காண்க",
      enquireNow: "விசாரிக்க",
      viewDetails: "விவரங்களை பார்க்க",
      readMore: "மேலும் படிக்க",
      learnMore: "அறிந்து கொள்க",
      allRightsReserved: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      legalNote: "இந்திய அறக்கட்டளை சட்டம், 1882 இன் கீழ் பதிவு செய்யப்பட்டுள்ளது.",
    },
  },
};
