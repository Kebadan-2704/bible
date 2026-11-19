import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { institutionConfig } from "@/data/config";
import { ShieldAlert, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Theological Qualifications & Legal Disclaimer",
  description:
    "Official ecclesiastical and legal qualifications disclaimer for Trinity International University.",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Statutory &amp; Ecclesiastical Disclosure"
          title="Institutional Legal Disclaimer"
          subtitle="Mandatory clarity regarding the ecclesiastical and religious nature of qualifications conferred by Trinity International University."
        />

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Main Disclosure Callout */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3.5 text-amber-950">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-serif font-bold text-amber-900 text-base">
                Religious &amp; Theological Character of Degrees
              </strong>
              <p className="text-xs sm:text-sm">
                {institutionConfig.theologicalNotice}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-slate-200 pb-2">
              1. Statutory Trust Registration &amp; Jurisdiction
            </h2>
            <p>
              <strong>{institutionConfig.institutionName}</strong> is an ecclesiastical educational entity established under traditional Christian clerical rites and legally registered in the Republic of India under <strong>{institutionConfig.registeredUnder}</strong>.
            </p>
            <p>
              Official trust registrations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>
                Government of Tamil Nadu: Registration No. <strong>{institutionConfig.registrations.tamilNadu.number}</strong>
              </li>
              <li>
                Government of Karnataka: Registration No. <strong>{institutionConfig.registrations.karnataka.number}</strong>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-slate-200 pb-2">
              2. Nature of Degrees &amp; Clerical Awards
            </h2>
            <p>
              All academic degrees, diplomas, and ministerial certificates conferred by Trinity International University (including B.Th., B.D., M.Div., M.Th., M.Min., Th.D., D.D., and Ph.D. in Theology) are religious and ecclesiastical qualifications.
            </p>
            <p>
              They are instituted exclusively for Christian pastoral ministry, evangelistic mission work, chaplaincy, and theological instruction within the Christian Church and allied faith-based institutions. They are not intended or advertised as secular statutory degrees approved by university grant commissions or statutory governmental bodies.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-slate-200 pb-2">
              3. Honorary Doctorate (Honoris Causa)
            </h2>
            <p>
              The <em>Honorary Doctorate (Honoris Causa)</em> conferred by the Governing Council is strictly an honour and clerical distinction bestowed upon esteemed Christian leaders in recognition of lifetime dedication to gospel ministry, mission expansion, and community benevolence. It is not an academic qualification and cannot be cited for statutory academic eligibility or public-sector employment.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-slate-200 pb-2">
              4. Candidate Responsibility
            </h2>
            <p>
              Prospective students, candidates for ordination, and sponsoring local churches are advised to satisfy themselves regarding the ecclesiastical standing and mutual acceptance of theological awards within their specific denominational hierarchies before matriculation.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 text-xs text-slate-600 italic text-center">
            Last updated: November 2026. For questions regarding statutory charter provisions, contact the Central Secretariat at {institutionConfig.contact.generalEmail}.
          </div>
        </div>
      </div>
    </div>
  );
}
