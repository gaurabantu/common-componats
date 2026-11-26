/**
 * Guard: interaction-state tokens (Sprint 5) for every theme, the WCAG AA pairs they must meet, and
 * theme isolation (a nested `[data-theme]` resolves like the root; no Infinia colour leaks into the
 * other themes). Resolves tokens.css with a small cascade model: rules whose selector targets the
 * element (`:root`, `[data-theme]`, `[data-theme="x"]`, `:root[data-theme="x"]`, `:is(…)`), ordered by
 * specificity then source order, `var()` substituted on the declaring element, inheritance from parent.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "tokens.css"), "utf8");

type Decls = Record<string, string>;
interface Rule { selectors: string[]; decls: Array<[string, string]>; order: number }
interface Ctx { root: boolean; attr: string | null }

function splitTop(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let buf = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(buf.trim());
      buf = "";
    } else buf += ch;
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

function parseRules(source: string): Rule[] {
  let text = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/@import[^\n]*\n/g, "");
  // Drop @media blocks (mobile sizing / forced-colors are not theme colours).
  let out = "";
  let i = 0;
  for (;;) {
    const at = text.indexOf("@media", i);
    if (at < 0) {
      out += text.slice(i);
      break;
    }
    out += text.slice(i, at);
    let j = text.indexOf("{", at) + 1;
    let depth = 1;
    while (depth > 0 && j < text.length) {
      if (text[j] === "{") depth++;
      else if (text[j] === "}") depth--;
      j++;
    }
    i = j;
  }
  text = out;
  const rules: Rule[] = [];
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  let order = 0;
  while ((m = ruleRe.exec(text))) {
    const decls: Array<[string, string]> = [];
    const declRe = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let d: RegExpExecArray | null;
    while ((d = declRe.exec(m[2]))) decls.push([d[1], d[2].trim()]);
    if (decls.length) rules.push({ selectors: splitTop(m[1].trim()), decls, order: order++ });
  }
  return rules;
}

function specificity(selector: string, ctx: Ctx): number {
  const s = selector.trim();
  if (s === ":root") return ctx.root ? 10 : -1;
  if (s === "[data-theme]") return ctx.attr !== null ? 10 : -1;
  const attr = /^(:root)?\[data-theme="([\w-]+)"\]$/.exec(s);
  if (attr) {
    if (attr[1] && !ctx.root) return -1;
    return ctx.attr === attr[2] ? (attr[1] ? 20 : 10) : -1;
  }
  const is = /^:is\((.*)\)$/.exec(s);
  if (is) return splitTop(is[1]).some((p) => specificity(p, ctx) >= 0) ? 10 : -1;
  return -1;
}

const RULES = parseRules(css);

function resolve(ctx: Ctx, parent: Decls = {}): Decls {
  const best: Record<string, { v: string; sp: number; order: number }> = {};
  for (const rule of RULES) {
    const sp = Math.max(...rule.selectors.map((s) => specificity(s, ctx)));
    if (sp < 0) continue;
    for (const [k, v] of rule.decls) {
      const cur = best[k];
      if (!cur || sp > cur.sp || (sp === cur.sp && rule.order >= cur.order)) best[k] = { v, sp, order: rule.order };
    }
  }
  const own: Decls = {};
  for (const k of Object.keys(best)) own[k] = best[k].v;
  const out: Decls = { ...parent };
  const seen = new Set<string>();
  const valueOf = (name: string): string | undefined => {
    if (!(name in own)) return parent[name];
    if (seen.has(name)) return "CYCLE";
    seen.add(name);
    let value = own[name];
    const varRe = /var\((--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/;
    for (let guard = 0; guard < 50 && value.includes("var("); guard++) {
      value = value.replace(varRe, (_all, ref: string, fallback?: string) => {
        const r = valueOf(ref);
        if (r === undefined || r === "initial" || r === "INVALID") return fallback !== undefined ? fallback.trim() : "INVALID";
        return r;
      });
    }
    seen.delete(name);
    return value;
  };
  for (const k of Object.keys(own)) out[k] = valueOf(k) as string;
  return out;
}

const THEMES = ["classic", "blue", "dark", "green", "mist", "custom", "blue-mist", "green-mist", "infinia-light", "infinia-dark"];
const INFINIA = ["infinia-light", "infinia-dark"];
const rootOf = (id: string) => resolve({ root: true, attr: id === "classic" ? null : id });
const nestedIn = (id: string, parent: string) => resolve({ root: false, attr: id }, rootOf(parent));

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const STATE_TOKENS = [
  "--color-state-hover-bg",
  "--color-state-hover-fg",
  "--color-state-active-bg",
  "--color-state-selected-bg",
  "--color-state-selected-fg",
  "--color-state-selected-subtle-bg",
  "--color-state-selected-border",
  "--color-state-selected-text",
  "--color-state-disabled-bg",
  "--color-state-disabled-fg",
  "--color-focus-ring",
];
const SELECTION_TOKENS = ["--color-selection-bg", "--color-selection-fg"];
const HEX = /^#[0-9a-f]{6}$/i;

describe.each(THEMES)("%s — interaction-state tokens", (id) => {
  const t = rootOf(id);
  const get = (k: string) => {
    const v = t[k];
    expect(v, `${k} in ${id}`).toMatch(HEX);
    return v;
  };

  it.each(STATE_TOKENS)("defines %s as a resolved colour", (token) => {
    expect(t[token], `${token} missing / unresolved in ${id}`).toMatch(HEX);
  });

  it("selected fill: selected-fg on selected-bg ≥ 4.5:1", () => {
    expect(contrast(get("--color-state-selected-fg"), get("--color-state-selected-bg"))).toBeGreaterThanOrEqual(4.5);
  });

  it("row selection: text-primary and text-secondary on selected-subtle-bg ≥ 4.5:1", () => {
    const bg = get("--color-state-selected-subtle-bg");
    expect(contrast(get("--color-text-primary"), bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(get("--color-text-secondary"), bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("hover / pressed: text-primary and text-secondary ≥ 4.5:1", () => {
    for (const bg of ["--color-state-hover-bg", "--color-state-active-bg"]) {
      expect(contrast(get("--color-text-primary"), get(bg)), bg).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--color-text-secondary"), get(bg)), bg).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("hover is distinguishable from the resting surface (luminance ratio ≥ 1.08)", () => {
    expect(contrast(get("--color-state-hover-bg"), get("--color-bg-surface"))).toBeGreaterThanOrEqual(1.08);
  });

  it("focus ring ≥ 3:1 against surface, page and hover fill", () => {
    for (const bg of ["--color-bg-surface", "--color-bg-page", "--color-state-hover-bg"]) {
      expect(contrast(get("--color-focus-ring"), get(bg)), bg).toBeGreaterThanOrEqual(3);
    }
  });

  if (!INFINIA.includes(id)) {
    // Infinia keeps its pre-Sprint-5 look by user decision (yellow edge on white is 1.43:1) — see handoff 09n.
    it("selected edge / indicator ≥ 3:1 against the surface", () => {
      expect(contrast(get("--color-state-selected-border"), get("--color-bg-surface"))).toBeGreaterThanOrEqual(3);
    });

    it("selected-text ≥ 4.5:1 on surface and page", () => {
      expect(contrast(get("--color-state-selected-text"), get("--color-bg-surface"))).toBeGreaterThanOrEqual(4.5);
      expect(contrast(get("--color-state-selected-text"), get("--color-bg-page"))).toBeGreaterThanOrEqual(4.5);
    });

    it("text selection: selection-fg on selection-bg ≥ 4.5:1", () => {
      const [bg, fg] = SELECTION_TOKENS.map(get);
      expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5);
    });

    it("status text (-strong) ≥ 4.5:1 on the page and on the surface", () => {
      for (const s of ["success", "warning", "danger", "info"]) {
        const fg = get(`--color-${s}-strong`);
        if (id !== "dark") expect(contrast(fg, get("--color-bg-page")), `${s} on page`).toBeGreaterThanOrEqual(4.5);
        expect(contrast(fg, get("--color-bg-surface")), `${s} on surface`).toBeGreaterThanOrEqual(4.5);
      }
    });

    it("primary button label ≥ 4.5:1", () => {
      expect(
        contrast(get("--button-primary-default-text"), get("--button-primary-default-bg")),
      ).toBeGreaterThanOrEqual(4.5);
    });
  }
});

describe("dark theme fills that used to fall back to light :root values", () => {
  const t = rootOf("dark");
  it("--color-border-strong is overridden and ≥ 3:1 on the dark surface", () => {
    expect(t["--color-border-strong"]).not.toBe("#0d0d0d");
    expect(contrast(t["--color-border-strong"], t["--color-bg-surface"])).toBeGreaterThanOrEqual(3);
  });
  it("status text on the dark page ≥ 4.5:1", () => {
    for (const s of ["success", "warning", "danger", "info"]) {
      expect(contrast(t[`--color-${s}-strong`], t["--color-bg-page"]), s).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("Infinia keeps its existing colours (state tokens are aliases only)", () => {
  it.each(INFINIA)("%s state tokens equal colours the theme already used", (id) => {
    const t = rootOf(id);
    expect(t["--color-state-hover-bg"]).toBe(t["--color-theme-surface-hover"]);
    expect(t["--color-state-selected-bg"]).toBe(t["--color-page-current-bg"]);
    expect(t["--color-state-selected-fg"]).toBe(t["--color-page-current-fg"]);
    expect(t["--color-state-selected-border"]).toBe(t["--color-selected-indicator"]);
    expect(t["--color-state-selected-subtle-bg"]).toBe(t["--color-selected-bg"]);
    expect(t["--color-state-selected-text"]).toBe(t["--color-selected-text"]);
    expect(t["--color-state-active-bg"]).toBe(t["--button-outline-primary-active-bg"]);
    expect(t["--color-selection-bg"] === undefined || t["--color-selection-bg"] === "initial").toBe(true);
  });

  it("infinia-light role pins match the pre-Sprint-5 component colours", () => {
    const t = rootOf("infinia-light");
    expect(t["--color-selected-bg"]).toBe("#fffbe5");
    expect(t["--color-theme-surface-hover"]).toBe("#f5f5f5");
    expect(t["--color-tab-indicator"]).toBe("#ffd400");
    expect(t["--color-segment-selected-bg"]).toBe(t["--color-bg-surface"]);
    expect(t["--color-range-endpoint-bg"]).toBe(t["--color-text-primary"]);
    expect(t["--color-option-selected-bg"]).toBe(t["--color-interactive-row-hover"]);
  });
});

describe("theme isolation", () => {
  const INFINIA_COLOURS = /#ffd400|#6b5900|#fffbe5|#2a250b|#fff0a3|#574900/i;

  it.each(THEMES.filter((id) => !INFINIA.includes(id)))("%s resolves no Infinia colour (root or nested in Infinia)", (id) => {
    for (const t of [rootOf(id), nestedIn(id, "infinia-light"), nestedIn(id, "infinia-dark")]) {
      const leaks = Object.entries(t).filter(([, v]) => INFINIA_COLOURS.test(v));
      expect(leaks, JSON.stringify(leaks)).toEqual([]);
    }
  });

  it.each(THEMES)("a nested [data-theme=%s] resolves like the root, whatever the outer theme", (id) => {
    const root = rootOf(id);
    const norm = (v: string | undefined) => (v === "initial" ? undefined : v);
    for (const outer of THEMES) {
      const nested = nestedIn(id, outer);
      const keys = new Set([...Object.keys(root), ...Object.keys(nested)]);
      const diffs = [...keys].filter((k) => norm(root[k]) !== norm(nested[k]));
      expect(diffs, `${id} inside ${outer}`).toEqual([]);
    }
  });
});

/* ---------------- Iteration 2 (VERDICT-sprint5 fix-list 1–5) ---------------- */

/** Evaluates `color-mix(in srgb, A p%, B)` (A/B hex or `transparent` = composited over `under`). */
function evalMix(value: string, under: string): string {
  const re = /color-mix\(in srgb, (#[0-9a-f]{6}|transparent) (\d+(?:\.\d+)?)%, (#[0-9a-f]{6}|transparent)\)/i;
  let v = value;
  for (let guard = 0; guard < 10 && re.test(v); guard++) {
    v = v.replace(re, (_all, a: string, p: string, b: string) => {
      const A = a === "transparent" ? under : a;
      const B = b === "transparent" ? under : b;
      const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
      const q = Number(p) / 100;
      const [ra, rb] = [rgb(A), rgb(B)];
      return `#${ra.map((c, i) => Math.round(c * q + rb[i] * (1 - q)).toString(16).padStart(2, "0")).join("")}`;
    });
  }
  return v;
}

const NON_INFINIA = THEMES.filter((id) => !INFINIA.includes(id));
const BADGE_VARIANTS = ["neutral", "primary", "success", "warning", "danger", "info"];
const BADGE_TONES = ["soft", "solid", "outline"];

describe("fix 1 — dark inverse / on-primary pairs", () => {
  const t = rootOf("dark");
  const pairs: Array<[string, string]> = [
    ["--color-text-on-primary", "--color-brand-primary"], // Table "primary" header, Stepper current
    ["--color-text-on-primary", "--color-text-primary"], // Table "dark" header
    ["--color-text-on-primary", "--color-state-success"], // Stepper complete
    ["--color-text-on-inverse", "--color-surface-inverse"],
  ];
  it.each(pairs)("%s on %s ≥ 4.5:1", (fg, bg) => {
    expect(contrast(t[fg], t[bg])).toBeGreaterThanOrEqual(4.5);
  });
  it("inverse surface stays dark (no white bar in the dark theme)", () => {
    expect(luminance(t["--color-surface-inverse"])).toBeLessThan(0.1);
  });
  it("Spinner inverse ring on the primary Button fill ≥ 3:1 (non-text)", () => {
    expect(contrast(t["--color-text-on-primary"], t["--button-primary-default-bg"])).toBeGreaterThanOrEqual(3);
  });
  it.each(NON_INFINIA)("%s: Noir AppTopbar text (--color-on-noir) ≥ 4.5:1 on --color-noir-100", (id) => {
    const r = rootOf(id);
    expect(contrast(r["--color-on-noir"], r["--color-noir-100"])).toBeGreaterThanOrEqual(4.5);
  });
});

describe("fix 2 — Badge tones ≥ 4.5:1 in every non-Infinia theme", () => {
  const cases = NON_INFINIA.flatMap((id) =>
    BADGE_VARIANTS.flatMap((v) => BADGE_TONES.map((tone) => [id, v, tone] as [string, string, string])),
  );
  it.each(cases)("%s %s/%s", (id, v, tone) => {
    const t = rootOf(id);
    const surface = t["--color-bg-surface"];
    const fg = evalMix(t[`--color-badge-${v}-${tone}-fg`] ?? "", surface);
    const backgrounds =
      tone === "outline" ? [surface, t["--color-bg-page"]] : [evalMix(t[`--color-badge-${v}-${tone}-bg`] ?? "", surface)];
    for (const bg of backgrounds) {
      expect(fg, `${v}/${tone} fg`).toMatch(HEX);
      expect(bg, `${v}/${tone} bg`).toMatch(HEX);
      expect(contrast(fg, bg), `${id} ${v}/${tone} ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("Badge.css reads the role tokens with the previous expression as fallback", () => {
    const badge = readFileSync(join(__dirname, "../components/atoms/Badge/Badge.css"), "utf8");
    for (const v of BADGE_VARIANTS) {
      for (const tone of BADGE_TONES) {
        expect(badge).toContain(`var(--color-badge-${v}-${tone}-fg,`);
        if (tone !== "outline") expect(badge).toContain(`var(--color-badge-${v}-${tone}-bg,`);
      }
    }
  });

  it.each(INFINIA)("%s leaves the badge roles unset (Badge.css falls back to the pre-existing look)", (id) => {
    const t = rootOf(id);
    for (const v of BADGE_VARIANTS) {
      for (const tone of BADGE_TONES) {
        const name = `--color-badge-${v}-${tone}-fg`;
        if (id === "infinia-light" && name === "--color-badge-primary-soft-fg") {
          expect(t[name]).toBe("#111111"); // Infinia's own pre-existing role value
          continue;
        }
        expect([undefined, "initial"]).toContain(t[name]);
      }
    }
  });
});

describe("fix 3 — dark theme accent pair and accent-as-text", () => {
  const t = rootOf("dark");
  it("--color-theme-text on --color-theme-primary ≥ 4.5:1 (Badge solid, Switch, accent fills)", () => {
    expect(contrast(t["--color-theme-text"], t["--color-theme-primary"])).toBeGreaterThanOrEqual(4.5);
  });
  it("theme-text on the hover and active accent fills ≥ 4.5:1", () => {
    expect(contrast(t["--color-theme-text"], t["--color-theme-hover"])).toBeGreaterThanOrEqual(4.5);
    expect(contrast(t["--color-theme-text"], t["--color-theme-active"])).toBeGreaterThanOrEqual(4.5);
  });
  it.each([
    "--color-theme-primary",
    "--button-outline-primary-text",
    "--button-secondary-text",
    "--button-link-color",
    "--button-link-hover-color",
  ])("%s as text ≥ 4.5:1 on surface and page", (token) => {
    expect(contrast(t[token], t["--color-bg-surface"])).toBeGreaterThanOrEqual(4.5);
    expect(contrast(t[token], t["--color-bg-page"])).toBeGreaterThanOrEqual(4.5);
  });
  it("outline-primary text on its hover fill ≥ 4.5:1", () => {
    // rgba(59,130,246,0.12) over the surface ≈ color-mix 12%
    const hover = evalMix("color-mix(in srgb, #3b82f6 12%, " + t["--color-bg-surface"] + ")", t["--color-bg-surface"]);
    expect(contrast(t["--button-outline-primary-text"], hover)).toBeGreaterThanOrEqual(4.5);
  });
  it("primary Button keeps white on blue-600 (≥ 4.5:1)", () => {
    expect(contrast(t["--button-primary-default-text"], t["--button-primary-default-bg"])).toBeGreaterThanOrEqual(4.5);
  });
});

describe("fix 4 — dark info-strong on info-fill", () => {
  const t = rootOf("dark");
  it("--color-info-strong on --color-info-fill ≥ 4.5:1", () => {
    const fill = evalMix(t["--color-info-fill"], t["--color-bg-surface"]);
    expect(fill).toMatch(HEX);
    expect(contrast(t["--color-info-strong"], fill)).toBeGreaterThanOrEqual(4.5);
  });
  it.each(NON_INFINIA)("%s: every status -strong on its own -fill ≥ 4.5:1", (id) => {
    const t2 = rootOf(id);
    for (const s of ["success", "warning", "danger", "info"]) {
      const fill = evalMix(t2[`--color-${s}-fill`], t2["--color-bg-surface"]);
      expect(contrast(t2[`--color-${s}-strong`], fill), `${s}`).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("fix 5 — Button resting-state !important rules do not mask hover / active / disabled", () => {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  const rules: Array<{ sel: string; body: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = ruleRe.exec(noComments))) rules.push({ sel: m[1].trim(), body: m[2] });
  const VARIANTS = ["primary", "secondary", "outline-primary", "outline-secondary", "success", "danger", "warning", "link", "gradient"];
  const REST_GUARD = ':not(:disabled, [aria-disabled="true"], :hover, :active)';

  it.each(VARIANTS)("every !important resting rule for .btn-%s excludes hover, active and disabled", (v) => {
    const re = new RegExp(`\\.btn-${v}(?![\\w-])`);
    const forced = rules.filter(
      (r) => /!important/.test(r.body) && splitTop(r.sel).some((s) => re.test(s) && !/:(hover|active|disabled|focus)|aria-disabled/.test(s.replace(REST_GUARD, ""))),
    );
    expect(forced.length, `no resting !important rule for ${v}`).toBeGreaterThan(0);
    for (const r of forced) {
      for (const s of splitTop(r.sel).filter((x) => re.test(x))) {
        expect(s, `selector needs the rest guard`).toContain(REST_GUARD);
      }
    }
  });

  it.each(VARIANTS.filter((v) => v !== "gradient"))(".btn-%s hover and active rules are !important and set the text colour", (v) => {
    for (const state of ["hover", "active"]) {
      const rule = rules.find((r) => r.sel === `:is(button, a).btn-${v}:${state}:not(:disabled, [aria-disabled="true"])`);
      expect(rule, `${v}:${state}`).toBeDefined();
      const decls = rule!.body.split(";").map((d) => d.trim()).filter(Boolean);
      for (const d of decls) expect(d, `${v}:${state}`).toMatch(/!important$/);
      expect(decls.some((d) => /^color:/.test(d)), `${v}:${state} colour`).toBe(true);
    }
  });
});
