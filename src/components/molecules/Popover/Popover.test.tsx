import React, { useRef, useState } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createPortal } from "react-dom";
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
import { getAncestorZIndex, resolveLayerZIndex } from "./layering";
import Button from "../../atoms/Button";

function BasicMenu(props: { zIndex?: number | string; onDelete?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent zIndex={props.zIndex}>
        <DropdownMenuItem onSelect={() => undefined}>Resend</DropdownMenuItem>
        <DropdownMenuItem variant="danger" onSelect={props.onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("Popover — layering", () => {
  it("defaults to the --z-popover token layer (above --z-modal)", () => {
    render(<BasicMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu").style.zIndex).toBe("var(--z-popover, 450)");
  });

  it("honours an explicit zIndex prop", () => {
    render(<BasicMenu zIndex={12000} />);
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByRole("menu").style.zIndex).toBe("12000");
  });

  it("lifts itself above a stacked ancestor (host dialog at z 10000)", () => {
    render(
      <div style={{ position: "fixed", zIndex: 10000 }}>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Panel</PopoverContent>
        </Popover>
      </div>
    );
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog").style.zIndex).toBe("10001");
  });

  it("resolveLayerZIndex / getAncestorZIndex helpers", () => {
    const outer = document.createElement("div");
    outer.style.zIndex = "300";
    const inner = document.createElement("span");
    outer.appendChild(inner);
    document.body.appendChild(outer);
    expect(getAncestorZIndex(inner)).toBe(300);
    // 300 + 1 < token fallback 450 → keep the token
    expect(resolveLayerZIndex(inner, undefined)).toBe("var(--z-popover, 450)");
    outer.style.zIndex = "9999";
    expect(resolveLayerZIndex(inner, undefined)).toBe(10000);
    expect(resolveLayerZIndex(inner, "var(--x)")).toBe("var(--x)");
    expect(resolveLayerZIndex(null, undefined, "--z-tooltip-top", 600)).toBe("var(--z-tooltip-top, 600)");
    outer.remove();
  });
});

describe("Popover — asChild & anchors", () => {
  it("PopoverTrigger asChild renders the child as the trigger (no nested button)", () => {
    const { container } = render(
      <Popover>
        <PopoverTrigger asChild className="from-trigger">
          <button type="button" className="mine">
            Filters
          </button>
        </PopoverTrigger>
        <PopoverContent>Panel</PopoverContent>
      </Popover>
    );
    expect(container.querySelectorAll("button")).toHaveLength(1);
    const trigger = screen.getByRole("button", { name: "Filters" });
    expect(trigger).toHaveClass("mine", "from-trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", screen.getByRole("dialog").id);
  });

  it("DropdownMenuTrigger asChild works with the library Button and keeps the child's onClick", () => {
    const childClick = vi.fn();
    const { container } = render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outlineSecondary" onClick={childClick}>
            More
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Rename</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    const trigger = screen.getByRole("button", { name: "More" });
    expect(trigger.querySelector("button")).toBeNull();
    expect(container.querySelectorAll("button")).toHaveLength(1);
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    fireEvent.click(trigger);
    expect(childClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("a child onClick that calls preventDefault cancels the toggle", () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" onClick={(e) => e.preventDefault()}>
            Guarded
          </button>
        </PopoverTrigger>
        <PopoverContent>Panel</PopoverContent>
      </Popover>
    );
    fireEvent.click(screen.getByRole("button", { name: "Guarded" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("anchorRef: opens against an external element with no trigger; clicks on the anchor don't close", () => {
    function Demo() {
      const cellRef = useRef<HTMLDivElement>(null);
      const [open, setOpen] = useState(true);
      return (
        <>
          <div ref={cellRef} data-testid="cell">
            Cell
          </div>
          <button type="button">Elsewhere</button>
          <Popover open={open} onOpenChange={setOpen} anchorRef={cellRef}>
            <PopoverContent aria-label="Cell details">Details</PopoverContent>
          </Popover>
        </>
      );
    }
    render(<Demo />);
    const panel = screen.getByRole("dialog", { name: "Cell details" });
    expect(panel).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId("cell"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("PopoverAnchor positions against its element and counts as inside", () => {
    render(
      <Popover>
        <PopoverAnchor data-testid="anchor">
          <input aria-label="Search" />
          <PopoverTrigger>Open</PopoverTrigger>
        </PopoverAnchor>
        <PopoverContent>Panel</PopoverContent>
      </Popover>
    );
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.mouseDown(screen.getByRole("textbox", { name: "Search" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Popover — dismissal", () => {
  it("Escape is marked handled so an enclosing Modal/Drawer stays open", () => {
    const outer = vi.fn();
    const listener = (e: KeyboardEvent) => outer(e.defaultPrevented);
    document.addEventListener("keydown", listener);
    render(<BasicMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(outer).toHaveBeenCalledWith(true);
    document.removeEventListener("keydown", listener);
  });

  it("Escape closes only the top-most of nested popovers", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Outer</PopoverTrigger>
        <PopoverContent aria-label="outer panel">
          <Popover defaultOpen>
            <PopoverTrigger>Inner</PopoverTrigger>
            <PopoverContent aria-label="inner panel">Inner body</PopoverContent>
          </Popover>
        </PopoverContent>
      </Popover>
    );
    expect(screen.getAllByRole("dialog")).toHaveLength(2);
    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    expect(screen.getByRole("dialog", { name: "outer panel" })).toBeInTheDocument();
  });

  it("mousedown inside a nested portal rendered from the panel does not close it", () => {
    function NestedPortal() {
      return createPortal(<div data-testid="nested">nested</div>, document.body);
    }
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <NestedPortal />
        </PopoverContent>
      </Popover>
    );
    fireEvent.mouseDown(screen.getByTestId("nested"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("returns focus to the trigger after closing", async () => {
    render(<BasicMenu />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("menuitem", { name: "Resend" }));
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});

describe("DropdownMenu — parts", () => {
  it("renders label, separator and a labelled group", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Setup</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup label="Other">
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText("Setup")).toHaveClass("ds-dropdown-menu__label");
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
    expect(screen.getByRole("group", { name: "Other" })).toContainElement(
      screen.getByRole("menuitem", { name: "Archive" })
    );
  });

  it("item description, shortcut, icon and indent", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem description="Copies to clipboard" shortcut="⌘C" icon={<span>i</span>} indent={2}>
            Copy
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    const item = screen.getByRole("menuitem", { name: /Copy/ });
    expect(item).toHaveTextContent("Copies to clipboard");
    expect(item.querySelector(".ds-dropdown-menu__item-shortcut")).toHaveAttribute("aria-hidden", "true");
    expect(item.style.paddingInlineStart).toContain("2 * var(--space-2");
  });

  it("closeOnSelect={false} keeps the menu open", () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem closeOnSelect={false} onSelect={onSelect}>
            Refresh
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "Refresh" }));
    expect(onSelect).toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("checkbox item toggles aria-checked and stays open", () => {
    const onChange = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>View</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem defaultChecked onCheckedChange={onChange}>
            Show totals
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    const item = screen.getByRole("menuitemcheckbox", { name: "Show totals" });
    expect(item).toHaveAttribute("aria-checked", "true");
    fireEvent.click(item);
    expect(item).toHaveAttribute("aria-checked", "false");
    expect(onChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("radio group selects a single value", () => {
    const onValueChange = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Density</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup label="Density" defaultValue="cozy" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="cozy">Cozy</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByRole("group", { name: "Density" })).toBeInTheDocument();
    expect(screen.getByRole("menuitemradio", { name: "Cozy" })).toHaveAttribute("aria-checked", "true");
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Compact" }));
    expect(onValueChange).toHaveBeenCalledWith("compact");
    expect(screen.getByRole("menuitemradio", { name: "Compact" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("menuitemradio", { name: "Cozy" })).toHaveAttribute("aria-checked", "false");
  });

  it("arrow keys / Home / End / typeahead move across all item kinds, skipping disabled", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Alpha</DropdownMenuItem>
          <DropdownMenuItem disabled>Beta</DropdownMenuItem>
          <DropdownMenuCheckboxItem>Gamma</DropdownMenuCheckboxItem>
          <DropdownMenuItem>Delta</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    const menu = screen.getByRole("menu");
    const alpha = screen.getByRole("menuitem", { name: "Alpha" });
    act(() => alpha.focus());
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(screen.getByRole("menuitemcheckbox", { name: "Gamma" })).toHaveFocus();
    fireEvent.keyDown(menu, { key: "End" });
    expect(screen.getByRole("menuitem", { name: "Delta" })).toHaveFocus();
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(alpha).toHaveFocus();
    fireEvent.keyDown(menu, { key: "d" });
    expect(screen.getByRole("menuitem", { name: "Delta" })).toHaveFocus();
  });
});

describe("Listbox / ListboxOption", () => {
  function Demo({ onPick }: { onPick: (v: string) => void }) {
    const [value, setValue] = useState("b");
    return (
      <Listbox aria-label="Entities">
        {["a", "b", "c"].map((v) => (
          <ListboxOption
            key={v}
            selected={value === v}
            disabled={v === "c"}
            description={`Entity ${v}`}
            indent={v === "b" ? 1 : 0}
            onSelect={() => {
              setValue(v);
              onPick(v);
            }}
          >
            {v.toUpperCase()}
          </ListboxOption>
        ))}
      </Listbox>
    );
  }

  it("exposes listbox / option semantics with selected + disabled state", () => {
    render(<Demo onPick={() => undefined} />);
    expect(screen.getByRole("listbox", { name: "Entities" })).toBeInTheDocument();
    const b = screen.getByRole("option", { name: /^B/ });
    expect(b).toHaveAttribute("aria-selected", "true");
    expect(b).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("option", { name: /^A/ })).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("option", { name: /^C/ })).toHaveAttribute("aria-disabled", "true");
    expect(b).toHaveTextContent("Entity b");
  });

  it("arrow keys skip disabled options; Enter / click select", () => {
    const onPick = vi.fn();
    render(<Demo onPick={onPick} />);
    const listbox = screen.getByRole("listbox");
    const a = screen.getByRole("option", { name: /^A/ });
    act(() => a.focus());
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    const b = screen.getByRole("option", { name: /^B/ });
    expect(b).toHaveFocus();
    fireEvent.keyDown(listbox, { key: "ArrowDown" });
    expect(a).toHaveFocus();
    fireEvent.keyDown(a, { key: "Enter" });
    expect(onPick).toHaveBeenCalledWith("a");
    fireEvent.click(screen.getByRole("option", { name: /^C/ }));
    expect(onPick).not.toHaveBeenCalledWith("c");
  });
});
