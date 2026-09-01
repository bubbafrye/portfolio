import type { ReactNode } from "react";
import styles from "./TextBlockSub.module.css";

export type TextBlockSubProps = {
  heading: string;
  children: ReactNode;
  figmaName?: string;
  className?: string;
};

/** Figma component text-block-sub (900:1035). */
export function TextBlockSub({
  heading,
  children,
  figmaName = "text-block-sub",
  className,
}: TextBlockSubProps) {
  return (
    <section className={[styles.root, className].filter(Boolean).join(" ")} data-figma-name={figmaName}>
      <div className={styles["text-block"]} data-figma-name="text-block">
        <h3 className={styles.header} data-figma-name="header">
          {heading}
        </h3>
        <div className={styles.body} data-figma-name="body">
          {children}
        </div>
      </div>
    </section>
  );
}
