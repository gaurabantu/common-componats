import type { Meta, StoryObj } from "@storybook/react";
import GradientText from "./index";

const meta: Meta<typeof GradientText> = {
  title: "Design System/Atoms/GradientText",
  component: GradientText,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    as: { control: "select", options: ["span", "p", "h1", "h2", "h3", "div"] },
    gradient: { control: "text" },
    fallbackColor: { control: "color" },
  },
  args: {
    children: "Gradient text",
    as: "span",
  },
};

export default meta;

type Story = StoryObj<typeof GradientText>;

export const Playground: Story = {
  args: {
    children: "Gradient text",
    as: "span",
  },
  render: (args) => <GradientText {...args} />,
};

export const Default: Story = {};

export const Heading: Story = {
  args: {
    as: "h2",
    children: "Premium dashboard heading",
    style: {
      fontSize: "var(--text-h2-size, 25px)",
      fontWeight: 800,
      lineHeight: 1.2,
    },
  },
};

export const CustomGradient: Story = {
  args: {
    children: "Purple to sky",
    gradient: "linear-gradient(135deg, var(--color-accent-lavender-40) 0%, var(--color-accent-sky-40) 100%)",
  },
};
