// src/components/molecules/Popover/popoverPosition.ts
var GAP = 8;
var VIEWPORT = 8;
function computePopoverPosition(triggerRect, contentWidth, contentHeight, placement) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const cw = Math.min(contentWidth, vw - VIEWPORT * 2);
  const ch = Math.min(contentHeight, vh - VIEWPORT * 2);
  let top;
  let left;
  const placeBottom = placement.startsWith("bottom");
  const alignEnd = placement.endsWith("end");
  if (placeBottom) {
    top = triggerRect.bottom + GAP;
    if (top + ch > vh - VIEWPORT) {
      const above = triggerRect.top - GAP - ch;
      if (above >= VIEWPORT) {
        top = above;
      } else {
        top = Math.max(VIEWPORT, vh - VIEWPORT - ch);
      }
    }
  } else {
    top = triggerRect.top - GAP - ch;
    if (top < VIEWPORT) {
      const below = triggerRect.bottom + GAP;
      if (below + ch <= vh - VIEWPORT) {
        top = below;
      } else {
        top = VIEWPORT;
      }
    }
  }
  if (alignEnd) {
    left = triggerRect.right - cw;
  } else {
    left = triggerRect.left;
  }
  left = Math.min(Math.max(left, VIEWPORT), vw - VIEWPORT - cw);
  return {
    top,
    left,
    width: cw,
    maxHeight: Math.min(ch, vh - VIEWPORT * 2)
  };
}

// src/components/molecules/Popover/slot.tsx
import React, { cloneElement, isValidElement } from "react";
function getElementRef(element) {
  const major = parseInt(React.version, 10);
  if (major >= 19)
    return element.props.ref;
  return element.ref;
}
function setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function renderSlot(children, slotProps, ref, component) {
  const child = React.Children.only(children);
  if (!isValidElement(child)) {
    throw new Error(`${component} with asChild expects a single React element child`);
  }
  const childProps = child.props;
  const childRef = getElementRef(child);
  const merged = { ...childProps };
  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (slotValue === void 0)
      continue;
    if (/^on[A-Z]/.test(key) && typeof slotValue === "function" && typeof childValue === "function") {
      merged[key] = (event, ...args) => {
        childValue(event, ...args);
        if (event && event.defaultPrevented)
          return;
        slotValue(event, ...args);
      };
    } else if (key === "className") {
      merged[key] = [childValue, slotValue].filter(Boolean).join(" ") || void 0;
    } else if (key === "style") {
      merged[key] = { ...slotValue, ...childValue };
    } else {
      merged[key] = slotValue;
    }
  }
  merged.ref = (node) => {
    setRef(ref, node);
    setRef(childRef, node);
  };
  return cloneElement(child, merged);
}

export {
  computePopoverPosition,
  renderSlot
};
//# sourceMappingURL=chunk-KILC4OUR.mjs.map