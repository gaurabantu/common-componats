/* ucs:component-css */
import "./styles/components/molecules/Pagination/Pagination.css";
import {
  Select_default
} from "./chunk-EZBNIZ3O.mjs";

// src/components/molecules/Pagination/index.tsx
import React, { useId } from "react";

// src/components/molecules/Pagination/Pagination.config.ts
var PAGINATION_DEFAULTS = {
  siblingCount: 1,
  boundaryCount: 1,
  showFirstLast: false,
  showPrevNext: true,
  size: "md",
  compact: false,
  disabled: false,
  ariaLabel: "Pagination"
};
var PAGINATION_LABELS = {
  previous: "Previous page",
  next: "Next page",
  first: "First page",
  last: "Last page",
  page: (page) => `Page ${page}`,
  ellipsis: (from, to) => from === to ? `Page ${from} not shown` : `Pages ${from} to ${to} not shown`,
  status: (page, pageCount) => pageCount === 0 ? "No pages" : `Page ${page} of ${pageCount}`,
  total: ({ from, to, total }) => total === 0 ? "No results" : `Showing ${from}\u2013${to} of ${total}`,
  pageSize: "Rows per page"
};

// src/components/molecules/Pagination/Pagination.utils.ts
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i += 1)
    out.push(i);
  return out;
}
function toInt(value, fallback) {
  return typeof value === "number" && Number.isFinite(value) ? Math.floor(value) : fallback;
}
function getPageCount(totalItems, pageSize) {
  const total = Math.max(0, toInt(totalItems, 0));
  const size = toInt(pageSize, 0);
  if (total === 0 || size < 1)
    return 0;
  return Math.ceil(total / size);
}
function clampPage(page, pageCount) {
  const count = Math.max(0, toInt(pageCount, 0));
  if (count === 0)
    return 0;
  return Math.min(Math.max(1, toInt(page, 1)), count);
}
function getItemRange(page, pageSize, totalItems) {
  const total = Math.max(0, toInt(totalItems, 0));
  const size = Math.max(1, toInt(pageSize, 1));
  const current = clampPage(page, Math.ceil(total / size));
  if (total === 0 || current === 0)
    return { from: 0, to: 0, total };
  const from = (current - 1) * size + 1;
  return { from, to: Math.min(current * size, total), total };
}
function getPaginationRange({
  page,
  pageCount,
  siblingCount = 1,
  boundaryCount = 1
}) {
  const count = Math.max(0, toInt(pageCount, 0));
  if (count === 0)
    return [];
  const current = clampPage(page, count);
  const siblings = Math.max(0, toInt(siblingCount, 1));
  const boundary = Math.max(0, toInt(boundaryCount, 1));
  const startPages = range(1, Math.min(boundary, count));
  const endPages = range(Math.max(count - boundary + 1, boundary + 1), count);
  const siblingsStart = Math.max(
    Math.min(current - siblings, count - boundary - siblings * 2 - 1),
    boundary + 2
  );
  const siblingsEnd = Math.min(
    Math.max(current + siblings, boundary + siblings * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );
  const pages = [...startPages];
  if (siblingsStart > boundary + 2) {
    pages.push("start-ellipsis");
  } else if (boundary + 1 < count - boundary) {
    pages.push(boundary + 1);
  }
  pages.push(...range(siblingsStart, siblingsEnd));
  if (siblingsEnd < count - boundary - 1) {
    pages.push("end-ellipsis");
  } else if (count - boundary > boundary) {
    pages.push(count - boundary);
  }
  pages.push(...endPages);
  const seen = /* @__PURE__ */ new Set();
  const items = [];
  pages.forEach((entry, index) => {
    if (typeof entry === "number") {
      if (entry < 1 || entry > count || seen.has(entry))
        return;
      seen.add(entry);
      items.push({ type: "page", page: entry });
      return;
    }
    const prev = pages[index - 1];
    const next = pages[index + 1];
    const from = typeof prev === "number" ? prev + 1 : 1;
    const to = typeof next === "number" ? next - 1 : count;
    if (to >= from)
      items.push({ type: "ellipsis", key: entry, from, to });
  });
  return items;
}
var SAFE_PROTOCOLS = /* @__PURE__ */ new Set(["http:", "https:"]);
function isSafePageHref(href) {
  if (typeof href !== "string" || href.trim() === "")
    return false;
  try {
    return SAFE_PROTOCOLS.has(new URL(href, "https://relative.invalid/").protocol);
  } catch (e) {
    return false;
  }
}

// src/components/molecules/Pagination/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var Chevron = ({ direction, double = false }) => /* @__PURE__ */ jsx(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    children: direction === "left" ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("path", { d: double ? "M8.5 4 4.5 8l4 4" : "M10 4 6 8l4 4" }),
      double ? /* @__PURE__ */ jsx("path", { d: "M12.5 4 8.5 8l4 4" }) : null
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("path", { d: double ? "M7.5 4l4 4-4 4" : "M6 4l4 4-4 4" }),
      double ? /* @__PURE__ */ jsx("path", { d: "M3.5 4l4 4-4 4" }) : null
    ] })
  }
);
var Pagination = React.forwardRef(function Pagination2({
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
}, ref) {
  const labels = { ...PAGINATION_LABELS, ...labelsProp };
  const sizeSelectId = useId();
  const count = typeof pageCount === "number" && Number.isFinite(pageCount) ? Math.max(0, Math.floor(pageCount)) : getPageCount(totalItems, pageSize);
  const current = clampPage(page, count);
  const items = compact ? [] : getPaginationRange({ page: current, pageCount: count, siblingCount, boundaryCount });
  const hasTotal = Boolean(showTotal) && typeof totalItems === "number";
  const range2 = hasTotal ? getItemRange(current, pageSize != null ? pageSize : Math.max(1, totalItems), totalItems) : null;
  const totalContent = range2 && showTotal ? typeof showTotal === "function" ? showTotal(range2) : labels.total(range2) : null;
  const go = (target, event) => {
    if (disabled || target < 1 || target > count || target === current) {
      if (disabled || target < 1 || target > count)
        event.preventDefault();
      return;
    }
    onPageChange == null ? void 0 : onPageChange(target, event);
  };
  const renderControl = (kind, target, label, content, { isCurrent = false, atBoundary = false } = {}) => {
    const common = {
      className: "ds-pagination__control",
      "aria-label": label,
      "aria-current": isCurrent ? "page" : void 0,
      onClick: (event) => go(target, event)
    };
    const href = getPageHref && !disabled && !atBoundary ? getPageHref(target) : void 0;
    let control;
    if (getPageHref && isSafePageHref(href)) {
      control = /* @__PURE__ */ jsx("a", { ...common, href, children: content });
    } else if (getPageHref && (disabled || atBoundary)) {
      control = /* @__PURE__ */ jsx("a", { ...common, role: "link", "aria-disabled": "true", children: content });
    } else {
      control = /* @__PURE__ */ jsx(
        "button",
        {
          ...common,
          type: "button",
          disabled,
          "aria-disabled": !disabled && atBoundary ? true : void 0,
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsx("li", { className: "ds-pagination__item", "data-kind": kind, children: control }, kind === "page" ? `page-${target}` : kind);
  };
  const isFirst = current <= 1;
  const isLast = current >= count;
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      ref,
      "aria-label": ariaLabel,
      className: cls("ds-pagination", className),
      "data-size": size,
      "data-compact": compact ? "true" : "false",
      "data-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        totalContent !== null ? /* @__PURE__ */ jsx("p", { className: "ds-pagination__total", "aria-live": "polite", "aria-atomic": "true", children: totalContent }) : null,
        /* @__PURE__ */ jsxs("ul", { className: "ds-pagination__list", children: [
          showFirstLast && !compact ? renderControl("first", 1, labels.first, /* @__PURE__ */ jsx(Chevron, { direction: "left", double: true }), { atBoundary: isFirst }) : null,
          showPrevNext ? renderControl("prev", current - 1, labels.previous, /* @__PURE__ */ jsx(Chevron, { direction: "left" }), { atBoundary: isFirst }) : null,
          items.map(
            (item) => item.type === "page" ? renderControl("page", item.page, labels.page(item.page), item.page, { isCurrent: item.page === current }) : /* @__PURE__ */ jsxs("li", { className: "ds-pagination__item ds-pagination__ellipsis", "data-kind": "ellipsis", children: [
              /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2026" }),
              /* @__PURE__ */ jsx("span", { className: "ds-pagination__sr", children: labels.ellipsis(item.from, item.to) })
            ] }, item.key)
          ),
          /* @__PURE__ */ jsx(
            "li",
            {
              className: "ds-pagination__item ds-pagination__status",
              "data-kind": "status",
              "aria-live": totalContent === null ? "polite" : void 0,
              "aria-atomic": totalContent === null ? true : void 0,
              children: labels.status(current, count)
            }
          ),
          showPrevNext ? renderControl("next", current + 1, labels.next, /* @__PURE__ */ jsx(Chevron, { direction: "right" }), { atBoundary: isLast }) : null,
          showFirstLast && !compact ? renderControl("last", count, labels.last, /* @__PURE__ */ jsx(Chevron, { direction: "right", double: true }), { atBoundary: isLast }) : null
        ] }),
        pageSizeOptions && pageSizeOptions.length > 0 && onPageSizeChange ? /* @__PURE__ */ jsxs("div", { className: "ds-pagination__size", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: sizeSelectId, className: "ds-pagination__size-label", children: labels.pageSize }),
          /* @__PURE__ */ jsx(
            Select_default,
            {
              id: sizeSelectId,
              size,
              fullWidth: false,
              placeholder: "",
              animatedChevron: false,
              disabled,
              value: String(pageSize != null ? pageSize : pageSizeOptions[0]),
              options: pageSizeOptions.map((n) => ({ label: String(n), value: String(n) })),
              onValueChange: (value) => onPageSizeChange(Number(value))
            }
          )
        ] }) : null
      ]
    }
  );
});
Pagination.displayName = "Pagination";
var Pagination_default = Pagination;

export {
  getPageCount,
  getItemRange,
  getPaginationRange,
  Pagination_default
};
//# sourceMappingURL=chunk-DLON4M3W.mjs.map