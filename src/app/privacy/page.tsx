import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { institutionConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Privacy Policy | Candidate Data Confidentiality",
  description:
    "Confidentiality and candidate data handling policies of Trinity International University.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          level="h1"
          badge="Candidate Confidentiality"
          title="Privacy Policy"
          subtitle="How candidate profiles, pastoral references, and admissions data are preserved under our diocesan custody."
        />

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-6 text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-2">
              1. Information Collection
            </h2>
            <p>
              When you submit an application, prospectus request, or admissions enquiry to <strong>{institutionConfig.institutionName}</strong>, we collect personal information such as your name, contact telephone, email address, theological background, and pastoral references.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-2">
              2. Purpose of Processing
            </h2>
            <p>
              Collected data is utilized strictly for academic evaluation, scheduling pastoral interviews, maintaining student registries, and transmitting relevant curricular notifications. We never sell, rent, or lease candidate data to external commercial marketers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-2">
              3. Ministerial Records Security
            </h2>
            <p>
              Personal testimony, pastoral recommendations, and ordination records are safeguarded under strict clerical confidentiality in accordance with diocesan canons and ethical guidelines.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-2">
              4. Contact for Privacy Matters
            </h2>
            <p>
              For inquiries regarding personal data retention or to request correction of your student profile, contact the admissions secretariat at {institutionConfig.contact.admissionsEmail}.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 text-xs text-slate-400 italic text-center">
            {institutionConfig.institutionName} • {institutionConfig.diocesanAffiliation}
          </div>
        </div>
      </div>
    </div>
  );
}
