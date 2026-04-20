import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Badge, { Chip, Tag } from "./index";

const meta: Meta<typeof Badge> = {
  title: "Design System/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "danger", "info"],
    },
    tone: { control: "radio", options: ["soft", "solid", "outline"] },
    shape: { control: "radio", options: ["rounded", "pill"] },
    size: { control: "radio", options: ["sm", "md"] },
    elevated: { control: "boolean" },
    dot: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Label",
    variant: "neutral",
    tone: "soft",
    shape: "rounded",
    size: "sm",
  },
};

export const ChipPill: Story = {
  render: (args) => <Chip {...args} shape="pill" tone="soft" variant="primary" children="Chip" />,
};

export const TagRounded: Story = {
  render: (args) => <Tag {...args} shape="rounded" variant="success" tone="outline" children="Tag" />,
};

export const WithDot: Story = {
  args: {
    children: "Live",
    dot: true,
    variant: "danger",
    tone: "soft",
    shape: "pill",
    size: "md",
  },
};

const DismissibleDemo = () => {
  const [show, setShow] = useState(true);
  if (!show) {
    return (
      <button type="button" onClick={() => setShow(true)} style={{ padding: 8 }}>
        Reset
      </button>
    );
  }
  return (
    <Badge variant="neutral" tone="soft" shape="pill" onDismiss={() => setShow(false)} dismissLabel="Remove filter">
      Filter
    </Badge>
  );
};

export const Dismissible: Story = {
  render: () => <DismissibleDemo />,
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(["neutral", "primary", "success", "warning", "danger", "info"] as const).map((v) => (
          <Badge key={v} variant={v} tone="soft" shape="rounded" size="md">
            {v}
          </Badge>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(["neutral", "primary", "success", "warning", "danger", "info"] as const).map((v) => (
          <Badge key={`${v}-o`} variant={v} tone="outline" shape="pill" size="sm">
            {v}
          </Badge>
        ))}
      </div>
    </div>
  ),
};
