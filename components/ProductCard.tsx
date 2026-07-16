"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "@/lib/shopify";
import {
  formatMoney,
} from "@/lib/shopify";
import {
  useCart,
} from "@/components/CartProvider";

type ProductCardProps = {
  product: Product;
  index?: number;
  badge?: string;
};

export default function ProductCard({
  product,
  index = 0,
  badge,
}: ProductCardProps) {
  const {
    addItem,
    isLoading,
  } = useCart();

  const firstAvailableVariant =
    product.variants.find(
      (variant) =>
        variant.availableForSale
    );

  const canQuickAdd =
    product.variants.length === 1 &&
    Boolean(firstAvailableVariant);

  const hasPriceRange =
    product.priceRange
      .minVariantPrice.amount !==
    product.priceRange
      .maxVariantPrice.amount;

  const displayBadge =
    !product.availableForSale
      ? "Sold out"
      : badge;

  async function handleQuickAdd() {
    if (!firstAvailableVariant) {
      return;
    }

    await addItem(
      firstAvailableVariant.id
    );
  }

  return (
    <article
      className="product-card"
      style={
        {
          "--card-delay": `${Math.min(
            index * 55,
            330
          )}ms`,
        } as CSSProperties
      }
    >
      <Link
        className="product-card-media"
        href={`/products/${product.handle}`}
      >
        {product.featuredImage ? (
          <img
            src={
              product.featuredImage.url
            }
            alt={
              product.featuredImage
                .altText ||
              product.title
            }
            loading="lazy"
          />
        ) : (
          <div className="product-placeholder">
            <span>OTR</span>
            <small>
              Product image
            </small>
          </div>
        )}

        {displayBadge && (
          <span className="product-badge">
            {displayBadge}
          </span>
        )}

        <span className="product-card-view">
          View gear
        </span>
      </Link>

      <div className="product-card-info">
        <div>
          <Link
            href={`/products/${product.handle}`}
            className="product-card-title"
          >
            {product.title}
          </Link>

          <p>
            {hasPriceRange
              ? "From "
              : ""}

            {formatMoney(
              product.priceRange
                .minVariantPrice
            )}
          </p>
        </div>

        {canQuickAdd ? (
          <button
            className="quick-add"
            type="button"
            onClick={
              handleQuickAdd
            }
            disabled={
              isLoading ||
              !firstAvailableVariant
            }
            aria-label={`Quick add ${product.title}`}
            title={`Add ${product.title} to cart`}
          >
            +
          </button>
        ) : (
          <Link
            className="quick-add"
            href={`/products/${product.handle}`}
            aria-label={`Choose options for ${product.title}`}
            title={`Choose options for ${product.title}`}
          >
            →
          </Link>
        )}
      </div>
    </article>
  );
}
