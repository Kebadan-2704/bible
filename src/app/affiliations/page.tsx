import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { LText } from "@/components/ui/LocalizedText";
import { affiliatedInstitutionsList, affiliationDisclaimer } from "@/data/affiliations";
import { Globe, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliated Partner Institutions",
  description:
    "Partner and affiliated international Christian bodies documented by University of Trinity International across the USA, England, France, Ireland, and Switzerland.",
  alternates: { canonical: "/affiliations" },
};

export default function AffiliationsPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Global Network" ta="சர்வதேச வலைப்பின்னல்" />}
          title={<LText en="Affiliated & Partner Institutions" ta="இணைக்கப்பட்ட நிறுவனங்கள்" />}
          subtitle="Partner and affiliated ecclesiastical institutions listed in official institutional documentation."
        />

        {/* Mandatory Transparency Disclaimer */}
        <div className="w-full p-6 rounded-2xl bg-amber-50 border border-amber-300 mb-12 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-amber-950 space-y-1">
            <h2 className="font-serif font-bold text-amber-950 text-sm sm:text-base">
              Institutional Documentation Notice
            </h2>
            <p className="leading-relaxed">{affiliationDisclaimer}</p>
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {affiliatedInstitutionsList.map((inst) => (
            <Card key={inst.id} borderGold className="flex flex-col justify-between text-center p-8">
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <CountryFlag countryCode={inst.countryCode} className="w-16 h-11" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-gold-900 bg-gold-100 px-2.5 py-1 rounded-full border border-gold-300 inline-block mb-2">
                  {inst.country}
                </span>

                <h3 className="font-serif text-2xl font-bold text-navy-950 mb-2">{inst.name}</h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                  {inst.notes}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center text-xs text-slate-700 font-medium">
                <span>Ecclesiastical Partner Accord</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Ministerial Solidarity Note */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-gold-300 shadow-sm bg-navy-950">
              <Image
                src="/images/global-diocese-fellowship.svg"
                alt="Global theological partner and ecclesiastical fellowship network"
                width={1200}
                height={800}
                unoptimized
                sizes="(max-width: 768px) 100vw, 35vw"
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-800">
              <Globe className="w-4 h-4 text-gold-700 shrink-0" aria-hidden="true" />
              <span>International Solidarity</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
              Fostering Global Ministerial Fellowship
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              These international partner connections encourage cross-border theological dialogue, pastoral fellowship, modular missionary workshops, and shared Christian clerical traditions.
            </p>
            <div className="pt-1">
              <Button href="/contact?type=documentation" variant="primary">
                Institutional Partnership Enquiry Desk
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
