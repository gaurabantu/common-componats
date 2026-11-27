"use client";

import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  BreadcrumbItemProps,
  BreadcrumbProps,
  BreadcrumbRenderLink,
} from "./Breadcrumb.types";
import {
  BREADCRUMB_DEFAULTS,
  BREADCRUMB_NARROW_MAX_ITEMS,
  BREADCRUMB_NARROW_QUERY,
  defaultExpandLabel,
} from "./Breadcrumb.config";
import { getCollapseRange } from "./Breadcrumb.utils";
import { isSafeHref } from "../../../utils/safeHref";
import "./Breadcrumb.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function isDev(): boolean {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env;
  return env?.NODE_ENV !== "production";
}

interface BreadcrumbContextValue {
  /** Custom decorative separator node; `null` when a built-in CSS glyph (or none) is used. */
  separatorNode: React.ReactNode;
  renderLink?: BreadcrumbRenderLink;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

/** Local media-query hook (components must not depend on ui-common-hooks). SSR-safe: starts `false`. */
function useMatchMedia(query: string, enabled: boolean): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (!enabled || typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setMatches(false);
      return;
    }
    const mql = window.matchMedia(query);
    const update = () => setMatches(Boolean(mql.matches));
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    mql.addListener?.(update);
    return () => mql.removeListener?.(update);
  }, [query, enabled]);
  return matches;
}

function SeparatorSlot() {
  const ctx = useContext(BreadcrumbContext);
  if (ctx?.separatorNode === null || ctx?.separatorNode === undefined) return null;
  return (
    <span className="ds-breadcrumb__separator" aria-hidden="true">
      {ctx.separatorNode}
    </span>
  );
}

const BreadcrumbImpl = React.forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  {
    ariaLabel = BREADCRUMB_DEFAULTS.ariaLabel,
    separator = BREADCRUMB_DEFAULTS.separator,
    size = BREADCRUMB_DEFAULTS.size,
    items,
    maxItems,
    itemsBeforeCollapse = BREADCRUMB_DEFAULTS.itemsBeforeCollapse,
    itemsAfterCollapse = BREADCRUMB_DEFAULTS.itemsAfterCollapse,
    responsiveCollapse = BREADCRUMB_DEFAULTS.responsiveCollapse,
    expandLabel = defaultExpandLabel,
    onExpand,
    renderLink,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isBuiltIn = separator === "slash" || separator === "chevron";
  const isNone = separator === null || separator === false;
  const separatorAttr = isBuiltIn ? (separator as string) : isNone ? "none" : "custom";
  const separatorNode = isBuiltIn || isNone ? null : separator;

  const ctx = useMemo<BreadcrumbContextValue>(
    () => ({ separatorNode, renderLink }),
    [separatorNode, renderLink],
  );

  useEffect(() => {
    if (isDev() && items && Children.count(children) > 0) {
      console.warn("[Breadcrumb] Both `items` and `children` were passed — `children` is ignored.");
    }
  }, [items, children]);

  const segments: React.ReactNode[] = useMemo(() => {
    if (items) {
      const anyCurrent = items.some((item) => item.current === true);
      return items.map((item, i) => (
        <BreadcrumbItem
          key={item.key ?? `bc-${i}`}
          href={item.href}
          icon={item.icon}
          current={item.current ?? (!anyCurrent && i === items.length - 1)}
          renderLink={item.renderLink}
          linkProps={item.linkProps}
        >
          {item.label}
        </BreadcrumbItem>
      ));
    }
    return Children.toArray(children);
  }, [items, children]);

  const total = segments.length;
  const narrow = useMatchMedia(BREADCRUMB_NARROW_QUERY, responsiveCollapse);
  // Expansion is remembered per trail length, so navigating to a different-length trail re-collapses.
  const [expandedFor, setExpandedFor] = useState<number | null>(null);
  const expanded = expandedFor === total;

  const range = expanded
    ? getCollapseRange(total, undefined, 0, 0)
    : narrow
      ? getCollapseRange(
          total,
          Math.min(maxItems ?? Number.POSITIVE_INFINITY, BREADCRUMB_NARROW_MAX_ITEMS),
          Math.min(itemsBeforeCollapse, 1),
          Math.min(itemsAfterCollapse, 1),
        )
      : getCollapseRange(total, maxItems, itemsBeforeCollapse, itemsAfterCollapse);

  const listRef = useRef<HTMLOListElement>(null);
  const focusIndexRef = useRef<number | null>(null);

  const handleExpand = useCallback(() => {
    focusIndexRef.current = range.before;
    setExpandedFor(total);
    onExpand?.();
  }, [range.before, total, onExpand]);

  // The "…" button disappears on expand — move focus to the first revealed segment (WCAG 2.4.3).
  useEffect(() => {
    const index = focusIndexRef.current;
    if (index === null || !expanded) return;
    focusIndexRef.current = null;
    const li = listRef.current?.children[index] as HTMLElement | undefined;
    if (!li) return;
    const target = li.querySelector<HTMLElement>("a[href], button, [tabindex]");
    if (target) {
      target.focus();
    } else {
      li.setAttribute("tabindex", "-1");
      li.focus();
    }
  }, [expanded]);

  const visible: React.ReactNode[] = range.collapsed
    ? [
        ...segments.slice(0, range.before),
        <li key="__bc-ellipsis" className="ds-breadcrumb__item ds-breadcrumb__item--ellipsis">
          <button
            type="button"
            className="ds-breadcrumb__ellipsis"
            aria-label={expandLabel(range.hidden)}
            onClick={handleExpand}
          >
            <span aria-hidden="true">…</span>
          </button>
          <SeparatorSlot />
        </li>,
        ...segments.slice(total - range.after),
      ]
    : segments;

  return (
    <BreadcrumbContext.Provider value={ctx}>
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cls("ds-breadcrumb", className)}
        data-separator={separatorAttr}
        data-size={size}
        data-collapsed={range.collapsed ? "true" : undefined}
        {...rest}
      >
        <ol ref={listRef} className="ds-breadcrumb__list">
          {visible}
        </ol>
      </nav>
    </BreadcrumbContext.Provider>
  );
});
BreadcrumbImpl.displayName = "Breadcrumb";

/**
 * Landmark navigation with an ordered list. Pass `items` (data API) or `BreadcrumbItem` children.
 * Long trails collapse into an expandable "…" button (`maxItems`, and automatically ≤ 640px).
 * Built-in separators are decorative CSS glyphs; custom separators render `aria-hidden`.
 */
export const Breadcrumb = React.memo(BreadcrumbImpl);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbItemImpl = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem(
    { href, current, icon, children, className, linkProps, asChild = false, renderLink, ...liRest },
    ref,
  ) {
    const ctx = useContext(BreadcrumbContext);
    const linkRenderer = renderLink ?? ctx?.renderLink;

    const content = icon ? (
      <>
        <span className="ds-breadcrumb__icon" aria-hidden="true">
          {icon}
        </span>
        <span className="ds-breadcrumb__label">{children}</span>
      </>
    ) : (
      children
    );

    // asChild: the single child element (router link) is the anchor.
    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{
        href?: unknown;
        className?: string;
        children?: React.ReactNode;
      }>;
      const isCurrent = current ?? false;
      const childHref = child.props.href;
      const childSafe = typeof childHref !== "string" || isSafeHref(childHref);
      return (
        <li
          ref={ref}
          className={cls("ds-breadcrumb__item", isCurrent && "ds-breadcrumb__item--current", className)}
          {...liRest}
        >
          {childSafe ? (
            cloneElement(child, {
              ...(linkProps as Record<string, unknown>),
              className: cls(
                "ds-breadcrumb__link",
                isCurrent && "ds-breadcrumb__link--current",
                child.props.className,
              ),
              ...(isCurrent ? { "aria-current": "page" } : {}),
            } as Record<string, unknown>)
          ) : (
            <span className="ds-breadcrumb__text ds-breadcrumb__text--plain">{child.props.children}</span>
          )}
          <SeparatorSlot />
        </li>
      );
    }

    const hasHref = typeof href === "string" && href.length > 0;
    const safeHref = hasHref && isSafeHref(href) ? href : undefined;
    if (hasHref && !safeHref && isDev()) {
      console.warn(
        `[BreadcrumbItem] Refused unsafe href ${JSON.stringify(href)} — rendering text instead.`,
      );
    }
    // Original semantics: an item without `href` is the current page unless `current` says otherwise.
    const isCurrent = current ?? !hasHref;

    const renderAnchor = (linkClass: string, ariaCurrent?: "page") => {
      if (linkRenderer && safeHref) {
        return linkRenderer({
          href: safeHref,
          className: linkClass,
          "aria-current": ariaCurrent,
          children: content,
        });
      }
      return (
        <a href={safeHref} className={linkClass} aria-current={ariaCurrent} {...linkProps}>
          {content}
        </a>
      );
    };

    if (safeHref && !isCurrent) {
      return (
        <li ref={ref} className={cls("ds-breadcrumb__item", className)} {...liRest}>
          {renderAnchor(cls("ds-breadcrumb__link", icon ? "ds-breadcrumb__link--icon" : undefined))}
          <SeparatorSlot />
        </li>
      );
    }

    if (!isCurrent) {
      // Not current and no usable link (missing / unsafe href): plain text, no aria-current.
      return (
        <li ref={ref} className={cls("ds-breadcrumb__item", className)} {...liRest}>
          <span className="ds-breadcrumb__text ds-breadcrumb__text--plain">{content}</span>
          <SeparatorSlot />
        </li>
      );
    }

    return (
      <li
        ref={ref}
        className={cls("ds-breadcrumb__item", "ds-breadcrumb__item--current", className)}
        aria-current="page"
        {...liRest}
      >
        {safeHref ? (
          renderAnchor(
            cls(
              "ds-breadcrumb__link",
              "ds-breadcrumb__link--current",
              icon ? "ds-breadcrumb__link--icon" : undefined,
            ),
            "page",
          )
        ) : (
          <span className="ds-breadcrumb__text">{content}</span>
        )}
        <SeparatorSlot />
      </li>
    );
  },
);
BreadcrumbItemImpl.displayName = "BreadcrumbItem";

/**
 * One trail segment. Pass `href` for links; omit `href` or set `current` for the active page.
 * `asChild` / `renderLink` let a router link (e.g. Next `<Link>`) render the anchor.
 */
export const BreadcrumbItem = React.memo(BreadcrumbItemImpl);
BreadcrumbItem.displayName = "BreadcrumbItem";

export default Breadcrumb;

export type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbSeparator,
  BreadcrumbSeparatorProp,
  BreadcrumbSize,
  BreadcrumbItemData,
  BreadcrumbLinkRenderProps,
  BreadcrumbRenderLink,
} from "./Breadcrumb.types";
