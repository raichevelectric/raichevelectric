import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl sm:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[0.65rem] font-bold uppercase tracking-[0.28em] sm:mb-4 sm:text-xs sm:tracking-[0.32em]",
            "text-brand-electric"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[1.75rem] font-bold uppercase leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed sm:mt-5 sm:text-lg",
            light ? "text-white/65" : "text-brand-slate"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
