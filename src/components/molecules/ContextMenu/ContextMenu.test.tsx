import React, { useState } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  computeContextMenuPosition,
} from "./index";
import type { ContextMenuPosition } from "./ContextMenu.types";

function Basic({ onCopy = () => undefined, zIndex }: { onCopy?: () => void; zIndex?: number | string }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger tabIndex={0} data-testid="region">
        Right-click me
      </ContextMenuTrigger>
      <ContextMenuContent aria-label="Cell actions" zIndex={zIndex}>
        <ContextMenuLabel>Cell</ContextMenuLabel>
        <ContextMenuItem onSelect={onCopy} shortcut="⌘C">
          Copy
        </ContextMenuItem>
        <ContextMenuItem disabled>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Comment</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

describe("computeContextMenuPosition", () => {
  const vp = { width: 1000, height: 800 };

  it("opens at the point when it fits", () => {
    expect(computeContextMenuPosition({ x: 100, y: 120 }, 200, 150, vp)).toEqual({
      top: 120,
      left: 100,
      maxHeight: 784,
    });
  });

  it("flips left / up when it would overflow the right / bottom edge", () => {
    const r = computeContextMenuPosition({ x: 950, y: 780 }, 200, 150, vp);
    expect(r.left).toBe(750);
    expect(r.top).toBe(630);
  });

  it("clamps into the viewport when neither side fits", () => {
    const r = computeContextMenuPosition({ x: 5, y: 5 }, 2000, 2000, vp, 8);
    expect(r.left).toBe(8);
    expect(r.top).toBe(8);
    expect(r.maxHeight).toBe(784);
  });
});

describe("ContextMenu — declarative trigger", () => {
  it("opens at the pointer on right-click and focuses the first enabled item", () => {
    render(<Basic />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.contextMenu(screen.getByTestId("region"), { clientX: 140, clientY: 90 });
    const menu = screen.getByRole("menu", { name: "Cell actions" });
    expect(menu.parentElement).toBe(document.body);
    expect(menu.style.left).toBe("140px");
    expect(menu.style.top).toBe("90px");
    expect(screen.getByRole("menuitem", { name: /Copy/ })).toHaveFocus();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("prevents the native browser menu", () => {
    render(<Basic />);
    const evt = new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: 1, clientY: 1 });
    screen.getByTestId("region").dispatchEvent(evt);
    expect(evt.defaultPrevented).toBe(true);
  });

  it("arrow keys skip disabled items and wrap", () => {
    render(<Basic />);
    fireEvent.contextMenu(screen.getByTestId("region"), { clientX: 1, clientY: 1 });
    const menu = screen.getByRole("menu");
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "Comment" })).toHaveFocus();
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: /Copy/ })).toHaveFocus();
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(screen.getByRole("menuitem", { name: "Comment" })).toHaveFocus();
  });

  it("Escape closes, is marked handled for enclosing dialogs, and returns focus to the trigger", async () => {
    const outer = vi.fn();
    const listener = (e: KeyboardEvent) => outer(e.defaultPrevented);
    document.addEventListener("keydown", listener);
    render(<Basic />);
    const region = screen.getByTestId("region");
    act(() => region.focus());
    fireEvent.contextMenu(region, { clientX: 1, clientY: 1 });
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(outer).toHaveBeenCalledWith(true);
    await waitFor(() => expect(region).toHaveFocus());
    document.removeEventListener("keydown", listener);
  });

  it("selecting an item calls onSelect and closes", () => {
    const onCopy = vi.fn();
    render(<Basic onCopy={onCopy} />);
    fireEvent.contextMenu(screen.getByTestId("region"), { clientX: 1, clientY: 1 });
    fireEvent.click(screen.getByRole("menuitem", { name: /Copy/ }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("click outside closes without any full-screen click-catcher element", () => {
    render(
      <>
        <Basic />
        <button type="button">Outside</button>
      </>
    );
    const before = document.body.children.length;
    fireEvent.contextMenu(screen.getByTestId("region"), { clientX: 1, clientY: 1 });
    // Exactly one new node: the menu itself.
    expect(document.body.children.length).toBe(before + 1);
    fireEvent.mouseDown(screen.getByRole("menuitem", { name: "Comment" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("Shift+F10 / Menu key open from the keyboard", () => {
    render(<Basic />);
    const region = screen.getByTestId("region");
    fireEvent.keyDown(region, { key: "F10", shiftKey: true });
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    fireEvent.keyDown(region, { key: "ContextMenu" });
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("disabled lets the native menu through", () => {
    render(
      <ContextMenu disabled>
        <ContextMenuTrigger data-testid="region">Area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    const evt = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    screen.getByTestId("region").dispatchEvent(evt);
    expect(evt.defaultPrevented).toBe(false);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("asChild merges onto the child element", () => {
    const childHandler = vi.fn();
    render(
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <td data-testid="cell" onContextMenu={childHandler}>
            42
          </td>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Drill</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
      { container: document.body.appendChild(document.createElement("tr")) }
    );
    const cell = screen.getByTestId("cell");
    expect(cell).toHaveAttribute("aria-haspopup", "menu");
    fireEvent.contextMenu(cell, { clientX: 3, clientY: 4 });
    expect(childHandler).toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("checkbox items stay open and toggle", () => {
    render(
      <ContextMenu defaultOpen position={{ x: 0, y: 0 }}>
        <ContextMenuContent>
          <ContextMenuCheckboxItem>Freeze row</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    const item = screen.getByRole("menuitemcheckbox", { name: "Freeze row" });
    fireEvent.click(item);
    expect(item).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});

describe("ContextMenu — controlled / imperative", () => {
  function Grid({ onOpenChange }: { onOpenChange?: (o: boolean) => void }) {
    const [menu, setMenu] = useState<{ open: boolean; pos: ContextMenuPosition }>({
      open: false,
      pos: { x: 0, y: 0 },
    });
    return (
      <>
        <div
          role="gridcell"
          tabIndex={0}
          onContextMenu={(e) => {
            e.preventDefault();
            setMenu({ open: true, pos: { x: e.clientX + 1, y: e.clientY + 1 } });
          }}
        >
          A1
        </div>
        <ContextMenu
          open={menu.open}
          position={menu.pos}
          onOpenChange={(open) => {
            onOpenChange?.(open);
            setMenu((m) => ({ ...m, open }));
          }}
        >
          <ContextMenuContent aria-label="Grid menu">
            <ContextMenuItem>Insert row</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </>
    );
  }

  it("opens at the given position and reports close through onOpenChange", async () => {
    const onOpenChange = vi.fn();
    render(<Grid onOpenChange={onOpenChange} />);
    const cell = screen.getByRole("gridcell");
    act(() => cell.focus());
    fireEvent.contextMenu(cell, { clientX: 10, clientY: 20 });
    const menu = screen.getByRole("menu", { name: "Grid menu" });
    expect(menu.style.left).toBe("11px");
    expect(menu.style.top).toBe("21px");
    fireEvent.click(screen.getByRole("menuitem", { name: "Insert row" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    // Focus returns to the element that was focused when the menu opened.
    await waitFor(() => expect(cell).toHaveFocus());
  });
});

describe("ContextMenu — layering", () => {
  it("defaults to --z-popover and honours zIndex", () => {
    const { unmount } = render(<Basic />);
    fireEvent.contextMenu(screen.getByTestId("region"), { clientX: 1, clientY: 1 });
    expect(screen.getByRole("menu").style.zIndex).toBe("var(--z-popover, 450)");
    unmount();
    render(<Basic zIndex={20000} />);
    fireEvent.contextMenu(screen.getByTestId("region"), { clientX: 1, clientY: 1 });
    expect(screen.getByRole("menu").style.zIndex).toBe("20000");
  });

  it("lifts above a stacked host overlay", () => {
    render(
      <div style={{ position: "fixed", zIndex: 10000 }}>
        <Basic />
      </div>
    );
    fireEvent.contextMenu(screen.getByTestId("region"), { clientX: 1, clientY: 1 });
    expect(screen.getByRole("menu").style.zIndex).toBe("10001");
  });
});
