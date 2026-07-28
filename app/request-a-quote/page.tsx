import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = createMetadata({
  title: "Request a Quote",
  description:
    "Request a free, no-obligation quote from Raichev Electric for your commercial, residential, or specialty electrical project.",
  path: "/request-a-quote",
});

const expectations = [
  "Free, no-obligation estimate",
  "Response within one business day",
  "Licensed & insured California C-10 contractor",
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Free Estimate"
        title="Request a Quote"
        description="Tell us about your project and attach photos if helpful. Most quotes are returned within one business day."
      />

      <section className="relative overflow-hidden bg-ivory-field section-padding">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[10%] top-[-15%] h-[45%] w-[45%] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.12),_transparent_65%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,14,14,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,14,14,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        </div>

        <div className="container-site relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 grid gap-4 border border-brand-navy bg-brand-navy p-6 text-white sm:grid-cols-2 sm:gap-6 sm:p-8">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric">
                What to Expect
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Precision from
                <br />
                first contact.
              </h2>
            </div>
            <ul className="space-y-3 self-center">
              {expectations.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-white/75"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-electric" />
                  {item}
                </li>
              ))}
              <li className="flex items-start gap-3 text-sm text-white/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-electric" />
                <span>
                  Prefer to talk? Call{" "}
                  <a
                    href={siteConfig.phoneHref}
                    className="font-semibold text-brand-electric hover:text-brand-amber"
                  >
                    {siteConfig.phone}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="relative border border-brand-navy/10 bg-white/90 p-6 shadow-[0_30px_80px_-40px_rgba(14,14,14,0.35)] backdrop-blur-sm sm:p-8 md:p-10">
            <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand-electric via-brand-amber to-transparent" />
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-brand-navy sm:text-3xl">
                Project Intake
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-brand-slate sm:text-base">
                Share the essentials and attach site photos so we can prepare an
                accurate estimate.
              </p>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
