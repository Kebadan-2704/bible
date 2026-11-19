import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { administrativeCentres } from "@/data/centres";
import { institutionConfig } from "@/data/config";
import { MapPin, Phone, Mail, Building2, Globe, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Administrative Centres | National & Overseas Locations",
  description:
    "Explore the administrative offices of Trinity International University across Bangalore, Coimbatore, Chennai, Dandeli, New Delhi, Malaysia, and the USA.",
};

export default function CentresPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Global Administrative Network"
          title="Administrative & Collegiate Centres"
          subtitle="Regional secretariats and international liaison points facilitating modular ministerial education, admissions, and clerical ordination."
        />

        {/* Stylised Map Placeholder Section */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-gold-400 shadow-xl mb-16 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold bg-gold-500/10 px-3 py-1 rounded-full border border-gold-400/30">
                Institutional Coordinates
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Coordinated from Bangalore Across 8 Strategic Centres
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The institution coordinates academic admissions, curriculum distribution, and ordination examinations from its Bangalore headquarters, operating regional centres across Tamil Nadu, Karnataka, Delhi, Telangana, and overseas.
              </p>
              <div className="flex flex-wrap gap-2 text-xs pt-2">
                <span className="px-3 py-1 rounded-lg bg-navy-900 border border-gold-500/30 text-gold-300">
                  Headquarters: Bangalore
                </span>
                <span className="px-3 py-1 rounded-lg bg-navy-900 border border-gold-500/30 text-slate-200">
                  India: 6 Regional Centres
                </span>
                <span className="px-3 py-1 rounded-lg bg-navy-900 border border-gold-500/30 text-slate-200">
                  International: Malaysia &amp; USA
                </span>
              </div>
            </div>

            {/* Stylised Graphical Map Vector */}
            <div className="w-full lg:w-96 h-64 bg-navy-900/80 rounded-2xl border border-gold-500/20 p-4 flex flex-col justify-between relative shadow-inner">
              <div className="flex items-center justify-between text-xs text-gold-400 border-b border-navy-800 pb-2">
                <span className="font-mono">NETWORK SCHEMATIC</span>
                <Globe className="w-4 h-4" />
              </div>
              <div className="relative flex-1 flex items-center justify-center">
                {/* SVG nodes */}
                <svg className="w-full h-full" viewBox="0 0 300 150" fill="none">
                  {/* Grid Lines */}
                  <line x1="20" y1="30" x2="280" y2="30" stroke="#13357B" strokeDasharray="2 4" />
                  <line x1="20" y1="75" x2="280" y2="75" stroke="#13357B" strokeDasharray="2 4" />
                  <line x1="20" y1="120" x2="280" y2="120" stroke="#13357B" strokeDasharray="2 4" />
                  
                  {/* Nodes */}
                  {/* USA */}
                  <circle cx="50" cy="55" r="6" fill="#D4A017" />
                  <text x="50" y="76" fill="#F2C94C" fontSize="13" fontWeight="bold" textAnchor="middle">USA</text>
                  
                  {/* India (Hub) */}
                  <circle cx="150" cy="75" r="9" fill="#F2C94C" className="animate-pulse" />
                  <text x="150" y="100" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">Bangalore HQ</text>
                  
                  {/* Malaysia */}
                  <circle cx="230" cy="90" r="6" fill="#D4A017" />
                  <text x="230" y="112" fill="#F2C94C" fontSize="13" fontWeight="bold" textAnchor="middle">Malaysia</text>
                  
                  {/* Connecting Beams */}
                  <path d="M 50 60 Q 100 40 150 80" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 150 80 Q 190 70 230 95" stroke="#D4A017" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>
              <div className="text-xs text-slate-400 text-center">
                Interactive spatial map integration scheduled for release.
              </div>
            </div>
          </div>
        </div>

        {/* Centres Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {administrativeCentres.map((centre) => (
            <Card
              key={centre.id}
              borderGold={centre.isHeadquarters}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {centre.region}
                  </span>
                  {centre.isHeadquarters && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                      Central Headquarters
                    </span>
                  )}
                  {centre.isBrochure2Only && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Brochure 2 Variant
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0" />
                  <h3 className="font-serif text-xl font-bold text-navy-950">
                    {centre.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {centre.description}
                </p>

                {centre.altLocationNotice && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-4">
                    <strong>Note:</strong> {centre.altLocationNotice}
                  </div>
                )}

                <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{centre.addressPlaceholder}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{centre.phonePlaceholder}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-600">{centre.emailPlaceholder}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Button
                  href={`/contact?centre=${centre.id}`}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                >
                  Contact This Centre
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Discrepancy & Address Confirmation Notice */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 space-y-1">
            <h4 className="font-serif font-bold text-navy-950 text-sm">
              Archival Address &amp; Location Verification
            </h4>
            <p>
              Per single source of truth guidelines, Brochure 2 prints garbled text for Headquarters (&quot;Daddy Guppy Bangalore INDIA.&quot;) and lists Florida (US) instead of Georgia (USA). Furthermore, Hyderabad is documented in Brochure 2 only. Official verified postal addresses and local telecommunication numbers will be populated upon client confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
