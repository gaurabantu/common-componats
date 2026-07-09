import type { Meta, StoryObj } from "@storybook/react";
import CheckBox from "./index";
import { useEffect, useState } from "react";

const meta: Meta<typeof CheckBox> = {
  title: "Design System/Atoms/Checkbox",
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    checked: { control: "boolean" },
    shape: { control: "radio", options: ["default", "box"] },
    rounded: { control: "select", options: ["0", "1", "2", "3", "4", "5", "pill", "circle"] },
    withShadow: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { control: false },
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
