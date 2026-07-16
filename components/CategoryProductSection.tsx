import ProductSection from "@/components/ProductSection";
import type { Collection } from "@/lib/shopify";
import {
  getCollectionFallbackDescription,
  PRODUCTS_PER_SECTION,
} from "@/lib/storefront-config";

type CategoryProductSectionProps = {
  collection: Collection;
  index: number;
};

export default function CategoryProductSection({
  collection,
  index,
}: CategoryProductSectionProps) {
  const products =
    collection.products.slice(
      0,
      PRODUCTS_PER_SECTION
    );

  if (!products.length) {
    return null;
  }

  return (
    <ProductSection
      id={`category-${collection.handle}`}
      eyebrow={`${String(
        index + 4
      ).padStart(2, "0")} / ${collection.title}`}
      title={collection.title}
      description={
        collection.description ||
        getCollectionFallbackDescription(
          collection
        )
      }
      products={products}
      viewAllHref={`/collections/${collection.handle}`}
      viewAllLabel={`View all ${collection.title}`}
      className="category-product-section"
      compact
    />
  );
}
