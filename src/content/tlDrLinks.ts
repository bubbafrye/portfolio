export const CS_HASH_IDS = ["cs-drag-drop", "cs-keyboard-nav"] as const;
export type CsHashId = (typeof CS_HASH_IDS)[number];

export const TL_DR_LINKS = [
  { id: "cs-drag-drop" as const, label: "Drag-Drop Alternative" },
  { id: "cs-keyboard-nav" as const, label: "Keyboard Navigation" },
] as const;

const CS_HASH_SET = new Set<string>(CS_HASH_IDS);

export function isCsHashId(value: string): value is CsHashId {
  return CS_HASH_SET.has(value);
}
