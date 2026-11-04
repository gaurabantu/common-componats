import type { HTMLAttributes, ReactElement, ReactNode } from "react";

/** Label placement — `vertical` stacks label over control; `horizontal` puts the label in a column (collapses to vertical at ≤ 640px). */
export type FormFieldLayout = "vertical" | "horizontal";

/** Character / item counter shown under the control (`value / max`). Over the limit it switches to the danger tone. */
export interface FormFieldCounter {
  value: number;
  max: number;
}

export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Visible label text (rendered in a `<label>`). Required — every control needs an accessible name. */
  label: ReactNode;
  /**
   * Id of the control the label points at. When omitted, the child's own `id` is used,
   * otherwise an id is generated with `useId` and injected into the child.
   *
   * Composite children: when the child is a non-labelable wrapper element (e.g. a `<div>` row with
   * an input + button), `htmlFor` is NOT injected into the wrapper — put that id on the inner
   * control yourself (`<Input id="app-file" />`). Read hint/error ids via `useFormField()` if the
   * inner control should also get `aria-describedby`.
   */
  htmlFor?: string;
  /**
   * Group mode for multi-control fields (Min–Max pairs, chip / toggle groups, radio-like sets):
   * the root gets `role="group"` + `aria-labelledby` (the label) + `aria-describedby` (hint/error/counter),
   * the label renders as a `<span>` (not `<label for>`), nothing is injected into the children and the
   * dev "no labelable element" warning is skipped. Give each inner control its own accessible name.
   * @default false
   */
  group?: boolean;
  /** Keep the label for assistive tech (still names the control / group) but hide it visually. @default false */
  hideLabel?: boolean;
  /** Helper text under the control; linked via `aria-describedby`. */
  hint?: ReactNode;
  /** Error message. Sets `aria-invalid` on the child and is linked via `aria-describedby`. Announced (`role="alert"`) only when it changes after mount. */
  error?: ReactNode;
  /** Shows a visible `*` + screen-reader "required" and sets `aria-required` on the child. */
  required?: boolean;
  /** Shows a muted "(optional)" marker next to the label. Pass a string to change the wording. Ignored when `required`. */
  optional?: boolean | string;
  /** `{ value, max }` counter under the control. */
  counter?: FormFieldCounter;
  /** @default "vertical" */
  layout?: FormFieldLayout;
  /** Exactly one form control. It receives `id`, `aria-describedby`, `aria-invalid`, `aria-required` unless it already sets them. */
  children: ReactElement | ReactNode;
}

/** Value exposed by `useFormField()` so custom controls can wire themselves up. */
export interface FormFieldContextValue {
  /** Id the `<label htmlFor>` points at — put it on your focusable element. */
  id: string;
  /** Id of the `<label>` element — use with `aria-labelledby` for non-labelable widgets. */
  labelId: string;
  hintId?: string;
  errorId?: string;
  counterId?: string;
  /** Space-separated ids for `aria-describedby` (hint, error, counter — whichever are rendered), or `undefined`. */
  describedBy?: string;
  invalid: boolean;
  required: boolean;
  /** `true` when the field is in `group` mode (label is a `<span>` referenced by the group's `aria-labelledby`). */
  group?: boolean;
}
