import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { specialisationsList } from "@/data/specialisations";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, CheckCircle2, Languages } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return specialisationsList.map((spec) => ({
    slug: spec.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const spec = specialisationsList.find((s) => s.slug === params.slug);
  if (!spec) return { title: "Specialisation Not Found" };

  return {
    title: spec.title,
    description: spec.bannerDescription,
    alternates: { canonical: `/academics/${spec.slug}` },
  };
}

export default function SpecialisationDetailPage({ params }: PageProps) {
  const spec = specialisationsList.find((s) => s.slug === params.slug);

  if (!spec) {
    notFound();
  }

  const relatedSpecs = specialisationsList.filter((s) =>
    spec.relatedSlugs.includes(s.slug)
  );

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* Back breadcrumb */}
        <div className="mb-6">
          <Link
            href="/academics"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-sans text-navy-900 hover:text-gold-800 transition-colors min-h-[36px] px-1 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Academics Hub</span>
          </Link>
        </div>

        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-gold-400 shadow-xl mb-12">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-widest text-gold-300 font-bold bg-gold-500/15 px-3 py-1 rounded-full border border-gold-400/40">
                {spec.badge}
              </span>
              <span className="text-xs font-mono font-bold text-slate-200">
                Code: {spec.shortCode}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {spec.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
              {spec.bannerDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200 pt-3 border-t border-navy-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
                <span>Prerequisites: {spec.prerequisites}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Overview Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-2">
              Disciplinary Scope &amp; Theological Significance
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {spec.overview}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-gold-300 shadow-sm">
              <Image
                src={
                  spec.slug === "ancient-languages" || spec.slug === "new-testament"
                    ? "/images/scriptural-languages.jpg"
                    : "/images/theological-heritage.jpg"
                }
                alt={
                  spec.slug === "ancient-languages" || spec.slug === "new-testament"
                    ? "Original scriptural parchment scrolls and ancient manuscript exegesis tools"
                    : "Theological commentary library and open Holy Bible for seminary research"
                }
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Language Glyphs Showcase */}
        {spec.languageGlyphs && (
          <div className="mb-16">
            <div className="border-b border-slate-200 pb-3 mb-8">
              <h2 className="font-serif text-2xl font-bold text-navy-950 flex items-center gap-2">
                <Languages className="w-6 h-6 text-gold-700 shrink-0" aria-hidden="true" />
                <span>Original Biblical Script Overview</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                Linguistic foundations for textual analysis and exegesis mastery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spec.languageGlyphs.map((glyph) => {
                const isRtl = glyph.language.includes("Hebrew") || glyph.language.includes("Aramaic");
                return (
                  <div
                    key={glyph.language}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-gold-400 transition-[border-color,box-shadow] duration-200 text-center flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className="w-24 h-20 mx-auto rounded-2xl bg-gold-50 border border-gold-300 flex items-center justify-center font-sans text-2xl font-bold text-navy-950 mb-4 shadow-inner px-2"
                        dir={isRtl ? "rtl" : "ltr"}
                      >
                        {glyph.primaryGlyph}
                      </div>

                      <h3 className="font-serif text-xl font-bold text-navy-950">
                        {glyph.language}
                      </h3>
                      <span className="text-xs font-mono text-gold-800 font-semibold block mb-3">
                        {glyph.scriptName}
                      </span>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                        {glyph.description}
                      </p>

                      <div
                        className="flex flex-wrap justify-center gap-1.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm font-sans text-navy-950"
                        dir={isRtl ? "rtl" : "ltr"}
                      >
                        {glyph.sampleGlyphs.slice(0, 10).map((char, idx) => (
                          <span key={idx} className="px-1 font-bold">
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700 italic">
                      {glyph.importance}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Course Sections */}
        <div className="space-y-12 mb-16">
          {spec.sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="font-serif text-2xl font-bold text-navy-950">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <p className="text-xs sm:text-sm text-slate-700 mt-1">{section.subheading}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.courses.map((course, cIdx) => (
                  <div
                    key={cIdx}
                    className={`p-5 rounded-xl bg-white border transition-[border-color,box-shadow] duration-200 ${
                      course.highlight
                        ? "border-gold-400 shadow-gold bg-gold-50/30"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif font-bold text-base text-navy-950">
                        {course.title}
                      </h3>
                      {course.highlight && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-gold-200 text-gold-950 uppercase shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related Specialisations */}
        {relatedSpecs.length > 0 && (
          <div className="mb-12">
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-4">
              Related Academic Tracks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedSpecs.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/academics/${rel.slug}`}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-gold-400 shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-gold-800 block mb-1">
                      {rel.shortCode}
                    </span>
                    <h3 className="font-serif font-bold text-navy-950 group-hover:text-gold-800 transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 mt-3">
                    <span>Explore Track</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-navy-950">
              Interested in studying this specialisation?
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Course modules are available in regular seminar sessions or guided distance formats.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button href="/admissions#apply" variant="gold">
              Apply for this Track
            </Button>
            <Button href="/curriculum" variant="outline">
              View Ministry Modules
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
