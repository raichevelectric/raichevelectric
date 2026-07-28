import { StormAtmosphere } from "@/components/effects/StormAtmosphere";

interface PageHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-navy">
      <StormAtmosphere className="opacity-80" />
      <div className="container-site relative z-10 py-14 sm:py-20 md:py-28">
        {eyebrow && (
          <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric sm:mb-4 sm:text-xs sm:tracking-[0.32em]">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl font-display text-[2rem] font-bold uppercase leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:mt-5 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
