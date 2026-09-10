import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CatchCollabMark from "@/components/CatchCollabMark";
import CatchShareButton from "@/components/CatchShareButton";
import CatchVoyageExperience from "@/components/CatchVoyageExperience";
import { getCatchTrip } from "@/lib/catch-trips";
import styles from "../catch.module.css";

type CatchTripPageProps = {
  params: Promise<{
    tripId: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CatchTripPageProps): Promise<Metadata> {
  const { tripId } = await params;
  const trip = getCatchTrip(tripId);

  if (!trip) {
    return {
      title: "Catch not found",
      description: "This catch record could not be found.",
    };
  }

  return {
    title: `${trip.vessel.name} · ${trip.publicTripCode}`,
    description: `${trip.product.name} from ${trip.vessel.name}, ${trip.vessel.homePort}.`,
    openGraph: {
      title: `${trip.product.name} · ${trip.vessel.name}`,
      description: `From ${trip.vessel.homePort} to ${trip.trip.harvestArea} and back.`,
      type: "website",
    },
  };
}

export default async function CatchTripPage({
  params,
}: CatchTripPageProps) {
  const { tripId } = await params;
  const trip = getCatchTrip(tripId);

  if (!trip) {
    notFound();
  }

  const chapters = [
    {
      step: "01",
      time: "SEP 02 · 04:42 AM",
      title: "Leaving New Bedford before sunrise.",
      body:
        "F/V Viking Power clears the harbor in the dark and begins a six-day scallop trip out of the working waterfront.",
      meta: "NEW BEDFORD HARBOR",
      video: trip.media[0]?.src || "/hero.mp4",
    },
    {
      step: "02",
      time: "SEP 03 · NORTH ATLANTIC",
      title: "The offshore rhythm sets in.",
      body:
        "Watches, tows, hauling gear, sorting scallops, icing the catch, and repeating the work that keeps the trip moving.",
      meta: trip.trip.weather,
      video: trip.media[1]?.src || "/about.mp4",
    },
    {
      step: "03",
      time: "SEP 03–06 · GEORGES BANK",
      title: "The scallop grounds come into focus.",
      body:
        "For this sample voyage, the route reaches the Georges Bank region — cold North Atlantic water tied to one of the most storied scallop fisheries.",
      meta: trip.trip.harvestArea,
      video: trip.media[2]?.src || "/shop.mp4",
    },
    {
      step: "04",
      time: "SEP 07 · 06:18 PM",
      title: "Back through the harbor and onto shore.",
      body:
        "The Viking Power returns with the catch on ice, handing the journey forward to Fleet Fisheries' shore-side receiving and cold handling.",
      meta: trip.trip.landedAt,
      video: trip.media[3]?.src || "/contact.mp4",
    },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.tripHero}>
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
          <source src={trip.media[0]?.src || "/hero.mp4"} type="video/mp4" />
        </video>

        <div className={styles.tripHeroWash} aria-hidden="true" />

        <div className={styles.marineTopbar}>
          <span>NEW BEDFORD · ATLANTIC SEA SCALLOPS</span>
          <span>{trip.publicTripCode}</span>
        </div>

        <div className={styles.tripHeroContent}>
          <div className={styles.heroLogoWrap}>
            <CatchCollabMark />
          </div>

          {trip.demo && trip.demoNote && (
            <div className={styles.sampleFlag}>{trip.demoNote}</div>
          )}

          <p className={styles.oceanKicker}>
            YOUR SCALLOPS · {trip.vessel.homePort}
          </p>

          <h1>
            The journey
            <br />
            behind
            <br />
            <em>your seafood.</em>
          </h1>

          <p className={styles.tripHeroLead}>
            Caught aboard {trip.vessel.name}. Worked offshore in the North Atlantic.
            Landed in New Bedford. Handled by Fleet Fisheries. Brought to you with a story you can follow.
          </p>

          <div className={styles.tripHeroActions}>
            <a href="#voyage" className={styles.diveButton}>
              Start the voyage <span aria-hidden="true">↓</span>
            </a>

            <CatchShareButton
              title={`${trip.product.name} · ${trip.vessel.name}`}
            />
          </div>
        </div>

        <div className={styles.catchRibbon}>
          <div>
            <span>VESSEL</span>
            <strong>{trip.vessel.name}</strong>
          </div>

          <div>
            <span>CAPTAIN</span>
            <strong>{trip.vessel.captain}</strong>
          </div>

          <div>
            <span>AT SEA</span>
            <strong>{trip.trip.duration}</strong>
          </div>

          <div>
            <span>CATCH</span>
            <strong>{trip.product.name}</strong>
          </div>
        </div>
      </section>

      <section className={styles.voyageSection} id="voyage">
        <div className={styles.voyageHeading}>
          <p className={styles.sectionTag}>THE JOURNEY</p>
          <h2>
            From harbor,
            <br />
            to grounds,
            <br />
            to you.
          </h2>

          <p className={styles.voyageIntro}>
            This is the part that matters most — the path your scallops took
            before they ever reached your kitchen.
          </p>

          <div className={styles.voyageSummary}>
            <div>
              <span>DEPARTED</span>
              <strong>{trip.trip.departed}</strong>
            </div>

            <div>
              <span>HARVEST REGION</span>
              <strong>{trip.trip.harvestArea}</strong>
            </div>

            <div>
              <span>LANDED</span>
              <strong>{trip.trip.landed}</strong>
            </div>
          </div>
        </div>

        <CatchVoyageExperience chapters={chapters} />
      </section>

      <section className={styles.chartSection}>
        <div className={styles.chartCopy}>
          <p className={styles.sectionTag}>THE WATER</p>

          <h2>
            New Bedford
            <br />
            to the
            <br />
            <em>North Atlantic.</em>
          </h2>

          <div className={styles.chartFacts}>
            <div>
              <span>DEPARTED</span>
              <strong>{trip.trip.departed}</strong>
            </div>

            <div>
              <span>HARVEST REGION</span>
              <strong>{trip.trip.harvestArea}</strong>
            </div>

            <div>
              <span>LANDED</span>
              <strong>{trip.trip.landed}</strong>
            </div>
          </div>
        </div>

        <div className={styles.chartPanel}>
          <div className={styles.chartGrid} aria-hidden="true" />

          <svg
            className={styles.tripMap}
            viewBox="0 0 900 640"
            role="img"
            aria-label={`Sample route from ${trip.map.departureLabel} toward ${trip.map.harvestAreaLabel} and back`}
          >
            <path
              className={styles.coastMass}
              d="M0 0H246C237 67 222 112 193 153C166 190 160 236 175 276C189 317 164 362 131 394C94 430 91 475 113 517C129 548 109 595 78 640H0Z"
            />

            <path
              className={styles.routeGlow}
              d="M175 375C276 335 350 269 448 242C559 211 658 230 746 292"
            />

            <path
              className={styles.routeLine}
              d="M175 375C276 335 350 269 448 242C559 211 658 230 746 292"
            />

            <path
              className={styles.returnRoute}
              d="M746 292C641 391 467 445 175 375"
            />

            <circle className={styles.portPulse} cx="175" cy="375" r="22" />
            <circle className={styles.portPoint} cx="175" cy="375" r="7" />

            <circle className={styles.harvestPulse} cx="746" cy="292" r="44" />
            <circle className={styles.harvestPoint} cx="746" cy="292" r="9" />

            <text className={styles.mapCity} x="195" y="365">
              NEW BEDFORD
            </text>

            <text className={styles.mapArea} x="630" y="230">
              GEORGES BANK
            </text>

            <text className={styles.mapOcean} x="415" y="120">
              NORTH ATLANTIC
            </text>
          </svg>

          <div className={styles.chartCompass} aria-hidden="true">
            <span>N</span>
            <i />
          </div>

          <div className={styles.chartLegend}>
            <span><i className={styles.orangeDot} /> DEPARTURE / RETURN</span>
            <span><i className={styles.blueDot} /> SAMPLE HARVEST REGION</span>
          </div>
        </div>
      </section>

      <section className={styles.seaIntro}>
        <div className={styles.waveField} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.seaIntroGrid}>
          <div>
            <p className={styles.sectionTag}>THE CATCH</p>
            <h2>
              Before dinner,
              <br />
              there was
              <br />
              <em>the Atlantic.</em>
            </h2>
          </div>

          <div className={styles.catchIdentity}>
            <div className={styles.scallopOrb} aria-hidden="true">
              <span>SEA</span>
              <strong>SCALLOPS</strong>
              <small>NORTH ATLANTIC</small>
            </div>

            <p>
              This box carries more than seafood. It carries a vessel name,
              a captain, a home port, and the trace of a voyage that began in
              New Bedford.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.mediaSection}>
        <div className={styles.mediaHeader}>
          <p className={styles.sectionTag}>ON THE WATER</p>
          <h2>
            What the trip
            <br />
            felt like.
          </h2>
        </div>

        <div className={styles.mediaGrid}>
          {trip.media.map((item, index) => (
            <article
              className={`${styles.mediaCard} ${
                index === 0 ? styles.mediaCardLarge : ""
              }`}
              key={`${item.src}-${item.title}`}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              >
                <source src={item.src} type="video/mp4" />
              </video>

              <div className={styles.mediaShade} />

              <div className={styles.mediaCopy}>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.vesselSection}>
        <div className={styles.vesselHeading}>
          <p className={styles.sectionTag}>MEET THE BOAT</p>
          <h2>{trip.vessel.name}</h2>
          <p>
            A modern Fleet Fisheries commercial scalloper working from
            New Bedford, Massachusetts.
          </p>
        </div>

        <div className={styles.vesselStats}>
          <VesselStat label="CAPTAIN" value={trip.vessel.captain} />
          <VesselStat label="BUILT" value={trip.vessel.built} />
          <VesselStat label="LENGTH" value={trip.vessel.length} />
          <VesselStat label="BEAM" value={trip.vessel.beam} />
          <VesselStat label="HULL" value={trip.vessel.hull} />
          <VesselStat label="OFFICIAL NO." value={trip.vessel.officialNumber} />
        </div>

        <div className={styles.vesselBand}>
          <span>NEW BEDFORD</span>
          <i />
          <span>STEEL HULL</span>
          <i />
          <span>SCALLOP FISHERY</span>
          <i />
          <span>100 FT</span>
        </div>
      </section>

      <section className={styles.shoreSection}>
        <div className={styles.shoreHeader}>
          <p className={styles.sectionTag}>BACK ON SHORE</p>

          <h2>
            Sea.
            <br />
            Shore.
            <br />
            <em>Your door.</em>
          </h2>

          <p>
            Fleet Fisheries tracks fresh scallop lots from vessel to customer
            and maintains cold handling through its shore-side operation in
            New Bedford.
          </p>
        </div>

        <div className={styles.milestoneRail}>
          {trip.milestones.map((milestone) => (
            <article key={milestone.step}>
              <span className={styles.milestoneNumber}>{milestone.step}</span>
              <span className={styles.milestoneTime}>{milestone.time}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.boxSection}>
        <div className={styles.boxCard}>
          <div className={styles.boxTopline}>
            <span>YOUR BOX</span>
            <span>{trip.product.lotCode}</span>
          </div>

          <p className={styles.boxOrigin}>NORTH ATLANTIC · NEW BEDFORD</p>

          <h2>{trip.product.name}</h2>

          <div className={styles.boxDetails}>
            <div>
              <span>PACK</span>
              <strong>{trip.product.pack}</strong>
            </div>

            <div>
              <span>VESSEL</span>
              <strong>{trip.vessel.name}</strong>
            </div>

            <div>
              <span>CAPTAIN</span>
              <strong>{trip.vessel.captain}</strong>
            </div>

            <div>
              <span>LOT</span>
              <strong>{trip.product.lotCode}</strong>
            </div>

            <div>
              <span>LANDED</span>
              <strong>{trip.trip.landedAt}</strong>
            </div>

            <div>
              <span>TRIP</span>
              <strong>{trip.publicTripCode}</strong>
            </div>
          </div>

          <div className={styles.boxActions}>
            <CatchShareButton
              title={`${trip.product.name} · ${trip.vessel.name}`}
            />

            <Link href="/catch" className={styles.catchTextLink}>
              Find another catch <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.collabFinale}>
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
          <source src={trip.media[3]?.src || "/contact.mp4"} type="video/mp4" />
        </video>

        <div className={styles.finaleWash} aria-hidden="true" />

        <div className={styles.finaleInner}>
          <CatchCollabMark inverse />

          <p>FROM THE SEA · TO THE SHORE · TO YOUR DOOR</p>

          <h2>
            The ocean
            <br />
            is closer
            <br />
            <em>than you think.</em>
          </h2>

          <div className={styles.finaleFooter}>
            <span>{trip.vessel.name}</span>
            <span>{trip.publicTripCode}</span>
            <span>NEW BEDFORD, MASSACHUSETTS</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function VesselStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <article className={styles.vesselStat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
