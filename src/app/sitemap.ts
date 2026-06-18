import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/architecture", "/writing", "/resume", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${site.url}/writing/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
