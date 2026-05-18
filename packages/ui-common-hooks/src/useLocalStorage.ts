import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export interface UseLocalStorageOptions<T> {
  /** Custom serializer. Default: `JSON.stringify` */
  serialize?: (value: T) => string;
  /** Custom deserializer. Default: `JSON.parse` */
  deserialize?: (raw: string) => unknown;
}

function defaultSerialize<T>(value: T): string {
  return JSON.stringify(value);
}

function defaultDeserialize(raw: string): unknown {
  return JSON.parse(raw);
}

/**
 * `useState` backed by `localStorage` with JSON serialization.  Syncs across
 * tabs via the `"storage"` event.  SSR-safe: uses `initialValue` on the server.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("theme", "light");
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const { serialize = defaultSerialize, deserialize = defaultDeserialize } = options;

  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (deserialize(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue, deserialize]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (valueOrUpdater) => {
      setStoredValue((prev) => {
        const next =
          typeof valueOrUpdater === "function"
            ? (valueOrUpdater as (prev: T) => T)(prev)
            : valueOrUpdater;
        try {
          window.localStorage.setItem(key, serialize(next));
          window.dispatchEvent(new StorageEvent("storage", { key, newValue: serialize(next) }));
        } catch {
          // localStorage unavailable (private browsing, quota exceeded)
        }
        return next;
      });
    },
    [key, serialize]
  );

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  // Sync across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== key) return;
      setStoredValue(e.newValue !== null ? (deserialize(e.newValue) as T) : initialValue);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initialValue, deserialize]);

  return [storedValue, setValue, remove];
}
