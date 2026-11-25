export interface Leader {
  id: string;
  name: string;
  title: string;
  credentials: string;
  roleCategory: "executive_officer" | "executive_director";
  initials: string;
  description?: string;
}

export const governingCouncil = {
  founderChairman: {
    id: "founder-chairman",
    name: "Dr. S. Sundarabharathi",
    title: "Founder & Chairman",
    credentials: "M.A., M.A., M.A., M.I.C.A., M.Th., M.Div., M.Min., D.Th., D.D., D.Lit., Ph.D.",
    initials: "SB",
    roleCategory: "executive_officer" as const,
    description:
      "Founder and academic steward of the Trinity Church of India Diocese, guiding ministerial formation, biblical scholarship, and global outreach.",
  },
  generalSecretary: {
    id: "general-secretary",
    name: "Rev. Dr. Ebenezer T. Manoharan",
    title: "General Secretary",
    credentials: "M.Th., M.Div., M.Min., D.D., Ph.D.",
    initials: "EM",
    roleCategory: "executive_officer" as const,
    description:
      "Overseeing diocesan ecclesiastical administration, curricular oversight, institutional correspondence, and clerical development.",
  },
  viceChairman: {
    id: "vice-chairman",
    name: "Rev. Dr. Thomas M. Vinoth",
    title: "Vice Chairman",
    credentials: "M.Th., M.Div., M.Min., D.D., Ph.D.",
    initials: "TV",
    roleCategory: "executive_officer" as const,
    description:
      "Directing academic council deliberations, pastoral training initiatives, and inter-centre collegiate coordination.",
  },
  executiveDirectors: [
    {
      id: "billy-graham",
      name: "Rev. Dr. K. Billy Graham",
      title: "Executive Director",
      credentials: "M.Th., D.D.",
      initials: "BG",
      roleCategory: "executive_director" as const,
    },
    {
      id: "itte-prakash-rao",
      name: "Rev. Dr. Itte Prakash Rao",
      title: "Executive Director",
      credentials: "M.Div., D.D.",
      initials: "IP",
      roleCategory: "executive_director" as const,
    },
    {
      id: "i-singam",
      name: "Rev. Dr. I. Singam",
      title: "Executive Director",
      credentials: "Doctorate in Divinity",
      initials: "IS",
      roleCategory: "executive_director" as const,
    },
    {
      id: "karam-jeet-singh",
      name: "Rev. Dr. Karam Jeet Singh",
      title: "Executive Director",
      credentials: "M.Th., D.D.",
      initials: "KS",
      roleCategory: "executive_director" as const,
    },
    {
      id: "m-john",
      name: "Rev. Dr. M. John",
      title: "Executive Director",
      credentials: "M.Th., M.Div., D.D., Ph.D.",
      initials: "MJ",
      roleCategory: "executive_director" as const,
    },
    {
      id: "t-raja",
      name: "Rev. Dr. T. Raja",
      title: "Executive Director",
      credentials: "M.Th., M.Div., Ph.D.",
      initials: "TR",
      roleCategory: "executive_director" as const,
    },
    {
      id: "c-babu",
      name: "Rev. Dr. C. Babu",
      title: "Executive Director",
      credentials: "M.Div., Ph.D.",
      initials: "CB",
      roleCategory: "executive_director" as const,
    },
  ],
};
