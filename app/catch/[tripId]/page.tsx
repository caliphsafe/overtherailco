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
      background: {
        type: "video" as const,
        src: trip.media[0]?.src || "/hero.mp4",
      },
      tale: {
        image:
          "/catch/trips/vp-0907-nb/tales/harbor.jpg",
        imageAlt:
          "Crew preparing for departure in New Bedford before sunrise",
        quote:
          "You can feel the trip start before we clear the barrier. Once the lines are off, everybody settles into the work.",
        credit: "Deck crew · F/V Viking Power",
        caption: "Before sunrise · New Bedford",
        frame: {
          latitude: "41.6362° N",
          longitude: "70.9342° W",
          waters: "NEW BEDFORD HARBOR",
          vessel: `${trip.vessel.name} · ${trip.publicTripCode}`,
        },
      },
    },
    {
      label: "OFFSHORE",
      time: "SEP 03 · NORTH ATLANTIC",
      title: "Then the shoreline disappears.",
      body:
        "Watches, tows, hauling gear, sorting scallops, icing the catch — the steady rhythm of work offshore.",
      meta: trip.trip.weather,
      background: {
        type: "video" as const,
        src: trip.media[1]?.src || "/about.mp4",
      },
      tale: {
        image:
          "/catch/trips/vp-0907-nb/tales/offshore.jpg",
        imageAlt:
          "Crew member working on deck offshore in the North Atlantic",
        quote:
          "Once the shoreline is gone, the weather and the gear set the pace. You stop thinking in hours and start thinking in tows.",
        credit: "Deck crew · F/V Viking Power",
        caption: "Offshore watch · North Atlantic",
        frame: {
          latitude: "40–41° N",
          longitude: "68–70° W",
          waters: "OFFSHORE · NORTH ATLANTIC",
          vessel: `${trip.vessel.name} · ${trip.publicTripCode}`,
        },
      },
    },
    {
      label: "GROUNDS",
      time: "SEP 03–06 · GEORGES BANK",
      title: "Cold water. Open sea. The scallop grounds.",
      body:
        "On the Georges Bank grounds, the crew works the gear and brings Atlantic sea scallops aboard, sorting and icing the catch for the ride home.",
      meta: trip.trip.harvestArea,
      background: {
        type: "video" as const,
        src: trip.media[2]?.src || "/shop.mp4",
      },
      tale: {
        image:
          "/catch/trips/vp-0907-nb/tales/grounds.jpg",
        imageAlt:
          "Crew sorting the catch on the scallop grounds",
        quote:
          "A good tow has a feel to it. You learn to read the deck, the catch, and the water together.",
        credit: "Deck crew · F/V Viking Power",
        caption: "Scallop grounds · Georges Bank",
        frame: {
          latitude: "40–42° N",
          longitude: "66–69° W",
          waters: "GEORGES BANK · NORTH ATLANTIC",
          vessel: `${trip.vessel.name} · ${trip.publicTripCode}`,
        },
      },
    },
    {
      label: "HOME",
      time: "SEP 07 · 06:18 PM",
      title: "The harbor returns.",
      body:
        "Viking Power comes back through New Bedford with the catch cold and the trip complete. From here, Fleet Fisheries takes the handoff ashore.",
      meta: trip.trip.landedAt,
      background: {
        type: "video" as const,
        src: trip.media[3]?.src || "/contact.mp4",
      },
      tale: {
        image:
          "/catch/trips/vp-0907-nb/tales/home.jpg",
        imageAlt:
          "Crew returning to New Bedford after the fishing trip",
        quote:
          "Coming through the harbor is when the trip finally catches up with you. Then you see what the whole crew brought home.",
        credit: "Deck crew · F/V Viking Power",
        caption: "Return · New Bedford Harbor",
        frame: {
          latitude: "41.6362° N",
          longitude: "70.9342° W",
          waters: "NEW BEDFORD HARBOR",
          vessel: `${trip.vessel.name} · ${trip.publicTripCode}`,
        },
      },
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

          <div className={styles.tripHeroCopy}>
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
              {trip.vessel.name} left New Bedford for the North Atlantic,
              where Captain {trip.vessel.captain} and crew harvested this
              catch before bringing it home through the harbor.
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
            Before the table,
            <br />
            there was
            <br />
            <em>the voyage.</em>
          </h2>

          <p>
            {trip.vessel.name} left New Bedford before sunrise, worked the
            North Atlantic scallop grounds, and returned days later with the
            catch aboard.
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
            aria-label={`Route from ${trip.map.departureLabel} toward ${trip.map.harvestAreaLabel} and back`}
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
              From New Bedford, the voyage runs east into the North Atlantic
              toward the Georges Bank scallop grounds, then turns home with
              the catch aboard.
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
            This box traces back to {trip.vessel.name}, Captain{" "}
            {trip.vessel.captain}, the North Atlantic, and the working
            waterfront of New Bedford.
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
            Once the catch reaches New Bedford, refrigerated handling carries
            the work forward from vessel to shore and on toward your door.
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
            {trip.product.pack}. Landed in New Bedford with its vessel,
            captain, harvest region, and lot identity carried with it.
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
