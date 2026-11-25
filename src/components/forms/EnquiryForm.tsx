"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { enquirySchema, EnquiryFormData, EnquiryType, ENQUIRY_TYPES } from "@/lib/enquirySchema";
import { administrativeCentres, centreSlugToFormOption } from "@/data/centres";
import { useLocale } from "@/components/providers/LocaleProvider";

interface EnquiryFormProps {
  defaultPurpose?: EnquiryType;
}

const VALID_TYPE_SET = new Set<string>(ENQUIRY_TYPES);

const EnquiryFormInner: React.FC<EnquiryFormProps> = ({ defaultPurpose = "admissions" }) => {
  const searchParams = useSearchParams();
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      enquiryType: defaultPurpose,
      fullName: "",
      email: "",
      phone: "",
      programmeLevel: "",
      centrePreference: "",
      callingDescription: "",
      website: "",
      turnstileToken: "",
    },
  });

  const activeType = watch("enquiryType");

  // Pre-fill centrePreference & enquiryType from verified URL query params
  useEffect(() => {
    const centreSlug = searchParams.get("centre")?.trim().toLowerCase();
    if (centreSlug && centreSlugToFormOption[centreSlug]) {
      setValue("centrePreference", centreSlugToFormOption[centreSlug], { shouldDirty: false });
    }

    const typeParam = searchParams.get("type")?.trim().toLowerCase();
    if (typeParam && VALID_TYPE_SET.has(typeParam)) {
      setValue("enquiryType", typeParam as EnquiryType, { shouldDirty: false });
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: EnquiryFormData) => {
    setStatus("submitting");
    setErrorMessage("");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !resData?.success) {
        throw new Error(
          resData?.message || "Unable to complete enquiry delivery. Please contact our secretariat directly by email."
        );
      }

      setStatus("success");
      setStatusMessage(
        resData.message ||
          "Thank you for reaching out to University of Trinity International. Our secretariat will respond shortly."
      );
      reset({
        enquiryType: data.enquiryType,
        fullName: "",
        email: "",
        phone: "",
        programmeLevel: "",
        centrePreference: data.centrePreference,
        callingDescription: "",
        website: "",
        turnstileToken: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please email admissions@trinityinternationaluniversity.edu.in directly.");
      }
    }
  };

  const isAdmissionsOrProgramme =
    activeType === "admissions" || activeType === "programme_info";

  const formHeading =
    activeType === "admissions" ? t.form.admissionsTitle : t.form.title;

  const translateErr = (msg?: string): string | undefined => {
    if (!msg) return undefined;
    if (locale !== "ta") return msg;
    if (msg.includes("Full name")) return t.form.validationErrors.fullNameMin;
    if (msg.includes("email")) return t.form.validationErrors.emailInvalid;
    if (msg.includes("telephone") || msg.includes("digits")) return t.form.validationErrors.phoneInvalid;
    if (msg.includes("programme")) return t.form.validationErrors.programmeRequired;
    if (msg.includes("centre")) return t.form.validationErrors.centreRequired;
    return t.form.validationErrors.descriptionMin;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-300 p-6 sm:p-10 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
        aria-hidden="true"
      />

      <div className="mb-7">
        <span className="text-xs font-bold tracking-wider text-gold-800 uppercase block">
          {t.form.eyebrow}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-1">
          {formHeading}
        </h3>
        <p className="text-sm text-slate-700 mt-2">{t.form.subtitle}</p>
      </div>

      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="p-8 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-4 tiu-panel-enter"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" aria-hidden="true" />
          <h4 className="font-serif text-2xl font-bold text-emerald-950">
            {t.form.successTitle}
          </h4>
          <p className="text-sm text-emerald-950 max-w-md mx-auto font-medium">{statusMessage}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="px-5 py-2.5 text-xs font-bold text-emerald-950 bg-emerald-200 hover:bg-emerald-300 rounded-lg transition-colors min-h-[44px]"
          >
            {t.form.submitAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {status === "error" && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-4 rounded-lg bg-rose-50 border border-rose-300 flex items-start gap-3 text-rose-950 text-sm font-medium"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-700" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Anti-spam Honeypot (hidden cleanly from keyboard & screen readers) */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="tiu-website-hp">Leave this field empty</label>
            <input
              id="tiu-website-hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          {/* Enquiry Purpose Selector (TIU-023) */}
          <div>
            <label htmlFor="enquiryType" className="block text-xs font-bold text-navy-950 mb-1.5">
              {t.form.purposeLabel} <span className="text-rose-700">*</span>
            </label>
            <select
              id="enquiryType"
              {...register("enquiryType")}
              className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-500 focus:border-gold-600 focus:ring-2 focus:ring-gold-200 transition-colors text-navy-950 bg-white font-medium"
            >
              <option value="admissions">{t.form.purposes.admissions}</option>
              <option value="programme_info">{t.form.purposes.programme_info}</option>
              <option value="credential_verification">{t.form.purposes.credential_verification}</option>
              <option value="documentation">{t.form.purposes.documentation}</option>
              <option value="general">{t.form.purposes.general}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-navy-950 mb-1.5">
                {t.form.fullNameLabel} <span className="text-rose-700">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                maxLength={150}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                {...register("fullName")}
                placeholder={t.form.fullNamePlaceholder}
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-500 focus:border-gold-600 focus:ring-2 focus:ring-gold-200 transition-colors text-navy-950 placeholder:text-slate-600 bg-white"
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-xs text-rose-700 font-semibold mt-1">
                  {translateErr(errors.fullName.message)}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-navy-950 mb-1.5">
                {t.form.emailLabel} <span className="text-rose-700">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                placeholder={t.form.emailPlaceholder}
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-500 focus:border-gold-600 focus:ring-2 focus:ring-gold-200 transition-colors text-navy-950 placeholder:text-slate-600 bg-white"
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-rose-700 font-semibold mt-1">
                  {translateErr(errors.email.message)}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-navy-950 mb-1.5">
                {t.form.phoneLabel} <span className="text-rose-700">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
                placeholder={t.form.phonePlaceholder}
                className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-500 focus:border-gold-600 focus:ring-2 focus:ring-gold-200 transition-colors text-navy-950 placeholder:text-slate-600 bg-white"
              />
              {errors.phone && (
                <p id="phone-error" className="text-xs text-rose-700 font-semibold mt-1">
                  {translateErr(errors.phone.message)}
                </p>
              )}
            </div>

            {/* Programme Level (shown primarily for admissions & syllabus enquiries) */}
            {isAdmissionsOrProgramme ? (
              <div>
                <label htmlFor="programmeLevel" className="block text-xs font-bold text-navy-950 mb-1.5">
                  {t.form.programmeLabel} <span className="text-rose-700">*</span>
                </label>
                <select
                  id="programmeLevel"
                  aria-invalid={Boolean(errors.programmeLevel)}
                  aria-describedby={errors.programmeLevel ? "programmeLevel-error" : undefined}
                  {...register("programmeLevel")}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-500 focus:border-gold-600 focus:ring-2 focus:ring-gold-200 transition-colors text-navy-950 bg-white"
                >
                  <option value="">{t.form.programmeSelectPrompt}</option>
                  <option value="B.Th. / B.D. (Undergraduate Theology)">
                    B.Th. / B.D. (Bachelor of Theology / Divinity)
                  </option>
                  <option value="B.Min. (Bachelor of Ministry)">B.Min. (Bachelor of Ministry)</option>
                  <option value="M.Div. / M.Th. (Master of Divinity / Theology)">
                    M.Div. / M.Th. (Master&apos;s Programmes)
                  </option>
                  <option value="M.Min. (Master of Ministry)">M.Min. (Master of Ministry)</option>
                  <option value="Ph.D. in Theology (4 Years)">
                    Ph.D. in Theology (Doctoral Research – 4 Years)
                  </option>
                  <option value="D.Min. / Th.D. / D.D.">
                    Doctor of Ministry / Theology / Divinity
                  </option>
                  <option value="Ordinance Course (Evangelist / Pastor / Apostle / Reverend / Bishop)">
                    Ordinance Track (Clerical Ordination)
                  </option>
                  <option value="Biblical Languages (Hebrew, Aramaic, Greek)">
                    Language Options (Hebrew, Aramaic &amp; Greek)
                  </option>
                </select>
                {errors.programmeLevel && (
                  <p id="programmeLevel-error" className="text-xs text-rose-700 font-semibold mt-1">
                    {translateErr(errors.programmeLevel.message)}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-end pb-1">
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 w-full">
                  Academic programme selection is optional for{" "}
                  <strong>{t.form.purposes[activeType]}</strong> requests.
                </p>
              </div>
            )}
          </div>

          {/* Preferred Administrative Centre */}
          <div>
            <label htmlFor="centrePreference" className="block text-xs font-bold text-navy-950 mb-1.5">
              {t.form.centreLabel}{" "}
              {activeType === "admissions" && <span className="text-rose-700">*</span>}
            </label>
            <select
              id="centrePreference"
              aria-invalid={Boolean(errors.centrePreference)}
              aria-describedby={errors.centrePreference ? "centrePreference-error" : undefined}
              {...register("centrePreference")}
              className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-500 focus:border-gold-600 focus:ring-2 focus:ring-gold-200 transition-colors text-navy-950 bg-white"
            >
              <option value="">{t.form.centreSelectPrompt}</option>
              {administrativeCentres.map((centre) => (
                <option key={centre.id} value={centre.contactOptionValue}>
                  {centre.name}
                </option>
              ))}
              <option value="Online / Modular Distance Learning">
                Online / Modular Distance Learning
              </option>
            </select>
            {errors.centrePreference && (
              <p id="centrePreference-error" className="text-xs text-rose-700 font-semibold mt-1">
                {translateErr(errors.centrePreference.message)}
              </p>
            )}
          </div>

          {/* Statement / Enquiry Message */}
          <div>
            <label htmlFor="callingDescription" className="block text-xs font-bold text-navy-950 mb-1.5">
              {activeType === "admissions"
                ? t.form.statementLabelAdmissions
                : t.form.statementLabelOther}{" "}
              <span className="text-rose-700">*</span>
            </label>
            <textarea
              id="callingDescription"
              rows={4}
              maxLength={2000}
              aria-invalid={Boolean(errors.callingDescription)}
              aria-describedby={errors.callingDescription ? "callingDescription-error" : undefined}
              {...register("callingDescription")}
              placeholder={
                activeType === "admissions"
                  ? t.form.statementPlaceholderAdmissions
                  : t.form.statementPlaceholderOther
              }
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-500 focus:border-gold-600 focus:ring-2 focus:ring-gold-200 transition-colors text-navy-950 placeholder:text-slate-600 bg-white"
            />
            {errors.callingDescription && (
              <p id="callingDescription-error" className="text-xs text-rose-700 font-semibold mt-1">
                {translateErr(errors.callingDescription.message)}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3.5 px-6 rounded-lg font-sans font-extrabold text-sm uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 hover:brightness-105 shadow-gold transition-transform duration-150 hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-60 min-h-[48px] border border-gold-300"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>{t.form.submittingText}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {activeType === "admissions"
                      ? t.form.submitButtonAdmissions
                      : t.form.submitButtonOther}
                  </span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-600 text-center">{t.form.privacyNote}</p>
        </form>
      )}
    </div>
  );
};

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ defaultPurpose }) => {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-2xl shadow-xl border border-slate-300 p-8 text-sm text-slate-600">
          Loading enquiry form...
        </div>
      }
    >
      <EnquiryFormInner defaultPurpose={defaultPurpose} />
    </Suspense>
  );
};

export default EnquiryForm;
