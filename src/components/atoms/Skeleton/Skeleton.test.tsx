import React from "react";
import { render, screen } from "@testing-library/react";
import Skeleton, { SkeletonGroup } from "./index";

describe("Skeleton", () => {
  it("renders a single aria-hidden text bar by default", () => {
    const { container } = render(<Skeleton />);
    const el = container.querySelector(".ds-skeleton");
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveAttribute("data-shape", "text");
    expect(el).toHaveAttribute("data-animated", "true");
  });

  it("renders N lines with the last at 60% width", () => {
    const { container } = render(<Skeleton lines={3} width={240} />);
    const wrapper = container.querySelector(".ds-skeleton-lines");
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
    const bars = container.querySelectorAll(".ds-skeleton");
    expect(bars).toHaveLength(3);
    expect((bars[0] as HTMLElement).style.width).toBe("240px");
    expect((bars[1] as HTMLElement).style.width).toBe("240px");
    expect((bars[2] as HTMLElement).style.width).toBe("60%");
  });

  it("ignores lines for non-text shapes", () => {
    const { container } = render(<Skeleton shape="rect" lines={4} />);
    expect(container.querySelectorAll(".ds-skeleton")).toHaveLength(1);
    expect(container.querySelector(".ds-skeleton-lines")).toBeNull();
  });

  it("maps numeric dimensions to px and passes strings through", () => {
    const { container } = render(<Skeleton shape="rect" width="50%" height={120} radius="var(--radius-lg)" />);
    const el = container.querySelector(".ds-skeleton") as HTMLElement;
    expect(el.style.width).toBe("50%");
    expect(el.style.height).toBe("120px");
    expect(el.style.borderRadius).toBe("var(--radius-lg)");
  });

  it("circle uses width as height when height is omitted", () => {
    const { container } = render(<Skeleton shape="circle" width={48} />);
    const el = container.querySelector(".ds-skeleton") as HTMLElement;
    expect(el).toHaveAttribute("data-shape", "circle");
    expect(el.style.width).toBe("48px");
    expect(el.style.height).toBe("48px");
  });

  it("can disable the shimmer", () => {
    const { container } = render(<Skeleton animated={false} />);
    expect(container.querySelector(".ds-skeleton")).toHaveAttribute("data-animated", "false");
  });

  it("forwards ref and className", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} className="extra" />);
    expect(ref.current).toHaveClass("ds-skeleton", "extra");
  });
});

describe("SkeletonGroup", () => {
  it("is a status region (without aria-busy) with a default visually hidden label", () => {
    render(
      <SkeletonGroup>
        <Skeleton shape="circle" />
        <Skeleton lines={2} />
      </SkeletonGroup>,
    );
    const region = screen.getByRole("status");
    expect(region).not.toHaveAttribute("aria-busy");
    expect(region).toHaveTextContent("Loading content");
    expect(screen.getByText("Loading content")).toHaveClass("ds-skeleton-group__label");
  });

  it("leaves aria-busy to the consumer's loading container", () => {
    render(
      <section aria-busy="true" aria-label="Invoices">
        <SkeletonGroup label="Loading invoices" />
      </section>,
    );
    expect(screen.getByRole("region", { name: "Invoices" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).not.toHaveAttribute("aria-busy");
  });

  it("accepts a custom label and forwards attributes", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SkeletonGroup ref={ref} label="Loading invoices" data-testid="grp" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading invoices");
    expect(ref.current).toBe(screen.getByTestId("grp"));
  });
});
