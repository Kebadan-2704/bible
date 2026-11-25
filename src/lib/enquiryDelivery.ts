import { EnquiryFormData, stripHeaderControlChars } from "./enquirySchema";

export interface DeliveryOutcome {
  ok: boolean;
  status: number;
  code:
    | "DELIVERED_EMAIL"
    | "PERSISTED_BACKUP_ONLY"
    | "EMAIL_SERVICE_UNCONFIGURED"
    | "EMAIL_DELIVERY_FAILED";
  persisted: boolean;
  emailSent: boolean;
}

const ENQUIRY_TYPE_LABELS: Record<EnquiryFormData["enquiryType"], string> = {
  admissions: "Admissions Application",
  programme_info: "Programme Syllabus Request",
  credential_verification: "Credential & Certificate Verification",
  documentation: "Institutional Documentation Request",
  general: "General Secretariat Enquiry",
};

export async function verifyTurnstileToken(token: string | undefined, clientIp: string): Promise<{ ok: boolean; skipped: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: true, skipped: true };
  }
  if (!token) {
    return { ok: false, skipped: false };
  }

  try {
    const formData = new URLSearchParams();
    formData.set("secret", secret);
    formData.set("response", token);
    if (clientIp !== "unknown-client") {
      formData.set("remoteip", clientIp);
    }

    const turnstileUrl = process.env.TURNSTILE_SITEVERIFY_URL || "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const res = await fetch(turnstileUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return { ok: false, skipped: false };
    const result = (await res.json()) as { success?: boolean };
    return { ok: Boolean(result.success), skipped: false };
  } catch {
    return { ok: false, skipped: false };
  }
}

export async function dispatchEnquiry(requestId: string, data: EnquiryFormData): Promise<DeliveryOutcome> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendEndpoint = process.env.RESEND_API_URL || "https://api.resend.com/emails";
  const backupWebhookUrl = process.env.ENQUIRY_BACKUP_WEBHOOK_URL;
  const backupWebhookToken = process.env.ENQUIRY_BACKUP_WEBHOOK_TOKEN;

  const safeName = stripHeaderControlChars(data.fullName);
  const safeType = ENQUIRY_TYPE_LABELS[data.enquiryType] || "Enquiry";
  const safeProgramme = stripHeaderControlChars(data.programmeLevel || "General / Not specified");
  const safeCentre = stripHeaderControlChars(data.centrePreference || "Central Secretariat");
  const safePhone = stripHeaderControlChars(data.phone);
  const safeEmail = stripHeaderControlChars(data.email);

  let emailSent = false;
  let emailAttempted = false;

  if (resendApiKey) {
    emailAttempted = true;
    try {
      const subjectLine = `[TIU ${safeType}] ${safeName} (${safeProgramme})`.slice(0, 180);
      const textBody = [
        `Reference ID: ${requestId}`,
        `Enquiry Purpose: ${safeType}`,
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Phone: ${safePhone}`,
        `Programme: ${safeProgramme}`,
        `Centre: ${safeCentre}`,
        "",
        "Message / Statement:",
        data.callingDescription,
      ].join("\n");

      const resendRes = await fetch(resendEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Trinity Admissions <onboarding@resend.dev>",
          to: process.env.EMAIL_TO || "admissions@trinityinternationaluniversity.edu.in",
          reply_to: safeEmail,
          subject: subjectLine,
          text: textBody,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (resendRes.ok) {
        emailSent = true;
      } else {
        console.warn(
          JSON.stringify({
            event: "contact_resend_rejected",
            requestId,
            status: resendRes.status,
          })
        );
      }
    } catch (err: unknown) {
      console.error(
        JSON.stringify({
          event: "contact_resend_error",
          requestId,
          errorType: err instanceof Error ? err.name : "UnknownError",
        })
      );
    }
  }

  let persistedInBackup = false;
  if (backupWebhookUrl) {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (backupWebhookToken) {
        headers.Authorization = `Bearer ${backupWebhookToken}`;
      }
      const backupRes = await fetch(backupWebhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          requestId,
          receivedAt: new Date().toISOString(),
          emailDelivered: emailSent,
          payload: {
            enquiryType: data.enquiryType,
            fullName: safeName,
            email: safeEmail,
            phone: safePhone,
            programmeLevel: safeProgramme,
            centrePreference: safeCentre,
            callingDescription: data.callingDescription,
          },
        }),
        signal: AbortSignal.timeout(8000),
      });
      persistedInBackup = backupRes.ok;
    } catch {
      console.error(
        JSON.stringify({
          event: "contact_backup_webhook_error",
          requestId,
        })
      );
    }
  }

  if (emailSent) {
    return {
      ok: true,
      status: 200,
      code: "DELIVERED_EMAIL",
      persisted: persistedInBackup,
      emailSent: true,
    };
  }

  if (persistedInBackup) {
    return {
      ok: true,
      status: 202,
      code: "PERSISTED_BACKUP_ONLY",
      persisted: true,
      emailSent: false,
    };
  }

  if (!emailAttempted) {
    return {
      ok: false,
      status: 503,
      code: "EMAIL_SERVICE_UNCONFIGURED",
      persisted: false,
      emailSent: false,
    };
  }

  return {
    ok: false,
    status: 502,
    code: "EMAIL_DELIVERY_FAILED",
    persisted: false,
    emailSent: false,
  };
}
