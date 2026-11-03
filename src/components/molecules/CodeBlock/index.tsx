"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CODE_BLOCK_DEFAULTS } from "./CodeBlock.config";
import { copyText, normalizeCode } from "./CodeBlock.utils";
import type { CodeBlockProps } from "./CodeBlock.types";
import "./CodeBlock.css";

function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * CodeBlock — read-only source panel with copy-to-clipboard. Content is rendered as text
 * (no syntax-highlighting HTML), so it is safe for user-provided snippets.
 */
const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  {
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
  },
  ref,
) {
  const text = useMemo(() => normalizeCode(code), [code]);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = useCallback(async () => {
    const ok = await copyText(text);
    if (!ok) return;
    setCopied(true);
    onCopy?.(text);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), CODE_BLOCK_DEFAULTS.copiedResetMs);
  }, [text, onCopy]);

  const hasHeader = Boolean(title || language);

  const copyButton = showCopy ? (
    <button
      type="button"
      className={["ds-code__copy", hasHeader ? "" : "ds-code__floating-copy"].filter(Boolean).join(" ")}
      aria-label={copied ? copiedLabel : copyLabel}
      data-copied={copied ? "true" : undefined}
      onClick={handleCopy}
    >
      <CopyIcon copied={copied} />
      {hasHeader ? <span aria-hidden>{copied ? copiedLabel : "Copy"}</span> : null}
    </button>
  ) : null;

  const lines = showLineNumbers ? text.split("\n") : null;
  const resolvedMaxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  return (
    <div
      ref={ref}
      className={["ds-code", className].filter(Boolean).join(" ")}
      data-tone={tone}
      data-wrap={wrap ? "true" : undefined}
      data-floating-copy={!hasHeader && showCopy ? "true" : undefined}
      {...rest}
    >
      {hasHeader ? (
        <div className="ds-code__header">
          <span className="ds-code__title">{title}</span>
          {language ? <span className="ds-code__lang">{language}</span> : null}
          {copyButton}
        </div>
      ) : null}
      <div className="ds-code__body">
        {/* tabIndex lets keyboard users scroll overflowing code (WCAG 2.1.1). */}
        <pre
          className="ds-code__pre"
          tabIndex={0}
          style={resolvedMaxHeight ? { maxHeight: resolvedMaxHeight } : undefined}
          aria-label={typeof title === "string" ? title : language ? `${language} code` : "Code"}
        >
          <code>
            {lines
              ? lines.map((line, i) => (
                  <span className="ds-code__line" key={i}>
                    <span className="ds-code__ln" aria-hidden>
                      {i + 1}
                    </span>
                    {line || " "}
                  </span>
                ))
              : text}
          </code>
        </pre>
        {!hasHeader ? copyButton : null}
      </div>
      <span className="ds-code__status" role="status" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";

export default CodeBlock;
export type { CodeBlockProps, CodeBlockTone } from "./CodeBlock.types";
