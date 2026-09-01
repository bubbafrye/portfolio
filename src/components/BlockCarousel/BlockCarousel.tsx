import { useState, type CSSProperties, type ReactNode } from "react";
import styles from "./BlockCarousel.module.css";

export type CarouselSlide = {
  /** Full-resolution image shown in the feature slot and scaled down for its matching thumbnail. */
  src?: string;
  caption: string;
  alt?: string;
};

/** Matches Figma block-carousel variant property names. */
export type BlockCarouselLayout = "image-right" | "image-left";

type BlockCarouselProps = {
  heading: string;
  children: ReactNode;
  slides: readonly CarouselSlide[];
  layout?: BlockCarouselLayout;
  accent?: string;
  figmaName?: string;
};

const THUMB_NAMES = ["thumb-a", "thumb-b", "thumb-c", "thumb-d", "thumb-e", "thumb-f"] as const;

function thumbFigmaName(slideIndex: number) {
  return THUMB_NAMES[slideIndex] ?? `thumb-${slideIndex}`;
}

/** Figma block-carousel — 1:1 thumbnails with hero cross-fade. */
export function BlockCarousel({
  heading,
  children,
  slides,
  layout = "image-right",
  accent,
  figmaName = "block-carousel",
}: BlockCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = slides[activeIndex];

  const textBlock = (
    <div className={styles.text} data-figma-name="text block">
      <h3 className={styles.heading}>{heading}</h3>
      <div className={styles.body}>{children}</div>
    </div>
  );

  const carousel = (
    <div className={styles.carousel} data-figma-name="carousel">
      <figure className={styles.swapMe} data-figma-name="swap me">
        <div className={styles.feature} data-figma-name="feature">
          {slides.some((slide) => slide.src) ? (
            slides.map((slide, index) =>
              slide.src ? (
                <img
                  key={slide.src}
                  className={index === activeIndex ? styles.featureVisible : styles.featureHidden}
                  src={slide.src}
                  alt={index === activeIndex ? (slide.alt ?? slide.caption) : ""}
                  aria-hidden={index !== activeIndex}
                />
              ) : null,
            )
          ) : (
            <div className={styles.placeholder} aria-hidden />
          )}
        </div>
        <figcaption className={styles.caption} aria-live="polite">
          {featured?.caption}
        </figcaption>
      </figure>

      {slides.length > 0 && (
        <div className={styles.thumbs} data-figma-name="array" role="group" aria-label="Image thumbnails">
          {slides.map((slide, slideIndex) => {
            const selected = slideIndex === activeIndex;

            return (
              <button
                key={slideIndex}
                type="button"
                className={[styles.thumb, selected && styles.thumbSelected].filter(Boolean).join(" ")}
                data-figma-name={thumbFigmaName(slideIndex)}
                onClick={() => setActiveIndex(slideIndex)}
                aria-label={`Show image: ${slide.caption}`}
                aria-pressed={selected}
                aria-current={selected ? "true" : undefined}
              >
                {slide.src ? (
                  <img src={slide.src} alt="" />
                ) : (
                  <div className={styles.thumbPlaceholder} aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <section
      className={styles.root}
      data-figma-name={figmaName}
      data-figma-variant={layout}
      style={accent ? ({ "--accent-border": accent } as CSSProperties) : undefined}
    >
      <div className={styles.row} data-figma-name="text-img">
        {layout === "image-left" ? (
          <>
            {carousel}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {carousel}
          </>
        )}
      </div>
    </section>
  );
}
