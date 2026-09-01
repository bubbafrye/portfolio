/** Figma 2026 collection mode ids (match `data-theme` in tokens.css). */
export const figmaModes = [
  "root",
  "a11y",
  "park",
  "blast",
  "tools",
  "teams",
  "tl-dr",
  "cs-drag-drop",
  "cs--2",
  "cs--3",
] as const;
export type FigmaMode = (typeof figmaModes)[number];

/** Case-study content ids → Figma theme mode (`team` → `teams`). */
export function themeForCaseStudyId(id: string): FigmaMode {
  if (id === "team") return "teams";
  if ((figmaModes as readonly string[]).includes(id)) return id as FigmaMode;
  return "root";
}

/** cs-* snack panels → Figma 2026 modes (not the same as hash ids). */
export function themeForCsPanelId(id: string): FigmaMode {
  if (id === "cs-drag-drop") return "cs--2";
  if (id === "cs-keyboard-nav") return "cs--3";
  return "root";
}

/** Turn a Figma variable name into a CSS custom property name (matches tokens.css). */
export function cssVarName(figmaVariableName: string): string {
  return `--${figmaVariableName.replace(/[^a-zA-Z0-9-]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

export function setThemeMode(root: HTMLElement, mode: FigmaMode): void {
  root.setAttribute("data-theme", mode);
}
