import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Testimonials",
  description:
    "Read what homeowners and businesses across Orange County and San Diego say about Raichev Electric's quality, reliability, and professionalism.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Reviews"
        title="Five Stars. Full Charge."
        description="Premium 5-star feedback from homeowners and businesses across Orange County and San Diego."
      />

      <TestimonialsSection showAll />

      <CTASection />
    </>
  );
}
