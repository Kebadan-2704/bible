"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Globe2,
  FileCheck,
  Award,
  Sparkles,
  Shield,
  Layers,
  MapPin,
} from "lucide-react";
import { Crest } from "@/components/ui/Crest";
import { institutionConfig } from "@/data/config";
import { GlobalSearchModal } from "@/components/search/GlobalSearchModal";
import { specialisationsList } from "@/data/specialisations";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [locale, setLocale] = useState<"en" | "ta">("en");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setAcademicsOpen(false);
        setAboutOpen(false);
        setResearchOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setAcademicsOpen(false);
    setAboutOpen(false);
    setResearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow] duration-300",
          isScrolled
            ? "bg-navy-950/98 backdrop-blur-md shadow-lg border-b border-gold-500/30"
            : "bg-navy-900 border-b border-navy-800"
        )}
      >
        {/* Top Diocesan Identity Bar */}
        <div className="bg-navy-950 border-b border-navy-800 px-4 py-1.5 text-xs text-slate-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" aria-hidden="true" />
              <span className="font-serif tracking-wider text-gold-300 uppercase font-semibold text-xs truncate">
                {institutionConfig.diocesanAffiliation}
              </span>
              <span className="hidden lg:inline text-slate-400 font-bold" aria-hidden="true">|</span>
              <span className="hidden lg:inline text-xs text-slate-200 italic truncate">
                {institutionConfig.tagline}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs shrink-0">
              {/* Language Switcher Scaffold */}
              <button
                type="button"
                onClick={() => setLocale(locale === "en" ? "ta" : "en")}
                className="flex items-center gap-1.5 text-gold-300 hover:text-white font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-gold-400 px-2 py-0.5 rounded"
                title="Switch Language (Scaffold)"
                aria-label="Switch Language"
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>{locale === "en" ? "EN / தமிழ்" : "தமிழ் / EN"}</span>
              </button>

              <Link
                href="/admissions"
                className="hidden sm:inline-flex items-center gap-1 text-slate-200 hover:text-gold-300 font-medium transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Prospectus</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Institution Title */}
            <Link href="/" className="flex items-center gap-3 group shrink-0 focus:outline-none">
              <Crest size={44} className="shrink-0 transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-white text-base sm:text-lg tracking-tight leading-tight group-hover:text-gold-300 transition-colors">
                  {institutionConfig.institutionName}
                </span>
                <span className="text-xs text-gold-400 font-semibold tracking-wide">
                  Christian Clerical Rites &amp; Traditions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Grouped for zero overflow) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5" aria-label="Main Navigation">
              {/* 1. Home */}
              <Link
                href="/"
                className={cn(
                  "px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                  pathname === "/" ? "text-gold-300 bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Home
              </Link>

              {/* 2. About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                    pathname.startsWith("/about") || pathname.startsWith("/vision-and-mission") || pathname.startsWith("/accreditations") || pathname.startsWith("/certificates-and-awards")
                      ? "text-gold-300 bg-white/10"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  )}
                  aria-expanded={aboutOpen}
                >
                  <span>About</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gold-400" />
                </button>
                {aboutOpen && (
                  <div className="absolute top-full left-0 w-60 bg-navy-950 text-white rounded-xl shadow-2xl border border-gold-500/40 p-2 space-y-1 animate-in fade-in duration-150">
                    <Link
                      href="/about"
                      className="block px-3 py-2 text-xs font-serif rounded hover:bg-white/10 hover:text-gold-300"
                    >
                      About the Institution
                    </Link>
                    <Link
                      href="/vision-and-mission"
                      className="block px-3 py-2 text-xs font-serif rounded hover:bg-white/10 hover:text-gold-300"
                    >
                      Vision &amp; Mission Pillars
                    </Link>
                    <Link
                      href="/accreditations"
                      className="block px-3 py-2 text-xs font-serif rounded hover:bg-white/10 hover:text-gold-300"
                    >
                      Institutional Accreditations
                    </Link>
                    <Link
                      href="/certificates-and-awards"
                      className="block px-3 py-2 text-xs font-serif rounded hover:bg-white/10 hover:text-gold-300"
                    >
                      Certificates &amp; Awards
                    </Link>
                  </div>
                )}
              </div>

              {/* 3. Governance */}
              <Link
                href="/governance"
                className={cn(
                  "px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                  pathname === "/governance" ? "text-gold-300 bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Governance
              </Link>

              {/* 4. Academics Mega-Menu */}
              <div
                className="relative"
                onMouseEnter={() => setAcademicsOpen(true)}
                onMouseLeave={() => setAcademicsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setAcademicsOpen(!academicsOpen)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                    pathname.startsWith("/academics")
                      ? "text-gold-300 bg-white/10"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  )}
                  aria-expanded={academicsOpen}
                >
                  <span>Academics</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gold-400" />
                </button>

                {academicsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-navy-950 text-white rounded-xl shadow-2xl border border-gold-500/40 p-6 grid grid-cols-3 gap-6 animate-in fade-in duration-150">
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-gold-400 border-b border-navy-800 pb-1.5 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4" />
                        Divisions &amp; Degrees
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li>
                          <Link href="/academics" className="block p-1.5 rounded hover:bg-white/10 text-white font-medium hover:text-gold-300">
                            Academics Hub Overview
                          </Link>
                        </li>
                        <li>
                          <Link href="/academics" className="block p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white">
                            School of Biblical Studies
                          </Link>
                        </li>
                        <li>
                          <Link href="/academics" className="block p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white">
                            School of Church Ministry
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-gold-400 border-b border-navy-800 pb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        Specialisations
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {specialisationsList.slice(0, 4).map((spec) => (
                          <li key={spec.slug}>
                            <Link
                              href={`/academics/${spec.slug}`}
                              className="block p-1 rounded hover:bg-white/10 hover:text-gold-300 truncate"
                            >
                              {spec.shortCode} - {spec.title.split("(")[0]}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/academics/ancient-languages"
                            className="block p-1 rounded hover:bg-white/10 text-gold-300 font-medium"
                          >
                            Hebrew, Aramaic &amp; Greek
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 bg-navy-900/60 p-4 rounded-lg border border-navy-800">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-gold-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        7-Module Curriculum
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Exegesis, Christian ethics, counseling, dogmatics, and Old/New Testament theology.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="/curriculum"
                          className="inline-block px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs rounded transition-colors"
                        >
                          View 7-Module Curriculum →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Curriculum */}
              <Link
                href="/curriculum"
                className={cn(
                  "px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                  pathname === "/curriculum" ? "text-gold-300 bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Curriculum
              </Link>

              {/* 6. Research & Doctoral Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setResearchOpen(true)}
                onMouseLeave={() => setResearchOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setResearchOpen(!researchOpen)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                    pathname.startsWith("/research") || pathname.startsWith("/doctoral") || pathname.startsWith("/affiliations")
                      ? "text-gold-300 bg-white/10"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  )}
                  aria-expanded={researchOpen}
                >
                  <span>Research &amp; Ph.D.</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gold-400" />
                </button>
                {researchOpen && (
                  <div className="absolute top-full left-0 w-64 bg-navy-950 text-white rounded-xl shadow-2xl border border-gold-500/40 p-2 space-y-1 animate-in fade-in duration-150">
                    <Link
                      href="/research"
                      className="block px-3 py-2 text-xs font-serif rounded hover:bg-white/10 hover:text-gold-300"
                    >
                      Research Methodologies (B.S., S.T., SGT)
                    </Link>
                    <Link
                      href="/doctoral"
                      className="block px-3 py-2 text-xs font-serif rounded hover:bg-white/10 hover:text-gold-300"
                    >
                      Ph.D. Specialisations (4 Years)
                    </Link>
                    <Link
                      href="/doctoral#honoris-causa"
                      className="block px-3 py-2 text-xs font-serif rounded hover:bg-white/10 hover:text-gold-300"
                    >
                      Honorary Doctorate (Honoris Causa)
                    </Link>
                    <Link
                      href="/affiliations"
                      className="block px-3 py-2 text-xs font-serif rounded hover:bg-white/10 hover:text-gold-300"
                    >
                      Affiliated International Institutions
                    </Link>
                  </div>
                )}
              </div>

              {/* 7. Centres */}
              <Link
                href="/centres"
                className={cn(
                  "px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                  pathname === "/centres" ? "text-gold-300 bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Centres
              </Link>

              {/* 8. Admissions */}
              <Link
                href="/admissions"
                className={cn(
                  "px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                  pathname === "/admissions" ? "text-gold-300 bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Admissions
              </Link>

              {/* 9. Contact */}
              <Link
                href="/contact"
                className={cn(
                  "px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-md transition-colors font-serif",
                  pathname === "/contact" ? "text-gold-300 bg-white/10" : "text-slate-200 hover:text-white hover:bg-white/5"
                )}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action Icons: Search & Apply Button */}
            <div className="hidden lg:flex items-center space-x-3 shrink-0">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search curriculum and courses"
                className="p-2 text-slate-200 hover:text-gold-400 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-gold-400"
                title="Search courses (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/admissions#apply"
                className="px-4 py-2.5 text-xs font-serif font-extrabold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-[#061026] hover:brightness-105 rounded-lg shadow-gold transition-transform duration-150 hover:scale-[1.02] whitespace-nowrap shrink-0 border border-gold-300"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Hamburger & Search Buttons */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search site"
                className="p-2 text-slate-200 hover:text-gold-400 focus:outline-none"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                className="p-2 text-slate-200 hover:text-white focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile Navigation Drawer"
            className="lg:hidden bg-navy-950 border-t border-navy-800 px-4 pt-3 pb-8 space-y-1.5 max-h-[85vh] overflow-y-auto block"
          >
            <Link
              href="/"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/about" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              About Us &amp; Heritage
            </Link>
            <Link
              href="/governance"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/governance" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              Governing Council Leaders
            </Link>
            <Link
              href="/academics"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/academics" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              Academics &amp; Degree Programs
            </Link>
            <Link
              href="/curriculum"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/curriculum" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              7-Module Ministry Curriculum
            </Link>
            <Link
              href="/research"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/research" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              Research Methodologies
            </Link>
            <Link
              href="/doctoral"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/doctoral" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              Ph.D. &amp; Honorary Degrees
            </Link>
            <Link
              href="/centres"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/centres" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              Administrative Centres
            </Link>
            <Link
              href="/admissions"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/admissions" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              Admissions &amp; Prospectus
            </Link>
            <Link
              href="/contact"
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-serif font-medium transition-colors",
                pathname === "/contact" ? "bg-gold-500/20 text-gold-300 border border-gold-500/40" : "text-slate-200 hover:bg-white/5"
              )}
            >
              Contact &amp; Enquiry
            </Link>

            <div className="pt-4 flex flex-col gap-2">
              <Link
                href="/admissions#apply"
                className="w-full text-center py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-[#061026] font-serif font-extrabold text-sm uppercase rounded-lg shadow-gold"
              >
                Apply / Enquire Now
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Global Fuse.js Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};
export default Navbar;
