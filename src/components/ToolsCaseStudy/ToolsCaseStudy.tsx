import { CaseStudyModule, type RevealFn } from "../CaseStudyModule";
import { CaseStudyProjectCards, CaseStudyTextSection } from "../CaseStudyBlocks";
import { TOOLS_REVEAL_HEIGHTS, toolsCaseStudy } from "../../content/toolsCaseStudy";

type ToolsCaseStudyProps = {
  expanded: boolean;
  collapsing: boolean;
  onToggle: () => void;
  onCollapseComplete: () => void;
  hideSummary?: boolean;
  onBackToTop?: () => void;
};

export function ToolsCaseStudy({
  expanded,
  collapsing,
  onToggle,
  onCollapseComplete,
  hideSummary,
  onBackToTop,
}: ToolsCaseStudyProps) {
  const c = toolsCaseStudy;
  const [spaceRocks, scorekeeper, mathFacts] = c.forFun.projects;

  const renderBody = (reveal: RevealFn) => (
    <>
      {reveal(
        0,
        TOOLS_REVEAL_HEIGHTS[0],
        <CaseStudyTextSection heading={c.forWork.heading} headingSize="md" figmaName="top-text">
          <p>{c.forWork.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        1,
        TOOLS_REVEAL_HEIGHTS[1],
        <CaseStudyProjectCards projects={c.forWork.projects} figmaName="state-sumbissions" />,
      )}
      {reveal(
        2,
        TOOLS_REVEAL_HEIGHTS[2],
        <CaseStudyTextSection heading={c.forFun.heading} headingSize="md" figmaName="top-text">
          <p>{c.forFun.body}</p>
        </CaseStudyTextSection>,
      )}
      {reveal(
        3,
        TOOLS_REVEAL_HEIGHTS[3],
        <CaseStudyProjectCards projects={[spaceRocks, scorekeeper]} figmaName="space-rocks" />,
      )}
      {reveal(
        4,
        TOOLS_REVEAL_HEIGHTS[4],
        <CaseStudyProjectCards projects={[mathFacts]} align="start" figmaName="space-rocks" />,
      )}
    </>
  );

  return (
    <CaseStudyModule
      id={c.id}
      title={c.title}
      intro={c.intro}
      role={c.role}
      heroImage={c.heroImage}
      heroImageAlt={c.heroImageAlt}
      heroImageFlip={c.heroImageFlip}
      metaFont="secondary"
      revealHeights={TOOLS_REVEAL_HEIGHTS}
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
