import type { MetadataRoute } from "next";

import { scarves } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = [
    "",
    "/collection",
    "/about",
    "/process",
    "/impact",
    "/contact",
    "/shipping",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" || path === "/collection" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/collection" ? 0.9 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const products = scarves.map((scarf) => ({
    url: `${SITE_URL}/scarves/${scarf.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...pages, ...products];
}
