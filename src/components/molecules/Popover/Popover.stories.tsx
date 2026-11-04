import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Listbox,
  ListboxOption,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./index";
import Button from "../../atoms/Button";
import Modal from "../Modal";

const meta: Meta<typeof Popover> = {
  title: "Design System/Molecules/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
    defaultOpen: { control: "boolean" },
    open: { control: "boolean" },
    onOpenChange: { control: false },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Playground: Story = {
  render: function PlaygroundDemo(args) {
    const [open, setOpen] = useState(args.open ?? args.defaultOpen ?? false);
    useEffect(() => {
      setOpen(args.open ?? args.defaultOpen ?? false);
    }, [args.open, args.defaultOpen]);

    return (
      <Popover {...args} open={open} onOpenChange={setOpen}>
        <PopoverTrigger>Open panel</PopoverTrigger>
        <PopoverContent>
          <p style={{ margin: 0 }}>Use Controls to try placement, open, and defaultOpen.</p>
        </PopoverContent>
      </Popover>
    );
  },
  args: {
    placement: "bottom-start",
    defaultOpen: false,
  },
};

export const BasicPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>Open panel</PopoverTrigger>
      <PopoverContent>
        <p style={{ margin: 0 }}>Any content: filters, help text, or forms.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const DropdownMenuStory: Story = {
  render: function MenuDemo() {
    const [log, setLog] = useState("");
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>⋮ Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setLog("Resend")}>Resend</DropdownMenuItem>
            <DropdownMenuItem variant="danger" onSelect={() => setLog("Delete")}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {log ? (
          <p style={{ marginTop: 12, fontSize: 12 }} role="status">
            Last: {log}
          </p>
        ) : null}
      </div>
    );
  },
};

export const IconTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open row actions"
        style={{
          padding: "8px 12px",
          border: "1px solid var(--color-border-default)",
          borderRadius: 6,
          background: "var(--color-bg-surface)",
          cursor: "pointer",
        }}
      >
        ⋮
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => undefined}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => undefined}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem variant="danger" onSelect={() => undefined}>
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** Optional `showPointer={false}` — plain panel without the trigger arrow (popover default is anchored with a caret). */
export const PlainPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>Open plain panel</PopoverTrigger>
      <PopoverContent showPointer={false}>
        <p style={{ margin: 0 }}>Floating card without a caret (use for wide panels or when the arrow would clip).</p>
      </PopoverContent>
    </Popover>
  ),
};

export const DropdownWithPointer: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Actions"
        style={{
          padding: "8px 12px",
          border: "1px solid var(--color-border-default)",
          borderRadius: 6,
          background: "var(--color-bg-surface)",
          cursor: "pointer",
        }}
      >
        ⋮
      </DropdownMenuTrigger>
      <DropdownMenuContent showPointer>
        <DropdownMenuItem onSelect={() => undefined}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => undefined}>Duplicate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** `asChild` — the library `Button` is the trigger; no nested `<button>`. */
export const AsChildTrigger: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-2)" }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outlineSecondary" size="sm">
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p style={{ margin: 0 }}>Filter panel anchored to a library Button.</p>
        </PopoverContent>
      </Popover>
      <DropdownMenu placement="bottom-end">
        <DropdownMenuTrigger asChild>
          <Button variant="primary" size="sm">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Run</DropdownMenuItem>
          <DropdownMenuItem>Schedule</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

/** Labels, groups, separators, descriptions, shortcuts and indent levels. */
export const MenuSections: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outlineSecondary" size="sm">
          Integration actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Integration actions">
        <DropdownMenuGroup label="Setup">
          <DropdownMenuItem description="Source, target and schedule">Edit integration</DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘D">Duplicate</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup label="Configure">
          <DropdownMenuItem>Map dimensions</DropdownMenuItem>
          <DropdownMenuItem indent={1}>Map members</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Other</DropdownMenuLabel>
        <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** `DropdownMenuCheckboxItem` and `DropdownMenuRadioGroup` / `DropdownMenuRadioItem` keep the menu open. */
export const CheckboxAndRadioItems: Story = {
  render: function CheckRadioDemo() {
    const [totals, setTotals] = useState(true);
    const [zeros, setZeros] = useState(false);
    const [density, setDensity] = useState("cozy");
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outlineSecondary" size="sm">
              View options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Show</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={totals} onCheckedChange={setTotals}>
              Totals
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={zeros} onCheckedChange={setZeros}>
              Zero rows
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup label="Density" value={density} onValueChange={setDensity}>
              <DropdownMenuRadioItem value="cozy">Cozy</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <p style={{ marginTop: "var(--space-2)", color: "var(--color-text-secondary)" }}>
          totals={String(totals)} · zeros={String(zeros)} · density={density}
        </p>
      </div>
    );
  },
};

/**
 * Inside a Modal the menu renders on top by default (`--z-popover` 450 > `--z-modal` 400) and is
 * lifted above any host overlay stacked higher (here a Modal at `zIndex={10000}`).
 * Escape closes only the menu; the dialog stays open.
 */
export const InsideModal: Story = {
  render: function InsideModalDemo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button size="sm" onClick={() => setOpen(true)}>
          Open dialog (z 10000)
        </Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Member details" zIndex={10000} hideFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outlineSecondary" size="sm">
                Member actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Move</DropdownMenuItem>
              <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Modal>
      </>
    );
  },
};

/** Explicit `zIndex` when the host app owns its own layer scale. */
export const ExplicitZIndex: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outlineSecondary" size="sm">
          zIndex=12000
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent zIndex={12000}>
        <DropdownMenuItem>Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** `PopoverAnchor` / `anchorRef` — position against something other than the trigger. */
export const ExternalAnchor: Story = {
  render: function AnchorDemo() {
    const cellRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <Popover>
          <PopoverAnchor
            style={{
              display: "inline-flex",
              gap: "var(--space-1)",
              padding: "var(--space-0)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-md)",
              width: "fit-content",
            }}
          >
            <input aria-label="Account" placeholder="Account" style={{ border: "none", outline: "none" }} />
            <PopoverTrigger aria-label="Pick account">▾</PopoverTrigger>
          </PopoverAnchor>
          <PopoverContent showPointer={false}>Aligned to the whole field, not the ▾ icon.</PopoverContent>
        </Popover>

        <div>
          <div
            ref={cellRef}
            style={{
              display: "inline-block",
              padding: "var(--space-1) var(--space-2)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            Grid cell B4
          </div>
          <Button size="sm" variant="outlineSecondary" onClick={() => setOpen((o) => !o)} style={{ marginLeft: "var(--space-2)" }}>
            Toggle cell popover
          </Button>
          <Popover open={open} onOpenChange={setOpen} anchorRef={cellRef}>
            <PopoverContent aria-label="Cell B4">Anchored to the cell via anchorRef (no PopoverTrigger).</PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

/** `Listbox` + `ListboxOption` — the menu-row look for selection lists outside DropdownMenu. */
export const ListboxOptions: Story = {
  render: function ListboxDemo() {
    const [value, setValue] = useState("uae");
    const rows = [
      { id: "group", label: "Group", indent: 0, description: "Consolidated" },
      { id: "uae", label: "UAE Holdings", indent: 1, description: "AED" },
      { id: "ksa", label: "KSA Trading", indent: 1, description: "SAR" },
      { id: "closed", label: "Dormant Co", indent: 1, description: "Closed", disabled: true },
    ];
    return (
      <Listbox aria-label="Entity" style={{ width: 280, border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-0)" }}>
        {rows.map((r) => (
          <ListboxOption
            key={r.id}
            selected={value === r.id}
            disabled={r.disabled}
            indent={r.indent}
            description={r.description}
            onSelect={() => setValue(r.id)}
          >
            {r.label}
          </ListboxOption>
        ))}
      </Listbox>
    );
  },
};
