import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { LText } from "@/components/ui/LocalizedText";
import { institutionConfig } from "@/data/config";
import { FileText, Mail, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Accreditations & Legal Standing",
  description:
    "Institutional accreditation policy, legal constitution under Christian legal rites, and statutory trust documentation for University of Trinity International.",
  alternates: { canonical: "/accreditations" },
};

export default function AccreditationsPage() {
  const { accreditations, registeredUnder, legalNote } = institutionConfig;

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Ecclesiastical Standing" ta="நிறுவன தகுதி & அறக்கட்டளை" />}
          title={<LText en="Institutional Accreditations" ta="நிறுவன அங்கீகார நிலை" />}
          subtitle="Clerical rites, trust registration status, and ecclesiastical documentation policies."
        />

        {accreditations.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-card text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-300 flex items-center justify-center text-gold-700 mx-auto">
              <FileText className="w-8 h-8" aria-hidden="true" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                <LText
                  en="Documents Available on Request"
                  ta="கோரிக்கையின் பேரில் ஆவணங்கள் வழங்கப்படும்"
                />
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Diocesan trust deeds, registration certificates under {registeredUnder}, and institutional charter documents are maintained at our central registry and furnished upon written verification request to authorized church bodies, presbyteries, and prospective students.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
              <strong>Statutory &amp; Religious Disclosure:</strong> {legalNote}
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                href="/contact?type=documentation"
                variant="primary"
                icon={<Mail className="w-4 h-4" />}
              >
                Request Institutional Documentation Pack
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {accreditations.map((item) => (
              <div key={item.id} className="p-6 bg-white rounded-2xl border border-slate-200">
                <h3 className="font-serif text-xl font-bold text-navy-950">{item.title}</h3>
                <p className="text-xs text-slate-700">
                  {item.issuer} • {item.year}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 rounded-2xl bg-gold-50 border border-gold-300 flex items-start gap-4">
          <Info className="w-5 h-5 text-gold-800 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
            <h3 className="font-serif font-bold text-navy-950 text-sm sm:text-base">
              Theological Qualifications Policy
            </h3>
            <p>
              University of Trinity International operates exclusively as a Christian ecclesiastical institution. All academic programmes and awards are religious qualifications designed for Christian pastoral service, evangelism, and church ministry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
