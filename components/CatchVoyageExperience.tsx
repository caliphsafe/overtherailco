"use client";

import { useEffect, useRef, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible[0]) {
          return;
        }

        const nextIndex = Number(
          (visible[0].target as HTMLElement).dataset.index
        );

        if (!Number.isNaN(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        rootMargin: "-30% 0px -38% 0px",
        threshold: [0.05, 0.25, 0.5, 0.75],
      }
    );

    chapterRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  const activeChapter = chapters[activeIndex] || chapters[0];

  if (!activeChapter) {
    return null;
  }

  return (
    <section className={styles.voyageExperience} aria-label="Fishing voyage">
      <div className={styles.voyageCanvas}>
        <video
          key={activeChapter.video}
          className={styles.voyageVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={activeChapter.video} type="video/mp4" />
        </video>

        <div className={styles.voyageShade} aria-hidden="true" />

        <div className={styles.voyageActiveCopy}>
          <p>{activeChapter.time}</p>
          <h3>{activeChapter.title}</h3>
          <span>{activeChapter.meta}</span>
        </div>

        <div className={styles.voyageTrack} aria-hidden="true">
          <div className={styles.voyageTrackLine}>
            <i
              style={{
                width: `${
                  chapters.length <= 1
                    ? 100
                    : (activeIndex / (chapters.length - 1)) * 100
                }%`,
              }}
            />
          </div>

          <div className={styles.voyageTrackLabels}>
            {chapters.map((chapter, index) => (
              <span
                key={chapter.label}
                className={index <= activeIndex ? styles.isPassed : ""}
              >
                {chapter.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.voyageScrollRail}>
        {chapters.map((chapter, index) => (
          <article
            key={chapter.label}
            ref={(node) => {
              chapterRefs.current[index] = node;
            }}
            data-index={index}
            className={`${styles.voyageMoment} ${
              index === activeIndex ? styles.isActive : ""
            }`}
          >
            <div>
              <span className={styles.voyageMomentLabel}>{chapter.label}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
