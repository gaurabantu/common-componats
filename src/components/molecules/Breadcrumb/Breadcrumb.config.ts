import type { BreadcrumbSeparator, BreadcrumbSize } from "./Breadcrumb.types";

export const BREADCRUMB_DEFAULTS: {
  ariaLabel: string;
  separator: BreadcrumbSeparator;
  size: BreadcrumbSize;
  itemsBeforeCollapse: number;
  itemsAfterCollapse: number;
  responsiveCollapse: boolean;
} = {
  ariaLabel: "Breadcrumb",
  separator: "slash",
  size: "sm",
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
  responsiveCollapse: true,
};

/** Viewport query for the responsive auto-collapse. */
export const BREADCRUMB_NARROW_QUERY = "(max-width: 640px)";

/** Trails longer than this collapse to first · … · last on narrow viewports. */
export const BREADCRUMB_NARROW_MAX_ITEMS = 3;

export const BREADCRUMB_SEPARATORS: readonly BreadcrumbSeparator[] = ["slash", "chevron"] as const;
export const BREADCRUMB_SIZES: readonly BreadcrumbSize[] = ["sm", "md"] as const;

export const defaultExpandLabel = (hiddenCount: number): string => `Show ${hiddenCount} more`;
