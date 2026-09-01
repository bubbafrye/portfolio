/**
 * Measure project tile title/image positions for alignment checks.
 * Usage: node scripts/measure-tiles.mjs
 */
import { chromium } from "playwright";

const url = process.env.PAGE_URL ?? "http://localhost:5173/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.locator('[data-figma-name="projects"]').scrollIntoViewIfNeeded();

const data = await page.evaluate(() => {
  const ids = ["a11y", "park", "blast"];
  return ids.map((id) => {
    const tile = document.querySelector(`button[data-figma-name="${id}"]`);
    const layerUp = tile?.querySelector('[data-figma-variant="tile-up"]');
    const layerInner = layerUp?.firstElementChild;
    const projectMain = layerInner?.firstElementChild;
    const projectContent = projectMain?.firstElementChild;
    const projectStatic = projectContent?.firstElementChild;
    const title = projectStatic?.querySelector("h2");
    const tileRect = tile?.getBoundingClientRect();
    const offset = (el) => (el && tileRect ? Math.round(el.getBoundingClientRect().top - tileRect.top) : null);
    return {
      id,
      layerInner: offset(layerInner),
      projectMain: offset(projectMain),
      projectContent: offset(projectContent),
      projectStatic: offset(projectStatic),
      title: offset(title),
      titleHeight: title?.getBoundingClientRect().height,
      hero: offset(
        layerUp?.querySelector('[class*="heroFlipWrap"] [class*="hero"]') ??
          layerUp?.querySelector('[class*="hero"]'),
      ),
      layerUpHeight: layerUp?.getBoundingClientRect().height,
      tileHeight: tileRect?.height,
    };
  });
});

console.table(data);

const hoverData = await page.evaluate(() => {
  const ids = ["a11y", "park", "blast"];
  return ids.map((id) => {
    const tile = document.querySelector(`button[data-figma-name="${id}"]`);
    const hover = tile?.querySelector('[data-figma-variant="tile-hover"]');
    const results = hover?.querySelector("ul");
    const projectEl = [...(hover?.querySelectorAll("p") ?? [])].find((p) =>
      p.textContent?.includes("Project"),
    );
    const tileRect = tile?.getBoundingClientRect();
    const resultsRect = results?.getBoundingClientRect();
    const projectRect = projectEl?.getBoundingClientRect();
    return {
      id,
      resultsWidth: resultsRect ? Math.round(resultsRect.width) : null,
      projectMargin: projectRect && tileRect ? Math.round(tileRect.bottom - projectRect.bottom) : null,
    };
  });
});

console.log("\nHover fitment (results width should be >= 300, project margin >= 16):");
console.table(hoverData);

await browser.close();
