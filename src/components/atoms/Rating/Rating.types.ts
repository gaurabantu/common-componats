import type { ChangeEvent, HTMLAttributes, ReactNode } from "react";

/** Icon edge: `sm` 1.25rem (display) · `md` 1.75rem (default) · `lg` 2.25rem (touch-first forms). */
export type RatingSize = "sm" | "md" | "lg";

/** Step between selectable values. `0.5` adds a half-star radio per icon. */
export type RatingPrecision = 1 | 0.5;

export interface RatingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children"> {
  /** Controlled value (0 / null = nothing selected). */
  value?: number | null;
  /** Uncontrolled initial value. @default 0 */
  defaultValue?: number | null;
  /** Fires when the user picks a value (click, tap, or arrow keys). */
  onChange?: (value: number, event: ChangeEvent<HTMLInputElement>) => void;
  /** Number of icons. @default 5 */
  max?: number;
  /** @default 1 */
  precision?: RatingPrecision;
  /**
   * Display only: renders `role="img"` named "4 out of 5 stars" (override with `aria-label`);
   * fractional values are rounded to `precision`.
   */
  readOnly?: boolean;
  /** Radios are disabled and skipped by Tab. */
  disabled?: boolean;
  size?: RatingSize;
  /** Filled icon (defaults to a star). Use `currentColor` so theme tokens apply. */
  icon?: ReactNode;
  /** Empty icon. Defaults to `icon` (outlined via colour) or the outlined star. */
  emptyIcon?: ReactNode;
  /** Form field name for the radios (value submitted with the form). Auto-generated when omitted. */
  name?: string;
  /** Accessible name of each option. @default (v) => "3 stars" / "1 star" / "2.5 stars" */
  getLabelText?: (value: number) => string;
  /** Accessible name of the radio group (alias of `aria-label`). @default "Rating" */
  label?: string;
  /** Marks the group required (`aria-required`) and the radios `required`. */
  required?: boolean;
}
