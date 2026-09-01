import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { themeForCsPanelId } from "../../../design-tokens/tokens";
import { readTokenMs } from "../../hooks/readAnimToken";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useStaggeredReveal } from "../../hooks/useStaggeredReveal";
import { scrollElementToTop } from "../../utils/scrollToElement";
import { CsCloseBtn } from "../CsCloseBtn";
import { SeeMoreBtn } from "../SeeMoreBtn";
import { PanelRevealSection } from "../PanelRevealSection";
import styles from "./CsPanel.module.css";

export type RevealFn = (index: number, placeholderMinHeight: number, child: ReactNode) => ReactNode;

export type CsOverviewProps = {
  title: string;
  heroImage: string;
  heroImageAlt?: string;
  meta: readonly { label: string; value: string }[];
  onClose: () => void;
};

export function CsOverview({ title, heroImage, heroImageAlt = "", meta, onClose }: CsOverviewProps) {
  return (
    <div className={styles.overview} data-figma-name="main-block">
      <div className={styles.heroWrap} data-figma-name="img">
        <img src={heroImage} alt={heroImageAlt} />
      </div>
      <div className={styles.overviewContent} data-figma-name="Content">
        <div className={styles.overviewHeader} data-figma-name="header">
          <div className={styles.overviewText} data-figma-name="Text">
            <h2 className={styles.overviewTitle}>{title}</h2>
          </div>
          <CsCloseBtn onClick={onClose} />
        </div>
        <ul className={styles.metaList}>
          {meta.map((item) => (
            <li key={item.label}>
              <span className={styles.metaLabel}>{item.label}: </span>
              <span className={styles.metaValue}>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export type CsPanelProps = {
  id: string;
  expanded: boolean;
  collapsing: boolean;
  /** Skip opacity fade when swapping between cs-* panels. */
  skipSwapTransition?: boolean;
  revealHeights: readonly number[];
  onCollapseComplete: () => void;
  onBackToTop?: () => void;
  overview: ReactNode;
  renderBody: (reveal: RevealFn) => ReactNode;
};

/** Shared cs-* panel shell — expand/collapse, overview, scroll-reveal body, back to top. */
export function CsPanel({
  id,
  expanded,
  collapsing,
  skipSwapTransition = false,
  revealHeights,
  onCollapseComplete,
  onBackToTop,
  overview,
  renderBody,
}: CsPanelProps) {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [loadHidden, setLoadHidden] = useState(() => skipSwapTransition || !reducedMotion);
  const onCollapseCompleteRef = useRef(onCollapseComplete);
  onCollapseCompleteRef.current = onCollapseComplete;
  const {
    staggerDelays,
    registerSlot,
    handleSectionEnterView,
    resetStagger,
  } = useStaggeredReveal(revealHeights.length);

  const scrollToTop = useCallback(() => {
    if (onBackToTop) {
      onBackToTop();
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    scrollElementToTop(el);
  }, [onBackToTop]);

  useEffect(() => {
    if (!collapsing) {
      setFadingOut(false);
      return;
    }

    if (reducedMotion || skipSwapTransition) {
      resetStagger();
      onCollapseCompleteRef.current();
      return;
    }

    setFadingOut(true);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        fadeTimerRef.current = window.setTimeout(() => {
          resetStagger();
          setFadingOut(false);
          onCollapseCompleteRef.current();
        }, readTokenMs("--anim-module-unload-fade"));
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (fadeTimerRef.current !== null) window.clearTimeout(fadeTimerRef.current);
    };
  }, [collapsing, reducedMotion, resetStagger, skipSwapTransition]);

  useEffect(() => {
    if (skipSwapTransition) {
      setLoadHidden(false);
      return;
    }
    if (reducedMotion || collapsing || fadingOut) return;
    if (!expanded) {
      setLoadHidden(true);
      return;
    }
    setLoadHidden(true);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setLoadHidden(false));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [collapsing, expanded, fadingOut, reducedMotion, skipSwapTransition]);

  const reveal: RevealFn = (index, placeholderMinHeight, child) => (
    <PanelRevealSection
      key={index}
      sectionIndex={index}
      expanded={expanded || collapsing}
      collapsing={collapsing}
      staggerDelayMs={staggerDelays[index] ?? 0}
      placeholderMinHeight={placeholderMinHeight}
      reducedMotion={reducedMotion}
      onSlotRef={(el) => registerSlot(index, el)}
      onEnterView={handleSectionEnterView}
    >
      {child}
    </PanelRevealSection>
  );

  const showBody = expanded || collapsing || fadingOut;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={[styles.panel, loadHidden && styles.panelLoadHidden, fadingOut && styles.panelFadingOut]
        .filter(Boolean)
        .join(" ")}
      data-theme={themeForCsPanelId(id)}
      data-figma-name={id}
      data-expanded={showBody || undefined}
    >
      <div className={styles.inner}>
        {showBody && overview}
        <div
          className={[styles.bodyGrid, showBody && styles.bodyGridExpanded].filter(Boolean).join(" ")}
        >
          <div className={styles.bodyInner}>
            {showBody && renderBody(reveal)}
            {showBody && (
              <div className={styles.btnRow} data-figma-name="btn">
                <SeeMoreBtn direction="point-up" label="Back to top" onClick={scrollToTop} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
