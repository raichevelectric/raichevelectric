"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function LutronSpotlight() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 70, y: 30 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className="relative overflow-hidden bg-brand-navy section-padding pt-0">
      <div className="container-site relative z-10">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          className="group relative isolate grid overflow-hidden border border-white/10 bg-brand-navy-light/60 lg:grid-cols-2"
        >
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(520px circle at ${spot.x}% ${spot.y}%, rgba(212,175,55,0.2), transparent 45%)`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="current-line absolute left-0 top-0 h-px w-full" />
            <div className="current-line current-line-delay absolute bottom-0 left-0 h-px w-full" />
            <div className="current-line-vert absolute left-0 top-0 h-full w-px" />
            <div className="current-line-vert current-line-delay absolute right-0 top-0 h-full w-px" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            <SectionHeading
              eyebrow="Lutron Dealer"
              title="Smart Home Solutions"
              description="Lutron solutions are easy to use, look great, and work the way they're supposed to. Raichev Electric specializes in RA2 Select, RadioRA 2, and HomeWorks QS systems."
              align="left"
              light
              className="mb-6"
            />
            <p className="text-sm leading-relaxed text-white/65 sm:text-base">
              Lay the foundation for a smart home with lighting control that
              feels invisible until you need it — from elegant dimming to
              whole-home automation with automated shading and scene control.
            </p>
            <div className="mt-8 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric">
              <span className="h-px w-6 bg-brand-electric" />
              Dealer Certified
            </div>
          </div>

          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
              alt="Lutron smart home lighting control"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-brand-navy/40" />
            <div
              className={cn(
                "absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.18),_transparent_55%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
