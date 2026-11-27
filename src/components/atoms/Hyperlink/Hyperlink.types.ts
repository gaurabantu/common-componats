import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Visual role of the link.
 * - `default` — brand link colour; underline on hover (standalone links in UI chrome)
 * - `subtle` — secondary text colour, turns brand on hover (footers, meta rows)
 * - `inline` — inside running text: inherits font size, always underlined (WCAG 1.4.1)
 * - `standalone` — emphasised call-to-action link ("View all"), semibold, ≥ 24px target
 */
export type HyperlinkVariant = "default" | "subtle" | "inline" | "standalone";

/** Underline behaviour. Default depends on variant: `inline` → `always`, others → `hover`. */
export type HyperlinkUnderline = "always" | "hover" | "none";

/** Font size step. Ignored by `variant="inline"` (inherits the surrounding text) unless set explicitly. */
export type HyperlinkSize = "sm" | "md" | "lg";

export interface HyperlinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  /** Link text, or — with `asChild` — the single element to render (e.g. Next.js `<Link>`). */
  children: ReactNode;
  /**
   * Destination. Sanitised with `isSafeHref` — `javascript:`, `data:`, `vbscript:` … are dropped
   * (the anchor renders without `href`). Allowed: http(s), mailto, tel, relative and hash links.
   * @default "#"
   */
  href?: string;
  /** @default "default" */
  variant?: HyperlinkVariant;
  /** @default variant-dependent (`inline` → `"always"`, otherwise `"hover"`) */
  underline?: HyperlinkUnderline;
  /** @default "md" (inline variant inherits when omitted) */
  size?: HyperlinkSize;
  /** Decorative icon before the text (rendered `aria-hidden`). */
  leadingIcon?: ReactNode;
  /** Decorative icon after the text (rendered `aria-hidden`). */
  trailingIcon?: ReactNode;
  /**
   * Opens in a new tab (`target="_blank"`) and announces "(opens in new tab)" to screen readers.
   * @default false
   */
  openInNewTab?: boolean;
  /**
   * Marks an off-site link: forces `rel="noopener noreferrer"` and shows the external-link icon.
   * Defaults to `true` whenever the link opens in a new tab.
   */
  external?: boolean;
  /**
   * Disabled link: no `href`, `aria-disabled="true"`, removed from the tab order and clicks are
   * swallowed (your `onClick` is not called).
   * @default false
   */
  disabled?: boolean;
  /**
   * Render the single child element instead of an `<a>`, merging props, className, handlers and
   * ref onto it (Radix-style Slot). Use for router links: `<Hyperlink asChild><Link href="/x">X</Link></Hyperlink>`.
   * @default false
   */
  asChild?: boolean;
  /** Screen-reader text appended for new-tab links. @default "(opens in new tab)" */
  newTabLabel?: string;
  className?: string;
}
