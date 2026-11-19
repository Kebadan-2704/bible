import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { institutionConfig } from "@/data/config";
import { Compass, BookOpen, Heart, Globe, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Vision & Mission | Institutional Objectives",
  description:
    "Vision, mission, and core values of Trinity International University and Indian Trinity Church Diocese.",
};

export default function VisionAndMissionPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Guiding Principles"
          title="Vision &amp; Mission"
          subtitle="Formulated to advance faithful biblical orthodoxy, ministerial excellence, and compassionate kingdom service."
        />

        {/* Vision Section */}
        {/* // DRAFT COPY - confirm with client */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-300 shadow-card mb-12 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-800">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
                Strategic Horizon
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                Our Institutional Vision
              </h2>
            </div>
          </div>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-serif italic mb-4">
            &ldquo;To be an internationally recognized sanctuary of biblical truth and ministerial excellence, forming faithful disciples and visionary pastors who manifest the love of Christ, champion moral righteousness, and transform communities across all nations.&rdquo;
          </p>

          <p className="text-xs text-slate-700 leading-relaxed">
            Guided by Ephesians 4:11-13 — equipping the saints for the work of ministry, for building up the body of Christ until we all attain to the unity of the faith.
          </p>
          <span className="text-xs text-slate-600 block pt-2 italic">
            {/* TODO: CONFIRM WITH CLIENT */}
            Draft copy — pending client confirmation
          </span>
        </div>

        {/* Mission Pillars */}
        {/* // DRAFT COPY - confirm with client */}
        <div className="mb-16">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h3 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gold-600" />
              <span>Four Pillars of Our Mission</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700">
              Core directives governing our faculties, curricular standards, and regional centres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card borderGold className="space-y-3">
              <span className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 font-bold text-xs flex items-center justify-center">
                01
              </span>
              <h4 className="font-serif text-lg font-bold text-navy-950">
                Doctrinal Orthodoxy &amp; Scripture Integrity
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Upholding the timeless authority of sacred scripture through rigorous training in the Hebrew Bible, Greek New Testament, and classical apostolic creeds.
              </p>
            </Card>

            <Card borderGold className="space-y-3">
              <span className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 font-bold text-xs flex items-center justify-center">
                02
              </span>
              <h4 className="font-serif text-lg font-bold text-navy-950">
                Pastoral Formation &amp; Clerical Ethics
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nurturing moral character, pastoral counselling acumen, and deep spiritual maturity among candidates aspiring to Holy Orders and ministerial ordination.
              </p>
            </Card>

            <Card borderGold className="space-y-3">
              <span className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 font-bold text-xs flex items-center justify-center">
                03
              </span>
              <h4 className="font-serif text-lg font-bold text-navy-950">
                Accessible &amp; Modular Theological Education
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Removing geographical and linguistic barriers by providing seminar courses across 8 administrative centres and offering instruction in English and Tamil.
              </p>
            </Card>

            <Card borderGold className="space-y-3">
              <span className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 font-bold text-xs flex items-center justify-center">
                04
              </span>
              <h4 className="font-serif text-lg font-bold text-navy-950">
                Compassionate Community &amp; Missional Outreach
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fostering inter-religious respect, social justice awareness, and transformative engagement with marginalized communities in accordance with the Gospel of Christ.
              </p>
            </Card>
          </div>
          <span className="text-xs text-slate-500 block pt-3 text-center italic">
            {/* TODO: CONFIRM WITH CLIENT */}
            Draft copy — pending client confirmation
          </span>
        </div>

        {/* Mandatory Legal Statement */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
          <p className="text-xs sm:text-sm text-gold-800 font-medium">
            {institutionConfig.legalNote}
          </p>
          <p className="text-xs text-slate-700">
            Established under clerical rites and traditions of the {institutionConfig.diocesanAffiliation}.
          </p>
        </div>
      </div>
    </div>
  );
}
