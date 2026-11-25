import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { LText } from "@/components/ui/LocalizedText";
import { institutionConfig } from "@/data/config";
import { Compass, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Vision & Mission Pillars",
  description:
    "Guiding ecclesiastical principles, vision, and four core mission pillars of University of Trinity International.",
  alternates: { canonical: "/vision-and-mission" },
};

export default function VisionAndMissionPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Guiding Principles" ta="வழிகாட்டும் கொள்கைகள்" />}
          title={<LText en="Vision & Mission" ta="தொலைநோக்கு & பணி" />}
          subtitle="Formulated to advance faithful biblical orthodoxy, ministerial excellence, and compassionate kingdom service."
        />

        {/* Vision Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold-300 shadow-card mb-12 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center text-gold-900 shrink-0">
                <Compass className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-800 block">
                  Strategic Horizon
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                  <LText en="Our Institutional Vision" ta="எங்கள் தொலைநோக்கு" />
                </h2>
              </div>
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-serif italic mb-4">
              &ldquo;To serve as a faithful global sanctuary of biblical truth and ministerial excellence, forming disciplined disciples and servant-hearted pastors who embody the love of Christ and strengthen church communities across nations.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Guided by Ephesians 4:11–13 — equipping the saints for the work of ministry and building up the body of Christ in unity of faith.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-gold-300 shadow-sm bg-navy-950">
              <Image
                src="/images/sanctuary-arch.svg"
                alt="Architectural Christian sanctuary arch illuminated by golden window light"
                width={1200}
                height={800}
                unoptimized
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission Pillars */}
        <div className="mb-16">
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
              <span>
                <LText en="Four Pillars of Our Mission" ta="எங்கள் பணியின் நான்கு தூண்கள்" />
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Core directives governing our faculties, curricular standards, and regional centres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card borderGold className="space-y-3">
              <span className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 font-bold text-xs flex items-center justify-center">
                01
              </span>
              <h3 className="font-serif text-lg font-bold text-navy-950">
                Doctrinal Orthodoxy &amp; Scripture Integrity
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Upholding the authority of sacred scripture through disciplined training in the Hebrew Bible, Greek New Testament, and classical apostolic creeds.
              </p>
            </Card>

            <Card borderGold className="space-y-3">
              <span className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 font-bold text-xs flex items-center justify-center">
                02
              </span>
              <h3 className="font-serif text-lg font-bold text-navy-950">
                Pastoral Formation &amp; Clerical Ethics
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Nurturing moral character, pastoral counselling acumen, and spiritual maturity among candidates preparing for Holy Orders and church service.
              </p>
            </Card>

            <Card borderGold className="space-y-3">
              <span className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 font-bold text-xs flex items-center justify-center">
                03
              </span>
              <h3 className="font-serif text-lg font-bold text-navy-950">
                Accessible &amp; Modular Theological Education
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Removing geographical and linguistic barriers by offering seminar study across regional centres with English and Tamil instructional pathways.
              </p>
            </Card>

            <Card borderGold className="space-y-3">
              <span className="w-8 h-8 rounded-lg bg-navy-50 text-navy-900 font-bold text-xs flex items-center justify-center">
                04
              </span>
              <h3 className="font-serif text-lg font-bold text-navy-950">
                Compassionate Community &amp; Missional Outreach
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Fostering respectful inter-religious dialogue, social stewardship, and service to vulnerable communities in accordance with the Gospel.
              </p>
            </Card>
          </div>
        </div>

        {/* Mandatory Legal Statement */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
          <p className="text-xs sm:text-sm text-gold-800 font-semibold">
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
