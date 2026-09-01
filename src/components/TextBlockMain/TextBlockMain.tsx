import type { ReactNode } from "react";
import styles from "./TextBlockMain.module.css";

export type TextBlockMainVariant = "default" | "highlighted";

export type TextBlockMainProps = {
  variant?: TextBlockMainVariant;
  heading: string;
  children: ReactNode;
  /** Figma instance layer name (e.g. overview, problem, text-block-main). */
  figmaName?: string;
  className?: string;
};

/** Figma component text-block-main (900:978). */
export function TextBlockMain({
  variant = "default",
  heading,
  children,
  figmaName = "text-block-main",
  className,
}: TextBlockMainProps) {
  const rootClass = [styles.root, variant === "highlighted" && styles.highlighted, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={rootClass} data-figma-name={figmaName}>
      <div className={styles["text-block"]} data-figma-name="text-block">
        <h2 className={styles.header} data-figma-name="header">
          {heading}
        </h2>
        <div className={styles.body} data-figma-name="body">
          {children}
        </div>
      </div>
    </section>
  );
}
