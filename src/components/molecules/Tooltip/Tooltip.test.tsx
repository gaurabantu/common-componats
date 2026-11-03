import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Tooltip } from "./index";
import { computeTooltipPosition, resolveTooltipSide } from "./tooltipPosition";

const VP = { width: 1024, height: 768 };
const rect = (top: number, left: number, width = 100, height = 40) => ({
  top,
  left,
  width,
  height,
  right: left + width,
  bottom: top + height,
});

function setup(props: Partial<React.ComponentProps<typeof Tooltip>> = {}) {
  const utils = render(
    <Tooltip content="Saves a draft" {...props}>
      <button type="button">Save</button>
    </Tooltip>,
  );
  const trigger = screen.getByRole("button", { name: "Save" });
  return { ...utils, trigger };
}

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Tooltip — rendering", () => {
  it("is closed by default and links the trigger via aria-describedby", () => {
    const { trigger } = setup();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    const id = trigger.getAttribute("aria-describedby");
    expect(id).toBeTruthy();
    // Bubble stays mounted (hidden) so the description is always resolvable.
    const bubble = document.getElementById(id!);
    expect(bubble).toHaveAttribute("role", "tooltip");
    expect(bubble).toHaveAttribute("hidden");
  });

  it("portals to document.body with default variant / side", () => {
    const { container } = setup({ defaultOpen: true });
    const tip = screen.getByRole("tooltip");
    expect(container.contains(tip)).toBe(false);
    expect(tip.parentElement).toBe(document.body);
    expect(tip).toHaveAttribute("data-variant", "dark");
    expect(tip).toHaveAttribute("data-side", "top");
    expect(tip).toHaveAttribute("data-align", "center");
    expect(tip).toHaveTextContent("Saves a draft");
  });

  it("applies variant, align and maxWidth", () => {
    setup({ defaultOpen: true, variant: "light", align: "start", maxWidth: 320 });
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveAttribute("data-variant", "light");
    expect(tip).toHaveAttribute("data-align", "start");
    expect(tip.style.getPropertyValue("--ds-tooltip-max-width")).toBe("320px");
  });

  it("preserves an existing aria-describedby on the child", () => {
    render(
      <Tooltip content="Extra">
        <button type="button" aria-describedby="hint-1">
          Go
        </button>
      </Tooltip>,
    );
    const ids = screen.getByRole("button").getAttribute("aria-describedby")!.split(" ");
    expect(ids[0]).toBe("hint-1");
    expect(ids).toHaveLength(2);
  });

  it("disabled never opens and drops aria-describedby", () => {
    const { trigger } = setup({ disabled: true, defaultOpen: true });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute("aria-describedby");
    fireEvent.focus(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("forwards the child ref and the bubble ref", () => {
    const childRef = React.createRef<HTMLButtonElement>();
    const bubbleRef = React.createRef<HTMLDivElement>();
    render(
      <Tooltip content="Tip" ref={bubbleRef}>
        <button type="button" ref={childRef}>
          Ref
        </button>
      </Tooltip>,
    );
    expect(childRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(bubbleRef.current).toHaveAttribute("role", "tooltip");
  });
});

describe("Tooltip — interaction", () => {
  it("opens on hover after `delay`", () => {
    const { trigger } = setup({ delay: 300 });
    fireEvent.pointerEnter(trigger);
    advance(299);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    advance(1);
    expect(screen.getByRole("tooltip")).toBeVisible();
  });

  it("does not open if the pointer leaves before the delay", () => {
    const { trigger } = setup();
    fireEvent.pointerEnter(trigger);
    advance(100);
    fireEvent.pointerLeave(trigger);
    advance(500);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("opens immediately on keyboard focus and closes on blur", () => {
    const { trigger } = setup();
    act(() => trigger.focus());
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    act(() => trigger.blur());
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("closes after `closeDelay` when the pointer leaves", () => {
    const { trigger } = setup({ closeDelay: 100 });
    fireEvent.pointerEnter(trigger);
    advance(300);
    fireEvent.pointerLeave(trigger);
    advance(99);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    advance(1);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("calls the child's own handlers as well", () => {
    const onFocus = vi.fn();
    const onPointerEnter = vi.fn();
    render(
      <Tooltip content="Tip">
        <button type="button" onFocus={onFocus} onPointerEnter={onPointerEnter}>
          X
        </button>
      </Tooltip>,
    );
    const btn = screen.getByRole("button");
    fireEvent.pointerEnter(btn);
    act(() => btn.focus());
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onPointerEnter).toHaveBeenCalledTimes(1);
  });

  it("controlled: renders from `open` and reports changes via onOpenChange", () => {
    const onOpenChange = vi.fn();
    const { trigger, rerender } = render(
      <Tooltip content="Tip" open={false} onOpenChange={onOpenChange}>
        <button type="button">C</button>
      </Tooltip>,
    );
    act(() => screen.getByRole("button").focus());
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    rerender(
      <Tooltip content="Tip" open onOpenChange={onOpenChange}>
        <button type="button">C</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    void trigger;
  });
});

describe("Tooltip — WCAG 1.4.13 content on hover or focus", () => {
  it("dismissable: Escape closes without moving focus (focus-opened)", () => {
    const { trigger } = setup();
    act(() => trigger.focus());
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("dismissable: Escape closes a hover-opened tooltip without pointer movement", () => {
    const { trigger } = setup();
    fireEvent.pointerEnter(trigger);
    advance(300);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    // Pointer still over the trigger: does not re-open by itself.
    advance(1000);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("dismissable: Escape is consumed so an enclosing layer does not also close", () => {
    const outer = vi.fn();
    document.addEventListener("keydown", outer);
    const { trigger } = setup();
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(outer).not.toHaveBeenCalled();
    // Once the tooltip is closed, Escape flows through normally.
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(outer).toHaveBeenCalledTimes(1);
    document.removeEventListener("keydown", outer);
  });

  it("hoverable: moving the pointer from the trigger onto the bubble keeps it open", () => {
    const { trigger } = setup({ closeDelay: 100 });
    fireEvent.pointerEnter(trigger);
    advance(300);
    const tip = screen.getByRole("tooltip");
    fireEvent.pointerLeave(trigger);
    advance(50);
    fireEvent.pointerEnter(tip);
    advance(1000);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.pointerLeave(tip);
    advance(100);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("persistent: stays open with no timeout while hovered", () => {
    const { trigger } = setup();
    fireEvent.pointerEnter(trigger);
    advance(300);
    advance(60_000);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("persistent: pointer leaving does not close while the trigger still has focus", () => {
    const { trigger } = setup();
    act(() => trigger.focus());
    fireEvent.pointerEnter(trigger);
    fireEvent.pointerLeave(trigger);
    advance(1000);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("persistent: blur does not close while the pointer is still over the trigger", () => {
    const { trigger } = setup();
    fireEvent.pointerEnter(trigger);
    act(() => trigger.focus());
    act(() => trigger.blur());
    advance(1000);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});

describe("tooltipPosition", () => {
  it("places on the preferred side when it fits (top, centered)", () => {
    const r = rect(300, 400);
    const pos = computeTooltipPosition(r, 120, 30, "top", "center", VP);
    expect(pos.side).toBe("top");
    expect(pos.top).toBe(300 - 8 - 30);
    expect(pos.left).toBe(400 + 50 - 60);
  });

  it("flips top → bottom when there is no room above", () => {
    const r = rect(10, 400);
    const pos = computeTooltipPosition(r, 120, 30, "top", "center", VP);
    expect(pos.side).toBe("bottom");
    expect(pos.top).toBe(10 + 40 + 8);
  });

  it("flips right → left near the right edge", () => {
    expect(resolveTooltipSide("right", rect(300, 950, 60), 120, 30, VP)).toBe("left");
  });

  it("flips bottom → top and left → right symmetrically", () => {
    expect(resolveTooltipSide("bottom", rect(740, 400, 100, 20), 120, 30, VP)).toBe("top");
    expect(resolveTooltipSide("left", rect(300, 5, 40), 120, 30, VP)).toBe("right");
  });

  it("aligns start / end and clamps inside the viewport", () => {
    const r = rect(300, 400);
    expect(computeTooltipPosition(r, 120, 30, "bottom", "start", VP).left).toBe(400);
    expect(computeTooltipPosition(r, 120, 30, "bottom", "end", VP).left).toBe(500 - 120);
    const edge = computeTooltipPosition(rect(300, 0, 20), 200, 30, "top", "center", VP);
    expect(edge.left).toBe(8);
  });
});
