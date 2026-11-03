import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Toast, { ToastProvider, useToast } from "./index";
import Button from "../../atoms/Button";
import type { ToastPosition, ToastVariant } from "./Toast.types";

const VARIANTS: ToastVariant[] = ["info", "success", "warning", "danger", "neutral"];
const POSITIONS: ToastPosition[] = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];

const meta: Meta<typeof Toast> = {
  title: "Design System/Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Transient notifications. Wrap the app once in `ToastProvider` (props: `position`, `max`, `duration`) and call `useToast().toast({ title, description, variant, action, duration, dismissible, id })` — it returns an id for `dismiss(id)`; `dismissAll()` clears the stack. Toasts render in a portal `<section aria-label=\"Notifications\">` and **never take focus**. Keyboard: press **F8** to jump to the notifications region, **Tab** between toasts and their buttons, **Escape** to dismiss the focused toast (focus returns to where you were). Announcements come from the always-mounted polite region; `danger` toasts are `role=\"alert\"`. Timers pause on hover, on focus, and while the tab is hidden; `duration: Infinity` makes a toast sticky. **A toast with an `action` stays open until dismissed** unless you pass `duration` (WCAG 2.2.1) — still, never make a toast action the only path to a task.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    dismissible: { control: "boolean" },
    srPrefix: { control: "boolean" },
  },
  args: {
    variant: "success",
    title: "Changes saved",
    description: "Your profile was updated.",
    dismissible: true,
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/** Static presentational toast (no timer). */
export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 384 }}>
      <Toast {...args} onDismiss={() => {}} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 384 }}>
      {VARIANTS.map((v) => (
        <Toast key={v} variant={v} title={`${v[0].toUpperCase()}${v.slice(1)} toast`} description="Supporting text." onDismiss={() => {}} />
      ))}
      <Toast variant="info" title="Message archived" action={{ label: "Undo", onClick: () => {} }} onDismiss={() => {}} />
    </div>
  ),
};

function Demo() {
  const { toast, dismissAll } = useToast();
  return (
    <div className="sb-stack">
      <p style={{ margin: 0 }}>
        Trigger toasts below, then press <kbd>F8</kbd> to move focus to the notifications region, <kbd>Tab</kbd> through
        them and <kbd>Escape</kbd> to dismiss.
      </p>
      <div className="sb-inline" style={{ flexWrap: "wrap", gap: "var(--space-1)" }}>
        {VARIANTS.map((v) => (
          <Button key={v} size="sm" variant="outlineSecondary" onClick={() => toast({ variant: v, title: `${v} notification`, description: "Auto-dismisses after 5s." })}>
            {v}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outlineSecondary"
          onClick={() => toast({ title: "Conversation archived", action: { label: "Undo", onClick: () => toast({ title: "Restored", variant: "success" }) } })}
        >
          With action (sticky)
        </Button>
        <Button size="sm" variant="outlineSecondary" onClick={() => toast({ title: "Sticky", description: "Stays until dismissed.", duration: Infinity })}>
          Sticky
        </Button>
        <Button size="sm" variant="ghost" onClick={dismissAll}>
          Dismiss all
        </Button>
      </div>
    </div>
  );
}

/** Live provider. Change `position` / `max` / `duration` in Controls. */
export const WithProvider: StoryObj<{ position: ToastPosition; max: number; duration: number }> = {
  argTypes: {
    position: { control: "select", options: POSITIONS },
    max: { control: { type: "number", min: 1, max: 6 } },
    duration: { control: { type: "number", step: 500 } },
  },
  args: { position: "bottom-right", max: 3, duration: 5000 },
  render: (args) => (
    <ToastProvider key={`${args.position}-${args.max}-${args.duration}`} position={args.position} max={args.max} duration={args.duration}>
      <Demo />
    </ToastProvider>
  ),
};
