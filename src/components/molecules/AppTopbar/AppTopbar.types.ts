import type React from "react";
import type { IconSource } from "../../atoms/Icon";
import type { AvatarProps } from "../../atoms/Avatar/Avatar.types";

export type AppTopbarTheme = "dark" | "light";

export interface AppTopbarSearchConfig {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  inputId?: string;
  disabled?: boolean;
  /** Passes through to `InputSearch` (useful when the field is expanded on mobile). */
  showClearButton?: boolean;
}

/** Items for the narrow-layout hamburger menu (popover). */
export interface AppTopbarMenuItem {
  id: string;
  label: string;
  icon?: IconSource;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  destructive?: boolean;
}

export interface AppTopbarAction {
  id: string;
  icon: IconSource;
  label: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  badgeCount?: number;
  /** Unread dot (no count). */
  badgeDot?: boolean;
  /** Default ghost; use `outlinePrimary` / `primary` for a subtle highlighted quick action. */
  variant?: "ghost" | "outlinePrimary" | "primary";
}

export interface AppTopbarProfile {
  avatar?: React.ReactNode;
  avatarProps?: Partial<AvatarProps>;
  name?: string;
  onClick?: () => void;
  menuLabel?: string;
}

export interface AppTopbarTokens {
  bg?: string;
  bgElevated?: string;
  text?: string;
  textMuted?: string;
  border?: string;
  hover?: string;
  activeBg?: string;
  focusRing?: string;
  shadow?: string;
}

export interface AppTopbarClassNames {
  root?: string;
  inner?: string;
  left?: string;
  center?: string;
  right?: string;
  title?: string;
}

export interface AppTopbarProps {
  theme?: AppTopbarTheme;
  title: string;
  titleAs?: "h1" | "h2";
  search?: AppTopbarSearchConfig;
  /** Replaces the default search region (e.g. command bar). */
  centerSlot?: React.ReactNode;
  actions?: AppTopbarAction[];
  profile?: AppTopbarProfile;
  /** Narrow layout: opens sidebar drawer / nav when `mobileMenuItems` is not set. */
  onMobileMenuClick?: () => void;
  mobileMenuLabel?: string;
  /**
   * Narrow layout: hamburger opens a menu with these items (aligned with common AppBar patterns).
   * If omitted or empty, the hamburger calls `onMobileMenuClick` instead.
   */
  mobileMenuItems?: AppTopbarMenuItem[];
  /** Visually expanded mobile search panel (`aria-expanded` on the search trigger). */
  mobileSearchTriggerLabel?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  sticky?: boolean;
  zIndex?: number;
  /** Viewport width below which center search/slot is hidden and mobile menu may show. */
  collapseCenterBelowWidth?: number;
  /** Enables `useBelowWidth` listeners; set false for SSR-only snapshots. */
  responsive?: boolean;
  tokens?: AppTopbarTokens;
  className?: string;
  classNames?: AppTopbarClassNames;
}
