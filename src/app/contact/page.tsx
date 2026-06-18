import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { GithubIcon } from "@/components/ui/github-icon";
import { site } from "@/data/site";
import { SectionLabel } from "@/components/ui/section-label";
import { StatusLine } from "@/components/ui/status-line";
import { ContactForm } from "@/components/sections/contact-form";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch about remote backend engineering contracts.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionLabel index="0x01" label="contact" className="mb-6" />
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Get in touch</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        The fastest way to reach me is email — I check it daily and reply within
        a day or two, GMT+3 with comfortable overlap into CET and GMT.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <StatusLine />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_auto] sm:gap-16">
        <ContactForm />

        <div className="space-y-4 font-mono text-sm">
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-muted hover:text-accent">
            <Mail className="h-4 w-4" />
            {site.email}
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted hover:text-accent">
            <GithubIcon className="h-4 w-4" />
            github.com/danroylex
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted hover:text-accent">
            <LinkedinIcon className="h-4 w-4" />
            linkedin.com/in/danroylex
          </a>
        </div>
      </div>
    </div>
  );
}
