import React, { useRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Drawer, { Sheet } from "./index";
import { DRAWER_HEIGHTS, DRAWER_WIDTHS } from "./Drawer.config";
import type { DrawerProps } from "./Drawer.types";

function Harness(props: Partial<DrawerProps> & { startOpen?: boolean }) {
  const { startOpen = false, ...rest } = props;
  const [open, setOpen] = useState(startOpen);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open drawer
      </button>
      <Drawer
        title="Filters"
        {...rest}
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          rest.onOpenChange?.(next);
        }}
      >
        {rest.children ?? (
          <>
            <button type="button">First action</button>
            <button type="button">Last action</button>
          </>
        )}
      </Drawer>
    </>
  );
}

afterEach(() => {
  document.body.removeAttribute("style");
});

describe("Drawer — rendering", () => {
  it("renders nothing when closed", () => {
    render(<Drawer open={false} onOpenChange={() => {}} title="Hidden" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title, description, body and footer when open", () => {
    render(
      <Drawer
        open
        onOpenChange={() => {}}
        title="Edit user"
        description="Changes save on submit."
        footer={<button type="button">Save</button>}
      >
        Body content
      </Drawer>,
    );
    expect(screen.getByRole("heading", { name: "Edit user" })).toBeInTheDocument();
    expect(screen.getByText("Changes save on submit.")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" }).closest(".ds-drawer__footer")).not.toBeNull();
  });

  it("defaults to side=right, size=md and sets the extent from config", () => {
    render(<Drawer open onOpenChange={() => {}} title="T" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-side", "right");
    expect(dialog).toHaveAttribute("data-size", "md");
    expect(dialog.style.getPropertyValue("--ds-drawer-extent")).toBe(DRAWER_WIDTHS.md);
  });

  it.each(["left", "right"] as const)("uses widths for side=%s", (side) => {
    render(<Drawer open onOpenChange={() => {}} title="T" side={side} size="lg" />);
    expect(screen.getByRole("dialog").style.getPropertyValue("--ds-drawer-extent")).toBe(DRAWER_WIDTHS.lg);
  });

  it.each(["top", "bottom"] as const)("uses heights for side=%s", (side) => {
    render(<Drawer open onOpenChange={() => {}} title="T" side={side} size="sm" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-side", side);
    expect(dialog.style.getPropertyValue("--ds-drawer-extent")).toBe(DRAWER_HEIGHTS.sm);
  });

  it("merges className and uses the given id", () => {
    render(<Drawer open onOpenChange={() => {}} title="T" id="settings" className="extra" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("id", "settings");
    expect(dialog).toHaveClass("ds-drawer", "extra");
  });

  it("forwards its ref to the panel", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Drawer ref={ref} open onOpenChange={() => {}} title="T" />);
    expect(ref.current).toBe(screen.getByRole("dialog"));
  });

  it("hides the close button when showCloseButton=false", () => {
    render(<Drawer open onOpenChange={() => {}} title="T" showCloseButton={false} />);
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("exports Sheet as an alias", () => {
    expect(Sheet).toBe(Drawer);
    render(<Sheet open onOpenChange={() => {}} title="Sheet title" />);
    expect(screen.getByRole("dialog", { name: "Sheet title" })).toBeInTheDocument();
  });
});

describe("Drawer — accessibility", () => {
  it("is a modal dialog labelled by its title and described by its description", () => {
    render(<Drawer open onOpenChange={() => {}} title="Filters" description="Narrow the list" id="f" />);
    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "f-title");
    expect(dialog).toHaveAttribute("aria-describedby", "f-description");
    expect(dialog).toHaveAccessibleDescription("Narrow the list");
  });

  it("omits aria-describedby without a description", () => {
    render(<Drawer open onOpenChange={() => {}} title="Filters" />);
    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-describedby");
  });

  it("close button has an accessible name, customisable via closeLabel", () => {
    render(<Drawer open onOpenChange={() => {}} title="T" closeLabel="Close filters" />);
    expect(screen.getByRole("button", { name: "Close filters" })).toHaveAttribute("type", "button");
  });

  it("modal={false} drops aria-modal, the backdrop and the scroll lock", () => {
    const { baseElement } = render(<Drawer open onOpenChange={() => {}} title="T" modal={false} />);
    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-modal");
    expect(baseElement.querySelector(".ds-drawer__backdrop")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("locks body scroll while modal and open, releases on close", () => {
    const { rerender } = render(<Drawer open onOpenChange={() => {}} title="T" />);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<Drawer open={false} onOpenChange={() => {}} title="T" />);
    expect(document.body.style.overflow).toBe("");
  });

  it("renders title text literally (no HTML parsing)", () => {
    render(<Drawer open onOpenChange={() => {}} title="<img src=x onerror=alert(1)>" />);
    expect(screen.getByRole("heading").textContent).toBe("<img src=x onerror=alert(1)>");
    expect(document.querySelector(".ds-drawer img")).toBeNull();
  });
});

describe("Drawer — focus", () => {
  it("moves focus into the drawer on open (first focusable)", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it("focuses initialFocusRef when provided", async () => {
    function WithRef() {
      const ref = useRef<HTMLInputElement>(null);
      return (
        <Harness initialFocusRef={ref}>
          <input ref={ref} aria-label="Search" />
        </Harness>
      );
    }
    const user = userEvent.setup();
    render(<WithRef />);
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(screen.getByRole("textbox", { name: "Search" })).toHaveFocus();
  });

  it("falls back to the panel when nothing is focusable", () => {
    render(
      <Drawer open onOpenChange={() => {}} title="T" showCloseButton={false}>
        Text only
      </Drawer>,
    );
    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  it("traps Tab and Shift+Tab inside a modal drawer", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    const close = screen.getByRole("button", { name: "Close" });
    const last = screen.getByRole("button", { name: "Last action" });
    expect(close).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "First action" })).toHaveFocus();
    await user.tab();
    expect(last).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(last).toHaveFocus();
  });

  it("does not trap focus when modal={false}", async () => {
    const user = userEvent.setup();
    render(<Harness modal={false} />);
    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    screen.getByRole("button", { name: "Last action" }).focus();
    await user.tab();
    expect(document.activeElement?.closest(".ds-drawer")).toBeNull();
  });

  it("returns focus to the trigger on close", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Open drawer" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("leaves focus alone on close when returnFocus=false", async () => {
    const user = userEvent.setup();
    render(<Harness returnFocus={false} />);
    const trigger = screen.getByRole("button", { name: "Open drawer" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(trigger).not.toHaveFocus();
  });
});

describe("Drawer — dismissal", () => {
  it("close button calls onOpenChange(false)", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Drawer open onOpenChange={onOpenChange} title="T" />);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("Escape closes; closeOnEscape=false keeps it open", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<Drawer open onOpenChange={onOpenChange} title="T" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    onOpenChange.mockClear();
    rerender(<Drawer open onOpenChange={onOpenChange} title="T" closeOnEscape={false} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("Escape still closes a non-modal drawer", () => {
    const onOpenChange = vi.fn();
    render(<Drawer open onOpenChange={onOpenChange} title="T" modal={false} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("ignores Escape a child already handled", () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange} title="T">
        <input aria-label="Combo" onKeyDown={(e) => e.key === "Escape" && e.preventDefault()} />
      </Drawer>,
    );
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("backdrop click closes; closeOnBackdropClick=false keeps it open", () => {
    const onOpenChange = vi.fn();
    const { baseElement, rerender } = render(<Drawer open onOpenChange={onOpenChange} title="T" />);
    fireEvent.click(baseElement.querySelector(".ds-drawer__backdrop")!);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    onOpenChange.mockClear();
    rerender(<Drawer open onOpenChange={onOpenChange} title="T" closeOnBackdropClick={false} />);
    fireEvent.click(baseElement.querySelector(".ds-drawer__backdrop")!);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("clicks inside the panel do not close it", () => {
    const onOpenChange = vi.fn();
    render(<Drawer open onOpenChange={onOpenChange} title="T">Inside</Drawer>);
    fireEvent.click(screen.getByText("Inside"));
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
