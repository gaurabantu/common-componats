import type { HTMLAttributes } from "react";

/** `xs` 16px · `sm` 20px · `md` 24px · `lg` 32px · `xl` 48px */
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Ring colour.
 * - `current` — inherits `currentColor` (inside text, links, outline buttons)
 * - `primary` — `--color-brand-primary` on `--color-border-subtle` track
 * - `muted` — `--color-text-secondary` on `--color-border-subtle` track
 * - `inverse` — `--color-text-on-primary`, for solid brand / dark surfaces (primary Button)
 */
export type SpinnerTone = "current" | "primary" | "muted" | "inverse";

/**
 * Visual style.
 * - `ring` — rotating arc on a track (default)
 * - `dots` — three pulsing dots (inline "typing / fetching" feel)
 * - `bars` — three equaliser bars
 */
export type SpinnerVariant = "ring" | "dots" | "bars";

/** Stroke weight (ring border / dot diameter / bar width). Omit to use the size's default weight. */
export type SpinnerThickness = "thin" | "regular" | "thick";

/** Animation cycle length. `slow` ≈ 1.2s · `normal` ≈ 0.8s · `fast` ≈ 0.5s per cycle. */
export type SpinnerSpeed = "slow" | "normal" | "fast";

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** @default "md" */
  size?: SpinnerSize;
  /** @default "current" */
  tone?: SpinnerTone;
  /** @default "ring" */
  variant?: SpinnerVariant;
  /**
   * Stroke weight. When omitted the size decides (`xs`–`md` regular, `lg`/`xl` thick),
   * which matches the pre-Sprint-6 look.
   */
  thickness?: SpinnerThickness;
  /** @default "normal" */
  speed?: SpinnerSpeed;
  /**
   * Milliseconds to wait before rendering anything. Avoids a spinner flash for
   * requests that resolve quickly. `0` renders immediately.
   * @default 0
   */
  delay?: number;
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
