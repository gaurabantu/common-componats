import React, { useMemo, useState, useCallback, useEffect } from "react";
import Select from "../../atoms/Select";
import TextView from "../../atoms/TextView";
import InputSearch from "../../atoms/TextInputSearch";
import {
  TableProps,
  TableColumn,
  SortDirection,
} from "./Table.types";
import { tableConfig } from "./Table.config";
import { cls } from "./Table.utils";
import TableHeader from "./parts/TableHeader";
import TableRow from "./parts/TableRow";
import SearchIcon from "../../../assets/search.svg";
import "./Table.css";

function getRowKey<T>(row: T, index: number, rowKey?: keyof T | ((r: T, i: number) => string)): string {
  if (typeof rowKey === "function") return rowKey(row, index);
  if (rowKey && row && typeof row === "object" && rowKey in row) {
    const v = (row as Record<string, unknown>)[rowKey as string];
    return String(v ?? index);
  }
  const r = row as Record<string, unknown>;
  return String(r?.id ?? r?.key ?? index);
}

function defaultSorter(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}

function TableInner<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = "id" as keyof T,
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
  theme = "light",
}: TableProps<T>) {
  const config = tableConfig.default;
  const [searchValue, setSearchValue] = useState("");
  const [sortState, setSortState] = useState<{ key: string; dir: SortDirection }>({ key: "", dir: null });
  const [currentPage, setCurrentPage] = useState(1);

  const paginationConfig = typeof pagination === "object" ? pagination : {};
  const pageSizeOptions = paginationConfig.pageSizeOptions ?? [5, 10, 15, 25, 50];
  const [itemsPerPage, setItemsPerPage] = useState(paginationConfig.pageSize ?? 10);

  const selectedSet = useMemo(() => {
    const keys = selectedRowKeys ?? selectedRow;
    if (!keys) return new Set<string>();
    const arr = Array.isArray(keys) ? keys : [keys];
    return new Set(arr);
  }, [selectedRowKeys, selectedRow]);

  const expandedSet = useMemo(() => {
    if (!expandable?.expandedRowKeys) return new Set<string>();
    return new Set(expandable.expandedRowKeys);
  }, [expandable?.expandedRowKeys]);

  const visibleColumns = useMemo(() => columns.filter((c) => !c.hidden), [columns]);

  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return data;
    const lower = searchValue.toLowerCase();
    const keysToSearch = searchColumns?.length ? searchColumns : visibleColumns.map((c) => c.key);
    return data.filter((row) =>
      keysToSearch.some((k) => {
        const v = (row as Record<string, unknown>)[k];
        return String(v ?? "").toLowerCase().includes(lower);
      })
    );
  }, [data, searchValue, searchColumns, visibleColumns]);

  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.dir) return filteredData;
    const col = visibleColumns.find((c) => c.key === sortState.key);
    if (!col?.sortable) return filteredData;
    const sorter = col.sorter ?? ((a, b) => defaultSorter((a as Record<string, unknown>)[col.key], (b as Record<string, unknown>)[col.key]));
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
    setCurrentPage((p) => (p > totalPages ? totalPages : p < 1 ? 1 : p));
  }, [totalPages]);

  const handleSort = useCallback(
    (key: string) => {
      const col = visibleColumns.find((c) => c.key === key);
      if (!col?.sortable) return;
      setSortState((prev) => ({
        key,
        dir:
          prev.key !== key ? "asc" : prev.dir === "asc" ? "desc" : prev.dir === "desc" ? null : "asc",
      }));
    },
    [visibleColumns]
  );

  const handleSelectRow = useCallback(
    (key: string, row: T) => {
      if (selectionMode === "single") {
        const keys = [key];
        onSelectionChange?.(keys, [row]);
        onRowSelect?.(key);
      } else if (selectionMode === "multiple") {
        const newSet = new Set(selectedSet);
        if (newSet.has(key)) newSet.delete(key);
        else newSet.add(key);
        const keys = Array.from(newSet);
        const rows = data.filter((r) => keys.includes(getRowKey(r, data.indexOf(r), rowKey)));
        onSelectionChange?.(keys, rows);
      }
    },
    [selectionMode, selectedSet, data, rowKey, onSelectionChange, onRowSelect]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (selectionMode !== "multiple") return;
      const keys = checked ? paginatedData.map((r, i) => getRowKey(r, startIndex + i, rowKey)) : [];
      const rows = checked ? paginatedData : [];
      onSelectionChange?.(keys, rows);
    },
    [selectionMode, paginatedData, startIndex, rowKey, onSelectionChange]
  );

  const allSelected =
    selectionMode === "multiple" &&
    paginatedData.length > 0 &&
    paginatedData.every((r, i) => selectedSet.has(getRowKey(r, startIndex + i, rowKey)));

  const handleExpand = useCallback(
    (key: string) => {
      if (!expandable?.onExpandedRowsChange) return;
      const newSet = new Set(expandedSet);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      expandable.onExpandedRowsChange(Array.from(newSet));
    },
    [expandable, expandedSet]
  );

  const getHeaderClass = () => customHeaderClass || config.thead[headerColor] || config.thead.light;

  const renderCell = (column: TableColumn<T>, row: T, rowIndex: number) => {
    if (column.render) {
      const val = (row as Record<string, unknown>)[column.key];
      return column.render(val, row, rowIndex);
    }
    const val = (row as Record<string, unknown>)[column.key];
    return <TextView as="span">{val != null ? String(val) : ""}</TextView>;
  };

  const renderPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) pages.push(i);
        pages.push("...");
      } else if (currentPage >= totalPages - 3) {
        pages.push("...");
        for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++) pages.push(i);
      } else {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
      }
      if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  const shouldUseSkeleton = loading && loadingVariant === "skeleton";
  const showLoadingOverlay = loading && loadingVariant !== "skeleton";
  const extraColumnsCount = (expandable ? 1 : 0) + (selectionMode !== "none" ? 1 : 0);
  const tableInlineStyle: React.CSSProperties | undefined = scroll?.x
    ? { minWidth: typeof scroll.x === "number" ? `${scroll.x}px` : scroll.x }
    : undefined;

  const tableContent = (
    <table
      className={cls(
        config.table,
        tableLayout === "fixed" && "table-layout-fixed",
        variant === "minimal" && "table-variant-minimal",
        (bordered || variant === "bordered") && "table-bordered",
        stickyHeader && "table-sticky-header",
        striped && config.striped,
        hover && config.hover,
        compact && "table-compact",
        size === "sm" && "table-size-sm",
        size === "lg" && "table-size-lg",
        className
      )}
      style={tableInlineStyle}
    >
      <TableHeader
        expandable={Boolean(expandable)}
        selectionMode={selectionMode}
        allSelected={allSelected}
        visibleColumns={visibleColumns}
        sortState={sortState}
        onSort={handleSort}
        onSelectAll={handleSelectAll}
        className={getHeaderClass()}
      />
      <tbody className="table-tbody">
        {shouldUseSkeleton
          ? Array.from({ length: Math.max(1, loadingRows) }).map((_, idx) => (
              <tr key={`table-skeleton-row-${idx}`} className="table-skeleton-row" aria-hidden="true">
                {Array.from({ length: visibleColumns.length + extraColumnsCount }).map((__, cellIdx) => (
                  <td key={`table-skeleton-cell-${idx}-${cellIdx}`}>
                    <div className="table-skeleton-line" />
                  </td>
                ))}
              </tr>
            ))
          : paginatedData.map((row, idx) => {
              const rk = getRowKey(row, startIndex + idx, rowKey);
              return (
                <TableRow
                  key={rk}
                  row={row}
                  rowIndex={startIndex + idx}
                  rowKeyValue={rk}
                  selectionMode={selectionMode}
                  selected={selectedSet.has(rk)}
                  expandable={expandable}
                  isExpanded={expandedSet.has(rk)}
                  visibleColumns={visibleColumns}
                  onRowClick={onRowClick}
                  onToggleSelect={handleSelectRow}
                  onToggleExpand={handleExpand}
                  hover={hover}
                  renderCell={renderCell}
                />
              );
            })}
      </tbody>
      {footer && (
        <tfoot>
          <tr>{footer}</tr>
        </tfoot>
      )}
    </table>
  );

  const showSearchBar = searchable && showSearch !== false;
  const showPagination = Boolean(pagination) && totalItems > 0;
  const searchMaxWidth = searchProps?.maxWidth ?? 280;
  const searchSize = searchProps?.size ?? "sm";

  const searchBar = showSearchBar && (
    <div style={{ marginBottom: 0, maxWidth: typeof searchMaxWidth === "number" ? `${searchMaxWidth}px` : searchMaxWidth, flex: toolbarRight ? "0 1 auto" : "1 1 auto" }}>
      <InputSearch
        leftIcon={SearchIcon}
        leftIconHeight={18}
        leftIconWidth={18}
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={setSearchValue}
        size={searchSize}
        fullWidth
        showClearButton={searchProps?.showClearButton}
        showSearchButton={searchProps?.showSearchButton}
      />
    </div>
  );

  const leftContent = toolbarLeft ?? (showSearchBar ? searchBar : null);
  const hasToolbar = toolbar || leftContent || toolbarRight;
  const toolbarContent =
    toolbar ??
    (hasToolbar ? (
      <div className="table-toolbar">
        {leftContent && <div className="table-toolbar-left">{leftContent}</div>}
        {toolbarRight && <div className="table-toolbar-right">{toolbarRight}</div>}
      </div>
    ) : null);

  const wrapperClass = cls("table-wrapper", theme === "dark" && "table-theme-dark");
  const scrollWrapperStyle: React.CSSProperties = scroll?.y
    ? {
        maxHeight: typeof scroll.y === "number" ? `${scroll.y}px` : scroll.y,
        overflowY: "auto",
        overflowX: "auto",
      }
    : { overflowX: "auto" };

  return (
    <div className={wrapperClass} style={{ position: "relative" }} aria-busy={loading}>
      {toolbarContent}

      {showLoadingOverlay && (
        <div
          className="table-loading-overlay"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <TextView>Loading...</TextView>
        </div>
      )}

      <div
        className={cls(stickyHeader && "table-scroll-body", "table-scroll-wrapper")}
        style={scrollWrapperStyle}
        role="region"
        aria-label="Data table"
      >
        {sortedData.length === 0 && !loading ? (
          emptyComponent ?? (
            <div className="table-empty">
              <TextView as="p">{emptyText}</TextView>
            </div>
          )
        ) : (
          tableContent
        )}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="table-pagination">
          <div className="table-pagination-nav">
            <button
              type="button"
              className="table-pagination-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            {renderPageNumbers().map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="table-pagination-ellipsis">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  className={cls(
                    "table-pagination-page",
                    currentPage === page && "active"
                  )}
                  onClick={() => setCurrentPage(page as number)}
                >
                  {page}
                </button>
              )
            )}
            <button
              type="button"
              className="table-pagination-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <TextView as="small" style={{ color: "var(--color-text-secondary, #666)" }}>
              Show
            </TextView>
            <div style={{ minWidth: 70 }}>
              <Select
                options={pageSizeOptions.map((n) => ({ label: String(n), value: String(n) }))}
                value={String(itemsPerPage)}
                onValueChange={(v) => {
                  setItemsPerPage(Number(v));
                  setCurrentPage(1);
                }}
              />
            </div>
            <TextView as="small" style={{ color: "var(--color-text-secondary, #666)" }}>
              of {totalItems} {totalItems === 1 ? "item" : "items"}
            </TextView>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Table<T extends Record<string, unknown>>(
  props: TableProps<T>
) {
  return <TableInner {...props} />;
}
