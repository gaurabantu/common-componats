// src/components/molecules/Modal/closeGuard.ts
function runGuardedClose(guard, proceed, pendingRef, isActive = () => true) {
  if (pendingRef.current)
    return;
  if (!guard) {
    proceed();
    return;
  }
  let result;
  try {
    result = guard();
  } catch (e) {
    return;
  }
  if (result && typeof result.then === "function") {
    pendingRef.current = true;
    result.then(
      (ok) => {
        pendingRef.current = false;
        if (ok !== false && isActive())
          proceed();
      },
      () => {
        pendingRef.current = false;
      }
    );
    return;
  }
  if (result !== false)
    proceed();
}

export {
  runGuardedClose
};
//# sourceMappingURL=chunk-V2S4I5H5.mjs.map