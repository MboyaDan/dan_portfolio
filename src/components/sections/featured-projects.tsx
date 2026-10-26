import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectStatusBadge } from "@/components/ui/project-status";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionLabel index="0x02" label="featured work" className="mb-8" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {featured.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="group">
            <Card className="flex h-full flex-col justify-between p-6 transition-colors group-hover:border-accent/60">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                </div>
                <p className="mt-1 font-mono text-xs text-accent">{project.tagline}</p>
                <ProjectStatusBadge status={project.status} className="mt-3" />
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/work" className="font-mono text-sm text-accent hover:underline">
          View all case studies →
        </Link>
      </div>
    </section>
  );
}
