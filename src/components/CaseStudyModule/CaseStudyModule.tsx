import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { themeForCaseStudyId } from "../../../design-tokens/tokens";
import { readTokenMs } from "../../hooks/readAnimToken";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useStaggeredReveal } from "../../hooks/useStaggeredReveal";
import { scrollElementToTop } from "../../utils/scrollToElement";
import { PanelRevealSection } from "../PanelRevealSection";
import { CaseStudyBackToTop, CaseStudySummary } from "../CaseStudySummary";
import styles from "./CaseStudyModule.module.css";

export type RevealFn = (index: number, placeholderMinHeight: number, child: ReactNode) => ReactNode;

export type CaseStudyModuleProps = {
  id: string;
  title: string;
  project?: string;
  intro?: string;
  role: string;
  results?: readonly string[];
  resultsLabel?: string;
  resultsContent?: ReactNode;
  heroImage: string;
  heroImageAlt?: string;
  heroImageFlip?: boolean;
  heroImageRounded?: boolean;
  heroImageBorderMuted?: boolean;
  metaFont?: "primary" | "secondary";
  revealHeights: readonly number[];
  expanded: boolean;
  collapsing: boolean;
  onToggle: () => void;
  onCollapseComplete: () => void;
  hideSummary?: boolean;
  onBackToTop?: () => void;
  renderExpandedBody: (reveal: RevealFn) => ReactNode;
};

export function CaseStudyModule({
  id,
  title,
  project,
  intro,
  role,
  results,
  resultsLabel,
  resultsContent,
  heroImage,
  heroImageAlt,
  heroImageFlip,
  heroImageRounded,
  heroImageBorderMuted,
  metaFont,
  revealHeights,
  expanded,
  collapsing,
  onToggle,
  onCollapseComplete,
  hideSummary = false,
  onBackToTop,
  renderExpandedBody,
}: CaseStudyModuleProps) {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const collapseTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [loadHidden, setLoadHidden] = useState(() => !reducedMotion);
  const onCollapseCompleteRef = useRef(onCollapseComplete);
  onCollapseCompleteRef.current = onCollapseComplete;
  const {
    staggerDelays,
    setStaggerDelays,
    registerSlot,
    handleSectionEnterView,
    computeStaggerDelays,
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

    if (reducedMotion) {
      resetStagger();
      onCollapseCompleteRef.current();
      return;
    }

    if (hideSummary) {
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
        if (fadeTimerRef.current !== null) {
          window.clearTimeout(fadeTimerRef.current);
        }
      };
    }

    const reverseDelays = computeStaggerDelays(true);
    setStaggerDelays(reverseDelays);
    const maxStagger = Math.max(0, ...reverseDelays);
    const childAnim = Math.max(
      readTokenMs("--anim-slide-in"),
      readTokenMs("--anim-fade-in"),
    );
    const collapseMs = Math.max(readTokenMs("--anim-expand"), maxStagger + childAnim);

    collapseTimerRef.current = window.setTimeout(() => {
      resetStagger();
      setFadingOut(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fadeTimerRef.current = window.setTimeout(() => {
            setFadingOut(false);
            onCollapseCompleteRef.current();
          }, readTokenMs("--anim-module-unload-fade"));
        });
      });
    }, collapseMs);

    return () => {
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current);
      }
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
      }
    };
  }, [
    collapsing,
    computeStaggerDelays,
    hideSummary,
    reducedMotion,
    resetStagger,
    setStaggerDelays,
  ]);

  useEffect(() => {
    if (reducedMotion || collapsing || fadingOut) return;

    if (!expanded) {
      setLoadHidden(true);
      return;
    }

    setLoadHidden(true);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setLoadHidden(false);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [collapsing, expanded, fadingOut, reducedMotion]);

  useEffect(() => {
    if (!expanded || collapsing || hideSummary) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToTop());
    });
  }, [collapsing, expanded, hideSummary, scrollToTop]);

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
      className={[styles.module, loadHidden && styles.moduleLoadHidden, fadingOut && styles.moduleFadingOut]
        .filter(Boolean)
        .join(" ")}
      data-theme={themeForCaseStudyId(id)}
      data-figma-name={id}
      data-expanded={showBody || undefined}
    >
      <div className={styles.inner}>
        {!hideSummary && (
          <CaseStudySummary
            title={title}
            project={project}
            intro={intro}
            role={role}
            results={results}
            resultsLabel={resultsLabel}
            resultsContent={resultsContent}
            heroImage={heroImage}
            heroImageAlt={heroImageAlt}
            heroImageFlip={heroImageFlip}
            heroImageRounded={heroImageRounded}
            heroImageBorderMuted={heroImageBorderMuted}
            metaFont={metaFont}
            expanded={showBody}
            onToggle={onToggle}
          />
        )}

        <div className={[styles.bodyGrid, showBody && styles.bodyGridExpanded, hideSummary && styles.bodyGridOnly].filter(Boolean).join(" ")}>
          <div className={styles.bodyInner}>
            {showBody && renderExpandedBody(reveal)}
            {showBody && <CaseStudyBackToTop onClick={scrollToTop} />}
          </div>
        </div>

      </div>
    </section>
  );
}
