import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import StatCard from "./index";
import Grid from "../Grid";

const CubeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round">
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </svg>
);

const meta: Meta<typeof StatCard> = {
  title: "Design System/Molecules/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "KPI tile built on `Card`. Trend direction is conveyed by arrow + screen-reader text, never colour alone. Use `delta.invert` when a decrease is good.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["bordered", "elevated"] },
    size: { control: "inline-radio", options: ["default", "sm"] },
    iconTone: { control: "select", options: ["neutral", "strong", "primary", "success", "warning", "danger", "info"] },
  },
  args: {
    label: "Components",
    value: 36,
    icon: CubeIcon,
    description: "Atoms, molecules, shell and charts",
    delta: { value: "+4", trend: "up", label: "this release" },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <StatCard {...args} />
    </div>
  ),
};

export const KpiRow: Story = {
  render: () => (
    <Grid autoFit minItemWidth={200} gap="var(--space-2)">
      <StatCard label="Components" value={36} icon={CubeIcon} delta={{ value: "+4", trend: "up", label: "this release" }} />
      <StatCard label="Design tokens" value="270" unit="+" icon={CubeIcon} delta={{ value: "0", trend: "neutral", label: "breaking changes" }} />
      <StatCard label="Bundle (gzip)" value="48" unit="KB" icon={CubeIcon} delta={{ value: "-6%", trend: "down", invert: true, label: "vs 0.0.1" }} />
      <StatCard label="Open a11y issues" value={2} icon={CubeIcon} iconTone="warning" delta={{ value: "+1", trend: "up", invert: true, label: "this week" }} />
    </Grid>
  ),
};
