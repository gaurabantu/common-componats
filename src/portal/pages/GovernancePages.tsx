import React, { useMemo } from "react";
import Badge from "../../components/atoms/Badge";
import Button from "../../components/atoms/Button";
import IconBox from "../../components/atoms/IconBox";
import Card from "../../components/molecules/Card";
import StatCard from "../../components/molecules/StatCard";
import Table from "../../components/molecules/Table";
import { List, ListItem } from "../../components/molecules/List";
import { PRODUCT } from "../data";
import {
  IconAccessibility,
  IconCheckCircle,
  IconContrast,
  IconDevices,
  IconEye,
  IconFocus,
  IconKeyboard,
  IconLayout,
  IconMotion,
  IconShield,
  IconTouch,
} from "../icons";
import { contrastRatio, useResolvedTokens } from "../tokens/useTokens";
import { PortalPage, Section } from "../components/Portal";

/* ======================================================================== */
/* Accessibility                                                            */
/* ======================================================================== */

const COMMITMENTS = [
  { icon: <IconKeyboard />, title: "Keyboard first", text: "Every control is reachable with Tab; composite widgets (Tabs, Combobox, Calendar) follow ARIA APG arrow-key patterns." },
  { icon: <IconFocus />, title: "Visible focus", text: "A themable --color-focus-ring outline on :focus-visible — never removed without a replacement." },
  { icon: <IconContrast />, title: "Contrast", text: "Text ≥ 4.5:1, large text and UI parts ≥ 3:1, in light and dark themes. Status never relies on colour alone." },
  { icon: <IconTouch />, title: "Target size", text: "Interactive targets meet WCAG 2.2 2.5.8 (24px min) with 8px gaps; primary actions use the 44px tier." },
  { icon: <IconEye />, title: "Screen readers", text: "Labelled inputs, icon-only buttons with names, live regions for async results and copy feedback." },
  { icon: <IconMotion />, title: "Reduced motion", text: "Animations shorten or stop under prefers-reduced-motion; nothing auto-plays longer than 5 seconds." },
];

const PAIRS: { fg: string; bg: string; label: string; large?: boolean }[] = [
  { fg: "--color-text-primary", bg: "--color-bg-surface", label: "Primary text on surface" },
  { fg: "--color-text-secondary", bg: "--color-bg-surface", label: "Secondary text on surface" },
  { fg: "--color-text-primary", bg: "--color-bg-page", label: "Primary text on page" },
  { fg: "--color-text-secondary", bg: "--color-bg-page", label: "Secondary text on page" },
  { fg: "--button-primary-default-text", bg: "--button-primary-default-bg", label: "Primary button label" },
  { fg: "--color-text-link", bg: "--color-bg-surface", label: "Link on surface" },
  { fg: "--color-danger-strong", bg: "--color-danger-fill", label: "Error on danger fill" },
  { fg: "--color-success-strong", bg: "--color-success-fill", label: "Success on success fill" },
  { fg: "--color-warning-strong", bg: "--color-warning-fill", label: "Warning on warning fill" },
  { fg: "--color-info-strong", bg: "--color-info-fill", label: "Info on info fill" },
  { fg: "--color-focus-ring", bg: "--color-bg-surface", label: "Focus ring on surface (UI ≥ 3:1)", large: true },
  { fg: "--color-border-default", bg: "--color-bg-surface", label: "Structural border on surface (UI ≥ 3:1)", large: true },
];

function verdict(ratio: number | null, large?: boolean) {
  if (ratio === null) return { label: "n/a", variant: "neutral" as const };
  if (ratio >= 7 && !large) return { label: "AAA", variant: "success" as const };
  if (ratio >= (large ? 3 : 4.5)) return { label: "AA pass", variant: "success" as const };
  return { label: "Below AA", variant: "danger" as const };
}

export function AccessibilityPage() {
  const names = useMemo(() => [...new Set(PAIRS.flatMap((p) => [p.fg, p.bg]))], []);
  const v = useResolvedTokens(names);
  const rows = PAIRS.map((p, i) => {
    const ratio = v[p.fg] && v[p.bg] ? contrastRatio(v[p.fg], v[p.bg]) : null;
    return { id: String(i), ...p, ratio, verdict: verdict(ratio, p.large) };
  });
  const passing = rows.filter((r) => r.verdict.variant === "success").length;

  return (
    <PortalPage
      section="Governance"
      icon={<IconAccessibility />}
      title="Accessibility"
      description={`Every component targets ${PRODUCT.standard}. Accessibility is part of the component contract — not a later audit.`}
    >
      <section aria-label="Accessibility summary" className="pt-grid pt-grid--kpi">
        <StatCard size="sm" label="Standard" value="2.2 AA" icon={<IconAccessibility />} iconTone="success" description="WCAG target" />
        <StatCard size="sm" label="Contrast checks" value={`${passing}/${rows.length}`} icon={<IconContrast />} description="Passing for the current theme" />
        <StatCard size="sm" label="Checklist items" value={35} icon={<IconCheckCircle />} description="A1–A10, reviewed per component" />
        <StatCard size="sm" label="Viewports" value={3} icon={<IconDevices />} description="375 · 768 · 1440" />
      </section>

      <Section title="Our commitments" description="What every component guarantees out of the box.">
        <div className="pt-grid">
          {COMMITMENTS.map((c) => (
            <div key={c.title} className="pt-value">
              <IconBox size="lg">{c.icon}</IconBox>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Live contrast evidence"
        description="Computed now from the resolved tokens of the current theme. Switch the Theme toolbar to verify dark, mist and brand themes."
        action={<Badge variant={passing === rows.length ? "success" : "warning"} dot>{passing === rows.length ? "All pass" : `${rows.length - passing} to review`}</Badge>}
      >
        <Table
          columns={[
            {
              key: "label",
              header: "Pair",
              render: (_v, row) => {
                const r = row as (typeof rows)[number];
                return (
                  <span className="pt-row" style={{ flexWrap: "nowrap" }}>
                    <span className="pt-contrast-sample" style={{ color: `var(${r.fg})`, background: `var(${r.bg})` }} aria-hidden>Aa</span>
                    <span>{r.label}</span>
                  </span>
                );
              },
            },
            { key: "fg", header: "Foreground", render: (val) => <span className="pt-mono pt-small">{String(val)}</span> },
            { key: "bg", header: "Background", render: (val) => <span className="pt-mono pt-small">{String(val)}</span> },
            { key: "ratio", header: "Ratio", align: "right", width: 90, render: (val) => <strong className="pt-mono">{val === null ? "—" : `${(val as number).toFixed(2)}:1`}</strong> },
            {
              key: "verdict",
              header: "Result",
              width: 110,
              render: (val) => {
                const vd = val as ReturnType<typeof verdict>;
                return <Badge variant={vd.variant}>{vd.label}</Badge>;
              },
            },
          ]}
          data={rows}
          rowKey="id"
          size="sm"
          variant="minimal"
          searchable={false}
          pagination={false}
        />
      </Section>

      <Section title="How we verify" description="Three layers — automated, manual and review — before a component ships.">
        <List aria-label="Verification layers">
          <ListItem leading={<IconBox tone="strong"><IconCheckCircle /></IconBox>} title="Automated tests" badge={<Badge variant="success">Every commit</Badge>} description="Vitest + Testing Library assert roles, names, keyboard activation and aria-* states for each component." />
          <ListItem leading={<IconBox><IconEye /></IconBox>} title="Storybook accessibility panel" badge={<Badge variant="info">Per story</Badge>} description="axe-core checks run from the Accessibility tab on any story, in any theme and viewport." />
          <ListItem leading={<IconBox><IconShield /></IconBox>} title="Compliance review" badge={<Badge>Per change</Badge>} description="A reviewer audits accessibility, security and responsiveness against the quality checklist and records PASS / FAIL with evidence." />
        </List>
      </Section>

      <Section title="Try it" description="Press Tab to move through these controls and see the focus ring; Enter or Space activates.">
        <div className="pt-row">
          <Button>Primary</Button>
          <Button variant="outlinePrimary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </Section>
    </PortalPage>
  );
}

/* ======================================================================== */
/* Composition rules                                                        */
/* ======================================================================== */

const ZONES = [
  { n: 1, name: "App top bar", text: "Page title (the only h1), search, global actions, profile." },
  { n: 2, name: "Notification strip", text: "Offline / system banners — optional, full width." },
  { n: 3, name: "Context bar", text: "Breadcrumb, tabs, filters for the current view." },
  { n: 4, name: "Main content", text: "Cards, tables, forms. One primary action per zone." },
  { n: 5, name: "Footer", text: "Secondary meta, pagination, legal." },
];

export function CompositionPage() {
  return (
    <PortalPage
      section="Governance"
      icon={<IconLayout />}
      title="Composition rules"
      description="How components combine into screens. Following the same zones and action hierarchy makes every product feel like one product."
    >
      <div className="pt-grid pt-grid--wide">
        <Section title="The five zones" description="Every dashboard screen is built from the same regions inside DashboardShell.">
          <div className="pt-zones" role="img" aria-label="Screen layout: sidebar rail on the left; top bar, notification strip, context bar, main content and footer stacked on the right.">
            <div className="pt-zone pt-zone--rail"><strong>Sidebar</strong></div>
            {ZONES.map((z) => (
              <div key={z.n} className={["pt-zone", z.n === 4 ? "pt-zone--main" : ""].join(" ")}>
                <span className="pt-zone__num">{z.n}</span>
                <strong>{z.name}</strong>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Zone responsibilities">
          <List ordered aria-label="Zones">
            {ZONES.map((z) => (
              <ListItem key={z.n} leading={<IconBox size="sm" tone="strong">{z.n}</IconBox>} title={z.name} description={z.text} />
            ))}
          </List>
        </Section>
      </div>

      <Section title="Action hierarchy" description="Size and fill encode importance. One filled primary per zone; everything else is outlined, ghost or link.">
        <div className="pt-grid">
          <div className="pt-dodont" data-kind="do">
            <Badge variant="success">Do</Badge>
            <div className="pt-dodont__stage">
              <Button variant="ghost" size="md">Cancel</Button>
              <Button variant="outlinePrimary" size="md">Save draft</Button>
              <Button size="lg">Submit</Button>
            </div>
            <p className="pt-muted pt-small">One primary (lg), secondaries outlined (md), tertiary as ghost — read right to left.</p>
          </div>
          <div className="pt-dodont" data-kind="dont">
            <Badge variant="danger">Don't</Badge>
            <div className="pt-dodont__stage">
              <Button size="lg">Cancel</Button>
              <Button size="lg" variant="success">Save draft</Button>
              <Button size="lg">Submit</Button>
            </div>
            <p className="pt-muted pt-small">Several filled buttons compete; users cannot tell which action matters.</p>
          </div>
        </div>
      </Section>

      <Section title="Surfaces" description="A card is either bordered (static content) or elevated (interactive / floating) — never both.">
        <div className="pt-grid">
          <div className="pt-dodont" data-kind="do">
            <Badge variant="success">Do</Badge>
            <Card size="sm"><strong>Bordered</strong><p className="pt-muted pt-small">Static information panels.</p></Card>
            <Card size="sm" variant="elevated"><strong>Elevated</strong><p className="pt-muted pt-small">Menus, popovers, hover cards.</p></Card>
          </div>
          <div className="pt-dodont" data-kind="dont">
            <Badge variant="danger">Don't</Badge>
            <div style={{ padding: "var(--space-2)", border: "2px solid var(--color-border-strong)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", background: "var(--color-bg-surface)" }}>
              <strong>Heavy border + heavy shadow</strong>
              <p className="pt-muted pt-small">Double emphasis adds noise and breaks the hierarchy.</p>
            </div>
          </div>
        </div>
      </Section>
    </PortalPage>
  );
}

/* ======================================================================== */
/* Quality checklist                                                        */
/* ======================================================================== */

/** Summary of `_fleet/QUALITY_CHECKLIST.md` — the review gate every component passes. */
const CHECKLIST: { id: string; title: string; description: string; icon: React.ReactNode; items: [string, string, number][] }[] = [
  {
    id: "A",
    title: "Accessibility — WCAG 2.2 AA",
    description: "Keyboard, focus, contrast, labels, overlays, motion and screen-reader semantics.",
    icon: <IconAccessibility />,
    items: [
      ["A1", "Keyboard operability", 6], ["A2", "Touch targets & spacing", 2], ["A3", "Focus visibility", 3],
      ["A4", "Colour & contrast", 4], ["A5", "Forms & labels", 4], ["A6", "Tables & data", 3],
      ["A7", "Overlays & dialogs", 4], ["A8", "Feedback states", 3], ["A9", "Motion & animation", 3],
      ["A10", "Screen-reader semantics", 3],
    ],
  },
  {
    id: "B",
    title: "Security",
    description: "No XSS vectors, safe input and file handling, CSP-friendly output, no secrets.",
    icon: <IconShield />,
    items: [
      ["B1", "XSS prevention", 4], ["B2", "Input sanitization", 4], ["B3", "Focus security", 4],
      ["B4", "Dependency & supply chain", 4], ["B5", "Content Security Policy friendliness", 4],
      ["B6", "Form & validation security", 4], ["B7", "Secrets hygiene", 3],
    ],
  },
  {
    id: "C",
    title: "Responsiveness",
    description: "Breakpoints, navigation, data display, forms, touch, theme preferences and density.",
    icon: <IconDevices />,
    items: [
      ["C1", "Breakpoints & layout", 4], ["C2", "Navigation responsiveness", 4], ["C3", "Data display responsiveness", 4],
      ["C4", "Forms responsiveness", 4], ["C5", "Touch & interaction", 4], ["C6", "Theme & preference support", 4],
      ["C7", "Density & composition", 4],
    ],
  },
];

export function QualityChecklistPage() {
  const total = CHECKLIST.reduce((n, d) => n + d.items.reduce((m, i) => m + i[2], 0), 0);
  return (
    <PortalPage
      section="Governance"
      icon={<IconCheckCircle />}
      title="Quality checklist"
      description="The gate every component, screen and change passes before release. Each item is testable and recorded as PASS or FAIL with file-level evidence."
    >
      <section aria-label="Checklist summary" className="pt-grid pt-grid--kpi">
        <StatCard size="sm" label="Dimensions" value={3} icon={<IconCheckCircle />} description="All three must pass" />
        <StatCard size="sm" label="Areas" value={CHECKLIST.reduce((n, d) => n + d.items.length, 0)} icon={<IconLayout />} description="A1–A10 · B1–B7 · C1–C7" />
        <StatCard size="sm" label="Checks" value={total} icon={<IconShield />} description="Individual, testable items" />
      </section>
      {CHECKLIST.map((d) => (
        <Section key={d.id} title={d.title} description={d.description} action={<Badge tone="outline">{d.items.reduce((m, i) => m + i[2], 0)} checks</Badge>}>
          <List size="sm" aria-label={d.title}>
            {d.items.map(([id, title, n]) => (
              <ListItem
                key={id}
                leading={<IconBox size="sm" tone="outline">{d.icon}</IconBox>}
                title={title}
                badge={<Badge tone="outline">{id}</Badge>}
                meta={`${n} checks`}
              />
            ))}
          </List>
        </Section>
      ))}
    </PortalPage>
  );
}
