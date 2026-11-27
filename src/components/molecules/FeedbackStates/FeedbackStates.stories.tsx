import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../atoms/Button";
import {
  EmptyState,
  ErrorState,
  OfflineBanner,
  FeedbackState,
  NoDataAnimation,
  NoSearchResultsAnimation,
  ErrorAnimation,
  OfflineAnimation,
  SuccessAnimation,
  InfoAnimation,
  FEEDBACK_ANIMATIONS,
} from "./index";
import type { FeedbackAnimationName } from "./index";

const meta: Meta<typeof EmptyState> = {
  title: "Design System/Molecules/FeedbackStates",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Every export of `FeedbackStates` in one place: `EmptyState` (role=status, polite), `ErrorState` (role=alert when it has `onRetry`/`details`, else status), `OfflineBanner` (status, optional retry + dismiss), the variant-driven `FeedbackState` (`empty` · `success` · `info` · `error` · `offline`), and the six CSS-only illustrations (`FEEDBACK_ANIMATIONS`, decorative, motion stops under `prefers-reduced-motion`). Use the dedicated components for explicit JSX and `FeedbackState` for phase switches. Detailed scenario stories live under *Feedback states/*.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    align: { control: "inline-radio", options: ["center", "start"] },
    tone: { control: "select", options: ["neutral", "info", "success", "warning"] },
    compact: { control: "boolean" },
    role: { control: "inline-radio", options: ["status", "region"] },
    title: { control: "text" },
    description: { control: "text" },
    image: { control: false },
    icon: { control: false },
    action: { control: false },
    extra: { control: false },
  },
  args: {
    title: "No data yet",
    description: "Records will appear here once they are created.",
    size: "md",
    align: "center",
    tone: "neutral",
    compact: false,
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/** `EmptyState` — tweak every prop from Controls. */
export const Playground: Story = {
  render: (args) => (
    <EmptyState
      {...args}
      image={<NoDataAnimation />}
      action={
        <Button variant="primary" size="md">
          Create record
        </Button>
      }
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <EmptyState
      title="No results found"
      description="Try a different keyword or clear the filters."
      image={<NoSearchResultsAnimation />}
      action={<Button variant="outlinePrimary">Clear filters</Button>}
      extra={<Button variant="link">Learn how search works</Button>}
    />
  ),
};

export const ErrorWithRetry: Story = {
  name: "Error",
  render: () => (
    <ErrorState
      title="We couldn't load your projects"
      description="Check your connection and try again."
      image={<ErrorAnimation />}
      onRetry={() => {}}
      details="Request ID: 7f3c-21ab · HTTP 503"
      extra={<Button variant="ghost">Contact support</Button>}
    />
  ),
};

/** Non-blocking inline error: no retry/details → `role="status"`. */
export const ErrorInline: Story = {
  render: () => (
    <ErrorState
      compact
      size="sm"
      align="start"
      tone="warning"
      title="Some charts are out of date"
      description="Data refreshes every 15 minutes."
    />
  ),
};

export const Offline: Story = {
  render: () => (
    <div className="sb-stack">
      <OfflineBanner onRetry={() => {}} onDismiss={() => {}} />
      <OfflineBanner
        tone="neutral"
        compact
        headline="You're offline"
        message="Changes are saved locally and will sync when you reconnect."
      />
      <OfflineBanner image={<OfflineAnimation />} headline="No internet connection." onRetry={() => {}} />
    </div>
  ),
};

/** `FeedbackState` — one component, every `variant`. */
export const AllVariants: Story = {
  render: () => (
    <div className="sb-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))" }}>
      <FeedbackState variant="empty" title="Nothing here yet" description="Add your first item." size="sm" />
      <FeedbackState variant="success" title="All done" description="Everything has been processed." size="sm" />
      <FeedbackState variant="info" title="Heads up" description="Maintenance tonight at 22:00." size="sm" />
      <FeedbackState variant="error" title="Upload failed" description="The file is too large." onRetry={() => {}} size="sm" />
      <FeedbackState variant="offline" compact onRetry={() => {}} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="sb-stack">
      {(["sm", "md", "lg"] as const).map((size) => (
        <EmptyState key={size} size={size} title={`Size ${size}`} description="Same content, different scale." />
      ))}
    </div>
  ),
};

/** The six decorative illustrations (`aria-hidden`); animation stops under `prefers-reduced-motion`. */
export const Illustrations: Story = {
  render: () => {
    const entries = Object.entries(FEEDBACK_ANIMATIONS) as [FeedbackAnimationName, React.ComponentType<{ size?: number }>][];
    return (
      <div className="sb-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))" }}>
        {entries.map(([name, Illustration]) => (
          <figure key={name} style={{ margin: 0, textAlign: "center" }}>
            <Illustration size={96} />
            <figcaption style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-small-size)" }}>{name}</figcaption>
          </figure>
        ))}
      </div>
    );
  },
};

/** Named exports, for direct import. */
export const IllustrationExports: Story = {
  render: () => (
    <div className="sb-inline">
      <NoDataAnimation size={64} />
      <NoSearchResultsAnimation size={64} />
      <ErrorAnimation size={64} />
      <OfflineAnimation size={64} />
      <SuccessAnimation size={64} />
      <InfoAnimation size={64} />
    </div>
  ),
};
