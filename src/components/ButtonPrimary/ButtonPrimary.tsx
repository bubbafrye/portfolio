import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./ButtonPrimary.module.css";

/** Matches Figma component property on node 27:54 (`disabled` was `Variant4` in an older export). */
export type ButtonPrimaryVisualState = "up" | "hover" | "down" | "disabled";

export type ButtonPrimaryProps = {
  /**
   * `interactive` (default): native `:hover`, `:active`, and `disabled` drive visuals.
   * `controlled`: `visualState` drives visuals (e.g. design docs); set `disabled` when `visualState` is `disabled`.
   */
  variant?: "interactive" | "controlled";
  /** Figma Property 1=Variant5 — icon-only collapse segment on the right. */
  layout?: "default" | "collapse";
  visualState?: ButtonPrimaryVisualState;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const ACCENT_SRC = `${import.meta.env.BASE_URL}assets/fbcbe6a59b3539e22d284e088fe73faa83771e52.svg`;
const CHEVRON_BACK = `${import.meta.env.BASE_URL}assets/5aa3aa90a039d192182708e320fb82aa595a2042.svg`;
const CHEVRON_FRONT = `${import.meta.env.BASE_URL}assets/79965da5cf1e4fc824d8e4c128ef4f1a8e67124a.svg`;

export function ButtonPrimary({
  variant = "interactive",
  layout = "default",
  visualState = "up",
  children = "Label",
  className,
  disabled,
  type = "button",
  ...rest
}: ButtonPrimaryProps) {
  const isControlled = variant === "controlled";
  const isDisabled = Boolean(disabled) || (isControlled && visualState === "disabled");

  const overlayState: ButtonPrimaryVisualState = isDisabled
    ? "disabled"
    : isControlled
      ? visualState
      : "up";

  const overlayClass = isControlled
    ? overlayState === "up"
      ? styles.overlayUp
      : overlayState === "hover"
        ? styles.overlayHover
        : overlayState === "down"
          ? styles.overlayDown
          : styles.overlayDisabled
    : "";

  const isCollapse = layout === "collapse";

  const rootClass = [styles.root, isCollapse && styles.rootCollapse, className].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      {...rest}
      disabled={isDisabled}
      className={rootClass}
      {...(isControlled ? { "data-visual-state": overlayState } : {})}
      data-button-variant={variant}
      data-figma-name="button_primary"
    >
      <span className={styles.backer} data-figma-name="frame" aria-hidden />
      <span className={styles.base} data-figma-name="base" aria-hidden />
      <span
        className={[styles.overlay, overlayClass].filter(Boolean).join(" ")}
        data-figma-name="overlay"
        aria-hidden
      />

      <span className={styles.labelsEnabled}>
        <span className={styles.labelShadow}>
          <span>{children}</span>
        </span>
        <span className={styles.labelTop}>
          <span>{children}</span>
        </span>
      </span>

      <span className={styles.labelsDisabled}>
        <span className={styles.labelDisabled}>
          <span>{children}</span>
        </span>
      </span>

      <span className={styles.accent} data-figma-name="accent" aria-hidden>
        <span className={styles.accentInner}>
          <img src={ACCENT_SRC} alt="" />
        </span>
      </span>

      {isCollapse && (
        <>
          <span className={styles.chevronBack} aria-hidden>
            <span className={styles.chevronInner}>
              <img src={CHEVRON_BACK} alt="" />
            </span>
          </span>
          <span className={styles.chevronFront} aria-hidden>
            <span className={styles.chevronInner}>
              <img src={CHEVRON_FRONT} alt="" />
            </span>
          </span>
        </>
      )}
    </button>
  );
}
