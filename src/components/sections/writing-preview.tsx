import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { SectionLabel } from "@/components/ui/section-label";

export function WritingPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionLabel index="0x03" label="writing" className="mb-8" />
      <div className="divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <div>
              <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-1 max-w-xl text-sm text-muted">{post.description}</p>
            </div>
            <div className="flex items-center gap-3 whitespace-nowrap font-mono text-xs text-muted">
              <span>{post.readingTime}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-colors group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/writing" className="font-mono text-sm text-accent hover:underline">
          Read all posts →
        </Link>
      </div>
    </section>
  );
}
