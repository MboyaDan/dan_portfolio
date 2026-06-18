import { FlowDiagram } from "./flow-diagram";

export function MpesaPaymentFlowDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 800 220"
      edgeLength={20}
      nodes={[
        { id: "request", x: 40, y: 30, w: 180, h: 52, label: "Payment Request", sublabel: "checkout" },
        { id: "idempotency", x: 310, y: 30, w: 180, h: 52, label: "Idempotency Check", sublabel: "generate key", accent: true },
        { id: "daraja", x: 580, y: 30, w: 180, h: 52, label: "Daraja API", sublabel: "STK push" },
        { id: "webhook", x: 580, y: 140, w: 180, h: 52, label: "Webhook Callback", sublabel: "Daraja → API" },
        { id: "signature", x: 310, y: 140, w: 180, h: 52, label: "Signature Verify", sublabel: "shared secret", accent: true },
        { id: "upsert", x: 40, y: 140, w: 180, h: 52, label: "DB Upsert", sublabel: "ON CONFLICT DO NOTHING" },
      ]}
      edges={[
        { d: "M220,56 L310,56" },
        { d: "M490,56 L580,56" },
        { d: "M670,82 L670,140" },
        { d: "M580,166 L490,166" },
        { d: "M310,166 L220,166" },
      ]}
    />
  );
}
