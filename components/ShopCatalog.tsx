"use client";

import {
  useMemo,
  useState,
} from "react";
import ProductCard from "@/components/ProductCard";
import type {
  Collection,
  Product,
} from "@/lib/shopify";

type ShopCatalogProps = {
  products: Product[];
  collections: Collection[];
};

type SortValue =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "alpha";

export default function ShopCatalog({
  products,
  collections,
}: ShopCatalogProps) {
  const [
    activeCollection,
    setActiveCollection,
  ] = useState("all");

  const [sort, setSort] =
    useState<SortValue>("featured");

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const usefulCollections =
    collections.filter(
      (collection) =>
        collection.products.length > 0
    );

  const visibleProducts =
    useMemo(() => {
      const selectedProducts =
        activeCollection === "all"
          ? [...products]
          : [
              ...(
                collections.find(
                  (collection) =>
                    collection.handle ===
                    activeCollection
                )?.products || []
              ),
            ];

      const normalizedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      const filteredProducts =
        normalizedSearch
          ? selectedProducts.filter(
              (product) => {
                const searchableText = [
                  product.title,
                  product.vendor,
                  product.productType,
                  ...product.tags,
                ]
                  .join(" ")
                  .toLowerCase();

                return searchableText.includes(
                  normalizedSearch
                );
              }
            )
          : selectedProducts;

      if (sort === "newest") {
        filteredProducts.sort(
          (a, b) =>
            new Date(
              b.createdAt
            ).getTime() -
            new Date(
              a.createdAt
            ).getTime()
        );
      }

      if (sort === "price-low") {
        filteredProducts.sort(
          (a, b) =>
            Number(
              a.priceRange
                .minVariantPrice
                .amount
            ) -
            Number(
              b.priceRange
                .minVariantPrice
                .amount
            )
        );
      }

      if (sort === "price-high") {
        filteredProducts.sort(
          (a, b) =>
            Number(
              b.priceRange
                .minVariantPrice
                .amount
            ) -
            Number(
              a.priceRange
                .minVariantPrice
                .amount
            )
        );
      }

      if (sort === "alpha") {
        filteredProducts.sort(
          (a, b) =>
            a.title.localeCompare(
              b.title
            )
        );
      }

      return filteredProducts;
    }, [
      activeCollection,
      collections,
      products,
      searchTerm,
      sort,
    ]);

  const activeTitle =
    activeCollection === "all"
      ? "All Products"
      : collections.find(
          (collection) =>
            collection.handle ===
            activeCollection
        )?.title || "Collection";

  function resetCatalog() {
    setActiveCollection("all");
    setSearchTerm("");
    setSort("featured");
  }

  return (
    <section
      id="catalog"
      className="shop-catalog section-pad"
    >
      <div className="content-shell">
        <div className="shop-catalog-heading">
          <p className="eyebrow">
            Full catalog
          </p>

          <h2>
            Shop all
            <br />
            Over The Rail.
          </h2>

          <p>
            Browse every available product,
            search by name, filter by
            collection, or sort the store
            based on what matters to you.
          </p>
        </div>

        <div
          className="collection-rail"
          aria-label="Shop collections"
        >
          <button
            className={
              activeCollection === "all"
                ? "is-active"
                : ""
            }
            onClick={() =>
              setActiveCollection("all")
            }
            type="button"
          >
            All Products
          </button>

          {usefulCollections.map(
            (collection) => (
              <button
                className={
                  activeCollection ===
                  collection.handle
                    ? "is-active"
                    : ""
                }
                key={collection.id}
                onClick={() =>
                  setActiveCollection(
                    collection.handle
                  )
                }
                type="button"
              >
                {collection.title}
              </button>
            )
          )}
        </div>

        <div className="shop-toolbar shop-catalog-toolbar">
          <div>
            <p className="eyebrow">
              Shop / {activeTitle}
            </p>

            <h3>{activeTitle}</h3>

            <span aria-live="polite">
              {visibleProducts.length}{" "}
              {visibleProducts.length === 1
                ? "product"
                : "products"}
            </span>
          </div>

          <div className="shop-catalog-controls">
            <label className="catalog-search">
              <span>Search</span>

              <input
                type="search"
                value={searchTerm}
                placeholder="Search products"
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />
            </label>

            <label className="sort-select">
              <span>Sort</span>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target
                      .value as SortValue
                  )
                }
              >
                <option value="featured">
                  Recommended
                </option>

                <option value="newest">
                  Newest
                </option>

                <option value="price-low">
                  Price: Low to high
                </option>

                <option value="price-high">
                  Price: High to low
                </option>

                <option value="alpha">
                  A to Z
                </option>
              </select>
            </label>
          </div>
        </div>

        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map(
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
          <div className="store-empty-state">
            <span>OTR</span>

            <h3>
              No matching products.
            </h3>

            <p>
              Try another search term or
              clear the selected collection
              to browse the complete store.
            </p>

            <button
              className="button button-dark"
              type="button"
              onClick={resetCatalog}
            >
              Reset catalog
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
