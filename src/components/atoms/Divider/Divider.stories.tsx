import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Divider from "./index";

const meta: Meta<typeof Divider> = {
  title: "Design System/Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical", "row", "column"],
      description: "Row = horizontal line, Column = vertical line",
    },
    variant: { control: "select", options: ["solid", "dashed", "dotted"] },
    align: { control: "select", options: ["start", "center", "end"] },
    textPosition: {
      control: "select",
      options: ["above", "center", "below"],
      description: "When content present: line above, both sides, or below text",
    },
    color: {
      control: "color",
      description: "Line color (default: border gray)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    variant: "solid",
  },
};

export const Row: Story = {
  args: {
    orientation: "row",
    variant: "solid",
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, height: 32 }}>
      <span>Left</span>
      <Divider orientation="vertical" length="24px" />
      <span>Right</span>
    </div>
  ),
};

export const Column: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, height: 32 }}>
      <span>Left</span>
      <Divider orientation="column" length="24px" />
      <span>Right</span>
    </div>
  ),
};

export const WithContent: Story = {
  args: {
    children: "OR",
    align: "center",
    textPosition: "center",
  },
};

export const TextAbove: Story = {
  args: {
    children: "Section Title",
    textPosition: "above",
  },
};

export const TextBelow: Story = {
  args: {
    children: "Footnote",
    textPosition: "below",
  },
};

export const Dashed: Story = {
  args: {
    children: "Section",
    variant: "dashed",
  },
};

export const StartAlignedText: Story = {
  args: {
    children: "Details",
    align: "start",
    variant: "solid",
  },
};
