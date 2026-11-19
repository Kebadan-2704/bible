import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { doctoralSpecialisations, honoraryDoctorateData } from "@/data/doctoral";
import { Award, GraduationCap, ShieldAlert, CheckCircle2, FileText, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Doctoral Programmes & Honorary Degrees | Ph.D. & Honoris Causa",
  description:
    "Doctor of Philosophy in Theology (4 Years) specialisations and Honorary Doctorate (Honoris Causa) ecclesiastical honours.",
};

export default function DoctoralPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Terminal Ecclesiastical Research"
          title="Ph.D. Specialisations &amp; Honorary Degrees"
          subtitle="Advanced doctoral research programs spanning 4 years of scholarly investigation, alongside prestigious episcopal honours."
        />

        {/* 1. Four Ph.D. Specialisations */}
        <div className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-gold-600" />
                <span>Doctor of Philosophy in Theology (Ph.D. - 4 Years)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Supervised dissertation project (D.P.) programs for seasoned theologians and seminary educators.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-gold-100 text-gold-900 border border-gold-300 self-start sm:self-auto">
              Duration: 4 Years Full Research
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctoralSpecialisations.map((spec) => (
              <Card key={spec.id} borderGold className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                      Doctoral Specialisation
                    </span>
                    <span className="text-xs font-bold text-navy-900">{spec.duration}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2">
                    {spec.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {spec.scope}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Core Doctoral Inquiries:
                    </span>
                    {spec.coreResearchFocus.map((focus, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                        <span>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Button href="/admissions#apply" variant="outline" size="sm" className="w-full">
                    Submit Doctoral Proposal
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 2. Honorary Doctorate (Honoris Causa) Section */}
        {/* CRITICAL LEGAL RULE: Described as an honour conferred by the institution, NOT an academic qualification! */}
        <div id="honoris-causa" className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-gold-400 shadow-xl mb-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-800 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
                  {honoraryDoctorateData.badge}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-navy-950 mt-2">
                  {honoraryDoctorateData.title}
                </h2>
                <p className="text-xs sm:text-sm font-serif italic text-gold-700">
                  {honoraryDoctorateData.latinTitle}
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-600 shrink-0 shadow-sm">
                <Award className="w-8 h-8" />
              </div>
            </div>

            {/* Mandatory Legal Credibility Callout */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 flex items-start gap-3.5 text-amber-950 text-xs sm:text-sm leading-relaxed">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-900 mb-1">
                  Legal Credibility &amp; Ecclesiastical Disclosure:
                </strong>
                {honoraryDoctorateData.legalNotice}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-lg font-bold text-navy-950 uppercase tracking-wider">
                Nomination &amp; Episcopal Recognition Criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The institution does not sell or commercially issue honorary awards. Conferrals are reserved exclusively for vetted ecclesiastical veterans based upon stringent diocesan review:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                {honoraryDoctorateData.criteria.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Episcopal Conferral Process */}
            <div className="pt-6 border-t border-slate-200">
              <h4 className="font-serif text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">
                Nomination &amp; Scrutiny Protocol
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {honoraryDoctorateData.process.map((step) => (
                  <div key={step.step} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-gold-600 block mb-1">
                      Stage 0{step.step}
                    </span>
                    <h5 className="font-serif font-bold text-xs text-navy-950 mb-1">
                      {step.name}
                    </h5>
                    <p className="text-xs text-slate-600 leading-snug">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button href="/admissions#apply" variant="gold" size="lg">
            Inquire About Doctoral Admissions
          </Button>
        </div>
      </div>
    </div>
  );
}
