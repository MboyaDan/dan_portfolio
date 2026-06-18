import Link from "next/link";
import { Download, Mail, MapPin } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { GithubIcon } from "@/components/ui/github-icon";
import { site } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { timeline } from "@/data/timeline";
import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Resume",
  description: "Backend engineer resume — Go, Python, payment infrastructure, multi-tenant platforms.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <SectionLabel index="0x01" label="resume" className="mb-4" />
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
          <p className="mt-1 font-mono text-sm text-accent">{site.role}</p>

          <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {site.location}
            </span>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-accent">
              <Mail className="h-3.5 w-3.5" />
              {site.email}
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent">
              <GithubIcon className="h-3.5 w-3.5" />
              github
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent">
              <LinkedinIcon className="h-3.5 w-3.5" />
              linkedin
            </a>
          </div>
        </div>

        <Link href="/resume.pdf" download className={buttonVariants("primary")}>
          <Download className="h-4 w-4" />
          Download PDF
        </Link>
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">{site.summary}</p>

      <section className="mt-12">
        <SectionLabel index="0x02" label="experience" className="mb-6" />
        <div className="space-y-8">
          {timeline.map((entry) => (
            <div key={entry.title} className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">{entry.title}</h3>
                <span className="font-mono text-xs text-muted">{entry.period}</span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-accent">{entry.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{entry.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 mb-4">
        <SectionLabel index="0x03" label="technical expertise" className="mb-6" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <Card key={category.id} className="p-5">
              <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
              <p className="mt-1 text-xs text-muted">{category.description}</p>
              <ul className="mt-3 space-y-1.5">
                {category.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="text-accent">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
