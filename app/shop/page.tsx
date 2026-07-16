import type {
  Metadata,
} from "next";
import Link from "next/link";
import ProductSection from "@/components/ProductSection";
import CategoryShowcase from "@/components/CategoryShowcase";
import CategoryProductSection from "@/components/CategoryProductSection";
import ShopCatalog from "@/components/ShopCatalog";
import {
  getShopData,
} from "@/lib/shopify";
import {
  CATEGORY_SHOWCASE_LIMIT,
} from "@/lib/storefront-config";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Over The Rail Co. apparel and gear inspired by commercial fishing and New Bedford's working waterfront.",
};

export const dynamic =
  "force-dynamic";

export default async function ShopPage() {
  const {
    products,
    collections,
    bestSellers,
    newArrivals,
  } = await getShopData();

  const showcaseCollections =
    collections.slice(
      0,
      CATEGORY_SHOWCASE_LIMIT
    );

  return (
    <>
      <section className="shop-hero">
        <div className="content-shell shop-hero-grid">
          <div>
            <p className="eyebrow">
              The shop / Working
              waterfront gear
            </p>

            <h1>
              Wear the work.
              <br />

              <em>
                Carry the culture.
              </em>
            </h1>

            <div className="shop-hero-links">
              <Link href="#best-sellers">
                Best Sellers
              </Link>

              <Link href="#new-arrivals">
                New Arrivals
              </Link>

              <Link href="#categories">
                Shop by Category
              </Link>

              <Link href="#catalog">
                Full Catalog
              </Link>
            </div>
          </div>

          <div className="shop-hero-note">
            <span>
              OTR / NBMA
            </span>

            <p>
              Commercial fishing
              apparel built around
              sacrifice, pride, and the
              people who make a living
              with their hands.
            </p>
          </div>
        </div>
      </section>

      <ProductSection
        id="best-sellers"
        eyebrow="01 / Best Sellers"
        title="The gear customers reach for first."
        description="Four of the most popular products across the Over The Rail store."
        products={bestSellers}
        viewAllHref="#catalog"
        viewAllLabel="Shop all gear"
        badge="Best Seller"
        className="best-sellers-section"
      />

      <ProductSection
        id="new-arrivals"
        eyebrow="02 / New Arrivals"
        title="The latest gear to hit the waterfront."
        description="Recently added products, displayed newest first."
        products={newArrivals}
        viewAllHref="#catalog"
        viewAllLabel="Browse the catalog"
        badge="New"
        className="new-arrivals-section"
      />

      <CategoryShowcase
        collections={
          showcaseCollections
        }
      />

      <div className="category-product-sections">
        {collections.map(
          (collection, index) => (
            <CategoryProductSection
              key={collection.id}
              collection={
                collection
              }
              index={index}
            />
          )
        )}
      </div>

      <ShopCatalog
        products={products}
        collections={collections}
      />
    </>
  );
}
