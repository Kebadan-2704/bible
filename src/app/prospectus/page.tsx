import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProgrammeOverviewPrint } from "@/components/home/ProgrammeOverviewPrint";
import { institutionConfig } from "@/data/config";
import { Download, ArrowLeft, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Prospectus & Overview",
  description:
    "Printable digital programme overview and downloadable reference prospectus for University of Trinity International.",
  alternates: { canonical: "/prospectus" },
};

export default function ProspectusPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 space-y-8">
        <div className="no-print">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-sans text-navy-900 hover:text-gold-800 min-h-[36px] px-2 py-1 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Admissions</span>
          </Link>
        </div>

        <SectionHeader
          level="h1"
          badge="Institutional Reference Prospectus"
          title="Programme & Curriculum Overview"
          subtitle="Consolidating academic divisions, 10 conferred qualifications, 7 ministerial modules, and statutory trust registrations."
        />

        {/* Clear notice distinguishing Reference Overview from Fee/Schedule Addendum */}
        <div className="no-print p-5 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs sm:text-sm text-amber-950 space-y-1">
              <strong className="font-bold block">Reference Programme Catalogue</strong>
              <p>
                Download the clean PDF programme summary below or use the print sheet for church councils. Current academic calendar dates, fee concessions, and regional office street addresses are supplied directly by the Admissions Secretariat upon enquiry.
              </p>
            </div>
          </div>

          <a
            href="/trinity-programme-overview.pdf"
            download="University-of-Trinity-International-Programme-Overview.pdf"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-sans font-extrabold text-xs uppercase tracking-wider hover:brightness-105 shadow-gold shrink-0 min-h-[44px]"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download Overview PDF</span>
          </a>
        </div>

        <ProgrammeOverviewPrint />

        <div className="no-print bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-700">
            Ready to enquire about intake dates or submit candidate recommendations?
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/admissions#apply" variant="gold">
              Apply Online
            </Button>
            <Button href="/contact?type=programme_info" variant="outline">
              Ask Secretariat
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-700 italic">{institutionConfig.legalNote}</p>
      </div>
    </div>
  );
}
