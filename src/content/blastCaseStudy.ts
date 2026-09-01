const base = import.meta.env.BASE_URL;

/** Copy from Figma blast component — node 1430:2286 */
export const blastCaseStudy = {
  id: "blast" as const,
  title: "Fairway Solitaire: Blast",
  heroImage: `${base}assets/main-page/blast-hero.png`,
  heroImageAlt: "Game logo for Fairway Solitaire: Blast featuring bold 3D lettering on a yellow gradient background.",
  heroImageRounded: true,
  project:
    "Adapt the casual solitaire mechanic of Fairway Solitaire to a saga-style level progression with power-ups, collections and tournament play.",
  role: "Lead Artist & Designer",
  summaryResults: [
    "Over 10M downloads for iOS & Android with average customer lifetime >6 months",
    "4.8 avg rating across app stores",
    "Leveraged as test bed for many social mechanics throughout internal studio.",
  ],
  problem: {
    heading: "The Problem:",
    body: "With a small 5-person team, take what started as an interactive Facebook ad and turn it into a meaningful, engaging experience that is sticky and expands the user base of an established IP.",
  },
  approach: {
    heading: "The Approach:",
    body: "Working nimble and a bit under the radar, we rapidly designed and built features and tested them with users, often in a single sprint. With the product in soft launch across three countries with a modest DAU of 200K, we leveraged analytics to see movement with every tweak. This allowed us to develop and try out many of the engagement hooks like leaderboards, synchronous play, and tournaments that were later employed throughout the internal studio.",
  },
  approachBlocks: [
    {
      title: "Engagement",
      body: "Try, test, and iterate. That was the mantra. We looked for any way of enticing players and set early, mid, and late game sinks to build stickiness that led to some of the highest 90-day metrics in the studio. The game had a very energetic and erratic feel, which made it easy to have more trial and error masked as intentional antics.",
    },
    {
      title: "Experimentation",
      body: "Blast was filled with hooks to engage players, from collection mechanics to progressive rewards, tournaments and a saga-style level progression. All of these features were rolled out as quick experiments that gained further investment based on how the data showed engagement.",
    },
  ],
  narrative: `One of the best parts about this project was the energy the game had. It was solitaire, but with explosive power-ups. It had cute characters, but they blew up. The UI was made of cobbled together scrap, and the animation was elastic and huge. While my primary role was for UI and general asset creation, the smaller size of the team meant I wore several other hats from game design to UX to animator. There were many moments of me walking over to an engineer and saying "What if..." and two hours later a new feature would be in the build. This tight collaboration continues to inform a belief that collaborative development where experimentation can flourish leads to the best results.`,
  dialogsCarousel: {
    heading: "Dialog exploration",
    body: [
      "Blast's thematic direction was based on two principles: \"vintage entertainment\" and \"found objects\". Inspiration was pulled from classic cars and 1950's carnivals, with everything slightly distressed and off-kilter. The abandoned world is maintained by feral squirrels and prone to their hijinks interrupting gameplay with explosive results.",
      "I built a style guide and asset library composed of simplified wood textures, extruded metal, and light bulbs... all the light bulbs.",
      "The UI animation was snappy with a lot of bounce. Everything was intended to feel like it could rattle apart at any moment.",
    ],
    slides: [
      {
        src: `${base}assets/blast/carousel/01-full.png`,
        caption: "Early concept board pulling different mockups into a single space",
        alt: "Early concept board pulling different mockups into a single space",
      },
      {
        src: `${base}assets/blast/carousel/02-full.png`,
        caption: "Level exit screen",
        alt: "Level exit screen",
      },
      {
        src: `${base}assets/blast/carousel/03-full.png`,
        caption: "More dialog exploration",
        alt: "More dialog exploration",
      },
      {
        src: `${base}assets/blast/carousel/04-full.png`,
        caption: "Early tournament mockups",
        alt: "Early tournament mockups",
      },
    ],
  },
  stickems: {
    heading: "Stick'ems",
    body: `Stick'ems were a collection mechanic consisting of sets of four 'stickers' that shared a common theme. They would drop with random weighting as part of normal gameplay. Complete a set, get a reward. In order to support the sheer volume of assets, we leveraged the talents of several different artists. To maintain a common element to tie them together, I built a pipeline in Photoshop consisting of a template file to paint in, a bridge file for applying a universal style set for stroke and shade, which fed into an automated export action to organize the output.`,
    image: `${base}assets/blast/stickems-ui.png`,
    imageAlt: "Example of Stick'ems UI",
    caption: "Example of Stick'ems UI",
  },
  stickemStrip: {
    intro: `Here are a few sets I painted for the Stick'ems collections: "fall leaves", "eggs", "St. Pat's", and "sports balls".`,
    images: [
      { src: `${base}assets/blast/stickems/fall.png`, alt: "Fall themed Stick'em collection" },
      { src: `${base}assets/blast/stickems/egg.png`, alt: "Egg themed Stick'em collection" },
      { src: `${base}assets/blast/stickems/st-patrick.png`, alt: "St. Patrick's day themed Stick'em collection" },
      { src: `${base}assets/blast/stickems/sports.png`, alt: "Sports balls themed Stick'em collection" },
    ],
  },
  tournament: {
    heading: "Tournaments:",
    body: `One of the more scrappy moments in the game's development was our Tournament feature.  With two week's notice we found out we were taking over a booth at PAX East, and decided we wanted to run a synchronous tournament ever hour to drive installs and engagement at the booth.  The entire UX, front end design and back end architecture was concepted and build in a sprint and deployed with success live at the conference.  This laid the foundation for a tournament system that was leveraged throughout the studio in other titles. `,
    images: [
      {
        src: `${base}assets/blast/tournament-ui.png`,
        caption: "Tournament interface with dynamic, animated elements",
        alt: "Tournament interface with dynamic, animated elements",
      },
      {
        src: `${base}assets/blast/tournament-pax.png`,
        caption: "Still from interview at PAX East where the tournament was first run",
        alt: "Still from interview at PAX East where the tournament was first run",
      },
    ],
  },
  result: {
    heading: "The Result:",
    bullets: [
      "Over 10M downloads for iOS & Android with average customer lifetime >6 months",
      "4.8 avg rating across app stores",
      "Leveraged as test bed for many social mechanics throughout internal studio.",
    ],
  },
} as const;

export const BLAST_REVEAL_HEIGHTS = [210, 177, 350, 200, 600, 550, 337, 746, 262] as const;
