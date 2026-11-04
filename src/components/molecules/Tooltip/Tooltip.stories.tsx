import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./index";
import Button from "../../atoms/Button";
import Modal from "../Modal";
import { TOOLTIP_ALIGNS, TOOLTIP_DEFAULTS, TOOLTIP_SIDES, TOOLTIP_VARIANTS } from "./Tooltip.config";

const TrashIcon = (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
  </svg>
);

const meta: Meta<typeof Tooltip> = {
  title: "Design System/Molecules/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Generic tooltip for **any focusable trigger** (Button, link, input). Wrap one element: it is cloned to add hover/focus handlers and `aria-describedby`, and the `role=\"tooltip\"` bubble is portalled to `<body>`. Opens on hover (after `delay`) and immediately on keyboard focus; Escape dismisses it without moving focus; the pointer can move onto the bubble; it stays open until hover and focus both leave (WCAG 1.4.13). Flips to the opposite side near viewport edges. Use it for short supplementary text only — never as the sole accessible name of an icon-only control (give that an `aria-label`), and never for interactive content (use `Popover`).\n\n**Tooltip vs ToolTip:** `ToolTip` (Atoms, capital T) is the legacy **info-icon helper** — it renders its own \"i\" icon trigger next to a label. `Tooltip` (this component) renders **no trigger of its own**; it describes the element you pass as `children`. Disabled buttons do not receive pointer/focus events — wrap them in a `<span tabIndex={0}>` if they need a tooltip.",
      },
    },
  },
  argTypes: {
    content: { control: "text" },
    side: { control: "inline-radio", options: TOOLTIP_SIDES },
    align: { control: "inline-radio", options: TOOLTIP_ALIGNS },
    variant: { control: "inline-radio", options: TOOLTIP_VARIANTS },
    delay: { control: { type: "number", min: 0, step: 50 } },
    closeDelay: { control: { type: "number", min: 0, step: 50 } },
    maxWidth: { control: { type: "number", min: 120, step: 20 } },
    disabled: { control: "boolean" },
    open: { control: "boolean" },
    children: { control: false },
  },
  args: {
    content: "Saves a draft you can return to later.",
    side: TOOLTIP_DEFAULTS.side,
    align: TOOLTIP_DEFAULTS.align,
    variant: TOOLTIP_DEFAULTS.variant,
    delay: TOOLTIP_DEFAULTS.delay,
    closeDelay: TOOLTIP_DEFAULTS.closeDelay,
    maxWidth: TOOLTIP_DEFAULTS.maxWidth,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="sb-page" style={{ minHeight: 240, display: "grid", placeItems: "center" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlineSecondary">Save draft</Button>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: (args) => (
    <div className="sb-inline" style={{ gap: "var(--space-3)", flexWrap: "wrap" }}>
      {TOOLTIP_SIDES.map((side) => (
        <Tooltip key={side} {...args} side={side} content={`Tooltip on ${side}`}>
          <Button variant="outlineSecondary">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: (args) => (
    <div className="sb-inline" style={{ gap: "var(--space-3)", flexWrap: "wrap" }}>
      {TOOLTIP_ALIGNS.map((align) => (
        <Tooltip key={align} {...args} side="bottom" align={align} content={`Aligned ${align}`}>
          <Button variant="outlineSecondary">{align}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="sb-inline" style={{ gap: "var(--space-3)" }}>
      <Tooltip {...args} variant="dark" content="Dark (inverted) — default">
        <Button variant="outlineSecondary">Dark</Button>
      </Tooltip>
      <Tooltip {...args} variant="light" content="Light — elevated surface">
        <Button variant="outlineSecondary">Light</Button>
      </Tooltip>
    </div>
  ),
};

export const OnIconButton: Story = {
  name: "Icon-only trigger",
  render: (args) => (
    <Tooltip {...args} content="Delete item (cannot be undone)">
      <Button variant="outlineSecondary" ariaLabel="Delete" icon={TrashIcon} />
    </Tooltip>
  ),
};

export const OnLinkAndInput: Story = {
  name: "Link and input triggers",
  render: (args) => (
    <div className="sb-stack" style={{ gap: "var(--space-2)" }}>
      <Tooltip {...args} content="Opens the billing documentation">
        <a href="#billing">Billing docs</a>
      </Tooltip>
      <label className="sb-stack" style={{ gap: "var(--space-0)" }}>
        <span>Project slug</span>
        <Tooltip {...args} side="right" content="Lowercase letters, numbers and dashes only.">
          <input type="text" defaultValue="my-project" />
        </Tooltip>
      </label>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    maxWidth: 280,
    content:
      "Long supplementary text wraps inside maxWidth and is always capped to the viewport width, so it stays readable on a 375px screen. Hover the bubble itself — it stays open.",
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlineSecondary">Hover me</Button>
    </Tooltip>
  ),
};

export const EdgeFlip: Story = {
  name: "Collision flip",
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-0)" }}>
      <Tooltip {...args} side="top" content="Flipped to bottom — no room above">
        <Button variant="outlineSecondary">Top edge</Button>
      </Tooltip>
      <Tooltip {...args} side="right" content="Flipped to left — no room on the right">
        <Button variant="outlineSecondary">Right edge</Button>
      </Tooltip>
    </div>
  ),
};

function ControlledDemo(args: React.ComponentProps<typeof Tooltip>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sb-stack" style={{ gap: "var(--space-2)", alignItems: "center" }}>
      <Tooltip {...args} open={open} onOpenChange={setOpen} content="Controlled tooltip">
        <Button variant="outlineSecondary">Trigger</Button>
      </Tooltip>
      <span aria-live="polite">open: {String(open)}</span>
    </div>
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledDemo {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, content: "You will not see this" },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlineSecondary">Tooltip disabled</Button>
    </Tooltip>
  ),
};

/**
 * Layering: default `--z-tooltip-top` (600) sits above Modal / Drawer / Popover, and is lifted above
 * any host overlay stacked higher (here a Modal at `zIndex={10000}`). `zIndex` overrides both.
 */
export const InsideHighModal: Story = {
  render: function InsideHighModalDemo(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button size="sm" onClick={() => setOpen(true)}>
          Open dialog (z 10000)
        </Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Tooltip layering" zIndex={10000} hideFooter>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <Tooltip {...args} content="Auto-lifted above the dialog">
              <Button variant="outlineSecondary">Auto layer</Button>
            </Tooltip>
            <Tooltip {...args} content="Explicit zIndex={20000}" zIndex={20000}>
              <Button variant="outlineSecondary">Explicit zIndex</Button>
            </Tooltip>
          </div>
        </Modal>
      </>
    );
  },
};
