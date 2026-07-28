import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-data";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-site section-padding pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-electric">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-electric">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Commercial Electrical</li>
              <li>Residential Electrical</li>
              <li>AV, Security & Low Voltage</li>
              <li>Smart Home Solutions</li>
              <li>EV Charger Installation</li>
              <li>Landscape Lighting</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-electric">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address.full}</li>
              <li>{siteConfig.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/50">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-white/50">{siteConfig.license}</p>
        </div>
      </div>
    </footer>
  );
}
