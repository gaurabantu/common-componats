import React from "react";
import { render, screen } from "@testing-library/react";
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
});
