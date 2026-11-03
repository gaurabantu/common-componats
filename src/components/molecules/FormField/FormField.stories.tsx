import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormField, useFormField } from "./index";
import Input from "../../atoms/TextInput";
import TextArea from "../../atoms/TextArea";
import Button from "../../atoms/Button";
import { Combobox } from "../Combobox";

const meta: Meta<typeof FormField> = {
  title: "Design System/Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Wraps **one** form control with a label, hint, error and optional counter, and wires the ARIA for you: the child receives `id`, `aria-describedby` (hint · error · counter), `aria-invalid` and `aria-required` unless it already sets them. `required` shows a visible `*` plus screen-reader \"required\"; `optional` shows a muted marker. Errors present on first render are not announced; errors that appear or change later use `role=\"alert\"`. `layout=\"horizontal\"` puts the label in a column that collapses to stacked at ≤ 640px. Supported children: `Input`, `TextArea`, `Select`, `Combobox` (wires itself via `useFormField()`), native controls, and custom controls that read `useFormField()`; in development a console warning flags children the label cannot reach. Pass the control without its own `label` prop — FormField owns the label.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    optional: { control: "boolean" },
    layout: { control: "inline-radio", options: ["vertical", "horizontal"] },
    htmlFor: { control: "text" },
    counter: { control: "object" },
  },
  args: {
    label: "Work email",
    hint: "We send invoices to this address.",
    required: false,
    optional: false,
    layout: "vertical",
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-page" style={{ maxWidth: "32rem" }}>
      <FormField {...args}>
        <Input type="email" placeholder="name@company.com" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  args: { label: "Company name", required: true, hint: undefined },
  render: Playground.render,
};

export const Optional: Story = {
  args: { label: "Phone", optional: true, hint: "Only used for delivery issues." },
  render: Playground.render,
};

export const WithError: Story = {
  args: { label: "Work email", required: true, error: "Enter an email address like name@company.com" },
  render: Playground.render,
};

/** Error appears after interaction → announced once via `role="alert"`. */
export const ValidateOnSubmit: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState("");
      const [error, setError] = useState<string | undefined>();
      return (
        <form
          className="sb-page sb-stack"
          style={{ maxWidth: "32rem" }}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setError(/.+@.+\..+/.test(value) ? undefined : "Enter an email address like name@company.com");
          }}
        >
          <FormField label="Work email" required error={error} hint="We send invoices to this address.">
            <Input type="email" value={value} onChange={(v: string) => setValue(v)} />
          </FormField>
          <div>
            <Button type="submit" variant="primary" size="md">
              Save
            </Button>
          </div>
        </form>
      );
    }
    return <Demo />;
  },
};

export const WithCounter: Story = {
  render: () => {
    function Demo() {
      const [bio, setBio] = useState("Finance lead for the EMEA region.");
      return (
        <div className="sb-page" style={{ maxWidth: "32rem" }}>
          <FormField label="Short bio" optional hint="Shown on your public profile." counter={{ value: bio.length, max: 80 }}>
            <TextArea value={bio} onChange={(v: string) => setBio(v)} rows={3} maxLength={120} />
          </FormField>
        </div>
      );
    }
    return <Demo />;
  },
};

/** Label column on desktop; resize to ≤ 640px (mobile viewport) to see it stack. */
export const HorizontalLayout: Story = {
  render: () => (
    <div className="sb-page sb-stack" style={{ maxWidth: "48rem" }}>
      <FormField label="Display name" layout="horizontal" required>
        <Input placeholder="Jane Doe" />
      </FormField>
      <FormField label="Team" layout="horizontal" optional hint="Leave blank to use your default team.">
        <Input placeholder="Finance" />
      </FormField>
      <FormField label="Cost centre" layout="horizontal" error="Cost centre CC-104 is closed.">
        <Input defaultValue="CC-104" />
      </FormField>
    </div>
  ),
};

/** A custom control reads the ids from `useFormField()` instead of relying on injected props. */
export const CustomControl: Story = {
  render: () => {
    function NotifyToggle() {
      const field = useFormField();
      const [on, setOn] = useState(true);
      return (
        <Button
          id={field?.id}
          role="switch"
          aria-checked={on}
          aria-describedby={field?.describedBy}
          variant={on ? "primary" : "outlineSecondary"}
          size="md"
          onClick={() => setOn((v) => !v)}
        >
          {on ? "On" : "Off"}
        </Button>
      );
    }
    return (
      <div className="sb-page" style={{ maxWidth: "32rem" }}>
        <FormField label="Email me when an invoice is overdue" hint="Sent at most once a day.">
          <NotifyToggle />
        </FormField>
      </div>
    );
  },
};

/** `Combobox` reads `useFormField()` — label, hint, error and required land on its `role="combobox"` trigger. */
export const WithCombobox: Story = {
  render: () => (
    <div className="sb-page" style={{ maxWidth: "32rem" }}>
      <FormField label="Data region" required hint="Where your workspace data is stored." error="Pick a region to continue">
        <Combobox
          options={[
            { value: "eu", label: "Europe (Frankfurt)" },
            { value: "us", label: "United States (Virginia)" },
            { value: "in", label: "India (Mumbai)" },
          ]}
        />
      </FormField>
    </div>
  ),
};
