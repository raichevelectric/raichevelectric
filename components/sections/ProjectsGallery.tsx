"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnergyRail } from "@/components/effects/EnergyRail";
import { projects } from "@/lib/site-data";
import { cn } from "@/lib/utils";

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

function ProjectCard({
  project,
  index,
  active,
  onEnter,
}: {
  project: (typeof projects)[number];
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
        "group relative isolate overflow-hidden border border-white/10 bg-brand-navy-light/60 transition-all duration-500",
        "hover:-translate-y-1 hover:border-brand-electric/50 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.45)]",
        active && "border-brand-electric/40 shadow-[0_0_36px_-12px_rgba(212,175,55,0.35)]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(212,175,55,0.22), transparent 45%)`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="current-line absolute left-0 top-0 h-px w-full" />
        <div className="current-line current-line-delay absolute bottom-0 left-0 h-px w-full" />
        <div className="current-line-vert absolute left-0 top-0 h-full w-px" />
        <div className="current-line-vert current-line-delay absolute right-0 top-0 h-full w-px" />
      </div>

      <span className="pointer-events-none absolute -left-1 -top-1 z-20 h-3 w-3 border-l border-t border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -right-1 -top-1 z-20 h-3 w-3 border-r border-t border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -bottom-1 -left-1 z-20 h-3 w-3 border-b border-l border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 z-20 h-3 w-3 border-b border-r border-brand-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative aspect-[4/3] overflow-hidden bg-brand-navy">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/35 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.22),_transparent_45%)] opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <span className="bg-brand-electric px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-navy">
            {project.category}
          </span>
        </div>

        <div
          className={cn(
            "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-brand-electric/40 bg-brand-navy/70 text-brand-electric backdrop-blur-sm transition-all duration-500",
            "group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-brand-navy group-hover:shadow-[0_0_24px_rgba(212,175,55,0.55)]"
          )}
        >
          <span className="font-display text-[0.65rem] font-bold tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="relative z-10 p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-brand-electric/80">
          {project.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          {project.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="h-px w-6 bg-brand-electric" />
          Charged
        </div>
      </div>
    </article>
  );
}

interface ProjectsGalleryProps {
  showAll?: boolean;
  limit?: number;
}

export function ProjectsGallery({
  showAll = false,
  limit = 6,
}: ProjectsGalleryProps) {
  const displayProjects = showAll ? projects : projects.slice(0, limit);
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
      setActiveIndex((prev) => (prev + 1) % displayProjects.length);
    }, 2800);
    return () => clearInterval(id);
  }, [inView, displayProjects.length]);

  return (
    <section
      ref={sectionRef}
      id="projects"
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
          eyebrow="Featured Projects"
          title="Real Work. Real Sites."
          description="Recent Raichev Electric installations across Orange County and San Diego — panels, conduit, rough-ins, and outdoor lighting under charge."
          light
        />

        <EnergyRail
          count={displayProjects.length}
          active={inView}
          maxWidthClassName="max-w-4xl"
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              active={activeIndex === index}
              onEnter={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {!showAll && (
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-electric hover:text-brand-amber"
            >
              <BoltMark />
              View Project Gallery
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
