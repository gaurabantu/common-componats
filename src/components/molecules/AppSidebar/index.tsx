"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "../../atoms/Icon";
import type { IconSource } from "../../atoms/Icon";
import Avtar from "../../atoms/Avatar";
import type { AppSidebarProps, AppSidebarNavItem, AppSidebarSection } from "./AppSidebar.types";
import { mergeSidebarTokensStyle } from "./AppSidebar.chrome";
import { cls, renderTrailingIcon } from "./AppSidebar.utils";
import {
  normalizeSections,
  findParentIdsForActiveItem,
  getInitialExpandedSet,
} from "./AppSidebar.tree";
import AppSidebarTooltipHost from "./AppSidebarTooltipHost";
import { readAppSidebarPersist, writeAppSidebarPersist } from "./AppSidebar.persist";
import { useBelowWidth } from "./AppSidebar.responsive";
import "./AppSidebar.css";

const NAV_ICON = 24;
const TRAIL_ICON = 24;
const FOOTER_ACTION_ICON = 18;

const chevronRailLeft = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

const chevronRailRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const chevronNested = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

function renderItemIcon(icon: IconSource | React.ReactNode | undefined): React.ReactNode {
  if (icon == null) return null;
  if (React.isValidElement(icon)) {
    return <span className="app-sidebar__item-icon">{icon}</span>;
  }
  return (
    <span className="app-sidebar__item-icon">
      <Icon src={icon as IconSource} decorative width={NAV_ICON} height={NAV_ICON} color="currentColor" />
    </span>
  );
}

export default function AppSidebar({
  sections: sectionsProp,
  items: itemsProp,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  showCollapseToggle = true,
  collapseToggleLabel = "Toggle sidebar",
  widthExpanded = 320,
  widthCollapsed = 64,
  fixed = false,
  responsive = true,
  collapseBelowWidth = 1024,
  drawerOverlayBelowWidth = 768,
  publishLayoutOffsetVar = true,
  closeOnNavigateWhenNarrow = true,
  backdropCloseLabel = "Close navigation",
  lockBodyScrollWhenDrawer = true,
  header,
  activeItemId: activeItemIdProp,
  defaultActiveItemId = null,
  onItemSelect,
  navLabel = "Main navigation",
  user,
  footerActions,
  maxFooterActions,
  footerLayout = "profileFirst",
  footerSlot,
  tokens,
  classNames,
  persistenceKey,
  expandedIds: expandedIdsProp,
  defaultExpandedIds,
  onExpandedChange,
  className,
  style,
  ...rest
}: AppSidebarProps) {
  const baseId = useId().replace(/:/g, "");
  const panelId = `app-sidebar-panel-${baseId}`;
  const navRef = useRef<HTMLElement>(null);
  const drawerFocusSentinel = useRef(false);
  const prevNarrowRef = useRef<boolean | null>(null);

  const isNarrow = useBelowWidth(collapseBelowWidth, responsive);
  const isMobileDrawerViewport = useBelowWidth(drawerOverlayBelowWidth, responsive);

  const sections = useMemo(
    () => normalizeSections(sectionsProp, itemsProp),
    [sectionsProp, itemsProp]
  );

  const visibleFooterActions = useMemo(() => {
    if (!footerActions?.length) return [];
    if (maxFooterActions == null) return footerActions;
    return footerActions.slice(0, Math.max(0, maxFooterActions));
  }, [footerActions, maxFooterActions]);

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(() => {
    const pr = readAppSidebarPersist(persistenceKey);
    if (pr?.collapsed !== undefined) return pr.collapsed;
    return defaultCollapsed;
  });

  const collapsed = collapsedProp !== undefined ? collapsedProp : uncontrolledCollapsed;
  /** Mobile: fixed overlay when expanded. */
  const showDrawerOverlay = Boolean(
    fixed && responsive && isNarrow && !collapsed && isMobileDrawerViewport
  );
  /**
   * When `fixed` is true, always use viewport-fixed sidebar (`position: fixed`) for every width.
   * The old “tablet in-flow rail” (768–1023px) used `position: relative` + `--app-sidebar-offset: 0`,
   * which broke `DashboardShell`: the main column (top bar + content) sat under/wrapped oddly vs the rail.
   * Desktop, tablet, and mobile now share the same fixed-rail model; offset + margin handle the main column.
   */
  const useViewportFixedChrome = Boolean(fixed);

  const sidebarWidthPx = collapsed ? widthCollapsed : widthExpanded;

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (!publishLayoutOffsetVar) {
      root.style.removeProperty("--app-sidebar-offset");
      return;
    }
    let offsetPx = 0;
    if (fixed) {
      if (!isNarrow) {
        offsetPx = sidebarWidthPx;
      } else if (isMobileDrawerViewport) {
        offsetPx = collapsed ? widthCollapsed : 0;
      } else {
        /** Tablet (768–1023px): fixed rail — same offset idea as desktop so `DashboardShell` main column clears the rail. */
        offsetPx = sidebarWidthPx;
      }
    }
    root.style.setProperty("--app-sidebar-offset", `${offsetPx}px`);
    return () => {
      root.style.removeProperty("--app-sidebar-offset");
    };
  }, [
    publishLayoutOffsetVar,
    fixed,
    isNarrow,
    isMobileDrawerViewport,
    collapsed,
    sidebarWidthPx,
    widthCollapsed,
  ]);

  useLayoutEffect(() => {
    if (!responsive || collapsedProp !== undefined) return;

    if (prevNarrowRef.current === null) {
      prevNarrowRef.current = isNarrow;
      if (isNarrow) {
        const pr = readAppSidebarPersist(persistenceKey);
        if (pr?.collapsed === undefined) setUncontrolledCollapsed(true);
      }
      return;
    }

    if (isNarrow && !prevNarrowRef.current) {
      setUncontrolledCollapsed(true);
    }
    prevNarrowRef.current = isNarrow;
  }, [isNarrow, responsive, collapsedProp, persistenceKey]);

  const [uncontrolledActive, setUncontrolledActive] = useState<string | null>(defaultActiveItemId);
  const activeItemId = activeItemIdProp !== undefined ? activeItemIdProp : uncontrolledActive;

  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(() => {
    const s = new Set(getInitialExpandedSet(sections));
    defaultExpandedIds?.forEach((id) => s.add(id));
    readAppSidebarPersist(persistenceKey)?.expanded?.forEach((id) => s.add(id));
    return s;
  });

  const expandedSet = useMemo(() => {
    if (expandedIdsProp != null) return new Set(expandedIdsProp);
    return internalExpanded;
  }, [expandedIdsProp, internalExpanded]);

  useEffect(() => {
    if (!activeItemId) return;
    const parents = findParentIdsForActiveItem(sections, activeItemId);
    if (parents.length === 0) return;

    if (expandedIdsProp != null) {
      const next = new Set(expandedIdsProp);
      let changed = false;
      parents.forEach((id) => {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      });
      if (changed) onExpandedChange?.([...next]);
      return;
    }

    setInternalExpanded((prev) => {
      const n = new Set(prev);
      let changed = false;
      parents.forEach((id) => {
        if (!n.has(id)) {
          n.add(id);
          changed = true;
        }
      });
      return changed ? n : prev;
    });
  }, [activeItemId, sections, expandedIdsProp, onExpandedChange]);

  useEffect(() => {
    if (!persistenceKey) return;
    if (typeof window === "undefined") return;
    const coll = collapsedProp !== undefined ? collapsedProp : uncontrolledCollapsed;
    const ex = expandedIdsProp ?? [...internalExpanded];
    writeAppSidebarPersist(persistenceKey, coll, ex);
  }, [
    persistenceKey,
    collapsedProp,
    uncontrolledCollapsed,
    expandedIdsProp,
    internalExpanded,
  ]);

  const setCollapsed = useCallback(
    (next: boolean) => {
      if (collapsedProp === undefined) setUncontrolledCollapsed(next);
      onCollapsedChange?.(next);
    },
    [collapsedProp, onCollapsedChange]
  );

  useEffect(() => {
    if (!showDrawerOverlay || !lockBodyScrollWhenDrawer || typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showDrawerOverlay, lockBodyScrollWhenDrawer]);

  useEffect(() => {
    if (!showDrawerOverlay || typeof document === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setCollapsed(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showDrawerOverlay, setCollapsed]);

  useLayoutEffect(() => {
    if (!showDrawerOverlay) {
      drawerFocusSentinel.current = false;
      return;
    }
    if (drawerFocusSentinel.current) return;
    drawerFocusSentinel.current = true;
    const id = window.requestAnimationFrame(() => {
      const panel = navRef.current?.closest(".app-sidebar");
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>(
        "a.app-sidebar__link, button.app-sidebar__link, button.app-sidebar__parent, button.app-sidebar__create"
      );
      first?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [showDrawerOverlay]);

  const toggleExpand = useCallback(
    (id: string) => {
      if (expandedIdsProp != null) {
        const n = new Set(expandedIdsProp);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        onExpandedChange?.([...n]);
        return;
      }
      setInternalExpanded((prev) => {
        const n = new Set(prev);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        return n;
      });
    },
    [expandedIdsProp, onExpandedChange]
  );

  const handleSelect = useCallback(
    (item: AppSidebarNavItem) => {
      if (item.disabled) return;
      if (activeItemIdProp === undefined) setUncontrolledActive(item.id);
      onItemSelect?.(item.id, item);
      item.onClick?.(item.id, item);
      if (closeOnNavigateWhenNarrow && showDrawerOverlay) {
        setCollapsed(true);
      }
    },
    [activeItemIdProp, onItemSelect, closeOnNavigateWhenNarrow, showDrawerOverlay, setCollapsed]
  );

  const width = sidebarWidthPx;

  const renderLeaf = (
    item: AppSidebarNavItem,
    level: number,
    opts: { nested?: boolean }
  ): React.ReactNode => {
    const isActive = activeItemId === item.id;
    const trailing = renderTrailingIcon(item.trailing, TRAIL_ICON);
    const inactiveCls = cls(
      "app-sidebar__link",
      opts.nested && "app-sidebar__link--nested",
      isActive && "app-sidebar__link--active"
    );
    const inner = (
      <>
        {renderItemIcon(item.icon)}
        <span className="app-sidebar__item-label">{item.label}</span>
        {trailing ? (
          <span
            className="app-sidebar__trailing-wrap"
            {...(item.trailingLabel
              ? { role: "img" as const, "aria-label": item.trailingLabel }
              : { "aria-hidden": true as const })}
          >
            {trailing}
          </span>
        ) : null}
      </>
    );

    const control =
      item.href && !item.disabled ? (
        <a
          href={item.href}
          className={inactiveCls}
          aria-current={isActive ? "page" : undefined}
          onClick={(e) => {
            if (item.disabled) {
              e.preventDefault();
              return;
            }
            handleSelect(item);
          }}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          className={inactiveCls}
          disabled={item.disabled}
          aria-current={isActive ? "page" : undefined}
          onClick={() => handleSelect(item)}
        >
          {inner}
        </button>
      );

    return (
      <AppSidebarTooltipHost collapsed={collapsed} label={item.label}>
        {control as React.ReactElement}
      </AppSidebarTooltipHost>
    );
  };

  const renderBranch = (item: AppSidebarNavItem, level: number): React.ReactNode => {
    const hasChildren = !!(item.children && item.children.length > 0);
    const submenuId = `sb-${baseId}-sub-${item.id}`;
    const isOpen = expandedSet.has(item.id);
    const isActive = activeItemId === item.id;

    if (!hasChildren) {
      return renderLeaf(item, level, { nested: level > 0 });
    }

    const trailing = renderTrailingIcon(item.trailing, TRAIL_ICON);
    const parentInner = (
      <>
        {renderItemIcon(item.icon)}
        <span className="app-sidebar__item-label">{item.label}</span>
        <span
          className={cls("app-sidebar__chevron", isOpen && "app-sidebar__chevron--open")}
          aria-hidden
        >
          {chevronNested}
        </span>
        {trailing ? (
          <span
            className="app-sidebar__trailing-wrap"
            {...(item.trailingLabel
              ? { role: "img" as const, "aria-label": item.trailingLabel }
              : { "aria-hidden": true as const })}
          >
            {trailing}
          </span>
        ) : null}
      </>
    );

    const parentBtn = (
      <button
        type="button"
        className={cls(
          "app-sidebar__parent",
          level > 0 && "app-sidebar__link--nested",
          isActive && "app-sidebar__parent--active"
        )}
        aria-expanded={isOpen}
        aria-controls={submenuId}
        disabled={item.disabled}
        onClick={() => {
          if (item.disabled) return;
          toggleExpand(item.id);
        }}
      >
        {parentInner}
      </button>
    );

    return (
      <>
        <AppSidebarTooltipHost collapsed={collapsed} label={item.label}>
          {parentBtn as React.ReactElement}
        </AppSidebarTooltipHost>
        {isOpen && !collapsed ? (
          <ul id={submenuId} className="app-sidebar__list app-sidebar__list--nested" role="list">
            {item.children!.map((child) => (
              <li key={child.id} className="app-sidebar__item">
                {!child.children?.length
                  ? renderLeaf(child, level + 1, { nested: true })
                  : renderBranch(child, level + 1)}
              </li>
            ))}
            {item.createAction ? (
              <li className="app-sidebar__item">
                <button
                  type="button"
                  className="app-sidebar__create"
                  onClick={item.createAction.onClick}
                >
                  {item.createAction.icon ? (
                    <span className="app-sidebar__item-icon">
                      {React.isValidElement(item.createAction.icon) ? (
                        item.createAction.icon
                      ) : (
                        <Icon
                          src={item.createAction.icon as IconSource}
                          decorative
                          width={20}
                          height={20}
                          color="currentColor"
                        />
                      )}
                    </span>
                  ) : (
                    <span aria-hidden className="app-sidebar__item-label" style={{ flex: "none", width: 24 }}>
                      +
                    </span>
                  )}
                  <span>{item.createAction.label}</span>
                </button>
              </li>
            ) : null}
          </ul>
        ) : null}
      </>
    );
  };

  const renderSection = (section: AppSidebarSection, idx: number) => (
    <div key={section.id} className="app-sidebar__section" data-tier={section.tier} data-grouping={section.grouping}>
      {idx > 0 && section.grouping === "divider" ? (
        <div role="separator" className="app-sidebar__section-divider" />
      ) : null}
      {section.grouping === "label" && section.label ? (
        <div className="app-sidebar__section-label">{section.label}</div>
      ) : null}
      <ul className="app-sidebar__list" role="list">
        {section.items.map((item) => (
          <li key={item.id} className="app-sidebar__item">
            {!item.children?.length ? renderLeaf(item, 0, {}) : renderBranch(item, 0)}
          </li>
        ))}
      </ul>
    </div>
  );

  const roleLine = user?.role ?? user?.description;
  const profileTip =
    user && collapsed ? [user.name, roleLine].filter(Boolean).join(" · ") : "";

  let profileWrapped: React.ReactNode = null;
  if (user) {
    const body = (
      <>
        <div className="app-sidebar__profile-avatar">
          {user.avatar ? (
            user.avatar
          ) : (
            <Avtar size={34} shape="circle" name={user.name} {...user.avatarProps} />
          )}
        </div>
        <div className="app-sidebar__profile-text">
          <p className="app-sidebar__profile-name">{user.name}</p>
          {roleLine ? <p className="app-sidebar__profile-role">{roleLine}</p> : null}
        </div>
        <span className="app-sidebar__profile-arrow" aria-hidden>
          {chevronNested}
        </span>
      </>
    );

    const control = user.onClick ? (
      <button
        type="button"
        className="app-sidebar__profile"
        onClick={user.onClick}
        aria-label={user.profileRowLabel ?? `${user.name}, open account menu`}
      >
        {body}
      </button>
    ) : (
      <div
        className="app-sidebar__profile app-sidebar__profile--static"
        role="group"
        aria-label={user.profileRowLabel ?? user.name}
      >
        {body}
      </div>
    );

    profileWrapped =
      collapsed && profileTip ? (
        <AppSidebarTooltipHost collapsed label={profileTip}>
          {control as React.ReactElement}
        </AppSidebarTooltipHost>
      ) : (
        control
      );
  }

  const rootStyle = mergeSidebarTokensStyle(tokens, {
    width,
    minWidth: width,
    maxWidth: width,
    ...style,
  });

  const backdrop =
    showDrawerOverlay && typeof document !== "undefined"
      ? createPortal(
          <button
            type="button"
            className="app-sidebar__backdrop"
            aria-label={backdropCloseLabel}
            onClick={() => setCollapsed(true)}
          />,
          document.body
        )
      : null;

  return (
    <>
      {backdrop}
      <aside
        {...rest}
        id={panelId}
        className={cls(
          "app-sidebar",
          useViewportFixedChrome && "app-sidebar--fixed",
          collapsed && "app-sidebar--collapsed",
          responsive && isNarrow && "app-sidebar--narrow",
          showDrawerOverlay && "app-sidebar--drawer-open",
          classNames?.root,
          className
        )}
        style={rootStyle}
      >
      {header ? (
        <div className={cls("app-sidebar__header", classNames?.header)}>
          {showCollapseToggle ? (
            <button
              type="button"
              className="app-sidebar__collapse"
              aria-label={collapseToggleLabel}
              aria-expanded={!collapsed}
              aria-controls={isNarrow ? panelId : undefined}
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon src={collapsed ? chevronRailRight : chevronRailLeft} decorative width={22} height={22} />
            </button>
          ) : null}
          <div className="app-sidebar__header-body">
            <div className="app-sidebar__header-main">
              {header.icon ? <div className="app-sidebar__header-icon">{header.icon}</div> : null}
              <div className="app-sidebar__header-text">
                <p className="app-sidebar__title">{header.title}</p>
                {header.subtitle ? <p className="app-sidebar__subtitle">{header.subtitle}</p> : null}
              </div>
            </div>
            {header.trailing ? (
              <div className={cls("app-sidebar__header-trailing", classNames?.headerTrailing)}>
                {header.trailing}
              </div>
            ) : null}
          </div>
        </div>
      ) : showCollapseToggle ? (
        <div className={cls("app-sidebar__header", classNames?.header)}>
          <button
            type="button"
            className="app-sidebar__collapse"
            aria-label={collapseToggleLabel}
            aria-expanded={!collapsed}
            aria-controls={isNarrow ? panelId : undefined}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon src={collapsed ? chevronRailRight : chevronRailLeft} decorative width={22} height={22} />
          </button>
        </div>
      ) : null}

      <nav
        ref={navRef}
        className={cls("app-sidebar__nav", classNames?.nav)}
        aria-label={navLabel}
      >
        {sections.map((s, i) => renderSection(s, i))}
      </nav>

      {footerSlot ? (
        <div className={cls("app-sidebar__footer", classNames?.footer)}>{footerSlot}</div>
      ) : (user || visibleFooterActions.length > 0) ? (
        <div className={cls("app-sidebar__footer", classNames?.footer)}>
          <div
            className={cls(
              "app-sidebar__footer-row",
              footerLayout === "utilitiesFirst" && "app-sidebar__footer-row--utilities-first",
              classNames?.footerRow
            )}
          >
            {profileWrapped ? (
              <div className={cls("app-sidebar__footer-profile", classNames?.footerProfile)}>
                {profileWrapped}
              </div>
            ) : null}
            {visibleFooterActions.length > 0 ? (
              <div
                className={cls("app-sidebar__footer-utilities", classNames?.footerUtilities)}
                role="group"
                aria-label="Utility actions"
              >
                {visibleFooterActions.map((action) => {
                  const iconNode = React.isValidElement(action.icon) ? (
                    action.icon
                  ) : (
                    <Icon
                      src={action.icon as IconSource}
                      decorative
                      width={FOOTER_ACTION_ICON}
                      height={FOOTER_ACTION_ICON}
                      color="currentColor"
                    />
                  );
                  const node = action.href ? (
                    <a
                      href={action.href}
                      className="app-sidebar__action"
                      aria-label={action.label}
                      onClick={action.onClick}
                    >
                      {iconNode}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="app-sidebar__action"
                      aria-label={action.label}
                      onClick={action.onClick}
                    >
                      {iconNode}
                    </button>
                  );
                  return (
                    <AppSidebarTooltipHost key={action.id} collapsed={collapsed} label={action.label}>
                      {node as React.ReactElement}
                    </AppSidebarTooltipHost>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </aside>
    </>
  );
}
