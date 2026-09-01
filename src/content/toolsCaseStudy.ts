const base = import.meta.env.BASE_URL;

/** Copy from Figma tools component — node 1404:1570 */
export const toolsCaseStudy = {
  id: "tools" as const,
  title: "Tools & Miscellaneous",
  heroImage: `${base}assets/sections/tools.png`,
  heroImageAlt: "Smiling cartoon brain on a bronze gear background in a rounded square.",
  heroImageFlip: true,
  intro:
    "Sometimes you need that right tool or you just have an idea you want to work out.  Here’s a collection of those that I have built out over time.\n\nMuch of what is presented here has been authored as part of experimentation with AI tools like Cursor and Claude.  \n\nFeel free to take them for a spin.",
  role: "Designer, Developer",
  forWork: {
    heading: "For work.",
    body: "A collection of utilities and tools built to accelerate productivity at work.",
    projects: [
      {
        title: "State submission tools",
        body: "States have different standards requirements.  This tool uses .csv to import audit feedback, allows us to reply with text and imagery, and export .pdf for state review.",
        hoverLabel: "Read more..",
        image: `${base}assets/tools/state-submission.png`,
        imageAlt: "Screenshots of a state submission audit feedback tool interface.",
      },
      {
        title: "Bulk Rename and Move",
        body: "A simple tool that allows you to select import and export directories, and batch edit files with a variety of options for naming and file management. ",
        hoverLabel: "Download",
        image: `${base}assets/tools/bulk-rename.png`,
        imageAlt: "Screenshot of a bulk rename and move file management utility.",
      },
    ],
  },
  forFun: {
    heading: "For fun.",
    body: "A collection of small projects authored just because.",
    projects: [
      {
        title: "Space Rocks",
        body: "A quick variant of the classic Asteroids arcade game. Built in HTML & CSS using Cursor. Simple Campaign and Multiplayer options. Supports keyboard and controllers.",
        hoverLabel: "Play now",
        href: "https://hurstfrye.com/asteroids/index.html",
        image: `${base}assets/tools/space-rocks.png`,
        imageAlt: "Screenshot of the Space Rocks arcade game with a ship and asteroids.",
      },
      {
        title: "Scorekeeper",
        body: "A simple app for tracking scores for multiplayer games. Allows for one to eight players, teams, and local saving of teams & scores to pick up from later.",
        hoverLabel: "Try it",
        href: "https://hurstfrye.com/scorekeeper/index.html",
        image: `${base}assets/tools/scorekeeper.png`,
        imageAlt: "Screenshot of a mobile score-tracking app with colorful list rows.",
      },
      {
        title: "Math Facts",
        body: "An experiment to see if I could have a web friendly app that could use speech or text for input when answering basic arithmetic problems.",
        hoverLabel: "Play now",
        href: "https://hurstfrye.com/flashcard/index.html",
        image: `${base}assets/tools/math-facts.png`,
        imageAlt: "Screenshot of a math facts app with speech input listening for an answer.",
      },
    ],
  },
} as const;

export const TOOLS_REVEAL_HEIGHTS = [100, 280, 100, 280, 280] as const;
