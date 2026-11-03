import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./index";
import { SPINNER_SIZES, SPINNER_TONES } from "./Spinner.config";

const meta: Meta<typeof Spinner> = {
  title: "Design System/Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Indeterminate loading indicator. By default it is a `role=\"status\"` region that announces `label` (\"Loading\"). Use `decorative` when the spinner sits inside a control that already announces its busy state, such as a loading Button. Under `prefers-reduced-motion` the ring stops rotating and pulses slowly instead. Prefer `Skeleton` when the layout of the incoming content is known.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: SPINNER_SIZES },
    tone: { control: "inline-radio", options: SPINNER_TONES },
    label: { control: "text" },
    decorative: { control: "boolean" },
  },
  args: { size: "md", tone: "primary", label: "Loading", decorative: false },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-inline">
      {SPINNER_SIZES.map((size) => (
        <div key={size} className="sb-swatch">
          <Spinner {...args} size={size} />
          <span className="sb-swatch-label">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div className="sb-inline">
      {SPINNER_TONES.filter((t) => t !== "inverse").map((tone) => (
        <div key={tone} className="sb-swatch">
          <Spinner {...args} tone={tone} />
          <span className="sb-swatch-label">{tone}</span>
        </div>
      ))}
      <div className="sb-swatch">
        <span
          style={{
            display: "inline-flex",
            padding: "var(--space-1)",
            borderRadius: "var(--radius-md)",
            background: "var(--button-primary-default-bg)",
          }}
        >
          <Spinner {...args} tone="inverse" />
        </span>
        <span className="sb-swatch-label">inverse</span>
      </div>
    </div>
  ),
};

export const InlineWithText: Story = {
  render: (args) => (
    <p style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", color: "var(--color-text-secondary)" }}>
      <Spinner {...args} size="xs" tone="current" decorative />
      <span>Fetching latest invoices…</span>
    </p>
  ),
};

export const Decorative: Story = {
  args: { decorative: true },
  parameters: {
    docs: {
      description: {
        story: "Hidden from assistive tech (`aria-hidden`, no role). The parent must expose the busy state itself, e.g. `aria-busy` or a visible \"Saving…\" label.",
      },
    },
  },
};
