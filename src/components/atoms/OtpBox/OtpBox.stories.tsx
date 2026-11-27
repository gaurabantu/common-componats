import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import OtpBox from "./index";
import Button from "../Button";
import type { OtpBoxHandle, OtpBoxProps } from "./OtpBox.types";
import { OTP_BOX_SIZES, OTP_BOX_TYPES, OTP_BOX_VARIANTS } from "./OtpBox.config";

const meta: Meta<typeof OtpBox> = {
  title: "Design System/Atoms/OtpBox",
  component: OtpBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "One-time-code entry. `variant=\"boxes\"` (default) renders one input per character inside a labelled `role=\"group\"`; each cell is announced as \"Digit 2 of 6\". The first cell carries `autocomplete=\"one-time-code\"` so iOS/Android SMS autofill fills the whole code, and pasting a full code (even \"123-456\") distributes it across the cells. Arrow keys, Home/End and Backspace navigate. `onComplete` fires once every character is entered; `name` adds a hidden input so the code submits with a native form; `error` is linked through `aria-describedby`. The built-in incomplete-code message appears only after focus leaves the field. A `ref` exposes `focus()`, `clear()` and `getValue()`.",
      },
    },
  },
  argTypes: {
    length: { control: { type: "number", min: 4, max: 8 } },
    type: { control: "inline-radio", options: OTP_BOX_TYPES },
    variant: { control: "select", options: OTP_BOX_VARIANTS },
    size: { control: "inline-radio", options: OTP_BOX_SIZES },
    mask: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    autoFocus: { control: "boolean" },
    showValidation: { control: "boolean" },
    label: { control: "text" },
    error: { control: "text" },
    name: { control: "text" },
    onChange: { action: "change" },
    onComplete: { action: "complete" },
  },
};

export default meta;

type Story = StoryObj<typeof OtpBox>;

const Controlled = (args: OtpBoxProps) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <OtpBox
      {...args}
      value={value}
      onChange={(v) => {
        setValue(v);
        args.onChange?.(v);
      }}
    />
  );
};

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Enter verification code",
    length: 6,
    type: "numeric",
    variant: "boxes",
    size: "md",
  },
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
    <div className="sb-stack">
      <Controlled label="Boxes (default)" length={6} variant="boxes" />
      <Controlled label="Outlined" length={6} variant="outlined" />
      <Controlled label="Filled" length={6} variant="filled" />
      <Controlled label="Underlined" length={6} variant="underlined" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-stack">
      <Controlled label="Small (40px cells)" length={6} variant="boxes" size="sm" />
      <Controlled label="Medium (44px cells)" length={6} variant="boxes" size="md" />
      <Controlled label="Large (48px cells)" length={6} variant="boxes" size="lg" />
    </div>
  ),
};

const CompleteDemo = () => {
  const [status, setStatus] = useState("Waiting for code…");
  const ref = useRef<OtpBoxHandle>(null);
  return (
    <div className="sb-stack">
      <OtpBox
        ref={ref}
        label="Verification code"
        autoFocus
        onChange={() => setStatus("Waiting for code…")}
        onComplete={(code) => setStatus(`Verifying ${code}…`)}
      />
      <p role="status">{status}</p>
      <div className="sb-inline">
        <Button variant="outlineSecondary" size="md" onClick={() => ref.current?.clear()}>
          Clear
        </Button>
        <Button variant="ghost" size="md" onClick={() => ref.current?.focus()}>
          Focus first empty cell
        </Button>
      </div>
    </div>
  );
};

export const OnCompleteAndImperativeHandle: Story = {
  render: () => <CompleteDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "`onComplete` fires when the last character is entered (try pasting `123456`). The `ref` handle's `clear()` empties the code and refocuses the first cell.",
      },
    },
  },
};

const FormDemo = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return (
    <form
      className="sb-stack"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(String(new FormData(e.currentTarget).get("otp") ?? ""));
      }}
    >
      <OtpBox name="otp" label="Code from SMS" mask required />
      <div>
        <Button type="submit" variant="primary">
          Verify
        </Button>
      </div>
      {submitted !== null ? <p role="status">Submitted otp={submitted}</p> : null}
    </form>
  );
};

export const InAForm: Story = {
  render: () => <FormDemo />,
  parameters: {
    docs: {
      description: {
        story: "`name` renders a hidden input with the real (unmasked) value, so the code submits with a native `<form>`.",
      },
    },
  },
};
