"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Soft, slow ambient light for dark pages — gold washes + cool haze.
 * No flashes or bolts; meant to lift flat black without distraction.
 */
export function AmbientGlow({ className }: { className?: string }) {
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(!reduced.matches);
    sync();
    reduced.addEventListener("change", sync);
    return () => reduced.removeEventListener("change", sync);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[5] overflow-hidden mix-blend-soft-light",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute -left-[15%] top-[-10%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.28),_transparent_68%)] blur-3xl",
          motion && "ambient-drift-a"
        )}
      />
      <div
        className={cn(
          "absolute -right-[20%] top-[25%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,_rgba(120,135,165,0.28),_transparent_68%)] blur-3xl",
          motion && "ambient-drift-b"
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-15%] left-[20%] h-[45vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,_rgba(231,199,106,0.18),_transparent_70%)] blur-3xl",
          motion && "ambient-drift-c"
        )}
      />
    </div>
  );
}
