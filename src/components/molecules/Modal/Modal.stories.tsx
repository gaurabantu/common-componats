import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./index";
import { useRef, useState, type CSSProperties } from "react";
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
          "`cancelButtonVariant` or the `footer` slot. The raw colour props (`confirmButtonColor` and the others) are deprecated. Use `Drawer` for edge-attached panels. " +
          "Since 0.0.4: `size=\"fullscreen\"` for full-page workspaces, `headerActions` in the title bar, a ReactNode `title` (with `ariaLabel` for a plain accessible name), " +
          "block `description` content, `rootProps` / `data-*` pass-through on the root, `bodyScroll={false}` for multi-pane dialogs whose children own the scroll, " +
          "`animate={false}` (no transform — safe for dnd-kit `DragOverlay`), and `onBeforeClose` to veto Escape / backdrop / close-button / Cancel closes (e.g. unsaved changes).",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl", "xxl", "fullscreen"] },
    animate: { control: "boolean" },
    bodyScroll: { control: "boolean" },
    ariaLabel: { control: "text" },
    headerActions: { control: false },
    rootProps: { control: false },
    onBeforeClose: { control: false },
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

const paneStyle: CSSProperties = {
  overflowY: "auto",
  minHeight: 0,
  padding: "var(--space-1)",
  border: "1px solid var(--color-border-subtle)",
  borderRadius: "var(--radius-md)",
};

const listItems = (prefix: string) =>
  Array.from({ length: 40 }, (_, i) => (
    <div key={i} className="text-body text-text-primary" style={{ padding: "var(--space-0) 0" }}>
      {prefix} {i + 1}
    </div>
  ));

/** `size="fullscreen"` — a full-viewport workspace (no margin, no radius). */
export const Fullscreen: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Calculation manager",
    size: "fullscreen",
    hideFooter: true,
    headerActions: (
      <Button variant="outlineSecondary" size="sm">
        Validate
      </Button>
    ),
    children: <p className="text-body text-text-primary">Full-page editor content.</p>,
  },
};

/** `headerActions` + ReactNode `title` — `ariaLabel` gives a plain accessible name. */
export const HeaderActionsAndRichTitle: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)" }}>
        <code
          style={{
            padding: "0 var(--space-0)",
            borderRadius: "var(--radius-md)",
            background: "var(--color-bg-page)",
            fontSize: "var(--text-body-size)",
          }}
        >
          ACC-1000
        </code>
        Cash and cash equivalents
      </span>
    ),
    ariaLabel: "Account ACC-1000, Cash and cash equivalents",
    headerActions: (
      <>
        <Button variant="outlineSecondary" size="sm">
          Copy
        </Button>
        <Button variant="outlinePrimary" size="sm">
          Export
        </Button>
      </>
    ),
    hideFooter: true,
    children: <p className="text-body text-text-primary">Account detail body.</p>,
  },
};

/** `description` is a block container — paragraphs and lists are fine. */
export const BlockDescription: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Select members",
    description: (
      <>
        <p style={{ margin: 0 }}>Pick the members to include.</p>
        <ul style={{ margin: "var(--space-0) 0 0", paddingLeft: "var(--space-3)" }}>
          <li>Descendants are included automatically.</li>
          <li>Shared members are listed once.</li>
        </ul>
      </>
    ),
    children: <p className="text-body text-text-primary">Body.</p>,
  },
};

/** `bodyScroll={false}` — the body is a fixed flex column; each pane scrolls on its own. */
export const FixedBodyMultiPane: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Member selector",
    size: "xl",
    bodyScroll: false,
    children: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2)", height: "60dvh", minHeight: 0 }}>
        <div style={paneStyle} tabIndex={0} aria-label="Available members">
          {listItems("Available")}
        </div>
        <div style={paneStyle} tabIndex={0} aria-label="Selected members">
          {listItems("Selected")}
        </div>
      </div>
    ),
  },
};

/** `animate={false}` — no open/close transform, so `position: fixed` children (dnd-kit DragOverlay) are not shifted. */
export const NoAnimation: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Layout designer",
    animate: false,
    children: <p className="text-body text-text-primary">Opens and closes instantly with no transform.</p>,
  },
};

function GuardedCloseDemo() {
  const [open, setOpen] = useState(false);
  const [dirty, setDirty] = useState(true);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open editor
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit rule"
        onBeforeClose={() => !dirty || window.confirm("Discard unsaved changes?")}
        onConfirm={() => {
          setDirty(false);
          setOpen(false);
        }}
        confirmText="Save"
      >
        <label className="text-body text-text-primary" style={{ display: "flex", gap: "var(--space-1)" }}>
          <input type="checkbox" checked={dirty} onChange={(e) => setDirty(e.target.checked)} />
          Has unsaved changes
        </label>
      </Modal>
    </>
  );
}

/** `onBeforeClose` vetoes Escape / backdrop / X / Cancel — return `false` (or a promise of it) to stay open. */
export const GuardedClose: Story = {
  render: () => <GuardedCloseDemo />,
};

/** `rootProps` and direct `data-*` props land on the outermost `.modal-root`. */
export const RootAttributes: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Insert function",
    rootProps: { "data-anchored-popover": "true", className: "my-root-hook" },
    children: <p className="text-body text-text-primary">Inspect `.modal-root` for `data-anchored-popover`.</p>,
  },
};
