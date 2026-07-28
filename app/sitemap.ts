import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://raichevelectric.com";
  const routes = [
    "",
    "/about",
    "/services",
    "/products",
    "/projects",
    "/testimonials",
    "/contact",
    "/request-a-quote",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
