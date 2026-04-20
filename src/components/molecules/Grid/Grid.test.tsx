import React from "react";
import { render, screen } from "@testing-library/react";
import Grid, { GridItem } from "./index";

describe("Grid", () => {
  it("renders children", () => {
    render(
      <Grid>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
      </Grid>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
