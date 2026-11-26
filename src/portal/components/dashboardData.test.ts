import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { COMPLIANCE_REVIEWS, INVENTORY, RELEASES, THEMES } from "../data";
import {
  ALL_ITEMS,
  COMPONENT_TOTAL,
  STATS,
  buildKpis,
  complianceByDimension,
  complianceSummary,
  componentsByCategory,
  countTokens,
  growthSeries,
  sumLayers,
  testsTimeline,
  themeCoverage,
} from "./dashboardData";
import { PREVIEWS } from "./previews";

const ROOT = path.resolve(__dirname, "../../..");
/** Read from disk: vitest's `?raw` CSS import is empty (css processing is off), so no `?raw` here. */
const tokensCss = readFileSync(path.join(ROOT, "src/design-system/tokens.css"), "utf8");

function walk(dir: string, out: string[] = []): string[] {
  for (const n of readdirSync(dir)) {
    const p = path.join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** Every `title: "…"` of a Storybook meta / MDX `<Meta title="…">` in src. */
const STORY_TITLES = new Set(
  walk(path.join(ROOT, "src"))
    .filter((f) => /\.stories\.tsx$|\.mdx$/.test(f))
    .flatMap((f) => {
      const src = readFileSync(f, "utf8");
      return [...src.matchAll(/(?:^\s*title:\s*|<Meta title=)"([^"]+)"/gm)].map((m) => m[1]);
    }),
);

describe("dashboard KPIs — every figure comes from repository data", () => {
  const kpis = Object.fromEntries(buildKpis(tokensCss).map((k) => [k.id, k]));

  it("components = shipped INVENTORY rows (legacy aliases excluded)", () => {
    const expected = INVENTORY.flatMap((g) => g.items).filter((i) => i.status !== "legacy").length;
    expect(kpis.components.value).toBe(expected);
    expect(COMPONENT_TOTAL).toBe(expected);
  });

  it("hooks = runtime use* exports of the ui-common-hooks barrel", () => {
    const barrel = readFileSync(path.join(ROOT, "packages/ui-common-hooks/src/index.ts"), "utf8");
    const names = new Set([...barrel.matchAll(/\b(use[A-Z]\w*)\b/g)].map((m) => m[1]));
    expect(kpis.hooks.value).toBe(STATS.library.hooks);
    expect(STATS.library.hooks).toBe(names.size);
  });

  it("themes, releases and tokens match their sources", () => {
    expect(kpis.themes.value).toBe(THEMES.length);
    expect(kpis.releases.value).toBe(RELEASES.length);
    const names = new Set([...tokensCss.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/(?:^|[\s{;])(--[\w-]+)\s*:/g)].map((m) => m[1]));
    expect(kpis.tokens.value).toBe(countTokens(tokensCss));
    expect(kpis.tokens.value).toBe(names.size);
    expect(names.size).toBeGreaterThan(200);
  });

  it("tests tile reads the generated vitest totals (omitted when the JSON has none)", () => {
    if (STATS.tests) {
      expect(kpis.tests.value).toBe(STATS.tests.passed);
      expect(STATS.tests.total).toBeGreaterThanOrEqual(STATS.tests.passed);
    } else {
      expect(kpis.tests).toBeUndefined();
    }
  });

  it("WCAG tile = reviews whose final verdict passed all three dimensions", () => {
    expect(kpis.wcag.value).toBe(5);
    expect(kpis.wcag.suffix).toBe(`/ ${COMPLIANCE_REVIEWS.length}`);
    expect(complianceSummary().rounds).toBe(COMPLIANCE_REVIEWS.reduce((n, r) => n + r.rounds, 0));
  });

  it("every KPI names its source", () => {
    for (const k of Object.values(kpis)) expect(k.source.length).toBeGreaterThan(5);
  });
});

describe("generated portal-stats.json matches the working tree", () => {
  it("component folders per layer", () => {
    const count = (layer: string) =>
      readdirSync(path.join(ROOT, "src/components", layer)).filter((n) => {
        const p = path.join(ROOT, "src/components", layer, n);
        return statSync(p).isDirectory() && readdirSync(p).length > 0;
      }).length;
    expect(STATS.library.components.atoms).toBe(count("atoms"));
    expect(STATS.library.components.molecules).toBe(count("molecules"));
  });

  it("growth is ordered oldest → newest and ends at the current package version", () => {
    const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
    expect(STATS.growth.length).toBeGreaterThan(1);
    expect(STATS.growth[STATS.growth.length - 1].version).toBe(pkg.version);
    const dates = STATS.growth.map((g) => g.date);
    expect([...dates].sort()).toEqual(dates);
    expect(growthSeries().map((r) => r["Component modules"])).toEqual(STATS.growth.map((g) => sumLayers(g.components)));
  });

  it("has a props entry for every inventory item that names one", () => {
    const missing = ALL_ITEMS.filter((i) => i.props && !STATS.props[i.props]).map((i) => i.props);
    expect(missing).toEqual([]);
  });
});

describe("chart data", () => {
  it("components by category sums to the KPI", () => {
    const rows = componentsByCategory();
    expect(rows).toHaveLength(INVENTORY.length);
    expect(rows.reduce((n, r) => n + r.Stable + r.New, 0)).toBe(COMPONENT_TOTAL);
  });

  it("compliance by dimension counts first-round and final passes", () => {
    const rows = complianceByDimension();
    expect(rows.map((r) => r.dimension)).toEqual(["Accessibility", "Security", "Responsiveness"]);
    expect(rows.map((r) => r["Passed final review"])).toEqual([5, 5, 5]);
    expect(rows.map((r) => r["Passed first review"])).toEqual([0, 3, 4]);
  });

  it("test timeline is monotonic and cites a verdict line per gate", () => {
    const rows = testsTimeline();
    const values = rows.map((r) => r.Tests);
    expect([...values].sort((a, b) => a - b)).toEqual(values);
    for (const r of rows.slice(0, COMPLIANCE_REVIEWS.length)) expect(r.source).toMatch(/^_fleet\/VERDICT-[\w-]+\.md:\d+$/);
  });

  it("theme coverage lists the 8 non-base themes with their own blocks", () => {
    const { rows, baseTokens } = themeCoverage(tokensCss);
    expect(rows.map((r) => r.id).sort()).toEqual(
      ["blue-mist", "custom", "dark", "green", "green-mist", "infinia-dark", "infinia-light", "mist"].sort(),
    );
    expect(baseTokens).toBeGreaterThan(100);
    for (const r of rows) expect(r["Tokens set"]).toBeGreaterThan(0);
  });
});

describe("gallery inventory is complete and linked", () => {
  it("every inventory story title exists", () => {
    const missing = ALL_ITEMS.filter((i) => i.story && !STORY_TITLES.has(i.story)).map((i) => i.story);
    expect(missing).toEqual([]);
  });

  it("every Atoms / Molecules component story is in the gallery", () => {
    const linked = new Set(ALL_ITEMS.map((i) => i.story));
    const notComponents = new Set([
      "Design System/Molecules/Stepper · Icons",
      "Design System/Molecules/Feedback states/Real-world usage",
    ]);
    const orphans = [...STORY_TITLES].filter(
      (t) => /^Design System\/(Atoms|Molecules)\//.test(t) && !linked.has(t) && !notComponents.has(t),
    );
    expect(orphans).toEqual([]);
  });

  it("every item has a preview", () => {
    expect(ALL_ITEMS.filter((i) => !PREVIEWS[i.name]).map((i) => i.name)).toEqual([]);
  });

  it("uses canonical export names (no TextInput / Avatar / Tooltip-as-ToolTip renames)", () => {
    const names = ALL_ITEMS.map((i) => i.name);
    expect(names).not.toContain("TextInput");
    expect(names).not.toContain("Avatar");
    expect(names).toContain("Avtar");
    expect(names).toContain("Input");
  });
});
