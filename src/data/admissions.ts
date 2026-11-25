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
      "Indicate your desired programme of study (Undergraduate, Master's, Doctoral, or Ordinance Track), preferred study language (English or Tamil), and preferred regional centre.",
  },
  {
    step: 2,
    title: "Document Verification",
    summary: "Submit church recommendation, prior academic records, and personal testimony.",
    details:
      "Candidates submit copies of previous educational certificates, ministerial recommendations from their local pastor or church overseer, and identification documents for verification.",
  },
  {
    step: 3,
    title: "Pastoral Interview & Assessment",
    summary: "Participate in an interview with the Admissions Council.",
    details:
      "A personal interview (conducted in person at a regional administrative centre or online via video call) evaluates the candidate's ministerial calling and academic readiness.",
  },
  {
    step: 4,
    title: "Enrolment & Induction",
    summary: "Formal admission confirmation, syllabus allocation, and matriculation.",
    details:
      "Upon approval by the Academic Council, candidates receive an official Letter of Enrolment, registration number, course module access, and an assigned academic mentor.",
  },
];

export const programmeEligibilityOverview = [
  {
    level: "Undergraduate (B.Th., B.D., B.Min.)",
    eligibility:
      "Completion of Higher Secondary Certificate (10+2) or equivalent biblical foundation study, accompanied by active church involvement.",
    mode: "Regular Seminars, Modular Classes & Distance Learning",
    duration: "3 – 4 Years",
    requirements: [
      "10+2 / Higher Secondary or equivalent transcripts",
      "Pastor or church overseer recommendation letter",
      "Written statement of Christian calling and ministry purpose",
    ],
  },
  {
    level: "Postgraduate (M.Div., M.Th., M.Min.)",
    eligibility:
      "Bachelor's degree (B.Th., B.D., or qualifying graduate background with foundational theology prerequisites) and pastoral endorsement.",
    mode: "Modular Seminars, Directed Research & Distance Mentorship",
    duration: "2 – 3 Years",
    requirements: [
      "Qualifying undergraduate degree transcripts",
      "Ecclesiastical / church overseer endorsement",
      "Admissions interview evaluating theological readiness",
    ],
  },
  {
    level: "Doctoral (Th.D., D.Min., D.D., Ph.D. – 4 Years)",
    eligibility:
      "Master's degree in Theology (M.Th. / M.Div.) with demonstrated research capacity and an approved research proposal.",
    mode: "Supervised Research Treatise & Dissertation Defense",
    duration: "3 – 4 Years (Ph.D.: 4 Years)",
    requirements: [
      "M.Th. / M.Div. transcripts & verifiable ministry record",
      "Proposed Dissertation Project (D.P.) topic outline",
      "Senior presbyter / diocesan council recommendation",
    ],
  },
  {
    level: "Ordinance Courses (Evangelist, Pastor, Apostle, Reverend, Bishop)",
    eligibility:
      "Active ministry practitioners nominated by local congregations or diocesan overseers, subject to clerical review.",
    mode: "Intensive Ecclesiastical Ordination Workshops",
    duration: "Modular Formation Track",
    requirements: [
      "Congregational or diocesan nomination",
      "Review of pastoral experience and ethical standing",
      "Diocesan ecclesiastical examination",
    ],
  },
];

export const admissionFAQs: AdmissionFAQ[] = [
  {
    category: "General",
    question: "What is the legal and religious nature of the degrees awarded?",
    answer:
      "University of Trinity International is legally constituted under The Indian Trusts Act, 1882 and traditional Christian legal rites. All degrees, diplomas, and certificates are religious and theological qualifications granted for Christian ministry, pastoral leadership, and church service. They are not secular statutory degrees.",
  },
  {
    category: "Mode of Study",
    question: "Are classes offered in modular or distance formats for active pastors?",
    answer:
      "Yes. The institution structures flexible modular schedules, weekend seminars, and guided distance research so full-time pastors and evangelists can pursue theological education alongside active ministry service.",
  },
  {
    category: "Eligibility",
    question: "In what languages are the programmes conducted?",
    answer:
      "Programmes are structured primarily in English, with dedicated seminar tracks and instructional guidance also available in Tamil and regional centres.",
  },
  {
    category: "Degrees",
    question: "How are fees, scholarships, and prior ministerial experience handled?",
    answer:
      "Prior theological coursework or verified pastoral service may be reviewed by the Academic Council during admissions. Specific fee schedules, vernacular pastor concession criteria, and current academic intake dates are confirmed directly by the Admissions Secretariat upon enquiry.",
  },
  {
    category: "Eligibility",
    question: "How do I request detailed programme guidelines?",
    answer:
      "You can download our digital programme overview on this page, review all curricula on the website, or submit an online enquiry for admissions secretariat follow-up.",
  },
];
