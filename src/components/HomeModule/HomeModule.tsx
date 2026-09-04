import { SeeMoreBtn } from "../SeeMoreBtn";
import styles from "./HomeModule.module.css";

export type HomeTarget = "projects" | "teams" | "tools";

type HomeModuleProps = {
  onNavigate: (target: HomeTarget) => void;
  onOpenResume: () => void;
  onScrollToBlurbs: () => void;
};

const HOME_ASSETS = {
  phone: `${import.meta.env.BASE_URL}assets/home/phone.svg`,
  mail: `${import.meta.env.BASE_URL}assets/home/mail.svg`,
  resume: `${import.meta.env.BASE_URL}assets/home/resume.svg`,
  linkedin: `${import.meta.env.BASE_URL}assets/home/linkedin.svg`,
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

export function HomeModule({ onNavigate, onOpenResume, onScrollToBlurbs }: HomeModuleProps) {
  return (
    <section className={styles.root} data-figma-name="home-full">
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
            <button className={styles.blurbsButton} type="button" onClick={onScrollToBlurbs}>
              Check out what these folks say...
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
