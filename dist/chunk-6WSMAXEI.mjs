/* ucs:component-css */
import "./styles/components/molecules/CodeBlock/CodeBlock.css";
// src/components/molecules/CodeBlock/index.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// src/components/molecules/CodeBlock/CodeBlock.config.ts
var CODE_BLOCK_DEFAULTS = {
  tone: "dark",
  showCopy: true,
  copyLabel: "Copy code",
  copiedLabel: "Copied",
  /** How long the "Copied" state stays visible (ms). */
  copiedResetMs: 2e3
};

// src/components/molecules/CodeBlock/CodeBlock.utils.ts
async function copyText(text) {
  var _a;
  try {
    if (typeof navigator !== "undefined" && ((_a = navigator.clipboard) == null ? void 0 : _a.writeText)) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
  }
  if (typeof document === "undefined")
    return false;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}
function normalizeCode(code) {
  return code.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
}

// src/components/molecules/CodeBlock/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function CopyIcon({ copied }) {
  return copied ? /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "m3.5 8.5 3 3 6-7", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, focusable: "false", children: [
    /* @__PURE__ */ jsx("rect", { x: "5.5", y: "5.5", width: "8", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ jsx("path", { d: "M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5", stroke: "currentColor", strokeWidth: "1.4" })
  ] });
}
var CodeBlock = React.forwardRef(function CodeBlock2({
  code,
  language,
  title,
  tone = CODE_BLOCK_DEFAULTS.tone,
  showCopy = CODE_BLOCK_DEFAULTS.showCopy,
  copyLabel = CODE_BLOCK_DEFAULTS.copyLabel,
  copiedLabel = CODE_BLOCK_DEFAULTS.copiedLabel,
  onCopy,
  showLineNumbers = false,
  wrap = false,
  maxHeight,
  className,
  ...rest
}, ref) {
  const text = useMemo(() => normalizeCode(code), [code]);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(
    () => () => {
      if (timer.current)
        clearTimeout(timer.current);
    },
    []
  );
  const handleCopy = useCallback(async () => {
    const ok = await copyText(text);
    if (!ok)
      return;
    setCopied(true);
    onCopy == null ? void 0 : onCopy(text);
    if (timer.current)
      clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), CODE_BLOCK_DEFAULTS.copiedResetMs);
  }, [text, onCopy]);
  const hasHeader = Boolean(title || language);
  const copyButton = showCopy ? /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: ["ds-code__copy", hasHeader ? "" : "ds-code__floating-copy"].filter(Boolean).join(" "),
      "aria-label": copied ? copiedLabel : copyLabel,
      "data-copied": copied ? "true" : void 0,
      onClick: handleCopy,
      children: [
        /* @__PURE__ */ jsx(CopyIcon, { copied }),
        hasHeader ? /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: copied ? copiedLabel : "Copy" }) : null
      ]
    }
  ) : null;
  const lines = showLineNumbers ? text.split("\n") : null;
  const resolvedMaxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: ["ds-code", className].filter(Boolean).join(" "),
      "data-tone": tone,
      "data-wrap": wrap ? "true" : void 0,
      "data-floating-copy": !hasHeader && showCopy ? "true" : void 0,
      ...rest,
      children: [
        hasHeader ? /* @__PURE__ */ jsxs("div", { className: "ds-code__header", children: [
          /* @__PURE__ */ jsx("span", { className: "ds-code__title", children: title }),
          language ? /* @__PURE__ */ jsx("span", { className: "ds-code__lang", children: language }) : null,
          copyButton
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "ds-code__body", children: [
          /* @__PURE__ */ jsx(
            "pre",
            {
              className: "ds-code__pre",
              tabIndex: 0,
              style: resolvedMaxHeight ? { maxHeight: resolvedMaxHeight } : void 0,
              "aria-label": typeof title === "string" ? title : language ? `${language} code` : "Code",
              children: /* @__PURE__ */ jsx("code", { children: lines ? lines.map((line, i) => /* @__PURE__ */ jsxs("span", { className: "ds-code__line", children: [
                /* @__PURE__ */ jsx("span", { className: "ds-code__ln", "aria-hidden": true, children: i + 1 }),
                line || " "
              ] }, i)) : text })
            }
          ),
          !hasHeader ? copyButton : null
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ds-code__status", role: "status", "aria-live": "polite", children: copied ? copiedLabel : "" })
      ]
    }
  );
});
CodeBlock.displayName = "CodeBlock";
var CodeBlock_default = CodeBlock;

export {
  CodeBlock_default
};
//# sourceMappingURL=chunk-6WSMAXEI.mjs.map