import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import IconBox from "./index";
import { ICON_BOX_SIZES, ICON_BOX_TONES } from "./IconBox.config";

const LayersIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

const meta: Meta<typeof IconBox> = {
  title: "Design System/Atoms/IconBox",
  component: IconBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Fixed-size container for a leading icon — list rows, option tiles, stat cards. Decorative by default; pass `label` when the icon carries meaning on its own.",
      },
    },
  },
  argTypes: {
    tone: { control: "select", options: ICON_BOX_TONES },
    size: { control: "inline-radio", options: ICON_BOX_SIZES },
    shape: { control: "inline-radio", options: ["rounded", "circle", "square"] },
  },
  args: { children: LayersIcon, tone: "neutral", size: "md", shape: "rounded" },
};

export default meta;
type Story = StoryObj<typeof IconBox>;

export const Playground: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div className="sb-inline">
      {ICON_BOX_TONES.map((tone) => (
        <div key={tone} className="sb-swatch">
          <IconBox {...args} tone={tone} />
          <span className="sb-swatch-label">{tone}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-inline">
      {ICON_BOX_SIZES.map((size) => (
        <div key={size} className="sb-swatch">
          <IconBox {...args} size={size} tone="strong" />
          <span className="sb-swatch-label">{size}</span>
        </div>
      ))}
    </div>
  ),
};
