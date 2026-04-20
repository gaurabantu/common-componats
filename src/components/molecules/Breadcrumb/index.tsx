"use client";

import React from "react";
import type { BreadcrumbItemProps, BreadcrumbProps } from "./Breadcrumb.types";
import "./Breadcrumb.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Landmark navigation with ordered list. Pair with `BreadcrumbItem`.
 * Separators are decorative (CSS `::after`); links expose focus rings for keyboard users.
 */
export const Breadcrumb = React.memo(function Breadcrumb({
  ariaLabel = "Breadcrumb",
  separator = "slash",
  size = "sm",
  className,
  children,
  ...rest
}: BreadcrumbProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cls("ds-breadcrumb", className)}
      data-separator={separator}
      data-size={size}
      {...rest}
    >
      <ol className="ds-breadcrumb__list">{children}</ol>
    </nav>
  );
});

/**
 * One trail segment. Pass `href` for links; omit `href` or set `current` for the active page.
 */
export const BreadcrumbItem = React.memo(function BreadcrumbItem({
  href,
  current = false,
  children,
  className,
  linkProps,
  ...liRest
}: BreadcrumbItemProps) {
  const hasHref = typeof href === "string" && href.length > 0;
  const isNavigable = hasHref && !current;

  if (isNavigable) {
    return (
      <li className={cls("ds-breadcrumb__item", className)} {...liRest}>
        <a href={href} className="ds-breadcrumb__link" {...linkProps}>
          {children}
        </a>
      </li>
    );
  }

  return (
    <li
      className={cls("ds-breadcrumb__item", "ds-breadcrumb__item--current", className)}
      aria-current="page"
      {...liRest}
    >
      {hasHref ? (
        <a
          href={href}
          className="ds-breadcrumb__link ds-breadcrumb__link--current"
          aria-current="page"
          {...linkProps}
        >
          {children}
        </a>
      ) : (
        <span className="ds-breadcrumb__text">{children}</span>
      )}
    </li>
  );
});

export default Breadcrumb;

export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbSeparator } from "./Breadcrumb.types";
