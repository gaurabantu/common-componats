import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Button from "../../components/atoms/Button";
import { ErrorState } from "../../components/molecules/FeedbackStates";
import { ErrorAnimation } from "../../components/molecules/FeedbackStates/FeedbackStates.animations";
import type { ErrorStateProps } from "../../components/molecules/FeedbackStates";

/**
 * Zone 4 — Main Content  (or Zone 4 inside a Card's CardContent)
 *
 * CTA hierarchy rules (COMPOSITION_RULES_1):
 *   - Primary retry  → Button variant="outlinePrimary"   ← destructive-safe retry
 *   - `extra` slot   → Button variant="ghost"            ← secondary escape hatches
 *
 * Tone rules:
 *   - tone="danger"  → unrecoverable / blocking errors
 *   - tone="warning" → rate limits, transient issues
 *   - tone="neutral" → maintenance / informational
 *   - tone="info"    → non-critical notices
 */
const meta = {
  title: "Design System/Molecules/Feedback states/ErrorState",
  component: ErrorState,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    title: {
      control: "text",
      description: "Error heading",
      table: { defaultValue: { summary: '"Something went wrong"' } },
    },
    description: {
      control: "text",
      description: "Guidance copy",
    },
    tone: {
      control: { type: "select" },
      options: ["danger", "warning", "neutral", "info", "success"],
      description: "Semantic tint — affects border, background, and default status icon colour",
      table: { defaultValue: { summary: '"danger"' } },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Shell padding scale — match to parent context density",
      table: { defaultValue: { summary: '"md"' } },
    },
    align: {
      control: { type: "radio" },
      options: ["center", "start"],
      description: "Content alignment — center for full-page, start for Card panels",
      table: { defaultValue: { summary: '"center"' } },
    },
    compact: {
      control: "boolean",
      description: "Tighter vertical rhythm for dense layouts",
      table: { defaultValue: { summary: "false" } },
    },
    hideIcon: {
      control: "boolean",
      description: "Suppress the default status icon",
      table: { defaultValue: { summary: "false" } },
    },
    showAnimation: {
      control: "boolean",
      description: "Inject the built-in animated illustration above the heading",
      table: { defaultValue: { summary: "false" } },
    },
    retryLabel: {
      control: "text",
      description: "Primary retry button label",
      table: { defaultValue: { summary: '"Try again"' } },
    },
    showRetry: {
      control: "boolean",
      description: 'Show primary retry button (variant="outlinePrimary")',
      table: { defaultValue: { summary: "true" } },
    },
    showDetails: {
      control: "boolean",
      description: "Show a mock diagnostic details block",
      table: { defaultValue: { summary: "false" } },
    },
    showExtra: {
      control: "boolean",
      description: 'Show secondary actions (variant="ghost") — e.g. "Go home", "Status page"',
      table: { defaultValue: { summary: "false" } },
    },
    "aria-live": {
      control: { type: "select" },
      options: ["assertive", "polite", "off"],
      description: 'Live region politeness — "assertive" for blocking errors, "polite" for inline non-blocking',
      table: { defaultValue: { summary: '"assertive" when role=alert, "polite" when role=status' } },
    },
  },
  args: {
    title: "Something went wrong",
    description: "Please try again. If the issue continues, contact support.",
    tone: "danger",
    size: "md",
    align: "center",
    compact: false,
    hideIcon: false,
    showAnimation: false,
    retryLabel: "Try again",
    showRetry: true,
    showDetails: false,
    showExtra: false,
  },
} satisfies Meta<ErrorStateProps & {
  showAnimation: boolean;
  showRetry: boolean;
  showDetails: boolean;
  showExtra: boolean;
}>;

export default meta;

type ErrorStoryArgs = ErrorStateProps & {
  showAnimation: boolean;
  showRetry: boolean;
  showDetails: boolean;
  showExtra: boolean;
};

export const Playground: StoryObj<ErrorStoryArgs> = {
  name: "ErrorState · Playground",
  render: ({ showAnimation, showRetry, showDetails, showExtra, retryLabel, size, ...args }) => (
    <ErrorState
      {...args}
      size={size}
      retryLabel={retryLabel}
      image={showAnimation ? <ErrorAnimation size={size === "lg" ? 140 : size === "sm" ? 80 : 110} /> : undefined}
      onRetry={showRetry ? () => window.alert("Retry clicked") : undefined}
      details={showDetails ? "Error: ECONNRESET · Request timed out after 30 000ms\n  at GET /api/v1/data" : undefined}
      extra={
        showExtra ? (
          /* Secondary escape-hatch CTAs — always ghost, never competing with retry */
          <div style={{ display: "flex", gap: "var(--space-2, 8px)", flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="ghost" size="sm" type="button">Go home</Button>
            <Button variant="ghost" size="sm" type="button">View status page</Button>
          </div>
        ) : undefined
      }
    />
  ),
};

export const ErrorDanger: StoryObj<ErrorStoryArgs> = {
  name: "Danger — blocking error",
  args: { tone: "danger", showAnimation: true, showRetry: true, showDetails: false, showExtra: false },
  render: Playground.render,
};

export const ErrorWarning: StoryObj<ErrorStoryArgs> = {
  name: "Warning — rate limit",
  args: {
    tone: "warning",
    title: "Rate limit reached",
    description: "You've sent too many requests. Wait a moment and try again.",
    showAnimation: false,
    showRetry: true,
    retryLabel: "Retry in 60s",
    showDetails: false,
    showExtra: false,
  },
  render: Playground.render,
};

export const ErrorNeutral: StoryObj<ErrorStoryArgs> = {
  name: "Neutral — maintenance",
  args: {
    tone: "neutral",
    title: "Under maintenance",
    description: "We'll be back shortly. Your work is saved.",
    showAnimation: false,
    showRetry: false,
    showDetails: false,
    showExtra: true,
  },
  render: Playground.render,
};

export const ErrorWithDiagnostics: StoryObj<ErrorStoryArgs> = {
  name: "With diagnostics",
  args: { showAnimation: true, showRetry: true, showDetails: true, showExtra: true },
  render: Playground.render,
};

export const ErrorInsideCard: StoryObj<ErrorStoryArgs> = {
  name: "Inside Card panel — compact start-aligned",
  args: {
    size: "sm",
    align: "start",
    compact: true,
    tone: "danger",
    title: "Could not load widget",
    description: "Refresh the page or check back later.",
    showAnimation: false,
    showRetry: true,
    retryLabel: "Retry",
    showDetails: false,
    showExtra: false,
  },
  render: Playground.render,
};
