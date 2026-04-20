import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./index";
import { useState } from "react";
import Button from "../../atoms/Button";

const meta: Meta<typeof Modal> = {
  title: "Design System/Molecules/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl", "xxl"] },
    animation: { control: "select", options: ["none", "fade", "slide", "scale"] },
    confirmButtonVariant: {
      control: "select",
      options: ["primary", "link", "ghost", "outlinePrimary", "outlineSecondary", "danger"],
    },
    showCancel: { control: "boolean" },
    hideFooter: { control: "boolean" },
    showCloseButton: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const WithTrigger = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Modal title",
    children: (
      <p className="text-body text-text-primary">
        This is the modal body. You can put any content here.
      </p>
    ),
    confirmText: "Confirm",
    cancelText: "Cancel",
    showCancel: true,
  },
};

export const Small: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Small modal",
    size: "sm",
    children: <p className="text-body text-text-primary">Narrow width.</p>,
  },
};

export const Large: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Large modal",
    size: "lg",
    children: (
      <p className="text-body text-text-primary">
        Wider modal for more content or forms.
      </p>
    ),
  },
};

export const NoFooter: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Info only",
    hideFooter: true,
    children: (
      <p className="text-body text-text-primary">
        Close using the X button only.
      </p>
    ),
  },
};

export const WithDisabledConfirm: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Terms",
    confirmText: "I agree",
    confirmDisabled: true,
    children: (
      <p className="text-body text-text-primary">
        Confirm button can be disabled until conditions are met.
      </p>
    ),
  },
};

export const SlideAnimation: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Slide animation",
    animation: "slide",
    children: (
      <p className="text-body text-text-primary">
        This modal uses slide animation.
      </p>
    ),
  },
};

export const ScaleAnimation: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Scale animation",
    animation: "scale",
    children: (
      <p className="text-body text-text-primary">
        This modal uses scale animation.
      </p>
    ),
  },
};

export const ConfirmButtonNoBackground: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Link-style confirm",
    confirmText: "OK",
    confirmButtonVariant: "link",
    confirmButtonColor: "#2563eb",
    children: (
      <p className="text-body text-text-primary">
        Confirm button with no background, text color only.
      </p>
    ),
  },
};

export const CustomButtonColors: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Custom buttons",
    confirmText: "Accept",
    cancelText: "Dismiss",
    confirmButtonVariant: "ghost",
    confirmButtonColor: "#059669",
    confirmButtonBackground: "transparent",
    cancelButtonVariant: "outlinePrimary",
    cancelButtonColor: "#6b7280",
    children: (
      <p className="text-body text-text-primary">
        Both buttons have custom colors and styles.
      </p>
    ),
  },
};
