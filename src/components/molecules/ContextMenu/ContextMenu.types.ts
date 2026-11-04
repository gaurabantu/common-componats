import type { HTMLAttributes, ReactNode } from "react";

/** Viewport (client) coordinates — e.g. `{ x: event.clientX, y: event.clientY }`. */
export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface ContextMenuProps {
  children: ReactNode;
  /** Controlled open state (imperative form for grids that compute the cell themselves). */
  open?: boolean;
  /** Uncontrolled initial open state. @default false */
  defaultOpen?: boolean;
  /** Called on every open / close request (right-click, Escape, item select, click outside…). */
  onOpenChange?: (open: boolean) => void;
  /**
   * Controlled anchor point in viewport coordinates. When omitted, `ContextMenuTrigger` records
   * the pointer position of the `contextmenu` event (or the focused element for Shift+F10).
   */
  position?: ContextMenuPosition;
  /** Ignore right-clicks / keyboard invocation on the trigger. @default false */
  disabled?: boolean;
}

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Merge behaviour onto the single child instead of rendering a wrapping `<div>`. @default false */
  asChild?: boolean;
  /** Let the native browser menu show for this region. @default false */
  disabled?: boolean;
}

export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Stacking order (number or CSS value). Default `var(--z-popover, 450)`, lifted above the highest
   * z-index among the trigger's (or invoking element's) ancestors.
   */
  zIndex?: number | string;
  /** Minimum distance kept from the viewport edges in px. @default 8 */
  collisionPadding?: number;
}
