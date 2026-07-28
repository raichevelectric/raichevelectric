import type { Metadata } from "next";
import { siteConfig } from "./site-data";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | ${siteConfig.tagline}`;
  const pageDescription = description ?? siteConfig.description;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "electrician",
      "electrical contractor",
      "Orange County",
      "San Diego",
      "Orange County electrician",
      "San Diego electrician",
      "commercial electrician",
      "residential electrician",
      "Lutron dealer",
      "smart home",
      "access control",
      "security systems",
      "fire alarm",
      "landscape lighting",
      "AV installation",
      "telecom cabling",
      "EV charger installation",
      "Raichev Electric",
    ],
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      url: path ? `https://raichevelectric.com${path}` : "https://raichevelectric.com",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
