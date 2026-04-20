import type * as React from "react";
import type { IconSource } from "../Icon";
export type ValidationType =
  | "none"
  | "name"
  | "email"
  | "mobile"
  | "businessPID"
  | "businessAID"
  | "businessTAN"
  | "acknowledgementNumber"
  | "businessPassport"
  | "businessTIN"
  | "alphanumeric"
  | "numeric"
  | "pincode"
  | "custom"
  | "headerSearch"
  | "stdCode"     
  | "landline"
  | "entityName";   

export type MaskFrom = "start" | "end";

export type MaskOptions = Partial<{
  maskChar: string;
  maskFrom: MaskFrom;
  maskPattern: number[];
}>;

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type" | "maxLength" | "id" | "size" | "pattern" | "prefix" | "suffix"
>;

/** Ant Design–style: outlined (default) | filled | borderless | underlined */
export type InputVariant = "outlined" | "filled" | "borderless" | "underlined";

/** Explicit validation/status display: error | warning | success */
export type InputStatus = "error" | "warning" | "success";

export interface TextInputProps extends NativeInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  validation?: ValidationType;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onErrorChange?: (error: string | null) => void;
  onVerifiedChange?: (verified: boolean) => void;
  errorMessage?: string;
  maxLength?: number;
  /** Ant Design–style size: sm (24px) | md (32px) | lg (40px) */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  borderColorClass?: string;
  className?: string;
  ariaLabel?: string;
  pattern?: RegExp | string;
  rounded?: "0" | "1" | "2" | "3" | "4" | "5" | "pill" | "circle";
  showVerifiedStatus?: boolean;
  isVerified?: boolean;
  mask?: boolean;
  maskOptions?: MaskOptions;
  showToggleIcon?: boolean;

  /** Allow clear content with a clear icon (Ant Design allowClear) */
  allowClear?: boolean;
  /** Callback when clear icon is clicked */
  onClear?: () => void;
  /** Prefix content (e.g. icon) inside the input on the left */
  prefix?: React.ReactNode;
  /**
   * Suffix content inside the input on the right, before clear/toggle.
   * For `type="search"`, omit or pass `undefined` to get the default trailing search icon;
   * pass `null` to suppress it (e.g. prefix-only search fields).
   */
  suffix?: React.ReactNode;
  /** Show character count (e.g. "0 / 200") when maxLength is set */
  showCount?: boolean;
  /** Callback when Enter key is pressed */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Override status display: error | warning | success */
  status?: InputStatus;
  /** Ant Design–style variant: outlined | filled | borderless | underlined */
  variant?: InputVariant;

  // Icon customization
  toggleIcon?: IconSource;
  toggleOffIcon?: IconSource;
  errorIcon?: IconSource;
  verifiedIcon?: IconSource;
  toggleIconSize?: number;
  statusIconSize?: number;
  disableClipboard?: boolean;
  isdCode?: string;
}