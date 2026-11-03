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

export type SelectSize = "sm" | "md" | "lg";

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
  /**
   * Error message. Sets `aria-invalid`, forces the error status (wins over `status`) and is linked
   * to the control with `aria-describedby`. Replaces `helperText` while set.
   */
  error?: string;
  helperText?: string;
  showIcons?: boolean; // NEW: control icon display
  onValueChange?: (value: string, option?: SelectOption) => void; // NEW: enhanced change handler
  fullWidth?: boolean;
  /**
   * Control-height tier — matches `Input` sm/md/lg (`--button-height-sm` / `--button-height-lg` / `3rem`).
   * Rendered as `data-size` on the `<select>`.
   * @default "md"
   */
  size?: SelectSize;
  rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill";
  status?: "error" | "warning" | "success";
  allowPlaceholderSelection?: boolean;
  /**
   * When true, an overlay chevron rotates while the native picker is open (tracked from pointer /
   * opener keys, reset on change, blur and other keys). Focus stays on the control after a pick.
   * @default true
   */
  animatedChevron?: boolean;
  /**
   * Native `required`. When Select renders its own `label`, a visible `*` marker is added
   * (the native attribute already announces "required").
   */
  required?: boolean;
}