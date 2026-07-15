import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductCard from "@/components/ProductCard";
import { getProduct, getShopData } from "@/lib/shopify";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.description || `Shop ${product.title} from Over The Rail Co.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const { products } = await getShopData();
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="product-page section-pad">
        <div className="content-shell">
          <div className="breadcrumbs">
            <Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><strong>{product.title}</strong>
          </div>
          <ProductDetailClient product={product} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-section section-pad">
          <div className="content-shell">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">More from Over The Rail</p>
                <h2>Keep looking.</h2>
              </div>
              <Link className="text-link" href="/shop">Shop all <span>→</span></Link>
            </div>
            <div className="product-grid">
              {related.map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
