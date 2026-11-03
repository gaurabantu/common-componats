import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import FilterBar from "./index";
import type { FilterBarFilter, FilterBarProps, FilterBarValue } from "./FilterBar.types";
import { FILTER_BAR_DEFAULTS } from "./FilterBar.config";
import Button from "../../atoms/Button";

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
    id: "region",
    label: "Region",
    type: "multi",
    searchable: true,
    options: [
      { label: "EMEA", value: "emea" },
      { label: "APAC", value: "apac" },
      { label: "Americas", value: "amer" },
    ],
  },
  {
    id: "plan",
    label: "Plan",
    type: "select",
    options: [
      { label: "Free", value: "free" },
      { label: "Team", value: "team" },
      { label: "Enterprise", value: "enterprise" },
    ],
  },
  {
    id: "owner",
    label: "Owner",
    type: "multi",
    options: [
      { label: "Ana Lima", value: "ana" },
      { label: "Ben Okafor", value: "ben" },
      { label: "Chen Wei", value: "chen" },
    ],
  },
  {
    id: "health",
    label: "Health",
    type: "select",
    options: [
      { label: "Healthy", value: "ok" },
      { label: "At risk", value: "risk" },
    ],
  },
];

const meta: Meta<typeof FilterBar> = {
  title: "Design System/Molecules/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Search + filters for list and table pages (Zone 4 toolbar). Fully controlled: `value = { search, filters }` and `onChange(next)`. Search is debounced locally (`searchDebounceMs`, default 250 — clearing and Enter commit immediately). `select` filters use the native `Select`, `multi` filters use `Combobox multiple`. Active values show as dismissible chips (`Badge`) with **Clear all**; focus moves to the next chip / the search field when a chip disappears. Filters past `maxInlineFilters` (default 3) — and every filter at ≤ 768px — collapse into a **More filters** popover (multi filters render as checkbox groups there). `resultCount` is announced in a polite live region. Put view toggles / export in `extra`. FilterBar has no primary CTA of its own, so it never competes with the page's one primary action.",
      },
    },
  },
  argTypes: {
    searchable: { control: "boolean" },
    searchPlaceholder: { control: "text" },
    searchDebounceMs: { control: { type: "number", min: 0, step: 50 } },
    resultCount: { control: { type: "number", min: 0 } },
    maxInlineFilters: { control: { type: "number", min: 0, max: 5 } },
    moreFilters: { control: "boolean" },
    showLabels: { control: "boolean" },
    onChange: { action: "change" },
    value: { control: false },
    filters: { control: false },
    extra: { control: false },
    labels: { control: false },
  },
  args: {
    searchable: FILTER_BAR_DEFAULTS.searchable,
    searchPlaceholder: "Search customers…",
    searchDebounceMs: FILTER_BAR_DEFAULTS.searchDebounceMs,
    maxInlineFilters: FILTER_BAR_DEFAULTS.maxInlineFilters,
    moreFilters: FILTER_BAR_DEFAULTS.moreFilters,
    showLabels: FILTER_BAR_DEFAULTS.showLabels,
    resultCount: 128,
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

const Controlled = ({ initial, ...args }: FilterBarProps & { initial?: FilterBarValue }) => {
  const [value, setValue] = useState<FilterBarValue>(initial ?? { search: "", filters: {} });
  return (
    <div className="sb-stack">
      <FilterBar
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
      <pre className="sb-card" aria-label="Current value">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
};

export const Playground: Story = {
  args: { filters },
  render: (args) => <Controlled {...args} />,
};

export const WithActiveChips: Story = {
  args: { filters: filters.slice(0, 3) },
  render: (args) => (
    <Controlled {...args} initial={{ search: "acme", filters: { status: "active", region: ["emea", "apac"] } }} />
  ),
};

export const OverflowIntoPopover: Story = {
  name: "Overflow into More filters",
  args: { filters, maxInlineFilters: 2 },
  render: (args) => <Controlled {...args} />,
};

export const WithExtraSlot: Story = {
  args: { filters: filters.slice(0, 2) },
  render: (args) => (
    <Controlled
      {...args}
      extra={
        <Button type="button" variant="outlineSecondary" size="lg">
          Export
        </Button>
      }
    />
  ),
};

export const VisibleLabels: Story = {
  args: { filters: filters.slice(0, 3), showLabels: true },
  render: (args) => <Controlled {...args} />,
};

export const Mobile: Story = {
  args: { filters },
  parameters: { viewport: { defaultViewport: "mobile375" } },
  render: (args) => <Controlled {...args} />,
};
