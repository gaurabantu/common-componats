import type { HTMLAttributes, ReactNode } from "react";

/** `select` → one value (native `Select`) · `multi` → many values (`Combobox multiple`). */
export type FilterBarFilterType = "select" | "multi";

export interface FilterBarOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FilterBarFilter {
  /** Key in `value.filters`. In `DataTable` client mode it is also the row field that is matched. */
  id: string;
  /** Accessible name of the control and the chip prefix ("Status: Active"). */
  label: string;
  type: FilterBarFilterType;
  options: FilterBarOption[];
  /** Placeholder / "nothing selected" text. Defaults: select `"{label}: All"`, multi `"{label}"`. */
  placeholder?: string;
  /** `multi` only — adds a search box to the option list. */
  searchable?: boolean;
}

export type FilterBarFilterValue = string | string[];

export interface FilterBarValue {
  search?: string;
  /** Empty string / empty array (or a missing key) means "not filtered". */
  filters: Record<string, FilterBarFilterValue>;
}

/** Overridable strings (i18n). */
export interface FilterBarLabels {
  /** Name of the whole group. */
  group: string;
  /** Accessible name of the search field. */
  search: string;
  clearAll: string;
  /** Overflow trigger when some filters stay inline. */
  moreFilters: string;
  /** Overflow trigger when every filter is collapsed (narrow screens). */
  filters: string;
  /** Visually hidden suffix on the overflow trigger, e.g. ", 2 active". */
  activeInOverflow: (count: number) => string;
  /** Name of the active-chip list. */
  activeFilters: string;
  /** Accessible name of a chip's dismiss button. */
  removeFilter: (filterLabel: string, optionLabel: string) => string;
  /** Live-region text for `resultCount`. */
  resultCount: (count: number) => string;
  /** Close button inside the overflow panel. */
  done: string;
}

export interface FilterBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled value. */
  value: FilterBarValue;
  /** Called with the next full value (search is debounced, filters are immediate). */
  onChange: (next: FilterBarValue) => void;
  filters?: FilterBarFilter[];
  /** Render the search field. @default true */
  searchable?: boolean;
  /** @default "Search…" */
  searchPlaceholder?: string;
  /** Debounce for `value.search` updates; clearing and Enter commit immediately. @default 250 */
  searchDebounceMs?: number;
  /** Announced in a polite live region ("24 results"). */
  resultCount?: number;
  /** Right-aligned slot (view toggle, export, column menu…). */
  extra?: ReactNode;
  /** Filters shown inline before the rest move into the "More filters" popover. @default 3 */
  maxInlineFilters?: number;
  /** Collapse overflow (and every filter at ≤ 768px) into a popover. `false` keeps all inline and wraps. @default true */
  moreFilters?: boolean;
  /** Show visible labels above inline controls (otherwise the label is the accessible name + placeholder). @default false */
  showLabels?: boolean;
  /** Override any user-facing string. */
  labels?: Partial<FilterBarLabels>;
}
