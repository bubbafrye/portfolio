const base = import.meta.env.BASE_URL;

/** Copy from Figma cs-drag-drop — node 3119:2914 */
export const csDragDropCaseStudy = {
  id: "cs-drag-drop" as const,
  heroImage: `${base}assets/cs-drag-drop/hero.png`,
  heroImageAlt: "Hands using a laptop trackpad",
  overview: {
    title: "Overview",
    meta: [
      { label: "Role", value: "Design Lead" },
      { label: "Timeline", value: "9 months" },
      {
        label: "Goal",
        value:
          "Identify alternate interaction methods for drag-drop for users with less dexterity and those facing hardware challenges.",
      },
    ],
  },
  challenge: {
    heading: "The Challenge",
    problemStatement:
      "Much of the content in DreamBox’s portfolio was built on a mobile-first interaction model, primarily depending on drag-drop to complete tasks.  With contemporary users more often using lower-fidelity Chromebook trackpads, how else might we support the existing set of design patterns while easing the burden of use on the platform?",
    goals: [
      "Users have less strain moving objects on the platform",
      "Minimal refactoring of legacy content",
      "Maintain support for drag-drop where it works, in particular, mobile and touch-enabled devices.",
    ],
    constraints: [
      "With two projects in active development and a major release milestone (BTS) in three months, solutions needed to be proposed and tested before more content was finalized and released.",
    ],
  },
  research: {
    heading: "Research & Key Findings",
    methodology: [
      "I conducted observational user testing with K-2 users using desktop (mouse/keyboard), mobile/touch devices and Chromebook trackpads.",
      "Analyzed student feedback and telemetry data pertaining to task abandonment and completion times across drag-drop activities.",
    ],
    findings: [
      ">30% of K-2 users experienced friction when the dominant interaction model was drag-drop. This percentage rose to >60% when screening out touch and mouse-enabled users.",
      "This informed the hypothesis that motor-skill strain or multi-touch errors while attempting to hold down a trackpad button while dragging an element was likely the key issue.",
    ],
  },
  quotes: [
    {
      quote: "I know how to do this but I can't get it over there.",
      attribution: ["- Student", "Grade 2"],
    },
    {
      quote: "this is dumb. it keeps putting it in the wrong spot.",
      attribution: ["- Student", "Grade 1"],
    },
  ],
  user: {
    heading: "Understanding the User",
    audience:
      "K-2 students using trackpads (specifically Chromebooks).  Secondary audiences would be keyboard power-users and users with adaptive technology.",
    problem:
      "Students using Chromebooks showed sustained pressure on the trackpad was difficult for less-dexterous fingers. This often resulted in repeated ‘drops’ of the targeted object, causing unintentional mistakes or resetting of the problem entirely.  The issue was not in student reasoning, it was a hardware issue meeting a less-forgiving interaction pattern.",
  },
  process: {
    heading: "Design Process",
    ideation: [
      "I continued my research, evaluating the drag-drop paradigm on the platform. It was used widely, and in many cases resulted in auto-completion of a task. This was a pattern that needed to be addressed at scale with minimal refactoring.",
      "I started considering other interaction models like click-select for source and destination, but ruled out ones that inserted an additional, less intuitive steps for users that were comfortable with drag-drop.",
      "I continued exploring more hybrid solutions that would retain the fluidity of drag-drop, but offered an alternate path for those that needed it.",
    ],
    explorationIntro:
      "I looked at multiple cross-platform products to see how this issue may have been resolved elsewhere and began putting together some hypotheses.  Ultimately I built out functional prototypes in Adobe Animate for testing two possible solutions dubbed “Click-stick” and “Long Press”.",
    explorationDetails: [
      {
        term: "Click-stick",
        body: "was built checking the cursor distance from onPress to onMouseMove over a predetermined time.  If that distance was greater than a predetermined amount, then the action was considered a ‘drag’ like normal. If that distance was less than the set amount, then the action was considered a ‘click’ and the object was picked up, parented to the cursor.  A second click, and the object was dropped in place.",
      },
      {
        term: "Long-press",
        body: " was similar to click-stick in that time and distance were used as triggers, only in this case, we added the extra parameter of sustained press duration. This created a more intentional moment for the user to say “I am picking this up”.",
      },
    ],
    prototype: {
      src: `${base}assets/cs-drag-drop/prototype.png`,
      caption: "Recording of a prototype built in Animate for testing alternate drag behaviors.",
    },
    collaboration:
      "I worked closely with my Engineering partners in developing the initial design specifications, sharing my prototypes and written documentation.  From there, we developed a set of variables for time and distance properties that could be changed easily, allowing us to quietly tune the behavior post-release.",
  },
  solution: {
    heading: "The Solution",
    paragraphs: [
      "In addition to internal testing, we presented both solutions to a small cohort of users.",
      "Click-stick was received well, with most users discovering and using it naturally.",
      "Long-press was found to be less discoverable, and at times, confusing when the object was parented to the cursor unintentionally.",
      "The logical choice was Click-stick, and we moved forward with it.  With some small tuning post-release, this became a default behavior added to all drag interactions moving forward.",
    ],
    image: {
      src: `${base}assets/cs-drag-drop/solution-table.png`,
      alt: "Comparison table of click-stick versus long-press",
    },
  },
  results: {
    heading: "Results & Success Metrics",
    body: "After releasing this silent update, there was an immediate rise in student pass rates, as well as a noticeable 10% -40% reduction in mistakes in key lesson groups.  Over time we saw a significant drop in student feedback about lesson difficulty for target lessons, and fewer complaints with newer content as compared to prior releases.",
  },
  learnings: {
    heading: "Learnings",
    body: "Understanding that a ubiquitous behavior like drag-drop may not be the ideal interaction model for all scenarios did not mean throwing out what worked for many. Building out alternative patterns that coexisted with established paradigms was not easy, but addressing those challenges led to a solution that supported more students, causing a >15% drop in negative interaction-related feedback.",
  },
} as const;

/** Min-heights for scroll-reveal — from Figma cs-drag-drop expanded. */
export const CS_DRAG_DROP_REVEAL_HEIGHTS = [420, 390, 204, 300, 1382, 480, 360] as const;
