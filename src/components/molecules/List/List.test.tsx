import React from "react";
import { render, screen, within } from "@testing-library/react";
import { List, ListItem, isSafeHref } from "./index";

describe("List", () => {
  it("renders a list with items and default attributes", () => {
    render(
      <List aria-label="Steps">
        <ListItem title="One" />
        <ListItem title="Two" />
      </List>,
    );
    const list = screen.getByRole("list", { name: "Steps" });
    expect(list).toHaveAttribute("data-divided", "true");
    expect(list).toHaveAttribute("data-size", "md");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders an ordered list when ordered", () => {
    const { container } = render(
      <List ordered>
        <ListItem title="Step" />
      </List>,
    );
    expect(container.querySelector("ol")).toBeInTheDocument();
  });

  it("renders title as a link with safe rel for _blank", () => {
    render(
      <List>
        <ListItem title="Docs" href="https://example.com" target="_blank" />
      </List>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("drops the link when disabled", () => {
    render(
      <List>
        <ListItem title="Docs" href="/docs" disabled />
      </List>,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveAttribute("aria-disabled", "true");
  });

  it("renders badge, description, meta and action slots", () => {
    render(
      <List>
        <ListItem
          title="tokens.css"
          badge={<span>v2.0.0</span>}
          description="Design tokens"
          meta="42 KB"
          action={<button type="button">Download</button>}
          selected
        />
      </List>,
    );
    expect(screen.getByText("v2.0.0")).toBeInTheDocument();
    expect(screen.getByText("Design tokens")).toBeInTheDocument();
    expect(screen.getByText("42 KB")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveAttribute("aria-current", "true");
  });
  it("never renders javascript: or data: hrefs as links", () => {
    render(
      <List>
        <ListItem title="Bad" href="javascript:alert(1)" />
        <ListItem title="Also bad" href=" DATA:text/html,x" />
      </List>,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(isSafeHref("https://x.dev")).toBe(true);
    expect(isSafeHref("/docs")).toBe(true);
    expect(isSafeHref("#top")).toBe(true);
    expect(isSafeHref("mailto:a@b.c")).toBe(true);
    // Browser URL parsing strips tab/newline/leading control chars — these must still be rejected.
    expect(isSafeHref("java\tscript:alert(1)")).toBe(false);
    expect(isSafeHref("java\nscript:alert(1)")).toBe(false);
    expect(isSafeHref("\x01javascript:alert(1)")).toBe(false);
    expect(isSafeHref("vbscript:msgbox(1)")).toBe(false);
  });
});
