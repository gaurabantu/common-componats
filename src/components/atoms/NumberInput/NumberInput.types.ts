import type { InputHTMLAttributes, ReactNode } from "react";

export type NumberInputSize = "sm" | "md" | "lg";

export interface NumberInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "size" | "type" | "min" | "max" | "step" | "prefix" | "inputMode"
  > {
  /** Controlled value; `null` = empty. `undefined` makes the field uncontrolled. */
  value?: number | null;
  /** Initial value when uncontrolled. */
  defaultValue?: number | null;
  /** Fires with the parsed number (or `null` when emptied) as the user types, steps, or on blur after clamping. Invalid text never fires. */
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  /** Arrow / stepper increment. Shift+Arrow and PageUp / PageDown use 10×. @default 1 */
  step?: number;
  /** Fixed fraction digits for display and rounding (e.g. 2 for money). */
  precision?: number;
  /** BCP 47 locale for parsing and formatting (grouping / decimal separators, digits). */
  locale?: string;
  /**
   * `Intl.NumberFormat` options for the blurred display — currency, percent (`value` is a fraction:
   * 0.25 shows "25%"; use `step={0.01}`), unit, or `notation: "compact"` ("1.2K"; parsed back too).
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** Leading slot (e.g. "$" or an icon). Strings are included in `aria-valuetext`; the slot itself is hidden from AT. */
  prefix?: ReactNode;
  /** Trailing slot (e.g. "kg"). Strings are included in `aria-valuetext`; the slot itself is hidden from AT. */
  suffix?: ReactNode;
  /** − / + buttons (press and hold repeats). @default true */
  showSteppers?: boolean;
  /** When false, minus signs are ignored and the lower bound is at least 0. @default true */
  allowNegative?: boolean;
  /** Clamp to `[min, max]` and round to `precision` on blur / Enter. @default true */
  clampOnBlur?: boolean;
  /** Visible label (outside a `FormField`; inside one, the field label is used). */
  label?: ReactNode;
  /**
   * Error state. A string / node is rendered under the field (outside a `FormField`) and linked via
   * `aria-describedby`; `true` only sets `aria-invalid`. Inside a `FormField`, use the field's `error`.
   */
  error?: ReactNode;
  /** @default "md" */
  size?: NumberInputSize;
  disabled?: boolean;
  readOnly?: boolean;
  /** Accessible name of the + button. @default "Increase" */
  incrementLabel?: string;
  /** Accessible name of the − button. @default "Decrease" */
  decrementLabel?: string;
  /** Class on the root wrapper. */
  className?: string;
}
