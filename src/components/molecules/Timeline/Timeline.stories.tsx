import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Timeline, { TimelineItem } from "./index";
import type { TimelineItemData } from "./Timeline.types";
import { TIMELINE_ALIGNS, TIMELINE_ORIENTATIONS, TIMELINE_SIZES, TIMELINE_STATUSES } from "./Timeline.config";

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const AlertIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
    <path d="M12 7v6" />
    <path d="M12 17h.01" />
  </svg>
);

const ORDER: TimelineItemData[] = [
  {
    id: "placed",
    title: "Order placed",
    description: "Order #10428 confirmed by email.",
    timestamp: new Date("2026-03-02T09:12:00Z"),
    status: "success",
    icon: CheckIcon,
  },
  {
    id: "packed",
    title: "Packed",
    description: "Two items packed at the Pune warehouse.",
    timestamp: new Date("2026-03-02T16:40:00Z"),
    status: "success",
    icon: CheckIcon,
  },
  {
    id: "delay",
    title: "Carrier delay",
    description: "Weather hold at the regional hub.",
    timestamp: new Date("2026-03-03T08:05:00Z"),
    status: "warning",
    icon: AlertIcon,
  },
  {
    id: "out",
    title: "Out for delivery",
    timestamp: new Date("2026-03-04T07:30:00Z"),
    status: "primary",
  },
];

const meta: Meta<typeof Timeline> = {
  title: "Design System/Molecules/Timeline",
  component: Timeline,
  subcomponents: { TimelineItem } as Record<string, React.ComponentType<unknown>>,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Ordered list (`<ol>`) of events: each item has a title, optional description, `<time dateTime>` timestamp, status-toned marker (with a hidden status word so colour is never the only cue) and optional icon. `orientation=\"horizontal\"` scrolls sideways inside a keyboard-focusable region and collapses to vertical at ≤ 640px; `align=\"alternate\"` zig-zags vertical timelines (single column ≤ 640px). `pending` appends an in-progress event. Use `items` for data, or compose `TimelineItem`s.",
      },
    },
  },
  argTypes: {
    orientation: { control: "inline-radio", options: TIMELINE_ORIENTATIONS },
    align: { control: "inline-radio", options: TIMELINE_ALIGNS },
    size: { control: "inline-radio", options: TIMELINE_SIZES },
    pending: { control: "boolean" },
    label: { control: "text" },
  },
  args: { items: ORDER, orientation: "vertical", align: "start", size: "md", pending: true, label: "Order history" },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Playground: Story = {};

export const Alternate: Story = {
  args: { align: "alternate" },
};

export const Horizontal: Story = {
  args: { orientation: "horizontal", label: "Release plan" },
  parameters: {
    docs: { description: { story: "Scrolls horizontally (Tab to the region, then arrow keys). Resize below 640px to see it collapse to vertical." } },
  },
};

export const Statuses: Story = {
  args: {
    pending: false,
    label: "Status tones",
    items: TIMELINE_STATUSES.map((status) => ({ id: status, title: `${status} event`, status, description: `status="${status}"` })),
  },
};

export const Composed: Story = {
  render: (args) => (
    <Timeline {...args} items={undefined} pending="Awaiting review">
      <TimelineItem title="Draft created" timestamp="2026-02-01" timestampLabel="1 Feb" />
      <TimelineItem title="Comments resolved" timestamp="2026-02-03" timestampLabel="3 Feb" status="success" />
    </Timeline>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
};
