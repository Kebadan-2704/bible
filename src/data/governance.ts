export interface Leader {
  id: string;
  name: string;
  nameAlt?: string;
  title: string;
  credentials: string;
  credentialsAlt?: string;
  roleCategory: "executive_officer" | "executive_director";
  bioPlaceholder?: string;
  initials: string;
  notes?: string;
}

export const governingCouncil = {
  founderChairman: {
    id: "founder-chairman",
    name: "Rt. Rev. Dr. S. Sundara Bharathi",
    nameAlt: "Dr. S. Sundarabharathi (Brochure 2)",
    title: "Founder & Chairman",
    credentials: "M.A., M.A., M.A., M.I.C.A., M.Th., M.Div., D.D., D.Lit., Ph.D.",
    credentialsAlt: "M.A., M.A., M.A., M.I.C.A., M.Th., M.Div., D.D., Litt., Ph.D. (Brochure 2)",
    initials: "SB",
    roleCategory: "executive_officer" as const,
    description:
      "Visionary episcopal leader of the Indian Trinity Church Diocese, stewarding ministerial formation, academic rigor, and global missional outreach.",
  },
  generalSecretary: {
    id: "general-secretary",
    name: "Rt. Rev. Dr. Ebenezer T. Manoharan",
    // TODO: CONFIRM WITH CLIENT - Brochure 2 writes "Ebenezer. D. Manohar" with credentials "M.Div., M.Th., D.D., Ph.D."
    nameAlt: "Ebenezer. D. Manohar (Brochure 2)",
    title: "General Secretary",
    credentials: "M.Th., M.Div., M.Min., D.D., Ph.D.",
    credentialsAlt: "M.Div., M.Th., D.D., Ph.D. (Brochure 2)",
    initials: "EM",
    roleCategory: "executive_officer" as const,
    description:
      "Overseeing diocesan ecclesiastical administration, curricular compliance, institutional correspondence, and clerical development.",
  },
  viceChairman: {
    id: "vice-chairman",
    name: "Rt. Rev. Dr. Thomas M. Vinoth",
    nameAlt: "Rev. Dr. Thomas M. Vinoth (Brochure 2)",
    title: "Vice Chairman",
    credentials: "M.Th., M.Div., M.Min., D.D., Ph.D.",
    initials: "TV",
    roleCategory: "executive_officer" as const,
    description:
      "Directing academic council deliberations, pastoral training initiatives, and inter-centre collegiate coordination.",
  },
  // Default to Brochure 1 for Executive Directors
  // Brochure 2 discrepancies documented in comments and alt properties
  executiveDirectors: [
    {
      id: "billy-graham",
      name: "Rt. Rev. Dr. K. Billy Graham",
      nameAlt: "Rev. Dr. K. Bily Graham (Brochure 2)",
      title: "Executive Director",
      credentials: "M.Th., D.D.",
      credentialsAlt: "M.Th., D.D., Spain (Brochure 2)",
      initials: "BG",
      roleCategory: "executive_director" as const,
      notes: "Brochure 2 notes Spain affiliation and spelling 'Bily'",
    },
    {
      id: "itte-prakash-rao",
      name: "Rt. Rev. Dr. Itte Prakash Rao",
      nameAlt: "Rev. Dr. P. Prakash Rao (Brochure 2)",
      title: "Executive Director",
      credentials: "M.Div., D.D.",
      credentialsAlt: "M.Div., D.D., Spain (Brochure 2)",
      initials: "IP",
      roleCategory: "executive_director" as const,
      notes: "Brochure 2 lists as 'Rev. Dr. P. Prakash Rao' with Spain",
    },
    {
      id: "i-singam",
      name: "Rt. Rev. Dr. I. Singam",
      nameAlt: "Replaced/omitted in Brochure 2 by Rev. Dr. S. John Isaiah",
      title: "Executive Director",
      credentials: "Doctorate in Divinity",
      initials: "IS",
      roleCategory: "executive_director" as const,
      notes: "Present in Brochure 1; Brochure 2 has Rev. Dr. S. John Isaiah instead",
    },
    {
      id: "karam-jeet-singh",
      name: "Rt. Rev. Dr. Karam Jeet Singh",
      nameAlt: "Rev. Dr. K. Kumar Jeet Singh (Brochure 2)",
      title: "Executive Director",
      credentials: "M.Th., D.D.",
      initials: "KS",
      roleCategory: "executive_director" as const,
      notes: "Brochure 2 lists name as 'Rev. Dr. K. Kumar Jeet Singh, M.Th., D.D.'",
    },
    {
      id: "m-john",
      name: "Rt. Rev. Dr. M. John",
      nameAlt: "Rev. Dr. M. John (Brochure 2)",
      title: "Executive Director",
      credentials: "M.Th., M.Div., D.D., Ph.D.",
      credentialsAlt: "M.Th., D.D., Ph.D. (Brochure 2)",
      initials: "MJ",
      roleCategory: "executive_director" as const,
      notes: "Brochure 1 lists M.Th., M.Div., D.D., Ph.D.; Brochure 2 omits M.Div.",
    },
    {
      id: "t-raja",
      name: "Rt. Rev. Dr. T. Raja",
      nameAlt: "Rev. Dr. D. D. Raja (Brochure 2)",
      title: "Executive Director",
      credentials: "M.Th., M.Div., Ph.D.",
      initials: "TR",
      roleCategory: "executive_director" as const,
      notes: "Brochure 1 lists 'Rt. Rev. Dr. T. Raja'; Brochure 2 lists 'Rev. Dr. D. D. Raja, M.Th., M.Div., Ph.D.'",
    },
    {
      id: "c-babu",
      name: "Rt. Rev. Dr. C. Babu",
      nameAlt: "Rev. Dr. C. Babu (Brochure 2)",
      title: "Executive Director",
      credentials: "M.Div., Ph.D.",
      initials: "CB",
      roleCategory: "executive_director" as const,
      notes: "Brochure 2 specifies credentials 'M.Div., Ph.D.'",
    },
    // Alternate listed in Brochure 2:
    {
      id: "john-isaiah",
      name: "Rev. Dr. S. John Isaiah",
      nameAlt: "Brochure 2 variant entry",
      title: "Executive Director (Brochure 2)",
      credentials: "Doctorate in Divinity",
      initials: "JI",
      roleCategory: "executive_director" as const,
      notes: "Appears only in Brochure 2 listing of Executive Directors",
    },
  ],
};
