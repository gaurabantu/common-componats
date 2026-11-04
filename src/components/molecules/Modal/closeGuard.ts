/**
 * Shared "guarded close" helper for Modal and Drawer (`onBeforeClose`).
 *
 * The guard runs before any user-initiated close (Escape, backdrop click, close button, Cancel).
 * Returning `false` (or a promise resolving to `false`, or a rejected promise) aborts the close.
 * With no guard — or a synchronous non-false result — `proceed` runs synchronously, so existing
 * close timing is unchanged.
 */
export type BeforeCloseGuard = () => boolean | Promise<boolean>;

export function runGuardedClose(
  guard: BeforeCloseGuard | undefined,
  proceed: () => void,
  pendingRef: { current: boolean },
  isActive: () => boolean = () => true,
): void {
  if (pendingRef.current) return;
  if (!guard) {
    proceed();
    return;
  }
  let result: boolean | Promise<boolean>;
  try {
    result = guard();
  } catch {
    return;
  }
  if (result && typeof (result as Promise<boolean>).then === "function") {
    pendingRef.current = true;
    (result as Promise<boolean>).then(
      (ok) => {
        pendingRef.current = false;
        if (ok !== false && isActive()) proceed();
      },
      () => {
        pendingRef.current = false;
      },
    );
    return;
  }
  if (result !== false) proceed();
}
