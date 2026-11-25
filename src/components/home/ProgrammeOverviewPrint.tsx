"use client";

import React from "react";
import { Printer, GraduationCap, BookOpen } from "lucide-react";
import { allDegreesOffered, schoolsAndDivisions } from "@/data/academics";
import { biblicalMinistryModules } from "@/data/curriculum";
import { institutionConfig } from "@/data/config";

export const ProgrammeOverviewPrint: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold text-gold-800 uppercase tracking-wider block">
            Official Course Documentation
          </span>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mt-1">
            Printable Academic &amp; Curriculum Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Generate an archival prospectus sheet for church councils, presbyteries, or personal records.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-navy-900 text-white hover:bg-navy-800 text-xs font-bold font-sans uppercase tracking-wider shadow-sm transition-colors duration-200 shrink-0 min-h-[44px]"
        >
          <Printer className="w-4 h-4 text-gold-400" aria-hidden="true" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Sheet View */}
      <div className="print-area mt-6 space-y-8 text-navy-950">
        <div className="text-center pb-4 border-b border-slate-200">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
            {institutionConfig.institutionName}
          </h3>
          <p className="text-xs text-gold-800 font-semibold mt-1">
            {institutionConfig.diocesanAffiliation} • Registered under {institutionConfig.registeredUnder}
          </p>
          <p className="text-xs text-slate-700 mt-1 font-medium">
            Tamil Nadu Reg: {institutionConfig.registrations.tamilNadu.number} | Karnataka Reg:{" "}
            {institutionConfig.registrations.karnataka.number}
          </p>
        </div>

        {/* Divisions */}
        <div>
          <h4 className="font-serif text-sm font-bold text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gold-700" aria-hidden="true" />
            <span>Schools &amp; Academic Divisions</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {schoolsAndDivisions.map((s) => (
              <div key={s.id} className="border-l-4 border-navy-900 pl-3.5 py-1">
                <span className="font-serif font-bold text-navy-950 text-sm block">{s.name}</span>
                <span className="text-slate-700 block mt-1 leading-relaxed">{s.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Degrees */}
        <div>
          <h4 className="font-serif text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">
            Conferred Degrees ({allDegreesOffered.length} Ecclesiastical Programmes)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-xs border-t border-slate-200 pt-3">
            {allDegreesOffered.map((deg) => (
              <div key={deg.code} className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <span className="font-bold text-navy-950 block">
                    {deg.code} — {deg.title}
                  </span>
                  <span className="text-slate-700 text-xs block">{deg.level}</span>
                </div>
                <span className="text-gold-800 font-bold text-xs shrink-0">{deg.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div>
          <h4 className="font-serif text-sm font-bold text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold-700" aria-hidden="true" />
            <span>Biblical Ministry Studies ({biblicalMinistryModules.length} Prescribed Modules)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-xs border-t border-slate-200 pt-3">
            {biblicalMinistryModules.map((m) => (
              <div key={m.id} className="border-b border-slate-100 pb-2.5">
                <span className="font-bold text-navy-950 block">
                  Module {m.id}: {m.title}
                </span>
                <span className="text-xs text-slate-700 block mt-0.5 line-clamp-2">
                  {m.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-700 italic">
          {institutionConfig.legalNote}
        </div>
      </div>
    </div>
  );
};
export default ProgrammeOverviewPrint;
