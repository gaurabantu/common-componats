import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Wizard from "./index";
import type { WizardProps, WizardStep } from "./Wizard.types";
import { FormField } from "../FormField";
import Input from "../../atoms/TextInput";
import Alert from "../Alert";

const meta: Meta<typeof Wizard> = {
  title: "Design System/Molecules/Wizard",
  component: Wizard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Multi-step flow composed from `Stepper` (progress nav), a step panel and a footer with **one** primary action (Next, or Finish on the last step) plus an outlined Back. Each step may `validate()` (sync or async; return `true`, `false` or an error string). A failure shows an assertive danger `Alert` and moves focus to the step heading; every step change also focuses the new heading (\"Step 2 of 4 · Team\"), so keyboard and screen-reader users never lose their place. `linear` (default) keeps upcoming steps locked in the Stepper until reached; `showReview` appends a review step listing every step with an \"Edit\" link. Pass `loading` while `onComplete` is in flight — focus is parked on the heading and \"Submitting…\" is announced. Inactive steps stay mounted (hidden), so uncontrolled fields keep their values.",
      },
    },
  },
  argTypes: {
    linear: { control: "boolean" },
    showReview: { control: "boolean" },
    loading: { control: "boolean" },
    headingLevel: { control: "inline-radio", options: [2, 3, 4] },
    backLabel: { control: "text" },
    nextLabel: { control: "text" },
    finishLabel: { control: "text" },
    reviewTitle: { control: "text" },
    validationTitle: { control: "text" },
    activeStep: { control: false },
    defaultActiveStep: { control: { type: "number", min: 0, max: 3 } },
    steps: { control: false },
    onStepChange: { action: "stepChange" },
    onComplete: { action: "complete" },
  },
  args: {
    linear: true,
    showReview: true,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Wizard>;

function useDemoSteps(): WizardStep[] {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [card, setCard] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return [
    {
      id: "account",
      title: "Account details",
      description: "We use these to sign you in.",
      validate: () => {
        setTouched((t) => ({ ...t, name: true, email: true }));
        if (!name.trim()) return "Enter your full name.";
        if (!emailOk) return "Enter a valid email address, like name@company.com.";
        return true;
      },
      summary: name || email ? `${name || "—"} · ${email || "—"}` : "Not filled in",
      content: (
        <>
          <FormField label="Full name" required error={touched.name && !name.trim() ? "Enter your full name." : undefined}>
            <Input value={name} onChange={(v: string) => setName(v)} placeholder="Jane Doe" />
          </FormField>
          <FormField
            label="Work email"
            required
            error={touched.email && !emailOk ? "Enter a valid email address." : undefined}
          >
            <Input type="email" value={email} onChange={(v: string) => setEmail(v)} placeholder="name@company.com" />
          </FormField>
        </>
      ),
    },
    {
      id: "team",
      title: "Team",
      optional: true,
      description: "Invite people later if you prefer.",
      summary: team || "Skipped",
      content: (
        <FormField label="Team name" optional hint="Shown on invoices and invitations.">
          <Input value={team} onChange={(v: string) => setTeam(v)} placeholder="Finance" />
        </FormField>
      ),
    },
    {
      id: "billing",
      title: "Billing",
      description: "Checked against the server before you continue.",
      validate: () =>
        new Promise<boolean | string>((resolve) =>
          setTimeout(() => resolve(/^\d{4}$/.test(card) ? true : "Enter the last 4 digits of the card."), 600),
        ),
      summary: card ? `Card ending ${card}` : "Not filled in",
      content: (
        <FormField label="Card — last 4 digits" required hint="Async validation (600 ms).">
          <Input value={card} onChange={(v: string) => setCard(v)} placeholder="4242" maxLength={4} />
        </FormField>
      ),
    },
  ];
}

function Demo(args: Partial<WizardProps>) {
  const steps = useDemoSteps();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="sb-stack" style={{ maxWidth: 720 }}>
      {done ? (
        <Alert variant="success" live="polite" title="Workspace created" onDismiss={() => setDone(false)}>
          Everything is set up.
        </Alert>
      ) : null}
      <Wizard
        {...args}
        steps={steps}
        loading={args.loading || loading}
        onComplete={() => {
          args.onComplete?.();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setDone(true);
          }, 1200);
        }}
      />
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <Demo {...args} />,
};

export const WithoutReview: Story = {
  args: { showReview: false },
  render: (args) => <Demo {...args} />,
};

export const NonLinear: Story = {
  args: { linear: false },
  render: (args) => <Demo {...args} />,
};

/** Lives in its own component so the JSX Storybook serialises for the source panel only holds args, not `steps`. */
function ControlledDemo(args: Partial<WizardProps>) {
  const steps = useDemoSteps();
  const [step, setStep] = useState(0);
  return (
    <div className="sb-stack" style={{ maxWidth: 720 }}>
      <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>Parent state: step index {step}</p>
      <Wizard
        {...args}
        steps={steps}
        activeStep={step}
        onStepChange={(i) => {
          args.onStepChange?.(i);
          setStep(i);
        }}
      />
    </div>
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledDemo {...args} />,
};

/** Lives in its own component (only args reach the source serializer). `loading` is NOT passed, so the wizard
 * manages the busy state from the Promise returned by `onComplete`. */
function AsyncCompleteDemo({ loading: _ignored, ...args }: Partial<WizardProps>) {
  const steps = useDemoSteps();
  const [done, setDone] = useState(false);
  return (
    <div className="sb-stack" style={{ maxWidth: 720 }}>
      {done ? (
        <Alert variant="success" live="polite" title="Workspace created" onDismiss={() => setDone(false)}>
          Saved after the Promise resolved.
        </Alert>
      ) : null}
      <Wizard
        {...args}
        steps={steps}
        onComplete={() => {
          args.onComplete?.();
          return new Promise<void>((resolve) => setTimeout(resolve, 1500)).then(() => setDone(true));
        }}
      />
    </div>
  );
}

export const AsyncComplete: Story = {
  args: { defaultActiveStep: 0 },
  render: (args) => <AsyncCompleteDemo {...args} />,
};

export const FinishLoading: Story = {
  args: { loading: true, defaultActiveStep: 3 },
  render: (args) => <Demo {...args} />,
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => <Demo {...args} />,
};
