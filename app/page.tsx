import Link from "next/link";
import ProductSection from "@/components/ProductSection";
import CategoryShowcase from "@/components/CategoryShowcase";
import {
  getFeaturedProducts,
  getShopData,
} from "@/lib/shopify";
import {
  CATEGORY_SHOWCASE_LIMIT,
} from "@/lib/storefront-config";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    featuredProducts,
    shopData,
  ] = await Promise.all([
    getFeaturedProducts(4),
    getShopData(4),
  ]);

  const {
    bestSellers,
    newArrivals,
    collections,
  } = shopData;

  const showcaseCollections =
    collections.slice(
      0,
      CATEGORY_SHOWCASE_LIMIT
    );

  return (
    <>
      <section className="home-hero">
        <div className="hero-grid content-shell">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              New Bedford, Massachusetts · Working Waterfront Culture
            </p>

            <h1>
              Built by
              <br />
              <em>Fishermen.</em>
              <br />
              Worn with Pride.
            </h1>

            <p className="hero-intro">
              Apparel built to represent the men and women who make a living
              on the water — and everyone who believes in hard work, loyalty,
              and earning everything they have.
            </p>

            <div className="hero-actions">
              <Link
                className="button button-light"
                href="/shop"
              >
                Shop the gear
              </Link>

              <Link
                className="text-link light"
                href="/about"
              >
                Read our story <span>↗</span>
              </Link>
            </div>
          </div>

          <div
            className="hero-logo-stage"
            aria-label="Over The Rail Co."
          >
            <div className="hero-logo-coordinate">
              41.6362° N / 70.9342° W
            </div>

            <img
              className="hero-main-logo"
              src="/icon.png"
              alt="Over The Rail Co."
            />

            <div className="hero-logo-caption">
              <span>Over The Rail Co.</span>
              <span>New Bedford · Massachusetts</span>
            </div>
          </div>
        </div>

        <div
          className="hero-ticker"
          aria-hidden="true"
        >
          <span>FAITH</span>
          <i>◆</i>
          <span>FAMILY</span>
          <i>◆</i>
          <span>HARD WORK</span>
          <i>◆</i>
          <span>LOYALTY</span>
          <i>◆</i>
          <span>THE WATER</span>
          <i>◆</i>
          <span>PRIDE</span>
        </div>
      </section>

      <ProductSection
        id="featured"
        eyebrow="01 / Featured by Over The Rail"
        title="Gear that carries the culture."
        description="A curated selection from the Over The Rail Co. home collection."
        products={featuredProducts}
        viewAllHref="/shop"
        viewAllLabel="Shop all products"
        className="home-featured-section"
      />

      <section className="intro-manifesto section-pad">
        <div className="content-shell manifesto-grid">
          <p className="section-number">
            02 / THE BRAND
          </p>

          <div className="manifesto-copy">
            <p className="eyebrow">
              Welcome aboard
            </p>

            <h2>
              This isn&apos;t just clothing.
              <br />
              <em>It&apos;s a badge of honor.</em>
            </h2>

            <p>
              Over The Rail Co. was built to represent
              the men and women who make a living on the
              water. Every design is inspired by the
              commercial fishing industry and the people
              who sacrifice time, comfort, and safety to
              provide for their families and feed the
              world.
            </p>

            <Link
              className="text-link"
              href="/about"
            >
              The story behind the brand{" "}
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <CategoryShowcase
        collections={showcaseCollections}
      />

      <ProductSection
        id="best-sellers"
        eyebrow="04 / Best Sellers"
        title="The gear customers reach for first."
        description="Four of the most popular products across the Over The Rail store."
        products={bestSellers}
        viewAllHref="/shop#catalog"
        viewAllLabel="Shop all gear"
        badge="Best Seller"
        className="home-best-sellers-section"
      />

      <ProductSection
        id="new-arrivals"
        eyebrow="05 / New Arrivals"
        title="The latest gear to hit the waterfront."
        description="Recently added products, displayed newest first."
        products={newArrivals}
        viewAllHref="/shop#catalog"
        viewAllLabel="Browse new gear"
        badge="New"
        className="home-new-arrivals-section"
      />

      <section className="way-of-life-section">
        <div
          className="way-of-life-watermark"
          aria-hidden="true"
        >
          THE WATER
        </div>

        <div className="content-shell way-of-life-grid">
          <div className="way-of-life-copy">
            <p className="eyebrow">
              06 / More than apparel
            </p>

            <h2>
              We represent
              <br />a way of life.
            </h2>

            <p>
              Long trips offshore. Dangerous conditions.
              Missed holidays. Generations of families
              dedicated to the water. Over The Rail exists
              to preserve that culture and give the people
              behind the industry a brand they can proudly
              call their own.
            </p>

            <Link
              className="button button-light"
              href="/about"
            >
              Meet Over The Rail Co.
            </Link>
          </div>

          <div className="values-stack">
            <div>
              <span>01</span>

              <strong>Faith</strong>

              <p>
                The grounding force behind the work and
                the journey.
              </p>
            </div>

            <div>
              <span>02</span>

              <strong>Family</strong>

              <p>
                The reason the sacrifice matters in the
                first place.
              </p>
            </div>

            <div>
              <span>03</span>

              <strong>Hard Work</strong>

              <p>
                Earned offshore, on the docks, and in
                every honest trade.
              </p>
            </div>

            <div>
              <span>04</span>

              <strong>Respect</strong>

              <p>
                For everyone who earns a living with
                their hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-final-cta section-pad">
        <div className="content-shell final-cta-inner">
          <p className="eyebrow">
            From the port of New Bedford
          </p>

          <h2>
            Carry the culture.
            <br />
            Wear it with pride.
          </h2>

          <Link
            className="button button-orange"
            href="/shop"
          >
            Enter the shop
          </Link>
        </div>
      </section>
    </>
  );
}
