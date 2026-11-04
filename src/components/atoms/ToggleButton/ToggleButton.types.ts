import type React from "react";

/** Same height tiers as `Button` (§20): xxs 1.375rem · xs 1.625rem · sm 1.875rem · md 2.125rem · lg 2.375rem. */
export type ToggleButtonSize = "xxs" | "xs" | "sm" | "md" | "lg";

/** `ghost` = transparent until hovered/pressed (toolbars); `outline` = bordered. */
export type ToggleButtonVariant = "ghost" | "outline";

export interface ToggleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value" | "type" | "aria-pressed"> {
  /** Controlled pressed state. */
  pressed?: boolean;
  /** Uncontrolled initial pressed state. @default false */
  defaultPressed?: boolean;
  /** Fires with the next pressed state. */
  onPressedChange?: (pressed: boolean) => void;
  /** @default "sm" */
  size?: ToggleButtonSize;
  /** @default "ghost" */
  variant?: ToggleButtonVariant;
  /** Leading icon (any React node, e.g. a lucide icon). Decorative — hidden from AT. */
  icon?: React.ReactNode;
  /**
   * Accessible name. **Required for icon-only toggles** (no children), e.g. `"Bold"`.
   * Also accepted as the native `aria-label` attribute.
   */
  ariaLabel?: string;
  /** Item value when used inside `ToggleGroup` (required there). */
  value?: string;
  children?: React.ReactNode;
}
