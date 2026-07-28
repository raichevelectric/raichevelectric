"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnergyRail } from "@/components/effects/EnergyRail";
import { services } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  building: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  leaf: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  sparkles: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  shield: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3l7 3v5c0 4.5-2.9 7.8-7 10-4.1-2.2-7-5.5-7-10V6l7-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.5 12l1.8 1.8L15 10"
      />
    </svg>
  ),
};

function BoltMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 56"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-5 w-3.5", className)}
    >
      <path d="M24.5 2L6 30.5h11.8L13.2 54 35.5 22.2H22.4L24.5 2Z" />
    </svg>
  );
}

function ServiceCard({
  service,
  index,
  active,
  showAll,
  onEnter,
}: {
  service: (typeof services)[number];
  index: number;
  active: boolean;
  showAll: boolean;
  onEnter: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 40 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseMove={handleMove}
      className={cn(
        "group relative isolate overflow-hidden border border-white/10 bg-brand-navy-light/60 p-6 transition-all duration-500 sm:p-8",
        "hover:-translate-y-1 hover:border-brand-electric/50 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.45)]",
        !showAll && "cursor-pointer",
        active && "border-brand-electric/40 shadow-[0_0_36px_-12px_rgba(212,175,55,0.35)]"
      )}
    >
      {!showAll && (
        <Link
          href="/services"
          className="absolute inset-0 z-30"
          aria-label={`View ${service.title} services`}
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(212,175,55,0.22), transparent 45%)`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="current-line absolute left-0 top-0 h-px w-full" />
        <div className="current-line current-line-delay absolute bottom-0 left-0 h-px w-full" />
        <div className="current-line-vert absolute left-0 top-0 h-full w-px" />
        <div className="current-line-vert current-line-delay absolute right-0 top-0 h-full w-px" />
      </div>

      <span className="pointer-events-none absolute -left-1 -top-1 h-3 w-3 border-l border-t border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 border-r border-t border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-brand-electric/70">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center border border-brand-electric/25 bg-brand-electric/10 text-brand-electric transition-all duration-500",
              "group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-brand-navy group-hover:shadow-[0_0_24px_rgba(212,175,55,0.55)]"
            )}
          >
            {icons[service.icon]}
          </div>
        </div>

        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
          {service.description}
        </p>

        {showAll && (
          <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm text-white/75"
              >
                <BoltMark className="shrink-0 text-brand-electric opacity-70 transition-opacity group-hover:opacity-100" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="h-px w-6 bg-brand-electric" />
          Charged
        </div>
      </div>
    </article>
  );
}

interface ServicesPreviewProps {
  showAll?: boolean;
}

export function ServicesPreview({ showAll = false }: ServicesPreviewProps) {
  const displayServices = showAll ? services : services.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayServices.length);
    }, 3200);
    return () => clearInterval(id);
  }, [inView, displayServices.length]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-storm-depth section-padding"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.12),_transparent_60%)] blur-2xl transition-opacity duration-700",
            inView ? "opacity-100" : "opacity-40"
          )}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div
          className={cn(
            "charge-pulse absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-electric to-transparent",
            inView && "opacity-100"
          )}
        />
      </div>

      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Our Services"
          title="Electrical Work Is Our Specialty"
          description="From commercial build-outs to residential wiring, AV, security, and smart home automation — power, precision, and presence on every project."
          light
        />

        <EnergyRail count={displayServices.length} active={inView} />

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {displayServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              active={activeIndex === index}
              showAll={showAll}
              onEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {!showAll && (
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-electric hover:text-brand-amber"
            >
              <BoltMark />
              View All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
