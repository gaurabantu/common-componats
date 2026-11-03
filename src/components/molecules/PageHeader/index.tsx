"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../Popover";
import { isSafeHref } from "../List";
import {
  PAGE_HEADER_COMPACT_QUERY,
  PAGE_HEADER_DEFAULTS,
  PAGE_HEADER_MORE_TRIGGER_CLASS,
  PAGE_HEADER_SECONDARY_BUTTON,
} from "./PageHeader.config";
import type { PageHeaderAction, PageHeaderProps } from "./PageHeader.types";
import "./PageHeader.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Local matchMedia subscription (no ui-common-hooks dependency). SSR / no-matchMedia → `false`.
 * `onBeforeChange(next)` runs synchronously before the state update, while the DOM (and focus)
 * still reflect the previous layout.
 */
function useMatchMedia(query: string, onBeforeChange?: (next: boolean) => void): boolean {
  const beforeRef = useRef(onBeforeChange);
  beforeRef.current = onBeforeChange;
  const get = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(query);
    const onChange = () => {
      beforeRef.current?.(mql.matches);
      setMatches(mql.matches);
    };
    setMatches(get());
    if (typeof mql.addEventListener === "function") mql.addEventListener("change", onChange);
    else mql.addListener?.(onChange);
    return () => {
      if (typeof mql.removeEventListener === "function") mql.removeEventListener("change", onChange);
      else mql.removeListener?.(onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return matches;
}

function safeHref(href: string | undefined): string | undefined {
  return href && isSafeHref(href) ? href : undefined;
}

const MoreIcon = (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
    <circle cx="3.5" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="12.5" cy="8" r="1.4" fill="currentColor" />
  </svg>
);

/**
 * PageHeader — Zone 3 of the 5-zone layout: breadcrumb · title (+ status) · description · meta ·
 * actions (secondaries + exactly one primary) · tabs.
 * Secondary actions beyond `maxVisibleActions` overflow into a "More actions" menu; at ≤ 640px all do.
 */
export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  {
    title,
    titleAs = PAGE_HEADER_DEFAULTS.titleAs,
    description,
    breadcrumb,
    status,
    meta,
    primaryAction,
    secondaryActions,
    maxVisibleActions = PAGE_HEADER_DEFAULTS.maxVisibleActions,
    moreActionsLabel = PAGE_HEADER_DEFAULTS.moreActionsLabel,
    tabs,
    className,
    ...rest
  },
  ref,
) {
  const actionsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  /** Focus hand-off across the 640px crossover (WCAG 2.4.3): which side should receive focus after the re-layout. */
  const pendingFocus = useRef<"more" | "inline" | null>(null);

  const compact = useMatchMedia(PAGE_HEADER_COMPACT_QUERY, (next) => {
    if (typeof document === "undefined") return;
    const active = document.activeElement as HTMLElement | null;
    if (!active || !actionsRef.current?.contains(active)) return;
    if (next && active.closest(".ds-page-header__secondary")) pendingFocus.current = "more";
    else if (!next && active === moreRef.current) pendingFocus.current = "inline";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const pending = pendingFocus.current;
    pendingFocus.current = null;
    if (!pending) return;
    if (pending === "more") {
      // The focused inline secondary just unmounted — its action now lives in the menu.
      moreRef.current?.focus();
      return;
    }
    // Expanding: if the trigger survived (actions still overflow) keep focus on it — moving focus
    // off a control that still exists would be an unexpected context change. Otherwise focus the
    // first restored inline secondary.
    const trigger = moreRef.current;
    if (trigger && trigger.isConnected && document.activeElement === trigger) return;
    actionsRef.current?.querySelector<HTMLElement>(".ds-page-header__secondary")?.focus();
  }, [compact]);

  const actions = secondaryActions ?? [];
  const inlineCount = compact ? 0 : Math.max(0, Math.floor(maxVisibleActions));
  const inline = actions.slice(0, inlineCount);
  const overflow = actions.slice(inlineCount);
  const hasActions = actions.length > 0 || Boolean(primaryAction);

  const Heading = titleAs;

  const renderInline = (action: PageHeaderAction, index: number) => {
    const href = action.disabled ? undefined : safeHref(action.href);
    const common = {
      variant: PAGE_HEADER_SECONDARY_BUTTON.variant,
      size: PAGE_HEADER_SECONDARY_BUTTON.size,
      icon: action.icon,
      disabled: action.disabled,
      className: "ds-page-header__secondary",
    };
    if (href) {
      return (
        <Button
          key={`${action.label}-${index}`}
          {...common}
          href={href}
          onClick={action.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
        >
          {action.label}
        </Button>
      );
    }
    return (
      <Button
        key={`${action.label}-${index}`}
        {...common}
        type="button"
        onClick={action.onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
      >
        {action.label}
      </Button>
    );
  };

  const renderMenuItem = (action: PageHeaderAction, index: number) => {
    const key = `${action.label}-${index}`;
    const iconNode = action.icon ? (
      <Icon src={action.icon} width={16} height={16} className="ds-dropdown-menu__icon" />
    ) : null;
    const href = action.disabled ? undefined : safeHref(action.href);
    if (href) {
      return (
        <a
          key={key}
          role="menuitem"
          href={href}
          className="ds-dropdown-menu__item ds-page-header__menu-link"
          onClick={(e) => {
            action.onClick?.(e);
            setMenuOpen(false);
          }}
        >
          <span className="ds-dropdown-menu__item-inner">
            {iconNode}
            {action.label}
          </span>
        </a>
      );
    }
    return (
      <DropdownMenuItem
        key={key}
        disabled={action.disabled}
        onClick={(e) => action.onClick?.(e)}
      >
        {iconNode}
        {action.label}
      </DropdownMenuItem>
    );
  };

  return (
    <div
      ref={ref}
      className={cls("ds-page-header", className)}
      data-has-tabs={tabs ? "true" : undefined}
      data-compact={compact ? "true" : undefined}
      {...rest}
    >
      {breadcrumb ? <div className="ds-page-header__breadcrumb">{breadcrumb}</div> : null}
      <div className="ds-page-header__main">
        <div className="ds-page-header__heading">
          <div className="ds-page-header__title-row">
            <Heading className="ds-page-header__title">{title}</Heading>
            {status ? <span className="ds-page-header__status">{status}</span> : null}
          </div>
          {description ? <p className="ds-page-header__description">{description}</p> : null}
          {meta ? <div className="ds-page-header__meta">{meta}</div> : null}
        </div>
        {hasActions ? (
          <div ref={actionsRef} className="ds-page-header__actions">
            {inline.map(renderInline)}
            {overflow.length > 0 ? (
              <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} placement="bottom-end">
                <DropdownMenuTrigger ref={moreRef} className={cls(PAGE_HEADER_MORE_TRIGGER_CLASS, "ds-page-header__more")}>
                  {MoreIcon}
                  <span className="ds-page-header__more-label">{moreActionsLabel}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>{overflow.map(renderMenuItem)}</DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            {primaryAction ? <span className="ds-page-header__primary">{primaryAction}</span> : null}
          </div>
        ) : null}
      </div>
      {tabs ? <div className="ds-page-header__tabs">{tabs}</div> : null}
    </div>
  );
});

PageHeader.displayName = "PageHeader";

export default PageHeader;
export type { PageHeaderProps, PageHeaderAction, PageHeaderTitleAs } from "./PageHeader.types";
