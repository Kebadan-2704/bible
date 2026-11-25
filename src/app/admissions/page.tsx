import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { LText } from "@/components/ui/LocalizedText";
import {
  admissionSteps,
  admissionFAQs,
  programmeEligibilityOverview,
} from "@/data/admissions";
import {
  Download,
  FileCheck,
  HelpCircle,
  CheckCircle2,
  Printer,
  CalendarClock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admissions & Prospectus",
  description:
    "Admissions procedure, eligibility requirements, downloadable overview PDF, FAQs, and online application for University of Trinity International.",
  alternates: { canonical: "/admissions" },
};

export default function AdmissionsPage() {
  const faqItems = admissionFAQs.map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.question,
    badge: faq.category,
    content: <p className="leading-relaxed">{faq.answer}</p>,
  }));

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Enrolment & Vocation" ta="மாணவர் சேர்க்கை" />}
          title={<LText en="Admissions & Prospectus" ta="சேர்க்கை & விவரக்குறிப்பு" />}
          subtitle="Equipping servant leaders called to pastoral ordination, mission outreach, and scholarly theological study."
        />

        {/* 4-Step Process Section */}
        <section className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
              <span>4-Step Admissions Procedure</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              A transparent path from initial candidate enquiry to Academic Council matriculation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-gold-400 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="w-8 h-8 rounded-full bg-gold-500 text-navy-950 font-bold text-sm flex items-center justify-center mb-4 shadow-sm">
                    0{step.step}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-gold-800 mb-2">{step.summary}</p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility & Required Documents (TIU-022) */}
        <section id="eligibility" className="mb-16 scroll-mt-28">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950">
              General Eligibility &amp; Application Documents
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Final candidate placement is confirmed by the Academic Council following pastoral interview review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmeEligibilityOverview.map((item, idx) => (
              <Card key={idx} borderGold className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-900 bg-gold-100 px-2.5 py-1 rounded-full border border-gold-300 inline-block">
                  {item.duration}
                </span>
                <h3 className="font-serif text-xl font-bold text-navy-950">{item.level}</h3>
                <div className="text-xs sm:text-sm text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                  <p>
                    <strong className="text-navy-950">Eligibility:</strong> {item.eligibility}
                  </p>
                  <p>
                    <strong className="text-navy-950">Study Format:</strong> {item.mode}
                  </p>
                  <div className="pt-1">
                    <strong className="text-navy-950 block mb-1">Required Documents:</strong>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {item.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-gold-700 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Transparent Intake & Fee Concession Guidance Banner (without inventing dates/fees) */}
          <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5">
            <CalendarClock
              className="w-5 h-5 text-gold-700 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
              <strong className="font-serif font-bold text-navy-950 block">
                Intake Cycles, Fee Structure &amp; Vernacular Pastor Concessions
              </strong>
              <p>
                Modular study cohorts and seminar examination schedules are coordinated per regional centre calendar. Verified fee schedules and ministerial concession criteria are issued directly by the Central Admissions Secretariat upon candidate enquiry.
              </p>
            </div>
          </div>
        </section>

        {/* Real Downloadable Prospectus PDF & Print View Banner (TIU-005) */}
        <section className="bg-navy-950 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-10 border border-gold-400 shadow-xl mb-20 relative overflow-hidden">
          <Image
            src="/images/theological-heritage.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-15 pointer-events-none select-none"
          />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-300">
              Institutional Reference Document
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Programme &amp; Curriculum Overview (PDF)
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Download our consolidated PDF programme overview summarizing schools, degrees, 7 ministerial modules, and trust registrations, or open the interactive print sheet.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
            <a
              href="/trinity-programme-overview.pdf"
              download="University-of-Trinity-International-Programme-Overview.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-sans font-extrabold text-xs uppercase tracking-wider hover:brightness-105 shadow-gold transition-transform duration-150 hover:scale-[1.02] min-h-[44px]"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Overview (PDF)</span>
            </a>
            <Button
              href="/prospectus"
              variant="outline"
              size="md"
              className="border-gold-400 text-gold-300 hover:bg-gold-500 hover:text-navy-950"
              icon={<Printer className="w-4 h-4" />}
            >
              View Digital Prospectus
            </Button>
          </div>
          </div>
        </section>

        {/* Application & Enquiry Form */}
        <section id="apply" className="mb-20 scroll-mt-28">
          <div className="max-w-5xl mx-auto">
            <EnquiryForm defaultPurpose="admissions" />
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <HelpCircle className="w-8 h-8 text-gold-700 mx-auto mb-2" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-navy-950">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Key guidance regarding ecclesiastical status, study formats, and application support.
            </p>
          </div>

          <Accordion items={faqItems} allowMultiple defaultOpenId="faq-0" />
        </section>
      </div>
    </div>
  );
}
