import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TimePicker from "./index";
import FormField from "../FormField";

const meta: Meta<typeof TimePicker> = {
  title: "Design System/Molecules/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "TimePicker is a text box with combobox semantics and a listbox of times. The value is always a 24-hour " +
          "`\"HH:mm\"` string (`null` when empty), whatever the display `format` (12 or 24, defaulting to the locale's clock). " +
          "Users can type (\"9:30 pm\", \"2130\"), open the list with the clock button or Alt+ArrowDown, or press " +
          "ArrowUp / ArrowDown on the hour, minute or AM/PM segment under the caret (minutes move by `step`). `min`, `max` " +
          "and `disabledTimes` limit the choice; unavailable options are shown disabled and struck through. Option labels " +
          "use `Intl.DateTimeFormat` for the given `locale`. `clearable` adds a clear button. Inside a `FormField` it reads " +
          "the field label, hint, error and required state.",
      },
    },
  },
  argTypes: {
    format: { control: "inline-radio", options: [12, 24] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    step: { control: "number" },
    min: { control: "text" },
    max: { control: "text" },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    locale: { control: "text" },
    label: { control: "text" },
    error: { control: "text" },
    onChange: { action: "onChange" },
    value: { control: false },
    disabledTimes: { control: false },
    labels: { control: false },
  },
  args: {
    label: "Start time",
    format: 12,
    step: 15,
    size: "md",
    clearable: true,
    locale: "en-US",
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Playground: Story = {
  render: (args) => (
    <div className="sb-page" style={{ maxWidth: "20rem" }}>
      <TimePicker {...args} />
    </div>
  ),
};

function ControlledDemo() {
  const [value, setValue] = useState<string | null>("09:30");
  return (
    <div className="sb-stack" style={{ maxWidth: "20rem" }}>
      <TimePicker label="Meeting" format={12} locale="en-US" value={value} onChange={setValue} clearable />
      <p>Value: {JSON.stringify(value)}</p>
    </div>
  );
}

export const Controlled: Story = { render: () => <ControlledDemo /> };

export const TwentyFourHour: Story = { args: { format: 24, locale: "en-GB", defaultValue: "18:45" } };

export const BusinessHours: Story = {
  args: {
    label: "Appointment",
    step: 30,
    min: "09:00",
    max: "17:00",
    disabledTimes: ["12:00", "12:30"],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "20rem" }}>
      <TimePicker label="Small" size="sm" format={24} defaultValue="08:00" />
      <TimePicker label="Medium" size="md" format={24} defaultValue="08:00" />
      <TimePicker label="Large" size="lg" format={24} defaultValue="08:00" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "20rem" }}>
      <TimePicker label="Disabled" disabled format={24} defaultValue="10:00" />
      <TimePicker label="Read only" readOnly format={24} defaultValue="10:00" />
      <TimePicker label="Error" error="Pick a start time" format={24} />
    </div>
  ),
};

export const Locales: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "20rem" }}>
      <TimePicker label="English (US)" locale="en-US" defaultValue="14:30" />
      <TimePicker label="Deutsch" locale="de-DE" defaultValue="14:30" />
      <TimePicker label="한국어" locale="ko-KR" defaultValue="14:30" />
    </div>
  ),
};

export const InFormField: Story = {
  render: () => (
    <div style={{ maxWidth: "20rem" }}>
      <FormField label="Delivery window" hint="Between 08:00 and 20:00" required>
        <TimePicker format={24} min="08:00" max="20:00" step={60} />
      </FormField>
    </div>
  ),
};
