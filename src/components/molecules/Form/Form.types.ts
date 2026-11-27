import type React from "react";

/** `stacked` = one field per row; `grid` = responsive columns (see `columns`). */
export type FormLayout = "stacked" | "grid";

/** Column breakpoints: `base` < 641px ≤ `sm` < 768px ≤ `md` < 1024px ≤ `lg`. */
export type FormColumnBreakpoint = "base" | "sm" | "md" | "lg";

/** Per-breakpoint column counts (mobile-first; an omitted breakpoint inherits the previous one). */
export type FormResponsiveColumns = Partial<Record<FormColumnBreakpoint, number>>;

/**
 * Grid column count. A number keeps the legacy behaviour: 1 column below 641px, `n` columns above.
 * An object sets each breakpoint, e.g. `{ base: 1, md: 2, lg: 3 }`.
 */
export type FormColumns = number | FormResponsiveColumns;

/** Title heading level. */
export type FormTitleElement = "h1" | "h2" | "h3";

/** One entry of the error summary — `fieldId` must be the `id` of the focusable control. */
export interface FormErrorSummaryItem {
  fieldId: string;
  message: React.ReactNode;
}

/** Styling slots. */
export type FormSlot = "shell" | "card" | "content" | "fields";
export type FormClassNames = Partial<Record<FormSlot, string>>;
export type FormStyles = Partial<Record<FormSlot, React.CSSProperties>>;

/** Values collected from the native form (`FormData`); repeated names become arrays. */
export type FormSubmitValues = Record<string, FormDataEntryValue | FormDataEntryValue[]>;

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "title"> {
  badge?: string;
  title?: string;
  /** Heading level for `title`. Default `"h1"` (form is the page); use `"h2"` inside a page. */
  titleAs?: FormTitleElement;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  layout?: FormLayout;
  /** Grid columns when `layout="grid"`. Default `2`. */
  columns?: FormColumns;
  /** Gap between fields — number (px) or any CSS length / token (e.g. `"var(--space-3)"`). Default `var(--space-2)`. */
  gap?: number | string;
  maxWidth?: number | string;
  /**
   * Native submit handler (the component always renders a real `<form>`). Not called while
   * `loading` or `disabled`. Use the native `noValidate` attribute to opt out of browser validation.
   */
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  /**
   * Convenience: receives the collected `FormData` values. When set, the native submit is
   * prevented (no page navigation). Called after `onSubmit`.
   */
  onSubmitValues?: (values: FormSubmitValues, event: React.FormEvent<HTMLFormElement>) => void;
  /**
   * Submitting: fields are disabled (`<fieldset disabled>`), the form gets `aria-busy`, submit is blocked,
   * and the actions group gets `aria-disabled` (still focusable — pass `loading` to your submit `Button` too).
   */
  loading?: boolean;
  /** Screen-reader announcement while `loading`. Default "Submitting…". */
  loadingLabel?: string;
  /** Disable every field and every action (`<fieldset disabled>`) and block submit. */
  disabled?: boolean;
  /**
   * Error summary (WCAG 3.3.1): rendered as a `role="alert"` list of in-page links above the fields;
   * activating a link focuses the field with that `id`.
   */
  errorSummary?: FormErrorSummaryItem[];
  /** Heading of the error summary. Default "There is a problem". */
  errorSummaryTitle?: React.ReactNode;
  /** Move focus to the summary when its entries change after mount. Default `true`. */
  autoFocusErrorSummary?: boolean;
  /** Slot class names — merged after the deprecated `*ClassName` props. */
  classNames?: FormClassNames;
  /** Slot inline styles — merged after the deprecated `*Style` props. */
  styles?: FormStyles;
  /** @deprecated Use `classNames.shell`. */
  shellClassName?: string;
  /** @deprecated Use `classNames.card`. */
  cardClassName?: string;
  /** @deprecated Use `classNames.content`. */
  contentClassName?: string;
  /** @deprecated Use `classNames.fields`. */
  fieldsClassName?: string;
  /** @deprecated Use `styles.shell`. */
  shellStyle?: React.CSSProperties;
  /** @deprecated Use `styles.card`. */
  cardStyle?: React.CSSProperties;
  /** @deprecated Use `styles.content`. */
  contentStyle?: React.CSSProperties;
  /** @deprecated Use `styles.fields`. */
  fieldsStyle?: React.CSSProperties;
}
