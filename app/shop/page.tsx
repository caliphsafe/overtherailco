import type { Metadata } from "next";
import ShopExperience from "@/components/ShopExperience";
import { getShopData } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Over The Rail Co. apparel and gear inspired by commercial fishing and New Bedford's working waterfront.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const { products, collections } = await getShopData();

  return (
    <>
      <section className="shop-hero">
        <div className="content-shell shop-hero-grid">
          <div>
            <p className="eyebrow">The shop / Working waterfront gear</p>
            <h1>Wear the work.<br /><em>Carry the culture.</em></h1>
          </div>
          <div className="shop-hero-note">
            <span>OTR / NBMA</span>
            <p>Commercial fishing apparel built around sacrifice, pride, and the people who make a living with their hands.</p>
          </div>
        </div>
      </section>
      <ShopExperience products={products} collections={collections} />
    </>
  );
}
