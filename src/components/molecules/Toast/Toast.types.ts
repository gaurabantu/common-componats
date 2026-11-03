import type { HTMLAttributes, ReactNode } from "react";
import type { AlertVariant } from "../Alert/Alert.types";

/** Same tone set as `Alert` — icon, colours and SR prefix come from `Alert.config.ts`. */
export type ToastVariant = AlertVariant;

export type ToastPosition =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";

export interface ToastAction {
  /** Visible button label. */
  label: string;
  /** Called on click; the toast is dismissed afterwards. */
  onClick: () => void;
}

export interface ToastOptions {
  /** Stable id. Calling `toast()` again with an existing id updates that toast and restarts its timer. */
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  /** @default "info" */
  variant?: ToastVariant;
  /**
   * Single inline action. Keep it non-essential. A toast with an action is **sticky by default**
   * (WCAG 2.2.1 Timing Adjustable) — pass `duration` explicitly to opt back into auto-dismiss.
   */
  action?: ToastAction;
  /**
   * Auto-dismiss delay in ms. `Infinity` = sticky.
   * @default `Infinity` when `action` is set, otherwise provider `duration` (5000)
   */
  duration?: number;
  /** Show a close button and allow Escape to dismiss. @default true */
  dismissible?: boolean;
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  /** @default "info" */
  variant?: ToastVariant;
  action?: ToastAction;
  /** Renders the close button (requires `onDismiss`). @default true */
  dismissible?: boolean;
  /** Close-button handler. */
  onDismiss?: () => void;
  /** Accessible name of the close button. @default "Dismiss" */
  dismissLabel?: string;
  /** Visually-hidden variant word before the title ("Error:", ...). @default true */
  srPrefix?: boolean;
}

export interface ToastProviderProps {
  children?: ReactNode;
  /** Screen corner / edge for the stack. @default "bottom-right" */
  position?: ToastPosition;
  /** Maximum toasts visible at once; extra toasts queue (FIFO) until a slot frees. @default 3 */
  max?: number;
  /** Default auto-dismiss delay in ms. @default 5000 */
  duration?: number;
  /** Accessible name of the notifications region. @default "Notifications" */
  label?: string;
  /** Accessible name of each toast's close button. @default "Dismiss" */
  dismissLabel?: string;
}

export interface ToastContextValue {
  /** Show (or update, when `id` matches) a toast. Returns its id. */
  toast: (options: ToastOptions) => string;
  /** Dismiss one toast (plays the exit animation). */
  dismiss: (id: string) => void;
  /** Dismiss every visible and queued toast. */
  dismissAll: () => void;
}
