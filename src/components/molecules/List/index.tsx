"use client";

import React from "react";
import { LIST_DEFAULTS } from "./List.config";
import type { ListItemProps, ListProps } from "./List.types";
import "./List.css";
import { isSafeHref } from "../../../utils/safeHref";

export { isSafeHref };

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * List — vertical collection of settings-style rows. Pair with `ListItem`.
 * Use `bordered` for a stand-alone list; leave it off inside a `Card`.
 */
export const List = React.forwardRef<HTMLUListElement, ListProps>(function List(
  {
    children,
    divided = LIST_DEFAULTS.divided,
    bordered = LIST_DEFAULTS.bordered,
    size = LIST_DEFAULTS.size,
    ordered = false,
    className,
    ...rest
  },
  ref,
) {
  const Tag = (ordered ? "ol" : "ul") as "ul";
  return (
    <Tag
      ref={ref}
      className={cls("ds-list", className)}
      data-divided={divided ? "true" : "false"}
      data-bordered={bordered ? "true" : "false"}
      data-size={size}
      {...rest}
    >
      {children}
    </Tag>
  );
});

/**
 * ListItem — leading visual · title (+ badge) · description · meta · trailing action.
 * Title becomes a link when `href` is provided; the trailing action stays an independent control.
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  {
    leading,
    title,
    href,
    target,
    badge,
    description,
    meta,
    action,
    selected = false,
    disabled = false,
    className,
    ...rest
  },
  ref,
) {
  const titleNode =
    href && !disabled && isSafeHref(href) ? (
      <a
        className="ds-list-item__link"
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {title}
      </a>
    ) : (
      title
    );

  return (
    <li
      ref={ref}
      className={cls("ds-list-item", className)}
      data-selected={selected ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      aria-current={selected ? "true" : undefined}
      aria-disabled={disabled ? "true" : undefined}
      {...rest}
    >
      {leading ? <span className="ds-list-item__leading">{leading}</span> : null}
      <div className="ds-list-item__body">
        <div className="ds-list-item__heading">
          <span className="ds-list-item__title">{titleNode}</span>
          {badge}
        </div>
        {description ? <p className="ds-list-item__description">{description}</p> : null}
      </div>
      {meta || action ? (
        <div className="ds-list-item__trail">
          {meta ? <span className="ds-list-item__meta">{meta}</span> : null}
          {action}
        </div>
      ) : null}
    </li>
  );
});

List.displayName = "List";
ListItem.displayName = "ListItem";

export default List;
export type { ListProps, ListItemProps, ListSize } from "./List.types";
