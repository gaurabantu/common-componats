import type { AnchorHTMLAttributes, HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";

/** Built-in separator glyphs (decorative, drawn in CSS). */
export type BreadcrumbSeparator = "slash" | "chevron";

/** `separator` prop: a built-in glyph or any decorative node (rendered `aria-hidden`). */
export type BreadcrumbSeparatorProp = BreadcrumbSeparator | ReactNode;

export type BreadcrumbSize = "sm" | "md";

/** Props handed to `renderLink` so a router link (e.g. Next `<Link>`) can render the anchor. */
export interface BreadcrumbLinkRenderProps {
  /** Sanitised href (unsafe schemes never reach this callback). */
  href: string;
  /** Design-system classes — put them on the rendered anchor. */
  className: string;
  /** `"page"` for the current segment rendered as a self-link. */
  "aria-current"?: "page";
  /** Icon + label content. */
  children: ReactNode;
}

export type BreadcrumbRenderLink = (props: BreadcrumbLinkRenderProps) => ReactNode;

/** One entry of the data-driven `items` API. */
export interface BreadcrumbItemData {
  /** Visible label (text-interpolated, never parsed as HTML). */
  label: ReactNode;
  /** Link target. Unsafe schemes (`javascript:`, `data:` …) are dropped and the label renders as text. */
  href?: string;
  /** Decorative leading icon (rendered `aria-hidden`). */
  icon?: ReactNode;
  /** Current page. Defaults to `true` for the last item when no item sets it. */
  current?: boolean;
  /** Stable React key (defaults to the index). */
  key?: string;
  /** Per-item router link renderer; wins over `Breadcrumb.renderLink`. */
  renderLink?: BreadcrumbRenderLink;
  /** Extra attributes for the rendered `<a>`. */
  linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name for the navigation landmark. @default "Breadcrumb" */
  ariaLabel?: string;
  /** Separator between items: `"slash"`, `"chevron"` or a custom decorative node. @default "slash" */
  separator?: BreadcrumbSeparatorProp;
  /** Compact vs default text size. @default "sm" */
  size?: BreadcrumbSize;
  /** Data-driven trail. When set, `children` is ignored. */
  items?: BreadcrumbItemData[];
  /** Composable trail (`<BreadcrumbItem>` children). Optional when `items` is used. */
  children?: ReactNode;
  /**
   * Collapse the middle of the trail into an expandable "…" button once there are more than
   * `maxItems` segments. Unset = never collapse (except the responsive collapse below).
   */
  maxItems?: number;
  /** Segments kept before the "…" when collapsed. @default 1 */
  itemsBeforeCollapse?: number;
  /** Segments kept after the "…" when collapsed. @default 1 */
  itemsAfterCollapse?: number;
  /**
   * At viewport widths ≤ 640px, collapse trails longer than 3 segments to first · … · last.
   * @default true
   */
  responsiveCollapse?: boolean;
  /** Accessible name of the "…" button. @default (n) => `Show ${n} more` */
  expandLabel?: (hiddenCount: number) => string;
  /** Called when the user expands a collapsed trail. */
  onExpand?: () => void;
  /** Router link renderer applied to every link segment (items and `<BreadcrumbItem>` children). */
  renderLink?: BreadcrumbRenderLink;
}

export interface BreadcrumbItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, "children"> {
  /** When set and not the current page, renders a link. Unsafe schemes are dropped. */
  href?: string;
  /**
   * Current page segment — use with `href` (self link) or omit `href` for plain text.
   * When omitted, an item without `href` is treated as current (original behaviour).
   */
  current?: boolean;
  /** Decorative leading icon (rendered `aria-hidden`). */
  icon?: ReactNode;
  children: ReactNode;
  /** Applied to the inner `<a>` when a link is rendered */
  linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className">;
  /**
   * Treat the single child element (e.g. Next `<Link href>`) as the link: design-system classes
   * and `aria-current` are merged onto it. Its `href` is sanitised like `href`.
   */
  asChild?: boolean;
  /** Router link renderer; wins over `Breadcrumb.renderLink`. */
  renderLink?: BreadcrumbRenderLink;
}
