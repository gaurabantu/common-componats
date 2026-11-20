import {
  Alert_default,
  Badge_default,
  Card_default,
  DataTable_default,
  Grid,
  StatCard_default
} from "./chunk-C3Y4LQU7.mjs";
import {
  BarChart_default,
  LineChart_default,
  PieChart_default
} from "./chunk-RQI76EUK.mjs";
import "./chunk-R6XNUOQM.mjs";
import "./chunk-ZKSRRLCO.mjs";
import {
  Button_default
} from "./chunk-EHTTS7LB.mjs";

// src/entries/openui.ts
import { createLibrary } from "@openuidev/react-lang";
import { Renderer } from "@openuidev/react-lang";

// src/openui/components.tsx
import React from "react";
import { z } from "zod/v4";
import { defineComponent, useTriggerAction } from "@openuidev/react-lang";
import { jsx } from "react/jsx-runtime";
var tone = z.enum(["neutral", "primary", "success", "warning", "danger", "info"]);
var cell = z.union([z.string(), z.number(), z.null()]);
var row = z.record(z.string(), cell);
var series = z.array(z.object({ dataKey: z.string(), name: z.string().optional() }));
var StatCard = defineComponent({
  name: "StatCard",
  description: "One KPI figure: label, formatted value, optional change vs a prior period.",
  props: z.object({
    label: z.string(),
    value: z.string(),
    unit: z.string().optional(),
    change: z.string().optional(),
    trend: z.enum(["up", "down", "neutral"]).optional(),
    changeLabel: z.string().optional(),
    description: z.string().optional()
  }),
  component: ({ props }) => /* @__PURE__ */ jsx(
    StatCard_default,
    {
      label: props.label,
      value: props.value,
      unit: props.unit,
      description: props.description,
      delta: props.change ? { value: props.change, trend: props.trend, label: props.changeLabel } : void 0
    }
  )
});
var DataTable = defineComponent({
  name: "DataTable",
  description: "A table of records. columns: key + header (align right for amounts); rows: objects keyed by column key.",
  props: z.object({
    caption: z.string(),
    columns: z.array(
      z.object({ key: z.string(), header: z.string(), align: z.enum(["left", "center", "right"]).optional() })
    ),
    rows: z.array(row)
  }),
  component: ({ props }) => {
    var _a, _b;
    const data = ((_a = props.rows) != null ? _a : []).map((r, i) => ({ ...r, __rowKey: String(i) }));
    const columns = ((_b = props.columns) != null ? _b : []).map((c) => ({ ...c, sortable: true }));
    return /* @__PURE__ */ jsx(DataTable_default, { caption: props.caption, columns, data, rowKey: "__rowKey" });
  }
});
var BarChart = defineComponent({
  name: "BarChart",
  description: "Compare values across categories. data: one object per category; xKey names the category field.",
  props: z.object({
    data: z.array(row),
    xKey: z.string(),
    series,
    horizontal: z.boolean().optional()
  }),
  component: ({ props }) => {
    var _a, _b, _c;
    return /* @__PURE__ */ jsx(
      BarChart_default,
      {
        data: toChartData(props.data),
        xAxisKey: props.xKey,
        series: (_a = props.series) != null ? _a : [],
        layout: props.horizontal ? "horizontal" : "vertical",
        height: 280,
        showLegend: ((_c = (_b = props.series) == null ? void 0 : _b.length) != null ? _c : 0) > 1
      }
    );
  }
});
var LineChart = defineComponent({
  name: "LineChart",
  description: "A trend over time (periods on the x axis). data: one object per period; xKey names the period field.",
  props: z.object({ data: z.array(row), xKey: z.string(), series }),
  component: ({ props }) => {
    var _a, _b, _c;
    return /* @__PURE__ */ jsx(
      LineChart_default,
      {
        data: toChartData(props.data),
        xAxisKey: props.xKey,
        series: (_a = props.series) != null ? _a : [],
        height: 280,
        showLegend: ((_c = (_b = props.series) == null ? void 0 : _b.length) != null ? _c : 0) > 1
      }
    );
  }
});
var PieChart = defineComponent({
  name: "PieChart",
  description: "Share of a whole (few slices). data: name + numeric value per slice.",
  props: z.object({ data: z.array(z.object({ name: z.string(), value: z.number() })), donut: z.boolean().optional() }),
  component: ({ props }) => {
    var _a;
    return /* @__PURE__ */ jsx(PieChart_default, { data: (_a = props.data) != null ? _a : [], innerRadius: props.donut ? "55%" : 0, height: 280, showLegend: true });
  }
});
var Alert = defineComponent({
  name: "Alert",
  description: "A short status message: info, success, warning (needs attention) or danger (error / blocked).",
  props: z.object({
    variant: z.enum(["info", "success", "warning", "danger", "neutral"]),
    message: z.string(),
    title: z.string().optional()
  }),
  component: ({ props }) => /* @__PURE__ */ jsx(Alert_default, { variant: props.variant, title: props.title, children: props.message })
});
var Badge = defineComponent({
  name: "Badge",
  description: "A small status label, e.g. Open / Locked / Approved.",
  props: z.object({ text: z.string(), variant: tone.optional() }),
  component: ({ props }) => /* @__PURE__ */ jsx(Badge_default, { variant: props.variant, children: props.text })
});
var ActionButton = defineComponent({
  name: "ActionButton",
  description: "A button that sends `message` back to the assistant as the user's next request (e.g. 'Drill into entity E100').",
  props: z.object({
    label: z.string(),
    message: z.string(),
    variant: z.enum(["primary", "secondary", "outlineSecondary"]).optional()
  }),
  component: function ActionButtonRenderer({ props }) {
    var _a;
    const trigger = useTriggerAction();
    return /* @__PURE__ */ jsx(Button_default, { type: "button", size: "sm", variant: (_a = props.variant) != null ? _a : "outlineSecondary", onClick: () => trigger(props.message), children: props.label });
  }
});
var leaves = [StatCard, DataTable, BarChart, LineChart, PieChart, Alert, Badge, ActionButton];
var leafRef = z.union(leaves.map((c) => c.ref));
var Card = defineComponent({
  name: "Card",
  description: "A titled panel grouping related content (a KPI set, a table, a chart and its note).",
  props: z.object({ children: z.array(leafRef), title: z.string().optional(), subtitle: z.string().optional() }),
  component: ({ props, renderNode }) => /* @__PURE__ */ jsx(Card_default, { title: props.title, subtitle: props.subtitle, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-3)" }, children: renderChildren(props.children, renderNode) }) })
});
var panelRef = z.union([...leaves.map((c) => c.ref), Card.ref]);
var Grid2 = defineComponent({
  name: "Grid",
  description: "Side-by-side layout: `columns` equal columns (2\u20134), e.g. a row of StatCards.",
  props: z.object({ columns: z.number().int().min(1).max(4), children: z.array(panelRef) }),
  component: ({ props, renderNode }) => {
    var _a;
    return /* @__PURE__ */ jsx(Grid, { columns: (_a = props.columns) != null ? _a : 2, gap: "var(--space-4)", children: renderChildren(props.children, renderNode) });
  }
});
var Stack = defineComponent({
  name: "Stack",
  description: "The answer's root: its children top to bottom.",
  props: z.object({
    children: z.array(z.union([...leaves.map((c) => c.ref), Card.ref, Grid2.ref]))
  }),
  component: ({ props, renderNode }) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-4)", minWidth: 0 }, children: renderChildren(props.children, renderNode) })
});
function renderChildren(children, renderNode) {
  if (!Array.isArray(children))
    return renderNode(children);
  return children.map((child, i) => /* @__PURE__ */ jsx(React.Fragment, { children: renderNode(child) }, i));
}
function toChartData(rows) {
  return (rows != null ? rows : []).map((r) => {
    const out = {};
    for (const [k, v] of Object.entries(r)) {
      if (v == null)
        continue;
      const n = typeof v === "string" ? Number(v.replace(/,/g, "")) : v;
      out[k] = typeof v === "string" && Number.isNaN(n) ? v : n;
    }
    return out;
  });
}
var openuiComponents = { Stack, Grid: Grid2, Card, ...Object.fromEntries(leaves.map((c) => [c.name, c])) };

// src/entries/openui.ts
var designSystemLibrary = createLibrary({
  id: "ui-common-components",
  root: "Stack",
  components: [Stack, Grid2, Card, StatCard, DataTable, BarChart, LineChart, PieChart, Alert, Badge, ActionButton],
  componentGroups: [
    { name: "Layout", components: ["Stack", "Grid", "Card"], notes: ["Stack is the root. Grid for side-by-side KPIs or charts."] },
    { name: "Figures", components: ["StatCard", "DataTable"] },
    { name: "Charts", components: ["BarChart", "LineChart", "PieChart"] },
    { name: "Status & actions", components: ["Alert", "Badge", "ActionButton"] }
  ]
});
export {
  ActionButton,
  Alert,
  Badge,
  BarChart,
  Card,
  DataTable,
  Grid2 as Grid,
  LineChart,
  PieChart,
  Renderer,
  Stack,
  StatCard,
  designSystemLibrary,
  openuiComponents
};
//# sourceMappingURL=openui.mjs.map