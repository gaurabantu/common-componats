import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Button from "../../atoms/Button";
import { Stepper, StepperStep } from "./index";
import type { StepperTrackMode } from "./Stepper.types";

const meta: Meta<typeof Stepper> = {
  title: "Design System/Molecules/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  subcomponents: { StepperStep },
  parameters: {
    docs: {
      description: {
        component:
          "Wizard-style steps and track modes. For custom circle content (`icon`, `markerText`), open the sibling entry **Stepper · Icons** in the sidebar (same Molecules folder).",
      },
    },
  },
};

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

export const ContinuousProgress: Story = {
  name: "Continuous track (default)",
  render: function ContinuousDemo() {
    const [step, setStep] = useState(1);
    return (
      <div style={storySurface}>
        <p style={{ margin: "0 0 var(--space-3, 24px)", fontSize: 14, color: "var(--color-text-secondary)" }}>
          Track runs through the center of each step; green fill shows completion (overridable with{" "}
          <code style={{ fontSize: 12 }}>progressValue</code>).
        </p>
        <Stepper value={step} onValueChange={setStep} trackMode="continuous" ariaLabel="Checkout">
          <StepperStep label="Cart" description="Review items" />
          <StepperStep label="Shipping" description="Address" />
          <StepperStep label="Payment" />
          <StepperStep label="Review" description="Confirm" />
        </Stepper>
        <p style={{ marginTop: 24, marginBottom: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>
          Step {step + 1} of 4 · index <code style={{ fontSize: 12 }}>{step}</code>
        </p>
      </div>
    );
  },
};

export const SegmentOnly: Story = {
  name: "Segments (no % bar)",
  render: () => (
    <div style={storySurface}>
      <Stepper defaultValue={2} trackMode="segments" ariaLabel="Segments only">
        <StepperStep label="Draft" />
        <StepperStep label="Review" />
        <StepperStep label="Publish" />
      </Stepper>
    </div>
  ),
};

export const NeutralTrack: Story = {
  name: "Neutral gaps (no fill)",
  render: () => (
    <div style={storySurface}>
      <Stepper defaultValue={1} trackMode="none" ariaLabel="Neutral">
        <StepperStep label="One" />
        <StepperStep label="Two" />
        <StepperStep label="Three" />
      </Stepper>
    </div>
  ),
};

export const CustomProgress: Story = {
  name: "Custom progress %",
  render: () => (
    <div style={storySurface}>
      <Stepper value={2} trackMode="continuous" progressValue={33} ariaLabel="Custom 33%">
        <StepperStep label="A" />
        <StepperStep label="B" />
        <StepperStep label="C" />
        <StepperStep label="D" />
      </Stepper>
      <p style={{ marginTop: 16, marginBottom: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>
        Active step is index 2, but <code style={{ fontSize: 12 }}>progressValue=33</code> drives the bar only.
      </p>
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div style={storySurface}>
      <Stepper defaultValue={0} size="sm" trackMode="continuous" ariaLabel="Compact">
        <StepperStep label="One" />
        <StepperStep label="Two" />
        <StepperStep label="Three" />
      </Stepper>
    </div>
  ),
};

export const ScrollableManySteps: Story = {
  render: () => (
    <div style={{ ...storySurface, maxWidth: "100%" }}>
      <Stepper defaultValue={2} scrollable trackMode="continuous" ariaLabel="Many steps">
        <StepperStep label="Start" />
        <StepperStep label="Details" />
        <StepperStep label="Verify" />
        <StepperStep label="Docs" />
        <StepperStep label="Sign" />
        <StepperStep label="Submit" />
        <StepperStep label="Done" />
      </Stepper>
    </div>
  ),
};

export const CompareTrackModes: Story = {
  name: "Compare track modes (continuous vs segments)",
  render: function CompareDemo() {
    const modes: StepperTrackMode[] = ["continuous", "segments"];
    const [mode, setMode] = useState<StepperTrackMode>("continuous");
    return (
      <div style={storySurface}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {modes.map((m) => (
            <Button
              key={m}
              type="button"
              variant={mode === m ? "primary" : "secondary"}
              onClick={() => setMode(m)}
            >
              {m}
            </Button>
          ))}
        </div>
        <Stepper defaultValue={1} trackMode={mode} ariaLabel={`Mode ${mode}`}>
          <StepperStep label="Design" />
          <StepperStep label="Build" />
          <StepperStep label="Ship" />
        </Stepper>
      </div>
    );
  },
};
