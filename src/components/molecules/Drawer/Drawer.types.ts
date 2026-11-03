import type { ReactNode, RefObject } from "react";

/** Edge the panel slides in from. */
export type DrawerSide = "right" | "left" | "top" | "bottom";

/** Panel extent — width for `left`/`right`, height for `top`/`bottom`. Values live in `Drawer.config.ts`. */
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerProps {
  /** Controlled open state. */
  open: boolean;
  /** Called with `false` when the drawer asks to close (close button, backdrop click, Escape). */
  onOpenChange: (open: boolean) => void;
  /** Edge the panel is attached to. @default "right" */
  side?: DrawerSide;
  /** Panel width (left/right) or height (top/bottom). At ≤ 480px left/right drawers are always full width. @default "md" */
  size?: DrawerSize;
  /** Heading rendered as the dialog's accessible name (`aria-labelledby`). Rendered as text, never parsed as HTML. */
  title: ReactNode;
  /** Supporting text under the title, wired to `aria-describedby`. */
  description?: ReactNode;
  /** Scrollable body content. The header and footer stay fixed while this scrolls. */
  children?: ReactNode;
  /** Sticky footer area (actions). */
  footer?: ReactNode;
  /** Show the close (X) button in the header. @default true */
  showCloseButton?: boolean;
  /** Accessible name for the close button. @default "Close" */
  closeLabel?: string;
  /** Close when the backdrop is clicked (modal only). @default true */
  closeOnBackdropClick?: boolean;
  /** Close when Escape is pressed. @default true */
  closeOnEscape?: boolean;
  /**
   * Modal drawer: backdrop, body scroll lock, focus trap, `aria-modal`.
   * `false` renders a side panel with none of those that can still be closed with Escape. @default true
   */
  modal?: boolean;
  /** Element focused when the drawer opens. Defaults to the first focusable element, then the panel itself. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Return focus to the element that was focused before opening, once the drawer closes. @default true */
  returnFocus?: boolean;
  /** Extra class on the panel (consumer escape hatch). */
  className?: string;
  /** DOM id for the panel. Title / description ids derive from it. Auto-generated when omitted. */
  id?: string;
}

/** `Sheet` is an alias of `Drawer` with the same props. */
export type SheetProps = DrawerProps;
