"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import type { PostMeta } from "@/lib/mdx";

export function WritingList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = React.useState("");

  const filtered = posts.filter((post) => {
    const haystack = `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionLabel index="0x01" label="writing" className="mb-6" />
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Writing</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Notes from production — payments, PostgreSQL, Redis, and the
        distributed-systems patterns that keep showing up.
      </p>

      <div className="mt-8 flex items-center gap-2 rounded-md border border-border bg-surface px-3">
        <Search className="h-4 w-4 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          aria-label="Search writing"
          className="w-full bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted">No posts match &ldquo;{query}&rdquo;.</p>
        )}
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <div>
              <h2 className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted">{post.description}</p>
              <div className="mt-2 flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap font-mono text-xs text-muted">
              <span>{post.readingTime}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-colors group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
