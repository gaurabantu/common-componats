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
});
