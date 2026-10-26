import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectStatusBadge } from "@/components/ui/project-status";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Work",
  description: "Case studies from backend systems I designed and built: payment infrastructure, multi-tenant platforms, hospitality POS, online admissions and event-driven pipelines.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionLabel index="0x01" label="case studies" className="mb-6" />
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Work</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Systems I designed and built end to end, for clients and for my own
        products: the problem each one solves, the architecture behind it, and
        the specific decisions that keep it correct when requests race, retry
        or fail halfway.
      </p>

      <div className="mt-10 space-y-4">
        {projects.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
            <Card className="p-6 transition-colors group-hover:border-accent/60">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
                    <span className="font-mono text-xs text-muted">{project.year}</span>
                    <ProjectStatusBadge status={project.status} />
                  </div>
                  <p className="mt-1 font-mono text-xs text-accent">{project.tagline}</p>
                  {project.context && (
                    <p className="mt-1 font-mono text-xs text-muted">{project.context}</p>
                  )}
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
