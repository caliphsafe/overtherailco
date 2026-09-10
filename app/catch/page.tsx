import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  DEMO_CATCH_TRIP_ID,
} from "@/lib/catch-trips";
import styles from "./catch.module.css";

export const metadata: Metadata = {
  title: "Trace Your Catch",
  description:
    "Enter the catch passport code from your seafood package to trace the fishing trip behind it.",
};

type CatchLandingProps = {
  searchParams: Promise<{
    trip?: string;
  }>;
};

export default async function CatchLandingPage({
  searchParams,
}: CatchLandingProps) {
  const { trip } = await searchParams;

  if (trip?.trim()) {
    redirect(
      `/catch/${encodeURIComponent(
        trip.trim().toLowerCase()
      )}`
    );
  }

  return (
    <div className={styles.page}>
      <section
        className={`${styles.hero} ${styles.lookupHero}`}
      >
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src="/hero.mp4"
            type="video/mp4"
          />
        </video>

        <div
          className={styles.heroOverlay}
          aria-hidden="true"
        />

        <div className={styles.lookupShell}>
          <div className={styles.lookupTop}>
            <div
              className={styles.collaborationLockup}
              aria-label="Over The Rail Co. in collaboration with Fleet Fisheries"
            >
              <div className={styles.logoBoxDark}>
                <img
                  src="/icon.png"
                  alt="Over The Rail Co."
                />
              </div>

              <span className={styles.collabX}>
                ×
              </span>

              <div className={styles.logoBoxLight}>
                <img
                  src="/fleet.png"
                  alt="Fleet Fisheries"
                />
              </div>
            </div>

            <span className={styles.lookupTag}>
              Catch traceability
            </span>
          </div>

          <div className={styles.lookupGrid}>
            <div>
              <p className={styles.kicker}>
                From trip to table
              </p>

              <h1>
                Trace
                <br />
                your
                <br />
                <em>catch.</em>
              </h1>

              <p className={styles.heroLead}>
                Scan the QR code on your package
                or enter its trip code below to
                meet the vessel, captain, and
                journey behind your scallops.
              </p>
            </div>

            <form
              className={styles.lookupForm}
              action="/catch"
              method="get"
            >
              <label htmlFor="trip">
                Catch passport code
              </label>

              <input
                id="trip"
                name="trip"
                type="text"
                inputMode="text"
                autoCapitalize="characters"
                autoComplete="off"
                placeholder="OTR-FLEET-..."
                required
              />

              <button type="submit">
                Trace this catch
              </button>

              <p>
                Your code is printed beside
                the QR label on participating
                seafood packages.
              </p>
            </form>
          </div>

          <div className={styles.lookupDemo}>
            <span>
              Preview the experience
            </span>

            <Link
              href={`/catch/${DEMO_CATCH_TRIP_ID}`}
            >
              Open demo catch passport →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
