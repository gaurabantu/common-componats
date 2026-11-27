import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import AvatarGroup from "./index";
import Avatar from "../Avatar";
import { overflowLabel } from "./AvatarGroup.config";

const PEOPLE = [
  { id: 1, name: "Ana Silva" },
  { id: 2, name: "Ben Okafor" },
  { id: 3, name: "Chen Wei" },
  { id: 4, name: "Dara Khan" },
  { id: 5, name: "Eli Roth" },
  { id: 6, name: "Fay Ito" },
];

describe("AvatarGroup", () => {
  it("renders a labelled group (default label = people count)", () => {
    render(<AvatarGroup items={PEOPLE.slice(0, 3)} />);
    expect(screen.getByRole("group", { name: "3 people" })).toBeInTheDocument();
  });

  it("uses the label prop as accessible name", () => {
    render(<AvatarGroup label="Project members" items={PEOPLE.slice(0, 2)} />);
    expect(screen.getByRole("group", { name: "Project members" })).toBeInTheDocument();
  });

  it("names each visible avatar and hides decorative internals", () => {
    render(<AvatarGroup items={PEOPLE.slice(0, 2)} />);
    expect(screen.getByRole("img", { name: "Ana Silva" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Ben Okafor" })).toBeInTheDocument();
  });

  it("shows at most `max` avatars plus a +N chip naming the hidden people", () => {
    render(<AvatarGroup items={PEOPLE} max={3} />);
    const group = screen.getByRole("group");
    expect(within(group).getAllByRole("img")).toHaveLength(3);
    const chip = screen.getByRole("button", { name: "Show 3 more: Dara Khan, Eli Roth, Fay Ito" });
    expect(chip).toHaveTextContent("+3");
    expect(chip).toHaveAttribute("aria-haspopup", "dialog");
    expect(chip).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a popover listing hidden people; Escape closes it", () => {
    render(<AvatarGroup items={PEOPLE} max={4} />);
    const chip = screen.getByRole("button", { name: /Show 2 more/ });
    fireEvent.click(chip);
    const dialog = screen.getByRole("dialog", { name: "2 more people" });
    expect(within(dialog).getByText("Eli Roth")).toBeInTheDocument();
    expect(within(dialog).getByText("Fay Ito")).toBeInTheDocument();
    expect(chip).toHaveAttribute("aria-expanded", "true");
    act(() => {
      fireEvent.keyDown(document, { key: "Escape" });
    });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("calls onOverflowClick instead of opening a popover", () => {
    const onOverflowClick = vi.fn();
    render(<AvatarGroup items={PEOPLE} max={2} onOverflowClick={onOverflowClick} />);
    fireEvent.click(screen.getByRole("button", { name: /Show 4 more/ }));
    expect(onOverflowClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("uses total for the overflow count (server-side count)", () => {
    render(<AvatarGroup items={PEOPLE.slice(0, 2)} total={12} max={2} />);
    expect(screen.getByRole("group", { name: "12 people" })).toBeInTheDocument();
    const chip = screen.getByRole("img", { name: "10 more people" });
    expect(chip).toHaveTextContent("+10");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("mixes known hidden names with a remainder from total", () => {
    render(<AvatarGroup items={PEOPLE.slice(0, 3)} total={5} max={2} />);
    expect(screen.getByRole("button", { name: "Show 3 more: Chen Wei and 2 others" })).toBeInTheDocument();
  });

  it("renders no chip when everyone fits", () => {
    render(<AvatarGroup items={PEOPLE.slice(0, 2)} max={4} />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("accepts Avatar children", () => {
    render(
      <AvatarGroup max={1}>
        <Avatar name="Gil Moss" />
        <Avatar name="Hana Lee" />
      </AvatarGroup>,
    );
    expect(screen.getByRole("img", { name: "Gil Moss" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show 1 more: Hana Lee" })).toBeInTheDocument();
  });

  it("custom renderOverflow content", () => {
    render(<AvatarGroup items={PEOPLE} max={5} renderOverflow={(n) => `${n}+`} />);
    expect(screen.getByRole("button", { name: /Show 1 more/ })).toHaveTextContent("1+");
  });

  it("reflects spacing and size, forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AvatarGroup ref={ref} items={PEOPLE.slice(0, 2)} size="lg" spacing="tight" />);
    expect(ref.current).toHaveAttribute("data-spacing", "tight");
    expect(ref.current?.style.getPropertyValue("--ag-size")).toBe("48px");
  });

  it("overflowLabel caps spoken names", () => {
    const names = Array.from({ length: 12 }, (_, i) => `P${i}`);
    expect(overflowLabel(12, names)).toMatch(/P9 and 2 others$/);
    expect(overflowLabel(3, [])).toBe("Show 3 more");
  });
});
