// src/components/molecules/Modal/overlayStack.ts
import { createContext } from "react";
var stack = [];
var OverlayLayerContext = createContext(void 0);
function pushLayer(id, parentId) {
  stack = stack.filter((layer2) => layer2.id !== id);
  const layer = { id, parentId };
  const firstChild = stack.findIndex((l) => isDescendantOf(l, id));
  if (firstChild === -1)
    stack.push(layer);
  else
    stack.splice(firstChild, 0, layer);
}
function popLayer(id) {
  stack = stack.filter((layer) => layer.id !== id);
}
function isTopLayer(id) {
  return stack.length > 0 && stack[stack.length - 1].id === id;
}
function isDescendantOf(layer, ancestorId) {
  var _a;
  let parentId = layer.parentId;
  const seen = /* @__PURE__ */ new Set();
  while (parentId && !seen.has(parentId)) {
    if (parentId === ancestorId)
      return true;
    seen.add(parentId);
    parentId = (_a = stack.find((l) => l.id === parentId)) == null ? void 0 : _a.parentId;
  }
  return false;
}

export {
  OverlayLayerContext,
  pushLayer,
  popLayer,
  isTopLayer
};
//# sourceMappingURL=chunk-FPB2PMES.mjs.map