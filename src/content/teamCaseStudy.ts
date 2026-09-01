const base = import.meta.env.BASE_URL;

/** Copy from Figma team component — node 1402:2248 */
export const teamCaseStudy = {
  id: "team" as const,
  title: "Team building",
  heroImage: `${base}assets/sections/team.png`,
  heroImageAlt: "Hand-drawn illustration of a hand supporting a blue and grey organizational chart.",
  heroImageRounded: true,
  heroImageBorderMuted: true,
  intro:
    "Throughout my career, I have had the fortune of building, growing, and leading teams of different sizes.   I put great stock in this responsibility as high-functioning, supported contributors build better products.",
  role: "Leader, Facilitator",
  hierarchy: [
    { label: "People.", text: "Good teams start with good people." },
    { label: "Process.", text: " Good people are best empowered with strong processes" },
    { label: "Product.", text: " Good products are the byproduct of empowered teams." },
  ],
  philosophy: {
    heading: "My Leadership Philosophy",
    body: "People are the roots of a healthy team.  Without recognizing the humans behind the output, you cannot help them find their best potential.  I work with every member of my team to find what motivates and excites them as individuals, then leverage those passions to help them make inspired work.  ",
  },
  approachBlocks: [
    {
      title: "People",
      body: "Starting with, and supporting the right people is critical to building a good team.  A leader needs to be able to support through loss, hardship, missed deadlines and underperformance, just as much as they need to celebrate the wins and dependable outcomes.  ",
    },
    {
      title: "Process",
      body: "Process is more than just craft, it is also setting up growth frameworks, establishing clear measurements of success, and listening to the wants of both the team and the individual contributors, looking for areas of investment for each person.",
    },
    {
      title: "Product",
      body: "Good products are built from high-performing teams and broken experiences come from fractured teams.  Success is intimately linked to collaboration, respect, data, and execution, with a little bit of levity to keep things moving. ",
    },
  ],
  people: {
    heading: "People",
    body: "One way I support the individuals on my teams by helping them to identify their own strengths and areas of opportunity.  I use collaborative one-on-one templates where we both add to the agenda, growth frameworks that are rooted in self-assessment and quarterly objectives that track not only track to department OKRs, but also personal goals that strengthen and support them in their professional trajectory.  ",
    challenge:
      "I have had situations where time spent in recurring one-on-ones focused solely on project statuses.  This led to disconnects on how individuals felt about their professional growth and overall satisfaction.  ",
    resolution:
      "I began requesting ad-hoc checkins on project status, which freed up time in our scheduled one-on-ones to focus more on growth opportunities.  This led to them spending some time building out useful artifacts for the team like user personas and auditing existing design patterns, which gave them a stronger sense of ownership and contribution to the team. ",
  },
  process: {
    heading: "Process",
    intro:
      "Beyond driving clarity in the “definition of done” or a hierarchy of importance, I work to ensure that my teams are fully integrated into the development process. Design is not a box with a bow on it for someone to toss over a fence, it is an integral part of building and iterating on a product.  ",
    detailText:
      "Moving beyond the preliminary research, competitive analysis, and rapid ideation, Design actively collaborates with Engineering and Product to maintain consistency from kickoff to release, and into live monitoring.  At DreamBox, we relied heavily on collaboration and integration of the Design team as equal members of the development process. Designers were present in standups, took story points in Jira and participated in retros. This provided more visibility as to what Design was working on, as well as more insight for Design on what was in-flight for review.  ",
    image: `${base}assets/team/jira-tickets.png`,
    imageAlt: "An array of Jira tickets written by and for Design, guiding the development process",
    caption: "An array of Jira tickets written by and for Design, guiding the development process",
    challenge:
      "There was a fair bit of time spent handing off design specifications, but by the time the work was done in production, small variances led to increasing deltas between expectations and reality. This is no one individual’s fault, it was the logical outcome of a sequence of handoffs that left holes for interpretation.  ",
    resolution:
      "I guided the Design team through setting up in their IDEs, pulling repos, compiling projects, and reviewing content as it was developed.  This led to more hands-on collaboration with Engineering and provided a tighter feedback loop while stories were being developed.  Rather than reacting to items once they were merged, Designers could do hands-on reviews and offer feedback in the moment, which led to a >20% reduction in new bugs and refactoring stories.",
  },
  product: {
    heading: "Product",
    body: "With high-functioning people collaborating with their peers, supported with the right processes to make good work, products come together stronger and faster.  I am fond of saying “handshakes not handoffs” as cross-functional peers that work together, not in silos, build better products, period.  ",
    challenge:
      "We would often see blurred lines on the definition of done and how we decide that something is ‘good enough’.  Design may want more, Curriculum may prioritize a specific learning objective and Engineering may strive for a simpler solution to a problem.  How do we refine our process to codify where and when each voice is prioritized and how to we maintain confidence  as a group along the path from initial idea to live in production?",
    resolution:
      "I experimented with various tools like RACI charts and scheduling tools to drive progress and break stalemates.  While these helped, it was easy to fall back into old handoff habits.  I then met with different cross-functional stakeholders to see how they viewed the different milestones in our development process and where they felt their voice diminished.  This led to a refined,  live-ops oriented approach to releasing content, where incremental releases would gain data to inform decisions as we went.  This ultimately led to a pipeline that followed an alpha/beta/release candidate model that provided more opportunities to validate or pivot early, pushing some priorities (like Viz dev) earlier, and drastically reduced overall development time (an avg. 30%) while gaining more confidence as a working group in the final output. ",
  },
  processDiagram: `${base}assets/team/process-diagram.png`,
  processDiagramAlt:
    "Milestone driven process pipeline that promoted more data-driven decisions, collaboration and faster development time",
  processDiagramCaption:
    "Milestone driven process pipeline that promoted more data-driven decisions, collaboration and faster development time",
} as const;

export const TEAM_REVEAL_HEIGHTS = [150, 370, 480, 1150, 780, 240] as const;
