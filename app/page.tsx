import { HeroSection } from "@/components/sections/HeroSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProductsPreview } from "@/components/sections/ProductsPreview";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { DualToneSeam } from "@/components/effects/DualToneSeam";

export default function HomePage() {
  return (
    <>
      <AmbientGlow />
      <HeroSection />
      <DualToneSeam from="storm" />
      <AboutPreview />
      <DualToneSeam from="ivory" />
      <ServicesPreview />
      <DualToneSeam from="storm" />
      <ProductsPreview />
      <DualToneSeam from="ivory" />
      <ProjectsGallery />
      <DualToneSeam from="storm" />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
