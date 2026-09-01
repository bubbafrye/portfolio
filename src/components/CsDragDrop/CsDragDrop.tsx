import {
  CS_DRAG_DROP_REVEAL_HEIGHTS,
  csDragDropCaseStudy,
} from "../../content/csDragDropCaseStudy";
import { CsDualInset, CsOverview, CsPanel, CsQuoteRow, CsSection, type RevealFn } from "../CsPanel";
import blockStyles from "../CsPanel/CsBlocks.module.css";

type CsDragDropProps = {
  expanded: boolean;
  collapsing: boolean;
  skipSwapTransition?: boolean;
  onClose: () => void;
  onCollapseComplete: () => void;
  onBackToTop?: () => void;
};

export function CsDragDrop({
  expanded,
  collapsing,
  skipSwapTransition,
  onClose,
  onCollapseComplete,
  onBackToTop,
}: CsDragDropProps) {
  const c = csDragDropCaseStudy;

  const renderBody = (reveal: RevealFn) => (
    <>
      {reveal(
        0,
        CS_DRAG_DROP_REVEAL_HEIGHTS[0],
        <CsSection heading={c.challenge.heading}>
          <p>
            <span className={blockStyles.label}>Problem Statement:</span>
          </p>
          <ul>
            <li>{c.challenge.problemStatement}</li>
          </ul>
          <p>
            <span className={blockStyles.label}>Goals & Objectives:</span>
          </p>
          <ul>
            {c.challenge.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
          <p>
            <span className={blockStyles.label}>Constraints:</span>
          </p>
          <ul>
            {c.challenge.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CsSection>,
      )}
      {reveal(
        1,
        CS_DRAG_DROP_REVEAL_HEIGHTS[1],
        <CsSection heading={c.research.heading}>
          <p>
            <span className={blockStyles.label}>Methodology:</span>
          </p>
          <ul>
            {c.research.methodology.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <span className={blockStyles.label}>Key Findings:</span>
          </p>
          <ul>
            {c.research.findings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CsSection>,
      )}
      {reveal(
        2,
        CS_DRAG_DROP_REVEAL_HEIGHTS[2],
        <CsQuoteRow quotes={c.quotes} />,
      )}
      {reveal(
        3,
        CS_DRAG_DROP_REVEAL_HEIGHTS[3],
        <CsSection heading={c.user.heading}>
          <p>
            <span className={blockStyles.label}>Target Audience:</span>
          </p>
          <ul>
            <li>{c.user.audience}</li>
          </ul>
          <p>Problem to be Solved:</p>
          <ul>
            <li>{c.user.problem}</li>
          </ul>
        </CsSection>,
      )}
      {reveal(
        4,
        CS_DRAG_DROP_REVEAL_HEIGHTS[4],
        <CsSection heading={c.process.heading}>
          <p className={blockStyles.subheading}>Ideation</p>
          <ul>
            {c.process.ideation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={blockStyles.subheading}>Exploration:</p>
          <ul className={blockStyles.nestedList}>
            <li>{c.process.explorationIntro}</li>
            <ul>
              {c.process.explorationDetails.map((item) => (
                <li key={item.term}>
                  <span className={blockStyles.label}>{item.term} </span>
                  {item.body}
                </li>
              ))}
            </ul>
          </ul>
          <figure className={blockStyles.processMedia}>
            <video
              src={c.process.prototype.src}
              controls
              playsInline
              preload="metadata"
              aria-label={c.process.prototype.caption}
            />
            <figcaption>{c.process.prototype.caption}</figcaption>
          </figure>
          <p className={blockStyles.subheading}>Collaboration:</p>
          <ul>
            <li>{c.process.collaboration}</li>
          </ul>
        </CsSection>,
      )}
      {reveal(
        5,
        CS_DRAG_DROP_REVEAL_HEIGHTS[5],
        <CsSection heading={c.solution.heading}>
          <div className={blockStyles.solutionRow}>
            <div className={blockStyles.solutionText}>
              {c.solution.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <figure className={blockStyles.solutionImage}>
              <img src={c.solution.image.src} alt={c.solution.image.alt} />
            </figure>
          </div>
        </CsSection>,
      )}
      {reveal(
        6,
        CS_DRAG_DROP_REVEAL_HEIGHTS[6],
        <CsDualInset
          left={{ heading: c.results.heading, body: c.results.body }}
          right={{ heading: c.learnings.heading, body: c.learnings.body }}
        />,
      )}
    </>
  );

  return (
    <CsPanel
      id={c.id}
      expanded={expanded}
      collapsing={collapsing}
      skipSwapTransition={skipSwapTransition}
      revealHeights={CS_DRAG_DROP_REVEAL_HEIGHTS}
      onCollapseComplete={onCollapseComplete}
      onBackToTop={onBackToTop}
      overview={
        <CsOverview
          title={c.overview.title}
          heroImage={c.heroImage}
          heroImageAlt={c.heroImageAlt}
          meta={c.overview.meta}
          onClose={onClose}
        />
      }
      renderBody={renderBody}
    />
  );
}
