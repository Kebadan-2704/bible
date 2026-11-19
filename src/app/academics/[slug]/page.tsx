import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { specialisationsList, SpecialisationData } from "@/data/specialisations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Languages,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return specialisationsList.map((spec) => ({
    slug: spec.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const spec = specialisationsList.find((s) => s.slug === params.slug);
  if (!spec) return { title: "Specialisation Not Found" };

  return {
    title: `${spec.title} | Academic Specialisation`,
    description: spec.bannerDescription,
  };
}

export default function SpecialisationDetailPage({ params }: PageProps) {
  const spec = specialisationsList.find((s) => s.slug === params.slug);

  if (!spec) {
    notFound();
  }

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back breadcrumb */}
        <div className="mb-6">
          <Link
            href="/academics"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-serif text-slate-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Academics Hub</span>
          </Link>
        </div>

        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-400 shadow-xl mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold bg-gold-500/10 px-3 py-1 rounded-full border border-gold-400/30">
                {spec.badge}
              </span>
              <span className="text-xs font-mono font-bold text-slate-300">
                Code: {spec.shortCode}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {spec.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light mb-6">
              {spec.bannerDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-navy-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Prerequisites: {spec.prerequisites}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Overview Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
          <h2 className="font-serif text-xl font-bold text-navy-950 mb-2">
            Disciplinary Scope &amp; Theological Significance
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {spec.overview}
          </p>
        </div>

        {/* Language Glyphs Showcase (For ancient languages track) */}
        {spec.languageGlyphs && (
          <div className="mb-16">
            <div className="border-b border-slate-200 pb-3 mb-8">
              <h3 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
                <Languages className="w-6 h-6 text-gold-600" />
                <span>Original Biblical Script Glyphs</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700">
                Linguistic foundations for deep textual and exegesis mastery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spec.languageGlyphs.map((glyph) => (
                <div
                  key={glyph.language}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-gold-400 transition-[border-color,box-shadow] duration-200 text-center flex flex-col justify-between"
                >
                  <div>
                    {/* Decorative Script Glyph */}
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center font-serif text-3xl font-bold text-navy-900 mb-4 shadow-inner">
                      {glyph.primaryGlyph}
                    </div>

                    <h4 className="font-serif text-xl font-bold text-navy-950">
                      {glyph.language}
                    </h4>
                    <span className="text-xs font-mono text-gold-700 block mb-3">
                      {glyph.scriptName}
                    </span>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {glyph.description}
                    </p>

                    {/* Sample Character Row */}
                    <div className="flex flex-wrap justify-center gap-1.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-serif text-navy-900">
                      {glyph.sampleGlyphs.slice(0, 10).map((char, idx) => (
                        <span key={idx} className="px-1 font-bold text-sm">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 italic">
                    {glyph.importance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Sections */}
        <div className="space-y-12 mb-16">
          {spec.sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-serif text-2xl font-bold text-navy-950">
                  {section.heading}
                </h3>
                {section.subheading && (
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">
                    {section.subheading}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.courses.map((course, cIdx) => (
                  <div
                    key={cIdx}
                    className={`p-5 rounded-xl bg-white border transition-[border-color,box-shadow] duration-200 ${
                      course.highlight
                        ? "border-gold-400 shadow-gold bg-gold-50/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-serif font-bold text-base text-navy-950">
                        {course.title}
                      </h4>
                      {course.highlight && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-gold-200 text-gold-900 uppercase">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA and Related Specialisations */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-navy-950">
              Interested in studying this specialisation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Course modules are available in regular seminar sessions or guided distance formats.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button href="/admissions#apply" variant="gold">
              Apply for this Course
            </Button>
            <Button href="/curriculum" variant="outline">
              View Ministry Modules
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
