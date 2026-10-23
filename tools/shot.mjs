#!/usr/bin/env node
/* Screenshot built pages in a real browser, and report console problems.

     node tools/shot.mjs lessons/t1-lesson-01.html                 # en, light, 1280, viewport only
     node tools/shot.mjs lessons/t1-lesson-01.html --lang ar --theme dark --width 390 --full
     node tools/shot.mjs tests/t1-test-01.html --scroll 2400       # a slice further down
     node tools/shot.mjs lessons/t1-lesson-01.html --slices 6      # 6 viewport-high shots down the page

   Writes PNGs to .tmp/shots/<page>-<lang>-<theme>-<width>[-N].png and prints their
   paths, plus any console error, uncaught exception, failed request, 4xx/5xx response
   and horizontal overflow. Starts its own static server. */
import { createRequire } from "module";
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(ROOT, "package.json"));
const { chromium } = require("@playwright/test");

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf("--" + n); return i > -1 ? args[i + 1] : d; };
const has = (n) => args.includes("--" + n);
const hrefs = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--") && !["full"].includes(args[i - 1].slice(2))));
if (!hrefs.length) { console.error("usage: node tools/shot.mjs <page.html> [--lang en|ar] [--theme light|dark] [--width N] [--height N] [--full] [--scroll Y] [--slices N] [--wait ms]"); process.exit(2); }

const lang = flag("lang", "en"), theme = flag("theme", "light");
const width = +flag("width", 1280), height = +flag("height", 900);
const slices = +flag("slices", 0), scroll = +flag("scroll", 0), wait = +flag("wait", 300);

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json", ".csv": "text/csv; charset=utf-8" };
const srv = await new Promise((resolve) => {
  const s = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
    const f = path.join(ROOT, p.endsWith("/") ? p + "index.html" : p);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end("nf"); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
    fs.createReadStream(f).pipe(res);
  });
  s.listen(0, "127.0.0.1", () => resolve(s));
});
const base = "http://127.0.0.1:" + srv.address().port;
const outDir = path.join(ROOT, ".tmp", "shots");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const href of hrefs) {
  const ctx = await browser.newContext({ viewport: { width, height }, hasTouch: width < 500, deviceScaleFactor: 1 });
  await ctx.addInitScript(([l, t]) => { try { localStorage.setItem("da.lang", l); localStorage.setItem("da.theme", t); } catch (e) {} }, [lang, theme]);
  const page = await ctx.newPage();
  const problems = [];
  page.on("console", (m) => { if (m.type() === "error") problems.push("console: " + m.text()); });
  page.on("pageerror", (e) => problems.push("uncaught: " + e.message));
  page.on("requestfailed", (r) => problems.push("request failed: " + r.url()));
  page.on("response", (r) => { if (r.status() >= 400) problems.push(r.status() + " " + r.url()); });
  await page.goto(base + "/" + href);
  await page.waitForSelector("body[data-booted]");
  await page.waitForTimeout(wait);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const stem = href.replace(/[\\/]/g, "_").replace(/\.html$/, "") + `-${lang}-${theme}-${width}`;
  const shots = [];
  if (slices > 0) {
    for (let i = 0; i < slices; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * (height - 80));
      await page.waitForTimeout(120);
      const f = path.join(outDir, `${stem}-${i + 1}.png`);
      await page.screenshot({ path: f });
      shots.push(f);
    }
  } else {
    if (scroll) { await page.evaluate((y) => window.scrollTo(0, y), scroll); await page.waitForTimeout(150); }
    const f = path.join(outDir, `${stem}${scroll ? "-y" + scroll : ""}${has("full") ? "-full" : ""}.png`);
    await page.screenshot({ path: f, fullPage: has("full") });
    shots.push(f);
  }
  console.log(`${href}  [${lang}/${theme}/${width}]  page height ${total}px  overflow ${overflow}px  problems ${problems.length}`);
  for (const s of shots) console.log("  " + s);
  for (const p of problems.slice(0, 15)) console.log("  ! " + p);
  await ctx.close();
}
await browser.close();
srv.close();
