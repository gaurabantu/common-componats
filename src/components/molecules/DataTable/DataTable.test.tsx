import React, { useState } from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable from "./index";
import type { DataTableColumn, DataTableProps } from "./DataTable.types";
import {
  defaultRowFilter,
  downloadCsv,
  escapeCsvCell,
  mergePageSelection,
  nextSortDirection,
  sanitizeCsvFilename,
  csvHeaderText,
  findMissingTableMarkup,
  sortRows,
  toCsv,
} from "./DataTable.utils";

type Customer = { id: string; name: string; status: string; amount: number; note: string };

const names = ["Ava", "Ben", "Cleo", "Dev", "Eli", "Fay", "Gus", "Hana", "Ivo", "Jun", "Kai", "Lea"];
const rows: Customer[] = names.map((name, i) => ({
  id: `c${i + 1}`,
  name,
  status: i % 3 === 0 ? "paused" : "active",
  // Amounts deliberately not in name order so a global sort differs from a page-local sort.
  amount: [40, 5, 90, 12, 70, 33, 1, 64, 28, 51, 99, 2][i],
  note: `note ${i + 1}`,
}));

const columns: DataTableColumn<Customer>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "status", header: "Status" },
  { key: "amount", header: "Amount", sortable: true, sortType: "number", align: "right" },
  { key: "note", header: "Note" },
];

const statusFilter = {
  id: "status",
  label: "Status",
  type: "select" as const,
  options: [
    { label: "Active", value: "active" },
    { label: "Paused", value: "paused" },
  ],
};

function renderTable(props: Partial<DataTableProps<Customer>> = {}) {
  return render(<DataTable<Customer> caption="Customers" columns={columns} data={rows} rowKey="id" {...props} />);
}

const bodyNames = () =>
  within(screen.getByRole("table", { name: "Customers" }))
    .getAllByRole("row")
    .slice(1)
    .map((r) => within(r).getAllByRole("cell").map((c) => c.textContent)[0]);

const bodyCells = (colIndex: number) =>
  within(screen.getByRole("table", { name: "Customers" }))
    .getAllByRole("row")
    .slice(1)
    .map((r) => within(r).getAllByRole("cell")[colIndex].textContent);

const flushRaf = () =>
  act(async () => {
    await new Promise((r) => requestAnimationFrame(() => r(null)));
  });

describe("DataTable — rendering & a11y", () => {
  it("names the table and its scroll region with the caption", () => {
    renderTable();
    expect(screen.getByRole("table", { name: "Customers" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Customers" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader").map((h) => h.textContent?.replace(/[↕▲▼]/g, "").trim())).toEqual([
      "Name",
      "Status",
      "Amount",
      "Note",
    ]);
  });

  it("can visually hide the caption while keeping the accessible name", () => {
    renderTable({ hideCaption: true });
    expect(screen.getByText("Customers")).toHaveClass("visually-hidden");
    expect(screen.getByRole("table", { name: "Customers" })).toBeInTheDocument();
  });

  it("renders the default EmptyState when there is no data", () => {
    renderTable({ data: [] });
    expect(screen.getByRole("status")).toHaveTextContent("No data yet");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders a custom emptyState", () => {
    renderTable({ data: [], emptyState: <p>Invite your first customer</p> });
    expect(screen.getByText("Invite your first customer")).toBeInTheDocument();
  });

  it("replaces the table with an ErrorState and wires retry", async () => {
    const onRetry = vi.fn();
    renderTable({ error: { title: "Network down", onRetry } });
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Network down");
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("shows skeleton rows, disables pagination and announces loading", () => {
    const { container } = renderTable({ loading: true });
    expect(container.querySelector(".table-wrapper")).toHaveAttribute("aria-busy", "true");
    expect(container.querySelectorAll("tr.table-skeleton-row").length).toBe(5);
    expect(screen.getByText("Loading…")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("renders toolbarRight content", () => {
    renderTable({ toolbarRight: <button type="button">New customer</button> });
    expect(screen.getByRole("button", { name: "New customer" })).toBeInTheDocument();
  });
});

describe("DataTable — client pagination & sorting", () => {
  it("pages the data with Pagination (default page size 10)", async () => {
    renderTable();
    expect(bodyNames()).toHaveLength(10);
    const nav = screen.getByRole("navigation", { name: "Customers pagination" });
    expect(nav).toHaveTextContent("Showing 1–10 of 12");
    await userEvent.click(within(nav).getByRole("button", { name: "Page 2" }));
    expect(bodyNames()).toEqual(["Kai", "Lea"]);
  });

  it("changes page size via the Pagination select", async () => {
    renderTable({ pageSizeOptions: [5, 10] , defaultPageSize: 5 });
    expect(bodyNames()).toHaveLength(5);
    await userEvent.selectOptions(screen.getByLabelText("Rows per page"), "10");
    expect(bodyNames()).toHaveLength(10);
  });

  it("sorts across all pages, not just the current page, and reports onSortChange", async () => {
    const onSortChange = vi.fn();
    renderTable({ onSortChange });
    const amountHeader = screen.getByRole("columnheader", { name: /Amount/ });
    await userEvent.click(amountHeader);
    expect(amountHeader).toHaveAttribute("aria-sort", "ascending");
    expect(bodyCells(2).slice(0, 3)).toEqual(["1", "2", "5"]);
    expect(onSortChange).toHaveBeenLastCalledWith({ key: "amount", direction: "asc" });

    await userEvent.click(amountHeader);
    expect(amountHeader).toHaveAttribute("aria-sort", "descending");
    expect(bodyCells(2)[0]).toBe("99"); // Kai lives on page 2 unsorted
    expect(onSortChange).toHaveBeenLastCalledWith({ key: "amount", direction: "desc" });

    await userEvent.click(amountHeader);
    expect(bodyNames()[0]).toBe("Ava");
    expect(onSortChange).toHaveBeenLastCalledWith({ key: "amount", direction: null });
  });

  it("sorts from the keyboard (Enter on a focused header)", async () => {
    renderTable();
    const nameHeader = screen.getByRole("columnheader", { name: /Name/ });
    nameHeader.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{Enter}");
    expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    expect(bodyNames()[0]).toBe("Lea");
  });

  it("pagination={false} renders every row without a navigation landmark", () => {
    renderTable({ pagination: false });
    expect(bodyNames()).toHaveLength(12);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});

describe("DataTable — filter bar (client mode)", () => {
  it("filters with the select filter, announces the count, and resets to page 1", async () => {
    renderTable({ filterBar: { filters: [statusFilter] } });
    await userEvent.click(screen.getByRole("button", { name: "Page 2" }));
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Status" }), "paused");
    expect(bodyNames()).toEqual(["Ava", "Dev", "Gus", "Jun"]);
    expect(document.querySelector(".ds-filter-bar__count")).toHaveTextContent("4 results");
  });

  it("searches across visible columns (debounce 0)", async () => {
    renderTable({ filterBar: { searchDebounceMs: 0 } });
    await userEvent.type(screen.getByRole("searchbox"), "hana");
    expect(bodyNames()).toEqual(["Hana"]);
  });

  it("shows a no-results EmptyState whose Clear filters action resets", async () => {
    renderTable({ filterBar: { searchDebounceMs: 0 } });
    await userEvent.type(screen.getByRole("searchbox"), "zzz");
    expect(screen.getByText("No matching results")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(bodyNames()).toHaveLength(10);
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("supports a controlled filter value and a custom filterFn", () => {
    const filterFn = vi.fn((row: Customer) => row.amount > 60);
    renderTable({ filterBar: { value: { filters: {} }, onChange: () => {} }, filterFn });
    expect(bodyNames()).toEqual(["Cleo", "Eli", "Hana", "Kai"]);
  });

  it("places column menu and export inside the FilterBar extra slot", () => {
    const { container } = renderTable({ filterBar: {}, exportCsv: true, columnVisibility: true });
    const extra = container.querySelector(".ds-filter-bar__extra")!;
    expect(within(extra as HTMLElement).getByRole("button", { name: "Export CSV" })).toBeInTheDocument();
    expect(within(extra as HTMLElement).getByRole("button", { name: "Columns" })).toBeInTheDocument();
  });
});

describe("DataTable — selection & bulk actions", () => {
  it("keeps selections across pages and passes selected rows to bulk actions", async () => {
    const archive = vi.fn();
    renderTable({ selectable: true, bulkActions: [{ label: "Archive", onClick: archive }] });
    expect(screen.queryByRole("group", { name: "Bulk actions" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ben" }));
    await userEvent.click(screen.getByRole("button", { name: "Page 2" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Lea" }));
    const bar = screen.getByRole("group", { name: "Bulk actions" });
    expect(bar).toHaveTextContent("2 selected");
    expect(screen.getByText("2 rows selected")).toHaveAttribute("aria-live", "polite");
    await userEvent.click(within(bar).getByRole("button", { name: "Archive" }));
    expect(archive.mock.calls[0][0].map((r: Customer) => r.name)).toEqual(["Ben", "Lea"]);
  });

  it("select-all on a page adds that page without dropping other pages", async () => {
    const onSelectionChange = vi.fn();
    renderTable({ selectable: true, onSelectionChange });
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ava" }));
    await userEvent.click(screen.getByRole("button", { name: "Page 2" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["c1", "c11", "c12"], expect.any(Array));
    await userEvent.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(["c1"], [rows[0]]);
  });

  it("Clear empties the selection and moves focus to the select-all checkbox", async () => {
    renderTable({ selectable: true });
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Cleo" }));
    await userEvent.click(screen.getByRole("button", { name: "Clear selection" }));
    expect(screen.queryByRole("group", { name: "Bulk actions" })).not.toBeInTheDocument();
    await flushRaf();
    expect(screen.getByRole("checkbox", { name: "Select all rows" })).toHaveFocus();
  });

  it("bulk actions can clear the selection via the helper", async () => {
    renderTable({
      selectable: true,
      bulkActions: [{ label: "Delete", variant: "danger", onClick: (_rows, { clearSelection }) => clearSelection() }],
    });
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ava" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.queryByRole("group", { name: "Bulk actions" })).not.toBeInTheDocument();
  });

  it("respects controlled selectedRowKeys", () => {
    renderTable({ selectable: true, selectedRowKeys: ["c2", "c3"] });
    expect(screen.getByRole("checkbox", { name: "Select row Ben" })).toBeChecked();
    expect(screen.getByRole("group", { name: "Bulk actions" })).toHaveTextContent("2 selected");
  });
});

describe("DataTable — scroll region & selection reset", () => {
  it("wraps the table in one keyboard-reachable scroll region named by the caption", () => {
    renderTable();
    const regions = screen.getAllByRole("region");
    expect(regions).toHaveLength(1);
    const scroller = screen.getByRole("region", { name: "Customers" });
    expect(scroller).toHaveAttribute("tabindex", "0");
    expect(scroller).toHaveClass("ds-data-table__table");
    expect(scroller).toContainElement(screen.getByRole("table", { name: "Customers" }));
    scroller.focus();
    expect(scroller).toHaveFocus();
  });

  it("with scroll.y, Table's own scroller becomes the single focusable, named region", () => {
    const { container } = renderTable({ scroll: { y: 300 } });
    const regions = screen.getAllByRole("region");
    expect(regions).toHaveLength(1);
    expect(regions[0]).toHaveClass("table-scroll-wrapper");
    expect(regions[0]).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("region", { name: "Customers" })).toBe(regions[0]);
    expect(container.querySelector(".ds-data-table__table")).not.toHaveAttribute("tabindex");
  });

  it("clears the selection when filters or search change and announces it", async () => {
    const onSelectionChange = vi.fn();
    renderTable({
      selectable: true,
      onSelectionChange,
      filterBar: { filters: [statusFilter], searchDebounceMs: 0 },
    });
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ben" }));
    expect(screen.getByRole("group", { name: "Bulk actions" })).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Status" }), "active");
    expect(onSelectionChange).toHaveBeenLastCalledWith([], []);
    expect(screen.queryByRole("group", { name: "Bulk actions" })).not.toBeInTheDocument();
    expect(screen.getByText("Selection cleared")).toHaveAttribute("aria-live", "polite");

    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Cleo" }));
    expect(screen.getByText("1 row selected")).toBeInTheDocument();
    await userEvent.type(screen.getByRole("searchbox"), "c");
    expect(screen.queryByRole("group", { name: "Bulk actions" })).not.toBeInTheDocument();
    expect(screen.getByText("Selection cleared")).toBeInTheDocument();
  });

  it("keeps the selection with preserveSelectionOnFilter", async () => {
    renderTable({ selectable: true, preserveSelectionOnFilter: true, filterBar: { filters: [statusFilter] } });
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ben" }));
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Status" }), "active");
    expect(screen.getByRole("group", { name: "Bulk actions" })).toHaveTextContent("1 selected");
    expect(screen.queryByText("Selection cleared")).not.toBeInTheDocument();
  });
});

describe("DataTable — no layout shift & partial select-all", () => {
  it("keeps the bulk-bar slot mounted (same node) before and after selecting", async () => {
    const { container } = renderTable({ selectable: true });
    const slot = container.querySelector(".ds-data-table__bulk-slot");
    expect(slot).not.toBeNull();
    expect(slot).toHaveAttribute("data-active", "false");
    expect(slot).toHaveTextContent("Select rows to apply bulk actions");
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ava" }));
    expect(container.querySelector(".ds-data-table__bulk-slot")).toBe(slot);
    expect(slot).toHaveAttribute("data-active", "true");
    expect(within(slot as HTMLElement).getByRole("group", { name: "Bulk actions" })).toBeInTheDocument();
    // Consecutive clicks land on the intended rows (no shift between clicks).
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ben" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Cleo" }));
    expect(slot).toHaveTextContent("3 selected");
  });

  it("does not render the slot when not selectable", () => {
    const { container } = renderTable();
    expect(container.querySelector(".ds-data-table__bulk-slot")).toBeNull();
  });

  it("marks select-all indeterminate for a partial selection", async () => {
    renderTable({ selectable: true });
    const selectAll = () => screen.getByRole("checkbox", { name: "Select all rows" }) as HTMLInputElement;
    expect(selectAll().indeterminate).toBe(false);
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ben" }));
    expect(selectAll().indeterminate).toBe(true);
    expect(selectAll()).toHaveAttribute("data-indeterminate", "true");
    expect(selectAll()).toBePartiallyChecked();

    await userEvent.click(selectAll());
    expect(selectAll().indeterminate).toBe(false);
    expect(selectAll()).toBeChecked();
    expect(selectAll()).not.toHaveAttribute("data-indeterminate");

    // Page 1 fully selected, page 2 none: page 2 header shows the partial (off-page) state.
    await userEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(selectAll().indeterminate).toBe(true);

    await userEvent.click(screen.getByRole("button", { name: "Clear selection" }));
    expect(selectAll().indeterminate).toBe(false);
  });
});

describe("DataTable — column visibility", () => {
  it("toggles columns from the menu and reports the visibility map", async () => {
    const onColumnVisibilityChange = vi.fn();
    renderTable({ columnVisibility: true, onColumnVisibilityChange });
    const trigger = screen.getByRole("button", { name: "Columns" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    await userEvent.click(trigger);
    const group = within(screen.getByRole("dialog")).getByRole("group", { name: "Show columns" });
    await userEvent.click(within(group).getByRole("checkbox", { name: "Status" }));
    expect(onColumnVisibilityChange).toHaveBeenLastCalledWith({ name: true, status: false, amount: true, note: true });
    expect(screen.queryByRole("columnheader", { name: "Status" })).not.toBeInTheDocument();
  });

  it("honours a controlled map, locks hideable:false and the last visible column", async () => {
    const cols: DataTableColumn<Customer>[] = [
      { key: "name", header: "Name", hideable: false },
      { key: "status", header: "Status" },
    ];
    render(
      <DataTable<Customer>
        caption="Customers"
        columns={cols}
        data={rows}
        rowKey="id"
        columnVisibility={{ status: false }}
      />,
    );
    expect(screen.queryByRole("columnheader", { name: "Status" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Columns" }));
    expect(screen.getByRole("checkbox", { name: "Name" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "Status" })).not.toBeChecked();
  });

  it("controlled persistence round-trip", async () => {
    function Persisted() {
      const [vis, setVis] = useState<Record<string, boolean>>({ note: false });
      return (
        <DataTable<Customer> caption="Customers" columns={columns} data={rows} rowKey="id" columnVisibility={vis} onColumnVisibilityChange={setVis} />
      );
    }
    render(<Persisted />);
    expect(screen.queryByRole("columnheader", { name: "Note" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Columns" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Note" }));
    expect(screen.getByRole("columnheader", { name: "Note" })).toBeInTheDocument();
  });
});

describe("DataTable — CSV export", () => {
  it("exports visible columns of every filtered row (all pages) through onExport", async () => {
    const onExport = vi.fn();
    renderTable({ exportCsv: { filename: "my/customers", onExport }, columnVisibility: { note: false } });
    await userEvent.click(screen.getByRole("button", { name: "Export CSV" }));
    const [csv, filename] = onExport.mock.calls[0];
    const lines = (csv as string).split("\r\n");
    expect(filename).toBe("my_customers.csv");
    expect(lines[0]).toBe("Name,Status,Amount");
    expect(lines).toHaveLength(13);
    expect(lines[12]).toBe("Lea,active,2");
  });

  it("guards formula injection and escapes quotes, commas and newlines", async () => {
    const onExport = vi.fn();
    const nasty: Customer[] = [
      { id: "x1", name: '=HYPERLINK("http://evil","x")', status: "+1", amount: -5, note: "a,b" },
      { id: "x2", name: "@SUM(A1)", status: "-2+3", amount: 3, note: 'say "hi"\nbye' },
    ];
    render(
      <DataTable<Customer> caption="Nasty" columns={columns} data={nasty} rowKey="id" exportCsv={{ onExport }} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Export CSV" }));
    const lines = (onExport.mock.calls[0][0] as string).split("\r\n");
    expect(lines[1]).toBe(`"'=HYPERLINK(""http://evil"",""x"")",'+1,-5,"a,b"`);
    // Embedded LF stays inside the quoted cell; records are CRLF-separated.
    expect(lines[2]).toBe(`'@SUM(A1),'-2+3,3,"say ""hi""\nbye"`);
    expect(lines).toHaveLength(3);
  });

  it("downloads through a Blob URL when no onExport is given", async () => {
    const create = vi.fn(() => "blob:mock");
    const revoke = vi.fn();
    const origCreate = URL.createObjectURL;
    const origRevoke = URL.revokeObjectURL;
    URL.createObjectURL = create as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = revoke;
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    renderTable({ exportCsv: true });
    await userEvent.click(screen.getByRole("button", { name: "Export CSV" }));
    expect(create).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    expect((click.mock.instances[0] as unknown as HTMLAnchorElement).download).toBe("Customers.csv");
    click.mockRestore();
    URL.createObjectURL = origCreate;
    URL.revokeObjectURL = origRevoke;
  });
});

describe("DataTable — server mode", () => {
  it("shows data as-is, delegates paging and does not filter client-side", async () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    render(
      <DataTable<Customer>
        caption="Customers"
        columns={columns}
        data={rows.slice(0, 5)}
        rowKey="id"
        filterBar={{ filters: [statusFilter], value: { filters: { status: "paused" } }, onChange: () => {} }}
        pagination={{ page: 1, pageSize: 5, total: 42, onPageChange, onPageSizeChange, pageSizeOptions: [5, 10] }}
      />,
    );
    expect(bodyNames()).toEqual(["Ava", "Ben", "Cleo", "Dev", "Eli"]);
    expect(screen.getByRole("navigation")).toHaveTextContent("Showing 1–5 of 42");
    expect(document.querySelector(".ds-filter-bar__count")).toHaveTextContent("42 results");
    await userEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
    await userEvent.selectOptions(screen.getByLabelText("Rows per page"), "10");
    expect(onPageSizeChange).toHaveBeenCalledWith(10);
  });
});

describe("DataTable utils", () => {
  it("escapeCsvCell", () => {
    expect(escapeCsvCell("plain")).toBe("plain");
    expect(escapeCsvCell("=1+1")).toBe("'=1+1");
    expect(escapeCsvCell("\t=cmd")).toBe("'\t=cmd");
    expect(escapeCsvCell("\r=cmd")).toBe(`"'\r=cmd"`);
    expect(escapeCsvCell("＝1+1")).toBe("'＝1+1");
    expect(escapeCsvCell(-12.5)).toBe("-12.5");
    expect(escapeCsvCell(null)).toBe("");
    expect(escapeCsvCell(["=a", "b"])).toBe(`"'=a; b"`);
    expect(escapeCsvCell(new Date("2026-01-02T03:04:05.000Z"))).toBe("2026-01-02T03:04:05.000Z");
    expect(escapeCsvCell({ a: 1 })).toBe(`"{""a"":1}"`);
  });

  it("guards formulas hidden behind ; (semicolon-delimited Excel locales), incl. full-width forms", () => {
    expect(escapeCsvCell("x;=cmd|' /C calc'!A0")).toBe(`"x;'=cmd|' /C calc'!A0"`);
    expect(escapeCsvCell("a; +1")).toBe(`"a;' +1"`);
    expect(escapeCsvCell("a;-1")).toBe(`"a;'-1"`);
    expect(escapeCsvCell("a;@SUM(A1)")).toBe(`"a;'@SUM(A1)"`);
    expect(escapeCsvCell("a;\tx")).toBe(`"a;'\tx"`);
    expect(escapeCsvCell("a;\uFF1Dcmd")).toBe(`"a;'\uFF1Dcmd"`);
    expect(escapeCsvCell("a\uFF1B\uFF0B1")).toBe("a\uFF1B'\uFF0B1");
    expect(escapeCsvCell("a;\uFF0D1;\uFF20x")).toBe(`"a;'\uFF0D1;'\uFF20x"`);
    expect(escapeCsvCell('a;"=1"')).toBe(`"a;'""=1"""`);
    // Leading guard still applies, combined with the separator guard.
    expect(escapeCsvCell("=a;=b")).toBe(`"'=a;'=b"`);
    // Plain semicolons are quoted (kept as one cell) but not prefixed.
    expect(escapeCsvCell("red; green")).toBe(`"red; green"`);
    expect(escapeCsvCell("a=b;c")).toBe(`"a=b;c"`);
  });

  it("no field of the full toCsv output starts with a trigger when split by a ; locale", () => {
    // Semicolon-locale reading: split on ";", honouring quotes only at field start (a quote later
    // in a field is literal). Commas are ordinary characters in these locales.
    const splitSemicolonLine = (line: string): string[] => {
      const fields: string[] = [];
      let i = 0;
      while (i <= line.length) {
        let field = "";
        if (line[i] === '"') {
          i++;
          while (i < line.length) {
            if (line[i] === '"' && line[i + 1] === '"') {
              field += '"';
              i += 2;
            } else if (line[i] === '"') {
              i++;
              break;
            } else field += line[i++];
          }
        }
        while (i < line.length && line[i] !== ";") field += line[i++];
        fields.push(field);
        i++;
      }
      return fields;
    };
    const TRIGGER = /^[=+\-@\t\r\uFF1D\uFF0B\uFF0D\uFF20]/;
    const repros = [
      "x;=cmd|' /C calc'!A0",
      "a;=1+1",
      "a;\uFF1D1+1",
      "a;+1",
      "a;@SUM(1)",
      "a; -2+3",
      "a;\t=1",
      'a;"=1"',
      "=1+1",
      "@SUM(1)",
    ];
    type R = { id: string; first: string; second: string; n: number };
    const cols: DataTableColumn<R>[] = [
      { key: "first", header: "First" },
      { key: "second", header: "a;=HEADER" },
      { key: "n", header: "N" },
    ];
    const data: R[] = repros.flatMap((v, i) => [
      { id: `f${i}`, first: v, second: "Alice", n: -5 },
      { id: `s${i}`, first: "Alice", second: v, n: 3 },
    ]);
    const lines = toCsv(cols, data).split("\r\n");
    expect(lines).toHaveLength(data.length + 1);
    for (const line of lines) {
      for (const field of splitSemicolonLine(line)) {
        expect(field, `field ${JSON.stringify(field)} of ${JSON.stringify(line)}`).not.toMatch(TRIGGER);
        expect(field.trimStart(), `trimmed field of ${JSON.stringify(line)}`).not.toMatch(TRIGGER);
      }
    }
    // Comma locale and real numbers unchanged.
    expect(lines[1]).toBe(`"x;'=cmd|' /C calc'!A0",Alice,-5`);
    expect(lines[2]).toBe(`Alice,"x;'=cmd|' /C calc'!A0",3`);
  });

  it("exports JSX headers as csvHeader or the column key, never element JSON", () => {
    const jsx = <span>Revenue</span> as unknown as string;
    const csv = toCsv<Customer>(
      [
        { key: "name", header: jsx, csvHeader: "Customer name" },
        { key: "amount", header: jsx },
        { key: "status", header: "Status" },
      ],
      [rows[0]],
    );
    expect(csv.split("\r\n")[0]).toBe("Customer name,amount,Status");
    expect(csv).not.toContain("$$typeof");
    expect(csvHeaderText({ key: "k", header: 42 as unknown as string })).toBe("42");
  });

  it("toCsv guards headers and uses csvValue", () => {
    const csv = toCsv<Customer>(
      [
        { key: "name", header: "=Name" },
        { key: "amount", header: "Amount", csvValue: (r) => r.amount * 2 },
      ],
      [rows[0]],
    );
    expect(csv).toBe("'=Name,Amount\r\nAva,80");
  });

  it("sanitizeCsvFilename", () => {
    expect(sanitizeCsvFilename("../../etc/passwd")).toBe("_.._etc_passwd.csv");
    expect(sanitizeCsvFilename("report.CSV")).toBe("report.CSV");
    expect(sanitizeCsvFilename("  ")).toBe("export.csv");
    expect(sanitizeCsvFilename('a<b>:"c"|?*')).toBe("a_b___c____.csv");
    // Bidi overrides / isolates stripped (cannot disguise the extension).
    expect(sanitizeCsvFilename("invoice\u202Efdp.csv")).toBe("invoicefdp.csv");
    expect(sanitizeCsvFilename("\u202A\u202B\u202C\u202D\u2066\u2067\u2068\u2069x")).toBe("x.csv");
  });

  it("downloadCsv returns false without Blob URL support", () => {
    const orig = URL.createObjectURL;
    // @ts-expect-error — simulate an environment without createObjectURL
    URL.createObjectURL = undefined;
    expect(downloadCsv("a", "a.csv")).toBe(false);
    URL.createObjectURL = orig;
  });

  it("mergePageSelection", () => {
    // row toggle on page [c3, c4]: Table reports prev + c4
    expect(mergePageSelection(["c1", "c3"], ["c1", "c3", "c4"], ["c3", "c4"])).toEqual(["c1", "c3", "c4"]);
    // select all on page
    expect(mergePageSelection(["c1"], ["c3", "c4"], ["c3", "c4"])).toEqual(["c1", "c3", "c4"]);
    // clear all on page
    expect(mergePageSelection(["c1", "c3"], [], ["c3", "c4"])).toEqual(["c1"]);
  });

  it("sortRows and nextSortDirection mirror Table", () => {
    const col = columns[2];
    expect(sortRows(rows, col, "asc").map((r) => r.amount).slice(0, 2)).toEqual([1, 2]);
    expect(sortRows(rows, col, null)).toBe(rows);
    expect(sortRows(rows, { key: "amount", header: "A" }, "asc")).toBe(rows);
    expect(nextSortDirection("", null, "a")).toBe("asc");
    expect(nextSortDirection("a", "asc", "a")).toBe("desc");
    expect(nextSortDirection("a", "desc", "a")).toBe(null);
    expect(nextSortDirection("a", null, "a")).toBe("asc");
    expect(nextSortDirection("a", "desc", "b")).toBe("asc");
  });

  it("defaultRowFilter", () => {
    const row = { id: "1", name: "Ava", tags: ["x", "y"], status: "active" };
    expect(defaultRowFilter(row, { search: "av", filters: {} }, ["name"])).toBe(true);
    expect(defaultRowFilter(row, { search: "av", filters: {} }, ["status"])).toBe(false);
    expect(defaultRowFilter(row, { filters: { tags: ["y", "z"] } }, [])).toBe(true);
    expect(defaultRowFilter(row, { filters: { status: "paused" } }, [])).toBe(false);
    expect(defaultRowFilter(row, { filters: { status: "" } }, [])).toBe(true);
  });
});

describe("DataTable — iteration 2", () => {
  const liveText = () =>
    Array.from(document.querySelectorAll('p.visually-hidden[aria-live="polite"]')).map((p) => p.textContent)[0];

  it("announces 'Selection cleared' exactly once across a server-mode refetch and page change", async () => {
    const pagination = (page: number) => ({ page, pageSize: 5, total: 12, onPageChange: () => {} });
    function Server({ loading, page, filter }: { loading: boolean; page: number; filter: string }) {
      return (
        <DataTable<Customer>
          caption="Customers"
          columns={columns}
          data={rows.slice((page - 1) * 5, page * 5)}
          rowKey="id"
          selectable
          loading={loading}
          filterBar={{ filters: [statusFilter], value: { filters: filter ? { status: filter } : {} }, onChange: () => {} }}
          pagination={pagination(page)}
        />
      );
    }
    const { rerender } = render(<Server loading={false} page={1} filter="" />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ben" }));
    expect(liveText()).toBe("1 row selected");
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Status" }), "active");
    const seen: string[] = [liveText() ?? ""];
    rerender(<Server loading page={1} filter="active" />);
    seen.push(liveText() ?? "");
    rerender(<Server loading={false} page={1} filter="active" />);
    seen.push(liveText() ?? "");
    rerender(<Server loading page={2} filter="active" />);
    seen.push(liveText() ?? "");
    rerender(<Server loading={false} page={2} filter="active" />);
    seen.push(liveText() ?? "");
    // Announced once, then: loading → loaded → page 2 loading → loaded never bring it back.
    expect(seen).toEqual(["Selection cleared", "Loading…", "", "Loading…", ""]);
  });

  it("announces the note with a load that starts in the same batch, then never again", async () => {
    function Harness() {
      const [loading, setLoading] = useState(false);
      const [filter, setFilter] = useState<Record<string, string>>({});
      return (
        <>
          <DataTable<Customer>
            caption="Customers"
            columns={columns}
            data={rows}
            rowKey="id"
            selectable
            loading={loading}
            filterBar={{
              filters: [statusFilter],
              value: { filters: filter },
              onChange: (next) => {
                setFilter(next.filters as Record<string, string>);
                setLoading(true);
              },
            }}
            pagination={{ page: 1, pageSize: 10, total: 12, onPageChange: () => {} }}
          />
          <button type="button" onClick={() => setLoading(false)}>
            finish
          </button>
        </>
      );
    }
    render(<Harness />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ava" }));
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Status" }), "paused");
    expect(liveText()).toBe("Selection cleared. Loading…");
    await userEvent.click(screen.getByRole("button", { name: "finish" }));
    expect(liveText()).toBe("");
  });

  it("clears the one-shot note after a short delay when nothing else happens", async () => {
    renderTable({ selectable: true, filterBar: { filters: [statusFilter] } });
    await userEvent.click(screen.getByRole("checkbox", { name: "Select row Ben" }));
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Status" }), "active");
    expect(liveText()).toBe("Selection cleared");
    await act(async () => {
      await new Promise((r) => setTimeout(r, 1600));
    });
    expect(liveText()).toBe("");
  });

  it("keeps the last result count while loading (no re-announcement of an unchanged count)", () => {
    const props = (loading: boolean) => ({
      caption: "Customers",
      columns,
      data: rows.slice(0, 5),
      rowKey: "id" as const,
      loading,
      filterBar: { value: { filters: {} }, onChange: () => {} },
      pagination: { page: 1, pageSize: 5, total: 42, onPageChange: () => {} },
    });
    const { rerender } = render(<DataTable<Customer> {...props(false)} />);
    const count = document.querySelector(".ds-filter-bar__count")!;
    expect(count).toHaveTextContent("42 results");
    rerender(<DataTable<Customer> {...props(true)} />);
    expect(count).toHaveTextContent("42 results");
    rerender(<DataTable<Customer> {...props(false)} />);
    expect(count).toHaveTextContent("42 results");
  });

  it("findMissingTableMarkup reports selectors that no longer match; DataTable warns nothing today", () => {
    const bare = document.createElement("div");
    expect(findMissingTableMarkup(bare, { selectable: true, hasRows: true })).toEqual([
      ".table-wrapper",
      ".table-scroll-wrapper",
      "table thead th",
      'thead input[type="checkbox"]',
    ]);
    expect(findMissingTableMarkup(bare, { selectable: false, hasRows: false })).toEqual([
      ".table-wrapper",
      ".table-scroll-wrapper",
    ]);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    renderTable({ selectable: true });
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
