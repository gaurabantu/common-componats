import { ValidationType } from "./TextInput.types";

/** Single-line toolbar / Material-style search rails (`validation === "headerSearch"`). */
export type TextInputSizeKey = "sm" | "md" | "lg";

export const HEADER_SEARCH_LAYOUT: Record<
  TextInputSizeKey,
  {
    shellMinHeight: number;
    horizontalPadding: number;
    prefixAddonPadding: number;
    suffixPadLeft: number;
    suffixPadRight: number;
    inputLineHeight: number;
    decorativeTrailingSearchIcon: number;
    clearIconSize: number;
    clearHitPaddingX: number;
    /** Trailing action button — fits inside rail (below icon-only mins). */
    searchActionInsetHeight: number;
    /** Integrated rail — horizontal padding inside icon-only trailing `Button`. */
    integratedIconPadX: number;
  }
> = {
  sm: {
    shellMinHeight: 32,
    horizontalPadding: 8,
    prefixAddonPadding: 6,
    suffixPadLeft: 6,
    suffixPadRight: 2,
    inputLineHeight: 1.35,
    decorativeTrailingSearchIcon: 14,
    clearIconSize: 11,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 26,
    integratedIconPadX: 8,
  },
  md: {
    shellMinHeight: 36,
    horizontalPadding: 10,
    prefixAddonPadding: 8,
    suffixPadLeft: 8,
    suffixPadRight: 4,
    inputLineHeight: 1.35,
    decorativeTrailingSearchIcon: 15,
    clearIconSize: 12,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 30,
    integratedIconPadX: 10,
  },
  lg: {
    shellMinHeight: 42,
    horizontalPadding: 12,
    prefixAddonPadding: 8,
    suffixPadLeft: 8,
    suffixPadRight: 4,
    inputLineHeight: 1.38,
    decorativeTrailingSearchIcon: 17,
    clearIconSize: 12,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 34,
    integratedIconPadX: 12,
  },
};

export const defaultMaxLength: Record<ValidationType, number> = {
  none: 255,
  name: 50,
  email: 100,
  mobile: 15,
  businessPID: 10,
  businessAID: 12,
  businessTAN: 10,
  acknowledgementNumber: 20,
  businessPassport: 8,
  businessTIN: 20,
  alphanumeric: 500,
  numeric: 200,
  pincode: 6,
  custom: 255,
  headerSearch: 200,
  stdCode: 8,
  landline: 15,
  entityName: 255,
};