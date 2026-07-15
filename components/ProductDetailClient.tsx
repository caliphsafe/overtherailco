"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/shopify";
import { formatMoney } from "@/lib/shopify";
import { useCart } from "@/components/CartProvider";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem, isLoading } = useCart();
  const defaultVariant = product.variants.find((variant) => variant.availableForSale) || product.variants[0];
  const initialSelections = Object.fromEntries(defaultVariant?.selectedOptions.map((option) => [option.name, option.value]) || []);
  const [selections, setSelections] = useState<Record<string, string>>(initialSelections);
  const [activeImage, setActiveImage] = useState(defaultVariant?.image?.url || product.images[0]?.url || "");
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(() => product.variants.find((variant) =>
    variant.selectedOptions.every((option) => selections[option.name] === option.value)
  ), [product.variants, selections]);

  function chooseOption(name: string, value: string) {
    const nextSelections = { ...selections, [name]: value };
    setSelections(nextSelections);
    const nextVariant = product.variants.find((variant) =>
      variant.selectedOptions.every((option) => nextSelections[option.name] === option.value)
    );
    if (nextVariant?.image?.url) setActiveImage(nextVariant.image.url);
  }

  const meaningfulOptions = product.options.filter((option) => !(option.name === "Title" && option.values.includes("Default Title")));
  const available = Boolean(selectedVariant?.availableForSale);

  return (
    <div className="product-detail-grid">
      <div className="product-gallery">
        <div className="product-main-image">
          {activeImage ? (
            <img src={activeImage} alt={product.title} />
          ) : (
            <div className="product-placeholder"><span>OTR</span><small>Product image</small></div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="product-thumbnails">
            {product.images.map((image) => (
              <button
                key={image.url}
                className={activeImage === image.url ? "is-active" : ""}
                type="button"
                onClick={() => setActiveImage(image.url)}
              >
                <img src={image.url} alt={image.altText || product.title} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-purchase-panel">
        <p className="eyebrow">Over The Rail Co. / {product.productType || "Gear"}</p>
        <h1>{product.title}</h1>
        <p className="product-price">{formatMoney(selectedVariant?.price || product.priceRange.minVariantPrice)}</p>

        {product.description && <p className="product-description">{product.description}</p>}

        {meaningfulOptions.map((option) => (
          <fieldset className="variant-group" key={option.id}>
            <legend>{option.name} <span>{selections[option.name]}</span></legend>
            <div className="variant-options">
              {option.values.map((value) => {
                const possibleVariant = product.variants.find((variant) =>
                  variant.selectedOptions.some((selected) => selected.name === option.name && selected.value === value)
                );
                return (
                  <button
                    key={value}
                    type="button"
                    className={selections[option.name] === value ? "is-active" : ""}
                    onClick={() => chooseOption(option.name, value)}
                    disabled={possibleVariant ? !possibleVariant.availableForSale : false}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="purchase-row">
          <div className="quantity-control large">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => value + 1)}>+</button>
          </div>
          <button
            className="button button-orange product-add-button"
            type="button"
            disabled={!available || isLoading}
            onClick={() => selectedVariant && addItem(selectedVariant.id, quantity)}
          >
            {isLoading ? "Adding..." : available ? "Add to cart" : "Sold out"}
          </button>
        </div>

        <div className="product-promises">
          <div><strong>01</strong><span>Built around working-waterfront culture.</span></div>
          <div><strong>02</strong><span>Secure checkout powered by Shopify.</span></div>
          <div><strong>03</strong><span>Represent the way of life with pride.</span></div>
        </div>
      </div>
    </div>
  );
}
