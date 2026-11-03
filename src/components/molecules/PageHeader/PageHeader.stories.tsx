import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./index";
import type { PageHeaderAction } from "./PageHeader.types";
import Button from "../../atoms/Button";
import Badge from "../../atoms/Badge";
import { Breadcrumb, BreadcrumbItem } from "../Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";

const PlusIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M8 3v10M3 8h10" />
  </svg>
);

const DownloadIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
  </svg>
);

const log = (what: string) => () => {
  // Storybook action stand-in — keeps the story free of addon imports.
  // eslint-disable-next-line no-console
  console.info(`[PageHeader] ${what}`);
};

const secondary: PageHeaderAction[] = [
  { label: "Export", icon: DownloadIcon, onClick: log("Export") },
  { label: "Duplicate", onClick: log("Duplicate") },
  { label: "Archive", onClick: log("Archive") },
  { label: "View audit log", href: "#audit-log" },
  { label: "Delete", onClick: log("Delete"), disabled: true },
];

const breadcrumb = (
  <Breadcrumb>
    <BreadcrumbItem href="#billing">Billing</BreadcrumbItem>
    <BreadcrumbItem href="#invoices">Invoices</BreadcrumbItem>
    <BreadcrumbItem current>INV-2024-104</BreadcrumbItem>
  </Breadcrumb>
);

const meta: Meta<typeof PageHeader> = {
  title: "Design System/Molecules/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Zone 3 of the 5-zone page layout: `breadcrumb` · `title` (an `h1` by default, `titleAs` to change) + `status` · `description` · `meta` · actions · `tabs`. Pass **exactly one** `primaryAction` (`<Button variant=\"primary\" size=\"md\">`). `secondaryActions` are data: the first `maxVisibleActions` (default 2) render as `outlineSecondary` buttons, the rest overflow into a keyboard-navigable \"More actions\" `DropdownMenu`; at ≤ 640px every secondary moves into the menu so only the menu and the primary remain. Unsafe `href` schemes are dropped. Put `<TabsList>` in `tabs` and wrap header + panels in `<Tabs>`.",
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    titleAs: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    description: { control: "text" },
    maxVisibleActions: { control: { type: "number", min: 0, max: 5, step: 1 } },
    moreActionsLabel: { control: "text" },
    secondaryActions: { control: "object" },
    breadcrumb: { control: false },
    status: { control: false },
    meta: { control: false },
    primaryAction: { control: false },
    tabs: { control: false },
  },
  args: {
    title: "INV-2024-104",
    titleAs: "h1",
    description: "Annual platform subscription for Acme Ltd.",
    maxVisibleActions: 2,
    moreActionsLabel: "More actions",
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Playground: Story = {
  args: {
    breadcrumb,
    status: (
      <Badge variant="warning" tone="soft">
        Overdue
      </Badge>
    ),
    meta: (
      <>
        <span>Owner: Priya Raman</span>
        <span>Due 12 Oct 2026</span>
        <span>Updated 2 hours ago</span>
      </>
    ),
    primaryAction: (
      <Button variant="primary" size="md" icon={PlusIcon}>
        Record payment
      </Button>
    ),
    secondaryActions: secondary,
  },
  render: (args) => (
    <div className="sb-page">
      <PageHeader {...args} />
    </div>
  ),
};

export const TitleOnly: Story = {
  args: { description: undefined },
  render: Playground.render,
};

export const WithPrimaryOnly: Story = {
  args: {
    title: "Invoices",
    description: "Every invoice issued in the current billing period.",
    primaryAction: (
      <Button variant="primary" size="md" icon={PlusIcon}>
        New invoice
      </Button>
    ),
  },
  render: Playground.render,
};

/** All secondaries overflow (`maxVisibleActions={0}`) — what every viewport ≤ 640px shows. */
export const AllInMenu: Story = {
  args: {
    ...Playground.args,
    maxVisibleActions: 0,
  },
  render: Playground.render,
};

export const WithTabs: Story = {
  render: (args) => (
    <div className="sb-page">
      <Tabs defaultValue="overview">
        <PageHeader
          {...args}
          title="Acme Ltd."
          description="Customer since March 2021 · Enterprise plan"
          breadcrumb={
            <Breadcrumb>
              <BreadcrumbItem href="#customers">Customers</BreadcrumbItem>
              <BreadcrumbItem current>Acme Ltd.</BreadcrumbItem>
            </Breadcrumb>
          }
          status={
            <Badge variant="success" tone="soft">
              Active
            </Badge>
          }
          primaryAction={
            <Button variant="primary" size="md">
              Create invoice
            </Button>
          }
          secondaryActions={secondary.slice(0, 3)}
          tabs={
            <TabsList ariaLabel="Customer sections">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
          }
        />
        <TabsContent value="overview">
          <p>Overview panel.</p>
        </TabsContent>
        <TabsContent value="invoices">
          <p>Invoices panel.</p>
        </TabsContent>
        <TabsContent value="contacts">
          <p>Contacts panel.</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};

/** Section-level header inside a page that already has an `h1`. */
export const SectionHeading: Story = {
  args: {
    title: "Payment methods",
    titleAs: "h2",
    description: "Cards and bank accounts used for automatic payments.",
    secondaryActions: [{ label: "Manage", onClick: log("Manage") }],
  },
  render: Playground.render,
};

/** Use the viewport toolbar (375 / 768 / 1440) — at ≤ 640px the secondaries collapse into the menu. */
export const Mobile: Story = {
  ...Playground,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
