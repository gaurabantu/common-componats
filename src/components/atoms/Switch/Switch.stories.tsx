import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { useState } from "react";
import Switch from "./index";

const meta: Meta<typeof Switch> = {
  title: "Design System/Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
    labelPosition: { control: "radio", options: ["start", "end"] },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

const Controlled = (args: ComponentProps<typeof Switch>) => {
  const [on, setOn] = useState(args.checked ?? args.defaultChecked ?? false);
  return (
    <Switch
      {...args}
      checked={on}
      onCheckedChange={(v) => {
        setOn(v);
        args.onCheckedChange?.(v);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Enable notifications",
    defaultChecked: false,
    size: "md",
  },
};

export const On: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Enabled",
    defaultChecked: true,
  },
};

export const LabelStart: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Dark mode",
    labelPosition: "start",
    defaultChecked: false,
  },
};

export const Small: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Compact",
    size: "sm",
    defaultChecked: true,
  },
};

export const NoLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: undefined,
    "aria-label": "Airplane mode",
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Unavailable",
    disabled: true,
    defaultChecked: false,
  },
};
