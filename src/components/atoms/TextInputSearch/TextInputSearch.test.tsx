import React from "react";
import { render, screen } from "@testing-library/react";
import TextInputSearch from "./index";

describe("TextInputSearch", () => {
  it("renders search input", () => {
    render(<TextInputSearch value="" onChange={() => {}} />);
    expect(screen.getByRole("search")).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(<TextInputSearch value="" onChange={() => {}} placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it('renders trailing Button (icon mode) when showSearchButton', () => {
    render(<TextInputSearch value="" onChange={() => {}} showSearchButton />);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it('renders labeled text Button when searchButtonDisplay="text"', () => {
    render(
      <TextInputSearch value="" onChange={() => {}} showSearchButton searchButtonDisplay="text" searchButtonLabel="Go" />
    );
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
  });
});
