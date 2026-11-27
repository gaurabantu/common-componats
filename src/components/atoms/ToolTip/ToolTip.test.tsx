import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import TooltipIcon from "./index";
import { PLACEMENT_TO_SIDE } from "./TooltipIcon.config";

describe("ToolTip (icon tooltip) — layering", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  function open() {
    fireEvent.mouseEnter(screen.getByLabelText("Help"));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    return screen.getByRole("tooltip");
  }

  it("defaults to the --z-tooltip-top token layer", () => {
    render(<TooltipIcon tooltipText="Help" />);
    expect(open().style.zIndex).toBe("var(--z-tooltip-top, 600)");
  });

  it("honours an explicit zIndex prop", () => {
    render(<TooltipIcon tooltipText="Help" zIndex={12000} />);
    expect(open().style.zIndex).toBe("12000");
  });
});

describe("ToolTip — thin wrapper over molecules/Tooltip", () => {
  it("is the deprecated wrapper: displayName, focusable trigger with accessible name", () => {
    expect(TooltipIcon.displayName).toBe("ToolTip");
    render(<TooltipIcon tooltipText="Help" />);
    const trigger = screen.getByLabelText("Help");
    expect(trigger).toHaveAttribute("tabindex", "0");
    expect(trigger).toHaveClass("ds-tooltip-icon");
  });

  it("renders the canonical portalled bubble (ds-tooltip) linked via aria-describedby", () => {
    vi.useFakeTimers();
    try {
      render(<TooltipIcon tooltipText="Help" content="More detail" variant="light" placement="bottom" />);
      const trigger = screen.getByLabelText("Help");
      fireEvent.mouseEnter(trigger);
      act(() => {
        vi.advanceTimersByTime(100);
      });
      const bubble = screen.getByRole("tooltip");
      expect(bubble).toHaveClass("ds-tooltip");
      expect(bubble.parentElement).toBe(document.body);
      expect(bubble).toHaveAttribute("data-variant", "light");
      expect(bubble).toHaveAttribute("data-side", "bottom");
      expect(bubble).toHaveTextContent("More detail");
      expect(trigger.getAttribute("aria-describedby")).toBe(bubble.id);
      fireEvent.mouseLeave(trigger);
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.queryByRole("tooltip")).toBeNull();
    } finally {
      vi.useRealTimers();
    }
  });

  it("opens on keyboard focus immediately and Escape dismisses without moving focus", () => {
    render(<TooltipIcon tooltipText="Help" />);
    const trigger = screen.getByLabelText("Help");
    act(() => trigger.focus());
    expect(screen.getByRole("tooltip")).toHaveTextContent("Help");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes on blur", () => {
    render(<TooltipIcon tooltipText="Help" />);
    const trigger = screen.getByLabelText("Help");
    act(() => trigger.focus());
    act(() => trigger.blur());
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("placement=auto maps to side=top; custom children replace the icon; ref + consumer handlers work", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const onMouseEnter = vi.fn();
    render(
      <TooltipIcon ref={ref} tooltipText="Info" onMouseEnter={onMouseEnter} className="extra">
        <span>?</span>
      </TooltipIcon>,
    );
    const trigger = screen.getByLabelText("Info");
    expect(ref.current).toBe(trigger);
    expect(trigger).toHaveClass("extra");
    expect(trigger).toHaveTextContent("?");
    fireEvent.mouseEnter(trigger);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(PLACEMENT_TO_SIDE.auto).toBe("top");
  });
});

describe("ToolTip — trigger role (iteration 2)", () => {
  it("trigger is a named button (no prohibited aria-label on a role-less span)", () => {
    render(<TooltipIcon tooltipText="Help" size={12} maxWidth={320} />);
    const trigger = screen.getByRole("button", { name: "Help" });
    expect(trigger.tagName).toBe("SPAN");
    expect(trigger).toHaveAttribute("tabindex", "0");
  });

  it("Enter and Space toggle the bubble; consumer onKeyDown runs first and can opt out", () => {
    const onKeyDown = vi.fn();
    render(<TooltipIcon tooltipText="Help" onKeyDown={onKeyDown} />);
    const trigger = screen.getByRole("button", { name: "Help" });
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Help");
    fireEvent.keyDown(trigger, { key: " " });
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(onKeyDown).toHaveBeenCalledTimes(2);
  });

  it("consumer role overrides the default", () => {
    render(<TooltipIcon tooltipText="Help" role="img" />);
    expect(screen.getByRole("img", { name: "Help" })).toBeInTheDocument();
  });
});
