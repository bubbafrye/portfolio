import { CS_HASH_IDS, type CsHashId, isCsHashId } from "../content/tlDrLinks";

export const CASE_STUDY_HASH_IDS = ["a11y", "park", "blast", "team", "tools"] as const;
export type CaseStudyHashId = (typeof CASE_STUDY_HASH_IDS)[number];

export type DeepLinkTarget =
  | { type: "case-study"; id: CaseStudyHashId }
  | { type: "cs-panel"; id: CsHashId }
  | { type: "section"; id: "projects" | "teams-tools" }
  | { type: "resume" }
  | { type: "none" };

const CASE_STUDY_SET = new Set<string>(CASE_STUDY_HASH_IDS);

export function isCaseStudyHashId(value: string): value is CaseStudyHashId {
  return CASE_STUDY_SET.has(value);
}

export { CS_HASH_IDS, isCsHashId, type CsHashId };

/** Read current location hash without the leading `#`. */
export function readLocationHash(): string {
  return window.location.hash.replace(/^#/, "");
}

export function parseDeepLinkHash(hash = readLocationHash()): DeepLinkTarget {
  const id = hash.trim().toLowerCase();
  if (!id) return { type: "none" };
  if (id === "resume") return { type: "resume" };
  if (id === "projects") return { type: "section", id: "projects" };
  if (id === "teams" || id === "teams-tools") return { type: "section", id: "teams-tools" };
  if (isCsHashId(id)) return { type: "cs-panel", id };
  if (isCaseStudyHashId(id)) return { type: "case-study", id };
  return { type: "none" };
}

/** Hash that should represent the current UI (cs panel, case study, or resume). */
export function hashForOpenState(
  openCsId: CsHashId | null,
  openCaseStudyId: CaseStudyHashId | null,
  resumeOpen: boolean,
): string | null {
  if (resumeOpen) return "resume";
  if (openCsId) return openCsId;
  if (openCaseStudyId) return openCaseStudyId;
  return null;
}

/**
 * Update the URL hash without scrolling.
 * `push` creates history entries (back/forward); `replace` syncs quietly.
 */
export function writeLocationHash(hash: string, mode: "replace" | "push" = "replace") {
  const next = hash ? `#${hash}` : "";
  const current = window.location.hash;
  if (next === current) return;
  if (!next && current === "") return;

  const url = next || `${window.location.pathname}${window.location.search}`;
  if (mode === "push") {
    window.history.pushState(null, "", url);
  } else {
    window.history.replaceState(null, "", url);
  }
}
