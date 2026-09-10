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
      label: "HARBOR",
      time: "SEP 02 · 04:42 AM",
      title: "New Bedford before sunrise.",
      body:
        "F/V Viking Power clears the harbor in the dark. The city falls behind and a six-day scallop trip begins.",
      meta: "NEW BEDFORD HARBOR",
      video: trip.media[0]?.src || "/hero.mp4",
    },
    {
      label: "OFFSHORE",
      time: "SEP 03 · NORTH ATLANTIC",
      title: "Then the shoreline disappears.",
      body:
        "Watches, tows, hauling gear, sorting scallops, icing the catch — the steady rhythm of work offshore.",
      meta: trip.trip.weather,
      video: trip.media[1]?.src || "/about.mp4",
    },
    {
      label: "GROUNDS",
      time: "SEP 03–06 · GEORGES BANK",
      title: "Cold water. Open sea. The scallop grounds.",
      body:
        "For this sample voyage, the route reaches the Georges Bank region, where the catch comes aboard and the journey turns toward home.",
      meta: trip.trip.harvestArea,
      video: trip.media[2]?.src || "/shop.mp4",
    },
    {
      label: "HOME",
      time: "SEP 07 · 06:18 PM",
      title: "The harbor returns.",
      body:
        "Viking Power comes back through New Bedford with the catch cold and the trip complete. From here, Fleet Fisheries takes the handoff ashore.",
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
          <span>NEW BEDFORD · NORTH ATLANTIC</span>
          <span>{trip.publicTripCode}</span>
        </div>

        <div className={styles.tripHeroGrid}>
          <div className={styles.tripHeroCopy}>
            {trip.demo && trip.demoNote && (
              <div className={styles.sampleFlag}>{trip.demoNote}</div>
            )}

            <p className={styles.oceanKicker}>
              {trip.product.name} · {trip.vessel.homePort}
            </p>

            <h1>
              The journey
              <br />
              behind
              <br />
              <em>your seafood.</em>
            </h1>

            <p className={styles.tripHeroLead}>
              Caught aboard {trip.vessel.name}. Worked offshore in the North
              Atlantic. Landed in New Bedford. A catch with a place, a boat,
              and people behind it.
            </p>

            <div className={styles.tripHeroActions}>
              <a href="#journey" className={styles.diveButton}>
                Begin at the harbor <span aria-hidden="true">↓</span>
              </a>

              <CatchShareButton
                title={`${trip.product.name} · ${trip.vessel.name}`}
              />
            </div>
          </div>

          <div className={styles.heroBrandStage}>
            <span className={styles.heroBrandCoordinate}>
              41.6362° N · 70.9342° W
            </span>

            <CatchCollabMark />

            <div className={styles.heroBrandCaption}>
              <span>Fleet Fisheries × Over The Rail Co.</span>
              <span>New Bedford · Massachusetts</span>
            </div>
          </div>
        </div>

        <div className={styles.heroFactLine}>
          <span>{trip.vessel.name}</span>
          <i />
          <span>Captain {trip.vessel.captain}</span>
          <i />
          <span>{trip.trip.duration} at sea</span>
          <i />
          <span>{trip.trip.harvestArea}</span>
        </div>
      </section>

      <section className={styles.journeyPrelude} id="journey">
        <div className={styles.journeyPreludeInner}>
          <p className={styles.sectionTag}>THE VOYAGE</p>

          <h2>
            Your scallops
            <br />
            traveled farther
            <br />
            <em>than you did today.</em>
          </h2>

          <p>
            They left New Bedford before sunrise, crossed into the North
            Atlantic, came aboard on the scallop grounds, and returned through
            the same harbor days later.
          </p>
        </div>
      </section>

      <CatchVoyageExperience chapters={chapters} />

      <section className={styles.chartSection}>
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

          <div className={styles.mapStory}>
            <p className={styles.sectionTag}>FROM PORT TO GROUNDS</p>

            <h2>
              New Bedford
              <br />
              out into
              <br />
              <em>blue water.</em>
            </h2>

            <p>
              The exact tow is part of the working knowledge of the boat.
              What you see here is the broader harvest region connected to
              this sample catch.
            </p>
          </div>

          <div className={styles.mapMeta}>
            <span>{trip.trip.departed}</span>
            <i />
            <span>{trip.trip.harvestArea}</span>
            <i />
            <span>{trip.trip.landed}</span>
          </div>
        </div>
      </section>

      <section className={styles.catchReveal}>
        <div className={styles.catchRevealInner}>
          <p className={styles.sectionTag}>THE CATCH</p>

          <h2>
            Atlantic sea
            <br />
            scallops.
          </h2>

          <p className={styles.catchRevealLead}>
            Not anonymous. Not separated from the story that brought them
            ashore. This box traces back to {trip.vessel.name}, Captain{" "}
            {trip.vessel.captain}, and New Bedford.
          </p>

          <div className={styles.catchHalo} aria-hidden="true">
            <span>SEA SCALLOPS</span>
            <small>NORTH ATLANTIC</small>
          </div>
        </div>
      </section>

      <section className={styles.vesselStory}>
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
          <source src={trip.media[1]?.src || "/about.mp4"} type="video/mp4" />
        </video>

        <div className={styles.vesselStoryWash} aria-hidden="true" />

        <div className={styles.vesselStoryInner}>
          <p className={styles.sectionTag}>THE VESSEL</p>

          <h2>{trip.vessel.name}</h2>

          <p className={styles.vesselStoryLead}>
            A steel commercial scalloper working from New Bedford under
            Captain {trip.vessel.captain}.
          </p>

          <div className={styles.vesselSpecLine}>
            <span>Built {trip.vessel.built}</span>
            <i />
            <span>{trip.vessel.length}</span>
            <i />
            <span>{trip.vessel.beam} beam</span>
            <i />
            <span>{trip.vessel.hull} hull</span>
            <i />
            <span>Official No. {trip.vessel.officialNumber}</span>
          </div>
        </div>
      </section>

      <section className={styles.shoreStory}>
        <div className={styles.shoreStoryIntro}>
          <p className={styles.sectionTag}>BACK ON SHORE</p>

          <h2>
            The trip ends.
            <br />
            The cold chain
            <br />
            <em>doesn&apos;t.</em>
          </h2>

          <p>
            From landing through refrigerated handling, the catch keeps its
            identity as it moves from vessel to shore and toward your door.
          </p>
        </div>

        <div className={styles.shoreFlow}>
          {trip.milestones.map((milestone) => (
            <article key={`${milestone.time}-${milestone.title}`}>
              <span>{milestone.time}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.provenanceSection}>
        <div className={styles.provenanceInner}>
          <p className={styles.sectionTag}>THIS BOX</p>

          <h2>{trip.product.name}</h2>

          <p className={styles.provenanceIntro}>
            {trip.product.pack}. Landed in New Bedford and connected back to
            the vessel that brought it home.
          </p>

          <dl className={styles.provenanceFacts}>
            <div>
              <dt>Vessel</dt>
              <dd>{trip.vessel.name}</dd>
            </div>

            <div>
              <dt>Captain</dt>
              <dd>{trip.vessel.captain}</dd>
            </div>

            <div>
              <dt>Harvest region</dt>
              <dd>{trip.trip.harvestArea}</dd>
            </div>

            <div>
              <dt>Landed</dt>
              <dd>{trip.trip.landedAt}</dd>
            </div>

            <div>
              <dt>Lot</dt>
              <dd>{trip.product.lotCode}</dd>
            </div>

            <div>
              <dt>Catch code</dt>
              <dd>{trip.publicTripCode}</dd>
            </div>
          </dl>

          <div className={styles.provenanceActions}>
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
