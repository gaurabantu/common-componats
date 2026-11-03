import React, { useEffect, useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./index";
import type { DataTableColumn, DataTableProps } from "./DataTable.types";
import { DATA_TABLE_DEFAULTS } from "./DataTable.config";
import type { FilterBarFilter, FilterBarValue } from "../FilterBar/FilterBar.types";
import Badge from "../../atoms/Badge";
import Button from "../../atoms/Button";

type Customer = {
  id: string;
  name: string;
  email: string;
  status: "active" | "paused" | "archived";
  plan: "free" | "team" | "enterprise";
  mrr: number;
  created: string;
};

// Fictional demo data only (checklist B7).
const FIRST = ["Ava", "Ben", "Cleo", "Dev", "Eli", "Fay", "Gus", "Hana", "Ivo", "Jun", "Kai", "Lea", "Mo", "Nia"];
const LAST = ["Stone", "Okafor", "Lima", "Wei", "Haas", "Park", "Diaz", "Kato"];
const STATUSES: Customer["status"][] = ["active", "active", "paused", "archived"];
const PLANS: Customer["plan"][] = ["free", "team", "enterprise"];

const customers: Customer[] = Array.from({ length: 57 }, (_, i) => {
  const first = FIRST[i % FIRST.length];
  const last = LAST[(i * 3) % LAST.length];
  return {
    id: `cus_${String(i + 1).padStart(3, "0")}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    status: STATUSES[i % STATUSES.length],
    plan: PLANS[(i * 7) % PLANS.length],
    mrr: ((i * 137) % 900) + 20,
    created: `2026-0${(i % 9) + 1}-${String((i % 27) + 1).padStart(2, "0")}`,
  };
});

const statusTone = { active: "success", paused: "warning", archived: "neutral" } as const;

const columns: DataTableColumn<Customer>[] = [
  { key: "name", header: "Customer", sortable: true, hideable: false },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    render: (v) => (
      <Badge variant={statusTone[v as Customer["status"]]} tone="soft">
        {String(v).charAt(0).toUpperCase() + String(v).slice(1)}
      </Badge>
    ),
  },
  { key: "plan", header: "Plan", sortable: true },
  {
    key: "mrr",
    header: "MRR",
    sortable: true,
    sortType: "number",
    align: "right",
    render: (v) => `$${Number(v).toLocaleString("en-US")}`,
    csvValue: (row) => row.mrr,
  },
  { key: "created", header: "Created", sortable: true },
];

const filters: FilterBarFilter[] = [
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Paused", value: "paused" },
      { label: "Archived", value: "archived" },
    ],
  },
  {
    id: "plan",
    label: "Plan",
    type: "multi",
    options: [
      { label: "Free", value: "free" },
      { label: "Team", value: "team" },
      { label: "Enterprise", value: "enterprise" },
    ],
  },
];

type Props = DataTableProps<Customer>;

const meta: Meta<Props> = {
  title: "Design System/Molecules/DataTable",
  component: DataTable as unknown as React.ComponentType<Props>,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Page-level data grid (Zone 4) that composes `Table` + `FilterBar` + `Pagination` + `EmptyState` / `ErrorState`. **Client mode** (omit `pagination`): DataTable filters `data` with the FilterBar value (search over visible columns; filter `id` = row field, or pass `filterFn`), sorts across all pages, and pages with `Pagination`. **Server mode** (`pagination={{ page, pageSize, total, onPageChange, onPageSizeChange }}`): `data` is the current page; listen to `filterBar.onChange` and `onSortChange` and re-fetch. `selectable` adds a checkbox column; selections persist across pages and a bulk bar (\"3 selected · Clear\" + `bulkActions`) appears. `columnVisibility` adds a Columns menu (pass a record + `onColumnVisibilityChange` to persist). `exportCsv` downloads visible columns as CSV with formula-injection guarding. `caption` is required and names the table; `hideCaption` keeps it for screen readers only. Every other `Table` prop (striped, compact, stickyHeader, expandable, onRowClick, size, variant…) passes through.",
      },
    },
  },
  argTypes: {
    caption: { control: "text" },
    hideCaption: { control: "boolean" },
    loading: { control: "boolean" },
    selectable: { control: "boolean" },
    columnVisibility: { control: "boolean" },
    exportCsv: { control: "boolean" },
    defaultPageSize: { control: { type: "number", min: 1 } },
    striped: { control: "boolean" },
    compact: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: { control: "inline-radio", options: ["default", "bordered", "minimal"] },
    onSortChange: { action: "sortChange" },
    onSelectionChange: { action: "selectionChange" },
    onColumnVisibilityChange: { action: "columnVisibilityChange" },
    columns: { control: false },
    data: { control: false },
    filterBar: { control: false },
    bulkActions: { control: false },
    pagination: { control: false },
    error: { control: false },
    emptyState: { control: false },
    noResultsState: { control: false },
    toolbarRight: { control: false },
    labels: { control: false },
  },
  args: {
    caption: "Customers",
    hideCaption: false,
    loading: false,
    selectable: true,
    columnVisibility: true,
    exportCsv: true,
    defaultPageSize: DATA_TABLE_DEFAULTS.defaultPageSize,
    striped: true,
    compact: false,
    stickyHeader: false,
    size: "md",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<Props>;

const base = { columns, data: customers, rowKey: "id" as const };

export const Playground: Story = {
  render: (args) => (
    <DataTable<Customer>
      {...args}
      {...base}
      filterBar={{ filters, searchPlaceholder: "Search customers…" }}
      bulkActions={[
        { label: "Export selected", onClick: (rows) => console.info("export", rows.length) },
        { label: "Archive", variant: "danger", onClick: (_rows, { clearSelection }) => clearSelection() },
      ]}
      toolbarRight={
        <Button type="button" variant="primary" size="lg">
          New customer
        </Button>
      }
    />
  ),
};

export const ClientMode: Story = {
  name: "Client mode (filter + sort + page)",
  args: { selectable: false, columnVisibility: false, exportCsv: false },
  render: (args) => <DataTable<Customer> {...args} {...base} filterBar={{ filters }} />,
};

/** Simulated API: filters, sorts and pages "on the server" with latency. */
const ServerDemo = (args: Props) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<FilterBarValue>({ search: "", filters: {} });
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" | null }>({ key: "", direction: null });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ rows: Customer[]; total: number }>({ rows: [], total: 0 });

  const query = useMemo(() => ({ page, pageSize, filter, sort }), [page, pageSize, filter, sort]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const q = (query.filter.search ?? "").toLowerCase();
      const status = query.filter.filters.status as string | undefined;
      const plans = (query.filter.filters.plan as string[] | undefined) ?? [];
      let rows = customers.filter(
        (c) =>
          (!q || c.name.toLowerCase().includes(q) || c.email.includes(q)) &&
          (!status || c.status === status) &&
          (plans.length === 0 || plans.includes(c.plan)),
      );
      if (query.sort.key && query.sort.direction) {
        const k = query.sort.key as keyof Customer;
        const dir = query.sort.direction === "asc" ? 1 : -1;
        rows = [...rows].sort((a, b) => (a[k] > b[k] ? dir : a[k] < b[k] ? -dir : 0));
      }
      const start = (query.page - 1) * query.pageSize;
      setResult({ rows: rows.slice(start, start + query.pageSize), total: rows.length });
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <DataTable<Customer>
      {...args}
      {...base}
      data={result.rows}
      loading={loading}
      filterBar={{
        filters,
        value: filter,
        onChange: (next) => {
          setFilter(next);
          setPage(1);
        },
      }}
      onSortChange={(s) => {
        setSort(s);
        setPage(1);
      }}
      pagination={{
        page,
        pageSize,
        total: result.total,
        onPageChange: setPage,
        onPageSizeChange: (n) => {
          setPageSize(n);
          setPage(1);
        },
        pageSizeOptions: [10, 25, 50],
      }}
    />
  );
};

export const ServerMode: Story = {
  name: "Server mode (simulated API)",
  render: (args) => <ServerDemo {...args} />,
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => <DataTable<Customer> {...args} {...base} data={[]} />,
};

export const Empty: Story = {
  render: (args) => (
    <DataTable<Customer>
      {...args}
      {...base}
      data={[]}
      emptyState={undefined}
      toolbarRight={
        <Button type="button" variant="primary" size="lg">
          New customer
        </Button>
      }
    />
  ),
};

export const NoResults: Story = {
  name: "No results (filters active)",
  render: (args) => (
    <DataTable<Customer>
      {...args}
      {...base}
      filterBar={{ filters, defaultValue: { search: "nobody-matches-this", filters: {} } }}
    />
  ),
};

export const ErrorStateStory: Story = {
  name: "Error",
  render: (args) => (
    <DataTable<Customer>
      {...args}
      {...base}
      error={{ description: "The customers service did not respond (demo).", onRetry: () => console.info("retry") }}
    />
  ),
};

export const PersistedColumns: Story = {
  name: "Column visibility (persisted)",
  render: (args) => {
    const Demo = () => {
      const [vis, setVis] = useState<Record<string, boolean>>({ email: false, created: false });
      return (
        <div className="sb-stack">
          <DataTable<Customer> {...args} {...base} columnVisibility={vis} onColumnVisibilityChange={setVis} />
          <pre className="sb-card" aria-label="Persisted visibility">
            {JSON.stringify(vis)}
          </pre>
        </div>
      );
    };
    return <Demo />;
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile375" } },
  render: (args) => <DataTable<Customer> {...args} {...base} filterBar={{ filters }} />,
};
