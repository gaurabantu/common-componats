import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Avtar from "./index";

const meta: Meta<typeof Avtar> = {
  title: "Design System/Atoms/Avatar",
  component: Avtar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "number", min: 24, max: 96 } },
    statusPosition: { control: "select", options: ["top-left", "top-right", "bottom-left", "bottom-right"] },
  },
};

export default meta;

type Story = StoryObj<typeof Avtar>;

export const Placeholder: Story = {
  args: {
    alt: "Avatar",
    size: 40,
    status: "none",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avtar size={24} status="none" />
      <Avtar size={40} status="none" />
      <Avtar size={56} status="none" />
      <Avtar size={72} status="none" />
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    src: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    alt: "User",
    size: 48,
  },
};

export const WithInitials: Story = {
  args: {
    name: "Gaurab Kumar",
    size: 56,
    backgroundColor: "var(--color-accent-lavender-10)",
    textColor: "var(--color-brand-link, #002475)",
    status: "online",
  },
};

export const Rounded: Story = {
  args: {
    name: "UI Library",
    size: 56,
    shape: "rounded",
    rounded: "5",
    bordered: true,
    status: "away",
  },
};

export const CustomBackgroundColor: Story = {
  args: {
    name: "Design System",
    size: 56,
    color: "#DBEAFE",
    textColor: "#1D4ED8",
    status: "online",
  },
};
