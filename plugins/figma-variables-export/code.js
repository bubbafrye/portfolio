/**
 * Portfolio Variables Export — Figma plugin main thread.
 * Exports local variable collections to design-tokens/figma-variables.json schema v1.
 */
const PLUGIN_VERSION = "1.1.1";
const SCHEMA_VERSION = 1;
const MAX_ALIAS_DEPTH = 32;

try {
  figma.showUI(__html__, { width: 480, height: 560, themeColors: true });
  figma.ui.postMessage({
    type: "PLUGIN_READY",
    figmaFileKey: resolveFigmaFileKey(),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  figma.notify(`Plugin failed to start: ${message}`, { error: true });
  figma.closePlugin();
}

figma.ui.onmessage = async (msg) => {
  if (!msg || typeof msg !== "object") return;

  if (msg.type === "EXPORT") {
    try {
      const payload = await exportVariables(msg.options || {});
      const safePayload = JSON.parse(JSON.stringify(payload));
      figma.ui.postMessage({ type: "EXPORT_SUCCESS", payload: safePayload });
      const count = countVariables(safePayload);
      figma.notify(`Exported ${count} variables`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      figma.ui.postMessage({ type: "EXPORT_ERROR", message });
      figma.notify(`Export failed: ${message}`, { error: true });
    }
    return;
  }

  if (msg.type === "CLOSE") {
    figma.closePlugin();
  }
};

/**
 * @param {{ fileName?: string, collectionIds?: string[], includeHidden?: boolean, lean?: boolean, includeAliasMetadata?: boolean }} options
 */
async function exportVariables(options) {
  const includeHidden = options.includeHidden !== false;
  const lean = options.lean !== false;
  const includeAliasMetadata = !lean && options.includeAliasMetadata !== false;

  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const allVariables = await figma.variables.getLocalVariablesAsync();
  const variableById = new Map(allVariables.map((v) => [v.id, v]));
  const collectionById = new Map(collections.map((c) => [c.id, c]));

  const selected =
    options.collectionIds && options.collectionIds.length > 0
      ? collections.filter((c) => options.collectionIds.includes(c.id))
      : collections;

  if (selected.length === 0) {
    throw new Error("No variable collections found to export.");
  }

  const warnings = [];
  const exportedCollections = [];

  for (const collection of selected) {
    const modes = collection.modes.map((mode) => ({
      id: mode.modeId,
      name: mode.name,
    }));

    const variablesInCollection = allVariables
      .filter((v) => v.variableCollectionId === collection.id)
      .filter((v) => includeHidden || !v.hiddenFromPublishing)
      .sort((a, b) => a.name.localeCompare(b.name));

    const variables = [];

    for (const variable of variablesInCollection) {
      const valuesByMode = {};
      const rawValuesByMode = includeAliasMetadata ? {} : undefined;
      let hasAlias = false;

      for (const mode of collection.modes) {
        const raw = variable.valuesByMode[mode.modeId];
        if (isVariableAlias(raw)) {
          hasAlias = true;
        }
        if (rawValuesByMode) {
          rawValuesByMode[mode.name] = serializeRawValue(
            raw,
            variableById,
            variable.resolvedType,
          );
        }

        try {
          const resolved = resolveVariableValue(
            variable,
            mode.modeId,
            variableById,
            collectionById,
          );
          valuesByMode[mode.name] = serializeResolvedValue(resolved, variable.resolvedType);
        } catch (error) {
          warnings.push({
            variable: variable.name,
            mode: mode.name,
            message: error instanceof Error ? error.message : String(error),
          });
        }
      }

      const entry = {
        name: variable.name,
        resolvedType: variable.resolvedType,
        valuesByMode,
      };

      if (!lean) {
        entry.id = variable.id;
        if (variable.hiddenFromPublishing) {
          entry.hiddenFromPublishing = true;
        }
        const unit = inferCssUnit(variable.name, variable.resolvedType);
        entry.css = {
          customProperty: cssCustomPropertyName(variable.name),
          unit,
        };
        if (hasNonDefaultScopes(variable.scopes)) {
          entry.scopes = variable.scopes.slice();
        }
        if (rawValuesByMode && hasAlias) {
          entry.rawValuesByMode = rawValuesByMode;
        }
      }

      variables.push(entry);
    }

    exportedCollections.push({
      id: collection.id,
      name: collection.name,
      modes,
      variables,
    });
  }

  const fileKey = resolveFigmaFileKey();
  const payload = {
    schemaVersion: SCHEMA_VERSION,
    fileName: options.fileName || "portfolio",
    figmaFileKey: fileKey,
    collections: exportedCollections,
  };

  if (!fileKey) {
    warnings.push({
      variable: "(export)",
      mode: "(metadata)",
      message:
        "figmaFileKey unavailable. Re-import the plugin manifest (enablePrivatePluginApi) and run from the open Figma file.",
    });
  }

  if (!lean) {
    payload.exportedAt = new Date().toISOString();
    payload.pluginVersion = PLUGIN_VERSION;
    try {
      payload.documentName = figma.root.name;
    } catch (_error) {
      payload.documentName = null;
    }
    payload.stats = {
      collectionCount: exportedCollections.length,
      variableCount: countVariables(payload),
      modeCount: exportedCollections.reduce((n, c) => n + c.modes.length, 0),
    };
  }

  if (warnings.length > 0) {
    payload.warnings = warnings;
  }

  return payload;
}

function countVariables(payload) {
  return payload.collections.reduce((n, c) => n + c.variables.length, 0);
}

/**
 * File key from the Figma file this plugin is running in (URL segment after /design/).
 * Requires enablePrivatePluginApi in manifest.json for private/dev plugins.
 * @returns {string | null}
 */
function resolveFigmaFileKey() {
  const key = figma.fileKey;
  return typeof key === "string" && key.length > 0 ? key : null;
}

function hasNonDefaultScopes(scopes) {
  if (!Array.isArray(scopes) || scopes.length === 0) return false;
  return !(scopes.length === 1 && scopes[0] === "ALL_SCOPES");
}

/**
 * @param {string} name
 */
function cssCustomPropertyName(name) {
  return (
    "--" +
    String(name)
      .replace(/[^a-zA-Z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

/**
 * @param {string} name
 * @param {string} resolvedType
 * @returns {"px" | "ms" | "deg" | null}
 */
function inferCssUnit(name, resolvedType) {
  if (resolvedType !== "FLOAT") return null;
  const key = name.toLowerCase();
  if (key.includes("angle")) return "deg";
  if (key.includes("distance")) return "px";
  if (key.includes("anim") || key.includes("timing")) return "ms";
  return "px";
}

function resolveVariableValue(variable, modeId, variableById, collectionById, depth = 0) {
  if (depth > MAX_ALIAS_DEPTH) {
    throw new Error(`Alias chain too deep for "${variable.name}"`);
  }

  const value = variable.valuesByMode[modeId];
  if (value === undefined) {
    throw new Error(`Missing value for "${variable.name}" in mode ${modeId}`);
  }

  if (isVariableAlias(value)) {
    const target = variableById.get(value.id);
    if (!target) {
      throw new Error(`Unresolved alias target for "${variable.name}"`);
    }

    let targetModeId = modeId;
    if (target.variableCollectionId !== variable.variableCollectionId) {
      const sourceCollection = collectionById.get(variable.variableCollectionId);
      const targetCollection = collectionById.get(target.variableCollectionId);
      if (sourceCollection && targetCollection) {
        const sourceMode = sourceCollection.modes.find((m) => m.modeId === modeId);
        const mappedMode = sourceMode
          ? targetCollection.modes.find((m) => m.name === sourceMode.name)
          : null;
        if (mappedMode) {
          targetModeId = mappedMode.modeId;
        } else if (targetCollection.modes.length > 0) {
          targetModeId = targetCollection.modes[0].modeId;
        }
      }
    }

    return resolveVariableValue(target, targetModeId, variableById, collectionById, depth + 1);
  }

  return value;
}

function serializeRawValue(value, variableById, resolvedType) {
  if (value === undefined) return null;
  if (isVariableAlias(value)) {
    const target = variableById.get(value.id);
    return {
      type: "ALIAS",
      variableId: value.id,
      variableName: target ? target.name : null,
    };
  }
  if (resolvedType === "COLOR" && isRgba(value)) {
    return rgbToHex(value);
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return null;
}

/**
 * @param {unknown} value
 */
function isVariableAlias(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    /** @type {{ type: string }} */ (value).type === "VARIABLE_ALIAS"
  );
}

/**
 * @param {unknown} value
 */
function isRgba(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    "r" in value &&
    "g" in value &&
    "b" in value
  );
}

/**
 * @param {unknown} value
 * @param {string} resolvedType
 */
function serializeResolvedValue(value, resolvedType) {
  if (resolvedType === "COLOR") {
    return rgbToHex(value);
  }
  if (resolvedType === "BOOLEAN") {
    return Boolean(value);
  }
  if (resolvedType === "FLOAT") {
    return Number(value);
  }
  return String(value);
}

/**
 * @param {{ r: number, g: number, b: number, a?: number }} color
 */
function rgbToHex({ r, g, b, a = 1 }) {
  const toHex = (channel) => {
    const hex = Math.round(channel * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rgb = `${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) {
    const alpha = Math.round(a * 255).toString(16);
    const alphaHex = alpha.length === 1 ? "0" + alpha : alpha;
    return `#${rgb}${alphaHex}`;
  }
  return `#${rgb}`;
}
