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

  it("headerSearch keeps spaces in the value", async () => {
    const handleChange = vi.fn();
    render(<TextInput validation="headerSearch" type="search" value="" onChange={handleChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "foo bar baz");
    const final = handleChange.mock.calls.at(-1)?.[0] as string;
    expect(final).toBeDefined();
    expect(final).toContain(" ");
  });

  it("headerSearch pattern removes characters that fail per-code-unit test", async () => {
    const handleChange = vi.fn();
    render(
      <TextInput
        validation="headerSearch"
        type="search"
        value=""
        onChange={handleChange}
        pattern={/[a-zA-Z0-9\s]/}
      />
    );
    await userEvent.type(screen.getByRole("searchbox"), "a@b$c");
    const final = handleChange.mock.calls.at(-1)?.[0] as string;
    expect(final).toBe("abc");
  });

  it("defaults spellcheck and autocorrect hints off unless autoCorrection", () => {
    render(<TextInput value="" onChange={() => {}} />);
    const el = screen.getByRole("textbox") as HTMLInputElement;
    expect(el.getAttribute("spellcheck")).toBe("false");
    expect(el.getAttribute("autocorrect")).toBe("off");
    expect(el.getAttribute("autocapitalize")).toBe("none");
  });

  it("autoCorrection opts into spellcheck and autocorrect hints", () => {
    render(<TextInput value="" onChange={() => {}} autoCorrection />);
    const el = screen.getByRole("textbox") as HTMLInputElement;
    expect(el.getAttribute("spellcheck")).toBe("true");
    expect(el.getAttribute("autocorrect")).toBe("on");
    expect(el.getAttribute("autocapitalize")).toBeNull();
  });
});
