import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

/** `sm` ≥ 36px targets · `md` ≥ 40px targets (both grow to 44px on coarse pointers). */
export type PaginationSize = "sm" | "md";

/** Item range shown on the current page (1-based, inclusive). `from`/`to` are 0 when `total` is 0. */
export interface PaginationRange {
  from: number;
  to: number;
  total: number;
}

/** One entry of the computed page strip. */
export type PaginationItem =
  | { type: "page"; page: number }
  | { type: "ellipsis"; key: "start-ellipsis" | "end-ellipsis"; from: number; to: number };

/** Overridable strings (i18n). */
export interface PaginationLabels {
  previous: string;
  next: string;
  first: string;
  last: string;
  /** Accessible name of a page control, e.g. "Page 3". */
  page: (page: number) => string;
  /** Accessible text for an ellipsis covering pages `from`…`to`. */
  ellipsis: (from: number, to: number) => string;
  /** Compact status, e.g. "Page 3 of 12". */
  status: (page: number, pageCount: number) => string;
  /** Default `showTotal` text. */
  total: (range: PaginationRange) => string;
  /** Label of the page-size select. */
  pageSize: string;
}

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current page, 1-based (controlled). */
  page: number;
  /** Total pages. Takes precedence over `totalItems` / `pageSize`. */
  pageCount?: number;
  /** Total item count — with `pageSize` derives `pageCount` and enables `showTotal`. */
  totalItems?: number;
  /** Items per page (also the selected value of the page-size select). */
  pageSize?: number;
  /**
   * Called with the requested page. The second argument is the click event — call
   * `event.preventDefault()` to keep client-side routing when using `getPageHref`.
   */
  onPageChange?: (page: number, event: MouseEvent<HTMLElement>) => void;
  /** Pages shown either side of the current page. @default 1 */
  siblingCount?: number;
  /** Pages always shown at each end. @default 1 */
  boundaryCount?: number;
  /** First / last page buttons. @default false */
  showFirstLast?: boolean;
  /** Previous / next buttons. @default true */
  showPrevNext?: boolean;
  /** Options for the page-size select (rendered only with `onPageSizeChange`). */
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  /** `true` → "Showing 21–30 of 120"; a function receives the range and returns custom content. Needs `totalItems`. */
  showTotal?: boolean | ((range: PaginationRange) => ReactNode);
  /** @default "md" */
  size?: PaginationSize;
  /** Force the "Page 3 of 12" + prev/next layout (it is also used automatically at ≤ 480px). @default false */
  compact?: boolean;
  /** Disable every control. @default false */
  disabled?: boolean;
  /** Name of the `<nav>` landmark. @default "Pagination" */
  ariaLabel?: string;
  /** Render page controls as links (SEO / route paging). Unsafe schemes fall back to buttons. */
  getPageHref?: (page: number) => string;
  /** Override any user-facing string. */
  labels?: Partial<PaginationLabels>;
}
