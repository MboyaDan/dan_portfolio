import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const dot: Record<ProjectStatus, string> = {
  Live: "bg-accent",
  "Pilot live": "bg-accent",
  "In build": "bg-amber",
  "Learning project": "bg-muted",
};

export function ProjectStatusBadge({
  status,
  className,
}: {
  status?: ProjectStatus;
  className?: string;
}) {
  if (!status) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[status])} aria-hidden />
      {status}
    </span>
  );
}
