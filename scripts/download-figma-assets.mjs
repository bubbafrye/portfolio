#!/usr/bin/env node
/**
 * Downloads Figma assets using a URL map produced after MCP download_assets calls.
 *
 * Workflow (prevents exporting parent frames that duplicate React copy):
 * 1. Read scripts/figma-asset-manifest.json for the correct nodeId per file path.
 * 2. Call Figma MCP download_assets on each nodeId (NOT parent tile-up frames).
 * 3. Save MCP raw/export URLs to scripts/figma-asset-urls.json:
 *      { "public/assets/tiles/a11y-tile.png": "https://www.figma.com/api/mcp/asset/..." }
 * 4. Run: node scripts/download-figma-assets.mjs
 * 5. Run: npm run assets:validate
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "scripts/figma-asset-manifest.json");
const urlsPath = join(root, "scripts/figma-asset-urls.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

if (!existsSync(urlsPath)) {
  const template = Object.fromEntries(
    manifest.assets.map((a) => [a.path, "PASTE_MCP_URL_HERE"]),
  );
  writeFileSync(urlsPath, `${JSON.stringify(template, null, 2)}\n`);
  console.log(`Created ${urlsPath}`);
  console.log("Fill in MCP download_assets URLs, then re-run this script.");
  console.log("\nNode IDs to fetch (from manifest):");
  for (const asset of manifest.assets) {
    const warn = asset.doNotUse ? `  (NOT ${asset.doNotUse})` : "";
    console.log(`  ${asset.path} ← ${asset.nodeId}${warn}`);
  }
  process.exit(0);
}

const urls = JSON.parse(readFileSync(urlsPath, "utf8"));
let failed = 0;

for (const asset of manifest.assets) {
  const url = urls[asset.path];
  if (!url || url === "PASTE_MCP_URL_HERE") {
    console.error(`SKIP  ${asset.path} — no URL in figma-asset-urls.json`);
    failed++;
    continue;
  }

  const dest = join(root, asset.path);
  mkdirSync(dirname(dest), { recursive: true });
  try {
    execSync(`curl -fsSL -o "${dest}" "${url}"`, { stdio: "pipe" });
    console.log(`OK    ${asset.path}`);
  } catch {
    console.error(`FAIL  ${asset.path}`);
    failed++;
  }
}

if (failed > 0) process.exit(1);
console.log("\nRun: npm run assets:validate");
