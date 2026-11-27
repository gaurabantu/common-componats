import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Drawer, { BottomSheet } from "./index";
import { nearestSnapIndex, resolveSnapPx } from "./Drawer.utils";
import type { BottomSheetProps } from "./Drawer.types";

// jsdom has no PointerEvent: without it fireEvent.pointer* drops clientY / pointerId.
beforeAll(() => {
  if (typeof window.PointerEvent === "undefined") {
    class PointerEventPolyfill extends MouseEvent {
      pointerId: number;
      pointerType: string;
      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerId = init.pointerId ?? 1;
        this.pointerType = init.pointerType ?? "touch";
      }
    }
    (window as unknown as { PointerEvent: unknown }).PointerEvent = PointerEventPolyfill;
  }
});

const VIEWPORT = 800;
beforeEach(() => {
  Object.defineProperty(window, "innerHeight", { configurable: true, value: VIEWPORT });
});

afterEach(() => {
  document.body.removeAttribute("style");
  vi.useRealTimers();
});

function Harness(props: Partial<BottomSheetProps>) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open sheet
      </button>
      <BottomSheet
        title="Filters"
        {...props}
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          props.onOpenChange?.(next);
        }}
      >
        <button type="button">Apply</button>
      </BottomSheet>
    </>
  );
}

const panel = () => screen.getByRole("dialog", { name: "Filters" });

function mockPanelHeight(px: number) {
  vi.spyOn(panel(), "getBoundingClientRect").mockReturnValue({
    height: px,
    width: 400,
    top: VIEWPORT - px,
    bottom: VIEWPORT,
    left: 0,
    right: 400,
    x: 0,
    y: VIEWPORT - px,
    toJSON: () => ({}),
  } as DOMRect);
}

function drag(el: Element, fromY: number, toY: number) {
  fireEvent.pointerDown(el, { clientY: fromY, pointerId: 1, pointerType: "touch", button: 0 });
  fireEvent.pointerMove(el, { clientY: (fromY + toY) / 2, pointerId: 1 });
  fireEvent.pointerMove(el, { clientY: toY, pointerId: 1 });
  fireEvent.pointerUp(el, { clientY: toY, pointerId: 1 });
}

/** Drag with a controlled clock so velocity is deterministic. */
function timedDrag(el: Element, fromY: number, toY: number, ms: number) {
  let t = 1000;
  const now = vi.spyOn(performance, "now").mockImplementation(() => t);
  fireEvent.pointerDown(el, { clientY: fromY, pointerId: 1 });
  fireEvent.pointerMove(el, { clientY: toY, pointerId: 1 });
  t += ms;
  fireEvent.pointerUp(el, { clientY: toY, pointerId: 1 });
  now.mockRestore();
}

describe("BottomSheet — preset", () => {
  it("is a bottom Drawer with a pointer-only handle by default", () => {
    render(<Harness />);
    expect(panel()).toHaveAttribute("data-side", "bottom");
    expect(panel()).toHaveAttribute("data-handle", "true");
    const handle = panel().querySelector(".ds-drawer__handle")!;
    expect(handle.tagName).toBe("DIV");
    expect(handle).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("button", { name: "Resize sheet" })).toBeNull();
  });

  it("plain Drawer side=bottom has no handle (backward compatible)", () => {
    render(
      <Drawer open onOpenChange={() => {}} side="bottom" title="Filters">
        body
      </Drawer>,
    );
    expect(panel()).not.toHaveAttribute("data-handle");
    expect(panel().querySelector(".ds-drawer__handle")).toBeNull();
  });

  it("handle props are ignored on other sides", () => {
    render(
      <Drawer open onOpenChange={() => {}} side="right" title="Filters" handle snapPoints={["40%"]}>
        body
      </Drawer>,
    );
    expect(panel().querySelector(".ds-drawer__handle")).toBeNull();
    expect(panel()).not.toHaveAttribute("data-snap");
  });

  it("forwards the ref to the panel", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <BottomSheet ref={ref} open onOpenChange={() => {}} title="Filters">
        body
      </BottomSheet>,
    );
    expect(ref.current).toBe(panel());
  });
});

describe("BottomSheet — swipe to dismiss", () => {
  it("dismisses when dragged past the distance threshold", () => {
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} />);
    mockPanelHeight(400);
    drag(panel().querySelector(".ds-drawer__handle")!, 100, 300);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("snaps back after a short drag", () => {
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} />);
    mockPanelHeight(400);
    const handle = panel().querySelector(".ds-drawer__handle")!;
    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 115, pointerId: 1 });
    expect(panel().style.translate).toBe("0 15px");
    expect(panel()).toHaveAttribute("data-dragging", "true");
    fireEvent.pointerUp(handle, { clientY: 115, pointerId: 1 });
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(panel().style.translate).toBe("");
    expect(panel()).not.toHaveAttribute("data-dragging");
  });

  it("dismisses on a fast flick below the distance threshold", () => {
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} />);
    mockPanelHeight(400);
    timedDrag(panel().querySelector(".ds-drawer__handle")!, 100, 160, 50); // 60px in 50ms = 1.2 px/ms
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("a slow drag of the same distance does not dismiss", () => {
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} />);
    mockPanelHeight(400);
    timedDrag(panel().querySelector(".ds-drawer__handle")!, 100, 160, 1000); // 0.06 px/ms
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("swipeToDismiss={false} never dismisses", () => {
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} swipeToDismiss={false} />);
    mockPanelHeight(400);
    drag(panel().querySelector(".ds-drawer__handle")!, 100, 390);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("goes through onBeforeClose and slides back when vetoed", () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    render(<Harness onOpenChange={onOpenChange} onBeforeClose={() => false} />);
    mockPanelHeight(400);
    drag(panel().querySelector(".ds-drawer__handle")!, 100, 350);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(panel().style.translate).toBe("0 250px");
    act(() => {
      vi.runOnlyPendingTimers();
    });
    expect(panel().style.translate).toBe("");
  });
});

describe("BottomSheet — snap points", () => {
  const snaps = ["40%", "90%"];

  it("starts at defaultSnap and uses the snap point as the extent", () => {
    render(<Harness snapPoints={snaps} defaultSnap={1} />);
    expect(panel()).toHaveAttribute("data-snap", "1");
    expect(panel().style.getPropertyValue("--ds-drawer-extent")).toBe("90%");
  });

  it("renders a labelled handle button that is not the initial focus", () => {
    render(<Harness snapPoints={snaps} />);
    const handle = screen.getByRole("button", { name: "Resize sheet" });
    expect(handle).toBeInTheDocument();
    expect(handle).not.toHaveFocus();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
  });

  it("ArrowUp / ArrowDown / Home / End move between snaps and announce", async () => {
    const onSnapChange = vi.fn();
    render(<Harness snapPoints={["25%", "50%", "90%"]} onSnapChange={onSnapChange} />);
    const handle = screen.getByRole("button", { name: "Resize sheet" });
    handle.focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(onSnapChange).toHaveBeenLastCalledWith(1, "50%");
    expect(panel()).toHaveAttribute("data-snap", "1");
    expect(screen.getByRole("status")).toHaveTextContent("Resize sheet: 50%");
    await userEvent.keyboard("{End}");
    expect(onSnapChange).toHaveBeenLastCalledWith(2, "90%");
    await userEvent.keyboard("{ArrowUp}");
    expect(onSnapChange).toHaveBeenCalledTimes(2);
    await userEvent.keyboard("{Home}");
    expect(onSnapChange).toHaveBeenLastCalledWith(0, "25%");
    await userEvent.keyboard("{ArrowDown}");
    expect(onSnapChange).toHaveBeenCalledTimes(3);
  });

  it("clicking the handle cycles snap points (single-pointer alternative to dragging)", async () => {
    const onSnapChange = vi.fn();
    render(<Harness snapPoints={snaps} onSnapChange={onSnapChange} />);
    const handle = screen.getByRole("button", { name: "Resize sheet" });
    await userEvent.click(handle);
    expect(onSnapChange).toHaveBeenLastCalledWith(1, "90%");
    await userEvent.click(handle);
    expect(onSnapChange).toHaveBeenLastCalledWith(0, "40%");
  });

  it("dragging up snaps to the nearest larger point", () => {
    const onSnapChange = vi.fn();
    render(<Harness snapPoints={snaps} onSnapChange={onSnapChange} />);
    mockPanelHeight(320); // 40% of 800
    const handle = screen.getByRole("button", { name: "Resize sheet" });
    drag(handle, 500, 150); // wants 670px → nearest is 720 (90%)
    expect(onSnapChange).toHaveBeenLastCalledWith(1, "90%");
    expect(panel().style.getPropertyValue("--ds-drawer-extent")).toBe("90%");
  });

  it("dragging below the smallest snap dismisses", () => {
    const onOpenChange = vi.fn();
    render(<Harness snapPoints={snaps} onOpenChange={onOpenChange} />);
    mockPanelHeight(320);
    drag(screen.getByRole("button", { name: "Resize sheet" }), 100, 300);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("a drag does not also fire the handle's click", () => {
    const onSnapChange = vi.fn();
    render(<Harness snapPoints={snaps} onSnapChange={onSnapChange} />);
    mockPanelHeight(320);
    const handle = screen.getByRole("button", { name: "Resize sheet" });
    drag(handle, 500, 490); // tiny move past slop, snaps back to 0 (no change)
    fireEvent.click(handle);
    expect(onSnapChange).not.toHaveBeenCalled();
  });

  it("respects a controlled snap", async () => {
    const onSnapChange = vi.fn();
    render(<Harness snapPoints={snaps} snap={0} onSnapChange={onSnapChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Resize sheet" }));
    expect(onSnapChange).toHaveBeenCalledWith(1, "90%");
    expect(panel()).toHaveAttribute("data-snap", "0");
  });
});

describe("Drawer sheet utils", () => {
  it("resolveSnapPx handles %, vh, rem, px", () => {
    expect(resolveSnapPx("40%", 800)).toBe(320);
    expect(resolveSnapPx("50dvh", 800)).toBe(400);
    expect(resolveSnapPx("20rem", 800)).toBe(320);
    expect(resolveSnapPx("300px", 800)).toBe(300);
    expect(resolveSnapPx("auto", 800)).toBeNaN();
  });
  it("nearestSnapIndex skips NaN", () => {
    expect(nearestSnapIndex(600, [320, Number.NaN, 720])).toBe(2);
    expect(nearestSnapIndex(400, [320, Number.NaN, 720])).toBe(0);
  });
});
