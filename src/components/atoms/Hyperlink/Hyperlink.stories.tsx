import type { Meta, StoryObj } from "@storybook/react";
import Hyperlink from "./index";

const meta: Meta<typeof Hyperlink> = {
  title: "Design System/Atoms/Hyperlink",
  component: Hyperlink,
  tags: ["autodocs"],
  argTypes: {
    openInNewTab: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Hyperlink>;

export const Default: Story = {
  args: {
    children: "Design system link",
    href: "#",
  },
};

export const NewTab: Story = {
  args: {
    children: "Opens in new tab",
    href: "https://example.com",
    openInNewTab: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled link",
    href: "#",
    disabled: true,
  },
};
