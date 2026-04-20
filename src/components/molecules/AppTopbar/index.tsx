"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import Button from "../../atoms/Button";
import InputSearch from "../../atoms/TextInputSearch";
import Avtar from "../../atoms/Avatar";
import type { AppTopbarAction, AppTopbarProps } from "./AppTopbar.types";
import { mergeTopbarTokensStyle } from "./AppTopbar.chrome";
import { useBelowWidth } from "../AppSidebar/AppSidebar.responsive";
import { AppTopbarMenu } from "./AppTopbarMenu";
import "./AppTopbar.css";

/** Inline icon — avoids `search.svg` nested masks failing as CSS `mask-image` in some engines. */
const TOPBAR_SEARCH_ICON = (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" aria-hidden>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MENU_ICON = (
  <svg viewBox="0 0 20 20" width={20} height={20} fill="none" aria-hidden>
    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function actionAriaLabel(action: AppTopbarAction): string {
  const { label, badgeDot, badgeCount } = action;
  if (badgeDot && (badgeCount == null || badgeCount <= 0)) {
    return `${label}, unread`;
  }
  if (badgeCount != null && badgeCount > 0) {
    return `${label}, ${badgeCount} unread`;
  }
  return label;
}

const AppTopbar: React.FC<AppTopbarProps> = ({
  theme = "light",
  title,
  titleAs = "h1",
  search,
  centerSlot,
  actions,
  profile,
  onMobileMenuClick,
  mobileMenuLabel = "Open menu",
  mobileMenuItems,
  mobileSearchTriggerLabel = "Search",
  leftSlot,
  rightSlot,
  sticky = true,
  zIndex = 50,
  collapseCenterBelowWidth = 1024,
  responsive = true,
  tokens,
  className,
  classNames,
}) => {
  const rootId = useId();
  const baseId = rootId.replace(/[^a-zA-Z0-9_-]/g, "");
  const searchInputId = search?.inputId ?? `app-topbar-search-${baseId}`;
  const menuDomId = useMemo(() => `app-topbar-menu-root-${baseId}`, [baseId]);

  const isNarrow = useBelowWidth(collapseCenterBelowWidth, responsive);
  const hasMenuItems = Boolean(mobileMenuItems && mobileMenuItems.length > 0);
  const showHamburger = isNarrow && (hasMenuItems || Boolean(onMobileMenuClick));

  const hasCenterContent = centerSlot != null || search != null;
  const hideCenterColumn = isNarrow && search != null && centerSlot == null;
  const showCenterCell = hasCenterContent && !hideCenterColumn;

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNarrow) {
      setMobileSearchOpen(false);
      setMenuOpen(false);
    }
  }, [isNarrow]);

  useEffect(() => {
    if (!mobileSearchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (!mobileSearchOpen || !hideCenterColumn) return;
    const id = requestAnimationFrame(() => {
      document.getElementById(searchInputId)?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileSearchOpen, hideCenterColumn, searchInputId]);

  useEffect(() => {
    if (!search) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;

      const focusSearch = () => document.getElementById(searchInputId)?.focus();

      if (hideCenterColumn && !mobileSearchOpen) {
        if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          setMobileSearchOpen(true);
          return;
        }
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setMobileSearchOpen(true);
          return;
        }
        return;
      }

      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        focusSearch();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [search, hideCenterColumn, mobileSearchOpen, searchInputId]);

  const TitleTag = titleAs;

  const rootStyle = mergeTopbarTokensStyle(tokens, {
    ...(sticky ? { zIndex } : {}),
  });

  const searchField = search ? (
    <InputSearch
      id={searchInputId}
      value={search.value ?? ""}
      onChange={search.onChange}
      onSearch={search.onSearch}
      placeholder={search.placeholder ?? "Search..."}
      ariaLabel={search.ariaLabel ?? "Search"}
      disabled={search.disabled}
      size="sm"
      fullWidth
      leftIcon={TOPBAR_SEARCH_ICON}
      leftIconHeight={18}
      leftIconWidth={18}
      leftIconColor="var(--app-topbar-text-muted)"
      showClearButton={search.showClearButton ?? hideCenterColumn}
      containerClassName="text-input-search-wrapper app-topbar__search"
    />
  ) : null;

  const handleHamburgerClick = () => {
    setMobileSearchOpen(false);
    if (hasMenuItems) {
      setMenuOpen((o) => !o);
      return;
    }
    onMobileMenuClick?.();
  };

  return (
    <>
      <header
        className={cls(
          "app-topbar",
          theme === "dark" && "app-topbar--dark",
          sticky && "app-topbar--sticky",
          !showCenterCell && "app-topbar--no-center",
          hideCenterColumn && "app-topbar--narrow-search",
          mobileSearchOpen && hideCenterColumn && "app-topbar--mobile-search-open",
          classNames?.root,
          className
        )}
        style={rootStyle}
      >
        <div className={cls("app-topbar__inner", classNames?.inner)}>
          <div className={cls("app-topbar__left", classNames?.left)}>
            {showHamburger ? (
              <div ref={menuTriggerWrapRef} className="app-topbar__menu">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  icon={MENU_ICON}
                  iconWidth={20}
                  iconHeight={20}
                  ariaLabel={mobileMenuLabel}
                  aria-haspopup={hasMenuItems ? "menu" : undefined}
                  aria-expanded={hasMenuItems ? menuOpen : undefined}
                  aria-controls={hasMenuItems ? menuDomId : undefined}
                  onClick={handleHamburgerClick}
                />
              </div>
            ) : null}
            {leftSlot}
            <div className="app-topbar__context">
              <TitleTag className={cls("app-topbar__title", classNames?.title)}>{title}</TitleTag>
            </div>
          </div>

          {showCenterCell ? (
            <div
              className={cls(
                "app-topbar__center",
                search && !centerSlot && "app-topbar__center--expands",
                classNames?.center
              )}
            >
              {centerSlot ?? searchField}
            </div>
          ) : null}

          <div className={cls("app-topbar__right", classNames?.right)}>
            {hideCenterColumn && search ? (
              <Button
                type="button"
                variant="ghost"
                size="md"
                icon={TOPBAR_SEARCH_ICON}
                iconWidth={20}
                iconHeight={20}
                ariaLabel={mobileSearchTriggerLabel}
                aria-expanded={mobileSearchOpen}
                aria-controls={mobileSearchOpen ? `${searchInputId}-panel` : undefined}
                onClick={() => setMobileSearchOpen((s) => !s)}
              />
            ) : null}
            {actions?.map((action) => {
              const variant = action.variant ?? "ghost";
              const showDot = action.badgeDot;
              const count = action.badgeCount;
              const hasBadge = showDot || (count != null && count > 0);
              const showCountChip = hasBadge && !showDot && count != null && count > 0;

              return (
                <span key={action.id} className="app-topbar__action-wrap">
                  <Button
                    type="button"
                    variant={variant}
                    size="md"
                    icon={action.icon}
                    iconWidth={20}
                    iconHeight={20}
                    ariaLabel={actionAriaLabel(action)}
                    disabled={action.disabled}
                    href={action.href}
                    onClick={action.onClick}
                  />
                  {hasBadge ? (
                    <span
                      className={cls("app-topbar__badge", showCountChip && "app-topbar__badge--count")}
                      aria-hidden
                    >
                      {showCountChip ? (count! > 99 ? "99+" : count) : null}
                    </span>
                  ) : null}
                </span>
              );
            })}
            {profile ? (
              profile.onClick ? (
                <button
                  type="button"
                  className="app-topbar__profile"
                  aria-label={
                    profile.menuLabel ?? (profile.name ? `Account menu for ${profile.name}` : "Account menu")
                  }
                  onClick={profile.onClick}
                >
                  {profile.avatar ?? (
                    <Avtar size={32} shape="circle" name={profile.name ?? "User"} {...profile.avatarProps} />
                  )}
                </button>
              ) : (
                <span
                  className="app-topbar__profile app-topbar__profile--static"
                  aria-label={profile.menuLabel ?? profile.name ?? "Profile"}
                >
                  {profile.avatar ?? (
                    <Avtar size={32} shape="circle" name={profile.name ?? "User"} {...profile.avatarProps} />
                  )}
                </span>
              )
            ) : null}
            {rightSlot}
          </div>
        </div>

        {hideCenterColumn && mobileSearchOpen && search ? (
          <div id={`${searchInputId}-panel`} className="app-topbar__mobile-search">
            {searchField}
          </div>
        ) : null}
      </header>

      {hasMenuItems ? (
        <AppTopbarMenu
          id={menuDomId}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          triggerRef={menuTriggerWrapRef}
          items={mobileMenuItems!}
          theme={theme}
        />
      ) : null}
    </>
  );
};

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
