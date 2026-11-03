import React, { useMemo, useState } from "react";
import Badge from "../../components/atoms/Badge";
import Button from "../../components/atoms/Button";
import IconBox from "../../components/atoms/IconBox";
import InputSearch from "../../components/atoms/TextInputSearch";
import CodeBlock from "../../components/molecules/CodeBlock";
import StatCard from "../../components/molecules/StatCard";
import Table from "../../components/molecules/Table";
import { List, ListItem } from "../../components/molecules/List";
import { COMPONENT_COUNT, INVENTORY, PRODUCT, RELEASES, ROADMAP, type ComponentStatus, type InventoryItem, type RoadmapKind, type RoadmapStatus } from "../data";
import ProgressBar from "../../components/atoms/ProgressBar";
import {
  IconArrowRight,
  IconBell,
  IconChart,
  IconCursor,
  IconDownload,
  IconFile,
  IconFileCode,
  IconForm,
  IconGit,
  IconGrid,
  IconLayout,
  IconLock,
  IconPackage,
  IconPanel,
  IconTag,
  IconType,
  IconWind,
} from "../icons";
import { portalLinkProps } from "../navigation";
import { DownloadButton, FilterGroup, PortalPage, Section, formatBytes, useDownloads, type DownloadAsset } from "../components/Portal";

/* ======================================================================== */
/* Downloads                                                                */
/* ======================================================================== */

const ASSET_ICON: Record<DownloadAsset["kind"], React.ReactNode> = {
  css: <IconFileCode />,
  package: <IconPackage />,
  js: <IconWind />,
};

const PACKAGE_EXPORTS = [
  { id: "1", path: "ui-common-components", provides: "All components (main entry)", type: "JS · types" },
  { id: "2", path: "ui-common-components/charts", provides: "LineChart, BarChart, PieChart, AreaChart", type: "JS · types" },
  { id: "3", path: "ui-common-components/shell", provides: "DashboardShell, AppSidebar, AppTopbar", type: "JS · types" },
  { id: "4", path: "ui-common-components/table", provides: "Table + semantic primitives", type: "JS · types" },
  { id: "5", path: "ui-common-components/design-system/tokens.css", provides: "Design tokens + 8 themes", type: "CSS" },
  { id: "6", path: "ui-common-components/index.css", provides: "Compiled component styles", type: "CSS" },
  { id: "7", path: "ui-common-components/tailwind.preset.js", provides: "Tailwind preset on tokens", type: "JS" },
];

export function DownloadsPage() {
  const { assets, status } = useDownloads();
  const byId = (id: string) => assets.find((a) => a.id === id);
  const origin = typeof window !== "undefined" ? new URL(".", window.location.href).href : "https://<storybook-host>/";
  const tokens = byId("tokens");
  const totalBytes = assets.reduce((n, a) => n + (a.bytes ?? 0), 0);

  return (
    <PortalPage
      section="Overview"
      icon={<IconDownload />}
      title="Downloads"
      description="Everything needed to use the design system — no registry access required. Files are copied from the repository at build time, with size and SHA-256 for verification."
      actions={<DownloadButton asset={tokens} variant="primary" size="md" label="Download tokens.css" />}
    >
      <section aria-label="Download summary" className="pt-grid pt-grid--kpi">
        <StatCard size="sm" label="Assets" value={assets.filter((a) => a.available).length} icon={<IconFile />} description="Ready to download" />
        <StatCard size="sm" label="Library version" value={PRODUCT.version} icon={<IconTag />} description={PRODUCT.packageName} />
        <StatCard size="sm" label="Tokens version" value={PRODUCT.tokensVersion} icon={<IconFileCode />} description="tokens.css" />
        <StatCard size="sm" label="Total size" value={totalBytes ? formatBytes(totalBytes) : "—"} icon={<IconPackage />} description="All assets" />
      </section>

      <Section
        title="Release assets"
        description="Download individual files. Packages install with npm exactly like a registry package."
        action={status === "fallback" ? <Badge variant="warning">Run npm run prepare:downloads</Badge> : <Badge variant="success" dot>Up to date</Badge>}
      >
        <List aria-label="Downloadable assets" size="lg">
          {assets.map((a) => (
            <ListItem
              key={a.id}
              leading={<IconBox size="lg" tone={a.id === "tokens" ? "strong" : "neutral"}>{ASSET_ICON[a.kind]}</IconBox>}
              title={a.name}
              badge={
                <>
                  <Badge tone="outline">v{a.version}</Badge>
                  {a.id === "tokens" ? <Badge variant="success">Start here</Badge> : null}
                </>
              }
              description={
                <>
                  {a.description}
                  {a.sha256 ? (
                    <>
                      <br />
                      <span className="pt-mono pt-small" title={a.sha256}>
                        SHA-256 {a.sha256.slice(0, 16)}…
                      </span>
                    </>
                  ) : null}
                </>
              }
              meta={formatBytes(a.bytes)}
              action={<DownloadButton asset={a} />}
            />
          ))}
        </List>
      </Section>

      <div className="pt-grid pt-grid--wide">
        <Section title="Install a downloaded package" description="Keep the .tgz in your repo (e.g. vendor/) so CI installs the same bytes.">
          <CodeBlock
            language="bash"
            title="Terminal"
            code={`npm install ./vendor/ui-common-components-${PRODUCT.version}.tgz \\\n            ./vendor/ui-common-hooks-${PRODUCT.hooksVersion}.tgz`}
          />
        </Section>
        <Section title="Link tokens directly" description="For static pages, prototypes or other frameworks — no bundler needed.">
          <CodeBlock language="html" title="index.html" code={`<link rel="stylesheet" href="${origin}${tokens?.file ?? "design-system/tokens.css"}" />`} wrap />
        </Section>
      </div>

      <Section title="What the package exports" description="Use these specifiers in your imports — they are declared in package.json exports, so every bundler resolves them.">
        <Table
          columns={[
            { key: "path", header: "Import path", render: (v) => <code className="pt-inline-code">{String(v)}</code> },
            { key: "provides", header: "Provides" },
            { key: "type", header: "Type", width: 120, render: (v) => <Badge tone="outline">{String(v)}</Badge> },
          ]}
          data={PACKAGE_EXPORTS}
          rowKey="id"
          size="sm"
          variant="minimal"
          searchable={false}
          pagination={false}
          hover
        />
      </Section>
    </PortalPage>
  );
}

/* ======================================================================== */
/* Component inventory                                                      */
/* ======================================================================== */

const GROUP_ICON: Record<string, React.ReactNode> = {
  actions: <IconCursor />,
  forms: <IconForm />,
  display: <IconType />,
  layout: <IconLayout />,
  overlays: <IconGrid />,
  feedback: <IconBell />,
  shell: <IconPanel />,
  data: <IconChart />,
};

const STATUS_BADGE: Record<ComponentStatus, { label: string; variant: "success" | "info" | "warning" | "neutral" }> = {
  stable: { label: "Stable", variant: "success" },
  new: { label: "New", variant: "info" },
  beta: { label: "Beta", variant: "warning" },
  legacy: { label: "Legacy", variant: "neutral" },
};

type Filter = "all" | ComponentStatus;

export function InventoryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const all = INVENTORY.flatMap((g) => g.items);
  const count = (s: ComponentStatus) => all.filter((i) => i.status === s).length;

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (i: InventoryItem) =>
      (filter === "all" || i.status === filter) &&
      (!q || `${i.name} ${i.description}`.toLowerCase().includes(q));
    return INVENTORY.map((g) => ({ ...g, items: g.items.filter(match) })).filter((g) => g.items.length);
  }, [query, filter]);

  const shown = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <PortalPage
      section="Overview"
      icon={<IconPackage />}
      title="Component inventory"
      description="Every shipped component, its status and where to import it from. Select View to open its live documentation."
      actions={<Button variant="outlinePrimary" size="md" {...portalLinkProps("Overview/Getting Started")}>Install guide</Button>}
    >
      <section aria-label="Inventory summary" className="pt-grid pt-grid--kpi">
        <StatCard size="sm" label="Total" value={COMPONENT_COUNT} icon={<IconPackage />} />
        <StatCard size="sm" label="Stable" value={count("stable")} icon={<IconLock />} iconTone="success" />
        <StatCard size="sm" label="New" value={count("new")} icon={<IconTag />} iconTone="info" />
        <StatCard size="sm" label="Legacy aliases" value={count("legacy")} icon={<IconGit />} />
      </section>

      <div className="pt-toolbar">
        <div className="pt-toolbar__search">
          <InputSearch
            value={query}
            onChange={setQuery}
            placeholder="Search components…"
            ariaLabel="Search components"
            showClearButton
            fullWidth
          />
        </div>
        <FilterGroup<Filter>
          label="Filter by status"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "stable", label: "Stable" },
            { value: "new", label: "New" },
            { value: "legacy", label: "Legacy" },
          ]}
        />
      </div>
      <p className="pt-muted pt-small" role="status" aria-live="polite">
        Showing {shown} of {COMPONENT_COUNT} components
      </p>

      {groups.map((g) => (
        <Section key={g.id} title={g.title} description={g.description} action={<Badge tone="outline">{g.items.length}</Badge>}>
          <List aria-label={g.title}>
            {g.items.map((item) => {
              const s = STATUS_BADGE[item.status];
              return (
                <ListItem
                  key={item.name}
                  leading={<IconBox tone={item.status === "new" ? "info" : "neutral"}>{GROUP_ICON[g.id]}</IconBox>}
                  title={item.name}
                  badge={
                    <>
                      <Badge variant={s.variant}>{s.label}</Badge>
                      {item.replacement ? <Badge tone="outline">{item.status === "legacy" ? `Use ${item.replacement}` : item.replacement}</Badge> : null}
                    </>
                  }
                  description={item.description}
                  meta={<code className="pt-inline-code">{item.from ?? PRODUCT.packageName}</code>}
                  action={
                    item.story ? (
                      <Button
                        size="sm"
                        variant="outlinePrimary"
                        icon={<IconArrowRight />}
                        iconPosition="right"
                        ariaLabel={`View ${item.name} documentation`}
                        {...portalLinkProps(item.story, "component")}
                      >
                        View
                      </Button>
                    ) : undefined
                  }
                />
              );
            })}
          </List>
        </Section>
      ))}
      {!groups.length ? (
        <Section title="No matches" description="Try a different name or clear the status filter.">
          <Button variant="outlinePrimary" onClick={() => { setQuery(""); setFilter("all"); }}>Reset filters</Button>
        </Section>
      ) : null}
    </PortalPage>
  );
}

/* ======================================================================== */
/* Release notes                                                            */
/* ======================================================================== */

const CHANGE_BADGE = {
  added: { label: "Added", variant: "success" as const },
  changed: { label: "Changed", variant: "info" as const },
  fixed: { label: "Fixed", variant: "warning" as const },
  docs: { label: "Docs", variant: "neutral" as const },
};

export function ReleaseNotesPage() {
  return (
    <PortalPage
      section="Overview"
      icon={<IconGit />}
      title="Release notes"
      description="What changed in each version of the library, tokens and documentation."
    >
      {RELEASES.map((r) => (
        <Section
          key={r.version}
          title={`v${r.version}`}
          description={r.summary}
          action={
            <Badge variant={r.status === "unreleased" ? "warning" : r.status === "current" ? "success" : "neutral"} dot>
              {r.date}
            </Badge>
          }
        >
          <List size="sm" aria-label={`Changes in ${r.version}`}>
            {r.changes.map((c, i) => (
              <ListItem key={i} title={c.text} badge={<Badge variant={CHANGE_BADGE[c.type].variant} tone="outline">{CHANGE_BADGE[c.type].label}</Badge>} />
            ))}
          </List>
        </Section>
      ))}
    </PortalPage>
  );
}

/* ======================================================================== */
/* Roadmap                                                                  */
/* ======================================================================== */

const ROADMAP_STATUS: Record<RoadmapStatus, { label: string; variant: "success" | "info" | "neutral" | "warning" }> = {
  done: { label: "Shipped", variant: "success" },
  "in-progress": { label: "In progress", variant: "info" },
  planned: { label: "Planned", variant: "neutral" },
  backlog: { label: "Backlog", variant: "neutral" },
};

const ROADMAP_KIND: Record<RoadmapKind, { label: string; icon: React.ReactNode }> = {
  component: { label: "New component", icon: <IconPackage /> },
  composite: { label: "Composite", icon: <IconLayout /> },
  upgrade: { label: "Upgrade", icon: <IconGit /> },
  platform: { label: "Platform", icon: <IconGrid /> },
};

export function RoadmapPage() {
  const all = ROADMAP.flatMap((p) => p.items);
  const count = (s: RoadmapStatus) => all.filter((i) => i.status === s).length;
  const current = ROADMAP.find((p) => p.items.some((i) => i.status === "in-progress"));
  return (
    <PortalPage
      section="Overview"
      icon={<IconTag />}
      title="Roadmap"
      description="What the design system is shipping next, why, and when. Each item is delivered with stories, tests and a compliance review (accessibility, security, responsiveness)."
      actions={<Button variant="outlinePrimary" size="md" {...portalLinkProps("Overview/Release Notes")}>Release notes</Button>}
    >
      <section aria-label="Roadmap summary" className="pt-grid pt-grid--kpi">
        <StatCard size="sm" label="Shipped" value={count("done")} icon={<IconLock />} iconTone="success" />
        <StatCard size="sm" label="In progress" value={count("in-progress")} icon={<IconTag />} iconTone="info" description={current?.title} />
        <StatCard size="sm" label="Planned" value={count("planned")} icon={<IconLayout />} />
        <StatCard size="sm" label="Backlog" value={count("backlog")} icon={<IconGit />} />
      </section>

      {ROADMAP.map((phase) => {
        const done = phase.items.filter((i) => i.status === "done").length;
        const pct = Math.round((done / phase.items.length) * 100);
        const phaseStatus: RoadmapStatus = phase.items.every((i) => i.status === "done")
          ? "done"
          : phase.items.some((i) => i.status === "in-progress" || i.status === "done")
            ? "in-progress"
            : phase.items[0].status;
        return (
          <Section
            key={phase.id}
            title={phase.title}
            description={phase.goal}
            action={
              <div className="pt-row">
                <Badge tone="outline">{phase.window}</Badge>
                <Badge variant={ROADMAP_STATUS[phaseStatus].variant} dot>{ROADMAP_STATUS[phaseStatus].label}</Badge>
              </div>
            }
          >
            <div className="pt-stack">
              <div className="pt-row" style={{ flexWrap: "nowrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <ProgressBar value={pct} size="sm" showValue={false} showLabel={false} ariaLabel={`${phase.title}: ${done} of ${phase.items.length} shipped`} />
                </div>
                <span className="pt-small pt-muted" style={{ whiteSpace: "nowrap" }}>
                  {done}/{phase.items.length} shipped
                </span>
              </div>
              <List aria-label={phase.title}>
                {phase.items.map((item) => (
                  <ListItem
                    key={item.name}
                    leading={<IconBox tone={item.status === "done" ? "success" : item.status === "in-progress" ? "info" : "neutral"}>{ROADMAP_KIND[item.kind].icon}</IconBox>}
                    title={item.name}
                    badge={
                      <>
                        <Badge tone="outline">{ROADMAP_KIND[item.kind].label}</Badge>
                        <Badge variant={ROADMAP_STATUS[item.status].variant}>{ROADMAP_STATUS[item.status].label}</Badge>
                      </>
                    }
                    description={item.description}
                    action={
                      item.story ? (
                        <Button size="sm" variant="outlinePrimary" ariaLabel={`View ${item.name}`} {...portalLinkProps(item.story, item.story.startsWith("Overview/") ? "page" : "component")}>
                          View
                        </Button>
                      ) : undefined
                    }
                  />
                ))}
              </List>
            </div>
          </Section>
        );
      })}

      <Section title="How items are prioritised" description="Ranked by how many product screens need them today, accessibility risk, and effort.">
        <List aria-label="Prioritisation criteria" size="sm">
          <ListItem leading={<IconBox size="sm" tone="strong">1</IconBox>} title="Reach" description="Used on most screens (feedback, overlays, paging) ships first." />
          <ListItem leading={<IconBox size="sm" tone="strong">2</IconBox>} title="Risk" description="Patterns teams currently hand-roll with accessibility gaps (dialogs, toasts, forms)." />
          <ListItem leading={<IconBox size="sm" tone="strong">3</IconBox>} title="Leverage" description="Composites (DataTable, PageHeader) that lock in the 5-zone layout and one-primary-CTA rule." />
        </List>
      </Section>
    </PortalPage>
  );
}
