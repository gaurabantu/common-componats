import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, BreadcrumbItem } from "./index";

const meta: Meta<typeof Breadcrumb> = {
  title: "Design System/Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    separator: { control: "radio", options: ["slash", "chevron"] },
    size: { control: "radio", options: ["sm", "md"] },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumb>
  ),
  args: {
    ariaLabel: "Breadcrumb",
    separator: "slash",
    size: "sm",
  },
};

export const Chevron: Story = {
  render: () => (
    <Breadcrumb separator="chevron" size="md">
      <BreadcrumbItem href="/app">App</BreadcrumbItem>
      <BreadcrumbItem href="/app/settings">Settings</BreadcrumbItem>
      <BreadcrumbItem>Profile</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const CurrentWithHref: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
      <BreadcrumbItem href="/docs/api" current>
        API
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};
