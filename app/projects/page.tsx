import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Browse Raichev Electric's project gallery featuring commercial, residential, and specialty electrical work across Orange County and San Diego.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Project Gallery"
        title="Featured Projects"
        description="A look at recent Raichev Electric installations across Orange County and San Diego — panels, conduit, rough-ins, and outdoor lighting."
      />

      <ProjectsGallery showAll />

      <CTASection />
    </>
  );
}
