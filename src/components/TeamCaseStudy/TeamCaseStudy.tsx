import { CaseStudyModule, type RevealFn } from "../CaseStudyModule";
import {
  CaseStudyAccentDetailSection,
  CaseStudyMiniBlocks,
  CaseStudyTextSection,
  CaseStudyWideImage,
} from "../CaseStudyBlocks";
import { TEAM_REVEAL_HEIGHTS, teamCaseStudy } from "../../content/teamCaseStudy";
import styles from "./TeamCaseStudy.module.css";

type TeamCaseStudyProps = {
  expanded: boolean;
  collapsing: boolean;
  onToggle: () => void;
  onCollapseComplete: () => void;
  hideSummary?: boolean;
  onBackToTop?: () => void;
};

export function TeamCaseStudy({
  expanded,
  collapsing,
  onToggle,
  onCollapseComplete,
  hideSummary,
  onBackToTop,
}: TeamCaseStudyProps) {
  const c = teamCaseStudy;

  const hierarchyContent = (
    <ul className={styles.hierarchy}>
      {c.hierarchy.map((item) => (
        <li key={item.label}>
          <strong>{item.label}</strong>
          {item.text}
        </li>
      ))}
    </ul>
  );

  const renderBody = (reveal: RevealFn) => (
    <>
      {reveal(
        0,
        TEAM_REVEAL_HEIGHTS[0],
        <CaseStudyTextSection heading={c.philosophy.heading} highlighted figmaName="problem">
          <p>{c.philosophy.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        1,
        TEAM_REVEAL_HEIGHTS[1],
        <CaseStudyMiniBlocks blocks={c.approachBlocks} figmaName="insets" />,
      )}
      {reveal(
        2,
        TEAM_REVEAL_HEIGHTS[2],
        <CaseStudyAccentDetailSection
          heading={c.people.heading}
          intro={c.people.body}
          challenge={c.people.challenge}
          resolution={c.people.resolution}
          figmaName="people"
        />,
      )}
      {reveal(
        3,
        TEAM_REVEAL_HEIGHTS[3],
        <CaseStudyAccentDetailSection
          heading={c.process.heading}
          intro={c.process.intro}
          detailText={c.process.detailText}
          imageSrc={c.process.image}
          imageAlt={c.process.imageAlt}
          caption={c.process.caption}
          challenge={c.process.challenge}
          resolution={c.process.resolution}
          figmaName="process"
        />,
      )}
      {reveal(
        4,
        TEAM_REVEAL_HEIGHTS[4],
        <CaseStudyAccentDetailSection
          heading={c.product.heading}
          intro={c.product.body}
          challenge={c.product.challenge}
          resolution={c.product.resolution}
          figmaName="product"
        />,
      )}
      {reveal(
        5,
        TEAM_REVEAL_HEIGHTS[5],
        <CaseStudyWideImage
          src={c.processDiagram}
          alt={c.processDiagramAlt}
          caption={c.processDiagramCaption}
          fixedHeight={200}
          figmaName="image 5"
        />,
      )}
    </>
  );

  return (
    <CaseStudyModule
      id={c.id}
      title={c.title}
      intro={c.intro}
      role={c.role}
      resultsLabel="Hierarchy of Importance:"
      resultsContent={hierarchyContent}
      heroImage={c.heroImage}
      heroImageAlt={c.heroImageAlt}
      heroImageRounded={c.heroImageRounded}
      heroImageBorderMuted={c.heroImageBorderMuted}
      metaFont="primary"
      revealHeights={TEAM_REVEAL_HEIGHTS}
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
