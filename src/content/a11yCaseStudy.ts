const base = import.meta.env.BASE_URL;

/** Copy from Figma a11y expanded — node 1367:2635 */
export const a11yCaseStudy = {
  id: "a11y" as const,
  title: "DreamBox Accessibility",
  heroImage: `${base}assets/main-page/a11y-hero.png`,
  heroImageAlt:
    "Illustration of a laptop with an accessibility icon surrounded by colorful puzzle pieces representing speech, vision, keyboard, and hearing accessibility.",
  heroImageFlip: true,
  project:
    "Redesign the DreamBox Math K-8 platform to achieve WCAG 2.1 AA compliance while preserving hundreds of unique learning experiences.",
  role: "Design Lead",
  summaryResults: [
    "Over 3600 lessons updated to align to accessible color contrast, keyboard navigation and assistive technology conventions.",
    "$4M in ARR protected, with another $1.5M in expansion secured.",
    "Opened an additional 80% market share for available RFP.",
  ],
  problem: {
    heading: "The Problem:",
    body: `Over ten years of rapid feature growth left DreamBox with significant design debt and a massive catalog of interactive, media-rich educational content that wasn't accessible. As school districts are increasingly mandating accessibility compliance, we needed to systematically transition our platform to meet WCAG 2.1 AA standards, opening up our learning tools to thousands of students previously blocked by UX barriers.`,
  },
  approach: {
    heading: "The Approach:",
    body: `Partnering with NCAM, a recognized advocate for accessible software, we audited our legacy asset catalog and identified critical compliance gaps. To execute efficiently, we established a framework broken into three distinct execution streams:`,
  },
  approachBlocks: [
    {
      title: "Color Contrast",
      body: "Auditing and updating visual assets to meet AA contrast ratios without losing the playful, engaging brand identity, allowing clear, consistent and legible UI",
    },
    {
      title: "Keyboard Navigation",
      body: "Mapping logical focus states, tab order,  and complex, interactive states from mouse-only behaviors to multi-modal device support like keyboards and other peripherals.",
    },
    {
      title: "Screen Reader",
      body: "Standardized ARIA labels, focus order, and component alignment for cross-platform screen reader support (NVDA, JAWS, VoiceOver) applied to dynamic, non-standard, interactive content.",
    },
  ],
  contrast: {
    heading: "Color Contrast",
    imageAlt: "An image of part of the color audit for the DBL catalog",
    caption: "An image of part of the color audit for the DBL catalog",
  },
  keyboard: {
    heading: "Keyboard Navigation",
    images: [
      {
        type: "video" as const,
        src: `${base}assets/video/keyboard-nav-prototype.mp4`,
        poster: `${base}assets/a11y/keyboard-prototype.png`,
        alt: "Prototype demonstrating drag-drop using keyboard sent to NCAM",
        caption: "Prototype demonstrating drag-drop using keyboard sent to NCAM",
      },
      {
        type: "video" as const,
        src: `${base}assets/video/rationalRods.mp4`,
        poster: `${base}assets/a11y/keyboard-lesson.png`,
        alt: "Video of live lesson, navigated via keyboard using arrows, tab and space",
        caption: "Video of live lesson, navigated via keyboard using arrows, tab and space",
      },
    ],
  },
  screenReader: {
    heading: "Assistive Technology (Screen Readers) ",
    body: `Like keyboard navigation, this had the additional complication of our underlying technology. Built inside an HTML5 Canvas, DreamBox it is not a native web application, it was originally a Flash app.  Since it is not HTML, none of the content was immediately parseable by the browser. To resolve this, we ultimately created a ‘shadow’ DOM that mirrored our lesson components, and hid it under our canvas. This created a structure, where tucked under our actual components, we had valid HTML elements to target for our needs.`,
    footer: `Using this shadow DOM, we were able to assign tab order for keyboard/peripheral navigation, and as importantly, ARIA markup for standard (text inputs, tables) and non-standard components (like Math Racks and measurement scales) which allows the use of assistive technology like screen readers the ability to visualize what is on screen.`,
    image: `${base}assets/a11y/screen-reader.png`,
    imageAlt: "An image of mock ARIA markup",
    caption: "An image of mock ARIA markup",
  },
  result: {
    heading: "The Result:",
    bullets: [
      "Over 3600 lessons updated to align to accessible color contrast, keyboard navigation, and assistive technology conventions.",
      "$4M in ARR protected, with another $1.5M in expansion secured.",
      "Opened an additional 80% market share for available RFP.",
    ],
  },
  resultBlocks: [
    {
      title: "Compliance",
      body: "Excluding content identified with visual bias, brought the legacy catalog up to WCAG 2.1 AA standards, verified by two independent agencies.",
    },
    {
      title: "Retention & RFP",
      body: "Protected core school district accounts and unlocked new expansion opportunities that strictly required accessibility compliance.",
    },
    {
      title: "Inclusivity",
      body: "Established an accessible design component library, patterns, and production best practices to ensure all future features are compliant out-of-the-box.",
    },
  ],
  links: {
    ncam: "https://www.wgbh.org/foundation/services/ncam",
    lynn: "https://www.linkedin.com/in/lynn-bataillon-400279173/",
    tyler: "https://www.linkedin.com/in/tylerwemead/",
    goose: "https://www.linkedin.com/in/gusgutierrez/",
    prototypes:
      "https://www.figma.com/proto/atik2rZEp5BNhcuSZVT3FU/DragDropMenu?node-id=82-17439&viewport=1696%2C787%2C0.15&t=B7i1OX6a6Vhc8vN5-1&scaling=contain&content-scaling=fixed&starting-point-node-id=82%3A17439&page-id=82%3A17438",
  },
} as const;

/** Min-heights for scroll-reveal placeholders — from Figma a11y-expanded (1367:2635). */
export const A11Y_REVEAL_HEIGHTS = [210, 177, 350, 643, 753, 604, 262, 330] as const;
