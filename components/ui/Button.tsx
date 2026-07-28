import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-electric text-brand-navy hover:bg-brand-amber shadow-[0_0_0_1px_rgba(212,175,55,0.3)]",
  secondary:
    "bg-white text-brand-navy hover:bg-brand-cream",
  outline:
    "border border-brand-electric/70 text-brand-electric hover:border-brand-electric hover:bg-brand-electric hover:text-brand-navy",
  ghost: "text-brand-navy hover:bg-brand-navy/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-xs tracking-[0.16em]",
  md: "min-h-11 px-5 py-3 text-sm tracking-[0.14em] sm:px-6",
  lg: "min-h-12 px-6 py-3.5 text-xs tracking-[0.14em] sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.16em]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-none font-bold uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-electric focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={props.onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
