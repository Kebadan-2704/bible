"use client";

import React from "react";
import Link from "next/link";
import { affiliatedInstitutionsList } from "@/data/affiliations";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

export const AffiliationsStrip: React.FC = () => {
  const { t } = useLocale();

  return (
    <section className="bg-slate-50 py-14 sm:py-16 border-b border-slate-200">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gold-800 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-gold-700" aria-hidden="true" />
              <span>{t.home.affiliationsBadge}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-1">
              {t.home.affiliationsTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-700">{t.home.affiliationsSubtitle}</p>
          </div>

          <Link
            href="/affiliations"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy-900 hover:text-gold-800 font-sans min-h-[40px] px-2 py-1 rounded"
          >
            <span>{t.home.viewAffiliationsDetails}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* SVG Country Flag Partner Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {affiliatedInstitutionsList.map((inst) => (
            <div
              key={inst.id}
              className="bg-white p-6 rounded-xl border border-slate-300 hover:border-gold-400 shadow-sm hover:shadow-md transition-[border-color,box-shadow] duration-200 text-center flex flex-col items-center justify-center group"
            >
              <div className="mb-3 transition-transform duration-200 group-hover:scale-105">
                <CountryFlag countryCode={inst.countryCode} className="w-14 h-9" />
              </div>
              <p className="font-serif font-bold text-sm sm:text-base text-navy-950 group-hover:text-gold-800 transition-colors">
                {inst.name}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">{inst.country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
