/**
 * - `boxes` — one input per character (default; best for SMS codes)
 * - `outlined` / `filled` / `underlined` — a single input holding the whole code
 */
export type OtpBoxVariant = "outlined" | "filled" | "underlined" | "boxes";

/** Cell / input size. `sm` 40px · `md` 44px · `lg` 48px cells. */
export type OtpBoxSize = "sm" | "md" | "lg";

/** Accepted characters. Drives filtering, `inputMode` and `pattern`. */
export type OtpBoxType = "numeric" | "alphanumeric" | "alphabet";

/** Imperative handle exposed through `ref`. */
export interface OtpBoxHandle {
  /** Focus a cell (boxes) or the input. Without an index: the first empty cell. */
  focus: (index?: number) => void;
  /** Empty the code, fire `onChange("")` and focus the first cell. */
  clear: () => void;
  /** Current value. */
  getValue: () => string;
}

export interface OtpBoxProps {
  /** Number of characters. @default 6 */
  length?: number;
  /** Render characters as "•" (the real value is still emitted). @default false */
  mask?: boolean;
  /**
   * Current value. The box keeps its own state and re-syncs whenever this prop changes, so it
   * works both controlled (`value` + `onChange`) and uncontrolled.
   */
  value?: string;
  /** Initial value when `value` is not passed. */
  defaultValue?: string;
  /** @default "numeric" */
  type?: OtpBoxType;
  /** @default "boxes" */
  variant?: OtpBoxVariant;
  /** @default "md" */
  size?: OtpBoxSize;
  /** Fires on every edit with the filtered value. */
  onChange?: (value: string) => void;
  /** Fires once every character has been entered (typing, paste or SMS autofill). */
  onComplete?: (value: string) => void;
  /** Focus the first cell on mount. @default false */
  autoFocus?: boolean;
  /** Form field name. Renders a hidden input carrying the real (unmasked) value. */
  name?: string;
  /** Base id. Single-input variants use it as the input id; boxes use `${id}-0`, `${id}-1`, … */
  id?: string;
  /** Visible label. Names the group (boxes) or the input (single variants). */
  label?: string;
  /** Accessible name used when there is no visible `label`. @default "One-time code" */
  ariaLabel?: string;
  /**
   * Per-cell accessible name. Default: "Digit 2 of 6" (numeric) / "Character 2 of 6" (others).
   * `index` is zero-based.
   */
  getCellLabel?: (index: number, length: number) => string;
  /** Error message. Sets `aria-invalid` and is linked via `aria-describedby`. */
  error?: string;
  /**
   * Show a built-in message when the code is incomplete. It appears only after focus leaves the
   * field (never mid-typing). @default true
   */
  showValidation?: boolean;
  /** Message for the incomplete-code check. @default "Please enter correct OTP" */
  incompleteMessage?: string;
  /** Marks the field required (`aria-required` on the inputs). @default false */
  required?: boolean;
  disabled?: boolean;
  className?: string;
  /** Extra class on the root (kept for compatibility — same element as `className`). */
  containerClass?: string;
}
