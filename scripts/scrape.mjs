import { chromium } from "playwright";
import fs from "node:fs";

const PAGES = {
  "concert-events": "copia-de-fashion",
  creative: "copia-de-portrait",
  fashion: "copia-de-wedding-events",
  portrait: "copia-de-fashion-1",
  "wedding-events": "blank-1",
  "cover-shoot": "copia-de-creative",
};

const BASE = "https://clientw558.wixsite.com/website";
const ICON = "58734f_5d02b05786c946a68689a4cad32d1beb"; // outlook icon

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1400, height: 1000 },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
});

const result = {};

for (const [slug, path] of Object.entries(PAGES)) {
  const page = await ctx.newPage();
  const seen = new Set(); // media id -> order
  const order = [];

  // Capture every media request the gallery makes (covers lazy-loaded tiles)
  page.on("request", (req) => {
    const u = req.url();
    const m = u.match(/static\.wixstatic\.com\/media\/(58734f_[a-f0-9]+~mv2\.(?:jpg|png))/);
    if (m && !seen.has(m[1]) && m[1].indexOf(ICON) === -1) {
      seen.add(m[1]);
      order.push(m[1]);
    }
  });

  try {
    await page.goto(`${BASE}/${path}`, {
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });
  } catch (e) {
    console.log(`  goto warning (${slug}): ${e.message.split("\n")[0]}`);
  }
  await page.waitForTimeout(3000);

  // Scroll to force lazy loading of the whole gallery
  let stable = 0;
  let last = 0;
  for (let i = 0; i < 300 && stable < 6; i++) {
    await page.mouse.wheel(0, 2600);
    await page.evaluate(() => window.scrollBy(0, 2600));
    await page.waitForTimeout(500);
    // also collect from DOM in case some are set via background-image
    const domIds = await page.evaluate(() => {
      const out = [];
      const re = /(58734f_[a-f0-9]+~mv2\.(?:jpg|png))/;
      document.querySelectorAll("img,source,wow-image,[style]").forEach((el) => {
        const s =
          el.getAttribute("src") ||
          el.getAttribute("srcset") ||
          el.getAttribute("data-src") ||
          (el.getAttribute("style") || "");
        const m = s && s.match(re);
        if (m) out.push(m[1]);
      });
      return out;
    });
    for (const id of domIds) {
      if (!seen.has(id) && id.indexOf(ICON) === -1) {
        seen.add(id);
        order.push(id);
      }
    }
    if (order.length === last) stable++;
    else stable = 0;
    last = order.length;
  }

  result[slug] = order;
  console.log(`${slug}: ${order.length} images`);
  await page.close();
}

await browser.close();
fs.writeFileSync("scripts/images.json", JSON.stringify(result, null, 2));
console.log("Saved scripts/images.json");
