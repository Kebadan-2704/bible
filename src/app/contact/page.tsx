import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { administrativeCentres } from "@/data/centres";
import { institutionConfig } from "@/data/config";
import { MapPin, Phone, Mail, Clock, Building2, Globe, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Admissions Enquiry | Central Secretariat",
  description:
    "Get in touch with the admissions secretariat, Bangalore headquarters, or regional administrative centres of Trinity International University.",
};

export default function ContactPage() {
  const hq = administrativeCentres.find((c) => c.isHeadquarters) || administrativeCentres[0];

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Direct Secretariat Access"
          title="Contact &amp; Admissions Enquiry"
          subtitle="Reach our central administrative office in Bangalore or connect directly with our regional collegiate centres."
        />

        {/* Contact Info Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Headquarters */}
          <div className="bg-white rounded-2xl p-6 border border-gold-300 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-800">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700 block">
              Central Seat
            </span>
            <h2 className="font-serif text-lg font-bold text-navy-950">
              Bangalore Headquarters
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {hq.addressPlaceholder}
            </p>
            <div className="pt-2 text-xs text-slate-700 space-y-1">
              <p>Email: {institutionConfig.contact.generalEmail}</p>
              <p>Phone: {institutionConfig.contact.phone}</p>
            </div>
          </div>

          {/* Card 2: Admissions & Prospectus */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-navy-800 block">
              Admissions Secretariat
            </span>
            <h2 className="font-serif text-lg font-bold text-navy-950">
              Candidate Enrolment Desk
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              For syllabus inquiries, prospectus dispatch, fee concessions, and interview schedules.
            </p>
            <div className="pt-2 text-xs text-slate-700 space-y-1">
              <p>Email: {institutionConfig.contact.admissionsEmail}</p>
              <p>Admissions Helpline: {institutionConfig.contact.phone}</p>
            </div>
          </div>

          {/* Card 3: Office Hours */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-navy-800 block">
              Administrative Hours
            </span>
            <h2 className="font-serif text-lg font-bold text-navy-950">
              Office Operations
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {institutionConfig.contact.officeHours}
            </p>
            <div className="pt-2 text-xs text-slate-700 space-y-1">
              <p>Weekend pastoral modular sessions as announced per regional centre schedule.</p>
            </div>
          </div>
        </div>

        {/* Form and Map Placeholder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Map Embed Placeholder */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold-600" />
                  <h2 className="font-serif text-lg font-bold text-navy-950">
                    Administrative Location Map
                  </h2>
                </div>
                <span className="text-xs font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  Karnataka / India
                </span>
              </div>

              {/* Graphical Map Placeholder */}
              <div className="w-full h-64 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                {/* Decorative map grid */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0B1F4B" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mapGrid)" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center mx-auto shadow-gold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-navy-950">
                    Bangalore Administrative Hub
                  </h3>
                  <p className="text-xs text-slate-600 max-w-xs">
                    Live interactive Google Map embed placeholder. Exact geolocation will pin to the confirmed administrative campus upon client confirmation.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-1">
                <p>
                  <strong>Headquarters Address:</strong> {institutionConfig.headquarters.address}
                </p>
                <p className="text-amber-800 italic text-xs">
                  {/* TODO: CONFIRM WITH CLIENT */}
                  Brochure 2 address text is garbled (&quot;{institutionConfig.headquarters.garbledAddressFromBrochure2}&quot;). Official confirmation required.
                </p>
              </div>
            </div>

            {/* Regional Centres Quick List */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-navy-950 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                All Administrative &amp; Modular Centres
              </h2>
              <div className="space-y-2 text-xs">
                {administrativeCentres.map((centre) => (
                  <div key={centre.id} className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="font-medium text-navy-950">{centre.name}</span>
                    <span className="text-slate-700 font-medium">{centre.region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
