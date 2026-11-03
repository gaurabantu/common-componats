import type { PageHeaderTitleAs } from "./PageHeader.types";

export const PAGE_HEADER_DEFAULTS: {
  titleAs: PageHeaderTitleAs;
  maxVisibleActions: number;
  moreActionsLabel: string;
} = {
  titleAs: "h1",
  maxVisibleActions: 2,
  moreActionsLabel: "More actions",
};

/** Viewport at or below which every secondary action collapses into the overflow menu (matches FormField / tokens.css). */
export const PAGE_HEADER_COMPACT_QUERY = "(max-width: 640px)";

/** Button styling for inline secondaries and the overflow trigger (COMPOSITION_RULES: page alt action = outlineSecondary). */
export const PAGE_HEADER_SECONDARY_BUTTON = { variant: "outlineSecondary", size: "md" } as const;

/** Classes the overflow `DropdownMenuTrigger` borrows from tokens.css so it matches an outlined `Button`. */
export const PAGE_HEADER_MORE_TRIGGER_CLASS = "btn-base btn-outline-secondary btn-size-md btn-rounded-md";
