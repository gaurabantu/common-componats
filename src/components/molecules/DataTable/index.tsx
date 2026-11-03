"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import Table from "../Table";
import FilterBar from "../FilterBar";
import Pagination from "../Pagination";
import { EmptyState, ErrorState } from "../FeedbackStates";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import Button from "../../atoms/Button";
import Checkbox from "../../atoms/Checkbox";
import type { FilterBarValue } from "../FilterBar/FilterBar.types";
import { hasActiveFilterValue } from "../FilterBar/FilterBar.utils";
import { DATA_TABLE_DEFAULTS, DATA_TABLE_LABELS } from "./DataTable.config";
import type {
  DataTableColumn,
  DataTableExportOptions,
  DataTableLabels,
  DataTableProps,
  DataTableRow,
  DataTableSort,
} from "./DataTable.types";
import {
  defaultRowFilter,
  downloadCsv,
  mergePageSelection,
  nextSortDirection,
  resolveRowKey,
  sanitizeCsvFilename,
  findMissingTableMarkup,
  sortRows,
  toCsv,
} from "./DataTable.utils";
import "./DataTable.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

const EMPTY_FILTER_VALUE: FilterBarValue = { search: "", filters: {} };
/** How long the one-shot "Selection cleared" text stays in the live region. */
const SELECTION_NOTE_MS = 1500;

function isDevelopment(): boolean {
  return typeof process !== "undefined" && process.env?.NODE_ENV !== "production";
}
const NO_SORT: DataTableSort = { key: "", direction: null };

function ColumnsIcon() {
  return (
    <svg className="ds-data-table__tool-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 4v12M12 4v12" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function initialVisibility<T>(columns: DataTableColumn<T>[]): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const c of columns) out[c.key] = !c.hidden;
  return out;
}

function DataTableInner<T extends DataTableRow>(
  {
    caption,
    hideCaption = DATA_TABLE_DEFAULTS.hideCaption,
    columns,
    data,
    rowKey,
    loading = false,
    error,
    emptyState,
    noResultsState,
    filterBar,
    filterFn,
    pagination,
    defaultPageSize = DATA_TABLE_DEFAULTS.defaultPageSize,
    pageSizeOptions = DATA_TABLE_DEFAULTS.pageSizeOptions,
    paginationAriaLabel,
    selectable = false,
    preserveSelectionOnFilter = false,
    selectedRowKeys,
    onSelectionChange,
    bulkActions,
    columnVisibility,
    onColumnVisibilityChange,
    exportCsv,
    toolbarRight,
    onSortChange,
    className,
    tableClassName,
    labels: labelsProp,
    loadingRows = DATA_TABLE_DEFAULTS.loadingRows,
    expandable,
    ...tableRest
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const labels: DataTableLabels = { ...DATA_TABLE_LABELS, ...labelsProp };
  const base = useId().replace(/:/g, "");
  const captionId = `ds-data-table-caption-${base}`;
  const tableHostRef = useRef<HTMLDivElement | null>(null);
  const serverMode = typeof pagination === "object" && pagination !== null;
  const paged = pagination !== false;

  const getKey = useCallback((row: T) => resolveRowKey(row, rowKey), [rowKey]);

  // ---- Filter value (controlled via filterBar.value, else internal) -------------------------
  const [innerFilter, setInnerFilter] = useState<FilterBarValue>(filterBar?.defaultValue ?? EMPTY_FILTER_VALUE);
  const filterValue: FilterBarValue = filterBar?.value ?? innerFilter;
  const filtersActive = Boolean(filterBar) && hasActiveFilterValue(filterValue);

  // ---- Client paging state --------------------------------------------------------------------
  const [clientPage, setClientPage] = useState(1);
  const [clientPageSize, setClientPageSize] = useState(defaultPageSize);

  const handleFilterChange = (next: FilterBarValue) => {
    if (filterBar?.value === undefined) setInnerFilter(next);
    // Filtering can hide selected rows; clear so bulk actions never hit rows the user cannot see.
    if (!preserveSelectionOnFilter && selection.length > 0) {
      commitSelection([]);
      raiseSelectionNote(labels.selectionStatus(0));
    }
    filterBar?.onChange?.(next);
    setClientPage(1);
  };

  // ---- Column visibility ---------------------------------------------------------------------
  const visibilityControlled = typeof columnVisibility === "object" && columnVisibility !== null;
  const [innerVisibility, setInnerVisibility] = useState<Record<string, boolean>>(() => initialVisibility(columns));
  const visibility = useMemo(() => {
    const seeded = initialVisibility(columns);
    const source = visibilityControlled ? (columnVisibility as Record<string, boolean>) : innerVisibility;
    for (const key of Object.keys(seeded)) if (key in source) seeded[key] = Boolean(source[key]);
    return seeded;
  }, [columns, columnVisibility, innerVisibility, visibilityControlled]);

  const isVisible = (c: DataTableColumn<T>) => (c.hideable === false ? true : visibility[c.key] !== false);
  const tableColumns = useMemo<DataTableColumn<T>[]>(
    () => columns.map((c) => ({ ...c, hidden: c.hideable === false ? false : visibility[c.key] === false })),
    [columns, visibility],
  );
  const visibleColumns = useMemo(() => tableColumns.filter((c) => !c.hidden), [tableColumns]);

  const setColumnVisible = (key: string, visible: boolean) => {
    const next = { ...visibility, [key]: visible };
    if (!visibilityControlled) setInnerVisibility(next);
    onColumnVisibilityChange?.(next);
  };

  // ---- Sort (mirrors Table's internal header state; see DataTable.utils sortRows) -------------
  const [sort, setSort] = useState<DataTableSort>(NO_SORT);
  const sortRef = useRef(sort);
  sortRef.current = sort;

  useEffect(() => {
    // The error state unmounts Table, which resets its internal sort — stay in step.
    if (error) setSort(NO_SORT);
  }, [error]);

  const headerOffset = (expandable ? 1 : 0) + (selectable ? 1 : 0);

  const handleHeaderActivation = (target: EventTarget | null) => {
    const host = tableHostRef.current;
    if (!host || !(target instanceof Element)) return;
    const th = target.closest("th");
    const thead = th?.closest("thead");
    if (!th || !thead || thead.closest("table") !== host.querySelector("table")) return;
    const index = Array.prototype.indexOf.call(th.parentElement?.children ?? [], th) - headerOffset;
    const column = visibleColumns[index];
    if (!column?.sortable) return;
    const prev = sortRef.current;
    const next: DataTableSort = { key: column.key, direction: nextSortDirection(prev.key, prev.direction, column.key) };
    sortRef.current = next;
    setSort(next);
    if (!serverMode) setClientPage(1);
    onSortChange?.(next);
  };

  // ---- Data pipeline ---------------------------------------------------------------------------
  const hasFilterBar = Boolean(filterBar);
  const filteredRows = useMemo(() => {
    if (serverMode || !hasFilterBar) return data;
    const searchKeys = visibleColumns.map((c) => c.key);
    return data.filter((row) => (filterFn ? filterFn(row, filterValue) : defaultRowFilter(row, filterValue, searchKeys)));
  }, [serverMode, hasFilterBar, data, filterFn, filterValue, visibleColumns]);

  const sortColumn = visibleColumns.find((c) => c.key === sort.key);
  const orderedRows = useMemo(
    () => (serverMode ? filteredRows : sortRows(filteredRows, sortColumn, sort.direction)),
    [serverMode, filteredRows, sortColumn, sort.direction],
  );

  const total = serverMode ? (pagination as { total: number }).total : orderedRows.length;
  const pageSize = serverMode ? (pagination as { pageSize: number }).pageSize : clientPageSize;
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const page = serverMode
    ? (pagination as { page: number }).page
    : Math.min(Math.max(1, clientPage), pageCount);

  useEffect(() => {
    if (!serverMode && clientPage !== page) setClientPage(page);
  }, [serverMode, clientPage, page]);

  const pageRows = useMemo(() => {
    if (serverMode || !paged) return orderedRows;
    const start = (page - 1) * pageSize;
    return orderedRows.slice(start, start + pageSize);
  }, [serverMode, paged, orderedRows, page, pageSize]);

  // ---- Selection ----------------------------------------------------------------------------
  const [innerSelection, setInnerSelection] = useState<string[]>([]);
  const selection = selectedRowKeys ?? innerSelection;
  /**
   * One-shot text for the polite region when a filter change cleared the selection. It is wiped as
   * soon as a load starts (otherwise "Loading…" → back to the note re-announces it after every
   * fetch) and after SELECTION_NOTE_MS, so it is announced exactly once.
   */
  const [selectionNote, setSelectionNote] = useState("");
  // One-shot bookkeeping (reset whenever a new note is raised):
  // - `noteSeen`: the note has been in the live region once.
  // - `noteConsumed`: a load started after that, so the note must not come back when it ends.
  // A load starting in the same batch shows "Selection cleared. Loading…" (one announcement).
  const noteSeen = useRef(false);
  const noteConsumed = useRef(false);
  const raiseSelectionNote = (text: string) => {
    noteSeen.current = false;
    noteConsumed.current = false;
    setSelectionNote(text);
  };
  let loadingLiveText = labels.loading;
  let liveSelectionNote = "";
  if (selectionNote) {
    if (loading) {
      if (!noteSeen.current) loadingLiveText = `${selectionNote}. ${labels.loading}`;
      noteSeen.current = true;
      noteConsumed.current = true;
    } else if (!noteConsumed.current) {
      liveSelectionNote = selectionNote;
      noteSeen.current = true;
    }
  }
  useEffect(() => {
    if (!loading && noteConsumed.current && selectionNote) setSelectionNote("");
  }, [loading, selectionNote]);
  useEffect(() => {
    if (!selectionNote) return;
    const t = setTimeout(() => setSelectionNote(""), SELECTION_NOTE_MS);
    return () => clearTimeout(t);
  }, [selectionNote]);
  // Rows seen so far, so server-mode selections on other pages still resolve to row objects.
  const rowCache = useRef(new Map<string, T>());
  for (const row of data) rowCache.current.set(getKey(row), row);
  if (rowCache.current.size > data.length + selection.length * 2 + 100) {
    const keep = new Set([...selection, ...data.map(getKey)]);
    for (const k of Array.from(rowCache.current.keys())) if (!keep.has(k)) rowCache.current.delete(k);
  }

  const commitSelection = (keys: string[]) => {
    if (keys.length > 0) setSelectionNote("");
    if (selectedRowKeys === undefined) setInnerSelection(keys);
    const rows = keys.map((k) => rowCache.current.get(k)).filter((r): r is T => r !== undefined);
    onSelectionChange?.(keys, rows);
  };

  const pageKeys = pageRows.map(getKey);
  const handleTableSelection = (keys: string[]) => {
    commitSelection(mergePageSelection(selection, keys, pageKeys));
  };

  const clearSelection = () => {
    commitSelection([]);
  };

  const clearSelectionAndFocus = () => {
    clearSelection();
    // The bulk bar (and this button) unmounts — land on the header "select all" checkbox.
    requestAnimationFrame(() => {
      tableHostRef.current?.querySelector<HTMLInputElement>('thead input[type="checkbox"]')?.focus();
    });
  };

  const selectedRows = selection.map((k) => rowCache.current.get(k)).filter((r): r is T => r !== undefined);

  // ---- Caption → accessible name; one keyboard-reachable scroll region -----------------------
  // Table has no caption / aria-label prop, hard-codes aria-label="Data table" on its scroll
  // region and never makes it focusable. Default: our wrapper owns horizontal scrolling (CSS lets
  // Table's wrapper grow to the table width) and Table's region is demoted. With `scroll.y` Table
  // must scroll vertically itself, so its region stays the landmark and is made focusable instead.
  const tableOwnsScroll = Boolean(tableRest.scroll?.y);
  const markupWarned = useRef(false);
  useLayoutEffect(() => {
    const host = tableHostRef.current;
    if (!host) return;
    const region = host.querySelector(".table-scroll-wrapper");
    if (region) {
      if (tableOwnsScroll) {
        region.setAttribute("role", "region");
        region.removeAttribute("aria-label");
        region.setAttribute("aria-labelledby", captionId);
        region.setAttribute("tabindex", "0");
        region.classList.add("ds-data-table__inner-scroll");
      } else {
        region.setAttribute("role", "presentation");
        region.removeAttribute("aria-label");
        region.removeAttribute("aria-labelledby");
        region.removeAttribute("tabindex");
        region.classList.remove("ds-data-table__inner-scroll");
      }
    }
    region?.querySelector("table")?.setAttribute("aria-labelledby", captionId);

    // Table's header "select all" has no indeterminate prop. Show the partial state when some rows
    // are selected but not the whole current page: the DOM property exposes aria "mixed", and the
    // Checkbox atom draws its dash from `data-indeterminate`. Re-applied every render because the
    // Checkbox resets the property in its own layout effect (children run first).
    const selectAll = host.querySelector<HTMLInputElement>('thead input[type="checkbox"]');
    if (selectAll) {
      const selected = new Set(selection);
      const onPage = pageKeys.filter((k) => selected.has(k)).length;
      const mixed = selection.length > 0 && pageKeys.length > 0 && onPage < pageKeys.length;
      selectAll.indeterminate = mixed;
      if (mixed) selectAll.setAttribute("data-indeterminate", "true");
      else selectAll.removeAttribute("data-indeterminate");
    }

    // Dev-only: warn once if Table's markup no longer matches the selectors patched above.
    if (!markupWarned.current && isDevelopment()) {
      const missing = findMissingTableMarkup(host, { selectable, hasRows: !loading && pageRows.length > 0 });
      if (missing.length > 0) {
        markupWarned.current = true;
        console.warn(
          `[DataTable] Table markup changed — selectors not found: ${missing.join(", ")}. ` +
            "Caption naming, the scroll region, select-all indeterminate or the sort mirror may be broken.",
        );
      }
    }
  });

  // ---- Export -------------------------------------------------------------------------------
  const exportOptions: DataTableExportOptions | null =
    exportCsv === true ? {} : exportCsv && typeof exportCsv === "object" ? exportCsv : null;

  const handleExport = () => {
    if (!exportOptions) return;
    const cols = visibleColumns.filter((c) => c.exportable !== false);
    const csv = toCsv(cols, orderedRows);
    const fallback = typeof caption === "string" && caption.trim() ? caption : DATA_TABLE_DEFAULTS.exportFilename;
    const filename = sanitizeCsvFilename(exportOptions.filename ?? fallback, DATA_TABLE_DEFAULTS.exportFilename);
    if (exportOptions.onExport) exportOptions.onExport(csv, filename);
    else downloadCsv(csv, filename);
  };

  // ---- Toolbar -----------------------------------------------------------------------------
  const [columnsOpen, setColumnsOpen] = useState(false);

  const columnMenu = columnVisibility ? (
    <Popover key="columns" open={columnsOpen} onOpenChange={setColumnsOpen} placement="bottom-end">
      <PopoverTrigger className="ds-data-table__tool">
        <ColumnsIcon />
        <span>{labels.columns}</span>
      </PopoverTrigger>
      <PopoverContent showPointer={false} className="ds-data-table__menu">
        <fieldset className="ds-data-table__fieldset">
          <legend className="ds-data-table__legend">{labels.columnsLegend}</legend>
          <div className="ds-data-table__checks">
            {columns.map((c) => {
              const checked = isVisible(c);
              const locked = c.hideable === false || (checked && visibleColumns.length <= 1);
              return (
                <Checkbox
                  key={c.key}
                  id={`ds-data-table-${base}-col-${c.key}`}
                  name={`ds-data-table-${base}-columns`}
                  value={c.key}
                  label={c.header}
                  checked={checked}
                  disabled={locked}
                  onChange={() => setColumnVisible(c.key, !checked)}
                />
              );
            })}
          </div>
        </fieldset>
      </PopoverContent>
    </Popover>
  ) : null;

  const exportButton = exportOptions ? (
    <Button key="export" type="button" variant="outlineSecondary" size="lg" onClick={handleExport} disabled={loading}>
      {exportOptions.label ?? labels.exportCsv}
    </Button>
  ) : null;

  const toolItems = [filterBar?.extra, toolbarRight, columnMenu, exportButton].filter(Boolean);
  const tools = toolItems.length > 0 ? <>{toolItems.map((n, i) => <React.Fragment key={i}>{n}</React.Fragment>)}</> : undefined;

  // ---- States -------------------------------------------------------------------------------
  const clearFilters = () => handleFilterChange({ ...filterValue, search: "", filters: {} });

  const emptyNode = filtersActive
    ? noResultsState ?? (
        <EmptyState
          compact
          title={labels.noResultsTitle}
          description={labels.noResultsDescription}
          action={
            <Button type="button" variant="outlineSecondary" size="md" onClick={clearFilters}>
              {labels.clearFilters}
            </Button>
          }
        />
      )
    : emptyState ?? <EmptyState compact title={labels.emptyTitle} description={labels.emptyDescription} />;

  const paginationLabel =
    paginationAriaLabel ?? (typeof caption === "string" && caption.trim() ? `${caption} pagination` : labels.pagination);

  const showPagination = paged && !error && total > 0;
  // Keep the last settled count while loading, so an unchanged count is not re-announced.
  const lastResultCount = useRef<number | undefined>(undefined);
  if (!loading && !error) lastResultCount.current = total;

  const setRootRef = (el: HTMLDivElement | null) => {
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  const {
    extra: _filterExtra,
    value: _fv,
    onChange: _fc,
    defaultValue: _fd,
    resultCount: filterResultCount,
    ...filterBarRest
  } = filterBar ?? ({} as NonNullable<typeof filterBar>);

  return (
    <div
      ref={setRootRef}
      className={cls("ds-data-table", className)}
      data-loading={loading ? "true" : undefined}
      data-error={error ? "true" : undefined}
    >
      <div id={captionId} className={cls("ds-data-table__caption", hideCaption && "visually-hidden")}>
        {caption}
      </div>

      {filterBar ? (
        <FilterBar
          {...filterBarRest}
          value={filterValue}
          onChange={handleFilterChange}
          resultCount={filterResultCount ?? (error ? undefined : loading ? lastResultCount.current : total)}
          extra={tools}
        />
      ) : tools ? (
        <div className="ds-data-table__toolbar">{tools}</div>
      ) : null}

      {/* Bulk bar slot: always mounted with a reserved height so selecting rows never moves them. */}
      {selectable ? (
        <div className="ds-data-table__bulk-slot" data-active={selection.length > 0 ? "true" : "false"}>
          {selection.length > 0 ? (
        <div className="ds-data-table__bulk" role="group" aria-label={labels.bulkActions}>
          <span className="ds-data-table__bulk-count">{labels.selectedCount(selection.length)}</span>
          <span className="ds-data-table__bulk-sep" aria-hidden="true">
            ·
          </span>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            ariaLabel={labels.clearSelectionAria}
            onClick={clearSelectionAndFocus}
          >
            {labels.clearSelection}
          </Button>
          {bulkActions && bulkActions.length > 0 ? (
            <div className="ds-data-table__bulk-actions">
              {bulkActions.map((action) => (
                <Button
                  key={action.label}
                  type="button"
                  size="lg"
                  variant={action.variant ?? DATA_TABLE_DEFAULTS.bulkActionVariant}
                  disabled={action.disabled}
                  onClick={() => action.onClick(selectedRows, { clearSelection })}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
          ) : (
            <p className="ds-data-table__bulk-hint">{labels.bulkHint}</p>
          )}
        </div>
      ) : null}

      {/* Always mounted so changes (not the initial state) are announced. */}
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {loading
          ? loadingLiveText
          : selectable && selection.length > 0
            ? labels.selectionStatus(selection.length)
            : liveSelectionNote}
      </p>

      {error ? (
        <div className="ds-data-table__state">
          <ErrorState
            compact
            title={error.title ?? labels.errorTitle}
            description={error.description ?? labels.errorDescription}
            onRetry={error.onRetry}
          />
        </div>
      ) : (
        <div
          ref={tableHostRef}
          className="ds-data-table__table"
          // Horizontal scroll container: focusable so keyboard users can scroll wide tables (WCAG 2.1.1).
          role={tableOwnsScroll ? undefined : "region"}
          aria-labelledby={tableOwnsScroll ? undefined : captionId}
          tabIndex={tableOwnsScroll ? undefined : 0}
          data-scroll-owner={tableOwnsScroll ? "table" : "self"}
          onClick={(e) => handleHeaderActivation(e.target)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleHeaderActivation(e.target);
          }}
        >
          <Table<T>
            {...tableRest}
            expandable={expandable}
            className={tableClassName}
            columns={tableColumns}
            data={pageRows}
            rowKey={(row: T) => getKey(row)}
            selectionMode={selectable ? "multiple" : "none"}
            selectedRowKeys={selection}
            onSelectionChange={(keys) => handleTableSelection(keys)}
            searchable={false}
            pagination={false}
            loading={loading}
            loadingVariant="skeleton"
            loadingRows={loadingRows}
            emptyComponent={<div className="ds-data-table__state">{emptyNode}</div>}
          />
        </div>
      )}

      {showPagination ? (
        <Pagination
          className="ds-data-table__pagination"
          ariaLabel={paginationLabel}
          page={page}
          pageSize={pageSize}
          totalItems={total}
          showTotal
          disabled={loading}
          onPageChange={(next) => {
            if (serverMode) (pagination as { onPageChange: (p: number) => void }).onPageChange(next);
            else setClientPage(next);
          }}
          pageSizeOptions={serverMode ? (pagination as { pageSizeOptions?: number[] }).pageSizeOptions ?? pageSizeOptions : pageSizeOptions}
          onPageSizeChange={
            serverMode
              ? (pagination as { onPageSizeChange?: (n: number) => void }).onPageSizeChange
              : (n) => {
                  setClientPageSize(n);
                  setClientPage(1);
                }
          }
        />
      ) : null}
    </div>
  );
}

/**
 * DataTable — page-level data grid: `Table` + `FilterBar` + `Pagination` + empty / error states,
 * selection with a bulk action bar, column visibility and CSV export.
 */
export const DataTable = React.forwardRef(DataTableInner) as (<T extends DataTableRow = DataTableRow>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null) & { displayName?: string };

DataTable.displayName = "DataTable";

export default DataTable;
export type {
  DataTableProps,
  DataTableColumn,
  DataTableRow,
  DataTableServerPagination,
  DataTableSort,
  DataTableSortDirection,
  DataTableBulkAction,
  DataTableBulkActionHelpers,
  DataTableError,
  DataTableExportOptions,
  DataTableFilterBarProps,
  DataTableLabels,
} from "./DataTable.types";
export { toCsv, escapeCsvCell } from "./DataTable.utils";
