"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-medium text-foreground">
          <span className="text-accent">~/</span>danroylex
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-accent",
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "text-foreground"
                  : "text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true })
              )
            }
            className="hidden items-center gap-2 rounded-md border border-border px-2 py-1.5 font-mono text-xs text-muted transition-colors hover:text-accent hover:border-accent/60 sm:flex"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex items-center gap-4 overflow-x-auto border-t border-border px-6 py-2 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "whitespace-nowrap text-sm transition-colors hover:text-accent",
              pathname === link.href || pathname.startsWith(`${link.href}/`)
                ? "text-foreground"
                : "text-muted"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <span className="sr-only">{site.name}</span>
    </header>
  );
}
