"use client";

import { motion } from "framer-motion";

interface CodeSnippetProps {
  filename: string;
  lines: string[];
}

export function CodeSnippet({ filename, lines }: CodeSnippetProps) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="ml-2 font-mono text-xs text-muted">{filename}</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 * i, duration: 0.3 }}
          >
            <span className="select-none text-muted/50">{String(i + 1).padStart(2, " ")} </span>
            <span className="text-foreground">{line}</span>
          </motion.div>
        ))}
      </pre>
    </div>
  );
}
