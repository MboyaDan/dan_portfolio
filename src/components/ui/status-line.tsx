import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function StatusLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-muted",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          site.availableForWork ? "bg-accent" : "bg-muted"
        )}
        aria-hidden
      />
      <span>
        {site.availableForWork ? "open to remote roles" : "not currently available"}
      </span>
      <span className="text-border">·</span>
      <span>{site.timezone}</span>
    </div>
  );
}
