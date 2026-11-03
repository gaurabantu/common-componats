import type { DataTableLabels } from "./DataTable.types";

export const DATA_TABLE_DEFAULTS: {
  defaultPageSize: number;
  pageSizeOptions: number[];
  loadingRows: number;
  hideCaption: boolean;
  bulkActionVariant: "outlineSecondary";
  exportFilename: string;
} = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50],
  loadingRows: 5,
  hideCaption: false,
  bulkActionVariant: "outlineSecondary",
  exportFilename: "export",
};

export const DATA_TABLE_LABELS: DataTableLabels = {
  selectedCount: (count) => `${count} selected`,
  selectionStatus: (count) => (count === 0 ? "Selection cleared" : count === 1 ? "1 row selected" : `${count} rows selected`),
  clearSelection: "Clear",
  clearSelectionAria: "Clear selection",
  bulkActions: "Bulk actions",
  bulkHint: "Select rows to apply bulk actions",
  exportCsv: "Export CSV",
  columns: "Columns",
  columnsLegend: "Show columns",
  loading: "Loading…",
  emptyTitle: "No data yet",
  emptyDescription: "Records will appear here once they are created.",
  noResultsTitle: "No matching results",
  noResultsDescription: "Try a different search or remove some filters.",
  clearFilters: "Clear filters",
  errorTitle: "Couldn't load data",
  errorDescription: "Something went wrong while loading this table. Try again.",
  pagination: "Table pagination",
};
