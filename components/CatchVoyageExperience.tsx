import styles from "@/app/catch/catch.module.css";

type VoyageChapter = {
  label: string;
  time: string;
  title: string;
  body: string;
  meta: string;
  video: string;
};

type CatchVoyageExperienceProps = {
  chapters: VoyageChapter[];
};

export default function CatchVoyageExperience({
  chapters,
}: CatchVoyageExperienceProps) {
  if (!chapters.length) {
    return null;
  }

  return (
    <section
      className={styles.voyageStory}
      aria-label="Fishing voyage"
    >
      <div className={styles.voyageSpine} aria-hidden="true" />

      {chapters.map((chapter, index) => (
        <article
          className={styles.voyageScene}
          key={`${chapter.label}-${chapter.video}`}
        >
          <video
            className={styles.voyageSceneVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={chapter.video} type="video/mp4" />
          </video>

          <div className={styles.voyageSceneShade} aria-hidden="true" />

          <div className={styles.voyageSceneInner}>
            <div className={styles.voyageWaypoint} aria-hidden="true">
              <span />
            </div>

            <div className={styles.voyageSceneCopy}>
              <div className={styles.voyageSceneMeta}>
                <span>{chapter.label}</span>
                <i />
                <span>{chapter.time}</span>
              </div>

              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
              <strong>{chapter.meta}</strong>
            </div>
          </div>

          {index < chapters.length - 1 && (
            <div className={styles.voyageContinue} aria-hidden="true">
              <span>↓</span>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
