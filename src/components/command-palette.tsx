"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  FileText,
  FolderGit2,
  Mail,
  Network,
  Terminal,
  User,
} from "lucide-react";
import { site } from "@/data/site";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { GithubIcon } from "@/components/ui/github-icon";
import type { PostMeta } from "@/lib/mdx";

interface CommandPaletteProps {
  posts: PostMeta[];
}

export function CommandPalette({ posts }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <Command
        className="w-full max-w-md overflow-hidden rounded-md border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        label="Command palette"
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Terminal className="h-4 w-4 text-muted" />
          <Command.Input
            autoFocus
            placeholder="Jump to a page or post…"
            className="w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted focus:outline-none font-mono"
          />
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-muted">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigate" className="text-xs text-muted px-2 py-1.5 font-mono uppercase tracking-wider">
            <Item onSelect={() => go("/")} icon={<User className="h-4 w-4" />}>
              Home
            </Item>
            <Item onSelect={() => go("/work")} icon={<FolderGit2 className="h-4 w-4" />}>
              Work
            </Item>
            <Item onSelect={() => go("/architecture")} icon={<Network className="h-4 w-4" />}>
              Architecture
            </Item>
            <Item onSelect={() => go("/writing")} icon={<FileText className="h-4 w-4" />}>
              Writing
            </Item>
            <Item onSelect={() => go("/resume")} icon={<FileText className="h-4 w-4" />}>
              Resume
            </Item>
            <Item onSelect={() => go("/contact")} icon={<Mail className="h-4 w-4" />}>
              Contact
            </Item>
          </Command.Group>

          {posts.length > 0 && (
            <Command.Group heading="Writing" className="text-xs text-muted px-2 py-1.5 font-mono uppercase tracking-wider">
              {posts.map((post) => (
                <Item
                  key={post.slug}
                  onSelect={() => go(`/writing/${post.slug}`)}
                  icon={<FileText className="h-4 w-4" />}
                >
                  {post.title}
                </Item>
              ))}
            </Command.Group>
          )}

          <Command.Group heading="External" className="text-xs text-muted px-2 py-1.5 font-mono uppercase tracking-wider">
            <Item onSelect={() => go(site.github)} icon={<GithubIcon className="h-4 w-4" />}>
              GitHub ↗
            </Item>
            <Item onSelect={() => go(site.linkedin)} icon={<LinkedinIcon className="h-4 w-4" />}>
              LinkedIn ↗
            </Item>
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-border px-3 py-2 font-mono text-xs text-muted">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </Command>
    </div>
  );
}

function Item({
  children,
  icon,
  onSelect,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-surface-2 data-[selected=true]:text-accent"
    >
      {icon}
      {children}
    </Command.Item>
  );
}
