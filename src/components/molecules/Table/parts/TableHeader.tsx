import React from "react";
import CheckBox from "../../../atoms/Checkbox";
import { cls } from "../Table.utils";
import { SortDirection, SelectionMode, TableColumn } from "../Table.types";

type TableHeaderProps<T extends Record<string, unknown>> = {
  expandable: boolean;
  selectionMode: SelectionMode;
  allSelected: boolean;
  visibleColumns: TableColumn<T>[];
  sortState: { key: string; dir: SortDirection };
  onSort: (key: string) => void;
  onSelectAll: (checked: boolean) => void;
  className: string;
};

export default function TableHeader<T extends Record<string, unknown>>({
  expandable,
  selectionMode,
  allSelected,
  visibleColumns,
  sortState,
  onSort,
  onSelectAll,
  className,
}: TableHeaderProps<T>) {
  return (
    <thead className={className}>
      <tr>
        {expandable && <th scope="col" style={{ width: 40 }} aria-label="Expand" />}
        {selectionMode === "multiple" && (
          <th scope="col" style={{ width: 48 }} aria-label="Select all">
            <CheckBox
              name="table-select-all"
              value="all"
              label=""
              ariaLabel="Select all rows"
              checked={allSelected}
              onChange={(e) => onSelectAll((e.target as HTMLInputElement).checked)}
            />
          </th>
        )}
        {selectionMode === "single" && <th scope="col" style={{ width: 48 }} aria-label="Select" />}

        {visibleColumns.map((col) => (
          <th
            key={col.key}
            scope="col"
            className={cls(
              col.align === "center" && "text-center",
              col.align === "right" && "text-end",
              col.sortable && "table-sortable"
            )}
            style={{
              width: typeof col.width === "number" ? `${col.width}px` : col.width,
              minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth,
            }}
            tabIndex={col.sortable ? 0 : undefined}
            onClick={() => col.sortable && onSort(col.key)}
            onKeyDown={(e) => {
              if (!col.sortable) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSort(col.key);
              }
            }}
            aria-sort={
              col.sortable && sortState.key === col.key
                ? sortState.dir === "asc"
                  ? "ascending"
                  : sortState.dir === "desc"
                    ? "descending"
                    : "none"
                : undefined
            }
          >
            {col.headerRender ? col.headerRender(col) : col.header}
            {col.sortable && sortState.key === col.key && (
              <span className="table-sort-icon" aria-hidden>
                {sortState.dir === "asc" ? " ▲" : sortState.dir === "desc" ? " ▼" : ""}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
