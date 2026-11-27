import type { OtpBoxSize, OtpBoxType, OtpBoxVariant } from "./OtpBox.types";

export const OTP_BOX_DEFAULTS: {
  length: number;
  type: OtpBoxType;
  variant: OtpBoxVariant;
  size: OtpBoxSize;
  mask: boolean;
  showValidation: boolean;
  incompleteMessage: string;
  ariaLabel: string;
  maskChar: string;
} = {
  length: 6,
  type: "numeric",
  variant: "boxes",
  size: "md",
  mask: false,
  showValidation: true,
  incompleteMessage: "Please enter correct OTP",
  ariaLabel: "One-time code",
  maskChar: "•",
};

export const OTP_BOX_VARIANTS: readonly OtpBoxVariant[] = ["boxes", "outlined", "filled", "underlined"] as const;
export const OTP_BOX_SIZES: readonly OtpBoxSize[] = ["sm", "md", "lg"] as const;
export const OTP_BOX_TYPES: readonly OtpBoxType[] = ["numeric", "alphanumeric", "alphabet"] as const;

/** Characters to strip for each type. */
export const OTP_BOX_REJECT: Record<OtpBoxType, RegExp> = {
  numeric: /\D/g,
  alphabet: /[^a-zA-Z]/g,
  alphanumeric: /[^a-zA-Z0-9]/g,
};

export const OTP_BOX_INPUT_MODE: Record<OtpBoxType, "numeric" | "text"> = {
  numeric: "numeric",
  alphabet: "text",
  alphanumeric: "text",
};

export const OTP_BOX_PATTERN: Record<OtpBoxType, string> = {
  numeric: "\\d*",
  alphabet: "[a-zA-Z]*",
  alphanumeric: "[a-zA-Z0-9]*",
};
