export interface SpecialisationCourse {
  title: string;
  code?: string;
  description: string;
  credits?: number;
  highlight?: boolean;
}

export interface SpecialisationSection {
  heading: string;
  subheading?: string;
  courses: SpecialisationCourse[];
}

export interface LanguageGlyph {
  language: string;
  scriptName: string;
  primaryGlyph: string;
  sampleGlyphs: string[];
  description: string;
  importance: string;
}

export interface SpecialisationData {
  slug: string;
  title: string;
  shortCode: string;
  badge: string;
  accentColor: string;
  bannerDescription: string;
  overview: string;
  prerequisites: string;
  sections: SpecialisationSection[];
  languageGlyphs?: LanguageGlyph[];
  relatedSlugs: string[];
}

export const specialisationsList: SpecialisationData[] = [
  {
    slug: "systematic-theology",
    title: "Systematic Theology (S.T.)",
    shortCode: "S.T.",
    badge: "Core Discipline",
    accentColor: "#1E4C9F",
    bannerDescription:
      "Advanced doctrinal research addressing suffering, postmodernism, postcolonial theology, culture, media, and ecumenical dialogues.",
    overview:
      "The Systematic Theology concentration provides advanced scholars with tools to construct coherent biblical dogmatics while critically engaging contemporary philosophies, psychological insights, and societal realities.",
    prerequisites: "Foundational coursework in Christian Doctrines and Biblical Hermeneutics.",
    sections: [
      {
        heading: "Primary Advanced Treatises (S.T.)",
        subheading: "Advanced modular research seminars transcribed from official curriculum",
        courses: [
          {
            title: "Feminist Hermeneutics & Theology",
            description: "Critique of patriarchal hermeneutics and reconstruction of liberating theological perspectives.",
          },
          {
            title: "How Do Human Beings Understand Suffering?",
            description: "Theological, pastoral, and philosophical inquiries into human pain, grief, and the problem of evil.",
          },
          {
            title: "Theology in Films and Mass Media",
            description: "Discerning implicit religious themes, redemption narratives, and existential worldviews in visual media.",
          },
          {
            title: "The Cross and Atonement - Theories and Modern Critiques",
            description: "Classical, penal substitutionary, moral influence, and Christus Victor models analyzed under modern scrutiny.",
          },
          {
            title: "Depth Psychology and Theology",
            description: "Jungian, Freudian, and psychoanalytic concepts integrated with Christian anthropology and spiritual formation.",
          },
          {
            title: "Violence Against Women and Children: Theological, Pastoral, Ethical and Social Perspectives",
            description: "Critical pastoral investigation of domestic abuse, institutional violence, and ecclesiastical responses.",
          },
          {
            title: "The Impact of Postmodernism and Postcolonial Theories on Contemporary Theology",
            description: "Deconstructing imperial theological paradigms; exploring non-Western contextual theologizing.",
          },
          {
            title: "Guided Readings on the Christian Spiritual Life",
            description: "Classics of Christian mysticism, monastic rules, Desert Fathers, and Protestant devotional masters.",
          },
          {
            title: "Guided Readings on Jesus and Power",
            description: "Biblical study of political authority, servanthood, subversive discipleship, and Kingdom reign.",
          },
          {
            title: "Ecumenism and Interfaith Dialogue",
            description: "Conciliar movements, inter-confessional dialogue, and mutual understanding in multi-faith societies.",
          },
        ],
      },
      {
        heading: "Additional Courses in S.T.",
        subheading: "Supplementary contextual seminars listed under curriculum division",
        courses: [
          {
            title: "Introduction to Asian Theologies",
            description: "Survey of Dalit theology, Minjung theology, and indigenous Indian Christian theological traditions.",
          },
          {
            title: "Seminar on Christology",
            description: "Classical patristic councils (Chalcedon) through modern contextual christological formulations.",
          },
          {
            title: "Eco-Theology",
            description: "Biblical stewardship, creation spirituality, and ecological redemption in an age of climate crisis.",
          },
          {
            title: "Eco-Feminism",
            description: "Exploring the interconnected exploitation of women and the earth from theological viewpoints.",
          },
          {
            title: "Earth-Centered Spiritualities",
            description: "Indigenous earth-affirming wisdom traditions harmonized with biblical creation accounts.",
          },
          {
            title: "Topics on Ecumenism, Justice, Peace and Reconciliation",
            description: "Conflict transformation, ecclesiastical mediation, and collaborative peacemaking across communities.",
          },
        ],
      },
    ],
    relatedSlugs: ["christian-ethics", "research-methodologies", "theological-institutes"],
  },
  {
    slug: "new-testament",
    title: "New Testament Electives (N.T.)",
    shortCode: "N.T.",
    badge: "Biblical Exegesis",
    accentColor: "#1E6B3A",
    bannerDescription:
      "In-depth apostolic literature, advanced Greek reading, Johannine writings, Revelation, and Third World perspectives.",
    overview:
      "The New Testament specialisation enables ministers and scholars to engage the original apostolic writings through rigorous linguistic, historical, and socio-rhetorical hermeneutics.",
    prerequisites: "Introductory Greek grammar and New Testament survey.",
    sections: [
      {
        heading: "New Testament Specialisation Courses (N.T.)",
        subheading: "Electives and advanced seminars from Brochure Section 4",
        courses: [
          {
            title: "Seminar on Early Christian Literature",
            description: "Apostolic Fathers, Didache, Clement of Rome, and Ignatius in relation to the NT canon.",
          },
          {
            title: "Seminar on Revelation",
            description: "Apocalyptic symbolism, historical-critical approaches, and theological triumph in the Apocalypse of John.",
          },
          {
            title: "Advanced Greek Reading",
            description: "Syntactical analysis and sight-reading of selected passages across the Pauline and Johannine corpora.",
          },
          {
            title: "Epistle to the Galatians",
            description: "Pauline justification by faith, the law versus grace, and freedom in the Spirit.",
          },
          {
            title: "John and Johannine Writings",
            description: "Distinctive high Christology, the Farewell Discourses, and the Epistles of John.",
          },
          {
            title: "Heaven and Hell in the New Testament",
            description: "Eschatological imagery of Gehenna, Sheol, the New Jerusalem, and the intermediate state.",
          },
          {
            title: "Guided Research",
            description: "Individual supervised scholarly investigation culminating in an exegesis paper.",
          },
          {
            title: "Feminist Biblical Hermeneutics",
            description: "Analyzing women in the Jesus movement, Pauline house churches, and female leadership in the NT.",
          },
          {
            title: "Reading the Bible from Third World Perspective",
            description: "Contextual exegesis addressing socio-economic realities, colonialism, and cultural identity.",
          },
          {
            title: "Aramaic Language",
            description: "Linguistic fundamentals of the Semitic tongue spoken by Jesus and early Galilean disciples.",
          },
        ],
      },
    ],
    relatedSlugs: ["systematic-theology", "ancient-languages", "elective-courses"],
  },
  {
    slug: "christian-ethics",
    title: "Christian Ethics (C.E.)",
    shortCode: "C.E.",
    badge: "Moral Theology",
    accentColor: "#B3202A",
    bannerDescription:
      "Moral philosophy, Dietrich Bonhoeffer, human rights, social thought, and theological perspectives on justice.",
    overview:
      "This curriculum equips Christian leaders to navigate the moral crises of modern civilization with prophetic clarity, biblical integrity, and deep pastoral compassion.",
    prerequisites: "Introductory Christian Ethics and Systematic Theology.",
    sections: [
      {
        heading: "Advanced Seminars in Christian Ethics (C.E.)",
        courses: [
          {
            title: "Seminar on Christian Ethics",
            description: "Foundational seminar examining moral normativity, divine command theory, and natural law.",
          },
          {
            title: "Justice, Peace and Human Rights",
            description: "Biblical roots of universal human dignity, rights discourse, and restorative justice practices.",
          },
          {
            title: "Readings in Feminist Christian Ethics",
            description: "Engaging contemporary women ethicists on care, bodily autonomy, and institutional transformation.",
          },
          {
            title: "Seminar on Dietrich Bonhoeffer",
            description: "Cost of Discipleship, Letters and Papers from Prison, religionless Christianity, and resistance ethics.",
          },
          {
            title: "Seminar on Biblical Ethics",
            description: "Old Testament covenant moral mandates contrasted and fulfilled in the New Testament ethical call.",
          },
          {
            title: "Violence Against Women and Theology",
            description: "A theological critique of gender-based violence, domestic terror, and structural complicity.",
          },
        ],
      },
      {
        heading: "Main Topics in Christian Ethics (C.E.)",
        subheading: "Curricular pillars defining social thought and philosophical ethics",
        courses: [
          {
            title: "Basic Issues in Christian Ethics",
            description: "Moral dilemmas, bioethics, abortion, euthanasia, war, and capital punishment.",
          },
          {
            title: "History of Christian Social Thought",
            description: "From patristic hospitality to Catholic Social Teaching and the Protestant Social Gospel.",
          },
          {
            title: "Christianity, Justice and Culture",
            description: "The tension between Christ and culture; transformational witness in pluralistic environments.",
          },
          {
            title: "Philosophical Ethics",
            description: "Aristotelian virtue, Kantian deontology, and utilitarianism evaluated from Christian revelation.",
          },
        ],
      },
    ],
    relatedSlugs: ["systematic-theology", "elective-courses", "theological-institutes"],
  },
  {
    slug: "elective-courses",
    title: "Elective Courses & Seminars",
    shortCode: "ELECTIVES",
    badge: "Interdisciplinary",
    accentColor: "#5B2C83",
    bannerDescription:
      "Apocalyptic literature, Minor Prophets, Book of Psalms, Third World perspectives, and specialized research tracks.",
    overview:
      "A rich catalogue of modular electives enabling candidates to tailor their theological training to specific pastoral, academic, or missional callings.",
    prerequisites: "General Bible Survey and hermeneutics fundamentals.",
    sections: [
      {
        heading: "Curriculum Elective Courses",
        courses: [
          {
            title: "Seminar on Apocalyptic & Intertestamental Literature",
            description: "Enoch, Maccabees, Jubilees, and the theological climate between Malachi and Matthew.",
          },
          {
            title: "Seminar on Minor Prophets",
            description: "Amos, Hosea, Micah, and Habakkuk: the prophetic cry for socio-economic justice and divine mercy.",
          },
          {
            title: "Seminar on Biblical Ethics",
            description: "Applied moral discernment across both biblical testaments.",
          },
          {
            title: "Seminar on the Book of Psalms",
            description: "Hebrew poetry, genres of praise and lament, liturgical usage, and messianic foreshadowing.",
          },
          {
            title: "Guided Research",
            description: "Mentored independent investigation into a self-selected biblical monograph topic.",
          },
          {
            title: "Feminist Biblical Hermeneutics",
            description: "Re-reading canonical texts with an awareness of gender, culture, and biblical womanhood.",
          },
          {
            title: "Reading the Bible from Third World Perspective",
            description: "Contextual theological reflection from African, Asian, and Latin American ecclesial communities.",
          },
          {
            title: "Aramaic Language",
            description: "Biblical Aramaic found in Ezra and Daniel, along with Targumic traditions.",
          },
        ],
      },
    ],
    relatedSlugs: ["new-testament", "systematic-theology", "ancient-languages"],
  },
  {
    slug: "theological-institutes",
    title: "Review of the Institutes of the Christian Religion",
    shortCode: "INSTITUTES",
    badge: "Reformation & Discourse",
    accentColor: "#7A4A1E",
    bannerDescription:
      "Detailed study of John Calvin's monumental masterwork, alongside societal, religious, and theological discourses on sexuality.",
    overview:
      "This specialized track interrogates the foundational architecture of Protestant systematic theology alongside pressing contemporary ethical conversations regarding human sexuality and divine order.",
    prerequisites: "Church History and Systematic Theology.",
    sections: [
      {
        heading: "Institutes & Modern Discourse Topics",
        courses: [
          {
            title: "Review of John Calvin's 'Institutes of the Christian Religion'",
            description:
              "Systematic line-by-line reading of Calvin's 1559 magnum opus: Knowledge of God the Creator, Redeemer in Christ, Holy Spirit, and Holy Catholic Church.",
            highlight: true,
          },
          {
            title: "Study of Sexuality in Societal, Religious and Theological Discourses",
            description:
              "A careful, respectful, and academically grounded examination of biblical sexuality, societal shifts, and ecclesiastical pastoral theology.",
            highlight: true,
          },
        ],
      },
    ],
    relatedSlugs: ["systematic-theology", "christian-ethics"],
  },
  {
    slug: "ancient-languages",
    title: "Language Options: Biblical Hebrew, Aramaic & Greek",
    shortCode: "LANGUAGES",
    badge: "Original Biblical Tongues",
    accentColor: "#0D5C75",
    bannerDescription:
      "Master the original sacred languages of scripture: Biblical Hebrew (ת/מ), Aramaic (Syriac), and Koine Greek (α/Ω).",
    overview:
      "Unlocking the deepest riches of the biblical text by equipping students with the tools to translate, parse, and exegete the Old Testament in Hebrew and Aramaic, and the New Testament in Koine Greek.",
    prerequisites: "Open to all enrolled students with dedication to disciplined linguistic study.",
    sections: [
      {
        heading: "The Three Sacred Biblical Languages",
        courses: [
          {
            title: "Biblical Hebrew",
            description:
              "Alphabet, vowel pointings, morphology, strong and weak verb paradigms, syntax, and exegesis of the Torah and Historical books.",
          },
          {
            title: "Aramaic Language",
            description:
              "Grammar of Biblical and Imperial Aramaic, translation of Aramaic portions in Daniel 2-7 and Ezra 4-7, and early Syriac Peshitta studies.",
          },
          {
            title: "Greek Language (Koine)",
            description:
              "First-century Hellenistic Greek alphabet, noun declensions, verbal conjugations, prepositions, and exegetical translation of the Gospel of Mark and 1 John.",
          },
        ],
      },
    ],
    languageGlyphs: [
      {
        language: "Biblical Hebrew",
        scriptName: "Ktav Ashuri (Square Script)",
        primaryGlyph: "ת / מ",
        sampleGlyphs: ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"],
        description: "The sacred tongue in which the vast majority of the Tanakh (Old Testament) was penned.",
        importance: "Essential for Old Testament exegesis, theological depth, and understanding covenant vocabulary.",
      },
      {
        language: "Aramaic Language",
        scriptName: "Imperial / Syriac Aramaic",
        primaryGlyph: "ܐ / ܒ / ܫ",
        sampleGlyphs: ["ܐ", "ܒ", "ܓ", "ܕ", "ܗ", "ܘ", "ܙ", "ܚ", "ܛ", "ܝ", "ܟ", "ܠ", "ܡ", "ܢ", "ܣ", "ܥ", "ܦ", "ܨ", "ܩ", "ܪ", "ܫ", "ܬ"],
        description: "The Semitic lingua franca of the ancient Near East and the spoken mother tongue of Jesus.",
        importance: "Preserves key portions of Daniel, Ezra, and early Christian oriental liturgical literature.",
      },
      {
        language: "Koine Greek",
        scriptName: "Hellenistic Greek",
        primaryGlyph: "α / Ω / θ",
        sampleGlyphs: ["Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"],
        description: "The international common language in which the entire New Testament was authored by the Apostles.",
        importance: "Indispensable for accurate textual interpretation, doctrinal clarity, and apostolic theology.",
      },
    ],
    relatedSlugs: ["new-testament", "systematic-theology", "elective-courses"],
  },
];
