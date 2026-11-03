import { readFileSync } from "node:fs";
import path from "node:path";
import {
  aliasOf,
  baseTokens,
  categorize,
  colorGroup,
  parseTokenBlocks,
  themeNames,
  themeOverrides,
} from "./parseTokens";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter');
:root {
  /* SPACING */
  --space-1: 8px;
  --space-2: 16px;
  /* RADII */
  --radius-md: 6px;
}
:root,
[data-theme="blue"] {
  --color-text-primary: #0d0d0d;
  --color-bg-surface: #ffffff;
  --color-theme-primary: #0d0d0d;
}
[data-theme="dark"] {
  --color-text-primary: #f3f4f6;
}
.btn { color: red; }
@media (prefers-reduced-motion: reduce) {
  :root { --duration-fast: 0ms; }
}
`;

describe("parseTokens", () => {
  it("parses only :root / data-theme blocks", () => {
    const blocks = parseTokenBlocks(CSS);
    expect(blocks.map((b) => b.themes)).toEqual([[], ["blue"], ["dark"], []]);
  });

  it("records the section comment on each declaration", () => {
    const [first] = parseTokenBlocks(CSS);
    expect(first.tokens[0]).toMatchObject({ name: "--space-1", value: "8px", section: "SPACING" });
    expect(first.tokens[2]).toMatchObject({ name: "--radius-md", section: "RADII" });
  });

  it("merges base tokens and excludes named themes", () => {
    const names = baseTokens(CSS).map((t) => t.name);
    expect(names).toContain("--color-text-primary");
    expect(baseTokens(CSS).find((t) => t.name === "--color-text-primary")?.value).toBe("#0d0d0d");
  });

  it("lists theme names and overrides", () => {
    expect(themeNames(CSS)).toEqual(["blue", "dark"]);
    expect(themeOverrides(CSS).get("--color-text-primary")).toEqual(["dark"]);
  });

  it("categorizes tokens", () => {
    expect(categorize("--space-2")).toBe("spacing");
    expect(categorize("--text-h1-size")).toBe("typography");
    expect(categorize("--button-primary-default-bg")).toBe("component");
    expect(colorGroup("--color-theme-primary")).toBe("theme");
    expect(colorGroup("--color-mist-60")).toBe("palette");
    expect(colorGroup("--color-danger-fill")).toBe("state");
  });

  it("detects aliases", () => {
    expect(aliasOf("var(--color-mist-60)")).toBe("--color-mist-60");
    expect(aliasOf("#fff")).toBeNull();
  });

  it("ignores braces inside comments", () => {
    const css = `:root {\n  /* Host app: \`:root { --font-family: x }\` */\n  --font-family: Inter;\n  --text-h1-size: 1.5rem;\n}`;
    expect(baseTokens(css).map((t) => t.name)).toEqual(["--font-family", "--text-h1-size"]);
  });

  it("parses the shipped tokens.css completely", () => {
    const css = readFileSync(path.resolve(__dirname, "../../design-system/tokens.css"), "utf8");
    const names = baseTokens(css).map((t) => t.name);
    expect(names.filter((n) => categorize(n) === "typography").length).toBeGreaterThan(10);
    expect(names).toEqual(expect.arrayContaining(["--space-0", "--radius-lg", "--text-h1-size", "--color-text-primary", "--z-modal"]));
    expect(themeNames(css)).toEqual(expect.arrayContaining(["dark", "green", "mist", "custom", "blue-mist", "green-mist"]));
  });
});
