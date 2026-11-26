// Minimal CDP helper: node cdp.cjs <script.cjs>  (script exports async fn(page))
const { spawn } = require("child_process");
const path = require("path");
const WebSocket = require("/Users/gaurabkumar/Documents/my code/common-componant-main/node_modules/ws");
const http = require("http");
const PORT = 9333;
function getJSON(p, method = "GET") {
  return new Promise((res, rej) => {
    const r = http.request({ host: "127.0.0.1", port: PORT, path: p, method }, (resp) => {
      let d = ""; resp.on("data", (c) => (d += c)); resp.on("end", () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    });
    r.on("error", rej); r.end();
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
    "--headless=new", `--remote-debugging-port=${PORT}`, "--no-first-run", "--disable-gpu",
    `--user-data-dir=${path.join(__dirname, "profile")}`, "about:blank"], { stdio: "ignore" });
  let target;
  for (let i = 0; i < 50; i++) { try { target = await getJSON("/json/new?about:blank", "PUT"); break; } catch { await sleep(200); } }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.on("open", r));
  let id = 0; const pending = new Map(); const listeners = [];
  ws.on("message", (m) => { const msg = JSON.parse(m); if (msg.id && pending.has(msg.id)) { const { res, rej } = pending.get(msg.id); pending.delete(msg.id); msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result); } else listeners.forEach((l) => l(msg)); });
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  await send("Page.enable"); await send("Runtime.enable");
  const logs = [];
  listeners.push((m) => { if (m.method === "Runtime.exceptionThrown") logs.push("EXC " + JSON.stringify(m.params.exceptionDetails).slice(0, 400)); if (m.method === "Runtime.consoleAPICalled" && (m.params.type === "error")) logs.push("ERR " + m.params.args.map((a) => a.value || a.description).join(" ").slice(0, 300)); });
  const page = {
    send, sleep, logs,
    async goto(url, wait = 1500) { await send("Page.navigate", { url }); await sleep(wait); },
    async eval(expr) { const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 500)); return r.result.value; },
    async viewport(w, h = 900) { await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: false }); },
    async shot(file, full = true) { const m = full ? await page.eval("JSON.stringify({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight})") : null; const p = {}; if (full) { const { w, h } = JSON.parse(m); p.clip = { x: 0, y: 0, width: w, height: Math.min(h, 12000), scale: 1 }; p.captureBeyondViewport = true; } const r = await send("Page.captureScreenshot", { format: "png", ...p }); require("fs").writeFileSync(file, Buffer.from(r.data, "base64")); },
  };
  try { await require(path.resolve(process.argv[2]))(page); } catch (e) { console.error("FAIL", e.message); }
  if (logs.length) console.log("CONSOLE:\n" + logs.join("\n"));
  ws.close(); chrome.kill();
  process.exit(0);
})();
