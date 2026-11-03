import type { HTMLAttributes, ReactNode } from "react";

/**
 * Visual weight of the box.
 * - `neutral` — muted fill, primary icon (default; list rows, secondary tiles)
 * - `strong` — follows the primary filled CTA (Noir on classic, theme colour on green/custom)
 * - `outline` — surface fill with a structural border
 * - semantic tones tint the box with the matching accent family
 */
export type IconBoxTone =
  | "neutral"
  | "strong"
  | "outline"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

/** `sm` 28px · `md` 36px · `lg` 44px · `xl` 56px */
export type IconBoxSize = "sm" | "md" | "lg" | "xl";

export type IconBoxShape = "rounded" | "circle" | "square";

export interface IconBoxProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Icon element (inline SVG, `<Icon />`, emoji, or initials). */
  children: ReactNode;
  tone?: IconBoxTone;
  size?: IconBoxSize;
  shape?: IconBoxShape;
  /**
   * Accessible name. When set the box is announced as an image (`role="img"`);
   * when omitted it is decorative (`aria-hidden`) — pair with visible text.
   */
  label?: string;
}
