import { NextResponse } from "next/server";
import { z } from "zod";

const enquirySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  programmeLevel: z.string().min(1),
  centrePreference: z.string().min(1),
  callingDescription: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = enquirySchema.parse(body);

    // Institutional logging
    console.log("=========================================");
    console.log("NEW ADMISSIONS / CONTACT ENQUIRY RECEIVED");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Candidate Name:", validatedData.fullName);
    console.log("Email:", validatedData.email);
    console.log("Phone:", validatedData.phone);
    console.log("Programme of Interest:", validatedData.programmeLevel);
    console.log("Centre Preference:", validatedData.centrePreference);
    console.log("Statement:", validatedData.callingDescription);
    console.log("=========================================");

    // Optional Resend email dispatch if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "onboarding@resend.dev",
            to: process.env.EMAIL_TO || "admissions@trinityinternationaluniversity.edu.in",
            subject: `New Admissions Enquiry: ${validatedData.fullName} (${validatedData.programmeLevel})`,
            text: `
New Enquiry from Trinity International University website:

Name: ${validatedData.fullName}
Email: ${validatedData.email}
Phone: ${validatedData.phone}
Programme: ${validatedData.programmeLevel}
Centre: ${validatedData.centrePreference}

Ministry Background / Statement:
${validatedData.callingDescription}
            `,
          }),
        });

        if (!resendResponse.ok) {
          console.warn("Resend email dispatch failed with status:", resendResponse.status);
        }
      } catch (emailErr) {
        console.error("Email service error:", emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully. Admissions office will be in touch.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
