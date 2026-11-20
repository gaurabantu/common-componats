"use client";

/**
 * OpenUI wrappers — design-system components an AI agent can place in its answer.
 *
 * Each wrapper is `defineComponent({ name, description, props, component })`:
 *  - `description` is what the model reads to decide when to use it — keep it short and literal;
 *  - `props` is a zod schema: only plain data (strings, numbers, lists), never callbacks or ReactNodes;
 *  - `component` maps that data onto the real library component, so AI answers use the same tokens.
 *
 * Nesting: Stack > Grid > Card > leaf components. Kept one-directional on purpose (no recursive schemas).
 * Prop ORDER matters: OpenUI Lang arguments are positional, so required props first, optional ones last.
 */
import React from "react";
import { z } from "zod/v4";
import { defineComponent, useTriggerAction } from "@openuidev/react-lang";

import StatCardBase from "../components/molecules/StatCard";
import DataTableBase from "../components/molecules/DataTable";
import AlertBase from "../components/molecules/Alert";
import BadgeBase from "../components/atoms/Badge";
import CardBase from "../components/molecules/Card";
import GridBase from "../components/molecules/Grid";
import ButtonBase from "../components/atoms/Button";
import BarChartBase from "../components/charts/BarChart";
import LineChartBase from "../components/charts/LineChart";
import PieChartBase from "../components/charts/PieChart";

const tone = z.enum(["neutral", "primary", "success", "warning", "danger", "info"]);
const cell = z.union([z.string(), z.number(), z.null()]);
const row = z.record(z.string(), cell);
const series = z.array(z.object({ dataKey: z.string(), name: z.string().optional() }));

// ── Leaf components ──────────────────────────────────────────────────────────

export const StatCard = defineComponent({
  name: "StatCard",
  description: "One KPI figure: label, formatted value, optional change vs a prior period.",
  props: z.object({
    label: z.string(),
    value: z.string(),
    unit: z.string().optional(),
    change: z.string().optional(),
    trend: z.enum(["up", "down", "neutral"]).optional(),
    changeLabel: z.string().optional(),
    description: z.string().optional(),
  }),
  component: ({ props }) => (
    <StatCardBase
      label={props.label}
      value={props.value}
      unit={props.unit}
      description={props.description}
      delta={props.change ? { value: props.change, trend: props.trend, label: props.changeLabel } : undefined}
    />
  ),
});

export const DataTable = defineComponent({
  name: "DataTable",
  description:
    "A table of records. columns: key + header (align right for amounts); rows: objects keyed by column key.",
  props: z.object({
    caption: z.string(),
    columns: z.array(
      z.object({ key: z.string(), header: z.string(), align: z.enum(["left", "center", "right"]).optional() }),
    ),
    rows: z.array(row),
  }),
  component: ({ props }) => {
    const data = (props.rows ?? []).map((r, i) => ({ ...r, __rowKey: String(i) }));
    const columns = (props.columns ?? []).map((c) => ({ ...c, sortable: true }));
    return <DataTableBase caption={props.caption} columns={columns} data={data} rowKey="__rowKey" />;
  },
});

export const BarChart = defineComponent({
  name: "BarChart",
  description: "Compare values across categories. data: one object per category; xKey names the category field.",
  props: z.object({
    data: z.array(row),
    xKey: z.string(),
    series,
    horizontal: z.boolean().optional(),
  }),
  component: ({ props }) => (
    <BarChartBase
      data={toChartData(props.data)}
      xAxisKey={props.xKey}
      series={props.series ?? []}
      layout={props.horizontal ? "horizontal" : "vertical"}
      height={280}
      showLegend={(props.series?.length ?? 0) > 1}
    />
  ),
});

export const LineChart = defineComponent({
  name: "LineChart",
  description: "A trend over time (periods on the x axis). data: one object per period; xKey names the period field.",
  props: z.object({ data: z.array(row), xKey: z.string(), series }),
  component: ({ props }) => (
    <LineChartBase
      data={toChartData(props.data)}
      xAxisKey={props.xKey}
      series={props.series ?? []}
      height={280}
      showLegend={(props.series?.length ?? 0) > 1}
    />
  ),
});

export const PieChart = defineComponent({
  name: "PieChart",
  description: "Share of a whole (few slices). data: name + numeric value per slice.",
  props: z.object({ data: z.array(z.object({ name: z.string(), value: z.number() })), donut: z.boolean().optional() }),
  component: ({ props }) => (
    <PieChartBase data={props.data ?? []} innerRadius={props.donut ? "55%" : 0} height={280} showLegend />
  ),
});

export const Alert = defineComponent({
  name: "Alert",
  description: "A short status message: info, success, warning (needs attention) or danger (error / blocked).",
  props: z.object({
    variant: z.enum(["info", "success", "warning", "danger", "neutral"]),
    message: z.string(),
    title: z.string().optional(),
  }),
  component: ({ props }) => (
    <AlertBase variant={props.variant} title={props.title}>
      {props.message}
    </AlertBase>
  ),
});

export const Badge = defineComponent({
  name: "Badge",
  description: "A small status label, e.g. Open / Locked / Approved.",
  props: z.object({ text: z.string(), variant: tone.optional() }),
  component: ({ props }) => <BadgeBase variant={props.variant}>{props.text}</BadgeBase>,
});

export const ActionButton = defineComponent({
  name: "ActionButton",
  description:
    "A button that sends `message` back to the assistant as the user's next request (e.g. 'Drill into entity E100').",
  props: z.object({
    label: z.string(),
    message: z.string(),
    variant: z.enum(["primary", "secondary", "outlineSecondary"]).optional(),
  }),
  component: function ActionButtonRenderer({ props }) {
    const trigger = useTriggerAction();
    return (
      <ButtonBase type="button" size="sm" variant={props.variant ?? "outlineSecondary"} onClick={() => trigger(props.message)}>
        {props.label}
      </ButtonBase>
    );
  },
});

const leaves = [StatCard, DataTable, BarChart, LineChart, PieChart, Alert, Badge, ActionButton] as const;
const leafRef = z.union(leaves.map((c) => c.ref) as unknown as [z.ZodType, z.ZodType, ...z.ZodType[]]);

// ── Containers ───────────────────────────────────────────────────────────────

export const Card = defineComponent({
  name: "Card",
  description: "A titled panel grouping related content (a KPI set, a table, a chart and its note).",
  props: z.object({ children: z.array(leafRef), title: z.string().optional(), subtitle: z.string().optional() }),
  component: ({ props, renderNode }) => (
    <CardBase title={props.title} subtitle={props.subtitle}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        {renderChildren(props.children, renderNode)}
      </div>
    </CardBase>
  ),
});

const panelRef = z.union([...leaves.map((c) => c.ref), Card.ref] as unknown as [z.ZodType, z.ZodType, ...z.ZodType[]]);

export const Grid = defineComponent({
  name: "Grid",
  description: "Side-by-side layout: `columns` equal columns (2–4), e.g. a row of StatCards.",
  props: z.object({ columns: z.number().int().min(1).max(4), children: z.array(panelRef) }),
  component: ({ props, renderNode }) => (
    <GridBase columns={props.columns ?? 2} gap="var(--space-4)">
      {renderChildren(props.children, renderNode)}
    </GridBase>
  ),
});

export const Stack = defineComponent({
  name: "Stack",
  description: "The answer's root: its children top to bottom.",
  props: z.object({
    children: z.array(z.union([...leaves.map((c) => c.ref), Card.ref, Grid.ref] as unknown as [z.ZodType, z.ZodType, ...z.ZodType[]])),
  }),
  component: ({ props, renderNode }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", minWidth: 0 }}>
      {renderChildren(props.children, renderNode)}
    </div>
  ),
});

// ── helpers ──────────────────────────────────────────────────────────────────

function renderChildren(children: unknown, renderNode: (value: unknown) => React.ReactNode): React.ReactNode {
  if (!Array.isArray(children)) return renderNode(children);
  return children.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>);
}

/** Model output may carry numbers as strings ("1,250.5") — charts need numbers. */
function toChartData(rows: Record<string, string | number | null>[] | undefined) {
  return (rows ?? []).map((r) => {
    const out: Record<string, string | number | undefined> = {};
    for (const [k, v] of Object.entries(r)) {
      if (v == null) continue;
      const n = typeof v === "string" ? Number(v.replace(/,/g, "")) : v;
      out[k] = typeof v === "string" && Number.isNaN(n) ? v : n;
    }
    return out;
  });
}

export const openuiComponents = { Stack, Grid, Card, ...Object.fromEntries(leaves.map((c) => [c.name, c])) };
