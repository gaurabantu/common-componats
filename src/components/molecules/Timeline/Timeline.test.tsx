import React from "react";
import { render, screen, within } from "@testing-library/react";
import Timeline, { TimelineItem } from "./index";

const DATE = new Date("2026-03-04T10:30:00.000Z");

describe("Timeline", () => {
  it("renders an ordered list with one listitem per event", () => {
    render(
      <Timeline
        label="Order history"
        items={[
          { id: "a", title: "Order placed" },
          { id: "b", title: "Shipped" },
          { id: "c", title: "Delivered" },
        ]}
      />,
    );
    const list = screen.getByRole("list", { name: "Order history" });
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders Date timestamps as <time dateTime=ISO> with a formatted label", () => {
    const { container } = render(
      <Timeline formatTimestamp={() => "4 Mar 2026"} items={[{ title: "Created", timestamp: DATE }]} />,
    );
    const time = container.querySelector("time")!;
    expect(time).toHaveAttribute("datetime", DATE.toISOString());
    expect(time).toHaveTextContent("4 Mar 2026");
  });

  it("uses string timestamps as dateTime and timestampLabel as visible text", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem title="Kick-off" timestamp="2026-01-10" timestampLabel="Jan 10" />
      </Timeline>,
    );
    const time = container.querySelector("time")!;
    expect(time).toHaveAttribute("datetime", "2026-01-10");
    expect(time).toHaveTextContent("Jan 10");
  });

  it("omits <time> for invalid timestamps", () => {
    const { container } = render(<Timeline items={[{ title: "Bad", timestamp: Number.NaN }]} />);
    expect(container.querySelector("time")).toBeNull();
  });

  it("pairs status colour with a visually hidden status word (overridable)", () => {
    render(
      <Timeline
        items={[
          { title: "Deploy", status: "success" },
          { title: "Tests", status: "danger", statusLabel: "Failed" },
          { title: "Note", status: "neutral" },
        ]}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveAttribute("data-status", "success");
    expect(items[0]).toHaveTextContent("Deploy, Success");
    expect(items[1]).toHaveTextContent("Tests, Failed");
    expect(items[2].textContent).toBe("Note");
  });

  it("keeps the marker and icon decorative", () => {
    const { container } = render(<Timeline items={[{ title: "Star", icon: <svg data-testid="icon" /> }]} />);
    const marker = container.querySelector(".ds-timeline-item__marker")!;
    expect(marker).toHaveAttribute("aria-hidden", "true");
    expect(marker).toContainElement(screen.getByTestId("icon"));
  });

  it("appends a pending item last (default and custom title)", () => {
    const { rerender } = render(<Timeline items={[{ title: "Step 1" }]} pending />);
    let items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[1]).toHaveAttribute("data-pending", "true");
    expect(items[1]).toHaveTextContent("In progress, Pending");

    rerender(<Timeline items={[{ title: "Step 1" }]} pending="Awaiting approval" />);
    items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveTextContent("Awaiting approval");
  });

  it("reflects orientation / align / size on the root", () => {
    const { container } = render(
      <Timeline orientation="vertical" align="alternate" size="sm" className="custom" items={[{ title: "A" }]} />,
    );
    const root = container.querySelector(".ds-timeline")!;
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root).toHaveAttribute("data-align", "alternate");
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveClass("custom");
    expect(root).not.toHaveAttribute("tabindex");
    expect(root).not.toHaveAttribute("role");
  });

  it("makes a horizontal timeline a named, keyboard-focusable scroll region", () => {
    render(<Timeline orientation="horizontal" label="Release plan" items={[{ title: "Alpha" }]} />);
    const region = screen.getByRole("region", { name: "Release plan" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveAttribute("data-orientation", "horizontal");
  });

  it("forwards the ref to the <ol>", () => {
    const ref = React.createRef<HTMLOListElement>();
    render(<Timeline ref={ref} items={[{ title: "A" }]} />);
    expect(ref.current?.tagName).toBe("OL");
  });

  it("renders user text as text (no HTML injection)", () => {
    const { container } = render(<Timeline items={[{ title: "<img src=x onerror=alert(1)>" }]} />);
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText("<img src=x onerror=alert(1)>")).toBeInTheDocument();
  });
});
