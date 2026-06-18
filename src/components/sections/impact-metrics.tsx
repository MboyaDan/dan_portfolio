import { SectionLabel } from "@/components/ui/section-label";
import { Card } from "@/components/ui/card";
import { Counter } from "@/components/ui/counter";

const metrics = [
  { value: 5, suffix: "+", label: "Years in production", detail: "Shipping and operating backend systems since 2018" },
  { value: 2, label: "Financial transaction systems", detail: "M-Pesa Daraja integrations handling real payments" },
  { value: 4, label: "Multi-tenant architectures", detail: "Schema-isolated platforms serving multiple customers" },
  { value: 2, label: "Cloud platforms", detail: "Production deployments on AWS and GCP" },
  { value: 2, label: "AI-integrated services", detail: "Claude API and OpenAI API as operational layers" },
  { value: 200, suffix: "ms", label: "Real-time delivery target", detail: "WebSocket + Redis Pub/Sub kitchen display latency" },
];

export function ImpactMetrics() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <SectionLabel index="0x01" label="track record" className="mb-8" />
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label} className="rounded-none border-0 p-6">
            <div className="text-3xl font-semibold tracking-tight">
              <Counter value={metric.value} suffix={metric.suffix} />
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">{metric.label}</p>
            <p className="mt-1 text-sm text-muted">{metric.detail}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
