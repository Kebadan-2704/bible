import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";
import test, { after, before, describe } from "node:test";

const require = createRequire(import.meta.url);
const projectRoot = process.cwd();
const tmpCompileDir = fs.mkdtempSync(path.join(projectRoot, ".tmp-unit-"));

let enquirySchemaMod;
let rateLimitMod;
let deliveryMod;
let centresMod;
let academicsMod;
let searchIndexMod;

let mockServer;
let mockBaseUrl = "";
const capturedRequests = [];

function compileModulesForUnitTests() {
  const tscBin = path.join(projectRoot, "node_modules", "typescript", "bin", "tsc");
  const files = [
    "src/lib/enquirySchema.ts",
    "src/lib/rateLimit.ts",
    "src/lib/enquiryDelivery.ts",
    "src/data/centres.ts",
    "src/data/academics.ts",
    "src/data/searchIndex.ts",
  ].map((f) => path.join(projectRoot, f));

  execFileSync(
    process.execPath,
    [
      tscBin,
      "--outDir",
      tmpCompileDir,
      "--rootDir",
      path.join(projectRoot, "src"),
      "--module",
      "commonjs",
      "--moduleResolution",
      "node",
      "--esModuleInterop",
      "--target",
      "es2022",
      "--skipLibCheck",
      ...files,
    ],
    { stdio: "pipe" }
  );

  enquirySchemaMod = require(path.join(tmpCompileDir, "lib", "enquirySchema.js"));
  rateLimitMod = require(path.join(tmpCompileDir, "lib", "rateLimit.js"));
  deliveryMod = require(path.join(tmpCompileDir, "lib", "enquiryDelivery.js"));
  centresMod = require(path.join(tmpCompileDir, "data", "centres.js"));
  academicsMod = require(path.join(tmpCompileDir, "data", "academics.js"));
  searchIndexMod = require(path.join(tmpCompileDir, "data", "searchIndex.js"));
}

before(async () => {
  compileModulesForUnitTests();

  mockServer = http.createServer((req, res) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      capturedRequests.push({
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: raw,
      });

      if (req.url === "/resend-ok") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id: "mock-email-id-001" }));
        return;
      }

      if (req.url === "/resend-fail") {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Simulated upstream SMTP outage" }));
        return;
      }

      if (req.url === "/backup-ok") {
        res.writeHead(202, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ accepted: true }));
        return;
      }

      if (req.url === "/turnstile-ok") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
        return;
      }

      if (req.url === "/turnstile-fail") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, "error-codes": ["invalid-input-response"] }));
        return;
      }

      res.writeHead(404);
      res.end();
    });
  });

  await new Promise((resolve) => {
    mockServer.listen(0, "127.0.0.1", () => {
      const addr = mockServer.address();
      mockBaseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

after(async () => {
  if (mockServer) {
    await new Promise((resolve) => mockServer.close(resolve));
  }
  fs.rmSync(tmpCompileDir, { recursive: true, force: true });
});

describe("enquirySchema & input hardening", () => {
  const validAdmissions = {
    enquiryType: "admissions",
    fullName: "  Dr. Samuel Thomas  ",
    email: "  Samuel.Thomas@Example.ORG ",
    phone: "+91 98450 12345",
    programmeLevel: "Master of Divinity (M.Div.)",
    centrePreference: "Bangalore (HQ)",
    callingDescription: "Serving in pastoral training and theological education in Karnataka.",
  };

  test("accepts and normalizes valid admissions enquiry", () => {
    const parsed = enquirySchemaMod.enquirySchema.parse(validAdmissions);
    assert.equal(parsed.fullName, "Dr. Samuel Thomas");
    assert.equal(parsed.email, "samuel.thomas@example.org");
    assert.equal(parsed.website, "");
  });

  test("enforces conditional rules per enquiry purpose", () => {
    assert.throws(() => {
      enquirySchemaMod.enquirySchema.parse({
        ...validAdmissions,
        programmeLevel: "",
      });
    }, /programme/i);

    const generalOk = enquirySchemaMod.enquirySchema.parse({
      enquiryType: "general",
      fullName: "Hannah Paul",
      email: "hannah@example.org",
      phone: "9845012345",
      callingDescription: "Secretariat hours query.",
    });
    assert.equal(generalOk.enquiryType, "general");
    assert.equal(generalOk.programmeLevel, "");
  });

  test("rejects unknown fields (.strict), malformed phones, and oversized fields", () => {
    assert.throws(() => {
      enquirySchemaMod.enquirySchema.parse({
        ...validAdmissions,
        injectedAdminFlag: true,
      });
    });

    assert.throws(() => {
      enquirySchemaMod.enquirySchema.parse({
        ...validAdmissions,
        phone: "1234567",
      });
    });

    assert.throws(() => {
      enquirySchemaMod.enquirySchema.parse({
        ...validAdmissions,
        phone: "+91 1234-abcd",
      });
    });

    assert.throws(() => {
      enquirySchemaMod.enquirySchema.parse({
        ...validAdmissions,
        fullName: "A".repeat(151),
      });
    });

    assert.throws(() => {
      enquirySchemaMod.enquirySchema.parse({
        ...validAdmissions,
        callingDescription: "X".repeat(2001),
      });
    });
  });

  test("stripHeaderControlChars prevents header injection newlines", () => {
    const sanitized = enquirySchemaMod.stripHeaderControlChars("Grace\r\nBcc: evil@attacker.test\n");
    assert.equal(sanitized, "Grace Bcc: evil@attacker.test");
    assert.equal(sanitized.includes("\r"), false);
    assert.equal(sanitized.includes("\n"), false);
  });
});

describe("rate limiting, IP extraction & duplicate guard", () => {
  test("extractTrustedClientIp prioritizes trusted proxy headers cleanly", () => {
    const h1 = new Headers({
      "x-vercel-forwarded-for": "203.0.113.10, 10.0.0.1",
      "x-forwarded-for": "198.51.100.99",
    });
    assert.equal(rateLimitMod.extractTrustedClientIp(h1), "203.0.113.10");

    const h2 = new Headers({ "cf-connecting-ip": "198.51.100.77" });
    assert.equal(rateLimitMod.extractTrustedClientIp(h2), "198.51.100.77");

    assert.equal(rateLimitMod.extractTrustedClientIp(new Headers()), "unknown-client");
  });

  test("checkRateLimit blocks after 5 rapid attempts per IP and isolates other IPs", async () => {
    rateLimitMod.resetInMemoryRateLimitsForTests();
    for (let i = 0; i < 5; i += 1) {
      const res = await rateLimitMod.checkRateLimit("192.0.2.50");
      assert.equal(res.allowed, true);
    }
    const blocked = await rateLimitMod.checkRateLimit("192.0.2.50");
    assert.equal(blocked.allowed, false);
    assert.equal(blocked.remaining, 0);
    assert.ok(blocked.retryAfterSeconds >= 1);

    const otherIp = await rateLimitMod.checkRateLimit("192.0.2.51");
    assert.equal(otherIp.allowed, true);
  });

  test("checkDuplicateSubmission catches identical submissions within TTL", async () => {
    rateLimitMod.resetInMemoryRateLimitsForTests();
    const first = await rateLimitMod.checkDuplicateSubmission(
      "Candidate@Example.org",
      "admissions",
      "I feel called to pastoral ministry in rural parishes."
    );
    assert.equal(first, false);

    const dup = await rateLimitMod.checkDuplicateSubmission(
      "candidate@example.org",
      "admissions",
      "  I feel called to pastoral ministry in rural parishes. "
    );
    assert.equal(dup, true);
  });
});

describe("dispatchEnquiry & verifyTurnstileToken honest delivery guarantees", () => {
  const samplePayload = {
    enquiryType: "admissions",
    fullName: "Pastor David\r\nBcc: spoof@example.com",
    email: "david@example.org",
    phone: "+91 98450 22334",
    programmeLevel: "Master of Theology (M.Th.)",
    centrePreference: "Chennai",
    callingDescription: "Interested in New Testament and Missiology research stream.",
    website: "",
    turnstileToken: "",
  };

  function clearDeliveryEnv() {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_URL;
    delete process.env.ENQUIRY_BACKUP_WEBHOOK_URL;
    delete process.env.ENQUIRY_BACKUP_WEBHOOK_TOKEN;
    delete process.env.TURNSTILE_SECRET_KEY;
    delete process.env.TURNSTILE_SITEVERIFY_URL;
  }

  test("returns 503 EMAIL_SERVICE_UNCONFIGURED when Resend & backup are unconfigured (never false 200)", async () => {
    clearDeliveryEnv();
    const result = await deliveryMod.dispatchEnquiry("req-503", samplePayload);
    assert.equal(result.ok, false);
    assert.equal(result.status, 503);
    assert.equal(result.code, "EMAIL_SERVICE_UNCONFIGURED");
    assert.equal(result.emailSent, false);
  });

  test("returns 200 DELIVERED_EMAIL when Resend accepts payload and strips CR/LF from headers", async () => {
    clearDeliveryEnv();
    capturedRequests.length = 0;
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.RESEND_API_URL = `${mockBaseUrl}/resend-ok`;

    const result = await deliveryMod.dispatchEnquiry("req-200", samplePayload);
    assert.equal(result.ok, true);
    assert.equal(result.status, 200);
    assert.equal(result.code, "DELIVERED_EMAIL");
    assert.equal(result.emailSent, true);

    assert.equal(capturedRequests.length, 1);
    const sent = JSON.parse(capturedRequests[0].body);
    assert.equal(sent.subject.includes("\r"), false);
    assert.equal(sent.subject.includes("\n"), false);
    assert.equal(sent.reply_to, "david@example.org");
  });

  test("returns 502 EMAIL_DELIVERY_FAILED when Resend rejects without backup", async () => {
    clearDeliveryEnv();
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.RESEND_API_URL = `${mockBaseUrl}/resend-fail`;

    const result = await deliveryMod.dispatchEnquiry("req-502", samplePayload);
    assert.equal(result.ok, false);
    assert.equal(result.status, 502);
    assert.equal(result.code, "EMAIL_DELIVERY_FAILED");
  });

  test("returns 202 PERSISTED_BACKUP_ONLY when Resend fails but backup webhook succeeds", async () => {
    clearDeliveryEnv();
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.RESEND_API_URL = `${mockBaseUrl}/resend-fail`;
    process.env.ENQUIRY_BACKUP_WEBHOOK_URL = `${mockBaseUrl}/backup-ok`;

    const result = await deliveryMod.dispatchEnquiry("req-202", samplePayload);
    assert.equal(result.ok, true);
    assert.equal(result.status, 202);
    assert.equal(result.code, "PERSISTED_BACKUP_ONLY");
    assert.equal(result.persisted, true);
    assert.equal(result.emailSent, false);
  });

  test("verifyTurnstileToken skips when unconfigured and validates remote endpoint when configured", async () => {
    clearDeliveryEnv();
    const skipped = await deliveryMod.verifyTurnstileToken("", "192.0.2.1");
    assert.deepEqual(skipped, { ok: true, skipped: true });

    process.env.TURNSTILE_SECRET_KEY = "turnstile_secret";
    const missingToken = await deliveryMod.verifyTurnstileToken("", "192.0.2.1");
    assert.deepEqual(missingToken, { ok: false, skipped: false });

    process.env.TURNSTILE_SITEVERIFY_URL = `${mockBaseUrl}/turnstile-ok`;
    const verified = await deliveryMod.verifyTurnstileToken("valid-token", "192.0.2.1");
    assert.deepEqual(verified, { ok: true, skipped: false });

    process.env.TURNSTILE_SITEVERIFY_URL = `${mockBaseUrl}/turnstile-fail`;
    const rejected = await deliveryMod.verifyTurnstileToken("bad-token", "192.0.2.1");
    assert.deepEqual(rejected, { ok: false, skipped: false });
  });
});

describe("institutional data consistency & anti-leak invariants", () => {
  test("canonical counts, clean titles (no Rt.), and zero draft/OCR/placeholder strings", () => {
    assert.equal(centresMod.administrativeCentres.length, 8);
    assert.equal(academicsMod.allDegreesOffered.length, 10);

    const corpus = JSON.stringify({
      centres: centresMod.administrativeCentres,
      academics: academicsMod.allDegreesOffered,
      search: searchIndexMod.searchIndex,
    });
    for (const banned of ["BUTCBA", "Daddy Guppy", "Brochure 1", "Brochure 2", "XXXXXXXX", "Draft copy", "Rt. Rev."]) {
      assert.equal(corpus.includes(banned), false, `Unexpected leaked/old token "${banned}" in compiled data`);
    }

    const searchUrls = new Set(searchIndexMod.searchIndex.map((item) => item.url));
    assert.ok(searchUrls.has("/centres"));
    assert.ok(searchUrls.has("/prospectus"));
    assert.ok(searchUrls.has("/academics/systematic-theology"));
    assert.ok(searchUrls.has("/academics/ancient-languages"));
    assert.ok(searchUrls.has("/privacy"));
  });
});
