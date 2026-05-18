import type { ReactNode } from "react";

// ─── Shared enums ────────────────────────────────────────────────────────────

export type FeedbackVisualTone = "neutral" | "info" | "success" | "warning" | "danger";

/** Shared size scale across all feedback shells. */
export type FeedbackSize = "sm" | "md" | "lg";

// ─── EmptyState ───────────────────────────────────────────────────────────────

export interface EmptyStateProps {
  /** Primary heading ("No results", "Nothing here yet") */
  title: ReactNode;
  /** Supporting copy beneath the heading */
  description?: ReactNode;
  /**
   * Decorative glyph, `<Icon />`, or small illustration.
   * Supply `aria-hidden="true"` on decorative nodes or use `iconLabel` for labelled icons.
   */
  icon?: ReactNode;
  /** Accessible label for the icon when it is not purely decorative */
  iconLabel?: string;
  /** Large illustration or image rendered above the heading */
  image?: ReactNode;
  /** Primary CTA */
  action?: ReactNode;
  /**
   * Secondary CTAs or links rendered below the primary action.
   * Accepts any ReactNode — buttons, hyperlinks, etc.
   */
  extra?: ReactNode;
  className?: string;
  /** @default "status" */
  role?: "status" | "region";
  /** @default "polite" */
  "aria-live"?: "off" | "polite";
  /** Visually subdued treatment for dense layouts */
  compact?: boolean;
  /** @default "md" */
  size?: FeedbackSize;
  /** Text/content alignment — default centered, `"start"` for list panels & drawers */
  align?: "center" | "start";
  tone?: Extract<FeedbackVisualTone, "neutral" | "info" | "success" | "warning">;
  "data-testid"?: string;
}

// ─── ErrorState ───────────────────────────────────────────────────────────────

export interface ErrorStateProps {
  /** Default: "Something went wrong" */
  title?: ReactNode;
  /** Default: apology + guidance */
  description?: ReactNode;
  /** Large illustration / animated SVG rendered above the heading */
  image?: ReactNode;
  /** Optional icon override — component supplies a default danger icon when `tone="danger"` */
  icon?: ReactNode;
  /** Hide the default status icon even when the component would show one */
  hideIcon?: boolean;
  /** Optional visible diagnostics for support desks */
  details?: ReactNode;
  /** Label for the primary retry button. Default: "Try again" */
  retryLabel?: string;
  /** When provided, renders a primary retry button */
  onRetry?: () => void;
  /**
   * Additional actions or links rendered below the retry button.
   * Useful for "Go home", "Contact support", etc.
   */
  extra?: ReactNode;
  className?: string;
  tone?: FeedbackVisualTone;
  compact?: boolean;
  /** @default "md" */
  size?: FeedbackSize;
  align?: "center" | "start";
  /**
   * Live politeness — defaults to `"assertive"` when `role="alert"`, `"polite"` when `role="status"`.
   * Override to `"polite"` for non-blocking inline errors.
   */
  "aria-live"?: "off" | "polite" | "assertive";
  /** @default "alert" when `details` or `onRetry` is present, otherwise "status" */
  role?: "alert" | "status";
  "data-testid"?: string;
}

// ─── OfflineBanner ────────────────────────────────────────────────────────────

export interface OfflineBannerProps {
  /**
   * Primary headline of the banner.
   * Default: "No internet connection."
   */
  headline?: ReactNode;
  /** Secondary guidance line below the headline */
  message?: ReactNode;
  /** Icon/glyph rendered before the text block. Supply `aria-hidden` on decorative nodes. */
  leadingIcon?: ReactNode;
  /**
   * Optional large illustration rendered above the headline (Zone 4 usage).
   * Use `<OfflineAnimation />` for the built-in animated SVG.
   */
  image?: ReactNode;
  /** Label for the retry button. Default: "Retry" */
  actionLabel?: string;
  onRetry?: () => void;
  /** When provided, renders a dismiss (close) button and calls this on click */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button. Default: "Dismiss" */
  dismissLabel?: string;
  className?: string;
  sticky?: boolean;
  tone?: Extract<FeedbackVisualTone, "neutral" | "warning">;
  compact?: boolean;
  /** @default "status" */
  role?: "status";
}

// ─── Unified FeedbackState variant union ──────────────────────────────────────

export type FeedbackStateVariant = "empty" | "error" | "offline" | "success" | "info";

export type FeedbackStateProps =
  | ({ variant: "empty" } & EmptyStateProps)
  | ({ variant: "error" } & ErrorStateProps)
  | ({ variant: "offline" } & OfflineBannerProps)
  | ({ variant: "success" } & EmptyStateProps)
  | ({ variant: "info" } & EmptyStateProps);
