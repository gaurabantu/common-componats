import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput from "./index";

describe("TextInput", () => {
  it("renders with placeholder", () => {
    render(<TextInput placeholder="Enter text" value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const handleChange = vi.fn();
    render(<TextInput value="" onChange={handleChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("displays value", () => {
    render(<TextInput value="test value" onChange={() => {}} />);
    expect(screen.getByDisplayValue("test value")).toBeInTheDocument();
  });
});
