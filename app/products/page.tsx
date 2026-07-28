import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductsPreview } from "@/components/sections/ProductsPreview";
import { LutronSpotlight } from "@/components/sections/LutronSpotlight";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Products",
  description:
    "Raichev Electric installs premium electrical products including Lutron lighting control, EV chargers, panels, and architectural lighting.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products & Solutions"
        title="Premium Electrical Products"
        description="We partner with industry-leading manufacturers to deliver products that are reliable, efficient, and built to last."
      />

      <ProductsPreview showAll />
      <LutronSpotlight />
      <CTASection />
    </>
  );
}
