import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

/**
 * Signature element: section labels are styled like code comments
 * (`// 0x02 — section`), echoing how the subject annotates real codebases,
 * rather than decorative numbered badges.
 */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs text-muted", className)}>
      <span className="text-accent">{"//"}</span>
      <span>{index}</span>
      <span className="text-border">—</span>
      <span className="uppercase tracking-[0.2em]">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
