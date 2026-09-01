import type { ReactNode } from "react";
import styles from "./Insets.module.css";

export type InsetsProps = {
  children: ReactNode;
  figmaName?: string;
  className?: string;
};

/** Figma component insets (973:2260) — row of mini-blocks. */
export function Insets({ children, figmaName = "insets", className }: InsetsProps) {
  return (
    <div className={[styles.insets, className].filter(Boolean).join(" ")} data-figma-name={figmaName}>
      {children}
    </div>
  );
}
