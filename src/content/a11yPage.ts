import contentCsv from "./content.csv?raw";
import {
  bodyParagraphs,
  indexPageRows,
  parseContentCsv,
  requireRow,
} from "./parseContentCsv";

const byDiv = indexPageRows(parseContentCsv(contentCsv), "a11y");

const content = requireRow(byDiv, "a11y-content");
const overview = requireRow(byDiv, "a11y-overview");
const problem = requireRow(byDiv, "a11y-problem");
const approach = requireRow(byDiv, "a11y-approach");
const contrast = requireRow(byDiv, "a11y-contrast");
const keyboard = requireRow(byDiv, "a11y-keyboard");
const keyboardCaption = requireRow(byDiv, "a11y-keyboard-caption");
const reader = requireRow(byDiv, "a11y-reader");
const result = requireRow(byDiv, "a11y-result");

/** Panel copy for Figma page EXPAND / component a11y-expanded — rows prefixed `a11y-` in src/content/content.csv */
export const a11yPageCopy = {
  title: content.header,
  intro: content.body,
  overview: {
    heading: overview.header,
    paragraphs: bodyParagraphs(overview.body),
  },
  problem: {
    heading: problem.header,
    body: problem.body,
  },
  approach: {
    heading: approach.header,
    body: approach.body,
  },
  miniBlocksApproach: [1, 2, 3].map((n) => {
    const row = requireRow(byDiv, `a11y-inset-approach-${String(n).padStart(2, "0")}`);
    return { title: row.header, body: row.body };
  }),
  colorContrast: {
    heading: contrast.header,
    paragraphs: bodyParagraphs(contrast.body),
  },
  keyboardNav: {
    heading: keyboard.header,
    body: keyboard.body,
  },
  keyboardCaption: keyboardCaption.body,
  assistiveTech: {
    heading: reader.header,
    paragraphs: bodyParagraphs(reader.body),
  },
  result: {
    heading: result.header,
    body: result.body,
  },
  miniBlocksResult: [1, 2, 3].map((n) => {
    const row = requireRow(byDiv, `a11y-inset-result-${String(n).padStart(2, "0")}`);
    return { title: row.header, body: row.body };
  }),
} as const;
