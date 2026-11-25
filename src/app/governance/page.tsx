import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { LText } from "@/components/ui/LocalizedText";
import { governingCouncil } from "@/data/governance";
import { Crown, Feather, Users, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Governing Council Leaders",
  description:
    "Leadership of University of Trinity International: Dr. S. Sundarabharathi (Founder & Chairman), General Secretary, Vice Chairman, and Executive Directors.",
  alternates: { canonical: "/governance" },
};

export default function GovernancePage() {
  const { founderChairman, generalSecretary, viceChairman, executiveDirectors } = governingCouncil;

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Episcopal Governance" ta="மறைமாவட்ட நிர்வாகம்" />}
          title={<LText en="Great Governing Council Leaders" ta="தலைமை நிர்வாக சபைத் தலைவர்கள்" />}
          subtitle="The episcopal presbyters and executive directors stewarding the institution's clerical charter and academic standards."
        />

        {/* Primary Executive Officers (3 Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Founder & Chairman */}
          <div className="bg-gradient-to-b from-navy-950 to-navy-900 text-white rounded-3xl p-8 border border-gold-400 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-gold-400 opacity-60" aria-hidden="true">
              <Crown className="w-8 h-8" />
            </div>

            <div
              className="w-24 h-24 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center font-serif text-3xl font-extrabold text-gold-300 mb-6 shadow-gold"
              aria-hidden="true"
            >
              {founderChairman.initials}
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-gold-300 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-400/40 mb-2">
              {founderChairman.title}
            </span>

            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              {founderChairman.name}
            </h2>

            <div className="bg-navy-900/90 rounded-lg p-3 border border-gold-500/30 my-3 w-full">
              <span className="text-xs text-gold-300 uppercase tracking-wider block font-semibold">
                Academic &amp; Ecclesiastical Credentials:
              </span>
              <p className="text-xs font-medium text-gold-200 mt-1 leading-relaxed">
                {founderChairman.credentials}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-2">
              {founderChairman.description}
            </p>
          </div>

          {/* General Secretary */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-gold-400 shadow-card flex flex-col items-center text-center relative">
            <div className="absolute top-4 right-4 text-navy-400 opacity-60" aria-hidden="true">
              <Feather className="w-8 h-8" />
            </div>

            <div
              className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-serif text-3xl font-extrabold text-navy-900 mb-6"
              aria-hidden="true"
            >
              {generalSecretary.initials}
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-navy-900 bg-navy-50 px-3 py-1 rounded-full border border-navy-200 mb-2">
              {generalSecretary.title}
            </span>

            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-2">
              {generalSecretary.name}
            </h2>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 my-3 w-full">
              <span className="text-xs text-slate-700 uppercase tracking-wider block font-semibold">
                Credentials:
              </span>
              <p className="text-xs font-medium text-navy-900 mt-1 leading-relaxed">
                {generalSecretary.credentials}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
              {generalSecretary.description}
            </p>
          </div>

          {/* Vice Chairman */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-gold-400 shadow-card flex flex-col items-center text-center relative">
            <div className="absolute top-4 right-4 text-navy-400 opacity-60" aria-hidden="true">
              <Users className="w-8 h-8" />
            </div>

            <div
              className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center font-serif text-3xl font-extrabold text-navy-900 mb-6"
              aria-hidden="true"
            >
              {viceChairman.initials}
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-navy-900 bg-navy-50 px-3 py-1 rounded-full border border-navy-200 mb-2">
              {viceChairman.title}
            </span>

            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-2">
              {viceChairman.name}
            </h2>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 my-3 w-full">
              <span className="text-xs text-slate-700 uppercase tracking-wider block font-semibold">
                Credentials:
              </span>
              <p className="text-xs font-medium text-navy-900 mt-1 leading-relaxed">
                {viceChairman.credentials}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
              {viceChairman.description}
            </p>
          </div>
        </div>

        {/* Executive Directors */}
        <div>
          <div className="border-b border-slate-200 pb-4 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
              <span>
                <LText en="Executive Directors" ta="செயல் இயக்குநர்கள்" />
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Presbyters, theologians, and ministry leaders serving on the diocesan executive board.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveDirectors.map((director) => (
              <Card key={director.id} className="flex flex-col items-center text-center p-6">
                <div
                  className="w-16 h-16 rounded-full bg-navy-50 border border-gold-300 flex items-center justify-center font-serif text-lg font-bold text-navy-900 mb-4 shadow-sm"
                  aria-hidden="true"
                >
                  {director.initials}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-gold-900 bg-gold-100 px-2.5 py-0.5 rounded-full border border-gold-300 mb-2">
                  {director.title}
                </span>

                <h3 className="font-serif font-bold text-base text-navy-950 mb-1">
                  {director.name}
                </h3>

                <p className="text-xs font-medium text-slate-700 leading-snug">
                  {director.credentials}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
