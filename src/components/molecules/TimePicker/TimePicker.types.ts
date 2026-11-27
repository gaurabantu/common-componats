import type { InputHTMLAttributes, ReactNode } from "react";

/** Control height — matches `Input` / `Select` / `NumberInput` (sm / md / lg). */
export type TimePickerSize = "sm" | "md" | "lg";

/** Clock format: 12-hour with AM / PM period, or 24-hour. */
export type TimePickerFormat = 12 | 24;

/** Keyboard segment of the text box that ArrowUp / ArrowDown change. */
export type TimePickerSegment = "hour" | "minute" | "period";

/** Overridable copy (i18n). */
export interface TimePickerLabels {
  /** Accessible name of the button that opens the list. @default "Show times" */
  toggle: string;
  /** Accessible name of the clear button. @default "Clear time" */
  clear: string;
  /** Accessible name of the listbox. @default "Times" */
  listbox: string;
  /** Error when typed text is not a time. @default "Enter a valid time" */
  invalid: string;
  /** Error when a typed time is outside `min` / `max` or in `disabledTimes`. @default "That time is not available" */
  unavailable: string;
}

export interface TimePickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "size" | "type" | "min" | "max" | "step" | "list"
  > {
  /** Controlled value as 24-hour `"HH:mm"`; `null` = empty. `undefined` makes the picker uncontrolled. */
  value?: string | null;
  /** Initial `"HH:mm"` value when uncontrolled. */
  defaultValue?: string | null;
  /** Fires with the new 24-hour `"HH:mm"` value, or `null` when cleared. */
  onChange?: (value: string | null) => void;
  /** Display format. Defaults to the locale's clock (`Intl.DateTimeFormat().resolvedOptions().hourCycle`). */
  format?: TimePickerFormat;
  /** Minutes between listbox options; also the ArrowUp / ArrowDown step on the minute segment. @default 15 */
  step?: number;
  /** Earliest selectable time, `"HH:mm"`. */
  min?: string;
  /** Latest selectable time, `"HH:mm"`. */
  max?: string;
  /** Unavailable times: a list of `"HH:mm"` strings or a predicate. Shown as disabled options. */
  disabledTimes?: string[] | ((time: string) => boolean);
  /** Show a clear (×) button when there is a value. @default false */
  clearable?: boolean;
  /** BCP 47 locale for option labels and the AM / PM text. Defaults to the runtime locale. */
  locale?: string;
  /** @default "md" */
  size?: TimePickerSize;
  /** Visible label (outside a `FormField`; inside one, the field label is used). */
  label?: ReactNode;
  /**
   * Error state. A string / node is rendered under the field (outside a `FormField`) and linked via
   * `aria-describedby`; `true` only sets `aria-invalid`. Inside a `FormField`, use the field's `error`.
   */
  error?: ReactNode;
  /** Form field name: renders a hidden input carrying the `"HH:mm"` value. */
  name?: string;
  /** Copy overrides (i18n). */
  labels?: Partial<TimePickerLabels>;
  /** Class on the root wrapper. */
  className?: string;
}
