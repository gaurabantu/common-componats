import type { HTMLAttributes, ReactNode } from "react";
import type { ButtonSize, ButtonVariant } from "../../atoms/Button/Button.config";

export type ButtonGroupOrientation = "horizontal" | "vertical";
/** Size tier cascaded to child `Button`s (same union as `Button.size`). */
export type ButtonGroupSize = ButtonSize;
/** Variant cascaded to child `Button`s (same union as `Button.variant`). */
export type ButtonGroupVariant = ButtonVariant;

export interface ButtonGroupContextValue {
  orientation: ButtonGroupOrientation;
  /** Joined borders / radii. */
  attached?: boolean;
  /** Effective size for children (own prop, else inherited from a parent group). */
  size?: ButtonGroupSize;
  /** Effective variant for children (own prop, else inherited from a parent group). */
  variant?: ButtonGroupVariant;
  /** Effective disabled state (own prop OR a parent group's). */
  disabled?: boolean;
}

export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  children: ReactNode;
  /**
   * Layout of grouped controls.
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation;
  /**
   * Join adjacent buttons (shared borders, outer corners rounded only). `false` lays them out
   * with a gap and keeps each button's own radius.
   * @default true
   */
  attached?: boolean;
  /** Size applied to every direct `Button` child that does not set its own `size`. */
  size?: ButtonGroupSize;
  /** Variant applied to every direct `Button` child that does not set its own `variant`. */
  variant?: ButtonGroupVariant;
  /**
   * Disable every direct `Button` child that does not set its own `disabled`
   * (child props win). Also sets `aria-disabled` on the group.
   * @default false
   */
  disabled?: boolean;
  /**
   * Stretch the group to its container; buttons share the width equally.
   * @default false
   */
  fullWidth?: boolean;
}

export interface ButtonGroupSeparatorProps extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  /**
   * Visual axis of the divider line.
   * Defaults to `vertical` when the parent group is horizontal, and `horizontal` when vertical.
   */
  orientation?: ButtonGroupOrientation;
}

export interface ButtonGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /**
   * Merge props into a single child element (e.g. `<Label />`) instead of rendering a `<span>`.
   */
  asChild?: boolean;
}
