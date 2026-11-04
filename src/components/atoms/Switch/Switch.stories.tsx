import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import Switch from "./index";

const meta: Meta<typeof Switch> = {
  title: "Design System/Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    label: { control: "text" },
    size: { control: "radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
    labelPosition: { control: "radio", options: ["start", "end"] },
    name: { control: "text" },
    value: { control: "text" },
    uncheckedValue: { control: "text" },
    id: { control: "text" },
    onCheckedChange: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

const Controlled = (args: ComponentProps<typeof Switch>) => {
  const [on, setOn] = useState(args.checked ?? args.defaultChecked ?? false);
  useEffect(() => {
    setOn(args.checked ?? args.defaultChecked ?? false);
  }, [args.checked, args.defaultChecked]);

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

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Enable notifications",
    defaultChecked: false,
    size: "md",
  },
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

/** `hideLabel` keeps the label as the accessible name; `data-testid` and `aria-*` reach the `<button role="switch">`. */
export const HiddenLabelAndPassthrough: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-1)" }}>
      <Switch label="Enable auto-sync" hideLabel defaultChecked data-testid="auto-sync-switch" />
      <Switch
        label={
          <span>
            Email <strong>digest</strong>
          </span>
        }
      />
    </div>
  ),
};
