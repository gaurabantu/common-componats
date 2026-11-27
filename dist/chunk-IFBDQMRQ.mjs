/* ucs:component-css */
import "./styles/components/molecules/Table/Table.css";
import {
  TextView_default
} from "./chunk-QLCAIULL.mjs";
import {
  Checkbox_default
} from "./chunk-3P5PIN4K.mjs";
import {
  Select_default
} from "./chunk-EZBNIZ3O.mjs";
import {
  TextInputSearch_default
} from "./chunk-ZSF56B3K.mjs";
import {
  search_default
} from "./chunk-P7CURWJ4.mjs";

// src/components/molecules/Table/Table.tsx
import { useMemo, useState, useCallback, useEffect } from "react";

// src/components/molecules/Table/Table.config.ts
var tableConfig = {
  default: {
    table: "table-base table-layout-auto",
    thead: {
      primary: "table-thead table-thead-theme-primary",
      secondary: "table-thead table-thead-theme-primary",
      light: "table-thead table-thead-theme-light",
      dark: "table-thead table-thead-theme-dark",
      success: "table-thead table-thead-theme-primary",
      warning: "table-thead table-thead-theme-light",
      danger: "table-thead table-thead-theme-primary",
      info: "table-thead table-thead-theme-light"
    },
    th: "",
    td: "",
    striped: "table-striped",
    hover: "table-hover",
    compact: {
      th: "table-compact",
      td: "table-compact"
    }
  }
};

// src/components/molecules/Table/Table.utils.ts
var cls = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// src/components/molecules/Table/parts/TableHeader.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function TableHeader({
  expandable,
  selectionMode,
  allSelected,
  visibleColumns,
  sortState,
  onSort,
  onSelectAll,
  className
}) {
  return /* @__PURE__ */ jsx("thead", { className, children: /* @__PURE__ */ jsxs("tr", { children: [
    expandable && /* @__PURE__ */ jsx("th", { scope: "col", style: { width: 40 }, "aria-label": "Expand" }),
    selectionMode === "multiple" && /* @__PURE__ */ jsx("th", { scope: "col", style: { width: 48 }, "aria-label": "Select all", children: /* @__PURE__ */ jsx(
      Checkbox_default,
      {
        name: "table-select-all",
        value: "all",
        label: "",
        ariaLabel: "Select all rows",
        checked: allSelected,
        onChange: (e) => onSelectAll(e.target.checked)
      }
    ) }),
    selectionMode === "single" && /* @__PURE__ */ jsx("th", { scope: "col", style: { width: 48 }, "aria-label": "Select" }),
    visibleColumns.map((col) => /* @__PURE__ */ jsxs(
      "th",
      {
        scope: "col",
        className: cls(
          col.align === "center" && "text-center",
          col.align === "right" && "text-end",
          col.sortable && "table-sortable"
        ),
        style: {
          width: typeof col.width === "number" ? `${col.width}px` : col.width,
          minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
        },
        tabIndex: col.sortable ? 0 : void 0,
        onClick: () => col.sortable && onSort(col.key),
        onKeyDown: (e) => {
          if (!col.sortable)
            return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSort(col.key);
          }
        },
        "aria-sort": col.sortable && sortState.key === col.key ? sortState.dir === "asc" ? "ascending" : sortState.dir === "desc" ? "descending" : "none" : void 0,
        children: [
          col.headerRender ? col.headerRender(col) : col.header,
          col.sortable && /* @__PURE__ */ jsx("span", { className: "table-sort-icon", "aria-hidden": true, children: sortState.key !== col.key || !sortState.dir ? " \u2195" : sortState.dir === "asc" ? " \u25B2" : " \u25BC" })
        ]
      },
      col.key
    ))
  ] }) });
}

// src/components/molecules/Table/parts/TableRow.tsx
import React from "react";

// src/components/molecules/Table/parts/TableCell.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function TableCell({ align = "left", children }) {
  return /* @__PURE__ */ jsx2(
    "td",
    {
      className: cls(
        align === "center" && "text-center",
        align === "right" && "text-end"
      ),
      children
    }
  );
}

// src/components/molecules/Table/parts/TableRow.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function TableRow({
  row,
  rowIndex,
  rowKeyValue,
  selectionMode,
  selected,
  expandable,
  isExpanded,
  visibleColumns,
  onRowClick,
  onToggleSelect,
  onToggleExpand,
  hover = true,
  renderCell
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ jsxs2(React.Fragment, { children: [
    /* @__PURE__ */ jsxs2(
      "tr",
      {
        className: cls(selected && "table-row-selected"),
        onClick: () => {
          onRowClick == null ? void 0 : onRowClick(row, rowIndex);
          if (selectionMode === "single")
            onToggleSelect(rowKeyValue, row);
        },
        style: { cursor: hover || onRowClick ? "pointer" : void 0 },
        children: [
          expandable && /* @__PURE__ */ jsx3("td", { style: { width: 40 }, children: /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              className: cls("table-expand-btn", isExpanded && "table-expand-btn-expanded"),
              "aria-expanded": isExpanded,
              "aria-label": isExpanded ? "Collapse row details" : "Expand row details",
              onClick: (e) => {
                e.stopPropagation();
                onToggleExpand(rowKeyValue);
              },
              children: /* @__PURE__ */ jsx3("span", { className: "table-expand-btn-icon", "aria-hidden": true, children: "\u25B6" })
            }
          ) }),
          selectionMode === "multiple" && /* @__PURE__ */ jsx3("td", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx3(
            Checkbox_default,
            {
              name: "table-row",
              value: rowKeyValue,
              label: "",
              ariaLabel: `Select row ${String((_b = row[(_a = visibleColumns[0]) == null ? void 0 : _a.key]) != null ? _b : rowKeyValue)}`,
              checked: selected,
              onChange: () => onToggleSelect(rowKeyValue, row)
            }
          ) }),
          selectionMode === "single" && /* @__PURE__ */ jsx3("td", { className: "text-center", children: /* @__PURE__ */ jsx3(
            "input",
            {
              type: "radio",
              name: "table-row-select",
              checked: selected,
              onChange: () => onToggleSelect(rowKeyValue, row),
              onClick: (e) => e.stopPropagation(),
              "aria-label": `Select row ${String((_d = row[(_c = visibleColumns[0]) == null ? void 0 : _c.key]) != null ? _d : rowKeyValue)}`
            }
          ) }),
          visibleColumns.map((col) => /* @__PURE__ */ jsx3(TableCell, { align: col.align, children: renderCell(col, row, rowIndex) }, col.key))
        ]
      }
    ),
    expandable && isExpanded && /* @__PURE__ */ jsx3("tr", { className: "table-expanded-row", children: /* @__PURE__ */ jsx3(
      "td",
      {
        colSpan: visibleColumns.length + (selectionMode !== "none" ? 1 : 0) + (expandable ? 1 : 0),
        children: expandable.expandedRowRender(row, rowIndex)
      }
    ) })
  ] });
}

// src/components/molecules/Table/Table.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function getRowKey(row, index, rowKey) {
  var _a, _b;
  if (typeof rowKey === "function")
    return rowKey(row, index);
  if (rowKey && row && typeof row === "object" && rowKey in row) {
    const v = row[rowKey];
    return String(v != null ? v : index);
  }
  const r = row;
  return String((_b = (_a = r == null ? void 0 : r.id) != null ? _a : r == null ? void 0 : r.key) != null ? _b : index);
}
function isNumericLike(value) {
  if (typeof value === "number")
    return Number.isFinite(value);
  if (typeof value !== "string")
    return false;
  const trimmed = value.trim();
  if (!trimmed)
    return false;
  return Number.isFinite(Number(trimmed));
}
function toNumber(value) {
  return typeof value === "number" ? value : Number(String(value).trim());
}
function defaultSorter(a, b, sortType = "auto") {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;
  const shouldUseNumericSort = sortType === "number" || sortType === "auto" && isNumericLike(a) && isNumericLike(b);
  if (shouldUseNumericSort) {
    return toNumber(a) - toNumber(b);
  }
  return String(a).localeCompare(String(b));
}
function TableInner({
  columns,
  data,
  rowKey = "id",
  selectionMode = "none",
  selectedRowKeys,
  selectedRow,
  onSelectionChange,
  onRowSelect,
  onRowClick,
  expandable,
  searchable = true,
  searchPlaceholder = "Search...",
  searchProps,
  searchColumns,
  toolbar,
  toolbarLeft,
  toolbarRight,
  pagination = true,
  loading = false,
  loadingVariant = "overlay",
  loadingRows = 6,
  emptyText = "No data",
  emptyComponent,
  striped = true,
  bordered = false,
  verticalDivider = false,
  hover = true,
  compact = false,
  headerColor = "light",
  customHeaderClass,
  stickyHeader = false,
  scroll,
  className = "",
  footer,
  showSearch,
  size = "md",
  tableLayout = "auto",
  variant = "default",
  theme = "light"
}) {
  var _a, _b, _c, _d;
  const config = tableConfig.default;
  const [searchValue, setSearchValue] = useState("");
  const [sortState, setSortState] = useState({ key: "", dir: null });
  const [currentPage, setCurrentPage] = useState(1);
  const paginationConfig = typeof pagination === "object" ? pagination : {};
  const pageSizeOptions = (_a = paginationConfig.pageSizeOptions) != null ? _a : [5, 10, 15, 25, 50];
  const [itemsPerPage, setItemsPerPage] = useState((_b = paginationConfig.pageSize) != null ? _b : 10);
  const selectedSet = useMemo(() => {
    const keys = selectedRowKeys != null ? selectedRowKeys : selectedRow;
    if (!keys)
      return /* @__PURE__ */ new Set();
    const arr = Array.isArray(keys) ? keys : [keys];
    return new Set(arr);
  }, [selectedRowKeys, selectedRow]);
  const expandedSet = useMemo(() => {
    if (!(expandable == null ? void 0 : expandable.expandedRowKeys))
      return /* @__PURE__ */ new Set();
    return new Set(expandable.expandedRowKeys);
  }, [expandable == null ? void 0 : expandable.expandedRowKeys]);
  const visibleColumns = useMemo(() => columns.filter((c) => !c.hidden), [columns]);
  const filteredData = useMemo(() => {
    if (!searchValue.trim())
      return data;
    const lower = searchValue.toLowerCase();
    const keysToSearch = (searchColumns == null ? void 0 : searchColumns.length) ? searchColumns : visibleColumns.map((c) => c.key);
    return data.filter(
      (row) => keysToSearch.some((k) => {
        const v = row[k];
        return String(v != null ? v : "").toLowerCase().includes(lower);
      })
    );
  }, [data, searchValue, searchColumns, visibleColumns]);
  const sortedData = useMemo(() => {
    var _a2;
    if (!sortState.key || !sortState.dir)
      return filteredData;
    const col = visibleColumns.find((c) => c.key === sortState.key);
    if (!(col == null ? void 0 : col.sortable))
      return filteredData;
    const sorter = (_a2 = col.sorter) != null ? _a2 : (a, b) => {
      var _a3;
      return defaultSorter(
        a[col.key],
        b[col.key],
        (_a3 = col.sortType) != null ? _a3 : "auto"
      );
    };
    const sorted = [...filteredData].sort((a, b) => {
      const v = sorter(a, b, col.key);
      return sortState.dir === "asc" ? v : -v;
    });
    return sorted;
  }, [filteredData, sortState, visibleColumns]);
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination ? sortedData.slice(startIndex, startIndex + itemsPerPage) : sortedData;
  useEffect(() => {
    setCurrentPage((p) => p > totalPages ? totalPages : p < 1 ? 1 : p);
  }, [totalPages]);
  const handleSort = useCallback(
    (key) => {
      const col = visibleColumns.find((c) => c.key === key);
      if (!(col == null ? void 0 : col.sortable))
        return;
      setSortState((prev) => ({
        key,
        dir: prev.key !== key ? "asc" : prev.dir === "asc" ? "desc" : prev.dir === "desc" ? null : "asc"
      }));
    },
    [visibleColumns]
  );
  const handleSelectRow = useCallback(
    (key, row) => {
      if (selectionMode === "single") {
        const keys = [key];
        onSelectionChange == null ? void 0 : onSelectionChange(keys, [row]);
        onRowSelect == null ? void 0 : onRowSelect(key);
      } else if (selectionMode === "multiple") {
        const newSet = new Set(selectedSet);
        if (newSet.has(key))
          newSet.delete(key);
        else
          newSet.add(key);
        const keys = Array.from(newSet);
        const rows = data.filter((r) => keys.includes(getRowKey(r, data.indexOf(r), rowKey)));
        onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
      }
    },
    [selectionMode, selectedSet, data, rowKey, onSelectionChange, onRowSelect]
  );
  const handleSelectAll = useCallback(
    (checked) => {
      if (selectionMode !== "multiple")
        return;
      const keys = checked ? paginatedData.map((r, i) => getRowKey(r, startIndex + i, rowKey)) : [];
      const rows = checked ? paginatedData : [];
      onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
    },
    [selectionMode, paginatedData, startIndex, rowKey, onSelectionChange]
  );
  const allSelected = selectionMode === "multiple" && paginatedData.length > 0 && paginatedData.every((r, i) => selectedSet.has(getRowKey(r, startIndex + i, rowKey)));
  const handleExpand = useCallback(
    (key) => {
      if (!(expandable == null ? void 0 : expandable.onExpandedRowsChange))
        return;
      const newSet = new Set(expandedSet);
      if (newSet.has(key))
        newSet.delete(key);
      else
        newSet.add(key);
      expandable.onExpandedRowsChange(Array.from(newSet));
    },
    [expandable, expandedSet]
  );
  const getHeaderClass = () => customHeaderClass || config.thead[headerColor] || config.thead.light;
  const renderCell = (column, row, rowIndex) => {
    if (column.render) {
      const val2 = row[column.key];
      return column.render(val2, row, rowIndex);
    }
    const val = row[column.key];
    return /* @__PURE__ */ jsx4(TextView_default, { as: "span", children: val != null ? String(val) : "" });
  };
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++)
        pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++)
          pages.push(i);
        pages.push("...");
      } else if (currentPage >= totalPages - 3) {
        pages.push("...");
        for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pages.push(i);
        pages.push("...");
      }
      if (totalPages > 1 && !pages.includes(totalPages))
        pages.push(totalPages);
    }
    return pages;
  };
  const shouldUseSkeleton = loading && loadingVariant === "skeleton";
  const showLoadingOverlay = loading && loadingVariant !== "skeleton";
  const extraColumnsCount = (expandable ? 1 : 0) + (selectionMode !== "none" ? 1 : 0);
  const tableInlineStyle = (scroll == null ? void 0 : scroll.x) ? { minWidth: typeof scroll.x === "number" ? `${scroll.x}px` : scroll.x } : void 0;
  const tableContent = /* @__PURE__ */ jsxs3(
    "table",
    {
      className: cls(
        config.table,
        tableLayout === "fixed" && "table-layout-fixed",
        variant === "minimal" && "table-variant-minimal",
        (bordered || variant === "bordered") && "table-bordered",
        verticalDivider && "table-vertical-divider",
        stickyHeader && "table-sticky-header",
        striped && config.striped,
        hover && config.hover,
        compact && "table-compact",
        size === "sm" && "table-size-sm",
        size === "lg" && "table-size-lg",
        className
      ),
      style: tableInlineStyle,
      children: [
        /* @__PURE__ */ jsx4(
          TableHeader,
          {
            expandable: Boolean(expandable),
            selectionMode,
            allSelected,
            visibleColumns,
            sortState,
            onSort: handleSort,
            onSelectAll: handleSelectAll,
            className: getHeaderClass()
          }
        ),
        /* @__PURE__ */ jsx4("tbody", { className: "table-tbody", children: shouldUseSkeleton ? Array.from({ length: Math.max(1, loadingRows) }).map((_, idx) => /* @__PURE__ */ jsx4("tr", { className: "table-skeleton-row", "aria-hidden": "true", children: Array.from({ length: visibleColumns.length + extraColumnsCount }).map((__, cellIdx) => /* @__PURE__ */ jsx4("td", { children: /* @__PURE__ */ jsx4("div", { className: "table-skeleton-line" }) }, `table-skeleton-cell-${idx}-${cellIdx}`)) }, `table-skeleton-row-${idx}`)) : paginatedData.map((row, idx) => {
          const rk = getRowKey(row, startIndex + idx, rowKey);
          return /* @__PURE__ */ jsx4(
            TableRow,
            {
              row,
              rowIndex: startIndex + idx,
              rowKeyValue: rk,
              selectionMode,
              selected: selectedSet.has(rk),
              expandable,
              isExpanded: expandedSet.has(rk),
              visibleColumns,
              onRowClick,
              onToggleSelect: handleSelectRow,
              onToggleExpand: handleExpand,
              hover,
              renderCell
            },
            rk
          );
        }) }),
        footer && /* @__PURE__ */ jsx4("tfoot", { children: /* @__PURE__ */ jsx4("tr", { children: footer }) })
      ]
    }
  );
  const showSearchBar = searchable && showSearch !== false;
  const showPagination = Boolean(pagination) && totalItems > 0;
  const searchMaxWidth = (_c = searchProps == null ? void 0 : searchProps.maxWidth) != null ? _c : 280;
  const searchSize = (_d = searchProps == null ? void 0 : searchProps.size) != null ? _d : "sm";
  const searchBar = showSearchBar && /* @__PURE__ */ jsx4("div", { style: { marginBottom: 0, maxWidth: typeof searchMaxWidth === "number" ? `${searchMaxWidth}px` : searchMaxWidth, flex: toolbarRight ? "0 1 auto" : "1 1 auto" }, children: /* @__PURE__ */ jsx4(
    TextInputSearch_default,
    {
      leftIcon: search_default,
      leftIconHeight: 18,
      leftIconWidth: 18,
      placeholder: searchPlaceholder,
      value: searchValue,
      onChange: setSearchValue,
      size: searchSize,
      fullWidth: true,
      showClearButton: searchProps == null ? void 0 : searchProps.showClearButton,
      showSearchButton: searchProps == null ? void 0 : searchProps.showSearchButton,
      searchButtonDisplay: searchProps == null ? void 0 : searchProps.searchButtonDisplay,
      searchActionButtonProps: searchProps == null ? void 0 : searchProps.searchActionButtonProps
    }
  ) });
  const leftContent = toolbarLeft != null ? toolbarLeft : showSearchBar ? searchBar : null;
  const hasToolbar = toolbar || leftContent || toolbarRight;
  const toolbarContent = toolbar != null ? toolbar : hasToolbar ? /* @__PURE__ */ jsxs3("div", { className: "table-toolbar", children: [
    leftContent && /* @__PURE__ */ jsx4("div", { className: "table-toolbar-left", children: leftContent }),
    toolbarRight && /* @__PURE__ */ jsx4("div", { className: "table-toolbar-right", children: toolbarRight })
  ] }) : null;
  const wrapperClass = cls("table-wrapper", theme === "dark" && "table-theme-dark");
  const scrollWrapperStyle = (scroll == null ? void 0 : scroll.y) ? {
    maxHeight: typeof scroll.y === "number" ? `${scroll.y}px` : scroll.y,
    overflowY: "auto",
    overflowX: "auto"
  } : { overflowX: "auto" };
  return /* @__PURE__ */ jsxs3("div", { className: wrapperClass, style: { position: "relative" }, "aria-busy": loading, children: [
    toolbarContent,
    showLoadingOverlay && /* @__PURE__ */ jsx4(
      "div",
      {
        className: "table-loading-overlay",
        role: "status",
        "aria-live": "polite",
        "aria-busy": "true",
        children: /* @__PURE__ */ jsx4(TextView_default, { children: "Loading..." })
      }
    ),
    /* @__PURE__ */ jsx4(
      "div",
      {
        className: cls(stickyHeader && "table-scroll-body", "table-scroll-wrapper"),
        style: scrollWrapperStyle,
        role: "region",
        "aria-label": "Data table",
        children: sortedData.length === 0 && !loading ? emptyComponent != null ? emptyComponent : /* @__PURE__ */ jsx4("div", { className: "table-empty", children: /* @__PURE__ */ jsx4(TextView_default, { as: "p", children: emptyText }) }) : tableContent
      }
    ),
    showPagination && totalPages > 1 && /* @__PURE__ */ jsxs3("div", { className: "table-pagination", children: [
      /* @__PURE__ */ jsxs3("div", { className: "table-pagination-nav", children: [
        /* @__PURE__ */ jsx4(
          "button",
          {
            type: "button",
            className: "table-pagination-btn",
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            "aria-label": "Previous page",
            children: "\u2039"
          }
        ),
        renderPageNumbers().map(
          (page, i) => page === "..." ? /* @__PURE__ */ jsx4("span", { className: "table-pagination-ellipsis", children: "\u2026" }, `ellipsis-${i}`) : /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              className: cls(
                "table-pagination-page",
                currentPage === page && "active"
              ),
              onClick: () => setCurrentPage(page),
              children: page
            },
            page
          )
        ),
        /* @__PURE__ */ jsx4(
          "button",
          {
            type: "button",
            className: "table-pagination-btn",
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            "aria-label": "Next page",
            children: "\u203A"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx4(TextView_default, { as: "small", style: { color: "var(--color-text-secondary)" }, children: "Show" }),
        /* @__PURE__ */ jsx4("div", { style: { minWidth: 70 }, children: /* @__PURE__ */ jsx4(
          Select_default,
          {
            options: pageSizeOptions.map((n) => ({ label: String(n), value: String(n) })),
            value: String(itemsPerPage),
            size: "sm",
            onValueChange: (v) => {
              setItemsPerPage(Number(v));
              setCurrentPage(1);
            }
          }
        ) }),
        /* @__PURE__ */ jsxs3(TextView_default, { as: "small", style: { color: "var(--color-text-secondary)" }, children: [
          "of ",
          totalItems,
          " ",
          totalItems === 1 ? "item" : "items"
        ] })
      ] })
    ] })
  ] });
}
function Table(props) {
  return /* @__PURE__ */ jsx4(TableInner, { ...props });
}

// src/components/molecules/Table/TablePrimitives.tsx
import { forwardRef } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var TableRoot = forwardRef(function TableRoot2({
  className,
  containerClassName,
  scroll = true,
  stickyHeader = false,
  stickyFirstColumn = false,
  maxHeight,
  flush = false,
  children,
  ...rest
}, ref) {
  const table = /* @__PURE__ */ jsx5(
    "table",
    {
      ref,
      className: cls(
        "table-ui",
        stickyHeader && "table-ui--sticky-header",
        stickyFirstColumn && "table-ui--sticky-first-col",
        className
      ),
      ...rest,
      children
    }
  );
  if (!scroll)
    return table;
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: cls("table-ui-wrap", flush && "table-ui-wrap--flush", containerClassName),
      style: maxHeight !== void 0 ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight, overflowY: "auto" } : void 0,
      children: table
    }
  );
});
TableRoot.displayName = "TableRoot";
var TableCaption = forwardRef(
  function TableCaption2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx5("caption", { ref, className: cls("table-ui-caption", className), ...rest });
  }
);
TableCaption.displayName = "TableCaption";
var TableHeader2 = forwardRef(
  function TableHeader3({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx5("thead", { ref, className: cls("table-ui-thead", className), ...rest });
  }
);
TableHeader2.displayName = "TableHeader";
var TableBody = forwardRef(function TableBody2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx5("tbody", { ref, className: cls("table-ui-tbody", className), ...rest });
});
TableBody.displayName = "TableBody";
var TableFooter = forwardRef(
  function TableFooter2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx5("tfoot", { ref, className: cls("table-ui-tfoot", className), ...rest });
  }
);
TableFooter.displayName = "TableFooter";
var TableRow2 = forwardRef(function TableRow3({ className, selected, ...rest }, ref) {
  return /* @__PURE__ */ jsx5(
    "tr",
    {
      ref,
      className: cls("table-ui-tr", selected && "table-ui-tr--selected", className),
      "aria-selected": selected === void 0 ? void 0 : selected,
      "data-state": selected ? "selected" : void 0,
      ...rest
    }
  );
});
TableRow2.displayName = "TableRow";
var TableHead = forwardRef(function TableHead2({ className, scope = "col", casing = "upper", wrap = false, ...rest }, ref) {
  return /* @__PURE__ */ jsx5(
    "th",
    {
      ref,
      className: cls(
        "table-ui-th",
        casing === "none" && "table-ui-th--casing-none",
        wrap && "table-ui-th--wrap",
        className
      ),
      scope,
      ...rest
    }
  );
});
TableHead.displayName = "TableHead";
var TableCell2 = forwardRef(function TableCell3({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx5("td", { ref, className: cls("table-ui-td", className), ...rest });
});
TableCell2.displayName = "TableCell";

// src/components/molecules/Table/index.tsx
var Table2 = Object.assign(Table, {
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader2,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow2,
  Head: TableHead,
  Cell: TableCell2
});
var Table_default = Table2;

export {
  TableRoot,
  TableCaption,
  TableHeader2 as TableHeader,
  TableBody,
  TableFooter,
  TableRow2 as TableRow,
  TableHead,
  TableCell2 as TableCell,
  Table_default
};
//# sourceMappingURL=chunk-IFBDQMRQ.mjs.map