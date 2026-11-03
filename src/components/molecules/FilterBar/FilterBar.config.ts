import type { FilterBarLabels } from "./FilterBar.types";

export const FILTER_BAR_DEFAULTS: {
  searchable: boolean;
  searchPlaceholder: string;
  searchDebounceMs: number;
  maxInlineFilters: number;
  moreFilters: boolean;
  showLabels: boolean;
} = {
  searchable: true,
  searchPlaceholder: "Search…",
  searchDebounceMs: 250,
  maxInlineFilters: 3,
  moreFilters: true,
  showLabels: false,
};

/** Viewport width at or below which every filter collapses into the popover. */
export const FILTER_BAR_COLLAPSE_QUERY = "(max-width: 768px)";

export const FILTER_BAR_LABELS: FilterBarLabels = {
  group: "Filters",
  search: "Search",
  clearAll: "Clear all",
  moreFilters: "More filters",
  filters: "Filters",
  activeInOverflow: (count) => (count > 0 ? `, ${count} active` : ""),
  activeFilters: "Active filters",
  removeFilter: (filterLabel, optionLabel) => `Remove filter ${filterLabel}: ${optionLabel}`,
  resultCount: (count) => (count === 1 ? "1 result" : `${count} results`),
  done: "Done",
};
