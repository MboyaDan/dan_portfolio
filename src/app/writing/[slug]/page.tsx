import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return buildMetadata({ title: "Post not found" });
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/writing/${post.slug}`,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        All writing
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-border">·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-2 text-base text-muted">{post.description}</p>
        <div className="mt-4 flex gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs text-accent">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert-custom mt-10 max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-pre:border prose-pre:border-border prose-pre:bg-surface prose-code:font-mono">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
