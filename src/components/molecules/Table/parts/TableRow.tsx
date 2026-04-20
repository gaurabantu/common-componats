import React from "react";
import CheckBox from "../../../atoms/Checkbox";
import { cls } from "../Table.utils";
import { SelectionMode, TableColumn, TableProps } from "../Table.types";
import TableCell from "./TableCell";

type TableRowProps<T extends Record<string, unknown>> = {
  row: T;
  rowIndex: number;
  rowKeyValue: string;
  selectionMode: SelectionMode;
  selected: boolean;
  expandable?: TableProps<T>["expandable"];
  isExpanded: boolean;
  visibleColumns: TableColumn<T>[];
  onRowClick?: (row: T, index: number) => void;
  onToggleSelect: (key: string, row: T) => void;
  onToggleExpand: (key: string) => void;
  hover?: boolean;
  renderCell: (column: TableColumn<T>, row: T, rowIndex: number) => React.ReactNode;
};

export default function TableRow<T extends Record<string, unknown>>({
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
  renderCell,
}: TableRowProps<T>) {
  return (
    <React.Fragment>
      <tr
        className={cls(selected && "table-row-selected")}
        onClick={() => {
          onRowClick?.(row, rowIndex);
          if (selectionMode === "single") onToggleSelect(rowKeyValue, row);
        }}
        style={{ cursor: hover || onRowClick ? "pointer" : undefined }}
      >
        {expandable && (
          <td style={{ width: 40 }}>
            <button
              type="button"
              className={cls("table-expand-btn", isExpanded && "table-expand-btn-expanded")}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse row details" : "Expand row details"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(rowKeyValue);
              }}
            >
              <span className="table-expand-btn-icon" aria-hidden>
                ▶
              </span>
            </button>
          </td>
        )}

        {selectionMode === "multiple" && (
          <td onClick={(e) => e.stopPropagation()}>
            <CheckBox
              name="table-row"
              value={rowKeyValue}
              label=""
              ariaLabel={`Select row ${String((row as Record<string, unknown>)[visibleColumns[0]?.key] ?? rowKeyValue)}`}
              checked={selected}
              onChange={() => onToggleSelect(rowKeyValue, row)}
            />
          </td>
        )}

        {selectionMode === "single" && (
          <td className="text-center">
            <input
              type="radio"
              name="table-row-select"
              checked={selected}
              onChange={() => onToggleSelect(rowKeyValue, row)}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Select row ${String((row as Record<string, unknown>)[visibleColumns[0]?.key] ?? rowKeyValue)}`}
            />
          </td>
        )}

        {visibleColumns.map((col) => (
          <TableCell key={col.key} align={col.align}>
            {renderCell(col, row, rowIndex)}
          </TableCell>
        ))}
      </tr>

      {expandable && isExpanded && (
        <tr className="table-expanded-row">
          <td
            colSpan={
              visibleColumns.length +
              (selectionMode !== "none" ? 1 : 0) +
              (expandable ? 1 : 0)
            }
          >
            {expandable.expandedRowRender(row, rowIndex)}
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}
