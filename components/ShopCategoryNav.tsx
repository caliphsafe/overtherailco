import Link from "next/link";
import type { Collection } from "@/lib/shopify";

type ShopCategoryNavProps = {
  collections: Collection[];
  activeCollection?: string;
};

export default function ShopCategoryNav({
  collections,
  activeCollection = "all",
}: ShopCategoryNavProps) {
  const usefulCollections = collections.filter(
    (collection) => collection.products.length > 0
  );

  if (!usefulCollections.length) {
    return null;
  }

  return (
    <nav
      className="shop-category-nav"
      aria-label="Shop product categories"
    >
      <div className="content-shell shop-category-nav-inner">
        <div className="shop-category-nav-label">
          <span>Browse</span>
          <strong>Categories</strong>
        </div>

        <div className="shop-category-nav-links">
          <Link
            className={
              activeCollection === "all"
                ? "is-active"
                : ""
            }
            href="/shop#catalog"
            aria-current={
              activeCollection === "all"
                ? "page"
                : undefined
            }
          >
            <span>All Products</span>
          </Link>

          {usefulCollections.map(
            (collection) => {
              const isActive =
                activeCollection ===
                collection.handle;

              return (
                <Link
                  className={
                    isActive
                      ? "is-active"
                      : ""
                  }
                  href={`/shop?collection=${encodeURIComponent(
                    collection.handle
                  )}#catalog`}
                  key={collection.id}
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                >
                  <span>
                    {collection.title}
                  </span>

                  <small>
                    {
                      collection.products
                        .length
                    }
                  </small>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </nav>
  );
}
