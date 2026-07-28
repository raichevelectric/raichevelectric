import { cn } from "@/lib/utils";

interface EnergyRailProps {
  count: number;
  active?: boolean;
  tone?: "dark" | "light";
  className?: string;
  maxWidthClassName?: string;
}

export function EnergyRail({
  count,
  active = true,
  tone = "dark",
  className,
  maxWidthClassName = "max-w-3xl",
}: EnergyRailProps) {
  const safeCount = Math.max(count, 1);
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "relative mb-8 hidden w-full items-center justify-center md:flex",
        className
      )}
    >
      <div className={cn("relative w-full", maxWidthClassName)}>
        <div
          className={cn(
            "relative h-px w-full overflow-hidden",
            isLight ? "bg-brand-navy/10" : "bg-white/10"
          )}
        >
          <div
            className={cn(
              "absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand-electric to-transparent",
              active && "current-flow"
            )}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
          {Array.from({ length: safeCount }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "energy-dot h-2.5 w-2.5 rounded-full border border-brand-electric/40",
                isLight ? "bg-brand-cream" : "bg-brand-navy",
                active && "energy-dot-live"
              )}
              style={
                {
                  "--dot-index": i,
                  "--dot-count": Math.max(safeCount - 1, 1),
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
