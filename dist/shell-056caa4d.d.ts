import * as react_jsx_runtime from 'react/jsx-runtime';
import React__default from 'react';
import { I as IconSource } from './index-8a491a10.js';

interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    initials?: string;
    icon?: string | React.ReactNode;
    fallback?: React.ReactNode;
    size?: number;
    shape?: "circle" | "rounded" | "square";
    rounded?: "0" | "1" | "2" | "3" | "4" | "5";
    status?: "online" | "offline" | "busy" | "away" | "none";
    statusColor?: string;
    statusPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    color?: string;
    backgroundColor?: string;
    textColor?: string;
    iconColor?: string;
    iconSize?: number;
    preserveColors?: boolean;
    bordered?: boolean;
    borderColor?: string;
    className?: string;
    style?: React.CSSProperties;
}

type AppSidebarTier = "primary" | "secondary" | "tertiary";
/** One grouping method per section (UX Governance). */
type AppSidebarSectionGrouping = "label" | "spacing" | "divider";
type AppSidebarTrailingPreset = "lock" | "check" | "none";
interface AppSidebarNavItem {
    id: string;
    label: string;
    icon?: IconSource | React__default.ReactNode;
    disabled?: boolean;
    trailing?: AppSidebarTrailingPreset | IconSource | React__default.ReactNode;
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
        icon?: IconSource | React__default.ReactNode;
    };
}
interface AppSidebarSection {
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
type AppSidebarTokens = Partial<{
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
type AppSidebarClassNames = Partial<{
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
type AppSidebarFooterLayout = "profileFirst" | "utilitiesFirst";
interface AppSidebarHeader {
    icon?: React__default.ReactNode;
    title: string;
    subtitle?: string;
    /** End of header row (e.g. theme, notifications) — similar to Vercel / Linear shell actions. */
    trailing?: React__default.ReactNode;
}
interface AppSidebarUser {
    avatarProps?: Partial<AvatarProps>;
    avatar?: React__default.ReactNode;
    name: string;
    /** Role line (secondary emphasis) */
    role?: string;
    /** @deprecated prefer `role` */
    description?: string;
    /** Entire profile row — menu / account */
    onClick?: () => void;
    profileRowLabel?: string;
}
interface AppSidebarFooterAction {
    id: string;
    icon: IconSource | React__default.ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
}
interface AppSidebarProps extends Omit<React__default.HTMLAttributes<HTMLElement>, "children"> {
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
    footerSlot?: React__default.ReactNode;
    /**
     * Optional CSS-variable overrides on the sidebar root — use only when a host cannot express
     * chrome via `tokens.css` + `data-theme` on `<html>`. Themes like `dark`, `mist`, `*-mist` define
     * `--app-sidebar-*` there so dashboard shells track the document theme automatically.
     */
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

declare function AppSidebar({ sections: sectionsProp, items: itemsProp, collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, showCollapseToggle, collapseToggleLabel, widthExpanded, widthCollapsed, fixed, responsive, collapseBelowWidth, drawerOverlayBelowWidth, publishLayoutOffsetVar, closeOnNavigateWhenNarrow, backdropCloseLabel, lockBodyScrollWhenDrawer, header, activeItemId: activeItemIdProp, defaultActiveItemId, onItemSelect, navLabel, user, footerActions, maxFooterActions, footerLayout, footerSlot, tokens, classNames, persistenceKey, expandedIds: expandedIdsProp, defaultExpandedIds, onExpandedChange, className, style, ...rest }: AppSidebarProps): react_jsx_runtime.JSX.Element;

type DashboardShellProps = {
    /**
     * Props for `AppSidebar`. **`fixed`** here means the **sidebar rail** is viewport-fixed (left), not
     * that the main column or `AppTopbar` are CSS-fixed. When `fixed`, the main column uses
     * **`margin-inline-start: var(--app-sidebar-offset)`** from `AppSidebar` — do not hard-code rail width.
     */
    sidebar: Omit<AppSidebarProps, "fixed"> & {
        fixed?: boolean;
    };
    /**
     * Top of the main column (commonly `<AppTopbar />`). Pinned **above** the scrolling `children`
     * region — it does not scroll with `children`.
     */
    topbar?: React__default.ReactNode;
    /** Main page body: **only this** scrolls vertically inside the shell. */
    children: React__default.ReactNode;
    className?: string;
    insetClassName?: string;
    insetStyle?: React__default.CSSProperties;
    /** Wrapper around `topbar` (defaults to zero margin/padding). */
    topbarClassName?: string;
    topbarStyle?: React__default.CSSProperties;
    /** Main content section under the top bar (scrolls independently; defaults include overflow-y auto). */
    contentClassName?: string;
    contentStyle?: React__default.CSSProperties;
    /**
     * When `true` (default), `<AppTopbar />` gets **`sticky={false}`** to avoid `position: sticky`
     * conflicting with iframe/nested scrollers. The bar stays at the top via **flex layout**, not via
     * `sticky`. Set `false` only if you must set `AppTopbar`’s `sticky` yourself.
     */
    pinTopbar?: boolean;
};
/**
 * Dashboard shell: viewport-fixed **sidebar rail** + main column with **`margin-inline-start`**
 * from `--app-sidebar-offset`. **Top bar** above, **scrollable `children`** below — main content is
 * never locked; only the left rail uses `fixed` (when `sidebar.fixed` is true).
 */
declare function DashboardShell({ sidebar, topbar, children, className, insetClassName, insetStyle, topbarClassName, topbarStyle, contentClassName, contentStyle, pinTopbar, }: DashboardShellProps): react_jsx_runtime.JSX.Element;

/** @deprecated Use `DashboardShell` — same component, clearer name for dashboard layouts. */
declare const AppShell: typeof DashboardShell;
type AppShellProps = DashboardShellProps;

type AppTopbarTheme = "dark" | "light";
interface AppTopbarSearchConfig {
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
    ariaLabel?: string;
    /** Matches `TextInputSearch` / `Select` tiers (default `sm` keeps top bar dense). */
    size?: "sm" | "md" | "lg";
    inputId?: string;
    disabled?: boolean;
    /** Passes through to `InputSearch` (useful when the field is expanded on mobile). */
    showClearButton?: boolean;
}
/** Items for the narrow-layout hamburger menu (popover). */
interface AppTopbarMenuItem {
    id: string;
    label: string;
    icon?: IconSource;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
    destructive?: boolean;
}
interface AppTopbarAction {
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
interface AppTopbarProfile {
    avatar?: React__default.ReactNode;
    avatarProps?: Partial<AvatarProps>;
    name?: string;
    onClick?: () => void;
    menuLabel?: string;
}
interface AppTopbarTokens {
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
interface AppTopbarClassNames {
    root?: string;
    inner?: string;
    left?: string;
    center?: string;
    right?: string;
    title?: string;
}
interface AppTopbarProps {
    /**
     * Explicit bar chroming. Default `"light"` does **not** add forced Noir — topbar/read surfaces use
     * `--app-shell-topbar-*` from `tokens.css` on `<html>` (set via `data-theme`), so omit this prop
     * in most apps. Use `"dark"` only for a legacy Noir bar independent of document theme (overrides
     * semantic shell tokens locally on the header).
     */
    theme?: AppTopbarTheme;
    title: string;
    titleAs?: "h1" | "h2";
    search?: AppTopbarSearchConfig;
    /** Replaces the default search region (e.g. command bar). */
    centerSlot?: React__default.ReactNode;
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
    leftSlot?: React__default.ReactNode;
    rightSlot?: React__default.ReactNode;
    sticky?: boolean;
    zIndex?: number;
    /** Viewport width below which center search/slot is hidden and mobile menu may show. */
    collapseCenterBelowWidth?: number;
    /** Enables `useBelowWidth` listeners; set false for SSR-only snapshots. */
    responsive?: boolean;
    /** Inline CSS vars on the header — optional; prefer `tokens.css` `--app-shell-topbar-*` from `data-theme`. */
    tokens?: AppTopbarTokens;
    className?: string;
    classNames?: AppTopbarClassNames;
}

declare const AppTopbar: React__default.FC<AppTopbarProps>;

/**
 * Merge design tokens into `style` for the sidebar root (CSS variables).
 * Keeps layout “practical”: one object overrides global Noir without forking CSS.
 */
declare function mergeSidebarTokensStyle(tokens: AppSidebarTokens | undefined, base?: React__default.CSSProperties): React__default.CSSProperties;

/**
 * Sidebar persistence — shared by AppSidebar and DashboardShell for aligned init state.
 */
type AppSidebarPersistPayload = {
    collapsed?: boolean;
    expanded?: string[];
};
declare function readAppSidebarPersist(key: string | undefined): AppSidebarPersistPayload | null;
declare function writeAppSidebarPersist(key: string, collapsed: boolean, expanded: string[]): void;

declare function mergeTopbarTokensStyle(tokens: AppTopbarTokens | undefined, base?: React__default.CSSProperties): React__default.CSSProperties;

export { AvatarProps as A, readAppSidebarPersist as B, writeAppSidebarPersist as C, DashboardShell as D, AppSidebarPersistPayload as E, mergeTopbarTokensStyle as F, AppSidebar as a, AppShell as b, AppTopbar as c, DashboardShellProps as d, AppShellProps as e, AppSidebarProps as f, AppSidebarNavItem as g, AppSidebarSection as h, AppSidebarTier as i, AppSidebarSectionGrouping as j, AppSidebarHeader as k, AppSidebarUser as l, AppSidebarFooterAction as m, AppSidebarTrailingPreset as n, AppSidebarTokens as o, AppSidebarClassNames as p, AppSidebarFooterLayout as q, AppTopbarProps as r, AppTopbarTheme as s, AppTopbarSearchConfig as t, AppTopbarAction as u, AppTopbarProfile as v, AppTopbarTokens as w, AppTopbarClassNames as x, AppTopbarMenuItem as y, mergeSidebarTokensStyle as z };
