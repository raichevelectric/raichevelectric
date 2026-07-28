"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BOLTS = [
  "M62 0 L38 42 H58 L28 100 L78 46 H54 L62 0 Z",
  "M74 4 L44 48 H66 L36 108 L92 52 H68 L74 4 Z",
  "M48 0 L28 38 H46 L18 96 L68 44 H50 L48 0 Z",
];

export function StormAtmosphere({
  className,
  lightning = true,
}: {
  className?: string;
  /** Set false when a page-level lightning overlay already handles strikes. */
  lightning?: boolean;
}) {
  const [flash, setFlash] = useState(0);
  const [activeBolt, setActiveBolt] = useState<number | null>(null);
  const [liteMode, setLiteMode] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const sync = () => {
      setLiteMode(reduced.matches || mobile.matches);
    };

    sync();
    reduced.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!lightning || liteMode) return;

    let timeout: ReturnType<typeof setTimeout>;
    let fadeTimeout: ReturnType<typeof setTimeout>;

    const strike = () => {
      const intensity = 0.35 + Math.random() * 0.55;
      const boltIndex = Math.floor(Math.random() * BOLTS.length);
      setActiveBolt(boltIndex);
      setFlash(intensity);

      fadeTimeout = setTimeout(() => setFlash(intensity * 0.2), 70);
      fadeTimeout = setTimeout(() => setFlash(intensity * 0.85), 130);
      fadeTimeout = setTimeout(() => {
        setFlash(0);
        setActiveBolt(null);
      }, 220);

      const nextIn = 2200 + Math.random() * 5200;
      timeout = setTimeout(strike, nextIn);
    };

    timeout = setTimeout(strike, 1400 + Math.random() * 1800);

    return () => {
      clearTimeout(timeout);
      clearTimeout(fadeTimeout);
    };
  }, [liteMode, lightning]);

  // Mobile: occasional soft flash only, no heavy rain/bolt animation
  useEffect(() => {
    if (!lightning || !liteMode) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeout: ReturnType<typeof setTimeout>;
    const softStrike = () => {
      setFlash(0.28);
      timeout = setTimeout(() => setFlash(0), 160);
      timeout = setTimeout(softStrike, 5000 + Math.random() * 7000);
    };

    timeout = setTimeout(softStrike, 2500);
    return () => clearTimeout(timeout);
  }, [liteMode, lightning]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1f2430_0%,_#121212_50%,_#0c0b09_100%)]" />

      <div className="storm-cloud storm-cloud-a absolute -left-1/4 -top-1/4 h-[55%] w-[80%] rounded-full bg-[radial-gradient(ellipse,_rgba(100,110,130,0.45),_transparent_70%)] blur-2xl md:h-[70%] md:blur-3xl" />
      <div className="storm-cloud storm-cloud-b absolute -right-1/5 top-0 hidden h-[60%] w-[70%] rounded-full bg-[radial-gradient(ellipse,_rgba(80,90,115,0.42),_transparent_70%)] blur-3xl md:block" />
      <div className="storm-cloud storm-cloud-c absolute bottom-[-20%] left-[10%] h-[40%] w-[90%] rounded-full bg-[radial-gradient(ellipse,_rgba(55,50,40,0.55),_transparent_70%)] blur-2xl md:h-[50%] md:blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.18),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(231,199,106,0.08),_transparent_45%)]" />

      {!liteMode && <div className="storm-rain absolute inset-0 opacity-40" />}

      {lightning && !liteMode && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMin slice"
        >
          {BOLTS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="#E7C76A"
              className="transition-opacity duration-75"
              style={{
                opacity: activeBolt === i ? 0.55 + flash * 0.4 : 0,
                filter: "drop-shadow(0 0 12px rgba(231,199,106,0.85))",
                transform:
                  i === 0
                    ? "translate(8%, -2%) scale(0.9)"
                    : i === 1
                      ? "translate(42%, -4%) scale(1.05)"
                      : "translate(68%, 0%) scale(0.85)",
                transformOrigin: "top center",
              }}
            />
          ))}
        </svg>
      )}

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,248,220,0.85),_rgba(212,175,55,0.25)_35%,_transparent_70%)] transition-opacity duration-75"
        style={{ opacity: lightning ? flash : 0 }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_rgba(7,7,7,0.65)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-navy/85" />
    </div>
  );
}
