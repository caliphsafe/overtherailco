import styles from "@/app/catch/catch.module.css";

type VoyageBackground =
  | {
      type: "video";
      src: string;
      poster?: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    };

type FishermansTale = {
  image: string;
  imageAlt: string;
  quote: string;
  credit: string;
  caption: string;
};

type VoyageChapter = {
  label: string;
  time: string;
  title: string;
  body: string;
  meta: string;
  background: VoyageBackground;
  tale: FishermansTale;
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
      <div
        className={styles.voyageSpine}
        aria-hidden="true"
      />

      {chapters.map((chapter, index) => (
        <article
          className={styles.voyageScene}
          key={`${chapter.label}-${chapter.background.src}`}
        >
          {chapter.background.type === "video" ? (
            <video
              className={styles.voyageSceneVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={chapter.background.poster}
              aria-hidden="true"
              tabIndex={-1}
            >
              <source
                src={chapter.background.src}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              className={styles.voyageSceneVideo}
              src={chapter.background.src}
              alt={chapter.background.alt}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
            />
          )}

          <div
            className={styles.voyageSceneShade}
            aria-hidden="true"
          />

          <div className={styles.voyageSceneInner}>
            <div
              className={styles.voyageWaypoint}
              aria-hidden="true"
            >
              <span />
            </div>

            <div className={styles.voyageSceneLayout}>
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

              <figure className={styles.fishermansTale}>
                <div className={styles.fishermansTaleImageWrap}>
                  <img
                    className={styles.fishermansTaleImage}
                    src={chapter.tale.image}
                    alt={chapter.tale.imageAlt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />

                  <span
                    className={styles.fishermansTaleImageIndex}
                    aria-hidden="true"
                  >
                    {chapter.label}
                  </span>
                </div>

                <figcaption className={styles.fishermansTaleCopy}>
                  <span className={styles.fishermansTaleLabel}>
                    Fisherman&apos;s Tale
                  </span>

                  <blockquote>
                    “{chapter.tale.quote}”
                  </blockquote>

                  <div className={styles.fishermansTaleCredit}>
                    <strong>{chapter.tale.credit}</strong>
                    <span>{chapter.tale.caption}</span>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>

          {index < chapters.length - 1 && (
            <div
              className={styles.voyageContinue}
              aria-hidden="true"
            >
              <span>↓</span>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
