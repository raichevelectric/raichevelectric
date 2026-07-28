import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  inverted?: boolean;
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
  inverted = false,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <span
        className={cn(
          "relative flex h-11 w-9 shrink-0 items-center justify-center sm:h-12 sm:w-10",
          markClassName
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]"
        >
          <path
            d="M24.5 2L6 30.5h11.8L13.2 54 35.5 22.2H22.4L24.5 2Z"
            className={inverted ? "fill-brand-navy" : "fill-brand-electric"}
          />
          <path
            d="M24.5 2L17.8 18.4h6.1L24.5 2Z"
            className={inverted ? "fill-brand-navy/40" : "fill-brand-amber"}
            opacity="0.55"
          />
        </svg>
      </span>

      {showWordmark && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.15rem] font-bold uppercase tracking-[-0.04em] sm:text-[1.35rem]",
              inverted ? "text-brand-navy" : "text-white"
            )}
          >
            Raichev
          </span>
          <span
            className={cn(
              "mt-1 text-[0.58rem] font-bold uppercase tracking-[0.36em] sm:text-[0.62rem] sm:tracking-[0.42em]",
              inverted ? "text-brand-slate" : "text-brand-electric"
            )}
          >
            Electric
          </span>
        </span>
      )}
    </span>
  );
}
