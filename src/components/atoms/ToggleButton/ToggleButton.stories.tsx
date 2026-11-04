import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ToggleButton from "./index";

const meta: Meta<typeof ToggleButton> = {
  title: "Design System/Atoms/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
  argTypes: {
    pressed: { control: "boolean" },
    defaultPressed: { control: "boolean" },
    size: { control: "radio", options: ["xxs", "xs", "sm", "md", "lg"] },
    variant: { control: "radio", options: ["ghost", "outline"] },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" },
    onPressedChange: { control: false },
    icon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

const BoldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 3h5a3 3 0 0 1 0 6H4zM4 9h6a3 3 0 0 1 0 6H4z" />
  </svg>
);

export const Playground: Story = {
  args: { children: "Show totals", size: "sm", variant: "outline", defaultPressed: false },
};

/** Icon-only — `ariaLabel` is required for the accessible name. */
export const IconOnly: Story = {
  args: { icon: <BoldIcon />, ariaLabel: "Bold", size: "sm" },
};

export const Controlled: Story = {
  render: (args) => {
    const [on, setOn] = useState(false);
    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <ToggleButton {...args} pressed={on} onPressedChange={setOn} icon={<BoldIcon />} ariaLabel="Bold" />
        <span style={{ fontSize: "var(--text-secondary-size)" }}>pressed: {String(on)}</span>
      </div>
    );
  },
};

/** Same height tiers as `Button`. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {(["xxs", "xs", "sm", "md", "lg"] as const).map((s) => (
        <ToggleButton key={s} size={s} variant="outline" defaultPressed={s === "sm"}>
          {s}
        </ToggleButton>
      ))}
    </div>
  ),
};
