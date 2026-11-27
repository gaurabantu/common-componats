import React, { useState } from "react";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
  DropdownMenu,
} from "./index";
import { findTypeaheadIndex } from "./Menu.utils";

function Basic(props: { onSelect?: (v: string) => void; onOpenChange?: (o: boolean) => void }) {
  const sel = props.onSelect ?? (() => undefined);
  return (
    <Menu onOpenChange={props.onOpenChange}>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuContent>
        <MenuItem onSelect={() => sel("edit")} shortcut={["mod", "e"]}>
          Edit
        </MenuItem>
        <MenuItem onSelect={() => sel("duplicate")}>Duplicate</MenuItem>
        <MenuItem disabled onSelect={() => sel("archive")}>
          Archive
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="danger" onSelect={() => sel("delete")}>
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

const trigger = () => screen.getByRole("button", { name: "Actions" });
const menu = () => screen.getByRole("menu");

describe("Menu — trigger and open/close", () => {
  it("trigger exposes aria-haspopup=menu and toggles aria-expanded / aria-controls", () => {
    render(<Basic />);
    const t = trigger();
    expect(t).toHaveAttribute("aria-haspopup", "menu");
    expect(t).toHaveAttribute("aria-expanded", "false");
    expect(t).not.toHaveAttribute("aria-controls");
    fireEvent.click(t);
    expect(t).toHaveAttribute("aria-expanded", "true");
    expect(t).toHaveAttribute("aria-controls", menu().id);
  });

  it("menu is labelled by the trigger and portalled to body", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    expect(screen.getByRole("menu", { name: "Actions" })).toBeInTheDocument();
    expect(menu().parentElement).toBe(document.body);
    expect(menu()).toHaveAttribute("aria-orientation", "vertical");
  });

  it("click opens and focuses the first enabled item", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    expect(screen.getByRole("menuitem", { name: /Edit/ })).toHaveFocus();
  });

  it.each(["Enter", " ", "ArrowDown"])("%s on the trigger opens and focuses the first item", (key) => {
    render(<Basic />);
    fireEvent.keyDown(trigger(), { key });
    expect(screen.getByRole("menuitem", { name: /Edit/ })).toHaveFocus();
  });

  it("ArrowUp on the trigger opens and focuses the last item", () => {
    render(<Basic />);
    fireEvent.keyDown(trigger(), { key: "ArrowUp" });
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
  });

  it("Escape closes and returns focus to the trigger", () => {
    const onOpenChange = vi.fn();
    render(<Basic onOpenChange={onOpenChange} />);
    fireEvent.click(trigger());
    act(() => {
      fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger()).toHaveFocus();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("Tab closes the menu and returns focus to the trigger", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    fireEvent.keyDown(document.activeElement!, { key: "Tab" });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger()).toHaveFocus();
  });

  it("outside mousedown closes; mousedown inside does not", () => {
    render(
      <>
        <Basic />
        <p data-testid="outside">outside</p>
      </>,
    );
    fireEvent.click(trigger());
    fireEvent.mouseDown(screen.getByRole("menuitem", { name: "Duplicate" }));
    expect(menu()).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("supports controlled open", () => {
    function Controlled() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <span data-testid="state">{String(open)}</span>
          <Menu open={open} onOpenChange={setOpen}>
            <MenuTrigger>Actions</MenuTrigger>
            <MenuContent>
              <MenuItem>One</MenuItem>
            </MenuContent>
          </Menu>
        </>
      );
    }
    render(<Controlled />);
    expect(menu()).toBeInTheDocument();
    fireEvent.click(screen.getByRole("menuitem", { name: "One" }));
    expect(screen.getByTestId("state")).toHaveTextContent("false");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("asChild merges trigger props onto the child element", () => {
    render(
      <Menu>
        <MenuTrigger asChild>
          <button className="custom-btn" type="button">
            More
          </button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>One</MenuItem>
        </MenuContent>
      </Menu>,
    );
    const t = screen.getByRole("button", { name: "More" });
    expect(t).toHaveClass("custom-btn");
    expect(t).toHaveAttribute("aria-haspopup", "menu");
    fireEvent.click(t);
    expect(screen.getByRole("menu", { name: "More" })).toBeInTheDocument();
  });
});

describe("Menu — keyboard navigation", () => {
  it("ArrowDown / ArrowUp move focus, skip disabled items and wrap", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    const m = menu();
    fireEvent.keyDown(m, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus();
    fireEvent.keyDown(m, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus(); // Archive skipped
    fireEvent.keyDown(m, { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: /Edit/ })).toHaveFocus(); // wrapped
    fireEvent.keyDown(m, { key: "ArrowUp" });
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
  });

  it("Home / End jump to the first / last enabled item", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    fireEvent.keyDown(menu(), { key: "End" });
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    fireEvent.keyDown(menu(), { key: "Home" });
    expect(screen.getByRole("menuitem", { name: /Edit/ })).toHaveFocus();
  });

  it("typeahead focuses the next item starting with the typed characters", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    fireEvent.keyDown(menu(), { key: "d" });
    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toHaveFocus();
    fireEvent.keyDown(menu(), { key: "d" });
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
  });

  it("menu items are not in the tab order (roving focus)", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    screen.getAllByRole("menuitem").forEach((item) => expect(item).toHaveAttribute("tabindex", "-1"));
  });
});

describe("Menu — items", () => {
  it("Enter, Space and click select an item and close the menu", () => {
    const onSelect = vi.fn();
    render(<Basic onSelect={onSelect} />);
    fireEvent.click(trigger());
    fireEvent.keyDown(screen.getByRole("menuitem", { name: /Edit/ }), { key: "Enter" });
    expect(onSelect).toHaveBeenLastCalledWith("edit");
    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger()).toHaveFocus();

    fireEvent.click(trigger());
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Duplicate" }), { key: " " });
    expect(onSelect).toHaveBeenLastCalledWith("duplicate");

    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onSelect).toHaveBeenLastCalledWith("delete");
  });

  it("disabled items are aria-disabled and never fire onSelect", () => {
    const onSelect = vi.fn();
    render(<Basic onSelect={onSelect} />);
    fireEvent.click(trigger());
    const archive = screen.getByRole("menuitem", { name: "Archive" });
    expect(archive).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(archive);
    fireEvent.keyDown(archive, { key: "Enter" });
    expect(onSelect).not.toHaveBeenCalled();
    expect(menu()).toBeInTheDocument();
  });

  it("onSelect calling preventDefault keeps the menu open", () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={(e) => e.preventDefault()}>Stay</MenuItem>
        </MenuContent>
      </Menu>,
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "Stay" }));
    expect(menu()).toBeInTheDocument();
  });

  it("danger variant is flagged for styling", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveAttribute("data-variant", "danger");
  });

  it("key-array shortcut renders Kbd (aria-hidden) and sets aria-keyshortcuts", () => {
    render(<Basic />);
    fireEvent.click(trigger());
    const edit = screen.getByRole("menuitem", { name: /Edit/ });
    expect(edit).toHaveAttribute("aria-keyshortcuts");
    expect(edit.getAttribute("aria-keyshortcuts")).toMatch(/E$/);
    const shortcut = edit.querySelector(".ds-menu__shortcut")!;
    expect(shortcut).toHaveAttribute("aria-hidden", "true");
    expect(shortcut.querySelector("kbd")).not.toBeNull();
  });

  it("checkbox items toggle aria-checked and keep the menu open", () => {
    const onCheckedChange = vi.fn();
    render(
      <Menu defaultOpen>
        <MenuTrigger>View</MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem defaultChecked onCheckedChange={onCheckedChange}>
            Show grid
          </MenuCheckboxItem>
        </MenuContent>
      </Menu>,
    );
    const item = screen.getByRole("menuitemcheckbox", { name: "Show grid" });
    expect(item).toHaveAttribute("aria-checked", "true");
    fireEvent.click(item);
    expect(item).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).toHaveBeenCalledWith(false);
    expect(menu()).toBeInTheDocument();
  });

  it("radio items are single-choice inside a labelled group", () => {
    const onValueChange = vi.fn();
    render(
      <Menu defaultOpen>
        <MenuTrigger>Sort</MenuTrigger>
        <MenuContent>
          <MenuRadioGroup label="Sort by" defaultValue="name" onValueChange={onValueChange}>
            <MenuRadioItem value="name">Name</MenuRadioItem>
            <MenuRadioItem value="date">Date</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>,
    );
    const group = screen.getByRole("group", { name: "Sort by" });
    const [name, date] = within(group).getAllByRole("menuitemradio");
    expect(name).toHaveAttribute("aria-checked", "true");
    fireEvent.click(date);
    expect(onValueChange).toHaveBeenCalledWith("date");
    expect(date).toHaveAttribute("aria-checked", "true");
    expect(name).toHaveAttribute("aria-checked", "false");
  });

  it("groups, labels and separators have the right roles", () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>File</MenuTrigger>
        <MenuContent>
          <MenuGroup label="Recent">
            <MenuItem>Report.pdf</MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuLabel>Static heading</MenuLabel>
        </MenuContent>
      </Menu>,
    );
    expect(screen.getByRole("group", { name: "Recent" })).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByText("Static heading")).not.toHaveAttribute("role");
  });

  it("href items render safe links and drop unsafe schemes", () => {
    render(
      <Menu defaultOpen>
        <MenuTrigger>Links</MenuTrigger>
        <MenuContent>
          <MenuItem href="/settings">Settings</MenuItem>
          <MenuItem href="https://example.com" target="_blank">
            Docs
          </MenuItem>
          {/* eslint-disable-next-line no-script-url */}
          <MenuItem href="javascript:alert(1)">Bad</MenuItem>
        </MenuContent>
      </Menu>,
    );
    const settings = screen.getByRole("menuitem", { name: "Settings" });
    expect(settings.tagName).toBe("A");
    expect(settings).toHaveAttribute("href", "/settings");
    expect(screen.getByRole("menuitem", { name: "Docs" })).toHaveAttribute("rel", "noopener noreferrer");
    const bad = screen.getByRole("menuitem", { name: "Bad" });
    expect(bad.tagName).toBe("DIV");
    expect(bad).not.toHaveAttribute("href");
  });
});

describe("Menu — submenus", () => {
  function WithSub() {
    return (
      <Menu>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem>New</MenuItem>
          <MenuSub>
            <MenuSubTrigger>Share</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Email</MenuItem>
              <MenuItem>Copy link</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuItem>Rename</MenuItem>
        </MenuContent>
      </Menu>
    );
  }

  it("sub trigger has aria-haspopup / aria-expanded and ArrowRight opens + focuses the first child", () => {
    render(<WithSub />);
    fireEvent.click(trigger());
    const share = screen.getByRole("menuitem", { name: "Share" });
    expect(share).toHaveAttribute("aria-haspopup", "menu");
    expect(share).toHaveAttribute("aria-expanded", "false");
    share.focus();
    fireEvent.keyDown(share, { key: "ArrowRight" });
    expect(share).toHaveAttribute("aria-expanded", "true");
    const sub = screen.getByRole("menu", { name: "Share" });
    expect(share).toHaveAttribute("aria-controls", sub.id);
    expect(within(sub).getByRole("menuitem", { name: "Email" })).toHaveFocus();
  });

  it("ArrowLeft and Escape close only the submenu and refocus its trigger", () => {
    render(<WithSub />);
    fireEvent.click(trigger());
    const share = screen.getByRole("menuitem", { name: "Share" });
    fireEvent.keyDown(share, { key: "Enter" });
    const sub = screen.getByRole("menu", { name: "Share" });
    fireEvent.keyDown(within(sub).getByRole("menuitem", { name: "Email" }), { key: "ArrowLeft" });
    expect(screen.queryByRole("menu", { name: "Share" })).toBeNull();
    expect(share).toHaveFocus();

    fireEvent.keyDown(share, { key: "ArrowRight" });
    act(() => {
      fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    });
    expect(screen.queryByRole("menu", { name: "Share" })).toBeNull();
    expect(screen.getByRole("menu", { name: "Actions" })).toBeInTheDocument();
    expect(share).toHaveFocus();
  });

  it("arrow keys inside the submenu do not move focus in the parent", () => {
    render(<WithSub />);
    fireEvent.click(trigger());
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Share" }), { key: "ArrowRight" });
    const sub = screen.getByRole("menu", { name: "Share" });
    fireEvent.keyDown(within(sub).getByRole("menuitem", { name: "Email" }), { key: "ArrowDown" });
    expect(within(sub).getByRole("menuitem", { name: "Copy link" })).toHaveFocus();
  });

  it("selecting a submenu item closes the whole menu and refocuses the root trigger", () => {
    render(<WithSub />);
    fireEvent.click(trigger());
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Share" }), { key: "ArrowRight" });
    fireEvent.click(screen.getByRole("menuitem", { name: "Copy link" }));
    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger()).toHaveFocus();
  });

  it("hovering the sub trigger opens the submenu after a delay; focusing a sibling closes it", async () => {
    render(<WithSub />);
    fireEvent.click(trigger());
    const share = screen.getByRole("menuitem", { name: "Share" });
    fireEvent.pointerEnter(share, { pointerType: "mouse" });
    await waitFor(() => expect(screen.getByRole("menu", { name: "Share" })).toBeInTheDocument());
    expect(share).toHaveAttribute("data-state", "open");
    act(() => {
      screen.getByRole("menuitem", { name: "Rename" }).focus();
    });
    expect(screen.queryByRole("menu", { name: "Share" })).toBeNull();
  });
});

describe("Menu — misc", () => {
  it("DropdownMenu is an alias of Menu", () => {
    expect(DropdownMenu).toBe(Menu);
  });

  it("findTypeaheadIndex cycles repeated letters and matches prefixes", () => {
    const mk = (t: string) => {
      const el = document.createElement("div");
      el.textContent = t;
      return el;
    };
    const items = [mk("Apple"), mk("Banana"), mk("Blueberry"), mk("Cherry")];
    expect(findTypeaheadIndex(items, "b", -1)).toBe(1);
    expect(findTypeaheadIndex(items, "b", 1)).toBe(2);
    expect(findTypeaheadIndex(items, "bb", 2)).toBe(1);
    expect(findTypeaheadIndex(items, "bl", 1)).toBe(2);
    expect(findTypeaheadIndex(items, "z", 0)).toBe(-1);
  });
});
