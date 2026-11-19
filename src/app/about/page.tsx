import React from "react";
import { Metadata } from "next";
import { Crest } from "@/components/ui/Crest";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { institutionConfig } from "@/data/config";
import { ShieldCheck, BookOpen, Compass, Award, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Heritage & Trust Registration",
  description:
    "Learn about Trinity International University, established under Christian clerical rites and The Indian Trusts Act, 1882.",
};

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-800 border border-gold-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Institutional Heritage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            About Trinity International University
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-serif italic">
            &ldquo;{institutionConfig.tagline}&rdquo;
          </p>
        </div>

        {/* Core Narrative & Seal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 rounded-3xl bg-white border border-gold-300 shadow-xl text-center max-w-sm w-full">
              <Crest size={130} className="mx-auto mb-6" />
              <h2 className="font-serif text-xl font-bold text-navy-950">
                {institutionConfig.institutionName}
              </h2>
              <p className="text-xs text-gold-700 font-semibold mt-1">
                {institutionConfig.diocesanAffiliation}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p>Established under Clerical Rites</p>
                <p className="font-medium text-navy-900">Registered Trust</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
              Clerical Traditions & Faithful Theological Formation
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              <strong>{institutionConfig.institutionName}</strong> is an institution legally established under traditional Christian clerical rites and ecclesiastical trust covenants. Founded within the pastoral jurisdiction of the <strong>{institutionConfig.diocesanAffiliation}</strong>, the university serves as an academic and spiritual sanctuary for pastors, ministers, catechists, and biblical researchers across India and worldwide.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our educational framework harmonizes classical biblical exegesis with the practical challenges of modern ministry. From the study of ancient scriptural languages (Biblical Hebrew, Aramaic, and Koine Greek) to systemic reflections on Christian ethics and pastoral counselling, we equip believers to defend the faith with intellectual clarity and Christ-like humility.
            </p>

            {/* Legal Notice Callout */}
            <div className="p-5 rounded-xl bg-gold-50/70 border border-gold-300 space-y-2">
              <div className="flex items-center gap-2 text-gold-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0" />
                <span>Statutory Trust Registration</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Registered under <strong>{institutionConfig.registeredUnder}</strong>.
                {/* Note: Brochure 2 references "Global Trust Act, 1962", documented in config */}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded border border-gold-200">
                  <span className="text-slate-600 block text-xs font-medium">Tamil Nadu Registration:</span>
                  <span className="font-bold text-navy-950 text-xs">{institutionConfig.registrations.tamilNadu.number}</span>
                </div>
                <div className="bg-white p-2.5 rounded border border-gold-200">
                  <span className="text-slate-600 block text-xs font-medium">Karnataka Registration:</span>
                  <span className="font-bold text-navy-950 text-xs">{institutionConfig.registrations.karnataka.number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Sections (DRAFT COPY - confirm with client) */}
        {/* TODO: CONFIRM WITH CLIENT - The brochures do not print a full multi-paragraph Vision & Mission body text, but include 'VISION & MISSION' tabs/badges. This text is draft copy for client confirmation. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card borderGold className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
              <Compass className="w-6 h-6 text-gold-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
              Guided by Divine Purpose
            </span>
            <h3 className="font-serif text-2xl font-bold text-navy-950">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be an internationally recognized sanctuary of biblical truth and ministerial excellence, forming faithful disciples and visionary pastors who manifest the love of Christ, champion moral righteousness, and transform communities across all nations.
            </p>
            <span className="text-xs text-slate-500 block pt-2 italic">
              {/* TODO: CONFIRM WITH CLIENT */}
              Draft copy — pending client confirmation
            </span>
          </Card>

          <Card borderGold className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
              <BookOpen className="w-6 h-6 text-gold-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
              The Great Commission in Action
            </span>
            <h3 className="font-serif text-2xl font-bold text-navy-950">Our Mission</h3>
            <ul className="text-sm text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span>Deliver accessible, doctrinally rigorous theological education across multiple administrative centres and flexible modular formats.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span>Prepare ministers for ordination through comprehensive grounding in biblical hermeneutics, systematic dogmatics, and pastoral counselling.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span>Foster scholarly research that critically engages contemporary ethical dilemmas, suffering, and intercultural dialogue.</span>
              </li>
            </ul>
            <span className="text-xs text-slate-500 block pt-2 italic">
              {/* TODO: CONFIRM WITH CLIENT */}
              Draft copy — pending client confirmation
            </span>
          </Card>
        </div>

        {/* History & Administrative Structure Placeholder */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 mb-16">
          <SectionHeader
            badge="Institutional Chronicle"
            title="Institutional History & Evolution"
            subtitle="Formed to preserve ecclesiastical heritage and provide standardized ministerial credentials for Indian and international presbyteries."
            align="left"
          />

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              The seed for <strong>Trinity International University</strong> originated within the clerical fellowship of the Indian Trinity Church Diocese. Recognizing the profound need for accessible, rigorous biblical scholarship among vernacular ministers and urban pastors alike, the Diocese formally registered the university under the Indian Trusts Act, 1882.
            </p>
            <p>
              Over successive decades, administrative offices expanded from Bangalore and Tamil Nadu into northern Karnataka, New Delhi, and international missionary branches in Malaysia and the United States (Georgia). The curriculum expanded to include 13 foundational subjects, 7 comprehensive ministerial modules, original biblical language training, and research-level Ph.D. dissertations.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
            <Button href="/governance" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Meet Governing Council Leadership
            </Button>
            <Button href="/centres" variant="secondary">
              Explore Administrative Centres
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
