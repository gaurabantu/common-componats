import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ToolTip from "./index";

const meta: Meta<typeof ToolTip> = {
  title: "Design System/Atoms/ToolTip",
  component: ToolTip,
  tags: ["autodocs"],
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
    size: { control: { type: "number", min: 12, max: 32 } },
  },
};

export default meta;

type Story = StoryObj<typeof ToolTip>;

export const Default: Story = {
  args: {
    tooltipText: "Helpful hint here",
    placement: "top",
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
      <button
        type="button"
        style={{
          border: "1px solid rgba(153,153,153,0.35)",
          background: "var(--color-bg-surface, #FFFFFF)",
          borderRadius: 8,
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Hover me
      </button>
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
