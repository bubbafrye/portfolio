import type { ReactNode } from "react";
import styles from "./CsBlocks.module.css";

export function CsSection({
  heading,
  children,
  figmaName = "problem",
}: {
  heading?: string;
  children: ReactNode;
  figmaName?: string;
}) {
  return (
    <section className={styles.section} data-figma-name={figmaName}>
      <div className={styles.sectionInner}>
        {heading && <h3 className={styles.heading}>{heading}</h3>}
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}

const TAIL_SRC = `${import.meta.env.BASE_URL}assets/cs-shared/quote-tail.svg`;

type CsQuote = {
  quote: string;
  attribution: readonly string[];
};

export function CsQuoteRow({ quotes }: { quotes: readonly CsQuote[] }) {
  return (
    <div className={styles.quoteRow}>
      {quotes.map((item) => (
        <figure key={item.quote} className={styles.quote} data-figma-name="blurb">
          <div className={styles.quoteBubble} data-figma-name="balloon">
            <span className={styles.quoteMark} aria-hidden>
              “
            </span>
            <div className={styles.quoteBody}>
              <p>{item.quote}</p>
              <footer>
                {item.attribution.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </footer>
            </div>
          </div>
          <img className={styles.quoteTail} src={TAIL_SRC} alt="" aria-hidden />
        </figure>
      ))}
    </div>
  );
}

type CsDualInsetProps = {
  left: { heading: string; body: string };
  right: { heading: string; body: string };
};

export function CsDualInset({ left, right }: CsDualInsetProps) {
  return (
    <div className={styles.dualInset} data-figma-name="inset-approach">
      <article className={styles.insetCard} data-figma-name="01">
        <h3>{left.heading}</h3>
        <p>{left.body}</p>
      </article>
      <article className={styles.insetCard} data-figma-name="02">
        <h3>{right.heading}</h3>
        <p>{right.body}</p>
      </article>
    </div>
  );
}
