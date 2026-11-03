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
