import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./PanelRevealSection.module.css";

export type PanelRevealSectionProps = {
  sectionIndex: number;
  expanded: boolean;
  collapsing: boolean;
  staggerDelayMs: number;
  placeholderMinHeight: number;
  reducedMotion: boolean;
  onSlotRef?: (el: HTMLDivElement | null) => void;
  onEnterView?: (index: number) => void;
  children: ReactNode;
};

/** Reveals body content when scrolled into view; defers mount until intersecting. */
export function PanelRevealSection({
  sectionIndex,
  expanded,
  collapsing,
  staggerDelayMs,
  placeholderMinHeight,
  reducedMotion,
  onSlotRef,
  onEnterView,
  children,
}: PanelRevealSectionProps) {
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setMounted(false);
      setRevealed(false);
      setExiting(false);
    }
  }, [expanded]);

  useEffect(() => {
    if (!collapsing || reducedMotion) {
      setExiting(false);
      return;
    }
    const frame = requestAnimationFrame(() => setExiting(true));
    return () => cancelAnimationFrame(frame);
  }, [collapsing, reducedMotion]);

  useEffect(() => {
    if (!expanded || !slotRef.current) return;

    const node = slotRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        onEnterView?.(sectionIndex);
        setMounted(true);
        observer.disconnect();
      },
      { root: null, rootMargin: "0px 0px 10% 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [expanded, onEnterView, sectionIndex]);

  useEffect(() => {
    if (!mounted || revealed || reducedMotion) return;

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setRevealed(true));
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [mounted, revealed, reducedMotion]);

  useEffect(() => {
    if (mounted && reducedMotion) setRevealed(true);
  }, [mounted, reducedMotion]);

  if (!expanded) return null;

  const setRef = (el: HTMLDivElement | null) => {
    slotRef.current = el;
    onSlotRef?.(el);
  };

  return (
    <div
      ref={setRef}
      className={styles.slot}
      style={!mounted ? { minHeight: placeholderMinHeight } : undefined}
    >
      {mounted && (
        <div
          className={[
            styles.reveal,
            exiting && !reducedMotion ? styles.exiting : undefined,
            !exiting && revealed ? styles.revealed : undefined,
            !exiting && !revealed && !reducedMotion ? styles.pending : undefined,
            reducedMotion && styles.reducedMotion,
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            !reducedMotion && (revealed || exiting)
              ? { transitionDelay: `${staggerDelayMs}ms` }
              : undefined
          }
        >
          {children}
        </div>
      )}
    </div>
  );
}
