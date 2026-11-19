export interface PhDSpecialisation {
  id: string;
  title: string;
  duration: string;
  scope: string;
  coreResearchFocus: string[];
}

export const doctoralSpecialisations: PhDSpecialisation[] = [
  {
    id: "christian-theology",
    title: "Christian Theology",
    duration: "4 Years",
    scope: "Advanced doctoral exploration into systematic dogmatics, historical theology, and contextual christology.",
    coreResearchFocus: [
      "Trinitarian theology and modern ontological debates",
      "Atonement theories and cross-cultural soteriology",
      "Postcolonial Christian dogmatics and ecumenical convergence",
      "Historical evolution of ecclesiastical confessions and creeds",
    ],
  },
  {
    id: "christian-counselling",
    title: "Christian Counselling",
    duration: "4 Years",
    scope: "Scholarly integration of biblical pastoral care with psychological and therapeutic frameworks.",
    coreResearchFocus: [
      "Pastoral intervention models for systemic trauma and grief",
      "Biblical integration in marital and family crisis therapy",
      "Spiritual discernment in mental health and community wellbeing",
      "Ethical protocols in clerical pastoral accompaniment",
    ],
  },
  {
    id: "christian-ministry",
    title: "Christian Ministry",
    duration: "4 Years",
    scope: "Strategic ecclesiastical leadership, homiletical theology, church planting paradigms, and missional ecclesiology.",
    coreResearchFocus: [
      "Contextual models of urban and rural church planting in Asia",
      "Transformational servant leadership in diocesan governance",
      "Liturgical renewal and sacraments in contemporary congregation life",
      "Missionary ethics and intercultural evangelization",
    ],
  },
  {
    id: "biblical-studies",
    title: "Biblical Studies",
    duration: "4 Years",
    scope: "Linguistic and historical-critical exegesis of Old and New Testament corpuses in original scriptural tongues.",
    coreResearchFocus: [
      "Ancient Near Eastern backgrounds and Torah covenantal theology",
      "Second Temple Jewish literature and apostolic Christology",
      "Textual criticism and manuscript transmission studies",
      "Asian and Third World biblical hermeneutics",
    ],
  },
];

export const honoraryDoctorateData = {
  title: "Honorary Doctorate (Honoris Causa)",
  latinTitle: "Doctor Honoris Causa (D.D. / D.Litt.)",
  badge: "Episcopal Conferred Honour",
  legalNotice:
    "Important Notice: The Honorary Doctorate (Honoris Causa) is an ecclesiastical honour conferred solely at the discretion of the Governing Council and Diocese in recognition of distinguished lifetime service, Christian philanthropy, and exemplary kingdom ministry. It is NOT an academic qualification and is neither earned through formal coursework nor intended for statutory employment or academic licensing.",
  criteria: [
    "Over 15-20 years of verifiable, faithful leadership in Christian ministry or missions",
    "Substantial contribution to church planting, societal welfare, or theological literature",
    "Exemplary moral character and adherence to Christian clerical ethics",
    "Recommendation by two ordained presbyters or bishops of recognized church bodies",
  ],
  process: [
    { step: 1, name: "Nomination Submission", desc: "Submitted by senior church leaders or diocesan representatives." },
    { step: 2, name: "Episcopal Scrutiny", desc: "Governing council reviews ministerial record and community witness." },
    { step: 3, name: "Diocesan Approval", desc: "Unanimous vote by the Great Governing Council Leaders." },
    { step: 4, name: "Solemn Conferral", desc: "Presented during the annual solemn convocation ceremony." },
  ],
};
