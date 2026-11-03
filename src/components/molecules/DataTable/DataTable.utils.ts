import type { FilterBarValue } from "../FilterBar/FilterBar.types";
import { toValueList } from "../FilterBar/FilterBar.utils";
import type { DataTableColumn, DataTableRow, DataTableSortDirection } from "./DataTable.types";

// ---------------------------------------------------------------------------------------------
// Row keys
// ---------------------------------------------------------------------------------------------

export function resolveRowKey<T extends DataTableRow>(row: T, rowKey: keyof T | ((row: T) => string)): string {
  if (typeof rowKey === "function") return rowKey(row);
  return String(row[rowKey] ?? "");
}

// ---------------------------------------------------------------------------------------------
// Client filtering
// ---------------------------------------------------------------------------------------------

function cellText(value: unknown): string {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(cellText).join(" ");
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  return String(value);
}

/**
 * Default client predicate: search (case-insensitive substring) over `searchKeys`, and every active
 * filter must match `row[filterId]` (array cells match when any element is selected).
 */
export function defaultRowFilter<T extends DataTableRow>(row: T, value: FilterBarValue, searchKeys: string[]): boolean {
  const q = (value.search ?? "").trim().toLowerCase();
  if (q && !searchKeys.some((k) => cellText(row[k]).toLowerCase().includes(q))) return false;
  for (const [id, v] of Object.entries(value.filters ?? {})) {
    const wanted = toValueList(v);
    if (wanted.length === 0) continue;
    const cell = row[id];
    const have = Array.isArray(cell) ? cell.map((c) => String(c)) : [cell == null ? "" : String(cell)];
    if (!wanted.some((w) => have.includes(w))) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------------------------
// Sorting — mirrors Table's built-in comparator and asc → desc → none cycle exactly, so the page
// slice handed to Table is already in Table's order (Table re-sorts it; stable sort = no change).
// ---------------------------------------------------------------------------------------------

function isNumericLike(value: unknown): boolean {
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return Number.isFinite(Number(trimmed));
}

function toNumber(value: unknown): number {
  return typeof value === "number" ? value : Number(String(value).trim());
}

export function compareValues(a: unknown, b: unknown, sortType: "auto" | "string" | "number" = "auto"): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  const numeric = sortType === "number" || (sortType === "auto" && isNumericLike(a) && isNumericLike(b));
  if (numeric) return toNumber(a) - toNumber(b);
  return String(a).localeCompare(String(b));
}

export function nextSortDirection(prevKey: string, prevDir: DataTableSortDirection, key: string): DataTableSortDirection {
  if (prevKey !== key) return "asc";
  if (prevDir === "asc") return "desc";
  if (prevDir === "desc") return null;
  return "asc";
}

export function sortRows<T extends DataTableRow>(
  rows: T[],
  column: DataTableColumn<T> | undefined,
  direction: DataTableSortDirection,
): T[] {
  if (!column || !column.sortable || !direction) return rows;
  const sorter =
    column.sorter ?? ((a: T, b: T) => compareValues(a[column.key], b[column.key], column.sortType ?? "auto"));
  return [...rows].sort((a, b) => {
    const v = sorter(a, b, column.key);
    return direction === "asc" ? v : -v;
  });
}

// ---------------------------------------------------------------------------------------------
// Selection — Table only knows the current page; merge its answer into the all-pages selection.
// ---------------------------------------------------------------------------------------------

/**
 * Table reports `keys` = (previous selection ± toggled row) for a row click, and `pageKeys` / `[]`
 * for the header checkbox. Keep off-page keys from `prev`, take on-page membership from `keys`.
 */
export function mergePageSelection(prev: string[], keys: string[], pageKeys: string[]): string[] {
  const page = new Set(pageKeys);
  const next = new Set(keys.filter((k) => page.has(k)));
  const kept = prev.filter((k) => !page.has(k));
  return [...kept, ...pageKeys.filter((k) => next.has(k))];
}

// ---------------------------------------------------------------------------------------------
// CSV export
// ---------------------------------------------------------------------------------------------

/**
 * Leading characters that make spreadsheet apps evaluate a cell as a formula (OWASP CSV injection):
 * = + - @, tab, carriage return, and their full-width forms.
 */
const FORMULA_TRIGGER = /^[=+\-@\t\r\uFF1D\uFF0B\uFF0D\uFF20]/;

export function stringifyCsvValue(value: unknown): string {
  if (value == null) return "";
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  if (Array.isArray(value)) return value.map(stringifyCsvValue).join("; ");
  if (typeof value === "object") {
    try {
      return JSON.stringify(value) ?? "";
    } catch {
      return "";
    }
  }
  return String(value);
}

/**
 * A `;` / full-width `；` followed (after optional whitespace or quote characters) by a trigger.
 * Semicolon-delimited Excel locales split fields there, and a quote that is not at field start is
 * literal, so the text after the separator becomes a field of its own — in any column.
 */
const SEPARATED_TRIGGER = /([;\uFF1B])(?=[\s"]*[=+\-@\t\r\uFF1D\uFF0B\uFF0D\uFF20])/g;

/** True when the cell itself starts with a formula trigger. */
export function hasFormulaTrigger(text: string): boolean {
  return FORMULA_TRIGGER.test(text);
}

/** Insert `'` right after every separator that is followed by a trigger, so no split field starts with one. */
export function neutralizeSeparatedTriggers(text: string): string {
  return text.replace(SEPARATED_TRIGGER, "$1'");
}

/**
 * One RFC 4180 cell, formula-guarded for both comma and semicolon locales:
 * 1. leading trigger → prefix the cell with `'` (comma locales, and the first field in `;` locales);
 * 2. every `;`/`；` followed by a trigger gets a `'` after it (later fields in `;` locales, where the
 *    quoting below is not at field start and therefore does not protect the cell);
 * 3. quote when it contains `"`, `,`, `;`, CR or LF (inner quotes doubled).
 * Real numbers are never changed — `-5` cannot carry a formula.
 */
export function escapeCsvCell(value: unknown): string {
  let text = stringifyCsvValue(value);
  const isNumber = typeof value === "number" || typeof value === "bigint";
  if (!isNumber) {
    if (hasFormulaTrigger(text)) text = `'${text}`;
    text = neutralizeSeparatedTriggers(text);
  }
  // Quote `;` as well so semicolon-delimited locales keep the cell whole where they can.
  if (/[",;\r\n]/.test(text)) text = `"${text.replace(/"/g, '""')}"`;
  return text;
}

/** CSV header text: `csvHeader`, else `header` when it is plain text, else the column key (never element JSON). */
export function csvHeaderText<T>(column: DataTableColumn<T>): string {
  if (typeof column.csvHeader === "string") return column.csvHeader;
  const header: unknown = column.header;
  if (typeof header === "string" || typeof header === "number") return String(header);
  return column.key;
}

/** Header row + one line per row, CRLF line endings. Headers are guarded too. */
export function toCsv<T extends DataTableRow>(columns: DataTableColumn<T>[], rows: T[]): string {
  const header = columns.map((c) => escapeCsvCell(csvHeaderText(c))).join(",");
  const lines = rows.map((row) =>
    columns.map((c) => escapeCsvCell(c.csvValue ? c.csvValue(row) : row[c.key])).join(","),
  );
  return [header, ...lines].join("\r\n");
}

/**
 * Strip bidi overrides/isolates (U+202A–U+202E, U+2066–U+2069 — they can disguise the extension,
 * e.g. "report\u202Efdp.csv"), replace path separators / reserved / control characters, ensure `.csv`.
 */
export function sanitizeCsvFilename(name: string | undefined, fallback = "export"): string {
  const cleaned = (name ?? "")
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_")
    .trim();
  const base = cleaned.replace(/^\.+/, "") || fallback;
  return /\.csv$/i.test(base) ? base : `${base}.csv`;
}

/** Browser download via Blob URL (UTF-8 BOM so Excel detects the encoding). No-op without DOM/Blob URL support. */
export function downloadCsv(csv: string, filename: string): boolean {
  if (typeof document === "undefined" || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
    return false;
  }
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  return true;
}

// ---------------------------------------------------------------------------------------------
// Table markup contract — DataTable patches Table's DOM (region name, scroll owner, select-all
// indeterminate, header sort mirror). Report selectors that no longer match so a Table refactor
// is caught in development instead of silently breaking accessibility.
// ---------------------------------------------------------------------------------------------

export function findMissingTableMarkup(
  host: ParentNode,
  { selectable, hasRows }: { selectable: boolean; hasRows: boolean },
): string[] {
  const missing: string[] = [];
  if (!host.querySelector(".table-wrapper")) missing.push(".table-wrapper");
  if (!host.querySelector(".table-scroll-wrapper")) missing.push(".table-scroll-wrapper");
  if (hasRows) {
    if (!host.querySelector("table thead th")) missing.push("table thead th");
    if (selectable && !host.querySelector('thead input[type="checkbox"]')) missing.push('thead input[type="checkbox"]');
  }
  return missing;
}
