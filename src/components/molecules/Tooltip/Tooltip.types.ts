import type { HTMLAttributes, ReactElement, ReactNode } from "react";

/** Preferred side of the trigger. Flips to the opposite side when it would overflow the viewport. */
export type TooltipSide = "top" | "right" | "bottom" | "left";

/** Alignment along the trigger edge. */
export type TooltipAlign = "start" | "center" | "end";

/** `dark` = inverted (text-primary fill) · `light` = elevated surface + border. */
export type TooltipVariant = "dark" | "light";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content" | "children" | "role"> {
  /**
   * Exactly one focusable element (Button, link, input…). It is cloned to add hover/focus
   * handlers, a ref and `aria-describedby` — existing handlers and `aria-describedby` are preserved.
   */
  children: ReactElement;
  /** Tooltip body. Short supplementary text — never the only accessible name of the trigger. */
  content: ReactNode;
  /** @default "top" */
  side?: TooltipSide;
  /** @default "center" */
  align?: TooltipAlign;
  /** Hover open delay in ms (keyboard focus opens immediately). @default 300 */
  delay?: number;
  /** Close delay in ms after the pointer leaves trigger + content (lets the pointer cross onto the tooltip). @default 100 */
  closeDelay?: number;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. @default false */
  defaultOpen?: boolean;
  /** Called whenever the tooltip wants to open/close (hover, focus, blur, Escape). */
  onOpenChange?: (open: boolean) => void;
  /** Never open and drop `aria-describedby`. @default false */
  disabled?: boolean;
  /** Max inline size of the bubble (number = px). Always capped to the viewport width. @default 240 */
  maxWidth?: number | string;
  /** @default "dark" */
  variant?: TooltipVariant;
}

export interface TooltipPositionResult {
  top: number;
  left: number;
  /** Side actually used after collision flipping. */
  side: TooltipSide;
}
