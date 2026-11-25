import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { LText } from "@/components/ui/LocalizedText";
import { administrativeCentres } from "@/data/centres";
import { institutionConfig } from "@/data/config";
import { MapPin, Mail, Clock, Building2, ExternalLink, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Enquiry Desk",
  description:
    "Connect with University of Trinity International YGM – Bangalore headquarters or select a regional centre and enquiry purpose.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hq = administrativeCentres.find((c) => c.isHeadquarters) || administrativeCentres[0];

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Direct Secretariat Access" ta="நேரடி செயலகத் தொடர்பு" />}
          title={<LText en="Contact & Admissions Enquiry" ta="தொடர்பு & சேர்க்கை விசாரணை" />}
          subtitle="Reach our YGM – Bangalore headquarters secretariat or route your request directly by centre and purpose."
        />

        {/* Contact Info Overview Cards (2-col at md, 3-col at lg so long emails never collide) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {/* Card 1: Headquarters */}
          <div className="bg-white rounded-2xl p-6 border border-gold-300 shadow-sm space-y-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-900">
              <Building2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-800 block">
              Central Seat
            </span>
            <h2 className="font-serif text-lg font-bold text-navy-950">YGM – Bangalore Headquarters</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {hq.cityRegionLabel}
            </p>
            <div className="pt-2 text-xs sm:text-sm text-slate-700 space-y-1.5 border-t border-slate-100">
              <p className="break-all">
                <strong className="text-navy-950">Email:</strong>{" "}
                <a
                  href={`mailto:${institutionConfig.contact.generalEmail}`}
                  className="text-navy-900 underline decoration-gold-500/60 hover:text-gold-800"
                >
                  {institutionConfig.contact.generalEmail}
                </a>
              </p>
              <p className="text-xs text-slate-600">{institutionConfig.contact.phoneStatusNote}</p>
            </div>
          </div>

          {/* Card 2: Admissions Secretariat */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
              <Mail className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-navy-900 block">
              Admissions Secretariat
            </span>
            <h2 className="font-serif text-lg font-bold text-navy-950">Candidate Enrolment Desk</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              For syllabus guidance, prospectus requests, fee concessions, and admissions interviews.
            </p>
            <div className="pt-2 text-xs sm:text-sm text-slate-700 space-y-1.5 border-t border-slate-100">
              <p className="break-all">
                <strong className="text-navy-950">Admissions Email:</strong>{" "}
                <a
                  href={`mailto:${institutionConfig.contact.admissionsEmail}`}
                  className="text-navy-900 underline decoration-gold-500/60 hover:text-gold-800"
                >
                  {institutionConfig.contact.admissionsEmail}
                </a>
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-1 text-xs font-bold text-gold-800 hover:text-gold-950 min-h-[30px]"
              >
                Review Eligibility &amp; Steps →
              </Link>
            </div>
          </div>

          {/* Card 3: Office Hours & Verification */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 min-w-0 md:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
              <Clock className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-navy-900 block">
              Administrative Hours
            </span>
            <h2 className="font-serif text-lg font-bold text-navy-950">Office Operations</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {institutionConfig.contact.officeHours}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
              Weekend pastoral modular sessions run per regional centre notification.
            </p>
          </div>
        </div>

        {/* Form & Secretariat Routing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-7">
            <EnquiryForm defaultPurpose="general" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Geographic & Correspondence Panel */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold-700 shrink-0" aria-hidden="true" />
                  <h2 className="font-serif text-lg font-bold text-navy-950">
                    Central Secretariat Hub
                  </h2>
                </div>
                <span className="text-xs font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  Karnataka, India
                </span>
              </div>

              <div className="p-5 rounded-xl bg-navy-950 text-white space-y-3 border border-gold-500/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gold-500 text-navy-950 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-sm text-gold-300">
                      {institutionConfig.institutionName}
                    </p>
                    <p className="text-xs text-slate-200">{institutionConfig.diocesanAffiliation}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {institutionConfig.headquarters.address}
                </p>
                <a
                  href={institutionConfig.headquarters.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 hover:text-white underline min-h-[36px]"
                >
                  <span>View Bangalore Region in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quick Purpose Links */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileCheck2 className="w-4 h-4 text-gold-700 shrink-0" aria-hidden="true" />
                <h2 className="font-serif font-bold text-navy-950 text-sm uppercase tracking-wider">
                  Dedicated Request Paths
                </h2>
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <Link
                  href="/contact?type=credential_verification"
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-gold-50 border border-slate-200 font-semibold text-navy-950 min-h-[38px] flex items-center justify-between"
                >
                  <span>Presbytery Credential Verification</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/contact?type=documentation"
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-gold-50 border border-slate-200 font-semibold text-navy-950 min-h-[38px] flex items-center justify-between"
                >
                  <span>Institutional Trust &amp; Charter Records</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Regional Centres Quick List */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-navy-950 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                Administrative Centres ({administrativeCentres.length})
              </h2>
              <div className="space-y-1.5 text-xs">
                {administrativeCentres.map((centre) => (
                  <Link
                    key={centre.id}
                    href={`/contact?centre=${centre.id}`}
                    className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-slate-50 border-b border-slate-100 min-h-[34px]"
                  >
                    <span className="font-semibold text-navy-950">{centre.name}</span>
                    <span className="text-slate-700 font-medium">{centre.region}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
