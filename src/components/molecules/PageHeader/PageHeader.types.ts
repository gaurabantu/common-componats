import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import type { IconSource } from "../../atoms/Icon";

/** Heading level for the title. `h1` by default — one per page. */
export type PageHeaderTitleAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/** A secondary page action — rendered as an outlined `Button`, or as a menu item when it overflows. */
export interface PageHeaderAction {
  /** Visible label (also the menu item text). */
  label: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Renders a link. Unsafe schemes (`javascript:`, `data:` …) are dropped. */
  href?: string;
  /** Leading icon (inline buttons and menu items). Decorative — the label is the accessible name. */
  icon?: IconSource;
  disabled?: boolean;
}

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Page title. */
  title: ReactNode;
  /** @default "h1" */
  titleAs?: PageHeaderTitleAs;
  /** One-line summary under the title. */
  description?: ReactNode;
  /** Usually `<Breadcrumb>` — rendered above the title. */
  breadcrumb?: ReactNode;
  /** Inline status next to the title — usually a `<Badge>`. */
  status?: ReactNode;
  /** Muted metadata row under the description (owner, updated at, ids). */
  meta?: ReactNode;
  /** The single primary CTA — usually `<Button variant="primary" size="md">`. Exactly one per page header. */
  primaryAction?: ReactNode;
  /** Secondary actions. The first `maxVisibleActions` render as outlined buttons; the rest go into a "More actions" menu. At ≤ 640px all of them move into the menu. */
  secondaryActions?: PageHeaderAction[];
  /** How many secondary actions stay inline on wider screens. @default 2 */
  maxVisibleActions?: number;
  /** Accessible label + text of the overflow trigger. @default "More actions" */
  moreActionsLabel?: string;
  /** Rendered under the header — usually `<Tabs>` / `<TabsList>`. */
  tabs?: ReactNode;
}
