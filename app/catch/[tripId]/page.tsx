import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      description:
        "This Over The Rail Co. catch record could not be found.",
    };
  }

  return {
    title: `${trip.product.name} · ${trip.publicTripCode}`,
    description:
      "Step inside the fishing trip behind your Over The Rail Co. × Fleet Fisheries seafood.",
    openGraph: {
      title: `Your Catch Has a Story · ${trip.publicTripCode}`,
      description:
        "Meet the vessel, follow the voyage, and trace this catch from sea to table.",
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
      eyebrow: "Departure / New Bedford",
      title: "Before your scallops reached you, a boat left the dock.",
      body:
        "Every package begins with a real departure. This record connects your scallops to the vessel and crew that left port to make the trip.",
      meta: `${trip.trip.departed} · ${trip.vessel.homePort}`,
      video: trip.media[0]?.src || "/hero.mp4",
    },
    {
      step: "02",
      eyebrow: "Offshore / The work",
      title: "Then the shoreline disappeared.",
      body:
        "Offshore, the trip becomes long hours, changing weather, heavy gear, and the work required to bring the catch aboard.",
      meta: `${trip.trip.duration} · ${trip.trip.harvestMethod}`,
      video: trip.media[1]?.src || "/about.mp4",
    },
    {
      step: "03",
      eyebrow: "Harvest / Atlantic Ocean",
      title: "This is the general area your catch came from.",
      body:
        "The exact commercial tow coordinates remain private, but this passport gives you a meaningful view of the documented harvest region tied to this trip.",
      meta: trip.trip.harvestArea,
      video: trip.media[2]?.src || "/shop.mp4",
    },
    {
      step: "04",
      eyebrow: "Return / Back to port",
      title: "The trip came home before your seafood could head to you.",
      body:
        "After the work offshore, the vessel returned to port and the catch entered the handling and fulfillment process connected to this lot.",
      meta: `${trip.trip.landed} · ${trip.trip.landedAt}`,
      video: trip.media[3]?.src || "/contact.mp4",
    },
    {
      step: "05",
      eyebrow: "Arrival / Your table",
      title: "And now the journey ends with you.",
      body:
        "The QR code closes the distance between the people who caught your food and the person preparing it. The package in your hands is connected back to the trip that produced it.",
      meta: `Lot ${trip.product.lotCode}`,
      video: trip.media[0]?.src || "/hero.mp4",
    },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.experienceHero}>
        <video
          className={styles.experienceHeroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src={trip.media[0]?.src || "/hero.mp4"}
            type="video/mp4"
          />
        </video>

        <div
          className={styles.experienceHeroOverlay}
          aria-hidden="true"
        />

        <div className={styles.experienceHeroShell}>
          <div className={styles.experienceHeroTop}>
            <CollaborationLockup />

            <div className={styles.tripState}>
              <span
                className={
                  trip.demo
                    ? styles.demoDot
                    : styles.liveDot
                }
              />

              {trip.demo
                ? "Prototype trip · sample data"
                : "Trip provenance verified"}
            </div>
          </div>

          <div className={styles.experienceHeroCenter}>
            <p className={styles.scanEyebrow}>
              YOU SCANNED YOUR CATCH
            </p>

            <h1>
              These scallops
              <br />
              had a journey
              <br />
              <em>before they reached you.</em>
            </h1>

            <p className={styles.experienceHeroLead}>
              This package is connected to one documented fishing trip.
              Follow the boat, the people, the water, and the path from
              New Bedford to your table.
            </p>

            <div className={styles.experienceHeroActions}>
              <a
                className={styles.primaryButton}
                href="#voyage"
              >
                Start the journey
                <span aria-hidden="true">↓</span>
              </a>

              <CatchShareButton
                title={`My catch · ${trip.publicTripCode}`}
              />
            </div>
          </div>

          <div className={styles.experienceHeroPassport}>
            <div>
              <span>YOUR CATCH</span>
              <strong>{trip.product.name}</strong>
            </div>

            <div>
              <span>VESSEL</span>
              <strong>{trip.vessel.name}</strong>
            </div>

            <div>
              <span>LOT</span>
              <strong>{trip.product.lotCode}</strong>
            </div>

            <div>
              <span>TRIP</span>
              <strong>{trip.publicTripCode}</strong>
            </div>
          </div>
        </div>

        <div
          className={styles.experienceScrollCue}
          aria-hidden="true"
        >
          <span>FOLLOW THE TRIP</span>
          <i />
        </div>
      </section>

      {trip.demo && (
        <section
          className={styles.demoNotice}
          aria-label="Prototype notice"
        >
          <div className={styles.shell}>
            <strong>Prototype trip record</strong>
            <p>
              This route demonstrates the finished customer experience.
              Vessel, captain, dates, and lot details are placeholders until
              verified Fleet Fisheries trip data is connected.
            </p>
          </div>
        </section>
      )}

      <section
        className={styles.emotionalReveal}
        id="voyage"
      >
        <div className={styles.shell}>
          <div className={styles.revealLabelRow}>
            <span>01 / THE VOYAGE</span>
            <span>FROM SEA TO YOU</span>
          </div>

          <div className={styles.revealStatement}>
            <p>Most seafood ends at a label.</p>
            <h2>
              Yours opens a door
              <br />
              <em>back to the ocean.</em>
            </h2>
          </div>
        </div>

        <CatchVoyageExperience
          chapters={chapters}
        />
      </section>

      <section className={styles.originSection}>
        <div className={styles.shell}>
          <div className={styles.originHeader}>
            <div>
              <p className={styles.kicker}>
                02 / Place matters
              </p>
              <h2>
                See where the
                <br />
                journey took place.
              </h2>
            </div>

            <p>
              You get a real sense of origin without revealing exact
              commercial fishing coordinates.
            </p>
          </div>

          <div className={styles.experienceMapGrid}>
            <div className={styles.experienceMapPanel}>
              <div className={styles.mapMeta}>
                <span>GENERAL HARVEST AREA</span>
                <span>EXACT TOW COORDINATES PROTECTED</span>
              </div>

              <svg
                className={styles.tripMap}
                viewBox="0 0 900 540"
                role="img"
                aria-label={`Stylized route from ${trip.map.departureLabel} to ${trip.map.harvestAreaLabel} and back`}
              >
                <defs>
                  <pattern
                    id="experience-ocean-grid"
                    width="45"
                    height="45"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M45 0H0V45"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.12"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>

                <rect
                  width="900"
                  height="540"
                  fill="url(#experience-ocean-grid)"
                />

                <path
                  className={styles.coastline}
                  d="M0 0H235C228 47 215 76 190 112C169 142 164 180 173 214C184 257 156 296 126 322C96 348 91 390 110 428C123 456 107 496 82 540H0Z"
                />

                <path
                  className={`${styles.routeLine} ${styles.routeLineAnimated}`}
                  d="M178 320C286 301 334 250 424 224C540 190 620 203 724 260C624 328 541 346 441 355C334 364 260 351 178 320Z"
                  fill="none"
                />

                <path
                  className={styles.returnLine}
                  d="M724 260C614 369 408 427 178 320"
                  fill="none"
                />

                <circle
                  className={styles.portPoint}
                  cx="178"
                  cy="320"
                  r="9"
                />

                <circle
                  className={`${styles.harvestPulse} ${styles.harvestPulseAnimated}`}
                  cx="724"
                  cy="260"
                  r="30"
                />

                <circle
                  className={styles.harvestPoint}
                  cx="724"
                  cy="260"
                  r="9"
                />

                <text
                  className={styles.mapLabel}
                  x="197"
                  y="312"
                >
                  {trip.map.departureLabel}
                </text>

                <text
                  className={styles.mapLabel}
                  x="690"
                  y="215"
                >
                  {trip.map.harvestAreaLabel}
                </text>

                <text
                  className={styles.waterLabel}
                  x="470"
                  y="120"
                >
                  ATLANTIC
                </text>

                <text
                  className={styles.waterLabel}
                  x="470"
                  y="150"
                >
                  OCEAN
                </text>
              </svg>

              <div className={styles.mapCompass}>
                <span>N</span>
                <i />
              </div>
            </div>

            <aside className={styles.experienceMapDetails}>
              <p className={styles.kicker}>THE DOCUMENTED AREA</p>

              <h3>{trip.trip.harvestArea}</h3>

              <dl>
                <div>
                  <dt>Left from</dt>
                  <dd>{trip.map.departureLabel}</dd>
                </div>

                <div>
                  <dt>Worked by</dt>
                  <dd>{trip.vessel.name}</dd>
                </div>

                <div>
                  <dt>Returned to</dt>
                  <dd>{trip.map.returnLabel}</dd>
                </div>
              </dl>

              <p className={styles.privacyNote}>
                {trip.map.privacyNote}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.peopleSection}>
        <video
          className={styles.peopleVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src={trip.media[1]?.src || "/about.mp4"}
            type="video/mp4"
          />
        </video>

        <div
          className={styles.peopleOverlay}
          aria-hidden="true"
        />

        <div className={`${styles.shell} ${styles.peopleGrid}`}>
          <div className={styles.peopleCopy}>
            <p className={styles.kicker}>
              03 / The people behind it
            </p>

            <h2>{trip.story.title}</h2>

            <p>{trip.story.body}</p>
          </div>

          <div className={styles.peoplePassport}>
            <span className={styles.peoplePassportLabel}>
              VESSEL PASSPORT
            </span>

            <div className={styles.peopleVesselName}>
              {trip.vessel.name}
            </div>

            <dl>
              <div>
                <dt>Captain</dt>
                <dd>{trip.vessel.captain}</dd>
              </div>

              <div>
                <dt>Home port</dt>
                <dd>{trip.vessel.homePort}</dd>
              </div>

              <div>
                <dt>Trip length</dt>
                <dd>{trip.trip.duration}</dd>
              </div>
            </dl>

            <p>{trip.vessel.note}</p>
          </div>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.shell}>
          <div className={styles.proofHeader}>
            <p className={styles.kicker}>
              04 / The proof behind the story
            </p>

            <h2>
              Now see the facts
              <br />
              tied to your package.
            </h2>
          </div>

          <div className={styles.proofGrid}>
            <article className={styles.proofProductCard}>
              <div>
                <span>WHAT&apos;S IN YOUR PACKAGE</span>
                <span>LOT {trip.product.lotCode}</span>
              </div>

              <h3>{trip.product.name}</h3>
              <p>{trip.product.species}</p>
              <strong>{trip.product.format}</strong>
            </article>

            <Fact
              number="01"
              label="Vessel"
              value={trip.vessel.name}
            />
            <Fact
              number="02"
              label="Captain"
              value={trip.vessel.captain}
            />
            <Fact
              number="03"
              label="Departed"
              value={trip.trip.departed}
            />
            <Fact
              number="04"
              label="Landed"
              value={trip.trip.landed}
            />
            <Fact
              number="05"
              label="Harvest area"
              value={trip.trip.harvestArea}
            />
            <Fact
              number="06"
              label="Trip code"
              value={trip.publicTripCode}
            />
          </div>
        </div>
      </section>

      <section className={styles.chainSection}>
        <div className={styles.shell}>
          <div className={styles.chainHeader}>
            <div>
              <p className={styles.kicker}>
                05 / From water to table
              </p>

              <h2>
                Follow every handoff
                <br />
                <em>that brought it to you.</em>
              </h2>
            </div>

            <span className={styles.chainCode}>
              {trip.publicTripCode}
            </span>
          </div>

          <div className={styles.chainTrack}>
            {trip.milestones.map((milestone) => (
              <article key={milestone.step}>
                <span>{milestone.step}</span>
                <div className={styles.chainMarker} />
                <h3>{milestone.title}</h3>
                <p>{milestone.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalExperience}>
        <video
          className={styles.finalVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src={trip.media[3]?.src || "/contact.mp4"}
            type="video/mp4"
          />
        </video>

        <div
          className={styles.finalOverlay}
          aria-hidden="true"
        />

        <div className={`${styles.shell} ${styles.finalExperienceInner}`}>
          <CollaborationLockup large />

          <p className={styles.kicker}>
            OVER THE RAIL CO. × FLEET FISHERIES
          </p>

          <h2>
            Your food came
            <br />
            from somewhere.
            <br />
            <em>Now you know where.</em>
          </h2>

          <p className={styles.finalLead}>
            That connection is the point: real seafood, real people,
            and a real trip behind the package in your hands.
          </p>

          <div className={styles.finalActions}>
            <CatchShareButton
              title={`My catch · ${trip.publicTripCode}`}
            />

            <Link
              className={styles.textLink}
              href="/catch"
            >
              Trace another catch
              <span>→</span>
            </Link>
          </div>

          <div className={styles.finalPassportStamp}>
            <span>DIGITAL CATCH PASSPORT</span>
            <strong>{trip.publicTripCode}</strong>
            <span>
              {trip.demo ? "SAMPLE RECORD" : "VERIFIED RECORD"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function CollaborationLockup({
  large = false,
}: {
  large?: boolean;
}) {
  return (
    <div
      className={`${styles.collaborationLockup} ${
        large
          ? styles.collaborationLockupLarge
          : ""
      }`}
      aria-label="Over The Rail Co. in collaboration with Fleet Fisheries"
    >
      <div className={styles.logoBoxDark}>
        <img
          src="/icon.png"
          alt="Over The Rail Co."
        />
      </div>

      <span className={styles.collabX}>×</span>

      <div className={styles.logoBoxLight}>
        <img
          src="/fleet.png"
          alt="Fleet Fisheries"
        />
      </div>
    </div>
  );
}

function Fact({
  number,
  label,
  value,
}: {
  number: string;
  label: string;
  value: string;
}) {
  return (
    <article className={styles.experienceFact}>
      <span>{number}</span>

      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
