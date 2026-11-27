import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Rating from "./index";
import { RATING_PRECISIONS, RATING_SIZES } from "./Rating.config";

const Heart = (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M12 20.5s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1Z" />
  </svg>
);

const HeartOutline = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M12 20.5s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1Z" />
  </svg>
);

const meta: Meta<typeof Rating> = {
  title: "Design System/Atoms/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Star rating on native radios: one Tab stop, arrow keys move and select, `name` submits with forms. `precision={0.5}` adds half-star options; `readOnly` renders a single image named \"4 out of 5 stars\". Filled stars pair an amber fill with a `--color-warning-strong` outline so state never depends on fill colour alone; forced-colors mode switches to Highlight / CanvasText. Prefer `size=\"lg\"` for touch-first forms, especially with half precision.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: RATING_SIZES },
    precision: { control: "inline-radio", options: RATING_PRECISIONS },
    max: { control: { type: "number", min: 1, max: 10 } },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    onChange: { action: "change" },
  },
  args: { label: "Rating", defaultValue: 3, max: 5, precision: 1, size: "md", readOnly: false, disabled: false },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(4);
    return (
      <div className="sb-stack">
        <Rating {...args} defaultValue={undefined} value={value} onChange={(v) => setValue(v)} label="Delivery speed" />
        <span aria-live="polite">Selected: {value} / {args.max ?? 5}</span>
      </div>
    );
  },
};

export const HalfPrecision: Story = {
  args: { precision: 0.5, defaultValue: 2.5, size: "lg", label: "Half-star rating" },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 4.3, precision: 0.5, defaultValue: undefined },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-stack">
      {RATING_SIZES.map((size) => (
        <Rating key={size} {...args} size={size} label={`Rating, size ${size}`} />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CustomIcon: Story = {
  args: { icon: Heart, emptyIcon: HeartOutline, label: "Favourite level" },
};
