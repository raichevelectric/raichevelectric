import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-none border border-brand-navy/10 bg-white p-6",
        hover &&
          "transition-all duration-500 hover:-translate-y-1 hover:border-brand-electric/40 hover:shadow-[0_20px_60px_-30px_rgba(14,14,14,0.45)]",
        className
      )}
    >
      {children}
    </div>
  );
}
