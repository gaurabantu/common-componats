import type { SelectProps, SelectSize } from "./Select.types";

export const defaultSelectOptions = {
  placeholder: "Select an option",
  liveSearch: false,
  customClass: "",
  showIcons: true, // NEW: default to show icons
};

/**
 * Control-height tier per size — the same tokens `Input` uses (`TextInput.config.ts`
 * `shellMinHeightToken`) so Select, Input and Button line up in toolbars and filter rows.
 * Rendered inline as `min-height`; a container with its own target can override it through
 * `style={{ minHeight: "var(--its-token)" }}` (consumer `style` is merged over the defaults).
 */
export const selectHeightTokens: Record<SelectSize, string> = {
  sm: "var(--button-height-sm)",
  md: "var(--button-height-lg)",
  lg: "3rem",
};

/** Keys that open the native picker without changing the value (Space, F4, Alt+Arrow). */
export function isPickerOpenKey(event: { key: string; altKey: boolean }): boolean {
  if (event.key === " " || event.key === "Spacebar" || event.key === "F4") return true;
  return event.altKey && (event.key === "ArrowDown" || event.key === "ArrowUp");
}

/**
 * Border + message colour per status. `-strong` semantic tokens only: >= 4.5:1 as text and >= 3:1 as a
 * border on `--color-bg-surface` in every theme (the raw `--color-state-*` accents are not).
 */
export const selectStatusTokens: Record<NonNullable<SelectProps["status"]>, string> = {
  error: "var(--color-danger-strong)",
  warning: "var(--color-warning-strong)",
  success: "var(--color-success-strong)",
};
