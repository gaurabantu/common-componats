/**
 * Global depth counter so multiple Modal instances / stacked modals share one body lock.
 * A per-instance ref wrongly set `position: fixed` count to 0 while another modal stayed open.
 */

let depth = 0;
let scrollY = 0;

export function acquireBodyScrollLock(): void {
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

export function releaseBodyScrollLock(): void {
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
