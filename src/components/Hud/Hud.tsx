import { hudCopy } from "../../content/expandPage";
import styles from "./Hud.module.css";

const ASSET = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

type HudProps = {
  onResumeClick?: () => void;
};

export function Hud({ onResumeClick }: HudProps) {
  return (
    <header className={styles.hud} data-figma-name="HUD">
      <div className={styles.inner} data-figma-name="Frame 1">
        <img
          className={styles.texture}
          src={ASSET("3087ab49c94a4091d6eb02412b3099052bada66f.png")}
          alt=""
          aria-hidden
        />
        <div className={styles.l} data-figma-name="L">
          <p className={styles.name}>{hudCopy.name}</p>
        </div>
        <div className={styles.mid} data-figma-name="mid" aria-hidden />
        <nav className={styles.icons} data-figma-name="Frame 2" aria-label="Contact links">
          {onResumeClick ? (
            <button
              type="button"
              className={styles["file-alt"]}
              data-figma-name="file-alt"
              onClick={onResumeClick}
              aria-label="Resume"
            >
              <img src={ASSET("d01a8a6438bd356e36d40a40bac70bcfac15e1fe.svg")} alt="" />
            </button>
          ) : (
            <a className={styles["file-alt"]} data-figma-name="file-alt" href="#resume" aria-label="Resume">
              <img src={ASSET("d01a8a6438bd356e36d40a40bac70bcfac15e1fe.svg")} alt="" />
            </a>
          )}
          <a className={styles.envelope} data-figma-name="envelope" href="#email" aria-label="Email">
            <img src={ASSET("be5459ada88b99805a175ef05a1c8110792ec80c.svg")} alt="" />
          </a>
          <a className={styles["linkedin-in"]} data-figma-name="linkedin-in" href="#linkedin" aria-label="LinkedIn">
            <img src={ASSET("8fa232785e16aa9d2518c1b1524b87ade5743064.svg")} alt="" />
          </a>
        </nav>
      </div>
    </header>
  );
}
