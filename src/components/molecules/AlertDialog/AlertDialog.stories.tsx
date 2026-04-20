import type { Meta, StoryObj } from "@storybook/react";
import AlertDialog from "./index";
import { useState } from "react";
import Button from "../../atoms/Button";

const meta: Meta<typeof AlertDialog> = {
  title: "Design System/Molecules/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    confirmButtonVariant: {
      control: "select",
      options: ["primary", "link", "ghost", "outlinePrimary", "outlineSecondary", "danger"],
    },
    iconAnimated: { control: "boolean" },
    destructive: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

const WithTrigger = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Alert
      </Button>
      <AlertDialog {...args} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Info: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Information",
    description: "This is an informational message. You can use it to share updates or tips.",
    variant: "info",
    confirmText: "Got it",
    showCancel: false,
  },
};

export const Success: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Success!",
    description: "Your changes have been saved successfully.",
    variant: "success",
    confirmText: "OK",
  },
};

export const Warning: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Warning",
    description: "This action may have unintended consequences.",
    variant: "warning",
    confirmText: "OK",
  },
};

export const Error: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Failed",
    description: "Something went wrong. Please try again or contact support.",
    variant: "error",
    confirmText: "OK",
  },
};

export const Destructive: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Delete item?",
    description: "This action cannot be undone. This will permanently delete the item.",
    variant: "error",
    destructive: true,
    confirmText: "Delete",
    showCancel: true,
    cancelText: "Cancel",
  },
};

export const WithoutAnimation: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Static icon",
    description: "Icon animation is disabled.",
    variant: "success",
    iconAnimated: false,
    confirmText: "OK",
  },
};

export const OkButtonNoBackground: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Success!",
    description: "OK button with no background, colored text only.",
    variant: "success",
    confirmText: "OK",
    confirmButtonVariant: "link",
    confirmButtonColor: "#22c55e",
  },
};

export const OkButtonCustomStyle: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Custom styled",
    description: "OK button with transparent background and custom color.",
    variant: "info",
    confirmText: "Got it",
    confirmButtonVariant: "ghost",
    confirmButtonColor: "#0ea5e9",
    confirmButtonBackground: "transparent",
  },
};
