import styles from "./BlurbsFooter.module.css";

const BLURB_TAIL = `${import.meta.env.BASE_URL}assets/home/blurb-tail.svg`;

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
    quote:
      "Jason is able to turn customer insights into a better user experience.  Beyond his design skills, Jason is a strong thought partner, a great collaborator, and someone who consistently goes above and beyond to make the product better.  I would recommend him without hesitation.",
    name: "Kevin Shanahan",
    role: "Sr. Director, Product Management",
  },
] as const;

/** End-of-page testimonials — always below the fold after main content. */
export function BlurbsFooter() {
  return (
    <footer className={styles.root} data-theme="root" data-figma-name="home-blurbs" data-section-anchor="blurbs">
      <div className={styles.blurbs} data-figma-name="blurbs">
        {blurbs.map((blurb, index) => (
          <article
            className={[styles.blurb, "tall" in blurb && blurb.tall && styles.blurbTall].filter(Boolean).join(" ")}
            key={blurb.name}
            style={{ animationDelay: `calc(${index} * var(--anim-timing-stagger))` }}
          >
            <div className={styles.blurbBubble}>
              <div className={styles.quoteMark}>“</div>
              <div className={styles.blurbBody}>
                <p>{blurb.quote}</p>
                <div className={styles.attribution}>
                  <span>- {blurb.name}</span>
                  <span>{blurb.role}</span>
                </div>
              </div>
            </div>
            <img className={styles.blurbTail} src={BLURB_TAIL} alt="" aria-hidden />
          </article>
        ))}
      </div>
    </footer>
  );
}
