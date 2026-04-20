import type { Meta, StoryObj } from "@storybook/react";
import TextView from "./index";

const meta: Meta<typeof TextView> = {
  title: "Design System/Atoms/TextView",
  component: TextView,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "p", "span", "small", "label", "div", "strong", "em"],
    },
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "body", "secondary", "small", "micro"],
    },
    color: {
      description: "Semantic token or any CSS color (e.g. #ff0000, rgb(255,0,0))",
      control: { type: "select" },
      options: ["primary", "secondary", "hint", "disabled", "success", "warning", "error", "inherit"],
    },
    fontSize: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "body", "secondary", "small", "micro"],
    },
    fontWeight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
    },
    lineHeight: { control: "select", options: ["none", "tight", "snug", "normal", "relaxed", "loose"] },
    letterSpacing: { control: "select", options: ["tighter", "tight", "normal", "wide", "wider", "widest"] },
    align: { control: "select", options: ["left", "center", "right", "justify"] },
    transform: { control: "select", options: ["none", "uppercase", "lowercase", "capitalize"] },
    decoration: { control: "select", options: ["none", "underline", "line-through"] },
    truncate: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof TextView>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <TextView variant="h1">Heading 1 — 32px Extra-Bold</TextView>
      <TextView variant="h2">Heading 2 — 25px Extra-Bold</TextView>
      <TextView variant="h3">Heading 3 — 18px Medium</TextView>
      <TextView variant="h4">Heading 4 — 16px Medium</TextView>
      <TextView variant="body">Body — 16px Regular</TextView>
      <TextView variant="secondary" color="secondary">
        Secondary — 14px
      </TextView>
      <TextView variant="small" color="secondary">
        Small / Caption — 12px
      </TextView>
      <TextView variant="micro" transform="uppercase" color="secondary">
        Micro — 10px SemiBold
      </TextView>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <TextView color="primary">Primary</TextView>
      <TextView color="secondary">Secondary / Hint</TextView>
      <TextView color="disabled">Disabled</TextView>
      <TextView color="success">Success</TextView>
      <TextView color="warning">Warning</TextView>
      <TextView color="error">Error</TextView>
    </div>
  ),
};

export const ColorHexOrCSS: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-baseline">
      <TextView color="#2563EB">Hex blue</TextView>
      <TextView color="#dc2626">Hex red</TextView>
      <TextView color="rgb(34, 197, 94)">RGB green</TextView>
      <TextView color="var(--color-brand-secondary)">CSS variable</TextView>
    </div>
  ),
};

export const FontSizeWeightCustomCSS: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <TextView fontSize="18px" fontWeight={600}>
        Custom fontSize 18px + fontWeight 600
      </TextView>
      <TextView fontSize="1.25rem" fontWeight="750">
        Custom fontSize 1.25rem + fontWeight "750"
      </TextView>
    </div>
  ),
};

export const FontSizeWeightAndSpacing: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <TextView variant="small" color="secondary" className="block mb-1">
          Font size override
        </TextView>
        <div className="flex flex-wrap gap-2 items-baseline">
          <TextView variant="body" fontSize="micro">Micro</TextView>
          <TextView variant="body" fontSize="small">Small</TextView>
          <TextView variant="body" fontSize="secondary">Secondary</TextView>
          <TextView variant="body" fontSize="body">Body</TextView>
          <TextView variant="body" fontSize="h4">H4</TextView>
          <TextView variant="body" fontSize="h3">H3</TextView>
          <TextView variant="body" fontSize="h2">H2</TextView>
          <TextView variant="body" fontSize="h1">H1</TextView>
        </div>
      </div>
      <div>
        <TextView variant="small" color="secondary" className="block mb-1">
          Font weight
        </TextView>
        <div className="flex flex-wrap gap-3 items-baseline">
          <TextView variant="body" fontWeight="normal">Normal</TextView>
          <TextView variant="body" fontWeight="medium">Medium</TextView>
          <TextView variant="body" fontWeight="semibold">Semibold</TextView>
          <TextView variant="body" fontWeight="bold">Bold</TextView>
          <TextView variant="body" fontWeight="extrabold">Extrabold</TextView>
        </div>
      </div>
      <div>
        <TextView variant="small" color="secondary" className="block mb-1">
          Line height
        </TextView>
        <div className="flex flex-wrap gap-3 max-w-md">
          <TextView variant="body" lineHeight="tight">Tight line height</TextView>
          <TextView variant="body" lineHeight="normal">Normal line height</TextView>
          <TextView variant="body" lineHeight="relaxed">Relaxed line height for readability</TextView>
        </div>
      </div>
      <div>
        <TextView variant="small" color="secondary" className="block mb-1">
          Letter spacing
        </TextView>
        <div className="flex flex-wrap gap-3">
          <TextView variant="body" letterSpacing="tight">Tight</TextView>
          <TextView variant="body" letterSpacing="normal">Normal</TextView>
          <TextView variant="body" letterSpacing="wide">Wide</TextView>
        </div>
      </div>
    </div>
  ),
};

export const AsParagraph: Story = {
  args: {
    as: "p",
    variant: "body",
    children: "This is body text using design system tokens.",
  },
};

export const Playground: Story = {
  args: {
    variant: "body",
    color: "primary",
    fontSize: undefined,
    fontWeight: undefined,
    lineHeight: undefined,
    letterSpacing: undefined,
    align: "left",
    transform: "none",
    decoration: "none",
    truncate: false,
    children: "Edit props in Controls to test fontSize, fontWeight, lineHeight, letterSpacing.",
  },
};
