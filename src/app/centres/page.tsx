import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LText } from "@/components/ui/LocalizedText";
import { administrativeCentres } from "@/data/centres";
import { MapPin, Mail, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Administrative Centres",
  description:
    "Head Quarters YGM – Bangalore and administrative centres of University of Trinity International across Trinity, Coimbatore, Chennai, Dandeli, New Delhi, Malaysia, and Georgia (USA).",
  alternates: { canonical: "/centres" },
};

export default function CentresPage() {
  const indiaCount = administrativeCentres.filter((c) => c.country === "India").length;

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Administrative Network" ta="நிர்வாக வலைப்பின்னல்" />}
          title={<LText en="Administrative & Collegiate Centres" ta="நிர்வாக மற்றும் கல்வி மையங்கள்" />}
          subtitle="Regional secretariats and international liaison points facilitating modular ministerial education, admissions, and pastoral mentorship."
        />

        {/* Geographic Overview Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-gold-400 shadow-xl mb-16 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-gold-300 font-bold bg-gold-500/15 px-3 py-1 rounded-full border border-gold-400/40">
                Institutional Coordinates
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Coordinated from YGM – Bangalore Across {administrativeCentres.length} Centres
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                University of Trinity International administers admissions, curricular materials, and ordination assessments from its YGM – Bangalore headquarters alongside administrative centres across India, Malaysia, and Georgia (USA).
              </p>
              <div className="flex flex-wrap gap-2 text-xs pt-2">
                <span className="px-3 py-1 rounded-lg bg-navy-900 border border-gold-500/30 text-gold-300 font-semibold">
                  Head Quarters: YGM – Bangalore
                </span>
                <span className="px-3 py-1 rounded-lg bg-navy-900 border border-gold-500/30 text-slate-200">
                  India: {indiaCount} Regional Centres
                </span>
                <span className="px-3 py-1 rounded-lg bg-navy-900 border border-gold-500/30 text-slate-200">
                  International: Malaysia &amp; Georgia (USA)
                </span>
              </div>
            </div>

            {/* Clean Network Schematic */}
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="rounded-2xl overflow-hidden border border-gold-500/40 shadow-inner bg-navy-950">
                <Image
                  src="/images/global-diocese-fellowship.svg"
                  alt="Global network connecting YGM – Bangalore Headquarters with administrative centres across India, Malaysia, and Georgia USA"
                  width={1200}
                  height={800}
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="w-full aspect-[3/2] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Centres Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {administrativeCentres.map((centre) => (
            <Card
              key={centre.id}
              id={centre.id}
              borderGold={centre.isHeadquarters}
              className="flex flex-col justify-between scroll-mt-28"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {centre.region}
                  </span>
                  {centre.isHeadquarters && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-950 border border-gold-300">
                      Central Headquarters
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gold-700 shrink-0" aria-hidden="true" />
                  <h3 className="font-serif text-xl font-bold text-navy-950">{centre.name}</h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  {centre.description}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{centre.cityRegionLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-600 shrink-0" aria-hidden="true" />
                    <span>Enquiries routed via Central Secretariat desk</span>
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
      </div>
    </div>
  );
}
