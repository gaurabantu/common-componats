import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./index";

const meta: Meta<typeof Popover> = {
  title: "Design System/Molecules/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popover>;

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

/** Optional `showPointer` — caret toward the trigger; default is a plain box (no pointer). */
export const WithPointer: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>Open with pointer</PopoverTrigger>
      <PopoverContent showPointer>
        <p style={{ margin: 0 }}>Panel visually anchored to the trigger via a small arrow.</p>
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
