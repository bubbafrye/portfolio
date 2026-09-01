import { writeFileSync } from "node:fs";

const [, , outPath, b64Path] = process.argv;
const b64 = await import(b64Path, { assert: { type: "json" } }).then((m) => m.default);
writeFileSync(outPath, Buffer.from(b64, "base64"));
