import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "./index";
import { useState } from "react";

const meta: Meta<typeof TextArea> = {
  title: "Design System/Atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: { layout: "padded", storyMedium: true },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", ""] },
    rows: { control: { type: "number", min: 2, max: 10 } },
    disabled: { control: "boolean" },
    showCount: { control: "boolean" },
    resize: { control: "select", options: ["none", "vertical", "horizontal", "both"] },
    status: { control: "select", options: ["error", "warning", "success", undefined] },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

const Controlled = (args: any) => {
  const [value, setValue] = useState(args.value ?? args.defaultValue ?? "");
  return (
    <TextArea
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Message",
    placeholder: "Enter your message...",
    rows: 4,
    value: "",
    helperText: "Share a short message with your team.",
    showCount: true,
  },
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Description",
    value: "Some existing text.",
    rows: 3,
  },
};

export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = useState("");
    const [v2, setV2] = useState("");
    const [v3, setV3] = useState("");
    return (
      <div className="flex flex-col gap-4 max-w-md">
        <TextArea label="Small" size="sm" value={v1} onChange={setV1} placeholder="Small" rows={2} />
        <TextArea label="Default" value={v2} onChange={setV2} placeholder="Default" rows={2} />
        <TextArea label="Large" size="lg" value={v3} onChange={setV3} placeholder="Large" rows={2} />
      </div>
    );
  },
};

export const WithMaxLength: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Bio (max 100)",
    maxLength: 100,
    rows: 3,
    placeholder: "Type here...",
    showCount: true,
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Feedback",
    placeholder: "Tell us what went wrong...",
    rows: 4,
    value: "This needs more spacing and clearer labels.",
    status: "error",
    errorMessage: "Feedback must be at least 50 characters.",
    showCount: true,
    maxLength: 200,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    value: "Cannot edit",
    disabled: true,
    rows: 3,
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div className="w-full max-w-xl">
      <Controlled {...args} />
    </div>
  ),
  args: {
    label: "Full width (max 640px)",
    placeholder: "Fills container...",
    rows: 4,
  },
};
