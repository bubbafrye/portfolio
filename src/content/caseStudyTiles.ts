const base = import.meta.env.BASE_URL;

export type ProjectTileConfig = {
  layout: "project";
  id: "a11y" | "park" | "blast";
  title: string | readonly string[];
  project: string;
  results: readonly string[];
  heroImage: string;
  heroImageAlt: string;
  heroImageLayers?: readonly string[];
  heroImageFlip?: boolean;
  heroImageRounded?: boolean;
  heroImageBorder?: boolean;
};

export type HorizontalTileConfig = {
  layout: "horizontal";
  id: "team" | "tools";
  title: string;
  intro: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageRounded?: boolean;
  heroImageBorder?: boolean;
};

export type CaseStudyTileConfig = ProjectTileConfig | HorizontalTileConfig;

export const PROJECT_TILES: readonly CaseStudyTileConfig[] = [
  {
    layout: "project",
    id: "a11y",
    title: "DreamBox Accessibility",
    project:
      "Redesign the DreamBox Math K-8 platform to achieve WCAG 2.1 AA compliance while preserving hundreds of unique learning experiences.",
    results: [
      "3600+ lessons aligned to WCAG accessible color contrast, keyboard navigation, and assistive technology.",
      "$4M in ARR protected, with another $1.5M in expansions.",
      "Opened an additional 80% market share for available RFP.",
    ],
    // Hero PNGs: illustration nodes only — see scripts/figma-asset-manifest.json
    heroImage: `${base}assets/tiles/a11y-tile.png`,
    heroImageAlt:
      "Illustration of a laptop with an accessibility icon surrounded by colorful puzzle pieces representing speech, vision, keyboard, and hearing accessibility.",
    heroImageFlip: true,
  },
  {
    layout: "project",
    id: "park",
    title: ["Reading", "Park"],
    project: "Build out an adaptive K-2 Reading solution to complement the existing Math product.",
    results: [
      "1500+ Science of Reading backed lessons covering five domains.",
      "High engagement with Student NPS gaining 9 pts avg. YoY for three years, with Product NPS gaining 11 points.",
      ">70% Satisfaction rating from educator surveys since 2023/24 SY release.",
    ],
    heroImage: `${base}assets/tiles/park-bg.png`,
    heroImageLayers: [`${base}assets/tiles/park-bg.png`, `${base}assets/tiles/park-fg.png`],
    heroImageAlt:
      "Reading Park project tile showing colorful cartoon monsters in front of a laptop and a wooden sign that reads 'Reading Park'.",
    heroImageRounded: true,
  },
  {
    layout: "project",
    id: "blast",
    title: "Fairway Solitaire: Blast",
    project:
      "Adapt the casual solitaire mechanic of Fairway Solitaire to a saga-style level progression with power-ups, collections and tournament play.",
    results: [
      "Over 10M downloads for iOS & Android with average customer lifetime >6 months",
      "4.8 avg rating across app stores",
      "Leveraged as test bed for many social mechanics throughout internal studio.",
    ],
    heroImage: `${base}assets/tiles/blast-bg.png`,
    heroImageLayers: [
      `${base}assets/tiles/blast-bg.png`,
      `${base}assets/tiles/blast-mid.png`,
      `${base}assets/tiles/blast-fg.png`,
    ],
    heroImageAlt: "Game logo for Fairway Solitaire: Blast featuring bold 3D lettering on a yellow gradient background.",
    heroImageRounded: true,
    heroImageBorder: true,
  },
] as const;

export const TEAMS_TOOLS_TILES: readonly CaseStudyTileConfig[] = [
  {
    layout: "horizontal",
    id: "team",
    title: "Team building",
    intro:
      "Throughout my career, I have had the fortune of building, growing, and leading teams of different sizes.   I put great stock in this responsibility as high-functioning, supported contributors build better products.",
    heroImage: `${base}assets/tiles/team-tile.png`,
    heroImageAlt: "Hand-drawn illustration of a hand supporting a blue and grey organizational chart.",
    heroImageRounded: true,
    heroImageBorder: true,
  },
  {
    layout: "horizontal",
    id: "tools",
    title: "Tools & Experiments",
    intro:
      "Sometimes you need that right tool or you just have an idea you want to work out.  Here’s a collection of those that I have built out over time.\n\nFeel free to take them for a spin.",
    heroImage: `${base}assets/tiles/tools-tile.png`,
    heroImageAlt: "Smiling cartoon brain on a bronze gear background in a rounded square.",
    heroImageRounded: true,
    heroImageBorder: true,
  },
] as const;
