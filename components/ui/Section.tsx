import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className, id, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-padding",
        dark ? "bg-storm-depth text-white" : "bg-brand-cream",
        className
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}
