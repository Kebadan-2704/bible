import React from "react";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LText } from "@/components/ui/LocalizedText";
import { institutionConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Governance",
  description:
    "Candidate confidentiality, enquiry processing, data rights, and DPDP Act disclosure for University of Trinity International.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        <SectionHeader
          level="h1"
          badge={<LText en="Candidate Confidentiality" ta="தரவு பாதுகாப்பு & தனியுரிமை" />}
          title={<LText en="Privacy Policy" ta="தனியுரிமைக் கொள்கை" />}
          subtitle="How candidate profiles, correspondence details, and enquiry submissions are collected, processed, and safeguarded."
        />

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-navy-950">
              1. Data Fiduciary Identity
            </h2>
            <p>
              This portal is operated by <strong>{institutionConfig.institutionName}</strong> under the{" "}
              <strong>{institutionConfig.diocesanAffiliation}</strong> ({institutionConfig.registeredUnder}). Primary administrative correspondence sits in{" "}
              {institutionConfig.headquarters.address}.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-navy-950">
              2. Categories of Personal Data Collected
            </h2>
            <p>
              When you voluntarily submit an admissions application, programme request, certificate verification request, or general enquiry, we collect only the information submitted through the form:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Identity &amp; contact details: Full name (and clerical title), email address, and telephone / WhatsApp number.</li>
              <li>Academic &amp; ministry selections: Enquiry purpose, programme of interest, and preferred regional centre.</li>
              <li>Free-text statements: Candidate background note or certificate verification details provided by you.</li>
              <li>Operational anti-abuse signals: IP-based rate-limit hashes and browser request metadata strictly for spam prevention and security auditing.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-navy-950">
              3. Purpose of Processing &amp; Consent
            </h2>
            <p>
              Submitted data is processed solely to respond to your requested enquiry, evaluate admissions readiness, verify academic or ordination records, and maintain official student registries. We never sell, rent, or distribute candidate records to external marketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-navy-950">
              4. Third-Party Infrastructure &amp; Processors
            </h2>
            <p>
              Form enquiries may be transmitted over encrypted HTTPS through third-party transactional infrastructure strictly for delivery and abuse protection:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Email delivery service (Resend) for routing enquiries to the Admissions Secretariat inbox.</li>
              <li>Web hosting, CDN, and security layers (rate limiting and optional Cloudflare Turnstile bot protection) maintaining short-lived technical security diagnostics.</li>
              <li>Server diagnostic logs exclude personal candidate statements and redact full payload content.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-navy-950">
              5. Retention &amp; Local Browser Preferences
            </h2>
            <p>
              The website stores only a lightweight language preference setting (<code>tiu_locale</code> for English/Tamil display) locally in your browser without advertising trackers or third-party analytics cookies. Submitted correspondence is retained only as long as reasonably necessary for admissions review, academic record verification, and applicable statutory obligations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-navy-950">
              6. Your Rights &amp; Grievance Redressal
            </h2>
            <p>
              Subject to applicable data protection standards (including India&apos;s Digital Personal Data Protection frameworks), you may request access to, correction of, withdrawal of consent for, or deletion of personal data previously submitted to the university.
            </p>
            <p>
              To submit a data request or grievance regarding personal data handling, please contact our Secretariat Privacy Desk at{" "}
              <a
                href={`mailto:${institutionConfig.contact.grievanceEmail}`}
                className="text-navy-900 font-semibold underline"
              >
                {institutionConfig.contact.grievanceEmail}
              </a>{" "}
              or{" "}
              <a
                href={`mailto:${institutionConfig.contact.admissionsEmail}`}
                className="text-navy-900 font-semibold underline"
              >
                {institutionConfig.contact.admissionsEmail}
              </a>
              .
            </p>
          </section>

          <div className="pt-6 border-t border-slate-200 text-xs text-slate-700 italic text-center">
            {institutionConfig.institutionName} • {institutionConfig.diocesanAffiliation}
          </div>
        </div>
      </div>
    </div>
  );
}
