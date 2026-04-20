import type { Meta, StoryObj } from "@storybook/react";
import OtpBox from "./index";
import { useState } from "react";

const meta: Meta<typeof OtpBox> = {
  title: "Design System/Atoms/OtpBox",
  component: OtpBox,
  tags: ["autodocs"],
  argTypes: {
    length: { control: { type: "number", min: 4, max: 8 } },
    type: { control: "radio", options: ["numeric", "alphanumeric", "alphabet"] },
    variant: { control: "select", options: ["outlined", "filled", "underlined", "boxes"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    mask: { control: "boolean" },
    disabled: { control: "boolean" },
    showValidation: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof OtpBox>;

const Controlled = (args: any) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <OtpBox
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Enter verification code",
    length: 6,
    type: "numeric",
    variant: "boxes",
  },
};

export const FourDigits: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "4-digit code",
    length: 4,
    type: "numeric",
  },
};

export const Masked: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Secret OTP",
    length: 6,
    mask: true,
    type: "numeric",
  },
};

export const Alphanumeric: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Alphanumeric code",
    length: 6,
    type: "alphanumeric",
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "OTP",
    length: 6,
    value: "12",
    error: "Invalid or expired OTP",
    showValidation: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    value: "123456",
    disabled: true,
    length: 6,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: "var(--color-text-secondary)" }}>Outlined (MUI style)</h4>
        <Controlled label="Outlined" length={6} variant="outlined" />
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: "var(--color-text-secondary)" }}>Filled (MUI style)</h4>
        <Controlled label="Filled" length={6} variant="filled" />
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: "var(--color-text-secondary)" }}>Underlined</h4>
        <Controlled label="Underlined" length={6} variant="underlined" />
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: "var(--color-text-secondary)" }}>Boxes (Ant Design / MUI style)</h4>
        <Controlled label="Individual boxes" length={6} variant="boxes" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Controlled label="Small" length={6} variant="boxes" size="sm" />
      <Controlled label="Medium" length={6} variant="boxes" size="md" />
      <Controlled label="Large" length={6} variant="boxes" size="lg" />
    </div>
  ),
};
