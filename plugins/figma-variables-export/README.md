# Portfolio Variables Export

Figma development plugin that exports local variable collections to **schema v1** JSON for `design-tokens/figma-variables.json`.

## Install

1. Figma → **Plugins** → **Development** → **Import plugin from manifest…**
2. Select `plugins/figma-variables-export/manifest.json`
3. Run **Portfolio Variables Export** from the same Development menu

Plugin icon: `icon.svg` (source). `manifest.json` references `icon.png` (raster export for Figma). After changing the SVG, regenerate PNG if needed, then re-import the manifest.

## Workflow

1. Click **Export JSON** in the plugin UI
2. **Download** or **Copy** the JSON
3. Save as `design-tokens/figma-variables.json`
4. Run `npm run tokens:build`

## File key (`figmaFileKey`)

The export always includes `figmaFileKey` — the stable ID from your file URL (`figma.com/design/<fileKey>/…`). The plugin reads it from `figma.fileKey` on the file you have open; there is no separate fetch step.

This requires `enablePrivatePluginApi: true` in `manifest.json` (already set for this private dev plugin). After changing the manifest, re-import it: **Development → Import plugin from manifest…**

If the UI shows “File key unavailable”, re-import the manifest and run the plugin again from the target file.

## Debugging errors

If Figma shows *"An error occurred while running this plugin"*:

1. Click **Show/Hide console** in the toast (this opens the **plugin** console, not the browser page inspector)
2. Re-run the plugin and note the stack trace
3. Re-import the manifest after code changes: Development → Import plugin from manifest…

The browser DevTools `<body>…</body>` dump is the Figma app shell, not the plugin error.

## Export formats

**Lean (default)** — recommended for `design-tokens/figma-variables.json`:

- `schemaVersion`, `fileName`, `figmaFileKey` (from the open file via `figma.fileKey`)
- Per variable: `name`, `resolvedType`, `valuesByMode` (aliases resolved to final values)
- Collection/mode IDs preserved
- No duplicate `rawValuesByMode`, scopes, per-variable IDs, or CSS hints
- Build script infers `--custom-property` names and units from variable names

**Verbose** (checkbox in UI) — for debugging or future tooling:

- Adds `exportedAt`, `stats`, per-variable `id`, `css`, alias `rawValuesByMode` when aliases exist
- Same resolved `valuesByMode` as lean — no value compromise
