const base = import.meta.env.BASE_URL;

/** Copy from Figma park component — node 1367:2636 */
export const parkCaseStudy = {
  id: "park" as const,
  title: "Reading Park",
  background: "#c9f0d3",
  miniBlockBg: "#92dba4",
  heroImage: `${base}assets/main-page/park-hero.png`,
  heroImageAlt: "Reading Park logo and character illustrations in a colorful outdoor environment.",
  heroImageRounded: true,
  project: "Build out an adaptive K-2 Reading solution to complement the existing Math product.",
  role: "Lead Designer: Content & Engagement",
  summaryResults: [
    "1500+ new Science of Reading backed lessons covering five domains.",
    "Engaging environment with Student NPS gaining an average of 9 pts YoY for the last three years, with Product NPS gaining 11 points.",
    ">70% Satisfaction rating from educator surveys since 2023/24 SY release.",
  ],
  problem: {
    heading: "The Problem:",
    body: "How to leverage Reading to expand the total market available for the DreamBox platform while staying true to core pillars of the brand?",
  },
  approach: {
    heading: "The Approach:",
    body: `Use student feedback on what resonates in the existing Math product to inform the environment for the world of Reading Park.  Pair that with a Science of Reading backed sequence and place it on top of our adaptive engine.`,
  },
  approachBlocks: [
    {
      title: "Engagement",
      body: "Based on student interviews and feedback, we zeroed in on three critical elements that resonated in the Math platform: Story, Collections and the engaging Manipulatives (tools) that students use. Leveraging this we built a world that was new, yet used the same patterns, making it familiar and intuitive to use.",
    },
    {
      title: "Adaptivity",
      body: `Sequencing on our adaptive platform was tricky as math and reading are not taught along the same pathways.   We found an excellent balance point using a  "Quest" system that allows for microadaptivity within a specified concept prescribed in Scarborough's Reading Rope.`,
    },
  ],
  engagementIntro: {
    heading: "Engagement",
    body: `My first task was to conduct student interviews and review hundreds of student feedback submissions looking to isolate what was working in the DreamBox Math platform - students should not have to re-learn how to use a DreamBox product. This led to a tighter core loop that involved a central hub, location-based gameplay sub-loop, and reward system.`,
  },
  story: {
    heading: "Pillar One: Story",
    body: `The multiple storylines of the DreamBox Math resonate with students, they would incur a huge production cost to replicate.  To leverage the engagement factor at a manageable cost, I proposed a singular narrative that centers the student  in the world.  "The Monsters of Reading Park would sit down to listen to the Squiggles read from the Squiggle Book, and in the process, learn to read.  But one day the Squiggle Book was dropped and all of its pages were scattered around the world.  We must help find all of the missing pages to put the Book back together again."`,
    image: `${base}assets/park/story.png`,
    imageAlt: "Still from the onboarding movie describing how the Squiggle Book was broken.",
    caption: "Still from the onboarding movie describing how the Squiggle Book was broken",
    footer: `Each 'page' corresponds to a phonics pattern, starting with letter identification and moving through other concepts like consonant-vowel-consonant and inflectional endings.  As students discover pages, they reconstruct the Squiggle Book and in the process build a reference guide to accompany them on their learning journey.`,
  },
  collectionsCarousel: {
    heading: "Pillar Two: Collections",
    body: [
      `Collection systems provide extrinsic motivation for onboarding students and a constant enticement of rewards to come.  In addition to the Squiggle Book, there are two more examples of this with the Monster Friends collection and the Sticker Book.`,
      `As students complete lessons in the product, they can earn occasional rewards like Monster Cards - one for each letter of the Alphabet. These cards have fun animation and details about each Monster in the set.`,
      `Additionally, students earn location-themed stickers that are rewarded at random from a large pool. This, coupled with a random scale and rotation applied, leads to a custom experience that can compare with friends - no two books are the same.`,
    ],
    slides: [
      {
        src: `${base}assets/park/collections/01-full.png`,
        caption: "Image of Monster Friends card book in product",
        alt: "Image of Monster Friends card book in product",
      },
      {
        src: `${base}assets/park/collections/02-full.png`,
        caption: "Early mockup of Monster Friends book",
        alt: "Early mockup of Monster Friends book",
      },
      {
        src: `${base}assets/park/collections/03-full.png`,
        caption: "Image of Sticker Book in product",
        alt: "Image of Sticker Book in product",
      },
      {
        src: `${base}assets/park/collections/04-full.png`,
        caption: "Early mockup of Sticker Book",
        alt: "Early mockup of Sticker Book",
      },
    ],
  },
  squiggleBook: {
    introLead: "The ",
    introBold: "Squiggle Book",
    introRest: ` is the primary collection mechanic in the product, tying the student's learning journey to a reward system that doubles as a reference manual. When students begin a Quest, they find a missing scrap of the Squiggle Book. While it has UI that describes the content, the individual items are not 'understandable'.  Upon completion of a Quest (via positive assessment in a 'capstone' lesson), students are awarded the knowledge from the missing page.  Moving forward, the student can reference this content as needed for a reminder of the phonics rules they have acquired.`,
    images: [
      {
        src: `${base}assets/park/squiggle-book/01-full.png`,
        caption: "Rapid ideation on layout and interface",
        alt: "Rapid ideation on layout and interface",
      },
      {
        src: `${base}assets/park/squiggle-book/02-full.png`,
        caption: "Refined iteration on book structure",
        alt: "Refined iteration on book structure",
      },
      {
        src: `${base}assets/park/squiggle-book/03-full.png`,
        caption: "Example of book in-product with mid-progress and completed columns.",
        alt: "Example of book in-product with mid-progress and completed columns.",
      },
    ],
  },
  questSystem: {
    heading: "Adaptivity and the Quest system",
    body: `DreamBox's core area of coverage had always been mathematics, which are taught in a multi-threaded manner with disparate concepts taught in tandem, building on ideas that bridge them together and leading to new content areas.  Science of Reading curriculum is taught in a much more linear way, down to the order that certain letters are introduced.`,
    mapImage: `${base}assets/park/world-map-full.png`,
    mapAlt: "World Map where students choose a Quest to start",
    mapCaption: "World Map where students choose a Quest to start",
    mapBody: [
      `To facilitate this, I modeled a nested loop system, where students select a 'random' Quest from one of four locations on a map (Park, Mountains, Beach and Cave).  Each location has two nodes.`,
      `Quest signs will pop up across the map (in 1-3 locations. Even though the same Quest content will initially be assigned to every pending location, this provides some choice agency to the student, and eliminates a pain point observed in Math where students would artificially view a map location as being 'difficult', therefore avoiding lessons assigned to it.`,
      `Once selected, the Quest is then assigned to that location, and the other map nodes are freed for other Quests`,
    ],
    flowImages: [
      {
        src: `${base}assets/park/flows/user-flow-full.png`,
        caption: "Reading Park user flow",
        alt: "Reading Park user flow",
      },
      {
        src: `${base}assets/park/flows/quest-loop-full.png`,
        caption: "Reading Park core Quest loop",
        alt: "Reading Park core Quest loop",
      },
    ],
  },
  result: {
    heading: "The Result:",
    bullets: [
      "1500+ new Science of Reading backed lessons created covering five domains.",
      "Engaging environment with Student NPS gaining an average of 9 pts YoY for the last three years, and Product NPS gaining 11 points.",
      ">70% Satisfaction rating from educators since 2023/24 SY release.",
    ],
  },
  resultBlocks: [
    {
      title: "Engagement",
      body: "Enjoyed by students and educators alike, Reading Park excels in overall satisfaction with a >75% approval rating from educators and YoY growth of 7-10 points on student NPS surveys.",
    },
    {
      title: "Efficacy",
      body: "Built on Science of Reading fundamentals, Reading Park follows an established learning path of proven efficacy, garnering ESSA Level IV designation.",
    },
    {
      title: "Expansion",
      body: "In addition to individual sales, cross-selling DreamBox Reading Park to existing Math customers raised per user revenue by 12% year-over-year, roughly doubling the customer lifetime value (LTV).",
    },
  ],
} as const;

export const PARK_REVEAL_HEIGHTS = [
  150, 177, 350, 192, 605, 700, 480, 340, 521, 521, 262, 330,
] as const;
