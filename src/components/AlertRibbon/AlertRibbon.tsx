import styles from "./AlertRibbon.module.css";

const WARNING_ICON = `${import.meta.env.BASE_URL}assets/home/warning.svg`;

/** Figma alert ribbon — node 1511:4919 */
export function AlertRibbon() {
  return (
    <div className={styles.ribbon} data-figma-name="alert-ribbon" role="status">
      <img className={styles.icon} src={WARNING_ICON} alt="" aria-hidden />
      <p className={styles.text}>
        This site is under active development. Beware of typos, broken links and dragons.
      </p>
      <img className={styles.icon} src={WARNING_ICON} alt="" aria-hidden />
    </div>
  );
}
