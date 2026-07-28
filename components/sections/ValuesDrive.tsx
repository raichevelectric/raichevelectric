"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnergyRail } from "@/components/effects/EnergyRail";
import { cn } from "@/lib/utils";

const values = [
  {
    id: "craft",
    number: "01",
    title: "Quality Craftsmanship",
    description:
      "Premium materials and exacting technique on every install — the kind of finish that still looks intentional years later.",
  },
  {
    id: "safety",
    number: "02",
    title: "Safety First",
    description:
      "Code-compliant, inspection-ready work with no shortcuts. Power should feel effortless — never risky.",
  },
  {
    id: "clarity",
    number: "03",
    title: "Clear Communication",
    description:
      "From first walkthrough to final walkthrough, you always know the plan, the timeline, and what happens next.",
  },
];

function BoltMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 56"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-8 w-5", className)}
    >
      <path d="M24.5 2L6 30.5h11.8L13.2 54 35.5 22.2H22.4L24.5 2Z" />
    </svg>
  );
}

function ValueCard({
  value,
  index,
  active,
  onEnter,
}: {
  value: (typeof values)[number];
  index: number;
  active: boolean;
  onEnter: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 40 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseMove={handleMove}
      className={cn(
        "group relative isolate overflow-hidden border border-white/10 bg-brand-navy-light/60 p-6 transition-all duration-500 sm:p-8",
        "hover:-translate-y-1 hover:border-brand-electric/50 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.45)]",
        active && "border-brand-electric/40 shadow-[0_0_36px_-12px_rgba(212,175,55,0.35)]"
      )}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Cursor-follow charge glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(212,175,55,0.22), transparent 45%)`,
        }}
      />

      {/* Animated current lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="current-line absolute left-0 top-0 h-px w-full" />
        <div className="current-line current-line-delay absolute bottom-0 left-0 h-px w-full" />
        <div className="current-line-vert absolute left-0 top-0 h-full w-px" />
        <div className="current-line-vert current-line-delay absolute right-0 top-0 h-full w-px" />
      </div>

      {/* Corner sparks */}
      <span className="pointer-events-none absolute -left-1 -top-1 h-3 w-3 border-l border-t border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 border-r border-t border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-brand-electric/70">
            {value.number}
          </p>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center border border-brand-electric/25 bg-brand-electric/10 text-brand-electric transition-all duration-500",
              "group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-brand-navy group-hover:shadow-[0_0_24px_rgba(212,175,55,0.55)]",
              active && "border-brand-electric/60"
            )}
          >
            <BoltMark className="transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse" />
          </div>
        </div>

        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
          {value.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
          {value.description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="h-px w-6 bg-brand-electric" />
          Charged
        </div>
      </div>
    </article>
  );
}

export function ValuesDrive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, 3200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-storm-depth section-padding"
    >
      {/* Ambient charge field */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.14),_transparent_60%)] blur-2xl transition-opacity duration-700",
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
          eyebrow="Our Values"
          title="What Drives Us"
          description="Every project carries voltage — quality, safety, and clarity moving through the work from concept to completion."
          light
        />

        {/* Live current connector */}
        <EnergyRail count={values.length} active={inView} />

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {values.map((value, index) => (
            <ValueCard
              key={value.id}
              value={value}
              index={index}
              active={activeIndex === index}
              onEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
