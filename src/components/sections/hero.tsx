import Link from "next/link";
import { Download } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { GithubIcon } from "@/components/ui/github-icon";
import { site } from "@/data/site";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusLine } from "@/components/ui/status-line";
import { TerminalLedger } from "@/components/ui/terminal-ledger";

export function Hero() {
  return (
    <section className="bg-grid border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusLine />
              <Badge>{site.currentFocus}</Badge>
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Designing backend systems that{" "}
              <span className="text-accent">survive production.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-muted">
              {site.summary} Based in {site.location} ({site.timezone}),
              focused on payment infrastructure, multi-tenant platforms, and
              the unglamorous correctness work that keeps both running.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/resume" className={buttonVariants("primary")}>
                <Download className="h-4 w-4" />
                Resume
              </Link>
              <Link
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants("secondary")}
              >
                <GithubIcon className="h-4 w-4" />
                GitHub ↗
              </Link>
              <Link
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants("secondary")}
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn ↗
              </Link>
            </div>
          </div>

          <TerminalLedger />
        </div>
      </div>
    </section>
  );
}
