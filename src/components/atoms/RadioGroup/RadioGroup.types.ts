export interface RadioButtonProps {
  label: string;
  subLabel?: string;
  value: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  radioColorClass?: string;
  labelColorClass?: string;
  shape?: "default" | "box";
  rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";
  withShadow?: boolean;
}

export interface RadioGroupProps {
  options: Omit<RadioButtonProps, "checked" | "onChange" | "name">[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
  layout?: "vertical" | "horizontal" | "grid" | "grid-auto";
  columns?: number;
  minWidth?: string;
  gap?: string;
  radioColorClass?: string;
  labelColorClass?: string;
  ariaLabelledBy?: string;
}
