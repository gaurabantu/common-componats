import React, { useState } from "react";
import { createPortal } from "react-dom";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Drawer from "./index";
import Modal from "../Modal";
import { getLayerIds, isTopLayer, popLayer, pushLayer } from "../Modal/overlayStack";

afterEach(() => {
  cleanup();
  document.body.removeAttribute("style");
  expect(getLayerIds()).toEqual([]);
});

describe("overlayStack", () => {
  it("push/pop/isTopLayer track the top layer", () => {
    pushLayer("a");
    pushLayer("b");
    expect(isTopLayer("b")).toBe(true);
    expect(isTopLayer("a")).toBe(false);
    popLayer("b");
    expect(isTopLayer("a")).toBe(true);
    popLayer("a");
    expect(getLayerIds()).toEqual([]);
  });

  it("a parent pushed after its child is inserted below it", () => {
    pushLayer("child", "parent");
    pushLayer("parent");
    expect(getLayerIds()).toEqual(["parent", "child"]);
    popLayer("child");
    popLayer("parent");
  });
});

function DrawerWithModal({
  onDrawerChange,
  onModalClose,
  modalAnimation = "none",
}: {
  onDrawerChange: (open: boolean) => void;
  onModalClose: () => void;
  modalAnimation?: "none" | "fade";
}) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Drawer
      open={drawerOpen}
      onOpenChange={(next) => {
        setDrawerOpen(next);
        onDrawerChange(next);
      }}
      title="Settings"
    >
      <button type="button" onClick={() => setModalOpen(true)}>
        Open modal
      </button>
      <Modal
        isOpen={modalOpen}
        animation={modalAnimation}
        onClose={() => {
          setModalOpen(false);
          onModalClose();
        }}
        title="Confirm"
      >
        <button type="button">Inside modal</button>
      </Modal>
    </Drawer>
  );
}

describe("Drawer + Modal stacking", () => {
  it("one Escape closes only the Modal; a second closes the Drawer", async () => {
    const onDrawerChange = vi.fn();
    const onModalClose = vi.fn();
    const user = userEvent.setup();
    render(<DrawerWithModal onDrawerChange={onDrawerChange} onModalClose={onModalClose} />);
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    expect(screen.getByRole("dialog", { name: "Confirm" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onModalClose).toHaveBeenCalledTimes(1);
    expect(onDrawerChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog", { name: "Confirm" })).not.toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onDrawerChange).toHaveBeenCalledWith(false);
    expect(onModalClose).toHaveBeenCalledTimes(1);
  });

  it("with Modal exit animation, Escape never reaches the Drawer and onClose fires once", async () => {
    const onDrawerChange = vi.fn();
    const onModalClose = vi.fn();
    const user = userEvent.setup();
    render(
      <DrawerWithModal onDrawerChange={onDrawerChange} onModalClose={onModalClose} modalAnimation="fade" />,
    );
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.keyDown(document, { key: "Escape" }); // during exit: consumed by Modal, ignored
    await waitFor(() => expect(onModalClose).toHaveBeenCalledTimes(1));
    expect(onDrawerChange).not.toHaveBeenCalled();
  });

  it("Drawer and Modal opened in the same commit: the inner Modal is on top", async () => {
    const onDrawer = vi.fn();
    const onModal = vi.fn();
    render(
      <Drawer open onOpenChange={onDrawer} title="Outer">
        <Modal isOpen onClose={onModal} title="Inner" animation="none">
          Body
        </Modal>
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onModal).toHaveBeenCalledTimes(1);
    expect(onDrawer).not.toHaveBeenCalled();
  });

  it("the Modal backdrop does not close the Drawer underneath", async () => {
    const onDrawerChange = vi.fn();
    const onModalClose = vi.fn();
    const user = userEvent.setup();
    const { baseElement } = render(
      <DrawerWithModal onDrawerChange={onDrawerChange} onModalClose={onModalClose} />,
    );
    await user.click(screen.getByRole("button", { name: "Open modal" }));
    // Drawer backdrop is under the Modal — even a direct click is ignored while the Modal is on top.
    fireEvent.click(baseElement.querySelector(".ds-drawer__backdrop")!);
    expect(onDrawerChange).not.toHaveBeenCalled();
  });
});

describe("Drawer focus guard", () => {
  function WithOutside(props: { modal?: boolean }) {
    return (
      <>
        <button type="button">Outside</button>
        <Drawer open onOpenChange={() => {}} title="Guarded" modal={props.modal}>
          <button type="button">Inside A</button>
          <button type="button">Inside B</button>
        </Drawer>
      </>
    );
  }

  it("pulls focus back into the panel when it lands on background content", () => {
    render(<WithOutside />);
    const insideB = screen.getByRole("button", { name: "Inside B" });
    act(() => insideB.focus());
    const outside = screen.getByRole("button", { name: "Outside" });
    act(() => outside.focus());
    expect(outside).not.toHaveFocus();
    expect(insideB).toHaveFocus(); // restores the last focused element in the panel
  });

  it("restores to the first focusable when nothing inside was focused yet", () => {
    render(<WithOutside />);
    act(() => {
      (document.activeElement as HTMLElement | null)?.blur();
    });
    fireEvent.focusIn(screen.getByRole("button", { name: "Outside" }));
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it("does not guard a non-modal drawer", () => {
    render(<WithOutside modal={false} />);
    const outside = screen.getByRole("button", { name: "Outside" });
    act(() => outside.focus());
    expect(outside).toHaveFocus();
  });

  it("repro 1: a page button added after the drawer opens cannot keep focus", async () => {
    const user = userEvent.setup();
    function Page() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <Drawer open={open} onOpenChange={setOpen} title="Guarded">
            <button type="button">Inside A</button>
          </Drawer>
        </>
      );
    }
    render(<Page />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    const late = document.createElement("button");
    late.textContent = "Late page button";
    document.body.appendChild(late); // after the drawer root in DOM order
    act(() => late.focus());
    expect(late).not.toHaveFocus();
    expect(document.activeElement?.closest(".ds-drawer")).not.toBeNull();
    late.remove();
  });

  it("repro 2: initially-open drawer + late sibling node (e.g. a toast region) is pulled back too", () => {
    render(<WithOutside />);
    const region = document.createElement("div");
    const btn = document.createElement("button");
    btn.textContent = "Toast action";
    region.appendChild(btn);
    document.body.appendChild(region);
    act(() => btn.focus());
    expect(btn).not.toHaveFocus();
    expect(document.activeElement?.closest(".ds-drawer")).not.toBeNull();
    region.remove();
  });

  it("a React portal child rendered from inside the drawer (Popover-style) can take focus", () => {
    function PortalChild() {
      return createPortal(
        <div className="fake-popover">
          <button type="button">Popover item</button>
        </div>,
        document.body,
      );
    }
    render(
      <Drawer open onOpenChange={() => {}} title="Owner">
        <PortalChild />
      </Drawer>,
    );
    const item = screen.getByRole("button", { name: "Popover item" });
    expect(item.closest(".ds-drawer")).toBeNull(); // really outside the panel in the DOM
    act(() => item.focus());
    expect(item).toHaveFocus();
  });

  it("a nested Modal (portal child of the drawer tree) keeps focus", async () => {
    render(
      <Drawer open onOpenChange={() => {}} title="Outer">
        <Modal isOpen onClose={() => {}} title="Inner" animation="none">
          <button type="button">Modal action</button>
        </Modal>
      </Drawer>,
    );
    const action = screen.getByRole("button", { name: "Modal action" });
    act(() => action.focus());
    expect(action).toHaveFocus();
  });

  it("explicit opt-in: content under [data-overlay-allow] may take focus", () => {
    render(<WithOutside />);
    const region = document.createElement("div");
    region.setAttribute("data-overlay-allow", "");
    const btn = document.createElement("button");
    btn.textContent = "Toast action";
    region.appendChild(btn);
    document.body.appendChild(region);
    act(() => btn.focus());
    expect(btn).toHaveFocus();
    region.remove();
  });

  it("the ownership flag does not leak: after an owned focus, a page button is still pulled back", () => {
    function PortalChild() {
      return createPortal(<button type="button">Popover item</button>, document.body);
    }
    render(
      <>
        <button type="button">Outside</button>
        <Drawer open onOpenChange={() => {}} title="Owner">
          <PortalChild />
        </Drawer>
      </>,
    );
    act(() => screen.getByRole("button", { name: "Popover item" }).focus());
    const outside = screen.getByRole("button", { name: "Outside" });
    act(() => outside.focus());
    expect(outside).not.toHaveFocus();
  });

  it("backdrop mousedown is prevented so focus stays in the panel", () => {
    const { baseElement } = render(<WithOutside />);
    const backdrop = baseElement.querySelector(".ds-drawer__backdrop")!;
    const notCancelled = fireEvent.mouseDown(backdrop);
    expect(notCancelled).toBe(false);
  });
});
