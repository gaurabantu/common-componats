import type React from "react";
import type { IconSource } from "../../atoms/Icon";
import type { AvatarProps } from "../../atoms/Avatar/Avatar.types";

export type AppSidebarTier = "primary" | "secondary" | "tertiary";

/** One grouping method per section (UX Governance). */
export type AppSidebarSectionGrouping = "label" | "spacing" | "divider";

export type AppSidebarTrailingPreset = "lock" | "check" | "none";

export interface AppSidebarNavItem {
  id: string;
  label: string;
  icon?: IconSource | React.ReactNode;
  disabled?: boolean;
  trailing?: AppSidebarTrailingPreset | IconSource | React.ReactNode;
  trailingLabel?: string;
  href?: string;
  onClick?: (id: string, item: AppSidebarNavItem) => void;
  /** Context layer: nested routes (workspaces, chats, projects). */
  children?: AppSidebarNavItem[];
  /** Initial expanded when item has `children`. */
  defaultExpanded?: boolean;
  /** e.g. “+ Create New” under nested list */
  createAction?: {
    label: string;
    onClick: () => void;
    icon?: IconSource | React.ReactNode;
  };
}

export interface AppSidebarSection {
  id: string;
  tier: AppSidebarTier;
  grouping: AppSidebarSectionGrouping;
  /** Required when `grouping === "label"` */
  label?: string;
  items: AppSidebarNavItem[];
}

/**
 * Theme overrides (set on sidebar root as CSS variables).
 * Names align with `AppSidebar.css` — use hex, rgb(), or any valid CSS color.
 */
export type AppSidebarTokens = Partial<{
  noir0: string;
  noir1: string;
  noir2: string;
  noir3: string;
  sidebarText: string;
  sidebarTextMuted: string;
  sidebarHover: string;
  sidebarActiveBg: string;
  sidebarActiveTint: string;
  sidebarFocus: string;
  sidebarBorder: string;
  sidebarBorderStrong: string;
  /** Default (inactive) nav row icons */
  sidebarNavIcon: string;
  /** Active row icons */
  sidebarNavIconActive: string;
  /** Footer utility icon buttons */
  sidebarUtilityIcon: string;
  /** “Create new” dashed border */
  sidebarCreateDash: string;
}>;

/** Optional `className` hooks (Tailwind-friendly). */
export type AppSidebarClassNames = Partial<{
  root: string;
  header: string;
  headerTrailing: string;
  nav: string;
  footer: string;
  footerRow: string;
  footerProfile: string;
  footerUtilities: string;
}>;

/** Footer column order — default matches common apps (avatar left, utilities right). */
export type AppSidebarFooterLayout = "profileFirst" | "utilitiesFirst";

export interface AppSidebarHeader {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  /** End of header row (e.g. theme, notifications) — similar to Vercel / Linear shell actions. */
  trailing?: React.ReactNode;
}

export interface AppSidebarUser {
  avatarProps?: Partial<AvatarProps>;
  avatar?: React.ReactNode;
  name: string;
  /** Role line (secondary emphasis) */
  role?: string;
  /** @deprecated prefer `role` */
  description?: string;
  /** Entire profile row — menu / account */
  onClick?: () => void;
  profileRowLabel?: string;
}

export interface AppSidebarFooterAction {
  id: string;
  icon: IconSource | React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface AppSidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /**
   * Data-driven sidebar rail with nested groups, collapse, footer identity, and utility actions.
   * Use `DashboardShell` (or legacy `AppShell`) when you also want the right-side top bar/content area to track collapse/expand automatically.
   */
  /** Hierarchical navigation (preferred). Flat `items` is wrapped as a single primary section when omitted. */
  sections?: AppSidebarSection[];
  /** Legacy flat list → single primary section (grouping: spacing). */
  items?: AppSidebarNavItem[];
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  showCollapseToggle?: boolean;
  collapseToggleLabel?: string;
  /** Expanded width — default 320 (governance). */
  widthExpanded?: number;
  /** Collapsed — default 64. */
  widthCollapsed?: number;
  /**
   * Fixed to viewport (`position: fixed`). Default **false** (embedded / flexible layouts).
   * Set **`true`** for dashboard shells; prefer `DashboardShell` to manage the right-side layout.
   */
  fixed?: boolean;
  /**
   * Enables responsive collapse behavior below `collapseBelowWidth`.
   * On mobile widths (below `drawerOverlayBelowWidth`), expanded state becomes a fixed overlay drawer.
   */
  responsive?: boolean;
  /**
   * Max width (px) before “narrow” UX applies — default `1024` (typical tablet / phone).
   * Uses CSS `(max-width: collapseBelowWidth - 1px)`.
   */
  collapseBelowWidth?: number;
  /**
   * Mobile drawer breakpoint. Viewports **strictly below** this width treat expanded sidebar as a fixed overlay drawer.
   * Default **768** (max CSS breakpoint `767px`).
   */
  drawerOverlayBelowWidth?: number;
  /**
   * Advanced/manual layout only.
   * When `fixed`, publishes **`--app-sidebar-offset`** on `document.documentElement` so external layouts can offset main content.
   * If you use `DashboardShell`, you normally do not need to think about this prop.
   */
  publishLayoutOffsetVar?: boolean;
  /** After selecting a nav item on narrow viewports, collapse the rail (drawer) — default true. */
  closeOnNavigateWhenNarrow?: boolean;
  /** Accessible label for the scrim that closes the drawer. */
  backdropCloseLabel?: string;
  /** Prevent page scroll while the narrow expanded drawer is open (only when drawer overlay is shown; requires `fixed`). */
  lockBodyScrollWhenDrawer?: boolean;
  header?: AppSidebarHeader;
  /** Global active leaf id (one `aria-current="page"`). */
  activeItemId?: string | null;
  defaultActiveItemId?: string | null;
  onItemSelect?: (id: string, item: AppSidebarNavItem) => void;
  navLabel?: string;
  user?: AppSidebarUser;
  /** Utility icon actions (right column by default). */
  footerActions?: AppSidebarFooterAction[];
  /** Cap how many utility buttons render (e.g. `1`). */
  maxFooterActions?: number;
  /** `profileFirst` → avatar block left, utility icons right. `utilitiesFirst` flips columns. */
  footerLayout?: AppSidebarFooterLayout;
  /** Replace built-in footer (profile + utilities). You receive full control; keep tokens via `tokens`. */
  footerSlot?: React.ReactNode;
  /** CSS variable overrides for surfaces, text, hovers, active row, borders, and icon tints. */
  tokens?: AppSidebarTokens;
  classNames?: AppSidebarClassNames;
  /**
   * Persist `collapsed` + expanded group ids (localStorage).
   */
  persistenceKey?: string;
  /** Controlled expanded ids for nested groups. */
  expandedIds?: string[] | null;
  defaultExpandedIds?: string[] | null;
  onExpandedChange?: (ids: string[]) => void;
}
