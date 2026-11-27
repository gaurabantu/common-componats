import React, { useMemo, useRef } from "react";
import Badge from "../../components/atoms/Badge";
import Button from "../../components/atoms/Button";
import IconBox from "../../components/atoms/IconBox";
import StatCard from "../../components/molecules/StatCard";
import { BarChart, LineChart } from "../../components/charts";
import { COMPLIANCE_REVIEWS, INVENTORY, PRODUCT, RELEASES, THEMES } from "../data";
import {
  IconAccessibility,
  IconArrowRight,
  IconBook,
  IconCheckCircle,
  IconGit,
  IconHook,
  IconPackage,
  IconPalette,
  IconShield,
  IconSparkle,
  IconSwatch,
  IconTag,
} from "../icons";
import { portalLinkProps } from "../navigation";
import { TOKENS_CSS, useThemeKey } from "../tokens/useTokens";
import { PortalPage, SectionHeading } from "../components/Portal";
import { ChartFigure } from "../components/ChartFigure";
import {
  STATS,
  buildKpis,
  complianceByDimension,
  componentsByCategory,
  growthSeries,
  testsTimeline,
  themeCoverage,
  type Kpi,
} from "../components/dashboardData";
import { CountUp, Reveal, useHeroIntro } from "../components/motion";

const KPI_ICON: Record<string, { icon: React.ReactNode; tone?: "neutral" | "strong" | "success" | "info" }> = {
  components: { icon: <IconPackage />, tone: "strong" },
  hooks: { icon: <IconHook /> },
  themes: { icon: <IconPalette /> },
  tokens: { icon: <IconSwatch /> },
  tests: { icon: <IconCheckCircle />, tone: "success" },
  releases: { icon: <IconTag /> },
  wcag: { icon: <IconAccessibility />, tone: "success" },
};

const SERIES_COLORS = ["var(--pt-chart-1)", "var(--pt-chart-2)", "var(--pt-chart-3)"];
const DARK = new Set(["dark", "infinia-dark"]);

const CHANGE_LABEL = { added: "Added", changed: "Changed", fixed: "Fixed", docs: "Docs" } as const;

function KpiTile({ kpi }: { kpi: Kpi }) {
  const meta = KPI_ICON[kpi.id] ?? { icon: <IconSparkle /> };
  return (
    <div data-reveal-item className="pt-kpi" title={`Source: ${kpi.source}`}>
      <StatCard
        size="sm"
        label={kpi.label}
        value={<CountUp value={kpi.value} />}
        unit={kpi.suffix}
        icon={meta.icon}
        iconTone={meta.tone ?? "neutral"}
        description={kpi.description}
      />
    </div>
  );
}

export function DashboardPage() {
  const heroRef = useRef<HTMLElement>(null);
  useHeroIntro(heroRef);
  const themeKey = useThemeKey();
  const chartTheme = DARK.has(themeKey) ? "dark" : "light";

  const kpis = useMemo(() => buildKpis(TOKENS_CSS), []);
  const byCategory = useMemo(componentsByCategory, []);
  const growth = useMemo(() => growthSeries(), []);
  const compliance = useMemo(() => complianceByDimension(), []);
  const tests = useMemo(() => testsTimeline(), []);
  const coverage = useMemo(() => themeCoverage(TOKENS_CSS), []);
  const latest = RELEASES[0];
  const whatsNew = INVENTORY.flatMap((g) => g.items.filter((i) => i.status === "new" && i.story).map((i) => ({ ...i, group: g.title }))).slice(0, 6);
  const firstGrowth = growth[0];
  const lastGrowth = growth[growth.length - 1];

  return (
    <PortalPage section="Overview" title="Dashboard" bare>
      {/* Hero */}
      <section ref={heroRef} className="pt-dash-hero" aria-labelledby="pt-dash-title">
        <span data-hero-item className="pt-eyebrow">
          Overview / Dashboard
        </span>
        <h2 id="pt-dash-title" data-hero-item className="pt-dash-hero__title">
          {PRODUCT.name}
        </h2>
        <p data-hero-item className="pt-dash-hero__lead">
          The state of the library at a glance — components, tokens, tests, releases and compliance, all read from the repository.
        </p>
        <ul data-hero-item className="pt-chips" aria-label="Library facts">
          <li>v{PRODUCT.version}</li>
          <li>tokens {PRODUCT.tokensVersion}</li>
          <li>{PRODUCT.standard}</li>
          <li>{THEMES.length} themes</li>
          <li>React 18+ · TypeScript</li>
        </ul>
        <div data-hero-item className="pt-dash-hero__ctas">
          <Button size="lg" icon={<IconArrowRight />} iconPosition="right" {...portalLinkProps("Overview/Components")}>
            Browse components
          </Button>
          <Button size="lg" variant="outlinePrimary" icon={<IconBook />} {...portalLinkProps("Overview/Getting Started")}>
            Get started
          </Button>
        </div>
      </section>

      {/* KPIs */}
      <Reveal as="section" stagger aria-label="Key figures" className="pt-grid pt-grid--kpi pt-dash-kpis">
        {kpis.map((k) => (
          <KpiTile key={k.id} kpi={k} />
        ))}
      </Reveal>
      <p className="pt-small pt-muted pt-dash-note">
        Figures are computed from <code className="pt-inline-code">src/portal/data.ts</code>, <code className="pt-inline-code">tokens.css</code> and{" "}
        <code className="pt-inline-code">portal-stats.json</code> (generated {STATS.generatedAt}). Hover a tile for its source.
      </p>

      {/* Charts */}
      <SectionHeading title="Library health" description="Native-SVG charts from ui-common-components/charts, coloured with tokens." />
      <Reveal stagger className="pt-chart-grid">
        <div data-reveal-item>
          <ChartFigure
            title="Components by category"
            description="Shipped components per gallery category, split into stable and new."
            source="Source: INVENTORY in src/portal/data.ts (legacy aliases excluded)."
            table={{
              columns: [
                { key: "category", label: "Category" },
                { key: "Stable", label: "Stable", numeric: true },
                { key: "New", label: "New", numeric: true },
              ],
              rows: byCategory,
            }}
          >
            {(width) => (
              <BarChart
                width={width}
                height={260}
                data={byCategory}
                xAxisKey="category"
                series={[
                  { dataKey: "Stable", name: "Stable" },
                  { dataKey: "New", name: "New" },
                ]}
                colors={SERIES_COLORS}
                stacked
                theme={chartTheme}
                showYAxis
                yTickCount={4}
                xTickInterval={width < 480 ? "auto" : 0}
                xTickFormatter={(v) => {
                  const word = String(v).split(" ")[0];
                  return word === "Application" ? "App" : word;
                }}
                barSize={20}
              />
            )}
          </ChartFigure>
        </div>
        <div data-reveal-item>
          <ChartFigure
            title="Library growth across releases"
            description={
              firstGrowth && lastGrowth
                ? `Component modules grew from ${firstGrowth["Component modules"]} (${firstGrowth.version}) to ${lastGrowth["Component modules"]} (${lastGrowth.version}); public exports from ${firstGrowth["Public exports"]} to ${lastGrowth["Public exports"]}.`
                : "Component modules and public exports per release."
            }
            source="Source: git — last commit of each package.json version (current version: working tree); folders in src/components and runtime exports of src/index.tsx (portal-stats.json)."
            table={{
              columns: [
                { key: "version", label: "Release" },
                { key: "date", label: "Date" },
                { key: "Component modules", label: "Component modules", numeric: true },
                { key: "Public exports", label: "Public exports", numeric: true },
              ],
              rows: growth,
            }}
          >
            {(width) => (
              <LineChart
                width={width}
                height={260}
                data={growth}
                xAxisKey="version"
                series={[
                  { dataKey: "Public exports", name: "Public exports" },
                  { dataKey: "Component modules", name: "Component modules" },
                ]}
                colors={SERIES_COLORS}
                theme={chartTheme}
                curve="linear"
                showYAxis
                yTickCount={4}
              />
            )}
          </ChartFigure>
        </div>
        <div data-reveal-item>
          <ChartFigure
            title="Compliance by dimension"
            description={`Reviews that passed each dimension in the first round and in the final verdict (${COMPLIANCE_REVIEWS.length} completed reviews).`}
            source="Source: _fleet/VERDICT-portal.md and VERDICT-sprint1…4.md, summarised in COMPLIANCE_REVIEWS (lines cited and tested)."
            table={{
              columns: [
                { key: "dimension", label: "Dimension" },
                { key: "checklist", label: "Checklist" },
                { key: "Passed first review", label: "Passed first review", numeric: true },
                { key: "Passed final review", label: "Passed final review", numeric: true },
              ],
              rows: compliance,
            }}
          >
            {(width) => (
              <BarChart
                width={width}
                height={260}
                data={compliance}
                xAxisKey="dimension"
                series={[
                  { dataKey: "Passed first review", name: "Passed first review" },
                  { dataKey: "Passed final review", name: "Passed final review" },
                ]}
                colors={[SERIES_COLORS[1], SERIES_COLORS[0]]}
                theme={chartTheme}
                showYAxis
                yTickCount={COMPLIANCE_REVIEWS.length}
                barSize={26}
              />
            )}
          </ChartFigure>
        </div>
        <div data-reveal-item>
          <ChartFigure
            title="Theme coverage"
            description={`Tokens each theme sets in its own tokens.css block; Classic and Blue are the base palette (${coverage.baseTokens} tokens).`}
            source="Source: src/design-system/tokens.css, parsed at runtime."
            table={{
              columns: [
                { key: "theme", label: "Theme" },
                { key: "Tokens set", label: "Tokens set", numeric: true },
              ],
              rows: coverage.rows,
            }}
          >
            {(width) => (
              <BarChart
                width={width}
                height={260}
                data={coverage.rows}
                xAxisKey="theme"
                orientation="horizontal-bars"
                series={[{ dataKey: "Tokens set", name: "Tokens set" }]}
                colors={SERIES_COLORS}
                theme={chartTheme}
                showLegend={false}
                showYAxis
                yTickCount={4}
                barSize={14}
                margin={{ left: 96, right: 16, top: 8, bottom: 24 }}
              />
            )}
          </ChartFigure>
        </div>
        <div data-reveal-item className="pt-chart-grid__wide">
          <ChartFigure
            title="Automated tests at each compliance gate"
            description={`Vitest suite size when each review closed${STATS.tests ? `, and today (${STATS.tests.passed} passing in ${STATS.tests.files} files)` : ""}.`}
            source="Source: the npx vitest run totals recorded in each _fleet/VERDICT-*.md final round; today from portal-stats.json."
            height={220}
            table={{
              columns: [
                { key: "milestone", label: "Milestone" },
                { key: "Tests", label: "Tests", numeric: true },
                { key: "source", label: "Recorded in" },
              ],
              rows: tests,
            }}
          >
            {(width) => (
              <LineChart
                width={width}
                height={220}
                data={tests}
                xAxisKey="milestone"
                series={[{ dataKey: "Tests", name: "Tests" }]}
                colors={SERIES_COLORS}
                theme={chartTheme}
                showLegend={false}
                showYAxis
                yTickCount={4}
                curve="linear"
              />
            )}
          </ChartFigure>
        </div>
      </Reveal>

      {/* Releases + what's new */}
      <div className="pt-dash-split">
        <Reveal as="section" aria-labelledby="pt-dash-releases" className="pt-panel">
          <div className="pt-panel__head">
            <h2 id="pt-dash-releases">Recent releases</h2>
            <a className="pt-link" {...portalLinkProps("Overview/Release Notes")}>
              All release notes <IconArrowRight />
            </a>
          </div>
          <ol className="pt-timeline">
            {RELEASES.slice(0, 5).map((r) => (
              <li key={r.version} className="pt-timeline__item" data-current={r.status === "current" ? "true" : undefined}>
                <span className="pt-timeline__dot" aria-hidden="true" />
                <div className="pt-timeline__head">
                  <strong>v{r.version}</strong>
                  <span className="pt-small pt-muted">{r.date}</span>
                  {r.status === "current" ? (
                    <Badge variant="success" size="sm">
                      Current
                    </Badge>
                  ) : null}
                </div>
                <p className="pt-timeline__summary">{r.summary}</p>
                <p className="pt-small pt-muted">
                  {(Object.keys(CHANGE_LABEL) as (keyof typeof CHANGE_LABEL)[])
                    .map((t) => [t, r.changes.filter((c) => c.type === t).length] as const)
                    .filter(([, n]) => n > 0)
                    .map(([t, n]) => `${n} ${CHANGE_LABEL[t].toLowerCase()}`)
                    .join(" · ")}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="section" aria-labelledby="pt-dash-new" className="pt-panel">
          <div className="pt-panel__head">
            <h2 id="pt-dash-new">What’s new</h2>
            {latest ? (
              <Badge tone="outline" size="sm">
                Latest v{latest.version}
              </Badge>
            ) : null}
          </div>
          <ul className="pt-new-grid" aria-label="New components">
            {whatsNew.map((item) => (
              <li key={item.name}>
                <a className="pt-new-card" {...portalLinkProps(item.story as string, "component")}>
                  <IconBox size="sm" tone="info">
                    <IconSparkle />
                  </IconBox>
                  <span className="pt-new-card__body">
                    <strong>{item.name}</strong>
                    <span className="pt-small pt-muted">{item.group}</span>
                  </span>
                  <IconArrowRight />
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-row">
            <Button size="sm" variant="outlinePrimary" icon={<IconShield />} {...portalLinkProps("Governance/Accessibility")}>
              Governance
            </Button>
            <Button size="sm" variant="ghost" icon={<IconGit />} {...portalLinkProps("Overview/Roadmap")}>
              Roadmap
            </Button>
          </div>
        </Reveal>
      </div>
    </PortalPage>
  );
}
