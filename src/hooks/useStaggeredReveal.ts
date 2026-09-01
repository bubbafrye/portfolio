import { useCallback, useRef, useState } from "react";

function readTokenMs(varName: string): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return Number.parseFloat(raw) || 0;
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

export function useStaggeredReveal(sectionCount: number) {
  const [staggerDelays, setStaggerDelays] = useState<number[]>(() => new Array(sectionCount).fill(0));
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealOrderRef = useRef(0);
  const staggerAssignedRef = useRef<Set<number>>(new Set());

  const registerSlot = useCallback((index: number, el: HTMLDivElement | null) => {
    slotRefs.current[index] = el;
  }, []);

  const handleSectionEnterView = useCallback((index: number) => {
    if (staggerAssignedRef.current.has(index)) return;
    staggerAssignedRef.current.add(index);
    const order = revealOrderRef.current++;
    const stagger = readTokenMs("--anim-timing-stagger");
    setStaggerDelays((prev) => {
      const next = [...prev];
      next[index] = order * stagger;
      return next;
    });
  }, []);

  const computeStaggerDelays = useCallback(
    (reverse = false) => {
      const stagger = readTokenMs("--anim-timing-stagger");
      const inView: number[] = [];
      slotRefs.current.forEach((el, i) => {
        if (el && isInViewport(el)) inView.push(i);
      });
      const maxOrder = Math.max(0, inView.length - 1);
      return Array.from({ length: sectionCount }, (_, i) => {
        const order = inView.indexOf(i);
        if (order < 0) return 0;
        const step = reverse ? maxOrder - order : order;
        return step * stagger;
      });
    },
    [sectionCount],
  );

  const resetStagger = useCallback(() => {
    revealOrderRef.current = 0;
    staggerAssignedRef.current.clear();
    setStaggerDelays(new Array(sectionCount).fill(0));
  }, [sectionCount]);

  return {
    staggerDelays,
    setStaggerDelays,
    registerSlot,
    handleSectionEnterView,
    computeStaggerDelays,
    resetStagger,
  };
}
