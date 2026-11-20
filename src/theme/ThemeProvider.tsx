import React, { useMemo, useState, useSyncExternalStore } from "react";
import Select from "../components/atoms/Select";
import Button from "../components/atoms/Button";
import type { SelectProps } from "../components/atoms/Select/Select.types";
import {
  SYSTEM_THEME,
  getThemeState,
  getToggleTarget,
  initTheme,
  setTheme,
  subscribeTheme,
  toggleThemeMode,
  type ThemeConfig,
  type ThemeState,
} from "./themeController";

export interface UseThemeResult extends ThemeState {
  setTheme: (next: string) => void;
  /** Flip light ↔ dark (theme `pair`, else the `system` pair). */
  toggleMode: () => void;
  /** Theme `toggleMode` would switch to; `null` when there is no allowed counterpart. */
  toggleTarget: ThemeState["theme"] | null;
}

/** Current theme + setter. Re-renders when the theme changes anywhere (picker, `setTheme`, OS switch). */
export function useTheme(): UseThemeResult {
  const state = useSyncExternalStore(subscribeTheme, getThemeState, getThemeState);
  return useMemo(
    () => ({
      ...state,
      setTheme: (next: string) => void setTheme(next),
      toggleMode: () => void toggleThemeMode(),
      toggleTarget: getToggleTarget(),
    }),
    [state],
  );
}

export interface ThemeProviderProps extends ThemeConfig {
  children?: React.ReactNode;
}

/**
 * Optional React entry point: runs `initTheme(config)` once on first render.
 * Prefer calling `initTheme()` in `main.tsx` before `createRoot().render()` so the first paint is
 * already themed; use the provider when that isn't possible.
 */
export function ThemeProvider({ children, ...config }: ThemeProviderProps) {
  useState(() => initTheme(config));
  return <>{children}</>;
}

export interface ThemePickerProps
  extends Omit<SelectProps, "options" | "groups" | "value" | "onChange" | "onValueChange"> {
  /** Theme ids to offer (order kept). Defaults to every selectable theme. */
  themes?: string[];
  /** Add a "System" option that follows the OS light/dark setting. @default false */
  includeSystem?: boolean;
  /** Label for the System option. @default "System" */
  systemLabel?: string;
  /** Called after the theme changes. */
  onThemeChange?: (state: ThemeState) => void;
}

/** Theme dropdown built on `Select`. Writes through `setTheme`, so the choice is remembered. */
export function ThemePicker({
  themes,
  includeSystem = false,
  systemLabel = "System",
  onThemeChange,
  label = "Theme",
  placeholder = "",
  ...selectProps
}: ThemePickerProps) {
  const state = useTheme();
  const options = useMemo(() => {
    const list = themes
      ? themes.map((id) => state.themes.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => !!t)
      : state.themes;
    const opts = list.map((t) => ({ label: t.label, value: t.id }));
    if (includeSystem && state.systemAllowed) opts.unshift({ label: systemLabel, value: SYSTEM_THEME });
    return opts;
  }, [themes, includeSystem, systemLabel, state.themes, state.systemAllowed]);

  return (
    <Select
      {...selectProps}
      label={label}
      placeholder={placeholder}
      options={options}
      value={state.preference}
      onValueChange={(value) => {
        const next = setTheme(value);
        onThemeChange?.(next);
      }}
    />
  );
}

export interface ThemeModeIconProps extends React.SVGProps<SVGSVGElement> {
  /** Icon size in px. @default 20 */
  size?: number;
  /**
   * `action` (default): the mode you will switch TO — moon while light, sun while dark.
   * `current`: the mode you are in — sun while light, moon while dark.
   */
  show?: "action" | "current";
}

const SunGlyph = (
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </>
);
const MoonGlyph = <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />;

/** Sun / moon outline icon that follows the active theme mode (stroke = `currentColor`). */
export function ThemeModeIcon({ size = 20, show = "action", ...svgProps }: ThemeModeIconProps) {
  const { mode } = useTheme();
  const sun = show === "action" ? mode === "dark" : mode === "light";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      data-theme-icon={sun ? "sun" : "moon"}
      {...svgProps}
    >
      {sun ? SunGlyph : MoonGlyph}
    </svg>
  );
}

export interface ThemeToggleProps {
  /** Button size tier. @default "md" */
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  /** Accessible label; receives the mode you will switch to. */
  getLabel?: (targetMode: "light" | "dark") => string;
  className?: string;
  /** Called after the switch. */
  onToggle?: (state: ThemeState) => void;
}

/**
 * Icon button that flips light ↔ dark using the active theme's `pair`
 * (infinia-light ↔ infinia-dark, classic ↔ dark …). Hidden when no counterpart is allowed.
 */
export function ThemeToggle({
  size = "md",
  getLabel = (m) => (m === "dark" ? "Switch to dark theme" : "Switch to light theme"),
  className,
  onToggle,
}: ThemeToggleProps) {
  const { toggleTarget } = useTheme();
  if (!toggleTarget) return null;
  const label = getLabel(toggleTarget.mode);
  return (
    <Button
      variant="ghost"
      size={size}
      className={className}
      ariaLabel={label}
      title={label}
      icon={<ThemeModeIcon />}
      onClick={() => {
        const next = toggleThemeMode();
        onToggle?.(next);
      }}
    />
  );
}
