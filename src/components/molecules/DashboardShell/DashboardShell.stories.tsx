import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DashboardShell from "./index";
import AppTopbar from "../AppTopbar";
import type { AppSidebarSection } from "../AppSidebar/AppSidebar.types";

const sections: AppSidebarSection[] = [
  {
    id: "main",
    tier: "primary",
    grouping: "spacing",
    items: [
      { id: "overview", label: "Overview" },
      { id: "projects", label: "Projects" },
      { id: "reports", label: "Reports" },
    ],
  },
  {
    id: "settings",
    tier: "secondary",
    grouping: "label",
    label: "Workspace",
    items: [
      { id: "members", label: "Members" },
      { id: "billing", label: "Billing" },
    ],
  },
];

function PageBody() {
  return (
    <div className="sb-stack" style={{ padding: "var(--space-4)" }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="sb-card">
          <p style={{ margin: 0 }}>Content block {i + 1} — only this region scrolls.</p>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof DashboardShell> = {
  title: "Design System/Molecules/DashboardShell",
  component: DashboardShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Application layout: `AppSidebar` rail + main column (`topbar` pinned above, `children` scrolling inside the `main` landmark). A skip link (first Tab stop) jumps past navigation. The rail collapses below 1024px and becomes an overlay drawer below 768px; the main column follows `--app-sidebar-offset`, so never hard-code the rail width. `AppShell` is a deprecated alias.",
      },
      story: { inline: false, iframeHeight: 520 },
    },
  },
  argTypes: {
    pinTopbar: { control: "boolean" },
    contentAs: { control: "inline-radio", options: ["main", "div"] },
    skipLinkLabel: { control: "text" },
    hideSkipLink: { control: "boolean" },
    mainLabel: { control: "text" },
    sidebar: { control: false },
    topbar: { control: false },
    children: { control: false },
  },
  args: {
    pinTopbar: true,
    contentAs: "main",
    skipLinkLabel: "Skip to main content",
    hideSkipLink: false,
  },
};

export default meta;
type Story = StoryObj<typeof DashboardShell>;

export const Playground: Story = {
  render: (args) => (
    <DashboardShell
      {...args}
      sidebar={{
        header: { title: "Acme", subtitle: "Workspace" },
        sections,
        defaultActiveItemId: "overview",
        fixed: false,
      }}
      topbar={<AppTopbar title="Overview" titleAs="h1" />}
    >
      <PageBody />
    </DashboardShell>
  ),
};

/** Viewport-fixed rail (production dashboards). Main column clears it via `--app-sidebar-offset`. */
export const FixedRail: Story = {
  render: (args) => (
    <DashboardShell
      {...args}
      sidebar={{ header: { title: "Acme" }, sections, defaultActiveItemId: "projects", fixed: true }}
      topbar={<AppTopbar title="Projects" titleAs="h1" />}
    >
      <PageBody />
    </DashboardShell>
  ),
};

/** Without a top bar the content slot fills the whole column. */
export const NoTopbar: Story = {
  render: (args) => (
    <DashboardShell {...args} sidebar={{ sections, fixed: false }} mainLabel="Reports">
      <PageBody />
    </DashboardShell>
  ),
};

/** Mobile (375px): the rail starts collapsed; expanding it overlays the content as a drawer. */
export const Mobile: Story = {
  ...FixedRail,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
