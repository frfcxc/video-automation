import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://frfcxcfurniturecustommadeshowcase.com";
  const now = new Date();

  const routes = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/zh`, changeFrequency: "weekly" as const, priority: 1 },
    {
      url: `${baseUrl}/products`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh/products`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/zh/about`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zh/contact`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return routes.map((route) => ({
    ...route,
    lastModified: now,
  }));
}
