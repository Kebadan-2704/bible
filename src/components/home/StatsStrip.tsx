"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, MapPin, BookOpen, Languages } from "lucide-react";
import { administrativeCentres } from "@/data/centres";
import { allDegreesOffered, schoolsAndDivisions } from "@/data/academics";
import { useLocale } from "@/components/providers/LocaleProvider";

export const StatsStrip: React.FC = () => {
  const { t } = useLocale();

  const degreeCount = allDegreesOffered.length; // Reconciled to authoritative 10 degree levels
  const centresCount = administrativeCentres.length; // Reconciled to verified 8 administrative centres
  const divisionsCount = schoolsAndDivisions.length + 2; // 2 Schools + 2 Research & Doctoral divisions
  const languageOptionsCount = 3; // Biblical Hebrew, Aramaic, Koine Greek

  const stats = [
    {
      href: "/academics",
      label: t.home.statDegrees,
      value: `${degreeCount}`,
      sub: t.home.statDegreesSub,
      icon: <GraduationCap className="w-6 h-6 text-gold-300" />,
    },
    {
      href: "/centres",
      label: t.home.statCentres,
      value: `${centresCount}`,
      sub: t.home.statCentresSub,
      icon: <MapPin className="w-6 h-6 text-gold-300" />,
    },
    {
      href: "/academics#schools",
      label: t.home.statSchools,
      value: `${divisionsCount}`,
      sub: t.home.statSchoolsSub,
      icon: <BookOpen className="w-6 h-6 text-gold-300" />,
    },
    {
      href: "/academics/ancient-languages",
      label: t.home.statLanguages,
      value: `${languageOptionsCount}`,
      sub: t.home.statLanguagesSub,
      icon: <Languages className="w-6 h-6 text-gold-300" />,
    },
  ];

  return (
    <div className="bg-navy-950 text-white border-y-2 border-gold-500/50 relative z-20 overflow-hidden shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-7 sm:py-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <Link
              key={idx}
              href={stat.href}
              className="group flex items-center gap-4 p-5 sm:p-6 rounded-xl bg-navy-900/65 hover:bg-navy-900 border border-navy-800 hover:border-gold-400/60 transition-[background-color,border-color] duration-150"
            >
              <div
                className="p-3 rounded-xl bg-navy-950 border border-gold-400/40 group-hover:border-gold-400 shrink-0"
                aria-hidden="true"
              >
                {stat.icon}
              </div>
              <div className="min-w-0">
                <span className="font-serif text-3xl sm:text-[34px] xl:text-4xl font-extrabold text-gold-300 block leading-none">
                  {stat.value}
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-gold-200 block mt-1.5 leading-snug">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-sm text-slate-300 block mt-0.5 leading-snug font-medium">
                  {stat.sub}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
