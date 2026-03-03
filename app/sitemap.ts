import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kelasfullstack.id";
  return ["", "/pricing", "/contact", "/blog"].map((path) => ({ url: `${base}${path}` }));
}
