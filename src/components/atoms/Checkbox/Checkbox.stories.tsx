import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";
import CheckBox from "./index";
import { CHECKBOX_SIZES } from "./Checkbox.config";

const meta: Meta<typeof CheckBox> = {
  title: "Design System/Atoms/Checkbox",
  component: CheckBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Native checkbox with a token-driven face. Use `indeterminate` for a select-all whose children are partly selected (sets the native DOM `indeterminate` property, announced as mixed), `description` for helper text, `error` for a validation message (`aria-invalid` + `aria-describedby`), and `required` for a native required field with a visible asterisk. When the visible `label` is empty (table rows), pass `ariaLabel`. `checkboxColorClass`, `labelColorClass` and `inputLabelSpacingClass` are deprecated.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    checked: { control: "boolean" },
    shape: { control: "radio", options: ["default", "box"] },
    rounded: { control: "select", options: ["0", "1", "2", "3", "4", "5", "pill", "circle"] },
    withShadow: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    description: { control: "text" },
    size: { control: "inline-radio", options: CHECKBOX_SIZES },
    error: { control: "text" },
    required: { control: "boolean" },
    onChange: { control: false },
    checkboxColorClass: { table: { disable: true } },
    labelColorClass: { table: { disable: true } },
    inputLabelSpacingClass: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

const Controlled = (args: any) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  useEffect(() => {
    setChecked(args.checked ?? false);
  }, [args.checked]);

  return (
    <CheckBox
      {...args}
      checked={checked}
      onChange={(e) => {
        setChecked((e.target as HTMLInputElement).checked);
        args.onChange?.(e);
      }}
    />
  );
};

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "agree",
    value: "yes",
    label: "I agree to the terms",
    checked: false,
  },
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "agree",
    value: "yes",
    label: "I agree to the terms",
    checked: false,
  },
};

export const Checked: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "agree",
    value: "yes",
    label: "Checked by default",
    checked: true,
  },
};

export const BoxShape: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "option",
    value: "a",
    label: "Box-style checkbox (card-like)",
    shape: "box",
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled",
    value: "x",
    label: "Disabled checkbox",
    disabled: true,
    checked: false,
  },
};

const IndeterminateDemo = () => {
  const [items, setItems] = useState([
    { id: "email", label: "Email", checked: true },
    { id: "sms", label: "SMS", checked: false },
    { id: "push", label: "Push notifications", checked: true },
  ]);
  const all = items.every((i) => i.checked);
  const some = items.some((i) => i.checked);
  return (
    <div className="sb-stack">
      <CheckBox
        name="channels"
        value="all"
        label="All channels"
        checked={all}
        indeterminate={some && !all}
        onChange={() => setItems((prev) => prev.map((i) => ({ ...i, checked: !all })))}
      />
      <div className="sb-stack" style={{ paddingInlineStart: "var(--space-3)" }}>
        {items.map((item) => (
          <CheckBox
            key={item.id}
            name="channels"
            value={item.id}
            label={item.label}
            checked={item.checked}
            onChange={() =>
              setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, checked: !i.checked } : i)))
            }
          />
        ))}
      </div>
    </div>
  );
};

export const Indeterminate: Story = {
  render: () => <IndeterminateDemo />,
  parameters: {
    docs: {
      description: {
        story: "Parent reflects its children: all checked shows a tick, some checked shows a dash (native `indeterminate`, announced as mixed).",
      },
    },
  },
};

export const WithDescription: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "digest",
    value: "weekly",
    label: "Weekly digest",
    description: "A summary of activity every Monday. You can unsubscribe at any time.",
    checked: false,
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "terms",
    value: "accepted",
    label: "I accept the terms and conditions",
    required: true,
    error: "You must accept the terms to continue.",
    checked: false,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-stack">
      {CHECKBOX_SIZES.map((size) => (
        <Controlled
          key={size}
          {...args}
          size={size}
          value={size}
          label={`Size ${size}`}
          description="Helper text scales with the control."
        />
      ))}
    </div>
  ),
  args: { name: "sizes", checked: true },
};
