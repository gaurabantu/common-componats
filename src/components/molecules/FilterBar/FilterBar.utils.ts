import type { FilterBarFilter, FilterBarFilterValue, FilterBarValue } from "./FilterBar.types";

/** Normalise a stored filter value to a list of selected option values. */
export function toValueList(value: FilterBarFilterValue | undefined): string[] {
  if (Array.isArray(value)) return value.filter((v) => v !== "");
  return value ? [value] : [];
}

/** True when the filter narrows the data (non-empty string or array). */
export function isFilterActive(value: FilterBarFilterValue | undefined): boolean {
  return toValueList(value).length > 0;
}

export function countActiveFilters(filters: FilterBarFilter[], value: FilterBarValue): number {
  return filters.reduce((n, f) => n + (isFilterActive(value.filters[f.id]) ? 1 : 0), 0);
}

/** True when search text or any filter is set. */
export function hasActiveFilterValue(value: FilterBarValue | undefined): boolean {
  if (!value) return false;
  if ((value.search ?? "").trim() !== "") return true;
  return Object.values(value.filters ?? {}).some(isFilterActive);
}

export interface FilterChip {
  filterId: string;
  filterLabel: string;
  value: string;
  optionLabel: string;
}

/** One chip per selected value, in filter order. Values not in `options` fall back to the raw value. */
export function getActiveChips(filters: FilterBarFilter[], value: FilterBarValue): FilterChip[] {
  return filters.flatMap((f) =>
    toValueList(value.filters[f.id]).map((v) => ({
      filterId: f.id,
      filterLabel: f.label,
      value: v,
      optionLabel: f.options.find((o) => o.value === v)?.label ?? v,
    })),
  );
}

/** Return `filters` with `id` set to `next`; empty values remove the key. */
export function setFilterValue(
  filters: Record<string, FilterBarFilterValue>,
  id: string,
  next: FilterBarFilterValue,
): Record<string, FilterBarFilterValue> {
  const out = { ...filters };
  if (isFilterActive(next)) out[id] = next;
  else delete out[id];
  return out;
}

/** Remove one value of a filter (whole filter for `select`). */
export function removeFilterValue(
  filters: Record<string, FilterBarFilterValue>,
  filter: FilterBarFilter,
  value: string,
): Record<string, FilterBarFilterValue> {
  if (filter.type === "multi") {
    return setFilterValue(filters, filter.id, toValueList(filters[filter.id]).filter((v) => v !== value));
  }
  return setFilterValue(filters, filter.id, "");
}
