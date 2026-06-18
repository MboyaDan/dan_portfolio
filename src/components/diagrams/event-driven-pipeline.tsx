import { FlowDiagram } from "./flow-diagram";

export function EventDrivenPipelineDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 800 220"
      edgeLength={20}
      nodes={[
        { id: "order", x: 10, y: 84, w: 140, h: 52, label: "Order Event", sublabel: "API writes" },
        { id: "pubsub", x: 170, y: 84, w: 140, h: 52, label: "Pub/Sub Topic", sublabel: "decoupled", accent: true },
        { id: "worker", x: 330, y: 84, w: 140, h: 52, label: "Cloud Run Worker", sublabel: "subscriber" },
        { id: "bq", x: 490, y: 84, w: 140, h: 52, label: "BigQuery", sublabel: "partitioned by date" },
        { id: "insights", x: 650, y: 84, w: 140, h: 52, label: "AI Insights", sublabel: "Claude / OpenAI" },
      ]}
      edges={[
        { d: "M150,110 L170,110" },
        { d: "M310,110 L330,110" },
        { d: "M470,110 L490,110" },
        { d: "M630,110 L650,110" },
      ]}
    />
  );
}
