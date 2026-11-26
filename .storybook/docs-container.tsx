import React, { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { DocsContainer } from "@storybook/blocks";
import type { DocsContainerProps } from "@storybook/blocks";
import { create } from "@storybook/theming/create";

import { resolveManagerPalette } from "./manager-palettes";

/**
 * Docs container that follows the Theme toolbar.
 *
 * Storybook renders Docs/MDX chrome (wrapper, titles, ArgsTable, Source, the story frame toolbar)
 * with its own emotion theme, which is light unless told otherwise — that is what left white
 * islands around dark stories. The preview already sets `data-theme` on `<html>` for every page
 * type (see `preview.tsx`), so we observe that attribute and rebuild the emotion theme from the
 * same hex adapter the manager uses. `preview.css` then pins the main surfaces to CSS tokens.
 */
function currentToolbarTheme(): string {
  return document.documentElement.getAttribute("data-theme") ?? "light";
}

function buildDocsTheme(toolbarTheme: string) {
  const p = resolveManagerPalette(toolbarTheme);
  return create({
    base: p.sbBase,
    appBg: p.appBg,
    appContentBg: p.appContentBg,
    appPreviewBg: p.appContentBg,
    appBorderColor: p.appBorderColor,
    textColor: p.textColor,
    textMutedColor: p.textMutedColor,
    textInverseColor: p.textInverseColor,
    barBg: p.barBg,
    barTextColor: p.barTextColor,
    barHoverColor: p.barHoverColor,
    barSelectedColor: p.barSelectedColor,
    colorPrimary: p.colorPrimary,
    /** Docs use `secondary` for link text on the page — the bar accent meets 4.5:1 on barBg/content. */
    colorSecondary: p.barSelectedColor,
    inputBg: p.inputBg,
    inputBorder: p.inputBorder,
    inputTextColor: p.inputTextColor,
    buttonBg: p.buttonBg,
    buttonBorder: p.buttonBorder,
    booleanBg: p.booleanBg,
    booleanSelectedBg: p.booleanSelectedBg,
  });
}

export function ThemedDocsContainer(props: PropsWithChildren<DocsContainerProps>) {
  const [toolbarTheme, setToolbarTheme] = useState(currentToolbarTheme);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setToolbarTheme(currentToolbarTheme()));
    // Attribute-only, single node — cheap (no subtree scanning).
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    setToolbarTheme(currentToolbarTheme());
    return () => observer.disconnect();
  }, []);

  const theme = React.useMemo(() => buildDocsTheme(toolbarTheme), [toolbarTheme]);

  return <DocsContainer {...props} theme={theme} />;
}
