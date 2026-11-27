"use client";

import React from "react";
import { isSafeHref } from "../../../utils/safeHref";
import { HYPERLINK_DEFAULTS, HYPERLINK_DEFAULT_UNDERLINE } from "./Hyperlink.config";
import { renderLinkSlot } from "./Hyperlink.slot";
import type { HyperlinkProps } from "./Hyperlink.types";
import { cls } from "./Hyperlink.utils";
import "./Hyperlink.css";

type AnyProps = Record<string, unknown>;

/**
 * String hrefs: returned only when they use an allowed protocol (http/https/mailto/tel/relative/hash).
 * Object hrefs (router URL objects, e.g. Next.js `{ pathname, query }` — only reachable via `asChild`):
 * passed through unchanged unless one of their string `href` / `pathname` / `protocol` fields is unsafe,
 * in which case the whole href is dropped. Anything else (numbers, functions, null) is dropped.
 */
function sanitizeHref(href: unknown): unknown {
  if (href === undefined || href === null) return undefined;
  if (typeof href === "string") return isSafeHref(href) ? href : undefined;
  if (typeof href === "object") {
    const url = href as Record<string, unknown>;
    for (const key of ["href", "pathname"]) {
      const v = url[key];
      if (typeof v === "string" && !isSafeHref(v)) return undefined;
    }
    if (typeof url.protocol === "string") {
      const protocol = url.protocol.endsWith(":") ? url.protocol : `${url.protocol}:`;
      if (!isSafeHref(`${protocol}//placeholder.invalid/`)) return undefined;
    }
    return href;
  }
  return undefined;
}

/** Union of rel tokens, de-duplicated, with noopener/noreferrer added when `secure`. */
function mergeRel(rel: unknown, secure: boolean): string | undefined {
  const tokens = typeof rel === "string" ? rel.split(/\s+/).filter(Boolean) : [];
  if (secure) tokens.push("noopener", "noreferrer");
  const unique = tokens.filter((t, i) => tokens.indexOf(t) === i);
  return unique.length ? unique.join(" ") : undefined;
}

function ExternalIcon() {
  return (
    <span className="ds-hyperlink__icon ds-hyperlink__icon--external" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" focusable="false">
        <path
          d="M9 2.5h4.5V7M13.5 2.5 7 9M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Hyperlink — text link with design-system variants, safe `href` handling, new-tab announcement
 * and router integration via `asChild`.
 */
export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(function Hyperlink(
  {
    children,
    href,
    variant = HYPERLINK_DEFAULTS.variant,
    underline,
    size,
    leadingIcon,
    trailingIcon,
    openInNewTab = false,
    external,
    disabled = false,
    asChild = false,
    newTabLabel = HYPERLINK_DEFAULTS.newTabLabel,
    className,
    target,
    rel,
    onClick,
    ...rest
  },
  ref,
) {
  const childTarget =
    asChild && React.isValidElement(children) ? (children.props as AnyProps).target : undefined;
  const isNewTab = openInNewTab || target === "_blank" || childTarget === "_blank";
  const isExternal = external ?? isNewTab;
  const resolvedUnderline = underline ?? HYPERLINK_DEFAULT_UNDERLINE[variant];
  const resolvedSize = size ?? (variant === "inline" ? undefined : HYPERLINK_DEFAULTS.size);

  const renderContent = (text: React.ReactNode) => (
    <>
      {leadingIcon ? (
        <span className="ds-hyperlink__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {text}
      {trailingIcon ? (
        <span className="ds-hyperlink__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
      {isExternal && !disabled ? <ExternalIcon /> : null}
      {isNewTab && !disabled ? <span className="ds-hyperlink__sr-only">{` ${newTabLabel}`}</span> : null}
    </>
  );

  const swallowClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  const visualProps = {
    className: cls("ds-hyperlink", className),
    "data-variant": variant,
    "data-underline": resolvedUnderline,
    "data-size": resolvedSize,
    "data-disabled": disabled ? "" : undefined,
    "data-external": isExternal ? "" : undefined,
  };

  /** Security + disabled rules applied last, so neither the child nor `...rest` can bypass them. */
  const enforce = (props: AnyProps, keepHrefWhenDisabled: boolean): AnyProps => {
    const next: AnyProps = { ...props };
    next.href = sanitizeHref(next.href);
    if (disabled) {
      if (!keepHrefWhenDisabled) next.href = undefined;
      next.target = undefined;
      next.rel = undefined;
      next.role = "link";
      next["aria-disabled"] = true;
      next.tabIndex = -1;
      next.onClick = swallowClick;
    } else {
      next.target = isNewTab ? "_blank" : next.target;
      next.rel = mergeRel(next.rel, isExternal || isNewTab);
    }
    return next;
  };

  if (asChild) {
    return renderLinkSlot(
      children,
      { ...rest, ...visualProps, href, target, rel, onClick },
      ref,
      {
        renderChildren: renderContent,
        // Router links (e.g. Next.js <Link>) require `href`; keep it when disabled — clicks and focus are still blocked.
        finalize: (merged) => enforce(merged, true),
      },
    );
  }

  const anchorProps = enforce(
    { ...rest, ...visualProps, href: href ?? HYPERLINK_DEFAULTS.href, target, rel, onClick },
    false,
  );

  return (
    <a ref={ref} {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {renderContent(children)}
    </a>
  );
});

Hyperlink.displayName = "Hyperlink";

export default Hyperlink;
export type {
  HyperlinkProps,
  HyperlinkVariant,
  HyperlinkUnderline,
  HyperlinkSize,
} from "./Hyperlink.types";
