"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnergyRail } from "@/components/effects/EnergyRail";
import { testimonials } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function BoltMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 56"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-4 w-3", className)}
    >
      <path d="M24.5 2L6 30.5h11.8L13.2 54 35.5 22.2H22.4L24.5 2Z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "h-4 w-4 transition-colors duration-300",
            i < rating
              ? "text-brand-electric drop-shadow-[0_0_6px_rgba(212,175,55,0.55)]"
              : "text-white/15"
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  active,
  onEnter,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  active: boolean;
  onEnter: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 40 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        "group relative isolate flex h-full flex-col overflow-hidden border border-white/10 bg-brand-navy-light/60 p-6 transition-all duration-500 sm:p-7",
        "hover:-translate-y-1 hover:border-brand-electric/50 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.45)]",
        active && "border-brand-electric/40 shadow-[0_0_36px_-12px_rgba(212,175,55,0.35)]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(212,175,55,0.2), transparent 45%)`,
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

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-3">
          <StarRating rating={testimonial.rating} />
          <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-base font-bold uppercase tracking-tight text-white">
                {testimonial.name}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-electric">
                {testimonial.location}
              </p>
              <p className="mt-1.5 text-xs text-white/45">{testimonial.project}</p>
            </div>
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center border border-brand-electric/30 bg-brand-electric/10 text-brand-electric transition-all duration-500",
                "group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-brand-navy group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
              )}
            >
              <BoltMark className="transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span className="h-px w-6 bg-brand-electric" />
            Verified 5.0
          </div>
        </div>
      </div>
    </article>
  );
}

interface TestimonialsSectionProps {
  showAll?: boolean;
  limit?: number;
}

export function TestimonialsSection({
  showAll = false,
  limit = 6,
}: TestimonialsSectionProps) {
  const displayTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, limit);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 3000);
    return () => clearInterval(id);
  }, [inView, displayTestimonials.length]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-ivory-field section-padding"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute -left-[10%] top-[-10%] h-[50%] w-[55%] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.12),_transparent_65%)] blur-3xl transition-opacity duration-700",
            inView ? "opacity-100" : "opacity-50"
          )}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,14,14,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,14,14,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div
          className={cn(
            "charge-pulse absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-electric to-transparent",
            inView && "opacity-100"
          )}
        />
      </div>

      <div className="container-site relative z-10">
        <div className="mb-4 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 border border-brand-navy/15 bg-brand-navy px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric">
            <BoltMark />
            5.0 Average · OC & San Diego
          </div>
        </div>

        <SectionHeading
          eyebrow="Client Reviews"
          title="Five Stars. Full Charge."
          description="Premium feedback from homeowners and businesses across Orange County and San Diego."
        />

        <EnergyRail
          count={displayTestimonials.length}
          active={inView}
          tone="light"
          maxWidthClassName="max-w-4xl"
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {displayTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              active={activeIndex === index}
              onEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {!showAll && (
          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-electric hover:text-brand-electric-dark"
            >
              <BoltMark />
              Read All Reviews
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
