"use client";

import React, { useId } from "react";
import Select from "../../atoms/Select";
import { PAGINATION_DEFAULTS, PAGINATION_LABELS } from "./Pagination.config";
import type { PaginationLabels, PaginationProps } from "./Pagination.types";
import {
  clampPage,
  getItemRange,
  getPageCount,
  getPaginationRange,
  isSafePageHref,
} from "./Pagination.utils";
import "./Pagination.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

const Chevron = ({ direction, double = false }: { direction: "left" | "right"; double?: boolean }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {direction === "left" ? (
      <>
        <path d={double ? "M8.5 4 4.5 8l4 4" : "M10 4 6 8l4 4"} />
        {double ? <path d="M12.5 4 8.5 8l4 4" /> : null}
      </>
    ) : (
      <>
        <path d={double ? "M7.5 4l4 4-4 4" : "M6 4l4 4-4 4"} />
        {double ? <path d="M3.5 4l4 4-4 4" /> : null}
      </>
    )}
  </svg>
);

type ControlKind = "first" | "prev" | "page" | "next" | "last";

/**
 * Pagination — controlled page navigation (`<nav>` landmark + list of page controls).
 * Pass `pageCount`, or `totalItems` + `pageSize`. Switches to a "Page 3 of 12" layout
 * with prev/next only when `compact` is set or the viewport is ≤ 480px.
 */
const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    pageCount,
    totalItems,
    pageSize,
    onPageChange,
    siblingCount = PAGINATION_DEFAULTS.siblingCount,
    boundaryCount = PAGINATION_DEFAULTS.boundaryCount,
    showFirstLast = PAGINATION_DEFAULTS.showFirstLast,
    showPrevNext = PAGINATION_DEFAULTS.showPrevNext,
    pageSizeOptions,
    onPageSizeChange,
    showTotal,
    size = PAGINATION_DEFAULTS.size,
    compact = PAGINATION_DEFAULTS.compact,
    disabled = PAGINATION_DEFAULTS.disabled,
    ariaLabel = PAGINATION_DEFAULTS.ariaLabel,
    getPageHref,
    labels: labelsProp,
    className,
    ...rest
  },
  ref,
) {
  const labels: PaginationLabels = { ...PAGINATION_LABELS, ...labelsProp };
  const sizeSelectId = useId();

  const count =
    typeof pageCount === "number" && Number.isFinite(pageCount)
      ? Math.max(0, Math.floor(pageCount))
      : getPageCount(totalItems, pageSize);
  const current = clampPage(page, count);
  const items = compact ? [] : getPaginationRange({ page: current, pageCount: count, siblingCount, boundaryCount });

  const hasTotal = Boolean(showTotal) && typeof totalItems === "number";
  const range = hasTotal ? getItemRange(current, pageSize ?? Math.max(1, totalItems as number), totalItems as number) : null;
  const totalContent =
    range && showTotal ? (typeof showTotal === "function" ? showTotal(range) : labels.total(range)) : null;

  const go = (target: number, event: React.MouseEvent<HTMLElement>) => {
    if (disabled || target < 1 || target > count || target === current) {
      if (disabled || target < 1 || target > count) event.preventDefault();
      return;
    }
    onPageChange?.(target, event);
  };

  const renderControl = (
    kind: ControlKind,
    target: number,
    label: string,
    content: React.ReactNode,
    { isCurrent = false, atBoundary = false }: { isCurrent?: boolean; atBoundary?: boolean } = {},
  ) => {
    const common = {
      className: "ds-pagination__control",
      "aria-label": label,
      "aria-current": isCurrent ? ("page" as const) : undefined,
      onClick: (event: React.MouseEvent<HTMLElement>) => go(target, event),
    };
    const href = getPageHref && !disabled && !atBoundary ? getPageHref(target) : undefined;

    let control: React.ReactNode;
    if (getPageHref && isSafePageHref(href)) {
      control = (
        <a {...common} href={href}>
          {content}
        </a>
      );
    } else if (getPageHref && (disabled || atBoundary)) {
      // Link without href: not focusable, exposed as a disabled link.
      control = (
        <a {...common} role="link" aria-disabled="true">
          {content}
        </a>
      );
    } else {
      control = (
        <button
          {...common}
          type="button"
          disabled={disabled}
          // Boundary prev/next stay focusable (aria-disabled) so focus is not lost on the last page.
          aria-disabled={!disabled && atBoundary ? true : undefined}
        >
          {content}
        </button>
      );
    }

    return (
      <li key={kind === "page" ? `page-${target}` : kind} className="ds-pagination__item" data-kind={kind}>
        {control}
      </li>
    );
  };

  const isFirst = current <= 1;
  const isLast = current >= count;

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cls("ds-pagination", className)}
      data-size={size}
      data-compact={compact ? "true" : "false"}
      data-disabled={disabled ? "true" : undefined}
      {...rest}
    >
      {totalContent !== null ? (
        <p className="ds-pagination__total" aria-live="polite" aria-atomic="true">
          {totalContent}
        </p>
      ) : null}

      <ul className="ds-pagination__list">
        {showFirstLast && !compact
          ? renderControl("first", 1, labels.first, <Chevron direction="left" double />, { atBoundary: isFirst })
          : null}
        {showPrevNext
          ? renderControl("prev", current - 1, labels.previous, <Chevron direction="left" />, { atBoundary: isFirst })
          : null}

        {items.map((item) =>
          item.type === "page" ? (
            renderControl("page", item.page, labels.page(item.page), item.page, { isCurrent: item.page === current })
          ) : (
            <li key={item.key} className="ds-pagination__item ds-pagination__ellipsis" data-kind="ellipsis">
              <span aria-hidden="true">…</span>
              <span className="ds-pagination__sr">{labels.ellipsis(item.from, item.to)}</span>
            </li>
          ),
        )}

        <li
          className="ds-pagination__item ds-pagination__status"
          data-kind="status"
          aria-live={totalContent === null ? "polite" : undefined}
          aria-atomic={totalContent === null ? true : undefined}
        >
          {labels.status(current, count)}
        </li>

        {showPrevNext
          ? renderControl("next", current + 1, labels.next, <Chevron direction="right" />, { atBoundary: isLast })
          : null}
        {showFirstLast && !compact
          ? renderControl("last", count, labels.last, <Chevron direction="right" double />, { atBoundary: isLast })
          : null}
      </ul>

      {pageSizeOptions && pageSizeOptions.length > 0 && onPageSizeChange ? (
        <div className="ds-pagination__size">
          <label htmlFor={sizeSelectId} className="ds-pagination__size-label">
            {labels.pageSize}
          </label>
          <Select
            id={sizeSelectId}
            size={size}
            fullWidth={false}
            placeholder=""
            animatedChevron={false}
            disabled={disabled}
            value={String(pageSize ?? pageSizeOptions[0])}
            options={pageSizeOptions.map((n) => ({ label: String(n), value: String(n) }))}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          />
        </div>
      ) : null}
    </nav>
  );
});

Pagination.displayName = "Pagination";

export default Pagination;
export type {
  PaginationProps,
  PaginationSize,
  PaginationRange,
  PaginationItem,
  PaginationLabels,
} from "./Pagination.types";
export { getPaginationRange, getPageCount, getItemRange } from "./Pagination.utils";
