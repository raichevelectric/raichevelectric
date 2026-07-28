"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.2,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canAnimate = () =>
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;

    const update = () => {
      if (!canAnimate()) {
        el.style.transform = "";
        return;
      }
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const progress =
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
      el.style.transform = `translate3d(0, ${progress}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("md:will-change-transform", className)}>
      {children}
    </div>
  );
}
