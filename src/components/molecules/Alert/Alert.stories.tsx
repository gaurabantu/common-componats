import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./index";
import Button from "../../atoms/Button";
import type { AlertVariant } from "./Alert.types";

const VARIANTS: AlertVariant[] = ["info", "success", "warning", "danger", "neutral"];

const meta: Meta<typeof Alert> = {
  title: "Design System/Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Inline, persistent message for pages and forms. Meaning is carried by an icon plus a visually-hidden prefix (\"Error:\", \"Warning:\" …), never colour alone. Alerts are static by default (`live=\"off\"`, no live role) so they do not announce on page load; set `live=\"polite\"` or `\"assertive\"` only when the alert is inserted in response to a user action (e.g. a failed form submit). For transient confirmations use `Toast` instead.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    appearance: { control: "inline-radio", options: ["soft", "outline", "solid-accent"] },
    live: { control: "inline-radio", options: ["off", "polite", "assertive"] },
    compact: { control: "boolean" },
    hideIcon: { control: "boolean" },
    srPrefix: { control: "boolean" },
    dismissLabel: { control: "text" },
  },
  args: {
    variant: "info",
    appearance: "soft",
    title: "Scheduled maintenance",
    children: "The dashboard will be read-only on Sunday from 02:00 to 04:00 UTC.",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 640 }}>
      <Alert {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="sb-stack" style={{ maxWidth: 640 }}>
      {VARIANTS.map((v) => (
        <Alert key={v} {...args} variant={v} title={`${v[0].toUpperCase()}${v.slice(1)} title`}>
          Supporting description for the {v} alert.
        </Alert>
      ))}
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 640 }}>
      <Alert appearance="soft" variant="warning" title="Soft">Tinted fill with tone-coloured icon and title.</Alert>
      <Alert appearance="outline" variant="warning" title="Outline">Surface background with a tone border.</Alert>
      <Alert appearance="solid-accent" variant="warning" title="Solid accent">Surface background with a 4px left bar.</Alert>
    </div>
  ),
};

export const WithActionAndDismiss: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return open ? (
      <div style={{ maxWidth: 640 }}>
        <Alert
          variant="danger"
          title="Payment failed"
          action={
            <Button size="sm" variant="outlineSecondary">
              Retry
            </Button>
          }
          onDismiss={() => setOpen(false)}
          dismissLabel="Dismiss payment error"
        >
          Your card was declined. Update the payment method or try again.
        </Alert>
      </div>
    ) : (
      <Button size="sm" variant="outlineSecondary" onClick={() => setOpen(true)}>
        Show alert again
      </Button>
    );
  },
};

export const Compact: Story = {
  args: { compact: true, variant: "success", title: "Saved.", children: "All changes are stored." },
};

/** Inserted after a user action → announced. `assertive` + danger renders `role="alert"`. */
export const LiveOnSubmit: Story = {
  render: () => {
    const [error, setError] = useState(false);
    return (
      <div className="sb-stack" style={{ maxWidth: 640 }}>
        <Button size="sm" onClick={() => setError(true)}>
          Submit form
        </Button>
        {error ? (
          <Alert variant="danger" live="assertive" title="2 fields need attention" onDismiss={() => setError(false)}>
            Enter a valid email address and accept the terms.
          </Alert>
        ) : null}
      </div>
    );
  },
};
