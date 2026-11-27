import type { HyperlinkSize, HyperlinkUnderline, HyperlinkVariant } from "./Hyperlink.types";

export const HYPERLINK_DEFAULTS: {
  href: string;
  variant: HyperlinkVariant;
  size: HyperlinkSize;
  newTabLabel: string;
} = {
  href: "#",
  variant: "default",
  size: "md",
  newTabLabel: "(opens in new tab)",
};

/** Underline used when the `underline` prop is omitted. */
export const HYPERLINK_DEFAULT_UNDERLINE: Record<HyperlinkVariant, HyperlinkUnderline> = {
  default: "hover",
  subtle: "hover",
  inline: "always",
  standalone: "hover",
};

export const HYPERLINK_VARIANTS: readonly HyperlinkVariant[] = ["default", "subtle", "inline", "standalone"] as const;
export const HYPERLINK_UNDERLINES: readonly HyperlinkUnderline[] = ["always", "hover", "none"] as const;
export const HYPERLINK_SIZES: readonly HyperlinkSize[] = ["sm", "md", "lg"] as const;

/**
 * @deprecated Styling now lives in `Hyperlink.css` (`--color-brand-link`). Kept for import compatibility.
 */
export const defaultLinkColor = "var(--color-brand-link)";

/**
 * @deprecated Styling now lives in `Hyperlink.css` (`.ds-hyperlink`). Kept for import compatibility.
 */
export const hyperlinkBaseClass = "ds-hyperlink";
