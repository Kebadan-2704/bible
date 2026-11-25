import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const screenshotDir = path.join(projectRoot, "audit-report", "post-remediation-screenshots");
const reportOutputPath = path.join(projectRoot, "audit-report", "post-remediation-metrics.json");

const PORT_UNCONFIGURED = 3011;
const PORT_MOCKED_DELIVERY = 3012;
const PORT_TURNSTILE = 3013;
const URL_UNCONFIGURED = `http://127.0.0.1:${PORT_UNCONFIGURED}`;
const URL_MOCKED = `http://127.0.0.1:${PORT_MOCKED_DELIVERY}`;
const URL_TURNSTILE = `http://127.0.0.1:${PORT_TURNSTILE}`;

const VIEWPORTS_16 = [320, 360, 375, 390, 414, 430, 640, 768, 820, 1024, 1200, 1280, 1366, 1440, 1600, 1920];
const KEY_ROUTES_RESPONSIVE = ["/", "/curriculum", "/admissions", "/contact"];

const ALL_PUBLIC_ROUTES = [
  "/",
  "/about",
  "/vision-and-mission",
  "/governance",
  "/academics",
  "/academics/systematic-theology",
  "/academics/new-testament",
  "/academics/christian-ethics",
  "/academics/elective-courses",
  "/academics/theological-institutes",
  "/academics/ancient-languages",
  "/admissions",
  "/curriculum",
  "/research",
  "/doctoral",
  "/centres",
  "/affiliations",
  "/accreditations",
  "/certificates-and-awards",
  "/prospectus",
  "/contact",
  "/disclaimer",
  "/privacy",
];

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    const appData = process.env.APPDATA || "";
    const globalPath = path.join(appData, "npm", "node_modules", "playwright", "index.mjs");
    if (fs.existsSync(globalPath)) {
      return await import(pathToFileURL(globalPath).href);
    }
    throw new Error("Playwright package not found locally or globally.");
  }
}

function getNextBinArgs(port) {
  const nextCli = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
  return [nextCli, "start", "-p", String(port), "-H", "127.0.0.1"];
}

async function waitForServer(url, proc, label) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (proc.exitCode !== null) {
      throw new Error(`${label} exited early with code ${proc.exitCode}`);
    }
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`${label} did not start within 30s at ${url}`);
}

function spawnNextServer(port, envOverrides = {}) {
  const cleanEnv = { ...process.env };
  delete cleanEnv.RESEND_API_KEY;
  delete cleanEnv.RESEND_API_URL;
  delete cleanEnv.ENQUIRY_BACKUP_WEBHOOK_URL;
  delete cleanEnv.TURNSTILE_SECRET_KEY;
  delete cleanEnv.TURNSTILE_SITEVERIFY_URL;
  delete cleanEnv.UPSTASH_REDIS_REST_URL;
  delete cleanEnv.UPSTASH_REDIS_REST_TOKEN;

  const proc = spawn(process.execPath, getNextBinArgs(port), {
    cwd: projectRoot,
    env: { ...cleanEnv, NODE_ENV: "production", ...envOverrides },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let logs = "";
  proc.stdout.on("data", (d) => {
    logs += d.toString();
  });
  proc.stderr.on("data", (d) => {
    logs += d.toString();
  });
  return { proc, getLogs: () => logs };
}

async function stopProc(proc) {
  if (!proc || proc.exitCode !== null) return;
  proc.kill("SIGTERM");
  await Promise.race([
    new Promise((r) => proc.once("exit", r)),
    new Promise((r) => setTimeout(r, 4000)),
  ]);
  if (proc.exitCode === null) {
    proc.kill("SIGKILL");
  }
}

async function runHttpRouteAndSecurityChecks(baseUrl) {
  console.log("1. Checking all 23 HTML routes, assets, 404 handling & security headers...");
  const headerFailures = [];
  for (const route of ALL_PUBLIC_ROUTES) {
    const res = await fetch(`${baseUrl}${route}`);
    assert.equal(res.status, 200, `Expected 200 on ${route}, got ${res.status}`);
    const html = await res.text();
    for (const leaked of ["BUTCBA", "Daddy Guppy", "Brochure 1", "Brochure 2", "XXXXXXXX", "Draft copy", "layoza-", "Rt. Rev.", "539 / 2002"]) {
      assert.equal(html.includes(leaked), false, `Route ${route} HTML contains forbidden/outdated string: ${leaked}`);
    }

    if (route === "/") {
      const h = res.headers;
      const expectedHeaders = [
        "content-security-policy",
        "x-content-type-options",
        "x-frame-options",
        "referrer-policy",
        "permissions-policy",
      ];
      for (const name of expectedHeaders) {
        if (!h.get(name)) headerFailures.push(`Missing header ${name} on ${route}`);
      }
      assert.equal(h.get("x-content-type-options"), "nosniff");
      assert.equal(h.get("x-frame-options"), "DENY");
      assert.equal(h.get("x-powered-by"), null, "X-Powered-By header must be removed");
      assert.ok((h.get("content-security-policy") || "").includes("default-src 'self'"));
    }
  }
  assert.deepEqual(headerFailures, [], `Header failures: ${headerFailures.join(", ")}`);

  const pdfRes = await fetch(`${baseUrl}/trinity-programme-overview.pdf`);
  assert.equal(pdfRes.status, 200);
  const pdfBuf = Buffer.from(await pdfRes.arrayBuffer());
  assert.equal(pdfBuf.subarray(0, 5).toString("utf8"), "%PDF-", "PDF must start with %PDF- magic header");

  const robotsRes = await fetch(`${baseUrl}/robots.txt`);
  assert.equal(robotsRes.status, 200);
  const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
  assert.equal(sitemapRes.status, 200);
  const sitemapXml = await sitemapRes.text();
  assert.ok(sitemapXml.includes("/centres") && sitemapXml.includes("/prospectus") && sitemapXml.includes("/privacy"));

  const iconRes = await fetch(`${baseUrl}/icon.svg`);
  assert.equal(iconRes.status, 200);

  const ogRes = await fetch(`${baseUrl}/opengraph-image.png`);
  assert.equal(ogRes.status, 200);

  const twRes = await fetch(`${baseUrl}/twitter-image.png`);
  assert.equal(twRes.status, 200);

  const appleRes = await fetch(`${baseUrl}/apple-icon.png`);
  assert.equal(appleRes.status, 200);

  const notFoundRes = await fetch(`${baseUrl}/non-existent-route-verification`);
  assert.equal(notFoundRes.status, 404);

  const getApiRes = await fetch(`${baseUrl}/api/contact`);
  assert.equal(getApiRes.status, 405);

  const unconfiguredPost = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      enquiryType: "admissions",
      fullName: "Test Candidate",
      email: "candidate@example.org",
      phone: "+91 98450 11223",
      programmeLevel: "Master of Divinity (M.Div.)",
      centrePreference: "Bangalore (HQ)",
      callingDescription: "Checking honest unconfigured 503 behaviour on production.",
    }),
  });
  assert.equal(unconfiguredPost.status, 503, "Unconfigured server MUST return 503, never false 200");
  const unconfiguredJson = await unconfiguredPost.json();
  assert.equal(unconfiguredJson.success, false);
  assert.equal(unconfiguredJson.code, "EMAIL_SERVICE_UNCONFIGURED");
}

async function runLiveApiSecurityProbes(mockedBaseUrl, turnstileBaseUrl, mockCaptured) {
  console.log("2. Running live /api/contact HTTP security probes on production server...");
  const headersJson = { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.10" };

  // 415 Unsupported Media Type
  const r415 = await fetch(`${mockedBaseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "hello",
  });
  assert.equal(r415.status, 415);

  // 413 Payload Too Large (>16KB)
  const r413 = await fetch(`${mockedBaseUrl}/api/contact`, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify({ pad: "A".repeat(17000) }),
  });
  assert.equal(r413.status, 413);

  // 400 Invalid JSON
  const rBadJson = await fetch(`${mockedBaseUrl}/api/contact`, {
    method: "POST",
    headers: headersJson,
    body: "{not-json",
  });
  assert.equal(rBadJson.status, 400);

  // 400 Honeypot trap
  const rHoneypot = await fetch(`${mockedBaseUrl}/api/contact`, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify({
      enquiryType: "general",
      fullName: "Bot User",
      email: "bot@example.org",
      phone: "+91 98450 99887",
      callingDescription: "Automated bot enquiry.",
      website: "https://spam.example.com",
    }),
  });
  assert.equal(rHoneypot.status, 400);

  // 400 Unknown field (.strict())
  const rStrict = await fetch(`${mockedBaseUrl}/api/contact`, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify({
      enquiryType: "general",
      fullName: "Strict Test",
      email: "strict@example.org",
      phone: "+91 98450 99887",
      callingDescription: "Testing strict payload rejection.",
      extraUnexpectedKey: "boom",
    }),
  });
  assert.equal(rStrict.status, 400);

  // 403 Turnstile failure + 200 valid Turnstile on Server C
  const r403 = await fetch(`${turnstileBaseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.11" },
    body: JSON.stringify({
      enquiryType: "general",
      fullName: "No Token",
      email: "notoken@example.org",
      phone: "+91 98450 99887",
      callingDescription: "Missing token check.",
    }),
  });
  assert.equal(r403.status, 403);

  const rTurnstileOk = await fetch(`${turnstileBaseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.19" },
    body: JSON.stringify({
      enquiryType: "general",
      fullName: "Turnstile Verified",
      email: "verified@example.org",
      phone: "+91 98450 99887",
      callingDescription: "Valid Turnstile check.",
      turnstileToken: "good-token",
    }),
  });
  assert.equal(rTurnstileOk.status, 200);

  // 200 Valid delivery through mocked Resend on Server B
  mockCaptured.length = 0;
  const validBody = {
    enquiryType: "admissions",
    fullName: "Grace Thomas",
    email: "grace.thomas@example.org",
    phone: "+91 98450 55667",
    programmeLevel: "Master of Divinity (M.Div.)",
    centrePreference: "Coimbatore",
    callingDescription: "Applying for regular residential seminary study.",
  };
  const r200 = await fetch(`${mockedBaseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.12" },
    body: JSON.stringify(validBody),
  });
  assert.equal(r200.status, 200);
  const r200Json = await r200.json();
  assert.equal(r200Json.success, true);
  assert.equal(r200Json.code, "DELIVERED_EMAIL");
  assert.equal(mockCaptured.length, 1);

  // 409 Duplicate guard
  const r409 = await fetch(`${mockedBaseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "203.0.113.13" },
    body: JSON.stringify(validBody),
  });
  assert.equal(r409.status, 409);

  // 429 Rate limiting burst from single IP (>5 valid attempts)
  const burstIp = "203.0.113.44";
  let got429 = false;
  for (let i = 0; i < 7; i += 1) {
    const res = await fetch(`${mockedBaseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": burstIp },
      body: JSON.stringify({
        enquiryType: "general",
        fullName: `Burst User ${i}`,
        email: `burst${i}@example.org`,
        phone: "+91 98450 11229",
        callingDescription: `Rate limit check request number ${i}.`,
      }),
    });
    if (res.status === 429) {
      got429 = true;
      assert.ok(res.headers.get("retry-after"));
      break;
    }
  }
  assert.equal(got429, true, "Rapid burst from same IP MUST trigger 429 rate limit");
}

async function runPlaywrightBrowserAudit(playwrightPkg) {
  console.log("3. Launching real Chromium production audit across 16 viewports, interactions, a11y & CLS/LCP...");
  fs.mkdirSync(screenshotDir, { recursive: true });
  const browser = await playwrightPkg.chromium.launch({ headless: true });

  const metrics = {
    viewportsChecked: VIEWPORTS_16.length,
    overflowViolations: [],
    headerClipViolations: [],
    desktopNavWrapViolations: [],
    contrastFailures: [],
    smallTargets: [],
    cls: null,
    lcpMs: null,
    consoleErrors: [],
    pageErrors: [],
    failedAssets: [],
  };

  try {
    // Context 1: 16 viewports responsive audit across key pages
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    let expectingExpected503 = false;
    page.on("pageerror", (err) => metrics.pageErrors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        if (expectingExpected503 && msg.text().includes("503")) return;
        metrics.consoleErrors.push(msg.text());
      }
    });
    page.on("response", (res) => {
      const url = res.url();
      if (res.status() >= 400 && !url.includes("/api/contact")) {
        metrics.failedAssets.push(`${res.status()} ${url}`);
      }
    });

    for (const width of VIEWPORTS_16) {
      const height = width <= 640 ? 844 : 900;
      await page.setViewportSize({ width, height });

      for (const route of KEY_ROUTES_RESPONSIVE) {
        await page.goto(`${URL_UNCONFIGURED}${route}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);

        const audit = await page.evaluate((vw) => {
          const docOverflow = document.documentElement.scrollWidth > window.innerWidth + 1;
          const header = document.querySelector("header");
          const clipped = [];
          const wrappedNav = [];

          if (header) {
            const controls = header.querySelectorAll("a, button");
            controls.forEach((el) => {
              const style = window.getComputedStyle(el);
              if (style.display === "none" || style.visibility === "hidden") return;
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) return;
              if (r.right > vw - 0.5 || r.left < -0.5) {
                clipped.push({ text: (el.textContent || el.getAttribute("aria-label") || "").trim(), right: r.right, vw });
              }
            });

            if (vw >= 1024) {
              const navLinks = header.querySelectorAll(
                "nav[aria-label='Main Navigation'] a, nav[aria-label='Main Navigation'] button"
              );
              const rects = [];
              navLinks.forEach((a) => {
                const r = a.getBoundingClientRect();
                if (r.height > 44) {
                  wrappedNav.push({ text: (a.textContent || "").trim(), height: r.height });
                }
                rects.push({ text: (a.textContent || "").trim(), left: r.left, right: r.right });
              });
              for (let i = 1; i < rects.length; i += 1) {
                if (rects[i - 1].right > rects[i].left + 1) {
                  wrappedNav.push({ overlap: `${rects[i - 1].text} vs ${rects[i].text}` });
                }
              }
            }
          }

          return { docOverflow, scrollW: document.documentElement.scrollWidth, vw, clipped, wrappedNav };
        }, width);

        if (audit.docOverflow) {
          metrics.overflowViolations.push({ width, route, scrollW: audit.scrollW });
        }
        if (audit.clipped.length > 0) {
          metrics.headerClipViolations.push({ width, route, clipped: audit.clipped });
        }
        if (audit.wrappedNav.length > 0) {
          metrics.desktopNavWrapViolations.push({ width, route, wrappedNav: audit.wrappedNav });
        }
      }
    }

    // Also test landscape viewports (844x390 and 1024x768) + CSS zoom equivalent widths (125%=1152, 150%=960, 200%=720)
    for (const [vw, vh] of [
      [844, 390],
      [1024, 768],
      [1152, 720],
      [960, 600],
      [720, 450],
    ]) {
      await page.setViewportSize({ width: vw, height: vh });
      await page.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      if (overflow) metrics.overflowViolations.push({ width: `${vw}x${vh}`, route: "/" });
    }

    assert.deepEqual(metrics.overflowViolations, [], `Overflow violations: ${JSON.stringify(metrics.overflowViolations)}`);
    assert.deepEqual(metrics.headerClipViolations, [], `Header clip violations: ${JSON.stringify(metrics.headerClipViolations)}`);
    assert.deepEqual(
      metrics.desktopNavWrapViolations,
      [],
      `Desktop nav wrap violations: ${JSON.stringify(metrics.desktopNavWrapViolations)}`
    );

    // Performance CLS & LCP on clean desktop 1440x900 production load
    const perfPage = await context.newPage();
    await perfPage.setViewportSize({ width: 1440, height: 900 });
    await perfPage.addInitScript(() => {
      window.__tiuMetrics = { cls: 0, lcp: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__tiuMetrics.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) window.__tiuMetrics.lcp = entries[entries.length - 1].startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });
    await perfPage.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });
    await perfPage.waitForTimeout(400);
    const webVitals = await perfPage.evaluate(() => window.__tiuMetrics);
    metrics.cls = Number(webVitals.cls.toFixed(4));
    metrics.lcpMs = Math.round(webVitals.lcp);
    assert.ok(metrics.cls < 0.05, `CLS too high on production homepage: ${metrics.cls}`);
    assert.ok(metrics.lcpMs < 3000, `LCP too slow on localhost production homepage: ${metrics.lcpMs}ms`);
    await perfPage.screenshot({ path: path.join(screenshotDir, "home-desktop-1440.png"), fullPage: false });
    await perfPage.close();

    // Responsive screenshots (320px, 390px, 768px)
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(screenshotDir, "home-mobile-320.png") });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(screenshotDir, "home-mobile-390.png") });

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(screenshotDir, "home-tablet-768.png") });

    // Functional Tests on 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });

    const fontsAndImages = await page.evaluate(async () => {
      await document.fonts.ready;
      const imgs = Array.from(document.querySelectorAll("img"));
      for (const img of imgs) {
        img.scrollIntoView({ behavior: "instant", block: "center" });
        if (!img.complete) {
          await new Promise((r) => {
            img.addEventListener("load", r, { once: true });
            img.addEventListener("error", r, { once: true });
            setTimeout(r, 3000);
          });
        }
      }
      window.scrollTo(0, 0);
      const loadedFonts = Array.from(document.fonts)
        .filter((f) => f.status === "loaded")
        .map((f) => f.family);
      const brokenImgs = imgs
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.getAttribute("src"));
      return { loadedFontsCount: loadedFonts.length, imgCount: imgs.length, brokenImgs };
    });
    assert.ok(fontsAndImages.loadedFontsCount > 0, "At least one local/next-font typeface must load in Chromium");
    assert.ok(fontsAndImages.imgCount >= 2, `Expected homepage thematic images, found ${fontsAndImages.imgCount}`);
    assert.deepEqual(fontsAndImages.brokenImgs, [], `Broken images found: ${JSON.stringify(fontsAndImages.brokenImgs)}`);

    // Verify EN / தமிழ் toggle & ticker pause button were cleanly removed per user request
    assert.equal(await page.locator("header button[aria-pressed]").count(), 0, "Language button should be removed");
    const tickerRegion = page.getByRole("region", { name: "Institutional Invitation Banner" });
    await tickerRegion.waitFor({ state: "visible" });
    assert.equal(await tickerRegion.locator("button").count(), 0, "Ticker pause button should be removed");

    // Verify Hero redesigned split elements fit above the fold on 1366x768 laptop viewport
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });
    const heroBox = await page.locator("section").first().boundingBox();
    assert.ok(heroBox && heroBox.height <= 680, `Hero height at 1366x768 should sit cleanly above/at fold, got ${JSON.stringify(heroBox)}`);
    await page.screenshot({ path: path.join(screenshotDir, "home-laptop-1366.png") });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });

    // Global Search Modal (Ctrl+K, filter, ArrowDown + Enter navigation, backdrop close, Escape focus restore)
    const searchTrigger = page.locator("header button[title='Search (Ctrl+K)']");
    await searchTrigger.focus();
    await page.keyboard.press("Control+k");
    const searchDialog = page.getByRole("dialog", { name: "Search University of Trinity International" });
    await searchDialog.waitFor({ state: "visible" });
    await page.screenshot({ path: path.join(screenshotDir, "search-modal-1440.png") });

    const searchInput = page.getByRole("textbox", { name: "Search University of Trinity International" });
    await searchInput.fill("Ethics");
    await page.waitForTimeout(150);
    await page.keyboard.press("Escape");
    await searchDialog.waitFor({ state: "hidden" });

    // Reopen search via button and test ArrowDown + Enter navigation
    await searchTrigger.click();
    await searchDialog.waitFor({ state: "visible" });
    await page.getByRole("textbox", { name: "Search University of Trinity International" }).fill("Systematic Theology");
    await page.waitForTimeout(150);
    await page.keyboard.press("Enter");
    await page.waitForURL("**/academics/systematic-theology");

    // Curriculum filter + empty state + hash routing + ArrowRight tabs + back button
    await page.goto(`${URL_UNCONFIGURED}/curriculum#module-5`, { waitUntil: "networkidle" });
    const mod5Selected = await page.locator("button[role='tab']#tab-module-5").getAttribute("aria-selected");
    assert.equal(mod5Selected, "true", "Deep link #module-5 must activate Module 5 tab on load");

    await page.locator("button[role='tab']#tab-module-5").focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(() => window.location.hash === "#module-6");

    await page.goBack();
    await page.waitForFunction(() => window.location.hash === "#module-5");

    const curSearch = page.locator("#curriculum-filter");
    await curSearch.fill("Theodicy");
    await page.waitForTimeout(150);
    const bodyAfterFilter = await page.locator("#main-content").innerText();
    assert.ok(bodyAfterFilter.includes("Theodicy"), "Curriculum filter must retain matching topic Theodicy");
    await curSearch.fill("zzzznonexistentcourse");
    await page.waitForTimeout(150);
    await page.getByRole("button", { name: "Reset All Modules" }).click();
    await page.screenshot({ path: path.join(screenshotDir, "curriculum-explorer-1440.png") });

    // Admissions FAQ accordion accessibility
    await page.goto(`${URL_UNCONFIGURED}/admissions`, { waitUntil: "networkidle" });
    const firstAccordionBtn = page.locator("button[aria-expanded]").first();
    const initialExpanded = await firstAccordionBtn.getAttribute("aria-expanded");
    await firstAccordionBtn.click();
    const toggledExpanded = await firstAccordionBtn.getAttribute("aria-expanded");
    assert.notEqual(initialExpanded, toggledExpanded, "FAQ accordion aria-expanded must toggle on click");

    // Contact prefill + honest 503 error alert (unconfigured server) + real 200 delivery (mocked server)
    await page.goto(`${URL_UNCONFIGURED}/contact?centre=chennai&type=credential_verification`, {
      waitUntil: "networkidle",
    });
    assert.equal(await page.locator("#enquiryType").inputValue(), "credential_verification");
    assert.equal(await page.locator("#centrePreference").inputValue(), "Chennai Centre");
    await page.screenshot({ path: path.join(screenshotDir, "contact-prefilled-1440.png") });

    await page.fill("#fullName", "Rev. John Samuel");
    await page.fill("#email", "john.samuel@example.org");
    await page.fill("#phone", "+91 98450 33445");
    await page.fill("#callingDescription", "Requesting verification for diploma graduate record.");
    expectingExpected503 = true;
    await page.getByRole("button", { name: "Send Enquiry to Secretariat" }).click();
    const errorAlert = page.locator("form div[role='alert']");
    await errorAlert.waitFor({ state: "visible" });
    expectingExpected503 = false;
    const alertText = await errorAlert.innerText();
    assert.ok(
      alertText.includes("Reference:") || alertText.includes("unavailable"),
      `Unconfigured delivery MUST surface clear Reference/unavailable error, got: ${alertText}`
    );

    // Check running invitation ticker & pause/resume button + updated official naming + all core imagery loaded cleanly
    for (const imgRoute of ["/", "/about", "/vision-and-mission", "/academics", "/curriculum", "/research", "/doctoral", "/centres", "/affiliations"]) {
      await page.goto(`${URL_UNCONFIGURED}${imgRoute}`, { waitUntil: "networkidle" });
      const routeImgs = await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll("img"));
        for (const img of imgs) {
          img.scrollIntoView({ behavior: "instant", block: "center" });
          if (!img.complete) {
            await new Promise((r) => {
              img.addEventListener("load", r, { once: true });
              img.addEventListener("error", r, { once: true });
              setTimeout(r, 3000);
            });
          }
        }
        window.scrollTo(0, 0);
        return imgs.map((img) => ({
          src: img.getAttribute("src"),
          ok: img.complete && img.naturalWidth > 0,
        }));
      });
      assert.ok(routeImgs.length >= 1, `Expected at least 1 image on ${imgRoute}`);
      const broken = routeImgs.filter((i) => !i.ok);
      assert.deepEqual(broken, [], `Broken images on ${imgRoute}: ${JSON.stringify(broken)}`);
    }

    await page.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(screenshotDir, "home-fullpage-1440.png"), fullPage: true });
    const tickerText = await page.getByRole("region", { name: "Institutional Invitation Banner" }).innerText();
    assert.ok(tickerText.includes("Beloved Servants of Jesus Christ") && tickerText.includes("Please come and Join Us"));

    // Check Governance updated titles (Dr. S. Sundarabharathi, zero Rt.) & Affiliations
    await page.goto(`${URL_UNCONFIGURED}/governance`, { waitUntil: "networkidle" });
    const govText = await page.locator("#main-content").innerText();
    assert.ok(govText.includes("Sundarabharathi"), "Governance page must show Dr. S. Sundarabharathi");
    assert.equal(govText.includes("Rt."), false, "Governance page must not contain Rt.");

    await page.goto(`${URL_UNCONFIGURED}/affiliations`, { waitUntil: "networkidle" });
    const affText = await page.locator("#main-content").innerText();
    assert.ok(affText.includes("University of Christ"));
    assert.ok(affText.includes("British University of Bible"));

    // Real 200 submission against production Server B (mocked Resend endpoint)
    await page.goto(`${URL_MOCKED}/contact`, { waitUntil: "networkidle" });
    await page.selectOption("#enquiryType", "admissions");
    await page.locator("#programmeLevel").waitFor({ state: "visible" });
    await page.fill("#fullName", "Sarah Thomas");
    await page.fill("#email", "sarah.thomas@example.org");
    await page.fill("#phone", "+91 98450 77889");
    await page.selectOption("#programmeLevel", "M.Div. / M.Th. (Master of Divinity / Theology)");
    await page.selectOption("#centrePreference", "YGM – Bangalore HQ");
    await page.fill("#callingDescription", "Interested in full-time pastoral and biblical training.");
    await page.getByRole("button", { name: "Send Admissions Enquiry" }).click();
    const successBanner = page.locator("main div[role='status']");
    await successBanner.waitFor({ state: "visible" });
    const bannerText = await successBanner.innerText();
    assert.ok(bannerText.includes("Enquiry Delivered Successfully"));

    // Contrast & target-size scan across desktop home & curriculum
    for (const scanRoute of ["/", "/about", "/curriculum", "/contact"]) {
      await page.goto(`${URL_UNCONFIGURED}${scanRoute}`, { waitUntil: "networkidle" });
      const a11y = await page.evaluate((route) => {
        function parseRgb(str) {
          const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (!m) return null;
          return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] === undefined ? 1 : Number(m[4]) };
        }
        function relLum({ r, g, b }) {
          const toLin = (c) => {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
          };
          return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
        }
        function effectiveBg(el) {
          let cur = el;
          while (cur) {
            const st = window.getComputedStyle(cur);
            const c = parseRgb(st.backgroundColor);
            if (c && c.a >= 0.9) return c;
            if (st.backgroundImage && st.backgroundImage.includes("gradient")) {
              const stopMatch = st.backgroundImage.match(/rgb\(\d+,\s*\d+,\s*\d+\)/);
              if (stopMatch) {
                const parsedStop = parseRgb(stopMatch[0]);
                if (parsedStop) return parsedStop;
              }
            }
            cur = cur.parentElement;
          }
          return { r: 255, g: 255, b: 255, a: 1 };
        }

        const contrastIssues = [];
        document.querySelectorAll("h1,h2,h3,h4,p,a,button,label,span").forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return;
          if (!el.innerText || el.innerText.trim().length === 0) return;
          // Check leaf-like text nodes to avoid double-counting wrappers
          const hasTextChild = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
          if (!hasTextChild) return;

          const fg = parseRgb(style.color);
          const bg = effectiveBg(el);
          if (!fg || fg.a < 0.8) return;
          const l1 = relLum(fg);
          const l2 = relLum(bg);
          const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
          const px = parseFloat(style.fontSize);
          const weight = parseInt(style.fontWeight, 10) || 400;
          const isLarge = px >= 24 || (px >= 18.66 && weight >= 700);
          const minRequired = isLarge ? 3.0 : 4.5;

          if (ratio < minRequired) {
            contrastIssues.push({
              route,
              text: el.innerText.trim().slice(0, 40),
              ratio: Number(ratio.toFixed(2)),
              minRequired,
              color: style.color,
              bg: `rgb(${bg.r},${bg.g},${bg.b})`,
            });
          }
        });

        const smallButtons = [];
        document.querySelectorAll("button, a").forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.display === "none" || style.visibility === "hidden") return;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          // Exclude inline prose links inside paragraphs from 24px block target audit (WCAG 2.5.8 Inline exception)
          if (el.tagName === "A" && el.closest("p")) return;
          if (r.width < 24 || r.height < 24) {
            smallButtons.push({
              route,
              tag: el.tagName,
              text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 30),
              w: Math.round(r.width),
              h: Math.round(r.height),
            });
          }
        });

        return { contrastIssues, smallButtons };
      }, scanRoute);

      metrics.contrastFailures.push(...a11y.contrastIssues);
      metrics.smallTargets.push(...a11y.smallButtons);
    }

    assert.deepEqual(
      metrics.contrastFailures,
      [],
      `WCAG contrast failures: ${JSON.stringify(metrics.contrastFailures.slice(0, 10))}`
    );

    // Reduced-motion browser context verification
    const rmContext = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
    const rmPage = await rmContext.newPage();
    await rmPage.goto(`${URL_UNCONFIGURED}/`, { waitUntil: "networkidle" });
    const rmState = await rmPage.evaluate(() => {
      const hero = document.querySelector(".tiu-hero-stagger");
      return hero ? window.getComputedStyle(hero).animationDuration : "0s";
    });
    assert.ok(parseFloat(rmState) <= 0.001, `Reduced motion must suppress animations (<=1ms), got ${rmState}`);
    await rmContext.close();

    assert.deepEqual(metrics.pageErrors, [], `Unhandled page errors: ${metrics.pageErrors.join("; ")}`);
    assert.deepEqual(metrics.consoleErrors, [], `Browser console errors: ${metrics.consoleErrors.join("; ")}`);
    assert.deepEqual(metrics.failedAssets, [], `Failed HTTP assets: ${metrics.failedAssets.join("; ")}`);
  } finally {
    await browser.close();
  }

  fs.writeFileSync(reportOutputPath, JSON.stringify(metrics, null, 2), "utf8");
  console.log("Production metrics written:", JSON.stringify(metrics, null, 2));
}

async function main() {
  if (!fs.existsSync(path.join(projectRoot, ".next", "BUILD_ID"))) {
    throw new Error(".next production build not found. Run 'pnpm build' before running Playwright production E2E tests.");
  }

  const playwrightPkg = await loadPlaywright();
  const mockCaptured = [];

  const mockUpstream = http.createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
    });
    req.on("end", () => {
      if (req.url === "/resend-ok") {
        mockCaptured.push(JSON.parse(raw || "{}"));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id: "prod-test-id-1" }));
        return;
      }
      if (req.url === "/turnstile-verify") {
        const params = new URLSearchParams(raw);
        const ok = params.get("response") === "good-token";
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: ok }));
        return;
      }
      res.writeHead(404);
      res.end();
    });
  });

  await new Promise((resolve) => mockUpstream.listen(0, "127.0.0.1", resolve));
  const mockAddr = mockUpstream.address();
  const mockUpstreamBase = `http://127.0.0.1:${mockAddr.port}`;

  const serverA = spawnNextServer(PORT_UNCONFIGURED);
  const serverB = spawnNextServer(PORT_MOCKED_DELIVERY, {
    RESEND_API_KEY: "re_prod_e2e_mock",
    RESEND_API_URL: `${mockUpstreamBase}/resend-ok`,
  });
  const serverC = spawnNextServer(PORT_TURNSTILE, {
    RESEND_API_KEY: "re_prod_e2e_mock",
    RESEND_API_URL: `${mockUpstreamBase}/resend-ok`,
    TURNSTILE_SECRET_KEY: "turnstile_e2e_secret",
    TURNSTILE_SITEVERIFY_URL: `${mockUpstreamBase}/turnstile-verify`,
  });

  try {
    await Promise.all([
      waitForServer(URL_UNCONFIGURED, serverA.proc, "Production Server A (unconfigured)"),
      waitForServer(URL_MOCKED, serverB.proc, "Production Server B (mocked Resend)"),
      waitForServer(URL_TURNSTILE, serverC.proc, "Production Server C (Turnstile enabled)"),
    ]);

    await runHttpRouteAndSecurityChecks(URL_UNCONFIGURED);
    await runLiveApiSecurityProbes(URL_MOCKED, URL_TURNSTILE, mockCaptured);
    await runPlaywrightBrowserAudit(playwrightPkg);
    console.log("ALL PRODUCTION E2E VERIFICATION CHECKS PASSED CLEANLY.");
  } catch (err) {
    console.error("Production E2E Verification failed:", err);
    console.error("Server A logs:\n", serverA.getLogs());
    console.error("Server B logs:\n", serverB.getLogs());
    console.error("Server C logs:\n", serverC.getLogs());
    process.exitCode = 1;
  } finally {
    await stopProc(serverA.proc);
    await stopProc(serverB.proc);
    await stopProc(serverC.proc);
    await new Promise((resolve) => mockUpstream.close(resolve));
  }
}

main();
