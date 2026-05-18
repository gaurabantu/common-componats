import { useEffect, useState } from "react";
import { useLatest } from "./useLatest";

export interface UseAsyncDataResult<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
}

function isAbortError(err: unknown): boolean {
  if (err instanceof DOMException && err.name === "AbortError") return true;
  if (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    (err as { name?: string }).name === "AbortError"
  )
    return true;
  return false;
}

export interface UseAsyncDataOptions {
  /** When false, skips fetching while keeping existing `data` if any. Default true */
  enabled?: boolean;
}

/**
 * Fetches keyed async data with `AbortController`: changing `key` aborts stale requests before applying results
 * (`React.useEffect` stale-response guard pattern; similar spirit to TanStack Query / SWR keyed requests).
 *
 * Pass stable key material (serialized query params); keep `fetcher` inline — it is referenced via ref.
 *
 * Abort errors are swallowed and do not set `error`.
 */
export function useAsyncData<T>(
  key: string | number | bigint | boolean | null | undefined,
  fetcher: (signal: AbortSignal) => Promise<T>,
  options?: UseAsyncDataOptions
): UseAsyncDataResult<T> {
  const enabled = options?.enabled ?? true;
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const fetcherRef = useLatest(fetcher);

  useEffect(() => {
    if (!enabled || key === null || key === undefined) {
      setLoading(false);
      return;
    }

    const abort = new AbortController();
    setLoading(true);
    setError(undefined);

    fetcherRef
      .current(abort.signal)
      .then((result) => {
        if (abort.signal.aborted) return;
        setData(result);
        setError(undefined);
      })
      .catch((err: unknown) => {
        if (abort.signal.aborted) return;
        if (isAbortError(err)) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!abort.signal.aborted) setLoading(false);
      });

    return () => abort.abort();
  }, [key, enabled, fetcherRef]);

  return { data, loading, error };
}
