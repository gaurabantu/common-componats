import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { List, ListItem } from "./index";
import Badge from "../../atoms/Badge";
import Button from "../../atoms/Button";
import IconBox from "../../atoms/IconBox";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "../Card";

const Diamond = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round">
    <path d="m12 3 9 9-9 9-9-9 9-9Z" />
  </svg>
);

const FileIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
    <path d="M14 3v6h6" />
  </svg>
);

const meta: Meta<typeof List> = {
  title: "Design System/Molecules/List",
  component: List,
  subcomponents: { ListItem } as Record<string, React.ComponentType<unknown>>,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Settings-style rows: leading `IconBox` · title (optional link) · status `Badge` · description · meta · trailing action. Use inside a `Card` (no border) or stand-alone with `bordered`.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: { divided: true, bordered: false, size: "md" },
};

export default meta;
type Story = StoryObj<typeof List>;

const steps = [
  { title: "Opening Balance Carry Forward", badge: "System", desc: "Opening balances are carried forward from the closing balance of the prior period.", action: "Settings" },
  { title: "Calculate Movements", badge: "System", desc: "Calculates a default movement member from the closing balance, per entity.", action: "Settings" },
  { title: "After Opening Balance", badge: "Configurable", desc: "Calculations performed after carry-forward and before foreign exchange.", action: "Configure" },
  { title: "Equity Pickup", badge: null, desc: "Calculate equity pickup in holding companies.", action: null },
];

export const InsideCard: Story = {
  render: (args) => (
    <Card>
      <CardHeader>
        <CardTitle>Local Currency steps</CardTitle>
        <CardDescription>Select a step to view its properties. Configurable steps can be edited.</CardDescription>
      </CardHeader>
      <CardContent>
        <List {...args} aria-label="Local currency steps">
          {steps.map((s) => (
            <ListItem
              key={s.title}
              leading={<IconBox size="md">{Diamond}</IconBox>}
              title={s.title}
              href={s.action ? "#" : undefined}
              badge={
                s.badge ? (
                  <Badge variant={s.badge === "System" ? "neutral" : "info"}>{s.badge}</Badge>
                ) : undefined
              }
              description={s.desc}
              action={
                s.action ? (
                  <Button size="sm" variant="outlinePrimary">
                    {s.action}
                  </Button>
                ) : undefined
              }
            />
          ))}
        </List>
      </CardContent>
    </Card>
  ),
};

export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <List {...args} aria-label="Downloads">
      <ListItem
        leading={<IconBox tone="strong">{FileIcon}</IconBox>}
        title="tokens.css"
        badge={<Badge variant="success">v2.0.0</Badge>}
        description="All design tokens — colours, spacing, type, radius, motion, 8 themes."
        meta="42 KB"
        action={<Button size="sm" variant="outlinePrimary">Download</Button>}
      />
      <ListItem
        leading={<IconBox>{FileIcon}</IconBox>}
        title="ui-common-components-0.0.2.tgz"
        badge={<Badge>v0.0.2</Badge>}
        description="Component library package (ESM + CJS + types)."
        meta="310 KB"
        action={<Button size="sm" variant="outlinePrimary">Download</Button>}
        selected
      />
      <ListItem
        leading={<IconBox>{FileIcon}</IconBox>}
        title="Legacy bundle"
        badge={<Badge variant="warning">Deprecated</Badge>}
        description="No longer published."
        disabled
      />
    </List>
  ),
};

export const Dense: Story = {
  args: { size: "sm", bordered: true },
  render: (args) => (
    <List {...args} aria-label="Dense list">
      {["Alpha", "Beta", "Gamma"].map((t) => (
        <ListItem key={t} title={t} meta="Updated today" />
      ))}
    </List>
  ),
};
