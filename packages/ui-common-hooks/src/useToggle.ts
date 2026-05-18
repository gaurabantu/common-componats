import { useCallback, useState } from "react";

export interface UseToggleResult {
  /** Current boolean value */
  value: boolean;
  /** Flip current value */
  toggle: () => void;
  /** Set to `true` */
  setTrue: () => void;
  /** Set to `false` */
  setFalse: () => void;
  /** Set to explicit value */
  set: (next: boolean) => void;
}

/**
 * Boolean state with stable toggle, setTrue, and setFalse helpers.
 * Useful for modals, dropdowns, accordions, and any show/hide state.
 *
 * @example
 * const { value: open, toggle, setFalse: close } = useToggle(false);
 * return <Modal open={open} onClose={close} />;
 */
export function useToggle(initialValue = false): UseToggleResult {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const set = useCallback((next: boolean) => setValue(next), []);

  return { value, toggle, setTrue, setFalse, set };
}
