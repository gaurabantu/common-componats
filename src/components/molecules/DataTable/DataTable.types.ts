import type { ReactNode } from "react";
import type { TableColumn, TableProps } from "../Table/Table.types";
import type { ButtonProps } from "../../atoms/Button/Button.types";
import type { FilterBarProps, FilterBarValue } from "../FilterBar/FilterBar.types";

export type DataTableRow = Record<string, unknown>;

export interface DataTableColumn<T = DataTableRow> extends TableColumn<T> {
  /** Can be turned off in the column-visibility menu. @default true */
  hideable?: boolean;
  /** Included in CSV export (when visible). @default true */
  exportable?: boolean;
  /** CSV header text. Defaults to `header` when it is a string/number, otherwise the column `key`. */
  csvHeader?: string;
  /** CSV cell value. Defaults to `row[key]` (dates → ISO, arrays → "a; b", objects → JSON). */
  csvValue?: (row: T) => unknown;
}

/** Server-side paging: `data` is already the current page. */
export interface DataTableServerPagination {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export type DataTableSortDirection = "asc" | "desc" | null;

export interface DataTableSort {
  key: string;
  direction: DataTableSortDirection;
}

export interface DataTableBulkActionHelpers {
  clearSelection: () => void;
}

export interface DataTableBulkAction<T = DataTableRow> {
  label: string;
  onClick: (selectedRows: T[], helpers: DataTableBulkActionHelpers) => void;
  /** Button variant. Keep at most one `primary` per bar. @default "outlineSecondary" */
  variant?: ButtonProps["variant"];
  disabled?: boolean;
}

export interface DataTableError {
  /** @default "Couldn't load data" */
  title?: ReactNode;
  description?: ReactNode;
  /** Renders a retry button in the error state. */
  onRetry?: () => void;
}

export interface DataTableExportOptions {
  /** Download name; `.csv` is appended when missing and unsafe characters are replaced. */
  filename?: string;
  /** Button label. @default "Export CSV" */
  label?: string;
  /** Receive the CSV instead of triggering a browser download. */
  onExport?: (csv: string, filename: string) => void;
}

/** `FilterBar` props; `value` / `onChange` are optional — `DataTable` keeps the state when omitted. */
export type DataTableFilterBarProps = Omit<FilterBarProps, "value" | "onChange"> & {
  value?: FilterBarValue;
  onChange?: (next: FilterBarValue) => void;
  /** Initial value when uncontrolled. */
  defaultValue?: FilterBarValue;
};

/** Overridable strings (i18n). */
export interface DataTableLabels {
  /** Visible bulk-bar count, e.g. "3 selected". */
  selectedCount: (count: number) => string;
  /** Live-region text when the selection changes, e.g. "3 rows selected". */
  selectionStatus: (count: number) => string;
  clearSelection: string;
  clearSelectionAria: string;
  bulkActions: string;
  /** Shown in the reserved bulk-bar slot while nothing is selected. */
  bulkHint: string;
  exportCsv: string;
  columns: string;
  columnsLegend: string;
  loading: string;
  emptyTitle: string;
  emptyDescription: string;
  noResultsTitle: string;
  noResultsDescription: string;
  clearFilters: string;
  errorTitle: string;
  errorDescription: string;
  pagination: string;
}

/** `Table` props that `DataTable` owns (it wires them itself). Everything else passes through. */
export type DataTableManagedTableProps =
  | "columns"
  | "data"
  | "rowKey"
  | "selectionMode"
  | "selectedRowKeys"
  | "selectedRow"
  | "onSelectionChange"
  | "onRowSelect"
  | "searchable"
  | "searchPlaceholder"
  | "searchProps"
  | "searchColumns"
  | "showSearch"
  | "toolbar"
  | "toolbarLeft"
  | "toolbarRight"
  | "pagination"
  | "loading"
  | "loadingVariant"
  | "emptyText"
  | "emptyComponent"
  | "className";

export interface DataTableProps<T extends DataTableRow = DataTableRow>
  extends Omit<TableProps<T>, DataTableManagedTableProps> {
  /** Names the table (and its scroll region). Required for accessibility. */
  caption: ReactNode;
  /** Keep the caption for assistive tech only. @default false */
  hideCaption?: boolean;
  columns: DataTableColumn<T>[];
  data: T[];
  /** Stable row id — a field name or a function. */
  rowKey: keyof T | ((row: T) => string);
  /** Skeleton rows; pagination is disabled while loading. */
  loading?: boolean;
  /** Replaces the table with an `ErrorState`. */
  error?: DataTableError | null;
  /** Shown when there is no data and no active search/filter. Defaults to an `EmptyState`. */
  emptyState?: ReactNode;
  /** Shown when search/filters match nothing. Defaults to an `EmptyState` with "Clear filters". */
  noResultsState?: ReactNode;
  /** Renders a `FilterBar` above the table. Client mode filters `data` with it. */
  filterBar?: DataTableFilterBarProps;
  /** Client mode: custom row predicate (default: search over visible columns, filters match `row[filter.id]`). */
  filterFn?: (row: T, value: FilterBarValue) => boolean;
  /**
   * Server-side paging object, `false` for no paging, or omit for client paging.
   * In server mode `data` is used as-is (no client filtering/sorting across pages; listen to `onSortChange`).
   */
  pagination?: DataTableServerPagination | false;
  /** Client paging. @default 10 */
  defaultPageSize?: number;
  /** Client paging. @default [10, 25, 50] */
  pageSizeOptions?: number[];
  /** Name of the pagination landmark. Defaults to "{caption} pagination" when caption is a string. */
  paginationAriaLabel?: string;
  /** Checkbox column + bulk action bar. */
  selectable?: boolean;
  /** Controlled selection (all pages). */
  selectedRowKeys?: string[];
  onSelectionChange?: (keys: string[], rows: T[]) => void;
  /** Keep the selection when search / filters change. Default clears it (and announces "Selection cleared"), because filtered-out rows would stay selected out of view. @default false */
  preserveSelectionOnFilter?: boolean;
  bulkActions?: DataTableBulkAction<T>[];
  /**
   * `true` → column menu with internal state (seeded from `column.hidden`).
   * A record (`{ [columnKey]: visible }`) → controlled; persist it from `onColumnVisibilityChange`.
   */
  columnVisibility?: boolean | Record<string, boolean>;
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
  /** Client-side CSV of the visible, exportable columns (client: every filtered row; server: `data`). */
  exportCsv?: boolean | DataTableExportOptions;
  /** Extra toolbar content (right side). */
  toolbarRight?: ReactNode;
  /** Sort changes from header clicks. Client mode sorts across all pages; server mode should re-fetch. */
  onSortChange?: (sort: DataTableSort) => void;
  /** Class on the DataTable root. */
  className?: string;
  /** Class on the inner `<table>` (Table's `className`). */
  tableClassName?: string;
  labels?: Partial<DataTableLabels>;
}
