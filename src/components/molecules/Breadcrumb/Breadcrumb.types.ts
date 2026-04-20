import type { AnchorHTMLAttributes, HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";

export type BreadcrumbSeparator = "slash" | "chevron";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name for the navigation landmark */
  ariaLabel?: string;
  /** Visual separator between items */
  separator?: BreadcrumbSeparator;
  /** Compact vs default text size */
  size?: "sm" | "md";
  children: ReactNode;
}

export interface BreadcrumbItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, "children"> {
  /** When set and not the current page, renders a link */
  href?: string;
  /** Current page segment — use with `href` (self link) or omit `href` for plain text */
  current?: boolean;
  children: ReactNode;
  /** Applied to the inner `<a>` when a link is rendered */
  linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;
}
