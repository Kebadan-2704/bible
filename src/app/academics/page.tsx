import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  schoolsAndDivisions,
  allDegreesOffered,
  ordinanceCourses,
  coreSubjects,
  academicAbbreviations,
} from "@/data/academics";
import { specialisationsList } from "@/data/specialisations";
import {
  GraduationCap,
  BookOpen,
  Scroll,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Languages,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Academics Hub | Schools, Degrees & Core Subjects",
  description:
    "Comprehensive academic overview of Trinity International University: School of Biblical Studies, School of Church Ministry, 10 theological degrees, and ordinance tracks.",
};

export default function AcademicsPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Academic Architecture"
          title="Schools, Degrees & Theological Curriculum"
          subtitle="Forming competent ministers, biblical exegetes, and Christian educators through balanced biblical, historical, and pastoral studies."
        />

        {/* 1. Academic Divisions & Schools */}
        <div className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gold-600" />
              <span>Academic Schools &amp; Divisions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              The two primary divisions organizing our faculties and teaching chairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schoolsAndDivisions.map((division) => (
              <div
                key={division.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:border-gold-400 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gold-100 text-gold-800 border border-gold-300 inline-block mb-3">
                    {division.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mb-3">
                    {division.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {division.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button href="/curriculum" variant="outline" size="sm">
                    Inspect Associated Syllabus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Degrees Offered Grid (Union of Brochure 1 & 2) */}
        <div className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-gold-600" />
                <span>Degrees Conferred (Bachelor&apos;s to Ph.D.)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Conferred under ecclesiastical Christian clerical rites and traditional seminary standards.
              </p>
            </div>
            <span className="text-xs font-semibold text-gold-700 bg-gold-50 px-3 py-1 rounded-lg border border-gold-200 self-start sm:self-auto">
              Total 10 Program Levels Documented
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDegreesOffered.map((degree) => (
              <Card key={degree.code} borderGold className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
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
                    <span className="text-xs font-bold text-gold-700">{degree.duration}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-navy-950">
                    {degree.code}
                  </h3>
                  <h4 className="text-xs font-semibold text-gold-700 uppercase tracking-wider mb-3">
                    {degree.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {degree.description}
                  </p>

                  {degree.discrepancyNote && (
                    <div className="mt-3 p-2 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600">
                      <strong>Brochure Note:</strong> {degree.discrepancyNote}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/admissions#apply"
                    className="text-xs font-bold font-serif text-navy-900 hover:text-gold-600 inline-flex items-center gap-1"
                  >
                    <span>Admission Criteria</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs font-medium text-slate-500">
                    Source: {degree.source}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 3. Ordinance Courses (Brochure 2 Track) */}
        <div className="mb-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-400 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-400/30">
              Ecclesiastical Clerical Licensure
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
              Ordinance Courses &amp; Holy Orders Preparation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Listed in Brochure 2 under <em>ORDINANCE COURSES</em>. Tailored ecclesiastical formation tracks preparing candidates for diocesan ordination and ministry licensing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ordinanceCourses.map((ord) => (
              <div
                key={ord.title}
                className="bg-navy-900/90 rounded-2xl p-5 border border-gold-500/30 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-1">
                    Order
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    {ord.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {ord.focus}
                  </p>
                </div>
                <div className="pt-3 border-t border-navy-800 text-xs text-gold-300">
                  {ord.designation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Specialisations Quick-Link Hub */}
        <div className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-gold-600" />
              <span>Specialised Advanced Disciplines</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              In-depth curricula detailed across our dedicated specialisation pages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialisationsList.map((spec) => (
              <div
                key={spec.slug}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-gold-400 shadow-sm hover:shadow-hover transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-800 border border-navy-200">
                      {spec.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-gold-700">{spec.shortCode}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-navy-950 mb-2">
                    {spec.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {spec.bannerDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/academics/${spec.slug}`}
                    className="text-xs font-bold font-serif text-navy-900 hover:text-gold-600 inline-flex items-center gap-1.5"
                  >
                    <span>View Syllabus &amp; Courses</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Core Subjects (13 Subjects) */}
        <div className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <Scroll className="w-6 h-6 text-gold-600" />
              <span>13 Core Subjects</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              Mandatory foundational subjects prescribed across theological curricula.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreSubjects.map((sub, idx) => (
              <div
                key={sub.id}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-gold-300 transition-[border-color,box-shadow] duration-200 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gold-100 text-gold-900 font-bold font-serif text-sm flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-navy-950 text-sm">
                    {sub.title}
                  </h4>
                  <span className="text-xs font-semibold text-gold-700 uppercase tracking-wider block">
                    {sub.category}
                  </span>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">
                    {sub.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Academic Abbreviations Legend */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 pb-3 mb-6">
            <h3 className="font-serif text-xl font-bold text-navy-950">
              Academic Abbreviations Legend
            </h3>
            <p className="text-xs text-slate-700">
              Directly transcribed from Brochure 1 academic abbreviations index.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            {academicAbbreviations.map((abbr) => (
              <div key={abbr.abbreviation} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-mono font-bold text-navy-950 text-sm block text-gold-700">
                  {abbr.abbreviation}
                </span>
                <span className="font-semibold text-navy-900 block mt-0.5">
                  {abbr.definition}
                </span>
                {abbr.notes && (
                  <span className="text-xs text-slate-500 block mt-1">
                    {abbr.notes}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
