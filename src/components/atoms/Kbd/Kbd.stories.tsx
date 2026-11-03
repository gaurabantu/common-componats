import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Kbd from "./index";
import { KBD_SIZES } from "./Kbd.config";

const meta: Meta<typeof Kbd> = {
  title: "Design System/Atoms/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Keyboard key / shortcut chip rendered as semantic `<kbd>`. Pass `keys` for a combo (`[\"mod\", \"k\"]`): each key is a nested `<kbd>`, separators are decorative, and glyphs such as ⌘ carry a visually-hidden spoken name. `mod` shows ⌘ on macOS and Ctrl elsewhere; detection is SSR-safe (server and hydration render Ctrl, then the client corrects it). Force `platform` for documentation.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: KBD_SIZES },
    platform: { control: "inline-radio", options: ["auto", "mac", "other"] },
    keys: { control: "object" },
    separator: { control: "text" },
  },
  args: { keys: ["mod", "k"], size: "sm", platform: "auto" },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Playground: Story = {};

export const Platforms: Story = {
  render: (args) => (
    <div className="sb-stack">
      <div className="sb-inline">
        <Kbd {...args} platform="mac" /> <span>macOS</span>
      </div>
      <div className="sb-inline">
        <Kbd {...args} platform="other" /> <span>Windows / Linux</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="sb-inline">
      {KBD_SIZES.map((size) => (
        <Kbd key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const SingleKey: Story = {
  render: () => (
    <p>
      Press <Kbd>Esc</Kbd> to close or <Kbd keys={["enter"]} /> to confirm.
    </p>
  ),
};

export const Combos: Story = {
  render: (args) => (
    <div className="sb-stack">
      <Kbd {...args} keys={["mod", "shift", "p"]} />
      <Kbd {...args} keys={["alt", "up"]} />
      <Kbd {...args} keys={["ctrl", "alt", "delete"]} />
      <Kbd {...args} keys={["g", "d"]} separator="then" />
    </div>
  ),
};
