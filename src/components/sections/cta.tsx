import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { buttonVariants } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";

export function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionLabel index="0x04" label="get in touch" className="mb-8" />
      <div className="rounded-md border border-border bg-surface p-8 sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Have a backend system that needs to survive production?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {site.availableForWork
            ? `Open to remote contract roles across the EU, UK, and beyond, working ${site.timezone} with comfortable overlap into CET and GMT.`
            : "Not currently taking on new contracts, but feel free to reach out about future availability."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className={buttonVariants("primary")}>
            <Mail className="h-4 w-4" />
            Get in touch
          </Link>
          <Link href="/work" className={buttonVariants("secondary")}>
            See the work →
          </Link>
        </div>
      </div>
    </section>
  );
}
