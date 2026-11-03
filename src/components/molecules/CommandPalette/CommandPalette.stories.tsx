import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CommandPalette from "./index";
import Kbd from "../../atoms/Kbd";
import Button from "../../atoms/Button";
import type { CommandGroup } from "./CommandPalette.types";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const log = (what: string) => () => {
  // eslint-disable-next-line no-console
  console.log(`[CommandPalette] ${what}`);
};

const GROUPS: CommandGroup[] = [
  {
    id: "navigation",
    label: "Navigation",
    items: [
      { id: "dashboard", label: "Go to dashboard", icon: icon("M3 12 12 3l9 9M5 10v10h14V10"), shortcut: ["g", "d"], onSelect: log("dashboard") },
      { id: "invoices", label: "Go to invoices", icon: icon("M6 3h12v18l-3-2-3 2-3-2-3 2z"), keywords: ["billing", "bills"], onSelect: log("invoices") },
      { id: "settings", label: "Open settings", icon: icon("M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"), keywords: ["preferences", "config"], shortcut: ["mod", ","], onSelect: log("settings") },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    items: [
      { id: "new-invoice", label: "New invoice", description: "Create a draft invoice", icon: icon("M12 5v14M5 12h14"), shortcut: ["mod", "shift", "n"], onSelect: log("new invoice") },
      { id: "invite", label: "Invite teammate", description: "Send an email invitation", icon: icon("M4 6h16v12H4zM4 6l8 7 8-7"), onSelect: log("invite") },
      { id: "export", label: "Export data", description: "Requires the Pro plan", disabled: true, icon: icon("M12 3v12m0 0-4-4m4 4 4-4M5 21h14"), onSelect: log("export") },
      { id: "logout", label: "Log out", icon: icon("M15 3h4v18h-4M10 17l5-5-5-5M15 12H3"), onSelect: log("logout") },
    ],
  },
];

const RECENT: CommandGroup = {
  id: "recent",
  label: "Recent",
  items: [{ id: "recent-invoices", label: "Go to invoices", onSelect: log("recent invoices") }],
};

const meta: Meta<typeof CommandPalette> = {
  title: "Design System/Molecules/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Modal command menu opened with ⌘K / Ctrl+K (`hotkey`, `enableHotkey`) or controlled `open` / `onOpenChange`. Follows the APG combobox pattern: focus stays in the search input, ↑/↓/Home/End move the highlighted option (`aria-activedescendant`), Enter runs it, Escape closes and focus returns to the opener. Local `groups` are ranked (prefix > word start > substring; `keywords` count); `onSearch` adds debounced remote results with a loading state and the result count is announced politely once typing settles. The hotkey is ignored while typing in other fields unless `allowInInputs`. Full-screen at ≤ 480px.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    enableHotkey: { control: "boolean" },
    allowInInputs: { control: "boolean" },
    closeOnSelect: { control: "boolean" },
    shouldFilter: { control: "boolean" },
    loading: { control: "boolean" },
    showFooter: { control: "boolean" },
    hotkey: { control: "object" },
    emptyState: { control: "text" },
  },
  args: {
    groups: GROUPS,
    placeholder: "Type a command or search…",
    enableHotkey: true,
    allowInInputs: false,
    closeOnSelect: true,
    showFooter: true,
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

function Launcher(args: React.ComponentProps<typeof CommandPalette>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sb-page sb-stack">
      <div className="sb-inline">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open command palette
        </Button>
        <span>
          or press <Kbd keys={args.hotkey ?? ["mod", "k"]} />
        </span>
      </div>
      <CommandPalette {...args} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <Launcher {...args} />,
};

export const WithRecent: Story = {
  args: { recent: RECENT },
  render: (args) => <Launcher {...args} />,
};

const ACCOUNTS = ["Acme Corp", "Acme Labs", "Globex", "Initech", "Umbrella", "Stark Industries", "Wayne Enterprises"];

export const RemoteSearch: Story = {
  args: {
    groups: GROUPS.slice(1),
    onSearch: (query: string, { signal }: { signal: AbortSignal }) =>
      new Promise<CommandGroup[]>((resolve) => {
        const timer = setTimeout(() => {
          const q = query.trim().toLowerCase();
          const hits = q ? ACCOUNTS.filter((a) => a.toLowerCase().includes(q)) : [];
          resolve(hits.length ? [{ id: "accounts", label: "Accounts", items: hits.map((a) => ({ id: a, label: a, onSelect: log(a) })) }] : []);
        }, 600);
        signal.addEventListener("abort", () => clearTimeout(timer));
      }),
  },
  render: (args) => <Launcher {...args} />,
};

export const Loading: Story = {
  args: { loading: true, groups: [] },
  render: (args) => <Launcher {...args} />,
};

export const EmptyState: Story = {
  args: { groups: [], emptyState: "No commands yet. Try a different search." },
  render: (args) => <Launcher {...args} />,
};

export const CustomHotkey: Story = {
  args: { hotkey: ["mod", "shift", "p"] },
  render: (args) => <Launcher {...args} />,
};

export const HotkeyInInputs: Story = {
  args: { allowInInputs: true },
  render: (args) => (
    <div className="sb-stack">
      <label className="sb-stack">
        <span>The hotkey also works while typing here</span>
        <input aria-label="Notes" />
      </label>
      <Launcher {...args} />
    </div>
  ),
};
