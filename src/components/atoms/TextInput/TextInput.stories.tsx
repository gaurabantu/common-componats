import type { Meta, StoryObj } from "@storybook/react";
import Input from "./index";
import Icon from "../Icon";
import Button from "../Button";
import { useState } from "react";
import SearchIcon from "../../../assets/search.svg";

const meta: Meta<typeof Input> = {
  title: "Design System/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    storyMedium: true,
  },
  argTypes: {
    validation: { control: "select", options: ["none", "email", "mobile", "name"] },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    showToggleIcon: { control: "boolean" },
    allowClear: { control: "boolean" },
    showCount: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    status: { control: "select", options: ["error", "warning", "success"] },
    variant: { control: "select", options: ["outlined", "filled", "borderless", "underlined"] },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

const Controlled = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState((args.value as string) ?? "");
  return (
    <Input
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    value: "",
  },
};

export const WithToggleInside: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Password (toggle inside input)",
    type: "password",
    value: "secret123",
    showToggleIcon: true,
    placeholder: "Enter password",
  },
};

export const PasswordWithToggle: Story = {
  render: (args) => (
    <div className="max-w-md">
      <p className="text-small text-text-secondary mb-2">
        Toggle visibility button sits inside the input on the right.
      </p>
      <Controlled {...args} />
    </div>
  ),
  args: {
    label: "Password",
    type: "password",
    value: "myPassword",
    showToggleIcon: true,
    fullWidth: true,
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div className="w-full max-w-xl">
      <p className="text-small text-text-secondary mb-2">Input fills container (max 640px)</p>
      <Controlled {...args} />
    </div>
  ),
  args: {
    label: "Full width",
    placeholder: "Fills container...",
    fullWidth: true,
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Email",
    placeholder: "you@example.com",
    value: "invalid",
    validation: "email",
    errorMessage: "Invalid email format",
  },
};

export const Verified: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Email",
    placeholder: "you@example.com",
    value: "user@example.com",
    validation: "email",
    showVerifiedStatus: true,
    isVerified: true,
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Disabled",
    value: "Disabled value",
    disabled: true,
  },
};

export const WithLabelAndRequired: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Required field",
    placeholder: "Required...",
    required: true,
  },
};

export const AllowClear: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "With clear icon",
    placeholder: "Type and clear...",
    value: "Clear me",
    allowClear: true,
    onClear: () => console.log("Cleared"),
  },
};

export const PrefixAndSuffix: Story = {
  render: (args) => (
    <div className="max-w-md space-y-4">
      <Controlled
        {...args}
        prefix={<span className="text-[var(--color-text-secondary)] text-sm">https://</span>}
      />
      <Controlled
        {...args}
        suffix={<Icon src={SearchIcon} alt="" width={16} height={16} />}
        placeholder="Search..."
      />
    </div>
  ),
  args: {
    label: "Prefix and suffix (Ant Design style)",
    placeholder: "With prefix or suffix",
    value: "",
  },
};

export const ShowCount: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "With character count",
    placeholder: "Max 100 characters...",
    value: "Hello",
    maxLength: 100,
    showCount: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="max-w-md space-y-4">
      <Controlled {...args} value="" size="sm" label="Small (24px)" placeholder="Small input" />
      <Controlled {...args} value="" size="md" label="Medium (32px)" placeholder="Medium input" />
      <Controlled {...args} value="" size="lg" label="Large (40px)" placeholder="Large input" />
    </div>
  ),
  args: {},
};

export const Variants: Story = {
  render: (args) => (
    <div className="max-w-md space-y-4">
      <Controlled {...args} value="" variant="outlined" label="Outlined" placeholder="Default" />
      <Controlled {...args} value="" variant="filled" label="Filled" placeholder="Filled background" />
      <Controlled {...args} value="" variant="borderless" label="Borderless" placeholder="No border" />
      <Controlled {...args} value="" variant="underlined" label="Underlined" placeholder="Bottom border only" />
    </div>
  ),
  args: {},
};

export const Status: Story = {
  render: (args) => (
    <div className="max-w-md space-y-4">
      <Controlled {...args} value="Invalid" status="error" label="Error status" />
      <Controlled {...args} value="Warning" status="warning" label="Warning status" />
      <Controlled {...args} value="Valid" status="success" label="Success status" />
    </div>
  ),
  args: {},
};

export const OnPressEnter: Story = {
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = useState((args.value as string) ?? "");
      const [submitted, setSubmitted] = useState("");

      const handleSubmit = () => {
        setSubmitted(value.trim() ? `Submitted: ${value}` : "Submitted empty value");
      };

      return (
        <div style={{ width: "100%", maxWidth: 520 }}>
          <div style={{ display: "flex", gap: 0, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <Input
                {...args}
                value={value}
                onChange={setValue}
                onPressEnter={handleSubmit}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Submit
            </Button>
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: "var(--text-small-size, 12px)",
              color: "var(--color-text-secondary, #757575)",
            }}
          >
            {submitted || "Press Enter or click Submit"}
          </div>
        </div>
      );
    };

    return <Demo />;
  },
  args: {
    label: "Press Enter to submit",
    placeholder: "Type and press Enter...",
    value: "",
  },
};
