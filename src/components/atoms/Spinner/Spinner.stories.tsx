import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./index";
import {
  SPINNER_SIZES,
  SPINNER_SPEEDS,
  SPINNER_THICKNESSES,
  SPINNER_TONES,
  SPINNER_VARIANTS,
} from "./Spinner.config";

const meta: Meta<typeof Spinner> = {
  title: "Design System/Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Indeterminate loading indicator. By default it is a `role=\"status\"` region that announces `label` (\"Loading\"). Use `decorative` when the spinner sits inside a control that already announces its busy state, such as a loading Button. `variant` switches between `ring`, `dots` and `bars`; `thickness` and `speed` tune the weight and cycle; `delay` (ms) renders nothing until it elapses so fast requests never flash a spinner. Under `prefers-reduced-motion` nothing rotates or scales — the indicator pulses slowly instead. Prefer `Skeleton` when the layout of the incoming content is known.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: SPINNER_SIZES },
    tone: { control: "inline-radio", options: SPINNER_TONES },
    variant: { control: "inline-radio", options: SPINNER_VARIANTS },
    thickness: { control: "inline-radio", options: SPINNER_THICKNESSES },
    speed: { control: "inline-radio", options: SPINNER_SPEEDS },
    delay: { control: { type: "number", min: 0, step: 100 } },
    label: { control: "text" },
    decorative: { control: "boolean" },
  },
  args: { size: "md", tone: "primary", variant: "ring", speed: "normal", delay: 0, label: "Loading", decorative: false },
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

export const Variants: Story = {
  render: (args) => (
    <div className="sb-inline">
      {SPINNER_VARIANTS.map((variant) => (
        <div key={variant} className="sb-swatch">
          <Spinner {...args} size="lg" variant={variant} />
          <span className="sb-swatch-label">{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const Thickness: Story = {
  render: (args) => (
    <div className="sb-stack">
      {SPINNER_VARIANTS.map((variant) => (
        <div key={variant} className="sb-inline">
          {SPINNER_THICKNESSES.map((thickness) => (
            <div key={thickness} className="sb-swatch">
              <Spinner {...args} size="xl" variant={variant} thickness={thickness} />
              <span className="sb-swatch-label">
                {variant} · {thickness}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Speeds: Story = {
  render: (args) => (
    <div className="sb-inline">
      {SPINNER_SPEEDS.map((speed) => (
        <div key={speed} className="sb-swatch">
          <Spinner {...args} size="lg" speed={speed} />
          <span className="sb-swatch-label">{speed}</span>
        </div>
      ))}
    </div>
  ),
};

export const Delayed: Story = {
  args: { delay: 600 },
  parameters: {
    docs: {
      description: {
        story:
          "Nothing renders for the first 600 ms (re-mount the story to see it again). Use 300–800 ms for requests that usually resolve fast so users never see a one-frame flash.",
      },
    },
  },
};
