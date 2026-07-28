import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValuesDrive } from "@/components/sections/ValuesDrive";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/metadata";
import { stats } from "@/lib/site-data";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Raichev Electric — licensed electrical contractors serving Orange County and San Diego with quality, reliability, and personalized service.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Raichev Electric"
        title="Who We Are"
        description="We believe in providing quality service to our clients, and with years of experience in the industry, we have the expertise to deliver top-notch results."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Quality Service From Concept to Completion"
              description="Raichev Electric was founded on a simple principle: do electrical work the right way, every time. We serve businesses, homeowners, and agricultural clients across Orange County and San Diego with the same commitment to craftsmanship and integrity."
              align="left"
            />
            <p className="text-brand-slate leading-relaxed">
              Founded by SPR — Steven Raichev — our team of licensed electricians
              brings extensive experience across commercial, residential, and
              specialty sectors — including large-scale commercial build-outs,
              greenhouse wiring, and smart home automation. We take pride in being
              on time, on budget, and transparent throughout every project.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden border border-brand-navy/10 sm:aspect-[4/3]">
            <Image
              src="/images/licensed-electrician.jpg"
              alt="Licensed Raichev Electric electrician"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      <Section dark>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Licensed, Certified & Trusted"
          description="Our electricians are licensed electrical contractors in the State of California. Our staff of friendly and skilled professionals will not only meet your needs — they will exceed your expectations."
          light
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold text-brand-electric">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <ValuesDrive />

      <CTASection />
    </>
  );
}
