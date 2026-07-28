import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Raichev Electric offers commercial, residential, AV, security, low voltage, specialty, and smart home electrical services across Orange County and San Diego.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Electrical Work Is Our Specialty"
        description="Power, low voltage, and specialty systems — including AV, telecom, access control, security, landscape lighting, fire alarms, and more. If you don't see something listed, reach out."
      />

      <ServicesPreview showAll />

      <CTASection />
    </>
  );
}
