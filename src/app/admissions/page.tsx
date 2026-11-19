import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { admissionSteps, admissionFAQs, programmeEligibilityPlaceholders } from "@/data/admissions";
import { Download, FileCheck, HelpCircle, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Admissions & Prospectus | Enrolment Procedure",
  description:
    "Admissions process, eligibility standards, prospectus requests, and candidate inquiry form for Trinity International University.",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Enrollment &amp; Vocation"
          title="Admissions &amp; Prospectus"
          subtitle="Equipping servant leaders called to pastoral ordination, mission outreach, and scholarly theological research."
        />

        {/* 4-Step Process Section */}
        <div className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-gold-600" />
              <span>4-Step Admissions Procedure</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              A transparent, supportive path from initial inquiry to matriculation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-gold-400 transition-[border-color,box-shadow] duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="w-8 h-8 rounded-full bg-gold-500 text-navy-950 font-bold text-sm flex items-center justify-center mb-4 shadow-xs">
                    0{step.step}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-gold-800 mb-2">
                    {step.summary}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Programme Eligibility Criteria (Placeholders clearly marked) */}
        <div className="mb-20">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950">
              General Eligibility Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              Subject to confirmation by the Academic Council based on candidate interview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmeEligibilityPlaceholders.map((item, idx) => (
              <Card key={idx} borderGold className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200 inline-block">
                  {item.duration}
                </span>
                <h3 className="font-serif text-xl font-bold text-navy-950">
                  {item.level}
                </h3>
                <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
                  <p>
                    <strong className="text-navy-900">Eligibility:</strong> {item.eligibility}
                  </p>
                  <p>
                    <strong className="text-navy-900">Study Format:</strong> {item.mode}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Downloadable Prospectus Banner (Placeholder) */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-10 border border-gold-400 shadow-xl mb-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Institutional Documentation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Official University Prospectus (PDF)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Download our complete curriculum catalog, diocesan trust credentials, fee concession policies for vernacular pastors, and calendar of examinations.
            </p>
          </div>

          <div className="shrink-0">
            {/* Downloadable prospectus PDF link (placeholder) */}
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold transition-transform duration-150 hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              <span>Download Prospectus (PDF)</span>
            </a>
          </div>
        </div>

        {/* Application & Enquiry Form */}
        <div id="apply" className="mb-20 scroll-mt-28">
          <div className="max-w-3xl mx-auto">
            <EnquiryForm />
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HelpCircle className="w-8 h-8 text-gold-600 mx-auto mb-2" />
            <h3 className="font-serif text-2xl font-bold text-navy-950">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Common inquiries regarding ecclesiastical status, course delivery, and ordinations.
            </p>
          </div>

          <Accordion items={faqItems} allowMultiple defaultOpenId="faq-0" />
        </div>
      </div>
    </div>
  );
}
