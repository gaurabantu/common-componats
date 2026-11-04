import type { HTMLAttributes, ReactNode } from "react";
import type { SpinnerSize } from "../../atoms/Spinner/Spinner.types";

/**
 * Veil behind the spinner.
 * - `surface` — translucent `--color-bg-surface` (default; reads well over cards / grids)
 * - `dim` — `--color-bg-overlay` (dark scrim, like a modal backdrop)
 * - `none` — transparent
 */
export type LoadingOverlayBackdrop = "surface" | "dim" | "none";

export interface LoadingOverlayProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Render the overlay. `false` renders nothing. @default true */
  visible?: boolean;
  /**
   * Cover the whole viewport (`position: fixed`, portalled to `document.body`).
   * Otherwise it covers its nearest positioned ancestor (`position: absolute; inset: 0`) —
   * give the parent `position: relative`. @default false
   */
  fullScreen?: boolean;
  /**
   * `true` (default): catches all pointer input on the covered area and, in container mode, marks the
   * covered parent `aria-busy="true"` while shown. Spinner is centred.
   * `false`: a non-blocking veil — `pointer-events: none`, never takes focus, content stays usable;
   * for "Recalculating…" status hints.
   * @default true
   */
  blocking?: boolean;
  /** Visible text under (blocking) or beside (veil) the spinner. Also the announced status text. */
  label?: ReactNode;
  /** Announced text when there is no visible `label`. @default "Loading" */
  ariaLabel?: string;
  /** Spinner size. @default "lg" when blocking, "sm" for the veil */
  spinnerSize?: SpinnerSize;
  /** Veil style. @default "surface" */
  backdrop?: LoadingOverlayBackdrop;
  /**
   * z-index override. Defaults: container `var(--z-raised)`; `fullScreen` sits above open modals
   * (`calc(var(--z-modal) + 2)`).
   */
  zIndex?: number;
  /** Extra content under the label (e.g. a Cancel button — only clickable when `blocking`). */
  children?: ReactNode;
}
