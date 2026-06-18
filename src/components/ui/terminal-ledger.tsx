"use client";

import { motion } from "framer-motion";

const lines: { prefix: "+" | "~" | "#"; text: string }[] = [
  { prefix: "#", text: "POST /v1/payments/initiate" },
  { prefix: "+", text: 'idempotency_key="ord_8f3c…a1" generated' },
  { prefix: "+", text: 'daraja.stk_push -> CheckoutRequestID="ws_…77"' },
  { prefix: "#", text: "webhook received (callback #1)" },
  { prefix: "+", text: "signature verified · ON CONFLICT DO NOTHING" },
  { prefix: "~", text: "payment.status = completed" },
  { prefix: "#", text: "webhook received (callback #2, retry)" },
  { prefix: "+", text: "duplicate detected · 0 rows affected" },
];

export function TerminalLedger() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="ml-2 font-mono text-xs text-muted">payments.ledger — live</span>
      </div>
      <div className="space-y-1.5 p-4 font-mono text-xs sm:text-sm">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.4 }}
            className="flex gap-2"
          >
            <span
              className={
                line.prefix === "+"
                  ? "text-accent"
                  : line.prefix === "~"
                  ? "text-amber"
                  : "text-muted"
              }
            >
              {line.prefix}
            </span>
            <span className={line.prefix === "#" ? "text-muted" : "text-foreground"}>
              {line.text}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 * lines.length + 0.2 }}
          className="flex gap-2 pt-1"
        >
          <span className="text-accent">$</span>
          <span className="caret text-foreground">_</span>
        </motion.div>
      </div>
    </div>
  );
}
