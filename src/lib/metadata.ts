import type { Metadata } from "next";
import { site } from "@/data/site";

interface PageMeta {
  title: string;
  description?: string;
  path?: string;
}

export function buildMetadata({ title, description, path = "/" }: PageMeta): Metadata {
  const fullTitle = title === site.name ? title : `${title} · ${site.name}`;
  const desc = description ?? site.description;
  const url = `${site.url}${path}`;

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}
