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

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(Math.max(value, minimum), maximum);
}

export default function CatchVoyageExperience({
  chapters,
}: CatchVoyageExperienceProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Start buffering every chapter as soon as this component mounts.
    // All video elements remain mounted for the entire voyage, so a chapter
    // change is only an opacity crossfade — no source swap or new request.
    videoRefs.current.forEach((video) => {
      if (!video) {
        return;
      }

      video.preload = "auto";

      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        video.load();
      }
    });
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      const section = sectionRef.current;

      if (!section || chapters.length === 0) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(
        rect.height - viewportHeight,
        1
      );

      const progress = clamp(
        -rect.top / scrollableDistance
      );

      const nextIndex = Math.min(
        Math.floor(progress * chapters.length),
        chapters.length - 1
      );

      setScrollProgress(progress);
      setActiveIndex(nextIndex);
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [chapters.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index === activeIndex) {
        const playPromise = video.play();

        if (playPromise) {
          playPromise.catch(() => {
            // Muted autoplay can still be interrupted by browser policy.
          });
        }
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const activeChapter = chapters[activeIndex];

  if (!activeChapter) {
    return null;
  }

  const markerTop = `${scrollProgress * 100}%`;

  return (
    <section
      ref={sectionRef}
      className={styles.voyageExperience}
      aria-label="Fishing voyage"
    >
      <div className={styles.voyageCanvas}>
        <div
          className={styles.voyageVideoStack}
          aria-hidden="true"
        >
          {chapters.map((chapter, index) => (
            <video
              key={chapter.video}
              ref={(node) => {
                videoRefs.current[index] = node;
              }}
              className={`${styles.voyageVideoLayer} ${
                index === activeIndex ? styles.isActive : ""
              }`}
              muted
              loop
              playsInline
              preload="auto"
              tabIndex={-1}
            >
              <source
                src={chapter.video}
                type="video/mp4"
              />
            </video>
          ))}
        </div>

        <div
          className={styles.voyageShade}
          aria-hidden="true"
        />

        <div className={styles.voyageActiveCopy}>
          <p>{activeChapter.time}</p>
          <h3>{activeChapter.title}</h3>
          <span>{activeChapter.meta}</span>
        </div>

        <div
          className={styles.voyageVerticalGuide}
          aria-hidden="true"
        >
          <div className={styles.voyageGuideLine}>
            <i
              className={styles.voyageGuideFill}
              style={{
                height: markerTop,
              }}
            />

            <div
              className={styles.voyageBoatMarker}
              style={{
                top: markerTop,
              }}
            >
              <svg
                viewBox="0 0 34 34"
                role="presentation"
              >
                <path
                  d="M4.5 19.7h25l-4.1 6.1H9.1l-4.6-6.1Z"
                  fill="currentColor"
                />
                <path
                  d="M12 18.7V10h7.5l3.7 8.7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.4 10V6.8h2V10"
                  fill="currentColor"
                />
              </svg>
            </div>

            <span className={styles.voyageGuideArrow}>
              ↓
            </span>
          </div>

          <div className={styles.voyageGuideStations}>
            {chapters.map((chapter, index) => {
              const position =
                chapters.length <= 1
                  ? 0
                  : (index / (chapters.length - 1)) * 100;

              return (
                <span
                  key={chapter.label}
                  className={`${styles.voyageGuideStation} ${
                    index === activeIndex
                      ? styles.isActive
                      : ""
                  } ${
                    index < activeIndex
                      ? styles.isPassed
                      : ""
                  }`}
                  style={{
                    top: `${position}%`,
                  }}
                >
                  <i />
                  <b>{chapter.label}</b>
                </span>
              );
            })}
          </div>
        </div>

        <div className={styles.voyageMomentCopy}>
          <span>{activeChapter.label}</span>
          <p>{activeChapter.body}</p>
        </div>
      </div>

      <div
        className={styles.voyageScrollRail}
        aria-hidden="true"
      >
        {chapters.map((chapter) => (
          <div
            className={styles.voyageScrollMoment}
            key={chapter.label}
          />
        ))}
      </div>
    </section>
  );
}
