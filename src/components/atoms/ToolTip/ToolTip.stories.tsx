import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ToolTip from "./index";

const meta: Meta<typeof ToolTip> = {
  title: "Design System/Atoms/ToolTip",
  component: ToolTip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "**Deprecated — use `Tooltip` (Molecules/Tooltip).** `ToolTip` is now a thin wrapper over the canonical `Tooltip`: same props as before (`tooltipText`, `content`, `placement`, `variant`, `zIndex`, …), but the bubble is portalled, flips on collision, stays open while hovered and closes on Escape (WCAG 1.4.13). The trigger is a focusable `span` named by `tooltipText`; `children` replace the icon but must not be interactive (the span is already the focus stop) — wrap a real `Button` in `Tooltip` instead.",
      },
    },
  },
  argTypes: {
    placement: { control: "select", options: ["auto", "top", "bottom", "left", "right"] },
    size: { control: { type: "number", min: 12, max: 32 } },
  },
};

export default meta;

type Story = StoryObj<typeof ToolTip>;

export const Playground: Story = {
  args: {
    tooltipText: "Helpful hint here",
    placement: "auto",
  },
  render: (args) => <ToolTip {...args} />,
};

export const Default: Story = {
  args: {
    tooltipText: "Helpful hint here",
    placement: "auto",
  },
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8 items-center justify-center">
      <ToolTip tooltipText="Top" placement="top" />
      <ToolTip tooltipText="Bottom" placement="bottom" />
      <ToolTip tooltipText="Left" placement="left" />
      <ToolTip tooltipText="Right" placement="right" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-body text-text-primary">Need help?</span>
      <ToolTip tooltipText="Click to learn more about this field." placement="top" />
    </div>
  ),
};

export const LargeIcon: Story = {
  args: {
    tooltipText: "Larger icon",
    size: 24,
    placement: "top",
  },
};

export const CustomTrigger: Story = {
  render: () => (
    <ToolTip
      tooltipText="This tooltip is attached to custom content."
      placement="bottom"
    >
      <span
        style={{
          border: "1px solid var(--color-border-default)",
          background: "var(--color-bg-surface)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-1) var(--space-2)",
        }}
      >
        Hover or focus me
      </span>
    </ToolTip>
  ),
};

export const LightVariant: Story = {
  args: {
    tooltipText: "Readable light tooltip variant",
    placement: "right",
    variant: "light",
  },
};

/** `zIndex` — defaults to `var(--z-tooltip-top, 600)` (above Modal / Drawer / Popover). */
export const CustomZIndex: Story = {
  args: {
    tooltipText: "Rendered at zIndex 12000",
    placement: "top",
    zIndex: 12000,
  },
};
