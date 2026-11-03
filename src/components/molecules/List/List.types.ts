import type { HTMLAttributes, ReactNode } from "react";

/** Row density — `sm` 8px · `md` 16px (default) · `lg` 24px vertical rhythm */
export type ListSize = "sm" | "md" | "lg";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
  /** Hairline (`--color-border-subtle`) between rows. @default true */
  divided?: boolean;
  /** Outer structural border + radius (stand-alone list). @default false */
  bordered?: boolean;
  /** Row density. @default "md" */
  size?: ListSize;
  /** Ordered list semantics (`<ol>`) for sequential steps. @default false */
  ordered?: boolean;
}

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  /** Leading visual — usually `<IconBox>`, `<Avtar>`, or a step number. */
  leading?: ReactNode;
  /** Primary label. */
  title: ReactNode;
  /** When set, the title renders as a link (`<a href>`). Unsafe schemes (`javascript:`, `data:`) render plain text. */
  href?: string;
  /** Anchor target for `href` — `_blank` automatically adds `rel="noopener noreferrer"`. */
  target?: string;
  /** Inline element(s) after the title — status `<Badge>`, version, tag. */
  badge?: ReactNode;
  /** Secondary line under the title. */
  description?: ReactNode;
  /** Muted right-side metadata shown before `action` (size, date, owner). */
  meta?: ReactNode;
  /** Trailing control(s) — usually an outlined `<Button size="sm">`. */
  action?: ReactNode;
  /** Highlight as the current item (`aria-current="true"`). */
  selected?: boolean;
  /** Dim the row; links lose their href. */
  disabled?: boolean;
}
