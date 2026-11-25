"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { biblicalMinistryModules, CurriculumModule } from "@/data/curriculum";
import { useLocale } from "@/components/providers/LocaleProvider";
import {
  BookOpen,
  Globe,
  Scale,
  HeartHandshake,
  Church,
  Scroll,
  BookOpenCheck,
  Filter,
  X,
} from "lucide-react";

function parseModuleHash(hash: string): number | null {
  const match = hash.match(/^#module-([1-7])$/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return parsed >= 1 && parsed <= 7 ? parsed : null;
}

export const CurriculumExplorer: React.FC = () => {
  const { locale } = useLocale();
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [filterQuery, setFilterQuery] = useState("");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Sync module selection with URL hash (#module-1 .. #module-7) on load & browser Back/Forward
  useEffect(() => {
    const applyHash = () => {
      const fromHash = parseModuleHash(window.location.hash);
      if (fromHash) setSelectedModuleId(fromHash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    window.addEventListener("popstate", applyHash);
    return () => {
      window.removeEventListener("hashchange", applyHash);
      window.removeEventListener("popstate", applyHash);
    };
  }, []);

  const selectModule = (id: number) => {
    setSelectedModuleId(id);
    if (typeof window !== "undefined") {
      const targetHash = `#module-${id}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, "", targetHash);
      }
    }
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number, isMobile = false) => {
    const count = biblicalMinistryModules.length;
    let nextIdx = idx;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % count;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + count) % count;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = count - 1;
    else return;

    e.preventDefault();
    const target = biblicalMinistryModules[nextIdx];
    if (target) {
      selectModule(target.id);
      const refSet = isMobile ? mobileTabRefs : tabRefs;
      refSet.current[nextIdx]?.focus();
    }
  };

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-5 h-5" aria-hidden="true" />;
      case "Globe":
        return <Globe className="w-5 h-5" aria-hidden="true" />;
      case "Scale":
        return <Scale className="w-5 h-5" aria-hidden="true" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5" aria-hidden="true" />;
      case "Church":
        return <Church className="w-5 h-5" aria-hidden="true" />;
      case "Scroll":
        return <Scroll className="w-5 h-5" aria-hidden="true" />;
      default:
        return <BookOpenCheck className="w-5 h-5" aria-hidden="true" />;
    }
  };

  const trimmedQuery = filterQuery.trim().toLowerCase();

  // Live filtered search across all 7 modules, topics, subtopics & comparative summaries (TIU-007)
  const searchResults = useMemo(() => {
    if (!trimmedQuery) return null;
    const matches: Array<{
      mod: CurriculumModule;
      matchingTopics: CurriculumModule["topics"];
    }> = [];

    for (const mod of biblicalMinistryModules) {
      const modLevelMatch =
        mod.title.toLowerCase().includes(trimmedQuery) ||
        mod.description.toLowerCase().includes(trimmedQuery);

      const matchingTopics = mod.topics.filter(
        (t) =>
          t.title.toLowerCase().includes(trimmedQuery) ||
          (t.subtopics || []).some((st) => st.toLowerCase().includes(trimmedQuery))
      );

      if (modLevelMatch || matchingTopics.length > 0) {
        matches.push({
          mod,
          matchingTopics: matchingTopics.length > 0 ? matchingTopics : mod.topics,
        });
      }
    }
    return matches;
  }, [trimmedQuery]);

  const activeModule =
    biblicalMinistryModules.find((m) => m.id === selectedModuleId) ||
    biblicalMinistryModules[0];

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={locale === "ta" ? "ஏழு பாடத்திட்டப் பிரிவுகள்" : "Seven Curricular Modules"}
          title={
            locale === "ta"
              ? "வேதாகம ஊழியப் படிப்புகள் பாடத்திட்டம்"
              : "Biblical Ministry Studies Curriculum"
          }
          subtitle={
            locale === "ta"
              ? "வேதாகம அடிப்படைகள், உலக மதங்கள், கிறிஸ்தவ நெறிமுறைகள், ஆலோசனை, கோட்பாடுகள் மற்றும் புதிய/பழைய ஏற்பாட்டு இறையியலை உள்ளடக்கிய பாடத்திட்டம்."
              : "A comprehensive theological progression covering scriptural foundations, comparative religions, ethics, pastoral counselling, doctrines, and biblical theologies."
          }
        />

        {/* Filter / Search Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-300 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-navy-950 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-gold-700 shrink-0" aria-hidden="true" />
            <span>
              {locale === "ta"
                ? "பாடத்திட்டத் தேடல் & பிரிவு தேர்வு"
                : "Interactive Curriculum Search & Navigator"}
            </span>
          </div>

          <div className="relative w-full sm:w-96 flex items-center">
            <label htmlFor="curriculum-filter" className="sr-only">
              Filter curriculum topics across all 7 modules
            </label>
            <input
              id="curriculum-filter"
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={
                locale === "ta"
                  ? "தலைப்புகளைத் தேடுங்கள் (எ.கா. Theodicy, Trinity, Canon)..."
                  : "Search all 7 modules (e.g., Theodicy, Trinity, Canon)..."
              }
              className="w-full pl-3.5 pr-10 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-500 focus:border-navy-950 focus:ring-2 focus:ring-gold-300 text-navy-950 placeholder:text-slate-600 bg-white"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery("")}
                aria-label="Clear topic filter"
                className="absolute right-1.5 p-2 text-slate-600 hover:text-navy-950 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-md"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Live Filtered Cross-Module View OR Standard 7-Module Tab View */}
        {searchResults ? (
          <div className="mb-12 space-y-6" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-950 text-white px-5 py-3.5 rounded-xl">
              <p className="text-xs sm:text-sm font-medium">
                Showing <strong>{searchResults.length}</strong>{" "}
                {searchResults.length === 1 ? "matching module" : "matching modules"} for{" "}
                <strong className="text-gold-300">&ldquo;{filterQuery}&rdquo;</strong>
              </p>
              <button
                type="button"
                onClick={() => setFilterQuery("")}
                className="px-3 py-1.5 text-xs font-bold bg-gold-500 text-navy-950 hover:bg-gold-400 rounded-md min-h-[32px]"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
                <h2 className="font-serif text-xl font-bold text-navy-950">
                  No Curriculum Topics Matched &ldquo;{filterQuery}&rdquo;
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Try keywords such as <em>Trinity</em>, <em>Canon</em>, <em>Theodicy</em>,{" "}
                  <em>Counselling</em>, <em>Covenant</em>, or <em>Salvation</em>.
                </p>
                <button
                  type="button"
                  onClick={() => setFilterQuery("")}
                  className="inline-flex items-center px-5 py-2.5 bg-navy-900 text-white rounded-lg text-xs font-bold min-h-[44px]"
                >
                  Reset All Modules
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map(({ mod, matchingTopics }) => (
                  <div
                    key={mod.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-5 relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{ backgroundColor: mod.color }}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${mod.badgeBg}`}
                        >
                          Module {mod.id}
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 mt-2">
                          {mod.title}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFilterQuery("");
                          selectModule(mod.id);
                        }}
                        className="px-4 py-2 text-xs font-bold border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white rounded-lg min-h-[40px]"
                      >
                        Open Full Module {mod.id} →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matchingTopics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-50 border border-slate-200"
                        >
                          <h3 className="font-serif font-bold text-sm sm:text-base text-navy-950 mb-1.5">
                            {topic.title}
                          </h3>
                          {topic.subtopics && (
                            <ul className="text-xs text-slate-700 space-y-1">
                              {topic.subtopics.map((st, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-1.5">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0 mt-1.5"
                                    aria-hidden="true"
                                  />
                                  <span>{st}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Tab Strip (Full ARIA roving tabIndex) */}
            <div
              className="hidden lg:grid grid-cols-7 gap-2 mb-10 pb-4 border-b border-slate-200"
              role="tablist"
              aria-label="Curriculum Modules"
            >
              {biblicalMinistryModules.map((m, idx) => {
                const isActive = m.id === selectedModuleId;
                return (
                  <button
                    key={m.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    id={`tab-module-${m.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`module-${m.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectModule(m.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx, false)}
                    className={`p-3.5 rounded-xl border text-left transition-[background-color,border-color,box-shadow] duration-200 flex flex-col justify-between min-h-[90px] ${
                      isActive
                        ? "bg-navy-900 text-white border-gold-400 shadow-md ring-2 ring-gold-400/50"
                        : "bg-white text-navy-950 border-slate-300 hover:border-gold-400 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-gold-500 text-navy-950"
                            : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        M-{m.id}
                      </span>
                      <div className={isActive ? "text-gold-300" : "text-slate-700"}>
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

            {/* Mobile / Tablet Horizontal Module Switcher */}
            <div
              className="lg:hidden flex overflow-x-auto gap-2 pb-3 mb-8 scroll-smooth"
              role="tablist"
              aria-label="Curriculum Modules Mobile"
            >
              {biblicalMinistryModules.map((m, idx) => {
                const isActive = m.id === selectedModuleId;
                return (
                  <button
                    key={m.id}
                    ref={(el) => {
                      mobileTabRefs.current[idx] = el;
                    }}
                    id={`mobile-tab-module-${m.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`module-${m.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectModule(m.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx, true)}
                    className={`px-4 py-3 rounded-xl border text-xs font-sans font-bold whitespace-nowrap shrink-0 transition-colors min-h-[44px] ${
                      isActive
                        ? "bg-navy-900 text-white border-gold-400 shadow-sm"
                        : "bg-white text-navy-950 border-slate-300"
                    }`}
                  >
                    Module {m.id}: {m.shortTitle}
                  </button>
                );
              })}
            </div>

            {/* Active Module Detail Panel */}
            <div
              id={`module-${activeModule.id}`}
              role="tabpanel"
              aria-labelledby={`tab-module-${activeModule.id}`}
              tabIndex={0}
              className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-10 mb-12 relative overflow-hidden scroll-mt-28"
            >
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: activeModule.color }}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${activeModule.badgeBg}`}
                    >
                      Module {activeModule.id} of 7
                    </span>
                    <span className="text-xs text-slate-700 font-semibold">
                      Biblical Ministry Studies
                    </span>
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
                <h3 className="font-serif text-lg font-bold text-navy-950 uppercase tracking-wider mb-4 border-l-4 border-gold-500 pl-3">
                  Prescribed Topics &amp; Sub-Units
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeModule.topics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gold-400 transition-[border-color,box-shadow] duration-200"
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
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0 mt-1.5"
                                    aria-hidden="true"
                                  />
                                  <span>{st}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* World Religions Comparative Section (Module 2) */}
              {activeModule.comparisons && (
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <h3 className="font-serif text-xl font-bold text-navy-950 mb-2">
                    World&apos;s Major Religions — Comparative Summary
                  </h3>
                  <p className="text-xs text-slate-700 mb-6">
                    Introductory comparative overview highlighting core beliefs and primary scriptural texts.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activeModule.comparisons.map((c) => (
                      <div
                        key={c.religion}
                        className="p-5 rounded-2xl bg-white border border-gold-300 shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
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
                            <strong className="text-navy-950">Texts / Path:</strong>{" "}
                            {c.sacredTextsOrPath}
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
                    onClick={() => selectModule(activeModule.id - 1)}
                    className="text-xs font-bold font-sans text-navy-950 hover:text-gold-800 min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 hover:border-gold-400 bg-white shadow-sm whitespace-nowrap"
                  >
                    ← Previous Module
                  </button>
                ) : (
                  <div className="w-24" aria-hidden="true" />
                )}

                <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                  Module {activeModule.id} of 7
                </span>

                {activeModule.id < 7 ? (
                  <button
                    type="button"
                    onClick={() => selectModule(activeModule.id + 1)}
                    className="text-xs font-bold font-sans text-navy-950 hover:text-gold-800 min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 hover:border-gold-400 bg-white shadow-sm whitespace-nowrap"
                  >
                    Next Module →
                  </button>
                ) : (
                  <div className="w-24" aria-hidden="true" />
                )}
              </div>
            </div>
          </>
        )}

        {/* Call to Enrol Banner */}
        <div className="bg-navy-950 bg-gradient-to-r from-navy-950 to-navy-900 text-white rounded-3xl p-8 sm:p-10 border border-gold-400 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 relative overflow-hidden">
          <div className="lg:col-span-7 relative z-10 space-y-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {locale === "ta"
                  ? "வேதாகம ஊழியப் பாடத்திட்டத்தில் இணையுங்கள்"
                  : "Enrol in Biblical Ministry Studies"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
                All 7 modules are integrated into our Bachelor of Divinity (B.D.), Bachelor of Theology (B.Th.), and modular ordination preparation tracks.
              </p>
            </div>
            <Button
              href="/admissions#apply"
              variant="gold"
              size="lg"
              className="text-navy-950 font-extrabold shadow-md shrink-0"
            >
              {locale === "ta" ? "பாடத்திட்டத்தில் இணைய" : "Enrol in Modules Now"}
            </Button>
          </div>
          <div className="lg:col-span-5 relative z-10">
            <div className="rounded-2xl overflow-hidden border border-gold-400/40 bg-navy-950">
              <Image
                src="/images/ministry-modules-emblem.svg"
                alt="Seven golden pillars symbolizing the seven Biblical Ministry Studies modules"
                width={1200}
                height={800}
                unoptimized
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurriculumExplorer;
