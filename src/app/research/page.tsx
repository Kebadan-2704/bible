import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { researchMethodologiesData, dissertationProjectInfo } from "@/data/research";
import { BookOpen, Search, Compass, Award, FileText, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Research & Theological Methodologies | Advanced Studies",
  description:
    "Doctoral and postgraduate research methodologies in Biblical Studies, Systematic Theology, Gender & Theology, and Religious Studies.",
};

export default function ResearchPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Division IV"
          title="Research &amp; Theological Methodologies"
          subtitle="Rigorous academic inquiry designed to guide postgraduate (M.Th.) and doctoral (Ph.D.) candidates through disciplined biblical, historical, and sociological research."
        />

        {/* 4 Research Methodology Disciplines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {researchMethodologiesData.map((area) => (
            <div
              key={area.abbreviation}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:border-gold-400 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-sm px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                    Code: {area.abbreviation}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Core Methodological Track
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-navy-950 mb-1">
                  {area.discipline}
                </h3>
                <h4 className="text-xs font-semibold text-gold-700 uppercase tracking-wider mb-3">
                  {area.courseTitle}
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {area.focus}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Learning Competencies &amp; Outcomes:
                  </span>
                  {area.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link
                  href="/admissions#apply"
                  className="text-xs font-bold font-serif text-navy-900 hover:text-gold-600 inline-flex items-center gap-1"
                >
                  <span>Submit Research Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dissertation Project (D.P.) Protocol */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-400 shadow-xl mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-400/30">
              Terminal Treatise Requirement
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
              {dissertationProjectInfo.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {dissertationProjectInfo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dissertationProjectInfo.stages.map((stage, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/30 flex flex-col justify-between"
              >
                <div>
                  <span className="w-7 h-7 rounded-full bg-gold-500 text-navy-950 font-bold text-xs flex items-center justify-center mb-3">
                    0{idx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-base text-white mb-2">
                    {stage.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button href="/doctoral" variant="primary" size="lg" icon={<Award className="w-5 h-5 text-gold-400" />}>
            View Ph.D. Specialisations &amp; Admission Guidelines
          </Button>
        </div>
      </div>
    </div>
  );
}
