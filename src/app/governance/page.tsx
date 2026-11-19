import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { governingCouncil } from "@/data/governance";
import { Crown, Feather, Users, Award, Shield, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Governance | Great Governing Council Leaders",
  description:
    "Episcopal leadership of Trinity International University: Founder & Chairman, General Secretary, Vice Chairman, and Executive Directors.",
};

export default function GovernancePage() {
  const { founderChairman, generalSecretary, viceChairman, executiveDirectors } = governingCouncil;

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Episcopal Governance"
          title="Great Governing Council Leaders"
          subtitle="The spiritual overseers, episcopal presbyters, and executive directors directing the institution's clerical charter."
        />

        {/* Primary Executive Officers (3 Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Founder & Chairman */}
          <div className="bg-gradient-to-b from-navy-950 to-navy-900 text-white rounded-3xl p-8 border border-gold-400 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-gold-400 opacity-60">
              <Crown className="w-8 h-8" />
            </div>

            {/* Initials Photo Placeholder */}
            <div className="w-28 h-28 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center font-serif text-3xl font-extrabold text-gold-300 mb-6 shadow-gold">
              {founderChairman.initials}
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-400/30 mb-2">
              {founderChairman.title}
            </span>

            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              {founderChairman.name}
            </h2>

            <div className="bg-navy-900/90 rounded-lg p-3 border border-gold-500/30 my-3 w-full">
              <span className="text-xs text-gold-400 uppercase tracking-wider block font-semibold">
                Earned & Conferred Credentials:
              </span>
              <p className="text-xs font-medium text-gold-200 mt-1 leading-relaxed">
                {founderChairman.credentials}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              {founderChairman.description}
            </p>
          </div>

          {/* General Secretary */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-gold-400 shadow-card flex flex-col items-center text-center relative">
            <div className="absolute top-4 right-4 text-navy-400 opacity-60">
              <Feather className="w-8 h-8" />
            </div>

            {/* Initials Photo Placeholder */}
            <div className="w-28 h-28 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-serif text-3xl font-extrabold text-navy-900 mb-6">
              {generalSecretary.initials}
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-navy-800 bg-navy-50 px-3 py-1 rounded-full border border-navy-200 mb-2">
              {generalSecretary.title}
            </span>

            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-2">
              {generalSecretary.name}
            </h2>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 my-3 w-full">
              <span className="text-xs text-slate-600 uppercase tracking-wider block font-semibold">
                Credentials:
              </span>
              <p className="text-xs font-medium text-navy-900 mt-1 leading-relaxed">
                {generalSecretary.credentials}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              {generalSecretary.description}
            </p>
          </div>

          {/* Vice Chairman */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-gold-400 shadow-card flex flex-col items-center text-center relative">
            <div className="absolute top-4 right-4 text-navy-400 opacity-60">
              <Users className="w-8 h-8" />
            </div>

            {/* Initials Photo Placeholder */}
            <div className="w-28 h-28 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-serif text-3xl font-extrabold text-navy-900 mb-6">
              {viceChairman.initials}
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-navy-800 bg-navy-50 px-3 py-1 rounded-full border border-navy-200 mb-2">
              {viceChairman.title}
            </span>

            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-2">
              {viceChairman.name}
            </h2>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 my-3 w-full">
              <span className="text-xs text-slate-600 uppercase tracking-wider block font-semibold">
                Credentials:
              </span>
              <p className="text-xs font-medium text-navy-900 mt-1 leading-relaxed">
                {viceChairman.credentials}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              {viceChairman.description}
            </p>
          </div>
        </div>

        {/* Section: Executive Directors */}
        <div className="mb-16">
          <div className="border-b border-slate-200 pb-4 mb-8">
            <h3 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold-600" />
              <span>Executive Directors</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Distinguished presbyters, theologians, and missionary leaders overseeing diocesan academic departments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveDirectors.map((director) => (
              <Card key={director.id} className="flex flex-col items-center text-center p-6">
                {/* Initials Avatar Placeholder */}
                <div className="w-16 h-16 rounded-full bg-navy-50 border border-gold-300 flex items-center justify-center font-serif text-lg font-bold text-navy-900 mb-4 shadow-xs">
                  {director.initials}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200 mb-2">
                  {director.title}
                </span>

                <h4 className="font-serif font-bold text-base text-navy-950 mb-1">
                  {director.name}
                </h4>

                <p className="text-xs font-medium text-slate-700 leading-snug">
                  {director.credentials}
                </p>

                {director.notes && (
                  <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 italic">
                    {director.notes}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Discrepancy Note Callout */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
          <Info className="w-6 h-6 text-gold-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 space-y-1">
            <h4 className="font-serif font-bold text-navy-950 text-sm">
              Archival Source Discrepancy Notice
            </h4>
            <p>
              In accordance with institutional transparency guidelines, leadership entries default to Brochure 1 specifications. Brochure 2 notes alternative name spellings (e.g., &quot;Rev. Dr. K. Bily Graham&quot; with Spain affiliation, &quot;Rev. Dr. S. John Isaiah&quot;, and &quot;Rev. Dr. D. D. Raja&quot;). Official confirmation will update these records accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
