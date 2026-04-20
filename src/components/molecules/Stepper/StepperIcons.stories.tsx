import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Stepper, StepperStep } from "./index";

/**
 * Dedicated entry in the sidebar for **icon / custom marker** examples.
 * (Props `icon`, `markerText`, `showCheckWhenComplete` live on **StepperStep**, not on Stepper.)
 */
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const meta = {
  title: "Design System/Molecules/Stepper · Icons",
  component: Stepper,
  tags: ["autodocs"],
  subcomponents: { StepperStep },
  parameters: {
    docs: {
      description: {
        component:
          "Custom **circle** content: pass `icon` or `markerText` to **StepperStep**. Completed steps show a check by default; use `showCheckWhenComplete={false}` to keep an icon after the step is done.",
      },
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof Stepper>;

const storySurface = {
  padding: "var(--space-3, 24px)",
  maxWidth: 800,
  margin: "0 auto",
  background: "var(--color-bg-surface, #ffffff)",
  borderRadius: "var(--radius-md, 8px)",
  border: "1px solid var(--color-border-default, #999999)",
  boxShadow: "var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.06))",
} as const;

export const PreviewEyeTwoSteps: Story = {
  name: "Preview eye (2 steps)",
  render: function PreviewEyeDemo() {
    const [step, setStep] = useState(0);
    return (
      <div style={storySurface}>
        <p style={{ margin: "0 0 var(--space-3, 24px)", fontSize: 14, color: "var(--color-text-secondary)" }}>
          First step uses the default number in the circle; the Preview step uses <code style={{ fontSize: 12 }}>icon=</code>{" "}
          with an eye SVG. Swap in any icon (e.g. from your <code style={{ fontSize: 12 }}>Icon</code> component).
        </p>
        <Stepper value={step} onValueChange={setStep} trackMode="continuous" ariaLabel="Edit and preview">
          <StepperStep label="Edit" description="Make changes" />
          <StepperStep label="Preview" description="Review before publish" icon={<EyeIcon />} />
        </Stepper>
        <p style={{ marginTop: 24, marginBottom: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>
          Active: {step === 0 ? "Edit" : "Preview"}
        </p>
      </div>
    );
  },
};

export const MarkerTextAndIcon: Story = {
  name: "markerText + icon + keep icon when complete",
  render: () => (
    <div style={storySurface}>
      <p style={{ margin: "0 0 var(--space-3, 24px)", fontSize: 14, color: "var(--color-text-secondary)" }}>
        Review uses <code style={{ fontSize: 12 }}>markerText=&quot;Rv&quot;</code>. Preview uses the eye and{" "}
        <code style={{ fontSize: 12 }}>showCheckWhenComplete=&#123;false&#125;</code> so the icon stays when that step is
        complete (flow is on the last step).
      </p>
      <Stepper defaultValue={3} appearance="emphasized" trackMode="continuous" ariaLabel="Emphasized">
        <StepperStep label="Draft" />
        <StepperStep label="Review" markerText="Rv" />
        <StepperStep label="Preview" icon={<EyeIcon />} showCheckWhenComplete={false} />
        <StepperStep label="Publish" />
      </Stepper>
    </div>
  ),
};
