import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type AccordionType = "single" | "multiple";

/** Visual density / chrome */
export type AccordionVariant = "default" | "bordered" | "flush";

/**
 * Panel open/close behavior.
 * - `default` — height + fade transitions; closed panels stay mounted for smooth collapse (better for typical FAQ-sized lists).
 * - `none` — instant toggle; closed panels unmount (lighter DOM when many items).
 */
export type AccordionMotion = "default" | "none";

export interface AccordionContextValue {
  type: AccordionType;
  collapsible: boolean;
  isOpen: (itemValue: string) => boolean;
  toggle: (itemValue: string) => void;
  baseId: string;
  variant: AccordionVariant;
  motion: AccordionMotion;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  children: ReactNode;
  type?: AccordionType;
  /**
   * When `type="single"`, allow closing the open item so nothing is expanded.
   * @default true
   */
  collapsible?: boolean;
  /** Controlled: selected item (`single`) or items (`multiple`). */
  value?: string | string[];
  /** Uncontrolled initial value. */
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  variant?: AccordionVariant;
  /**
   * Animated expand/collapse vs instant unmount when closed.
   * @default "default"
   */
  motion?: AccordionMotion;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

export interface AccordionTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children: ReactNode;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Keep inactive content mounted (hidden) for stateful panels */
  forceMount?: boolean;
}
