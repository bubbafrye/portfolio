import styles from "./MiniBlock.module.css";

type MiniBlockProps = {
  title: string;
  body: string;
  /** Figma instance name (e.g. 01, 02, 01-mini-block). */
  figmaName?: string;
};

export function MiniBlock({ title, body, figmaName = "mini-block" }: MiniBlockProps) {
  return (
    <article className={styles["mini-block"]} data-figma-name={figmaName}>
      <span className={styles.surface} aria-hidden />
      <div className={styles["text-block"]} data-figma-name="text-block">
        <h3 className={styles.header} data-figma-name="header">
          {title}
        </h3>
        <p className={styles.body} data-figma-name="body">
          {body}
        </p>
      </div>
      <span className={styles.insetShadow} aria-hidden />
    </article>
  );
}
