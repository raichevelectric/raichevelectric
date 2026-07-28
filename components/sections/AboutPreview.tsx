import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/lib/site-data";

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-ivory-field section-padding">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[10%] top-[-20%] h-[50%] w-[50%] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.12),_transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[40%] w-[45%] bg-brand-navy/[0.03]" />
      </div>

      <div className="container-site relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A Quality, Personalized Service From Concept to Completion"
              description="Raichev Electric has been serving Orange County and San Diego with reliable, professional electrical services. We bring extensive experience across commercial, residential, and agricultural sectors."
              align="left"
            />
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l-2 border-brand-electric/50 pl-4"
                >
                  <p className="font-display text-2xl font-bold text-brand-navy sm:text-3xl">
                    <span className="text-brand-electric">{stat.value}</span>
                  </p>
                  <p className="mt-1 text-xs text-brand-slate sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center font-semibold text-brand-electric hover:text-brand-electric-dark"
            >
              Learn About Us
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 -z-10 bg-brand-navy sm:-inset-4" />
            <div className="absolute -right-3 -top-3 h-full w-full border border-brand-electric/40 sm:-right-4 sm:-top-4" />
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
              <Image
                src="/images/licensed-electrician.jpg"
                alt="Licensed Raichev Electric electrician"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-brand-navy via-brand-navy to-brand-navy/80 p-4 sm:p-6">
                <p className="font-display text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                  Licensed & Insured
                </p>
                <p className="mt-1 text-xs text-white/70 sm:text-sm">
                  Precision electrical work for discerning clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
