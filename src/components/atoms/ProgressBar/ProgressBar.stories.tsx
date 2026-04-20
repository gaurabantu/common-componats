import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar from "./index";

const meta: Meta<typeof ProgressBar> = {
  title: "Design System/Atoms/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["line", "circle"] },
    value: { control: { type: "number", min: 0, max: 100 } },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    animation: { control: "select", options: ["none", "smooth", "pulse", "stripes-flow"] },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Line: Story = {
  args: {
    type: "line",
    value: 60,
    showLabel: false,
    showValue: true,
  },
};

export const LineWithLabel: Story = {
  args: {
    type: "line",
    value: 75,
    label: "Progress",
    animation: "smooth",
  },
};

export const GradientLine: Story = {
  args: {
    type: "line",
    value: 68,
    label: "Upload progress",
    gradient: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
    animation: "stripes-flow",
    striped: true,
  },
};

export const Circle: Story = {
  args: {
    type: "circle",
    value: 70,
    size: "md",
    label: "Profile",
  },
};

export const GradientCircle: Story = {
  args: {
    type: "circle",
    value: 84,
    size: "lg",
    label: "Completion",
    gradient: "enabled",
    animation: "pulse",
  },
};

export const CircleSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <ProgressBar type="circle" value={33} size="xs" />
      <ProgressBar type="circle" value={66} size="sm" />
      <ProgressBar type="circle" value={100} size="md" />
      <ProgressBar type="circle" value={50} size="lg" />
    </div>
  ),
};
