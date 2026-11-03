import type { HTMLAttributes, ReactNode } from "react";

/**
 * Semantic tone shared by `Alert` and `Toast`.
 * - `info` — neutral information (default)
 * - `success` — completed / saved
 * - `warning` — needs attention, not blocking
 * - `danger` — error / failure
 * - `neutral` — muted note with no status meaning
 */
export type AlertVariant = "info" | "success" | "warning" | "danger" | "neutral";

/**
 * Surface treatment.
 * - `soft` — tinted fill (`--color-{tone}-fill`) (default)
 * - `outline` — page surface with a tone-coloured border
 * - `solid-accent` — page surface with a 4px tone-coloured left bar
 */
export type AlertAppearance = "soft" | "outline" | "solid-accent";

/**
 * Live-region politeness.
 * - `off` — static alert, nothing announced on mount (default; no live role rendered)
 * - `polite` — `role="status"`
 * - `assertive` — `role="alert"` for `danger` / `warning`; `role="status"` + `aria-live="assertive"` otherwise
 */
export type AlertLive = "off" | "polite" | "assertive";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Semantic tone. @default "info" */
  variant?: AlertVariant;
  /** Surface treatment. @default "soft" */
  appearance?: AlertAppearance;
  /** Bold first line. */
  title?: ReactNode;
  /** Description / body copy. */
  children?: ReactNode;
  /** Replace the default per-variant icon (rendered decoratively). */
  icon?: ReactNode;
  /** Hide the leading icon. The visually-hidden `srPrefix` still carries meaning. */
  hideIcon?: boolean;
  /** Trailing action slot, e.g. a `Button`. */
  action?: ReactNode;
  /** When set, renders a dismiss (close) button that calls this handler. */
  onDismiss?: () => void;
  /** Accessible name of the dismiss button. @default "Dismiss" */
  dismissLabel?: string;
  /** Tighter padding and a single-row layout. */
  compact?: boolean;
  /** Live-region behaviour. @default "off" */
  live?: AlertLive;
  /** Prepend a visually-hidden variant word ("Error:", "Warning:", ...) so meaning never relies on colour. @default true */
  srPrefix?: boolean;
}
