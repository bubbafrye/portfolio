import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { animateSpring } from "../../utils/springAnimate";
import {
  POINT_DOWN_LAYOUT,
  POINT_UP_LAYOUT,
  POINT_UP_SPRING,
  SEE_MORE_SPRING,
} from "./seeMoreSprings";
import styles from "./SeeMoreBtn.module.css";

const base = import.meta.env.BASE_URL;

export type SeeMoreDirection = "point-down" | "point-up";

/** @deprecated Use direction + label. Kept for existing case-study toggles. */
export type SeeMoreBtnVariant = "read-more" | "collapse" | "back-to-top";

export type SeeMoreBtnProps = {
  direction?: SeeMoreDirection;
  /** @deprecated Maps to direction + label */
  variant?: SeeMoreBtnVariant;
  label?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  "aria-expanded"?: boolean;
  "aria-label"?: string;
};

const LEGACY: Record<
  SeeMoreBtnVariant,
  { direction: SeeMoreDirection; label: string }
> = {
  "read-more": { direction: "point-down", label: "Read More..." },
  collapse: { direction: "point-down", label: "Collapse" },
  "back-to-top": { direction: "point-up", label: "Back to top" },
};

const ASSETS = {
  pointDown: {
    default: `${base}assets/see-more-btn/point-down-default.svg`,
    hover: `${base}assets/see-more-btn/point-down-hover.svg`,
    pressed: `${base}assets/see-more-btn/point-down-pressed.svg`,
    selected: `${base}assets/see-more-btn/point-down-selected.svg`,
  },
  pointUp: {
    default: `${base}assets/see-more-btn/point-up-default.svg`,
    hover: `${base}assets/see-more-btn/point-up-hover.svg`,
    pressed: `${base}assets/see-more-btn/point-up-pressed.svg`,
    selected: `${base}assets/see-more-btn/point-up-selected.svg`,
  },
} as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function preloadAssets() {
  for (const group of Object.values(ASSETS)) {
    for (const src of Object.values(group)) {
      const img = new Image();
      img.src = src;
    }
  }
}

function applyPointerInsets(
  pointer: HTMLElement,
  pointerInner: HTMLElement,
  inset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    innerBottom: number;
  },
) {
  pointer.style.top = `${inset.top}%`;
  pointer.style.right = `${inset.right}%`;
  pointer.style.bottom = `${inset.bottom}%`;
  pointer.style.left = `${inset.left}%`;
  pointerInner.style.bottom = `${inset.innerBottom}%`;
}

/** Figma see-more-btn — point-down / point-up with default, hover, pressed, selected. */
export function SeeMoreBtn({
  direction: directionProp,
  variant,
  label: labelProp,
  selected = false,
  onClick,
  className,
  "aria-expanded": ariaExpanded,
  "aria-label": ariaLabel,
}: SeeMoreBtnProps) {
  const legacy = variant ? LEGACY[variant] : null;
  const direction = directionProp ?? legacy?.direction ?? "point-down";
  const label = labelProp ?? legacy?.label ?? "Read more...";
  const isPointUp = direction === "point-up";
  const reducedMotion = usePrefersReducedMotion();
  const layout = isPointUp ? POINT_UP_LAYOUT : POINT_DOWN_LAYOUT;

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const pointerRef = useRef<HTMLSpanElement>(null);
  const pointerInnerRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    preloadAssets();
  }, []);

  useEffect(() => {
    const pointer = pointerRef.current;
    const pointerInner = pointerInnerRef.current;
    if (!pointer || !pointerInner) return;

    if (!isPointUp && selected) {
      applyPointerInsets(pointer, pointerInner, POINT_DOWN_LAYOUT.pointerSelected);
      return;
    }

    if (selected) return;

    const p = layout.pointer;
    const snapToHover = pressed && !isPointUp;

    const applyProgress = (progress: number) => {
      progressRef.current = progress;
      pointer.style.top = `${lerp(p.top, p.topHover, progress)}%`;
      pointer.style.right = `${lerp(p.right, p.rightHover, progress)}%`;
      pointer.style.bottom = `${lerp(p.bottom, p.bottomHover, progress)}%`;
      pointer.style.left = `${lerp(p.left, p.leftHover, progress)}%`;
      pointerInner.style.bottom = `${lerp(p.innerBottom, p.innerBottomHover, progress)}%`;
    };

    if (snapToHover || (reducedMotion && hovered)) {
      applyProgress(1);
      return;
    }

    if (reducedMotion) {
      applyProgress(0);
      return;
    }

    const target = hovered ? 1 : 0;
    const spring = isPointUp ? POINT_UP_SPRING : SEE_MORE_SPRING;
    return animateSpring(progressRef.current, target, spring, applyProgress);
  }, [hovered, isPointUp, layout, pressed, reducedMotion, selected]);

  const visualPressed = pressed && !selected;
  const assets = isPointUp ? ASSETS.pointUp : ASSETS.pointDown;
  const pointerSrc = selected
    ? assets.selected
    : visualPressed
      ? assets.pressed
      : hovered
        ? assets.hover
        : assets.default;

  const rootClass = [
    styles.root,
    isPointUp ? styles.rootPointUp : styles.rootPointDown,
    isPointUp && selected && styles.rootPointUpSelected,
    isPointUp && visualPressed && styles.rootPointUpPressed,
    !isPointUp && selected && styles.rootPointDownSelected,
    !isPointUp && visualPressed && styles.rootPointDownPressed,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClass = [
    styles.content,
    isPointUp ? styles.contentPointUp : styles.contentPointDown,
    isPointUp && selected && styles.contentPointUpSelected,
    isPointUp && visualPressed && styles.contentPointUpPressed,
    !isPointUp && selected && styles.contentPointDownSelected,
  ]
    .filter(Boolean)
    .join(" ");

  const labelClass = [
    styles.label,
    !isPointUp && selected && styles.labelPointDownSelected,
    isPointUp && selected && styles.labelPointUpSelected,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={rootClass}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onFocus={() => setHovered(true)}
      onBlur={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel ?? label}
      aria-pressed={selected || undefined}
      data-figma-name="see-more-btn"
      data-direction={direction}
      data-selected={selected || undefined}
      {...(variant ? { "data-variant": variant } : {})}
    >
      <span className={contentClass} data-figma-name="content">
        <span
          ref={pointerRef}
          className={isPointUp ? styles.pointerUpWrap : styles.pointerDownWrap}
          aria-hidden
        >
          {isPointUp ? (
            <span className={styles.pointerUpFlip}>
              <span ref={pointerInnerRef} className={styles.pointerArt}>
                <span
                  className={styles.pointerMask}
                  style={{
                    maskImage: `url(${pointerSrc})`,
                    WebkitMaskImage: `url(${pointerSrc})`,
                  }}
                />
              </span>
            </span>
          ) : (
            <span ref={pointerInnerRef} className={styles.pointerArt}>
              <span
                className={styles.pointerMask}
                style={{
                  maskImage: `url(${pointerSrc})`,
                  WebkitMaskImage: `url(${pointerSrc})`,
                }}
              />
            </span>
          )}
        </span>
        <span className={labelClass}>
          <span key={label} className={styles.labelAnim}>
            {label}
          </span>
        </span>
      </span>
    </button>
  );
}
