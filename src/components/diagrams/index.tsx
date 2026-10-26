import type { DiagramKey } from "@/data/projects";
import { RequestLifecycleDiagram } from "./request-lifecycle";
import { MultiTenantSaasDiagram } from "./multi-tenant-saas";
import { EventDrivenPipelineDiagram } from "./event-driven-pipeline";
import { MpesaPaymentFlowDiagram } from "./mpesa-payment-flow";
import { WebsocketKdsDiagram } from "./websocket-kds";
import { HospitalityPosDiagram } from "./hospitality-pos";
import { AdmissionsPipelineDiagram } from "./admissions-pipeline";

export const diagramRegistry: Record<DiagramKey, React.ComponentType> = {
  "request-lifecycle": RequestLifecycleDiagram,
  "multi-tenant-saas": MultiTenantSaasDiagram,
  "event-driven-pipeline": EventDrivenPipelineDiagram,
  "mpesa-payment-flow": MpesaPaymentFlowDiagram,
  "websocket-kds": WebsocketKdsDiagram,
  "hospitality-pos": HospitalityPosDiagram,
  "admissions-pipeline": AdmissionsPipelineDiagram,
};

export function DiagramFor({ diagram }: { diagram: DiagramKey }) {
  const Diagram = diagramRegistry[diagram];
  return <Diagram />;
}
