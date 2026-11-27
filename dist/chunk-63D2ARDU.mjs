// src/components/molecules/Modal/bodyScrollLock.ts
var depth = 0;
var scrollY = 0;
function acquireBodyScrollLock() {
  if (depth === 0) {
    scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  depth += 1;
}
function releaseBodyScrollLock() {
  depth = Math.max(0, depth - 1);
  if (depth === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, scrollY);
  }
}

export {
  acquireBodyScrollLock,
  releaseBodyScrollLock
};
//# sourceMappingURL=chunk-63D2ARDU.mjs.map