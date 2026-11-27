// src/utils/safeHref.ts
var SAFE_PROTOCOLS = /* @__PURE__ */ new Set(["http:", "https:", "mailto:", "tel:"]);
function isSafeHref(href) {
  try {
    const url = new URL(href, "https://relative.invalid/");
    return SAFE_PROTOCOLS.has(url.protocol);
  } catch (e) {
    return false;
  }
}

export {
  isSafeHref
};
//# sourceMappingURL=chunk-2SUDH5VN.mjs.map