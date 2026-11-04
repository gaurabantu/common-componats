import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Drawer, { Sheet } from "./index";
import Button from "../../atoms/Button";
import type { DrawerProps } from "./Drawer.types";

const meta: Meta<typeof Drawer> = {
  title: "Design System/Molecules/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Drawer (also exported as `Sheet`) is a dialog attached to a viewport edge, for filters, detail panels, " +
          "quick edits and mobile navigation. It is controlled: pass `open` and handle `onOpenChange(false)`. " +
          "By default it is modal, with a backdrop, body scroll lock, focus trap, `aria-modal`, and focus returned to the " +
          "trigger on close. Set `modal={false}` for a non-blocking side panel that Escape still closes. `title` names the dialog, " +
          "`description` describes it, the body scrolls between a fixed header and a sticky `footer`, and at 480px or narrower " +
          "left and right drawers go full width. Use `Modal` for short, centred confirmations. " +
          "Since 0.0.4: `headerActions` in the header, block `description` content, `bodyScroll={false}` so a child owns the scroll " +
          "(sticky table headers), and `onBeforeClose` to veto Escape / backdrop / close-button closes.",
      },
    },
  },
  argTypes: {
    side: { control: "inline-radio", options: ["right", "left", "top", "bottom"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl", "full"] },
    modal: { control: "boolean" },
    showCloseButton: { control: "boolean" },
    closeOnBackdropClick: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    returnFocus: { control: "boolean" },
    closeLabel: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
    open: { control: false },
    onOpenChange: { action: "onOpenChange" },
    footer: { control: false },
    initialFocusRef: { control: false },
    headerActions: { control: false },
    onBeforeClose: { control: false },
    bodyScroll: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

function WithTrigger({ label = "Open drawer", ...args }: Partial<DrawerProps> & { label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Drawer
        title="Drawer title"
        {...args}
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          args.onOpenChange?.(next);
        }}
        footer={
          args.footer ?? (
            <>
              <Button variant="outlineSecondary" size="md" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Apply
              </Button>
            </>
          )
        }
      />
    </>
  );
}

const LongBody = () => (
  <div className="sb-stack">
    {Array.from({ length: 24 }, (_, i) => (
      <p key={i} className="text-body text-text-primary" style={{ margin: 0 }}>
        Paragraph {i + 1}: the body scrolls while the header and footer stay put.
      </p>
    ))}
  </div>
);

export const Playground: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Filters",
    description: "Narrow the results by status and owner.",
    side: "right",
    size: "md",
    modal: true,
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    returnFocus: true,
    closeLabel: "Close",
    children: <p className="text-body text-text-primary">Drawer body content.</p>,
  },
};

export const Sides: Story = {
  render: () => (
    <div className="sb-inline">
      {(["right", "left", "top", "bottom"] as const).map((side) => (
        <WithTrigger key={side} side={side} label={`Open ${side}`} title={`Drawer from ${side}`}>
          <p className="text-body text-text-primary">Attached to the {side} edge.</p>
        </WithTrigger>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-inline">
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <WithTrigger key={size} size={size} label={`Size ${size}`} title={`Size ${size}`}>
          <p className="text-body text-text-primary">Width comes from Drawer.config.ts.</p>
        </WithTrigger>
      ))}
    </div>
  ),
};

export const ScrollingBodyStickyFooter: Story = {
  render: () => (
    <WithTrigger title="Release notes" description="v4.2.0">
      <LongBody />
    </WithTrigger>
  ),
};

export const NonModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With `modal={false}` there is no backdrop, scroll lock or focus trap, so the page stays interactive. Escape still closes the drawer.",
      },
    },
  },
  render: () => (
    <WithTrigger modal={false} title="Inspector" description="The page behind stays usable.">
      <p className="text-body text-text-primary">Use this for persistent side panels.</p>
    </WithTrigger>
  ),
};

function InitialFocusDemo() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open with initial focus
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Rename project"
        initialFocusRef={inputRef}
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
        }
      >
        <label className="text-body text-text-primary" htmlFor="drawer-rename">
          Project name
        </label>
        <input id="drawer-rename" ref={inputRef} defaultValue="Atlas" style={{ display: "block", width: "100%" }} />
      </Drawer>
    </>
  );
}

export const InitialFocus: Story = {
  render: () => <InitialFocusDemo />,
};

export const BottomSheet: Story = {
  name: "Sheet (bottom)",
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open sheet
          </Button>
          <Sheet open={open} onOpenChange={setOpen} side="bottom" size="sm" title="Share">
            <p className="text-body text-text-primary"><code>Sheet</code> is the same component as <code>Drawer</code>, opened from the bottom edge.</p>
          </Sheet>
        </>
      );
    }
    return <Demo />;
  },
};

/** `headerActions` render in the header, before the close button. */
export const HeaderActions: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Cell drill-down",
    headerActions: (
      <Button variant="outlineSecondary" size="sm">
        Export
      </Button>
    ),
    children: <p className="text-body text-text-primary">Drill-down detail.</p>,
  },
};

/** `bodyScroll={false}` — the child owns the scroll so its sticky header works. */
export const FixedBodyStickyTable: Story = {
  render: (args) => <WithTrigger {...args} />,
  args: {
    title: "Line items",
    side: "bottom",
    size: "lg",
    bodyScroll: false,
    children: (
      <div style={{ flex: "1 1 auto", minHeight: 0, overflowY: "auto" }} tabIndex={0} aria-label="Line items table">
        <table style={{ width: "100%", borderCollapse: "collapse" }} className="text-body text-text-primary">
          <thead>
            <tr>
              {["Line", "Amount"].map((h) => (
                <th
                  key={h}
                  style={{
                    position: "sticky",
                    top: 0,
                    textAlign: "left",
                    padding: "var(--space-0) var(--space-1)",
                    background: "var(--color-bg-surface)",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 40 }, (_, i) => (
              <tr key={i}>
                <td style={{ padding: "var(--space-0) var(--space-1)" }}>Line {i + 1}</td>
                <td style={{ padding: "var(--space-0) var(--space-1)" }}>{(i * 125).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
};

function GuardedDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open guarded drawer
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Edit integration"
        onBeforeClose={() =>
          new Promise<boolean>((resolve) => resolve(window.confirm("Discard unsaved changes?")))
        }
      >
        <p className="text-body text-text-primary">Escape, the backdrop and X all ask first.</p>
      </Drawer>
    </>
  );
}

/** `onBeforeClose` can be async — the close waits for it, and `false` keeps the drawer open. */
export const GuardedClose: Story = {
  render: () => <GuardedDrawerDemo />,
};
