import type { Meta, StoryObj } from "@storybook/react";
import RadioGroup from "./index";
import { useEffect, useState } from "react";

const meta: Meta<typeof RadioGroup> = {
  title: "Design System/Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    selectedValue: { control: "select", options: ["a", "b", "c", "basic", "pro", "enterprise"] },
    layout: { control: "radio", options: ["vertical", "horizontal", "grid", "grid-auto"] },
    columns: { control: { type: "number", min: 1, max: 4 } },
    minWidth: { control: "text" },
    gap: { control: "text" },
    options: { control: false },
    onChange: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c", disabled: true },
];

const Controlled = (args: any) => {
  const [value, setValue] = useState(args.selectedValue ?? "a");
  useEffect(() => {
    setValue(args.selectedValue ?? "a");
  }, [args.selectedValue]);

  return (
    <RadioGroup
      {...args}
      selectedValue={value}
      onChange={(next) => {
        setValue(next);
        args.onChange?.(next);
      }}
    />
  );
};

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "choice",
    options,
    selectedValue: "a",
  },
};

export const Vertical: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "choice",
    options,
    selectedValue: "a",
  },
};

export const Horizontal: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "choice-h",
    options,
    selectedValue: "b",
    layout: "horizontal",
  },
};

export const WithSubLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "plan",
    options: [
      { label: "Basic", subLabel: "Free forever", value: "basic" },
      { label: "Pro", subLabel: "$10/month", value: "pro" },
      { label: "Enterprise", subLabel: "Contact sales", value: "enterprise" },
    ],
    selectedValue: "pro",
    layout: "vertical",
  },
};

export const BoxShape: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    name: "box-choice",
    options: options.map((o) => ({ ...o, shape: "box" as const })),
    selectedValue: "a",
    layout: "grid",
    columns: 3,
    minWidth: "140px",
  },
};
