import React from "react";
import Link from "next/link";
import { Crest } from "@/components/ui/Crest";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroGlobe } from "@/components/home/HeroGlobe";
import { StatsStrip } from "@/components/home/StatsStrip";
import { AffiliationsStrip } from "@/components/home/AffiliationsStrip";
import { ProgrammeOverviewPrint } from "@/components/home/ProgrammeOverviewPrint";
import { institutionConfig } from "@/data/config";
import { allDegreesOffered, schoolsAndDivisions } from "@/data/academics";
import { biblicalMinistryModules } from "@/data/curriculum";
import { governingCouncil } from "@/data/governance";
import { administrativeCentres } from "@/data/centres";
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  Users,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  const featuredModules = biblicalMinistryModules.slice(0, 3);
  const featuredDegrees = allDegreesOffered.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-navy-950 text-white overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-gold-500/30">
        <HeroGlobe />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
          {/* Institutional Crest */}
          <div className="mb-6 animate-in fade-in zoom-in duration-500">
            <Crest size={100} />
          </div>

          {/* Main Institution Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            {institutionConfig.institutionName}
          </h1>

          <p className="mt-3 text-sm sm:text-base font-serif font-semibold tracking-wider text-gold-300 uppercase">
            {institutionConfig.diocesanAffiliation}
          </p>

          {/* Tagline */}
          <p className="mt-4 text-base sm:text-xl text-gold-300 font-serif italic max-w-2xl font-normal">
            &ldquo;{institutionConfig.tagline}&rdquo;
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed text-left sm:text-center">
            {institutionConfig.subheading}. Empowering called ministers, pastors, and theological scholars with faithful doctrinal instruction, biblical languages, and ecclesiastical ordination.
          </p>

          {/* Hero Two CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto p-2 rounded-2xl bg-navy-950/80 backdrop-blur-md border border-navy-800">
            <Button
              href="/academics"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto text-[#061026] font-extrabold shadow-md"
              icon={<GraduationCap className="w-5 h-5 text-[#061026]" />}
            >
              Explore Programmes
            </Button>
            <Button
              href="/admissions#apply"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-gold-400 text-gold-300 hover:bg-gold-500 hover:text-navy-950 font-bold"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Enquire Now
            </Button>
          </div>

          {/* Sub-note */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" aria-hidden="true" />
              Registered under The Indian Trusts Act, 1882
            </span>
            <span aria-hidden="true">•</span>
            <span>TN Reg: <strong className="text-gold-300">{institutionConfig.registrations.tamilNadu.number}</strong></span>
            <span aria-hidden="true">•</span>
            <span>KA Reg: <strong className="text-gold-300">{institutionConfig.registrations.karnataka.number}</strong></span>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS STRIP (Facts computed directly from brochure data) */}
      <StatsStrip />

      {/* 3. ABOUT SNIPPET & DIVISIONS */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-400 text-gold-900 text-xs font-bold uppercase tracking-wider">
                <span>Theological Foundation</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 leading-tight">
                Rooted in Scripture, Dedicated to Kingdom Ministry
              </h2>
              <p className="text-slate-700 text-base leading-relaxed max-w-prose">
                Trinity International University is committed to Biblical truth, academic excellence, and Kingdom impact. Consecrated under traditional Christian clerical rites, our programs prepare servant leaders for ministerial ordinations, pastoral chaplaincy, and in-depth biblical exegesis.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-slate-800">
                    <strong className="text-navy-950 font-bold">Ecclesiastical Integrity:</strong> Structured under clerical rites and traditions for ministerial excellence.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-slate-800">
                    <strong className="text-navy-950 font-bold">Modular &amp; Multi-Centre:</strong> Coordinated across 8 administrative offices across India, Malaysia, and the USA.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-slate-800">
                    <strong className="text-navy-950 font-bold">Original Languages:</strong> Exegetical instruction in Biblical Hebrew, Aramaic, and Koine Greek.
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <Button href="/about" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Learn More About Our Heritage
                </Button>
              </div>
            </div>

            {/* School / Division Cards */}
            <div className="lg:col-span-6 space-y-5">
              {schoolsAndDivisions.map((division) => (
                <div
                  key={division.id}
                  className="p-6 rounded-2xl bg-white border border-slate-300 shadow-card hover:border-gold-400 hover:shadow-hover transition-[border-color,box-shadow] duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-800 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-300">
                      {division.badge}
                    </span>
                    <BookOpen className="w-5 h-5 text-navy-800" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy-950">
                    {division.name}
                  </h3>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    {division.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/academics"
                      className="text-xs font-bold font-serif text-navy-900 hover:text-gold-600 inline-flex items-center gap-1 min-h-[30px]"
                    >
                      <span>Explore Curricula</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEGREES OFFERED CARDS */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Ecclesiastical Qualifications"
            title="Degrees &amp; Ministerial Programmes"
            subtitle="Conferred under traditional Christian clerical authority across Bachelor's, Master's, and Doctoral levels."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDegrees.map((deg) => (
              <Card key={deg.code} borderGold className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="navy">{deg.level}</Badge>
                    <span className="text-xs font-bold text-gold-800">{deg.duration}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-navy-950">
                    {deg.code}
                  </h3>
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
                    className="text-xs font-bold font-serif text-navy-900 hover:text-gold-600 inline-flex items-center gap-1 min-h-[30px]"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/admissions#apply"
                    className="text-xs font-bold text-gold-800 hover:text-gold-950 min-h-[30px] inline-flex items-center"
                  >
                    Enrol →
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/academics" variant="primary" icon={<GraduationCap className="w-4 h-4" />}>
              View All 10 Conferred Degrees &amp; Ordinance Tracks
            </Button>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CURRICULUM MODULES (3 CARDS) */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Biblical Ministry Studies"
            title="Curriculum &amp; Course Highlights"
            subtitle="Extracted verbatim from official institutional course specifications across systematic, pastoral, and biblical fields."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredModules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl p-6 border border-slate-300 hover:border-gold-400 shadow-card hover:shadow-hover transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${module.badgeBg}`}
                    >
                      Module {module.id}
                    </span>
                    <span className="text-xs text-slate-800 font-bold">{module.shortTitle}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy-950 mb-2">
                    {module.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">
                    {module.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Included Topics:
                    </span>
                    <ul className="text-xs text-slate-800 font-medium space-y-1.5">
                      {module.topics.map((t, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-600 shrink-0" aria-hidden="true" />
                          <span className="truncate">{t.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/curriculum#module-${module.id}`}
                    className="text-xs font-bold font-serif text-navy-900 hover:text-gold-700 inline-flex items-center gap-1 min-h-[30px]"
                  >
                    <span>Inspect Module Topics</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

      {/* 6. GOVERNING LEADERSHIP PREVIEW */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Diocesan Oversight"
            title="Great Governing Council Leaders"
            subtitle="Episcopal leaders and executive directors stewarding institutional governance and pastoral formation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Founder & Chairman */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-navy-950 to-navy-900 text-white border border-gold-400 shadow-xl flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center font-serif text-2xl font-bold text-gold-300 mb-4 shadow-gold">
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

            {/* General Secretary */}
            <div className="p-6 rounded-2xl bg-white border border-slate-300 shadow-card hover:border-gold-400 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-serif text-2xl font-bold text-navy-900 mb-4">
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

            {/* Vice Chairman */}
            <div className="p-6 rounded-2xl bg-white border border-slate-300 shadow-card hover:border-gold-400 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-serif text-2xl font-bold text-navy-900 mb-4">
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

      {/* 7. AFFILIATED INSTITUTIONS STRIP */}
      <AffiliationsStrip />

      {/* 8. ADMINISTRATIVE CENTRES LIST */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Geographical Reach"
            title="Administrative &amp; Collegiate Centres"
            subtitle="Coordinating theological studies and ordination pathways across India and international liaison points."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {administrativeCentres.map((centre) => (
              <div
                key={centre.id}
                className={`p-6 rounded-2xl bg-white border shadow-sm transition-[border-color,box-shadow] duration-200 overflow-hidden ${
                  centre.isHeadquarters
                    ? "border-gold-500 shadow-gold"
                    : "border-slate-300 hover:border-slate-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {centre.region}
                  </span>
                  {centre.isHeadquarters && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold-100 text-gold-950 border border-gold-400">
                      Headquarters
                    </span>
                  )}
                  {centre.isBrochure2Only && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-400">
                      Brochure 2 List
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-bold text-navy-950">
                    {centre.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  {centre.description}
                </p>

                <div className="text-xs text-slate-600 space-y-0.5 border-t border-slate-100 pt-2">
                  <p className="text-xs text-slate-600 leading-normal break-words">
                    <span className="font-semibold text-slate-700">Office:</span> {centre.addressPlaceholder}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/centres" variant="primary" icon={<MapPin className="w-4 h-4" />}>
              View Detailed Centre Directory &amp; Maps
            </Button>
          </div>
        </div>
      </section>

      {/* 9. PRINTABLE PROGRAMME OVERVIEW */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgrammeOverviewPrint />
        </div>
      </section>

      {/* 10. CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white py-16 sm:py-20 border-t border-gold-500/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
            Admissions &amp; Ordinations Open
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Begin Your Theological Journey Today
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8 text-left sm:text-center">
            Whether you are called to pastoral shepherding, church planting, academic theological research, or biblical language exegesis, Trinity International University offers the structured guidance you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-2 rounded-2xl bg-navy-950/90 border border-navy-800 max-w-xl mx-auto">
            <Button
              href="/admissions#apply"
              variant="gold"
              size="lg"
              className="text-[#061026] font-extrabold w-full sm:w-auto"
              icon={<ArrowRight className="w-5 h-5 text-navy-950" />}
            >
              Submit Admissions Enquiry
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto"
            >
              Contact Central Administrative Office
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
