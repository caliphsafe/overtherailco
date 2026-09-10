import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCatchTrip,
} from "@/lib/catch-trips";
import styles from "../catch.module.css";

type CatchTripPageProps = {
  params: Promise<{
    tripId: string;
  }>;
};

export const dynamic =
  "force-dynamic";

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
      "Trace the vessel, trip, general harvest area, and story behind your Over The Rail Co. × Fleet Fisheries seafood.",
    openGraph: {
      title: `Know Your Catch · ${trip.publicTripCode}`,
      description:
        "A digital catch passport connecting your seafood to the trip behind it.",
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

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
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
            src={trip.media[0]?.src || "/hero.mp4"}
            type="video/mp4"
          />
        </video>

        <div
          className={styles.heroOverlay}
          aria-hidden="true"
        />

        <div className={styles.heroShell}>
          <div className={styles.heroTop}>
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

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>
                Your catch /{" "}
                {trip.publicTripCode}
              </p>

              <h1>
                Know exactly
                <br />
                where your
                <br />
                <em>scallops came from.</em>
              </h1>

              <p className={styles.heroLead}>
                This package is connected to one
                documented fishing trip. Meet the
                boat, see the journey, and follow
                your scallops from the water to
                your table.
              </p>

              <div className={styles.heroActions}>
                <a
                  className={styles.primaryButton}
                  href="#passport"
                >
                  Open catch passport
                </a>

                <a
                  className={styles.textLink}
                  href="#trip-film"
                >
                  Watch the trip story
                  <span>↓</span>
                </a>
              </div>
            </div>

            <aside
              className={styles.heroReceipt}
              aria-label="Catch summary"
            >
              <div className={styles.receiptHeader}>
                <span>Catch passport</span>
                <span>
                  {trip.demo
                    ? "DEMO"
                    : "VERIFIED"}
                </span>
              </div>

              <dl className={styles.receiptList}>
                <div>
                  <dt>Trip</dt>
                  <dd>
                    {trip.publicTripCode}
                  </dd>
                </div>

                <div>
                  <dt>Species</dt>
                  <dd>
                    {trip.product.species}
                  </dd>
                </div>

                <div>
                  <dt>Vessel</dt>
                  <dd>
                    {trip.vessel.name}
                  </dd>
                </div>

                <div>
                  <dt>Landed</dt>
                  <dd>
                    {trip.trip.landed}
                  </dd>
                </div>
              </dl>

              <div className={styles.receiptFooter}>
                <span>
                  Scan connected to lot
                </span>

                <strong>
                  {trip.product.lotCode}
                </strong>
              </div>
            </aside>
          </div>

          <div
            className={styles.heroFoot}
            aria-hidden="true"
          >
            <span>
              OVER THE RAIL CO.
            </span>
            <i>×</i>
            <span>
              FLEET FISHERIES
            </span>
            <i>◆</i>
            <span>
              FROM TRIP TO TABLE
            </span>
          </div>
        </div>
      </section>

      {trip.demo && (
        <section
          className={styles.demoNotice}
          aria-label="Prototype notice"
        >
          <div className={styles.shell}>
            <strong>
              Prototype trip record
            </strong>

            <p>
              The experience is production-ready,
              but the vessel, captain, dates, and
              lot information on this demo route
              are placeholders. Replace the demo
              record with verified Fleet Fisheries
              trip data before using a QR code on
              real seafood packaging.
            </p>
          </div>
        </section>
      )}

      <section
        className={styles.passport}
        id="passport"
      >
        <div className={styles.shell}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>
              01 / Your catch passport
            </p>

            <h2>
              One package.
              <br />
              One trip.
              <br />
              <em>One real story.</em>
            </h2>

            <p>
              Traceability becomes something you
              can actually see and understand—not
              a code buried on a label.
            </p>
          </div>

          <div className={styles.identityGrid}>
            <article
              className={styles.productIdentity}
            >
              <div>
                <span>
                  What&apos;s in your package
                </span>

                <span>
                  Lot {trip.product.lotCode}
                </span>
              </div>

              <h3>
                {trip.product.name}
              </h3>

              <p>
                {trip.product.species}
              </p>

              <strong>
                {trip.product.format}
              </strong>
            </article>

            <div className={styles.factGrid}>
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
                label="Home port"
                value={trip.vessel.homePort}
              />

              <Fact
                number="04"
                label="Departed"
                value={trip.trip.departed}
              />

              <Fact
                number="05"
                label="Landed"
                value={trip.trip.landed}
              />

              <Fact
                number="06"
                label="Trip length"
                value={trip.trip.duration}
              />

              <Fact
                number="07"
                label="Harvest area"
                value={trip.trip.harvestArea}
              />

              <Fact
                number="08"
                label="Landed at"
                value={trip.trip.landedAt}
              />
            </div>
          </div>

          <div className={styles.tripCodeStrip}>
            <span>
              DIGITAL CATCH PASSPORT
            </span>

            <strong>
              {trip.publicTripCode}
            </strong>

            <span>
              {trip.demo
                ? "SAMPLE RECORD"
                : "VERIFIED RECORD"}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.journey}>
        <div className={styles.shell}>
          <div className={styles.journeyHeader}>
            <div>
              <p className={styles.kicker}>
                02 / Where they came from
              </p>

              <h2>
                Follow the
                <br />
                journey offshore.
              </h2>
            </div>

            <p>
              This view is intentionally broad.
              Customers get meaningful origin
              information without exposing exact
              commercial fishing coordinates.
            </p>
          </div>

          <div className={styles.mapGrid}>
            <div className={styles.mapPanel}>
              <div className={styles.mapMeta}>
                <span>
                  GENERAL HARVEST AREA
                </span>
                <span>
                  NOT EXACT TOW COORDINATES
                </span>
              </div>

              <svg
                className={styles.tripMap}
                viewBox="0 0 900 540"
                role="img"
                aria-label={`Stylized route from ${trip.map.departureLabel} to ${trip.map.harvestAreaLabel} and back`}
              >
                <defs>
                  <pattern
                    id="ocean-grid"
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

                  <filter
                    id="route-glow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur
                      stdDeviation="3"
                      result="blur"
                    />

                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect
                  width="900"
                  height="540"
                  fill="url(#ocean-grid)"
                />

                <path
                  className={styles.coastline}
                  d="M0 0H235C228 47 215 76 190 112C169 142 164 180 173 214C184 257 156 296 126 322C96 348 91 390 110 428C123 456 107 496 82 540H0Z"
                />

                <path
                  className={styles.routeLine}
                  d="M178 320C286 301 334 250 424 224C540 190 620 203 724 260C624 328 541 346 441 355C334 364 260 351 178 320Z"
                  fill="none"
                  filter="url(#route-glow)"
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
                  className={styles.harvestPulse}
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

            <aside className={styles.mapDetails}>
              <p className={styles.kicker}>
                The documented area
              </p>

              <h3>
                {trip.trip.harvestArea}
              </h3>

              <dl>
                <div>
                  <dt>Departure</dt>
                  <dd>
                    {trip.map.departureLabel}
                  </dd>
                </div>

                <div>
                  <dt>Harvest method</dt>
                  <dd>
                    {trip.trip.harvestMethod}
                  </dd>
                </div>

                <div>
                  <dt>Return</dt>
                  <dd>
                    {trip.map.returnLabel}
                  </dd>
                </div>
              </dl>

              <p className={styles.privacyNote}>
                {trip.map.privacyNote}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.shell}>
          <div className={styles.storyGrid}>
            <div className={styles.storyNumber}>
              03
            </div>

            <div className={styles.storyCopy}>
              <p className={styles.kicker}>
                {trip.story.eyebrow}
              </p>

              <h2>
                {trip.story.title}
              </h2>

              <p>
                {trip.story.body}
              </p>
            </div>
          </div>

          <div className={styles.vesselCard}>
            <div className={styles.vesselStamp}>
              <span>
                VESSEL
              </span>
              <strong>
                {trip.vessel.name}
              </strong>
            </div>

            <div className={styles.vesselDetails}>
              <div>
                <span>Captain</span>
                <strong>
                  {trip.vessel.captain}
                </strong>
              </div>

              <div>
                <span>Home port</span>
                <strong>
                  {trip.vessel.homePort}
                </strong>
              </div>
            </div>

            <p>
              {trip.vessel.note}
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.filmSection}
        id="trip-film"
      >
        <div className={styles.shell}>
          <div className={styles.filmHeader}>
            <p className={styles.kicker}>
              04 / See the trip
            </p>

            <h2>
              From the deck.
              <br />
              <em>Not from a stock library.</em>
            </h2>

            <p>
              The media layer is designed so each
              future trip can carry its own clips.
              The prototype uses videos already
              available on the Over The Rail site.
            </p>
          </div>

          <div className={styles.filmGrid}>
            {trip.media.map(
              (item, index) => (
                <article
                  className={
                    index === 0
                      ? styles.filmCardLarge
                      : styles.filmCard
                  }
                  key={`${item.src}-${item.title}`}
                >
                  <div className={styles.filmMedia}>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={item.title}
                    >
                      <source
                        src={item.src}
                        type="video/mp4"
                      />
                    </video>

                    <span
                      className={styles.filmIndex}
                    >
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>
                  </div>

                  <div className={styles.filmCopy}>
                    <p className={styles.kicker}>
                      {item.eyebrow}
                    </p>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.caption}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section className={styles.timeline}>
        <div className={styles.shell}>
          <div className={styles.timelineHeader}>
            <p className={styles.kicker}>
              05 / From trip to table
            </p>

            <h2>
              Follow the
              <br />
              chain of custody.
            </h2>
          </div>

          <div className={styles.timelineList}>
            {trip.milestones.map(
              (milestone) => (
                <article
                  key={milestone.step}
                >
                  <span>
                    {milestone.step}
                  </span>

                  <h3>
                    {milestone.title}
                  </h3>

                  <p>
                    {milestone.detail}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section className={styles.collabSection}>
        <div className={styles.shell}>
          <div className={styles.collabGrid}>
            <CollaborationLockup
              large
            />

            <div className={styles.collabCopy}>
              <p className={styles.kicker}>
                A different kind of seafood experience
              </p>

              <h2>
                Know the trip.
                <br />
                Know the people.
                <br />
                <em>Know your food.</em>
              </h2>

              <p>
                Over The Rail Co. and Fleet
                Fisheries can use this digital
                passport to make seafood provenance
                personal—connecting the product in
                the customer&apos;s hands to the
                fishing trip behind it.
              </p>

              <div className={styles.collabActions}>
                <Link
                  className={styles.primaryButtonDark}
                  href="/"
                >
                  Explore Over The Rail Co.
                </Link>

                <Link
                  className={styles.textLinkDark}
                  href="/catch"
                >
                  Trace another catch
                  <span>→</span>
                </Link>
              </div>
            </div>
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
    <article className={styles.fact}>
      <span>{number}</span>

      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
