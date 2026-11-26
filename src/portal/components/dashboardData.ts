/**
 * Dashboard figures — every value is derived from repository data, never typed in:
 *
 * | Figure                    | Source                                                                  |
 * |---------------------------|-------------------------------------------------------------------------|
 * | Components / categories   | `INVENTORY` (src/portal/data.ts; completeness enforced by tests)        |
 * | Hooks                     | runtime `use*` exports of packages/ui-common-hooks/src/index.ts (gen.)  |
 * | Themes                    | `THEMES` (src/portal/data.ts) = the Storybook theme toolbar             |
 * | Design tokens             | distinct custom properties parsed from tokens.css (`?raw`, runtime)    |
 * | Tests                     | `vitest run --reporter=json` totals (generated JSON)                   |
 * | Releases                  | `RELEASES` (src/portal/data.ts)                                         |
 * | WCAG 2.2 AA status        | `COMPLIANCE_REVIEWS` (summarised from _fleet/VERDICT-*.md, cited)      |
 * | Growth across releases    | git: last commit of each package.json version (generated JSON)         |
 * | Theme coverage            | tokens declared by each theme's own selectors in tokens.css (runtime)  |
 *
 * "gen." = `src/portal/components/stats/portal-stats.json`, written by `generate-portal-stats.mjs`.
 */
import {
  COMPLIANCE_DIMENSIONS,
  COMPLIANCE_REVIEWS,
  INVENTORY,
  RELEASES,
  THEMES,
  type ComplianceReview,
} from "../data";
import { parseTokenBlocks } from "../tokens/parseTokens";
import rawStats from "./stats/portal-stats.json";

/* ---------- generated stats (typed view of the JSON) ---------- */

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  from?: string;
  doc?: string;
  deprecated?: boolean;
  values?: string[];
}

export interface PortalStats {
  generatedAt: string;
  tests: { files: number; total: number; passed: number; failed: number; runAt: string; command: string } | null;
  library: { components: { atoms: number; molecules: number; charts: number }; runtimeExports: number; hooks: number };
  growth: {
    version: string;
    date: string;
    commit: string;
    components: { atoms: number; molecules: number; charts: number };
    runtimeExports: number;
  }[];
  props: Record<string, { file: string; extends: string[]; props: PropInfo[] }>;
}

export const STATS = rawStats as unknown as PortalStats;

/* ---------- KPIs ---------- */

export const ALL_ITEMS = INVENTORY.flatMap((g) => g.items.map((item) => ({ ...item, group: g.id })));
/** Shipped components (legacy aliases are listed in the gallery but not counted). */
export const COMPONENT_TOTAL = ALL_ITEMS.filter((i) => i.status !== "legacy").length;
export const NEW_TOTAL = ALL_ITEMS.filter((i) => i.status === "new").length;

export const sumLayers = (c: { atoms: number; molecules: number; charts: number }) => c.atoms + c.molecules + c.charts;

/** Distinct custom properties declared anywhere in tokens.css. */
export function countTokens(tokensCss: string): number {
  return new Set(parseTokenBlocks(tokensCss).flatMap((b) => b.tokens.map((t) => t.name))).size;
}

export interface ComplianceSummary {
  reviews: number;
  passedAll: number;
  /** Review rounds summed over all reviews. */
  rounds: number;
}

export function complianceSummary(reviews: ComplianceReview[] = COMPLIANCE_REVIEWS): ComplianceSummary {
  return {
    reviews: reviews.length,
    passedAll: reviews.filter((r) => COMPLIANCE_DIMENSIONS.every((d) => r.final[d.id] === "pass")).length,
    rounds: reviews.reduce((n, r) => n + r.rounds, 0),
  };
}

export interface Kpi {
  id: string;
  label: string;
  value: number;
  /** Shown after the count, e.g. "/ 5". */
  suffix?: string;
  description: string;
  /** Where the number comes from (rendered as the tile's footnote / title). */
  source: string;
}

export function buildKpis(tokensCss: string): Kpi[] {
  const compliance = complianceSummary();
  const kpis: Kpi[] = [
    {
      id: "components",
      label: "Components",
      value: COMPONENT_TOTAL,
      description: `${NEW_TOTAL} new · ${INVENTORY.length} categories`,
      source: "INVENTORY in src/portal/data.ts",
    },
    {
      id: "hooks",
      label: "Hooks",
      value: STATS.library.hooks,
      description: "ui-common-hooks",
      source: "use* exports of packages/ui-common-hooks/src/index.ts",
    },
    {
      id: "themes",
      label: "Themes",
      value: THEMES.length,
      description: "Light, dark, mist & brand",
      source: "THEMES in src/portal/data.ts (Storybook theme toolbar)",
    },
    {
      id: "tokens",
      label: "Design tokens",
      value: countTokens(tokensCss),
      description: "CSS custom properties",
      source: "parsed from src/design-system/tokens.css",
    },
  ];
  if (STATS.tests) {
    kpis.push({
      id: "tests",
      label: "Automated tests",
      value: STATS.tests.passed,
      description: `${STATS.tests.files} test files · run ${STATS.tests.runAt}`,
      source: `${STATS.tests.command} (portal-stats.json)`,
    });
  }
  kpis.push(
    {
      id: "releases",
      label: "Releases",
      value: RELEASES.length,
      description: `Latest v${RELEASES[0]?.version ?? "—"}`,
      source: "RELEASES in src/portal/data.ts",
    },
    {
      id: "wcag",
      label: "WCAG 2.2 AA reviews passed",
      value: compliance.passedAll,
      suffix: `/ ${compliance.reviews}`,
      description: `A11y, security & responsive · ${compliance.rounds} review rounds`,
      source: "_fleet/VERDICT-*.md (COMPLIANCE_REVIEWS)",
    },
  );
  return kpis;
}

/* ---------- chart data ---------- */

export function componentsByCategory() {
  return INVENTORY.map((g) => {
    const shipped = g.items.filter((i) => i.status !== "legacy");
    const fresh = shipped.filter((i) => i.status === "new").length;
    return { category: g.title, id: g.id, Stable: shipped.length - fresh, New: fresh };
  });
}

export function growthSeries(stats: PortalStats = STATS) {
  return stats.growth.map((g) => ({
    version: `v${g.version}`,
    date: g.date,
    commit: g.commit,
    "Component modules": sumLayers(g.components),
    "Public exports": g.runtimeExports,
  }));
}

export function complianceByDimension(reviews: ComplianceReview[] = COMPLIANCE_REVIEWS) {
  return COMPLIANCE_DIMENSIONS.map((d) => ({
    dimension: d.label,
    checklist: d.checklist,
    "Passed first review": reviews.filter((r) => r.firstRound[d.id] === "pass").length,
    "Passed final review": reviews.filter((r) => r.final[d.id] === "pass").length,
  }));
}

/** Test-suite size at each completed compliance review, then today (generated). */
export function testsTimeline(stats: PortalStats = STATS) {
  const rows: { milestone: string; Tests: number; source: string }[] = COMPLIANCE_REVIEWS.map((r) => ({
    milestone: r.id === "portal" ? "Portal" : r.title.split(" — ")[0],
    Tests: r.testsAtFinal,
    source: r.testsSource,
  }));
  if (stats.tests) rows.push({ milestone: "Today", Tests: stats.tests.passed, source: "portal-stats.json" });
  return rows;
}

/**
 * Tokens each theme declares in its own selector blocks (shared blocks such as the mist family or
 * the dark/infinia-dark pair count for every theme they name). Classic and Blue are the base
 * palette, so they are reported separately as `baseTokens`.
 */
export function themeCoverage(tokensCss: string) {
  const blocks = parseTokenBlocks(tokensCss);
  const base = new Set<string>();
  const perTheme = new Map<string, Set<string>>();
  for (const b of blocks) {
    if (b.themes.length === 0 || b.themes.includes("blue")) {
      b.tokens.forEach((t) => base.add(t.name));
      continue;
    }
    for (const theme of b.themes) {
      const set = perTheme.get(theme) ?? new Set<string>();
      b.tokens.forEach((t) => set.add(t.name));
      perTheme.set(theme, set);
    }
  }
  const rows = THEMES.filter((t) => t.dataTheme && perTheme.has(t.dataTheme)).map((t) => ({
    theme: t.name,
    id: t.id,
    "Tokens set": perTheme.get(t.dataTheme as string)?.size ?? 0,
  }));
  return { rows, baseTokens: base.size };
}
