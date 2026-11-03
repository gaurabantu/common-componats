import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(<Card title="My Card">Content</Card>);
    expect(screen.getByText("My Card")).toBeInTheDocument();
  });

  it("renders compound header, content, and footer", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Composed title</CardTitle>
          <CardDescription>Helper text</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Composed title" })).toBeInTheDocument();
    expect(screen.getByText("Helper text")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer actions")).toBeInTheDocument();
  });

  it("exposes static Card.Header namespace", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title as="h2">Ns title</Card.Title>
        </Card.Header>
        <Card.Content>Ns body</Card.Content>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Ns title" })).toBeInTheDocument();
    expect(screen.getByText("Ns body")).toBeInTheDocument();
  });
  it("interactive card with onClick acts as a button (click, Enter, Space)", () => {
    const onClick = vi.fn();
    render(
      <Card interactive onClick={onClick} aria-label="Open tokens">
        Tokens
      </Card>,
    );
    const tile = screen.getByRole("button", { name: "Open tokens" });
    expect(tile).toHaveAttribute("tabindex", "0");
    fireEvent.click(tile);
    fireEvent.keyDown(tile, { key: "Enter" });
    fireEvent.keyDown(tile, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("selected interactive card reports aria-pressed", () => {
    render(
      <Card interactive selected onClick={() => {}} aria-label="Dark theme">
        Dark
      </Card>,
    );
    expect(screen.getByRole("button", { name: "Dark theme" })).toHaveAttribute("aria-pressed", "true");
  });

  it("non-interactive card keeps div semantics", () => {
    render(<Card onClick={() => {}}>Plain</Card>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  it("unselected interactive card reports aria-pressed=false when selected is provided", () => {
    render(
      <Card interactive selected={false} onClick={() => {}} aria-label="Light theme">
        Light
      </Card>,
    );
    expect(screen.getByRole("button", { name: "Light theme" })).toHaveAttribute("aria-pressed", "false");
  });

  it("interactive card without selected prop has no pressed state", () => {
    render(
      <Card interactive onClick={() => {}} aria-label="Open">
        Open
      </Card>,
    );
    expect(screen.getByRole("button", { name: "Open" })).not.toHaveAttribute("aria-pressed");
  });
});
