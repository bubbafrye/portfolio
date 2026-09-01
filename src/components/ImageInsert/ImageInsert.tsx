import type { ReactNode } from "react";
import { ImageFpo } from "../ImageFpo";
import styles from "./ImageInsert.module.css";

/** Figma Property 1: img-full | img-right | img-left | img-two */
export type ImageInsertVariant = "default" | "variant2" | "variant3" | "variant4";

export type ImageInsertProps = {
  variant?: ImageInsertVariant;
  caption?: string;
  heading?: string;
  children?: ReactNode;
  figmaName?: string;
  className?: string;
};

/** Figma component image-insert (927:849). */
export function ImageInsert({
  variant = "default",
  caption,
  heading,
  children,
  figmaName = "image-insert",
  className,
}: ImageInsertProps) {
  const rootClass = [styles.root, styles[variant], className].filter(Boolean).join(" ");

  if (variant === "default") {
    return (
      <figure className={rootClass} data-figma-name={figmaName}>
        <ImageFpo size="full" />
        {caption && (
          <figcaption className={styles.caption} data-figma-name="caption">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (variant === "variant4") {
    return (
      <figure className={rootClass} data-figma-name={figmaName}>
        <div className={styles["frame-5"]} data-figma-name="Frame 5">
          <ImageFpo size="half" />
          <ImageFpo size="half" />
        </div>
        {caption && (
          <figcaption className={styles.caption} data-figma-name="caption">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  const textColumn = (
    <div className={styles["frame-5"]} data-figma-name="Frame 5">
      {heading && (
        <h3 className={styles.header} data-figma-name="header">
          {heading}
        </h3>
      )}
      <div className={styles.body} data-figma-name="body">
        {children}
      </div>
    </div>
  );

  return (
    <figure className={rootClass} data-figma-name={figmaName}>
      {variant === "variant3" && <ImageFpo size="side" />}
      {textColumn}
      {variant === "variant2" && <ImageFpo size="side" />}
    </figure>
  );
}
