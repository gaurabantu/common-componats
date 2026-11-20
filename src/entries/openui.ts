/**
 * `ui-common-components/openui` — the design system as an OpenUI component library, so an AI agent can answer
 * with real library components (KPIs, tables, charts) instead of text. Enabled by default: `@openuidev/react-lang`
 * and `zod` install with the library. The main entry never imports them, so pages that do not use AI answers
 * do not load them.
 *
 *   import { Renderer, designSystemLibrary } from "ui-common-components/openui";
 *
 *   // server: put this in the agent's system prompt (generated locally — no OpenUI Cloud needed)
 *   const systemPrompt = designSystemLibrary.prompt({ preamble: "You are the ConsolidateAI assistant." });
 *   // client: render the streamed answer
 *   <Renderer library={designSystemLibrary} response={text} isStreaming={streaming} onAction={…} />
 *
 * Add an app-specific component with `designSystemLibrary.extend({ components: { add: [MyThing] } })`.
 */
import { createLibrary } from "@openuidev/react-lang";

// Re-exported so apps render answers without importing OpenUI themselves.
export { Renderer } from "@openuidev/react-lang";
export type { ActionEvent, RendererProps } from "@openuidev/react-lang";

import {
  ActionButton,
  Alert,
  Badge,
  BarChart,
  Card,
  DataTable,
  Grid,
  LineChart,
  PieChart,
  Stack,
  StatCard,
  openuiComponents,
} from "../openui/components";

export const designSystemLibrary = createLibrary({
  id: "ui-common-components",
  root: "Stack",
  components: [Stack, Grid, Card, StatCard, DataTable, BarChart, LineChart, PieChart, Alert, Badge, ActionButton],
  componentGroups: [
    { name: "Layout", components: ["Stack", "Grid", "Card"], notes: ["Stack is the root. Grid for side-by-side KPIs or charts."] },
    { name: "Figures", components: ["StatCard", "DataTable"] },
    { name: "Charts", components: ["BarChart", "LineChart", "PieChart"] },
    { name: "Status & actions", components: ["Alert", "Badge", "ActionButton"] },
  ],
});

export {
  ActionButton,
  Alert,
  Badge,
  BarChart,
  Card,
  DataTable,
  Grid,
  LineChart,
  PieChart,
  Stack,
  StatCard,
  openuiComponents,
};
