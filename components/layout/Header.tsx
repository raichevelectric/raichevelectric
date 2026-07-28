"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-data";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

function NavBolt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 56"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-3.5 w-2.5 shrink-0", className)}
    >
      <path d="M24.5 2L6 30.5h11.8L13.2 54 35.5 22.2H22.4L24.5 2Z" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-[70] border-b border-white/10 bg-brand-navy/95 backdrop-blur-xl">
        <div className="container-site">
          <div className="flex h-14 items-center justify-between sm:h-16 md:h-[4.5rem]">
            <Link
              href="/"
              className="group relative z-[80] min-w-0 transition-opacity hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              <Logo className="origin-left scale-90 sm:scale-100" />
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "group/nav relative flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors",
                      active
                        ? "text-brand-electric"
                        : "text-white/65 hover:text-brand-electric"
                    )}
                  >
                    <NavBolt
                      className={cn(
                        "text-brand-electric transition-all duration-200",
                        active
                          ? "translate-y-0 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(212,175,55,0.65)]"
                          : "-translate-y-0.5 scale-75 opacity-0 group-hover/nav:translate-y-0 group-hover/nav:scale-100 group-hover/nav:opacity-100 group-hover/nav:drop-shadow-[0_0_8px_rgba(212,175,55,0.65)]"
                      )}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <a
                href={siteConfig.phoneHref}
                className="text-sm font-semibold text-white/90 hover:text-brand-electric"
              >
                {siteConfig.phone}
              </a>
              <Button href="/request-a-quote" size="sm">
                Get a Quote
              </Button>
            </div>

            <div className="relative z-[80] flex items-center gap-2 lg:hidden">
              <a
                href={siteConfig.phoneHref}
                className="flex h-10 items-center justify-center border border-brand-electric/40 px-3 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-brand-electric"
                aria-label="Call Raichev Electric"
              >
                Call
              </a>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center text-white"
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="fixed inset-0 z-[60] bg-brand-navy lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex h-full flex-col overflow-y-auto px-4 pb-10 pt-20 sm:px-6 sm:pt-24">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 border-b border-white/10 px-1 py-4 text-base font-bold uppercase tracking-[0.16em] transition-colors",
                      active ? "text-brand-electric" : "text-white/85"
                    )}
                  >
                    <NavBolt
                      className={cn(
                        "transition-opacity",
                        active ? "opacity-100" : "opacity-40"
                      )}
                    />
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="px-1 text-lg font-semibold text-white"
                >
                  {siteConfig.phone}
                </a>
                <Button
                  href="/request-a-quote"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
