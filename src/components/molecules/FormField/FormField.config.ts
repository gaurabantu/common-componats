import type { FormFieldLayout } from "./FormField.types";

export const FORM_FIELD_DEFAULTS: { layout: FormFieldLayout; optionalLabel: string } = {
  layout: "vertical",
  optionalLabel: "(optional)",
};

export const FORM_FIELD_LAYOUTS: readonly FormFieldLayout[] = ["vertical", "horizontal"] as const;

/** Screen-reader text appended to the label when `required`. */
export const FORM_FIELD_REQUIRED_SR_TEXT = "required";

/**
 * Static flag a library control sets on its component type (`Comp[FORM_FIELD_CONSUMER_KEY] = true`)
 * when it wires itself from `useFormField()`. FormField then skips `cloneElement` injection for that
 * child, so the control's own explicit `id` / `aria-*` props stay explicit and still win.
 */
export const FORM_FIELD_CONSUMER_KEY = "__dsFormFieldConsumer";

/** Elements a `<label for>` can point at (HTML "labelable elements"). */
export const FORM_FIELD_LABELABLE_SELECTOR =
  'input:not([type="hidden"]), select, textarea, button, meter, output, progress';
