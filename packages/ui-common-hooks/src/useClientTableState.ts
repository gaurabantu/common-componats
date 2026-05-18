import { useCallback, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { usePagination } from "./usePagination";

export type ClientSortDirection = "asc" | "desc" | null;

export interface ClientSortState {
  key: string;
  dir: ClientSortDirection;
}

export interface UseClientTableStateOptions<T extends Record<string, unknown>> {
  data: readonly T[];
  /** When omitted, searches all enumerable string keys present on rows */
  searchColumns?: readonly string[];
  initialSort?: ClientSortState;
  /** Passes through to {@link usePagination} */
  pageSize?: number;
}

export interface UseClientTableStateResult<T> {
  search: string;
  setSearch: (value: string) => void;
  sortState: ClientSortState;
  setSortState: Dispatch<SetStateAction<ClientSortState>>;
  toggleSort: (columnKey: string) => void;
  filteredRows: readonly T[];
  sortedRows: readonly T[];
  pageRows: readonly T[];
  pagination: ReturnType<typeof usePagination>;
}

function isNumericLike(value: unknown): boolean {
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return Number.isFinite(Number(trimmed));
}

function toNumber(value: unknown): number {
  return typeof value === "number" ? value : Number(String(value).trim());
}

function localeSortCells(a: unknown, b: unknown, sortType: "auto" | "string" | "number"): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  const numeric =
    sortType === "number" || (sortType === "auto" && isNumericLike(a) && isNumericLike(b));

  return numeric ? toNumber(a) - toNumber(b) : String(a).localeCompare(String(b));
}

/**
 * Batteries-included client filtering/sorting/pagination bundle mirroring ergonomics baked into `<Table>`
 * (`InputSearch`, column sort cycling, slicing) for headless or virtualized adapters.
 *
 * Sorting heuristic matches numeric-aware auto detection from `DefaultSorter`.
 */
export function useClientTableState<T extends Record<string, unknown>>(
  options: UseClientTableStateOptions<T>
): UseClientTableStateResult<T> {
  const { data, searchColumns, pageSize = 10 } = options;

  const [search, setSearch] = useState("");
  const [sortState, setSortState] = useState<ClientSortState>(
    () => options.initialSort ?? { key: "", dir: null }
  );

  const searchableKeys = useMemo(() => {
    if (searchColumns?.length) return searchColumns.slice();
    if (!data.length) return [] as string[];
    return Array.from(
      new Set(
        Object.keys(data[0] ?? {}).filter(
          (key) => typeof key === "string" && !(key.startsWith("__") || key.startsWith("$"))
        )
      )
    );
  }, [data, searchColumns]);

  const filteredRows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return data;

    const keys = searchableKeys.length ? searchableKeys : Object.keys(data[0] ?? {});
    return data.filter((row) =>
      keys.some((columnKey) => {
        const value = row[columnKey as keyof typeof row];
        return String(value ?? "").toLowerCase().includes(needle);
      })
    );
  }, [data, searchableKeys, search]);

  const sortedRows = useMemo(() => {
    if (!sortState.key || !sortState.dir) return filteredRows;
    const key = sortState.key;
    const direction = sortState.dir === "asc" ? 1 : -1;

    const next = [...filteredRows].sort((left, right) => {
      const leftValue = (left as Record<string, unknown>)[key];
      const rightValue = (right as Record<string, unknown>)[key];
      return localeSortCells(leftValue, rightValue, "auto") * direction;
    });

    return next;
  }, [filteredRows, sortState.dir, sortState.key]);

  const pagination = usePagination({
    totalItems: sortedRows.length,
    initialPage: 1,
    initialPageSize: pageSize,
  });

  const pageRows = useMemo(
    () => pagination.slicePage(sortedRows),
    [pagination, sortedRows]
  );

  const toggleSort = useCallback((columnKey: string) => {
    setSortState((previous) => {
      if (previous.key !== columnKey) return { key: columnKey, dir: "asc" };
      if (previous.dir === "asc") return { key: columnKey, dir: "desc" };
      if (previous.dir === "desc") return { key: "", dir: null };
      return { key: columnKey, dir: "asc" };
    });
  }, []);

  return {
    search,
    setSearch,
    sortState,
    setSortState,
    toggleSort,
    filteredRows,
    sortedRows,
    pageRows,
    pagination,
  };
}
