import type { HTMLAttributes } from "react";

/** `xs` 16px · `sm` 20px · `md` 24px · `lg` 32px */
export type SpinnerSize = "xs" | "sm" | "md" | "lg";

/**
 * Ring colour.
 * - `current` — inherits `currentColor` (inside text, links, outline buttons)
 * - `primary` — `--color-brand-primary` on `--color-border-subtle` track
 * - `muted` — `--color-text-secondary` on `--color-border-subtle` track
 * - `inverse` — `--color-text-on-primary`, for solid brand / dark surfaces (primary Button)
 */
export type SpinnerTone = "current" | "primary" | "muted" | "inverse";

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** @default "md" */
  size?: SpinnerSize;
  /** @default "current" */
  tone?: SpinnerTone;
  /**
   * Announced text (rendered visually hidden inside a `role="status"` region).
   * Ignored when `decorative`.
   * @default "Loading"
   */
  label?: string;
  /**
   * Hide from assistive tech (`aria-hidden`, no role, no label) — use when the
   * surrounding control already announces the busy state (e.g. a loading `Button`).
   * @default false
   */
  decorative?: boolean;
}
