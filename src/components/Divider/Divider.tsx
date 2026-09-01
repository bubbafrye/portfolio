import styles from "./Divider.module.css";

/** Figma divider — 2px primary-color rule between main-page sections. */
export function Divider() {
  return (
    <div className={styles.root} data-figma-name="divider" role="presentation">
      <div className={styles.line} />
    </div>
  );
}
