"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BOLT_PATH =
  "M24.5 2L6 30.5h11.8L13.2 54 35.5 22.2H22.4L24.5 2Z";

export function LightningCursor() {
  const boltRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(fine.matches && !reduced.matches);
    };

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-bolt-cursor");
      return;
    }

    document.documentElement.classList.add("has-bolt-cursor");

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest(
          "a, button, [role='button'], label, summary, .cursor-pointer, input, textarea, select"
        )
      );
    };

    const isTextField = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(el.closest("input, textarea, select, [contenteditable='true']"));
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(!isTextField(e.target));
      setHot(isInteractive(e.target) && !isTextField(e.target));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.35;
      pos.current.y += (target.current.y - pos.current.y) * 0.35;

      const el = boltRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-35%, -15%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-bolt-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={boltRef}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform",
        "transition-opacity duration-150",
        visible ? "opacity-100" : "opacity-0"
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "transition-transform duration-150",
          hot ? "scale-125" : "scale-100"
        )}
      >
        <svg
          viewBox="0 0 40 56"
          className="h-7 w-auto drop-shadow-[0_0_8px_rgba(212,175,55,0.85)]"
          fill="none"
        >
          <path d={BOLT_PATH} fill="#E7C76A" />
          <path d={BOLT_PATH} fill="#FFF8E7" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
}
