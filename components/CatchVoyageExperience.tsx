"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/catch/catch.module.css";

type VoyageChapter = {
  step: string;
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
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const leading = visible[0];

        if (!leading) {
          return;
        }

        const index = Number(
          (leading.target as HTMLElement).dataset.index
        );

        if (!Number.isNaN(index)) {
          setActiveIndex(index);
        }
      },
      {
        rootMargin: "-24% 0px -46% 0px",
        threshold: [0.05, 0.2, 0.5, 0.8],
      }
    );

    stepRefs.current.forEach((node) => {
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
    <div className={styles.voyageExperience}>
      <div className={styles.voyageSticky}>
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

        <div className={styles.voyageHud}>
          <div className={styles.voyageHudTop}>
            <span>VOYAGE LOG</span>
            <span>
              {activeChapter.step} / {chapters.length.toString().padStart(2, "0")}
            </span>
          </div>

          <div className={styles.voyageCoordinates}>
            <small>{activeChapter.time}</small>
            <strong>{activeChapter.meta}</strong>
          </div>

          <div className={styles.voyageProgress}>
            {chapters.map((chapter, index) => (
              <button
                key={chapter.step}
                className={index === activeIndex ? styles.isActive : ""}
                type="button"
                aria-label={`Go to ${chapter.title}`}
                onClick={() => {
                  stepRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.voyageCopyRail}>
        {chapters.map((chapter, index) => (
          <article
            key={chapter.step}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
            data-index={index}
            className={`${styles.voyageChapter} ${
              index === activeIndex ? styles.isActive : ""
            }`}
          >
            <span className={styles.voyageChapterNumber}>{chapter.step}</span>

            <div>
              <p className={styles.voyageTime}>{chapter.time}</p>
              <h3>{chapter.title}</h3>
              <p className={styles.voyageBody}>{chapter.body}</p>
              <span className={styles.voyageMetaMobile}>{chapter.meta}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
