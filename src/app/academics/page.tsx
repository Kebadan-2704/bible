import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LText } from "@/components/ui/LocalizedText";
import {
  schoolsAndDivisions,
  allDegreesOffered,
  ordinanceCourses,
  coreSubjects,
  academicAbbreviations,
} from "@/data/academics";
import { specialisationsList } from "@/data/specialisations";
import { GraduationCap, BookOpen, Scroll, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Academics, Schools & Degrees",
  description:
    "Explore the School of Biblical Studies, School of Church Ministry, 10 theological degrees, 5 ordinance tracks, and 13 core subjects.",
  alternates: { canonical: "/academics" },
};

export default function AcademicsPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Academic Architecture" ta="கல்வி அமைப்பு" />}
          title={
            <LText
              en="Schools, Degrees & Theological Curriculum"
              ta="கல்விப் பிரிவுகள், பட்டங்கள் & பாடத்திட்டம்"
            />
          }
          subtitle="Forming competent ministers, biblical exegetes, and Christian educators through balanced biblical, historical, and pastoral studies."
        />

        {/* 1. Academic Divisions & Schools (#schools target) */}
        <section id="schools" className="mb-20 scroll-mt-28">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
              <span>Academic Schools &amp; Divisions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              The two primary academic divisions organizing our theological faculties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schoolsAndDivisions.map((division) => {
              const divisionImg =
                division.id === "school-of-biblical-studies"
                  ? "/images/scriptural-languages.jpg"
                  : "/images/theological-heritage.jpg";
              const divisionAlt =
                division.id === "school-of-biblical-studies"
                  ? "Ancient parchment scrolls, inkstand, and bound scriptural manuscripts for Biblical Studies"
                  : "Open leather-bound Holy Bible on walnut lectern by brass candlestick for Church Ministry Education";
              return (
                <div
                  key={division.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:border-gold-400 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-gold-400/30 bg-navy-950">
                      <Image
                        src={divisionImg}
                        alt={divisionAlt}
                        width={1200}
                        height={800}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 inline-block mb-3">
                        {division.badge}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-navy-950 mb-3">
                        {division.name}
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed mb-2">
                        {division.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-8 pb-8 pt-4 border-t border-slate-100">
                    <Button href="/curriculum" variant="outline" size="sm">
                      Inspect Associated Syllabus
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Degrees Offered Grid */}
        <section id="degrees" className="mb-20 scroll-mt-28">
          <div className="border-b border-slate-200 pb-3 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
                <span>Degrees Conferred (Bachelor&apos;s to Ph.D.)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Conferred under ecclesiastical Christian clerical rites and seminary standards.
              </p>
            </div>
            <span className="text-xs font-bold text-gold-900 bg-gold-100 px-3 py-1.5 rounded-lg border border-gold-300 self-start sm:self-auto">
              {allDegreesOffered.length} Programme Levels
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDegreesOffered.map((degree) => (
              <Card key={degree.code} borderGold className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge
                      variant={
                        degree.level === "Doctoral"
                          ? "gold"
                          : degree.level === "Postgraduate"
                          ? "purple"
                          : "navy"
                      }
                    >
                      {degree.level}
                    </Badge>
                    <span className="text-xs font-bold text-gold-800">{degree.duration}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-navy-950">{degree.code}</h3>
                  <h4 className="text-xs font-bold text-gold-800 uppercase tracking-wider mb-3">
                    {degree.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {degree.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href="/admissions#eligibility"
                    className="text-xs font-bold font-sans text-navy-900 hover:text-gold-800 inline-flex items-center gap-1 min-h-[36px] px-1 rounded"
                  >
                    <span>Admission Criteria</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/admissions#apply"
                    className="text-xs font-bold text-gold-800 hover:text-gold-950 min-h-[36px] px-2 inline-flex items-center rounded"
                  >
                    Apply →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Ordinance Courses */}
        <section className="mb-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-400 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300 bg-gold-500/15 px-3 py-1 rounded-full border border-gold-400/40">
              Ecclesiastical Clerical Licensure
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
              Ordinance Courses &amp; Holy Orders Preparation
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
              Structured ecclesiastical formation tracks preparing candidates for diocesan ordination and active church ministry commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ordinanceCourses.map((ord) => (
              <div
                key={ord.title}
                className="bg-navy-900/90 rounded-2xl p-5 border border-gold-500/30 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-300 block mb-1">
                    Order
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{ord.title}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed mb-3">{ord.focus}</p>
                </div>
                <div className="pt-3 border-t border-navy-800 text-xs text-gold-300">
                  {ord.designation}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Specialisations Hub */}
        <section className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
              <span>Specialised Advanced Disciplines</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Detailed seminar tracks and ancient language offerings across specialized study areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialisationsList.map((spec) => (
              <div
                key={spec.slug}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-gold-400 shadow-sm hover:shadow-hover transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-200">
                      {spec.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-gold-800">
                      {spec.shortCode}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy-950 mb-2">{spec.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    {spec.bannerDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/academics/${spec.slug}`}
                    className="text-xs font-bold font-sans text-navy-900 hover:text-gold-800 inline-flex items-center gap-1.5 min-h-[36px] px-1 rounded"
                  >
                    <span>View Syllabus &amp; Courses</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 13 Core Subjects (Structured Index Table — breaking card repetition) */}
        <section className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <Scroll className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
              <span>13 Core Prescribed Subjects</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Mandatory foundational subjects prescribed across ministerial degree curricula.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-200 overflow-hidden">
            {coreSubjects.map((sub, idx) => (
              <div
                key={sub.id}
                className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 hover:bg-ivory/60 transition-colors"
              >
                <div className="flex items-start gap-3.5 sm:w-5/12 shrink-0">
                  <span className="w-7 h-7 rounded-lg bg-gold-100 text-gold-900 font-bold font-serif text-xs flex items-center justify-center shrink-0 mt-0.5 border border-gold-300">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-navy-950 text-sm sm:text-base">
                      {sub.title}
                    </h3>
                    <span className="text-xs font-bold text-gold-800 uppercase tracking-wider block">
                      {sub.category}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed sm:w-7/12">
                  {sub.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Academic Abbreviations Legend */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 pb-3 mb-6">
            <h2 className="font-serif text-xl font-bold text-navy-950">
              Academic Abbreviations Legend
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
              Standard departmental and research track abbreviations used across transcripts and syllabi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {academicAbbreviations.map((abbr) => (
              <div key={abbr.abbreviation} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-mono font-bold text-sm block text-gold-800">
                  {abbr.abbreviation}
                </span>
                <span className="font-bold text-navy-950 block mt-0.5">{abbr.definition}</span>
                {abbr.notes && (
                  <span className="text-xs text-slate-700 block mt-1 leading-snug">{abbr.notes}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
