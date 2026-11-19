export interface CurriculumModule {
  id: number;
  title: string;
  shortTitle: string;
  color: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  iconName: string;
  description: string;
  topics: Array<{
    title: string;
    subtopics?: string[];
    note?: string;
  }>;
  comparisons?: Array<{
    religion: string;
    theisticType: string;
    coreBeliefs: string;
    sacredTextsOrPath: string;
  }>;
}

export const biblicalMinistryModules: CurriculumModule[] = [
  {
    id: 1,
    title: "Introduction to the Bible",
    shortTitle: "Intro to Bible",
    color: "#1E6B3A", // Forest green
    badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-500",
    iconName: "BookOpen",
    description:
      "A systematic introduction establishing the formation, canonization, and historical backdrop of sacred scripture.",
    topics: [
      {
        title: "Old Testament (O.T.)",
        subtopics: [
          "Structure and divisions: Law, Prophets, and Writings",
          "Ancient Near Eastern historical and geographic contexts",
          "Chronology of the biblical patriarchs, judges, and monarchs",
        ],
      },
      {
        title: "The Canon of the Bible",
        subtopics: [
          "Criteria for canonical acceptance in Jewish and Early Christian traditions",
          "The Septuagint (LXX) and the Masoretic Text traditions",
          "Intertestamental literature and deuterocanonical status",
        ],
      },
      {
        title: "History of the Old Testament",
        subtopics: [
          "Textual transmission through scribal communities",
          "Archaeological corroboration and historical milestones",
          "From oral preservation to codex and early translations",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Major World Religions",
    shortTitle: "World Religions",
    color: "#C0561B", // Burnt orange
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
    textColor: "text-amber-800",
    borderColor: "border-amber-500",
    iconName: "Globe",
    description:
      "An analytical survey of prominent world religions, fostering missional awareness and intercultural dialogue.",
    topics: [
      { title: "Islam", subtopics: ["Historical origins, monotheism (Tawhid), Five Pillars, and Quranic texts"] },
      { title: "Baha'i Faith", subtopics: ["Nineteenth-century emergence, unity of God, religion, and humanity"] },
      { title: "Christianity", subtopics: ["Trinitarian monotheism, Incarnation, crucifixion, and redemptive gospel"] },
      { title: "Judaism", subtopics: ["Torah covenant, Talmudic traditions, and Jewish liturgical holidays"] },
    ],
    // Comparison section from Brochure 2:
    comparisons: [
      {
        religion: "Christianity",
        theisticType: "Monotheistic",
        coreBeliefs: "Belief in God the Father, Son (Jesus Christ), and Holy Spirit. Salvation through Christ.",
        sacredTextsOrPath: "Holy Bible (Old and New Testaments)",
      },
      {
        religion: "Buddhism (BUTCBA / Buddha)",
        theisticType: "Non-theistic",
        coreBeliefs: "Teaches the Four Noble Truths and Eightfold Path toward Nirvana and liberation from suffering.",
        sacredTextsOrPath: "Tripitaka (Pali Canon) and Mahayana Sutras",
      },
      {
        religion: "Hinduism",
        theisticType: "Polytheistic / Henotheistic",
        coreBeliefs: "Belief in Dharma (righteous duty), Karma (cosmic cause and effect), and Samsara (reincarnation).",
        sacredTextsOrPath: "Vedas, Upanishads, and the Bhagavad Gita",
      },
    ],
  },
  {
    id: 3,
    title: "Christian Ethics",
    shortTitle: "Ethics",
    color: "#0D5C75", // Teal
    badgeBg: "bg-cyan-100 text-cyan-900 border-cyan-300",
    textColor: "text-cyan-800",
    borderColor: "border-cyan-500",
    iconName: "Scale",
    description:
      "Biblical principles of moral theology and the practical duties of Christian believers in contemporary civil society.",
    topics: [
      {
        title: "Definition of Christian Ethics",
        subtopics: [
          "Philosophical versus theological ethics foundations",
          "The authority of scripture and the Holy Spirit in moral discernment",
          "Deontological, teleological, and virtue-based ethical frameworks",
        ],
      },
      {
        title: "Moral Teachings of Jesus Christ",
        subtopics: [
          "The Sermon on the Mount (Matthew 5-7)",
          "The Great Commandments: Love of God and love of neighbour",
          "Radical grace, forgiveness, and Kingdom ethics",
        ],
      },
      {
        title: "Duties of Christians towards Society",
        subtopics: [
          "Civic responsibility, justice, and obedience to lawful authorities",
          "Care for the vulnerable, impoverished, and marginalized",
          "Christian stewardship of environmental and economic resources",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Christian Counselling",
    shortTitle: "Counselling",
    color: "#5B2C83", // Royal Purple
    badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
    textColor: "text-purple-800",
    borderColor: "border-purple-500",
    iconName: "HeartHandshake",
    description:
      "Pastoral care methodologies integrating biblical truth with therapeutic understanding to support troubled hearts and minds.",
    topics: [
      {
        title: "Therapeutic Process",
        subtopics: [
          "Establishing the pastoral counselling covenant and trust",
          "Active listening, assessment, and spiritual diagnostics",
          "Integration of prayer, scriptural consolation, and clinical wisdom",
        ],
      },
      {
        title: "Basic Problems and Their Origin",
        subtopics: [
          "Spiritual crises, guilt, shame, and alienation from God",
          "Psychological trauma, bereavement, anxiety, and depression",
          "Relational breakdowns in family and church fellowships",
        ],
      },
      {
        title: "Situations of Problems",
        subtopics: [
          "Marital and domestic discord",
          "Addiction, dependency, and compulsive behaviors",
          "Terminal illness, aging, and end-of-life pastoral accompaniment",
        ],
      },
      {
        title: "Causes, Physical Aspects and Motives",
        subtopics: [
          "Biological and neurochemical influences on mental equilibrium",
          "Unconscious motivations and behavioural defense mechanisms",
          "The spiritual warfare dimension and discernment of spirits",
        ],
      },
      {
        title: "Methods of Focus",
        subtopics: [
          "Cognitive-spiritual reframing based on biblical promises",
          "Restorative reconciliation and pastoral confession",
          "Action-oriented goal setting and supportive accountability",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Christian Doctrines",
    shortTitle: "Doctrines",
    color: "#1E4C9F", // Blue
    badgeBg: "bg-blue-100 text-blue-900 border-blue-300",
    textColor: "text-blue-800",
    borderColor: "border-blue-500",
    iconName: "Church",
    description:
      "A systematic formulation of the classical tenets of the historic Christian faith and ecclesiastical ordinances.",
    topics: [
      { title: "Names of God", subtopics: ["Elohim, Yahweh, Adonai, and compound redemptive names of God"] },
      { title: "Salvation", subtopics: ["Atonement, justification by faith, regeneration, sanctification, and glorification"] },
      { title: "The Trinity", subtopics: ["One God in three co-equal, co-eternal Persons: Father, Son, and Holy Spirit"] },
      { title: "Doctrine of Man", subtopics: ["Imago Dei (Image of God), constitution of soul, spirit, and body"] },
      { title: "Doctrine of Sin", subtopics: ["Origin of sin (hamartiology), original sin, total depravity, and consequences"] },
      { title: "The Problem of Evil (Theodicy)", subtopics: ["Reconciling divine omnipotence and goodness with human suffering"] },
      { title: "Introduction to the Church", subtopics: ["Ecclesiology: Body of Christ, marks of the true Church, and global mission"] },
      { title: "Early Church Ordinances", subtopics: ["Water Baptism and the Holy Communion (The Lord's Supper)"] },
      {
        title: "Doctrine of Christ (Theology) & The Holy Spirit",
        subtopics: [
          "Hypostatic union of Christ: Fully God and fully human (Brochure 2 addition)",
          "Pneumatology: Person, gifts, and fruit of the Holy Spirit (Brochure 2 addition)",
        ],
        note: "Explicitly highlighted in Brochure 2 doctrine list",
      },
    ],
  },
  {
    id: 6,
    title: "Old Testament Theology",
    shortTitle: "O.T. Theology",
    color: "#7A4A1E", // Brown
    badgeBg: "bg-stone-200 text-stone-900 border-stone-400",
    textColor: "text-amber-950",
    borderColor: "border-amber-700",
    iconName: "Scroll",
    description:
      "Theological synthesis of the Hebrew Bible exploring the divine covenant, redemptive history, and the hope of Israel.",
    topics: [
      { title: "History and Method", subtopics: ["Thematic versus historical-chronological approaches to O.T. theology"] },
      { title: "Nature and Names of God", subtopics: ["Divine holiness, sovereignty, righteousness, and loving-kindness (Hesed)"] },
      { title: "Divine Revelation", subtopics: ["God speaking through theophanies, prophets, historical acts, and torah"] },
      { title: "Creation", subtopics: ["Cosmology of Genesis 1-2, divine order, and humanity as stewards"] },
      { title: "Providence of God", subtopics: ["God's sovereign governance of nations, history, and individual lives"] },
      { title: "The Problem of Evil (Theodicy)", subtopics: ["Perspectives from the Book of Job, Habakkuk, and the Psalms of Lament"] },
      { title: "Identity, Origin and Nature of Humanity", subtopics: ["Creation in God's image, dignity, moral agency, and human frailty"] },
      { title: "Covenant", subtopics: ["Noahic, Abrahamic, Mosaic, Davidic, and the Prophesied New Covenant"] },
      { title: "Theocracy", subtopics: ["God's direct rule over Israel prior to the monarchy and prophetic critique"] },
      { title: "Law (and Grace)", subtopics: ["Moral, civil, and ceremonial laws; divine justice reflecting holy character (Brochure 2 adds 'and Grace')"] },
      { title: "Sacrifice and Worship", subtopics: ["The Levitical sacrificial system, tabernacle, temple, and true heart devotion"] },
      { title: "Redemption and Mission", subtopics: ["The Exodus archetype of deliverance and Israel's call as a light to nations"] },
      { title: "Ultimate Hope and Future of Humanity", subtopics: ["Messianic expectations, Day of the Lord, resurrection, and the age to come"] },
    ],
  },
  {
    id: 7,
    title: "New Testament",
    shortTitle: "New Testament",
    color: "#0B1F4B", // Deep Navy
    badgeBg: "bg-indigo-100 text-indigo-950 border-indigo-300",
    textColor: "text-indigo-950",
    borderColor: "border-indigo-600",
    iconName: "BookOpenCheck",
    description:
      "Comprehensive examination of the 27 New Testament books, their historical composition, textual transmission, and apostolic doctrine.",
    topics: [
      {
        title: "Name, Description and Origin of the New Testament",
        subtopics: [
          "The 'New Covenant' concept in Jeremiah 31 and fulfilled in Christ",
          "Occasion, date, authorship, and audience of the Gospels and Epistles",
          "Brochure 2 variant: 'Name, Designation and Origin of the New Testament'",
        ],
      },
      {
        title: "Transmission of the Text",
        subtopics: [
          "Papyrus manuscripts, uncials, and minuscules",
          "Textual criticism principles: Alexandrian, Western, and Byzantine families",
          "Translation history into Syriac, Latin, and modern vernaculars",
        ],
      },
      {
        title: "Contents of the New Testament",
        subtopics: [
          "Synoptic Gospels and the Fourth Gospel (John)",
          "Acts of the Apostles and the early missionary expansion",
          "Pauline corpus, Catholic Epistles, and the Apocalypse of John",
        ],
      },
      {
        title: "History",
        subtopics: [
          "First-century Greco-Roman and Second Temple Jewish context",
          "The Roman imperium, emperors, governors, and Jewish sects",
          "Persecution of the early Christians under Nero, Domitian, and Trajan",
        ],
      },
      {
        title: "Doctrines",
        subtopics: [
          "Christology, Soteriology, and Pneumatology in apostolic preaching",
          "Justification, the New Creation, and Christian fellowship (Koinonia)",
          "Eschatology: The Parousia, resurrection of the dead, and the Kingdom of God",
        ],
      },
    ],
  },
];
