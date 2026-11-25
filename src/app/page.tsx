import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Crest } from "@/components/ui/Crest";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LText } from "@/components/ui/LocalizedText";
import { StatsStrip } from "@/components/home/StatsStrip";
import { AffiliationsStrip } from "@/components/home/AffiliationsStrip";
import { institutionConfig } from "@/data/config";
import { allDegreesOffered, ordinanceCourses, schoolsAndDivisions } from "@/data/academics";
import { biblicalMinistryModules } from "@/data/curriculum";
import { governingCouncil } from "@/data/governance";
import { administrativeCentres } from "@/data/centres";
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Users,
  CheckCircle,
  Printer,
  Download,
  ScrollText,
} from "lucide-react";

export default function HomePage() {
  const featuredModules = biblicalMinistryModules.slice(0, 3);
  const featuredDegrees = allDegreesOffered.slice(0, 6);
  const hqCentre =
    administrativeCentres.find((c) => c.isHeadquarters) || administrativeCentres[0];
  const regionalCentres = administrativeCentres.filter((c) => !c.isHeadquarters);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. SUNLIT SANCTUARY PANORAMA HERO (Full-Screen Width & Above-Fold Precision) */}
      <section className="relative bg-[#FAF7F0] text-navy-950 overflow-hidden lg:min-h-[560px] xl:min-h-[580px] 2xl:min-h-[660px] flex flex-col lg:justify-center">
        {/* Mobile: Clear Unobstructed Top Sanctuary Plate | Desktop: Full-Bleed Vivid Hero Backdrop */}
        <div className="relative h-56 sm:h-72 w-full lg:absolute lg:inset-0 lg:h-full overflow-hidden border-b-2 border-gold-400/60 lg:border-b-0">
          <Image
            src="/images/theological-heritage.jpg"
            alt="Sunlit sanctuary theology library with an open illuminated Holy Bible on a carved wooden lectern and a glowing taper candle"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[76%_center] brightness-105 contrast-[1.04] pointer-events-none select-none"
          />
          {/* Subtle top/bottom warm edge vignette on desktop without muting the glowing Bible & candle */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(100deg, rgb(250, 247, 240) 0%, rgb(250, 247, 240) 35%, rgba(250, 247, 240, 0.94) 47%, rgba(250, 247, 240, 0.42) 60%, rgba(250, 247, 240, 0) 74%)",
            }}
            aria-hidden="true"
          />
          <div
            className="hidden lg:block absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#061026]/35 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Hero Foreground Editorial Canvas & Bottom-Right Curatorial Spotlight */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-8 sm:py-10 lg:py-9 xl:py-10 2xl:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Editorial Stage (Sunlit Ivory Contrast Zone) */}
            <div className="lg:col-span-7 2xl:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start tiu-hero-stagger">
              {/* Institutional Crest + Diocesan Authority Pill */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-3.5 mb-4">
                <div className="p-1.5 rounded-xl bg-navy-950 border border-gold-400/60 shadow-md shrink-0">
                  <Crest size={50} />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-950 border border-gold-400/70 text-gold-300 text-xs sm:text-[13px] font-bold uppercase tracking-widest shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" aria-hidden="true" />
                    <span>{institutionConfig.diocesanAffiliation}</span>
                  </span>
                  <span className="text-xs sm:text-sm text-slate-700 mt-1 font-semibold">
                    {institutionConfig.subheading}
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[48px] xl:text-[52px] 2xl:text-[64px] font-extrabold tracking-tight text-navy-950 leading-[1.05]">
                {institutionConfig.institutionName}
              </h1>

              <div className="w-24 h-1 bg-gold-500 rounded-full my-3" aria-hidden="true" />

              <p className="text-lg sm:text-xl 2xl:text-2xl text-gold-800 font-serif italic font-semibold max-w-2xl">
                &ldquo;{institutionConfig.tagline}&rdquo;
              </p>

              <p className="mt-2.5 text-sm sm:text-base 2xl:text-lg text-slate-700 max-w-2xl leading-relaxed font-medium">
                Empowering called ministers, pastors, and theological scholars with faithful
                doctrinal instruction, biblical languages (Hebrew, Aramaic &amp; Koine Greek), and
                ecclesiastical ordination from B.Th. to Ph.D.
              </p>

              {/* High-Contrast Conversion Actions */}
              <div className="mt-5 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto">
                <Button
                  href="/academics"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-lg"
                  icon={<GraduationCap className="w-5 h-5 text-gold-300" />}
                >
                  Explore Programmes
                </Button>
                <Button
                  href="/admissions#apply"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Apply Now
                </Button>
                <a
                  href="/trinity-programme-overview.pdf"
                  download="University-of-Trinity-International-Programme-Overview.pdf"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-navy-950 hover:text-gold-800 underline decoration-gold-600/70 min-h-[44px]"
                >
                  <Download className="w-4 h-4 text-gold-700 shrink-0" aria-hidden="true" />
                  <span>Overview PDF</span>
                </a>
              </div>

              {/* Statutory Trust & Headquarters Bar */}
              <div className="mt-5 pt-3.5 border-t border-gold-400/50 w-full flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 text-xs sm:text-sm text-slate-800 font-semibold">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4 text-gold-700 shrink-0" aria-hidden="true" />
                  <span>Regd. Indian Trusts Act, 1882</span>
                </span>
                <span className="text-gold-700" aria-hidden="true">
                  •
                </span>
                <span className="whitespace-nowrap">
                  TN:{" "}
                  <strong className="text-navy-950">
                    {institutionConfig.registrations.tamilNadu.number}
                  </strong>
                </span>
                <span className="text-gold-700" aria-hidden="true">
                  •
                </span>
                <span className="whitespace-nowrap">
                  KA:{" "}
                  <strong className="text-navy-950">
                    {institutionConfig.registrations.karnataka.number}
                  </strong>
                </span>
                <span className="text-gold-700" aria-hidden="true">
                  •
                </span>
                <span className="whitespace-nowrap">
                  HQ: <strong className="text-navy-950">YGM – Bangalore</strong>
                </span>
              </div>
            </div>

            {/* Right Open Sanctuary Stage (Only Compact Bottom-Right Spotlight — Photo Stays 100% Uncovered) */}
            <div className="hidden lg:flex lg:col-span-5 2xl:col-span-6 justify-end items-end">
              <Link
                href="/curriculum"
                className="group max-w-[430px] bg-white/95 hover:bg-white backdrop-blur-md border border-gold-400/80 hover:border-gold-500 rounded-2xl p-4 shadow-2xl transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 flex items-center gap-4"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gold-400/60 bg-navy-950">
                  <Image
                    src="/images/scriptural-languages.jpg"
                    alt="Ancient parchment scrolls and biblical language manuscripts"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold tracking-tight text-gold-800 block">
                    Founder: {governingCouncil.founderChairman.name}
                  </span>
                  <span className="font-serif text-base font-bold text-navy-950 group-hover:text-gold-800 block leading-snug mt-0.5">
                    {allDegreesOffered.length} Degrees &amp; {biblicalMinistryModules.length} Core Modules
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                    <span>Hebrew, Aramaic &amp; Greek</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-gold-700 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTHORITY STATS STRIP */}
      <StatsStrip />

      {/* 3. THEOLOGICAL FOUNDATION & SPLIT VISUAL ACADEMIC SCHOOLS */}
      <section className="py-16 sm:py-22 bg-ivory">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-400 text-gold-900 text-xs font-bold uppercase tracking-wider">
                <span>Theological Foundation</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl xl:text-[42px] font-bold text-navy-950 leading-tight">
                Rooted in Scripture, Dedicated to Kingdom Ministry
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl">
                <LText
                  en="University of Trinity International is committed to Biblical truth, academic excellence, and Kingdom service. Legally constituted under the Christian Legal Rites and Traditions, our programmes prepare servant leaders for ministerial ordinations, pastoral chaplaincy, and biblical exegesis."
                  ta="யுனிவர்சிட்டி ஆஃப் டிரினிட்டி இன்டர்நேஷனல் வேதாகம சத்தியம், கல்வித் தரம் மற்றும் திருச்சபை சேவைக்கு அர்ப்பணிக்கப்பட்டுள்ளது."
                />
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-slate-800">
                    <strong className="text-navy-950 font-bold">Ecclesiastical Integrity:</strong>{" "}
                    Structured under the Christian Legal Rites and Traditions for ministerial excellence.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-slate-800">
                    <strong className="text-navy-950 font-bold">Modular &amp; Multi-Centre:</strong>{" "}
                    Headquartered at YGM – Bangalore with {administrativeCentres.length} centres across India, Malaysia, and Georgia (USA).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-slate-800">
                    <strong className="text-navy-950 font-bold">Original Languages:</strong>{" "}
                    Exegetical instruction in Biblical Hebrew, Aramaic, and Koine Greek.
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <Button href="/about" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Learn More About Our Heritage
                </Button>
              </div>
            </div>

            {/* School / Division Visual Cards */}
            <div className="lg:col-span-6 space-y-5">
              {schoolsAndDivisions.map((division) => {
                const isBiblicalStudies = division.id === "school-of-biblical-studies";
                const divisionImg = isBiblicalStudies
                  ? "/images/scriptural-languages.jpg"
                  : "/images/sanctuary-arch.svg";
                const divisionAlt = isBiblicalStudies
                  ? "Parchment scrolls, calligraphy pen, and ancient biblical study manuscripts"
                  : "Illuminated sanctuary arch representing Christian ministerial education and church leadership";
                return (
                  <div
                    key={division.id}
                    className="rounded-2xl bg-white border border-slate-300 shadow-card hover:border-gold-400 hover:shadow-hover transition-[border-color,box-shadow] duration-200 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12">
                      <div className="sm:col-span-5 relative aspect-[3/2] sm:aspect-auto bg-navy-950">
                        <Image
                          src={divisionImg}
                          alt={divisionAlt}
                          width={1200}
                          height={800}
                          unoptimized={!isBiblicalStudies}
                          sizes="(max-width: 640px) 100vw, 240px"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-gold-900 bg-gold-100 px-2.5 py-1 rounded-full border border-gold-300">
                              {division.badge}
                            </span>
                            <BookOpen className="w-4 h-4 text-navy-800" aria-hidden="true" />
                          </div>
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-950">
                            {division.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed">
                            {division.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <Link
                            href="/academics#schools"
                            className="text-xs font-bold font-sans text-navy-900 hover:text-gold-800 inline-flex items-center gap-1 min-h-[36px] px-1 rounded"
                          >
                            <span>Explore Curricula</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEGREES & ORDINANCE TRACKS SECTION */}
      <section className="py-16 sm:py-22 bg-white border-y border-slate-200">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
          <SectionHeader
            badge="Ecclesiastical Qualifications"
            title="Degrees & Ministerial Programmes"
            subtitle="Conferred under the Christian Legal Rites and Traditions across Bachelor's, Master's, Doctoral, and Ordinance pathways."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDegrees.map((deg) => (
              <Card key={deg.code} borderGold className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="navy">{deg.level}</Badge>
                    <span className="text-xs font-bold text-gold-800">{deg.duration}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-navy-950">{deg.code}</h3>
                  <p className="text-xs font-bold text-gold-800 uppercase tracking-wider mb-2">
                    {deg.title}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {deg.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/academics"
                    className="text-xs font-bold font-sans text-navy-900 hover:text-gold-800 inline-flex items-center gap-1 min-h-[36px] px-1 rounded"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/admissions#apply"
                    className="text-xs font-bold text-gold-800 hover:text-gold-950 min-h-[36px] px-2 inline-flex items-center rounded"
                  >
                    Enrol →
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Dedicated Ordinance Tracks Callout Ribbon */}
          <div className="mt-10 rounded-2xl bg-navy-950 text-white border border-gold-400/50 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-300">
                <ScrollText className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
                <span>Holy Orders &amp; Ministerial Commissioning</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {ordinanceCourses.length} Ecclesiastical Ordinance Tracks
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Structured preparation for{" "}
                <strong className="text-gold-300">
                  {ordinanceCourses.map((o) => o.title.replace(" Track", "")).join(" • ")}
                </strong>{" "}
                ordained service under Diocesan oversight.
              </p>
            </div>
            <Button
              href="/academics"
              variant="gold"
              className="shrink-0"
              icon={<GraduationCap className="w-4 h-4" />}
            >
              View All {allDegreesOffered.length} Degrees &amp; Ordinance Tracks
            </Button>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CURRICULUM MODULES */}
      <section className="py-16 sm:py-22 bg-ivory">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
          <SectionHeader
            badge="Biblical Ministry Studies"
            title="Curriculum & Course Highlights"
            subtitle="Core theological progression across biblical exegesis, world religions, ethics, counselling, doctrines, and biblical theologies."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredModules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white rounded-2xl p-6 border border-slate-300 hover:border-gold-400 shadow-card hover:shadow-hover transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border whitespace-nowrap ${mod.badgeBg}`}
                    >
                      Module {mod.id}
                    </span>
                    <span className="text-xs text-slate-800 font-bold">{mod.shortTitle}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy-950 mb-2">{mod.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">
                    {mod.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Included Topics:
                    </span>
                    <ul className="text-xs text-slate-800 font-medium space-y-1.5">
                      {mod.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-gold-700 shrink-0 mt-1.5"
                            aria-hidden="true"
                          />
                          <span>{topic.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/curriculum#module-${mod.id}`}
                    className="text-xs font-bold font-sans text-navy-900 hover:text-gold-800 inline-flex items-center gap-1 min-h-[36px] px-1 rounded"
                  >
                    <span>Inspect Module Topics</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/curriculum" variant="gold" icon={<BookOpen className="w-4 h-4" />}>
              Explore Full 7-Module Curriculum Details
            </Button>
          </div>
        </div>
      </section>

      {/* 6. PILLARS OF STUDY & EDITORIAL GALLERY */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-800 block mb-1">
              Visualising Our Calling
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
              Pillars of Study &amp; Ministerial Formation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                href: "/about",
                src: "/images/theological-heritage.jpg",
                unoptimized: false,
                alt: "Open antique Holy Bible resting beside glowing candle in chapel archive",
                title: "Scriptural Heritage",
                sub: "Christian Legal Rites & Traditions",
              },
              {
                href: "/academics/ancient-languages",
                src: "/images/scriptural-languages.jpg",
                unoptimized: false,
                alt: "Rolled parchment scrolls, brass loupe, and calligraphy stylus for biblical languages",
                title: "Biblical Languages",
                sub: "Hebrew, Aramaic & Koine Greek",
              },
              {
                href: "/curriculum",
                src: "/images/ministry-modules-emblem.svg",
                unoptimized: true,
                alt: "Golden seven-branch sanctuary lampstand symbolizing seven core ministry modules",
                title: "7 Ministry Modules",
                sub: "Doctrines, Ethics & Counselling",
              },
              {
                href: "/doctoral",
                src: "/images/doctoral-library-compendium.svg",
                unoptimized: true,
                alt: "Classical seminary research library archive and gilt doctoral treatise seal",
                title: "Doctoral Research",
                sub: "D.P., Ph.D. & Sacred Scholarship",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-300 shadow-sm hover:border-gold-400 hover:shadow-md transition-[border-color,box-shadow] duration-200 flex flex-col"
              >
                <div className="relative aspect-[3/2] bg-navy-950 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={800}
                    unoptimized={item.unoptimized}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-base text-navy-950 group-hover:text-gold-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-700 mt-0.5">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GOVERNING COUNCIL LEADERSHIP */}
      <section className="py-16 sm:py-22 bg-white border-y border-slate-200">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
          <SectionHeader
            badge="Diocesan Oversight"
            title="Great Governing Council Leaders"
            subtitle="Leaders and executive directors stewarding institutional governance, biblical scholarship, and pastoral formation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-navy-950 bg-gradient-to-b from-navy-950 to-navy-900 text-white border border-gold-400 shadow-xl flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center font-serif text-2xl font-bold text-gold-300 mb-4 shadow-gold"
                aria-hidden="true"
              >
                {governingCouncil.founderChairman.initials}
              </div>
              <span className="text-xs uppercase tracking-wider text-gold-300 font-bold mb-1">
                {governingCouncil.founderChairman.title}
              </span>
              <h3 className="font-serif text-lg font-bold text-white">
                {governingCouncil.founderChairman.name}
              </h3>
              <p className="text-xs text-gold-200 font-medium mt-1 leading-snug">
                {governingCouncil.founderChairman.credentials}
              </p>
              <p className="text-xs text-slate-200 mt-3 leading-relaxed text-left">
                {governingCouncil.founderChairman.description}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-300 shadow-card hover:border-gold-400 flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-serif text-2xl font-bold text-navy-900 mb-4"
                aria-hidden="true"
              >
                {governingCouncil.generalSecretary.initials}
              </div>
              <span className="text-xs uppercase tracking-wider text-navy-900 font-bold mb-1">
                {governingCouncil.generalSecretary.title}
              </span>
              <h3 className="font-serif text-lg font-bold text-navy-950">
                {governingCouncil.generalSecretary.name}
              </h3>
              <p className="text-xs text-slate-700 font-semibold mt-1 leading-snug">
                {governingCouncil.generalSecretary.credentials}
              </p>
              <p className="text-xs text-slate-700 mt-3 leading-relaxed text-left">
                {governingCouncil.generalSecretary.description}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-300 shadow-card hover:border-gold-400 flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-serif text-2xl font-bold text-navy-900 mb-4"
                aria-hidden="true"
              >
                {governingCouncil.viceChairman.initials}
              </div>
              <span className="text-xs uppercase tracking-wider text-navy-900 font-bold mb-1">
                {governingCouncil.viceChairman.title}
              </span>
              <h3 className="font-serif text-lg font-bold text-navy-950">
                {governingCouncil.viceChairman.name}
              </h3>
              <p className="text-xs text-slate-700 font-semibold mt-1 leading-snug">
                {governingCouncil.viceChairman.credentials}
              </p>
              <p className="text-xs text-slate-700 mt-3 leading-relaxed text-left">
                {governingCouncil.viceChairman.description}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button href="/governance" variant="outline" icon={<Users className="w-4 h-4" />}>
              Meet Executive Directors &amp; Full Council
            </Button>
          </div>
        </div>
      </section>

      {/* 8. AFFILIATED BY STRIP */}
      <AffiliationsStrip />

      {/* 9. HEAD QUARTERS YGM – BANGALORE & ADMINISTRATIVE CENTRES */}
      <section className="py-16 sm:py-22 bg-ivory">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
          <SectionHeader
            badge="Geographical Reach"
            title="Head Quarters & Administrative Centres"
            subtitle="Central coordination from Head Quarters YGM – Bangalore across regional Indian offices and overseas liaison hubs."
          />

          {/* Flagship HQ Card + Global Network Illustration */}
          <div className="bg-navy-950 text-white rounded-3xl border border-gold-400/60 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center mb-8">
            <div className="lg:col-span-7 p-7 sm:p-10 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500 text-navy-950 inline-block">
                Head Quarters
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {hqCentre.name}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed max-w-xl">
                {hqCentre.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button href={`/contact?centre=${hqCentre.id}`} variant="gold" size="sm">
                  Enquire with YGM – Bangalore HQ
                </Button>
                <Link
                  href="/centres"
                  className="text-xs font-bold text-gold-300 hover:text-white underline min-h-[36px] inline-flex items-center px-1"
                >
                  Inspect Full Network Directory →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Image
                src="/images/global-diocese-fellowship.svg"
                alt="Global network connecting Head Quarters YGM Bangalore to all 7 administrative centres"
                width={1200}
                height={800}
                unoptimized
                sizes="(max-width: 1024px) 100vw, 420px"
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
          </div>

          {/* 7 Regional & International Admin Centres Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionalCentres.map((centre) => (
              <div
                key={centre.id}
                className="p-5 rounded-2xl bg-white border border-slate-300 hover:border-gold-400 shadow-sm transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                    {centre.region}
                  </span>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gold-700 shrink-0" aria-hidden="true" />
                    <h3 className="font-serif text-base font-bold text-navy-950">{centre.name}</h3>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mb-3">{centre.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href={`/contact?centre=${centre.id}`}
                    className="text-xs font-bold text-navy-900 hover:text-gold-800 inline-flex items-center gap-1 min-h-[32px]"
                  >
                    <span>Enquire with Centre →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. DIGITAL PROSPECTUS & ARCHIVAL DOWNLOAD SUMMARY */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-gold-800 uppercase tracking-wider block">
                Official Programme Catalogue
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                Digital Prospectus &amp; Printable Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Access the consolidated summary of all {allDegreesOffered.length} theological degree tracks, 7 ministerial modules, and trust registrations for church councils or personal reference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/trinity-programme-overview.pdf"
                download="University-of-Trinity-International-Programme-Overview.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gold-500 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-sans font-extrabold text-xs uppercase tracking-wider hover:brightness-105 shadow-gold min-h-[44px]"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download PDF</span>
              </a>
              <Button href="/prospectus" variant="outline" icon={<Printer className="w-4 h-4" />}>
                Open Print View
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. SANCTUARY INVITATION CTA BANNER */}
      <section className="bg-navy-950 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white py-16 sm:py-20 border-t border-gold-500/40 relative overflow-hidden">
        <Image
          src="/images/theological-heritage.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20 pointer-events-none select-none"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/90 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 text-center relative z-10">
          <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider text-gold-300 mb-2">
            Beloved Servants of Jesus Christ — Please Come and Join Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white mb-4">
            Begin Your Theological Journey Today
          </h2>
          <p className="text-sm sm:text-base xl:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8 text-center">
            Whether you are called to pastoral shepherding, church planting, theological research, or biblical language exegesis, University of Trinity International offers structured formation under Christian Legal Rites and Traditions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Button
              href="/admissions#apply"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Submit Admissions Enquiry
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:bg-white/10 w-full sm:w-auto"
            >
              Contact YGM – Bangalore HQ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
