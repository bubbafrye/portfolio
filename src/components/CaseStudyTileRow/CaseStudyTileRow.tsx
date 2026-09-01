import { forwardRef, type ReactNode } from "react";
import styles from "./CaseStudyTileRow.module.css";

type CaseStudyTileRowProps = {
  name: string;
  children: ReactNode;
};

export const CaseStudyTileRow = forwardRef<HTMLDivElement, CaseStudyTileRowProps>(function CaseStudyTileRow(
  { name, children },
  ref,
) {
  return (
    <div ref={ref} className={styles.row} data-figma-name={name}>
      {children}
    </div>
  );
});
