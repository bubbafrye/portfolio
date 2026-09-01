import type { SpringConfig } from "../../utils/springAnimate";

/** Figma close (3170:4935) — SMART_ANIMATE scale spring */
export const CLOSE_BTN_SPRING: SpringConfig = {
  mass: 1,
  stiffness: 193,
  damping: 18,
};

/** Measured from Figma variants 1404:1422 → 3170:4936. */
export const CLOSE_BTN_LAYOUT = {
  x: {
    scaleDefault: 1,
    /** 4.4439 / 12.4455 — closed-default → closed-hover */
    scaleHover: 4.443854331970215 / 12.445541381835938,
  },
  up: {
    /** 1×1 px polygon → 16×16 px polygon */
    scaleDefault: 1 / 16,
    scaleHover: 1,
  },
} as const;

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
