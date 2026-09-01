export type ResumeJob = {
  id: string;
  title: string;
  company: string;
  dates: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type ResumeEducation = {
  school: string;
  detail: string;
};

export type ResumeSkillBlock = {
  heading: string;
  items: string;
};

const base = import.meta.env.BASE_URL;

export const resumeDownloads = {
  pdf: {
    href: `${base}assets/HurstFrye_resume_2026.pdf`,
    filename: "HurstFrye_resume_2026.pdf",
    label: "PDF",
  },
  ats: {
    href: `${base}assets/HurstFrye_resume_2026-ATS.docx`,
    filename: "HurstFrye_resume_2026-ATS.docx",
    label: "ATS",
  },
} as const;

export const resumeContent = {
  name: {
    accent: "JASON",
    rest: " HURST FRYE",
  },
  subtitle: "     People Leader |  Designer",
  contact: {
    phone: "(206) 601-2882",
    email: "jason@hurstfrye.com",
    website: "www.hurstfrye.com",
    websiteHref: "https://www.hurstfrye.com",
  },
  bio: "I am a mission-motivated design leader with two decades of content development experience, driving vision and direction based on user research and data-driven insights. I lead teams with empathy, honesty, and candor.  Rooted with the belief that good content is born out of the right priorities, I start first with people, then process, leading to great products.",
  skills: [
    {
      heading: "People ",
      items: "Active Listening, Empathy, Emotional Intelligence, Candor, Honesty, Growth Mindset",
    },
    {
      heading: "Process",
      items: "Jira, Confluence, Dovetail, Miro, Figma, Adobe CC, Bitbucket, Agile, VS Code, Paper & Pen",
    },
    {
      heading: "Product ",
      items: "Accessibility, Engagement, EdTech, Cross Platform, Human Centered Design",
    },
  ] satisfies readonly ResumeSkillBlock[],
  experience: [
    {
      id: "de",
      title: "Manager, Product and VIsual Design",
      company: "Discovery Education",
      dates: "October 2023 -  July 2026",
      paragraphs: [
        "I lead a diverse team of visual and product designers in collaboration with curriculum and engineering partners to build cross-discipline, multi-modal, accessible content for K-8 Math and Reading students. I motivate my teams with empathy, driving consistency, tone of voice, and intuitive design patterns that meet students where they are.",
      ],
      bullets: [
        "Worked with cross-functional partners and leverage AI automation to expedite the design-to-code time frame, reducing time to market by over 40%",
        "Fostered collaboration across multidisciplinary teams, prioritizing empathy and user-centered design.",
        "Developed and implemented design strategies aligned with organizational goals.",
        "Mentored junior designers, promoting professional growth and innovative thinking.",
        "Analyzed user feedback and play data to inform iterative design improvements.",
      ],
    },
    {
      id: "dbl",
      title: "Senior Product Designer",
      company: "DreamBox Learning",
      dates: "December 2018 - October 2023",
      paragraphs: [
        "I lead a diverse team of visual and product designers in collaboration with curriculum and engineering partners to build cross-discipline, multi-modal, accessible content for K-8 Math and Reading students. I motivate my teams with empathy, driving consistency, tone of voice, and intuitive design patterns that meet students where they are.",
      ],
      bullets: [
        "Lead design teams towards expanded K-8 educational content coverage, student assessment, and a ground-up Early Reading platform leveraging Science of Reading pedagogy.",
        "As IC, drove design from inception to release of 10 new game sets, as well as various student engagement features leading to hours of new content. ",
        "From analyzing play data, identified areas of friction in 4 key lesson groups. Iterating on targeted improvements resulted in a 10-30% increase in pass rates and a 20% drop in abandonment across several domains.",
        "Collaborated with engineering partners to update processes and pipeline improvements, which led to a 30% increase in time-to-market for new lesson content.",
      ],
    },
    {
      id: "bfg",
      title: "Senior Artist, UI & Design",
      company: "Big Fish Games",
      dates: "February 2007 - September 2018",
      paragraphs: [
        "Responsible for art direction, asset production, mechanic & game design, UI/UX, and marketing across several titles for PC and Mobile.",
        "In addition to several unreleased projects and hole-filling within other teams, I was a principal partner in bringing the following titles to market.",
      ],
      bullets: [
        "Fairway Solitaire: Blast (iOS & Android)",
        "Fairway Fever (Facebook, iOS & Android)",
        "Life Quest (iOS & Android)",
        "Patchworks (iOS & Android)",
        "Big Sea Games platform (Facebook, Desktop)",
      ],
    },
    {
      id: "brainiac",
      title: "3D Artist, Props & Environment",
      company: "Brainiac Studios",
      dates: "June 2006 to October 2006",
      bullets: [
        "Concept art, 3D modeling & texturing for unreleased MMO",
        "Built asset pipeline for remote work",
      ],
    },
    {
      id: "jhf",
      title: "Web Designer",
      company: "JHF Design",
      dates: "March 2001 to September 2003 ",
      bullets: [
        "Site design, code, and deployment along with domain setup.",
        "1-on-1, personalized service",
      ],
    },
  ] satisfies readonly ResumeJob[],
  education: [
    { school: "Savannah College of Art and Design", detail: "BFA Computer Art & Animation " },
    { school: "SCAD Lacoste", detail: "Illustration & Art History" },
    { school: "Portland Community College", detail: "AA DIgital Media" },
  ] satisfies readonly ResumeEducation[],
} as const;
