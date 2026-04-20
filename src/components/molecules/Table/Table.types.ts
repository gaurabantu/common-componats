import React from "react";

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  width?: string | number;
  minWidth?: string | number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  /** Custom sort function. If not provided, uses default string/number compare. */
  sorter?: (a: T, b: T, key: string) => number;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Header render (e.g. for filter dropdown) */
  headerRender?: (column: TableColumn<T>) => React.ReactNode;
  /** Hide column (for column visibility toggle) */
  hidden?: boolean;
  /** Fixed column (sticky left/right) */
  fixed?: "left" | "right";
}

export type SelectionMode = "none" | "single" | "multiple";

export type TableLayout = "auto" | "fixed";

export type TableVariant = "default" | "bordered" | "minimal";

/** Theme: light (default) or dark — for dark backgrounds */
export type TableTheme = "light" | "dark";
export type TableLoadingVariant = "overlay" | "skeleton";

/** Props passed to the built-in search input (when searchable) */
export interface TableSearchProps {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  maxWidth?: number | string;
  /** Show clear button when value exists */
  showClearButton?: boolean;
  /** Show search/action button on right */
  showSearchButton?: boolean;
}

export interface TableProps<T = Record<string, unknown>> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Data rows */
  data: T[];
  /** Unique row key field (default: "id") */
  rowKey?: keyof T | ((row: T, index: number) => string);
  /** Selection mode: none, single (radio), multiple (checkbox) */
  selectionMode?: SelectionMode;
  /** Selected row id(s) - string for single, string[] for multiple */
  selectedRowKeys?: string | string[];
  /** @deprecated Use selectedRowKeys. Legacy single selection. */
  selectedRow?: string;
  /** Called when selection changes */
  onSelectionChange?: (keys: string[], rows: T[]) => void;
  /** Legacy: single selection callback */
  onRowSelect?: (rowId: string) => void;
  /** Click row handler */
  onRowClick?: (row: T, index: number) => void;
  /** Expandable: render expanded content */
  expandable?: {
    expandedRowRender: (row: T, index: number) => React.ReactNode;
    expandedRowKeys?: string[];
    onExpandedRowsChange?: (keys: string[]) => void;
    defaultExpandAllRows?: boolean;
  };
  /** Search */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Search input props (placeholder, size, showClearButton, etc.) */
  searchProps?: TableSearchProps;
  /** Search in specific columns only (keys). Empty = all. */
  searchColumns?: string[];
  /** Custom toolbar slot (replaces search bar when provided) */
  toolbar?: React.ReactNode;
  /** Left slot in toolbar (search + filters) */
  toolbarLeft?: React.ReactNode;
  /** Right slot in toolbar (actions, filters) */
  toolbarRight?: React.ReactNode;
  /** Pagination */
  pagination?: boolean | { pageSize?: number; pageSizeOptions?: number[] };
  /** Loading state */
  loading?: boolean;
  /** Loading UI mode: overlay spinner/text or skeleton rows */
  loadingVariant?: TableLoadingVariant;
  /** Skeleton row count (used when loadingVariant="skeleton") */
  loadingRows?: number;
  /** Empty state when no data */
  emptyText?: React.ReactNode;
  /** Custom empty component */
  emptyComponent?: React.ReactNode;
  /** Striped rows */
  striped?: boolean;
  /** Bordered cells */
  bordered?: boolean;
  /** Row hover effect */
  hover?: boolean;
  /** Compact padding */
  compact?: boolean;
  /** Header background */
  headerColor?: "primary" | "secondary" | "light" | "dark" | "success" | "warning" | "danger" | "info";
  customHeaderClass?: string;
  /** Sticky header (scroll body, fixed header) */
  stickyHeader?: boolean;
  /** Max height for scrollable body (enables sticky header) */
  scroll?: { y?: number | string; x?: number | string };
  /** Custom class */
  className?: string;
  /** Footer/summary row */
  footer?: React.ReactNode;
  /** Show/hide search (default true when searchable) */
  showSearch?: boolean;
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Table layout: auto (flexible) vs fixed (fixed column widths) */
  tableLayout?: TableLayout;
  /** Visual variant */
  variant?: TableVariant;
  /** Theme for light/dark backgrounds. Use "dark" on dark surfaces. */
  theme?: TableTheme;
}
