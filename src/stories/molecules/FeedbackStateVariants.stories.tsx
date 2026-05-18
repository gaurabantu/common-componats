import type { Meta, StoryObj } from "@storybook/react";
import React, { useMemo, useState } from "react";
import { useAsyncContentPhase, useOnlineStatus } from "ui-common-hooks";

import Button from "../../components/atoms/Button";
import { FeedbackState } from "../../components/molecules/FeedbackStates";
import {
  ErrorAnimation,
  InfoAnimation,
  NoDataAnimation,
  OfflineAnimation,
  SuccessAnimation,
} from "../../components/molecules/FeedbackStates/FeedbackStates.animations";
import type { FeedbackStateProps } from "../../components/molecules/FeedbackStates";
import TextInput from "../../components/atoms/TextInput";
import TextView from "../../components/atoms/TextView";

const meta = {
  title: "Design System/Molecules/Feedback states/FeedbackState",
  component: FeedbackState,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["empty", "success", "info", "error", "offline"],
      description: "Which feedback surface to render",
      table: { defaultValue: { summary: '"empty"' } },
    },
    title: {
      control: "text",
      description: "Primary heading (empty / success / info / error variants)",
    },
    description: {
      control: "text",
      description: "Supporting copy",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Shell size scale",
      table: { defaultValue: { summary: '"md"' } },
    },
    align: {
      control: { type: "radio" },
      options: ["center", "start"],
      table: { defaultValue: { summary: '"center"' } },
    },
    compact: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    showAnimation: {
      control: "boolean",
      description: "Inject the matching built-in animated illustration",
      table: { defaultValue: { summary: "true" } },
    },
    showAction: {
      control: "boolean",
      description: "Show a primary action button (non-offline variants)",
      table: { defaultValue: { summary: "false" } },
    },
    actionLabel: {
      control: "text",
      table: { defaultValue: { summary: '"Action"' } },
    },
  },
  args: {
    variant: "empty",
    title: "Nothing here yet",
    description: "Add some records to get started.",
    size: "md",
    align: "center",
    compact: false,
    showAnimation: true,
    showAction: false,
    actionLabel: "Action",
  },
} satisfies Meta<FeedbackStateProps & { showAnimation: boolean; showAction: boolean; actionLabel: string }>;

export default meta;

type VariantStoryArgs = Omit<FeedbackStateProps, "variant"> & {
  variant: "empty" | "success" | "info" | "error" | "offline";
  showAnimation: boolean;
  showAction: boolean;
  actionLabel: string;
};

function animationFor(variant: string, size: "sm" | "md" | "lg" = "md"): React.ReactNode {
  const px = size === "lg" ? 140 : size === "sm" ? 80 : 110;
  if (variant === "empty") return <NoDataAnimation size={px} />;
  if (variant === "success") return <SuccessAnimation size={px} />;
  if (variant === "info") return <InfoAnimation size={px} />;
  if (variant === "error") return <ErrorAnimation size={px} />;
  if (variant === "offline") return <OfflineAnimation size={px} />;
  return null;
}

export const Playground: StoryObj<VariantStoryArgs> = {
  name: "FeedbackState · Playground",
  render: ({ variant, showAnimation, showAction, actionLabel, size, ...rest }) => {
    if (variant === "offline") {
      return (
        <FeedbackState
          variant="offline"
          onRetry={() => window.alert("Retry")}
          compact={(rest as { compact?: boolean }).compact}
          tone={(rest as { tone?: "neutral" | "warning" }).tone}
        />
      );
    }

    const imageNode = showAnimation ? animationFor(variant, size as "sm" | "md" | "lg") : undefined;
    const action = showAction ? (
      <Button variant="primary" size={size === "sm" ? "sm" : "md"} type="button">
        {actionLabel}
      </Button>
    ) : undefined;

    if (variant === "error") {
      return (
        <FeedbackState
          variant="error"
          title={(rest as { title?: string }).title ?? "Something went wrong"}
          description={(rest as { description?: string }).description}
          image={imageNode}
          size={size as "sm" | "md" | "lg"}
          align={(rest as { align?: "center" | "start" }).align}
          compact={(rest as { compact?: boolean }).compact}
          onRetry={showAction ? () => window.alert("Retry") : undefined}
          retryLabel={actionLabel}
        />
      );
    }

    return (
      <FeedbackState
        variant={variant as "empty" | "success" | "info"}
        title={(rest as { title?: string }).title ?? ""}
        description={(rest as { description?: string }).description}
        image={imageNode}
        size={size as "sm" | "md" | "lg"}
        align={(rest as { align?: "center" | "start" }).align}
        compact={(rest as { compact?: boolean }).compact}
        action={action}
      />
    );
  },
};

export const AllVariants: StoryObj<VariantStoryArgs> = {
  name: "All variants",
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-5, 24px)" }}>
      <FeedbackState
        variant="empty"
        title="No records"
        description="Add items to populate this view."
        image={<NoDataAnimation size={100} />}
        action={<Button variant="primary" size="sm" type="button">Add item</Button>}
      />
      <FeedbackState
        variant="success"
        title="Payment confirmed"
        description="Your subscription has been activated."
        image={<SuccessAnimation size={100} />}
        action={<Button variant="primary" size="sm" type="button">Dashboard</Button>}
      />
      <FeedbackState
        variant="info"
        title="Verify your email"
        description="Check your inbox and click the confirmation link."
        image={<InfoAnimation size={100} />}
      />
      <FeedbackState
        variant="error"
        title="Something went wrong"
        description="We couldn't load your data. Try again."
        image={<ErrorAnimation size={100} />}
        onRetry={() => window.alert("Retry")}
      />
      <FeedbackState
        variant="offline"
        image={<OfflineAnimation size={100} />}
        onRetry={() => undefined}
      />
    </div>
  ),
};

export const WiredWithHooks: StoryObj<VariantStoryArgs> = {
  name: "Wired with useAsyncContentPhase",
  parameters: { layout: "padded" },
  render: function Wired() {
    const { online } = useOnlineStatus(true);
    const [query, setQuery] = useState("");
    const [forcedError, setForcedError] = useState<unknown>(null);

    const items = useMemo(
      () => ["apple", "banana", "cherry"].filter((row) => row.includes(query.trim())),
      [query]
    );

    const view = useAsyncContentPhase<string>({ items, loading: false, error: forcedError, requireNetwork: true });

    let body: React.ReactNode;
    switch (view.phase) {
      case "offline":
        body = <FeedbackState variant="offline" image={<OfflineAnimation size={100} />} onRetry={() => window.alert("Check connection")} />;
        break;
      case "error":
        body = (
          <FeedbackState
            variant="error"
            image={<ErrorAnimation size={100} />}
            onRetry={() => setForcedError(null)}
            details={forcedError instanceof Error ? forcedError : String(forcedError)}
          />
        );
        break;
      case "empty":
        body = <FeedbackState variant="empty" title="No matching fruit" description='Try clearing the filter or type "a".' image={<NoDataAnimation size={100} />} />;
        break;
      default:
        body = (
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {items.map((r) => <li key={r}><TextView as="span">{r}</TextView></li>)}
          </ul>
        );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4, 16px)", maxWidth: 480 }}>
        <TextView as="p" variant="small" color="secondary">
          Network: <strong>{online ? "online" : "offline"}</strong> · phase: <strong>{view.phase}</strong>
        </TextView>
        <TextInput label="Filter fruit" placeholder='Try "z" for empty' value={query} onChange={setQuery} />
        <Button variant="danger" size="sm" type="button" onClick={() => setForcedError(new Error("Mock API failure"))}>
          Simulate error
        </Button>
        {body}
      </div>
    );
  },
};
