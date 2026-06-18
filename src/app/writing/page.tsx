import { getAllPosts } from "@/lib/mdx";
import { WritingList } from "@/components/sections/writing-list";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Writing",
  description: "Notes from production — payments, PostgreSQL, Redis, and distributed-systems patterns.",
  path: "/writing",
});

export default function WritingPage() {
  const posts = getAllPosts();
  return <WritingList posts={posts} />;
}
