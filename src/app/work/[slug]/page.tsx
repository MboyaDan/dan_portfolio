import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { DiagramFor } from "@/components/diagrams";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return buildMetadata({ title: "Project not found" });
  return buildMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        All work
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span>{project.year}</span>
          <span className="text-border">·</span>
          <span>{project.role}</span>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
        <p className="mt-2 font-mono text-sm text-accent">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </header>

      <section className="mt-12">
        <SectionLabel index="0x01" label="problem" className="mb-4" />
        <p className="text-base leading-relaxed text-muted">{project.problem}</p>
      </section>

      <section className="mt-12">
        <SectionLabel index="0x02" label="architecture" className="mb-4" />
        <div className="rounded-md border border-border bg-surface p-4 sm:p-6">
          <DiagramFor diagram={project.diagram} />
        </div>
      </section>

      <section className="mt-12">
        <SectionLabel index="0x03" label="technical challenges" className="mb-4" />
        <ul className="space-y-3">
          {project.challenges.map((challenge) => (
            <li key={challenge} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-1 font-mono text-accent">→</span>
              <span>{challenge}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionLabel index="0x04" label="solutions" className="mb-4" />
        <div className="space-y-6">
          {project.solutions.map((solution) => (
            <div key={solution.title} className="border-l-2 border-accent/40 pl-4">
              <h3 className="text-sm font-semibold text-foreground">{solution.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{solution.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 mb-4">
        <SectionLabel index="0x05" label="results" className="mb-4" />
        <ul className="space-y-3">
          {project.results.map((result) => (
            <li key={result} className="flex gap-3 text-sm leading-relaxed text-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
