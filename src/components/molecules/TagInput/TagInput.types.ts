import type { HTMLAttributes, ReactNode } from "react";

/** Control height — matches `Input` / `Select` / `NumberInput` (sm / md / lg). */
export type TagInputSize = "sm" | "md" | "lg";

/** Result of `validate`: `true` accepts the tag, a string rejects it and is shown as the error message. */
export type TagInputValidateResult = string | true;

/** Overridable copy (i18n). Functions receive the tag text (or the limit). */
export interface TagInputLabels {
  /** Accessible name of a chip's remove button. @default (tag) => `Remove ${tag}` */
  remove: (tag: string) => string;
  /** Polite announcement after a tag is added. @default (tag) => `Added ${tag}` */
  added: (tag: string) => string;
  /** Polite announcement after a tag is removed. @default (tag) => `Removed ${tag}` */
  removed: (tag: string) => string;
  /** Error when a duplicate is rejected. @default (tag) => `"${tag}" is already added` */
  duplicate: (tag: string) => string;
  /** Error when `maxTags` is reached. @default (max) => `You can add up to ${max} tags` */
  maxReached: (max: number) => string;
  /** Accessible name of the chip list. @default "Selected tags" */
  list: string;
  /** Accessible name of the suggestions listbox. @default "Suggestions" */
  suggestions: string;
}

export interface TagInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "children"> {
  /** Controlled tags. `undefined` makes the component uncontrolled. */
  value?: string[];
  /** Initial tags when uncontrolled. */
  defaultValue?: string[];
  /** Fires with the full next tag array after an add or remove. */
  onChange?: (tags: string[]) => void;
  /** Fires as the user types in the text box (e.g. to fetch async `suggestions`). */
  onInputChange?: (text: string) => void;
  /** Maximum number of tags. Further adds are rejected with the `maxReached` message. */
  maxTags?: number;
  /** Allow the same tag twice (exact, case-sensitive match after trimming). @default false */
  allowDuplicates?: boolean;
  /**
   * Client-side check run before a tag is added. Return `true` to accept or an error string to reject
   * (the text stays in the box and the message is announced). UX only — validate on the server too.
   */
  validate?: (tag: string, tags: string[]) => TagInputValidateResult;
  /**
   * Suggestions shown in a combobox listbox as the user types (case-insensitive "contains" match;
   * already-added tags are hidden unless `allowDuplicates`). Arrow keys move, Enter picks.
   */
  suggestions?: string[];
  /**
   * Characters that commit the current text as a tag when typed or found in pasted text
   * (Enter always commits; pasted newlines / tabs always split). @default [","]
   */
  delimiters?: string[];
  /** Also commit the pending text when the box loses focus. @default false */
  addOnBlur?: boolean;
  /** Placeholder for the text box (hidden once `maxTags` is reached). */
  placeholder?: string;
  disabled?: boolean;
  /** Tags are shown and focusable but cannot be added or removed. */
  readOnly?: boolean;
  /** @default "md" */
  size?: TagInputSize;
  /** Visible label (outside a `FormField`; inside one, the field label is used). */
  label?: ReactNode;
  /**
   * Error state. A string / node is rendered under the field (outside a `FormField`) and linked via
   * `aria-describedby`; `true` only sets `aria-invalid`. Inside a `FormField`, use the field's `error`.
   */
  error?: ReactNode;
  /** Sets `aria-required` on the text box (inside a `FormField`, the field's `required` is used). */
  required?: boolean;
  /** Form field name: renders a hidden input whose value is the tags joined with `,`. */
  name?: string;
  /** Id of the text box (the element a `<label for>` points at). Inside a `FormField`, the field id is used. */
  id?: string;
  /** Copy overrides (i18n). */
  labels?: Partial<TagInputLabels>;
  /** Extra class on the root (consumer escape hatch). */
  className?: string;
}
