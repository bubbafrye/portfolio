import { CaseStudyModule, type RevealFn } from "../CaseStudyModule";
import { BlockCarousel } from "../BlockCarousel";
import {
  CaseStudyBulletResult,
  CaseStudyImageRow,
  CaseStudyImageStrip,
  CaseStudyMiniBlocks,
  CaseStudySubSection,
  CaseStudyTextSection,
} from "../CaseStudyBlocks";
import { BLAST_REVEAL_HEIGHTS, blastCaseStudy } from "../../content/blastCaseStudy";

type BlastCaseStudyProps = {
  expanded: boolean;
  collapsing: boolean;
  onToggle: () => void;
  onCollapseComplete: () => void;
  hideSummary?: boolean;
  onBackToTop?: () => void;
};

export function BlastCaseStudy({
  expanded,
  collapsing,
  onToggle,
  onCollapseComplete,
  hideSummary,
  onBackToTop,
}: BlastCaseStudyProps) {
  const c = blastCaseStudy;

  const renderBody = (reveal: RevealFn) => (
    <>
      {reveal(
        0,
        BLAST_REVEAL_HEIGHTS[0],
        <CaseStudyTextSection heading={c.problem.heading} highlighted figmaName="problem">
          <p>{c.problem.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        1,
        BLAST_REVEAL_HEIGHTS[1],
        <CaseStudyTextSection heading={c.approach.heading} figmaName="approach">
          <p>{c.approach.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        2,
        BLAST_REVEAL_HEIGHTS[2],
        <CaseStudyMiniBlocks
          blocks={c.approachBlocks}
          columns={2}
          figmaName="inset-approach"
        />,
      )}
      {reveal(
        3,
        BLAST_REVEAL_HEIGHTS[3],
        <CaseStudyTextSection figmaName="top-text">
          <p style={{ whiteSpace: "pre-wrap" }}>{c.narrative}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        4,
        BLAST_REVEAL_HEIGHTS[4],
        <BlockCarousel
          heading={c.dialogsCarousel.heading}
          slides={c.dialogsCarousel.slides}
          layout="image-right"
          figmaName="dialogs"
        >
          {c.dialogsCarousel.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </BlockCarousel>,
      )}
      {reveal(
        5,
        BLAST_REVEAL_HEIGHTS[5],
        <CaseStudyImageRow
          heading={c.stickems.heading}
          body={c.stickems.body}
          imageSrc={c.stickems.image}
          imageAlt={c.stickems.imageAlt}
          caption={c.stickems.caption}
          mediaPosition="left"
        />,
      )}
      {reveal(
        6,
        BLAST_REVEAL_HEIGHTS[6],
        <CaseStudyImageStrip intro={c.stickemStrip.intro} images={c.stickemStrip.images} />,
      )}
      {reveal(
        7,
        BLAST_REVEAL_HEIGHTS[7],
        <CaseStudySubSection heading={c.tournament.heading} images={c.tournament.images}>
          <p>{c.tournament.body}</p>
        </CaseStudySubSection>,
      )}
      {reveal(
        8,
        BLAST_REVEAL_HEIGHTS[8],
        <CaseStudyBulletResult heading={c.result.heading} bullets={c.result.bullets} highlighted />,
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
      heroImageRounded={c.heroImageRounded}
      metaFont="secondary"
      revealHeights={BLAST_REVEAL_HEIGHTS}
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
