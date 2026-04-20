import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type TabsOrientation = "horizontal" | "vertical";

/**
 * - `line` — underline indicator (default)
 * - `minimal` — soft fill on active tab
 * - `segmented` — single rounded “one box” track, sliding pill + icon/label (shadcn-style)
 */
export type TabsVariant = "line" | "minimal" | "segmented";

export type TabsSize = "sm" | "md";

/**
 * - `wrap` — tabs flow to multiple rows when needed (default)
 * - `nowrap` — single row; overflow scrolls horizontally
 * - `equal` — tabs share width evenly on one row; long labels wrap inside each tab
 */
export type TabsListLayout = "wrap" | "nowrap" | "equal";

/**
 * Icon + label arrangement inside each tab trigger.
 * - `inline` — icon and label on one row (default)
 * - `stacked` — icon above label
 */
export type TabsTriggerLayout = "inline" | "stacked";

/**
 * Horizontal alignment of icon+label inside the tab trigger (LTR).
 * @default "center"
 */
export type TabsTriggerAlign = "start" | "center" | "end";

/**
 * Keyboard activation (aligned with Radix Tabs).
 * - `automatic` — moving focus with arrows activates that tab (default).
 * - `manual` — arrows only move focus; activate with Enter or Space on the focused tab (or click).
 */
export type TabsActivationMode = "automatic" | "manual";

/**
 * Enter animation for the visible tab panel (shadcn-style subtle motion).
 * - `none` — no animation
 * - `fade` — opacity only
 * - `fade-slide` — opacity + short vertical motion
 */
export type TabsContentAnimation = "none" | "fade" | "fade-slide";

/** Context value exposed for advanced composition (mirrors common tabs APIs). */
export interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
  orientation: TabsOrientation;
  variant: TabsVariant;
  size: TabsSize;
  listLayout: TabsListLayout;
  activationMode: TabsActivationMode;
  triggerLayout: TabsTriggerLayout;
  triggerAlign: TabsTriggerAlign;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Selected panel id when controlled */
  value?: string;
  /** Initial panel id when uncontrolled */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  /** Visual style of the tab row */
  variant?: TabsVariant;
  size?: TabsSize;
  /** Tab strip layout: wrapped rows, single scrolling row, or equal-width columns */
  listLayout?: TabsListLayout;
  /**
   * Keyboard behavior: automatic (focus = select) vs manual (Enter/Space to select).
   * @default "automatic"
   */
  activationMode?: TabsActivationMode;
  /**
   * Animation when a tab panel becomes visible (new panel mount or switch).
   * @default "fade"
   */
  contentAnimation?: TabsContentAnimation;
  /**
   * Color of the list divider (horizontal bottom or vertical right border).
   * Selected tab indicator uses the same color unless `indicatorColor` is set.
   */
  dividerColor?: string;
  /** Thickness of the list divider line, e.g. `1` or `"2px"` */
  dividerWidth?: number | string;
  /**
   * Selected-tab indicator color; defaults to `dividerColor` / `--tabs-divider-color`.
   */
  indicatorColor?: string;
  /** Indicator thickness; defaults to `dividerWidth` */
  indicatorWidth?: number | string;
  /** Inactive tab label color */
  inactiveTextColor?: string;
  /**
   * Active tab label color; defaults to the indicator color (same as divider when synced).
   */
  activeTextColor?: string;
  /** Override tab label font size, e.g. `15` or `"0.875rem"` */
  tabFontSize?: number | string;
  /**
   * Icon + label layout for triggers that pass `icon` (ignored for text-only tabs).
   * @default "inline"
   */
  triggerLayout?: TabsTriggerLayout;
  /**
   * Horizontal alignment of icon+label inside each tab (LTR).
   * @default "center"
   */
  triggerAlign?: TabsTriggerAlign;
  children: ReactNode;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the tablist (maps to `aria-label`) */
  ariaLabel: string;
  children: ReactNode;
}

export interface TabsTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role"> {
  value: string;
  children: ReactNode;
  /** Optional icon before the label (e.g. lucide icon or `<Icon />`). */
  icon?: ReactNode;
  /** Disable this tab (not focusable, not selectable) */
  disabled?: boolean;
  /** Override parent `Tabs` `triggerLayout` for this tab only */
  triggerLayout?: TabsTriggerLayout;
  /** Override parent `Tabs` `triggerAlign` for this tab only */
  triggerAlign?: TabsTriggerAlign;
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
  /** When true, inactive panels stay mounted but hidden (preserves state) */
  forceMount?: boolean;
}
