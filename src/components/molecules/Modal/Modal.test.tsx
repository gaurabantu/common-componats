import React, { useRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Modal from "./index";
import type { ModalProps } from "./Modal.types";

describe("Modal", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test">
        Content
      </Modal>
    );
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(
      <Modal isOpen onClose={() => {}} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders close button when showCloseButton is true", () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose} title="Test" showCloseButton>
        Content
      </Modal>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Modal — description", () => {
  it("renders the description under the title and wires aria-describedby", () => {
    render(
      <Modal isOpen onClose={() => {}} title="Delete file" description="This cannot be undone." id="del">
        Body
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Delete file" });
    expect(dialog).toHaveAttribute("aria-describedby", "delDescription");
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    expect(screen.getByText("This cannot be undone.")).toHaveClass("modal-description");
  });

  it("omits aria-describedby without a description", () => {
    render(<Modal isOpen onClose={() => {}} title="T">Body</Modal>);
    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-describedby");
  });

  it("does not render the description when hideHeader is set", () => {
    render(
      <Modal isOpen onClose={() => {}} title="T" description="Hidden" hideHeader>
        Body
      </Modal>,
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
    expect(screen.getByRole("dialog")).not.toHaveAttribute("aria-describedby");
  });
});

describe("Modal — focus management", () => {
  function FocusHarness({
    open,
    withInitialFocus = false,
    ...rest
  }: Partial<ModalProps> & { open: boolean; withInitialFocus?: boolean }) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <>
        <button type="button">Trigger</button>
        <Modal
          isOpen={open}
          onClose={() => {}}
          title="Focus"
          initialFocusRef={withInitialFocus ? inputRef : undefined}
          {...rest}
        >
          <input ref={inputRef} aria-label="Name" />
        </Modal>
      </>
    );
  }

  it("focuses initialFocusRef on open", async () => {
    const { rerender } = render(<FocusHarness open={false} withInitialFocus />);
    rerender(<FocusHarness open withInitialFocus />);
    await waitFor(() => expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus());
  });

  it("calls onOpenAutoFocus with a cancelable event; preventDefault skips the focus move", async () => {
    const onOpenAutoFocus = vi.fn((e: Event) => e.preventDefault());
    const { rerender } = render(<FocusHarness open={false} />);
    const trigger = screen.getByRole("button", { name: "Trigger" });
    trigger.focus();
    rerender(<FocusHarness open onOpenAutoFocus={onOpenAutoFocus} />);
    await waitFor(() => expect(onOpenAutoFocus).toHaveBeenCalledTimes(1));
    expect(onOpenAutoFocus.mock.calls[0][0]).toBeInstanceOf(Event);
    expect(onOpenAutoFocus.mock.calls[0][0].cancelable).toBe(true);
    expect(trigger).toHaveFocus();
  });

  it("returns focus to the previously focused element on close and calls onCloseAutoFocus", async () => {
    const onCloseAutoFocus = vi.fn();
    const { rerender } = render(<FocusHarness open={false} />);
    const trigger = screen.getByRole("button", { name: "Trigger" });
    trigger.focus();
    rerender(<FocusHarness open onCloseAutoFocus={onCloseAutoFocus} />);
    await waitFor(() => expect(trigger).not.toHaveFocus());
    rerender(<FocusHarness open={false} onCloseAutoFocus={onCloseAutoFocus} />);
    expect(onCloseAutoFocus).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveFocus();
  });

  it("onCloseAutoFocus preventDefault keeps focus from returning", async () => {
    const onCloseAutoFocus = vi.fn((e: Event) => e.preventDefault());
    const { rerender } = render(<FocusHarness open={false} />);
    const trigger = screen.getByRole("button", { name: "Trigger" });
    trigger.focus();
    rerender(<FocusHarness open onCloseAutoFocus={onCloseAutoFocus} />);
    await waitFor(() => expect(trigger).not.toHaveFocus());
    rerender(<FocusHarness open={false} onCloseAutoFocus={onCloseAutoFocus} />);
    expect(onCloseAutoFocus).toHaveBeenCalledTimes(1);
    expect(trigger).not.toHaveFocus();
  });
});

describe("Modal — scrollBehavior", () => {
  it('defaults to "inside": body scrolls, dialog capped to the viewport', () => {
    const { baseElement } = render(<Modal isOpen onClose={() => {}} title="T">Body</Modal>);
    const root = screen.getByRole("dialog");
    expect(root).toHaveAttribute("data-scroll-behavior", "inside");
    expect(root).not.toHaveClass("modal--scroll-outside");
    expect(root.style.overflowY).toBe("hidden");
    expect((baseElement.querySelector(".modal-body") as HTMLElement).style.overflowY).toBe("auto");
    expect((baseElement.querySelector(".modal-dialog") as HTMLElement).style.maxHeight).toBe("calc(100dvh - 2rem)");
  });

  it('"outside" scrolls the whole dialog in the viewport', () => {
    const { baseElement } = render(
      <Modal isOpen onClose={() => {}} title="T" scrollBehavior="outside">
        Body
      </Modal>,
    );
    const root = screen.getByRole("dialog");
    expect(root).toHaveAttribute("data-scroll-behavior", "outside");
    expect(root).toHaveClass("modal--scroll-outside");
    expect(root.style.overflowY).toBe("auto");
    expect(root.style.alignItems).toBe("flex-start");
    expect((baseElement.querySelector(".modal-dialog") as HTMLElement).style.maxHeight).toBe("none");
    expect((baseElement.querySelector(".modal-body") as HTMLElement).style.overflowY).toBe("visible");
  });
});

describe("Modal — fullscreenOnMobile", () => {
  it("adds the fullscreen-on-mobile modifier only when set", () => {
    const { rerender } = render(<Modal isOpen onClose={() => {}} title="T">Body</Modal>);
    expect(screen.getByRole("dialog")).not.toHaveClass("modal--fullscreen-mobile");
    rerender(<Modal isOpen onClose={() => {}} title="T" fullscreenOnMobile>Body</Modal>);
    expect(screen.getByRole("dialog")).toHaveClass("modal--fullscreen-mobile");
  });
});

describe("Modal — confirmLoading", () => {
  it("confirm works normally when not loading", () => {
    const onConfirm = vi.fn();
    render(<Modal isOpen onClose={() => {}} title="T" onConfirm={onConfirm}>Body</Modal>);
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("shows the Button loading state and blocks (double) confirm", () => {
    const onConfirm = vi.fn();
    render(
      <Modal isOpen onClose={() => {}} title="T" onConfirm={onConfirm} confirmLoading>
        Body
      </Modal>,
    );
    const confirm = screen.getByRole("button", { name: "Confirm" });
    expect(confirm).toHaveAttribute("aria-disabled", "true"); // loading keeps focus (aria-disabled), not native disabled
    expect(confirm).toHaveAttribute("aria-busy", "true");
    expect(confirm).toHaveClass("btn-loading");
    expect(confirm.querySelector(".btn-spinner")).not.toBeNull();
    fireEvent.click(confirm);
    fireEvent.click(confirm);
    expect(onConfirm).not.toHaveBeenCalled();
  });
});

describe("Modal — deprecated colour props (backward compatibility)", () => {
  it("still applies confirm/cancel colour overrides", () => {
    render(
      <Modal
        isOpen
        onClose={() => {}}
        title="T"
        onConfirm={() => {}}
        confirmButtonColor="var(--color-text-primary)"
        confirmButtonBackground="transparent"
        cancelButtonBorder="var(--color-border-strong)"
      >
        Body
      </Modal>,
    );
    const confirm = screen.getByRole("button", { name: "Confirm" });
    expect(confirm.style.color).toBe("var(--color-text-primary)");
    expect(confirm.style.backgroundColor).toBe("transparent");
    expect(screen.getByRole("button", { name: "Cancel" }).style.borderColor).toBe("var(--color-border-strong)");
  });
});

describe("Modal — Escape and the overlay stack", () => {
  it("Escape closes the modal and is consumed (preventDefault)", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="T" animation="none">Body</Modal>);
    const notCancelled = fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(notCancelled).toBe(false);
  });

  it("skips Escape a child already handled (defaultPrevented)", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="T" animation="none">
        <input aria-label="Combo" onKeyDown={(e) => e.key === "Escape" && e.preventDefault()} />
      </Modal>,
    );
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("only the top of two stacked modals closes on Escape", () => {
    const onOuter = vi.fn();
    const onInner = vi.fn();
    render(
      <Modal isOpen onClose={onOuter} title="Outer" id="outer" animation="none">
        <Modal isOpen onClose={onInner} title="Inner" id="inner" animation="none">
          Body
        </Modal>
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onInner).toHaveBeenCalledTimes(1);
    expect(onOuter).not.toHaveBeenCalled();
  });
});

describe("Modal — 0.0.4 additions", () => {
  it('size="fullscreen" adds the fullscreen class and fills the viewport', () => {
    render(<Modal isOpen onClose={() => {}} title="Editor" size="fullscreen">Body</Modal>);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("modal--fullscreen");
    const panel = dialog.querySelector(".modal-dialog") as HTMLElement;
    expect(panel).toHaveClass("modal-fullscreen");
    expect(panel.style.maxWidth).toBe("100%");
    expect((dialog.querySelector(".modal-content") as HTMLElement).style.borderRadius).toBe("0px");
  });

  it("renders headerActions in the title bar before the close button", () => {
    render(
      <Modal isOpen onClose={() => {}} title="Report" headerActions={<button type="button">Export</button>}>
        Body
      </Modal>,
    );
    const header = screen.getByRole("dialog").querySelector(".modal-header") as HTMLElement;
    const buttons = Array.from(header.querySelectorAll("button"));
    expect(buttons.map((b) => b.textContent || b.getAttribute("aria-label"))).toEqual(["Export", "Close dialog"]);
  });

  it("accepts a ReactNode title (labelled by the title element)", () => {
    render(
      <Modal isOpen onClose={() => {}} title={<><code>ACC-1</code> Cash</>} id="rn">
        Body
      </Modal>,
    );
    expect(screen.getByRole("dialog", { name: "ACC-1 Cash" })).toHaveAttribute("aria-labelledby", "rnLabel");
  });

  it("ariaLabel names the dialog instead of aria-labelledby", () => {
    render(
      <Modal isOpen onClose={() => {}} title={<span>Fancy</span>} ariaLabel="Account details">
        Body
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Account details" });
    expect(dialog).not.toHaveAttribute("aria-labelledby");
  });

  it("ariaLabel names a dialog with hideHeader", () => {
    render(<Modal isOpen onClose={() => {}} title="x" hideHeader ariaLabel="Custom">Body</Modal>);
    expect(screen.getByRole("dialog", { name: "Custom" })).toBeInTheDocument();
  });

  it("description holds block content (rendered in a div, not a p)", () => {
    render(
      <Modal
        isOpen
        onClose={() => {}}
        title="T"
        id="blk"
        description={
          <>
            <p>First paragraph.</p>
            <ul><li>Item</li></ul>
          </>
        }
      >
        Body
      </Modal>,
    );
    const desc = document.getElementById("blkDescription")!;
    expect(desc.tagName).toBe("DIV");
    expect(desc.querySelector("ul")).not.toBeNull();
    expect(screen.getByRole("dialog")).toHaveAccessibleDescription("First paragraph. Item");
  });

  it("forwards data-* props and rootProps to the root", () => {
    render(
      <Modal
        isOpen
        onClose={() => {}}
        title="T"
        data-anchored-popover=""
        rootProps={{ className: "extra-root", "data-testid": "modal-root", title: "root-title" }}
      >
        Body
      </Modal>,
    );
    const root = screen.getByTestId("modal-root");
    expect(root).toHaveClass("modal-root", "extra-root");
    expect(root).toHaveAttribute("data-anchored-popover", "");
    expect(root).toHaveAttribute("title", "root-title");
    expect(root).toContainElement(screen.getByRole("dialog"));
  });

  it("bodyScroll={false} makes the body a non-scrolling flex column; bodyClassName is applied", () => {
    render(
      <Modal isOpen onClose={() => {}} title="T" bodyScroll={false} bodyClassName="panes">
        Body
      </Modal>,
    );
    const body = screen.getByRole("dialog").querySelector(".modal-body") as HTMLElement;
    expect(body).toHaveClass("modal-body--fixed", "panes");
    expect(body).toHaveAttribute("data-body-scroll", "false");
    expect(body.style.overflowY).toBe("hidden");
    expect(body.style.display).toBe("flex");
  });

  it("bodyScroll defaults to a scrolling body", () => {
    render(<Modal isOpen onClose={() => {}} title="T">Body</Modal>);
    const body = screen.getByRole("dialog").querySelector(".modal-body") as HTMLElement;
    expect(body.style.overflowY).toBe("auto");
    expect(body).not.toHaveClass("modal-body--fixed");
  });

  it("zIndex sets the backdrop and dialog layers", () => {
    const { baseElement } = render(<Modal isOpen onClose={() => {}} title="T" zIndex={10000}>Body</Modal>);
    expect((baseElement.querySelector(".modal-backdrop") as HTMLElement).style.zIndex).toBe("10000");
    expect(screen.getByRole("dialog").style.zIndex).toBe("10001");
  });

  it("animate={false} drops animation classes and closes immediately", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="T" animation="slide" animate={false}>Body</Modal>);
    const panel = screen.getByRole("dialog").querySelector(".modal-dialog") as HTMLElement;
    expect(panel).toHaveClass("modal-dialog--static");
    expect(panel).not.toHaveClass("modal-dialog--slide");
    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe("onBeforeClose", () => {
    it("false keeps the modal open on Escape, backdrop and close button", () => {
      const onClose = vi.fn();
      const guard = vi.fn(() => false);
      const { baseElement } = render(
        <Modal isOpen onClose={onClose} title="T" animation="none" onBeforeClose={guard}>
          Body
        </Modal>,
      );
      fireEvent.keyDown(document, { key: "Escape" });
      fireEvent.click(screen.getByRole("dialog"));
      fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
      expect(guard).toHaveBeenCalledTimes(3);
      expect(onClose).not.toHaveBeenCalled();
      expect(baseElement.querySelector('[role="dialog"]')).toBeInTheDocument();
    });

    it("true closes synchronously", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen onClose={onClose} title="T" animation="none" onBeforeClose={() => true}>
          Body
        </Modal>,
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("awaits a promise; resolves true → closes, false → stays; ignores repeats while pending", async () => {
      const onClose = vi.fn();
      let resolve!: (v: boolean) => void;
      const guard = vi.fn(() => new Promise<boolean>((r) => (resolve = r)));
      render(
        <Modal isOpen onClose={onClose} title="T" animation="none" onBeforeClose={guard}>
          Body
        </Modal>,
      );
      fireEvent.keyDown(document, { key: "Escape" });
      fireEvent.keyDown(document, { key: "Escape" });
      expect(guard).toHaveBeenCalledTimes(1);
      resolve(false);
      await waitFor(() => expect(guard).toHaveBeenCalledTimes(1));
      await Promise.resolve();
      expect(onClose).not.toHaveBeenCalled();

      fireEvent.keyDown(document, { key: "Escape" });
      expect(guard).toHaveBeenCalledTimes(2);
      resolve(true);
      await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    });

    it("also guards the Cancel footer button", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen onClose={onClose} title="T" animation="none" onConfirm={() => {}} onBeforeClose={() => false}>
          Body
        </Modal>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
