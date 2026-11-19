export interface ResearchArea {
  abbreviation: string;
  discipline: string;
  courseTitle: string;
  focus: string;
  outcomes: string[];
}

export const researchMethodologiesData: ResearchArea[] = [
  {
    abbreviation: "B.S.",
    discipline: "Biblical Studies",
    courseTitle: "Seminar on Biblical Hermeneutical Methods",
    focus: "Historical-critical, literary, canonical, and socio-scientific methodologies for scripture exegesis.",
    outcomes: [
      "Rigorous grammatical-historical analysis of Hebrew and Greek texts",
      "Application of redaction, source, and form criticism methods",
      "Contextual hermeneutical paradigms and community interpretation",
    ],
  },
  {
    abbreviation: "S.T.",
    discipline: "Systematic Theology",
    courseTitle: "Research Methods in Systematic Theology",
    focus: "Epistemology, doctrinal synthesis, historical dogmatics, and interdisciplinary philosophical inquiry.",
    outcomes: [
      "Formulation of robust theological theses and argument structures",
      "Comparative analysis of patristic, reformation, and modern dogmatics",
      "Constructive engagement with contemporary secular and cultural challenges",
    ],
  },
  {
    abbreviation: "SGT",
    discipline: "Studies in Gender & Theology",
    courseTitle: "Gender Theories, Feminist Theories, Research Methods",
    focus: "Intersectional gender theories, critical patriarchal deconstruction, and egalitarian pastoral theology.",
    outcomes: [
      "Critical evaluation of feminist, womanist, and indigenous gender theories",
      "Methodologies for identifying structural violence and marginalization",
      "Transformative pastoral and ecclesiastical leadership frameworks",
    ],
  },
  {
    abbreviation: "R.S.",
    discipline: "Religious Studies",
    courseTitle: "Methodology of Religious Studies",
    focus: "Phenomenological, anthropological, and sociological methods in the empirical study of living religions.",
    outcomes: [
      "Objective phenomenological description of religious symbols and rituals",
      "Qualitative field interview methods in congregational studies",
      "Inter-religious dialogue protocols and ethical cross-cultural research",
    ],
  },
];

export const dissertationProjectInfo = {
  abbreviation: "D.P.",
  title: "Dissertation Project (D.P.)",
  description:
    "The culminating academic research requirement for terminal postgraduate and doctoral candidates. Candidates demonstrate scholarly independence, methodological rigor, and substantive contribution to Christian theology or pastoral ministry.",
  stages: [
    { name: "Topic & Proposal Approval", description: "Submission of research problem, literature review, and methodology." },
    { name: "Supervised Research", description: "Mentorship by senior faculty and diocesan academic advisors." },
    { name: "Drafting Treatise", description: "Thorough multi-chapter dissertation adhering to academic scholarly standards." },
    { name: "Oral Viva & Defense", description: "Comprehensive defense before the Academic Council of Examiners." },
  ],
};
