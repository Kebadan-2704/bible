"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  GraduationCap,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { Crest } from "@/components/ui/Crest";
import { navSpecialisations } from "@/data/navData";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

const GlobalSearchModal = dynamic(
  () => import("@/components/search/GlobalSearchModal"),
  { ssr: false }
);

type OpenDropdown = "about" | "academics" | "research" | null;

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const { locale, t } = useLocale();

  const headerRef = useRef<HTMLElement>(null);
  const desktopSearchBtnRef = useRef<HTMLButtonElement>(null);
  const mobileSearchBtnRef = useRef<HTMLButtonElement>(null);
  const mobileToggleBtnRef = useRef<HTMLButtonElement>(null);
  const aboutBtnRef = useRef<HTMLButtonElement>(null);
  const academicsBtnRef = useRef<HTMLButtonElement>(null);
  const researchBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      // Ctrl+K / Cmd+K search activation without hijacking editable form fields
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const target = e.target as HTMLElement | null;
        const isEditable =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.isContentEditable);
        if (isEditable && !searchModalOpen) return;

        e.preventDefault();
        setOpenDropdown(null);
        setMobileMenuOpen(false);
        setSearchModalOpen((prev) => !prev);
        return;
      }

      if (e.key === "Escape") {
        if (openDropdown === "about") aboutBtnRef.current?.focus();
        else if (openDropdown === "academics") academicsBtnRef.current?.focus();
        else if (openDropdown === "research") researchBtnRef.current?.focus();
        setOpenDropdown(null);
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          mobileToggleBtnRef.current?.focus();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleGlobalKeys);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeys);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, mobileMenuOpen, searchModalOpen]);

  // Close menus on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const handleNavBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpenDropdown(null);
    }
  };

  const isAboutActive =
    pathname.startsWith("/about") ||
    pathname.startsWith("/vision-and-mission") ||
    pathname.startsWith("/governance") ||
    pathname.startsWith("/accreditations") ||
    pathname.startsWith("/certificates-and-awards");

  const isResearchActive =
    pathname.startsWith("/research") ||
    pathname.startsWith("/doctoral") ||
    pathname.startsWith("/affiliations");

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow] duration-300",
          isScrolled
            ? "bg-navy-950/95 backdrop-blur-md shadow-lg border-b border-gold-500/30"
            : "bg-navy-900 border-b border-navy-800"
        )}
      >
        {/* Top Diocesan Identity Bar */}
        <div className="bg-navy-950 border-b border-navy-800 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-1.5 text-xs sm:text-[13px] text-slate-200">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" aria-hidden="true" />
              <span className="font-serif tracking-wide text-gold-300 uppercase font-semibold text-xs sm:text-[13px] truncate">
                {t.diocese}
              </span>
              <span className="hidden lg:inline text-slate-400 font-bold" aria-hidden="true">
                |
              </span>
              <span className="hidden lg:inline text-xs sm:text-[13px] text-slate-200 italic truncate">
                {t.tagline}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-[13px] shrink-0">
              <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300 font-medium whitespace-nowrap">
                HQ: <strong className="text-gold-300 font-semibold">YGM – Bangalore</strong>
              </span>

              <Link
                href="/prospectus"
                className="inline-flex items-center gap-1 text-slate-200 hover:text-gold-300 font-medium transition-colors px-2 py-1 rounded min-h-[28px] whitespace-nowrap"
              >
                <FileCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
                <span>{t.nav.prospectus}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16">
          <div className="flex items-center justify-between gap-2 sm:gap-3 h-16 sm:h-[74px]">
            {/* Logo and Institution Title (flexible min-w-0 on narrow mobile, full width on xl/widescreen) */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group min-w-0 flex-1 lg:flex-initial lg:shrink-0 focus:outline-none rounded-md"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              <Crest size={42} className="shrink-0 sm:w-11 sm:h-11 transition-transform group-hover:scale-105" />
              <div className="flex flex-col min-w-0">
                <span
                  className={cn(
                    "font-serif font-bold text-white tracking-tight leading-tight group-hover:text-gold-300 transition-colors truncate lg:max-w-[165px] xl:max-w-[310px] 2xl:max-w-none",
                    locale === "ta" ? "text-xs sm:text-sm" : "text-sm sm:text-[15px] 2xl:text-[17px]"
                  )}
                >
                  {t.institutionName}
                </span>
                <span className="text-[11px] sm:text-xs text-gold-300 font-medium tracking-wide truncate lg:max-w-[165px] xl:max-w-[310px] 2xl:max-w-none">
                  {locale === "ta"
                    ? "கிறிஸ்தவ சட்ட ஒழுங்கு மற்றும் மரபுகள்"
                    : "Christian Legal Rites & Traditions"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Full-width single-row fit >= 1024px) */}
            <nav
              className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-3 shrink-0"
              aria-label="Main Navigation"
            >
              {/* About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("about")}
                onMouseLeave={() => setOpenDropdown(null)}
                onBlur={handleNavBlur}
              >
                <button
                  ref={aboutBtnRef}
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "about" ? null : "about")}
                  className={cn(
                    "flex items-center gap-1 px-1.5 xl:px-2 2xl:px-3.5 py-2 text-xs xl:text-[13px] 2xl:text-[15px] font-semibold rounded-md transition-colors font-sans whitespace-nowrap min-h-[40px]",
                    isAboutActive
                      ? "text-gold-300 bg-white/10"
                      : "text-slate-100 hover:text-white hover:bg-white/5"
                  )}
                  aria-expanded={openDropdown === "about"}
                  aria-haspopup="true"
                  aria-controls="nav-about-menu"
                >
                  <span>{t.nav.about}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
                </button>
                {openDropdown === "about" && (
                  <div
                    id="nav-about-menu"
                    className="absolute top-full left-0 pt-1.5 w-64 z-50"
                  >
                    <div className="bg-navy-950 text-white rounded-xl shadow-2xl border border-gold-500/40 p-2 space-y-1 tiu-panel-enter">
                      <Link
                        href="/about"
                        aria-current={pathname === "/about" ? "page" : undefined}
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.aboutInst}
                      </Link>
                      <Link
                        href="/vision-and-mission"
                        aria-current={pathname === "/vision-and-mission" ? "page" : undefined}
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.visionMission}
                      </Link>
                      <Link
                        href="/governance"
                        aria-current={pathname === "/governance" ? "page" : undefined}
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.governance}
                      </Link>
                      <Link
                        href="/accreditations"
                        aria-current={pathname === "/accreditations" ? "page" : undefined}
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.accreditations}
                      </Link>
                      <Link
                        href="/certificates-and-awards"
                        aria-current={pathname === "/certificates-and-awards" ? "page" : undefined}
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.certificates}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Academics Mega-Menu */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("academics")}
                onMouseLeave={() => setOpenDropdown(null)}
                onBlur={handleNavBlur}
              >
                <button
                  ref={academicsBtnRef}
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "academics" ? null : "academics")}
                  className={cn(
                    "flex items-center gap-1 px-1.5 xl:px-2 2xl:px-3.5 py-2 text-xs xl:text-[13px] 2xl:text-[15px] font-semibold rounded-md transition-colors font-sans whitespace-nowrap min-h-[40px]",
                    pathname.startsWith("/academics")
                      ? "text-gold-300 bg-white/10"
                      : "text-slate-100 hover:text-white hover:bg-white/5"
                  )}
                  aria-expanded={openDropdown === "academics"}
                  aria-haspopup="true"
                  aria-controls="nav-academics-menu"
                >
                  <span>{t.nav.academics}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
                </button>

                {openDropdown === "academics" && (
                  <div
                    id="nav-academics-menu"
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-[640px] z-50"
                  >
                    <div className="bg-navy-950 text-white rounded-xl shadow-2xl border border-gold-500/40 p-6 grid grid-cols-3 gap-6 tiu-panel-enter">
                      <div className="space-y-3">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-gold-300 border-b border-navy-800 pb-1.5 flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4" aria-hidden="true" />
                          <span>{t.nav.divisionsHeading}</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-200">
                          <li>
                            <Link
                              href="/academics"
                              className="block p-1.5 rounded hover:bg-white/10 text-white font-semibold hover:text-gold-300"
                            >
                              {t.nav.academicsHub}
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/academics#schools"
                              className="block p-1.5 rounded hover:bg-white/10 text-slate-200 hover:text-white"
                            >
                              {t.nav.schoolBiblical}
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/academics#schools"
                              className="block p-1.5 rounded hover:bg-white/10 text-slate-200 hover:text-white"
                            >
                              {t.nav.schoolMinistry}
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-gold-300 border-b border-navy-800 pb-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" aria-hidden="true" />
                          <span>{t.nav.megaSpecialisations}</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-200">
                          {navSpecialisations.slice(0, 4).map((spec) => (
                            <li key={spec.slug}>
                              <Link
                                href={`/academics/${spec.slug}`}
                                className="block p-1 rounded hover:bg-white/10 hover:text-gold-300 truncate"
                              >
                                {spec.shortCode} – {spec.title}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href="/academics/ancient-languages"
                              className="block p-1 rounded hover:bg-white/10 text-gold-300 font-semibold"
                            >
                              Hebrew, Aramaic &amp; Greek
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3 bg-navy-900/70 p-4 rounded-lg border border-navy-800">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-gold-300 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" aria-hidden="true" />
                          <span>{t.nav.megaCurriculumTitle}</span>
                        </h4>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {t.nav.megaCurriculumDesc}
                        </p>
                        <div className="pt-1">
                          <Link
                            href="/curriculum"
                            className="inline-block px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs rounded transition-colors"
                          >
                            {t.nav.megaViewCurriculum}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Curriculum */}
              <Link
                href="/curriculum"
                aria-current={pathname === "/curriculum" ? "page" : undefined}
                className={cn(
                  "px-1.5 xl:px-2 2xl:px-3.5 py-2 text-xs xl:text-[13px] 2xl:text-[15px] font-semibold rounded-md transition-colors font-sans whitespace-nowrap min-h-[40px] inline-flex items-center",
                  pathname === "/curriculum"
                    ? "text-gold-300 bg-white/10"
                    : "text-slate-100 hover:text-white hover:bg-white/5"
                )}
              >
                {t.nav.curriculum}
              </Link>

              {/* Research Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("research")}
                onMouseLeave={() => setOpenDropdown(null)}
                onBlur={handleNavBlur}
              >
                <button
                  ref={researchBtnRef}
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "research" ? null : "research")}
                  className={cn(
                    "flex items-center gap-1 px-1.5 xl:px-2 2xl:px-3.5 py-2 text-xs xl:text-[13px] 2xl:text-[15px] font-semibold rounded-md transition-colors font-sans whitespace-nowrap min-h-[40px]",
                    isResearchActive
                      ? "text-gold-300 bg-white/10"
                      : "text-slate-100 hover:text-white hover:bg-white/5"
                  )}
                  aria-expanded={openDropdown === "research"}
                  aria-haspopup="true"
                  aria-controls="nav-research-menu"
                >
                  <span>{t.nav.research}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
                </button>
                {openDropdown === "research" && (
                  <div
                    id="nav-research-menu"
                    className="absolute top-full left-0 pt-1.5 w-64 z-50"
                  >
                    <div className="bg-navy-950 text-white rounded-xl shadow-2xl border border-gold-500/40 p-2 space-y-1 tiu-panel-enter">
                      <Link
                        href="/research"
                        aria-current={pathname === "/research" ? "page" : undefined}
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.researchMethods}
                      </Link>
                      <Link
                        href="/doctoral"
                        aria-current={pathname === "/doctoral" ? "page" : undefined}
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.doctoralPhD}
                      </Link>
                      <Link
                        href="/doctoral#honoris-causa"
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.honorisCausa}
                      </Link>
                      <Link
                        href="/affiliations"
                        aria-current={pathname === "/affiliations" ? "page" : undefined}
                        className="block px-3 py-2 text-xs font-sans font-medium rounded hover:bg-white/10 hover:text-gold-300"
                      >
                        {t.nav.affiliations}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Centres */}
              <Link
                href="/centres"
                aria-current={pathname === "/centres" ? "page" : undefined}
                className={cn(
                  "px-1.5 xl:px-2 2xl:px-3.5 py-2 text-xs xl:text-[13px] 2xl:text-[15px] font-semibold rounded-md transition-colors font-sans whitespace-nowrap min-h-[40px] inline-flex items-center",
                  pathname === "/centres"
                    ? "text-gold-300 bg-white/10"
                    : "text-slate-100 hover:text-white hover:bg-white/5"
                )}
              >
                {t.nav.centres}
              </Link>

              {/* Admissions */}
              <Link
                href="/admissions"
                aria-current={pathname === "/admissions" ? "page" : undefined}
                className={cn(
                  "px-1.5 xl:px-2 2xl:px-3.5 py-2 text-xs xl:text-[13px] 2xl:text-[15px] font-semibold rounded-md transition-colors font-sans whitespace-nowrap min-h-[40px] inline-flex items-center",
                  pathname === "/admissions"
                    ? "text-gold-300 bg-white/10"
                    : "text-slate-100 hover:text-white hover:bg-white/5"
                )}
              >
                {t.nav.admissions}
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
                className={cn(
                  "px-1.5 xl:px-2 2xl:px-3.5 py-2 text-xs xl:text-[13px] 2xl:text-[15px] font-semibold rounded-md transition-colors font-sans whitespace-nowrap min-h-[40px] inline-flex items-center",
                  pathname === "/contact"
                    ? "text-gold-300 bg-white/10"
                    : "text-slate-100 hover:text-white hover:bg-white/5"
                )}
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Right Action Icons: Desktop Search & Apply CTA */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                ref={desktopSearchBtnRef}
                type="button"
                onClick={() => setSearchModalOpen(true)}
                aria-label={t.nav.searchAria}
                className="p-2 text-slate-100 hover:text-gold-300 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 min-w-[40px] min-h-[40px] inline-flex items-center justify-center"
                title="Search (Ctrl+K)"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>

              <Link
                href="/admissions#apply"
                className="px-2.5 xl:px-3.5 2xl:px-5 py-2 text-xs 2xl:text-[13px] font-sans font-extrabold uppercase tracking-wider bg-gold-500 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 hover:brightness-105 rounded-lg shadow-gold transition-transform duration-150 hover:scale-[1.02] whitespace-nowrap shrink-0 border border-gold-300 min-h-[40px] inline-flex items-center"
              >
                {t.nav.applyNow}
              </Link>
            </div>

            {/* Mobile/Tablet Search & Hamburger Buttons (guaranteed inside >=320px viewport) */}
            <div className="flex lg:hidden items-center gap-1 shrink-0">
              <button
                ref={mobileSearchBtnRef}
                type="button"
                onClick={() => setSearchModalOpen(true)}
                aria-label={t.nav.searchAria}
                className="p-2 text-slate-100 hover:text-gold-300 hover:bg-white/10 rounded-lg focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                ref={mobileToggleBtnRef}
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={t.nav.menuAria}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                className="p-2 text-slate-100 hover:text-white hover:bg-white/10 rounded-lg focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Slide-down Drawer (Complete route inventory) */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile Navigation Drawer"
            className="lg:hidden bg-navy-950 border-t border-navy-800 px-4 pt-3 pb-8 space-y-1 max-h-[82vh] overflow-y-auto tiu-panel-enter"
          >
            {[
              { href: "/", label: t.nav.home },
              { href: "/about", label: t.nav.aboutInst },
              { href: "/vision-and-mission", label: t.nav.visionMission },
              { href: "/governance", label: t.nav.governance },
              { href: "/academics", label: t.nav.academics },
              { href: "/curriculum", label: t.nav.curriculumFull },
              { href: "/research", label: t.nav.researchMethods },
              { href: "/doctoral", label: t.nav.doctoralPhD },
              { href: "/affiliations", label: t.nav.affiliations },
              { href: "/centres", label: t.nav.centres },
              { href: "/accreditations", label: t.nav.accreditations },
              { href: "/certificates-and-awards", label: t.nav.certificates },
              { href: "/admissions", label: t.nav.admissions },
              { href: "/prospectus", label: t.nav.prospectus },
              { href: "/contact", label: t.nav.contact },
            ].map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block px-3 py-2.5 rounded-lg text-sm font-sans font-medium transition-colors min-h-[44px]",
                    active
                      ? "bg-gold-500/20 text-gold-300 border border-gold-500/40"
                      : "text-slate-100 hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4">
              <Link
                href="/admissions#apply"
                className="w-full text-center py-3 px-4 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-sans font-extrabold text-sm uppercase rounded-lg shadow-gold block min-h-[44px]"
              >
                {t.nav.applyEnquireMobile}
              </Link>
            </div>
          </nav>
        )}
      </header>

      {searchModalOpen && (
        <GlobalSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          restoreFocusTo={desktopSearchBtnRef}
        />
      )}
    </>
  );
};

export default Navbar;
