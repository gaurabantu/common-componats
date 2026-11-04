import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextArea from "./index";

describe("TextArea", () => {
  it("renders with placeholder", () => {
    render(<TextArea placeholder="Enter description" value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const handleChange = vi.fn();
    render(<TextArea value="" onChange={handleChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("forwards ref to the native textarea", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} ariaLabel="Notes" />);
    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Notes" }));
    expect(ref.current?.tagName).toBe("TEXTAREA");
  });

  it("has no maxLength unless one is passed (does not truncate long text)", () => {
    const long = "x".repeat(800);
    const { rerender } = render(<TextArea ariaLabel="Notes" defaultValue={long} />);
    const el = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(el).not.toHaveAttribute("maxlength");
    expect(el.value).toHaveLength(800);
    rerender(<TextArea ariaLabel="Notes" defaultValue={long} maxLength={10} />);
    expect(el).toHaveAttribute("maxlength", "10");
  });

  it("does not strip emojis or characters unless sanitize is on", async () => {
    const handleChange = vi.fn();
    render(<TextArea ariaLabel="Notes" onChange={handleChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a#b🙂");
    expect(handleChange.mock.calls.at(-1)?.[0]).toBe("a#b🙂");
  });

  it("showCount without maxLength shows only the count", () => {
    render(<TextArea ariaLabel="Notes" value="abc" onChange={() => {}} showCount />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("uses a provided id, applies disabled and accepts a node label", () => {
    render(<TextArea id="notes" disabled label={<span>Notes <em>(public)</em></span>} />);
    const el = screen.getByRole("textbox", { name: /notes/i });
    expect(el).toHaveAttribute("id", "notes");
    expect(el).toBeDisabled();
  });
});
