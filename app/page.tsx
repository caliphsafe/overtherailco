import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  formatMoney,
  getFeaturedProducts,
} from "@/lib/shopify";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(4);

  const heroProduct = featuredProducts[0];

  const heroProductHref = heroProduct
    ? `/products/${heroProduct.handle}`
    : "/shop";

  const heroDescription = heroProduct?.description?.trim()
    ? heroProduct.description.length > 175
      ? `${heroProduct.description.slice(0, 175).trim()}…`
      : heroProduct.description
    : "Gear built to represent the people, work, sacrifice, and culture of the commercial fishing industry.";

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

          <article
            className="hero-featured-product"
            aria-label={
              heroProduct
                ? `Featured product: ${heroProduct.title}`
                : "Featured product"
            }
          >
            <Link
              className="hero-featured-media"
              href={heroProductHref}
              aria-label={
                heroProduct
                  ? `Shop ${heroProduct.title}`
                  : "Shop Over The Rail Co."
              }
            >
              {heroProduct?.featuredImage ? (
                <img
                  src={heroProduct.featuredImage.url}
                  alt={
                    heroProduct.featuredImage.altText ||
                    heroProduct.title
                  }
                />
              ) : (
                <div className="hero-placeholder">
                  <span>OTR</span>
                  <small>FEATURED GEAR</small>
                </div>
              )}

              <div className="hero-featured-badge">
                <span>Featured item</span>
                <span>01</span>
              </div>
            </Link>

            <div className="hero-featured-content">
              <div className="hero-featured-kicker">
                <span>Home page collection</span>
                <span>New Bedford · MA</span>
              </div>

              <Link
                className="hero-featured-title-link"
                href={heroProductHref}
              >
                <h2>
                  {heroProduct?.title ||
                    "Working Waterfront Gear"}
                </h2>
              </Link>

              {heroProduct && (
                <p className="hero-featured-price">
                  {formatMoney(
                    heroProduct.priceRange.minVariantPrice
                  )}
                </p>
              )}

              <p className="hero-featured-description">
                {heroDescription}
              </p>

              <div className="hero-featured-actions">
                <Link
                  className="button hero-featured-shop-button"
                  href={heroProductHref}
                >
                  {heroProduct
                    ? "Shop this item"
                    : "Shop all gear"}
                </Link>

                <Link
                  className="hero-featured-secondary-link"
                  href="/shop"
                >
                  View all gear <span>→</span>
                </Link>
              </div>
            </div>
          </article>
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

      <section className="intro-manifesto section-pad">
        <div className="content-shell manifesto-grid">
          <p className="section-number">
            01 / THE BRAND
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

      <section className="featured-section section-pad">
        <div className="content-shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">
                02 / Featured products
              </p>

              <h2>
                Gear that carries
                <br />
                the culture.
              </h2>
            </div>

            <Link
              className="text-link"
              href="/shop"
            >
              Shop all products <span>→</span>
            </Link>
          </div>

          {featuredProducts.length ? (
            <div className="product-grid home-product-grid">
              {featuredProducts.map(
                (product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                )
              )}
            </div>
          ) : (
            <div className="featured-placeholder-grid">
              {[
                "Deck Gear",
                "Offshore Essentials",
                "Working Waterfront",
                "Everyday Pride",
              ].map((label, index) => (
                <article
                  className="featured-placeholder"
                  key={label}
                >
                  <div className="product-placeholder">
                    <span>
                      {index + 1 < 10
                        ? `0${index + 1}`
                        : index + 1}
                    </span>

                    <small>
                      SHOPIFY PRODUCT
                    </small>
                  </div>

                  <div>
                    <strong>{label}</strong>

                    <span>
                      Connect Shopify to populate
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

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
              03 / More than apparel
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
