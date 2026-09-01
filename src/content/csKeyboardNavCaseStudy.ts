const base = import.meta.env.BASE_URL;

/** Copy from Figma cs-keyboard-nav — node 3124:3971 */
export const csKeyboardNavCaseStudy = {
  id: "cs-keyboard-nav" as const,
  heroImage: `${base}assets/cs-keyboard-nav/hero.png`,
  heroImageAlt: "Hands typing on a keyboard",
  overview: {
    title: "Overview",
    meta: [
      { label: "Role", value: "Design Lead" },
      { label: "Timeline", value: "3 months" },
      {
        label: "Goal",
        value: "Identify keyboard-native navigation scheme for rich media content with nested groups.",
      },
    ],
  },
  challenge: {
    heading: "The Challenge",
    problemStatement:
      "How do we make hundreds of interactive lesson experiences built using nested content areas and highly manipulative interfaces easily navigable with only a keyboard?",
    goals: [
      "Users are able to access all content via keyboard easily, using predictable patterns.",
      "Existing content should remain unchanged without evidence that current patterns are not effective.",
    ],
    constraints: [
      "With new legislation pushing WCAG standards compliance to the forefront, we needed a viable solution immediately that could be applied at scale.",
    ],
  },
  research: {
    heading: "Research & Key Findings",
    methodology: [
      "I reviewed WCAG guidelines to find out what the core requirements must be.",
      "I engaged with the A11y community looking for references on what were considered highly accessible sites, then did heuristics on three of the more well-received recommendations.",
    ],
    findings: [
      ">30% of K-2 users experienced friction when the dominant interaction model was drag-drop. This percentage rose to >60% when screening out touch and mouse-enabled users.",
      "This informed the hypothesis that motor-skill strain or multi-touch errors while attempting to hold down a trackpad button while dragging an element was likely the key issue.",
    ],
    image: {
      src: `${base}assets/cs-keyboard-nav/heuristic.png`,
      caption: "Heuristic analysis of highly-regarded A11y-accessible sites.",
    },
  },
  user: {
    heading: "Understanding the User",
    audience:
      "Users using keyboard (or mapped peripheral) as near-exclusive input medium. While not limited to sight-impared users or those using screen readers, they do make up a significant portion of the demographic.",
    problem:
      "Keyboard-only navigation must be fluid enough to access and move nested content from one region to another, without requiring an unreasonable number of stops and keypresses.",
  },
  process: {
    heading: "Design Process",
    ideation:
      "After evaluating external content done well and our internal content structure, I identified two of our larger problem areas to address: the sheer number of touchpoints to navigate (several dozen in most cases) and interactions that relied on drag-drop to move an asset from one nested structure to another.",
    explorationIntro:
      "In trying to solve for one issue, I often found myself solving for the other - so many assets lived in groups, and those groups had to talk.",
    explorationBullets: [
      "I put together a variety of rapid prototypes dealing with this compartmentalization of information and shared them throughout the organization seeking feedback.",
      "These rapid tests showed promise with a navigation scheme built upon primary and secondary movement - tab across groups, and then move within a group. I built a new prototype modeling this action and sent it to a third party A11y parter we were working with for review and received their validation.",
      "After further refinement, I then presented that prototype to a panel of sight-impaired users and gave them a series of tasks to complete, which they did fluidly.",
    ],
    prototype: {
      type: "video" as const,
      src: `${base}assets/video/keyboard-nav-prototype.mp4`,
      caption: "Recording of a prototype built in Animate for testing alternate drag behaviors.",
    },
    collaboration:
      "Throughout this process I worked closely with my Product team, Engineering, and third-party auditors to ensure clean and clear objectives were met.",
  },
  solution: {
    heading: "The Solution",
    paragraphs: [
      "We built out a navigation layer over our catalog of 100’s of lessons, using <tab> to traverse the major landmarks of the page, and <arrows> to navigate within those landmarks.  Landmarks could include rows or columns of content, or a grid of draggable objects, or a drawing canvas with preset shapes.",
      "This gave the user the ability to navigate the page quickly, while also being able to drill in to a nested area with minimal effort.  By mapping this flow to common ARIA patterns, we laid the groundwork for screen reader support along the way.",
    ],
    image: {
      type: "video" as const,
      src: `${base}assets/video/rationalRods.mp4`,
      alt: "Video of live lesson, navigated via keyboard using arrows, tab and space",
    },
  },
  results: {
    heading: "Results & Success Metrics",
    body: "In just a few months we were able to move from a content library filled with inaccessible content to a portfolio of rich media that could be manipulated by just a keyboard.  In some cases, data showed that users were adopting use of the keyboard for redundant tasks even when not needed, citing it was easier than switching back between the mouse or trackpad.",
  },
  learnings: {
    heading: "Learnings",
    body: "As any designer will tell you, accessible design benefits all.  That was absolutely true in this case, as more users were able to access our content than before, and existing users found it more intuitive and easier to accomplish tasks once these updates were added.",
  },
} as const;

/** Min-heights for scroll-reveal — from Figma cs-keyboard-nav expanded. */
export const CS_KEYBOARD_NAV_REVEAL_HEIGHTS = [420, 390, 300, 924, 480, 360] as const;
