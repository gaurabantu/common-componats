import type { HTMLAttributes, ReactNode } from "react";

/** `dark` — Noir panel (default; reads as "code" on any theme) · `light` — muted surface */
export type CodeBlockTone = "dark" | "light";

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title" | "onCopy"> {
  /** Source text. Rendered as text only (never parsed as HTML). */
  code: string;
  /** Language chip in the header, e.g. `"bash"`, `"tsx"`, `"css"`. */
  language?: string;
  /** Optional header title (file name, step name). */
  title?: ReactNode;
  tone?: CodeBlockTone;
  /** Copy-to-clipboard button. @default true */
  showCopy?: boolean;
  /** Accessible label for the copy button. @default "Copy code" */
  copyLabel?: string;
  /** Status announced after copying. @default "Copied" */
  copiedLabel?: string;
  /** Fired after a successful copy. */
  onCopy?: (code: string) => void;
  /** Number each line. @default false */
  showLineNumbers?: boolean;
  /** Soft-wrap long lines instead of scrolling horizontally. @default false */
  wrap?: boolean;
  /** Max height before vertical scroll, e.g. `320` or `"20rem"`. */
  maxHeight?: number | string;
}
