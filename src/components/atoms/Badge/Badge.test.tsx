import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Badge, { Chip, Tag } from "./index";
import type { BadgeTone, BadgeVariant } from "./Badge.types";

const VARIANTS: BadgeVariant[] = ["neutral", "primary", "success", "warning", "danger", "info"];
const TONES: BadgeTone[] = ["soft", "solid", "outline"];

describe("Badge — rendering", () => {
  it("renders the label with default data attributes", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New").closest(".ds-badge") as HTMLElement;
    expect(badge).toHaveAttribute("data-variant", "neutral");
    expect(badge).toHaveAttribute("data-tone", "soft");
    expect(badge).toHaveAttribute("data-shape", "rounded");
    expect(badge).toHaveAttribute("data-size", "sm");
    expect(badge).not.toHaveAttribute("data-elevated");
  });

  it.each(VARIANTS)("renders variant %s", (variant) => {
    render(<Badge variant={variant}>{variant}</Badge>);
    expect(screen.getByText(variant).closest(".ds-badge")).toHaveAttribute("data-variant", variant);
  });

  it.each(TONES)("renders tone %s", (tone) => {
    render(<Badge tone={tone}>{tone}</Badge>);
    expect(screen.getByText(tone).closest(".ds-badge")).toHaveAttribute("data-tone", tone);
  });

  it("supports shape, size, elevated and merges className / native attrs", () => {
    render(
      <Badge shape="pill" size="md" elevated className="extra" data-testid="b" title="Status">
        Live
      </Badge>,
    );
    const badge = screen.getByTestId("b");
    expect(badge).toHaveAttribute("data-shape", "pill");
    expect(badge).toHaveAttribute("data-size", "md");
    expect(badge).toHaveAttribute("data-elevated", "true");
    expect(badge).toHaveClass("ds-badge", "extra");
    expect(badge).toHaveAttribute("title", "Status");
  });

  it("renders a decorative dot hidden from assistive tech", () => {
    const { container } = render(<Badge dot>Unread</Badge>);
    expect(container.querySelector(".ds-badge__dot")).toHaveAttribute("aria-hidden");
  });

  it("renders an icon slot", () => {
    render(<Badge icon={<svg data-testid="icon" aria-hidden="true" />}>Done</Badge>);
    expect(screen.getByTestId("icon").parentElement).toHaveClass("ds-badge__icon");
  });

  it("Chip and Tag are aliases of Badge", () => {
    expect(Chip).toBe(Badge);
    expect(Tag).toBe(Badge);
  });

  it("renders text content, never HTML", () => {
    render(<Badge>{"<img src=x onerror=alert(1)>"}</Badge>);
    expect(screen.getByText("<img src=x onerror=alert(1)>")).toBeInTheDocument();
    expect(document.querySelector("img")).toBeNull();
  });
});

describe("Badge — dismiss", () => {
  it("renders no dismiss button without onDismiss", () => {
    render(<Badge>Static</Badge>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a labelled dismiss button (default label 'Remove')", () => {
    render(<Badge onDismiss={() => {}}>Filter</Badge>);
    const btn = screen.getByRole("button", { name: "Remove" });
    expect(btn).toHaveAttribute("type", "button");
    expect(btn.querySelector("svg")).toHaveAttribute("aria-hidden");
  });

  it("uses a custom dismissLabel", () => {
    render(
      <Badge onDismiss={() => {}} dismissLabel="Remove filter: Paid">
        Paid
      </Badge>,
    );
    expect(screen.getByRole("button", { name: "Remove filter: Paid" })).toBeInTheDocument();
  });

  it("calls onDismiss without bubbling to the badge onClick", () => {
    const onDismiss = vi.fn();
    const onClick = vi.fn();
    render(
      <Badge onDismiss={onDismiss} onClick={onClick}>
        Chip
      </Badge>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("dismiss button is keyboard reachable (native button)", () => {
    render(<Badge onDismiss={() => {}}>Chip</Badge>);
    const btn = screen.getByRole("button", { name: "Remove" });
    btn.focus();
    expect(btn).toHaveFocus();
  });

  it("fires onClick on the badge itself", () => {
    const onClick = vi.fn();
    render(<Badge onClick={onClick}>Clickable</Badge>);
    fireEvent.click(screen.getByText("Clickable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
