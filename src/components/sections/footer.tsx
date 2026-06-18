import Link from "next/link";
import { site } from "@/data/site";
import { StatusLine } from "@/components/ui/status-line";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">{site.name}</p>
          <p className="text-sm text-muted">{site.role} · {site.location}</p>
          <StatusLine />
        </div>

        <div className="flex flex-col gap-2 font-mono text-sm text-muted sm:items-end">
          <Link href={site.github} className="hover:text-accent" target="_blank" rel="noreferrer">
            github ↗
          </Link>
          <Link href={site.linkedin} className="hover:text-accent" target="_blank" rel="noreferrer">
            linkedin ↗
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-accent">
            {site.email}
          </a>
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 text-center font-mono text-xs text-muted">
        <kbd className="rounded border border-border px-1.5 py-0.5">⌘K</kbd> to jump anywhere ·
        built with Next.js, Tailwind, and a healthy respect for EXPLAIN ANALYZE
      </div>
    </footer>
  );
}
