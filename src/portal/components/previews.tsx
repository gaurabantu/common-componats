/**
 * Live mini previews for the Components gallery — each renders the real library component with
 * props from its `*.types.ts`. Overlays, the app shell and full-page composites cannot render
 * inline at thumbnail size, so they show their real trigger / parts arranged as a schematic
 * (`kind: "schematic"`, labelled in the detail panel).
 *
 * The gallery mounts every preview inside an `inert`, `aria-hidden` frame: thumbnails are pictures
 * of the component, the card's own button is the only interactive element.
 */
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avtar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CheckBox,
  CodeBlock,
  ColorPicker,
  Combobox,
  DatePicker,
  DateRangePicker,
  Divider,
  EmptyState,
  ErrorState,
  FeedbackState,
  FileUpload,
  FormField,
  GradientText,
  Grid,
  Hyperlink,
  Icon,
  IconBox,
  Input,
  InputSearch,
  Kbd,
  List,
  ListItem,
  LoadingOverlay,
  NumberInput,
  OfflineBanner,
  OtpBox,
  PageHeader,
  Pagination,
  ProgressBar,
  RadioGroup,
  SegmentedControl,
  Select,
  Skeleton,
  Slider,
  Spinner,
  StatCard,
  Stepper,
  StepperStep,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextArea,
  TextView,
  Toast,
  ToggleButton,
  ToggleGroup,
  ToolTip,
} from "../../index";
import { AreaChart, BarChart, ComposedChart } from "../../components/charts";
import { IconBell, IconChart, IconCheck, IconGrid, IconLayers, IconPanel, IconSearch, IconUsers } from "../icons";

export type PreviewKind = "live" | "schematic";

export interface Preview {
  kind: PreviewKind;
  render: () => React.ReactNode;
}

const noop = () => {};
const live = (render: () => React.ReactNode): Preview => ({ kind: "live", render });
const schematic = (render: () => React.ReactNode): Preview => ({ kind: "schematic", render });

const MINI_CHART = [
  { m: "Jan", a: 12, b: 7 },
  { m: "Feb", a: 18, b: 9 },
  { m: "Mar", a: 15, b: 13 },
  { m: "Apr", a: 22, b: 12 },
  { m: "May", a: 26, b: 17 },
];
const CHART_COMMON = {
  width: 220,
  height: 96,
  showLegend: false,
  showTooltip: false,
  chartAnimation: false,
  margin: { top: 6, right: 6, bottom: 6, left: 6 },
} as const;
const CHART_SERIES = [
  { dataKey: "a", name: "A", color: "var(--pt-chart-1)" },
  { dataKey: "b", name: "B", color: "var(--pt-chart-2)" },
];

/** A floating panel drawn with library parts (for overlay schematics). */
function Panel({ title, children, width = "13rem" }: { title: string; children?: React.ReactNode; width?: string }) {
  return (
    <div className="pt-pv-panel" style={{ width }}>
      <div className="pt-pv-panel__title">{title}</div>
      {children}
    </div>
  );
}

const MENU = (
  <div className="pt-pv-menu">
    <span>Rename</span>
    <span data-active="true">Duplicate</span>
    <span>Archive</span>
  </div>
);

export const PREVIEWS: Record<string, Preview> = {
  /* Actions */
  Button: live(() => (
    <div className="pt-pv-row">
      <Button size="sm">Save</Button>
      <Button size="sm" variant="outlinePrimary">
        Cancel
      </Button>
    </div>
  )),
  ButtonGroup: live(() => (
    <ButtonGroup>
      <Button size="sm" variant="outlineSecondary">
        Day
      </Button>
      <Button size="sm" variant="outlineSecondary">
        Week
      </Button>
      <Button size="sm" variant="outlineSecondary">
        Month
      </Button>
    </ButtonGroup>
  )),
  Hyperlink: live(() => <Hyperlink href="#components">Read the release notes</Hyperlink>),
  DropdownMenu: schematic(() => (
    <div className="pt-pv-stack">
      <Button size="sm" variant="outlineSecondary">
        Actions ▾
      </Button>
      {MENU}
    </div>
  )),
  ContextMenu: schematic(() => (
    <div className="pt-pv-stack">
      <div className="pt-pv-target">Right-click a row</div>
      {MENU}
    </div>
  )),
  ToggleButton: live(() => (
    <div className="pt-pv-row">
      <ToggleButton defaultPressed ariaLabel="Bold">
        B
      </ToggleButton>
      <ToggleButton ariaLabel="Italic">I</ToggleButton>
    </div>
  )),
  ToggleGroup: live(() => (
    <ToggleGroup
      type="single"
      defaultValue="grid"
      ariaLabel="View"
      items={[
        { value: "grid", label: "Grid" },
        { value: "list", label: "List" },
        { value: "board", label: "Board" },
      ]}
    />
  )),
  Pagination: live(() => <Pagination page={2} pageCount={5} onPageChange={noop} showFirstLast={false} />),

  /* Forms */
  Input: live(() => <Input placeholder="name@company.com" ariaLabel="Email" fullWidth />),
  InputSearch: live(() => <InputSearch placeholder="Search…" ariaLabel="Search" fullWidth />),
  TextArea: live(() => <TextArea rows={2} ariaLabel="Notes" fullWidth defaultValue="Ship on Friday." />),
  Select: live(() => (
    <Select
      fullWidth
      placeholder="Region"
      options={[
        { label: "Europe", value: "eu" },
        { label: "Americas", value: "am" },
      ]}
    />
  )),
  Combobox: live(() => (
    <Combobox
      fullWidth
      placeholder="Assign owner"
      options={[
        { label: "Ada", value: "ada" },
        { label: "Grace", value: "grace" },
      ]}
    />
  )),
  CheckBox: live(() => (
    <div className="pt-pv-stack pt-pv-stack--start">
      <CheckBox label="Email updates" checked onChange={noop} />
      <CheckBox label="SMS" checked={false} onChange={noop} />
    </div>
  )),
  Switch: live(() => <Switch label="Auto-save" defaultChecked />),
  RadioGroup: live(() => (
    <RadioGroup
      name="pt-preview-plan"
      selectedValue="pro"
      onChange={noop}
      options={[
        { label: "Starter", value: "starter" },
        { label: "Pro", value: "pro" },
      ]}
    />
  )),
  Slider: live(() => <Slider defaultValue={60} ariaLabel="Volume" />),
  ColorPicker: live(() => <ColorPicker defaultValue="#2563eb" swatchSize="sm" showHexInput={false} ariaLabel="Accent" />),
  OtpBox: live(() => <OtpBox length={4} />),
  DatePicker: live(() => <DatePicker placeholder="Pick a date" fullWidth />),
  DateRangePicker: live(() => <DateRangePicker ariaLabel="Period" placeholder="Last 7 days" />),
  NumberInput: live(() => <NumberInput defaultValue={1200} label="Amount" />),
  SegmentedControl: live(() => (
    <SegmentedControl
      ariaLabel="Range"
      defaultValue="w"
      options={[
        { value: "d", label: "Day" },
        { value: "w", label: "Week" },
        { value: "m", label: "Month" },
      ]}
    />
  )),
  FileUpload: live(() => <FileUpload label="Attach file" variant="button" />),
  Form: schematic(() => (
    <div className="pt-pv-stack">
      <Input placeholder="First name" ariaLabel="First name" fullWidth />
      <Input placeholder="Last name" ariaLabel="Last name" fullWidth />
      <Button size="sm">Submit</Button>
    </div>
  )),
  FormField: live(() => (
    <FormField label="Workspace" hint="Shown to your team" required>
      <Input placeholder="acme" fullWidth />
    </FormField>
  )),

  /* Display */
  TextView: live(() => (
    <div className="pt-pv-stack pt-pv-stack--start">
      <TextView variant="h3">Quarterly report</TextView>
      <TextView variant="secondary">Updated 2 hours ago</TextView>
    </div>
  )),
  "Badge / Chip / Tag": live(() => (
    <div className="pt-pv-row">
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge tone="outline">v2</Badge>
    </div>
  )),
  IconBox: live(() => (
    <div className="pt-pv-row">
      <IconBox tone="strong">
        <IconLayers />
      </IconBox>
      <IconBox tone="success">
        <IconCheck />
      </IconBox>
      <IconBox tone="info">
        <IconBell />
      </IconBox>
    </div>
  )),
  StatCard: live(() => (
    <StatCard size="sm" label="Revenue" value="$48.2k" delta={{ value: "+12%", trend: "up", label: "vs last month" }} />
  )),
  CodeBlock: live(() => <CodeBlock code="npm i ui-common-components" language="bash" showCopy={false} />),
  Icon: live(() => (
    <div className="pt-pv-row">
      <Icon src={<IconSearch />} decorative />
      <Icon src={<IconUsers />} decorative />
      <Icon src={<IconChart />} decorative />
    </div>
  )),
  Avtar: live(() => (
    <div className="pt-pv-row">
      <Avtar name="Ada Lovelace" status="online" />
      <Avtar name="Grace Hopper" />
    </div>
  )),
  ProgressBar: live(() => <ProgressBar value={64} ariaLabel="Upload" showValue />),
  ToolTip: schematic(() => (
    <div className="pt-pv-stack">
      <div className="pt-pv-bubble">Explains a field</div>
      <ToolTip tooltipText="Explains a field" />
    </div>
  )),
  Divider: live(() => (
    <div className="pt-pv-stack" style={{ width: "100%" }}>
      <Divider>OR</Divider>
    </div>
  )),
  GradientText: live(() => (
    <GradientText as="span" className="pt-pv-display">
      Design
    </GradientText>
  )),
  Kbd: live(() => (
    <div className="pt-pv-row">
      <Kbd keys={["Meta", "K"]} />
      <Kbd>Esc</Kbd>
    </div>
  )),

  /* Layout & navigation */
  Card: live(() => (
    <Card variant="bordered" style={{ width: "100%" }}>
      <CardHeader>
        <CardTitle as="div">Team plan</CardTitle>
      </CardHeader>
      <CardContent>12 seats · renews May</CardContent>
    </Card>
  )),
  List: live(() => (
    <List aria-label="Settings" size="sm">
      <ListItem title="Notifications" description="Email and push" />
      <ListItem title="Security" description="2FA enabled" />
    </List>
  )),
  Grid: live(() => (
    <Grid columns={3} gap="var(--space-1)" style={{ width: "100%" }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="pt-pv-cell" />
      ))}
    </Grid>
  )),
  Tabs: live(() => (
    <Tabs defaultValue="overview" size="sm" contentAnimation="none">
      <TabsList ariaLabel="Sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <span className="pt-pv-muted">Panel content</span>
      </TabsContent>
    </Tabs>
  )),
  Accordion: live(() => (
    <Accordion type="single" defaultValue="a" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>2–4 business days.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>30 days.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )),
  Stepper: live(() => (
    <Stepper defaultValue={1} ariaLabel="Checkout" size="sm">
      <StepperStep label="Cart" />
      <StepperStep label="Ship" />
      <StepperStep label="Pay" />
    </Stepper>
  )),
  Wizard: schematic(() => (
    <div className="pt-pv-stack" style={{ width: "100%" }}>
      <Stepper defaultValue={1} ariaLabel="Wizard" size="sm">
        <StepperStep label="Details" />
        <StepperStep label="Review" />
      </Stepper>
      <div className="pt-pv-row">
        <Button size="xs" variant="outlineSecondary">
          Back
        </Button>
        <Button size="xs">Next</Button>
      </div>
    </div>
  )),
  CommandPalette: schematic(() => (
    <Panel title="Search or run a command" width="100%">
      <div className="pt-pv-menu">
        <span data-active="true">
          New invoice <Kbd keys={["Meta", "N"]} size="sm" />
        </span>
        <span>Open settings</span>
      </div>
    </Panel>
  )),
  Breadcrumb: live(() => (
    <Breadcrumb ariaLabel="Location">
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#billing">Billing</BreadcrumbItem>
      <BreadcrumbItem>Invoices</BreadcrumbItem>
    </Breadcrumb>
  )),
  PageHeader: live(() => <PageHeader title="Invoices" description="42 open · 3 overdue" titleAs="h4" />),
  Tooltip: schematic(() => (
    <div className="pt-pv-stack">
      <div className="pt-pv-bubble">Copied to clipboard</div>
      <Button size="sm" variant="outlineSecondary">
        Copy link
      </Button>
    </div>
  )),

  /* Overlays */
  Modal: schematic(() => (
    <Panel title="Delete project?">
      <p className="pt-pv-muted">This can’t be undone.</p>
      <div className="pt-pv-row pt-pv-row--end">
        <Button size="xs" variant="outlineSecondary">
          Cancel
        </Button>
        <Button size="xs" variant="danger">
          Delete
        </Button>
      </div>
    </Panel>
  )),
  "Drawer / Sheet": schematic(() => (
    <div className="pt-pv-drawer">
      <div className="pt-pv-drawer__page" />
      <Panel title="Edit customer" width="55%">
        <Skeleton lines={3} animated={false} />
      </Panel>
    </div>
  )),
  AlertDialog: schematic(() => (
    <Panel title="Discard changes?">
      <div className="pt-pv-row pt-pv-row--end">
        <Button size="xs" variant="outlineSecondary">
          Keep
        </Button>
        <Button size="xs" variant="danger">
          Discard
        </Button>
      </div>
    </Panel>
  )),
  Popover: schematic(() => (
    <div className="pt-pv-stack">
      <Button size="sm" variant="outlineSecondary">
        Filters
      </Button>
      <Panel title="Status">
        <CheckBox label="Open" checked onChange={noop} size="sm" />
      </Panel>
    </div>
  )),
  Calendar: live(() => (
    <div className="pt-pv-scale">
      <Calendar size="sm" month={new Date(2026, 10, 1)} defaultValue={new Date(2026, 10, 18)} />
    </div>
  )),
  LoadingOverlay: live(() => (
    <LoadingOverlay visible label="Loading report">
      <div className="pt-pv-skeleton-box">
        <Skeleton lines={3} animated={false} />
      </div>
    </LoadingOverlay>
  )),

  /* Feedback */
  Toast: live(() => <Toast title="Changes saved" variant="success" dismissible={false} />),
  Alert: live(() => (
    <Alert variant="warning" title="Payment due" live="off" compact>
      Invoice #1042 is overdue.
    </Alert>
  )),
  Spinner: live(() => (
    <div className="pt-pv-row">
      <Spinner size="md" label="Loading" />
      <span className="pt-pv-muted">Loading…</span>
    </div>
  )),
  Skeleton: live(() => (
    <div className="pt-pv-stack" style={{ width: "100%" }}>
      <Skeleton lines={3} animated={false} />
    </div>
  )),
  EmptyState: live(() => <EmptyState title="No invoices yet" compact size="sm" />),
  ErrorState: live(() => <ErrorState title="Could not load" compact size="sm" />),
  OfflineBanner: live(() => <OfflineBanner headline="You are offline" compact />),
  FeedbackState: live(() => <FeedbackState variant="success" title="All done" compact size="sm" />),

  /* Shell */
  DashboardShell: schematic(() => (
    <div className="pt-pv-shell">
      <div className="pt-pv-shell__rail" />
      <div className="pt-pv-shell__main">
        <div className="pt-pv-shell__bar" />
        <div className="pt-pv-shell__body">
          <div className="pt-pv-cell" />
          <div className="pt-pv-cell" />
        </div>
      </div>
    </div>
  )),
  AppSidebar: schematic(() => (
    <div className="pt-pv-nav">
      <span data-active="true">
        <IconGrid /> Overview
      </span>
      <span>
        <IconUsers /> Customers
      </span>
      <span>
        <IconChart /> Reports
      </span>
    </div>
  )),
  AppTopbar: schematic(() => (
    <div className="pt-pv-topbar">
      <IconPanel />
      <strong>Dashboard</strong>
      <span className="pt-pv-topbar__search">
        <IconSearch /> Search
      </span>
      <Avtar name="Ada Lovelace" size={24} />
    </div>
  )),
  AppShell: schematic(() => (
    <div className="pt-pv-row">
      <Badge tone="outline">AppShell</Badge>
      <span aria-hidden>→</span>
      <Badge variant="success">DashboardShell</Badge>
    </div>
  )),

  /* Data */
  Table: live(() => (
    <Table
      size="sm"
      searchable={false}
      pagination={false}
      rowKey="id"
      columns={[
        { key: "name", header: "Name" },
        { key: "amount", header: "Amount", align: "right" },
      ]}
      data={[
        { id: "1", name: "Acme", amount: "$1,200" },
        { id: "2", name: "Globex", amount: "$860" },
      ]}
    />
  )),
  DataTable: schematic(() => (
    <div className="pt-pv-stack" style={{ width: "100%" }}>
      <div className="pt-pv-row">
        <Badge tone="outline">2 selected</Badge>
        <Button size="xs" variant="outlineSecondary">
          Export CSV
        </Button>
      </div>
      <Skeleton lines={3} animated={false} />
    </div>
  )),
  FilterBar: schematic(() => (
    <div className="pt-pv-stack" style={{ width: "100%" }}>
      <InputSearch placeholder="Search…" ariaLabel="Search" fullWidth />
      <div className="pt-pv-row">
        <Badge onDismiss={noop} dismissLabel="Remove">
          Status: Open
        </Badge>
        <Badge onDismiss={noop} dismissLabel="Remove">
          Owner: Ada
        </Badge>
      </div>
    </div>
  )),
  "LineChart · AreaChart": live(() => <AreaChart {...CHART_COMMON} data={MINI_CHART} xAxisKey="m" series={CHART_SERIES} />),
  "BarChart · PieChart": live(() => <BarChart {...CHART_COMMON} data={MINI_CHART} xAxisKey="m" series={CHART_SERIES} barSize={10} />),
  ComposedChart: live(() => (
    <ComposedChart
      {...CHART_COMMON}
      data={MINI_CHART}
      xAxisKey="m"
      series={[
        { type: "bar", dataKey: "a", name: "A", color: "var(--pt-chart-1)" },
        { type: "line", dataKey: "b", name: "B", color: "var(--pt-chart-2)" },
      ]}
    />
  )),
};

export function getPreview(name: string): Preview | undefined {
  return PREVIEWS[name];
}
