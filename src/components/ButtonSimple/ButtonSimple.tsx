import styles from "./ButtonSimple.module.css";

export type ButtonSimpleProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  "aria-expanded"?: boolean;
};

/** Figma button-simple — layered bg expands and fades on hover. */
export function ButtonSimple({
  label = "Read more...",
  onClick,
  className,
  "aria-expanded": ariaExpanded,
}: ButtonSimpleProps) {
  return (
    <button
      type="button"
      className={[styles.root, className].filter(Boolean).join(" ")}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-label={label}
      data-figma-name="button-simple"
    >
      <span className={styles.bgLayer} aria-hidden />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
