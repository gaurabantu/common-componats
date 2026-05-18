import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Button from "../../components/atoms/Button";
import EmptyState from "../../components/molecules/FeedbackStates";
import {
  NoDataAnimation,
  NoSearchResultsAnimation,
  SuccessAnimation,
  InfoAnimation,
} from "../../components/molecules/FeedbackStates/FeedbackStates.animations";
import type { EmptyStateProps } from "../../components/molecules/FeedbackStates";

/**
 * Zone 4 — Main Content
 * EmptyState fills the content area when a list, table, or grid has no data.
 *
 * CTA hierarchy rules (COMPOSITION_RULES_1):
 *   - `action`  → Button variant="primary"     ← primary CTA
 *   - `extra`   → Button variant="ghost"        ← secondary / escape hatches
 *
 * Size rules:
 *   - size="sm" → inside Card panels, sidebars
 *   - size="md" → standard page sections        (default)
 *   - size="lg" → full-page dedicated empty view
 */
const meta = {
  title: "Design System/Molecules/Feedback states/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    title: {
      control: "text",
      description: "Primary heading",
      table: { defaultValue: { summary: '"No data yet"' } },
    },
    description: {
      control: "text",
      description: "Supporting copy below heading",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Shell padding / typography scale",
      table: { defaultValue: { summary: '"md"' } },
    },
    align: {
      control: { type: "radio" },
      options: ["center", "start"],
      description: "Content alignment — center for full-page, start for drawers/panels",
      table: { defaultValue: { summary: '"center"' } },
    },
    tone: {
      control: { type: "select" },
      options: ["neutral", "info", "success", "warning"],
      description: "Semantic tint applied to the shell border + background",
      table: { defaultValue: { summary: '"neutral"' } },
    },
    compact: {
      control: "boolean",
      description: "Tighter padding for dense layouts (inside Card content areas)",
      table: { defaultValue: { summary: "false" } },
    },
    animation: {
      control: { type: "select" },
      options: ["none", "empty", "no-search", "success", "info"],
      description: "Built-in animated SVG illustration (Zone 4 visual anchor)",
      table: { defaultValue: { summary: '"empty"' } },
    },
    // Primary CTA
    showAction: {
      control: "boolean",
      description: 'Show primary CTA button (variant="primary") — main user action',
      table: { defaultValue: { summary: "true" } },
    },
    actionLabel: {
      control: "text",
      description: "Primary action button label",
      table: { defaultValue: { summary: '"Add item"' } },
    },
    // Secondary CTAs (ghost hierarchy)
    showExtra: {
      control: "boolean",
      description: 'Show secondary actions (variant="ghost") — escape hatches',
      table: { defaultValue: { summary: "false" } },
    },
    role: {
      control: { type: "radio" },
      options: ["status", "region"],
      description: "ARIA landmark role",
      table: { defaultValue: { summary: '"status"' } },
    },
  },
  args: {
    title: "No data yet",
    description: "Add or import records to populate this list.",
    size: "md",
    align: "center",
    tone: "neutral",
    compact: false,
    animation: "empty",
    showAction: true,
    actionLabel: "Add item",
    showExtra: false,
    role: "status",
  },
} satisfies Meta<EmptyStateProps & { animation: string; showAction: boolean; actionLabel: string; showExtra: boolean }>;

export default meta;

function resolveAnimation(name: string, size: EmptyStateProps["size"]): React.ReactNode {
  const px = size === "lg" ? 160 : size === "sm" ? 80 : 120;
  if (name === "empty") return <NoDataAnimation size={px} />;
  if (name === "no-search") return <NoSearchResultsAnimation size={px} />;
  if (name === "success") return <SuccessAnimation size={px} />;
  if (name === "info") return <InfoAnimation size={px} />;
  return null;
}

type EmptyStoryArgs = EmptyStateProps & { animation: string; showAction: boolean; actionLabel: string; showExtra: boolean };

export const Playground: StoryObj<EmptyStoryArgs> = {
  name: "EmptyState · Playground",
  render: ({ animation, showAction, actionLabel, showExtra, ...args }) => (
    <EmptyState
      {...args}
      image={resolveAnimation(animation, args.size)}
      action={
        showAction ? (
          /* Zone 4 primary CTA — variant="primary", size scales with shell */
          <Button variant="primary" size={args.size === "sm" ? "sm" : "md"} type="button">
            {actionLabel}
          </Button>
        ) : undefined
      }
      extra={
        showExtra ? (
          /* Secondary / escape hatch CTAs — always ghost to preserve hierarchy */
          <div style={{ display: "flex", gap: "var(--space-2, 8px)", flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="ghost" size="sm" type="button">View tutorial</Button>
            <Button variant="ghost" size="sm" type="button">Import CSV</Button>
          </div>
        ) : undefined
      }
    />
  ),
};

export const EmptyNoData: StoryObj<EmptyStoryArgs> = {
  name: "No data",
  args: { title: "Nothing here yet", description: "Records will appear once you add them.", animation: "empty", showAction: true, actionLabel: "Create record", showExtra: false },
  render: Playground.render,
};

export const EmptyNoSearch: StoryObj<EmptyStoryArgs> = {
  name: "No search results",
  args: { title: "No results found", description: "Try a different keyword or clear the filter.", animation: "no-search", showAction: false, actionLabel: "", showExtra: false },
  render: Playground.render,
};

export const EmptySuccess: StoryObj<EmptyStoryArgs> = {
  name: "Success / confirmed",
  args: { title: "All done!", description: "Everything has been processed.", tone: "success", animation: "success", showAction: false, actionLabel: "", showExtra: false },
  render: Playground.render,
};

export const EmptyWithSecondaryActions: StoryObj<EmptyStoryArgs> = {
  name: "With secondary actions",
  args: {
    title: "No projects yet",
    description: "Create your first project or import from another tool.",
    animation: "empty",
    showAction: true,
    actionLabel: "New project",
    showExtra: true,
  },
  render: Playground.render,
};

export const EmptyLarge: StoryObj<EmptyStoryArgs> = {
  name: "Large — full page",
  args: { size: "lg", title: "Your inbox is empty", description: "Enjoy the calm. New messages will appear here.", animation: "empty", showAction: true, actionLabel: "Compose", showExtra: false },
  render: Playground.render,
};

export const EmptySmall: StoryObj<EmptyStoryArgs> = {
  name: "Small — inside panel / card",
  args: { size: "sm", compact: true, title: "No recent activity", description: "Actions appear here.", animation: "none", showAction: false, actionLabel: "", showExtra: false },
  render: Playground.render,
};
