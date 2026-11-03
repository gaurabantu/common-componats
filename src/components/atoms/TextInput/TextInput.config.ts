import { ValidationType } from "./TextInput.types";

/** Single-line toolbar / Material-style search rails (`validation === "headerSearch"`). */
export type TextInputSizeKey = "sm" | "md" | "lg";

export const HEADER_SEARCH_LAYOUT: Record<
  TextInputSizeKey,
  {
    /** Nominal rail height in px (used for icon proportions). */
    shellMinHeight: number;
    /** Rendered rail min-height — a token, so tokens.css resizes search with Select/Button. */
    shellMinHeightToken: string;
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
  /**
   * Tier heights mirror `Select` sm/md/lg `minHeight` (--button-height-sm / --button-height-lg / 3rem) so filter rows align in Storybook
   * and apps without ad-hoc pixel tweaks.
   */
  sm: {
    shellMinHeight: 32,
    shellMinHeightToken: "var(--button-height-sm)",
    horizontalPadding: 9,
    prefixAddonPadding: 7,
    suffixPadLeft: 7,
    suffixPadRight: 3,
    inputLineHeight: 1.35,
    decorativeTrailingSearchIcon: 14,
    clearIconSize: 11,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 24,
    integratedIconPadX: 9,
  },
  md: {
    shellMinHeight: 40,
    shellMinHeightToken: "var(--button-height-lg)",
    horizontalPadding: 12,
    prefixAddonPadding: 9,
    suffixPadLeft: 10,
    suffixPadRight: 4,
    inputLineHeight: 1.35,
    decorativeTrailingSearchIcon: 16,
    clearIconSize: 12,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 32,
    integratedIconPadX: 11,
  },
  lg: {
    shellMinHeight: 48,
    shellMinHeightToken: "3rem",
    horizontalPadding: 12,
    prefixAddonPadding: 9,
    suffixPadLeft: 10,
    suffixPadRight: 4,
    inputLineHeight: 1.38,
    decorativeTrailingSearchIcon: 17,
    clearIconSize: 12,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 40,
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