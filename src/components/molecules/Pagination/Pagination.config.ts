import type { PaginationLabels, PaginationSize } from "./Pagination.types";

export const PAGINATION_DEFAULTS: {
  siblingCount: number;
  boundaryCount: number;
  showFirstLast: boolean;
  showPrevNext: boolean;
  size: PaginationSize;
  compact: boolean;
  disabled: boolean;
  ariaLabel: string;
} = {
  siblingCount: 1,
  boundaryCount: 1,
  showFirstLast: false,
  showPrevNext: true,
  size: "md",
  compact: false,
  disabled: false,
  ariaLabel: "Pagination",
};

export const PAGINATION_SIZES: readonly PaginationSize[] = ["sm", "md"] as const;

export const PAGINATION_LABELS: PaginationLabels = {
  previous: "Previous page",
  next: "Next page",
  first: "First page",
  last: "Last page",
  page: (page) => `Page ${page}`,
  ellipsis: (from, to) => (from === to ? `Page ${from} not shown` : `Pages ${from} to ${to} not shown`),
  status: (page, pageCount) => (pageCount === 0 ? "No pages" : `Page ${page} of ${pageCount}`),
  total: ({ from, to, total }) => (total === 0 ? "No results" : `Showing ${from}–${to} of ${total}`),
  pageSize: "Rows per page",
};
