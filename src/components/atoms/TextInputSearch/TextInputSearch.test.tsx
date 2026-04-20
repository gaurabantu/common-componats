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

  it("renders Ant-style text search button when showSearchButton", () => {
    render(
      <TextInputSearch value="" onChange={() => {}} showSearchButton searchButtonLabel="Go" />
    );
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
  });
});
