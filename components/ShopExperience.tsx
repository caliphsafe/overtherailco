"use client";

import { useMemo, useState } from "react";
import type { Collection, Product } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

type Props = {
  products: Product[];
  collections: Collection[];
};

export default function ShopExperience({ products, collections }: Props) {
  const [activeCollection, setActiveCollection] = useState("all");
  const [sort, setSort] = useState("featured");

  const usefulCollections = collections.filter((collection) => collection.products.length > 0);

  const visibleProducts = useMemo(() => {
    const source = activeCollection === "all"
      ? [...products]
      : [...(collections.find((collection) => collection.handle === activeCollection)?.products || [])];

    if (sort === "price-low") {
      source.sort((a, b) => Number(a.priceRange.minVariantPrice.amount) - Number(b.priceRange.minVariantPrice.amount));
    }
    if (sort === "price-high") {
      source.sort((a, b) => Number(b.priceRange.minVariantPrice.amount) - Number(a.priceRange.minVariantPrice.amount));
    }
    if (sort === "alpha") {
      source.sort((a, b) => a.title.localeCompare(b.title));
    }
    return source;
  }, [activeCollection, collections, products, sort]);

  const activeTitle = activeCollection === "all"
    ? "All Gear"
    : collections.find((collection) => collection.handle === activeCollection)?.title || "Collection";

  return (
    <section className="shop-experience section-pad">
      <div className="content-shell">
        <div className="collection-rail" aria-label="Shop collections">
          <button className={activeCollection === "all" ? "is-active" : ""} onClick={() => setActiveCollection("all")} type="button">
            All
          </button>
          {usefulCollections.map((collection) => (
            <button
              className={activeCollection === collection.handle ? "is-active" : ""}
              key={collection.id}
              onClick={() => setActiveCollection(collection.handle)}
              type="button"
            >
              {collection.title}
            </button>
          ))}
        </div>

        <div className="shop-toolbar">
          <div>
            <p className="eyebrow">Shop / {activeTitle}</p>
            <h2>{activeTitle}</h2>
            <span>{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}</span>
          </div>
          <label className="sort-select">
            <span>Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="alpha">A to Z</option>
            </select>
          </label>
        </div>

        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="store-empty-state">
            <span>OTR</span>
            <h3>Your Shopify store is ready to connect.</h3>
            <p>Add the four environment variables in Vercel and products from your Shopify catalog will populate this page automatically.</p>
          </div>
        )}
      </div>
    </section>
  );
}
