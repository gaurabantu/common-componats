import { addons } from "@storybook/preview-api";
import { SELECT_STORY } from "@storybook/core/core-events";

/** Docs id for an MDX page / autodocs entry: "Overview/Getting Started" → "overview-getting-started--docs". */
export function docsId(title: string): string {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}--docs`;
}

/** Shareable manager URL (works on GitHub Pages sub-paths — relative to the iframe). */
export function managerHref(title: string): string {
  return `./?path=/docs/${docsId(title)}`;
}

/**
 * Navigate the Storybook manager without a full reload.
 * - `kind: "page"` → an MDX docs page (exact docs id)
 * - `kind: "component"` → first entry of a component (autodocs or first story)
 */
export function navigateTo(title: string, kind: "page" | "component" = "page"): void {
  const channel = addons.getChannel();
  if (kind === "page") channel.emit(SELECT_STORY, { storyId: docsId(title) });
  else channel.emit(SELECT_STORY, { title });
}

/** Props for an anchor that navigates in-app but still supports open-in-new-tab. */
export function portalLinkProps(title: string, kind: "page" | "component" = "page") {
  return {
    href: managerHref(title),
    target: "_top" as const,
    onClick: (event: { preventDefault: () => void; metaKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean }) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      navigateTo(title, kind);
    },
  };
}
