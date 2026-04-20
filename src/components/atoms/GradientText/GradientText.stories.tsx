import type { Meta, StoryObj } from "@storybook/react";
import GradientText from "./index";

const meta: Meta<typeof GradientText> = {
  title: "Design System/Atoms/GradientText",
  component: GradientText,
  tags: ["autodocs"],
  argTypes: {
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
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #38bdf8 100%)",
  },
};
