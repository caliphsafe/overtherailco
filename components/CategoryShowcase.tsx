import Link from "next/link";
import type { Collection } from "@/lib/shopify";
import {
  getCollectionFallbackDescription,
} from "@/lib/storefront-config";

type CategoryShowcaseProps = {
  collections: Collection[];
};

export default function CategoryShowcase({
  collections,
}: CategoryShowcaseProps) {
  if (!collections.length) {
    return null;
  }

  return (
    <section
      id="categories"
      className="category-showcase section-pad"
    >
      <div className="content-shell">
        <div className="merch-section-heading category-showcase-heading">
          <div>
            <p className="eyebrow">
              03 / Shop by category
            </p>

            <h2>
              Find the gear
              <br />
              made for you.
            </h2>

            <p className="merch-section-description">
              Browse the store by product type
              and move directly into the
              collection you are looking for.
            </p>
          </div>
        </div>

        <div className="category-showcase-grid">
          {collections.map(
            (collection, index) => {
              const categoryImage =
                collection.image ||
                collection.products[0]
                  ?.featuredImage;

              return (
                <Link
                  className="category-showcase-card"
                  href={`/collections/${collection.handle}`}
                  key={collection.id}
                >
                  <div className="category-showcase-media">
                    {categoryImage ? (
                      <img
                        src={categoryImage.url}
                        alt={
                          categoryImage.altText ||
                          collection.title
                        }
                        loading="lazy"
                      />
                    ) : (
                      <div className="category-showcase-placeholder">
                        <span>
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <small>
                          Over The Rail Co.
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="category-showcase-copy">
                    <div>
                      <span className="category-showcase-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span>
                        {collection.products.length}{" "}
                        {collection.products.length ===
                        1
                          ? "product"
                          : "products"}
                      </span>
                    </div>

                    <h3>
                      {collection.title}
                    </h3>

                    <p>
                      {collection.description ||
                        getCollectionFallbackDescription(
                          collection
                        )}
                    </p>

                    <strong>
                      Shop collection{" "}
                      <span>→</span>
                    </strong>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
