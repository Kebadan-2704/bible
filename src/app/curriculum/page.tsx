"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { biblicalMinistryModules, CurriculumModule } from "@/data/curriculum";
import {
  BookOpen,
  Globe,
  Scale,
  HeartHandshake,
  Church,
  Scroll,
  BookOpenCheck,
  CheckCircle2,
  Filter,
} from "lucide-react";

export default function CurriculumPage() {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [filterQuery, setFilterQuery] = useState("");

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      case "Globe":
        return <Globe className="w-5 h-5" />;
      case "Scale":
        return <Scale className="w-5 h-5" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5" />;
      case "Church":
        return <Church className="w-5 h-5" />;
      case "Scroll":
        return <Scroll className="w-5 h-5" />;
      default:
        return <BookOpenCheck className="w-5 h-5" />;
    }
  };

  const filteredModules = biblicalMinistryModules.filter((m) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.topics.some((t) => t.title.toLowerCase().includes(q))
    );
  });

  const activeModule = biblicalMinistryModules.find((m) => m.id === selectedModuleId) || biblicalMinistryModules[0];

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Seven Curricular Modules"
          title="Biblical Ministry Studies Curriculum"
          subtitle="A comprehensive theological progression covering scriptural foundations, comparative religions, ethics, pastoral counseling, dogmatics, and biblical theologies."
        />

        {/* Filter / Search Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-300 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-navy-950 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-gold-600" />
            <span>Interactive Curriculum Navigator</span>
          </div>

          <div className="w-full sm:w-80">
            <label htmlFor="curriculum-filter" className="sr-only">
              Filter curriculum topics
            </label>
            <input
              id="curriculum-filter"
              type="text"
              aria-label="Filter curriculum topics"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter topics (e.g., Theodicy, Trinity, Canon)..."
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg border-2 border-slate-600 focus:border-navy-950 focus:ring-2 focus:ring-gold-400 text-navy-950 placeholder:text-slate-600 bg-white"
            />
          </div>
        </div>

        {/* Desktop / Tablet Tab Strip */}
        <div className="hidden lg:grid grid-cols-7 gap-2 mb-10 pb-4 border-b border-slate-200" role="tablist">
          {biblicalMinistryModules.map((m) => {
            const isActive = m.id === selectedModuleId;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedModuleId(m.id)}
                className={`p-3.5 rounded-xl border text-left transition-[background-color,border-color,box-shadow] duration-200 flex flex-col justify-between min-h-[90px] ${
                  isActive
                    ? "bg-navy-900 text-white border-gold-400 shadow-md ring-2 ring-gold-400/50"
                    : "bg-white text-navy-950 border-slate-200 hover:border-gold-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-gold-500 text-[#061026]" : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    M-{m.id}
                  </span>
                  <div className={isActive ? "text-gold-300" : "text-slate-600"}>
                    {getModuleIcon(m.iconName)}
                  </div>
                </div>
                <span className="font-serif font-bold text-xs line-clamp-2 leading-tight">
                  {m.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Horizontal Module Switcher */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-8 no-scrollbar" role="tablist">
          {biblicalMinistryModules.map((m) => {
            const isActive = m.id === selectedModuleId;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedModuleId(m.id)}
                className={`px-4 py-3 rounded-xl border text-xs font-serif font-bold whitespace-nowrap shrink-0 transition-[background-color,border-color,box-shadow] duration-200 min-h-[44px] ${
                  isActive
                    ? "bg-navy-900 text-white border-gold-400 shadow-sm"
                    : "bg-white text-navy-950 border-slate-200"
                }`}
              >
                Module {m.id}: {m.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Active Module Detail Banner */}
        <div
          id={`module-${activeModule.id}`}
          className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10 mb-12 relative overflow-hidden"
        >
          {/* Accent top stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: activeModule.color }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${activeModule.badgeBg}`}
                >
                  Module {activeModule.id} of 7
                </span>
                <span className="text-xs text-slate-700 font-semibold">Biblical Ministry Studies</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-navy-950">
                {activeModule.title}
              </h2>
            </div>

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
              style={{ backgroundColor: activeModule.color }}
              aria-hidden="true"
            >
              {getModuleIcon(activeModule.iconName)}
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            {activeModule.description}
          </p>

          {/* Module Topics Grid */}
          <div className="mt-8">
            <h3 className="font-serif text-lg font-bold text-navy-950 uppercase tracking-wider mb-4 border-l-3 border-gold-500 pl-3">
              Official Prescribed Topics &amp; Sub-Units
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeModule.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gold-300 transition-[border-color,box-shadow] duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: activeModule.color }}
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-navy-950 mb-1">
                        {topic.title}
                      </h4>

                      {topic.subtopics && topic.subtopics.length > 0 && (
                        <ul className="text-xs text-slate-700 space-y-1.5 mt-2">
                          {topic.subtopics.map((st, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5" aria-hidden="true" />
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {topic.note && (
                        <p className="text-xs text-amber-950 bg-amber-50 p-2.5 rounded mt-2 border border-amber-300 font-medium">
                          {topic.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* World Religions Comparative Section (Module 2 specific feature) */}
          {activeModule.comparisons && (
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h3 className="font-serif text-xl font-bold text-navy-950 mb-2">
                World&apos;s Major Religions — Comparative Summary
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Transcribed from Brochure 2 comparative analysis section providing neutral, factual theological distinctions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeModule.comparisons.map((c) => (
                  <div
                    key={c.religion}
                    className="p-5 rounded-2xl bg-white border border-gold-300 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-lg text-navy-950">
                        {c.religion}
                      </h4>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                        {c.theisticType}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-700">
                      <p>
                        <strong className="text-navy-950">Beliefs:</strong> {c.coreBeliefs}
                      </p>
                      <p>
                        <strong className="text-navy-950">Texts / Path:</strong> {c.sacredTextsOrPath}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between gap-2">
            {activeModule.id > 1 ? (
              <button
                type="button"
                onClick={() => setSelectedModuleId(activeModule.id - 1)}
                className="text-xs font-bold font-serif text-navy-950 hover:text-gold-700 min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 hover:border-gold-400 bg-white shadow-xs whitespace-nowrap"
              >
                ← Previous
              </button>
            ) : (
              <div className="w-20" aria-hidden="true" />
            )}

            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
              Module {activeModule.id} of 7
            </span>

            {activeModule.id < 7 ? (
              <button
                type="button"
                onClick={() => setSelectedModuleId(activeModule.id + 1)}
                className="text-xs font-bold font-serif text-navy-950 hover:text-gold-700 min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 hover:border-gold-400 bg-white shadow-xs whitespace-nowrap"
              >
                Next Module →
              </button>
            ) : (
              <div className="w-20" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Call to Enrol Banner */}
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-3xl p-8 sm:p-10 border border-gold-400 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Enroll in Biblical Ministry Studies
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
              All 7 modules are integrated into our Bachelor of Divinity (B.D.), Bachelor of Theology (B.Th.), and modular ordination preparation courses.
            </p>
          </div>
          <div className="p-1 rounded-2xl bg-navy-950 border border-navy-800 shrink-0">
            <Button
              href="/admissions#apply"
              variant="gold"
              size="lg"
              className="text-[#061026] font-extrabold shadow-md"
            >
              Enrol in Modules Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
