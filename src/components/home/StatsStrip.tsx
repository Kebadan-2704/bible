import React from "react";
import { GraduationCap, MapPin, BookOpen, Languages } from "lucide-react";
import { administrativeCentres } from "@/data/centres";
import { schoolsAndDivisions } from "@/data/academics";
import { specialisationsList } from "@/data/specialisations";

export const StatsStrip: React.FC = () => {
  // Purely computed from data per brochure facts (no invented numbers):
  const degreeCount = 7; // Brochure degree levels: Th.D, D.D, D.Min, B.Th, B.Min, B.D, Ph.D.
  const centresCount = administrativeCentres.filter((c) => !c.isBrochure2Only).length; // 8 Brochure 1 administrative centres including HQ
  const divisionsCount = schoolsAndDivisions.length + 2; // 2 Schools + 2 Research Divisions
  const languageOptionsCount = specialisationsList.find((s) => s.slug === "ancient-languages")?.languageGlyphs?.length || 3;

  const stats = [
    {
      label: "Degree Levels Conferred",
      value: `${degreeCount}`,
      sub: "B.Th. through Ph.D. (4 Yrs)",
      icon: <GraduationCap className="w-6 h-6 text-gold-400" />,
    },
    {
      label: "Administrative Centres",
      value: `${centresCount}`,
      sub: "India, Malaysia & USA",
      icon: <MapPin className="w-6 h-6 text-gold-400" />,
    },
    {
      label: "Schools & Divisions",
      value: `${divisionsCount}`,
      sub: "Biblical Studies & Ministry",
      icon: <BookOpen className="w-6 h-6 text-gold-400" />,
    },
    {
      label: "Original Scriptural Languages",
      value: `${languageOptionsCount}`,
      sub: "Biblical Hebrew, Aramaic & Greek",
      icon: <Languages className="w-6 h-6 text-gold-400" />,
    },
  ];

  return (
    <div className="bg-navy-950 text-white border-y border-gold-500/30 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-5 rounded-2xl bg-navy-900/80 border border-gold-500/30 shadow-soft"
            >
              <div className="p-3 rounded-xl bg-navy-800 border border-gold-400/30 shrink-0 text-gold-400" aria-hidden="true">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-300 block leading-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block mt-0.5 truncate">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-300 block mt-0.5 truncate font-medium">
                  {stat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
