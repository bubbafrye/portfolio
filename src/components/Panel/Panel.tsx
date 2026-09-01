import { type ReactNode, useCallback, useRef, useState } from "react";
import { a11yPageCopy } from "../../content/a11yPage";
import type { bodyParagraphs } from "../../content/parseContentCsv";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { ButtonPrimary } from "../ButtonPrimary";
import { ImageInsert } from "../ImageInsert";
import { Insets } from "../Insets";
import { MiniBlock } from "../MiniBlock";
import { PanelHero } from "../PanelHero";
import { PanelRevealSection } from "../PanelRevealSection";
import { TextBlockMain } from "../TextBlockMain";
import { TextBlockSub } from "../TextBlockSub";
import styles from "./Panel.module.css";

/** Min-heights from Figma panel a11y-expanded — reserve scroll space before lazy mount. */
const SECTION_PLACEHOLDER_HEIGHTS = [30, 166, 166, 128, 210, 326, 147, 471, 326, 147, 210] as const;

type Paragraph = ReturnType<typeof bodyParagraphs>[number];

function renderParagraph(para: Paragraph, key: number) {
  if (typeof para === "string") return <p key={key}>{para}</p>;
  return (
    <p key={key}>
      <span className={styles.bold}>{para.bold}</span>
      {para.text}
    </p>
  );
}

function readTokenMs(varName: string): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return Number.parseFloat(raw) || 0;
}

function readTokenPx(varName: string): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return Number.parseFloat(raw) || 0;
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/** Figma panel variants a11y-closed (942:1138) / a11y-expanded (1040:1762). */
export function Panel() {
  const c = a11yPageCopy;
  const reducedMotion = usePrefersReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const [staggerDelays, setStaggerDelays] = useState<number[]>(
    () => new Array(SECTION_PLACEHOLDER_HEIGHTS.length).fill(0),
  );

  const panelRef = useRef<HTMLElement>(null);
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

  const computeStaggerDelays = useCallback((reverse = false) => {
    const stagger = readTokenMs("--anim-timing-stagger");
    const inView: number[] = [];
    slotRefs.current.forEach((el, i) => {
      if (el && isInViewport(el)) inView.push(i);
    });
    const maxOrder = Math.max(0, inView.length - 1);
    return SECTION_PLACEHOLDER_HEIGHTS.map((_, i) => {
      const order = inView.indexOf(i);
      if (order < 0) return 0;
      const step = reverse ? maxOrder - order : order;
      return step * stagger;
    });
  }, []);

  const handleToggle = () => {
    if (expanded) {
      if (reducedMotion) {
        setExpanded(false);
        setStaggerDelays(new Array(SECTION_PLACEHOLDER_HEIGHTS.length).fill(0));
        revealOrderRef.current = 0;
        staggerAssignedRef.current.clear();
        return;
      }
      setCollapsing(true);
      const reverseDelays = computeStaggerDelays(true);
      setStaggerDelays(reverseDelays);
      const maxStagger = Math.max(0, ...reverseDelays);
      const childAnim = Math.max(
        readTokenMs("--anim-slide-in"),
        readTokenMs("--anim-fade-in"),
      );
      const collapseMs = Math.max(readTokenMs("--anim-expand"), maxStagger + childAnim);
      window.setTimeout(() => {
        setExpanded(false);
        setCollapsing(false);
        setStaggerDelays(new Array(SECTION_PLACEHOLDER_HEIGHTS.length).fill(0));
        revealOrderRef.current = 0;
        staggerAssignedRef.current.clear();
      }, collapseMs);
      return;
    }

    revealOrderRef.current = 0;
    staggerAssignedRef.current.clear();
    setStaggerDelays(new Array(SECTION_PLACEHOLDER_HEIGHTS.length).fill(0));
    setExpanded(true);
  };

  const handleBackToTop = () => {
    const panel = panelRef.current;
    if (!panel) return;

    const overshoot = readTokenPx("--layout-panel-back-to-top-overshoot");
    const top = panel.getBoundingClientRect().top + window.scrollY - overshoot;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const reveal = (index: number, placeholderMinHeight: number, child: ReactNode) => (
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

  const panelFigmaName =
    expanded || collapsing ? "panel/a11y-expanded" : "panel/a11y-closed";

  return (
    <article
      ref={panelRef}
      className={[styles.panel, (expanded || collapsing) && styles.panelExpanded].filter(Boolean).join(" ")}
      data-figma-name={panelFigmaName}
    >
      <div className={styles.surfaceClosed} aria-hidden />
      <div className={styles.surfaceExpanded} aria-hidden />

      <div className={styles.foreground}>
        <PanelHero
          title={c.title}
          intro={c.intro}
          expanded={expanded}
          collapsing={collapsing}
          seeMoreLabel="See more"
          closePanelLabel="Close Panel"
          onToggle={handleToggle}
        />

        <div
          className={[styles.bodyGrid, (expanded || collapsing) && styles.bodyGridExpanded]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles.bodyInner}>
            {reveal(0, SECTION_PLACEHOLDER_HEIGHTS[0], <div className={styles.spacer} data-figma-name="spacer" aria-hidden />)}

            {reveal(
              1,
              SECTION_PLACEHOLDER_HEIGHTS[1],
              <TextBlockMain variant="highlighted" figmaName="overview" heading={c.overview.heading}>
                {c.overview.paragraphs.map((para, i) => renderParagraph(para, i))}
              </TextBlockMain>,
            )}

            {reveal(
              2,
              SECTION_PLACEHOLDER_HEIGHTS[2],
              <TextBlockMain figmaName="problem" heading={c.problem.heading}>
                <p>{c.problem.body}</p>
              </TextBlockMain>,
            )}

            {reveal(
              3,
              SECTION_PLACEHOLDER_HEIGHTS[3],
              <TextBlockMain figmaName="approach" heading={c.approach.heading}>
                <p>{c.approach.body}</p>
              </TextBlockMain>,
            )}

            {reveal(
              4,
              SECTION_PLACEHOLDER_HEIGHTS[4],
              <Insets figmaName="inset-approach">
                {c.miniBlocksApproach.map((block, i) => (
                  <MiniBlock
                    key={block.title}
                    figmaName={String(i + 1).padStart(2, "0")}
                    title={block.title}
                    body={block.body}
                  />
                ))}
              </Insets>,
            )}

            {reveal(
              5,
              SECTION_PLACEHOLDER_HEIGHTS[5],
              <ImageInsert variant="variant2" heading={c.colorContrast.heading}>
                {c.colorContrast.paragraphs.map((para, i) => renderParagraph(para, i))}
              </ImageInsert>,
            )}

            {reveal(
              6,
              SECTION_PLACEHOLDER_HEIGHTS[6],
              <TextBlockSub heading={c.keyboardNav.heading}>
                <p>{c.keyboardNav.body}</p>
              </TextBlockSub>,
            )}

            {reveal(
              7,
              SECTION_PLACEHOLDER_HEIGHTS[7],
              <ImageInsert variant="variant4" caption={c.keyboardCaption} />,
            )}

            {reveal(
              8,
              SECTION_PLACEHOLDER_HEIGHTS[8],
              <ImageInsert figmaName="reader" variant="variant3" heading={c.assistiveTech.heading}>
                {c.assistiveTech.paragraphs.map((para, i) => renderParagraph(para, i))}
              </ImageInsert>,
            )}

            {reveal(
              9,
              SECTION_PLACEHOLDER_HEIGHTS[9],
              <TextBlockMain heading={c.result.heading}>
                <p>{c.result.body}</p>
              </TextBlockMain>,
            )}

            {reveal(
              10,
              SECTION_PLACEHOLDER_HEIGHTS[10],
              <Insets figmaName="inset-result">
                {c.miniBlocksResult.map((block, i) => (
                  <MiniBlock
                    key={block.title}
                    figmaName={i === 2 ? "01-mini-block" : String(i + 1).padStart(2, "0")}
                    title={block.title}
                    body={block.body}
                  />
                ))}
              </Insets>,
            )}

            {(expanded || collapsing) && (
              <div className={styles["expand-button"]} data-figma-name="expand-button">
                <ButtonPrimary
                  variant="interactive"
                  className={styles["back-to-top-button"]}
                  onClick={handleBackToTop}
                >
                  Back to top
                </ButtonPrimary>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
