/** ease-out cubic — matches --anim-ease-out: cubic-bezier(0, 0, 0.2, 1) */
function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export const SECTION_SCROLL_DURATION_MS = 800;
export const PANEL_SCROLL_TOP_OFFSET_PX = 250;

let activeScrollFrame = 0;

function getScrollTargetY(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const scrollMarginTop = parseFloat(style.scrollMarginTop) || 0;
  return window.scrollY + element.getBoundingClientRect().top - scrollMarginTop;
}

function getScrollTargetYWithOffset(element: HTMLElement, topOffsetPx: number) {
  return window.scrollY + element.getBoundingClientRect().top - topOffsetPx;
}

function getMaxScrollY() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function scrollToY(endY: number, durationMs = SECTION_SCROLL_DURATION_MS) {
  if (activeScrollFrame) {
    cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = 0;
  }

  const startY = window.scrollY;
  const clampedEndY = Math.min(endY, getMaxScrollY());
  const distance = clampedEndY - startY;

  if (Math.abs(distance) < 1) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: clampedEndY, behavior: "instant" });
    return;
  }

  const startTime = performance.now();

  const tick = (now: number) => {
    const t = Math.min((now - startTime) / durationMs, 1);
    window.scrollTo({ top: startY + distance * easeOut(t), behavior: "instant" });
    if (t < 1) {
      activeScrollFrame = requestAnimationFrame(tick);
    } else {
      activeScrollFrame = 0;
    }
  };

  activeScrollFrame = requestAnimationFrame(tick);
}

export function scrollElementToTop(element: HTMLElement, durationMs = SECTION_SCROLL_DURATION_MS) {
  scrollToY(getScrollTargetY(element), durationMs);
}

/** Scroll so the element's top edge sits `topOffsetPx` below the viewport top. */
export function scrollElementToOffset(
  element: HTMLElement,
  topOffsetPx: number,
  durationMs = SECTION_SCROLL_DURATION_MS,
) {
  scrollToY(getScrollTargetYWithOffset(element, topOffsetPx), durationMs);
}
