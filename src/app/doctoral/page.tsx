import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LText } from "@/components/ui/LocalizedText";
import { doctoralSpecialisations, honoraryDoctorateData } from "@/data/doctoral";
import { Award, GraduationCap, ShieldAlert, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Ph.D. & Honorary Degrees",
  description:
    "Four-year Doctor of Philosophy in Theology (Ph.D.) research programmes and Honorary Doctorate (Honoris Causa) episcopal distinctions.",
  alternates: { canonical: "/doctoral" },
};

export default function DoctoralPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Terminal Ecclesiastical Research" ta="உயரிய இறையியல் ஆய்வு" />}
          title={<LText en="Ph.D. Specialisations & Honorary Degrees" ta="முனைவர் பட்ட ஆய்வு & கௌரவப் பட்டங்கள்" />}
          subtitle="Supervised doctoral research spanning four years of theological investigation alongside ecclesiastical honours."
        />

        {/* 1. Four Ph.D. Specialisations */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-gold-400/50 bg-navy-950 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
              Doctoral Research Bench
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Original Theological Contribution &amp; Dissertation Supervision
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Four-year supervised Doctor of Philosophy pathways equipping experienced church leaders, educators, and theological authors.
            </p>
          </div>
          <div className="lg:col-span-5">
            <Image
              src="/images/doctoral-library-compendium.svg"
              alt="Doctoral library archive and illuminated compendium volume"
              width={1200}
              height={800}
              unoptimized
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="w-full aspect-[3/2] object-cover"
            />
          </div>
        </div>

        <div className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
                <span>Doctor of Philosophy in Theology (Ph.D. – 4 Years)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Supervised Dissertation Project (D.P.) programmes for seasoned theologians and educators.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-gold-100 text-gold-950 border border-gold-300 self-start sm:self-auto">
              Duration: 4 Years Research
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctoralSpecialisations.map((spec) => (
              <Card key={spec.id} borderGold className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-900 bg-gold-100 px-2.5 py-1 rounded-full border border-gold-300">
                      Doctoral Specialisation
                    </span>
                    <span className="text-xs font-bold text-navy-900">{spec.duration}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2">
                    {spec.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed mb-6">{spec.scope}</p>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Core Doctoral Inquiries:
                    </span>
                    {spec.coreResearchFocus.map((focus, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2
                          className="w-4 h-4 text-gold-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
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

        {/* 2. Honorary Doctorate (Honoris Causa) */}
        <div
          id="honoris-causa"
          className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-gold-400 shadow-xl mb-16 relative overflow-hidden scroll-mt-28"
        >
          <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-900 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
                  {honoraryDoctorateData.badge}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-navy-950 mt-2">
                  {honoraryDoctorateData.title}
                </h2>
                <p className="text-xs sm:text-sm font-serif italic text-gold-800">
                  {honoraryDoctorateData.latinTitle}
                </p>
              </div>

              <div
                className="w-16 h-16 rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 shrink-0 shadow-sm"
                aria-hidden="true"
              >
                <Award className="w-8 h-8" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3.5 text-amber-950 text-xs sm:text-sm leading-relaxed">
              <ShieldAlert className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="block font-bold text-amber-950 mb-1">
                  Ecclesiastical Honour Disclosure:
                </strong>
                {honoraryDoctorateData.legalNotice}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-lg font-bold text-navy-950 uppercase tracking-wider">
                Nomination &amp; Episcopal Recognition Criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The institution does not sell or commercially confer honorary awards. Conferrals are reserved exclusively for vetted ecclesiastical veterans upon Governing Council review:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                {honoraryDoctorateData.criteria.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-gold-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <h4 className="font-serif text-sm font-bold text-navy-950 uppercase tracking-wider mb-4">
                Nomination &amp; Scrutiny Protocol
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {honoraryDoctorateData.process.map((step) => (
                  <div key={step.step} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-gold-800 block mb-1">
                      Stage 0{step.step}
                    </span>
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-navy-950 mb-1">
                      {step.name}
                    </h5>
                    <p className="text-xs text-slate-700 leading-snug">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button href="/admissions#apply" variant="gold" size="lg">
            Inquire About Doctoral Admissions
          </Button>
        </div>
      </div>
    </div>
  );
}
