import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DateRangePicker, { DEFAULT_RANGE_PRESETS } from "./index";
import type { DateRange } from "./DateRangePicker.types";
import { FormField } from "../FormField";

const today = new Date();
const daysAgo = (n: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - n);

const meta: Meta<typeof DateRangePicker> = {
  title: "Design System/Molecules/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pick a start and end day from a two-month grid (one month at ≤ 640px, where the popover docks to the bottom of the screen). " +
          "The trigger is a button showing the formatted range; the popover is a dialog with optional presets (`DEFAULT_RANGE_PRESETS`). " +
          "Keyboard: arrows move by day / week, Home / End to week start / end, PageUp / PageDown by month (Shift = year), Enter / Space picks, Escape closes. " +
          "`onChange` fires with a complete `{ from, to }` (or `{}` when cleared); focus always returns to the trigger. " +
          "Inside `FormField` the field label, hint, error and required state are wired onto the trigger (required is conveyed by the label text, never `aria-required` on the button). " +
          "**Layout:** on desktop the popover is positioned inside the component, so avoid `overflow: hidden` ancestors (they clip it); at ≤ 640px it is portalled to `<body>` and docked to the bottom of the viewport, so transformed ancestors such as Drawer / Sheet panels do not move it.",
      },
    },
    layout: "padded",
  },
  argTypes: {
    numberOfMonths: { control: { type: "number", min: 1, max: 3 } },
    locale: { control: "select", options: ["en-US", "en-GB", "de-DE", "fr-FR", "ja-JP", "ar-EG"] },
    weekStartsOn: { control: "inline-radio", options: [0, 1] },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    placeholder: { control: "text" },
    label: { control: "text" },
    onChange: { action: "change" },
  },
  args: {
    label: "Report period",
    numberOfMonths: 2,
    clearable: true,
    disabled: false,
    placeholder: "Select date range",
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 360, minHeight: 440 }}>
      <DateRangePicker {...args} />
    </div>
  ),
};

export const WithPresets: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ from: daysAgo(6), to: daysAgo(0) });
    return (
      <div className="sb-stack" style={{ maxWidth: 360, minHeight: 480 }}>
        <DateRangePicker label="Report period" presets={DEFAULT_RANGE_PRESETS} max={today} value={range} onChange={setRange} clearable />
        <p>
          Selected: {range.from?.toDateString() ?? "—"} → {range.to?.toDateString() ?? "—"}
        </p>
      </div>
    );
  },
};

export const MinMax: Story = {
  name: "Min / max bounds",
  args: {
    label: "Booking window",
    min: daysAgo(10),
    max: daysAgo(-30),
  },
  render: (args) => (
    <div style={{ maxWidth: 360, minHeight: 440 }}>
      <DateRangePicker {...args} />
    </div>
  ),
};

export const Locales: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 360, minHeight: 440 }}>
      <DateRangePicker label="en-GB, week starts Monday" locale="en-GB" weekStartsOn={1} defaultValue={{ from: daysAgo(14), to: daysAgo(7) }} />
      <DateRangePicker label="de-DE" locale="de-DE" defaultValue={{ from: daysAgo(14), to: daysAgo(7) }} />
      <DateRangePicker label="ja-JP" locale="ja-JP" defaultValue={{ from: daysAgo(14), to: daysAgo(7) }} />
    </div>
  ),
};

export const InFormField: Story = {
  name: "In FormField (error, required)",
  render: () => {
    const [range, setRange] = useState<DateRange>({});
    const error = range.from ? undefined : "Choose a billing period";
    return (
      <div style={{ maxWidth: 360, minHeight: 460 }}>
        <FormField label="Billing period" hint="Up to 90 days" error={error} required>
          <DateRangePicker value={range} onChange={setRange} presets={DEFAULT_RANGE_PRESETS} clearable />
        </FormField>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 360 }}>
      <DateRangePicker label="Disabled" disabled defaultValue={{ from: daysAgo(3), to: daysAgo(1) }} />
      <DateRangePicker label="With error" error="End date must be after start date" />
      <DateRangePicker ariaLabel="No visible label (ariaLabel)" />
    </div>
  ),
};
