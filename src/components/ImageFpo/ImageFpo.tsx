import styles from "./ImageFpo.module.css";

export type ImageFpoSize = "full" | "side" | "half";

export type ImageFpoProps = {
  size?: ImageFpoSize;
  className?: string;
};

/** Figma instance swap me / swap_me placeholder (891:1439). */
export function ImageFpo({ size = "full", className }: ImageFpoProps) {
  const rootClass = [styles.root, styles[size], className].filter(Boolean).join(" ");

  return (
    <div className={rootClass} data-figma-name="swap me" aria-hidden>
      <p className={styles.label} data-figma-name="image FPO">
        image FPO
      </p>
    </div>
  );
}
