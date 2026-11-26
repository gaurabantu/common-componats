// Theme switch table — one manager session, switches through themes via the manager channel and
// records the selected sidebar row (bg / fg / contrast), the hovered row bg and the toolbar accent.
//
// Usage: node switch.mjs [baseUrl] [themeSeq] [startPath]
//   baseUrl   default http://localhost:6006
//   themeSeq  comma list, default all 10 themes starting on infinia-light and ending on light
//   startPath Storybook path; default "docs/overview-welcome--docs". If that id does not exist (or
//             nothing is selected), the script selects the first story/docs link in the sidebar.
// Env: SHOTS=<dir> to save a sidebar screenshot per step; CHROME=<path> to override Chrome.
// Needs puppeteer-core resolvable (run from a dir with it installed, or set NODE_PATH).
import puppeteer from "puppeteer-core";

const BASE = (process.argv[2] ?? "http://localhost:6006").replace(/\/$/, "");
const SEQ = (process.argv[3] ?? "infinia-light,light,blue,dark,green,mist,custom,blue-mist,green-mist,infinia-dark,light").split(",");
const START = process.argv[4] ?? "docs/overview-welcome--docs";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await puppeteer.launch({ executablePath: CHROME, headless: true });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(`${BASE}/?path=/${START}&globals=theme:${SEQ[0]}`, { waitUntil: "networkidle2", timeout: 120000 });
await p.waitForSelector(".sidebar-item", { timeout: 60000 }).catch(() => {});
await wait(2000);

/** Make sure some sidebar row is selected; returns the selected item id or null. */
async function ensureSelection() {
  let id = await p.evaluate(() => document.querySelector('.sidebar-item[data-selected="true"]')?.getAttribute("data-item-id") ?? null);
  if (id) return id;
  console.error(`note: no selected sidebar row on "${START}" (missing or renamed id?) — selecting the first leaf entry`);
  const leaf = await p.$('.sidebar-item[data-nodetype="document"] a, .sidebar-item[data-nodetype="docs"] a, .sidebar-item[data-nodetype="story"] a');
  if (!leaf) return null;
  await leaf.click();
  await p.waitForSelector('.sidebar-item[data-selected="true"]', { timeout: 15000 }).catch(() => {});
  await wait(1500);
  id = await p.evaluate(() => document.querySelector('.sidebar-item[data-selected="true"]')?.getAttribute("data-item-id") ?? null);
  return id;
}

const selectedId = await ensureSelection();
if (!selectedId) console.error("warning: could not select any sidebar row — selected columns will be n/a");
else console.error(`selected row: ${selectedId}`);

console.log("| step | theme | html data-theme | selected bg (composited) | selected fg | contrast | hover bg (row) | toolbar active fg |");
console.log("|---|---|---|---|---|---|---|---|");
for (let i = 0; i < SEQ.length; i++) {
  const t = SEQ[i];
  if (i > 0) {
    await p.evaluate((t) => window.__STORYBOOK_ADDONS_CHANNEL__.emit("updateGlobals", { globals: { theme: t } }), t);
    await wait(1500);
  }
  const hovTarget = await p.$('.sidebar-item[data-selected="false"] a');
  if (hovTarget) {
    await hovTarget.hover();
    await wait(250);
  }
  const hovBg = await p.evaluate(() => {
    const h = [...document.querySelectorAll('.sidebar-item[data-selected="false"]')].find((e) => e.matches(":hover"));
    return h ? getComputedStyle(h).backgroundColor : null;
  });
  if (process.env.SHOTS) await p.screenshot({ path: `${process.env.SHOTS}/switch-${i}-${t}.png`, clip: { x: 0, y: 0, width: 720, height: 300 } });
  await p.mouse.move(1000, 500);

  const r = await p.evaluate(() => {
    const parse = (s) => {
      const m = s.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return [v[0], v[1], v[2], v[3] === undefined ? 1 : v[3]];
    };
    // Composite an element's background over its ancestors' (translucent tints are common).
    const effectiveBg = (el) => {
      const layers = [];
      for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c && c[3] > 0) {
          layers.push(c);
          if (c[3] >= 1) break;
        }
      }
      let acc = [255, 255, 255];
      for (const c of layers.reverse()) acc = acc.map((v, k) => c[k] * c[3] + v * (1 - c[3]));
      return acc.map(Math.round);
    };
    const s = document.querySelector('.sidebar-item[data-selected="true"]');
    const tb = [...document.querySelectorAll("button")].find((x) => /Theme|Classic|Dark|Blue|Green|mist|Custom|Infinia/i.test(x.textContent));
    const out = { dt: document.documentElement.getAttribute("data-theme"), tb: tb ? getComputedStyle(tb).color : null, bg: null, fg: null };
    if (s) {
      const link = s.querySelector("a") || s;
      out.bg = effectiveBg(s);
      out.fg = parse(getComputedStyle(link).color).slice(0, 3);
    }
    return out;
  });

  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const cr = (a, b2) => { const x = L(a), y = L(b2); return ((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2); };
  const fmt = (c) => (c ? `rgb(${c.join(", ")})` : "n/a");
  console.log(`| ${i} | ${t} | ${r.dt} | ${fmt(r.bg)} | ${fmt(r.fg)} | ${r.bg && r.fg ? cr(r.bg, r.fg) : "n/a"} | ${hovBg ?? "n/a"} | ${r.tb ?? "n/a"} |`);
}
await b.close();
