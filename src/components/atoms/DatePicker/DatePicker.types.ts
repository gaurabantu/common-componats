export interface DatePickerProps {
  value?: string;
  onChange?: (val: string) => void;
  label?: string;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  range?: boolean;
  className?: string;
  helperText?: string;
  disabled?: boolean;
  /** Display format: DD-MM-YYYY (default), MM/DD/YYYY, YYYY-MM-DD, etc. Input accepts flexible formats; output uses this format. */
  dateFormat?: string;
  minDate?: string;
  maxDate?: string;
  validate?: (val: string) => boolean;
  onValidate?: (valid: boolean) => void;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill";
  variant?: "outlined" | "filled" | "underlined";
  status?: "error" | "warning" | "success";
  rangeSeparator?: string;
}
