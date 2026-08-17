import fs from "node:fs";
import puppeteer from "puppeteer-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir =
  process.env.OUT_DIR ||
  path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../public/articles/semantic-search"
  );

const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.mkdirSync(outDir, { recursive: true });

const clickByText = async (page, text) => {
  const clicked = await page.evaluate((label) => {
    const buttons = [...document.querySelectorAll("button")];
    const el = buttons.find((b) => b.textContent.trim() === label);
    if (!el) return false;
    el.click();
    return true;
  }, text);
  if (!clicked) throw new Error(`Button not found: ${text}`);
};

const waitForText = async (page, needle, timeout = 20000) => {
  await page.waitForFunction(
    (n) => document.body.innerText.includes(n),
    { timeout },
    needle
  );
};

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
await page.emulateMediaFeatures([
  { name: "prefers-color-scheme", value: "dark" },
]);
await page.goto("https://bookmantic.com/", {
  waitUntil: "networkidle2",
  timeout: 60000,
});
await waitForText(page, "Find your next book");
await new Promise((r) => setTimeout(r, 600));

await page.screenshot({
  path: path.join(outDir, "home.png"),
  type: "png",
});

await clickByText(page, "Hopeful sci-fi");
await waitForText(page, "Your matches");
await waitForText(page, "The Companions");
await new Promise((r) => setTimeout(r, 800));

const matches = await page.evaluate(() => {
  const heading = [...document.querySelectorAll("h2")].find((h) =>
    h.textContent.includes("Your matches")
  );
  if (!heading) return null;
  const section = heading.closest("section") || heading.parentElement;
  const r = (section || heading).getBoundingClientRect();
  return {
    x: Math.max(0, r.x - 24),
    y: Math.max(0, window.scrollY + r.y - 16),
    width: r.width + 48,
    height: Math.min(r.height + 32, 1600),
  };
});

await page.screenshot({
  path: path.join(outDir, "results.png"),
  type: "png",
  fullPage: true,
});

if (matches) {
  await page.screenshot({
    path: path.join(outDir, "results-clip.png"),
    type: "png",
    clip: {
      x: matches.x,
      y: matches.y,
      width: Math.min(matches.width, 1440),
      height: Math.min(matches.height, 2200),
    },
  });
}

await clickByText(page, "Similar books");
await waitForText(page, "More like");
await new Promise((r) => setTimeout(r, 800));

const similar = await page.evaluate(() => {
  const heading = [...document.querySelectorAll("h2, h3")].find((h) =>
    /More like/.test(h.textContent)
  );
  const first = [...document.querySelectorAll("h3")].find((h) =>
    h.textContent.includes("The Companions")
  );
  const start = first?.closest("li") || first?.parentElement;
  const end = heading?.closest("section") || heading?.parentElement;
  if (!start) return null;
  const a = start.getBoundingClientRect();
  const b = (end || start).getBoundingClientRect();
  const top = window.scrollY + a.y - 16;
  const bottom = window.scrollY + Math.max(a.bottom, b.bottom) + 16;
  return {
    x: Math.max(0, a.x - 24),
    y: Math.max(0, top),
    width: a.width + 48,
    height: Math.min(bottom - top, 1400),
  };
});

if (similar) {
  await page.screenshot({
    path: path.join(outDir, "similar-clip.png"),
    type: "png",
    clip: {
      x: similar.x,
      y: similar.y,
      width: Math.min(similar.width, 1440),
      height: Math.min(similar.height, 1400),
    },
  });
}

await page.screenshot({
  path: path.join(outDir, "similar.png"),
  type: "png",
  fullPage: true,
});

await browser.close();
console.log("Wrote screenshots to", outDir);
