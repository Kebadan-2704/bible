import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { institutionConfig } from "@/data/config";
import { Award, FileCheck, Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificates & Awards | Verification Desk",
  description:
    "Institutional certificates, charter awards, and verification registry for Trinity International University.",
};

export default function CertificatesAndAwardsPage() {
  const { certificatesAndAwards, registeredUnder, legalNote } = institutionConfig;

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Institutional Records"
          title="Certificates &amp; Awards"
          subtitle="Clerical recognitions, trust certifications, and graduate credential verifications."
        />

        {/* Empty State / Available On Request per Legal Rule */}
        {certificatesAndAwards.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-card text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-600 mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                Documents Available on Request
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Diocesan charter citations, convocation award records, and certified verification transcripts are maintained in our Bangalore central registry and are issued to ordaining church bodies upon written request.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              <strong>Mandatory Institutional Notice:</strong> {legalNote}
            </div>

            <div className="pt-4 flex justify-center">
              <Button href="/contact" variant="primary" icon={<Mail className="w-4 h-4" />}>
                Submit Credential Verification Request
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {certificatesAndAwards.map((item) => (
              <div key={item.id} className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="font-serif text-xl font-bold text-navy-950">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.issuer} • {item.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Graduate Credential Verification Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
          <Shield className="w-6 h-6 text-gold-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 space-y-1">
            <h4 className="font-serif font-bold text-navy-950 text-sm">
              Graduate Verification &amp; Seal Authenticity
            </h4>
            <p>
              Trinity International University maintains records of all degrees and ministerial certificates awarded since registration in 2002. Presbyteries, mission boards, and church councils may submit candidate certificate numbers for official episcopal endorsement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
