"use client";

import { siteConfig } from "@/lib/site-data";

export function MobileCallBar() {
  return (
    <div className="mobile-call-bar fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-navy/95 px-4 py-3 backdrop-blur-xl safe-bottom lg:hidden">
      <div className="mx-auto flex max-w-7xl gap-3">
        <a
          href={siteConfig.phoneHref}
          className="flex flex-1 items-center justify-center border border-white/20 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
        >
          Call Now
        </a>
        <a
          href="/request-a-quote"
          className="flex flex-1 items-center justify-center bg-brand-electric py-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-navy"
        >
          Get a Quote
        </a>
      </div>
    </div>
  );
}
