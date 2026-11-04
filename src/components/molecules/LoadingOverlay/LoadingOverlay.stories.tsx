import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoadingOverlay from "./index";
import Button from "../../atoms/Button";

const meta: Meta<typeof LoadingOverlay> = {
  title: "Design System/Molecules/LoadingOverlay",
  component: LoadingOverlay,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "LoadingOverlay covers its nearest positioned ancestor (give the parent `position: relative`) or, with `fullScreen`, the whole viewport " +
          "(portalled to `document.body`, layered above open modals). `blocking` (default) swallows pointer input over the covered area and marks the " +
          "covered parent `aria-busy`. `blocking={false}` is a non-blocking veil: `pointer-events: none`, it never takes or traps focus, and the content " +
          "underneath stays usable — for \"Recalculating…\" hints. The status text (`label`, else `ariaLabel`) is announced through a `role=\"status\"` region. " +
          "Colours come from tokens only (`--color-bg-surface`, `--color-bg-overlay`).",
      },
    },
  },
  argTypes: {
    visible: { control: "boolean" },
    blocking: { control: "boolean" },
    fullScreen: { control: "boolean" },
    label: { control: "text" },
    ariaLabel: { control: "text" },
    spinnerSize: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    backdrop: { control: "inline-radio", options: ["surface", "dim", "none"] },
    zIndex: { control: "number" },
  },
  args: { visible: true, blocking: true, fullScreen: false, label: "Loading…", backdrop: "surface" },
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: "relative",
      minHeight: "14rem",
      padding: "var(--space-3)",
      border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-md)",
      background: "var(--color-bg-surface)",
    }}
  >
    <p className="text-body text-text-primary" style={{ marginTop: 0 }}>
      Panel content underneath the overlay.
    </p>
    <Button variant="outlineSecondary" size="md" onClick={() => window.alert("Clicked through")}>
      Try clicking me
    </Button>
    {children}
  </div>
);

export const Playground: Story = {
  render: (args) => (args.fullScreen ? <LoadingOverlay {...args} /> : <Panel><LoadingOverlay {...args} /></Panel>),
};

/** Blocking (default) — clicks on the panel are swallowed; the panel is `aria-busy`. */
export const Blocking: Story = {
  render: () => (
    <Panel>
      <LoadingOverlay label="Loading exclusions…" />
    </Panel>
  ),
};

/** Non-blocking veil — the button underneath stays clickable and focusable. */
export const NonBlockingVeil: Story = {
  render: () => (
    <Panel>
      <LoadingOverlay blocking={false} label="Recalculating…" />
    </Panel>
  ),
};

/** Dim backdrop with the spinner on a surface card. */
export const DimBackdrop: Story = {
  render: () => (
    <Panel>
      <LoadingOverlay backdrop="dim" label="Saving…" />
    </Panel>
  ),
};

function FullScreenDemo() {
  const [busy, setBusy] = useState(false);
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setBusy(true);
          window.setTimeout(() => setBusy(false), 2000);
        }}
      >
        Run for 2 seconds
      </Button>
      <LoadingOverlay fullScreen visible={busy} backdrop="dim" label="Consolidating…" />
    </>
  );
}

/** `fullScreen` — covers the viewport (and any open modal) for 2 seconds. */
export const FullScreen: Story = {
  render: () => <FullScreenDemo />,
};
