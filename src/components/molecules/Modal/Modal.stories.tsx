import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./index";
import { useRef, useState } from "react";
import Button from "../../atoms/Button";

const meta: Meta<typeof Modal> = {
  title: "Design System/Molecules/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Modal is a centred dialog for confirmations, short forms and focused tasks. It is controlled through `isOpen` and `onClose`. " +
          "It traps focus, closes on Escape and backdrop click, locks body scroll, and returns focus to the trigger when it closes. " +
          "`title` names the dialog and `description` describes it (`aria-describedby`). With `scrollBehavior=\"inside\"` (the default) only the body scrolls. " +
          "With `\"outside\"` the whole dialog scrolls in the viewport. `fullscreenOnMobile` fills the screen at 480px or narrower. " +
          "`confirmLoading` shows the Button spinner and blocks double submits. Style the buttons with `confirmButtonVariant` / " +
          "`cancelButtonVariant` or the `footer` slot. The raw colour props (`confirmButtonColor` and the others) are deprecated. Use `Drawer` for edge-attached panels.",
      },
    },
  },
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
    description: { control: "text" },
    scrollBehavior: { control: "inline-radio", options: ["inside", "outside"] },
    fullscreenOnMobile: { control: "boolean" },
    confirmLoading: { control: "boolean" },
    initialFocusRef: { control: false },
    onOpenAutoFocus: { action: "onOpenAutoFocus" },
    onCloseAutoFocus: { action: "onCloseAutoFocus" },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Modal title",
    description: "Optional supporting text, announced as the dialog description.",
    children: (
      <p className="text-body text-text-primary">
        This is the modal body. You can put any content here.
      </p>
    ),
    confirmText: "Confirm",
    cancelText: "Cancel",
    showCancel: true,
    scrollBehavior: "inside",
    fullscreenOnMobile: false,
    confirmLoading: false,
  },
};

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
  name: "Confirm button no background (deprecated colour props)",
  parameters: {
    docs: {
      description: {
        story:
          "Uses the deprecated `confirmButtonColor` prop. It still works but bypasses theme tokens. Prefer `confirmButtonVariant=\"link\"`.",
      },
    },
  },
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Link-style confirm",
    confirmText: "OK",
    confirmButtonVariant: "link",
    confirmButtonColor: "var(--color-theme-primary)",
    children: (
      <p className="text-body text-text-primary">
        Confirm button with no background, text color only.
      </p>
    ),
  },
};

export const CustomButtonColors: Story = {
  name: "Custom button colors (deprecated colour props)",
  parameters: {
    docs: {
      description: {
        story:
          "Uses the deprecated colour override props for backward compatibility. Prefer variants or your own buttons in the `footer` slot.",
      },
    },
  },
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Custom buttons",
    confirmText: "Accept",
    cancelText: "Dismiss",
    confirmButtonVariant: "ghost",
    confirmButtonColor: "var(--color-state-success)",
    confirmButtonBackground: "transparent",
    cancelButtonVariant: "outlinePrimary",
    cancelButtonColor: "var(--color-text-secondary)",
    children: (
      <p className="text-body text-text-primary">
        Both buttons have custom colors and styles.
      </p>
    ),
  },
};

const LongContent = () => (
  <div className="sb-stack">
    {Array.from({ length: 30 }, (_, i) => (
      <p key={i} className="text-body text-text-primary">
        Section {i + 1}: long content to demonstrate scrolling behaviour.
      </p>
    ))}
  </div>
);

export const WithDescription: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Delete project?",
    description: "All environments and deploy history will be removed. This cannot be undone.",
    confirmText: "Delete",
    confirmButtonVariant: "danger",
    children: <p className="text-body text-text-primary">Type the project name to confirm.</p>,
  },
};

export const ScrollInside: Story = {
  name: "Scroll behaviour: inside",
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Terms of service",
    description: "The body scrolls. The header and footer stay fixed.",
    scrollBehavior: "inside",
    children: <LongContent />,
  },
};

export const ScrollOutside: Story = {
  name: "Scroll behaviour: outside",
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Terms of service",
    description: "The whole dialog scrolls in the viewport.",
    scrollBehavior: "outside",
    children: <LongContent />,
  },
};

export const FullscreenOnMobile: Story = {
  parameters: {
    docs: {
      description: {
        story: "At 480px or narrower the dialog fills the viewport. Pick Mobile 375 in the viewport toolbar to compare.",
      },
    },
  },
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Edit address",
    fullscreenOnMobile: true,
    children: <LongContent />,
  },
};

function ConfirmLoadingDemo() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Save changes"
        description="Confirm shows a spinner for two seconds and ignores repeat clicks."
        confirmText="Save"
        confirmLoading={saving}
        onConfirm={() => {
          setSaving(true);
          setTimeout(() => {
            setSaving(false);
            setOpen(false);
          }, 2000);
        }}
      >
        <p className="text-body text-text-primary">Click Save repeatedly. It only submits once.</p>
      </Modal>
    </>
  );
}

export const ConfirmLoading: Story = {
  render: () => <ConfirmLoadingDemo />,
};

function InitialFocusDemo() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open with initial focus
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Rename file"
        initialFocusRef={inputRef}
        confirmText="Rename"
      >
        <label className="text-body text-text-primary" htmlFor="modal-rename">
          File name
        </label>
        <input id="modal-rename" ref={inputRef} defaultValue="report.pdf" style={{ display: "block", width: "100%" }} />
      </Modal>
    </>
  );
}

export const InitialFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`initialFocusRef` focuses the input instead of the close button. Use `onOpenAutoFocus` or `onCloseAutoFocus` with `event.preventDefault()` to take over focus placement completely.",
      },
    },
  },
  render: () => <InitialFocusDemo />,
};
