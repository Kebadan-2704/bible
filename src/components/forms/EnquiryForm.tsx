"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid telephone number"),
  programmeLevel: z.string().min(1, "Please select an academic or ordination programme"),
  centrePreference: z.string().min(1, "Please select a preferred centre"),
  callingDescription: z.string().min(10, "Please share a brief note on your ministry background or educational interest"),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const EnquiryForm: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      programmeLevel: "",
      centrePreference: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to submit enquiry. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please contact our administrative office directly.");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-300 p-6 sm:p-10 relative overflow-hidden">
      {/* Decorative top gold strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" aria-hidden="true" />

      <div className="mb-8">
        <span className="text-xs font-bold tracking-wider text-gold-800 uppercase block">
          Direct Admissions &amp; Enquiry
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-1">
          Apply or Make an Inquiry
        </h3>
        <p className="text-sm text-slate-700 mt-2">
          Connect with our admissions secretariat for prospectus distribution, modular course schedules, or ordination track evaluations.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-in fade-in">
          <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
          <h4 className="font-serif text-2xl font-bold text-emerald-950">
            Enquiry Received Successfully
          </h4>
          <p className="text-sm text-emerald-900 max-w-md mx-auto font-medium">
            Thank you for reaching out to Trinity International University. Our admissions secretary will review your candidate profile and reach out via email/phone with prospectus details.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="px-5 py-2.5 text-xs font-bold text-emerald-950 bg-emerald-200 hover:bg-emerald-300 rounded-lg transition-colors min-h-[36px]"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {status === "error" && (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-300 flex items-start gap-3 text-rose-900 text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-700" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-navy-950 mb-1">
                Full Name (with Clerical Title if any) <span className="text-rose-600">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                {...register("fullName")}
                placeholder="e.g. Pastor John David / Rev. Mary"
                className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg border border-slate-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-colors duration-150 text-navy-950 placeholder:text-slate-600 bg-white"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-700 font-semibold mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-navy-950 mb-1">
                Email Address <span className="text-rose-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg border border-slate-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-colors duration-150 text-navy-950 placeholder:text-slate-600 bg-white"
              />
              {errors.email && (
                <p className="text-xs text-rose-700 font-semibold mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-navy-950 mb-1">
                Phone / WhatsApp Number <span className="text-rose-600">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg border border-slate-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-colors duration-150 text-navy-950 placeholder:text-slate-600 bg-white"
              />
              {errors.phone && (
                <p className="text-xs text-rose-700 font-semibold mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Programme Level */}
            <div>
              <label htmlFor="programmeLevel" className="block text-xs font-bold text-navy-950 mb-1">
                Programme of Interest <span className="text-rose-600">*</span>
              </label>
              <select
                id="programmeLevel"
                {...register("programmeLevel")}
                className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg border border-slate-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-colors duration-150 text-navy-950 bg-white"
              >
                <option value="">Select Programme / Level</option>
                <option value="B.Th. / B.D. (Undergraduate Theology)">B.Th. / B.D. (Bachelor of Theology / Divinity)</option>
                <option value="B.Min. (Bachelor of Ministry)">B.Min. (Bachelor of Ministry)</option>
                <option value="M.Div. / M.Th. (Master of Divinity / Theology)">M.Div. / M.Th. (Master&apos;s Programmes)</option>
                <option value="M.Min. (Master of Ministry)">M.Min. (Master of Ministry)</option>
                <option value="Ph.D. in Theology (4 Years)">Ph.D. in Theology (Doctoral Research - 4 Years)</option>
                <option value="D.Min. / Th.D. / D.D.">Doctor of Ministry / Theology / Divinity</option>
                <option value="Ordinance Course (Evangelist / Pastor / Reverend / Bishop)">Ordinance Track (Brochure 2)</option>
                <option value="Biblical Languages (Hebrew, Aramaic, Greek)">Language Options Course</option>
              </select>
              {errors.programmeLevel && (
                <p className="text-xs text-rose-700 font-semibold mt-1">{errors.programmeLevel.message}</p>
              )}
            </div>
          </div>

          {/* Preferred Administrative Centre */}
          <div>
            <label htmlFor="centrePreference" className="block text-xs font-bold text-navy-950 mb-1">
              Preferred Administrative Centre / Mode <span className="text-rose-600">*</span>
            </label>
            <select
              id="centrePreference"
              {...register("centrePreference")}
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg border border-slate-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-colors duration-150 text-navy-950 bg-white"
            >
              <option value="">Select Regional Centre</option>
              <option value="Bangalore HQ (Central Administration)">Bangalore (Headquarters)</option>
              <option value="Trinity Centre">Trinity Diocesan Centre</option>
              <option value="Coimbatore Centre">Coimbatore Regional Centre</option>
              <option value="Chennai Centre">Chennai Regional Centre</option>
              <option value="Dandeli Centre">Dandeli Centre</option>
              <option value="New Delhi Centre">New Delhi Liaison</option>
              <option value="Hyderabad Centre">Hyderabad (Telangana)</option>
              <option value="Malaysia Centre (International)">Malaysia Overseas Centre</option>
              <option value="Georgia (USA) Liaison">Georgia (USA) Overseas Liaison</option>
              <option value="Online / Modular Distance Learning">Online / Modular Distance Learning</option>
            </select>
            {errors.centrePreference && (
              <p className="text-xs text-rose-700 font-semibold mt-1">{errors.centrePreference.message}</p>
            )}
          </div>

          {/* Statement of Interest */}
          <div>
            <label htmlFor="callingDescription" className="block text-xs font-bold text-navy-950 mb-1">
              Ministry Background / Reason for Enquiring <span className="text-rose-600">*</span>
            </label>
            <textarea
              id="callingDescription"
              rows={4}
              {...register("callingDescription")}
              placeholder="Tell us about your church affiliation, current ministry calling, or academic goals..."
              className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-lg border border-slate-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition-colors duration-150 text-navy-950 placeholder:text-slate-600 bg-white"
            />
            {errors.callingDescription && (
              <p className="text-xs text-rose-700 font-semibold mt-1">{errors.callingDescription.message}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3.5 px-6 rounded-lg font-serif font-extrabold text-sm uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-[#061026] hover:brightness-105 shadow-gold transition-transform duration-150 hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-60 min-h-[48px] border border-gold-300"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Send Admissions Enquiry</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-600 text-center">
            Your details are kept strictly confidential under our diocesan privacy policy.
          </p>
        </form>
      )}
    </div>
  );
};
export default EnquiryForm;
