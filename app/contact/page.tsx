import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Raichev Electric for electrical services in Orange County and San Diego. Call, email, or fill out our contact form.",
  path: "/contact",
});

const contactItems = [
  {
    label: "Phone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.emailHref,
  },
  {
    label: "Service Area",
    value: siteConfig.serviceArea,
  },
  {
    label: "Hours",
    value: siteConfig.hours,
  },
  {
    label: "License",
    value: siteConfig.license,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Have a question or ready to start a project? Reach out and our team will get back to you promptly."
      />

      <section className="relative overflow-hidden bg-ivory-field section-padding">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] top-[-10%] h-[40%] w-[45%] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.1),_transparent_65%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,14,14,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,14,14,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        </div>

        <div className="container-site relative z-10">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            <aside className="border border-brand-navy bg-brand-navy p-6 text-white lg:col-span-2 lg:p-8">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-brand-electric">
                Direct Line
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Contact
                <br />
                Information
              </h2>
              <div className="mt-8 space-y-6">
                {contactItems.map((item) => (
                  <div key={item.label} className="border-t border-white/10 pt-4">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-electric/80">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1.5 block text-base text-white transition-colors hover:text-brand-electric"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-base text-white/80">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            <div className="relative border border-brand-navy/10 bg-white/90 p-6 shadow-[0_30px_80px_-40px_rgba(14,14,14,0.35)] backdrop-blur-sm lg:col-span-3 sm:p-8 md:p-10">
              <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-brand-electric via-brand-amber to-transparent" />
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-brand-navy sm:text-3xl">
                Send a Message
              </h2>
              <p className="mt-2 text-sm text-brand-slate sm:text-base">
                Fill out the form and we&apos;ll respond within one business day.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
