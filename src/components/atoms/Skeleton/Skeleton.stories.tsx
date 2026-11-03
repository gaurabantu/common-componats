import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Skeleton, { SkeletonGroup } from "./index";
import { SKELETON_SHAPES } from "./Skeleton.config";

const meta: Meta<typeof Skeleton> = {
  title: "Design System/Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Placeholder shapes that mirror the layout of content that is still loading. Every `Skeleton` is `aria-hidden`; wrap a set of them in `SkeletonGroup`, a `role=\"status\"` region that announces its `label` (\"Loading content\"). SkeletonGroup does not set `aria-busy` on itself (that would silence it): set `aria-busy=\"true\"` on the container whose content is loading, e.g. `<section aria-busy={loading}>{loading ? <SkeletonGroup /> : content}</section>` — see the LoadingContainer story. The shimmer is switched off under `prefers-reduced-motion`. Use `Spinner` instead when the shape of the result is unknown.",
      },
    },
  },
  argTypes: {
    shape: { control: "inline-radio", options: SKELETON_SHAPES },
    lines: { control: { type: "number", min: 1, max: 8 } },
    width: { control: "text" },
    height: { control: "text" },
    radius: { control: "text" },
    animated: { control: "boolean" },
  },
  args: { shape: "text", lines: 3, animated: true },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  render: (args) => (
    <SkeletonGroup style={{ maxWidth: 420 }}>
      <Skeleton {...args} />
    </SkeletonGroup>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <SkeletonGroup style={{ maxWidth: 420 }}>
      <Skeleton animated={args.animated} shape="circle" />
      <Skeleton animated={args.animated} shape="text" lines={3} />
      <Skeleton animated={args.animated} shape="rect" height={120} />
    </SkeletonGroup>
  ),
};

export const CardPlaceholder: Story = {
  render: (args) => (
    <div className="sb-card" style={{ maxWidth: 420 }}>
      <SkeletonGroup label="Loading profile">
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
          <Skeleton animated={args.animated} shape="circle" width={48} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Skeleton animated={args.animated} shape="text" lines={2} />
          </div>
        </div>
        <Skeleton animated={args.animated} shape="rect" height={160} />
      </SkeletonGroup>
    </div>
  ),
};

export const Static: Story = {
  args: { animated: false },
  render: (args) => (
    <SkeletonGroup style={{ maxWidth: 420 }}>
      <Skeleton {...args} />
    </SkeletonGroup>
  ),
};

const LoadingContainerDemo = (args: React.ComponentProps<typeof Skeleton>) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <div className="sb-stack" style={{ maxWidth: 420 }}>
      <button type="button" className="btn-base btn-primary" onClick={() => setLoading((l) => !l)}>
        {loading ? "Finish loading" : "Reload"}
      </button>
      {/* aria-busy lives on the content container, not on SkeletonGroup. */}
      <section aria-busy={loading} aria-label="Recent activity">
        {loading ? (
          <SkeletonGroup label="Loading recent activity">
            <Skeleton animated={args.animated} shape="text" lines={3} />
          </SkeletonGroup>
        ) : (
          <p>3 invoices paid today.</p>
        )}
      </section>
    </div>
  );
};

export const LoadingContainer: Story = {
  render: (args) => <LoadingContainerDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Recommended pattern: the container being loaded carries `aria-busy`; `SkeletonGroup` inside it is the `role=\"status\"` announcement.",
      },
    },
  },
};
