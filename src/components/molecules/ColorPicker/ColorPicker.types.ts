import type React from "react";

export interface ColorPickerSwatch {
  /** Hex colour (`#rgb` or `#rrggbb`). This is what `onChange` receives (normalised to `#rrggbb`). */
  value: string;
  /** Accessible / tooltip name, e.g. "Success green". Defaults to the hex. */
  label?: string;
  /**
   * Design token the swatch mirrors, e.g. `"--color-state-success"`. With `resolveTokens`
   * the swatch takes the token's live value (current theme); otherwise `value` is used.
   */
  token?: string;
}

export type ColorPickerSwatchSize = "sm" | "md";

export interface ColorPickerProps {
  /** Controlled hex value (`#rrggbb`; `#rgb` accepted). Case-insensitive. */
  value?: string;
  /** Uncontrolled initial hex. */
  defaultValue?: string;
  /** Fires with a normalised lowercase `#rrggbb` hex string. */
  onChange?: (hex: string) => void;
  /** Alias of `onChange`. */
  onValueChange?: (hex: string) => void;
  /** Swatches (hex strings or objects). @default DEFAULT_COLOR_PICKER_PALETTE (design-token colours) */
  palette?: Array<string | ColorPickerSwatch>;
  /** Swatches per row. @default 5 for the default palette, otherwise 8 */
  columns?: number;
  /** Hex text field under the swatches. @default true */
  showHexInput?: boolean;
  /** Native `<input type="color">` for arbitrary colours. @default false */
  showNativePicker?: boolean;
  /**
   * Resolve swatch `token`s against the current theme at mount (the emitted value is still hex).
   * Off by default so stored colours don't depend on the active theme. @default false
   */
  resolveTokens?: boolean;
  /** Visible label (names the swatch radiogroup). */
  label?: React.ReactNode;
  /** Accessible name when there is no visible label. @default "Colour" */
  ariaLabel?: string;
  /** @default "md" (28px; `sm` = 24px — both meet WCAG 2.5.8) */
  swatchSize?: ColorPickerSwatchSize;
  disabled?: boolean;
  id?: string;
  /** Renders a hidden input with the current hex for native form posts. */
  name?: string;
  className?: string;
}
