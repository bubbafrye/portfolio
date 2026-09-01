import { SeeMoreBtn } from "../SeeMoreBtn";
import styles from "./HomeModule.module.css";

export type HomeVariant = "full" | "blurbs";
export type HomeTarget = "projects" | "teams" | "tools";

type HomeModuleProps = {
  variant: HomeVariant;
  onVariantChange: (variant: HomeVariant) => void;
  onNavigate: (target: HomeTarget) => void;
  onOpenResume: () => void;
};

const HOME_ASSETS = {
  phone: `${import.meta.env.BASE_URL}assets/home/phone.svg`,
  mail: `${import.meta.env.BASE_URL}assets/home/mail.svg`,
  resume: `${import.meta.env.BASE_URL}assets/home/resume.svg`,
  linkedin: `${import.meta.env.BASE_URL}assets/home/linkedin.svg`,
  blurbTail: `${import.meta.env.BASE_URL}assets/home/blurb-tail.svg`,
} as const;

const contactItems = [
  {
    id: "phone",
    href: "tel:+12066012882",
    label: "Call Jason Hurst Frye",
    tooltip: "(206) 601-2882",
    src: HOME_ASSETS.phone,
    full: { width: 42, height: 45 },
  },
  {
    id: "mail",
    href: "mailto:jason@hurstfrye.com",
    label: "Email Jason Hurst Frye",
    tooltip: "jason@hurstfrye.com",
    src: HOME_ASSETS.mail,
    full: { width: 43, height: 45 },
  },
  {
    id: "resume",
    href: "/",
    label: "Resume",
    tooltip: "resume",
    src: HOME_ASSETS.resume,
    full: { width: 43, height: 45 },
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/hurstfrye/",
    label: "LinkedIn",
    tooltip: "linkedin",
    src: HOME_ASSETS.linkedin,
    full: { width: 43, height: 45 },
    external: true,
  },
] as const;

const navItems: Array<{ label: string; target: HomeTarget }> = [
  { label: "Projects", target: "projects" },
  { label: "Teams", target: "teams" },
  { label: "Tools", target: "tools" },
];

const blurbs = [
  {
    quote:
      "Jason is the kind of leader who makes teams better. He is intentional about defining workflows, streamlining processes, and building efficiencies that help people do their best work. At the same time, he is a hands-on leader who is willing to roll up his sleeves when needed, whether that means supporting his team, solving a design challenge, or helping meet an important deadline.",
    name: "Sara Scarbrough",
    role: "Director, Curriculum & Instruction",
    tall: true,
  },
  {
    quote:
      "He’s all right. Taught me everything I needed to know about grilled cheese. Definitely recommend.",
    name: "Elliott Hurst Frye",
    role: "Son",
  },
  {
    quote: "Jason is able to turn customer insights into a better user experience.  Beyond his design skills, Jason is a strong thought partner, a great collaborator, and someone who consistently goes above and beyond to make the product better.  I would recommend him without hesitation.",
    name: "Kevin Shanahan",
    role: "Sr. Director, Product Management",
  },
];

function NavButton({
  label,
  target,
  onNavigate,
}: {
  label: string;
  target: HomeTarget;
  onNavigate: (target: HomeTarget) => void;
}) {
  return (
    <SeeMoreBtn
      direction="point-down"
      label={label}
      onClick={() => onNavigate(target)}
      className={styles.navButton}
    />
  );
}

function ContactButtons({ onOpenResume }: { onOpenResume: () => void }) {
  return (
    <div className={styles.contactButtons} aria-label="Contact links">
      {contactItems.map((item) => {
        const size = item.full;
        const external = "external" in item && item.external;

        if (item.id === "resume") {
          return (
            <button
              className={styles.contactLink}
              type="button"
              aria-label={item.label}
              data-contact-id={item.id}
              key={item.id}
              style={size}
              onClick={onOpenResume}
            >
              <img className={styles.contactIcon} src={item.src} alt="" />
              <span className={styles.contactTooltip} aria-hidden>
                {item.tooltip}
              </span>
            </button>
          );
        }

        return (
          <a
            className={styles.contactLink}
            href={item.href}
            aria-label={item.label}
            data-contact-id={item.id}
            key={item.id}
            rel={external ? "noreferrer" : undefined}
            target={external ? "_blank" : undefined}
            style={size}
          >
            <img className={styles.contactIcon} src={item.src} alt="" />
            <span className={styles.contactTooltip} aria-hidden>
              {item.tooltip}
            </span>
          </a>
        );
      })}
    </div>
  );
}

function Blurbs() {
  return (
    <div className={styles.blurbs} data-figma-name="blurbs">
      {blurbs.map((blurb, index) => (
        <article
          className={[styles.blurb, blurb.tall && styles.blurbTall].filter(Boolean).join(" ")}
          key={blurb.name}
          style={{ animationDelay: `calc(${index} * var(--anim-timing-stagger))` }}
        >
          <div className={styles.blurbBubble}>
            <div className={styles.quoteMark}>“</div>
            <div className={styles.blurbBody}>
              <p>{blurb.quote}</p>
              <footer>
                <span>- {blurb.name}</span>
                <span>{blurb.role}</span>
              </footer>
            </div>
          </div>
          <img className={styles.blurbTail} src={HOME_ASSETS.blurbTail} alt="" aria-hidden />
        </article>
      ))}
    </div>
  );
}

export function HomeModule({ variant, onVariantChange, onNavigate, onOpenResume }: HomeModuleProps) {
  const showBlurbs = variant === "blurbs";

  return (
    <section
      className={[styles.root, showBlurbs ? styles.blurbsRoot : styles.fullRoot].join(" ")}
      data-figma-name={showBlurbs ? "home-blurbs" : "home-full"}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.leftBlock} data-figma-name="left">
            <h1>
              Hi. I’m Jason Hurst Frye,
              <br />
              the guy with two last names.
            </h1>
            <div className={styles.introCopy}>
              <p>I like building things.</p>
              <p>I really like helping teams build even bigger things.</p>
            </div>
            <div className={styles.linksBlock} data-figma-name="links">
              <p>If you’re curious, here are some things I’ve built...</p>
              <div className={styles.linksBody}>
                {navItems.map((item) => (
                  <NavButton key={item.target} label={item.label} target={item.target} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          </div>

          <aside className={styles.rightBlock} data-figma-name="right">
            <h2>Reach out. Say hi.</h2>
            <p>Let’s build something together.</p>
            <ContactButtons onOpenResume={onOpenResume} />
            <button
              className={styles.blurbsButton}
              type="button"
              onClick={() => onVariantChange(showBlurbs ? "full" : "blurbs")}
              aria-expanded={showBlurbs}
            >
              {showBlurbs ? "Press here to hide that nonsense." : "Check out what these folks say..."}
            </button>
          </aside>
        </div>

        {showBlurbs && <Blurbs />}
      </div>
    </section>
  );
}
