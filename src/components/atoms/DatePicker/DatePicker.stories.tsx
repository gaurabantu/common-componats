import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Design System/Atoms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    dateFormat: "DD-MM-YYYY",
  },
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    variant: { control: "select", options: ["outlined", "filled", "underlined"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    dateFormat: {
      control: "select",
      options: ["DD-MM-YYYY", "DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
      description: "Display and output format",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

const Controlled = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");
  useEffect(() => {
    setValue(args.value ?? "");
  }, [args.value]);
  return (
    <DatePicker
      key={`${args.dateFormat ?? "default"}-${args.range ?? false}`}
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Select date",
    placeholder: "Select date",
    dateFormat: "DD-MM-YYYY",
    variant: "outlined",
  },
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Date of birth",
    value: "15-01-2025",
    dateFormat: "DD-MM-YYYY",
    placeholder: "Select date",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled date",
    value: "15-01-2025",
    dateFormat: "DD-MM-YYYY",
    disabled: true,
    placeholder: "Select date",
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Required date",
    placeholder: "Select date",
    error: "Date is required",
    status: "error",
  },
};

export const RangePicker: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Travel dates",
    range: true,
    value: "15-01-2025 to 22-01-2025",
    dateFormat: "DD-MM-YYYY",
    variant: "outlined",
    helperText: "Select your start and end dates.",
  },
};

export const FilledVariant: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Filled variant",
    variant: "filled",
    helperText: "Inspired by filled inputs in modern form libraries.",
  },
};

export const UnderlinedVariant: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Underlined variant",
    variant: "underlined",
    helperText: "A lighter date field similar to minimal form styles.",
  },
};

export const TypeToSelect: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Type or click to select",
    placeholder: "Type 11122024 (DDMM or MMDD) or click calendar",
    dateFormat: "DD-MM-YYYY",
    helperText: "Type DDMMYYYY or MMDDYYYY (e.g. 11122024). Invalid dates (e.g. 32132024) are not selected.",
  },
};

export const DDMMFormat: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "DD/MM/YYYY format",
    value: "2024-12-11",
    dateFormat: "DD/MM/YYYY",
    placeholder: "DD/MM/YYYY",
    helperText: "Displays and outputs in DD/MM/YYYY. Value from API (2024-12-11) is shown as 11/12/2024.",
  },
};

export const YYYYMMDDFormat: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "YYYY-MM-DD format",
    value: "2024-12-11",
    dateFormat: "YYYY-MM-DD",
    placeholder: "YYYY-MM-DD",
    helperText: "Displays in YYYY-MM-DD. Value from API (2024-12-11) is shown in selected format.",
  },
};
