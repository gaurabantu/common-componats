import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { OfflineBanner } from "../../components/molecules/FeedbackStates";
import { OfflineAnimation } from "../../components/molecules/FeedbackStates/FeedbackStates.animations";
import type { OfflineBannerProps } from "../../components/molecules/FeedbackStates";

/**
 * OfflineBanner has two display modes (COMPOSITION_RULES_1):
 *
 * **Slim bar** (no `image` prop) — Zone 2 / sticky notification strip above content.
 *   - tone="warning" for lost connection (amber)
 *   - tone="neutral" for soft offline notice (grey)
 *   - Use `sticky` to pin it as the page's Zone 1 alert band.
 *
 * **Full panel** (with `image` prop) — Zone 4 content replacement.
 *   - Same shell as EmptyState; `onRetry` becomes the primary CTA.
 *   - `onDismiss` becomes a ghost secondary action.
 *
 * CTA hierarchy (COMPOSITION_RULES_1):
 *   - slim bar:  Retry = `outlineSecondary`  |  dismiss = plain icon button
 *   - full panel: Retry = `outlinePrimary`  |  dismiss = `ghost`
 */
const meta = {
  title: "Design System/Molecules/Feedback states/OfflineBanner",
  component: OfflineBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    headline: {
      control: "text",
      description: "Bold headline — configurable for i18n / product copy",
      table: { defaultValue: { summary: '"No internet connection."' } },
    },
    message: {
      control: "text",
      description: "Secondary guidance copy",
      table: { defaultValue: { summary: '"Check your connection and try again."' } },
    },
    tone: {
      control: { type: "radio" },
      options: ["warning", "neutral"],
      description: "warning = amber tint (default), neutral = grey informational",
      table: { defaultValue: { summary: '"warning"' } },
    },
    compact: {
      control: "boolean",
      description: "Reduce vertical padding — use inside dense notification lists",
      table: { defaultValue: { summary: "false" } },
    },
    sticky: {
      control: "boolean",
      description: "Stick to top of scroll container (Zone 2 placement)",
      table: { defaultValue: { summary: "false" } },
    },
    showAnimation: {
      control: "boolean",
      description: "Switch to full-panel mode with animated OfflineAnimation illustration",
      table: { defaultValue: { summary: "false" } },
    },
    actionLabel: {
      control: "text",
      description: "Retry button label",
      table: { defaultValue: { summary: '"Retry"' } },
    },
    showRetry: {
      control: "boolean",
      description: "Show retry button",
      table: { defaultValue: { summary: "true" } },
    },
    showDismiss: {
      control: "boolean",
      description: "Show dismiss button (Zone 4 panel mode: ghost; slim bar: icon button)",
      table: { defaultValue: { summary: "false" } },
    },
    showLeadingIcon: {
      control: "boolean",
      description: "Show the default wifi-off leading icon (slim bar mode only)",
      table: { defaultValue: { summary: "true" } },
    },
  },
  args: {
    headline: "No internet connection.",
    message: "Check your connection and try again.",
    tone: "warning",
    compact: false,
    sticky: false,
    showAnimation: false,
    actionLabel: "Retry",
    showRetry: true,
    showDismiss: false,
    showLeadingIcon: true,
  },
} satisfies Meta<OfflineBannerProps & { showRetry: boolean; showDismiss: boolean; showLeadingIcon: boolean; showAnimation: boolean }>;

export default meta;

type OfflineStoryArgs = OfflineBannerProps & { showRetry: boolean; showDismiss: boolean; showLeadingIcon: boolean; showAnimation: boolean };

export const Playground: StoryObj<OfflineStoryArgs> = {
  name: "OfflineBanner · Playground",
  render: ({ showRetry, showDismiss, showLeadingIcon, showAnimation, ...args }) => {
    const [dismissed, setDismissed] = React.useState(false);

    if (dismissed) {
      return (
        <button
          type="button"
          style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid var(--color-border-subtle,#cbd5e1)", background: "transparent", cursor: "pointer" }}
          onClick={() => setDismissed(false)}
        >
          Restore banner
        </button>
      );
    }

    return (
      <OfflineBanner
        {...args}
        leadingIcon={showLeadingIcon ? undefined : null}
        image={showAnimation ? <OfflineAnimation size={110} /> : undefined}
        onRetry={showRetry ? () => window.alert("Retry clicked") : undefined}
        onDismiss={showDismiss ? () => setDismissed(true) : undefined}
      />
    );
  },
};

export const SlimWarning: StoryObj<OfflineStoryArgs> = {
  name: "Slim bar — warning (Zone 2 strip)",
  args: { tone: "warning", showRetry: true, showDismiss: false, showLeadingIcon: true, showAnimation: false },
  render: Playground.render,
};

export const SlimNeutral: StoryObj<OfflineStoryArgs> = {
  name: "Slim bar — neutral + compact",
  args: { tone: "neutral", compact: true, showRetry: true, showDismiss: true, showLeadingIcon: true, showAnimation: false },
  render: Playground.render,
};

export const FullPanel: StoryObj<OfflineStoryArgs> = {
  name: "Full panel — with animation (Zone 4)",
  args: {
    headline: "You're offline.",
    message: "Edits are saved locally and will sync when you reconnect.",
    showAnimation: true,
    showRetry: true,
    showDismiss: false,
    showLeadingIcon: true,
  },
  render: Playground.render,
};

export const CustomCopyWithDismiss: StoryObj<OfflineStoryArgs> = {
  name: "Custom copy + dismiss",
  args: {
    headline: "Connection lost.",
    message: "Your edits are cached and will sync when you reconnect.",
    showRetry: true,
    showDismiss: true,
    showLeadingIcon: true,
    showAnimation: false,
  },
  render: Playground.render,
};
