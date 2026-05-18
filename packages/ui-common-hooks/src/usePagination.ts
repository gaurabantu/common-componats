import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface UsePaginationResult {
  /** 1-indexed page */
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  /** Always ≥ 1 */
  totalPages: number;
  slicePage: <T>(items: readonly T[]) => readonly T[];
  offset: number;
  limit: number;
}

function clamp(page: number, totalPages: number) {
  if (!Number.isFinite(page)) return 1;
  return Math.min(Math.max(1, Math.floor(page)), totalPages);
}

function sanitizePageSize(value: number): number | null {
  if (!Number.isFinite(value)) return null;
  const floored = Math.floor(value);
  if (floored < 1) return null;
  return floored;
}

export function totalsFor(totalItems: number, pageSize: number) {
  return Math.max(1, Math.ceil(Math.max(totalItems, 0) / Math.max(pageSize, 1)));
}

/**
 * Page math / slicing primitives for headless data views (TanStack-like ergonomics without the query core).
 *
 * Changing `pageSize` jumps back to **page 1**, matching spreadsheet / admin table UX.
 */
export function usePagination(args: {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
}): UsePaginationResult {
  const initialPageSize = sanitizePageSize(args.initialPageSize ?? 10) ?? 10;

  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [page, setPageState] = useState(() =>
    clamp(args.initialPage ?? 1, totalsFor(args.totalItems, initialPageSize))
  );

  const totalPages = totalsFor(args.totalItems, pageSize);

  const setPageSize = useCallback((value: SetStateAction<number>) => {
    setPageSizeState((previous) => {
      const computed =
        sanitizePageSize(typeof value === "function" ? (value as (prev: number) => number)(previous) : value) ??
        previous;

      setPageState(() => clamp(1, totalsFor(args.totalItems, computed)));

      return computed;
    });
  }, [args.totalItems]);

  const setPage = useCallback((value: SetStateAction<number>) => {
    setPageState((prev) =>
      clamp(typeof value === "function" ? (value as (prev: number) => number)(prev) : value, totalPages)
    );
  }, [totalPages]);

  useEffect(() => {
    setPageState((prev) => clamp(prev, totalPages));
  }, [totalPages]);

  const offset = Math.max(page - 1, 0) * pageSize;

  const slicePage = useCallback(
    <T,>(items: readonly T[]): readonly T[] =>
      items.slice(offset, offset + pageSize),
    [offset, pageSize]
  );

  return useMemo(
    () => ({
      page,
      setPage,
      pageSize,
      setPageSize,
      totalPages,
      slicePage,
      offset,
      limit: pageSize,
    }),
    [offset, page, pageSize, setPage, setPageSize, slicePage, totalPages]
  );
}
