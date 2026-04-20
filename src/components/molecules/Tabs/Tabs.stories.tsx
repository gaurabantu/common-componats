import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

const meta: Meta<typeof Tabs> = {
  title: "Design System/Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    variant: { control: "radio", options: ["line", "minimal", "segmented"] },
    size: { control: "radio", options: ["sm", "md"] },
    listLayout: { control: "radio", options: ["wrap", "nowrap", "equal"] },
    activationMode: { control: "radio", options: ["automatic", "manual"] },
    contentAnimation: { control: "radio", options: ["none", "fade", "fade-slide"] },
    triggerLayout: {
      control: "radio",
      options: ["inline", "stacked"],
      description: "Icon + label: one row vs icon above label",
    },
    triggerAlign: {
      control: "radio",
      options: ["start", "center", "end"],
      description: "Horizontal alignment inside each tab (LTR)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="a">
      <TabsList ariaLabel="Example tabs">
        <TabsTrigger value="a">General</TabsTrigger>
        <TabsTrigger value="b">Security</TabsTrigger>
        <TabsTrigger value="c" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="a">
        <p style={{ margin: 0 }}>General settings content.</p>
      </TabsContent>
      <TabsContent value="b">
        <p style={{ margin: 0 }}>Security settings content.</p>
      </TabsContent>
      <TabsContent value="c">
        <p style={{ margin: 0 }}>Billing content.</p>
      </TabsContent>
    </Tabs>
  ),
  args: {
    orientation: "horizontal",
    variant: "line",
    size: "md",
    listLayout: "wrap",
  },
};

export const EqualWidth: Story = {
  render: () => (
    <Tabs defaultValue="a" listLayout="equal" dividerWidth={2} dividerColor="var(--color-border-default)">
      <TabsList ariaLabel="Equal tabs">
        <TabsTrigger value="a">Short</TabsTrigger>
        <TabsTrigger value="b">Much longer tab label that wraps</TabsTrigger>
        <TabsTrigger value="c">Mid</TabsTrigger>
      </TabsList>
      <TabsContent value="a">A</TabsContent>
      <TabsContent value="b">B</TabsContent>
      <TabsContent value="c">C</TabsContent>
    </Tabs>
  ),
};

export const DividerAndText: Story = {
  render: () => (
    <Tabs
      defaultValue="one"
      dividerColor="#2563eb"
      dividerWidth={1}
      indicatorWidth={3}
      inactiveTextColor="var(--color-text-secondary)"
      tabFontSize={15}
    >
      <TabsList ariaLabel="Styled">
        <TabsTrigger value="one">Overview</TabsTrigger>
        <TabsTrigger value="two">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Active tab text matches the blue indicator by default.</TabsContent>
      <TabsContent value="two">Second panel</TabsContent>
    </Tabs>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Tabs defaultValue="1" variant="minimal" size="sm">
      <TabsList ariaLabel="Reports">
        <TabsTrigger value="1">Summary</TabsTrigger>
        <TabsTrigger value="2">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="1">Summary panel</TabsContent>
      <TabsContent value="2">Details panel</TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="x" orientation="vertical" variant="line">
      <TabsList ariaLabel="Sections">
        <TabsTrigger value="x">Section A</TabsTrigger>
        <TabsTrigger value="y">Section B</TabsTrigger>
      </TabsList>
      <TabsContent value="x">Content A</TabsContent>
      <TabsContent value="y">Content B</TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: function ControlledDemo() {
    const [v, setV] = useState("one");
    return (
      <div>
        <Tabs value={v} onValueChange={setV}>
          <TabsList ariaLabel="Controlled">
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Panel one</TabsContent>
          <TabsContent value="two">Panel two</TabsContent>
        </Tabs>
        <p style={{ marginTop: 16, fontSize: 12 }}>Active: {v}</p>
      </div>
    );
  },
};

/** Fade + slight slide on panel change (similar to shadcn tab content motion). */
const IconPreview = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 8h18" />
  </svg>
);

const IconCode = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
  </svg>
);

/** Icon + label on one row; alignment (default center). */
export const IconInlineAlignment: Story = {
  name: "Icons · inline + align",
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <Tabs defaultValue="a" triggerLayout="inline" triggerAlign="center">
        <TabsList ariaLabel="Center (default)">
          <TabsTrigger value="a" icon={IconPreview}>
            Home
          </TabsTrigger>
          <TabsTrigger value="b" icon={IconCode}>
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Center aligned</TabsContent>
        <TabsContent value="b">Code panel</TabsContent>
      </Tabs>
      <Tabs defaultValue="a" triggerLayout="inline" triggerAlign="start">
        <TabsList ariaLabel="Start aligned">
          <TabsTrigger value="a" icon={IconPreview}>
            Home
          </TabsTrigger>
          <TabsTrigger value="b" icon={IconCode}>
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Start aligned</TabsContent>
        <TabsContent value="b">Code panel</TabsContent>
      </Tabs>
      <Tabs defaultValue="a" triggerLayout="inline" triggerAlign="end">
        <TabsList ariaLabel="End aligned">
          <TabsTrigger value="a" icon={IconPreview}>
            Home
          </TabsTrigger>
          <TabsTrigger value="b" icon={IconCode}>
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">End aligned</TabsContent>
        <TabsContent value="b">Code panel</TabsContent>
      </Tabs>
    </div>
  ),
};

/** Icon above label; horizontal alignment of the column. */
export const IconStackedAlignment: Story = {
  name: "Icons · stacked + align",
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <Tabs defaultValue="a" triggerLayout="stacked" triggerAlign="center">
        <TabsList ariaLabel="Stacked center">
          <TabsTrigger value="a" icon={IconPreview}>
            Home
          </TabsTrigger>
          <TabsTrigger value="b" icon={IconCode}>
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Center</TabsContent>
        <TabsContent value="b">Code</TabsContent>
      </Tabs>
      <Tabs defaultValue="a" triggerLayout="stacked" triggerAlign="start">
        <TabsList ariaLabel="Stacked start">
          <TabsTrigger value="a" icon={IconPreview}>
            Home
          </TabsTrigger>
          <TabsTrigger value="b" icon={IconCode}>
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Start</TabsContent>
        <TabsContent value="b">Code</TabsContent>
      </Tabs>
      <Tabs defaultValue="a" triggerLayout="stacked" triggerAlign="end">
        <TabsList ariaLabel="Stacked end">
          <TabsTrigger value="a" icon={IconPreview}>
            Home
          </TabsTrigger>
          <TabsTrigger value="b" icon={IconCode}>
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">End</TabsContent>
        <TabsContent value="b">Code</TabsContent>
      </Tabs>
    </div>
  ),
};

/** Mixed: one tab stacked, others inline (per-trigger override). */
export const IconMixedTriggers: Story = {
  name: "Icons · per-tab override",
  render: () => (
    <Tabs defaultValue="a" triggerLayout="inline" triggerAlign="center">
      <TabsList ariaLabel="Mixed layouts">
        <TabsTrigger value="a" icon={IconPreview} triggerLayout="stacked">
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="b" icon={IconCode}>
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="a">First tab uses stacked layout</TabsContent>
      <TabsContent value="b">Second tab uses inline</TabsContent>
    </Tabs>
  ),
};

export const SegmentedOneBox: Story = {
  name: "Segmented (one box + icons)",
  render: () => (
    <Tabs defaultValue="preview" variant="segmented" listLayout="equal" contentAnimation="fade-slide">
      <TabsList ariaLabel="View mode">
        <TabsTrigger value="preview" icon={IconPreview}>
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" icon={IconCode}>
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <p style={{ margin: 0 }}>Preview panel — white pill slides under the active tab.</p>
      </TabsContent>
      <TabsContent value="code">
        <pre style={{ margin: 0, fontSize: 13 }}>{'<Button>Hello</Button>'}</pre>
      </TabsContent>
    </Tabs>
  ),
};

export const SegmentedTextOnly: Story = {
  name: "Segmented (text only)",
  render: () => (
    <Tabs defaultValue="a" variant="segmented" size="sm">
      <TabsList ariaLabel="Options">
        <TabsTrigger value="a">Account</TabsTrigger>
        <TabsTrigger value="b">Password</TabsTrigger>
        <TabsTrigger value="c">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Account settings</TabsContent>
      <TabsContent value="b">Password settings</TabsContent>
      <TabsContent value="c">Notification settings</TabsContent>
    </Tabs>
  ),
};

export const ContentAnimation: Story = {
  render: () => (
    <Tabs defaultValue="overview" contentAnimation="fade-slide" indicatorWidth={2}>
      <TabsList ariaLabel="Dashboard sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p style={{ margin: 0 }}>Key metrics and recent activity.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p style={{ margin: 0 }}>Charts and conversion data.</p>
      </TabsContent>
      <TabsContent value="reports">
        <p style={{ margin: 0 }}>Scheduled and exported reports.</p>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Radix-style manual activation: Arrow keys move focus only; Enter or Space activates the focused tab.
 * @see https://ui.shadcn.com/docs/components/radix/tabs
 */
export const ManualActivation: Story = {
  render: () => (
    <Tabs defaultValue="a" activationMode="manual">
      <TabsList ariaLabel="Manual activation demo">
        <TabsTrigger value="a">Home</TabsTrigger>
        <TabsTrigger value="b">Profile</TabsTrigger>
        <TabsTrigger value="c">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Arrow keys move focus only; press Enter or Space to activate.</TabsContent>
      <TabsContent value="b">Profile panel</TabsContent>
      <TabsContent value="c">Settings panel</TabsContent>
    </Tabs>
  ),
};
