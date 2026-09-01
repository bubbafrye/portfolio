/**
 * Captures a full-page screenshot at 1280px for visual tile layout checks.
 * Usage: npx playwright install chromium && node scripts/capture-tiles.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const url = process.env.PAGE_URL ?? "http://localhost:5173/";
const outDir = path.resolve("test-results");
const outFile = path.join(outDir, "tiles-1280.png");

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });

await page.locator('[data-figma-name="projects"]').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);

await page.screenshot({ path: outFile, fullPage: true });
await browser.close();

console.log(`Saved ${outFile}`);
