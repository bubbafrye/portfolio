#!/usr/bin/env node
/**
 * Sanity-checks downloaded Figma assets against figma-asset-manifest.json.
 * Catches common mistakes like exporting a full tile frame (tall PNG) instead of
 * the square illustration child node.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(root, "scripts/figma-asset-manifest.json"), "utf8"),
);

function pngDimensions(filePath) {
  const out = execSync(`file "${filePath}"`, { encoding: "utf8" });
  const match = out.match(/(\d+) x (\d+)/);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

let failed = 0;

for (const asset of manifest.assets) {
  const filePath = join(root, asset.path);
  if (!existsSync(filePath)) {
    console.error(`MISSING  ${asset.path} (expected from Figma node ${asset.nodeId})`);
    failed++;
    continue;
  }

  if (!asset.aspectRatio) continue;

  const dims = pngDimensions(filePath);
  if (!dims) continue;

  const ratio = dims.width / dims.height;
  const { min, max } = asset.aspectRatio;
  if (ratio < min || ratio > max) {
    console.error(
      `ASPECT  ${asset.path} is ${dims.width}x${dims.height} (ratio ${ratio.toFixed(2)})`,
    );
    console.error(
      `         Expected ratio ${min}–${max}. Did you export node ${asset.doNotUse ?? "the parent frame"} instead of ${asset.nodeId}?`,
    );
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} asset check(s) failed. See scripts/figma-asset-manifest.json`);
  process.exit(1);
}

console.log(`OK — ${manifest.assets.length} manifest entries checked`);
