import type { DiagramKey } from "@/data/projects";
import { RequestLifecycleDiagram } from "./request-lifecycle";
import { MultiTenantSaasDiagram } from "./multi-tenant-saas";
import { EventDrivenPipelineDiagram } from "./event-driven-pipeline";
import { MpesaPaymentFlowDiagram } from "./mpesa-payment-flow";
import { WebsocketKdsDiagram } from "./websocket-kds";

export const diagramRegistry: Record<DiagramKey, React.ComponentType> = {
  "request-lifecycle": RequestLifecycleDiagram,
  "multi-tenant-saas": MultiTenantSaasDiagram,
  "event-driven-pipeline": EventDrivenPipelineDiagram,
  "mpesa-payment-flow": MpesaPaymentFlowDiagram,
  "websocket-kds": WebsocketKdsDiagram,
};

export function DiagramFor({ diagram }: { diagram: DiagramKey }) {
  const Diagram = diagramRegistry[diagram];
  return <Diagram />;
}
