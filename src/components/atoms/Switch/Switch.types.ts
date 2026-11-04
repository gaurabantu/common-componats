import type React from "react";

export type SwitchSize = "sm" | "md";

/**
 * Native `<button role="switch">` attributes forwarded to the control (`data-*` such as
 * `data-testid`, `aria-*`, `onBlur`, `onFocus`, `onClick`, `tabIndex`, `title`, `form`, …).
 * Props the component manages are omitted.
 */
export type SwitchNativeProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "type"
  | "role"
  | "id"
  | "name"
  | "value"
  | "disabled"
  | "className"
  | "children"
  | "onChange"
  | "defaultChecked"
  | "aria-checked"
  | "aria-label"
>;

export interface SwitchProps extends SwitchNativeProps {
  /** Controlled: current on/off state. Omit with `defaultChecked` for uncontrolled. */
  checked?: boolean;
  /** Uncontrolled initial state (ignored when `checked` is set). */
  defaultChecked?: boolean;
  /** Fires after toggle with the new value. */
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Optional id for the switch control (auto-generated if omitted). */
  id?: string;
  /**
   * When set, a hidden input is rendered for native form posts:
   * `value` when on, `uncheckedValue` when off.
   */
  name?: string;
  /** Submitted when the switch is on (default `"on"`). */
  value?: string;
  /** Submitted when the switch is off (default `"off"`). */
  uncheckedValue?: string;
  /** Visible label next to the control (any node). */
  label?: React.ReactNode;
  /**
   * Keep `label` as the accessible name but hide it visually (for dense rows / table cells).
   * @default false
   */
  hideLabel?: boolean;
  /** Label before or after the track (default `"end"`). */
  labelPosition?: "start" | "end";
  /**
   * Accessible name when there is no visible `label`.
   * If both are omitted, `"Toggle"` is used.
   */
  "aria-label"?: string;
  /** Extra class on the outer wrapper. */
  className?: string;
  /** Extra class on the switch button (track + thumb). */
  switchClassName?: string;
  /** `md` uses a compact 40×22px visual track with ~44×44px touch target; `sm` is denser. */
  size?: SwitchSize;
}
