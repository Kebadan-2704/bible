"use client";

import React from "react";
import Link from "next/link";
import { Crest } from "@/components/ui/Crest";
import { institutionConfig } from "@/data/config";
import { administrativeCentres } from "@/data/centres";
import { MapPin, ShieldCheck } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

export const Footer: React.FC = () => {
  const { t } = useLocale();

  return (
    <footer className="bg-navy-950 text-slate-200 border-t border-gold-500/30 pt-16 pb-12 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          {/* Col 1 & 2: Brand & Trust Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Crest size={48} className="shrink-0" />
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  {t.institutionName}
                </h3>
                <p className="text-xs text-gold-300 font-semibold">{t.diocese}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              {t.subheading}. {t.home.heroDescSuffix}
            </p>

            {/* Legal Registration Badge Box */}
            <div className="p-4 rounded-xl bg-navy-900/90 border border-gold-500/30 text-xs space-y-2 text-slate-200">
              <div className="flex items-center gap-1.5 text-gold-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-gold-300 shrink-0" aria-hidden="true" />
                <span>{t.footer.trustHeading}</span>
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Registered under{" "}
                <strong className="text-white">{institutionConfig.registeredUnder}</strong>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs pt-1">
                <span>
                  {t.footer.tamilNadu}:{" "}
                  <strong className="text-gold-300">
                    {institutionConfig.registrations.tamilNadu.number}
                  </strong>
                </span>
                <span>
                  {t.footer.karnataka}:{" "}
                  <strong className="text-gold-300">
                    {institutionConfig.registrations.karnataka.number}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Programmes */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-500 pl-2.5">
              {t.footer.colAcademics}
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/academics#schools" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.schoolBiblical}
                </Link>
              </li>
              <li>
                <Link href="/academics#schools" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.schoolMinistry}
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.curriculumFull}
                </Link>
              </li>
              <li>
                <Link href="/academics/systematic-theology" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Systematic Theology (S.T.)
                </Link>
              </li>
              <li>
                <Link href="/academics/ancient-languages" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Hebrew, Aramaic &amp; Greek
                </Link>
              </li>
              <li>
                <Link href="/doctoral" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.doctoralPhD}
                </Link>
              </li>
              <li>
                <Link href="/doctoral#honoris-causa" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.honorisCausa}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Administrative Centres */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-500 pl-2.5">
              {t.footer.colCentres}
            </h4>
            <ul className="space-y-1 text-xs">
              {administrativeCentres.map((centre) => (
                <li key={centre.id}>
                  <Link
                    href={`/centres#${centre.id}`}
                    className="min-h-[32px] inline-flex items-center gap-1.5 hover:text-gold-300 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" aria-hidden="true" />
                    <span>{centre.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Institutional & Legal */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-500 pl-2.5">
              {t.footer.colGovernance}
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/about" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.aboutInst}
                </Link>
              </li>
              <li>
                <Link href="/governance" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.governance}
                </Link>
              </li>
              <li>
                <Link href="/vision-and-mission" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.visionMission}
                </Link>
              </li>
              <li>
                <Link href="/affiliations" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.affiliations}
                </Link>
              </li>
              <li>
                <Link href="/accreditations" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.accreditations}
                </Link>
              </li>
              <li>
                <Link href="/certificates-and-awards" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.nav.certificates}
                </Link>
              </li>
              <li>
                <Link href="/prospectus" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.footer.prospectusLink}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.footer.disclaimerLink}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="min-h-[32px] inline-flex items-center hover:text-gold-300 transition-colors">
                  {t.footer.privacyLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Credibility Rule Banner in Footer */}
        <div className="py-6 border-b border-navy-800 text-center">
          <p className="text-xs sm:text-sm text-gold-300 font-semibold tracking-wide max-w-4xl mx-auto">
            {t.legalShortNote}
          </p>
        </div>

        {/* Bottom Copyright & Disclaimer Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
          <p>
            © {new Date().getFullYear()} {t.institutionName} ({t.diocese}). {t.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/disclaimer" className="min-h-[32px] inline-flex items-center hover:text-white transition-colors">
              {t.footer.disclaimerLink}
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/privacy" className="min-h-[32px] inline-flex items-center hover:text-white transition-colors">
              {t.footer.privacyLink}
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="/contact" className="min-h-[32px] inline-flex items-center hover:text-white transition-colors">
              {t.footer.enquiryLink}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
