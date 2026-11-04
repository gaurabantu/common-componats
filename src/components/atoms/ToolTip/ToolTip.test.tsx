import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import TooltipIcon from "./index";

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
