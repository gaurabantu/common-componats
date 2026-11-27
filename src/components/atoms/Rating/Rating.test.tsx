import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Rating from "./index";
import { roundRating, iconFill } from "./Rating.config";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// vitest stubs CSS imports (even ?raw), so read the stylesheet from disk.
const ratingCss = readFileSync(resolve(process.cwd(), "src/components/atoms/Rating/Rating.css"), "utf8");

describe("Rating", () => {
  it("renders a named radiogroup with one radio per star", () => {
    render(<Rating label="Product quality" />);
    const group = screen.getByRole("radiogroup", { name: "Product quality" });
    expect(group).toBeInTheDocument();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(5);
    expect(radios[0]).toHaveAccessibleName("1 star");
    expect(radios[2]).toHaveAccessibleName("3 stars");
  });

  it("defaults the group name to 'Rating'", () => {
    render(<Rating />);
    expect(screen.getByRole("radiogroup", { name: "Rating" })).toBeInTheDocument();
  });

  it("honours max and getLabelText", () => {
    render(<Rating max={3} getLabelText={(v) => `${v} of 3 hearts`} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(radios[1]).toHaveAccessibleName("2 of 3 hearts");
  });

  it("is uncontrolled with defaultValue and calls onChange on click", () => {
    const onChange = vi.fn();
    render(<Rating defaultValue={2} onChange={onChange} />);
    expect(screen.getByRole("radio", { name: "2 stars" })).toBeChecked();
    fireEvent.click(screen.getByRole("radio", { name: "4 stars" }));
    expect(onChange).toHaveBeenCalledWith(4, expect.anything());
    expect(screen.getByRole("radio", { name: "4 stars" })).toBeChecked();
  });

  it("is controlled with value (does not change without the parent)", () => {
    const onChange = vi.fn();
    render(<Rating value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "5 stars" }));
    expect(onChange).toHaveBeenCalledWith(5, expect.anything());
    expect(screen.getByRole("radio", { name: "1 star" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "5 stars" })).not.toBeChecked();
  });

  it("clicking a star's pointer target selects it (pointer path)", () => {
    const onChange = vi.fn();
    const { container } = render(<Rating onChange={onChange} />);
    const labels = container.querySelectorAll(".ds-rating__hit");
    fireEvent.click(labels[2]);
    expect(onChange).toHaveBeenCalledWith(3, expect.anything());
  });

  it("precision 0.5 renders two radios per star with half labels", () => {
    render(<Rating precision={0.5} max={2} />);
    const radios = screen.getAllByRole("radio");
    expect(radios.map((r) => (r as HTMLInputElement).value)).toEqual(["0.5", "1", "1.5", "2"]);
    expect(radios[0]).toHaveAccessibleName("0.5 stars");
  });

  it("shares a name across radios and uses the provided name for forms", () => {
    render(
      <form data-testid="f">
        <Rating name="score" defaultValue={3} />
      </form>,
    );
    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(radios.every((r) => r.name === "score")).toBe(true);
    const data = new FormData(screen.getByTestId("f") as HTMLFormElement);
    expect(data.get("score")).toBe("3");
  });

  it("readOnly renders role=img '4 out of 5 stars' and no radios", () => {
    render(<Rating readOnly value={4} />);
    expect(screen.getByRole("img", { name: "4 out of 5 stars" })).toBeInTheDocument();
    expect(screen.queryByRole("radio")).toBeNull();
  });

  it("readOnly rounds to precision", () => {
    render(<Rating readOnly value={3.7} precision={0.5} />);
    expect(screen.getByRole("img", { name: "3.5 out of 5 stars" })).toBeInTheDocument();
  });

  it("disabled disables every radio and flags the group", () => {
    render(<Rating disabled defaultValue={2} />);
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-disabled", "true");
    screen.getAllByRole("radio").forEach((r) => expect(r).toBeDisabled());
  });

  it("required marks the group and radios", () => {
    render(<Rating required />);
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-required", "true");
    expect(screen.getAllByRole("radio")[0]).toBeRequired();
  });

  it("hover previews the fill and resets on leave", () => {
    const { container } = render(<Rating defaultValue={1} />);
    const icons = () => Array.from(container.querySelectorAll(".ds-rating__icon")).map((n) => n.getAttribute("data-fill"));
    expect(icons()).toEqual(["full", "empty", "empty", "empty", "empty"]);
    fireEvent.mouseEnter(container.querySelectorAll(".ds-rating__hit")[3]);
    expect(icons()).toEqual(["full", "full", "full", "full", "empty"]);
    fireEvent.mouseLeave(screen.getByRole("radiogroup"));
    expect(icons()).toEqual(["full", "empty", "empty", "empty", "empty"]);
  });

  it("uses a custom icon in both layers", () => {
    const { container } = render(<Rating max={2} icon={<span className="heart">♥</span>} />);
    expect(container.querySelectorAll(".heart")).toHaveLength(4);
    expect(container.querySelector(".ds-rating__icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards ref and reflects size", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Rating ref={ref} size="lg" />);
    expect(ref.current).toHaveAttribute("data-size", "lg");
  });

  it("helpers round and fill correctly", () => {
    expect(roundRating(2.26, 0.5, 5)).toBe(2.5);
    expect(roundRating(9, 1, 5)).toBe(5);
    expect(roundRating(Number.NaN, 1, 5)).toBe(0);
    expect(iconFill(3, 2.5)).toBe("half");
    expect(iconFill(2, 2.5)).toBe("full");
    expect(iconFill(4, 2.5)).toBe("empty");
  });
  describe("WCAG 2.5.8 target size", () => {
    const rect = { left: 0, top: 0, right: 28, bottom: 28, width: 28, height: 28, x: 0, y: 0, toJSON: () => ({}) };

    it("precision 0.5 uses ONE full-star pointer target per star (radios stay for keyboard)", () => {
      const { container } = render(<Rating precision={0.5} max={3} />);
      expect(container.querySelectorAll(".ds-rating__hit")).toHaveLength(3);
      expect(screen.getAllByRole("radio")).toHaveLength(6);
      container.querySelectorAll(".ds-rating__hit").forEach((hit) => {
        expect(hit).toHaveAttribute("aria-hidden", "true");
        expect(hit).not.toHaveAttribute("data-part");
      });
    });

    it("picks the half from the pointer position on a full-star target", () => {
      const onChange = vi.fn();
      const { container } = render(<Rating precision={0.5} max={3} onChange={onChange} />);
      const hit = container.querySelectorAll<HTMLElement>(".ds-rating__hit")[1];
      hit.getBoundingClientRect = () => rect as DOMRect;
      fireEvent.click(hit, { clientX: 5 });
      expect(onChange).toHaveBeenLastCalledWith(1.5, expect.anything());
      expect(screen.getByRole("radio", { name: "1.5 stars" })).toBeChecked();
      fireEvent.click(hit, { clientX: 20 });
      expect(onChange).toHaveBeenLastCalledWith(2, expect.anything());
      fireEvent.mouseEnter(hit, { clientX: 3 });
      const fills = Array.from(container.querySelectorAll(".ds-rating__icon")).map((n) => n.getAttribute("data-fill"));
      expect(fills).toEqual(["full", "half", "empty"]);
    });

    it("disabled pointer targets do nothing", () => {
      const onChange = vi.fn();
      const { container } = render(<Rating disabled onChange={onChange} />);
      fireEvent.click(container.querySelectorAll(".ds-rating__hit")[2]);
      expect(onChange).not.toHaveBeenCalled();
    });

    it("CSS: no half-width targets, sm keeps 24px centre spacing, 44px stars on coarse pointers", () => {
      const css = String(ratingCss);
      expect(css).not.toMatch(/data-part/);
      // sm: 1.25rem (20px) icon + var(--space-0) (4px) gap = 24px centre-to-centre.
      expect(css).toMatch(/\[data-size="sm"\]\s*\{\s*--rating-size:\s*1\.25rem;\s*gap:\s*var\(--space-0\)/);
      expect(css).toMatch(/@media \(pointer: coarse\)\s*\{\s*\.ds-rating:not\(\[data-readonly\]\)\s*\{\s*--rating-size:\s*2\.75rem/);
    });
  });
});
