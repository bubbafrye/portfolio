import { CaseStudyModule, type RevealFn } from "../CaseStudyModule";
import {
  CaseStudyBulletResult,
  CaseStudyImageRow,
  CaseStudyKeyboardSection,
  CaseStudyMiniBlocks,
  CaseStudyTextSection,
} from "../CaseStudyBlocks";
import { A11Y_REVEAL_HEIGHTS, a11yCaseStudy } from "../../content/a11yCaseStudy";
import styles from "./A11yCaseStudy.module.css";

type A11yCaseStudyProps = {
  expanded: boolean;
  collapsing: boolean;
  onToggle: () => void;
  onCollapseComplete: () => void;
  hideSummary?: boolean;
  onBackToTop?: () => void;
};

export function A11yCaseStudy({
  expanded,
  collapsing,
  onToggle,
  onCollapseComplete,
  hideSummary,
  onBackToTop,
}: A11yCaseStudyProps) {
  const c = a11yCaseStudy;

  const renderBody = (reveal: RevealFn) => (
    <>
      {reveal(
        0,
        A11Y_REVEAL_HEIGHTS[0],
        <CaseStudyTextSection heading={c.problem.heading} highlighted figmaName="problem">
          <p>{c.problem.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        1,
        A11Y_REVEAL_HEIGHTS[1],
        <CaseStudyTextSection heading={c.approach.heading} figmaName="approach">
          <p>
            Partnering with{" "}
            <a href={c.links.ncam} target="_blank" rel="noreferrer" className={styles.link}>
              NCAM
            </a>
            , a recognized advocate for accessible software, we audited our legacy asset catalog and identified
            critical compliance gaps. To execute efficiently, we established a framework broken into three distinct
            execution streams:
          </p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        2,
        A11Y_REVEAL_HEIGHTS[2],
        <CaseStudyMiniBlocks blocks={c.approachBlocks} figmaName="insets" />,
      )}
      {reveal(
        3,
        A11Y_REVEAL_HEIGHTS[3],
        <CaseStudyImageRow
          heading={c.contrast.heading}
          body={
            <p>
              I spearheaded the fantastic work of{" "}
              <a href={c.links.lynn} target="_blank" rel="noreferrer" className={styles.link}>
                Lynn Bataillon
              </a>
              ,{" "}
              <a href={c.links.tyler} target="_blank" rel="noreferrer" className={styles.link}>
                Tyler Mead
              </a>
              , and{" "}
              <a href={c.links.goose} target="_blank" rel="noreferrer" className={styles.link}>
                Goose Gutierrez
              </a>{" "}
              on a comprehensive color contrast audit of our catalog, consisting of hundreds of base lessons and
              components across three content areas, each with a distinct visual look and feel. This audit gave us a
              foundation to not only build out a library of the necessary contrast updates, but standardize design
              patterns in the different content areas{"  "}
              This applied more consistency to a portfolio spanning 10 years of development, while supporting the 3:1 or
              4.5:1 contrast requirements defined by WCAG.
            </p>
          }
          imageAlt={c.contrast.imageAlt}
          caption={c.contrast.caption}
          layout="contrast"
          figmaName="contrast"
        />,
      )}
      {reveal(
        4,
        A11Y_REVEAL_HEIGHTS[4],
        <CaseStudyKeyboardSection heading={c.keyboard.heading} images={c.keyboard.images}>
          <p>
            For keyboard navigation, I developed rapid, low fidelity{" "}
            <a href={c.links.prototypes} target="_blank" rel="noreferrer" className={styles.link}>
              prototypes
            </a>{" "}
            for some of the more novel interaction patterns and shared those with our partners at NCAM for review. Upon
            approval, refined prototypes were tested with users having various sight levels, from 20/20 vision to
            completely blind.{"  "}
            Those learnings were applied at scale as predictable, repeatable patterns.
          </p>
        </CaseStudyKeyboardSection>,
      )}
      {reveal(
        5,
        A11Y_REVEAL_HEIGHTS[5],
        <CaseStudyImageRow
          heading={c.screenReader.heading}
          body={c.screenReader.body}
          footer={c.screenReader.footer}
          imageSrc={c.screenReader.image}
          imageAlt={c.screenReader.imageAlt}
          caption={c.screenReader.caption}
          mediaPosition="left"
          figmaName="screen-reader"
        />,
      )}
      {reveal(
        6,
        A11Y_REVEAL_HEIGHTS[6],
        <CaseStudyBulletResult heading={c.result.heading} bullets={c.result.bullets} highlighted />,
      )}
      {reveal(
        7,
        A11Y_REVEAL_HEIGHTS[7],
        <CaseStudyMiniBlocks blocks={c.resultBlocks} figmaName="inset-result" />,
      )}
    </>
  );

  return (
    <CaseStudyModule
      id={c.id}
      title={c.title}
      project={c.project}
      role={c.role}
      results={c.summaryResults}
      heroImage={c.heroImage}
      heroImageAlt={c.heroImageAlt}
      heroImageFlip={c.heroImageFlip}
      metaFont="secondary"
      revealHeights={A11Y_REVEAL_HEIGHTS}
      expanded={expanded}
      collapsing={collapsing}
      onToggle={onToggle}
      onCollapseComplete={onCollapseComplete}
      hideSummary={hideSummary}
      onBackToTop={onBackToTop}
      renderExpandedBody={renderBody}
    />
  );
}
