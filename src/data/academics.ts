export interface SchoolDivision {
  id: string;
  name: string;
  description: string;
  badge: string;
}

export interface DegreeProgramme {
  code: string;
  title: string;
  fullTitle: string;
  level: "Undergraduate" | "Postgraduate" | "Doctoral";
  duration: string;
  description: string;
  source: "Brochure 1" | "Brochure 2" | "Both";
  discrepancyNote?: string;
}

export interface OrdinanceCourse {
  title: string;
  designation: string;
  focus: string;
  eligibility: string;
  source: "Brochure 2";
}

export interface CoreSubject {
  id: string;
  title: string;
  category: string;
  summary: string;
}

export interface AcademicAbbreviation {
  abbreviation: string;
  definition: string;
  notes?: string;
}

export const schoolsAndDivisions: SchoolDivision[] = [
  {
    id: "school-of-biblical-studies",
    name: "School of Biblical Studies",
    description:
      "Dedicated to foundational scripture analysis, biblical languages, textual transmission, Old and New Testament theologies, and hermeneutics.",
    badge: "Division I",
  },
  {
    id: "school-of-church-ministry-education",
    name: "School of Church Ministry Education",
    description:
      "Forming servant-leaders, pastors, evangelists, and counsellors through systematic theology, ministerial ethics, pastoral care, and ecclesiology.",
    badge: "Division II",
  },
];

/**
 * Union of Degrees Offered across Brochure 1 and Brochure 2.
 * Note: Brochure 1 displays 6 degree badges in the bottom strip (Th.D., D.D., D.Min., B.Th., B.Min., B.D.)
 * while listing B.D., M.Div./M.Th., and Ph.D. under "DEGREE PROGRAMMES".
 * Brochure 2 lists B.Th., B.Div., M.Th., M.Div., M.Min., D.D., and Ph.D. under "DEGREE COURSES".
 */
export const allDegreesOffered: DegreeProgramme[] = [
  {
    code: "B.Th.",
    title: "Bachelor of Theology",
    fullTitle: "Bachelor of Theology (B.Th.)",
    level: "Undergraduate",
    duration: "3 - 4 Years",
    description: "Foundational undergraduate ecclesiastical study covering Christian doctrines, scriptures, church history, and ministry essentials.",
    source: "Both",
  },
  {
    code: "B.D. / B.Div.",
    title: "Bachelor of Divinity",
    fullTitle: "Bachelor of Divinity (B.D. / B.Div.)",
    level: "Undergraduate",
    duration: "3 - 4 Years",
    description: "Comprehensive ministerial bachelor's degree in Theology and Religious Education, preparing students for pastoral ordination.",
    source: "Both",
    discrepancyNote: "Brochure 1 writes B.D.; Brochure 2 writes B.Div.",
  },
  {
    code: "B.Min.",
    title: "Bachelor of Ministry",
    fullTitle: "Bachelor of Ministry (B.Min.)",
    level: "Undergraduate",
    duration: "3 Years",
    description: "Practical ecclesiastical degree focused on church planting, pastoral work, youth ministry, and evangelistic leadership.",
    source: "Brochure 1",
    discrepancyNote: "Prominently featured in Brochure 1 degrees strip; omitted from Brochure 2 list.",
  },
  {
    code: "M.Th.",
    title: "Master of Theology",
    fullTitle: "Master of Theology (M.Th.)",
    level: "Postgraduate",
    duration: "2 Years",
    description: "Advanced theological degree with specialized research tracks in Systematic Theology, Biblical Studies, and Christian Ethics.",
    source: "Both",
    discrepancyNote: "Listed under Degree Programmes in Brochure 1 and Degree Courses in Brochure 2.",
  },
  {
    code: "M.Div.",
    title: "Master of Divinity",
    fullTitle: "Master of Divinity (M.Div.)",
    level: "Postgraduate",
    duration: "2 - 3 Years",
    description: "Standard clerical postgraduate qualification equipping pastors and church executives with comprehensive theological and pastoral competencies.",
    source: "Both",
    discrepancyNote: "Paired with M.Th. in Brochure 1; listed separately in Brochure 2.",
  },
  {
    code: "M.Min.",
    title: "Master of Ministry",
    fullTitle: "Master of Ministry (M.Min.)",
    level: "Postgraduate",
    duration: "2 Years",
    description: "Specialized postgraduate program emphasizing applied pastoral counselling, church governance, and leadership development.",
    source: "Brochure 2",
    discrepancyNote: "Listed in Brochure 2 Degree Courses & leaders' credentials; absent from Brochure 1 degrees strip.",
  },
  {
    code: "D.Min.",
    title: "Doctor of Ministry",
    fullTitle: "Doctor of Ministry (D.Min.)",
    level: "Doctoral",
    duration: "3 Years",
    description: "Advanced professional doctorate designed for seasoned pastors, bishops, and ministry directors to enhance ministerial practice.",
    source: "Brochure 1",
    discrepancyNote: "Present in Brochure 1 degree strip; omitted in Brochure 2 degree courses.",
  },
  {
    code: "Th.D.",
    title: "Doctor of Theology",
    fullTitle: "Doctor of Theology (Th.D.)",
    level: "Doctoral",
    duration: "3 - 4 Years",
    description: "Rigorous academic theological doctorate focusing on advanced doctrinal analysis, hermeneutical treatises, and theological literature.",
    source: "Brochure 1",
    discrepancyNote: "Present in Brochure 1 degree strip; Brochure 2 lists Ph.D. instead.",
  },
  {
    code: "D.D.",
    title: "Doctor of Divinity",
    fullTitle: "Doctor of Divinity (D.D.)",
    level: "Doctoral",
    duration: "Advanced / Conferred",
    description: "Prestigious ecclesiastical doctorate recognizing mature theological scholarship, long-standing ministerial leadership, and ecclesiastical contribution.",
    source: "Both",
  },
  {
    code: "Ph.D.",
    title: "Doctor of Philosophy in Theology",
    fullTitle: "Doctor of Philosophy (Ph.D.) - 4 Years",
    level: "Doctoral",
    duration: "4 Years",
    description: "Terminal academic research degree requiring an original dissertation project (D.P.) contributing to biblical or theological knowledge.",
    source: "Both",
    discrepancyNote: "Brochure 1 explicitly specifies 4 years; Brochure 2 lists as Doctor of Philosophy.",
  },
];

/**
 * Ordinance Courses (listed exclusively in Brochure 2 under ORDINANCE COURSES)
 */
export const ordinanceCourses: OrdinanceCourse[] = [
  {
    title: "Evangelist",
    designation: "Evangelistic Clerical Ordination Track",
    focus: "Gospel proclamation, church planting, open-air ministry, and mission mobilization.",
    eligibility: "Active gospel ministers and parish evangelists seeking ecclesiastical recognition.",
    source: "Brochure 2",
  },
  {
    title: "Pastor",
    designation: "Pastoral Ministry Ordination Track",
    focus: "Shepherding local congregations, homiletics, administering sacraments, and pastoral counselling.",
    eligibility: "Candidates with biblical diploma or degree called to full-time local church pastorship.",
    source: "Brochure 2",
  },
  {
    title: "Apostle",
    designation: "Apostolic Leadership & Diocesan Pioneer Track",
    focus: "Regional church oversight, episcopal church planting networks, and ministerial mentorship.",
    eligibility: "Senior ministers overseeing multiple mission congregations or diocesan initiatives.",
    source: "Brochure 2",
  },
  {
    title: "Reverend",
    designation: "Ordained Reverend Clergy Track",
    focus: "Ecclesiastical liturgical rites, canon order, institutional chaplaincy, and sacramental rites.",
    eligibility: "Licensed pastoral workers advancing to fully credentialed clerical reverend standing.",
    source: "Brochure 2",
  },
  {
    title: "Bishop",
    designation: "Episcopal Consecration & Bishopric Studies Track",
    focus: "Episcopal oversight, diocese governance, clerical ordinations, and institutional presidency.",
    eligibility: "Presbyters, reverends, and senior ministers nominated for episcopal consecration.",
    source: "Brochure 2",
  },
];

/**
 * Core Subjects (13 subjects directly transcribed from Brochure 1 & 2)
 */
export const coreSubjects: CoreSubject[] = [
  {
    id: "biblical-studies",
    title: "Biblical Studies",
    category: "Biblical Foundations",
    summary: "Introductory and advanced study of Old and New Testament canons, text integrity, and analytical reading.",
  },
  {
    id: "systematic-theology",
    title: "Systematic Theology",
    category: "Doctrinal Formulation",
    summary: "Ordered articulation of Christian beliefs regarding God, creation, revelation, Christ, and salvation.",
  },
  {
    id: "christian-ethics",
    title: "Christian Ethics",
    category: "Practical Application",
    summary: "Moral teachings of Jesus Christ and the ethical duties of Christian disciples within modern society.",
  },
  {
    id: "methods-of-bible-study",
    title: "Methods of Bible Study",
    category: "Hermeneutics",
    summary: "Expository, inductive, historical-grammatical, and thematic tools for sound scripture interpretation.",
  },
  {
    id: "world-religions",
    title: "World Religions",
    category: "Comparative Studies",
    summary: "Objective and comparative examination of global religious traditions and intercultural dialogue.",
  },
  {
    id: "introduction-to-new-testament",
    title: "Introduction to New Testament",
    category: "New Testament",
    summary: "Authorship, socio-historical context, and canonical theology of the 27 New Testament writings.",
  },
  {
    id: "apostles-creed",
    title: "Apostles' Creed",
    category: "Historical Faith",
    summary: "Analysis of the ancient creedal summary of apostolic faith, trinitarian orthodoxy, and baptismal confession.",
  },
  {
    id: "new-testament-survey",
    title: "New Testament Survey",
    category: "New Testament",
    summary: "Broad synthesis of the Gospels, Acts of the Apostles, Pauline Epistles, General Epistles, and Revelation.",
  },
  {
    id: "hebrew-bible",
    title: "Hebrew Bible",
    category: "Old Testament",
    summary: "The Law (Torah), Prophets (Nevi'im), and Writings (Ketuvim) in historical and literary perspectives.",
  },
  {
    id: "master-series",
    title: "Master Series",
    category: "Ministry Skills",
    summary: "Intensive modular seminars addressing contemporary theological challenges and ministerial leadership.",
  },
  {
    id: "story-of-the-bible",
    title: "Story of the Bible",
    category: "Biblical Narrative",
    summary: "The overarching meta-narrative of scripture spanning creation, fall, redemption, and consummation.",
  },
  {
    id: "theology-and-culture",
    title: "Theology and Culture",
    category: "Contextual Theology",
    summary: "Engaging societal structures, media, indigenous worldviews, and arts through a theological lens.",
  },
  {
    id: "making-right-decisions",
    title: "Making Right Decisions Based on the Bible",
    category: "Pastoral Guidance",
    summary: "Biblical discernment paradigms for ethical leadership, pastoral problem-solving, and personal conduct.",
  },
];

/**
 * Academic Abbreviations Legend (directly from Brochure 1)
 */
export const academicAbbreviations: AcademicAbbreviation[] = [
  { abbreviation: "B.S.", definition: "Biblical Studies", notes: "Foundational and hermeneutical studies of scripture." },
  { abbreviation: "O.T.", definition: "Old Testament Studies", notes: "Hebrew Scriptures, Torah, and Ancient Near Eastern contexts." },
  { abbreviation: "N.T.", definition: "New Testament Studies", notes: "Gospel and apostolic literature, transmission, and Greek text." },
  { abbreviation: "S.T.", definition: "Systematic Theology", notes: "Comprehensive doctrinal and philosophical theology." },
  { abbreviation: "C.E.", definition: "Christian Ethics", notes: "Moral theology, social responsibility, and justice." },
  { abbreviation: "SGT", definition: "Studies in Gender & Theology", notes: "Intersectional, feminist, and gender theories in theology." },
  { abbreviation: "R.S.", definition: "Religious Studies (Methodology)", notes: "Phenomenological and sociological methodologies in religion." },
  { abbreviation: "D.P.", definition: "Dissertation Project", notes: "Required terminal research treatise for postgraduate and doctoral awards." },
];
