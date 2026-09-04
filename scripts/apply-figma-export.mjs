/**
 * Writes design-tokens/figma-variables.json from a schema v1 export payload.
 * Usage: node scripts/apply-figma-export.mjs <export.json>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/apply-figma-export.mjs <export.json>");
  process.exit(1);
}

const raw = JSON.parse(readFileSync(inputPath, "utf8"));
const out = {
  schemaVersion: raw.schemaVersion,
  fileName: raw.fileName ?? "portfolio",
  collections: raw.collections,
  figmaFileKey: raw.figmaFileKey ?? null,
};

const outPath = join(__dirname, "..", "design-tokens", "figma-variables.json");
writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");
console.log("Wrote", outPath);
