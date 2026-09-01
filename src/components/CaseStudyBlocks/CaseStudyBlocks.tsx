import type { CSSProperties, ReactNode } from "react";
import styles from "./CaseStudyBlocks.module.css";

type AccentSectionProps = {
  accent?: string;
  gap?: "sm" | "md" | "xl";
  align?: "start" | "center";
  inset?: boolean;
  figmaName?: string;
  children: ReactNode;
};

export function CaseStudyAccentSection({
  accent,
  gap = "sm",
  align = "center",
  inset = false,
  figmaName,
  children,
}: AccentSectionProps) {
  return (
    <section
      className={styles.accentSection}
      data-figma-name={figmaName}
      data-gap={gap}
      data-align={align}
      data-inset={inset || undefined}
      style={accent ? ({ "--accent-border": accent } as CSSProperties) : undefined}
    >
      {children}
    </section>
  );
}

type TextSectionProps = {
  heading?: string;
  children: ReactNode;
  highlighted?: boolean;
  accent?: string;
  headingSize?: "lg" | "md";
  figmaName?: string;
};

export function CaseStudyTextSection({
  heading,
  children,
  highlighted = false,
  accent,
  headingSize = "lg",
  figmaName = "text-block",
}: TextSectionProps) {
  return (
    <section
      className={[styles.textSection, highlighted && styles.highlighted, accent && styles.accentBorder]
        .filter(Boolean)
        .join(" ")}
      data-figma-name={figmaName}
      style={accent ? ({ "--accent-border": accent } as CSSProperties) : undefined}
    >
      {heading && (
        <h3 className={headingSize === "md" ? styles.subheading : styles.heading}>{heading}</h3>
      )}
      <div className={styles.body}>{children}</div>
    </section>
  );
}

type MiniBlocksProps = {
  blocks: readonly { title: string; body: string }[];
  accent?: string;
  columns?: 2 | 3;
  figmaName?: string;
};

export function CaseStudyMiniBlocks({
  blocks,
  accent,
  columns = 3,
  figmaName = "insets",
}: MiniBlocksProps) {
  return (
    <div
      className={styles.miniGrid}
      data-figma-name={figmaName}
      style={accent ? ({ "--mini-bg": accent } as CSSProperties) : undefined}
      data-columns={columns}
    >
      {blocks.map((block) => (
        <article key={block.title} className={styles.miniBlock} data-figma-name="mini-block">
          <h4 className={styles.miniTitle}>{block.title}</h4>
          <p className={styles.miniBody}>{block.body}</p>
        </article>
      ))}
    </div>
  );
}

type ImageRowProps = {
  heading?: string;
  body?: string | readonly string[] | ReactNode;
  footer?: string;
  caption?: string;
  imageSrc?: string;
  imageAlt?: string;
  mediaPosition?: "left" | "right";
  layout?: "default" | "contrast";
  figmaName?: string;
  accent?: string;
};

export function CaseStudyImageRow({
  heading,
  body,
  footer,
  caption,
  imageSrc,
  imageAlt = "",
  mediaPosition = "right",
  layout = "default",
  figmaName = "image-insert",
  accent,
}: ImageRowProps) {
  const bodyParagraphs =
    body == null ? [] : Array.isArray(body) ? body : typeof body === "string" ? [body] : null;

  const textBlock = (heading || bodyParagraphs || body) && (
    <div className={styles.imageRowText}>
      {heading && <h3 className={styles.subheading}>{heading}</h3>}
      {bodyParagraphs
        ? bodyParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        : body && <div>{body}</div>}
    </div>
  );

  const imageBlock = imageSrc ? (
    <figure className={styles.imageSlot}>
      <img src={imageSrc} alt={imageAlt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  ) : null;

  return (
    <section
      className={styles.imageRow}
      data-figma-name={figmaName}
      style={accent ? ({ "--accent-border": accent } as CSSProperties) : undefined}
    >
      <div
        className={styles.imageRowTop}
        data-figma-name="text-img"
        data-media-position={mediaPosition}
        data-layout={layout !== "default" ? layout : undefined}
        data-text-only={imageBlock ? undefined : true}
      >
        {mediaPosition === "left" ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
      {footer && (
        <div className={styles.imageRowBottom} data-figma-name="bottom-text">
          <p className={styles.imageRowFooter}>{footer}</p>
        </div>
      )}
    </section>
  );
}

type GalleryImage = {
  src: string;
  caption: string;
  alt?: string;
};

type ImageGalleryProps = {
  intro: ReactNode;
  images: readonly GalleryImage[];
  figmaName?: string;
  accent?: string;
};

export function CaseStudyImageGallery({
  intro,
  images,
  figmaName = "image-insert",
  accent,
}: ImageGalleryProps) {
  return (
    <section
      className={styles.imageGallery}
      data-figma-name={figmaName}
      style={accent ? ({ "--accent-border": accent } as CSSProperties) : undefined}
    >
      <div className={styles.imageGalleryIntro}>{intro}</div>
      <div className={styles.imageGalleryGrid} data-figma-name="img-array">
        {images.map((image) => (
          <figure key={image.caption} className={styles.gallerySlot} data-figma-name="image">
            <img src={image.src} alt={image.alt ?? image.caption} />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

type DualImageItem = {
  src?: string;
  caption: string;
  alt?: string;
  type?: "image" | "video";
  poster?: string;
};

type DualImageProps = {
  images: readonly DualImageItem[];
  figmaName?: string;
  variant?: "default" | "keyboard" | "paired";
};

function DualMedia({ image }: { image: DualImageItem }) {
  if (!image.src) {
    return <div className={styles.placeholder} aria-hidden />;
  }

  if (image.type === "video") {
    return (
      <video
        src={image.src}
        poster={image.poster}
        controls
        playsInline
        preload="metadata"
        aria-label={image.alt ?? image.caption}
      />
    );
  }

  return <img src={image.src} alt={image.alt ?? image.caption} />;
}

export function CaseStudyDualImages({
  images,
  figmaName = "image-insert",
  variant = "default",
}: DualImageProps) {
  if (variant === "keyboard") {
    const [left, right] = images;
    return (
      <div className={styles.keyboardGallery} data-figma-name={figmaName}>
        <div className={styles.keyboardGalleryRow}>
          {left && (
            <figure className={styles.keyboardSlotFixed} data-figma-name="swap me">
              <DualMedia image={left} />
              <figcaption>{left.caption}</figcaption>
            </figure>
          )}
          {right && (
            <figure className={styles.keyboardSlotFlex} data-figma-name="video">
              <DualMedia image={right} />
              <figcaption>{right.caption}</figcaption>
            </figure>
          )}
        </div>
      </div>
    );
  }

  if (variant === "paired") {
    return (
      <div className={styles.pairedGallery} data-figma-name={figmaName}>
        <div className={styles.pairedGalleryRow}>
          {images.map((image) => (
            <figure key={image.caption} className={styles.pairedSlot} data-figma-name="swap me">
              {image.src ? (
                <img src={image.src} alt={image.alt ?? image.caption} />
              ) : (
                <div className={styles.placeholder} aria-hidden />
              )}
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={styles.dualImages} data-figma-name={figmaName}>
      {images.map((image) => (
        <figure key={image.caption} className={styles.imageSlot} data-figma-name="swap me">
          {image.src ? (
            <img src={image.src} alt={image.alt ?? image.caption} />
          ) : (
            <div className={styles.placeholder} aria-hidden />
          )}
          <figcaption>{image.caption}</figcaption>
        </figure>
      ))}
    </section>
  );
}

type KeyboardSectionProps = {
  heading: string;
  children: ReactNode;
  images: readonly DualImageItem[];
  accent?: string;
  figmaName?: string;
};

export function CaseStudyKeyboardSection({
  heading,
  children,
  images,
  accent,
  figmaName = "keyboard",
}: KeyboardSectionProps) {
  return (
    <CaseStudyAccentSection accent={accent} gap="md" align="start" inset figmaName={figmaName}>
      <div className={styles.accentTextBlock} data-figma-name="text-block">
        <h3>{heading}</h3>
        {children}
      </div>
      <CaseStudyDualImages images={images} figmaName="keyboard-img" variant="keyboard" />
    </CaseStudyAccentSection>
  );
}

type SubSectionProps = {
  heading: string;
  children: ReactNode;
  images: readonly DualImageItem[];
  accent?: string;
  figmaName?: string;
  wrapperName?: string;
};

export function CaseStudySubSection({
  heading,
  children,
  images,
  accent,
  figmaName = "text-block-sub",
  wrapperName = "tournament",
}: SubSectionProps) {
  return (
    <div data-figma-name={wrapperName}>
      <CaseStudyAccentSection accent={accent} gap="xl" align="start" inset figmaName={figmaName}>
        <div className={styles.accentTextBlock} data-figma-name="text-block" data-lead="normal">
          <h3>{heading}</h3>
          {children}
        </div>
        <CaseStudyDualImages images={images} figmaName="image-insert" variant="paired" />
      </CaseStudyAccentSection>
    </div>
  );
}

type BulletResultProps = {
  heading: string;
  bullets: readonly string[];
  highlighted?: boolean;
};

export function CaseStudyBulletResult({ heading, bullets, highlighted }: BulletResultProps) {
  return (
    <CaseStudyTextSection heading={heading} highlighted={highlighted} figmaName="result">
      <ul className={styles.resultList}>
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </CaseStudyTextSection>
  );
}

type ImageStripItem = {
  src: string;
  alt: string;
};

type ImageStripProps = {
  intro?: string;
  images: readonly ImageStripItem[];
  accent?: string;
  figmaName?: string;
};

export function CaseStudyImageStrip({
  intro,
  images,
  accent,
  figmaName = "stickems-strip",
}: ImageStripProps) {
  return (
    <section
      className={styles.imageStrip}
      data-figma-name={figmaName}
      style={accent ? ({ "--accent-border": accent } as CSSProperties) : undefined}
    >
      {intro && <p className={styles.imageStripIntro}>{intro}</p>}
      <div className={styles.imageStripRow} data-figma-name="images">
        {images.map((image) => (
          <figure key={image.src} className={styles.stripSlot}>
            <img src={image.src} alt={image.alt} />
          </figure>
        ))}
      </div>
    </section>
  );
}

type AccentDetailProps = {
  heading: string;
  intro?: string;
  detailText?: string;
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
  challenge: string;
  resolution: string;
  accent?: string;
  figmaName?: string;
};

export function CaseStudyAccentDetailSection({
  heading,
  intro,
  detailText,
  imageSrc,
  imageAlt = "",
  caption,
  challenge,
  resolution,
  accent,
  figmaName = "accent-detail",
}: AccentDetailProps) {
  return (
    <CaseStudyAccentSection accent={accent} gap="sm" align="start" inset figmaName={figmaName}>
      <div className={styles.accentDetailMain} data-figma-name="main">
        <h3 className={styles.subheading}>{heading}</h3>
        {intro && <p>{intro}</p>}
      </div>
      {detailText && (
        <div className={styles.accentDetailTextImg} data-figma-name="text-img">
          <div className={styles.accentDetailTextBlock}>
            <p>{detailText}</p>
          </div>
          {imageSrc && (
            <figure className={styles.accentDetailImage} data-figma-name="carousel">
              <img src={imageSrc} alt={imageAlt || caption || heading} />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          )}
        </div>
      )}
      <div className={styles.accentDetailPanel} data-figma-name="challenge" data-position="top">
        <h3 className={styles.subheading}>Challenge:</h3>
        <p>{challenge}</p>
      </div>
      <div className={styles.accentDetailPanel} data-figma-name="resolution" data-position="bottom">
        <h3 className={styles.subheading}>Resolution:</h3>
        <p>{resolution}</p>
      </div>
    </CaseStudyAccentSection>
  );
}

type ChallengeResolutionProps = {
  challenge: string;
  resolution: string;
  accent?: string;
  figmaName?: string;
};

export function CaseStudyChallengeResolution({
  challenge,
  resolution,
  accent,
  figmaName = "challenge-resolution",
}: ChallengeResolutionProps) {
  return (
    <section
      className={styles.challengeGroup}
      data-figma-name={figmaName}
      style={accent ? ({ "--accent-border": accent } as CSSProperties) : undefined}
    >
      <CaseStudyTextSection heading="Challenge:" figmaName="text-block-sub" accent={accent ?? "var(--panel-accent-dark)"}>
        <p>{challenge}</p>
      </CaseStudyTextSection>
      <CaseStudyTextSection heading="Resolution:" figmaName="text-block-sub" accent={accent ?? "var(--panel-accent-dark)"}>
        <p>{resolution}</p>
      </CaseStudyTextSection>
    </section>
  );
}

type WideImageProps = {
  src: string;
  alt?: string;
  caption?: string;
  fixedHeight?: number;
  figmaName?: string;
};

export function CaseStudyWideImage({
  src,
  alt = "",
  caption,
  fixedHeight,
  figmaName = "image-insert",
}: WideImageProps) {
  return (
    <figure
      className={styles.wideImage}
      data-figma-name={figmaName}
      data-fixed-height={fixedHeight || undefined}
    >
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

type ProjectCard = {
  title: string;
  body: string;
  href?: string;
  hoverLabel?: string;
  image: string;
  imageAlt?: string;
};

function ProjectSmallCard({ project }: { project: ProjectCard }) {
  const hoverLabel = project.hoverLabel ?? "Read more...";
  const content = (
    <>
      <div className={styles.projectCardLeft} data-figma-name="left">
        <div className={styles.projectCardMedia} data-figma-name="image 2">
          <img src={project.image} alt={project.imageAlt ?? project.title} />
        </div>
        <div className={styles.projectCardFauxBtn} data-figma-name="faux-btn">
          <span className={styles.projectCardFauxBtnInner} data-figma-name="content">
            <span className={styles.projectCardFauxBtnHighlight} aria-hidden />
            <span className={styles.projectCardFauxBtnLabel}>{hoverLabel}</span>
          </span>
        </div>
      </div>
      <div className={styles.projectCardText} data-figma-name="right">
        <h3>{project.title}</h3>
        <p>{project.body}</p>
      </div>
    </>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        className={styles.projectCard}
        data-figma-name="project-small"
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <article className={styles.projectCard} data-figma-name="project-small">
      {content}
    </article>
  );
}

type ProjectCardsProps = {
  projects: readonly ProjectCard[];
  align?: "center" | "start";
  figmaName?: string;
};

export function CaseStudyProjectCards({
  projects,
  align = "center",
  figmaName = "project-cards",
}: ProjectCardsProps) {
  return (
    <div className={styles.projectCards} data-figma-name={figmaName} data-align={align}>
      {projects.map((project) => (
        <ProjectSmallCard key={project.title} project={project} />
      ))}
    </div>
  );
}
