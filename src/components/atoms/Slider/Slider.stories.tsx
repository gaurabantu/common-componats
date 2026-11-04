import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Slider from "./index";

const meta: Meta<typeof Slider> = {
  title: "Design System/Atoms/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    showMinMax: { control: "boolean" },
    size: { control: "radio", options: ["sm", "md"] },
    label: { control: "text" },
    ariaLabel: { control: "text" },
  },
  decorators: [(S) => <div style={{ maxWidth: 360 }}><S /></div>],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  args: { label: "Rule priority", min: 1, max: 10, step: 1, defaultValue: 5, showValue: true, showMinMax: true },
};

export const Controlled: Story = {
  render: () => {
    const [v, setV] = useState(40);
    return (
      <Slider
        label="Opacity"
        value={v}
        onValueChange={setV}
        showValue
        valueFormatter={(n) => `${n}%`}
      />
    );
  },
};

/** Icon-only / unlabeled contexts: pass `ariaLabel`. */
export const AriaLabelOnly: Story = {
  args: { ariaLabel: "Zoom", min: 50, max: 200, step: 10, defaultValue: 100, size: "sm" },
};

/** Two thumbs: `range` with `[low, high]`. */
export const Range: Story = {
  render: () => {
    const [v, setV] = useState<[number, number]>([20000, 80000]);
    return (
      <Slider
        range
        label="Amount (AED)"
        min={0}
        max={100000}
        step={1000}
        value={v}
        onValueChange={setV}
        showValue
        showMinMax
        valueFormatter={(n) => n.toLocaleString()}
      />
    );
  },
};

export const Disabled: Story = {
  args: { label: "Locked", defaultValue: 30, disabled: true, showValue: true },
};
