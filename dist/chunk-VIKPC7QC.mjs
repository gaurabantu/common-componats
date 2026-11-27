/* ucs:component-css */
import "./styles/components/molecules/Accordion/Accordion.css";
// src/components/molecules/Accordion/index.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var AccordionContext = createContext(null);
function useAccordionContext(component) {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Accordion>`);
  }
  return ctx;
}
var AccordionItemContext = createContext(null);
function useAccordionItemContext(component) {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <AccordionItem>`);
  }
  return ctx;
}
function normalizeSingleValue(v) {
  if (v === void 0)
    return void 0;
  if (Array.isArray(v))
    return v[0];
  return v;
}
function normalizeMultipleValue(v) {
  if (v === void 0)
    return [];
  if (Array.isArray(v))
    return v;
  return [v];
}
var Accordion = React.memo(function Accordion2({
  children,
  type = "single",
  collapsible = true,
  value: valueProp,
  defaultValue,
  onValueChange,
  variant = "default",
  motion = "default",
  density = "default",
  className,
  ...rest
}) {
  const reactId = useId();
  const baseId = `accordion-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    if (type === "multiple")
      return [];
    return void 0;
  });
  const value = isControlled ? valueProp : inner;
  const valueRef = useRef(value);
  valueRef.current = value;
  const setValue = useCallback(
    (next) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange == null ? void 0 : onValueChange(next);
    },
    [isControlled, onValueChange]
  );
  const isOpen = useCallback(
    (itemValue) => {
      if (type === "single") {
        return normalizeSingleValue(value) === itemValue;
      }
      return normalizeMultipleValue(value).includes(itemValue);
    },
    [type, value]
  );
  const toggle = useCallback(
    (itemValue) => {
      const v = valueRef.current;
      if (type === "single") {
        const current = normalizeSingleValue(v);
        if (current === itemValue) {
          if (collapsible)
            setValue(void 0);
        } else {
          setValue(itemValue);
        }
      } else {
        const arr = [...normalizeMultipleValue(v)];
        const i = arr.indexOf(itemValue);
        if (i >= 0) {
          arr.splice(i, 1);
        } else {
          arr.push(itemValue);
        }
        setValue(arr);
      }
    },
    [type, collapsible, setValue]
  );
  const ctx = useMemo(
    () => ({
      type,
      collapsible,
      isOpen,
      toggle,
      baseId,
      variant,
      motion,
      density
    }),
    [type, collapsible, isOpen, toggle, baseId, variant, motion, density]
  );
  return /* @__PURE__ */ jsx(AccordionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cls("ds-accordion", className),
      "data-variant": variant,
      "data-motion": motion,
      "data-density": density,
      "data-orientation": "vertical",
      ...rest,
      children
    }
  ) });
});
var AccordionItem = React.memo(function AccordionItem2({
  value,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const acc = useAccordionContext("AccordionItem");
  const reactId = useId();
  const safe = String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
  const suffix = `${acc.baseId}-${safe}-${reactId.replace(/:/g, "")}`;
  const itemCtx = useMemo(
    () => ({
      value,
      disabled,
      triggerId: `${suffix}-trigger`,
      contentId: `${suffix}-content`
    }),
    [value, disabled, suffix]
  );
  return /* @__PURE__ */ jsx(AccordionItemContext.Provider, { value: itemCtx, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cls("ds-accordion__item", className),
      "data-disabled": disabled ? "true" : void 0,
      "data-state": acc.isOpen(value) ? "open" : "closed",
      ...rest,
      children
    }
  ) });
});
function ChevronIcon() {
  return /* @__PURE__ */ jsx("svg", { className: "ds-accordion__chevron", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M6 9l6 6 6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
var AccordionTrigger = React.memo(function AccordionTrigger2({
  children,
  className,
  onClick,
  ...rest
}) {
  const acc = useAccordionContext("AccordionTrigger");
  const item = useAccordionItemContext("AccordionTrigger");
  const open = acc.isOpen(item.value) && !item.disabled;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...rest,
      type: "button",
      id: item.triggerId,
      className: cls("ds-accordion__trigger", className),
      "aria-expanded": open,
      "aria-controls": item.contentId,
      "data-state": open ? "open" : "closed",
      "data-disabled": item.disabled ? "true" : void 0,
      disabled: item.disabled,
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (e.defaultPrevented || item.disabled)
          return;
        acc.toggle(item.value);
      },
      children: [
        /* @__PURE__ */ jsx("span", { className: "ds-accordion__trigger-label", children }),
        /* @__PURE__ */ jsx(ChevronIcon, {})
      ]
    }
  );
});
var useInertLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var AccordionContent = React.memo(function AccordionContent2({
  children,
  className,
  forceMount = false,
  ...rest
}) {
  const acc = useAccordionContext("AccordionContent");
  const item = useAccordionItemContext("AccordionContent");
  const open = acc.isOpen(item.value);
  const animated = acc.motion === "default";
  const hidden = !open;
  const useInertWhenClosed = hidden && animated;
  const outerRef = useRef(null);
  useInertLayoutEffect(() => {
    const el = outerRef.current;
    if (!el)
      return;
    if (useInertWhenClosed)
      el.setAttribute("inert", "");
    else
      el.removeAttribute("inert");
  }, [useInertWhenClosed]);
  const keepMounted = animated || forceMount || open;
  if (!keepMounted) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...rest,
      ref: outerRef,
      className: cls("ds-accordion__content-outer", className),
      "data-state": open ? "open" : "closed",
      "data-animated": animated ? "true" : void 0,
      id: item.contentId,
      role: "region",
      "aria-labelledby": item.triggerId,
      "aria-hidden": hidden ? true : void 0,
      hidden: hidden && !forceMount && !animated ? true : void 0,
      children: /* @__PURE__ */ jsx("div", { className: "ds-accordion__content-inner", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "ds-accordion__content-body",
          "data-force-hidden": forceMount && hidden && !animated ? "true" : void 0,
          children
        }
      ) })
    }
  );
});
var Accordion_default = Accordion;

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Accordion_default
};
//# sourceMappingURL=chunk-VIKPC7QC.mjs.map