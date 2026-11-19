import React from "react";
import Link from "next/link";
import { affiliatedInstitutionsList } from "@/data/affiliations";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const AffiliationsStrip: React.FC = () => {
  return (
    <section className="bg-slate-50 py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gold-800 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-gold-600" aria-hidden="true" />
              <span>International Institutional Network</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 mt-1">
              Affiliated &amp; Partner Institutions
            </h3>
            <p className="text-xs sm:text-sm text-slate-700">
              Partner / affiliated institutions as listed in official institution documentation.
            </p>
          </div>

          <Link
            href="/affiliations"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-gold-700 font-serif min-h-[36px]"
          >
            <span>View Full Details &amp; Disclaimer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Flag Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {affiliatedInstitutionsList.map((inst) => (
            <div
              key={inst.id}
              className="bg-white p-4 rounded-xl border border-slate-300 hover:border-gold-400 shadow-sm hover:shadow-md transition-[border-color,box-shadow] duration-200 text-center flex flex-col items-center justify-center group"
            >
              <span className="text-3xl mb-2 filter drop-shadow-xs group-hover:scale-110 transition-transform" aria-hidden="true">
                {inst.flagIcon}
              </span>
              <p className="font-serif font-bold text-xs sm:text-sm text-navy-950 group-hover:text-gold-700 transition-colors">
                {inst.name}
              </p>
              <p className="text-xs text-slate-700 font-medium mt-0.5">{inst.country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
