import { forwardRef } from "react";
import { themeForCaseStudyId } from "../../../design-tokens/tokens";
import type { CaseStudyTileConfig } from "../../content/caseStudyTiles";
import styles from "./CaseStudyTile.module.css";

type CaseStudyTileProps = {
  config: CaseStudyTileConfig;
  selected?: boolean;
  onClick: () => void;
};

function Title({ title }: { title: string | readonly string[] }) {
  if (Array.isArray(title)) {
    return (
      <h2 className={styles.title}>
        {title.map((line) => (
          <span key={line} className={styles.titleLine}>
            {line}
          </span>
        ))}
      </h2>
    );
  }

  return <h2 className={styles.title}>{title}</h2>;
}

function heroClassNames(config: CaseStudyTileConfig, small = false) {
  const isProject = config.layout === "project";
  return [
    styles.hero,
    small && styles.heroSmall,
    isProject && config.heroImageFlip && styles.heroFlip,
    config.heroImageRounded && styles.heroRounded,
    "heroImageBorder" in config && config.heroImageBorder && styles.heroBorder,
  ]
    .filter(Boolean)
    .join(" ");
}

function TileHero({
  config,
  small = false,
}: {
  config: CaseStudyTileConfig;
  small?: boolean;
}) {
  const isProject = config.layout === "project";
  const flip = isProject && config.heroImageFlip;
  const layers =
    isProject && config.heroImageLayers && config.heroImageLayers.length > 0
      ? config.heroImageLayers
      : [config.heroImage];

  const hero = (
    <div className={heroClassNames(config, small)}>
      <div className={styles.heroStack}>
        {layers.map((src, index) => (
          <img
            key={src}
            className={styles.heroLayer}
            src={src}
            alt={index === 0 ? config.heroImageAlt : ""}
          />
        ))}
      </div>
    </div>
  );

  if (flip) {
    return (
      <div className={styles.heroFlipWrap}>
        <div className={styles.heroFlip}>{hero}</div>
      </div>
    );
  }

  return hero;
}

function ProjectStatic({ config }: { config: Extract<CaseStudyTileConfig, { layout: "project" }> }) {
  return (
    <div className={styles.projectMain}>
      <div className={styles.projectContent}>
        <div className={styles.projectStatic}>
          <Title title={config.title} />
          <TileHero config={config} />
          <p className={styles.project}>
            <span className={styles.blockLabel}>Project:</span>
            <span className={styles.blockValue}> {config.project}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectHover({ config }: { config: Extract<CaseStudyTileConfig, { layout: "project" }> }) {
  return (
    <div className={styles.projectMain}>
      <div className={styles.projectContent}>
        <div className={styles.projectStatic}>
          <Title title={config.title} />
          <div className={styles.results}>
            <p className={styles.resultsLead}>
              <span className={styles.blockLabel}>Result:</span>
            </p>
            <ul className={styles.resultsList}>
              {config.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <span
            className={[styles.readMore, config.id !== "a11y" && styles.readMoreFrosted].filter(Boolean).join(" ")}
            aria-hidden
          >
            <span className={styles.readMoreHighlight} aria-hidden />
            <span className={styles.readMoreLabel}>Read more...</span>
          </span>
          <p className={styles.project}>
            <span className={styles.blockLabel}>Project:</span>
            <span className={styles.blockValue}> {config.project}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalStatic({ config }: { config: Extract<CaseStudyTileConfig, { layout: "horizontal" }> }) {
  return (
    <div className={styles.horizontalMain}>
      <Title title={config.title} />
      <div className={styles.horizontalBody}>
        <p className={styles.intro}>{config.intro}</p>
        <TileHero config={config} small />
      </div>
    </div>
  );
}

function HorizontalHover({ config }: { config: Extract<CaseStudyTileConfig, { layout: "horizontal" }> }) {
  return (
    <div className={styles.horizontalMain}>
      <Title title={config.title} />
      <div className={styles.horizontalBody}>
        <p className={styles.intro}>{config.intro}</p>
        <div className={styles.horizontalAside}>
          <span className={[styles.readMore, styles.readMoreSquare].join(" ")} aria-hidden>
            <span className={styles.readMoreHighlight} aria-hidden />
            <span className={styles.readMoreLabel}>Read more...</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Figma tile-up / tile-hover — entire tile is a button with 150ms crossfade. */
export const CaseStudyTile = forwardRef<HTMLButtonElement, CaseStudyTileProps>(function CaseStudyTile(
  { config, selected = false, onClick },
  ref,
) {
  const isProject = config.layout === "project";

  return (
    <button
      ref={ref}
      type="button"
      className={[styles.tile, isProject ? styles.tileProject : styles.tileHorizontal].join(" ")}
      data-theme={themeForCaseStudyId(config.id)}
      data-figma-name={config.id}
      data-selected={selected || undefined}
      aria-expanded={selected}
      aria-label={`${Array.isArray(config.title) ? config.title.join(" ") : config.title} case study`}
      onClick={onClick}
    >
      <div className={[styles.layer, styles.layerUp].join(" ")} data-figma-variant="tile-up">
        <div className={styles.layerInner}>
          {isProject ? <ProjectStatic config={config} /> : <HorizontalStatic config={config} />}
        </div>
      </div>
      <div className={[styles.layer, styles.layerHover].join(" ")} data-figma-variant="tile-hover">
        <div className={styles.layerInner}>
          {isProject ? <ProjectHover config={config} /> : <HorizontalHover config={config} />}
        </div>
      </div>
    </button>
  );
});
