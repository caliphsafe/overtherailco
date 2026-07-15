import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCollection } from "@/lib/shopify";

type CollectionPageProps = {
  params: Promise<{ handle: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  return {
    title: collection?.title || "Collection",
    description: collection?.description || "Shop an Over The Rail Co. collection.",
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) notFound();

  return (
    <>
      <section className="collection-page-hero">
        <div className="content-shell collection-hero-grid">
          <div>
            <p className="eyebrow">Collection / Over The Rail Co.</p>
            <h1>{collection.title}</h1>
            {collection.description && <p>{collection.description}</p>}
          </div>
          <span className="giant-number">{String(collection.products.length).padStart(2, "0")}</span>
        </div>
      </section>
      <section className="section-pad">
        <div className="content-shell">
          {collection.products.length ? (
            <div className="product-grid">
              {collection.products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="store-empty-state">
              <span>OTR</span>
              <h3>This collection is ready for products.</h3>
              <p>Add products to the “{collection.title}” collection in Shopify and they will appear here automatically.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
