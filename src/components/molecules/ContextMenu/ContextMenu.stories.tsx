import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./index";
import type { ContextMenuPosition } from "./ContextMenu.types";
import Button from "../../atoms/Button";
import Modal from "../Modal";

const meta: Meta<typeof ContextMenu> = {
  title: "Design System/Molecules/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Menu that opens at the pointer. Right-click the trigger region (or focus it and press Shift+F10 / the Menu key). " +
          "Arrow keys / Home / End / typeahead move between items, Escape closes and returns focus, the panel is clamped to the viewport, " +
          "and clicks outside close it without a full-screen click-catcher. Items are the DropdownMenu parts.",
      },
    },
  },
  argTypes: {
    children: { control: false },
    onOpenChange: { control: false },
    position: { control: false },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

const regionStyle: React.CSSProperties = {
  display: "grid",
  placeItems: "center",
  height: 180,
  border: "1px dashed var(--color-border-default)",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text-secondary)",
  userSelect: "none",
};

export const Default: Story = {
  args: { disabled: false },
  render: function DefaultDemo(args) {
    const [log, setLog] = useState("—");
    const [frozen, setFrozen] = useState(false);
    return (
      <div>
        <ContextMenu {...args}>
          <ContextMenuTrigger tabIndex={0} style={regionStyle} aria-label="Cell area — right-click for actions">
            Right-click anywhere here
          </ContextMenuTrigger>
          <ContextMenuContent aria-label="Cell actions">
            <ContextMenuLabel>Cell</ContextMenuLabel>
            <ContextMenuItem shortcut="⌘C" onSelect={() => setLog("Copy")}>
              Copy
            </ContextMenuItem>
            <ContextMenuItem shortcut="⌘V" disabled>
              Paste
            </ContextMenuItem>
            <ContextMenuItem description="Opens the source ledger" onSelect={() => setLog("Drill through")}>
              Drill through
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked={frozen} onCheckedChange={setFrozen}>
              Freeze row
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="danger" onSelect={() => setLog("Clear")}>
              Clear cell
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <p style={{ color: "var(--color-text-secondary)" }}>
          Last action: {log} · frozen={String(frozen)}
        </p>
      </div>
    );
  },
};

/** Imperative form: the grid resolves the cell itself, then sets `open` + `position`. */
export const ControlledGrid: Story = {
  render: function ControlledDemo() {
    const [menu, setMenu] = useState<{ open: boolean; pos: ContextMenuPosition; cell: string }>({
      open: false,
      pos: { x: 0, y: 0 },
      cell: "",
    });
    const cells = ["A1", "B1", "C1", "A2", "B2", "C2"];
    return (
      <div>
        <div role="grid" aria-label="Demo grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 120px)" }}>
          {cells.map((c) => (
            <div
              key={c}
              role="gridcell"
              tabIndex={0}
              onContextMenu={(e) => {
                e.preventDefault();
                setMenu({ open: true, pos: { x: e.clientX, y: e.clientY }, cell: c });
              }}
              style={{
                padding: "var(--space-1) var(--space-2)",
                border: "1px solid var(--color-border-default)",
                background: menu.open && menu.cell === c ? "var(--color-interactive-row-hover)" : undefined,
              }}
            >
              {c}
            </div>
          ))}
        </div>
        <ContextMenu
          open={menu.open}
          position={menu.pos}
          onOpenChange={(open) => setMenu((m) => ({ ...m, open }))}
        >
          <ContextMenuContent aria-label={`Actions for ${menu.cell}`}>
            <ContextMenuLabel>{menu.cell}</ContextMenuLabel>
            <ContextMenuItem>Insert row above</ContextMenuItem>
            <ContextMenuItem>Insert row below</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Add comment</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  },
};

/** Right-click inside a Modal stacked at z 10000 — the menu is lifted above it automatically. */
export const InsideModal: Story = {
  render: function InsideModalDemo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button size="sm" onClick={() => setOpen(true)}>
          Open dialog (z 10000)
        </Button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Group editor" zIndex={10000} hideFooter>
          <ContextMenu>
            <ContextMenuTrigger tabIndex={0} style={regionStyle}>
              Right-click inside the dialog
            </ContextMenuTrigger>
            <ContextMenuContent aria-label="Group actions">
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
              <ContextMenuItem variant="danger">Remove</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Modal>
      </>
    );
  },
};
