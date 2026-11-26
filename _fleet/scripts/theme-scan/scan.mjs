// Theme scan: for each theme x page, load the Storybook manager with ?globals=theme:X,
// then walk visible elements in the manager document AND the preview iframe and flag
// elements whose computed (opaque-ish) background luminance is out of family for the theme.
// Usage: node scan.mjs <baseUrl> [outDir]
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:6116";
const OUT = process.argv[3] ?? new URL("./shots/", import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const THEMES = (process.env.THEMES ?? "light,dark,infinia-dark,mist").split(",");
const DARK = new Set(["dark", "infinia-dark"]);
const PAGES = (process.env.PAGES ??
  "docs/design-system-atoms-button--docs,docs/overview-welcome--docs,docs/foundations-colors--docs,docs/design-system-theme-showcase--docs,story/design-system-atoms-button--playground"
).split(",");

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox"],
});

// Runs in page context. mode: "dark" => flag L > 0.8; "light" => flag L < 0.05 (dark island in light theme)
const scanFn = (mode) => {
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const parse = (s) => {
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) {
      // color(srgb r g b / a)
      const c = s.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)/);
      if (!c) return null;
      return [c[1] * 255, c[2] * 255, c[3] * 255, c[4] === undefined ? 1 : +c[4]];
    }
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p[3] === undefined ? 1 : p[3]];
  };
  const out = [];
  const all = document.querySelectorAll("body *");
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) continue;
    if (r.bottom < 0 || r.right < 0 || r.top > innerHeight || r.left > innerWidth) continue;
    const c = parse(cs.backgroundColor);
    if (!c || c[3] < 0.5) continue;
    const L = 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
    const bad = mode === "dark" ? L > 0.8 : L < 0.05;
    if (!bad) continue;
    // skip intentional swatches / nested theme previews / color chips
    if (el.closest("[data-theme]") && el.closest("[data-theme]") !== document.documentElement) continue;
    if (el.closest('[aria-hidden="true"], [aria-hidden=""]')) continue;
    const cls = typeof el.className === "string" ? el.className : "";
    out.push({
      tag: el.tagName.toLowerCase(),
      cls: cls.slice(0, 80),
      id: el.id,
      bg: cs.backgroundColor,
      L: +L.toFixed(3),
      w: Math.round(r.width), h: Math.round(r.height),
      text: (el.textContent || "").trim().slice(0, 40),
    });
  }
  return { dataTheme: document.documentElement.getAttribute("data-theme"), flagged: out };
};

const results = [];
for (const theme of THEMES) {
  for (const pg of PAGES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const url = `${BASE}/?path=/${pg}&globals=theme:${theme}`;
    await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });
    await new Promise((r) => setTimeout(r, 2500));
    const mode = DARK.has(theme) ? "dark" : "light";
    const manager = await page.evaluate(scanFn, mode);
    const frame = page.frames().find((f) => f.url().includes("iframe.html"));
    const preview = frame ? await frame.evaluate(scanFn, mode) : { dataTheme: "NO-FRAME", flagged: [] };
    const shot = `${OUT}/${theme}__${pg.replace(/[/]/g, "_")}.png`;
    await page.screenshot({ path: shot });
    results.push({ theme, pg, managerTheme: manager.dataTheme, previewTheme: preview.dataTheme, manager: manager.flagged, preview: preview.flagged });
    console.log(`${theme.padEnd(13)} ${pg.padEnd(55)} mgr[data-theme=${manager.dataTheme}] flagged=${manager.flagged.length}  preview[data-theme=${preview.dataTheme}] flagged=${preview.flagged.length}`);
    for (const f of [...manager.flagged.map((x) => ({ where: "mgr", ...x })), ...preview.flagged.map((x) => ({ where: "prv", ...x }))].slice(0, 12)) {
      console.log(`    ${f.where} <${f.tag} class="${f.cls}" id="${f.id}"> bg=${f.bg} L=${f.L} ${f.w}x${f.h} "${f.text}"`);
    }
    await page.close();
  }
}

// Persistence: pick a theme in the URL, then reload a URL with no globals and see what applies.
if (!process.env.SKIP_PERSIST) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE}/?path=/docs/overview-welcome--docs&globals=theme:infinia-dark`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2000));
  await page.goto(`${BASE}/?path=/docs/design-system-atoms-button--docs`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 3000));
  const mgr = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  const frame = page.frames().find((f) => f.url().includes("iframe.html"));
  const prv = frame ? await frame.evaluate(() => document.documentElement.getAttribute("data-theme")) : "NO-FRAME";
  console.log(`PERSIST after reload without globals: manager=${mgr} preview=${prv} url=${page.url()}`);
  // navigation inside SB keeps theme
  await page.goto(`${BASE}/?path=/story/design-system-atoms-button--playground`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 3000));
  const frame2 = page.frames().find((f) => f.url().includes("iframe.html"));
  const prv2 = frame2 ? await frame2.evaluate(() => document.documentElement.getAttribute("data-theme")) : "NO-FRAME";
  console.log(`PERSIST second navigation: preview=${prv2}`);
  await page.close();
}

fs.writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 2));
await browser.close();
