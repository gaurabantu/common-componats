import type { InputHTMLAttributes, ReactNode } from "react";

/** Control + label scale — `sm` 16px box · `md` 18px box (default) · `lg` 22px box. */
export type CheckboxSize = "sm" | "md" | "lg";

/**
 * Native `<input type="checkbox">` attributes forwarded to the input (`data-*`, `aria-*`, `form`,
 * `tabIndex`, `onBlur`, `onFocus`, `onClick`, `autoFocus`, …). Props the component manages are omitted.
 */
export type CheckboxNativeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "size"
  | "onChange"
  | "checked"
  | "defaultChecked"
  | "value"
  | "name"
  | "id"
  | "className"
  | "required"
  | "disabled"
  | "children"
>;

export interface CheckboxProps extends CheckboxNativeProps {
  /**
   * Label content (string or any node). Optional — when omitted/empty, pass `ariaLabel` or
   * `ariaLabelledBy` so the input still has an accessible name.
   */
  label?: ReactNode;
  /**
   * Keep the label in the DOM for screen readers (it still names the input) but hide it visually.
   * @default false
   */
  hideLabel?: boolean;
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * "Some but not all" state (e.g. a select-all header). Sets the DOM `indeterminate`
   * property (exposed natively to assistive tech as "mixed") and shows a dash.
   * Takes visual precedence over `checked`.
   * @default false
   */
  indeterminate?: boolean;
  /** Helper text under the label, linked with `aria-describedby`. */
  description?: ReactNode;
  /** @default "md" */
  size?: CheckboxSize;
  /** Error message under the control — sets `aria-invalid` and is linked with `aria-describedby`. */
  error?: string;
  /** Native `required` plus a visible "*" after the label. @default false */
  required?: boolean;
  /** Input id. Generated with `useId` when omitted. */
  id?: string;

  /**
   * Optional classes on the custom checkbox shell (supports Tailwind `peer-checked:` alongside the visually hidden input marked `peer`).
   * @deprecated Style through design tokens / `size` instead; kept for backward compatibility.
   */
  checkboxColorClass?: string;
  /** @deprecated Style through design tokens / `size` instead; kept for backward compatibility. */
  labelColorClass?: string;
  /** @deprecated Use layout on the parent instead; kept for backward compatibility. */
  inputLabelSpacingClass?: string;
  className?: string;
  ariaLabelledBy?: string;
  /**
   * Required for screen readers when `label` is empty (e.g. table row selection).
   * Sets `aria-label` on the input instead of relying on an empty visible label.
   */
  ariaLabel?: string;

  /** Controls design (default or boxed) */
  shape?: "default" | "box";

  /** Rounded size for box mode */
  rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";

  /** Optional shadow for box mode */
  withShadow?: boolean;
}
