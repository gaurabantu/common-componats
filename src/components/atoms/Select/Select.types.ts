import React from "react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode | string; // NEW: icon support
  iconPosition?: "left" | "right"; // NEW: icon positioning
}

/** Native `<optgroup>` section — use with `Select` for grouped plain-text options. */
export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  /**
   * Flat option list. Ignored when `groups` is provided.
   * @default []
   */
  options?: SelectOption[];
  /**
   * Grouped options as native `<optgroup>` sections. When set, `options` is ignored.
   */
  groups?: SelectOptionGroup[];
  placeholder?: string;
  /**
   * @deprecated Native `<select>` cannot filter options in the DOM. Use **`Combobox`** with `searchable` for search.
   */
  liveSearch?: boolean;
  customClass?: string;
  error?: string;
  helperText?: string;
  showIcons?: boolean; // NEW: control icon display
  onValueChange?: (value: string, option?: SelectOption) => void; // NEW: enhanced change handler
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill";
  status?: "error" | "warning" | "success";
  allowPlaceholderSelection?: boolean;
}