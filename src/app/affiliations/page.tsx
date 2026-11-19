import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { affiliatedInstitutionsList, affiliationDisclaimer } from "@/data/affiliations";
import { Globe, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliations | Partner & Affiliated Institutions",
  description:
    "Partner and affiliated international institutions as documented in Trinity International University records (USA, UK, France, Ireland, Switzerland).",
};

export default function AffiliationsPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Global Network"
          title="Affiliated &amp; Partner Institutions"
          subtitle="Partner / affiliated institutions as listed in the institution's official records."
        />

        {/* Mandatory Transparency Disclaimer */}
        <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-amber-50 border border-amber-300 mb-12 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-950 space-y-1">
            <h3 className="font-serif font-bold text-amber-900">
              Institutional Documentation Notice
            </h3>
            <p className="leading-relaxed">
              {affiliationDisclaimer}
            </p>
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {affiliatedInstitutionsList.map((inst) => (
            <Card key={inst.id} borderGold className="flex flex-col justify-between text-center p-8">
              <div>
                <span className="text-5xl block mb-4 filter drop-shadow-sm">
                  {inst.flagIcon}
                </span>

                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200 inline-block mb-2">
                  {inst.country}
                </span>

                <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2">
                  {inst.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                  {inst.notes}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center text-xs text-slate-400">
                <span>International Ecclesiastical Accord</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Note on Mutual Credit Recognition */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto text-center space-y-4">
          <Globe className="w-10 h-10 text-gold-600 mx-auto" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
            Fostering Global Ministerial Solidarity
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            These international affiliations facilitate cross-border theological dialogue, faculty pulpit exchanges, modular missionary workshops, and shared Christian clerical traditions across North America, Europe, and Asia.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary">
              Institutional Inquiry / Partnership Desk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
