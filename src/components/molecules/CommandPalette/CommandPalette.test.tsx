import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommandPalette from "./index";
import Modal from "../Modal";
import { getLayerIds } from "../Modal/overlayStack";
import type { CommandGroup, CommandItem, CommandPaletteProps } from "./CommandPalette.types";

afterEach(() => {
  cleanup();
  document.body.removeAttribute("style");
  expect(getLayerIds()).toEqual([]);
  vi.useRealTimers();
});

function makeGroups(spies: Record<string, CommandItem["onSelect"]> = {}): CommandGroup[] {
  const fn = (id: string) => spies[id] ?? vi.fn();
  return [
    {
      id: "nav",
      label: "Navigation",
      items: [
        { id: "dash", label: "Go to dashboard", onSelect: fn("dash"), shortcut: ["g", "d"] },
        { id: "settings", label: "Open settings", keywords: ["preferences"], onSelect: fn("settings") },
        { id: "locked", label: "Billing", disabled: true, onSelect: fn("locked") },
      ],
    },
    {
      id: "actions",
      label: "Actions",
      items: [
        { id: "new", label: "New invoice", description: "Create a draft", onSelect: fn("new") },
        { id: "logout", label: "Log out", onSelect: fn("logout") },
      ],
    },
  ];
}

function Harness(props: Partial<CommandPaletteProps> & { groups?: CommandGroup[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open palette
      </button>
      <input aria-label="Notes" />
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={props.groups ?? makeGroups()}
        {...props}
      />
    </>
  );
}

const combobox = () => screen.getByRole("combobox", { name: "Search commands" });
const activeOptionText = () => {
  const id = combobox().getAttribute("aria-activedescendant");
  return id ? document.getElementById(id)?.textContent ?? null : null;
};

describe("CommandPalette rendering & semantics", () => {
  it("renders nothing while closed", () => {
    render(<CommandPalette groups={makeGroups()} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders a modal dialog with combobox, listbox, groups and options", () => {
    render(<CommandPalette defaultOpen groups={makeGroups()} />);
    const dialog = screen.getByRole("dialog", { name: "Command palette" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const input = combobox();
    const listbox = screen.getByRole("listbox", { name: "Commands" });
    expect(input).toHaveAttribute("aria-controls", listbox.id);
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(screen.getByRole("group", { name: "Navigation" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Actions" })).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(5);
    expect(screen.getByRole("option", { name: /Billing/ })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("option", { name: /Go to dashboard/ })).toHaveAttribute("aria-keyshortcuts", "G+D");
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("aria-activedescendant references a mounted option and moves aria-selected", () => {
    render(<CommandPalette defaultOpen groups={makeGroups()} />);
    const id = combobox().getAttribute("aria-activedescendant")!;
    const option = document.getElementById(id)!;
    expect(option).toHaveAttribute("role", "option");
    expect(option).toHaveAttribute("aria-selected", "true");
    expect(screen.getAllByRole("option").filter((o) => o.getAttribute("aria-selected") === "true")).toHaveLength(1);
  });

  it("renders the recent group only while the query is empty", async () => {
    const user = userEvent.setup();
    render(
      <CommandPalette
        defaultOpen
        groups={makeGroups()}
        recent={{ id: "recent", label: "Recent", items: [{ id: "r1", label: "Open settings", onSelect: vi.fn() }] }}
      />,
    );
    expect(screen.getAllByRole("group")[0]).toHaveAccessibleName("Recent");
    await user.type(combobox(), "set");
    expect(screen.queryByRole("group", { name: "Recent" })).toBeNull();
  });

  it("shows the empty state, hides the listbox and clears aria-activedescendant", async () => {
    const user = userEvent.setup();
    render(<CommandPalette defaultOpen groups={makeGroups()} emptyState="Nothing here" />);
    await user.type(combobox(), "zzzz");
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(combobox()).not.toHaveAttribute("aria-activedescendant");
    expect(combobox()).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById(combobox().getAttribute("aria-controls")!)).toHaveAttribute("hidden");
  });
});

describe("CommandPalette keyboard", () => {
  it("focuses the input on open and filters with ranking", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    expect(combobox()).toHaveFocus();
    await user.type(combobox(), "inv");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["New invoiceCreate a draft"]);
  });

  it("ArrowDown/Up wrap and skip disabled; Home/End jump", async () => {
    const user = userEvent.setup();
    render(<CommandPalette defaultOpen groups={makeGroups()} />);
    expect(activeOptionText()).toMatch(/^Go to dashboard/);
    await user.keyboard("{ArrowDown}");
    expect(activeOptionText()).toBe("Open settings");
    await user.keyboard("{ArrowDown}");
    expect(activeOptionText()).toMatch(/^New invoice/); // skipped disabled Billing
    await user.keyboard("{End}");
    expect(activeOptionText()).toBe("Log out");
    await user.keyboard("{ArrowDown}");
    expect(activeOptionText()).toMatch(/^Go to dashboard/);
    await user.keyboard("{ArrowUp}");
    expect(activeOptionText()).toBe("Log out");
    await user.keyboard("{Home}");
    expect(activeOptionText()).toMatch(/^Go to dashboard/);
  });

  it("Enter selects the active item, closes, restores focus, then runs onSelect", async () => {
    const user = userEvent.setup();
    const seen: { dialogOpen?: boolean; openerFocused?: boolean } = {};
    const settings = vi.fn((_item: unknown) => {
      // onSelect runs after the close commit, so focus has already returned to the opener.
      seen.dialogOpen = screen.queryByRole("dialog") !== null;
      seen.openerFocused = document.activeElement === screen.getByRole("button", { name: "Open palette" });
    });
    render(<Harness groups={makeGroups({ settings })} />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    await user.type(combobox(), "prefer");
    await user.keyboard("{Enter}");
    expect(settings).toHaveBeenCalledTimes(1);
    expect(settings.mock.calls[0][0]).toMatchObject({ id: "settings" });
    expect(seen).toEqual({ dialogOpen: false, openerFocused: true });
  });

  it("onSelect may move focus elsewhere without being overridden", async () => {
    const user = userEvent.setup();
    const logout = vi.fn(() => (screen.getByRole("textbox", { name: "Notes" }) as HTMLInputElement).focus());
    render(<Harness groups={makeGroups({ logout })} />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    await user.type(combobox(), "log");
    await user.keyboard("{Enter}");
    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveFocus();
  });

  it("closeOnSelect=false keeps the palette open", async () => {
    const user = userEvent.setup();
    const dash = vi.fn();
    render(<CommandPalette defaultOpen closeOnSelect={false} groups={makeGroups({ dash })} />);
    await user.keyboard("{Enter}");
    expect(dash).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("Escape closes and restores focus to the opener", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const opener = screen.getByRole("button", { name: "Open palette" });
    await user.click(opener);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(opener).toHaveFocus();
    expect(document.body.style.position).toBe("");
  });

  it("Tab stays inside the dialog", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.tab();
    expect(combobox()).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it("re-opening starts with an empty query", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    await user.type(combobox(), "log");
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    expect(combobox()).toHaveValue("");
  });
});

describe("CommandPalette mouse", () => {
  it("hover moves the active option and click selects", async () => {
    const user = userEvent.setup();
    const logout = vi.fn();
    render(<Harness groups={makeGroups({ logout })} />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    const option = screen.getByRole("option", { name: "Log out" });
    fireEvent.mouseMove(option);
    expect(option).toHaveAttribute("aria-selected", "true");
    await user.click(option);
    expect(logout).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("clicking a disabled option does nothing", async () => {
    const user = userEvent.setup();
    const locked = vi.fn();
    render(<CommandPalette defaultOpen groups={makeGroups({ locked })} />);
    await user.click(screen.getByRole("option", { name: "Billing" }));
    expect(locked).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("backdrop click and the Close button close", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<CommandPalette open onOpenChange={onOpenChange} groups={makeGroups()} />);
    await user.click(document.querySelector(".ds-command-palette__backdrop")!);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenNthCalledWith(1, false);
    expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
  });
});

describe("CommandPalette hotkey", () => {
  it("Ctrl+K toggles (non-mac) and restores focus", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Elsewhere</button>
        <CommandPalette groups={makeGroups()} />
      </>,
    );
    const elsewhere = screen.getByRole("button", { name: "Elsewhere" });
    elsewhere.focus();
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(combobox()).toHaveFocus();
    // Toggles closed even though focus is in the palette's own input.
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(elsewhere).toHaveFocus();
  });

  it("does not fire while typing in an editable field unless allowInInputs", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <input aria-label="Notes" />
        <CommandPalette groups={makeGroups()} />
      </>,
    );
    screen.getByRole("textbox", { name: "Notes" }).focus();
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("dialog")).toBeNull();

    rerender(
      <>
        <input aria-label="Notes" />
        <CommandPalette groups={makeGroups()} allowInInputs />
      </>,
    );
    screen.getByRole("textbox", { name: "Notes" }).focus();
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("enableHotkey=false and custom hotkey", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<CommandPalette groups={makeGroups()} enableHotkey={false} />);
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("dialog")).toBeNull();
    rerender(<CommandPalette groups={makeGroups()} hotkey={["mod", "shift", "p"]} />);
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("dialog")).toBeNull();
    await user.keyboard("{Control>}{Shift>}P{/Shift}{/Control}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("controlled mode reports through onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<CommandPalette open={false} onOpenChange={onOpenChange} groups={makeGroups()} />);
    await user.keyboard("{Control>}k{/Control}");
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("CommandPalette announcements", () => {
  it("announces the result count once after typing settles", () => {
    vi.useFakeTimers();
    render(<CommandPalette defaultOpen groups={makeGroups()} announceDelayMs={500} />);
    const status = screen.getByRole("status");
    expect(status).toBeEmptyDOMElement();
    const input = combobox();
    fireEvent.change(input, { target: { value: "o" } });
    act(() => vi.advanceTimersByTime(200));
    fireEvent.change(input, { target: { value: "op" } });
    act(() => vi.advanceTimersByTime(200));
    expect(status).toBeEmptyDOMElement(); // nothing yet — still typing
    fireEvent.change(input, { target: { value: "open" } });
    act(() => vi.advanceTimersByTime(499));
    expect(status).toBeEmptyDOMElement();
    act(() => vi.advanceTimersByTime(1));
    expect(status).toHaveTextContent("1 result");
    fireEvent.change(input, { target: { value: "zzz" } });
    act(() => vi.advanceTimersByTime(500));
    expect(status).toHaveTextContent("No results");
  });

  it("uses a custom resultsLabel", () => {
    vi.useFakeTimers();
    render(<CommandPalette defaultOpen groups={makeGroups()} resultsLabel={(n) => `${n} commandes`} />);
    fireEvent.change(combobox(), { target: { value: "o" } });
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("status").textContent).toMatch(/commandes$/);
  });
});

describe("CommandPalette remote search", () => {
  it("debounces onSearch, shows loading, appends results and ignores stale responses", async () => {
    vi.useFakeTimers();
    const resolvers: Array<(groups: CommandGroup[]) => void> = [];
    const onSearch = vi.fn(
      (_q: string, _ctx: { signal: AbortSignal }) =>
        new Promise<CommandGroup[]>((resolve) => {
          resolvers.push(resolve);
        }),
    );
    render(<CommandPalette defaultOpen groups={[]} onSearch={onSearch} searchDebounceMs={200} />);
    act(() => vi.advanceTimersByTime(200)); // initial "" search
    expect(onSearch).toHaveBeenCalledTimes(1);

    fireEvent.change(combobox(), { target: { value: "a" } });
    act(() => vi.advanceTimersByTime(100));
    fireEvent.change(combobox(), { target: { value: "ac" } });
    act(() => vi.advanceTimersByTime(200));
    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(onSearch.mock.calls[1][0]).toBe("ac");
    expect(screen.getByText("Loading results…")).toBeInTheDocument();
    expect(screen.getByRole("listbox", { hidden: true })).toHaveAttribute("aria-busy", "true");

    // The first ("") response arrives late — ignored (aborted).
    expect(onSearch.mock.calls[0][1].signal.aborted).toBe(true);
    await act(async () => {
      resolvers[0]([{ id: "stale", label: "Stale", items: [{ id: "x", label: "Stale hit", onSelect: vi.fn() }] }]);
    });
    expect(screen.queryByText("Stale hit")).toBeNull();

    await act(async () => {
      resolvers[1]([{ id: "acct", label: "Accounts", items: [{ id: "1", label: "Acme Corp", onSelect: vi.fn() }] }]);
    });
    expect(screen.getByRole("option", { name: "Acme Corp" })).toBeInTheDocument();
    expect(screen.queryByText("Loading results…")).toBeNull();
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("status")).toHaveTextContent("1 result");
  });

  it("external loading flag and shouldFilter=false", () => {
    render(
      <CommandPalette
        defaultOpen
        loading
        shouldFilter={false}
        groups={makeGroups()}
      />,
    );
    fireEvent.change(combobox(), { target: { value: "zzz" } });
    expect(screen.getAllByRole("option")).toHaveLength(5); // not filtered locally
    expect(screen.getByText("Loading results…")).toBeInTheDocument();
  });
});

describe("CommandPalette overlay stacking", () => {
  function PaletteOpensModal() {
    const [modal, setModal] = useState(false);
    const [paletteOpen, setPaletteOpen] = useState(true);
    return (
      <>
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          closeOnSelect={false}
          groups={[{ id: "g", label: "G", items: [{ id: "m", label: "Open modal", onSelect: () => setModal(true) }] }]}
        />
        <Modal isOpen={modal} animation="none" onClose={() => setModal(false)} title="Confirm">
          <button type="button">Inside modal</button>
        </Modal>
      </>
    );
  }

  it("one Escape closes only the top layer", async () => {
    const user = userEvent.setup();
    render(<PaletteOpensModal />);
    await user.keyboard("{Enter}");
    expect(screen.getByRole("dialog", { name: "Confirm" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Confirm" })).toBeNull();
    expect(screen.getByRole("dialog", { name: "Command palette" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Command palette" })).toBeNull();
  });

  it("pulls focus back when it lands on unowned background content", () => {
    render(
      <>
        <button type="button">Background</button>
        <CommandPalette defaultOpen groups={makeGroups()} />
      </>,
    );
    expect(combobox()).toHaveFocus();
    act(() => screen.getByRole("button", { name: "Background", hidden: true }).focus());
    expect(combobox()).toHaveFocus();
  });
});
