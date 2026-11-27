import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AvatarGroup from "./index";
import Avatar from "../Avatar";
import { AVATAR_GROUP_SIZES, AVATAR_GROUP_SPACINGS } from "./AvatarGroup.config";
import type { AvatarGroupItem } from "./AvatarGroup.types";

const TEAM: AvatarGroupItem[] = [
  { id: 1, name: "Ana Silva" },
  { id: 2, name: "Ben Okafor", backgroundColor: "var(--color-accent-sky-10)" },
  { id: 3, name: "Chen Wei", backgroundColor: "var(--color-accent-mint-10)" },
  { id: 4, name: "Dara Khan", backgroundColor: "var(--color-accent-amber-10)" },
  { id: 5, name: "Eli Roth", backgroundColor: "var(--color-accent-rose-10)" },
  { id: 6, name: "Fay Ito" },
  { id: 7, name: "Gil Moss", backgroundColor: "var(--color-accent-sky-10)" },
];

const meta: Meta<typeof AvatarGroup> = {
  title: "Design System/Atoms/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Overlapping row of `Avtar`s in a labelled `role=\"group\"`. Avatars past `max` collapse into a \"+N\" chip: a button whose accessible name lists the hidden people (\"Show 3 more: …\") and opens a popover with the full list — or calls `onOverflowClick`. Pass `total` when the server knows more people than you render (the chip becomes informational when no hidden names are known).",
      },
    },
  },
  argTypes: {
    max: { control: { type: "number", min: 0, max: 10 } },
    total: { control: { type: "number", min: 0 } },
    size: { control: "inline-radio", options: AVATAR_GROUP_SIZES },
    spacing: { control: "inline-radio", options: AVATAR_GROUP_SPACINGS },
    label: { control: "text" },
    onOverflowClick: { control: false },
  },
  // `onOverflowClick: undefined` must be present as a key: the global `actions.argTypesRegex`
  // (.storybook/preview.tsx) only injects a spy for `on*` args missing from initialArgs, and an
  // injected handler would turn the "+N" chip into a plain button (no default popover).
  args: { items: TEAM, max: 4, size: "md", spacing: "normal", label: "Project members", onOverflowClick: undefined },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-stack">
      {AVATAR_GROUP_SIZES.map((size) => (
        <AvatarGroup key={size} {...args} size={size} label={`Members, size ${size}`} />
      ))}
    </div>
  ),
};

export const Spacing: Story = {
  render: (args) => (
    <div className="sb-stack">
      {AVATAR_GROUP_SPACINGS.map((spacing) => (
        <AvatarGroup key={spacing} {...args} spacing={spacing} label={`Members, ${spacing} spacing`} />
      ))}
    </div>
  ),
};

export const ServerTotal: Story = {
  args: { items: TEAM.slice(0, 3), max: 3, total: 48, label: "48 reviewers" },
};

export const WithOverflowHandler: Story = {
  args: { onOverflowClick: () => undefined },
  parameters: { docs: { description: { story: "With `onOverflowClick` the chip is a plain button (e.g. open a members drawer)." } } },
};

export const Children: Story = {
  render: (args) => (
    <AvatarGroup {...args} items={undefined} max={2}>
      <Avatar name="Ira Patel" />
      <Avatar name="Jon Ruiz" />
      <Avatar name="Kai Berg" />
    </AvatarGroup>
  ),
};
