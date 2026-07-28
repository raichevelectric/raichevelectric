"use client";

import { Button } from "@/components/ui/Button";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { StormAtmosphere } from "@/components/effects/StormAtmosphere";
import { siteConfig } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-storm-depth md:min-h-[92vh]">
      <StormAtmosphere lightning={false} />

      <div className="pointer-events-none absolute inset-0">
        <ParallaxLayer
          speed={0.28}
          className="absolute -right-[8%] top-[8%] hidden md:block"
        >
          <svg
            viewBox="0 0 40 56"
            className="h-[70vh] w-auto opacity-[0.08]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M24.5 2L6 30.5h11.8L13.2 54 35.5 22.2H22.4L24.5 2Z"
              fill="#D4AF37"
            />
          </svg>
        </ParallaxLayer>

        <ParallaxLayer speed={0.08} className="absolute inset-0 hidden sm:block">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        </ParallaxLayer>
      </div>

      <div className="container-site relative z-10 flex min-h-[100svh] flex-col justify-center py-16 pb-24 sm:py-24 md:min-h-[92vh] md:py-28">
        <ParallaxLayer speed={-0.08} className="max-w-4xl">
          <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric sm:mb-5 sm:text-xs sm:tracking-[0.35em]">
            {siteConfig.serviceArea}
          </p>
          <h1 className="font-display text-[2.65rem] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Power.
            <br />
            Precision.
            <br />
            <span className="text-gradient">Presence.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-white/70 sm:mt-8 sm:text-lg">
            High-end electrical design and installation for commercial spaces and
            residences that demand more than standard work. Clean execution.
            Exacting standards.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <Button href="/request-a-quote" size="lg" className="w-full sm:w-auto">
              Request a Quote
            </Button>
            <Button
              href="/projects"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              View Projects
            </Button>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          speed={0.05}
          className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:mt-16 sm:gap-6 sm:pt-8 md:mt-20 md:grid-cols-4"
        >
          {[
            { label: "Licensed", value: "CA C-10" },
            { label: "Service Area", value: "OC & San Diego" },
            { label: "Focus", value: "Commercial / Residential" },
            { label: "Approach", value: "Precision Protocol" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/40 sm:text-[0.65rem] sm:tracking-[0.28em]">
                {item.label}
              </p>
              <p className="mt-1.5 font-display text-sm font-bold uppercase tracking-tight text-white sm:mt-2 sm:text-lg">
                {item.value}
              </p>
            </div>
          ))}
        </ParallaxLayer>
      </div>
    </section>
  );
}
