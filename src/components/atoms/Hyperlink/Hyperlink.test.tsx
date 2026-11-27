import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hyperlink from "./index";

describe("Hyperlink", () => {
  it("renders as link with href", () => {
    render(<Hyperlink href="https://example.com">Link</Hyperlink>);
    const link = screen.getByRole("link", { name: /link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("opens in new tab when openInNewTab is true", () => {
    render(
      <Hyperlink href="https://example.com" openInNewTab>
        Link
      </Hyperlink>
    );
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  describe("rendering", () => {
    it("applies default variant, hover underline and md size", () => {
      render(<Hyperlink href="/docs">Docs</Hyperlink>);
      const link = screen.getByRole("link", { name: "Docs" });
      expect(link).toHaveClass("ds-hyperlink");
      expect(link).toHaveAttribute("data-variant", "default");
      expect(link).toHaveAttribute("data-underline", "hover");
      expect(link).toHaveAttribute("data-size", "md");
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
      expect(link).not.toHaveAttribute("style");
    });

    it("keeps the legacy href default of '#'", () => {
      render(<Hyperlink>Top</Hyperlink>);
      expect(screen.getByRole("link", { name: "Top" })).toHaveAttribute("href", "#");
    });

    it.each(["default", "subtle", "inline", "standalone"] as const)("reflects variant %s", (variant) => {
      render(<Hyperlink href="/x" variant={variant}>X</Hyperlink>);
      expect(screen.getByRole("link")).toHaveAttribute("data-variant", variant);
    });

    it("inline variant defaults to an always-on underline and inherits size", () => {
      render(<Hyperlink href="/x" variant="inline">X</Hyperlink>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("data-underline", "always");
      expect(link).not.toHaveAttribute("data-size");
    });

    it.each(["always", "hover", "none"] as const)("reflects underline %s", (underline) => {
      render(<Hyperlink href="/x" underline={underline}>X</Hyperlink>);
      expect(screen.getByRole("link")).toHaveAttribute("data-underline", underline);
    });

    it.each(["sm", "md", "lg"] as const)("reflects size %s", (size) => {
      render(<Hyperlink href="/x" size={size}>X</Hyperlink>);
      expect(screen.getByRole("link")).toHaveAttribute("data-size", size);
    });

    it("renders leading and trailing icons hidden from assistive tech", () => {
      render(
        <Hyperlink href="/x" leadingIcon={<svg data-testid="lead" />} trailingIcon={<svg data-testid="trail" />}>
          Next
        </Hyperlink>
      );
      expect(screen.getByTestId("lead").parentElement).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByTestId("trail").parentElement).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("link", { name: "Next" })).toBeInTheDocument();
    });

    it("forwards ref, className and native anchor attributes", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Hyperlink ref={ref} href="/x" className="extra" download="file.txt" hrefLang="en" data-testid="lnk">
          X
        </Hyperlink>
      );
      const link = screen.getByTestId("lnk");
      expect(ref.current).toBe(link);
      expect(link).toHaveClass("ds-hyperlink", "extra");
      expect(link).toHaveAttribute("download", "file.txt");
      expect(link).toHaveAttribute("hreflang", "en");
    });
  });

  // The visually hidden label starts with a space; browsers keep it ("Docs (opens in new tab)"),
  // jsdom's name computation trims it, hence the \s* in these name matchers.
  describe("external / new tab", () => {
    it("adds noopener noreferrer, the external icon and announces the new tab", () => {
      const { container } = render(
        <Hyperlink href="https://example.com" openInNewTab>
          Docs
        </Hyperlink>
      );
      const link = screen.getByRole("link", { name: /^Docs\s*\(opens in new tab\)$/ });
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("data-external");
      expect(container.querySelector(".ds-hyperlink__icon--external")).toHaveAttribute("aria-hidden", "true");
    });

    it("treats an explicit target=_blank like openInNewTab", () => {
      render(<Hyperlink href="https://example.com" target="_blank">Docs</Hyperlink>);
      const link = screen.getByRole("link", { name: /^Docs\s*\(opens in new tab\)$/ });
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("external without a new tab secures rel but does not announce a new tab", () => {
      render(<Hyperlink href="https://example.com" external rel="nofollow">Docs</Hyperlink>);
      const link = screen.getByRole("link", { name: "Docs" });
      expect(link).toHaveAttribute("rel", "nofollow noopener noreferrer");
      expect(link).not.toHaveAttribute("target");
    });

    it("allows opting out of the external icon while keeping rel secure on new tabs", () => {
      const { container } = render(
        <Hyperlink href="/report.pdf" openInNewTab external={false}>
          Report
        </Hyperlink>
      );
      expect(container.querySelector(".ds-hyperlink__icon--external")).toBeNull();
      expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("supports a localised new-tab label", () => {
      render(<Hyperlink href="https://example.com" openInNewTab newTabLabel="(nueva pestaña)">Docs</Hyperlink>);
      expect(screen.getByRole("link", { name: /^Docs\s*\(nueva pestaña\)$/ })).toBeInTheDocument();
    });
  });

  describe("security", () => {
    it.each(["javascript:alert(1)", "java\tscript:alert(1)", "data:text/html,<script>alert(1)</script>", "vbscript:x"])(
      "drops unsafe href %s",
      (href) => {
        const { container } = render(<Hyperlink href={href}>Bad</Hyperlink>);
        const anchor = container.querySelector("a");
        expect(anchor).not.toHaveAttribute("href");
      }
    );

    it.each(["https://x.dev", "/docs", "#top", "mailto:a@b.c", "tel:+100"])("keeps safe href %s", (href) => {
      render(<Hyperlink href={href}>Ok</Hyperlink>);
      expect(screen.getByRole("link")).toHaveAttribute("href", href);
    });
  });

  describe("disabled", () => {
    it("removes href, exposes aria-disabled, leaves the tab order and swallows clicks", async () => {
      const onClick = vi.fn();
      render(
        <>
          <Hyperlink href="/x" disabled onClick={onClick} openInNewTab>
            Disabled
          </Hyperlink>
          <button type="button">after</button>
        </>
      );
      const link = screen.getByRole("link", { name: "Disabled" });
      expect(link).not.toHaveAttribute("href");
      expect(link).not.toHaveAttribute("target");
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveAttribute("tabindex", "-1");
      fireEvent.click(link);
      expect(onClick).not.toHaveBeenCalled();
      await userEvent.tab();
      expect(screen.getByRole("button", { name: "after" })).toHaveFocus();
    });
  });

  describe("interaction", () => {
    it("fires onClick and is reachable with Tab", async () => {
      const onClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
      render(<Hyperlink href="/x" onClick={onClick}>Go</Hyperlink>);
      await userEvent.tab();
      const link = screen.getByRole("link", { name: "Go" });
      expect(link).toHaveFocus();
      await userEvent.click(link);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("asChild", () => {
    const RouterLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
      function RouterLink(props, ref) {
        return <a ref={ref} data-router="" {...props} />;
      }
    );

    it("renders the child element with merged classes, data attrs and ref", () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <Hyperlink asChild ref={ref} variant="subtle" className="outer" leadingIcon={<svg data-testid="ic" />}>
          <RouterLink href="/settings" className="inner">
            Settings
          </RouterLink>
        </Hyperlink>
      );
      const link = screen.getByRole("link", { name: "Settings" });
      expect(link).toHaveAttribute("data-router");
      expect(link).toHaveAttribute("href", "/settings");
      expect(link).toHaveClass("inner", "ds-hyperlink", "outer");
      expect(link).toHaveAttribute("data-variant", "subtle");
      expect(ref.current).toBe(link);
      expect(link).toContainElement(screen.getByTestId("ic"));
    });

    it("composes click handlers (child first)", () => {
      const calls: string[] = [];
      render(
        <Hyperlink asChild onClick={(e) => { e.preventDefault(); calls.push("outer"); }}>
          <RouterLink href="/x" onClick={() => calls.push("child")}>X</RouterLink>
        </Hyperlink>
      );
      fireEvent.click(screen.getByRole("link"));
      expect(calls).toEqual(["child", "outer"]);
    });

    type UrlObject = { pathname?: string; query?: Record<string, string>; protocol?: string; href?: string };
    const ObjectHrefLink = React.forwardRef<
      HTMLAnchorElement,
      Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href?: string | UrlObject }
    >(function ObjectHrefLink({ href, ...props }, ref) {
      // Mimics Next.js <Link>: serialises a URL object; records what it received.
      const resolved =
        href === undefined
          ? undefined
          : typeof href === "string"
            ? href
            : `${href.pathname ?? ""}${href.query ? `?${new URLSearchParams(href.query).toString()}` : ""}`;
      return <a ref={ref} data-received={href === undefined ? "none" : typeof href} href={resolved} {...props} />;
    });

    it("passes a router URL-object href through to the child unchanged", () => {
      const href = { pathname: "/reports", query: { year: "2026" } };
      render(
        <Hyperlink asChild>
          <ObjectHrefLink href={href}>Reports</ObjectHrefLink>
        </Hyperlink>
      );
      const link = screen.getByRole("link", { name: "Reports" });
      expect(link).toHaveAttribute("data-received", "object");
      expect(link).toHaveAttribute("href", "/reports?year=2026");
    });

    it.each([
      [{ pathname: "javascript:alert(1)" }],
      [{ href: "javascript:alert(1)" }],
      [{ protocol: "javascript", pathname: "/x" }],
      [{ protocol: "data:", pathname: "/x" }],
    ])("drops a URL-object href with an unsafe field %j", (href) => {
      render(
        <Hyperlink asChild>
          <ObjectHrefLink href={href}>X</ObjectHrefLink>
        </Hyperlink>
      );
      expect(screen.getByText("X").closest("a")).toHaveAttribute("data-received", "none");
    });

    it("still sanitises the child's href", () => {
      const { container } = render(
        <Hyperlink asChild>
          <RouterLink href="javascript:alert(1)">X</RouterLink>
        </Hyperlink>
      );
      expect(container.querySelector("a")).not.toHaveAttribute("href");
    });

    it("secures and announces a child that opens a new tab", () => {
      render(
        <Hyperlink asChild>
          <RouterLink href="https://example.com" target="_blank">Ext</RouterLink>
        </Hyperlink>
      );
      const link = screen.getByRole("link", { name: /^Ext\s*\(opens in new tab\)$/ });
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("blocks clicks and focus on a disabled child link", () => {
      const childClick = vi.fn();
      render(
        <Hyperlink asChild disabled>
          <RouterLink href="/x" onClick={childClick}>X</RouterLink>
        </Hyperlink>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveAttribute("tabindex", "-1");
      fireEvent.click(link);
      expect(childClick).not.toHaveBeenCalled();
    });
  });
});
