import type { CsHashId } from "../../utils/deepLinkHash";
import { DdAlt } from "./DdAlt";
import styles from "./TlDr.module.css";

export type TlDrVariant = "wide" | "wide-footer";

export type TlDrLink = {
  id: CsHashId;
  label: string;
};

export type TlDrProps = {
  variant?: TlDrVariant;
  links?: readonly TlDrLink[];
  activeLinkId?: string | null;
  onLinkClick?: (id: CsHashId) => void;
};

const HEADING = "Busy?  Take a snack-sized look at these case studies:";
const FOOTER_COPY = "Or take a deeper dive with the projects below...";

/** Figma tl-dr — wide header + wide-footer variants. */
export function TlDr({
  variant = "wide",
  links = [],
  activeLinkId = null,
  onLinkClick,
}: TlDrProps) {
  const isFooter = variant === "wide-footer";

  return (
    <section
      className={[styles.root, isFooter && styles.footerRoot].filter(Boolean).join(" ")}
      data-figma-name="tl-dr"
      data-variant={variant}
      data-theme="tl-dr"
    >
      <div className={styles.content} data-figma-name="content">
        {isFooter ? (
          <p className={styles.footerCopy}>{FOOTER_COPY}</p>
        ) : (
          <div className={styles.block} data-figma-name="block">
            <h2 className={styles.heading}>{HEADING}</h2>
            <div className={styles.links} data-figma-name="links">
              <div className={styles.linksBody} data-figma-name="links-body">
                {links.map((link) => (
                  <DdAlt
                    key={link.id}
                    label={link.label}
                    selected={activeLinkId === link.id}
                    onClick={() => onLinkClick?.(link.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
