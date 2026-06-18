import { Hero } from "@/components/sections/hero";
import { ImpactMetrics } from "@/components/sections/impact-metrics";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WritingPreview } from "@/components/sections/writing-preview";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactMetrics />
      <FeaturedProjects />
      <WritingPreview />
      <CTA />
    </>
  );
}
