import { resumeContent, resumeDownloads } from "../../content/resumeContent";
import styles from "./ResumeModule.module.css";

const CLOSE_ICON = `${import.meta.env.BASE_URL}assets/resume/close.svg`;

type ResumeModuleProps = {
  onClose: () => void;
};

function downloadFile(href: string, filename: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/** Figma resume — node 1573:2010 */
export function ResumeModule({ onClose }: ResumeModuleProps) {
  const c = resumeContent;

  return (
    <section className={styles.root} data-figma-name="resume" id="resume">
      <header className={styles.hud} data-figma-name="HUD">
        <div className={styles.hudLeft}>
          <span className={styles.downloadLabel}>Download:</span>
          <button
            type="button"
            className={styles.downloadBtn}
            data-figma-name="read-more-btn"
            onClick={() => downloadFile(resumeDownloads.ats.href, resumeDownloads.ats.filename)}
          >
            {resumeDownloads.ats.label}
          </button>
          <button
            type="button"
            className={styles.downloadBtn}
            data-figma-name="read-more-btn"
            onClick={() => downloadFile(resumeDownloads.pdf.href, resumeDownloads.pdf.filename)}
          >
            {resumeDownloads.pdf.label}
          </button>
        </div>
        <button type="button" className={styles.closeBtn} data-figma-name="close" onClick={onClose} aria-label="Close resume">
          <img src={CLOSE_ICON} alt="" />
        </button>
      </header>

      <div className={styles.content} data-figma-name="resume">
        <header className={styles.header} data-figma-name="header">
          <div className={styles.titleBlock} data-figma-name="title">
            <h1 className={styles.name}>
              <span className={styles.nameAccent}>{c.name.accent}</span>
              {c.name.rest}
            </h1>
            <p className={styles.subtitle}>{c.subtitle}</p>
          </div>
          <address className={styles.contact} data-figma-name="contact">
            <p>{c.contact.phone}</p>
            <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
            <a href={c.contact.websiteHref}>{c.contact.website}</a>
          </address>
        </header>

        <div className={styles.bio} data-figma-name="bio">
          <p>{c.bio}</p>
        </div>

        <section className={styles.skills} data-figma-name="skills">
          <h2 className={styles.sectionHeading}>Skills</h2>
          <div className={styles.skillGrid} data-figma-name="skills">
            {c.skills.map((block) => (
              <div className={styles.skillBlock} data-figma-name="skill-block" key={block.heading}>
                <h3 className={styles.skillHeading}>{block.heading}</h3>
                <p className={styles.skillItems}>{block.items}</p>
              </div>
            ))}
          </div>
        </section>

        <h2 className={styles.sectionHeading} data-figma-name="experience">
          Experience
        </h2>

        {c.experience.map((job) => (
          <article className={styles.job} data-figma-name={job.id} key={job.id}>
            <div className={styles.jobTitle} data-figma-name="job-title">
              <span className={styles.jobTitleRole}>{job.title}</span>
              <span className={styles.jobTitleSep}>|</span>
              <span className={styles.jobTitleMeta}>
                {job.company}, {job.dates}
              </span>
            </div>
            {job.paragraphs?.map((paragraph) => (
              <div className={styles.jobBody} data-figma-name="bio" key={paragraph.slice(0, 24)}>
                <p>{paragraph}</p>
              </div>
            ))}
            {job.bullets && (
              <div className={styles.jobBody} data-figma-name="bio">
                <ul>
                  {job.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}

        <h2 className={styles.sectionHeading} data-figma-name="education">
          Education
        </h2>

        <div className={styles.education} data-figma-name="schools">
          {c.education.map((entry) => (
            <div className={styles.educationRow} data-figma-name="job-title" key={entry.school}>
              <span className={styles.educationSchool}>{entry.school}</span>
              <span className={styles.educationSep}>|</span>
              <span className={styles.educationDetail}>{entry.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
