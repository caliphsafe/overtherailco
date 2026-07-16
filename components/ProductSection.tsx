import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/shopify";

type ProductSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  badge?: string;
  className?: string;
  compact?: boolean;
};

export default function ProductSection({
  id,
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = "View all",
  badge,
  className = "",
  compact = false,
}: ProductSectionProps) {
  if (!products.length) {
    return null;
  }

  const sectionClasses = [
    "merch-section",
    compact
      ? "merch-section-compact"
      : "section-pad",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={sectionClasses}
    >
      <div className="content-shell">
        <div className="merch-section-heading">
          <div>
            <p className="eyebrow">
              {eyebrow}
            </p>

            <h2>{title}</h2>

            {description && (
              <p className="merch-section-description">
                {description}
              </p>
            )}
          </div>

          {viewAllHref && (
            <Link
              className="text-link"
              href={viewAllHref}
            >
              {viewAllLabel}
              <span>→</span>
            </Link>
          )}
        </div>

        <div className="product-grid merch-product-grid">
          {products.map(
            (product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                badge={badge}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
