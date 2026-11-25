import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { enquirySchema } from "@/lib/enquirySchema";
import { checkDuplicateSubmission, checkRateLimit, extractTrustedClientIp } from "@/lib/rateLimit";
import { dispatchEnquiry, verifyTurnstileToken } from "@/lib/enquiryDelivery";

const MAX_BODY_BYTES = 16_384;

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          code: "UNSUPPORTED_MEDIA_TYPE",
          requestId,
          message: "Requests must use Content-Type: application/json.",
        },
        { status: 415 }
      );
    }

    const declaredLength = Number(request.headers.get("content-length") || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          code: "PAYLOAD_TOO_LARGE",
          requestId,
          message: "Request payload exceeds the maximum permitted size (16 KB).",
        },
        { status: 413 }
      );
    }

    let rawText: string;
    try {
      rawText = await request.text();
    } catch {
      return NextResponse.json(
        { success: false, code: "INVALID_BODY", requestId, message: "Unable to read request body." },
        { status: 400 }
      );
    }

    if (Buffer.byteLength(rawText, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          code: "PAYLOAD_TOO_LARGE",
          requestId,
          message: "Request payload exceeds the maximum permitted size (16 KB).",
        },
        { status: 413 }
      );
    }

    let rawJson: unknown;
    try {
      rawJson = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_JSON",
          requestId,
          message: "Malformed JSON payload provided.",
        },
        { status: 400 }
      );
    }

    // Strict Zod schema validation
    const validatedData = enquirySchema.parse(rawJson);

    // Honeypot check (automated bot filled hidden website field)
    if (validatedData.website && validatedData.website.trim().length > 0) {
      console.warn(JSON.stringify({ event: "contact_honeypot_triggered", requestId }));
      return NextResponse.json(
        {
          success: false,
          code: "SPAM_DETECTED",
          requestId,
          message: "Submission rejected by anti-spam verification.",
        },
        { status: 400 }
      );
    }

    // IP Rate Limit check
    const clientIp = extractTrustedClientIp(request.headers);
    const rate = await checkRateLimit(clientIp);
    if (!rate.allowed) {
      console.warn(JSON.stringify({ event: "contact_rate_limited", requestId, mode: rate.mode }));
      return NextResponse.json(
        {
          success: false,
          code: "RATE_LIMIT_EXCEEDED",
          requestId,
          message: `Too many requests. Please wait ${rate.retryAfterSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rate.retryAfterSeconds),
            "X-RateLimit-Limit": String(rate.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Mode": rate.mode,
          },
        }
      );
    }

    // Cloudflare Turnstile verification (active whenever TURNSTILE_SECRET_KEY is configured)
    const captcha = await verifyTurnstileToken(validatedData.turnstileToken, clientIp);
    if (!captcha.ok) {
      console.warn(JSON.stringify({ event: "contact_captcha_failed", requestId }));
      return NextResponse.json(
        {
          success: false,
          code: "CAPTCHA_FAILED",
          requestId,
          message: "Security verification failed or expired. Please complete the check and retry.",
        },
        { status: 403 }
      );
    }

    // Duplicate payload guard (prevents accidental double submissions)
    const isDup = await checkDuplicateSubmission(
      validatedData.email,
      validatedData.enquiryType,
      validatedData.callingDescription
    );
    if (isDup) {
      return NextResponse.json(
        {
          success: false,
          code: "DUPLICATE_SUBMISSION",
          requestId,
          message: "An identical enquiry was just received. Please wait a couple of minutes before resubmitting.",
        },
        { status: 409 }
      );
    }

    // Delivery via Resend + optional durable webhook fallback (no silent drops!)
    const delivery = await dispatchEnquiry(requestId, validatedData);

    // Sanitized non-PII diagnostic event log
    console.info(
      JSON.stringify({
        event: "contact_processed",
        requestId,
        enquiryType: validatedData.enquiryType,
        code: delivery.code,
        emailSent: delivery.emailSent,
        persisted: delivery.persisted,
        rateLimitMode: rate.mode,
      })
    );

    if (!delivery.ok) {
      return NextResponse.json(
        {
          success: false,
          code: delivery.code,
          requestId,
          message:
            delivery.code === "EMAIL_SERVICE_UNCONFIGURED"
              ? `Online email dispatch is temporarily unavailable on this server. Please email admissions@trinityinternationaluniversity.edu.in directly with reference ${requestId}.`
              : `We could not confirm delivery of your enquiry to the admissions secretariat (Reference: ${requestId}). Please email admissions@trinityinternationaluniversity.edu.in directly so your application is not missed.`,
        },
        { status: delivery.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        code: delivery.code,
        requestId,
        message:
          delivery.code === "PERSISTED_BACKUP_ONLY"
            ? `Your enquiry was securely recorded in our secretariat queue (Reference: ${requestId}).`
            : `Enquiry delivered successfully (Reference: ${requestId}). Our secretariat will respond shortly.`,
      },
      {
        status: delivery.status,
        headers: {
          "X-RateLimit-Limit": String(rate.limit),
          "X-RateLimit-Remaining": String(rate.remaining),
          "X-RateLimit-Mode": rate.mode,
        },
      }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          requestId,
          message: "Please review the highlighted fields and try again.",
          errors: err.errors.map((issue) => ({
            path: issue.path,
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error(
      JSON.stringify({
        event: "contact_unexpected_error",
        requestId,
        errorName: err instanceof Error ? err.name : "UnknownError",
      })
    );

    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_ERROR",
        requestId,
        message: `An unexpected server error occurred (Reference: ${requestId}).`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Method Not Allowed" }, { status: 405 });
}
