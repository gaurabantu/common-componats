export interface CheckboxProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  checkboxColorClass?: string;
  labelColorClass?: string;
  inputLabelSpacingClass?: string;
  className?: string;
  ariaLabelledBy?: string;
  /**
   * Required for screen readers when `label` is empty (e.g. table row selection).
   * Sets `aria-label` on the input instead of relying on an empty visible label.
   */
  ariaLabel?: string;

  /** NEW — controls design (default or boxed) */
  shape?: "default" | "box";

  /** NEW — rounded size for box mode */
  rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";

  /** NEW — optional shadow for box mode */
  withShadow?: boolean;
}

