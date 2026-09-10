import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import CatchCollabMark from "@/components/CatchCollabMark";
import { DEMO_CATCH_TRIP_ID } from "@/lib/catch-trips";
import styles from "./catch.module.css";

export const metadata: Metadata = {
  title: "From Sea to Table",
  description:
    "Fleet Fisheries × Over The Rail Co. — trace the vessel and voyage behind your seafood.",
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
      `/catch/${encodeURIComponent(trip.trim().toLowerCase())}`
    );
  }

  return (
    <div className={`${styles.page} ${styles.lookupPage}`}>
      <section className={styles.lookupHero}>
        <video
          className={styles.fullVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className={styles.lookupWash} aria-hidden="true" />

        <div className={styles.marineTopbar}>
          <CatchCollabMark compact />
          <span>NEW BEDFORD · NORTH ATLANTIC</span>
        </div>

        <div className={styles.lookupContent}>
          <p className={styles.oceanKicker}>FLEET FISHERIES × OVER THE RAIL CO.</p>

          <h1>
            Every catch
            <br />
            begins
            <br />
            <em>somewhere.</em>
          </h1>

          <p className={styles.lookupLead}>
            The vessel. The water. The people. The trip behind the scallops
            in your hands.
          </p>

          <form className={styles.lookupForm} action="/catch" method="get">
            <label htmlFor="trip">CATCH CODE</label>

            <div>
              <input
                id="trip"
                name="trip"
                type="text"
                inputMode="text"
                autoCapitalize="characters"
                autoComplete="off"
                placeholder="VP-0907-NB"
                required
              />

              <button type="submit">Find my catch</button>
            </div>
          </form>

          <Link
            className={styles.sampleVoyageLink}
            href={`/catch/${DEMO_CATCH_TRIP_ID}`}
          >
            <span>F/V VIKING POWER</span>
            Explore the sample voyage
            <b aria-hidden="true">→</b>
          </Link>
        </div>

        <div className={styles.lookupWaterline} aria-hidden="true">
          <i />
          <span>SEA · SHORE · TABLE</span>
          <i />
        </div>
      </section>
    </div>
  );
}
