import React from "react";
import Link from "next/link";
import { Crest } from "@/components/ui/Crest";
import { institutionConfig } from "@/data/config";
import { administrativeCentres } from "@/data/centres";
import { MapPin, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-200 border-t border-gold-500/30 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          {/* Col 1 & 2: Brand & Trust Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Crest size={48} className="shrink-0" />
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  {institutionConfig.institutionName}
                </h3>
                <p className="text-xs text-gold-400 font-semibold">
                  {institutionConfig.diocesanAffiliation}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              {institutionConfig.subheading}. Empowering pastors, evangelists, and theological scholars with sound biblical doctrine, ministerial ethics, and pastoral formation for the global Christian church.
            </p>

            {/* Legal Registration Badge Box */}
            <div className="p-4 rounded-xl bg-navy-900/90 border border-gold-500/30 text-xs space-y-2 text-slate-200">
              <div className="flex items-center gap-1.5 text-gold-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Statutory Trust Registrations</span>
              </div>
              <p className="text-xs text-slate-300 leading-normal">
                Registered under <strong className="text-white">{institutionConfig.registeredUnder}</strong>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs pt-1">
                <span>
                  Tamil Nadu: <strong className="text-gold-300">{institutionConfig.registrations.tamilNadu.number}</strong>
                </span>
                <span>
                  Karnataka: <strong className="text-gold-300">{institutionConfig.registrations.karnataka.number}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Programmes */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-500 pl-2.5">
              Academics
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/academics" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  School of Biblical Studies
                </Link>
              </li>
              <li>
                <Link href="/academics" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  School of Church Ministry
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  7-Module Ministry Curriculum
                </Link>
              </li>
              <li>
                <Link href="/academics/systematic-theology" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Systematic Theology (S.T.)
                </Link>
              </li>
              <li>
                <Link href="/academics/ancient-languages" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Hebrew, Aramaic &amp; Greek
                </Link>
              </li>
              <li>
                <Link href="/doctoral" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Ph.D. Specialisations (4 Yrs)
                </Link>
              </li>
              <li>
                <Link href="/doctoral#honoris-causa" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Honorary Doctorate (Honoris Causa)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Administrative Centres */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-500 pl-2.5">
              Administrative Centres
            </h4>
            <ul className="space-y-1 text-xs">
              {administrativeCentres.map((centre) => (
                <li key={centre.id}>
                  <Link
                    href={`/centres#${centre.id}`}
                    className="min-h-[30px] inline-flex items-center gap-1.5 hover:text-gold-300 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>{centre.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Institutional & Legal */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-l-2 border-gold-500 pl-2.5">
              Institution &amp; Governance
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/about" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  About the Institution
                </Link>
              </li>
              <li>
                <Link href="/governance" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Governing Council Leaders
                </Link>
              </li>
              <li>
                <Link href="/vision-and-mission" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Vision &amp; Mission
                </Link>
              </li>
              <li>
                <Link href="/affiliations" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Affiliated Partner Institutions
                </Link>
              </li>
              <li>
                <Link href="/accreditations" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Accreditations
                </Link>
              </li>
              <li>
                <Link href="/certificates-and-awards" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Certificates &amp; Awards
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Theological Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="min-h-[30px] inline-flex items-center hover:text-gold-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Credibility Rule Banner in Footer */}
        <div className="py-6 border-b border-navy-800 text-center">
          <p className="text-xs sm:text-sm text-gold-300 font-semibold tracking-wide max-w-4xl mx-auto">
            {institutionConfig.legalNote}
          </p>
        </div>

        {/* Bottom Copyright & Disclaimer Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} {institutionConfig.institutionName} ({institutionConfig.diocesanAffiliation}). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/disclaimer" className="min-h-[30px] inline-flex items-center hover:text-white transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/privacy" className="min-h-[30px] inline-flex items-center hover:text-white transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/contact" className="min-h-[30px] inline-flex items-center hover:text-white transition-colors">
              Enquiry
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
