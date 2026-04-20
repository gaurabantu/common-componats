import type { HTMLAttributes, ReactNode } from "react";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupContextValue {
  orientation: ButtonGroupOrientation;
}

export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  children: ReactNode;
  /**
   * Layout of grouped controls.
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation;
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
