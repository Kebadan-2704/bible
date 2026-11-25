import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LText } from "@/components/ui/LocalizedText";
import { institutionConfig } from "@/data/config";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal & Theological Disclaimer",
  description:
    "Official ecclesiastical qualifications disclosure and trust registration disclaimer for University of Trinity International.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Statutory & Ecclesiastical Disclosure" ta="சட்ட மற்றும் திருச்சபை அறிவிப்பு" />}
          title={<LText en="Institutional Legal Disclaimer" ta="சட்டப்பூர்வ பொறுப்புத் துறப்பு" />}
          subtitle="Clear disclosure regarding the ecclesiastical and religious character of qualifications conferred by University of Trinity International."
        />

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-8 text-sm text-slate-700 leading-relaxed">
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3.5 text-amber-950">
            <ShieldAlert className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <strong className="block font-serif font-bold text-amber-950 text-base">
                Religious &amp; Theological Character of Degrees
              </strong>
              <p className="text-xs sm:text-sm">{institutionConfig.theologicalNotice}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-slate-200 pb-2">
              1. Statutory Trust Registration &amp; Jurisdiction
            </h2>
            <p>
              <strong>{institutionConfig.institutionName}</strong> is an ecclesiastical educational entity legally constituted under traditional Christian legal rites and registered in India under{" "}
              <strong>{institutionConfig.registeredUnder}</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>
                Tamil Nadu Trust Registration: No.{" "}
                <strong>{institutionConfig.registrations.tamilNadu.number}</strong>
              </li>
              <li>
                Karnataka Trust Registration: No.{" "}
                <strong>{institutionConfig.registrations.karnataka.number}</strong>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-slate-200 pb-2">
              2. Nature of Degrees &amp; Clerical Awards
            </h2>
            <p>
              All academic degrees, diplomas, and ministerial certificates conferred by University of Trinity International (including B.Th., B.D., M.Div., M.Th., M.Min., D.Min., Th.D., D.D., and Ph.D. in Theology) are religious and ecclesiastical qualifications.
            </p>
            <p>
              They are instituted solely for Christian pastoral ministry, evangelistic mission service, chaplaincy, and theological instruction within churches and faith-based fellowships. They are not represented or marketed as secular statutory university degrees regulated by government university grants bodies.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-slate-200 pb-2">
              3. Honorary Doctorate (Honoris Causa)
            </h2>
            <p>
              The <em>Honorary Doctorate (Honoris Causa)</em> conferred by the Governing Council is strictly an ecclesiastical distinction honoring lifetime service in Christian ministry and community service. It is not an earned academic qualification and cannot be presented for statutory employment or academic licensing.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-slate-200 pb-2">
              4. Candidate Due Diligence
            </h2>
            <p>
              Prospective students, ordination candidates, and sponsoring local churches are advised to verify the suitability and mutual recognition of ecclesiastical qualifications within their specific denominational structures prior to enrolment.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 text-xs text-slate-700 italic text-center">
            For questions regarding institutional charter provisions, contact our Secretariat at{" "}
            <a
              href={`mailto:${institutionConfig.contact.generalEmail}`}
              className="underline text-navy-900 font-semibold"
            >
              {institutionConfig.contact.generalEmail}
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
