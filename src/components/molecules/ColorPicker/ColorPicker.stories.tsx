import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ColorPicker from "./index";

const meta: Meta<typeof ColorPicker> = {
  title: "Design System/Molecules/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    showHexInput: { control: "boolean" },
    showNativePicker: { control: "boolean" },
    resolveTokens: { control: "boolean" },
    swatchSize: { control: "radio", options: ["sm", "md"] },
    columns: { control: "number" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    palette: { control: false },
    onChange: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

/** Default design-token palette, hex field. Value is always `#rrggbb`. */
export const Playground: Story = {
  args: { label: "Series colour", defaultValue: "#1a6bb5", showHexInput: true },
};

export const Controlled: Story = {
  render: (args) => {
    const [hex, setHex] = useState("#28a745");
    return (
      <div style={{ display: "grid", gap: 8 }}>
        <ColorPicker {...args} label="Fill" value={hex} onChange={setHex} showNativePicker />
        <code style={{ fontSize: "var(--text-small-size)" }}>{hex}</code>
      </div>
    );
  },
};

/** Custom palette (strings or `{ value, label }`), 6 per row, compact swatches. */
export const CustomPalette: Story = {
  args: {
    ariaLabel: "Report theme colour",
    swatchSize: "sm",
    columns: 6,
    palette: [
      { value: "#003f5c", label: "Deep blue" },
      { value: "#2f4b7c", label: "Indigo" },
      { value: "#665191", label: "Purple" },
      { value: "#a05195", label: "Magenta" },
      { value: "#d45087", label: "Pink" },
      { value: "#f95d6a", label: "Coral" },
      "#ff7c43",
      "#ffa600",
    ],
  },
};

/** Swatches only (no hex field). */
export const SwatchesOnly: Story = {
  args: { ariaLabel: "Highlight", showHexInput: false, defaultValue: "#fff6dd" },
};
