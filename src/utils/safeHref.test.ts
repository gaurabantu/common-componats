import { isSafeHref } from "./safeHref";

describe("isSafeHref", () => {
  it.each(["https://x.dev", "http://x.dev/a?b=1", "/docs", "docs/page", "#top", "?q=1", "mailto:a@b.c", "tel:+123", ""])(
    "allows %j",
    (href) => expect(isSafeHref(href)).toBe(true),
  );

  it.each([
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    "java\tscript:alert(1)",
    "java\nscript:alert(1)",
    " javascript:alert(1)",
    "\x01javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
  ])("rejects %j", (href) => expect(isSafeHref(href)).toBe(false));
});
