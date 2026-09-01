import { type ReactNode } from "react";
import { ButtonSimple } from "../ButtonSimple";
import { SeeMoreBtn } from "../SeeMoreBtn";
import styles from "./CaseStudySummary.module.css";

export type CaseStudySummaryProps = {
  title: string;
  project?: string;
  intro?: string;
  role: string;
  results?: readonly string[];
  resultsLabel?: string;
  resultsContent?: ReactNode;
  heroImage: string;
  heroImageAlt?: string;
  heroImageFlip?: boolean;
  heroImageRounded?: boolean;
  heroImageBorderMuted?: boolean;
  metaFont?: "primary" | "secondary";
  expanded?: boolean;
  onToggle?: () => void;
};

/** Collapsed hero — Figma main-block inside a11y/park collapsed variants. */
export function CaseStudySummary({
  title,
  project,
  intro,
  role,
  results,
  resultsLabel = "Result:",
  resultsContent,
  heroImage,
  heroImageAlt = "",
  heroImageFlip = false,
  heroImageRounded = false,
  heroImageBorderMuted = false,
  metaFont = "secondary",
  expanded = false,
  onToggle,
}: CaseStudySummaryProps) {
  return (
    <div className={styles.mainBlock} data-figma-name="main-block">
      <div className={styles.imageCol}>
        <div
          className={[
            styles.imageWrap,
            heroImageFlip && styles.imageFlip,
            heroImageRounded && styles.imageRounded,
            heroImageBorderMuted && styles.imageRoundedMuted,
          ]
            .filter(Boolean)
            .join(" ")}
          data-figma-name="img"
        >
          <img src={heroImage} alt={heroImageAlt} />
        </div>
      </div>

      <div className={styles.content} data-figma-name="Content">
        <div className={styles.text} data-figma-name="Text">
          <h2 className={styles.title}>{title}</h2>
          {(intro || project) && (
            <div className={styles.meta} data-font={metaFont}>
              {intro ? (
                <p>{intro}</p>
              ) : (
                <p>
                  <span className={styles.label}>Project</span>
                  <span className={styles.value}>: {project}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {(resultsContent || (results && results.length > 0)) && (
          <div className={styles.results}>
            <p className={styles.label}>{resultsLabel}</p>
            {resultsContent ?? (
              <ul>
                {results?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className={styles.roleMore} data-figma-name="role-more">
          <p className={styles.roleLine}>
            <span className={styles.label}>My role:</span>
            <span className={styles.value}> {role}</span>
          </p>
          {onToggle && (
            <ButtonSimple
              label={expanded ? "Collapse" : "Read more..."}
              onClick={onToggle}
              aria-expanded={expanded}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export type CaseStudyToggleProps = {
  expanded: boolean;
  onToggle: () => void;
};

export function CaseStudyToggle({ expanded, onToggle }: CaseStudyToggleProps) {
  return (
    <div className={styles.btnRow} data-figma-name="btn">
      <SeeMoreBtn
        variant={expanded ? "collapse" : "read-more"}
        onClick={onToggle}
        aria-expanded={expanded}
      />
    </div>
  );
}

export type CaseStudyBackToTopProps = {
  onClick: () => void;
};

export function CaseStudyBackToTop({ onClick }: CaseStudyBackToTopProps) {
  return (
    <div className={styles.btnRow} data-figma-name="btn">
      <SeeMoreBtn variant="back-to-top" onClick={onClick} />
    </div>
  );
}
