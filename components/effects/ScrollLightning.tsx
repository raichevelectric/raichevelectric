"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BOLT_PATHS = [
  "M48 0 L42 18 L52 22 L30 48 L46 52 L22 88 L58 54 L42 50 L64 28 L50 24 L56 0 Z",
  "M50 0 L36 28 L54 32 L28 62 L48 66 L18 100 L62 58 L44 54 L70 30 L52 26 L58 0 Z",
  "M46 2 L54 20 L40 24 L62 50 L48 54 L78 92 L44 56 L58 52 L34 26 L48 22 L42 2 Z",
  "M52 0 L40 16 L58 28 L34 44 L56 56 L24 84 L64 52 L42 40 L66 24 L48 14 L56 0 Z",
  "M44 0 L58 22 L46 26 L70 54 L52 58 L82 96 L48 60 L66 56 L40 28 L52 24 L48 0 Z",
];

type Strike = {
  id: number;
  path: string;
  x: number;
  y: number;
  height: number;
  rotate: number;
  opacity: number;
};

function randomStrike(id: number): Strike {
  return {
    id,
    path: BOLT_PATHS[Math.floor(Math.random() * BOLT_PATHS.length)],
    x: 4 + Math.random() * 88,
    y: -2 + Math.random() * 18,
    height: 42 + Math.random() * 48,
    rotate: -16 + Math.random() * 32,
    opacity: 0.5 + Math.random() * 0.4,
  };
}

export function ScrollLightning({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [lite, setLite] = useState(true);
  const [flash, setFlash] = useState(0);
  const [strikes, setStrikes] = useState<Strike[]>([]);
  const idRef = useRef(0);
  const flashTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollBoostUntil = useRef(0);

  const clearFlashTimers = () => {
    flashTimers.current.forEach(clearTimeout);
    flashTimers.current = [];
  };

  const after = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    flashTimers.current.push(t);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const sync = () => {
      setEnabled(!reduced.matches);
      setLite(mobile.matches);
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
    if (!enabled) return;

    let alive = true;
    let loopTimer: ReturnType<typeof setTimeout>;

    const fire = () => {
      if (!alive) return;

      clearFlashTimers();

      const intensity = lite
        ? 0.22 + Math.random() * 0.2
        : 0.32 + Math.random() * 0.42;
      const count = lite ? 1 : Math.random() > 0.7 ? 2 : 1;
      const next: Strike[] = [];

      for (let i = 0; i < count; i++) {
        idRef.current += 1;
        next.push(randomStrike(idRef.current));
      }

      setStrikes(next);
      setFlash(intensity);

      after(() => setFlash(intensity * 0.16), 55);
      after(() => setFlash(intensity * (lite ? 0.32 : 0.72)), 105);
      after(() => {
        setFlash(0);
        setStrikes([]);
      }, lite ? 170 : 230);

      if (!lite && Math.random() > 0.76) {
        after(() => {
          if (!alive) return;
          idRef.current += 1;
          setStrikes([randomStrike(idRef.current)]);
          setFlash(intensity * 0.5);
          after(() => {
            setFlash(0);
            setStrikes([]);
          }, 110);
        }, 300);
      }
    };

    const loop = () => {
      if (!alive) return;
      fire();
      const boosting = scrollBoostUntil.current > Date.now();
      const nextIn = boosting
        ? 800 + Math.random() * 1400
        : lite
          ? 4200 + Math.random() * 6200
          : 2200 + Math.random() * 4600;
      loopTimer = setTimeout(loop, nextIn);
    };

    loopTimer = setTimeout(loop, lite ? 1600 : 700);

    const onScroll = () => {
      scrollBoostUntil.current = Date.now() + 1500;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      alive = false;
      clearTimeout(loopTimer);
      clearFlashTimers();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled, lite]);

  if (!enabled) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[25] overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.35] mix-blend-soft-light">
        <div className="absolute -left-[20%] top-[-10%] h-[45%] w-[70%] rounded-full bg-[radial-gradient(ellipse,_rgba(90,100,120,0.4),_transparent_70%)] blur-3xl" />
        <div className="absolute -right-[15%] top-[25%] h-[40%] w-[55%] rounded-full bg-[radial-gradient(ellipse,_rgba(70,80,100,0.32),_transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-8%] left-[10%] h-[38%] w-[75%] rounded-full bg-[radial-gradient(ellipse,_rgba(50,55,70,0.3),_transparent_70%)] blur-3xl" />
      </div>

      {strikes.map((strike) => (
        <svg
          key={strike.id}
          viewBox="0 0 100 100"
          className="absolute w-auto"
          style={{
            left: `${strike.x}%`,
            top: `${strike.y}%`,
            height: `${strike.height}vh`,
            transform: `translateX(-50%) rotate(${strike.rotate}deg)`,
            filter:
              "drop-shadow(0 0 8px rgba(231,199,106,0.95)) drop-shadow(0 0 22px rgba(212,175,55,0.7))",
          }}
        >
          <path d={strike.path} fill="#E7C76A" opacity={strike.opacity} />
          <path d={strike.path} fill="#FFF8E7" opacity={strike.opacity * 0.4} />
        </svg>
      ))}

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,248,220,0.5),_rgba(212,175,55,0.16)_42%,_transparent_74%)] transition-opacity duration-75"
        style={{ opacity: flash }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(231,199,106,0.2),_transparent_50%)] mix-blend-screen transition-opacity duration-75"
        style={{ opacity: flash * 0.9 }}
      />
    </div>
  );
}
