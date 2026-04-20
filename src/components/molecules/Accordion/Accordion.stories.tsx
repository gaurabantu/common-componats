import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./index";

const meta: Meta<typeof Accordion> = {
  title: "Design System/Molecules/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["single", "multiple"] },
    variant: { control: "radio", options: ["default", "bordered", "flush"] },
    motion: { control: "radio", options: ["default", "none"] },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const SingleBasic: Story = {
  name: "Single (basic)",
  render: () => (
    <Accordion type="single" collapsible defaultValue="shipping">
      <AccordionItem value="shipping">
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5–7 days), express (2–3 days), and overnight shipping. Free shipping on many orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>30-day returns on unused items in original packaging.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>How can I contact support?</AccordionTrigger>
        <AccordionContent>Email support@example.com or use in-app chat 24/7.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="bordered" defaultValue="billing">
      <AccordionItem value="billing">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          Plans renew monthly or annually. You can cancel anytime from account settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>Is my data secure?</AccordionTrigger>
        <AccordionContent>We use encryption at rest and in transit, and SOC 2 compliance.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["notifications"]}>
      <AccordionItem value="notifications">
        <AccordionTrigger>Notification settings</AccordionTrigger>
        <AccordionContent>Manage email and push preferences.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="privacy">
        <AccordionTrigger>Privacy &amp; security</AccordionTrigger>
        <AccordionContent>Control data sharing and two-factor authentication.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="billing">
        <AccordionTrigger>Billing &amp; subscription</AccordionTrigger>
        <AccordionContent>Payment methods and invoices.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger>Available</AccordionTrigger>
        <AccordionContent>Content A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b" disabled>
        <AccordionTrigger>Disabled section</AccordionTrigger>
        <AccordionContent>Not shown</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MotionNone: Story = {
  name: "Motion none (instant, lighter DOM)",
  render: () => (
    <Accordion type="single" collapsible motion="none" defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>Closed panels unmount — no height transition.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>Content B</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Controlled: Story = {
  render: function ControlledDemo() {
    const [v, setV] = useState<string | undefined>("one");
    return (
      <div>
        <Accordion
          type="single"
          collapsible
          value={v}
          onValueChange={(next) => setV(Array.isArray(next) ? next[0] : next)}
        >
          <AccordionItem value="one">
            <AccordionTrigger>First</AccordionTrigger>
            <AccordionContent>Panel one</AccordionContent>
          </AccordionItem>
          <AccordionItem value="two">
            <AccordionTrigger>Second</AccordionTrigger>
            <AccordionContent>Panel two</AccordionContent>
          </AccordionItem>
        </Accordion>
        <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-secondary)" }}>
          Open: {v ?? "<none>"}
        </p>
      </div>
    );
  },
};
