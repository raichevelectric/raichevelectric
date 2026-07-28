import { cn } from "@/lib/utils";

/**
 * Diagonal seam between cream and storm sections — two-tone brand rhythm.
 */
export function DualToneSeam({
  from,
  className,
}: {
  from: "storm" | "ivory";
  className?: string;
}) {
  const enteringIvory = from === "storm";

  return (
    <div
      className={cn("relative z-20 h-10 sm:h-14 md:h-16", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0",
          enteringIvory ? "bg-storm-depth" : "bg-ivory-field"
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          enteringIvory ? "bg-ivory-field" : "bg-storm-depth"
        )}
        style={{
          clipPath: enteringIvory
            ? "polygon(0 45%, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 0, 100% 45%, 100% 100%, 0 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-electric to-transparent opacity-80"
        style={{
          transform: enteringIvory
            ? "translateY(-50%) rotate(-2.2deg)"
            : "translateY(-50%) rotate(2.2deg)",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-brand-electric bg-brand-electric/40 shadow-[0_0_12px_rgba(212,175,55,0.7)]" />
    </div>
  );
}
