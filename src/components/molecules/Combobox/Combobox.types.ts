import type { HTMLAttributes, ReactNode } from "react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Shown in the list and in the trigger when this option is selected (single). */
  icon?: ReactNode;
}

export interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}

export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Field label above the control. */
  label?: string;
  /** Flat list. Ignored when `groups` is provided. */
  options?: ComboboxOption[];
  /** Grouped sections (search filters within each group). */
  groups?: ComboboxGroup[];
  searchable?: boolean;
  searchPlaceholder?: string;
  /** When true, value is `string[]` and options toggle on click. */
  multiple?: boolean;
  placeholder?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (
    value: string | string[],
    optionsOrOption?: ComboboxOption | ComboboxOption[]
  ) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
  /** Minimum width of the dropdown panel (matches trigger by default via popover). */
  listMinWidth?: number;
}
