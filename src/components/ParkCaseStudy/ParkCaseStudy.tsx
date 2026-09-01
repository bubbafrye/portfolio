import { CaseStudyModule, type RevealFn } from "../CaseStudyModule";
import { BlockCarousel } from "../BlockCarousel";
import {
  CaseStudyBulletResult,
  CaseStudyDualImages,
  CaseStudyImageGallery,
  CaseStudyImageRow,
  CaseStudyMiniBlocks,
  CaseStudyTextSection,
} from "../CaseStudyBlocks";
import { PARK_REVEAL_HEIGHTS, parkCaseStudy } from "../../content/parkCaseStudy";

type ParkCaseStudyProps = {
  expanded: boolean;
  collapsing: boolean;
  onToggle: () => void;
  onCollapseComplete: () => void;
  hideSummary?: boolean;
  onBackToTop?: () => void;
};

export function ParkCaseStudy({
  expanded,
  collapsing,
  onToggle,
  onCollapseComplete,
  hideSummary,
  onBackToTop,
}: ParkCaseStudyProps) {
  const c = parkCaseStudy;

  const renderBody = (reveal: RevealFn) => (
    <>
      {reveal(
        0,
        PARK_REVEAL_HEIGHTS[0],
        <CaseStudyTextSection heading={c.problem.heading} highlighted figmaName="problem">
          <p>{c.problem.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        1,
        PARK_REVEAL_HEIGHTS[1],
        <CaseStudyTextSection heading={c.approach.heading} figmaName="approach">
          <p>{c.approach.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        2,
        PARK_REVEAL_HEIGHTS[2],
        <CaseStudyMiniBlocks
          blocks={c.approachBlocks}
          columns={2}
          figmaName="inset-approach"
        />,
      )}
      {reveal(
        3,
        PARK_REVEAL_HEIGHTS[3],
        <CaseStudyTextSection heading={c.engagementIntro.heading} figmaName="top-text">
          <p>{c.engagementIntro.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        4,
        PARK_REVEAL_HEIGHTS[4],
        <CaseStudyImageRow
          heading={c.story.heading}
          body={c.story.body}
          imageSrc={c.story.image}
          imageAlt={c.story.imageAlt}
          caption={c.story.caption}
          footer={c.story.footer}
        />,
      )}
      {reveal(
        5,
        PARK_REVEAL_HEIGHTS[5],
        <BlockCarousel
          heading={c.collectionsCarousel.heading}
          slides={c.collectionsCarousel.slides}
          layout="image-left"
        >
          {c.collectionsCarousel.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </BlockCarousel>,
      )}
      {reveal(
        6,
        PARK_REVEAL_HEIGHTS[6],
        <CaseStudyImageGallery
          intro={
            <p>
              {c.squiggleBook.introLead}
              <strong>{c.squiggleBook.introBold}</strong>
              {c.squiggleBook.introRest}
            </p>
          }
          images={c.squiggleBook.images}
        />,
      )}
      {reveal(
        7,
        PARK_REVEAL_HEIGHTS[7],
        <CaseStudyTextSection heading={c.questSystem.heading} figmaName="text-block-sub">
          <p style={{ whiteSpace: "pre-wrap" }}>{c.questSystem.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        8,
        PARK_REVEAL_HEIGHTS[8],
        <CaseStudyImageRow
          body={c.questSystem.mapBody}
          imageSrc={c.questSystem.mapImage}
          imageAlt={c.questSystem.mapAlt}
          caption={c.questSystem.mapCaption}
          mediaPosition="left"
        />,
      )}
      {reveal(
        9,
        PARK_REVEAL_HEIGHTS[9],
        <CaseStudyDualImages images={c.questSystem.flowImages} />,
      )}
      {reveal(
        10,
        PARK_REVEAL_HEIGHTS[10],
        <CaseStudyBulletResult heading={c.result.heading} bullets={c.result.bullets} highlighted />,
      )}
      {reveal(
        11,
        PARK_REVEAL_HEIGHTS[11],
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
      heroImageRounded={c.heroImageRounded}
      metaFont="secondary"
      revealHeights={PARK_REVEAL_HEIGHTS}
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
