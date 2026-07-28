import { siteConfig } from "@/lib/site-data";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: "https://raichevelectric.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: siteConfig.address.state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.serviceArea,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
