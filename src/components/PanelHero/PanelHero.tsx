import { ButtonPrimary } from "../ButtonPrimary";
import styles from "./PanelHero.module.css";

const HERO_IMAGE = `${import.meta.env.BASE_URL}assets/48fb376816ae29df2f399b248a6db6aceffa3c8f.svg`;

export type PanelHeroProps = {
  title: string;
  intro: string;
  expanded: boolean;
  collapsing?: boolean;
  seeMoreLabel?: string;
  closePanelLabel?: string;
  onToggle: () => void;
};

/** Hero row — Figma frame `content` inside panel a11y-closed / a11y-expanded. */
export function PanelHero({
  title,
  intro,
  expanded,
  collapsing = false,
  seeMoreLabel = "See more",
  closePanelLabel = "Close Panel",
  onToggle,
}: PanelHeroProps) {
  const showClose = expanded || collapsing;

  return (
    <div className={styles.content} data-figma-name="content">
      <div className={styles["image-block"]} data-figma-name="image-block">
        <div className={styles["image-container"]} data-figma-name="image-container">
          <div className={styles["swap-me"]} data-figma-name="swap_me">
            <img src={HERO_IMAGE} alt="" />
          </div>
        </div>
      </div>

      <div className={styles["text-block"]} data-figma-name="text-block">
        <h1 className={styles.header} data-figma-name="header">
          {title}
        </h1>
        <p className={styles.body} data-figma-name="body">
          {intro}
        </p>
        <div className={styles["button-row"]} data-figma-name="Frame 1">
          {showClose ? (
            <ButtonPrimary
              variant="interactive"
              className={styles["panel-action-button"]}
              onClick={onToggle}
              aria-expanded
            >
              {closePanelLabel}
            </ButtonPrimary>
          ) : (
            <div className={styles["expand-button"]} data-figma-name="expand-button">
              <ButtonPrimary
                variant="interactive"
                className={styles["panel-action-button"]}
                onClick={onToggle}
                aria-expanded={false}
              >
                {seeMoreLabel}
              </ButtonPrimary>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
