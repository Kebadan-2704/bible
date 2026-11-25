import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { LText } from "@/components/ui/LocalizedText";
import { researchMethodologiesData, dissertationProjectInfo } from "@/data/research";
import { Award, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Research Methodologies & D.P.",
  description:
    "Postgraduate and doctoral research methodologies in Biblical Studies (B.S.), Systematic Theology (S.T.), Gender & Theology (SGT), and Religious Studies (R.S.).",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Research Division" ta="ஆராய்ச்சிப் பிரிவு" />}
          title={<LText en="Research & Theological Methodologies" ta="ஆராய்ச்சி & இறையியல் வழிமுறைகள்" />}
          subtitle="Disciplined academic methodology guiding postgraduate (M.Th.) and doctoral (Ph.D.) candidates through biblical, historical, and theological research."
        />

        {/* 4 Research Methodology Disciplines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {researchMethodologiesData.map((area) => (
            <div
              key={area.abbreviation}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card hover:border-gold-400 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="font-mono font-bold text-sm px-3 py-1 rounded-full bg-gold-100 text-gold-950 border border-gold-300">
                    Code: {area.abbreviation}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-slate-700 font-semibold">
                    Core Methodological Track
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-navy-950 mb-1">
                  {area.discipline}
                </h2>
                <h3 className="text-xs font-bold text-gold-800 uppercase tracking-wider mb-3">
                  {area.courseTitle}
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">{area.focus}</p>

                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Learning Competencies &amp; Outcomes:
                  </span>
                  {area.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link
                  href="/admissions#apply"
                  className="text-xs font-bold font-sans text-navy-900 hover:text-gold-800 inline-flex items-center gap-1 min-h-[36px] px-1 rounded"
                >
                  <span>Submit Research Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dissertation Project (D.P.) Protocol */}
        <div className="bg-navy-950 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-400 shadow-xl mb-16 relative overflow-hidden">
          <Image
            src="/images/scriptural-languages.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-15 pointer-events-none select-none"
          />
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-300 bg-gold-500/15 px-3 py-1 rounded-full border border-gold-400/40">
                  Terminal Treatise Requirement
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
                  {dissertationProjectInfo.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                  {dissertationProjectInfo.description}
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-gold-400/40 shadow-lg bg-navy-950">
                  <Image
                    src="/images/doctoral-library-compendium.svg"
                    alt="Classical theological library archive and sealed doctoral treatise"
                    width={1200}
                    height={800}
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="w-full aspect-[3/2] object-cover"
                  />
                </div>
              </div>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dissertationProjectInfo.stages.map((stage, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-navy-900/90 border border-gold-500/30 flex flex-col justify-between"
              >
                <div>
                  <span className="w-7 h-7 rounded-full bg-gold-500 text-navy-950 font-bold text-xs flex items-center justify-center mb-3">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-base text-white mb-2">{stage.name}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            href="/doctoral"
            variant="primary"
            size="lg"
            icon={<Award className="w-5 h-5 text-gold-300" />}
          >
            View Ph.D. Specialisations &amp; Admission Guidelines
          </Button>
        </div>
      </div>
    </div>
  );
}
