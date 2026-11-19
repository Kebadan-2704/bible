export interface AdmissionStep {
  step: number;
  title: string;
  summary: string;
  details: string;
}

export interface AdmissionFAQ {
  question: string;
  answer: string;
  category: "General" | "Eligibility" | "Degrees" | "Mode of Study";
}

export const admissionSteps: AdmissionStep[] = [
  {
    step: 1,
    title: "Enquire & Submit Application",
    summary: "Complete our online enquiry form or submit your initial candidate profile.",
    details:
      "Indicate your desired programme of study (Undergraduate, Master's, Doctoral, or Ordinance Track) and your preferred study language (English or Tamil) and centre.",
  },
  {
    step: 2,
    title: "Document Verification",
    summary: "Submit church recommendation, prior academic records, and personal testimony.",
    details:
      "Candidates submit copies of previous certificates, ministerial recommendations from their local pastor or church overseer, and identification documents for verification.",
  },
  {
    step: 3,
    title: "Pastoral Interview & Assessment",
    summary: "Participate in an interview with the Admissions Council.",
    details:
      "A personal interview (conducted in-person at a regional administrative centre or online via secure video call) evaluates the candidate's ministerial calling and academic readiness.",
  },
  {
    step: 4,
    title: "Enrolment & Induction",
    summary: "Formal admission confirmation, syllabus allocation, and matriculation.",
    details:
      "Upon approval by the Academic Council, candidates receive an official Letter of Enrolment, registration number, course module access, and assigned academic mentor.",
  },
];

export const programmeEligibilityPlaceholders = [
  {
    level: "Undergraduate (B.Th., B.D., B.Min.)",
    eligibility: "Completion of Higher Secondary Certificate (10+2) or equivalent biblical foundation certificate, with active church involvement.",
    mode: "Regular Seminar / Modular / Distance Distance Learning",
    duration: "3 - 4 Years",
  },
  {
    level: "Postgraduate (M.Div., M.Th., M.Min.)",
    eligibility: "Recognized Bachelor's degree (B.Th., B.D., or secular graduate degree with foundational theology prerequisites) and pastoral recommendation.",
    mode: "Modular Seminars / Directed Research / Distance Mentorship",
    duration: "2 - 3 Years",
  },
  {
    level: "Doctoral (Th.D., D.D., Ph.D. - 4 Years)",
    eligibility: "Master's degree in Theology (M.Th. / M.Div.) with demonstrated research capacity and submission of an approved research proposal.",
    mode: "Supervised Research Treatise & Dissertation Defense",
    duration: "4 Years",
  },
  {
    level: "Ordinance Courses (Evangelist, Pastor, Apostle, Reverend, Bishop)",
    eligibility: "Active ministry practitioners nominated by local congregations or diocesan overseers, subject to clerical review.",
    mode: "Intensive Ecclesiastical Ordination Workshops",
    duration: "Modular Certification",
  },
];

export const admissionFAQs: AdmissionFAQ[] = [
  {
    category: "General",
    question: "What is the legal and religious nature of the degrees awarded?",
    answer:
      "Trinity International University is established under The Indian Trusts Act, 1882 (and ecclesiastical Christian clerical rites). All degrees, diplomas, and certificates are religious and theological awards granted for ministry, pastoral leadership, and church service. They are not secular statutory degrees.",
  },
  {
    category: "Mode of Study",
    question: "Are classes offered in modular or distance formats for active pastors?",
    answer:
      "Yes. The institution designs flexible modular learning schedules, weekend seminars, and guided distance research to enable full-time pastors and evangelists to pursue higher theological education without leaving their ministry postings.",
  },
  {
    category: "Eligibility",
    question: "In what languages are the programmes conducted?",
    answer:
      "Programmes are structured primarily in English, with dedicated seminar tracks and instructional guidance also available in Tamil and regional languages at affiliated centres.",
  },
  {
    category: "Degrees",
    question: "Can I receive credit for previous ministerial experience?",
    answer:
      "Prior learning and verifiable ministerial service may be assessed by the Academic Council during admissions for advanced placement in specific practical ministry modules.",
  },
  {
    category: "Eligibility",
    question: "How do I obtain the complete institution prospectus?",
    answer:
      "You can submit an online enquiry through our website or visit any of our administrative centres in Bangalore, Coimbatore, Chennai, Dandeli, or New Delhi to collect a prospectus pack.",
  },
];
