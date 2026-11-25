import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Crest } from "@/components/ui/Crest";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LText } from "@/components/ui/LocalizedText";
import { institutionConfig } from "@/data/config";
import { ShieldCheck, BookOpen, Compass, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Heritage & Registration",
  description:
    "Learn about University of Trinity International, legally constituted under Christian legal rites and The Indian Trusts Act, 1882.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <LText en="Institutional Heritage" ta="நிறுவன மரபு" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            <LText
              en="About University of Trinity International"
              ta="யுனிவர்சிட்டி ஆஃப் டிரினிட்டி இன்டர்நேஷனல் பற்றி"
            />
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-serif italic">
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
              <p className="text-xs text-gold-800 font-semibold mt-1">
                {institutionConfig.diocesanAffiliation}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-700 space-y-1">
                <p>Christian Legal Rites &amp; Traditions</p>
                <p className="font-semibold text-navy-900">Head Quarters: YGM – Bangalore</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
              <LText
                en="Clerical Traditions & Faithful Theological Formation"
                ta="குருத்துவ மரபுகள் மற்றும் விசுவாச இறையியல் பயிற்சி"
              />
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              <strong>{institutionConfig.institutionName}</strong> is an ecclesiastical institution legally constituted under traditional Christian legal rites and trust covenants within the{" "}
              <strong>{institutionConfig.diocesanAffiliation}</strong>, serving as an academic and spiritual community for pastors, ministers, catechists, and biblical scholars.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Our educational framework harmonizes classical biblical exegesis with the practical demands of pastoral ministry—from original scriptural languages (Biblical Hebrew, Aramaic, and Koine Greek) to systematic reflections on Christian ethics and counselling.
            </p>

            {/* Legal Notice Callout */}
            <div className="p-5 rounded-xl bg-gold-50 border border-gold-300 space-y-2">
              <div className="flex items-center gap-2 text-gold-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-gold-700 shrink-0" aria-hidden="true" />
                <span>Statutory Trust Registration</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Registered under <strong>{institutionConfig.registeredUnder}</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded border border-gold-200">
                  <span className="text-slate-700 block text-xs font-medium">
                    Tamil Nadu Registration:
                  </span>
                  <span className="font-bold text-navy-950 text-xs">
                    {institutionConfig.registrations.tamilNadu.number}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded border border-gold-200">
                  <span className="text-slate-700 block text-xs font-medium">
                    Karnataka Registration:
                  </span>
                  <span className="font-bold text-navy-950 text-xs">
                    {institutionConfig.registrations.karnataka.number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card borderGold className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
              <Compass className="w-6 h-6 text-gold-700" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-800 block">
              Guided by Divine Purpose
            </span>
            <h3 className="font-serif text-2xl font-bold text-navy-950">Our Vision</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              To serve as a faithful global sanctuary of biblical truth and ministerial excellence, forming disciplined disciples and servant-hearted pastors who embody the love of Christ and strengthen church communities across nations.
            </p>
          </Card>

          <Card borderGold className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900">
              <BookOpen className="w-6 h-6 text-gold-700" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-800 block">
              The Great Commission in Action
            </span>
            <h3 className="font-serif text-2xl font-bold text-navy-950">Our Mission</h3>
            <ul className="text-sm text-slate-700 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Deliver accessible, doctrinally grounded theological education across regional centres and modular formats.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Prepare ministers for pastoral service through biblical hermeneutics, dogmatics, and counselling.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Encourage thoughtful theological research engaging ethical questions and church stewardship.
                </span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Institutional Structure & Evolution */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 mb-16">
          <SectionHeader
            badge="Diocesan Origins"
            title="Institutional Heritage & Ministry Scope"
            subtitle="Preserving Christian clerical traditions while providing structured theological instruction for active pastors."
            align="left"
          />

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
            <p>
              <strong>University of Trinity International</strong> arose within the fellowship of the{" "}
              {institutionConfig.diocesanAffiliation} to equip urban and vernacular pastors with structured theological instruction. Formal trust registrations in Tamil Nadu (
              {institutionConfig.registrations.tamilNadu.number}) and Karnataka (
              {institutionConfig.registrations.karnataka.number}) established legal stewardship under {institutionConfig.registeredUnder}.
            </p>
            <p>
              Through its headquarters at YGM – Bangalore and administrative centres across India, Malaysia, and Georgia (USA), the institution delivers 13 foundational core subjects, 7 ministerial modules, original scriptural language training, and supervised research tracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
              <Image
                src="/images/theological-heritage.jpg"
                alt="Open antique Holy Bible and commentary texts in a classical seminary study sanctuary"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full aspect-[3/2] object-cover"
              />
              <figcaption className="px-4 py-2.5 text-xs font-medium text-slate-700">
                Biblical Orthodoxy &amp; Ministerial Formation
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
              <Image
                src="/images/scriptural-languages.jpg"
                alt="Ancient parchment scrolls, calligraphy pen, and commentary bindings for scriptural exegesis"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full aspect-[3/2] object-cover"
              />
              <figcaption className="px-4 py-2.5 text-xs font-medium text-slate-700">
                Original Scriptural Languages &amp; Exegetical Study
              </figcaption>
            </figure>
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
