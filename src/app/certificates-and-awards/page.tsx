import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { LText } from "@/components/ui/LocalizedText";
import { institutionConfig } from "@/data/config";
import { Award, Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificates & Awards Verification",
  description:
    "Graduate credential verification desk, institutional charters, and diocesan award records for University of Trinity International.",
  alternates: { canonical: "/certificates-and-awards" },
};

export default function CertificatesAndAwardsPage() {
  const { certificatesAndAwards, legalNote, registrations } = institutionConfig;

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Institutional Records" ta="நிறுவன ஆவணப் பதிவேடு" />}
          title={<LText en="Certificates & Awards" ta="சான்றிதழ்கள் & விருதுகள்" />}
          subtitle="Clerical recognitions, trust certifications, and graduate credential verification requests."
        />

        {certificatesAndAwards.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-card text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mx-auto">
              <Award className="w-8 h-8" aria-hidden="true" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                <LText
                  en="Documents Available on Request"
                  ta="கோரிக்கையின் பேரில் சான்றிதழ் சரிபார்ப்பு"
                />
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Diocesan charter records, convocation awards, and graduate verification transcripts are maintained at our YGM – Bangalore headquarters and issued to sponsoring presbyteries and church bodies upon formal request.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
              <strong>Institutional Notice:</strong> {legalNote}
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                href="/contact?type=credential_verification"
                variant="primary"
                icon={<Mail className="w-4 h-4" />}
              >
                Submit Credential Verification Request
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {certificatesAndAwards.map((item) => (
              <div key={item.id} className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="font-serif text-xl font-bold text-navy-950">{item.title}</h3>
                <p className="text-xs text-slate-700">
                  {item.issuer} • {item.year}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
          <Shield className="w-6 h-6 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-slate-700 space-y-1 leading-relaxed">
            <h3 className="font-serif font-bold text-navy-950 text-sm sm:text-base">
              Graduate Verification &amp; Seal Authenticity
            </h3>
            <p>
              University of Trinity International maintains archival records of degrees and ministerial certificates issued under our statutory trust charters (Tamil Nadu Reg. No. {registrations.tamilNadu.number}, Karnataka Reg. No. {registrations.karnataka.number}). Presbyteries, mission boards, and church councils may submit candidate details directly through our verification desk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
