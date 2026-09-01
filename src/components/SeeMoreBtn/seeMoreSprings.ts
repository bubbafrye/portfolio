import type { SpringConfig } from "../../utils/springAnimate";

/** Figma see-more-btn (1364:2188) — pointer insets from portfolio-2026 */

export const POINT_DOWN_LAYOUT = {
  pointer: {
    top: 34.6,
    right: 0,
    bottom: 2.08,
    left: 0,
    innerBottom: 0.12,
    topHover: 59.6,
    rightHover: 0,
    bottomHover: -22.92,
    leftHover: 0,
    innerBottomHover: 0.12,
  },
  pointerSelected: {
    top: 60.6,
    right: 0,
    bottom: -23.92,
    left: 0,
    innerBottom: 0.12,
  },
} as const;

export const POINT_UP_LAYOUT = {
  pointer: {
    top: 2.6,
    right: 0,
    bottom: 34.08,
    left: 0,
    innerBottom: 0.12,
    topHover: -21.4,
    rightHover: 0,
    bottomHover: 58.08,
    leftHover: 0,
    innerBottomHover: 0.17,
  },
} as const;

export const SEE_MORE_SPRING: SpringConfig = {
  mass: 1,
  stiffness: 193,
  damping: 18,
};

export const POINT_UP_SPRING: SpringConfig = {
  mass: 1,
  stiffness: 211,
  damping: 12.4,
};
