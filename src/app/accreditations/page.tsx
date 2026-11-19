import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { institutionConfig } from "@/data/config";
import { ShieldCheck, FileText, Mail, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Accreditations & Verification | Regulatory Standing",
  description:
    "Institutional accreditation and ecclesiastical credentials status for Trinity International University.",
};

export default function AccreditationsPage() {
  const { accreditations, registeredUnder, legalNote } = institutionConfig;

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Ecclesiastical Standing"
          title="Institutional Accreditations"
          subtitle="Clerical rites, trust registration status, and ecclesiastical documentation policies."
        />

        {/* Empty State / Available On Request per Legal Rule */}
        {accreditations.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-card text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-600 mx-auto">
              <FileText className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                Documents Available on Request
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Official diocesan trust deeds, registration certificates under {registeredUnder}, and bilateral ecclesiastical agreements are archived for institutional inspection and are provided upon formal request to authorized church bodies, presbyteries, and enrolled candidates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              <strong>Mandatory Legal Statement:</strong> {legalNote}
            </div>

            <div className="pt-4 flex justify-center">
              <Button href="/contact" variant="primary" icon={<Mail className="w-4 h-4" />}>
                Request Institutional Documentation Pack
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {accreditations.map((item) => (
              <div key={item.id} className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="font-serif text-xl font-bold text-navy-950">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.issuer} • {item.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Informative Note */}
        <div className="mt-12 p-6 rounded-2xl bg-gold-50/60 border border-gold-300 flex items-start gap-4">
          <Info className="w-5 h-5 text-gold-700 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 leading-relaxed space-y-1">
            <h4 className="font-serif font-bold text-navy-950 text-sm">
              Theological Qualifications Policy
            </h4>
            <p>
              Trinity International University operates as a dedicated Christian ecclesiastical institution. All academic programs and awards are purely religious/theological qualifications designed for Christian pastoral service, evangelism, and church ministry, conferred in accordance with traditional clerical rites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
