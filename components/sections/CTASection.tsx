import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-data";

export function CTASection() {
  return (
    <section className="relative overflow-hidden tone-split">
      <div className="pointer-events-none absolute inset-y-0 left-[46%] hidden w-px bg-gradient-to-b from-transparent via-brand-electric to-transparent md:block" />
      <div className="pointer-events-none absolute left-[46%] top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-brand-electric shadow-[0_0_18px_rgba(212,175,55,0.8)] md:block" />

      <div className="container-site relative grid items-center gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-24 lg:gap-16">
        <div className="text-center md:pr-6 md:text-left">
          <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric sm:text-xs sm:tracking-[0.32em]">
            Next Step
          </p>
          <h2 className="font-display text-3xl font-bold uppercase tracking-[-0.03em] text-brand-navy sm:text-4xl lg:text-5xl">
            Ready to
            <br />
            Power Up?
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-brand-slate sm:text-base">
            Request a quote for your commercial or residential project across{" "}
            {siteConfig.serviceArea}.
          </p>
        </div>

        <div className="text-center md:pl-6 md:text-left">
          <p className="mb-6 text-sm leading-relaxed text-white/70 sm:text-base">
            Precision electrical work for clients who expect more — clean
            execution, clear communication, and systems that last.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <Button href="/request-a-quote" size="lg" className="w-full sm:w-auto">
              Request a Quote
            </Button>
            <Button
              href={siteConfig.phoneHref}
              variant="outline"
              size="lg"
              className="w-full border-white/30 text-white hover:border-brand-electric hover:bg-brand-electric hover:text-brand-navy sm:w-auto"
            >
              Call {siteConfig.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
