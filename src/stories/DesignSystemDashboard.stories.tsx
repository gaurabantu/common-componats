import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import DashboardShell from "../components/molecules/DashboardShell/DashboardShell";
import AppTopbar from "../components/molecules/AppTopbar";
import type { AppSidebarNavItem, AppSidebarSection } from "../components/molecules/AppSidebar/AppSidebar.types";
import Button from "../components/atoms/Button";
import Card from "../components/molecules/Card";
import Grid, { GridItem } from "../components/molecules/Grid";
import InputSearch from "../components/atoms/TextInputSearch";
import Select from "../components/atoms/Select";
import TextView from "../components/atoms/TextView";

/**
 * Dashboard layout reference — UX Governance §43 (Application Layout System) + §22 (filters / actions rows).
 * One primary Fill CTA (`Button` default `size="lg"` = 44px), secondaries outlined at `md` (40px).
 * Spacing uses `--space-*` tokens only in inline styles.
 *
 * Shell wiring:
 * - Controlled `collapsed` + `onCollapsedChange` so the rail toggle and mobile top bar stay in sync.
 * - `responsive: true` on sidebar + topbar (required for narrow breakpoints); `onMobileMenuClick` opens the drawer.
 * - Single page title in `AppTopbar` (`titleAs="h1"`) — no second H1 in the content column (`APP_TOPBAR_SYSTEM.md`).
 * - Sidebar header `min-height` aligned to the top bar row (64px).
 */

const gridIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const folderIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 6h6l2 2h8v10H4z" />
  </svg>
);

const bellIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const plusIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const gearIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
  </svg>
);

const dashSections: AppSidebarSection[] = [
  {
    id: "primary",
    tier: "primary",
    grouping: "spacing",
    items: [
      { id: "overview", label: "Overview", icon: gridIcon },
      { id: "projects", label: "Projects", icon: folderIcon },
    ],
  },
  {
    id: "secondary",
    tier: "secondary",
    grouping: "label",
    label: "Workspace",
    items: [{ id: "settings", label: "Settings", icon: gearIcon }],
  },
];

function DashboardCanvas() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [active, setActive] = useState<string | null>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const onNav = (id: string, _item: AppSidebarNavItem) => setActive(id);

  return (
    <DashboardShell
      className="flex flex-1 min-h-0 w-full overflow-hidden !h-full !max-h-full"
      sidebar={{
        header: { title: "Acme", subtitle: "Workspace" },
        sections: dashSections,
        activeItemId: active,
        onItemSelect: onNav,
        user: { name: "Alex Morgan", role: "Admin", onClick: () => {} },
        footerActions: [{ id: "help", icon: gearIcon, label: "Help", onClick: () => {} }],
        fixed: true,
        responsive: true,
        collapsed: sidebarCollapsed,
        onCollapsedChange: setSidebarCollapsed,
        showCollapseToggle: true,
        collapseToggleLabel: "Collapse sidebar",
        classNames: {
          /** Align chrome row with `AppTopbar` (64px — §43 application layout). */
          header: "!min-h-[64px] !items-center",
        },
      }}
      topbar={
        <AppTopbar
          theme="light"
          title="Dashboard"
          titleAs="h1"
          zIndex={200}
          search={{
            value: q,
            onChange: setQ,
            placeholder: "Search workspace…",
            ariaLabel: "Search workspace",
          }}
          onMobileMenuClick={() => setSidebarCollapsed(false)}
          mobileMenuLabel="Open navigation"
          actions={[
            { id: "create", icon: plusIcon, label: "New", variant: "outlinePrimary", onClick: () => {} },
            { id: "notify", icon: bellIcon, label: "Notifications", badgeCount: 2, onClick: () => {} },
          ]}
          profile={{ name: "Alex Morgan", onClick: () => {} }}
        />
      }
      contentStyle={{
        boxSizing: "border-box",
        padding: "var(--space-3)",
        paddingTop: "var(--space-2)",
        background: "var(--color-bg-page)",
        minHeight: 0,
      }}
    >
      <div style={{ maxWidth: "var(--size-viewport-desktop, 1440px)", margin: "0 auto", width: "100%" }}>
        {/* Page intro — title lives in `AppTopbar` (single H1). */}
        <div style={{ marginBottom: "var(--space-3)" }}>
          <TextView as="p" variant="body" color="secondary" style={{ margin: 0 }}>
            Monitor activity and open actions. Layout follows docs/design-system/DESIGN_SYSTEM.md §43 (headers → filters → actions →
            content). Use the sidebar chevron to collapse the rail; on narrow widths, use the menu control in the top
            bar to open navigation.
          </TextView>
        </div>

        {/* Row 1 — filters / inputs (§22) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-2)",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: "1 1 240px", minWidth: 0 }}>
            <InputSearch
              value={q}
              onChange={setQ}
              placeholder="Filter by keyword…"
              ariaLabel="Filter table"
              fullWidth
              size="md"
            />
          </div>
          <div style={{ flex: "0 1 200px", minWidth: 180 }}>
            <Select
              label="Status"
              placeholder="All statuses"
              value={status}
              options={[
                { label: "All statuses", value: "all" },
                { label: "Active", value: "active" },
                { label: "Archived", value: "archived" },
              ]}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              size="md"
            />
          </div>
        </div>

        {/* space-3 between filter row and action row */}
        <div style={{ height: "var(--space-3)" }} aria-hidden />

        {/* Row 2 — actions: one primary (left), secondaries grouped (right) — §21 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-1)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button type="button" variant="primary" size="lg">
            Create report
          </Button>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1)", marginLeft: "auto" }}>
            <Button type="button" variant="outlinePrimary" size="md">
              Export
            </Button>
            <Button type="button" variant="outlineSecondary" size="md">
              Share
            </Button>
            <Button type="button" variant="ghost" size="sm">
              Refresh
            </Button>
          </div>
        </div>

        <div style={{ height: "var(--space-3)" }} aria-hidden />

        {/* Content — §44: KPI row + elevated tiles */}
        <Grid columns={3} gap="var(--space-3)" minItemWidth={200} autoFit>
          <GridItem>
            <Card variant="bordered" title="Open tasks" subtitle="This week">
              <TextView variant="h2" as="p" style={{ margin: 0 }}>
                24
              </TextView>
            </Card>
          </GridItem>
          <GridItem>
            <Card variant="bordered" title="Shipped" subtitle="Last 30 days">
              <TextView variant="h2" as="p" style={{ margin: 0 }}>
                128
              </TextView>
            </Card>
          </GridItem>
          <GridItem>
            <Card variant="bordered" title="Errors" subtitle="Requires attention">
              <TextView variant="h2" as="p" style={{ margin: 0, color: "var(--color-state-error)" }}>
                3
              </TextView>
            </Card>
          </GridItem>
        </Grid>

        <div style={{ height: "var(--space-3)" }} aria-hidden />

        <Grid columns={2} gap="var(--space-3)" minItemWidth={280}>
          <GridItem>
            <Card
              variant="elevated"
              hoverable
              title="Active projects"
              subtitle="Recently updated"
              actions={
                <Button type="button" variant="outlinePrimary" size="xs">
                  View all
                </Button>
              }
              actionsAlign="right"
            >
              <TextView variant="body" color="secondary">
                Token-driven cards: bordered for KPIs, elevated for navigable groups. No border + shadow on the same
                surface.
              </TextView>
            </Card>
          </GridItem>
          <GridItem>
            <Card
              variant="withIndicator"
              selected
              hoverable
              title="Current focus"
              subtitle="Selected row pattern (§26)"
            >
              <TextView variant="body" color="secondary">
                Use <code style={{ fontSize: "var(--text-secondary-size)" }}>variant=&quot;withIndicator&quot;</code>{" "}
                with <code style={{ fontSize: "var(--text-secondary-size)" }}>selected</code> for list selection.
              </TextView>
            </Card>
          </GridItem>
        </Grid>
      </div>
    </DashboardShell>
  );
}

const meta: Meta = {
  title: "Design System/Dashboard/Overview",
  component: DashboardCanvas,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Reference screen using **DashboardShell** + **AppTopbar**, **§43** page structure, **§22** separate filter and action rows, and **§26** card variants. Reuses design tokens from `tokens.css` / `docs/design-system/DESIGN_SYSTEM.md`.",
      },
    },
  },
  tags: ["autodocs"],
  /**
   * Lock the iframe to one viewport height so the **shell** owns scrolling (main column only).
   * Without this, Storybook’s canvas can scroll the whole dashboard and the top bar moves with it.
   */
  decorators: [
    (Story) => (
      <div
        style={{
          height: "100vh",
          minHeight: 0,
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: "1 1 0%",
            minHeight: 0,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DashboardCanvas>;

export const GovernanceDashboard: Story = {
  render: () => <DashboardCanvas />,
};
