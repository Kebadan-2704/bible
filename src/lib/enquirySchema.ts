import { z } from "zod";

export const ENQUIRY_TYPES = [
  "admissions",
  "programme_info",
  "credential_verification",
  "documentation",
  "general",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

const phonePattern = /^[+]?[\d\s()-]{8,30}$/;

function hasValidDigitCount(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export const enquirySchema = z
  .object({
    enquiryType: z.enum(ENQUIRY_TYPES).default("admissions"),
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(150, "Full name must be 150 characters or fewer"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(5, "Please enter a valid email address")
      .max(254, "Email address must not exceed 254 characters")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(8, "Please enter a valid telephone number (8–15 digits)")
      .max(30, "Telephone number must be 30 characters or fewer")
      .regex(phonePattern, "Telephone number contains invalid characters")
      .refine(hasValidDigitCount, "Telephone number must contain 8 to 15 digits"),
    programmeLevel: z
      .string()
      .trim()
      .max(150, "Programme selection must be 150 characters or fewer")
      .optional()
      .default(""),
    centrePreference: z
      .string()
      .trim()
      .max(100, "Centre selection must be 100 characters or fewer")
      .optional()
      .default(""),
    callingDescription: z
      .string()
      .trim()
      .min(5, "Please include brief details regarding your enquiry")
      .max(2000, "Enquiry message must not exceed 2,000 characters"),
    website: z.string().max(200).optional().default(""),
    turnstileToken: z.string().max(2048).optional().default(""),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.enquiryType === "admissions") {
      if (!data.programmeLevel || data.programmeLevel.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["programmeLevel"],
          message: "Please select an academic or ordination programme",
        });
      }
      if (!data.centrePreference || data.centrePreference.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["centrePreference"],
          message: "Please select a preferred centre",
        });
      }
      if (data.callingDescription.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["callingDescription"],
          message: "Please share at least 10 characters on your ministry background or goals",
        });
      }
    } else if (data.enquiryType === "programme_info") {
      if (!data.programmeLevel || data.programmeLevel.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["programmeLevel"],
          message: "Please select the programme you would like syllabus details for",
        });
      }
    }
  });

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export function stripHeaderControlChars(value: string): string {
  return value.replace(/[\r\n\0]+/g, " ").trim();
}
