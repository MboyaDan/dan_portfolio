import { SectionLabel } from "@/components/ui/section-label";
import { CodeSnippet } from "@/components/ui/code-snippet";
import { EventDrivenPipelineDiagram } from "@/components/diagrams/event-driven-pipeline";
import { MultiTenantSaasDiagram } from "@/components/diagrams/multi-tenant-saas";
import { MpesaPaymentFlowDiagram } from "@/components/diagrams/mpesa-payment-flow";
import { WebsocketKdsDiagram } from "@/components/diagrams/websocket-kds";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Architecture",
  description: "Interactive diagrams covering event-driven pipelines, multi-tenant SaaS, M-Pesa payments, and real-time WebSocket systems.",
  path: "/architecture",
});

const diagrams = [
  {
    index: "0x01",
    title: "Event-Driven Pipeline",
    caption:
      "Order events publish to Pub/Sub and are consumed asynchronously by a Cloud Run worker — decoupling order-taking from analytics so neither blocks the other.",
    Diagram: EventDrivenPipelineDiagram,
    snippet: {
      filename: "publish.go",
      lines: [
        "func publishOrderEvent(ctx context.Context, t *pubsub.Topic, o Order) error {",
        '    data, _ := json.Marshal(o)',
        "    result := t.Publish(ctx, &pubsub.Message{Data: data})",
        "    _, err := result.Get(ctx) // confirms publish, not processing",
        "    return err",
        "}",
      ],
    },
  },
  {
    index: "0x02",
    title: "Multi-Tenant SaaS",
    caption:
      "Tenant identity resolves from JWT claims before a handler runs. PostgreSQL's search_path scopes every query to that tenant's schema — no per-query tenant_id checks required.",
    Diagram: MultiTenantSaasDiagram,
    snippet: {
      filename: "middleware.go",
      lines: [
        "func TenantMiddleware(next http.Handler) http.Handler {",
        "    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {",
        "        claims := claimsFromContext(r.Context())",
        "        ctx := withTenantSchema(r.Context(), claims.TenantSchema)",
        "        next.ServeHTTP(w, r.WithContext(ctx))",
        "    })",
        "}",
      ],
    },
  },
  {
    index: "0x03",
    title: "M-Pesa Payment Flow",
    caption:
      "An idempotency key is generated before the Daraja STK push. The webhook callback is signature-verified, then applied as an atomic upsert — retries and duplicates settle to one payment.",
    Diagram: MpesaPaymentFlowDiagram,
    snippet: {
      filename: "upsert.sql",
      lines: [
        "INSERT INTO payments (idempotency_key, order_id, status, amount)",
        "VALUES ($1, $2, 'completed', $3)",
        "ON CONFLICT (idempotency_key) DO NOTHING",
        "RETURNING id;",
        "-- no row returned => already processed, log and exit",
      ],
    },
  },
  {
    index: "0x04",
    title: "Real-Time WebSockets",
    caption:
      "Kitchen order updates publish to a branch-scoped Redis channel. A WebSocket layer subscribed to that channel fans the update out to every connected display in under 200ms.",
    Diagram: WebsocketKdsDiagram,
    snippet: {
      filename: "kds_hub.go",
      lines: [
        "func (h *Hub) HandleOrderEvent(branchID string, payload []byte) {",
        '    channel := "branch:" + branchID + ":orders"',
        "    h.redis.Publish(ctx, channel, payload)",
        "}",
        "",
        "// subscriber fans out to all websocket clients on this branch",
      ],
    },
  },
];

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionLabel index="0x00" label="architecture" className="mb-6" />
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Architecture</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Four patterns that recur across the systems I build — shown as the
        request or event flow, alongside the code that implements the core
        decision.
      </p>

      <div className="mt-12 space-y-16">
        {diagrams.map(({ index, title, caption, Diagram, snippet }) => (
          <section key={index}>
            <SectionLabel index={index} label={title} className="mb-4" />
            <div className="rounded-md border border-border bg-surface p-4 sm:p-6">
              <Diagram />
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{caption}</p>
            <div className="mt-4">
              <CodeSnippet filename={snippet.filename} lines={snippet.lines} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
