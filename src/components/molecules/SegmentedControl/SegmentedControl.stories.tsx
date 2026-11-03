import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SegmentedControl from "./index";
import type { SegmentedControlOption } from "./SegmentedControl.types";

const RANGE: SegmentedControlOption[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const svg = (d: string) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VIEWS: SegmentedControlOption[] = [
  { value: "list", label: "List", icon: svg("M3 4h10M3 8h10M3 12h10") },
  { value: "grid", label: "Grid", icon: svg("M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z") },
  { value: "board", label: "Board", icon: svg("M3 3h3v10H3zM7.5 3h3v7h-3zM12 3h1.5v5H12z") },
];

const meta: Meta<typeof SegmentedControl> = {
  title: "Design System/Molecules/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Single-choice toggle group for switching a view or filter **in place** (date range, list / grid). It is an APG radio group: `role=\"radiogroup\"` with `role=\"radio\"` + `aria-checked`, one tab stop, arrow keys move **and** select (Home / End jump to the ends; disabled options are skipped; horizontal arrows flip in RTL). `ariaLabel` is required. Segments are 36px (`sm`) or 40px (`md`) tall — 44px on touch screens. The sliding indicator does not animate under `prefers-reduced-motion`; in forced-colours mode the selection is drawn with `Highlight`. Use `Tabs` instead when each choice reveals a different panel, and `RadioGroup` inside forms with more than ~5 options.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" },
    value: { control: "select", options: [undefined, ...RANGE.map((o) => o.value)] },
    defaultValue: { control: false },
    options: { control: "object" },
    onValueChange: { action: "valueChange" },
  },
  args: {
    options: RANGE,
    defaultValue: "week",
    ariaLabel: "Date range",
    size: "md",
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-stack">
      <SegmentedControl {...args} size="sm" ariaLabel="Date range (small)" />
      <SegmentedControl {...args} size="md" ariaLabel="Date range (medium)" />
    </div>
  ),
};

export const WithIcons: Story = {
  args: { options: VIEWS, defaultValue: "grid", ariaLabel: "View" },
};

/** Icon-only segments: the icon is the `label`, so each option must carry an `ariaLabel` (dev warning otherwise). */
export const IconOnly: Story = {
  args: {
    ariaLabel: "Layout",
    defaultValue: "grid",
    options: [
      { value: "list", label: svg("M3 4h10M3 8h10M3 12h10"), ariaLabel: "List view" },
      { value: "grid", label: svg("M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z"), ariaLabel: "Grid view" },
      { value: "board", label: svg("M3 3h3v10H3zM7.5 3h3v7h-3zM12 3h1.5v5H12z"), ariaLabel: "Board view" },
    ],
  },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <SegmentedControl {...args} />
    </div>
  ),
};

export const DisabledOption: Story = {
  args: {
    options: [RANGE[0], { ...RANGE[1], disabled: true }, RANGE[2], RANGE[3]],
    defaultValue: "day",
  },
};

function ControlledDemo(args: React.ComponentProps<typeof SegmentedControl>) {
  const [value, setValue] = useState("month");
  return (
    <div className="sb-stack">
      <SegmentedControl
        {...args}
        value={value}
        onValueChange={(v) => {
          args.onValueChange?.(v);
          setValue(v);
        }}
      />
      <p style={{ margin: 0, color: "var(--color-text-secondary)" }} aria-live="polite">
        Showing: {value}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledDemo {...args} />,
};

export const NarrowViewport: Story = {
  args: { fullWidth: true, options: [...RANGE, { value: "custom", label: "Custom range" }] },
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div style={{ maxWidth: 343 }}>
      <SegmentedControl {...args} />
    </div>
  ),
};
