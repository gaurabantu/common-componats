import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NumberInput from "./index";
import { FormField } from "../../molecules/FormField";

const meta: Meta<typeof NumberInput> = {
  title: "Design System/Atoms/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Locale-aware numeric field with `role=\"spinbutton\"` semantics (`aria-valuenow / min / max / text`). It is a text input with " +
          "`inputMode=\"decimal\"`: blurred it shows the `Intl.NumberFormat` display (currency, percent, compact, units); focused it shows a plain " +
          "number to edit. Typing accepts the locale's grouping and decimal separators. ArrowUp / ArrowDown step (Shift ×10), PageUp / PageDown ×10, " +
          "Home / End jump to min / max, Enter commits. The − / + steppers repeat while held and are not tab stops (the arrow keys are the keyboard path). " +
          "Percent values are fractions (0.25 → 25%). Works inside `FormField`.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    locale: { control: "select", options: ["en-US", "en-IN", "de-DE", "fr-FR", "de-CH", "ja-JP", "ar-EG"] },
    step: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    precision: { control: "number" },
    showSteppers: { control: "boolean" },
    allowNegative: { control: "boolean" },
    clampOnBlur: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: { control: "text" },
    prefix: { control: "text" },
    suffix: { control: "text" },
    onChange: { action: "change" },
  },
  args: {
    label: "Quantity",
    defaultValue: 4,
    min: 0,
    max: 99,
    step: 1,
    size: "md",
    showSteppers: true,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 280 }}>
      <NumberInput {...args} />
    </div>
  ),
};

export const Formats: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 280 }}>
      <NumberInput label="Price (USD)" locale="en-US" defaultValue={1234.5} step={0.5} min={0} formatOptions={{ style: "currency", currency: "USD" }} />
      <NumberInput label="Preis (EUR, de-DE)" locale="de-DE" defaultValue={1234.5} min={0} formatOptions={{ style: "currency", currency: "EUR" }} />
      <NumberInput label="Discount" locale="en-US" defaultValue={0.15} step={0.01} min={0} max={1} formatOptions={{ style: "percent" }} />
      <NumberInput label="Budget (compact)" locale="en-US" defaultValue={1250000} step={50000} formatOptions={{ notation: "compact" }} />
      <NumberInput label="Weight" defaultValue={12.5} step={0.1} precision={1} suffix="kg" min={0} />
      <NumberInput label="Population (en-IN)" locale="en-IN" defaultValue={12345678} showSteppers={false} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 280 }}>
      <NumberInput label="Small" size="sm" defaultValue={1} />
      <NumberInput label="Medium" size="md" defaultValue={2} />
      <NumberInput label="Large" size="lg" defaultValue={3} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 280 }}>
      <NumberInput label="Disabled" disabled defaultValue={10} />
      <NumberInput label="Read only" readOnly defaultValue={10} />
      <NumberInput label="With error" defaultValue={0} min={1} error="Enter at least 1" />
      <NumberInput label="No negatives" allowNegative={false} defaultValue={0} />
    </div>
  ),
};

export const InFormField: Story = {
  name: "In FormField (validation)",
  render: () => {
    const [seats, setSeats] = useState<number | null>(60);
    const error = seats === null ? "Enter a number of seats" : seats > 50 ? "Your plan allows up to 50 seats" : undefined;
    return (
      <div style={{ maxWidth: 320 }}>
        <FormField label="Seats" hint="1 to 50 on the Team plan" error={error} required>
          <NumberInput value={seats} onChange={setSeats} min={1} clampOnBlur={false} />
        </FormField>
      </div>
    );
  },
};
